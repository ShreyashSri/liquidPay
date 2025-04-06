from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import PredictionRequest, PredictionResponse
from app.model_handler import ModelHandler
from app.prediction_utils import inverse_amount_column, get_user_sequence, amount_idx, df_raw

app = FastAPI(title="LiquidPay ML Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add a root route
@app.get("/")
async def read_root():
    return {"message": "Welcome to the Prediction API!"}

model_handler = ModelHandler()

@app.post("/predict", response_model=PredictionResponse)
def predict_spending(request: PredictionRequest):
    user_id = request.User_id
    initial_sequence, _ = get_user_sequence(user_id)
    
    if initial_sequence is None:
        raise HTTPException(status_code=404, detail=f"User ID {user_id} not found or insufficient data.")

    predictions = model_handler.predict_next_7_days(initial_sequence)
    predictions_inv = inverse_amount_column(predictions, df_raw)
    last_total, pred_total = model_handler.compare_weekly_spending(initial_sequence, predictions_inv)

    return PredictionResponse(
        last_week_total=round(last_total, 2),
        predicted_week_total=round(pred_total, 2),
        daily_predictions=[round(p[amount_idx], 2) for p in predictions_inv]
    )
