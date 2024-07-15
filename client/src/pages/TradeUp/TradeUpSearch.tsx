import React from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import { SkinData, SkinsData } from "../../types/types";
import LazyLoad from 'react-lazy-load';
import "../../assets/styles/TradeUp.css"
// import Decimal from "decimal.js-light";

type TradeUpSearchProps = {
    skinsData: SkinsData | null;
    filter: { quality: string, includesString: string };
    onSkinClick: (skin: SkinData) => void;
}

const itemsPerRow = 4; // Skins per row to display

const TradeUpSearch = ({ skinsData, filter, onSkinClick }: TradeUpSearchProps): React.JSX.Element => {
    filter.includesString = filter.includesString.toLowerCase();

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
                for (const [quality, skinDataArr] of Object.entries(qualities).slice(1, 6)) {
                    if (filter.quality === "" || quality.startsWith(filter.quality)) {
                        for (const skin of skinDataArr) {
                            if (skin.name.toLowerCase().includes(filter.includesString)) {
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
        <Container className="colored-container my-3 py-0 rounded-3" fluid>
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
        <Row className="skins-row g-4">
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
        <Card className={"skin-card h-100 py-2 square-card " + skinDisplay.quality.split(" ").join("-").toLowerCase()} onClick={() => onSkinClick(skinDisplay)}>
            <Card.Header className="py-1">{skinDisplay.name}</Card.Header>
            <LazyLoad offset={300} >
                <Card.Img src={skinDisplay.img} alt="Skin Image" />
            </LazyLoad>
            <Card.Body className="py-0">
                <Card.Text className="text-center">
                    ${skinDisplay.priceInput / 100}

                </Card.Text>
            </Card.Body>
        </Card>
    </>
}