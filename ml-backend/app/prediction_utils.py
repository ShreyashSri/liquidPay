# ml-backend/app/prediction_utils.py

import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
import pandas as pd

df = pd.read_csv("app/data/data.csv")
user0 = df[df["User_id"] == 0]
print(f"User 0 has {len(user0)} records")
# Load CSV data and sort it
df_raw = pd.read_csv("app/data/data.csv")[0:31]
df_raw = df_raw.sort_values(by=["User_id", "Month", "Day_of_month"]).reset_index(drop=True)

# One-hot encode the 'category' column. These are our expected category columns.
category_columns = [
    'category_Dining', 'category_Education', 'category_Entertainment', 'category_Groceries',
    'category_Healthcare', 'category_Hobbies', 'category_Luxury Items', 'category_Public Transport',
    'category_Rent', 'category_Shopping', 'category_Subscriptions', 'category_Travel', 'category_Utilities'
]
df_encoded = pd.get_dummies(df_raw, columns=["category"])
for col in category_columns:
    if col not in df_encoded.columns:
        df_encoded[col] = 0

df_encoded = df_encoded.replace({True: 1, False: 0}).infer_objects(copy=False)
df_encoded.drop(columns=["Date", "Timestamp", "Year"], inplace=True, errors="ignore")
df_encoded = df_encoded.select_dtypes(include=[np.number])

# Define feature columns.
# Ensure these column names match what your model expects.
feature_columns = [col for col in df_encoded.columns if col != "User_id"]

# Determine which columns to scale (for example, exclude 'Amount' and one-hot columns).
columns_to_scale = [i for i, col in enumerate(feature_columns) if col != "Amount" and not col.startswith("category_")]
# Store the index for Amount
amount_idx = feature_columns.index("Amount")

# Build 30-day sequences from the CSV data.
def build_sequences(window_size: int = 30):
    X_sequences, y_labels, sequence_meta = [], [], []
    for user_id, user_data in df_encoded.groupby("User_id"):
        user_array = user_data[feature_columns].to_numpy()
        for i in range(len(user_array) - window_size):
            window = user_array[i:i + window_size]
            target = user_array[i + window_size]
            X_sequences.append(window)
            y_labels.append(target)
            sequence_meta.append((user_id, i))
    return np.array(X_sequences), np.array(y_labels), sequence_meta

X_sequences, y_labels, sequence_meta = build_sequences()

# Scale the sequences using MinMaxScaler on selected columns.
scaler = MinMaxScaler()
X_flat = X_sequences.reshape(-1, X_sequences.shape[2])
X_flat[:, columns_to_scale] = scaler.fit_transform(X_flat[:, columns_to_scale])
X_scaled = X_flat.reshape(X_sequences.shape)

def inverse_amount_column(predicted, original_df=df_raw):
    amount_min = original_df["Amount"].min()
    amount_max = original_df["Amount"].max()
    predicted_copy = predicted.copy()
    predicted_copy[:, amount_idx] = predicted[:, amount_idx] * (amount_max - amount_min) + amount_min
    return predicted_copy

def get_user_sequence(user_id: int):
    """Return the first sequence found for the user."""
    for i, (uid, idx) in enumerate(sequence_meta):
        if uid == user_id:
            return X_scaled[i], idx
    return None, None

def update_user_sequence(user_id: int, new_record: dict, window_size: int = 30):
    """
    Fetch the latest 30-day sequence for a user and update it by removing the oldest day
    and appending the new day's record (after converting and scaling it).
    """
    seq, idx = get_user_sequence(user_id)
    if seq is None:
        return None
    
    # Build the new feature vector.
    # We'll follow the order in feature_columns.
    new_feature = []
    for col in feature_columns:
        # For one-hot encoded category columns.
        if col.startswith("category_"):
            # The expected category value is the part after 'category_'
            cat_value = col.split("_", 1)[1]
            new_feature.append(1.0 if new_record.get("category") == cat_value else 0.0)
        else:
            # For numeric features, we try to fetch from the new record.
            # The keys in new_record are assumed to match exactly.
            new_feature.append(float(new_record.get(col, 0.0)))
    
    new_feature_arr = np.array(new_feature, dtype=float)
    # Scale the columns that require scaling.
    if columns_to_scale:
        new_feature_arr[columns_to_scale] = scaler.transform(new_feature_arr[columns_to_scale].reshape(1, -1))[0]
    
    # Remove the oldest row and append the new feature row.
    updated_seq = np.vstack([seq[1:], new_feature_arr])
    return updated_seq
def create_input_sequence(user_id, new_data, sequence_length=30):
    """
    Builds a new input sequence for a user based on historical data + new input.
    """
    user_seq = get_user_sequence(user_id)

    if user_seq.shape[0] < sequence_length:
        raise ValueError("Not enough history to create a sequence.")

    # Remove oldest row and add the new one
    updated_seq = np.vstack([user_seq[-(sequence_length - 1):], new_data])
    
    return updated_seq
