// import React, { useState } from "react";
import React from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import "./TradeUp.css"
import { Quality, SkinData } from "../../types/types";
// import Decimal from "decimal.js-light";

type TradeUpSearchProps = {
    skinsData: Map<string, Map<Quality, SkinData[]>> | null;
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
            skinsData.forEach((qualityMap) => {
                qualityMap.forEach((skinDataArr) => {
                    skinDataArr.forEach((skin) => {
                        skinChunk.push(skin);
                        if (skinChunk.length === itemsPerRow) {
                            skinsRows.push(
                                <SkinsRow key={i} skins={skinChunk} onSkinClick={onSkinClick} />
                            )
                            skinChunk = [];
                            i++;
                        }
                    });
                });
            });
            if (skinChunk.length > 0) {
                skinsRows.push(
                    <SkinsRow key={i} skins={skinChunk} onSkinClick={onSkinClick} />
                )
            }
            return <>{skinsRows}</>;
        }
    }

    return <>
        <Container className="colored-container my-3 rounded-3" fluid>
            {renderSkins()}
            {/* <SkinsRow skins={[]} onSkinClick={onSkinClick} /> */}
            {/* <SkinsRow skins={[tempSkin, tempSkin, tempSkin, tempSkin, tempSkin]} onSkinClick={onSkinClick} />
            <SkinsRow skins={[tempSkin, tempSkin, tempSkin, tempSkin, tempSkin]} onSkinClick={onSkinClick} />
            <SkinsRow skins={[tempSkin, tempSkin, tempSkin, tempSkin, tempSkin]} onSkinClick={onSkinClick} />
            <SkinsRow skins={[tempSkin, tempSkin, tempSkin, tempSkin, tempSkin]} onSkinClick={onSkinClick} />
            <SkinsRow skins={[tempSkin, tempSkin, tempSkin, tempSkin, tempSkin]} onSkinClick={onSkinClick} /> */}
        </Container>
    </>;
}

export default TradeUpSearch;

// const tempSkin: SkinData = {
//     name: "M4A4 | Eye of Horus",
//     quality: "Covert",
//     collection: "Anubis Collection Package",
//     img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhnwMzFJTwW0863q4yCkP_gfeLVxjsIvMd13-_A89SgjlHm_EpkYmj1LYXGIwE9YAzUrwDox7_q08Si_MOel8T8omw/512fx384f",
//     stattrak: false,
//     wears: {
//         min_wear: 0.0,
//         max_wear: 0.7
//     },
//     prices: {
//         "Factory New": "561.21",
//         "Minimal Wear": "348.00",
//         "Field-Tested": "185.28",
//         "Well-Worn": "153.28",
//         "Battle-Scarred": "100.92",
//         "StatTrak Factory New": "1,953.03",
//         "StatTrak Minimal Wear": "1,012.09",
//         "StatTrak Field-Tested": "406.13",
//         "StatTrak Well-Worn": "320.45",
//         "StatTrak Battle-Scarred": "206.43"
//     },
//     floatInput: new Decimal(0.4),
//     priceInput: 561.21,
// }

type SkinsRowProps = {
    skins: SkinData[];
    onSkinClick: (skin: SkinData) => void;
}

const SkinsRow = ({ skins, onSkinClick }: SkinsRowProps): React.JSX.Element => {
    // Calculate the number of items per row based on the column size
    const numSkins = skins.length;
    const numEmptySkins = (itemsPerRow - (numSkins % itemsPerRow)) % itemsPerRow;

    return <>
        <Row className="skins-row">
            {skins.map((skin, index) => (
                <Col key={index} xs={12} sm={6} md={4} lg={3}>
                    <Skin skin={skin} onSkinClick={() => onSkinClick(skin)} />
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
    skin: SkinData
    onSkinClick: (skin: SkinData) => void;
}

const Skin = ({ skin, onSkinClick }: SkinProps): React.JSX.Element => {
    return <>
        <Card className="skin-card square-card" onClick={() => onSkinClick(skin)}>
            <Card.Header>{skin.name}</Card.Header>
            <Card.Img src={skin.img} alt="Card image" />
            <Card.Body>
                <Card.Text className="text-center">
                    $0 - ${skin.priceInput}
                    <br />
                    Min Float:
                    <br />
                    Max Float:
                </Card.Text>
            </Card.Body>
        </Card>
    </>
}