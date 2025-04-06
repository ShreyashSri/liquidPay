import { useState } from "react";

export default function BehavioralAnalysis() {
  const [formData, setFormData] = useState({
    User_id: 0,
    category: "",
    Amount: 0,
    Age: 0,
    Day_of_week: 0,
    Month: 0,
    Day_of_month: 0,
    year: 2025,
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "category" ? value : Number(value),
    }));
  };

  const handleClick = async () => {
    setLoading(true);
    setError("");
    setPrediction(null);

    try {
      const res = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Prediction failed");
      }

      const data = await res.json();
      setPrediction(data);
    } catch (err) {
      setError("Failed to get prediction: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">Behavioral Analysis</h2>

      {Object.entries(formData).map(([key, val]) => (
        <div key={key}>
          <label className="block font-medium capitalize">{key.replaceAll("_", " ")}</label>
          <input
            type={key === "category" ? "text" : "number"}
            name={key}
            value={val}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      ))}

      <button
        onClick={handleClick}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Loading..." : "Get Systum Analysis"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {prediction && (
        <div className="mt-6 p-4 bg-gray-100 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Prediction Result</h3>
          <p><strong>Last Week:</strong> ₹{prediction.last_week_total}</p>
          <p><strong>Predicted Week:</strong> ₹{prediction.predicted_week_total}</p>
          <ul className="list-disc pl-5 mt-2">
            {prediction.daily_predictions.map((amt, i) => (
              <li key={i}>Day {i + 1}: ₹{amt.toFixed(2)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
