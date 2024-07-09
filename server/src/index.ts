import express, { Express } from "express";
import bodyParser from 'body-parser';
import { load, save, getTradeUpSaves, skins, list } from "./routes";
import { saveData } from './dataHandler';
import { scheduleScrapeUpdateSkins } from "./scheduleScrapeUpdateSkins";

// Configure and start the HTTP server.
const port: number = 8088;
const app: Express = express();
app.use(express.static('public'));
app.use(bodyParser.json());

app.get("/api/skins", skins);
app.get("/api/list", list);
app.get("/api/load", load);
app.post("/api/save", save);
app.listen(port, () => {
    console.log(`Server listening on ${port}`);
    scheduleScrapeUpdateSkins() // Scrape skin prices and update skins' data
});

process.on('SIGINT', () => {
    saveData(getTradeUpSaves());
    process.exit();
});