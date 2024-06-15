
const { Quality, SkinData, SkinsJson, toQuality } = require("./types");
const Decimal = require('decimal.js-light');
const fs = require('fs');
const path = require('path');

const casesPath = path.join(__dirname, './csgostash-scraper-master/data/cases/json');
const collectionsPath = path.join(__dirname, './csgostash-scraper-master/data/collections/json');

// Map of all collections and their respective skins
let skins: Map<string, Map<Quality, SkinData[]>> = new Map<string, Map<Quality, SkinData[]>>();
const parseFiles = async (jsonDirectoryPath: string): Promise<void> => {
    try {
        const files = await fs.promises.readdir(jsonDirectoryPath);
        const jsonFiles = files.filter(file => path.extname(file) === '.json');

        for (const file of jsonFiles) {
            const filePath = path.join(jsonDirectoryPath, file);
            const data = await fs.promises.readFile(filePath, 'utf8');

            try {
                const jsonData: SkinsJson = JSON.parse(data);

                // Create k, v pair for collection / case
                skins.set(jsonData.name, new Map<Quality, SkinData[]>());
                for (const category in jsonData.content) {
                    const skinsInCategory: SkinData[] = jsonData.content[category].map(skin => ({
                        name: skin.name,
                        quality: skin.quality,
                        collection: skin.collection,
                        img: skin.img,
                        stattrak: skin.stattrak,
                        wears: skin.wears,
                        prices: skin.prices,
                        floatInput: new Decimal(0.001),
                        priceInput: +Object.keys(skin.prices)[0].replace(".", ""),
                    }));

                    // Create inner map of qualities and skins
                    skins.get(jsonData.name)!.set(toQuality(category), skinsInCategory);
                }
            } catch (err) {
                console.error(`Error parsing JSON data from ${filePath}:`, err);
            }
        }
    } catch (err) {
        console.error(`Error reading files in directory ${jsonDirectoryPath}:`, err);
    }
};

const skinJsonToData = async (): Promise<Map<string, Map<Quality, SkinData[]>>> => {
    await Promise.all([parseFiles(casesPath), parseFiles(collectionsPath)]);
    console.log(skins);
    return skins;
};

skinJsonToData();