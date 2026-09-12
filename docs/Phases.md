# Project Development Phases

## E-Commerce Customer Intelligence and Personalized Recommendation System

**Version:** 1.0

---

# Phase 0 — Project Planning

## Objectives
- Finalize project title.
- Define problem statement & objectives.
- Define 4 ML tasks (Spending, Purchase, Segmentation, Recommendation).
- Define technology stack.

## Deliverables
- `docs/PRD.md`
- `docs/Architecture.md`
- `docs/Rules.md`
- `docs/Design.md`
- `docs/Phases.md`
- `docs/Memory.md`

---

# Phase 1 — Environment Setup

## Tasks
- Install/verify Python, Pandas, NumPy, Scikit-learn, Matplotlib, Plotly, FastAPI, Uvicorn, React.
- Set up project directory structure.

---

# Phase 2 — Dataset Acquisition

## Tasks
- Obtain `Ecommerce.csv`.
- Store safely in `data/raw/Ecommerce.csv`.
- Do not modify the original raw file.

---

# Phase 3 — Dataset Understanding

## Tasks
- Inspect Shape, Columns, Data types, Missing values, Duplicates, Unique values, Distributions.
- Deliverable: `notebooks/01_data_loading.ipynb`.

---

# Phase 4 — Data Cleaning

## Tasks
- Validate data types (e.g. `visit_date` parsing).
- Check impossible values (e.g. negative prices or quantities).
- Check inconsistent categories.
- Deliverable: `notebooks/02_data_cleaning.ipynb` & `data/processed/cleaned_data.csv`.

---

# Phase 5 — Feature Engineering

## Tasks
- Customer-level aggregation: Total spending, purchase frequency, average order value, cart abandonment rate, session duration metrics.
- Deliverable: `notebooks/03_feature_engineering.ipynb` & `data/processed/customer_features.csv`.

---

# Phase 6 — Exploratory Data Analysis (EDA)

## Tasks
- Revenue analysis, conversion rates, correlation heatmaps, seasonal & category patterns.
- Deliverable: `notebooks/04_eda.ipynb`.

---

# Phase 7 — Spending Prediction

## Tasks
- Initial algorithm: Linear Regression.
- Features: Customer historical & behavioral metrics.
- Target: Defined spending horizon.
- Evaluation: MAE, MSE, RMSE, R².
- Deliverable: `notebooks/05_spending_prediction.ipynb`.

---

# Phase 8 — Purchase Prediction

## Tasks
- Initial algorithm: Logistic Regression.
- Features: Session engagement, cart activity, discount percent.
- Target: `purchased` (0 or 1).
- Evaluation: Accuracy, Precision, Recall, F1, ROC-AUC.
- Deliverable: `notebooks/06_purchase_prediction.ipynb`.

---

# Phase 9 — Customer Segmentation

## Tasks
- Initial algorithm: K-Means Clustering.
- Feature scaling & Elbow method / Silhouette analysis across K=2..6.
- Assign interpretable cluster profiles (e.g., Premium, Regular, Occasional).
- Deliverable: `notebooks/07_customer_segmentation.ipynb`.

---

# Phase 10 — Recommendation System

## Tasks
- Initial algorithm: K-Nearest Neighbors (KNN).
- User-item interaction / feature similarity matrix.
- Candidate generation, filtering purchased items, ranking Top-N.
- Deliverable: `notebooks/08_recommendation_system.ipynb`.

---

# Phase 11 — Model Evaluation

## Tasks
- Multi-model comparison and unified performance metrics reporting.
- Deliverable: `notebooks/09_model_evaluation.ipynb`.

---

# Phase 12 — Model Optimization

## Tasks
- Hyperparameter tuning (`GridSearchCV`), regularized regression (Ridge/Lasso), class weighting for classification.

---

# Phase 13 — Model Serialization

## Tasks
- Export models and scalers into `models/` directory (`spending_model.pkl`, `purchase_model.pkl`, `segmentation_model.pkl`, `recommendation_model.pkl`, `metadata.json`).

---

# Phase 14 — PostgreSQL Database

## Tasks
- Schema creation for customers, products, transactions, features, predictions, and recommendations.

---

# Phase 15 — FastAPI Backend

## Tasks
- REST API implementation in `backend/` with Pydantic schemas, routing, prediction inference services, and CORS support.

---

# Phase 16 — React Frontend

## Tasks
- Modern SaaS dashboard in `frontend/` featuring KPI cards, charts, customer directory, prediction sandboxes, and recommendation views.

---

# Phase 17 — Integration

## Tasks
- Connect React dashboard to FastAPI endpoints.

---

# Phase 18 — Testing

## Tasks
- End-to-end testing across data pipelines, model inference APIs, and frontend user flows.

---

# Phase 19 — Deployment

## Tasks
- Environment variable configuration, production build, Docker / cloud readiness.

---

# Phase 20 — Documentation

## Tasks
- Finalize all documentation in `docs/` and root `README.md`.

---

# Phase 21 — Research Report

## Tasks
- Prepare comprehensive academic project report (Abstract to Conclusion and References).

---

# Phase 22 — Presentation

## Tasks
- Prepare slide deck (10–15 slides) covering problem, dataset, ML methods, results, and architecture.

---

# Phase 23 — Viva Preparation

## Tasks
- Comprehensive Q&A preparation covering ML theory, data leakage avoidance, algorithms, and limitations.

---

# Final Project Flow

```text
Planning → Dataset → Cleaning → Feature Engineering → EDA
   ↓
Spending Prediction (Linear Regression)
   ↓
Purchase Prediction (Logistic Regression)
   ↓
Customer Segmentation (K-Means)
   ↓
Recommendation System (KNN)
   ↓
Evaluation & Optimization
   ↓
Serialization → Database → FastAPI Backend → React Frontend
   ↓
Testing → Deployment → Documentation → Viva Preparation
```
