"""
Machine Learning Prediction Endpoints
File: backend/app/routes/predictions.py
"""

import sys
from pathlib import Path
from fastapi import APIRouter

try:
    from ..schemas import (
        SpendingPredictionRequest,
        SpendingPredictionResponse,
        PurchasePredictionRequest,
        PurchasePredictionResponse,
        SegmentPredictionRequest,
        SegmentPredictionResponse
    )
    from ..services.ml_service import ml_service
except (ImportError, ValueError):
    backend_dir = Path(__file__).resolve().parent.parent.parent
    if str(backend_dir) not in sys.path:
        sys.path.insert(0, str(backend_dir))
    from app.schemas import (
        SpendingPredictionRequest,
        SpendingPredictionResponse,
        PurchasePredictionRequest,
        PurchasePredictionResponse,
        SegmentPredictionRequest,
        SegmentPredictionResponse
    )
    from app.services.ml_service import ml_service

router = APIRouter(prefix="/api/predict", tags=["Predictions"])

@router.post("/spending", response_model=SpendingPredictionResponse)
def predict_spending(req: SpendingPredictionRequest):
    data = req.model_dump()
    pred_spend = ml_service.predict_spending(data)
    
    return {
        "predicted_spending": round(pred_spend, 2),
        "currency": "INR",
        "input_features": data,
        "model_used": "Linear Regression"
    }

@router.post("/purchase", response_model=PurchasePredictionResponse)
def predict_purchase(req: PurchasePredictionRequest):
    data = req.model_dump()
    result = ml_service.predict_purchase(data)
    
    return {
        "purchase_probability": result["purchase_probability"],
        "predicted_class": result["predicted_class"],
        "prediction_label": result["prediction_label"],
        "confidence_level": result["confidence_level"],
        "model_used": "Logistic Regression (Class-Balanced, Leakage-Free)"
    }

@router.post("/segment", response_model=SegmentPredictionResponse)
def predict_segment(req: SegmentPredictionRequest):
    data = req.model_dump()
    if "avg_pages_viewed" not in data or data["avg_pages_viewed"] is None:
        data["avg_pages_viewed"] = 12.0
    result = ml_service.predict_segment(data)
    
    return {
        "cluster": result["cluster"],
        "segment_name": result["segment_name"],
        "model_used": "K-Means Clustering (K=3, StandardScaler)"
    }
