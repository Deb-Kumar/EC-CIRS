"""
Product Recommendation API Endpoints
File: backend/app/routes/recommendations.py
"""

import sys
from pathlib import Path
from typing import Optional, Dict, Any
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

try:
    # pyrefly: ignore [missing-import]
    from ..database import get_db
    # pyrefly: ignore [missing-import]
    from ..models import Customer
    # pyrefly: ignore [missing-import]
    from ..schemas import RecommendationRequest, RecommendationResponse
    # pyrefly: ignore [missing-import]
    from ..services.ml_service import ml_service
except (ImportError, ValueError):
    backend_dir = Path(__file__).resolve().parent.parent.parent
    if str(backend_dir) not in sys.path:
        sys.path.insert(0, str(backend_dir))
    from app.database import get_db
    from app.models import Customer
    from app.schemas import RecommendationRequest, RecommendationResponse
    from app.services.ml_service import ml_service

router = APIRouter(prefix="/api/recommend", tags=["Recommendations"])

def _generate_recommendations(
    product_id: Optional[int],
    customer_id: Optional[int],
    top_n: int,
    db: Session
) -> Dict[str, Any]:
    target_product_id = product_id
    query_type = "product"
    message = None
    
    # If customer_id is provided and no product_id, resolve customer preferences
    if target_product_id is None:
        if customer_id is not None:
            customer = db.query(Customer).filter(Customer.customer_id == customer_id).first()
            if customer:
                pref_cat = customer.primary_category
                cat_match = ml_service.product_catalog[ml_service.product_catalog['category'] == pref_cat].sort_values(by='purchase_count', ascending=False)
                if not cat_match.empty:
                    target_product_id = int(cat_match.iloc[0]['product_id'])
                else:
                    target_product_id = int(ml_service.product_catalog.iloc[0]['product_id'])
                query_type = "customer"
                message = f"Recommendations based on Customer #{customer_id} preferred Category {pref_cat}."
            else:
                # Graceful fallback: return top catalog products rather than crashing with 404
                target_product_id = int(ml_service.product_catalog.iloc[0]['product_id'])
                query_type = "fallback"
                message = f"Customer #{customer_id} not found in database. Showing popular catalog recommendations."
        else:
            # Fallback to default catalog product
            target_product_id = int(ml_service.product_catalog.iloc[0]['product_id'])
            query_type = "default"
            message = "Default catalog recommendations."
            
    recs = ml_service.recommend_products(product_id=target_product_id, top_n=top_n)
    
    return {
        "query_id": target_product_id,
        "query_type": query_type,
        "recommendations": recs,
        "total_recommended": len(recs),
        "message": message
    }

@router.post("", response_model=RecommendationResponse)
@router.post("/", response_model=RecommendationResponse, include_in_schema=False)
def get_recommendations_post(req: RecommendationRequest, db: Session = Depends(get_db)):
    """Generate product recommendations via POST payload."""
    return _generate_recommendations(
        product_id=req.product_id,
        customer_id=req.customer_id,
        top_n=req.top_n,
        db=db
    )

@router.get("", response_model=RecommendationResponse)
@router.get("/", response_model=RecommendationResponse, include_in_schema=False)
def get_recommendations_get(
    product_id: Optional[int] = Query(None, description="Target product ID for similarity search"),
    customer_id: Optional[int] = Query(None, description="Target customer ID to recommend by category"),
    top_n: int = Query(5, ge=1, le=20, description="Number of recommendations to return"),
    db: Session = Depends(get_db)
):
    """Generate product recommendations via GET query parameters (convenient for browser exploration)."""
    return _generate_recommendations(
        product_id=product_id,
        customer_id=customer_id,
        top_n=top_n,
        db=db
    )
