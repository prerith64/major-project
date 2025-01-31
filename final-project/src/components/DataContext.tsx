import React, { createContext, useState, useEffect, ReactNode, FC } from 'react';
import axios from 'axios';

// Define the types for the data
interface Data {
  temperature: number;
  humidity: number;
  time: string;
  ecg: number;
  heart_rate: number; // Added heart_rate to Data interface
}

// Define the types for the context
interface DataContextType {
  data: Data[];
  time: number;
  loading: boolean;
  error: Error | null;
  stressLevel: string;
  Injured: boolean;
  message: string;
}

// Define the default context value
const defaultContextValue: DataContextType = {
  data: [],
  time: 0, // Default time value
  loading: true,
  error: null,
  stressLevel: '',
  Injured: false,
  message: '',
};

// Create the context with the default value
export const DataContext = createContext<DataContextType>(defaultContextValue);

// Define the props for the DataProvider component
interface DataProviderProps {
  children: ReactNode;
}

// Create the provider component
export const DataProvider: FC<DataProviderProps> = ({ children }) => {
  const [data, setData] = useState<Data[]>([]); // Stores the historical data
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [message, setMessage] = useState<string>('');
  const [time, setTime] = useState<number>(0); // Initialize with default value
  const [temperature, setTemperature] = useState('');
  const [ecg, setEcg] = useState('');
  const [stressLevel, setStressLevel] = useState('');
  const [heartRate, setHeartRate] = useState<number>(70); // Start with a normal initial heart rate

  var Injured = false;
  if (stressLevel == 'High') {
    Injured = true;
  } else {
    Injured = false;
  }

  useEffect(() => {
    const fetchData = () => {
      axios
        .get('https://w6adpnk6bc.execute-api.us-east-1.amazonaws.com/test/GetTemperatureData')
        .then(response => {
          const { time, temperature, humidity, ecg } = response.data;
          setTime(time); // Update time state
          const parsedTime = new Date(time * 1000).toLocaleTimeString();

          // Generate a small random variation in heart rate
          const heart_rate_variation = (Math.random() * 2 - 1).toFixed(1); // Variation between -1 and 1
          const new_heart_rate = Math.max(60, Math.min(100, heartRate + parseFloat(heart_rate_variation)));

          const newData: Data = {
            temperature,
            humidity,
            ecg,
            heart_rate: parseFloat(new_heart_rate.toFixed(1)), // Round to 1 decimal place
            time: parsedTime,
          };

          console.log('New Data:', newData); // Explicitly log newData

          setData(prevData => [...prevData.slice(-49), newData]);
          setHeartRate(new_heart_rate); // Update the heart rate state

          // Set the message from the response
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setError(error);
          setLoading(false);
        });
    };

    // Fetch data every 5 seconds
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [heartRate]);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://w6adpnk6bc.execute-api.us-east-1.amazonaws.com/test/GetTemperatureData');
      console.log('Fetched data:', response.data);
      setTemperature(response.data.temperature || '');
      setEcg(response.data.ecg || '');
      // Controlled variation already handled in the other useEffect
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getPrediction = async () => {
    try {
      if (temperature && ecg && heartRate) {
        const response = await axios.post('http://127.0.0.1:5000/predict', {
          temperature: parseFloat(temperature),
          ecg: parseFloat(ecg),
          heart_rate: heartRate
        });
        console.log('Prediction response:', response.data);
        setStressLevel(response.data.stress_level);
      }
    } catch (error) {
      console.error('Error getting prediction:', error);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (temperature && ecg && heartRate) {
      getPrediction();
    }
  }, [temperature, ecg, heartRate]);

  // Categorization functions
  const categorizeTemperature = (temperature: number) => {
    if (temperature > 34) return "high";
    if (temperature < 30) return "low";
    return "medium";
  };


  const categorizeECG = (ecg: number) => {
    if (ecg > 250) return "high";
    if (ecg < 150) return "low";
    return "medium";
  };

  // Generate alert based on categorized values
  const generateAlert = (temp_cat: string, ecg_cat: string) => {
    if (temp_cat === "high") {
      if ( ecg_cat === "high") {
        return "Critical Alert: Soldier's temperature, heart rate, and ECG are dangerously high. Immediate action required!";
      }  else {
        return "Alert: High body  temperature detected. Ensure proper hydration and cooling measures.";
      }
    } else if (temp_cat === "low") {
      if ( ecg_cat === "low") {
        return "Warning: Low temperature, heart rate, and ECG detected. Risk of hypothermia and bradycardia.";
      } else {
        return "Alert: Low body temperature detected. Provide adequate warming.";
      }
    } else if (temp_cat === "medium") {
      if (ecg_cat === "high") {
        return "Warning: Medium temperature with elevated heart rate or ECG. Monitor stress levels.";
      }  else {
        return "Status Normal: Temperature is medium with normal heart rate and ECG.";
      }
    } else {
      return "Error: One or more parameters are out of range. Check sensor functionality.";
    }
  };

  useEffect(() => {
    if (data.length > 0) {
      const latestData = data[data.length - 1];
      const temp_cat = categorizeTemperature(latestData.temperature);
      const ecg_cat = categorizeECG(latestData.ecg);

      const alertMessage = generateAlert(temp_cat, ecg_cat);
      setMessage(alertMessage);
    }
  }, [data]);

  return (
    <DataContext.Provider value={{ data, time, loading, error, message, stressLevel, Injured }}>
      {children}
    </DataContext.Provider>
  );
};
