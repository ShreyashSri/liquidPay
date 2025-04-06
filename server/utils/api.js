// utils/api.js
export async function fetchPrediction(data) {
    const response = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  
    if (!response.ok) {
      throw new Error("Prediction request failed");
    }
  
    return await response.json();
  }
  