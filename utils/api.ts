const ML_BACKEND_URL = 'http://localhost:3000';

export interface PredictionRequest {
  User_id: number;
  category: string;
  Amount: number;
  Age: number;
  Day_of_week: number;
  Month: number;
  Day_of_month: number;
  year: number;
}

export interface PredictionResponse {
  last_week_total: number;
  predicted_week_total: number;
  daily_predictions: number[];
}

export async function fetchPrediction(data: PredictionRequest): Promise<PredictionResponse> {
  try {
    const response = await fetch(`${ML_BACKEND_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching prediction:', error);
    throw error;
  }
} 