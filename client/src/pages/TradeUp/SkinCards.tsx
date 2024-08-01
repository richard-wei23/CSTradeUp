import { Form, InputGroup } from "react-bootstrap";
import { SkinData } from "../../types/types";
import BaseSkinCard from "./BaseSkinCard";
import React, { ChangeEvent } from "react";

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
    handlePriceChange: (e: ChangeEvent<HTMLInputElement>, skin: SkinData) => void;
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
    handlePriceChange: (e: ChangeEvent<HTMLInputElement>, skin: SkinData) => void;
    index: number;
    contractFunctions: {
        doFloatChange: () => void;
        doRemoveClick: () => void;
        doCopyClick: () => void;
    }

}

const SkinContract = ({ skinDisplay, index, handlePriceChange }: SkinContractProps): JSX.Element => {
    return <>
        <BaseSkinCard skinDisplay={skinDisplay}
            bodyContent={<div>
                {skinDisplay.floatInput.toFixed(11)}
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id={`price-${index}`}>$</InputGroup.Text>
                    <Form.Control
                        defaultValue={skinDisplay.priceInput.toString()}
                        aria-label="Price"
                        aria-describedby={`price-${index}`}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handlePriceChange(e, skinDisplay)}
                    />
                </InputGroup>
            </div>}
        />
    </>
}

export { SkinDisplay, SkinOutcome, SkinContract };