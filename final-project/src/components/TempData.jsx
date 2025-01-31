import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from './Card';
import { useContext } from 'react';
import { DataContext } from './DataContext.tsx';
import Spinner from 'react-bootstrap/Spinner';

import Alert from '@mui/material/Alert';
import { CiTempHigh } from "react-icons/ci";
import { IoIosWater } from "react-icons/io";
import { LuHeartPulse } from "react-icons/lu";
import AudioAlert from './AudioAlert.jsx';

const TempData = () => {
  const { data, loading, error,Injured } = useContext(DataContext);
  
  const tempChartRef = useRef(null);
  const humidityChartRef = useRef(null);
  const ecgChartRef = useRef(null);
  const heartChartRef = useRef(null);


  useEffect(() => {
    if (!loading && data.length > 0) {
      // Create D3 charts for temperature, humidity, and ECG

      const createChart = (chartRef, dataKey, color, chartTitle) => {
        const svg = d3.select(chartRef.current);
        svg.selectAll('*').remove(); // Clear previous renders

        const width = 800; 
        const height = 400; 
        const margin = { top: 50, right: 50, bottom: 50, left: 60 };

        const parseTime = d3.timeParse("%I:%M:%S %p"); // Adjust the format as needed
        const parsedData = data.map(d => ({
          ...d,
          time: parseTime(d.time)
        }));

        const x = d3.scaleTime()
          .domain([d3.min(parsedData, d => d.time), d3.max(parsedData, d => d.time)])
          .range([margin.left, width - margin.right]);

        const y = d3.scaleLinear()
          .domain([
            d3.min(parsedData, d => d[dataKey]) - 5,
            d3.max(parsedData, d => d[dataKey]) + 5,
          ])
          .range([height - margin.bottom, margin.top]);

        const line = d3.line()
          .x(d => x(d.time))
          .y(d => y(d[dataKey]))
          .curve(d3.curveMonotoneX);

        // X-axis
        svg.append('g')
          .attr('transform', `translate(0,${height - margin.bottom})`)
          .call(d3.axisBottom(x).ticks(10).tickFormat(d3.timeFormat("%H:%M:%S")))
          .selectAll('text')
          .attr('font-size', '18px')
          .attr('fill', 'white');

        // Y-axis
        svg.append('g')
          .attr('transform', `translate(${margin.left},0)`)
          .call(d3.axisLeft(y).ticks(10))
          .selectAll('text')
          .attr('font-size', '18px')
          .attr('fill', 'white');
          
          svg.selectAll('.domain').attr('stroke', 'white');
          svg.selectAll('.tick line').attr('stroke', 'white');
        // Data line
        svg.append('path')
          .datum(parsedData)
          .attr('fill', 'none')
          .attr('stroke', color)
          .attr('stroke-width', 5)
          .attr('d', line);

        // Chart title
        svg.append('text')
          .attr('x', width / 2)
          .attr('y', margin.top / 2)
          .attr('fill', color)
          .attr('font-size', '24px')
          .attr('font-weight', 'bold')
          .attr('text-anchor', 'middle')
          .text(chartTitle);
      };

      createChart(tempChartRef, 'temperature', 'steelblue', 'Temperature');
      createChart(humidityChartRef, 'humidity', 'orange', 'Humidity');
      createChart(ecgChartRef, 'ecg', 'green', 'ECG');
      createChart(heartChartRef, 'heart_rate', 'green', 'Heart Rate');
    }
  }, [data, loading]);

  if (loading) {
    return (
      <div className='flex items-center justify-center h-[100vh]'>
        <Spinner className='spinner' animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className='bg-[#2C2C2C]' >
      {  <AudioAlert injured={Injured} />}
      {Injured && <Alert
        sx={{ fontSize: '1.5rem', minHeight: '70px', display: 'flex', alignItems: 'center' }}
        variant="filled" severity="error">
        {`The soilder is in critical condition needed medication`}
      </Alert>}
      <div className='flex w-full justify-around items-center p-[50px] flex-wrap gap-[50px]'>
      <div  className='flex items-center gap-[200px]' >
      <Card
          name={'Temperature'}
          Icon={<CiTempHigh  className=' text-[100px]' />}
          value={data[data.length - 1]?.temperature+'°C'|| 'N/A'}
          style={{ color: 'steelblue', fontWeight: 'bold' }}
        />
        <svg ref={tempChartRef} width={800} height={400}></svg>
      </div>
       <div className='flex items-center gap-[200px]'>
       <Card
          name={'Humidity'}
          value={data[data.length - 1]?.humidity || 'N/A'}
          Icon={<IoIosWater className='text-[100px]' />}
          style={{ color: 'orange', fontWeight: 'bold' }}
        />
        <svg ref={humidityChartRef} width={800} height={400}></svg>
       </div>
       <div className='flex items-center gap-[200px]'>
       <Card
          name={'ECG'}
          value={data[data.length - 1]?.ecg || 'N/A'}
          Icon={<LuHeartPulse className='text-[100px]'/>}
          style={{ color: 'orange', fontWeight: 'bold' }}
        />
        <svg ref={ecgChartRef} width={800} height={400}></svg>
       </div>
       <div className='flex items-center gap-[200px]'>
       <Card
          name={'Heart Rate'}
          value={data[data.length - 1]?.heart_rate || 'N/A'}
          Icon={<LuHeartPulse className='text-[100px]'/>}
          style={{ color: 'orange', fontWeight: 'bold' }}
        />
        <svg ref={heartChartRef} width={800} height={400}></svg>
       </div>
      </div>
     
    </div>
  );
};

export default TempData;
