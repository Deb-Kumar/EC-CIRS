"""
Customer Intelligence API Endpoints
File: backend/app/routes/customers.py
"""

import sys
from pathlib import Path
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

try:
    from ..database import get_db
    from ..models import Customer
    from ..schemas import CustomerResponse, CustomerListResponse
    from ..services.ml_service import ml_service
except (ImportError, ValueError):
    backend_dir = Path(__file__).resolve().parent.parent.parent
    if str(backend_dir) not in sys.path:
        sys.path.insert(0, str(backend_dir))
    from app.database import get_db
    from app.models import Customer
    from app.schemas import CustomerResponse, CustomerListResponse
    from app.services.ml_service import ml_service

router = APIRouter(prefix="/api/customers", tags=["Customers"])

@router.get("", response_model=CustomerListResponse)
@router.get("/", response_model=CustomerListResponse, include_in_schema=False)
def get_customers(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    segment: Optional[str] = Query(None, description="Filter by segment name"),
    search: Optional[int] = Query(None, description="Search by customer_id"),
    sort_by: Optional[str] = Query("id", description="Sort by id, revenue, purchases, recency, aov, abandon"),
    order: Optional[str] = Query("asc", description="Sort order: asc or desc"),
    db: Session = Depends(get_db)
):
    query = db.query(Customer)
    
    if search is not None:
        query = query.filter(Customer.customer_id == search)
    if segment is not None and segment != "":
        query = query.filter(Customer.segment_name.ilike(f"%{segment}%"))
        
    # Apply database-level sorting
    is_desc = (order or "asc").lower() == "desc"
    sb = (sort_by or "id").lower()
    if sb == "revenue":
        query = query.order_by(Customer.total_revenue.desc() if is_desc else Customer.total_revenue.asc())
    elif sb == "purchases":
        query = query.order_by(Customer.total_purchases.desc() if is_desc else Customer.total_purchases.asc())
    elif sb == "recency":
        query = query.order_by(Customer.recency_days.desc() if is_desc else Customer.recency_days.asc())
    elif sb == "aov":
        query = query.order_by(Customer.avg_order_value.desc() if is_desc else Customer.avg_order_value.asc())
    elif sb == "abandon":
        query = query.order_by(Customer.cart_abandonment_rate.desc() if is_desc else Customer.cart_abandonment_rate.asc())
    else:
        query = query.order_by(Customer.customer_id.desc() if is_desc else Customer.customer_id.asc())

    total = query.count()
    customers = query.offset((page - 1) * limit).limit(limit).all()
    
    return {
        "total": total,
        "page": page,
        "limit": limit,
        "customers": customers
    }

@router.get("/{customer_id}", response_model=CustomerResponse)
def get_customer(customer_id: int, db: Session = Depends(get_db)):
    customer = db.query(Customer).filter(Customer.customer_id == customer_id).first()
    if not customer:
        raise HTTPException(status_code=404, detail=f"Customer with ID {customer_id} not found")
    return customer

@router.get("/{customer_id}/segment")
def get_customer_segment(customer_id: int, db: Session = Depends(get_db)):
    customer = db.query(Customer).filter(Customer.customer_id == customer_id).first()
    if not customer:
        raise HTTPException(status_code=404, detail=f"Customer with ID {customer_id} not found")
        
    return {
        "customer_id": customer.customer_id,
        "cluster": customer.cluster,
        "segment_name": customer.segment_name,
        "total_revenue": customer.total_revenue,
        "total_purchases": customer.total_purchases,
        "avg_order_value": customer.avg_order_value,
        "cart_abandonment_rate": customer.cart_abandonment_rate,
        "recency_days": customer.recency_days
    }
