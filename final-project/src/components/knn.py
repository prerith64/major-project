import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.preprocessing import StandardScaler
import joblib

# Load the dataset
df = pd.read_csv('stress_level_dataset_update.csv')

# Preprocess the data
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

# Build the KNN model
knn_model = KNeighborsClassifier(n_neighbors=5)  # You can adjust the number of neighbors

# Train the model
knn_model.fit(X_train_scaled, y_train)

# Test the model
y_pred_knn = knn_model.predict(X_test_scaled)
accuracy_knn = accuracy_score(y_test, y_pred_knn)

# Calculate precision, recall, and F1 score for KNN
report_knn = classification_report(y_test, y_pred_knn, target_names=['low', 'medium', 'high'], output_dict=True)

precision_knn = report_knn['weighted avg']['precision']
recall_knn = report_knn['weighted avg']['recall']
f1_score_knn = report_knn['weighted avg']['f1-score']

# Print the model's performance
print("KNN Model Accuracy:", accuracy_knn)
print("Precision:", precision_knn)
print("Recall:", recall_knn)
print("F1 Score:", f1_score_knn)
print("\nKNN Classification Report:\n", classification_report(y_test, y_pred_knn, target_names=['low', 'medium', 'high']))
print("\nKNN Confusion Matrix:\n", confusion_matrix(y_test, y_pred_knn))

# Save the trained KNN model
joblib.dump(knn_model, 'stress_level_knn_model.pkl')
print("KNN Model saved as 'stress_level_knn_model.pkl'")
