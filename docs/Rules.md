# Project Development Rules

## E-Commerce Customer Intelligence and Personalized Recommendation System

**Version:** 1.0

---

# 1. General Development Rules

1. Follow a modular architecture.
2. Keep data science, backend, and frontend code separate.
3. Do not place all code in one file.
4. Use meaningful variable and function names.
5. Write reusable functions.
6. Maintain documentation.
7. Keep experiments reproducible.

---

# 2. Dataset Rules

## Rule 01 — Never Modify Raw Data
The original dataset:
```text
data/raw/Ecommerce.csv
```
must never be overwritten.  
All transformations must generate processed datasets:
```text
raw → processed
```
Never:
```text
raw → overwrite
```

---

# 3. Dataset Inspection Rules

Before developing machine learning models, inspect:
- Number of rows
- Number of columns
- Column names
- Data types
- Missing values
- Duplicate rows
- Unique values
- Numerical distributions
- Categorical distributions
- Outliers

Do not assume dataset columns before inspection.

---

# 4. Data Cleaning Rules

The cleaning pipeline must handle:
- Missing values
- Duplicates
- Invalid values
- Incorrect data types
- Impossible numerical values
- Inconsistent categories

Every cleaning decision must be documented.

---

# 5. Missing Value Rules

Do not automatically delete all rows containing missing values. First determine:
- Percentage missing
- Importance of the feature
- Whether missingness contains information

Possible methods:
- **Numerical:** Median / Mean / Model-based
- **Categorical:** Mode / "Unknown"
- **Large missing percentage:** Drop feature if justified

---

# 6. Encoding Rules

Categorical variables must be transformed appropriately.  
Possible techniques:
- One-Hot Encoding
- Ordinal Encoding
- Target Encoding where appropriate

Encoding must be fitted only on training data to prevent leakage.

---

# 7. Scaling Rules

Scaling should be performed for algorithms that benefit from it (KNN, K-Means, Logistic Regression, Linear Regression with regularization).  
The scaler must be fitted only on training data.

---

# 8. Data Leakage Rules

Data leakage is strictly prohibited.  
Do not use information that would not be available at prediction time. For example, future purchase or session information must not be used to predict an earlier purchase or spending event.

---

# 9. Train/Test Rules

Use a proper train/test strategy:
- For classification: `Stratified Split` when target classes are imbalanced.
- For time-dependent spending prediction: `Time-aware split` where appropriate.

---

# 10. Feature Engineering Rules

Features must have a logical relationship with the prediction task:
- Purchase Frequency
- Average Order Value
- Total Spending
- Session Duration
- Pages Viewed
- Cart Activity

Feature engineering decisions must be documented.

---

# 11. Spending Prediction Rules

- **Algorithm:** Linear Regression
- The target must represent a meaningful future spending value.
- Do not use future spending information as an input feature.
- **Evaluation:** MAE, MSE, RMSE, R²
- Additional regression models may be tested during optimization.

---

# 12. Purchase Prediction Rules

- **Algorithm:** Logistic Regression
- The target must be a clearly defined binary variable:
  - 0 = No Purchase
  - 1 = Purchase
- The target definition must be documented.
- **Evaluation:** Accuracy, Precision, Recall, F1 Score, ROC-AUC
- Do not rely on accuracy alone if classes are imbalanced.

---

# 13. Customer Segmentation Rules

- **Algorithm:** K-Means
- Do not automatically assume `K = 3`.
- Evaluate multiple values: K = 2, 3, 4, 5, 6.
- Use:
  - Elbow Method
  - Silhouette Score
  - Davies-Bouldin Index
- Cluster labels must be interpreted after analyzing cluster characteristics.

---

# 14. Recommendation Rules

- **Initial algorithm:** KNN
- Recommendations should be based on meaningful similarity.
- Do not recommend:
  - Already purchased products (unless repeat purchases are intentionally supported)
  - Invalid products
  - Missing or unavailable products
- Evaluate recommendation quality when ground-truth interaction data allows it (Precision@K, Recall@K, Hit Rate@K).

---

# 15. Model Evaluation Rules

Each model must have appropriate evaluation metrics:

| Model | Metrics |
|---|---|
| Linear Regression | MAE, MSE, RMSE, R² |
| Logistic Regression | Accuracy, Precision, Recall, F1, ROC-AUC |
| K-Means | Silhouette, Davies-Bouldin, Elbow |
| KNN Recommendation | Precision@K, Recall@K, Hit Rate@K |

---

# 16. Model Optimization Rules

Optimization can include:
- Hyperparameter tuning (`GridSearchCV`, `RandomizedSearchCV`)
- Feature selection
- Feature engineering
- Scaling improvements
- Class balancing
- Cross-validation

Do not optimize on the final test set.

---

# 17. Model Saving Rules

Every production model must be saved with:
- Model object (`.pkl`)
- Required scaler (`.pkl`)
- Feature order
- Feature metadata
- Version information

---

# 18. API Rules

Every API must:
- Validate input.
- Return predictable JSON.
- Handle errors cleanly.
- Use HTTP status codes correctly.
- Never expose internal stack traces in production.

---

# 19. Security Rules

Never hard-code:
- Database passwords
- API keys
- Secret keys
- JWT secrets

Use `.env` and environment variables. The `.env` file must not be committed to Git.

---

# 20. Database Rules

Use normalized database structures where practical:
- Primary keys
- Foreign keys
- Indexes where required
- Constraints
- Appropriate data types
- Never store passwords as plain text

---

# 21. Frontend Rules

The frontend must:
- Be responsive.
- Show loading states.
- Show error states.
- Validate user inputs.
- Avoid unnecessary API requests.
- Display ML outputs clearly.
- Charts must have meaningful titles, axis labels, legends, and readable values.

---

# 22. Git Rules

Recommended branches:
- `main`
- `develop`
- `feature/data-processing`
- `feature/ml-models`
- `feature/backend`
- `feature/frontend`

Commit messages should be meaningful (`feat:`, `fix:`, `docs:`, `chore:`).

---

# 23. Notebook Rules

Notebooks should follow the sequential roadmap:
1. `01_data_loading.ipynb`
2. `02_data_cleaning.ipynb`
3. `03_feature_engineering.ipynb`
4. `04_eda.ipynb`
5. `05_spending_prediction.ipynb`
6. `06_purchase_prediction.ipynb`
7. `07_customer_segmentation.ipynb`
8. `08_recommendation_system.ipynb`
9. `09_model_evaluation.ipynb`

Each notebook must have: Objective, Imports, Data loading, Processing, Analysis/Model, Results, and Conclusion.

---

# 24. Academic Integrity Rules

Never fabricate experimental results. Do not manually enter fake accuracy or scores. All reported metrics must come from executed code on the actual dataset.

---

# 25. Documentation Rules

Keep the following updated:
- `PRD.md`
- `Architecture.md`
- `Rules.md`
- `Design.md`
- `Phases.md`
- `Memory.md`

---

# 26. Testing Rules

Test:
- Data pipeline
- Feature engineering
- Model prediction
- API endpoints
- Database operations
- Frontend components
- End-to-end integration

---

# 27. Final Quality Rules

Before project completion verify:
- Dataset works.
- Processing works.
- Models train successfully.
- Models are evaluated.
- Models are saved.
- API works.
- Database works.
- Frontend works.
- Dashboard displays real results.
- Documentation is complete.
- No fake metrics exist.
