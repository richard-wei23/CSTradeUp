import Decimal from "decimal.js-light";

export type Contract = {
    skins: Skin[];
    cost: number;
}

export type Outcome = {
    skinOutcomes: Map<Skin, number>;
    expectedValue: number;
    variance: number;
}

export type Skin = {
    readonly name: string;
    readonly quality: Quality;
    readonly collection: string;
    readonly img: string;
    stattrak: boolean;
    float: Decimal;
    price: number;
}

type Quality =
    { kind: "consumer-grade" } |
    { kind: "industrial-grade" } |
    { kind: "mil-spec" } |
    { kind: "restricted" } |
    { kind: "classified" }

type FloatCategory =
    { kind: "factory-new" } |
    { kind: "minimal-wear" } |
    { kind: "field-tested" } |
    { kind: "well-worn" } |
    { kind: "battle-scarred" }


export const toFloatCategory = (float: Decimal): FloatCategory => {
    if (float.lte(0.7)) {
        return { kind: "factory-new" };
    } else if (float.lte(0.15)) {
        return { kind: "minimal-wear" };
    } else if (float.lte(0.37)) {
        return { kind: "field-tested" };
    } else if (float.lte(0.44)) {
        return { kind: "well-worn" };
    } else {
        return { kind: "battle-scarred" };
    }
}