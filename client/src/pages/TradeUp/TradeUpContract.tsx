import React, { ChangeEvent } from "react";//, { ChangeEvent } from "react";
import { Contract, Outcome, SkinData } from "../../types/types";
import { Container } from "react-bootstrap";
import SkinsRow from "./SkinsRow";

type TradeUpContractProps = {
    /** Contract to load, if any */
    contract: Contract;

    /** Outcome to load, if any */
    outcome: Outcome | null;

    handlePriceChange: (e: ChangeEvent<HTMLInputElement>, skin: SkinData) => void;

    handleFloatChange: (e: ChangeEvent<HTMLInputElement>, skin: SkinData) => void;
}

// * Temporary
const itemsPerRow = 5;

const TradeUpContract = ({ contract, outcome, handlePriceChange, handleFloatChange }: TradeUpContractProps): React.JSX.Element => {
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
                        {...{ handlePriceChange }}
                        contractFunctions={{
                            handleFloatChange,
                            doRemoveClick: () => { },
                            doCopyClick: () => { }
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
                    {...{ handlePriceChange }}
                    contractFunctions={{
                        handleFloatChange,
                        doRemoveClick: () => { },
                        doCopyClick: () => { }
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
                        {...{ handlePriceChange }}
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
                    {...{ handlePriceChange }}
                />
            )
        }
        return <>{outcomeSkins}</>;
    }

    function renderOutcomeDetails(): JSX.Element {
        if (!outcome) {
            return <></>;
        }

        const { expectedValue, profitPercent, variance, averageFloat, profitOdds } = { ...outcome };

        return <>
            Cost = {contract.cost.todp(2).toString()}
            <br />
            E[V] = {expectedValue.todp(2).toString() + ` (${profitPercent})`}
            <br />
            Profit = {expectedValue.sub(contract.cost).todp(2).toString()}
            <br />
            Var(X) = {variance.todp(2).toString()}
            <br />
            Average Float = {averageFloat.toPrecision(11).toString()}
            <br />
            Profit Odds = {profitOdds * 100 + "%"}
        </>;
    }

    return <>
        <Container className="colored-container my-3 py-0 rounded-3" fluid>
            <div>
                {renderContract()}
                {renderOutcomeDetails()}
                {renderOutcome()}
            </div>
        </Container>
    </>;
}

export default TradeUpContract;