// import React, { ChangeEvent, Component, MouseEvent } from "react";
// import { isRecord } from "./record";
// import './style.css';

// // Indicates which page to show
// type Page = { kind: "start" } | { kind: "create" } | { kind: "practice" };

// type FlashcardAppState = {
//   /** Represents the current page */
//   page: Page;

//   /** Name of the deck to load in practice */
//   loadDeckName: string;

//   /** Deck to load in practice */
//   loadDeck: Deck;

//   /** String to search for in title of decks */
//   searchString: string;

//   /** List of existing decks */
//   deckList?: string[];

//   /** List of scores for all practices of all decks by all users. */
//   scoresList?: string[];

//   /** Error message if invalid action */
//   error?: string;
// }

// /** Displays the UI of the Flashcard application. */
// export class FlashcardApp extends Component<{}, FlashcardAppState> {

//   constructor(props: {}) {
//     super(props);

//     this.state = {
//       page: { kind: "start" },
//       loadDeck: nil,
//       loadDeckName: "",
//       searchString: ""
//     };

//     this.doRefreshClick();
//   }

//   render = (): JSX.Element => {
//     if (this.state.page.kind === "create") {
//       return <>
//         <Editor
//           doAddClick={this.doAddClick}
//           doStartScreenClick={this.doStartScreenClick}
//           startingDeck={this.state.loadDeck}
//           error={this.state.error} />
//       </>;
//     } else if (this.state.page.kind === "practice" &&
//       this.state.loadDeck.kind !== "nil" &&
//       this.state.loadDeckName !== "") {
//       return <>
//         <Practice doStartScreenClick={this.doStartScreenClick}
//           doCreateClick={this.doCreateClick}
//           deckName={this.state.loadDeckName}
//           deck={this.state.loadDeck}
//         />
//       </>;
//     } else {
//       return <>
//         <h1>List</h1>
//         Search: <input
//           onChange={this.doSearchChange}
//         />
//         {this.renderDecks()}
//         <button onClick={this.doRefreshClick}>Refresh</button>
//         <br />
//         <br />
//         <br />
//         <button onClick={this.doCreateClick}>New</button>
//         <h1>Scores</h1>
//         {this.renderScores()}
//       </>;
//     }
//   };

//   /**
//    * Renders the list of existing decks with a clickable link to practice the flashcards.
//    * @returns the JSX.Element that represents the list of existing decks
//    */
//   renderDecks = (): JSX.Element => {
//     if (this.state.deckList === undefined) {
//       return <p>Loading existing decks...</p>;
//     } else {
//       const deckList: JSX.Element[] = [];
//       const formattedDeckList =
//         this.state.deckList.filter((deck) => deck.toLowerCase().includes(this.state.searchString));
//       if (formattedDeckList.length !== 0 || this.state.deckList.length === 0) {
//         for (const deck of formattedDeckList) {
//           deckList.push(
//             <li key={deck}>
//               <a href="#" onClick={(evt) => this.doLoadClick(evt, deck)}>{deck}</a>
//             </li>);
//         }
//         return <ul>{deckList}</ul>;
//       } else {
//         const error = `Deck with name including: "${this.state.searchString}" does not exist.`;
//         return <p className="error">{error}</p>;
//       }
//     }
//   }

//   /**
//    * Renders the list of scores for all practices of all decks by all users.
//    * @returns the JSX.Element that represents the list of scores
//    */
//   renderScores = (): JSX.Element => {
//     if (this.state.scoresList === undefined) {
//       return <p>Loading scores...</p>;
//     } else {
//       const scores = this.state.scoresList.map((score, i) => <li key={i}><p>{score}</p></li>);
//       return <ul>{scores}</ul>;
//     }
//   }

//   /**
//    * Gets the list of existing decks from the server
//    */
//   getDeckList = (): void => {
//     fetch("/api/list")
//       .then(this.doListResp)
//       .catch(() => console.error("failed to connect to server"));
//   };

//   /**
//    * Handles response after requesting the list of existing decks
//    * @param res The response object received from the server
//    */
//   doListResp = (res: Response): void => {
//     if (res.status === 200) {
//       res.json().then(this.doDeckListJson)
//         .catch(() => this.doListError("200 response is not JSON"));
//     } else {
//       this.doListError(`bad status code from /api/list: ${res.status}`);
//     }
//   }

//   /**
//    * Adds an error message if there was an error when fetching /api/list
//    * @param msg the error message
//    */
//   doListError = (msg: string): void => {
//     console.error(`Error fetching /api/list: ${msg}`);
//   }

//   /**
//    * Validates and handles the list of existing decks from the server
//    * @param data the Json data received from the server
//    */
//   doDeckListJson = (data: unknown): void => {
//     if (!isRecord(data)) {
//       console.error("bad data from /api/list: not a record", data);
//       return;
//     }

//     if (!Array.isArray(data.values)) {
//       console.error("bad data from /api/list: values is not an array", data);
//       return;
//     }

//     const decks: string[] = [];
//     for (const val of data.values) {
//       decks.push(val);
//     }
//     this.setState({ deckList: decks });
//   };

//   /**
//    * Handles the click event when a user selects to load the given deck
//    * @param _evt unused parameter, Mouse Event
//    * @param deckName name of the deck to be loaded
//    */
//   doLoadClick = (_evt: MouseEvent<HTMLAnchorElement>, deckName: string): void => {
//     const name = deckName.trim();
//     const url = "/api/load?name=" + encodeURIComponent(name);
//     this.setState({ loadDeckName: name });
//     fetch(url)
//       .then(this.doLoadResp)
//       .catch(() => console.error("failed to connect to server"));
//   }

//   /**
//    * Handles response after requesting to load a deck
//    * @param res The response object received from the server
//    */
//   doLoadResp = (res: Response): void => {
//     if (res.status === 200) {
//       res.json().then((res) => this.doLoadDeckClick(fromJson(res.value)))
//         .catch(() => this.doLoadError("200 response is not JSON"));
//       return;
//     } else if (res.status === 400) {
//       res.text().then(this.doLoadError)
//         .catch(() => this.doLoadError("400 response is not text"));
//       return;
//     } else if (res.status === 404) {
//       res.text().then(this.doLoadError)
//         .catch(() => this.doLoadError("404 response is not text"));
//       return;
//     } else {
//       console.error(`bad status code from /api/load: ${res.status}`);
//     }
//   }

//   /**
//    * Adds an error message if there was an error when fetching /api/load
//    * @param msg the error message
//    */
//   doLoadError = (msg: string): void => {
//     console.error(`Error fetching /api/load: ${msg}`);
//   }

//   /**
//    * Loads practice for an existing deck
//    * @param loadDeck the deck to load in the editor
//    */
//   doLoadDeckClick = (loadDeck: Deck): void => {
//     this.setState({ page: { kind: "practice" }, loadDeck })
//   }

//   /**
//    * Sends the server a deck with the given deckName and given flashcards to save
//    * @param deckName the name of the deck
//    * @param flashcards the flashcards of the deck
//    */
//   doAddClick = (deckName: string, flashcards: string): void => {
//     if (deckName.trim() === "") {
//       const error = "Error: Please enter a deck name";
//       this.setState({ error });
//     } else {
//       try {
//         const deck = toDeck(flashcards.trim());
//         this.setState({ error: undefined });
//         const body = { name: deckName.trim(), value: compact_list(deck) };
//         fetch("/api/add", {
//           method: "POST",
//           body: JSON.stringify(body),
//           headers: { "Content-Type": "application/json" }
//         }).then(this.doAddResp)
//           .catch(() => console.error("failed to connect to server"));
//       } catch (error: unknown) {
//         if (error instanceof Error) {
//           console.error("Error: " + error.message);
//           this.setState({ error: "Error: " + error.message });
//         } else {
//           console.error("Unknown error occurred.");
//         }
//       }
//     }
//   }

//   /**
//    * Handles response after requesting to save a deck
//    * @param res The response object received from the server
//    */
//   doAddResp = (res: Response): void => {
//     if (res.status === 200) {
//       res.json().then(() => this.doStartScreenClick())
//         .catch(() => this.doAddError("200 response is not JSON"));
//       return;
//     } else if (res.status === 400) {
//       res.text().then(this.doAddError)
//         .catch(() => this.doAddError("400 response is not text"));
//       return;
//     } else if (res.status === 409) {
//       res.text().then(this.doAdd409Error)
//         .catch(() => this.doAddError("409 response is not text"));
//       return;
//     } else {
//       console.error(`bad status code from /api/add: ${res.status}`);
//     }
//   }

//   /**
//    * Adds an error message if there was an 409 error when fetching /api/add
//    * @param msg the error message
//    */
//   doAdd409Error = (msg: string): void => {
//     console.error(`Error fetching /api/add: ${msg}`);
//     this.setState({ error: "Error: Quiz already exists" });
//   }

//   /**
//    * Adds an error message if there was an error when fetching /api/add
//    * @param msg the error message
//    */
//   doAddError = (msg: string): void => {
//     console.error(`Error fetching /api/add: ${msg}`);
//   }

//   /**
//    * Gets the list of scores for all practices of all decks by all users from the server
//    */
//   getScoreList = (): void => {
//     fetch("/api/scoreList")
//       .then(this.doScoreListResp)
//       .catch(() => console.error("failed to connect to server"));
//   };

//   /**
//    * Handles response after requesting the list of scores
//    * @param res The response object received from the server
//    */
//   doScoreListResp = (res: Response): void => {
//     if (res.status === 200) {
//       res.json().then(this.doScoreListJson)
//         .catch(() => this.doScoreListError("200 response is not JSON"));
//     } else {
//       this.doScoreListError(`bad status code from /api/scoreList: ${res.status}`);
//     }
//   }

//   doScoreListError = (msg: string): void => {
//     console.error(`Error fetching /api/scoreList: ${msg}`);
//   }

//   /**
//    * Validates and handles the list of scores from the server
//    * @param data the Json data received from the server
//    */
//   doScoreListJson = (data: unknown): void => {
//     if (!isRecord(data)) {
//       console.error("bad data from /api/scoreList: not a record", data);
//       return;
//     }

//     if (!Array.isArray(data.values)) {
//       console.error("bad data from /api/scoreList: values is not an array", data);
//       return;
//     }

//     const scores: string[] = [];
//     for (const val of data.values) {
//       const [name, deckName, score] = val;
//       scores.push(name + ", " + deckName + ": " + score);
//     }

//     this.setState({ scoresList: scores });
//   };

//   /**
//    * Changes the search string when input is changed
//    * @param evt text input for the search
//    */
//   doSearchChange = (evt: ChangeEvent<HTMLInputElement>): void => {
//     const formattedSearchString = evt.target.value.toLowerCase().trim();
//     this.setState({ searchString: formattedSearchString });
//   }

//   /**
//    * Switches to the editor page
//    */
//   doCreateClick = (): void => {
//     this.setState({ page: { kind: "create" }, error: undefined });
//   }

//   /**
//    * Refreshes score and deck list
//    */
//   doRefreshClick = (): void => {
//     this.getDeckList();
//     this.getScoreList();
//   }

//   /**
//    * Switches to the start page
//    */
//   doStartScreenClick = (): void => {
//     this.setState({
//       page: { kind: "start" },
//       loadDeck: nil,
//       loadDeckName: "",
//       searchString: "",
//       error: undefined
//     });
//     this.doRefreshClick();
//   }
// }
