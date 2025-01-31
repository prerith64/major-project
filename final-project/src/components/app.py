from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import joblib
import logging
import requests
import pandas as pd

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

# Load the trained model and scaler
model = joblib.load('stress_level_rf_model.pkl')
scaler = joblib.load('scaler.pkl')

# Set up logging
logging.basicConfig(level=logging.DEBUG)

# Define the external API endpoint to fetch temperature and ECG data
DATA_API_URL = "https://w6adpnk6bc.execute-api.us-east-1.amazonaws.com/test/GetTemperatureData"

@app.route('/')
def home():
    return "Welcome to the Stress Level Prediction API!"

@app.route('/favicon.ico')
def favicon():
    return send_from_directory('static', 'favicon.ico')

@app.route('/predict', methods=['POST'])
def predict():
    # Fetch temperature, heart rate, and ECG from external API
    try:
        response = requests.get(DATA_API_URL)
        response.raise_for_status()
        data = response.json()
        temperature = data['temperature']
        heart_rate = data['heart_rate']
        ecg = data['ecg']
        logging.debug(f"Fetched Temperature: {temperature}, Heart Rate: {heart_rate}, ECG: {ecg}")
    except requests.exceptions.RequestException as e:
        logging.error(f"Error fetching data: {e}")
        return jsonify({"error": "Error fetching data"}), 500

    # Preprocess data (standardize)
    input_data = pd.DataFrame([[temperature, heart_rate, ecg]], columns=['Temperature', 'Heart_Rate', 'ECG'])
    input_scaled = scaler.transform(input_data)

    # Predict stress level
    prediction = model.predict(input_scaled)
    stress_levels = {0: "Low", 1: "Medium", 2: "High"}
    result = stress_levels[prediction[0]]

    logging.debug(f"Prediction result: {result}")
    return jsonify({"stress_level": result})

if __name__ == "__main__":
    app.run(debug=True)
