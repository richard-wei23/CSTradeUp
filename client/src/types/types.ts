import Decimal from "decimal.js-light";

export type SkinsData = {
    readonly [collection: string]: {
        [quality in Quality]: SkinData[];
    }
}

export type Contract = {
    skins: SkinData[];
    cost: Decimal;
}

// TODO: Change contract outcomes to use the skin's name instead for custom pricing
export type Outcome = {
    contractOutcomes: Map<SkinData, number>;
    readonly expectedValue: Decimal;
    readonly profitPercent: string;
    readonly variance: Decimal;
    readonly averageFloat: Decimal;
    readonly profitOdds: number;
}

export type SkinData = {
    readonly name: string;
    readonly quality: Quality;
    readonly collection: string;
    readonly img: string;
    readonly stattrak: boolean;
    readonly wears: {
        min_wear: number;
        max_wear: number;
    };
    readonly prices: {
        [float: string]: string;
    };
    floatInput: number;
    priceInput: number;
}

export type SkinCardType = {kind: "display"} | {kind: "contract"} | {kind: "outcome"}

export type Quality =
    "Covert" |
    "Classified" |
    "Restricted" |
    "Mil-Spec" |
    "Industrial Grade" |
    "Consumer Grade"

export const tohigherQuality = (quality: Quality): Quality | null => {
    if (quality == "Consumer Grade") {
        return "Industrial Grade";
    } else if (quality == "Industrial Grade") {
        return "Mil-Spec";
    } else if (quality == "Mil-Spec") {
        return "Restricted";
    } else if (quality == "Restricted") {
        return "Classified";
    } else if (quality == "Classified") {
        return "Covert";
    } else {
        console.error("Invalid Quality");
        return null;
    }
}

export const toFloatCategory = (float: Decimal): string => {
    if (float.lte(0.07)) {
        return "Factory New";
    } else if (float.lte(0.15)) {
        return "Minimal Wear";
    } else if (float.lte(0.37)) {
        return "Field-Tested";
    } else if (float.lte(0.44)) {
        return "Well-Worn";
    } else {
        return "Battle-Scarred";
    }
}