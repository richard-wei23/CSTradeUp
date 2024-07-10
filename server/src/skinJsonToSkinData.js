import { promises as fs } from 'fs';
import path from 'path';

const casesPath = path.join(__dirname, '../data/cases/json');
const collectionsPath = path.join(__dirname, '../data/collections/json');

// Map of all collections and their respective skins
let skins = {};
const parseFiles = async (jsonDirectoryPath) => {
    try {
        const files = await fs.readdir(jsonDirectoryPath);
        const jsonFiles = files.filter(file => path.extname(file) === '.json');
        for (const file of jsonFiles) {
            const filePath = path.join(jsonDirectoryPath, file);
            const data = await fs.readFile(filePath, 'utf8');
            try {
                const jsonData = JSON.parse(data);

                let fileSkins = {};
                for (const category in jsonData.content) {
                    const skinsInCategory = jsonData.content[category].map(skin => ({
                        name: skin.name,
                        quality: category.replace(" Skins", ""),
                        collection: jsonData.name,
                        img: skin.img,
                        stattrak: skin.can_be_stattrak,
                        wears: {
                            "min_wear": skin.wears.min_wear,
                            "max_wear": skin.wears.max_wear
                        },
                        prices: skin.prices,
                        floatInput: 0.001,
                        priceInput: +Object.values(skin.prices)[0].replace(".", ""),
                    }));
 
                    fileSkins[category] = skinsInCategory;
                }

                skins[jsonData.name] = fileSkins;
            }
            catch (err) {
                console.error(`Error parsing JSON data from ${filePath}:`, err);
            }
        }
    }
    catch (err) {
        console.error(`Error reading files in directory ${jsonDirectoryPath}:`, err);
    }
};

const skinJsonToData = async () => {
    await Promise.all([parseFiles(casesPath), parseFiles(collectionsPath)]);
    // console.log(skins);
    return skins;
};
// skinJsonToData();
export default skinJsonToData;