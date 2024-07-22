import React from "react";
import { Route, Routes } from 'react-router-dom';//Link } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/layout/NavBar';
import TradeUp from "./pages/TradeUp/TradeUp";
import Decimal from "decimal.js-light";

const tempContract = {
  skins: [],
  cost: new Decimal(0)
}

const App = (): React.JSX.Element => {
  return (<>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/trade-up" element={<TradeUp loadContract={tempContract} loadOutcome={null} />} />
      {/* <Route path="/api/list" /> */}
    </Routes>
  </>
  );
};

export default App;