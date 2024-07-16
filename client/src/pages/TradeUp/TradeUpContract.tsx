import React, { useEffect, useState } from "react";//, { ChangeEvent } from "react";
import { Contract, Outcome, SkinData, SkinsData, tohigherQuality } from "../../types/types";
import { Container } from "react-bootstrap";
import SkinsRow from "./SkinsDisplay";

type TradeUpContractProps = {
    /** Contract to load, if any */
    loadContract: Contract;

    /** Outcome to load, if any */
    loadOutcome: Outcome | null;

    skinsData: SkinsData | null;
}

// * Temporary
const itemsPerRow = 5;

const TradeUpContract = ({ loadContract, loadOutcome, skinsData }: TradeUpContractProps): React.JSX.Element => {
    const [outcome, setOutcome] = useState<Outcome | null>(loadOutcome);

    // function handleSkinClick(skinIndex: MouseEvent) {
    //     const newContract = contract;
    //     calculateContract(newContract);
    // }

    // function handleSkinCopyClick(skinIndex: number) {
    //     if (contract.skins.length < 10) {
    //         handleSkinClick
    //     } else {

    //     }
    // }

    // function handleSkinPriceFloatChange(evt: ChangeEvent) {

    // }

    /**
     * Calculates contract outcome if there are enough skins inputted
     * @param {Contract} newContract - Contract to calculate the outcome of
     * @returns {Outcome | null} - returns Outcome if enough skins are inputted, otherwise null
     */
    function calculateOutcome(): void {
        console.log("Calculating outcome...");
        if (loadContract.skins.length !== 10 || skinsData === null) {
            setOutcome(null);
            console.log("Insufficient skins or skins data not loaded.");
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
                const skinOutcomes = collection[higherQuality];

                for (const skin of skinOutcomes) {
                    if (!contractOutcomes.has(skin)) {
                        contractOutcomes.set(skin, 0);
                        totalOutcomes++;
                    }
                    // Type Assertion because typescript thinks it may be undefined
                    contractOutcomes.set(skin, contractOutcomes.get(skin)! + 1);
                }
            }

            let expectedValue: number = 0;
            let variance: number = 0;
            for (const [skin, amount] of contractOutcomes.entries()) {
                expectedValue += skin.priceInput * (amount / totalOutcomes);
                variance += (skin.priceInput ** 2) * (amount / totalOutcomes);
            }
            variance -= (expectedValue ** 2);

            setOutcome({
                contractOutcomes,
                expectedValue,
                variance
            });
            console.log(outcome)
        }
    }

    /**
     * Use useEffect 
     */
    useEffect(() => {
        console.log("hi")
        calculateOutcome();
    }, [loadContract.skins]);

    /**
     * Renders the skins
     * @returns the JSX.Element that represents the skins list
     */
    function renderContract(): JSX.Element {
        const contractSkins: JSX.Element[] = [];
        let skinChunk: SkinData[] = [];
        let i: number = 0;

        loadContract.skins.forEach((skin) => {
            skinChunk.push(skin);

            if (skinChunk.length === itemsPerRow) {
                contractSkins.push(
                    <SkinsRow key={i} skinsToDisplay={skinChunk} itemsPerRow={itemsPerRow} onSkinClick={(Skin) => { Skin }} />
                )
                skinChunk = [];
                i++;
            }
        })

        if (skinChunk.length > 0) {
            contractSkins.push(
                <SkinsRow key={i} skinsToDisplay={skinChunk} itemsPerRow={itemsPerRow} onSkinClick={(Skin) => { Skin }} />
            )
        }
        return <>{contractSkins}</>;
    }

    return <>
        <Container className="colored-container my-3 py-0 rounded-3" fluid>
            {renderContract()}
        </Container>
    </>;
}

export default TradeUpContract;