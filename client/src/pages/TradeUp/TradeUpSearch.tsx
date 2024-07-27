import React from "react";
import { Container} from "react-bootstrap";
import { SkinData, SkinsData } from "../../types/types";
import "../../assets/styles/TradeUp.css"
import SkinsRow from "./SkinsDisplay";
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

                // TODO: Consider when there aren't skins in higher quality (eg. Bank Collection w/o covert skins)
                for (const [quality, skinDataArr] of Object.entries(qualities).slice(1, 6)) {
                    if (quality.startsWith(filter.quality)) {
                        skinDataArr.forEach((skin) => {
                            if (skin.name.toLowerCase().includes(filter.includesString)) {
                                skinChunk.push(skin);

                                if (skinChunk.length === itemsPerRow) {
                                    skinsRows.push(
                                        <SkinsRow key={i} skinsToDisplay={skinChunk} itemsPerRow={itemsPerRow} onSkinClick={onSkinClick} />
                                    )
                                    skinChunk = [];
                                    i++;
                                }
                            }
                        });
                    }
                }
            });

            if (skinChunk.length > 0) {
                skinsRows.push(
                    <SkinsRow key={i} skinsToDisplay={skinChunk} itemsPerRow={itemsPerRow} onSkinClick={onSkinClick} />
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