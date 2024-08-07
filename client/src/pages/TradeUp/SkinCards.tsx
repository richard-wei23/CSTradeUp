import { Button, Card, Form, InputGroup } from "react-bootstrap";
import { SkinData, toFloatCategory } from "../../types/types";
import BaseSkinCard from "./BaseSkinCard";
import React, { ChangeEvent } from "react";
import Decimal from "decimal.js-light";

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

const SkinOutcome = ({ skinDisplay, outcomePercentage, handlePriceChange }: SkinOutcomeProps): JSX.Element => {
    return <>
        <BaseSkinCard
            skinDisplay={skinDisplay}
            headerContent={
                <p>({toFloatCategory(new Decimal(skinDisplay.floatInput))})</p>
            }
            bodyContent={<div>
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id={`price`}>$</InputGroup.Text>
                    <Form.Control
                        defaultValue={skinDisplay.priceInput.toFixed(2)}
                        type="number"
                        aria-label="Price"
                        aria-describedby={`price`}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handlePriceChange(e, skinDisplay)}
                    />
                </InputGroup>
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
        handleDeleteClick: (skin: SkinData) => void;
        handleCopyClick: (skin: SkinData) => void;
    }

}

const SkinContract = ({ skinDisplay, index, handlePriceChange, contractFunctions }: SkinContractProps): JSX.Element => {
    const { handleFloatChange, handleDeleteClick, handleCopyClick } = contractFunctions;

    return <>
        <BaseSkinCard skinDisplay={skinDisplay}
            headerContent={
                <>
                    <p>({toFloatCategory(new Decimal(skinDisplay.floatInput))})</p>
                    <>
                        <Button onClick={() => handleCopyClick(skinDisplay)} variant="primary" size="sm">Copy</Button>{" "}
                        <Button onClick={() => handleDeleteClick(skinDisplay)} variant="primary" size="sm">Delete</Button>
                    </>
                </>

            }
            bodyContent={<>
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id={`price`}>$</InputGroup.Text>
                    <Form.Control
                        key={`price-${index}-${skinDisplay.floatInput}`}
                        defaultValue={skinDisplay.priceInput.toFixed(2)}
                        type="number"
                        aria-label="Price"
                        aria-describedby={`price`}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handlePriceChange(e, skinDisplay)}
                    />
                </InputGroup>
                <InputGroup size="sm" className="mb-1">
                    <Form.Control
                        defaultValue={skinDisplay.floatInput.toFixed(11)}
                        type="number"
                        aria-label="Float"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleFloatChange(e, skinDisplay)}
                    />
                </InputGroup>
            </>}
        />
    </>
}

export { SkinDisplay, SkinOutcome, SkinContract };