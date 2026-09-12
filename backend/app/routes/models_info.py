"""
Model Performance & Architecture Metadata Endpoints
File: backend/app/routes/models_info.py
"""

import sys
from pathlib import Path
from fastapi import APIRouter

try:
    # pyrefly: ignore [missing-import]
    from ..services.ml_service import ml_service
    # pyrefly: ignore [missing-import]
    from ..schemas import ModelPerformanceResponse
except (ImportError, ValueError):
    backend_dir = Path(__file__).resolve().parent.parent.parent
    if str(backend_dir) not in sys.path:
        sys.path.insert(0, str(backend_dir))
    from app.services.ml_service import ml_service
    from app.schemas import ModelPerformanceResponse

router = APIRouter(prefix="/api/models", tags=["Models"])

@router.get("/performance", response_model=ModelPerformanceResponse)
def get_model_performance():
    meta = ml_service.get_performance_metadata()
    return {
        "spending_prediction": meta["spending_prediction"],
        "purchase_prediction": meta["purchase_prediction"],
        "customer_segmentation": meta["customer_segmentation"],
        "recommendation_system": meta["recommendation_system"]
    }
