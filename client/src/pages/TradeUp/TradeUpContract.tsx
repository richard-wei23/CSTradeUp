import React from "react";//, { ChangeEvent } from "react";
import { Contract, Outcome, SkinData } from "../../types/types";
import { Container } from "react-bootstrap";
import SkinsRow from "./SkinsRow";

type TradeUpContractProps = {
    /** Contract to load, if any */
    contract: Contract;

    /** Outcome to load, if any */
    outcome: Outcome | null;

    doPriceChange: (skinIndex: number, newPrice: number) => void;
}

// * Temporary
const itemsPerRow = 5;

const TradeUpContract = ({ contract, outcome, doPriceChange }: TradeUpContractProps): React.JSX.Element => {
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
     * Renders the skins
     * @returns JSX.Element that represents the contract skins
     */
    function renderContract(): JSX.Element {
        const contractSkins: JSX.Element[] = [];
        let skinChunk: SkinData[] = [];
        let i: number = 0;

        contract.skins.forEach((skin) => {
            skinChunk.push(skin);

            if (skinChunk.length === itemsPerRow) {
                contractSkins.push(
                    <SkinsRow key={i}
                        skinsToDisplay={skinChunk}
                        itemsPerRow={itemsPerRow}
                        skinCardType={{ kind: "contract" }}
                        doPriceChange={(skinIndex: number, newPrice: number) => doPriceChange(skinIndex, newPrice)}
                        contractFunctions={{
                            doFloatChange: () => {},
                            doRemoveClick: () => {},
                            doCopyClick: () => {}
                        }}
                    />
                )
                skinChunk = [];
                i++;
            }
        })

        if (skinChunk.length > 0) {
            contractSkins.push(
                <SkinsRow key={i}
                    skinsToDisplay={skinChunk}
                    itemsPerRow={itemsPerRow}
                    skinCardType={{ kind: "contract" }}
                    doPriceChange={(skinIndex: number, newPrice: number) => doPriceChange(skinIndex, newPrice)}
                    contractFunctions={{
                        doFloatChange: () => {},
                        doRemoveClick: () => {},
                        doCopyClick: () => {}
                    }}
                />
            )
        }
        return <>{contractSkins}</>;
    }

    /**
     * Renders the outcome skins
     * @returns JSX.Element that represents the outcome skins
     */
    function renderOutcome(): JSX.Element {
        if (outcome === null) {
            return <></>;
        }

        const outcomeSkins: JSX.Element[] = [];
        let skinChunk: SkinData[] = [];
        let percentageChunk: number[] = [];
        let i: number = 0;

        outcome.contractOutcomes.forEach((_amount, skin) => {
            skinChunk.push(skin);

            // contractOutcomes will always have skin, typescript complains
            percentageChunk.push(outcome.contractOutcomes.get(skin) ?? 0);

            if (skinChunk.length === itemsPerRow) {
                outcomeSkins.push(
                    <SkinsRow key={i}
                        skinsToDisplay={skinChunk}
                        itemsPerRow={itemsPerRow}
                        skinCardType={{ kind: "outcome" }}
                        outcomePercentages={percentageChunk}
                        doPriceChange={(skinIndex: number, newPrice: number) => doPriceChange(skinIndex, newPrice)}
                    />
                )
                skinChunk = [];
                percentageChunk = [];
                i++;
            }
        })

        if (skinChunk.length > 0) {
            outcomeSkins.push(
                <SkinsRow key={i}
                    skinsToDisplay={skinChunk}
                    itemsPerRow={itemsPerRow}
                    skinCardType={{ kind: "outcome" }}
                    outcomePercentages={percentageChunk}
                    doPriceChange={(skinIndex: number, newPrice: number) => doPriceChange(skinIndex, newPrice)}
                />
            )
        }
        return <>{outcomeSkins}</>;
    }

    return <>
        <Container className="colored-container my-3 py-0 rounded-3" fluid>
            <div>
                {renderContract()}
                Cost = {contract.cost.toString()}
                <br />
                E[V] = {outcome?.expectedValue.todp(2).toString() + ` (${outcome?.profitPercent})`}
                <br />
                Profit = {outcome?.expectedValue.sub(contract.cost).todp(2).toString()}
                <br />
                Var(X) = {outcome?.variance.todp(2).toString()}
                <br />
                Average Float = {outcome?.averageFloat.toPrecision(11).toString()}
                {renderOutcome()}
                <br />
                Profit Odds =
            </div>
        </Container>
    </>;
}

export default TradeUpContract;