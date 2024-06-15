// import React, { ChangeEvent, useEffect, useState } from "react";
// import { Contract, Outcome, Skin } from "../../types/types";
// import { TradeUpProps } from "./TradeUp";


// const TradeUpCalculator = ({ loadContract, loadOutcome }: TradeUpProps): React.JSX.Element => {
//     const [outcome, setOutcome] = useState<Outcome | undefined>(loadOutcome);

//     // function handleSkinClick(skinIndex: MouseEvent) {
//     //     const newContract = contract;
//     //     calculateContract(newContract);
//     // }

//     function handleSkinCopyClick(skinIndex: number) {
//         if (contract.skins.length < 10) {
//             const newContract = contract;
//             newContract.skins[skinIndex + 1] = newContract.skins[skinIndex];
//             calculateContract(newContract);
//         } else {

//         }
//     }

//     function handleSkinPriceFloatChange(evt: ChangeEvent) {

//         const newContract = contract;
//         calculateContract(newContract);
//     }

//     /**
//      * Calculates contract outcome if there are enough skins inputted
//      * @param {Contract} newContract - Contract to calculate the outcome of
//      * @returns {Outcome | undefined} - returns Outcome if enough skins are inputted, otherwise undefined
//      */
//     function calculateContract(newContract: Contract): Outcome | undefined {
//         setContract(newContract);
//         if (contract.skins.length !== 10) {
//             return undefined;
//         } else {
//             let skinOutcomes: Map<Skin, number> = new Map<Skin, number>();
//             for (const skin of contract.skins) {
//                 // find outcomes from skin.collection
//                 // set price and probability
//             }

//             let expectedValue: number = 0;
//             let variance: number = 0;
//             for (const entry of skinOutcomes.entries()) {
//                 expectedValue += entry[0].price * entry[1];
//                 variance += (entry[0].price ** 2) * entry[1];
//             }
//             variance -= (expectedValue ** 2);

//             setOutcome({
//                 skinOutcomes,
//                 expectedValue,
//                 variance
//             });
//         }
//     }

//     return <></>;
// }

// export default TradeUpCalculator;