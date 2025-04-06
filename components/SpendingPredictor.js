"use client";
import React, { useState } from "react";
import { fetchPrediction } from "@/utils/api";

export default function SpendingPredictor() {
  const [formData, setFormData] = useState({
    User_id: 1,
    category: "Groceries",
    Amount: 1000,
    Age: 25,
    Day_of_week: new Date().getDay(),
    Month: new Date().getMonth() + 1,
    Day_of_month: new Date().getDate(),
    year: new Date().getFullYear()
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetchPrediction(formData);
      setResult(res);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Spending Prediction</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="number" placeholder="Amount" value={formData.Amount} onChange={e => setFormData({ ...formData, Amount: +e.target.value })} className="border p-2 w-full" />
        {/* Add more fields as needed */}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Predict</button>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <p><strong>Actual Week Spending:</strong> ₹{result.actual_week_spending.toFixed(2)}</p>
          <p><strong>Predicted Week Spending:</strong> ₹{result.predicted_week_spending.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}
