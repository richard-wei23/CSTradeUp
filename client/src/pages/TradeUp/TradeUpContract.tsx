import React from "react";//, { ChangeEvent } from "react";
import { Contract, Outcome, SkinData } from "../../types/types";
import { Container } from "react-bootstrap";
import SkinsRow from "./SkinsDisplay";

type TradeUpContractProps = {
    /** Contract to load, if any */
    contract: Contract;

    /** Outcome to load, if any */
    outcome: Outcome | null;
}

// * Temporary
const itemsPerRow = 5;

const TradeUpContract = ({ contract, outcome }: TradeUpContractProps): React.JSX.Element => {
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
     * @returns the JSX.Element that represents the skins list
     */
    function renderContract(): JSX.Element {
        const contractSkins: JSX.Element[] = [];
        let skinChunk: SkinData[] = [];
        let i: number = 0;

        contract.skins.forEach((skin) => {
            skinChunk.push(skin);

            if (skinChunk.length === itemsPerRow) {
                contractSkins.push(
                    <SkinsRow key={i} skinsToDisplay={skinChunk} itemsPerRow={itemsPerRow} />
                )
                skinChunk = [];
                i++;
            }
        })

        if (skinChunk.length > 0) {
            contractSkins.push(
                <SkinsRow key={i} skinsToDisplay={skinChunk} itemsPerRow={itemsPerRow} />
            )
        }
        return <>{contractSkins}</>;
    }

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
            percentageChunk.push(outcome.contractOutcomes.get(skin) ?? 0);

            if (skinChunk.length === itemsPerRow) {
                outcomeSkins.push(
                    <SkinsRow key={i} skinsToDisplay={skinChunk} itemsPerRow={itemsPerRow} outcomePercentages={percentageChunk}/>
                )
                skinChunk = [];
                percentageChunk = [];
                i++;
            }
        })

        if (skinChunk.length > 0) {
            outcomeSkins.push(
                <SkinsRow key={i} skinsToDisplay={skinChunk} itemsPerRow={itemsPerRow} outcomePercentages={percentageChunk}/>
            )
        }
        return <>{outcomeSkins}</>;
    }

    return <>
        <Container className="colored-container my-3 py-0 rounded-3" fluid>
            <div>
                {renderContract()}
                Cost = {contract.cost.div(100).toString()}
                <br />
                E[V] = {outcome?.expectedValue.todp(2).toString()}
                <br />
                Profit = {outcome?.expectedValue.sub(contract.cost.div(100)).todp(2).toString()}
                <br />
                Var(X) = {outcome?.variance.todp(2).toString()}
                {renderOutcome()}
            </div>
        </Container>
    </>;
}

export default TradeUpContract;