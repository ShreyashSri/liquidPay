# ml-backend/app/schemas.py

# ml-backend/app/schemas.py

from pydantic import BaseModel

class PredictionRequest(BaseModel):
    User_id: int
    category: str
    Amount: float
    Age: float
    Day_of_week: int
    Month: int
    Day_of_month: int
    year: int

class PredictionResponse(BaseModel):
    last_week_total: float
    predicted_week_total: float
    daily_predictions: list[float]
