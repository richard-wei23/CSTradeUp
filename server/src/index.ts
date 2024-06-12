import express, { Express } from "express";
import bodyParser from 'body-parser';
import { load, save, getTradeUpSaves } from "./routes";
import { saveData } from './dataHandler';

// Configure and start the HTTP server.
const port: number = 8080;
const app: Express = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.get("/load", load);
app.post("/save", save);
app.listen(port, () => console.log(`Server listening on ${port}`));

process.on('SIGINT', () => {
    saveData(getTradeUpSaves());
    process.exit();
});
