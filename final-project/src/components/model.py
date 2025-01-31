import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.preprocessing import StandardScaler
import joblib

# Load the dataset
df = pd.read_csv('stress_level_dataset_update.csv')

# Preprocess the dataa
# Convert 'Stress_Level' to numeric for the model
stress_mapping = {'low': 0, 'medium': 1, 'high': 2}
df['Stress_Level'] = df['Stress_Level'].map(stress_mapping)

# Define features (X) and target (y)
X = df[['Temperature', 'Heart_Rate', 'ECG']]
y = df['Stress_Level']

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# Standardize the data
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Save the scaler
joblib.dump(scaler, 'scaler.pkl')

# Build the Random Forest model
model = RandomForestClassifier(
    n_estimators=100,  # Number of trees
    max_depth=None,    # Allow the trees to grow fully
    min_samples_split=2,  # Minimum samples required to split an internal node
    min_samples_leaf=1,   # Minimum samples required to be at a leaf node
    random_state=42       # Ensure reproducibility
)

# Train the model
model.fit(X_train_scaled, y_train)

# Test the model
y_pred = model.predict(X_test_scaled)
accuracy = accuracy_score(y_test, y_pred)

# Calculate precision, recall, and F1 score
report = classification_report(y_test, y_pred, target_names=['low', 'medium', 'high'], output_dict=True)

precision = report['weighted avg']['precision']
recall = report['weighted avg']['recall']
f1_score = report['weighted avg']['f1-score']

# Print the model's performance
print("Model Accuracy:", accuracy)
print("Precision:", precision)
print("Recall:", recall)
print("F1 Score:", f1_score)
print("\nClassification Report:\n", classification_report(y_test, y_pred, target_names=['low', 'medium', 'high']))
print("\nConfusion Matrix:\n", confusion_matrix(y_test, y_pred))

# Save the trained model
joblib.dump(model, 'stress_level_rf_model.pkl')
print("Model saved as 'stress_level_rf_model.pkl'")
