// frontend/pages/predict.js

import { useState } from "react";
import { fetchPrediction } from "../lib/api";

export default function PredictPage() {
  const [userId, setUserId] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setLoading(true);
    setResult(null);
    setError("");

    try {
      const data = await fetchPrediction(Number(userId));
      setResult(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">LiquidPay ML Prediction</h1>
      
      <input
        type="number"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Enter User ID"
        className="w-full p-2 border rounded"
      />

      <button
        onClick={handlePredict}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Predicting..." : "Predict"}
      </button>

      {error && <p className="text-red-600">{error}</p>}

      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded space-y-2">
          <p><strong>Last Week Total:</strong> ₹{result.last_week_total}</p>
          <p><strong>Predicted Total:</strong> ₹{result.predicted_week_total}</p>
          <div>
            <strong>Daily Predictions:</strong>
            <ul className="list-disc pl-5">
              {result.daily_predictions.map((amt, i) => (
                <li key={i}>Day {i + 1}: ₹{amt}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
