import React from "react";
import { Route, Routes } from 'react-router-dom';//Link } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/layout/NavBar';
import Editor from './pages/Editor';

const App = (): React.JSX.Element => {
  return (<>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/editor" element={<Editor />} />
      {/* <Route path="/contact" element={<Contact />} /> */}
    </Routes>
  </>
  );
};

export default App;