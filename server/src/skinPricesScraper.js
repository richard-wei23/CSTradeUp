import axios from 'axios';
import cheerio from 'cheerio';
import { promises as fs } from 'fs';
import path from 'path';
import cron from 'node-cron';

// Define the path to the directory containing JSON files
const casesPath = path.join(__dirname, '../data/cases/json');
const collectionsPath = path.join(__dirname, '../data/collections/json');

// URL to scrape
const url = 'https://csgoskins.gg/items/';

/**
 * Saves prices from csgoskins of all skins from files in a given jsonDirectoryPath
 * @param {string} jsonDirectoryPath - directory that contains potential Json files with cs skins
 */
const parseFiles = async (jsonDirectoryPath) => {
    try {
        // Read the directory
        const files = await fs.readdir(jsonDirectoryPath);

        // Filter JSON files
        const jsonFiles = files.filter(file => path.extname(file) === '.json');

        // Process each JSON file
        for (const file of jsonFiles) {
            const filePath = path.join(jsonDirectoryPath, file);

            // Read the JSON file
            const data = await fs.readFile(filePath, 'utf8');

            // Parse the JSON data
            const jsonData = JSON.parse(data);

            let index = 0;
            for (const category in jsonData.content) {
                for (const skin of jsonData.content[category]) {
                    // Delay processing each skin by 4 seconds * skin index
                    await new Promise(resolve => setTimeout(resolve, index * 4000));
                    console.log(`Retrieving: ${skin.name}`);
                    await findWriteSkinPrice(skin.name, filePath, jsonData, skin);
                    index++;
                }
            }
        }
    } catch (err) {
        console.error('Error processing files:', err);
    }
};

/**
 * Finds the skin price and writes to the file from the given filePath
 * @param {string} skinName - skin name in format: gunName | skinName
 * @param {object} skin - skin object from Json
 * @param {string} filePath - file path for file to save to
 * @param {object} jsonData - data from Json file
 */
const findWriteSkinPrice = async (skinName, filePath, jsonData, skin) => {
    // Processes skin URL
    let skinUrl = url + skinName.replace(" |", "").replace(/[^\w\s-]/g, '').toLowerCase().split(" ").join("-");

    try {
        const response = await axios.get(skinUrl);
        const $ = cheerio.load(response.data);

        let skinPrices = {};

        // Find anchor tags with version-link class
        const specificClassAnchors = $('a.version-link');
        specificClassAnchors.each((index, element) => {
            const divs = $(element).find('div'); // Find all divs inside the anchor tag

            // Check the number of spans inside the div
            const spans = divs.find('span');
            const spanCount = spans.length;

            let stattrak = "";
            let grade, cost;

            if (spanCount === 2) { // If there are only two spans: Non-Stattrak
                grade = $(divs[1]).text().trim();
                cost = $(divs[2]).text().trim().slice(1);
            } else if (spanCount === 3 && skin["can_be_stattrack"]) { // If there are three spans: Stattrak
                stattrak = "StatTrak ";
                grade = $(spans[1]).text().trim();
                cost = $(spans[2]).text().trim().slice(1); // Find cost by bold class
            }

            skinPrices[stattrak + grade] = cost;
        });

        // Adds skin prices
        skin.prices = skinPrices;

        // Write the modified data back to the same file
        await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8');
        console.log(`Successfully wrote ${skin.name} prices to ${filePath}\n`);
    } catch (error) {
        console.error('Error fetching the page:', error);
    }
};

const scrapeSavePrices = async () => {
    // * Scrape cases only for testing
    // await Promise.all([parseFiles(casesPath)]);

    await Promise.all([parseFiles(casesPath), parseFiles(collectionsPath)]);
};

// * Scrape without starting server
// scrapeSavePrices();

export default scrapeSavePrices;