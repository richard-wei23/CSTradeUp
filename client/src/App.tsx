import React from "react";
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';//Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home'
import Navbar from './components/layout/Navbar'


const App = (): React.JSX.Element => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} /> */}
          {/* <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;