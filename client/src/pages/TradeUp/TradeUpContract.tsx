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
     * Transforms outcome data into skin and percentage arrays
     * @param contractOutcomes - outcomes of the contract
     * @returns skin and percentage arrays
     */
    function transformOutcomeData(contractOutcomes: Map<string, [SkinData, number]>): { outcomeSkins: SkinData[], outcomePercentages: number[] } {
        const outcomeSkins: SkinData[] = [];
        const outcomePercentages: number[] = [];

        contractOutcomes.forEach(([skin, percentage]) => {
            outcomeSkins.push(skin);
            outcomePercentages.push(percentage);
        });

        return { outcomeSkins, outcomePercentages };
    };

    const { outcomeSkins, outcomePercentages } = outcome ? transformOutcomeData(outcome.contractOutcomes) : { outcomeSkins: [], outcomePercentages: [] };

    /**
     * Creates a SkinsRow instance of given skins
     * @param skins - skins to render
     * @param key - key in row
     * @param isOutcome - true if skins are for the outcome, false otherwise
     * @param percentages - likelihood of getting outcome skins
     * @returns SkinsRow instance
     */
    function createSkinsRow(skins: SkinData[], key: number, isOutcome: boolean, percentages?: number[]): JSX.Element {
        return (
            <SkinsRow
                key={key}
                skinsToDisplay={skins}
                itemsPerRow={itemsPerRow}
                skinCardType={{ kind: isOutcome ? "outcome" : "contract" }}
                outcomePercentages={percentages}
                {...{ handlePriceChange }}
                contractFunctions={{
                    handleFloatChange,
                    doRemoveClick: () => { },
                    doCopyClick: () => { }
                }}
            />
        );
    };

    /**
     * Renders the skins for contract and outcome
     * @returns JSX.Element that represents the skins to render
     */
    function renderSkinsRows(skins: SkinData[], isOutcome: boolean, percentages?: number[]): JSX.Element[] {
        const rows: JSX.Element[] = [];
        let skinChunk: SkinData[] = [];
        let percentageChunk: number[] = [];
        let i = 0;

        skins.forEach((skin, index) => {
            skinChunk.push(skin);
            if (isOutcome && percentages) {
                percentageChunk.push(percentages[index]);
            }

            if (skinChunk.length === itemsPerRow) {
                rows.push(createSkinsRow(skinChunk, i, isOutcome, percentageChunk));
                skinChunk = [];
                percentageChunk = [];
                i++;
            }
        });

        if (skinChunk.length > 0) {
            rows.push(createSkinsRow(skinChunk, i, isOutcome, percentageChunk));
        }

        return rows;
    };

    /**
     * Renders outcome details
     * @returns element of outcome statistics
     */
    function renderOutcomeDetails(): JSX.Element {
        if (!outcome) {
            return <></>;
        }

        const { expectedValue, profitPercent, variance, averageFloat, profitOdds } = outcome;

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
                {renderSkinsRows(contract.skins, false)}
                {renderOutcomeDetails()}
                {outcome && renderSkinsRows(outcomeSkins, true, outcomePercentages)}
            </div>
        </Container>
    </>;
}

export default TradeUpContract;