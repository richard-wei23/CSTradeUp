import { Decimal } from 'decimal.js-light';

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

export type SkinsJson = {
    readonly name: string;
    readonly content: {
        [quality: string]: SkinData[];
    };
};

export type Quality =
    "Covert" |
    "Classified" |
    "Restricted" |
    "Mil-Spec" |
    "Industrial Grade" |
    "Consumer Grade"

export const toQuality = (quality: string): Quality => {
    if (quality.includes("Covert")) {
        return "Covert";
    } else if (quality.includes("Classified")) {
        return "Classified";
    } else if (quality.includes("Restricted")) {
        return "Restricted";
    } else if (quality.includes("Mil-Spec")) {
        return "Mil-Spec";
    } else if (quality.includes("Industrial Grade")) {
        return "Industrial Grade";
    } else if (quality.includes("Consumer Grade")) {
        return "Consumer Grade";
    } else {
        throw new Error(`Quality: ${quality} does not exist!`);
    }
}