import React, { useEffect, useState } from "react";
import { Contract, Outcome, SkinData, SkinsData } from "../../types/types";
import TradeUpContract from "./TradeUpContract";
import TradeUpSearch from "./TradeUpSearch";
import { Container, Row, Col } from "react-bootstrap";

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

    /**
     * Handles when a skin in search is clicked. Adds the given skin to the contract.
     * @param skin - the skin that was clicked on
     */
    function handleSkinClick(skin: SkinData): void {
        if (contract.skins.length < 10) {
            setFilter({quality: skin.quality, includesString: filter.includesString});
            const newContract = contract;
            newContract.skins.push(skin);
            newContract.cost += skin.priceInput;
            setContract(newContract);
            console.log(contract)
        } else {
            doAddError("Cannot add more than 10 skins!");
            loadOutcome;
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
                    <TradeUpContract loadContract={loadContract} loadOutcome={loadOutcome} skinsData={skinsData} />
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