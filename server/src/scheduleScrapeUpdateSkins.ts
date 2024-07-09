import cron from 'node-cron';
import skinJsonToSkinData from './skinJsonToSkinData';
// import scrapeSavePrices from './skinPricesScraper';

let skinsData : Map<string, unknown>= new Map();

const updateSkinsData = async (): Promise<void> => {
    console.log('Running task to update skins data');
    try {
        // Scrapes and saves skin prices
        // await scrapeSavePrices();

        // Updates skin data to new prices
        skinsData = await skinJsonToSkinData();
        // console.log(skinsData);
        console.log('Skins data updated successfully');
    } catch (err) {
        console.error('Error updating skins data:', err);
    }
};

const scheduleScrapeUpdateSkins = (): void => {
    // Run the task immediately
    updateSkinsData();

    // Schedule the task to run every 24 hours
    cron.schedule('0 0 * * *', updateSkinsData);
};

export { scheduleScrapeUpdateSkins, skinsData };