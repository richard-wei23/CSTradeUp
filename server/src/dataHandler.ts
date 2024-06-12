import fs from 'fs';
import path from 'path';

// Define the file path for the data storage
const filePath = path.join(__dirname, 'data.json');

// Define a generic type for the data
export type Data = Map<string, unknown>;

// Function to save data to a file
export function saveData(data: Data): void {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// Function to load data from a file
export function loadData(): Data {
  if (fs.existsSync(filePath)) {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(rawData) as Data;
  }
  return new Map<string, unknown>();
}