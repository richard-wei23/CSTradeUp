import { Card, Col, Row } from "react-bootstrap";
import { SkinData } from "../../types/types";
import React from "react";
import LazyLoad from 'react-lazy-load';

type SkinsRowProps = {
    skinsToDisplay: SkinData[];
    itemsPerRow: number;
    onSkinClick: (skin: SkinData) => void;
}

const SkinsRow = ({ skinsToDisplay, itemsPerRow, onSkinClick }: SkinsRowProps): React.JSX.Element => {
    // Calculates the number of items per row based on the column size
    const numSkins = skinsToDisplay.length;
    const numEmptySkins = (itemsPerRow - (numSkins % itemsPerRow)) % itemsPerRow;

    return <>
        <Row className={`skins-row g-${itemsPerRow}`}>
            {skinsToDisplay.map((skinsToDisplay, index) => (
                <Col key={index} style={{ "width": `${100/itemsPerRow}%` }} xs={12} sm={6} md={4} lg={3}>
                    <Skin skinDisplay={skinsToDisplay} onSkinClick={() => onSkinClick(skinsToDisplay)} />
                </Col>
            ))}
            {Array.from({ length: numEmptySkins }).map((_, index) => (
                <Col key={`empty-${index}`} xs={12} sm={6} md={4} lg={3}>
                    <div className="empty-skin"></div>
                </Col>
            ))}
        </Row>
    </>;
}

export default SkinsRow;

type SkinProps = {
    skinDisplay: SkinData
    onSkinClick: (skin: SkinData) => void;
}

const Skin = ({ skinDisplay, onSkinClick }: SkinProps): React.JSX.Element => {
    return <>
        <Card className={`skin-card h-100 py-2 square-card ${skinDisplay.quality.split(" ").join("-").toLowerCase()}`} onClick={() => onSkinClick(skinDisplay)}>
            <Card.Header className="py-1">{skinDisplay.name}</Card.Header>
            <LazyLoad offset={300} >
                <Card.Img src={skinDisplay.img} alt="Skin Image" />
            </LazyLoad>
            <Card.Body className="py-0">
                <Card.Text className="text-center">
                    {/* ${Decimal.div(skinDisplay.priceInput.div, 100).toNumber()} */}

                </Card.Text>
            </Card.Body>
        </Card>
    </>
}