import React, { ChangeEvent, useEffect, useState } from "react";
import { Contract, Outcome, SkinData, SkinsData, toFloatCategory, tohigherQuality } from "../../types/types";
import TradeUpContract from "./TradeUpContract";
import TradeUpSearch from "./TradeUpSearch";
import { Container, Row, Col } from "react-bootstrap";
import Decimal from "decimal.js-light";

const TradeUpEditor = (): React.JSX.Element => {
    // const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const [skinsData, setSkinsData] = useState<SkinsData | null>(null);
    const [filter, setFilter] = useState<{ quality: string, includesString: string }>({ quality: "", includesString: "" });
    const [contract, setContract] = useState<Contract | null>(null);
    const [outcome, setOutcome] = useState<Outcome | null>(null);

    /**
     * Handles when a skin in search is clicked. Adds the given skin to the contract.
     * @param {SkinData} skin  - the skin that was clicked on
     */
    function handleSkinClick(skin: SkinData): void {
        let newContract = contract ?? { skins: [], cost: new Decimal(0) };

        if (newContract.skins.length < 10) {
            const newSkin = Object.assign({}, skin);
            newContract.skins.push(newSkin);
            newContract.cost = newContract.cost.add(newSkin.priceInput);

            // Sets new contract and filter
            setContract(newContract);
            setFilter({ ...filter, quality: newSkin.quality });

            calculateOutcome();
        } else {
            doAddError("Cannot add more than 10 skins!");
        }
    }

    /**
     * Changes price of given skin to the given event target value
     * @param {ChangeEvent} e - change event
     * @param {SkinData} skin - skin to have price changed
     */
    function handlePriceChange(e: ChangeEvent<HTMLInputElement>, skin: SkinData): void {
        const newPrice = Number(e.target.value);

        if (contract && !isNaN(newPrice) && newPrice >= 0) {
            const skinIndex: number = contract.skins.indexOf(skin);

            if (skinIndex !== -1) {
                const newContract: Contract = contract;
                newContract.cost = newContract.cost.sub(skin.priceInput - newPrice);
                newContract.skins[skinIndex].priceInput = newPrice;

                setContract(newContract);
                calculateOutcome();
            }
        } else {
            e.target.value = "0";
            doAddError("Invalid price change!");
        }
    }

    /**
     * Changes float of given skin to the given event target value
     * @param {ChangeEvent} e - change event
     * @param {SkinData} skin - skin to have float changed
     */
    function handleFloatChange(e: ChangeEvent<HTMLInputElement>, skin: SkinData): void {
        const newFloat = Number(e.target.value);

        if (contract && !isNaN(newFloat) && newFloat >= skin.wears.min_wear && newFloat <= skin.wears.max_wear) {
            const skinIndex: number = contract.skins.indexOf(skin);

            if (skinIndex !== -1) {
                const newContract: Contract = contract;

                // Change price to default float price when float category changes
                const prevFloatCategory = toFloatCategory(new Decimal(skin.floatInput));
                newContract.skins[skinIndex].floatInput = newFloat;
                const newFloatCategory = toFloatCategory(new Decimal(skin.floatInput));

                if(prevFloatCategory !== newFloatCategory) {
                    newContract.cost = newContract.cost.sub(skin.priceInput - Number(newContract.skins[skinIndex].prices[newFloatCategory]));
                    // TODO: Does not properly update? ** USE Object.assign({}, skin); to make a copy of the skin for both float and price change so that state updates correctly
                    newContract.skins[skinIndex].priceInput = Number(newContract.skins[skinIndex].prices[newFloatCategory]);
                }

                setContract(newContract);
                calculateOutcome();
            }
        } else {
            // TODO: Add error under skin, don't calculate outcome
            setOutcome(null);
            doAddError("Invalid price change!");
        }
    }

    /**
     * Calculates contract outcome if there are enough skins inputted
     * @param {Contract} newContract - Contract to calculate the outcome of
     * @returns {Outcome | null} - returns Outcome if enough skins are inputted, otherwise null
     */
    function calculateOutcome(): void {
        console.log("Calculating outcome...");
        if (!contract || (contract.skins.length !== 10 || skinsData === null)) {
            console.log("Insufficient skins or skins data not loaded.");
        } else {
            let contractOutcomes: Map<SkinData, number> = new Map<SkinData, number>();
            let averageFloat = new Decimal(0);
            let totalOutcomes = 0;

            for (const skin of contract.skins) {
                // Add float to calculate average
                averageFloat = averageFloat.add(skin.floatInput);

                // Finds skin outcomes from collection of skin
                let collection = skinsData[skin.collection];
                const higherQuality = tohigherQuality(skin.quality);

                if (higherQuality === null) {
                    // TODO: Change to display error
                    console.error("Invalid Contract");
                    return;
                }

                // Sets price and probability of skin outcomes
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

            // Calculate average float of skins
            averageFloat = averageFloat.div(10);

            let expectedValue: Decimal = new Decimal(0);
            let variance: Decimal = new Decimal(0);
            let profitOdds: number = 0;
            for (const [skin, amount] of contractOutcomes.entries()) {
                // Calculating skin's float and price
                const float = averageFloat.mul(skin.wears.max_wear - skin.wears.min_wear).add(skin.wears.min_wear);
                const floatCategory = toFloatCategory(float);
                const price = new Decimal(skin.prices[floatCategory]);

                // Setting skin's float and price
                skin.priceInput = price.toNumber();
                skin.floatInput = float.toNumber();

                if (contract.cost.lt(skin.priceInput)) {
                    profitOdds += amount / totalOutcomes;
                }

                expectedValue = expectedValue.add(price.mul(amount / totalOutcomes));
                variance = variance.add(price.pow(2).mul(amount / totalOutcomes));

                // Sets contractOutcomes value as the percentage of getting skin
                contractOutcomes.set(skin, amount / totalOutcomes);
            }
            variance = variance.sub((expectedValue.pow(2)));


            // Sort contractOutcomes by price of outcome skin
            contractOutcomes = new Map([...contractOutcomes.entries()].sort((skin1, skin2) => {
                return skin2[0].priceInput - skin1[0].priceInput;
            }));

            const profitPercent = !contract.cost.equals(0) ?
                (expectedValue.sub(contract.cost).div(contract.cost).mul(100)).todp(2).toString() + "%" :
                "Infinity%";

            setOutcome({
                contractOutcomes,
                expectedValue,
                variance,
                profitPercent,
                averageFloat,
                profitOdds
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
        doAddError(errorMessage);
    };

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

    /**
     * Use useEffect to call getSkins when the component mounts
     */
    useEffect(() => {
        getSkins();
    }, []);

    // TODO: use useContext instead of prop drilling
    return <>
        <Container fluid >
            <Row>
                <Col>
                    {contract ?
                        <TradeUpContract contract={contract} outcome={outcome}
                            {...{ handlePriceChange }} {...{handleFloatChange}}/> :
                        <Container className="colored-container my-3 py-0 rounded-3" fluid>
                            <Row className="justify-content-center align-items-center" >
                                <Col xs={12} sm={6} md={4} lg={3}>
                                    Add skins
                                </Col>
                            </Row>
                        </Container>
                    }
                </Col>
                <Col>
                    <TradeUpSearch skinsData={skinsData} filter={filter} onSkinClick={handleSkinClick} />
                </Col>
            </Row>
        </Container>
        <p>{error}</p>
    </>;
}

export default TradeUpEditor;