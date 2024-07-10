import { Decimal } from 'decimal.js-light';

// Old Type: Map<string, Map<Grade, SkinData[]>>
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

export const toGrade = (grade: string): Grade => {
    if (grade.includes("Covert")) {
        return "Covert";
    } else if (grade.includes("Classified")) {
        return "Classified";
    } else if (grade.includes("Restricted")) {
        return "Restricted";
    } else if (grade.includes("Mil-Spec")) {
        return "Mil-Spec";
    } else if (grade.includes("Industrial Grade")) {
        return "Industrial Grade";
    } else if (grade.includes("Consumer Grade")) {
        return "Consumer Grade";
    } else {
        throw new Error(`Grade: ${grade} does not exist!`);
    }
}