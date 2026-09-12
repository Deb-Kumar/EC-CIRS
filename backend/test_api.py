"""
Comprehensive Automated API & ML Pipeline Verification Suite
File: backend/test_api.py
"""

import os
import sys
import pytest
from fastapi.testclient import TestClient

# Add project root to sys.path
base_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.abspath(os.path.join(base_dir, ".."))
sys.path.insert(0, project_root)

# Ensure console UTF-8 on Windows
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

from backend.app.main import app

client = TestClient(app)

def test_root_and_health():
    """Verify root documentation entrypoint and health probe."""
    res = client.get("/")
    assert res.status_code == 200
    assert res.json()["status"] == "online"

    res = client.get("/api/health")
    assert res.status_code == 200
    assert res.json()["status"] == "healthy"
    assert "version" in res.json()

def test_customers_crud_and_boundaries():
    """Verify customer pagination, sorting, search, segment filter, and 404 boundaries."""
    # List default
    res = client.get("/api/customers?limit=5")
    assert res.status_code == 200
    data = res.json()
    assert data["total"] == 8442
    assert len(data["customers"]) == 5

    # Filter by segment
    res = client.get("/api/customers?segment=Premium")
    assert res.status_code == 200
    prem_data = res.json()
    assert prem_data["total"] > 0
    for c in prem_data["customers"][:5]:
        assert "Premium" in c["segment_name"]

    # Search by ID
    res = client.get("/api/customers?search=1000")
    assert res.status_code == 200
    search_data = res.json()
    assert search_data["total"] == 1
    assert search_data["customers"][0]["customer_id"] == 1000

    # Sorting
    res_desc = client.get("/api/customers?sort_by=revenue&order=desc&limit=3")
    assert res_desc.status_code == 200
    top_rev = res_desc.json()["customers"]
    assert top_rev[0]["total_revenue"] >= top_rev[1]["total_revenue"]

    # Existing customer detail
    res = client.get("/api/customers/1000")
    assert res.status_code == 200
    assert res.json()["customer_id"] == 1000

    # Non-existent customer detail -> 404
    res = client.get("/api/customers/99999999")
    assert res.status_code == 404
    assert "not found" in res.json()["detail"].lower()

    # Customer segment lookup
    res = client.get("/api/customers/1000/segment")
    assert res.status_code == 200
    assert "cluster" in res.json()
    assert "segment_name" in res.json()

    # Non-existent customer segment -> 404
    res = client.get("/api/customers/99999999/segment")
    assert res.status_code == 404

def test_spending_prediction():
    """Verify linear regression spending predictions across various input scenarios."""
    # Standard profile
    payload_normal = {
        "total_sessions": 4,
        "total_cart_adds": 3,
        "avg_pages_viewed": 15.0,
        "avg_time_on_site_sec": 950.0,
        "avg_discount_received": 10.0,
        "recency_days": 15
    }
    res = client.post("/api/predict/spending", json=payload_normal)
    assert res.status_code == 200
    data = res.json()
    assert data["predicted_spending"] >= 0.0
    assert data["currency"] == "INR"

    # Low engagement boundary (spending should clamp to >= 0)
    payload_low = {
        "total_sessions": 1,
        "total_cart_adds": 0,
        "avg_pages_viewed": 1.0,
        "avg_time_on_site_sec": 30.0,
        "avg_discount_received": 0.0,
        "recency_days": 180
    }
    res = client.post("/api/predict/spending", json=payload_low)
    assert res.status_code == 200
    assert res.json()["predicted_spending"] >= 0.0

def test_purchase_prediction():
    """Verify logistic regression purchase conversion predictions and confidence."""
    # High intent profile
    payload_high = {
        "pages_viewed": 22,
        "time_on_site_sec": 1400,
        "added_to_cart": 1,
        "discount_percent": 20,
        "unit_price": 750.0,
        "quantity": 2,
        "device_type": 1,
        "marketing_channel": 2,
        "user_type": 1,
        "visit_month": 11,
        "visit_season": 0,
        "visit_weekday": 3,
        "location": 120
    }
    res = client.post("/api/predict/purchase", json=payload_high)
    assert res.status_code == 200
    data = res.json()
    assert 0.0 <= data["purchase_probability"] <= 1.0
    assert data["predicted_class"] in [0, 1]
    assert data["confidence_level"] in ["High", "Moderate"]

    # Low intent profile
    payload_low = {
        "pages_viewed": 1,
        "time_on_site_sec": 15,
        "added_to_cart": 0,
        "discount_percent": 0,
        "unit_price": 120.0,
        "quantity": 1,
        "device_type": 0,
        "marketing_channel": 0,
        "user_type": 0,
        "visit_month": 3,
        "visit_season": 1,
        "visit_weekday": 1,
        "location": 50
    }
    res = client.post("/api/predict/purchase", json=payload_low)
    assert res.status_code == 200
    data = res.json()
    assert 0.0 <= data["purchase_probability"] <= 1.0
    assert data["predicted_class"] == 0
    assert data["prediction_label"] == "Unlikely to Purchase"

def test_segment_prediction():
    """Verify K-Means clustering assignment endpoint."""
    payload = {
        "recency_days": 10,
        "total_sessions": 12,
        "total_purchases": 8,
        "total_revenue": 14500.0,
        "avg_pages_viewed": 20.0,
        "cart_abandonment_rate": 0.15
    }
    res = client.post("/api/predict/segment", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["cluster"] in [0, 1, 2]
    assert isinstance(data["segment_name"], str)

def test_recommendations():
    """Verify KNN recommendation engine with product, customer seed, fallback and GET query."""
    # Product seed POST
    res = client.post("/api/recommend", json={"product_id": 894, "top_n": 4})
    assert res.status_code == 200
    recs = res.json()
    assert recs["total_recommended"] == 4
    for r in recs["recommendations"]:
        assert 0.0 <= r["similarity"] <= 1.0
        assert r["unit_price"] > 0
        assert "avg_rating" in r
        assert "purchase_count" in r

    # Customer preference seed POST
    res = client.post("/api/recommend", json={"customer_id": 1000, "top_n": 3})
    assert res.status_code == 200
    recs = res.json()
    assert recs["total_recommended"] == 3
    assert recs["query_type"] == "customer"

    # Non-existent customer fallback
    res = client.post("/api/recommend", json={"customer_id": 9999999, "top_n": 3})
    assert res.status_code == 200
    recs = res.json()
    assert recs["total_recommended"] == 3
    assert recs["query_type"] == "fallback"

    # Non-existent product ID fallback (popular products)
    res = client.post("/api/recommend", json={"product_id": 9999999, "top_n": 3})
    assert res.status_code == 200
    recs = res.json()
    assert recs["total_recommended"] == 3

    # GET endpoint test
    res = client.get("/api/recommend?product_id=894&top_n=5")
    assert res.status_code == 200
    assert res.json()["total_recommended"] == 5

def test_analytics_endpoints():
    """Verify platform analytics overview, temporal sales trends, clusters, funnel, and categories."""
    # Overview
    res = client.get("/api/analytics/overview?period=30d")
    assert res.status_code == 200
    data = res.json()
    assert data["total_customers"] > 0
    assert data["total_revenue"] > 0

    # Sales trends
    res = client.get("/api/analytics/sales?period=30d")
    assert res.status_code == 200
    assert len(res.json()["sales_trend"]) > 0

    # Segments
    res = client.get("/api/analytics/segments")
    assert res.status_code == 200
    assert len(res.json()["segments"]) == 3

    # Funnel
    res = client.get("/api/analytics/funnel")
    assert res.status_code == 200
    assert len(res.json()["funnel_stages"]) == 5

    # Categories
    res = client.get("/api/analytics/categories")
    assert res.status_code == 200
    assert len(res.json()["categories"]) == 8

def test_models_metadata():
    """Verify model performance and metadata persistence."""
    res = client.get("/api/models/performance")
    assert res.status_code == 200
    data = res.json()
    assert "spending_prediction" in data
    assert "purchase_prediction" in data
    assert "customer_segmentation" in data
    assert "recommendation_system" in data

def test_dataset_explorer():
    """Verify dataset explorer schema inspection and filtered record retrieval."""
    # Schema for transactions, customers, products
    for tbl in ["transactions", "customers", "products"]:
        res = client.get(f"/api/dataset/schema?table={tbl}")
        assert res.status_code == 200
        assert "columns" in res.json()

    # Records with filtering
    res = client.get("/api/dataset/records?table=transactions&limit=10&page=1&purchased=1")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "success"
    assert len(data["records"]) <= 10
    if len(data["records"]) > 0:
        assert data["records"][0]["purchased"] == 1

def run_all_manual():
    """CLI test runner for terminal inspection."""
    print("=" * 70)
    print("[*] RUNNING COMPREHENSIVE FASTAPI & ML INFERENCE AUDIT")
    print("=" * 70)

    test_root_and_health()
    print(" [✓] Root & Health endpoints verified.")

    test_customers_crud_and_boundaries()
    print(" [✓] Customers pagination, search, sorting & 404 boundaries verified.")

    test_spending_prediction()
    print(" [✓] Spending prediction (Linear Regression) verified.")

    test_purchase_prediction()
    print(" [✓] Purchase prediction (Logistic Regression) verified.")

    test_segment_prediction()
    print(" [✓] Customer segmentation (K-Means Clustering) verified.")

    test_recommendations()
    print(" [✓] KNN Product Recommender & fallback mechanisms verified.")

    test_analytics_endpoints()
    print(" [✓] Analytics (Overview, Sales, Segments, Funnel, Categories) verified.")

    test_models_metadata()
    print(" [✓] Model Performance & Metadata verified.")

    test_dataset_explorer()
    print(" [✓] Dataset Explorer (Schema & Records) verified.")

    print("=" * 70)
    print("[SUCCESS] ALL 9 ENDPOINT SUITES PASSED FLAWLESSLY WITH 0 ERRORS!")
    print("=" * 70)

if __name__ == "__main__":
    run_all_manual()
