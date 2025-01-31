import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Alert from './components/Alert';
import Analysis from './components/Analysis';
import TempData from './components/TempData';
import Sidebar from './components/Sidebar';
import MapComponent from './components/MapComponent';

const App = () => {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-grow  ml-[300px]">
          <Routes>
            <Route path="/" element={  <Home />} />
            <Route path="/alert" element={<Alert />} />
            <Route path="/tempData" element={<TempData />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/maps" element={<MapComponent />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
