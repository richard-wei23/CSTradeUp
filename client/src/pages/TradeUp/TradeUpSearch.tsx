import React from "react";
import { Container } from "react-bootstrap";
import { SkinData, SkinsData } from "../../types/types";
import "../../assets/styles/TradeUp.css"
import SkinsRow from "./SkinsRow";
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

                let sliceToQuality = 0;
                const qualitiesArr = Object.values(qualities);
                while (qualitiesArr[sliceToQuality].length === 0) {
                    sliceToQuality++;
                }

                for (const [quality, skinDataArr] of Object.entries(qualities).slice(sliceToQuality + 1, 6)) {
                    if (quality.startsWith(filter.quality)) {
                        const filteredSkinData = skinDataArr.filter((skin) =>
                            skin.name.toLowerCase().includes(filter.includesString)
                        );
                        filteredSkinData.forEach((skin) => {
                            skinChunk.push(skin);

                            if (skinChunk.length === itemsPerRow) {
                                skinsRows.push(
                                    <SkinsRow key={i}
                                        skinsToDisplay={skinChunk}
                                        itemsPerRow={itemsPerRow}
                                        skinCardType={{ kind: "display" }}
                                        onSkinClick={onSkinClick}
                                    />
                                )
                                skinChunk = [];
                                i++;
                            }
                        });
                    }
                }
            });

            if (skinChunk.length > 0) {
                skinsRows.push(
                    <SkinsRow key={i} skinsToDisplay={skinChunk} itemsPerRow={itemsPerRow} skinCardType={{ kind: "display" }} onSkinClick={onSkinClick} />
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