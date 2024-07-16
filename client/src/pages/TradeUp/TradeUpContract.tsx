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
        {outcome?.expectedValue}
        <br />
        {outcome?.variance}
    </>;
}

export default TradeUpContract;