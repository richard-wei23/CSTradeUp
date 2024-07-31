import { SkinData } from "../../types/types";
import BaseSkinCard from "./BaseSkinCard";
import React from "react";

type SkinDisplayProps = {
    skinDisplay: SkinData
    onSkinClick: (skin: SkinData) => void;
}

const SkinDisplay = ({ skinDisplay, onSkinClick }: SkinDisplayProps): JSX.Element => {
    return <>
        <BaseSkinCard skinDisplay={skinDisplay} onSkinClick={() => onSkinClick(skinDisplay)} />
    </>
}


type SkinOutcomeProps = {
    skinDisplay: SkinData
    outcomePercentage: number;
    doPriceChange: (skinIndex: number, newPrice: number) => void;
}

const SkinOutcome = ({ skinDisplay, outcomePercentage }: SkinOutcomeProps): JSX.Element => {
    return <>
        <BaseSkinCard
            skinDisplay={skinDisplay}
            bodyContent={<div>
                {skinDisplay.floatInput.toFixed(11)}
                <br />
                {(outcomePercentage * 100).toFixed(2) + "%"}
            </div>}
        />
    </>
}


type SkinContractProps = {
    skinDisplay: SkinData;
    doPriceChange: (skinIndex: number, newPrice: number) => void;
    contractFunctions: {
        doFloatChange: () => void;
        doRemoveClick: () => void;
        doCopyClick: () => void;
    }

}

const SkinContract = ({ skinDisplay }: SkinContractProps): JSX.Element => {
    return <>
        <BaseSkinCard skinDisplay={skinDisplay}
            bodyContent={<div>
                {skinDisplay.floatInput.toFixed(11)}
            </div>}
        />
    </>
}

export { SkinDisplay, SkinOutcome, SkinContract };