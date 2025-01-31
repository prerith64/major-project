import React, { useState, useEffect, useContext } from 'react';
import './Analysis.css';
import { DataContext } from './DataContext';

function Analysis() {
  const { stressLevel, data } = useContext(DataContext);

  return (
    <div className="min-h-screen bg-[#2C2C2C] flex items-center justify-center p-6">
      <div className="bg-[#121212] text-white text-2xl p-8 rounded-lg shadow-md  w-[500px]">
        <h1 className=" font-bold mb-6 text-center ">Stress Level Predictor</h1>
        
        <div className="mb-4">
          <label className="block  mb-2">Temperature:</label>
          <input
            className="w-full p-3 border border-gray-300 rounded outline-none bg-[#121212] focus:border-blue-500"
            type="text"
            value={data[data.length - 1]?.temperature}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block  mb-2">ECG:</label>
          <input
            className="w-full p-3 border border-gray-300 rounded outline-none bg-[#121212] focus:border-blue-500"
            type="text"
            value={data[data.length - 1]?.ecg}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block  mb-2">Heart Rate:</label>
          <input
            className="w-full p-3 border border-gray-300 rounded outline-none bg-[#121212] focus:border-blue-500"
            type="text"
            value={data[data.length - 1]?.heart_rate}
            readOnly
          />
        </div>
        {stressLevel && <h2 className=" font-semibold mt-6 text-center text-bold text-3xl">Stress Level:   <span className='text-red-500 text-3xl' >{stressLevel}</span> </h2>}
      </div>
    </div>
  );
}

export default Analysis;
