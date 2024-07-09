import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { loadData, Data } from './dataHandler';
import { skinsData } from "./scheduleScrapeUpdateSkins";

// Require type checking of request body.
type SafeRequest = Request<ParamsDictionary, {}, Record<string, unknown>>;
type SafeResponse = Response;  // only writing, so no need to check

// Keep track of saved trade ups.
const tradeUpSaves: Map<string, unknown> = loadData();

/** 
 * Handles request for /api/load by sending the contents of the saved file
 *  with the given name
 * Takes "name" of file to save in query params
 * Responds with 400 if "name" is missing, 
 *  with 404 if there is no saved file with the given name,
 *  otherwise with the contents of the file with the given name
 */
export const load = (req: SafeRequest, res: SafeResponse): void => {
  const name = first(req.query.name);
  if (name === undefined || typeof name !== 'string') {
    res.status(400).send('missing "name" parameter');
    return;
  } else if (!tradeUpSaves.has(name)) {
    res.status(404).send(`file with name: ${name} does not exist`);
    return;
  }

  res.send({ value: tradeUpSaves.get(name) });
};

/** 
 * Handles request for /api/list by sending the names of all files currently saved.
 * Responds with the names of all files currently saved.
 */
export const list = (_req: SafeRequest, res: SafeResponse): void => {
  res.send({ value: Array.from(tradeUpSaves.keys()) });
};

/** 
 * Handles request for /api/save by storing the contents of the given file
 * Takes "name" of file to save in query body and takes "value" of file contents
 *  to save in query body
 * Responds with 400 if "name" or "value" is missing or if a deck with the given name
 *  already exists, 
 *  otherwise with if the given file overwrote the file with the same given name
 */
export const save = (req: SafeRequest, res: SafeResponse): void => {
  const name = req.body.name;
  const value = req.body.value;
  if (name === undefined || typeof name !== 'string' || name.trim() === "") {
    res.status(400).send('missing "name" parameter');
    return;
  } else if (value === undefined) {
    res.status(400).send('missing "value" parameter');
    return;
  } else if (tradeUpSaves.has(name)) {
    res.status(409).send(`deck with name: ${name} already exists`);
    return;
  }

  tradeUpSaves.set(name, value);
  res.send({ success: true });
};

export const skins = (_req: SafeRequest, res: SafeResponse): void => {
  console.log("Sent skinsData");
  res.send({ skinsData: JSON.stringify([...skinsData.entries()]) });
};

/** Used in tests to set the tradeUpSaves map back to empty. */
export const resetForTesting = (): void => {
  tradeUpSaves.clear();
}

// Helper to return the (first) value of the parameter if any was given.
// (This is mildly annoying because the client can also give mutiple values,
// in which case, express puts them into an array.)
const first = (param: unknown): string | undefined => {
  if (Array.isArray(param)) {
    return first(param[0]);
  } else if (typeof param === 'string') {
    return param;
  } else {
    return undefined;
  }
};

// Returns tradeUpSaves to save as data
export const getTradeUpSaves = (): Data => {
  return tradeUpSaves;
}