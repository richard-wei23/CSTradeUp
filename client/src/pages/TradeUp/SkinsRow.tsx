import { Col, Row } from "react-bootstrap";
import { SkinCardType, SkinData } from "../../types/types";
import React, { ChangeEvent } from "react";
import { SkinContract, SkinDisplay, SkinOutcome } from "./SkinCards";
// import LazyLoad from 'react-lazy-load';

type SkinsRowProps = {
    skinsToDisplay: SkinData[];
    itemsPerRow: number;
    skinCardType: SkinCardType;
    onSkinClick?: (skin: SkinData) => void;
    outcomePercentages?: number[];
    handlePriceChange?: (e: ChangeEvent<HTMLInputElement>, skin: SkinData) => void;
    contractFunctions?: {
        handleFloatChange: (e: ChangeEvent<HTMLInputElement>, skin: SkinData) => void;
        handleDeleteClick: (skin: SkinData) => void;
        handleCopyClick: (skin: SkinData) => void;
    };
}

const SkinsRow = ({ skinsToDisplay, itemsPerRow, skinCardType, onSkinClick, outcomePercentages, handlePriceChange, contractFunctions }: SkinsRowProps): React.JSX.Element => {
    // Calculates the number of items per row based on the column size
    const numSkins = skinsToDisplay.length;
    const numEmptySkins = (itemsPerRow - (numSkins % itemsPerRow)) % itemsPerRow;

    function renderSkinCard(skin: SkinData, index: number): JSX.Element {
        switch (skinCardType.kind) {
            case "display":
                return onSkinClick ? <SkinDisplay skinDisplay={skin} onSkinClick={() => onSkinClick(skin)} /> : <></>;
            case "outcome":
                return outcomePercentages && handlePriceChange ?
                    <SkinOutcome
                        skinDisplay={skin}
                        outcomePercentage={outcomePercentages[index]}
                        {...{handlePriceChange}} />
                    : <></>;
            case "contract":
                return contractFunctions && handlePriceChange ?
                    <SkinContract
                        skinDisplay={skin}
                        index={index}
                        {...{handlePriceChange}}
                        {...{contractFunctions}}
                    />
                    : <></>;
            default:
                return <></>;
        }
    };

    return <>
        <Row className={`skins-row g-3`}>
            {skinsToDisplay.map((skin, index) => (
                <Col key={index} style={{ "width": `${100 / itemsPerRow}%` }} xs={12} sm={6} md={4} lg={3}>
                    {renderSkinCard(skin, index)}
                </Col>
            ))}
            {Array.from({ length: numEmptySkins }).map((_, index) => (
                <Col key={`empty-${index}`} xs={12} sm={6} md={4} lg={3}>
                </Col>
            ))}
        </Row>
    </>;
}

export default SkinsRow;