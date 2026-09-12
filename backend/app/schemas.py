"""
Pydantic Schemas for Request Validation and Response Serialization
File: backend/app/schemas.py
"""

from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field, ConfigDict

# -------------------------------------------------------------
# Customer Schemas
# -------------------------------------------------------------
class CustomerResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    customer_id: int
    total_sessions: int
    total_purchases: int
    total_revenue: float
    total_cart_adds: int
    total_cart_abandons: int
    avg_pages_viewed: float
    avg_time_on_site_sec: float
    avg_discount_received: float
    avg_rating_given: float
    recency_days: int
    avg_order_value: float
    cart_abandonment_rate: float
    purchase_conversion_rate: float
    cluster: int
    segment_name: str
    location: int
    primary_device: int
    primary_category: int

class CustomerListResponse(BaseModel):
    total: int
    page: int
    limit: int
    customers: List[CustomerResponse]

# -------------------------------------------------------------
# Spending Prediction Schemas
# -------------------------------------------------------------
class SpendingPredictionRequest(BaseModel):
    total_sessions: int = Field(..., ge=1, description="Total sessions for the customer")
    total_cart_adds: int = Field(..., ge=0, description="Total cart additions")
    avg_pages_viewed: float = Field(..., ge=1.0, description="Average pages viewed per session")
    avg_time_on_site_sec: float = Field(..., ge=0.0, description="Average time on site in seconds")
    avg_discount_received: float = Field(0.0, ge=0.0, le=100.0, description="Average discount percent")
    recency_days: int = Field(0, ge=0, description="Days since last visit")

class SpendingPredictionResponse(BaseModel):
    predicted_spending: float
    currency: str = "INR"
    input_features: Dict[str, Any]
    model_used: str = "Linear Regression"

# -------------------------------------------------------------
# Segment Prediction Schemas
# -------------------------------------------------------------
class SegmentPredictionRequest(BaseModel):
    total_sessions: int = Field(..., ge=1, description="Total sessions for the customer")
    total_purchases: int = Field(..., ge=0, description="Total completed purchases")
    total_revenue: float = Field(..., ge=0.0, description="Total historical spending")
    avg_pages_viewed: float = Field(12.0, ge=1.0, description="Average pages viewed per session")
    cart_abandonment_rate: float = Field(0.0, ge=0.0, le=1.0, description="Cart abandonment percentage")
    recency_days: int = Field(15, ge=0, description="Days since last session")

class SegmentPredictionResponse(BaseModel):
    cluster: int
    segment_name: str
    model_used: str = "K-Means Clustering (K=3)"

# -------------------------------------------------------------
# Purchase Prediction Schemas
# -------------------------------------------------------------
class PurchasePredictionRequest(BaseModel):
    pages_viewed: int = Field(..., ge=1, description="Pages viewed during the current session")
    time_on_site_sec: int = Field(..., ge=1, description="Time on site in seconds")
    added_to_cart: int = Field(..., ge=0, le=1, description="1 if customer added item to cart, else 0")
    discount_percent: int = Field(0, ge=0, le=100, description="Discount percentage applied")
    unit_price: float = Field(..., ge=0.0, description="Price of product in cart/view")
    quantity: int = Field(1, ge=1, description="Quantity")
    device_type: int = Field(0, ge=0, le=2, description="0: Mobile, 1: Desktop, 2: Tablet")
    marketing_channel: int = Field(0, ge=0, le=5, description="Marketing channel code")
    user_type: int = Field(1, ge=0, le=1, description="0: Returning, 1: New")
    visit_month: int = Field(10, ge=1, le=12, description="Month of visit (1-12)")
    visit_season: int = Field(0, ge=0, le=3, description="Season code (0-3)")
    visit_weekday: int = Field(3, ge=0, le=6, description="Day of week (0-6)")
    location: int = Field(100, ge=0, description="Geographic location code")

class PurchasePredictionResponse(BaseModel):
    purchase_probability: float
    predicted_class: int
    prediction_label: str
    confidence_level: str
    model_used: str = "Logistic Regression (Leakage-Free)"

# -------------------------------------------------------------
# Recommendation Schemas
# -------------------------------------------------------------
class RecommendationRequest(BaseModel):
    product_id: Optional[int] = None
    customer_id: Optional[int] = None
    top_n: int = Field(5, ge=1, le=20)

class RecommendedProduct(BaseModel):
    product_id: int
    category: int
    unit_price: float
    similarity: float
    avg_rating: Optional[float] = 4.2
    purchase_count: Optional[int] = 25
    view_count: Optional[int] = 110

class RecommendationResponse(BaseModel):
    query_id: int
    query_type: str
    recommendations: List[RecommendedProduct]
    total_recommended: int
    message: Optional[str] = None


# -------------------------------------------------------------
# Analytics & Model Performance Schemas
# -------------------------------------------------------------
class AnalyticsOverviewResponse(BaseModel):
    total_customers: int
    total_sessions: int
    total_revenue: float
    total_purchases: int
    overall_purchase_rate: float
    avg_order_value: float
    avg_cart_abandonment_rate: float

class SegmentProfile(BaseModel):
    cluster: int
    segment_name: str
    customer_count: int
    avg_revenue: float
    avg_purchases: float
    avg_sessions: float
    avg_recency: float
    avg_cart_abandon: float

class SegmentAnalyticsResponse(BaseModel):
    segments: List[SegmentProfile]

class SalesTrendItem(BaseModel):
    date: str
    revenue: float
    sessions: int

class SalesTrendResponse(BaseModel):
    sales_trend: List[SalesTrendItem]

class ModelPerformanceResponse(BaseModel):
    spending_prediction: Dict[str, Any]
    purchase_prediction: Dict[str, Any]
    customer_segmentation: Dict[str, Any]
    recommendation_system: Dict[str, Any]

