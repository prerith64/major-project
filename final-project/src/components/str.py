import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.model_selection import train_test_split
import joblib

# Load the dataset
data = pd.read_csv('src\\components\\realistic_ecg_stress_dataset.csv')

# Verify dataset loading
print(data.head())
print(data.columns)

# Encode labels
label_encoder = LabelEncoder()
data['Stress Level'] = label_encoder.fit_transform(data['Stress Level'])
print(data['Stress Level'].unique())  # Verify label encoding

# Split features and target
X = data[['ECG', 'Temperature']]
y = data['Stress Level']
print(X.shape, y.shape)  # Verify shape

# Standardize features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
print("Mean of X_scaled:", X_scaled.mean(axis=0))
print("Std of X_scaled:", X_scaled.std(axis=0))

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.3, random_state=42)

# Initialize RandomForest Classifier
model = RandomForestClassifier(n_estimators=100, random_state=42)

# Train the model
model.fit(X_train, y_train)
print("Model trained successfully")

# Save the model
joblib.dump(model, 'random_forest_model_v2.pkl')

# Load the model
with open("random_forest_model_v2.pkl", "rb") as f:
    loaded_model = joblib.load(f)
print("Model loaded successfully")

# Make a prediction
prediction = loaded_model.predict(X_test)
print(prediction[:10])  # Display the first 10 predictions
