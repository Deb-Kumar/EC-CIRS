# Project Memory

## E-Commerce Customer Intelligence and Personalized Recommendation System

**Project Type:** MCA Academic Project  
**Domain:** Data Science + Machine Learning + E-Commerce  
**Status:** Dataset Acquired & Inspected — Ready for Notebook Implementation  
**Version:** 1.0

---

# 1. Project Name

## E-Commerce Customer Intelligence and Personalized Recommendation System Using Data Science and Machine Learning

Short name:
```text
EC-CIRS
```

---

# 2. Project Purpose

The project analyzes e-commerce customer behavior and uses machine learning to produce customer intelligence and personalized recommendations across four core tasks:
1. Spending Prediction (Linear Regression)
2. Purchase Prediction (Logistic Regression)
3. Customer Segmentation (K-Means)
4. Product Recommendation (KNN)

---

# 3. Primary Dataset (Inspected & Verified)

- **Dataset:** Indian E-Commerce Customer Behavior & Purchase
- **File:** `data/raw/Ecommerce.csv`
- **Total Records:** 25,000
- **Total Columns:** 29
- **Missing Values:** 0 across all columns
- **Unique Customers:** 8,442
- **Unique Products:** 899
- **Purchased Distribution:** 22.46% (1) vs 77.54% (0)
- **Cart Abandoned Distribution:** 42.00% (1) vs 58.00% (0)
- **Revenue Distribution:** Min ₹0, Max ₹7,889.36, Mean ₹404.65

### Verified Column Schema:
| Column | Type | Category |
|---|---|---|
| `customer_id` | int64 | Customer ID |
| `session_id` | int64 | Session ID |
| `visit_date` | string (DD-MM-YYYY) | Temporal |
| `device_type` | int64 | Categorical Device |
| `user_type` | int64 | Categorical User |
| `marketing_channel` | int64 | Categorical Marketing |
| `product_id` | int64 | Product ID |
| `product_category` | int64 | Category ID |
| `unit_price` | float64 | Price |
| `quantity` | int64 | Quantity |
| `discount_percent` | int64 | Discount % |
| `discount_amount` | float64 | Discount Amount |
| `revenue` | float64 | Financial Revenue |
| `pages_viewed` | int64 | Session Engagement |
| `time_on_site_sec` | int64 | Session Duration |
| `added_to_cart` | int64 | Cart Binary |
| `purchased` | int64 | Target Binary |
| `cart_abandoned` | int64 | Behavioral Binary |
| `rating` | int64 | Feedback Score |
| `review_text` | int64 | Review Indicator/Code |
| `review_helpful_votes` | int64 | Feedback Engagement |
| `payment_method` | int64 | Payment Category |
| `visit_day` | int64 | Calendar Day |
| `visit_month` | int64 | Calendar Month |
| `visit_weekday` | int64 | Calendar Day-of-Week |
| `visit_season` | int64 | Seasonal Code |
| `session_duration_bucket` | string | Duration Bucket |
| `revenue_normalized` | float64 | Normalized Metric |
| `location` | int64 | Geographic Code |

---

# 4. Core Machine Learning Formulations

## Spending Prediction
- **Model:** Linear Regression
- **Target:** Customer Future Spending (aggregated or session-level revenue)
- **Evaluation:** MAE, MSE, RMSE, R² Score

## Purchase Prediction
- **Model:** Logistic Regression
- **Target:** `purchased` (Binary: 0 or 1)
- **Evaluation:** Accuracy, Precision, Recall, F1 Score, ROC-AUC

## Customer Segmentation
- **Model:** K-Means
- **Features:** RFM + Behavioral (Order frequency, total spending, AOV, cart abandonment rate, session duration)
- **Evaluation:** Elbow Method, Silhouette Score, Davies-Bouldin Index

## Recommendation System
- **Model:** K-Nearest Neighbors (KNN)
- **Input:** User-item interaction and product rating/category matrix
- **Evaluation:** Precision@K, Recall@K, Hit Rate@K

---

# 5. Project Technology Stack

- **Data Science:** Python 3.14, Pandas, NumPy, Scikit-learn
- **Visualization:** Matplotlib, Plotly, Chart.js
- **Backend:** FastAPI, Uvicorn
- **Frontend:** React, TypeScript, HTML, CSS
- **Database:** PostgreSQL
- **Model Storage:** Joblib
- **Development:** Jupyter Notebooks, VS Code, Git

---

# 6. Project Directory Layout

```text
E-commerce Customer Analysis/
│
├── data/
│   ├── raw/
│   │   └── Ecommerce.csv
│   ├── processed/
│   │   ├── cleaned_data.csv
│   │   └── customer_features.csv
│   └── external/
│
├── notebooks/
│   ├── 01_data_loading.ipynb
│   ├── 02_data_cleaning.ipynb
│   ├── 03_feature_engineering.ipynb
│   ├── 04_eda.ipynb
│   ├── 05_spending_prediction.ipynb
│   ├── 06_purchase_prediction.ipynb
│   ├── 07_customer_segmentation.ipynb
│   ├── 08_recommendation_system.ipynb
│   └── 09_model_evaluation.ipynb
│
├── models/
├── backend/
├── frontend/
├── reports/
├── docs/
│   ├── PRD.md
│   ├── Architecture.md
│   ├── Rules.md
│   ├── Design.md
│   ├── Phases.md
│   └── Memory.md
│
└── README.md
```

---

# 7. Notebook Execution Sequence

```text
01 → Data Loading
02 → Data Cleaning
03 → Feature Engineering
04 → Exploratory Data Analysis (EDA)
05 → Spending Prediction
06 → Purchase Prediction
07 → Customer Segmentation
08 → Recommendation System
09 → Model Evaluation
```

---

# 8. Important Constraints

- **Constraint 1:** Do not modify `data/raw/Ecommerce.csv`.
- **Constraint 2:** Strict avoidance of data leakage (scalers/encoders fit only on training sets).
- **Constraint 3:** No fabricated metrics (all numbers must originate from executable scripts).
- **Constraint 4:** K-Means must empirically test multiple values of K (e.g. K=2..6) via Elbow and Silhouette rather than blindly picking K=3.
- **Constraint 5:** Logistic Regression evaluation must account for class imbalance (22.5% positive conversion).

---

# 9. Current Project Status

- **Status:** Phases 0 through 15 COMPLETED.
  - Data loading, cleaning, and feature engineering complete (`cleaned_data.csv`, `customer_features.csv`).
  - All 4 machine learning models trained, evaluated, and saved to `models/`.
  - True experimental metrics logged in `models/metadata.json`.
  - All 9 sequential Jupyter Notebooks generated in `notebooks/`.
  - Database schema and seeder operational (`backend/ecommerce.db` seeded with 8,442 customers, 899 products, segments, and transactions).
  - FastAPI Backend Application implemented with 6 routers (`health`, `customers`, `predictions`, `recommendations`, `analytics`, `models_info`).
  - All 8 API test suites verified with 100% pass rate (`backend/test_api.py`).
- **Next Action:** Phase 16 (React Frontend Dashboard) & Phase 17 (Integration).


