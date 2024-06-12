const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Define the path to the directory containing JSON files
const casesPath = path.join(__dirname, './csgostash-scraper-master/data/cases/json');
const collectionsPath = path.join(__dirname, './csgostash-scraper-master/data/collections/json');

// URL to scrape
const url = 'https://csgoskins.gg/items/';

// Saves prices from csgoskins of all skins from files in a given jsonDirectoryPath
const parseFiles = (jsonDirectoryPath) => {
    // Read the directory
    fs.readdir(jsonDirectoryPath, (err, files) => {
        if (err) {
            console.error('Error reading the directory:', err);
            return;
        }

        // Filter JSON files
        const jsonFiles = files.filter(file => path.extname(file) === '.json');


        // Process each JSON file
        let index = 0;
        jsonFiles.forEach(file => {
            const filePath = path.join(jsonDirectoryPath, file);

            // Read the JSON file
            fs.readFile(filePath, 'utf8', (readErr, data) => {
                if (readErr) {
                    console.error(`Error reading the file ${file}:`, readErr);
                    return;
                }

                // Parse the JSON data
                try {
                    const jsonData = JSON.parse(data);

                    for (const category in jsonData.content) {
                        for (const skin of jsonData.content[category]) {
                            // Delay processing each skin by 2 seconds * skin index
                            setTimeout(() => {
                                console.log(`Parsed JSON data of ${skin.name}`);
                                findWriteSkinPrice(skin.name, filePath, jsonData, skin);
                            }, (index * 4000));
                            index++;
                        }
                    }
                } catch (parseErr) {
                    console.error(`Error parsing the JSON data from ${file}:`, parseErr);
                }
            })
        });
    });
}

// Finds the skin price and writes it
// @param skin name in format: gunName | skinName
const findWriteSkinPrice = (skinName, filePath, jsonData, skin) => {

    // Processes skin url
    let skinUrl = url + skinName.replace(" |", "").replace(/[^\w\s-]/g, '').toLowerCase().split(" ").join("-");
    console.log(skinUrl)

    let skinPrices = {}
    axios.get(skinUrl)
        .then(response => {
            const $ = cheerio.load(response.data);

            // Find anchor tags with version-link class
            const specificClassAnchors = $('a.version-link');
            specificClassAnchors.each((index, element) => {
                const divs = $(element).find('div'); // Find all divs inside the anchor tag

                // Check the number of spans inside the div
                const spans = divs.find('span');
                const spanCount = spans.length;

                let stattrak = "";
                let grade, cost;

                if (spanCount === 2) { // If there is only two span: Non-Stattrack
                    grade = $(divs[1]).text().trim();
                    cost = $(divs[2]).text().trim().slice(1);
                } else if (spanCount === 3) { // If there are three spans: Stattrack
                    stattrak = "StatTrak ";
                    grade = $(spans[1]).text().trim();
                    cost = $(spans[2]).text().trim().slice(1); // Find cost by bold class
                }
                // // Convert to cents
                // cost = +cost.replace(".", "");
                
                // console.log('Grade:', stattrak + grade);
                // console.log('Cost:', cost);
                
                skinPrices[stattrak + grade] = cost;
            });

            // Adding skin prices
            skin.prices = skinPrices;
                        
            // Write the modified data back to the same file or another file
            fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (writeErr) => {
                if (writeErr) {
                    console.error(`Error writing to the file ${file}:`, writeErr);
                    return;
                }
                console.log(`Successfully wrote to ${skin.name} to ${filePath}\n`);
            });
        })
        .catch(error => {
            console.error('Error fetching the page:');
            // console.error('Error fetching the page:', error);
        });
}

const savePrices = () => {
    // Start scraping for cases and collections (BOTH RUN AT SAME TIME)
    parseFiles(casesPath);
    parseFiles(collectionsPath);
}

savePrices();
