import { Card, Form, InputGroup } from "react-bootstrap";
import { SkinData } from "../../types/types";
import BaseSkinCard from "./BaseSkinCard";
import React, { ChangeEvent } from "react";

type SkinDisplayProps = {
    skinDisplay: SkinData
    onSkinClick: (skin: SkinData) => void;
}

const SkinDisplay = ({ skinDisplay, onSkinClick }: SkinDisplayProps): JSX.Element => {
    return <>
        <BaseSkinCard
            skinDisplay={skinDisplay}
            onSkinClick={() => onSkinClick(skinDisplay)}
            bodyContent={<Card.Text className="text-center">
                {skinDisplay.priceInput.toFixed(2)}
            </Card.Text>
            }
        />
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
                <Card.Text className="text-center">
                    {skinDisplay.priceInput.toFixed(2)}
                </Card.Text>
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
        handleFloatChange: (e: ChangeEvent<HTMLInputElement>, skin: SkinData) => void;
        doRemoveClick: () => void;
        doCopyClick: () => void;
    }

}

const SkinContract = ({ skinDisplay, index, handlePriceChange, contractFunctions }: SkinContractProps): JSX.Element => {
    const { handleFloatChange, doRemoveClick, doCopyClick } = contractFunctions;
    doRemoveClick;
    doCopyClick;

    return <>
        <BaseSkinCard skinDisplay={skinDisplay}
            bodyContent={<div>
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id={`price-${index}`}>$</InputGroup.Text>
                    <Form.Control
                        defaultValue={skinDisplay.priceInput.toString()}
                        type="number"
                        aria-label="Price"
                        aria-describedby={`price-${index}`}
                        min="0"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handlePriceChange(e, skinDisplay)}
                    />
                </InputGroup>
                <InputGroup size="sm" className="mb-1">
                    <Form.Control
                        defaultValue={skinDisplay.floatInput.toFixed(11)}
                        type="number"
                        aria-label="Float"
                        min={skinDisplay.wears.min_wear.toString()}
                        max={skinDisplay.wears.max_wear.toString()}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleFloatChange(e, skinDisplay)}
                    />
                </InputGroup>
            </div>}
        />
    </>
}

export { SkinDisplay, SkinOutcome, SkinContract };