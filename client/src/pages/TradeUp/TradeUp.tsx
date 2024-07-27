import React, { useEffect, useState } from "react";
import { Contract, Outcome, SkinData, SkinsData, tohigherQuality } from "../../types/types";
import TradeUpContract from "./TradeUpContract";
import TradeUpSearch from "./TradeUpSearch";
import { Container, Row, Col } from "react-bootstrap";
import Decimal from "decimal.js-light";

type TradeUpProps = {
    /** Contract to load, if any */
    loadContract: Contract;

    /** Outcome to load, if any */
    loadOutcome: Outcome | null;
}


const TradeUpEditor = ({ loadContract, loadOutcome }: TradeUpProps): React.JSX.Element => {
    // const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const [skinsData, setSkinsData] = useState<SkinsData | null>(null);
    const [filter, setFilter] = useState<{ quality: string, includesString: string }>({ quality: "", includesString: "" });
    const [contract, setContract] = useState<Contract>(loadContract);
    const [outcome, setOutcome] = useState<Outcome | null>(loadOutcome);

    /**
     * Handles when a skin in search is clicked. Adds the given skin to the contract.
     * @param skin - the skin that was clicked on
     */
    function handleSkinClick(skin: SkinData): void {
        if (contract.skins.length < 10) {
            setFilter({ quality: skin.quality, includesString: filter.includesString });
            const newContract = contract;
            newContract.skins.push(skin);
            newContract.cost = newContract.cost.add(skin.priceInput);
            setContract(newContract);
            calculateOutcome()
        } else {
            doAddError("Cannot add more than 10 skins!");
        }
    }

    /**
     * Calculates contract outcome if there are enough skins inputted
     * @param {Contract} newContract - Contract to calculate the outcome of
     * @returns {Outcome | null} - returns Outcome if enough skins are inputted, otherwise null
     */
    function calculateOutcome(): void {
        // console.log("Calculating outcome...");
        if (loadContract.skins.length !== 10 || skinsData === null) {
            setOutcome(null);
            // console.log("Insufficient skins or skins data not loaded.");
        } else {
            let contractOutcomes: Map<SkinData, number> = new Map<SkinData, number>();
            let totalOutcomes = 0;

            for (const skin of loadContract.skins) {
                // Finds skin outcomes from collection of skin
                let collection = skinsData[skin.collection];
                const higherQuality = tohigherQuality(skin.quality);

                if (higherQuality === null) {
                    // TODO: Change to error
                    console.error("Invalid Contract");
                    break;
                }

                // Sets price and probability of skin outcomes
                // TODO: Change so don't have to concat skins
                const skinOutcomes = collection[higherQuality];

                for (const skin of skinOutcomes) {
                    if (!contractOutcomes.has(skin)) {
                        contractOutcomes.set(skin, 0);
                    }
                    // Type Assertion because typescript thinks it may be undefined
                    contractOutcomes.set(skin, contractOutcomes.get(skin)! + 1);
                }
                totalOutcomes += skinOutcomes.length;
            }

            let expectedValue: Decimal = new Decimal(0);
            let variance: Decimal = new Decimal(0);
            for (const [skin, amount] of contractOutcomes.entries()) {
                const cost = new Decimal(skin.priceInput).div(100);

                // TODO: Consider float outcome

                expectedValue = expectedValue.add(cost.mul(amount / totalOutcomes));
                variance = variance.add(cost.pow(2).mul(amount / totalOutcomes));
            }
            variance = variance.sub((expectedValue.pow(2)));

            // * Debugging console log
            // console.log("E[V]: " + expectedValue);
            // console.log("Var: " + variance);
            
            setOutcome({
                contractOutcomes,
                expectedValue,
                variance
            });
        }
    }


    /**
     * Gets the skins from the server
     */
    function getSkins(): void {
        fetch("/api/skins")
            .then(doSkinsResp)
            .catch(() => console.error("failed to connect to server"));
    };

    /**
     * Handles response after requesting the list of existing decks
     * @param res The response object received from the server
     */
    function doSkinsResp(res: Response): void {
        if (res.status === 200) {
            res.json()
                .then(doSkinsJson)
                .catch(() => {
                    doSkinsError("200 response is not JSON")
                });
        } else {
            doSkinsError(`bad status code from /api/skins: ${res.status}`);
        }
    };

    /**
     * Processes the JSON response from the server
     * @param data The JSON object received from the server
     */
    //TODO: type check
    function doSkinsJson(data: unknown) {
        if (typeof data === 'object' && data !== null && 'skinsData' in data) {
            const rawData: SkinsData = (data as { skinsData: SkinsData }).skinsData;

            setSkinsData(rawData);
        } else {
            console.error("Data does not have the expected structure");
        }
    };

    /**
     * Handles errors that occur during the request
     * @param errorMessage The error message
     */
    function doSkinsError(errorMessage: string): void {
        setError(errorMessage);
    };

    /**
     * Use useEffect to call getSkins when the component mounts
     */
    useEffect(() => {
        getSkins();
    }, []);

    /**
     * Adds error message and clears it after 5 seconds
     * @param {string} error - Error to be shown
     */
    function doAddError(error: string): void {
        setError(error);

        // Clears error
        setTimeout(() => {
            setError("");
        }, 5000);
    }

    return <>
        <Container fluid >
            <Row>
                <Col>
                    <TradeUpContract contract={contract} outcome={outcome} />
                    {/* <Container className="colored-container my-3 rounded-3" fluid>
                        <Row className="justify-content-center align-items-center" >
                            <Col xs={12} md={8} style={{ backgroundColor: '#f0f0f0', padding: '20px', color: "black" }}>
                                Contract Here
                            </Col>
                        </Row>
                    </Container> */}
                </Col>
                <Col>
                    <TradeUpSearch skinsData={skinsData} filter={filter} onSkinClick={(skin: SkinData) => handleSkinClick(skin)} />
                </Col>
            </Row>
        </Container>
        <p>{error}</p>
    </>;
}

export default TradeUpEditor;