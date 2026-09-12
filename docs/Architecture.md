# System Architecture

## E-Commerce Customer Intelligence and Personalized Recommendation System

**Version:** 1.0

---

# 1. Architecture Overview

The system follows a modular layered architecture.

```text
                  ┌──────────────────────┐
                  │   E-Commerce Data    │
                  │     Ecommerce.csv    │
                  └──────────┬───────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │   Data Processing    │
                  │ Cleaning + Encoding  │
                  │ Feature Engineering  │
                  └──────────┬───────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │     EDA & Analysis   │
                  └──────────┬───────────┘
                             │
             ┌───────────────┼────────────────┐
             │               │                │
             ▼               ▼                ▼
      ┌─────────────┐ ┌──────────────┐ ┌──────────────┐
      │ Regression  │ │ Classification│ │  Clustering  │
      │             │ │              │ │              │
      │ Linear      │ │ Logistic     │ │ K-Means      │
      │ Regression  │ │ Regression   │ │              │
      └──────┬──────┘ └──────┬───────┘ └──────┬───────┘
             │               │                │
             │               │                │
             ▼               ▼                ▼
       Spending        Purchase          Customer
       Prediction      Probability      Segmentation

                         ┌───────────────┐
                         │      KNN      │
                         │ Recommendation│
                         └───────┬───────┘
                                 │
                                 ▼
                         Recommended Products

                                 │
                                 ▼
                       ┌──────────────────┐
                       │   Model Storage  │
                       │      Joblib      │
                       └────────┬─────────┘
                                │
                                ▼
                       ┌──────────────────┐
                       │     FastAPI      │
                       │      Backend     │
                       └────────┬─────────┘
                                │
                                ▼
                       ┌──────────────────┐
                       │  React Frontend  │
                       │    Dashboard     │
                       └──────────────────┘
```

---

# 2. Architecture Layers

## Layer 1: Data Layer

Responsible for storing and managing datasets.

```text
data/
├── raw/
├── processed/
└── external/
```

### Raw Data
Original: `data/raw/Ecommerce.csv`. The raw dataset must never be modified.

### Processed Data
Contains cleaned and transformed datasets (`cleaned_data.csv`, `customer_features.csv`).

---

# 3. Data Processing Layer

Responsibilities:
- Data loading
- Data type conversion
- Missing value handling
- Duplicate detection
- Outlier analysis
- Categorical encoding
- Numerical scaling
- Feature engineering

Example pipeline:
```text
Raw Data (Ecommerce.csv)
   ↓
Data Validation
   ↓
Missing Value Handling
   ↓
Duplicate Handling
   ↓
Data Type Correction
   ↓
Categorical Encoding
   ↓
Feature Engineering
   ↓
Scaling
   ↓
Processed Dataset
```

---

# 4. Feature Engineering Layer

Potential customer-level features:
```text
Total Purchases
Total Spending
Average Order Value
Purchase Frequency
Average Session Duration
Pages Viewed
Add-to-Cart Count
Cart Abandonment Rate
Average Discount
Average Rating
Visit Frequency
```

Exact features mapped from dataset columns:
- Transactional: `quantity`, `discount_percent`, `discount_amount`, `revenue`, `unit_price`
- Behavioral: `pages_viewed`, `time_on_site_sec`, `added_to_cart`, `cart_abandoned`, `session_duration_bucket`
- Categorical: `device_type`, `marketing_channel`, `payment_method`, `user_type`, `location`

---

# 5. Machine Learning Layer

The machine learning layer contains four major components.

---

## 5.1 Spending Prediction

- **Algorithm:** Linear Regression
- **Input:** Customer behavioral and historical features
- **Output:** Predicted Future Spending
- **Evaluation:** MAE, MSE, RMSE, R²
- **Important:** The target must represent future spending or a clearly defined prediction horizon. Future information must not be included in the input features.

---

## 5.2 Purchase Prediction

- **Algorithm:** Logistic Regression
- **Input:** Customer/session behavior (`pages_viewed`, `time_on_site_sec`, `added_to_cart`, `discount_percent`, etc.)
- **Output:** Purchase Probability (0.0 to 1.0) and Binary Classification (`purchased`: 0 or 1)
- **Evaluation:** Accuracy, Precision, Recall, F1, ROC-AUC

---

## 5.3 Customer Segmentation

- **Algorithm:** K-Means Clustering
- **Input:** Customer-level behavioral features (Recency, Frequency, Monetary value, Cart abandonment rate, Session duration)
- **Output:** Cluster IDs (interpreted post-hoc as Premium, Regular, Occasional based on centroid stats)
- **Evaluation:** Elbow Method, Silhouette Score, Davies-Bouldin Index

---

## 5.4 Recommendation System

- **Algorithm:** K-Nearest Neighbors (KNN)
- **Process:**
```text
Customer
   ↓
Customer Feature Vector
   ↓
Similarity Calculation (Cosine / Euclidean)
   ↓
Nearest Customers / Products
   ↓
Candidate Products
   ↓
Remove Already Purchased Products
   ↓
Rank Products
   ↓
Top-N Recommendations
```

---

# 6. Model Storage

Models should be stored separately in `models/`:
```text
models/
├── spending_model.pkl
├── purchase_model.pkl
├── segmentation_model.pkl
├── recommendation_model.pkl
├── spending_scaler.pkl
├── purchase_scaler.pkl
├── segmentation_scaler.pkl
└── feature_metadata.json
```
Models must be stored together with required preprocessing objects, feature orders, and metadata.

---

# 7. Backend Architecture

- **Technology:** FastAPI + Uvicorn
- **Structure:**
```text
React Frontend
      ↓
FastAPI Routes (/api/...)
      ↓
Service Layer
      ↓
ML Prediction Layer
      ↓
Model Files (.pkl) & PostgreSQL Database
```

---

# 8. Suggested API Endpoints

## Health
```http
GET /api/health
```

## Customers
```http
GET /api/customers
GET /api/customers/{customer_id}
```

## Spending
```http
POST /api/predict/spending
```

## Purchase
```http
POST /api/predict/purchase
```

## Recommendation
```http
POST /api/recommend
```

## Segmentation
```http
GET /api/customers/{customer_id}/segment
```

## Analytics
```http
GET /api/analytics/overview
GET /api/analytics/sales
GET /api/analytics/customers
```

## Models
```http
GET /api/models/performance
```

---

# 9. Database Architecture

PostgreSQL schema for persistence:
```text
users
customers
products
transactions
customer_features
predictions
recommendations
customer_segments
model_versions
```

---

# 10. Database Relationships

```text
Users
  │
  ▼
Customers
  │
  ├───────────────┐
  │               │
  ▼               ▼
Transactions    Customer Features
  │               │
  ▼               ▼
Products       ML Predictions
                  │
                  ├── Spending
                  ├── Purchase
                  ├── Segment
                  └── Recommendation
```

---

# 11. Frontend Architecture

- **Framework:** React + TypeScript / JavaScript
- **Suggested structure:**
```text
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── services/
│   ├── hooks/
│   ├── types/
│   ├── utils/
│   └── App.tsx
```

---

# 12. Frontend Pages

```text
/login
/dashboard
/customers
/customers/:id
/spending
/purchase
/recommendations
/segments
/models
/analytics
/settings
```

---

# 13. Dashboard Architecture

```text
Header
│
├── Search
├── Notifications
└── Profile

Sidebar
│
├── Dashboard
├── Customers
├── Analytics
├── Spending
├── Purchase
├── Recommendations
├── Segments
└── Models

Main Content
│
├── KPI Cards
├── Sales Chart
├── Customer Chart
├── Segment Distribution
├── Purchase Probability
└── Recommendations
```

---

# 14. Complete Data Flow

```text
Ecommerce.csv
      ↓
Data Validation
      ↓
Cleaning
      ↓
Feature Engineering
      ↓
EDA
      ↓
Train/Test Split
      ↓
Model Training
      ↓
Model Evaluation
      ↓
Model Optimization
      ↓
Model Serialization
      ↓
FastAPI
      ↓
React Dashboard
      ↓
User
```

---

# 15. Deployment Architecture

```text
                   Internet
                      │
             ┌────────┴────────┐
             │                 │
             ▼                 ▼
       React Frontend      FastAPI Backend
                               │
                               ▼
                          PostgreSQL
                               │
                               ▼
                         ML Model Files
```

---

# 16. Architecture Principles

The system adheres to:
- Modularity & Separation of Concerns
- Reusability & Reproducibility
- Security & Input Validation
- Scalability & Maintainability
- Testability
- Strict Data Leakage Prevention
