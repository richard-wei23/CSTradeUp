import React from "react";
import { Route, Routes } from 'react-router-dom';//Link } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/layout/NavBar';
// import TradeUpEditor from './pages/TradeUp/TradeUp';

const App = (): React.JSX.Element => {
  return (<>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/trade-up" element={<TradeUpEditor loadContract={} />} /> */}
      {/* <Route path="/contact" element={<Contact />} /> */}
    </Routes>
  </>
  );
};

export default App;