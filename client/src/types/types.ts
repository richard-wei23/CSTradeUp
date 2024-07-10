import Decimal from "decimal.js-light";

export type SkinsData = {
    [collection: string]: {
        [grade in Grade]: SkinData[];
    }
}

export type Contract = {
    skins: SkinData[];
    cost: number;
}

export type Outcome = {
    skinOutcomes: Map<SkinData, number>;
    expectedValue: number;
    variance: number;
}

export type SkinData = {
    readonly name: string;
    readonly grade: Grade;
    readonly collection: string;
    readonly img: string;
    stattrak: boolean;
    wears: {
        min_wear: number;
        max_wear: number;
    };
    prices: {
        [float: string]: string;
    };
    floatInput: Decimal;
    priceInput: number;
}

export type Grade =
    "Covert" |
    "Classified" |
    "Restricted" |
    "Mil-Spec" |
    "Industrial Grade" |
    "Consumer Grade"

export const toFloatCategory = (float: Decimal): string => {
    if (float.lte(0.7)) {
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