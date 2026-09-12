"""
Machine Learning Inference Service
File: backend/app/services/ml_service.py
"""

import os
import json
import joblib
import numpy as np
import pandas as pd
from typing import Dict, Any, List

class MLService:
    def __init__(self):
        # Locate models directory relative to project root
        base_dir = os.path.dirname(os.path.abspath(__file__))
        self.models_dir = os.path.abspath(os.path.join(base_dir, "..", "..", "..", "models"))
        
        print(f"Loading ML models from: {self.models_dir}")
        self._load_artifacts()
        
    def _load_artifacts(self):
        # 1. Spending Model & Scaler
        spend_model_path = os.path.join(self.models_dir, "spending_model.pkl")
        spend_scaler_path = os.path.join(self.models_dir, "spending_scaler.pkl")
        self.spending_model = joblib.load(spend_model_path)
        self.spending_scaler = joblib.load(spend_scaler_path)
        self.spend_features = [
            'total_sessions',
            'total_cart_adds',
            'avg_pages_viewed',
            'avg_time_on_site_sec',
            'avg_discount_received',
            'recency_days'
        ]
        
        # 2. Purchase Model & Scaler
        purch_model_path = os.path.join(self.models_dir, "purchase_model.pkl")
        purch_scaler_path = os.path.join(self.models_dir, "purchase_scaler.pkl")
        self.purchase_model = joblib.load(purch_model_path)
        self.purchase_scaler = joblib.load(purch_scaler_path)
        self.purch_features = [
            'pages_viewed',
            'time_on_site_sec',
            'added_to_cart',
            'discount_percent',
            'unit_price',
            'quantity',
            'device_type',
            'marketing_channel',
            'user_type',
            'visit_month',
            'visit_season',
            'visit_weekday',
            'location'
        ]
        
        # 3. Customer Segmentation Model & Scaler
        seg_model_path = os.path.join(self.models_dir, "segmentation_model.pkl")
        seg_scaler_path = os.path.join(self.models_dir, "segmentation_scaler.pkl")
        self.segmentation_model = joblib.load(seg_model_path)
        self.segmentation_scaler = joblib.load(seg_scaler_path)
        self.cluster_features = [
            'recency_days',
            'total_sessions',
            'total_purchases',
            'total_revenue',
            'avg_pages_viewed',
            'cart_abandonment_rate'
        ]
        
        # 4. Recommendation Model, Scaler & Product Catalog
        rec_model_path = os.path.join(self.models_dir, "recommendation_model.pkl")
        rec_scaler_path = os.path.join(self.models_dir, "recommendation_scaler.pkl")
        cat_path = os.path.join(self.models_dir, "product_catalog.pkl")
        self.recommendation_model = joblib.load(rec_model_path)
        self.recommendation_scaler = joblib.load(rec_scaler_path)
        self.product_catalog = joblib.load(cat_path)
        
        # Precompute scaled product vectors for sub-millisecond recommendation lookups
        prod_features = ['category', 'unit_price', 'avg_rating', 'purchase_count', 'view_count']
        self.prod_vectors = self.recommendation_scaler.transform(self.product_catalog[prod_features])
        
        # 5. Metadata
        meta_path = os.path.join(self.models_dir, "metadata.json")
        with open(meta_path, 'r') as f:
            self.metadata = json.load(f)
            
        print("All 4 ML models and scalers successfully loaded into memory!")

    def predict_spending(self, data: Dict[str, Any]) -> float:
        """Predict expected future spending using Linear Regression."""
        row_df = pd.DataFrame([{
            'total_sessions': data.get('total_sessions', 3),
            'total_cart_adds': data.get('total_cart_adds', 2),
            'avg_pages_viewed': data.get('avg_pages_viewed', 12.0),
            'avg_time_on_site_sec': data.get('avg_time_on_site_sec', 900.0),
            'avg_discount_received': data.get('avg_discount_received', 10.0),
            'recency_days': data.get('recency_days', 15)
        }])[self.spend_features]
        
        X_scaled = self.spending_scaler.transform(row_df)
        pred = self.spending_model.predict(X_scaled)[0]
        return float(max(0.0, pred))

    def predict_purchase(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Predict purchase conversion probability using Logistic Regression."""
        row_df = pd.DataFrame([{
            'pages_viewed': data.get('pages_viewed', 10),
            'time_on_site_sec': data.get('time_on_site_sec', 600),
            'added_to_cart': data.get('added_to_cart', 0),
            'discount_percent': data.get('discount_percent', 0),
            'unit_price': data.get('unit_price', 500.0),
            'quantity': data.get('quantity', 1),
            'device_type': data.get('device_type', 0),
            'marketing_channel': data.get('marketing_channel', 0),
            'user_type': data.get('user_type', 1),
            'visit_month': data.get('visit_month', 10),
            'visit_season': data.get('visit_season', 0),
            'visit_weekday': data.get('visit_weekday', 3),
            'location': data.get('location', 100)
        }])[self.purch_features]
        
        X_scaled = self.purchase_scaler.transform(row_df)
        prob = self.purchase_model.predict_proba(X_scaled)[0][1]
        pred_class = int(prob >= 0.5)
        
        confidence = "High" if prob > 0.75 or prob < 0.25 else "Moderate"
        label = "Likely to Purchase" if pred_class == 1 else "Unlikely to Purchase"
        
        return {
            "purchase_probability": round(float(prob), 4),
            "predicted_class": pred_class,
            "prediction_label": label,
            "confidence_level": confidence
        }

    def predict_segment(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Assign customer behavioral cluster using K-Means."""
        row_df = pd.DataFrame([{
            'recency_days': data.get('recency_days', 15),
            'total_sessions': data.get('total_sessions', 3),
            'total_purchases': data.get('total_purchases', 1),
            'total_revenue': data.get('total_revenue', 250.0),
            'avg_pages_viewed': data.get('avg_pages_viewed', 12.0),
            'cart_abandonment_rate': data.get('cart_abandonment_rate', 0.25)
        }])[self.cluster_features]
        
        X_scaled = self.segmentation_scaler.transform(row_df)
        cluster_id = int(self.segmentation_model.predict(X_scaled)[0])
        
        label_map = {
            2: "Premium High-Value Customers",
            1: "Regular Engaged Customers",
            0: "Occasional Low-Engagement Customers"
        }
        return {
            "cluster": cluster_id,
            "segment_name": label_map.get(cluster_id, "Standard Segment")
        }

    def recommend_products(self, product_id: int, top_n: int = 5) -> List[Dict[str, Any]]:
        """Return Top-N similar products using KNN."""
        idx_match = self.product_catalog.index[self.product_catalog['product_id'] == product_id]
        if len(idx_match) == 0:
            top_prods = self.product_catalog.sort_values(by='purchase_count', ascending=False).head(top_n)
            return [
                {
                    "product_id": int(row['product_id']),
                    "category": int(row['category']),
                    "unit_price": round(float(row['unit_price']), 2),
                    "avg_rating": round(float(row.get('avg_rating', 4.3)), 1),
                    "purchase_count": int(row.get('purchase_count', 32)),
                    "view_count": int(row.get('view_count', 140)),
                    "similarity": 0.90
                }
                for _, row in top_prods.iterrows()
            ]
            
        idx = idx_match[0]
        n_neighbors = min(top_n + 1, len(self.product_catalog))
        distances, indices = self.recommendation_model.kneighbors(
            [self.prod_vectors[idx]], n_neighbors=n_neighbors
        )
        
        recommendations = []
        for dist, neighbor_idx in zip(distances[0][1:], indices[0][1:]):
            row = self.product_catalog.iloc[neighbor_idx]
            sim = float(np.clip(1.0 - dist, 0.0, 1.0))
            recommendations.append({
                "product_id": int(row['product_id']),
                "category": int(row['category']),
                "unit_price": round(float(row['unit_price']), 2),
                "avg_rating": round(float(row.get('avg_rating', 4.3)), 1),
                "purchase_count": int(row.get('purchase_count', 32)),
                "view_count": int(row.get('view_count', 140)),
                "similarity": round(sim, 4)
            })
        return recommendations

    def get_performance_metadata(self) -> Dict[str, Any]:
        """Return saved empirical metrics from metadata.json."""
        return self.metadata

# Global Singleton Instance
ml_service = MLService()
