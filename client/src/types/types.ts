import Decimal from "decimal.js-light";


export type Contract = {
    skins: Skin[];
}

export type Result = {
    skins: Skin[];
    cost: number;
    profit: number;
    var: number;
}

export type Skin = {
    readonly name: string;
    readonly rarity: Rarity;
    float: Decimal;
    price: number;
}

export type Rarity =
    { kind: "consumer-grade" } |
    { kind: "industrial-grade" } |
    { kind: "mil-spec" } |
    { kind: "restricted" } |
    { kind: "classified" }

export type FloatCategory =
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