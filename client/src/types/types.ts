import Decimal from "decimal.js-light";

export type SkinsData = {
    [collection: string]: {
        [quality in Quality]: SkinData[];
    }
}

export type Contract = {
    skins: SkinData[];
    cost: number;
}

export type Outcome = {
    contractOutcomes: Map<SkinData, number>;
    expectedValue: number;
    variance: number;
}

export type SkinData = {
    readonly name: string;
    readonly quality: Quality;
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

export type Quality =
    "Covert" |
    "Classified" |
    "Restricted" |
    "Mil-Spec" |
    "Industrial Grade" |
    "Consumer Grade"

export const tohigherQuality = (quality: Quality) : Quality | null => {
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