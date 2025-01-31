import pickle
import pandas as pd  # Import pandas here

# Load the model
with open('stress_model.pkl', 'rb') as f:
    model = pickle.load(f)

# Example input data
X_new = pd.DataFrame({"Temperature": [37.0], "HeartRate": [82]})

# Make the prediction
prediction = model.predict(X_new)

# Print the predicted stress level
print("Predicted Stress Level:", prediction)
