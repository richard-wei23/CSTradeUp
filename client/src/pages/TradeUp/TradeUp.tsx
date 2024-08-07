import React, { ChangeEvent, useEffect, useState } from "react";
import { Contract, Outcome, SkinData, SkinsData, toFloatCategory, tohigherQuality } from "../../types/types";
import TradeUpContract from "./TradeUpContract";
import TradeUpSearch from "./TradeUpSearch";
import { Container, Row, Col } from "react-bootstrap";
import Decimal from "decimal.js-light";

const TradeUp = (): React.JSX.Element => {
    const [error, setError] = useState<string>("");
    const [skinsData, setSkinsData] = useState<SkinsData | null>(null);
    const [filter, setFilter] = useState<{ quality: string, includesString: string }>({ quality: "", includesString: "" });
    const [contract, setContract] = useState<Contract | null>(null);
    const [outcome, setOutcome] = useState<Outcome | null>(null);

    /**
     * Handles when a skin in search is clicked. Adds the given skin to the contract.
     * @param skin  - the skin that was clicked on
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
     * @param e - change event
     * @param skin - skin to have price changed
     */
    function handlePriceChange(e: ChangeEvent<HTMLInputElement>, skin: SkinData): void {
        const newPrice = Number(e.target.value);
        if (isNaN(newPrice)) {
            e.target.value = `${skin.priceInput}`;
            doAddError("Price must be a number");
            return;
        }
        if (newPrice < 0) {
            e.target.value = "0";
            doAddError("Price must be greater or equal to 0");
            return;
        }

        if (contract) {
            if (outcome?.contractOutcomes.has(skin.name)) {
                const { contractOutcomes, averageFloat } = outcome;

                const newContractOutcomes = new Map(contractOutcomes);

                const [existingSkin, percent] = newContractOutcomes.get(skin.name) ?? [null, 0];

                if (existingSkin) {
                    existingSkin.priceInput = newPrice;

                    newContractOutcomes.set(skin.name, [existingSkin, percent]);

                    calculateOutcomeStats(newContractOutcomes, averageFloat, true);
                    return;
                }
            } else {
                const skinIndex: number = contract.skins.indexOf(skin);

                if (skinIndex !== -1) {
                    let { skins, cost } = contract;
                    cost = cost.sub(skin.priceInput - newPrice);
                    skins[skinIndex].priceInput = newPrice;

                    setContract({ skins, cost });

                    if (outcome) {
                        const { contractOutcomes, averageFloat } = outcome;
                        calculateOutcomeStats(contractOutcomes, averageFloat, true);
                    }
                    return;
                }
            }
        }
        doAddError("Invalid skin");
    }

    /**
     * Changes float of given skin to the given event target value
     * @param e - change event
     * @param skin - skin to have float changed
     */
    function handleFloatChange(e: ChangeEvent<HTMLInputElement>, skin: SkinData): void {
        const newFloat = Number(e.target.value);

        if (contract && !isNaN(newFloat) && newFloat >= skin.wears.min_wear && newFloat <= skin.wears.max_wear) {
            const skinIndex: number = contract.skins.indexOf(skin);

            if (skinIndex !== -1) {
                let { skins, cost } = contract;

                // Change price to default float price when float category changes
                const prevFloatCategory = toFloatCategory(new Decimal(skin.floatInput));
                skins[skinIndex].floatInput = newFloat;
                const newFloatCategory = toFloatCategory(new Decimal(skin.floatInput));

                if (prevFloatCategory !== newFloatCategory) {
                    cost = cost.sub(skin.priceInput - Number(skins[skinIndex].prices[newFloatCategory]));
                    skins[skinIndex].priceInput = Number(skins[skinIndex].prices[newFloatCategory]);
                }

                setContract({ skins, cost });
                calculateOutcome();
            }
        } else {
            // TODO: Add error under skin, don't calculate outcome
            setOutcome(null);
            doAddError("Invalid price change!");
        }
    }

    /**
     * Handles when contract skin is deleted
     * @param skin - skin to be deleted
     */
    function handleDeleteClick(skin: SkinData): void {
        if (contract && contract.skins.length > 0) {
            const skinIndex: number = contract.skins.indexOf(skin);

            if (skinIndex !== -1) {
                let { skins, cost } = contract;

                skins.splice(skinIndex, 1);

                setContract({ skins, cost });
                calculateOutcome();
            }
        } else {
            doAddError("Invalid skin deletion!");
        }
    }
    
    /**
     * Handles when contract skin is copied
     * @param skin - skin to be copied
     */
    function handleCopyClick(skin: SkinData): void {
        if (contract && contract.skins.length < 10) {
            const skinIndex: number = contract.skins.indexOf(skin);

            if (skinIndex !== -1) {
                let { skins, cost } = contract;

                skins.push(skin);

                setContract({ skins, cost });
                calculateOutcome();
            }
        } else {
            doAddError("Invalid skin copy!");
        }
    }

    /**
     * Calculates contract outcome if there are enough skins inputted
     * @param newContract - Contract to calculate the outcome of
     */
    function calculateOutcome(): void {
        console.log("Calculating outcome...");
        if (!contract || (contract.skins.length !== 10 || skinsData === null)) {
            setOutcome(null);
            console.log("Insufficient skins or skins data not loaded.");
        } else {
            let contractOutcomes = new Map<string, [SkinData, number]>();
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
                    if (!contractOutcomes.has(skin.name)) {
                        contractOutcomes.set(skin.name, [skin, 0]);
                    }
                    // Type Assertion because typescript thinks it may be undefined
                    const [data, amount] = contractOutcomes.get(skin.name)!;

                    contractOutcomes.set(skin.name, [data, amount + 1]);
                }
                totalOutcomes += skinOutcomes.length;
            }

            for (const [skinName, [skin, amount]] of contractOutcomes.entries()) {
                // Sets contractOutcomes value as the percentage of getting skin
                contractOutcomes.set(skinName, [skin, amount / totalOutcomes]);
            }

            // Calculate average float of skins
            averageFloat = averageFloat.div(10);

            calculateOutcomeStats(contractOutcomes, averageFloat, false);
        }
    }

    /**
     * Calculates the outcome statistics
     * @param contractOutcomes - map of all possible outcomes from contract
     * @param averageFloat - average float of all skins in contract
     * @param isPriceChange - true if it is for recalculating outcome stats for a price change, false otherwise
     */
    function calculateOutcomeStats(contractOutcomes: Map<string, [SkinData, number]>, averageFloat: Decimal, isPriceChange: boolean): void {
        if (contract) {
            let expectedValue: Decimal = new Decimal(0);
            let variance: Decimal = new Decimal(0);
            let profitOdds: number = 0;
            const { cost } = contract;

            for (const [_skinName, [skin, percentage]] of contractOutcomes.entries()) {
                // Calculating skin's float and price
                const float = averageFloat.mul(skin.wears.max_wear - skin.wears.min_wear).add(skin.wears.min_wear);
                const floatCategory = toFloatCategory(float);
                const price = isPriceChange ? new Decimal(skin.priceInput) : new Decimal(skin.prices[floatCategory]);

                // Setting skin's float and price
                skin.priceInput = price.toNumber();
                skin.floatInput = float.toNumber();

                if (cost.lt(skin.priceInput)) {
                    profitOdds += percentage;
                }

                expectedValue = expectedValue.add(price.mul(percentage));
                variance = variance.add(price.pow(2).mul(percentage));
            }
            variance = variance.sub((expectedValue.pow(2)));

            // TODO: Fix sorting? When changing prices, the inputs don't change place
            // Sort contractOutcomes by price of outcome skin
            // contractOutcomes = new Map([...contractOutcomes.entries()].sort(
            //     ([_skin1Name, [skin1, _percentage1]], [_skin2Name, [skin2, _percentage2]]) => {
            //         return skin2.priceInput - skin1.priceInput;
            //     })
            // );

            const profitPercent = !cost.equals(0) ?
                (expectedValue.sub(cost).div(cost).mul(100)).todp(2).toString() + "%" :
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
                            {...{ handlePriceChange }} contractFunctions={{ handleFloatChange, handleDeleteClick, handleCopyClick }} /> :
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

export default TradeUp;