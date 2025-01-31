import React from 'react';
import { FaTemperatureHigh, FaHeartbeat, FaBell, FaTachometerAlt } from 'react-icons/fa';
import { MdMonitorHeart } from "react-icons/md";
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="fixed h-full w-[300px] bg-[#121212] text-3xl text-white border-r-[1px] border-gray-400">
      <div className="flex items-center justify-center h-16">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>
      <nav className="mt-10">
        <Link to="/" className="flex items-center p-6 text-white hover:bg-[#2C2C2C]">
          <FaTachometerAlt />
          <span className="mx-3  ">Home</span>
        </Link>
        <Link to="/tempData" className="flex items-center p-6 text-white hover:bg-[#2C2C2C]">
          <MdMonitorHeart className="text-3xl" />
          <span className="mx-3">Monitor</span>
        </Link>
        <Link to="/analysis" className="flex items-center p-6 text-white hover:bg-[#2C2C2C]">
          <FaHeartbeat />
          <span className="mx-3">Analysis</span>
        </Link>
        <Link to="/alert" className="flex items-center p-6 text-white hover:bg-[#2C2C2C]">
          <FaBell />
          <span className="mx-3">Alerts</span>
        </Link>
        <Link to="/maps" className="flex items-center p-6 text-white hover:bg-[#2C2C2C]">
          <FaBell />
          <span className="mx-3">Map</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
