import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
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

# Build the SVM model
svm_model = SVC(kernel='linear', random_state=42)  # You can adjust the kernel and other parameters

# Train the model
svm_model.fit(X_train_scaled, y_train)

# Test the model
y_pred_svm = svm_model.predict(X_test_scaled)
accuracy_svm = accuracy_score(y_test, y_pred_svm)

# Calculate precision, recall, and F1 score for SVM
report_svm = classification_report(y_test, y_pred_svm, target_names=['low', 'medium', 'high'], output_dict=True)

precision_svm = report_svm['weighted avg']['precision']
recall_svm = report_svm['weighted avg']['recall']
f1_score_svm = report_svm['weighted avg']['f1-score']

# Print the model's performance
print("SVM Model Accuracy:", accuracy_svm)
print("Precision:", precision_svm)
print("Recall:", recall_svm)
print("F1 Score:", f1_score_svm)
print("\nSVM Classification Report:\n", classification_report(y_test, y_pred_svm, target_names=['low', 'medium', 'high']))
print("\nSVM Confusion Matrix:\n", confusion_matrix(y_test, y_pred_svm))

# Save the trained SVM model
joblib.dump(svm_model, 'stress_level_svm_model.pkl')
print("SVM Model saved as 'stress_level_svm_model.pkl'")
