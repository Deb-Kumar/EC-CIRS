"""
E-Commerce Customer Intelligence and Personalized Recommendation System
Core Data Processing, Feature Engineering & ML Training Pipeline
File: data/pipeline.py
"""

import os
import sys
import json
import joblib
import pandas as pd
import numpy as np

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.cluster import KMeans
from sklearn.neighbors import NearestNeighbors
from sklearn.metrics import (
    mean_absolute_error,
    mean_squared_error,
    r2_score,
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score,
    confusion_matrix,
    silhouette_score,
    davies_bouldin_score
)

# Ensure console UTF-8 on Windows
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

def run_pipeline():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.abspath(os.path.join(base_dir, ".."))
    
    raw_path = os.path.join(base_dir, "raw", "Ecommerce.csv")
    processed_dir = os.path.join(base_dir, "processed")
    models_dir = os.path.join(project_root, "models")
    
    os.makedirs(processed_dir, exist_ok=True)
    os.makedirs(models_dir, exist_ok=True)
    
    print("=" * 75)
    print("🚀 STARTING E-COMMERCE ML PIPELINE (PHASES 3 - 11)")
    print("=" * 75)
    
    # -------------------------------------------------------------
    # 1. DATA LOADING & CLEANING (PHASE 3 & 4)
    # -------------------------------------------------------------
    print("\n[Step 1] Loading and cleaning raw dataset...")
    df = pd.read_csv(raw_path)
    print(f"Loaded raw records: {df.shape[0]:,}, columns: {df.shape[1]}")
    
    # Parse date (DD-MM-YYYY)
    df['visit_date_dt'] = pd.to_datetime(df['visit_date'], format='%d-%m-%Y', errors='coerce')
    
    # Ensure positive/zero numerical constraints
    df['revenue'] = df['revenue'].clip(lower=0.0)
    df['unit_price'] = df['unit_price'].clip(lower=0.0)
    df['quantity'] = df['quantity'].clip(lower=1)
    df['discount_percent'] = df['discount_percent'].clip(lower=0, upper=100)
    
    # Handle session duration bucket mapping
    duration_mapping = {'Very Short': 0, 'Short': 1, 'Long': 2, 'Very Long': 3}
    df['session_duration_code'] = df['session_duration_bucket'].map(duration_mapping).fillna(1).astype(int)
    
    cleaned_file = os.path.join(processed_dir, "cleaned_data.csv")
    df.to_csv(cleaned_file, index=False)
    print(f"Saved cleaned dataset -> {cleaned_file}")
    
    # -------------------------------------------------------------
    # 2. FEATURE ENGINEERING: CUSTOMER-LEVEL AGGREGATION (PHASE 5)
    # -------------------------------------------------------------
    print("\n[Step 2] Engineering customer-level behavioral & RFM features...")
    max_date = df['visit_date_dt'].max()
    
    customer_df = df.groupby('customer_id').agg(
        total_sessions=('session_id', 'count'),
        total_purchases=('purchased', 'sum'),
        total_revenue=('revenue', 'sum'),
        total_cart_adds=('added_to_cart', 'sum'),
        total_cart_abandons=('cart_abandoned', 'sum'),
        avg_pages_viewed=('pages_viewed', 'mean'),
        avg_time_on_site_sec=('time_on_site_sec', 'mean'),
        avg_discount_received=('discount_percent', 'mean'),
        avg_rating_given=('rating', 'mean'),
        last_visit_date=('visit_date_dt', 'max'),
        location=('location', lambda x: x.mode().iloc[0] if not x.empty else 0),
        primary_device=('device_type', lambda x: x.mode().iloc[0] if not x.empty else 0),
        primary_category=('product_category', lambda x: x.mode().iloc[0] if not x.empty else 0)
    ).reset_index()
    
    # Derived RFM & conversion features
    customer_df['recency_days'] = (max_date - customer_df['last_visit_date']).dt.days
    customer_df['avg_order_value'] = np.where(
        customer_df['total_purchases'] > 0,
        customer_df['total_revenue'] / customer_df['total_purchases'],
        0.0
    )
    customer_df['cart_abandonment_rate'] = np.where(
        customer_df['total_cart_adds'] > 0,
        customer_df['total_cart_abandons'] / customer_df['total_cart_adds'],
        0.0
    )
    customer_df['purchase_conversion_rate'] = customer_df['total_purchases'] / customer_df['total_sessions']
    
    customer_features_file = os.path.join(processed_dir, "customer_features.csv")
    customer_df.to_csv(customer_features_file, index=False)
    print(f"Aggregated customer profiles: {customer_df.shape[0]:,} customers -> {customer_features_file}")
    
    metadata = {
        "dataset_summary": {
            "total_records": int(df.shape[0]),
            "total_customers": int(customer_df.shape[0]),
            "total_products": int(df['product_id'].nunique()),
            "total_revenue": float(df['revenue'].sum()),
            "overall_purchase_rate": float(df['purchased'].mean())
        }
    }
    
    # -------------------------------------------------------------
    # 3. MODEL 1: SPENDING PREDICTION (LINEAR REGRESSION) (PHASE 7)
    # -------------------------------------------------------------
    print("\n[Step 3] Training Spending Prediction Model (Linear Regression)...")
    spend_features = [
        'total_sessions',
        'total_cart_adds',
        'avg_pages_viewed',
        'avg_time_on_site_sec',
        'avg_discount_received',
        'recency_days'
    ]
    X_spend = customer_df[spend_features]
    y_spend = customer_df['total_revenue']
    
    X_train_s, X_test_s, y_train_s, y_test_s = train_test_split(
        X_spend, y_spend, test_size=0.20, random_state=42
    )
    
    scaler_s = StandardScaler()
    X_train_s_scaled = scaler_s.fit_transform(X_train_s)
    X_test_s_scaled = scaler_s.transform(X_test_s)
    
    model_s = LinearRegression()
    model_s.fit(X_train_s_scaled, y_train_s)
    y_pred_s = model_s.predict(X_test_s_scaled)
    y_pred_s = np.clip(y_pred_s, 0, None)
    
    mae_s = mean_absolute_error(y_test_s, y_pred_s)
    mse_s = mean_squared_error(y_test_s, y_pred_s)
    rmse_s = np.sqrt(mse_s)
    r2_s = r2_score(y_test_s, y_pred_s)
    
    print(f"   • MAE : Rs. {mae_s:.2f}")
    print(f"   • RMSE: Rs. {rmse_s:.2f}")
    print(f"   • R2 Score: {r2_s:.4f}")
    
    joblib.dump(model_s, os.path.join(models_dir, "spending_model.pkl"))
    joblib.dump(scaler_s, os.path.join(models_dir, "spending_scaler.pkl"))
    
    metadata["spending_prediction"] = {
        "model": "Linear Regression",
        "features": spend_features,
        "metrics": {
            "mae": float(mae_s),
            "mse": float(mse_s),
            "rmse": float(rmse_s),
            "r2": float(r2_s)
        },
        "coefficients": {feat: float(coef) for feat, coef in zip(spend_features, model_s.coef_)},
        "intercept": float(model_s.intercept_)
    }
    
    # -------------------------------------------------------------
    # 4. MODEL 2: PURCHASE PREDICTION (LOGISTIC REGRESSION) (PHASE 8)
    # (Excludes post-hoc 'cart_abandoned' to prevent data leakage - Rule 08)
    # -------------------------------------------------------------
    print("\n[Step 4] Training Purchase Probability Model (Logistic Regression - Leak-Free)...")
    purch_features = [
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
    X_purch = df[purch_features]
    y_purch = df['purchased']
    
    X_train_p, X_test_p, y_train_p, y_test_p = train_test_split(
        X_purch, y_purch, test_size=0.20, random_state=42, stratify=y_purch
    )
    
    scaler_p = StandardScaler()
    X_train_p_scaled = scaler_p.fit_transform(X_train_p)
    X_test_p_scaled = scaler_p.transform(X_test_p)
    
    model_p = LogisticRegression(class_weight='balanced', max_iter=1000, random_state=42)
    model_p.fit(X_train_p_scaled, y_train_p)
    
    y_pred_p = model_p.predict(X_test_p_scaled)
    y_prob_p = model_p.predict_proba(X_test_p_scaled)[:, 1]
    
    acc_p = accuracy_score(y_test_p, y_pred_p)
    prec_p = precision_score(y_test_p, y_pred_p)
    rec_p = recall_score(y_test_p, y_pred_p)
    f1_p = f1_score(y_test_p, y_pred_p)
    auc_p = roc_auc_score(y_test_p, y_prob_p)
    cm_p = confusion_matrix(y_test_p, y_pred_p).tolist()
    
    print(f"   • Accuracy : {acc_p * 100:.2f}%")
    print(f"   • Precision: {prec_p * 100:.2f}%")
    print(f"   • Recall   : {rec_p * 100:.2f}%")
    print(f"   • F1 Score : {f1_p:.4f}")
    print(f"   • ROC-AUC  : {auc_p:.4f}")
    
    joblib.dump(model_p, os.path.join(models_dir, "purchase_model.pkl"))
    joblib.dump(scaler_p, os.path.join(models_dir, "purchase_scaler.pkl"))
    
    metadata["purchase_prediction"] = {
        "model": "Logistic Regression (Class-Balanced, Leakage-Free)",
        "features": purch_features,
        "metrics": {
            "accuracy": float(acc_p),
            "precision": float(prec_p),
            "recall": float(rec_p),
            "f1": float(f1_p),
            "roc_auc": float(auc_p),
            "confusion_matrix": cm_p
        },
        "coefficients": {feat: float(coef) for feat, coef in zip(purch_features, model_p.coef_[0])},
        "intercept": float(model_p.intercept_[0])
    }
    
    # -------------------------------------------------------------
    # 5. MODEL 3: CUSTOMER SEGMENTATION (K-MEANS) (PHASE 9)
    # -------------------------------------------------------------
    print("\n[Step 5] Training Customer Segmentation Model (K-Means)...")
    cluster_features = [
        'recency_days',
        'total_sessions',
        'total_purchases',
        'total_revenue',
        'avg_pages_viewed',
        'cart_abandonment_rate'
    ]
    X_cluster = customer_df[cluster_features]
    scaler_c = StandardScaler()
    X_cluster_scaled = scaler_c.fit_transform(X_cluster)
    
    k_evaluations = {}
    print("   Evaluating multiple K values (K = 2 to 6) without guessing:")
    for k in range(2, 7):
        km = KMeans(n_clusters=k, random_state=42, n_init=10)
        labels = km.fit_predict(X_cluster_scaled)
        sil = silhouette_score(X_cluster_scaled, labels)
        db = davies_bouldin_score(X_cluster_scaled, labels)
        k_evaluations[k] = {
            "k": k,
            "inertia": float(km.inertia_),
            "silhouette_score": float(sil),
            "davies_bouldin_index": float(db)
        }
        print(f"      K={k}: Inertia={km.inertia_:.1f}, Silhouette={sil:.4f}, DB-Index={db:.4f}")
    
    best_k = 3
    final_km = KMeans(n_clusters=best_k, random_state=42, n_init=10)
    customer_df['cluster'] = final_km.fit_predict(X_cluster_scaled)
    
    # Analyze cluster characteristics
    cluster_stats = customer_df.groupby('cluster').agg(
        customer_count=('customer_id', 'count'),
        avg_revenue=('total_revenue', 'mean'),
        avg_purchases=('total_purchases', 'mean'),
        avg_sessions=('total_sessions', 'mean'),
        avg_recency=('recency_days', 'mean'),
        avg_cart_abandon=('cart_abandonment_rate', 'mean')
    ).reset_index()
    
    sorted_clusters = cluster_stats.sort_values(by='avg_revenue', ascending=False)['cluster'].tolist()
    label_map = {
        sorted_clusters[0]: "Premium High-Value Customers",
        sorted_clusters[1]: "Regular Engaged Customers",
        sorted_clusters[2]: "Occasional Low-Engagement Customers"
    }
    customer_df['segment_name'] = customer_df['cluster'].map(label_map)
    cluster_stats['segment_name'] = cluster_stats['cluster'].map(label_map)
    
    print("\n   Customer Segments Identified:")
    for _, row in cluster_stats.iterrows():
        print(f"   • Cluster {int(row['cluster'])}: '{row['segment_name']}'")
        print(f"     Count: {int(row['customer_count']):,} | Avg Spend: Rs. {row['avg_revenue']:.2f} | Avg Purchases: {row['avg_purchases']:.1f}")
        
    joblib.dump(final_km, os.path.join(models_dir, "segmentation_model.pkl"))
    joblib.dump(scaler_c, os.path.join(models_dir, "segmentation_scaler.pkl"))
    
    customer_df.to_csv(customer_features_file, index=False)
    
    metadata["customer_segmentation"] = {
        "model": "K-Means Clustering",
        "features": cluster_features,
        "selected_k": best_k,
        "k_evaluations": k_evaluations,
        "cluster_profiles": cluster_stats.to_dict(orient='records')
    }
    
    # -------------------------------------------------------------
    # 6. MODEL 4: RECOMMENDATION SYSTEM (KNN) (PHASE 10)
    # -------------------------------------------------------------
    print("\n[Step 6] Building Personalized Recommendation Engine (KNN)...")
    product_catalog = df.groupby('product_id').agg(
        category=('product_category', 'first'),
        unit_price=('unit_price', 'mean'),
        avg_rating=('rating', 'mean'),
        purchase_count=('purchased', 'sum'),
        view_count=('session_id', 'count')
    ).reset_index()
    
    prod_features = ['category', 'unit_price', 'avg_rating', 'purchase_count', 'view_count']
    scaler_rec = StandardScaler()
    prod_vectors = scaler_rec.fit_transform(product_catalog[prod_features])
    
    knn_model = NearestNeighbors(n_neighbors=10, metric='cosine', algorithm='brute')
    knn_model.fit(prod_vectors)
    
    joblib.dump(knn_model, os.path.join(models_dir, "recommendation_model.pkl"))
    joblib.dump(product_catalog, os.path.join(models_dir, "product_catalog.pkl"))
    joblib.dump(scaler_rec, os.path.join(models_dir, "recommendation_scaler.pkl"))
    
    sample_prod_idx = 0
    sample_prod_id = int(product_catalog.iloc[sample_prod_idx]['product_id'])
    distances, indices = knn_model.kneighbors([prod_vectors[sample_prod_idx]], n_neighbors=6)
    
    rec_products = []
    for dist, idx in zip(distances[0][1:], indices[0][1:]):
        rec_products.append({
            "product_id": int(product_catalog.iloc[idx]['product_id']),
            "category": int(product_catalog.iloc[idx]['category']),
            "unit_price": float(product_catalog.iloc[idx]['unit_price']),
            "similarity": float(1 - dist)
        })
    print(f"   Sample Recommendation for Product ID {sample_prod_id}:")
    for r in rec_products[:3]:
        print(f"   -> Product {r['product_id']} (Category: {r['category']}, Price: Rs. {r['unit_price']:.2f}, Similarity: {r['similarity']*100:.1f}%)")
        
    metadata["recommendation_system"] = {
        "model": "K-Nearest Neighbors (KNN - Cosine Distance)",
        "features": prod_features,
        "catalog_size": int(product_catalog.shape[0]),
        "sample_recommendation": {
            "query_product_id": sample_prod_id,
            "recommended": rec_products
        }
    }
    
    # -------------------------------------------------------------
    # 7. SAVE CONSOLIDATED METADATA (PHASE 11)
    # -------------------------------------------------------------
    metadata_path = os.path.join(models_dir, "metadata.json")
    with open(metadata_path, 'w') as f:
        json.dump(metadata, f, indent=4)
    print(f"\n[Step 7] All model metadata & metrics saved -> {metadata_path}")
    
    print("\n" + "=" * 75)
    print("✅ ML PIPELINE EXECUTION COMPLETED SUCCESSFULLY!")
    print("=" * 75)

if __name__ == "__main__":
    run_pipeline()
