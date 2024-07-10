// import React, { useState } from "react";
import React from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import "./TradeUp.css"
import { SkinData, SkinsData } from "../../types/types";
// import Decimal from "decimal.js-light";

type TradeUpSearchProps = {
    skinsData: SkinsData | null;
    onSkinClick: (skin: SkinData) => void;
}

const itemsPerRow = 4; // Skins per row to display

const TradeUpSearch = ({ skinsData, onSkinClick }: TradeUpSearchProps): React.JSX.Element => {
    // const [filter, setFilter] = useState();

    /**
     * Renders the skins
     * @returns the JSX.Element that represents the skins list
     */
    function renderSkins(): JSX.Element {
        if (skinsData === null) {
            return <p>Loading skins...</p>;
        } else {
            const skinsRows: JSX.Element[] = [];
            let skinChunk: SkinData[] = [];
            let i: number = 0;

            Object.keys(skinsData).forEach(category => {
                const qualities = skinsData[category];
                for (const [_grade, skinDataArr] of Object.entries(qualities)) {
                    for(const skin of skinDataArr) {
                        skinChunk.push(skin);
                        if (skinChunk.length === itemsPerRow) {
                            skinsRows.push(
                                <SkinsRow key={i} skinsDisplay={skinChunk} onSkinClick={onSkinClick} />
                            )
                            skinChunk = [];
                            i++;
                        }
                    }
                }
            });

            if (skinChunk.length > 0) {
                skinsRows.push(
                    <SkinsRow key={i} skinsDisplay={skinChunk} onSkinClick={onSkinClick} />
                )
            }
            return <>{skinsRows}</>;
        }
    }

    return <>
        <Container className="colored-container my-3 rounded-3" fluid>
            {renderSkins()}
        </Container>
    </>;
}

export default TradeUpSearch;

type SkinsRowProps = {
    skinsDisplay: SkinData[];
    onSkinClick: (skin: SkinData) => void;
}

const SkinsRow = ({ skinsDisplay, onSkinClick }: SkinsRowProps): React.JSX.Element => {
    // Calculate the number of items per row based on the column size
    const numSkins = skinsDisplay.length;
    const numEmptySkins = (itemsPerRow - (numSkins % itemsPerRow)) % itemsPerRow;

    return <>
        <Row className="skins-row">
            {skinsDisplay.map((skinDisplay, index) => (
                <Col key={index} xs={12} sm={6} md={4} lg={3}>
                    <Skin skinDisplay={skinDisplay} onSkinClick={() => onSkinClick(skinDisplay)} />
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



type SkinProps = {
    skinDisplay: SkinData
    onSkinClick: (skin: SkinData) => void;
}

const Skin = ({ skinDisplay, onSkinClick }: SkinProps): React.JSX.Element => {
    return <>
        <Card className={"skin-card square-card " + skinDisplay.grade.split(" ").join("-").toLowerCase()} onClick={() => onSkinClick(skinDisplay)}>
            <Card.Header>{skinDisplay.name}</Card.Header>
            <Card.Img src={skinDisplay.img} alt="Card image" />
            <Card.Body>
                <Card.Text className="text-center">
                    $0 - ${skinDisplay.priceInput / 100}
                    <br />
                    Min Float:
                    <br />
                    Max Float:
                </Card.Text>
            </Card.Body>
        </Card>
    </>
}