# ml-backend/app/model_handler.py

import tensorflow as tf
import numpy as np
import os
from app.prediction_utils import inverse_amount_column, get_user_sequence, amount_idx, df_raw

EXPECTED_INPUT_SHAPE = (30, 19)  # 30 time steps, 19 features

class ModelHandler:
    def __init__(self):
        model_path = os.path.join(os.path.dirname(__file__), 'models', 'Another_model.h5')
        os.makedirs(os.path.dirname(model_path), exist_ok=True)

        self.model = None

        try:
            if os.path.exists(model_path):
                loaded_model = tf.keras.models.load_model(
                    model_path,
                    custom_objects={"mse": tf.keras.losses.MeanSquaredError()}
                )
                input_shape = loaded_model.input_shape[1:]
                if input_shape != EXPECTED_INPUT_SHAPE:
                    print(f"⚠️ Model input shape {input_shape} does not match expected {EXPECTED_INPUT_SHAPE}.")
                    print("❗ Please retrain your model or replace the model file with the correct one.")
                    raise ValueError("Incompatible model shape.")
                else:
                    print(f"✅ Loaded trained model with input shape {input_shape}.")
                    self.model = loaded_model
            else:
                print("❌ Trained model file not found. Creating a placeholder model...")
                self.model = self._create_simple_model()
                self.model.save(model_path)
        except Exception as e:
            print(f"🚨 Error loading model: {e}")
            self.model = self._create_simple_model()
            self.model.save(model_path)

    def _create_simple_model(self):
        print("🔧 Creating a new dummy LSTM model with expected input shape (30, 19)...")
        model = tf.keras.Sequential([
            tf.keras.layers.LSTM(64, input_shape=EXPECTED_INPUT_SHAPE),
            tf.keras.layers.Dense(19)
        ])
        model.compile(optimizer='adam', loss='mse')
        return model

    def predict_next_7_days(self, initial_sequence, days_to_predict=7):
        sequence = initial_sequence.copy()
        predictions = []
        for _ in range(days_to_predict):
            input_seq = sequence.reshape(1, *sequence.shape)  # (1, 30, 19)
            pred = self.model.predict(input_seq, verbose=0)[0]  # (19,)
            predictions.append(pred)
            sequence = np.vstack([sequence[1:], pred])  # Append prediction and remove oldest step
        return np.array(predictions)

    def compare_weekly_spending(self, initial_sequence, predicted_sequence):
        actual_week = initial_sequence[-7:, amount_idx]
        predicted_week = predicted_sequence[:, amount_idx]
        return float(np.sum(actual_week)), float(np.sum(predicted_week))
