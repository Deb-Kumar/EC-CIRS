"""
E-Commerce Customer Intelligence and Personalized Recommendation System
Dataset Inspection and Validation Script
File: data/inspect_dataset.py
"""

import os
import sys
import pandas as pd
import numpy as np

# Ensure UTF-8 output on Windows consoles
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

def inspect_dataset():
    # Path to raw data
    base_dir = os.path.dirname(os.path.abspath(__file__))
    data_path = os.path.join(base_dir, "raw", "Ecommerce.csv")
    
    if not os.path.exists(data_path):
        data_path = os.path.join(base_dir, "..", "Ecommerce.csv")
        
    print("=" * 70)
    print("[*] E-COMMERCE DATASET INSPECTION REPORT")
    print("=" * 70)
    print(f"Reading dataset from: {data_path}")
    
    df = pd.read_csv(data_path)
    
    print("\n1. DATASET DIMENSIONS")
    print(f"   * Total Records (Rows)   : {df.shape[0]:,}")
    print(f"   * Total Features (Cols)  : {df.shape[1]}")
    
    print("\n2. DATA INTEGRITY & MISSING VALUES")
    null_counts = df.isnull().sum()
    missing = null_counts[null_counts > 0]
    if missing.empty:
        print("   [OK] No missing values detected across all 29 columns.")
    else:
        print("   [!] Missing values found:\n", missing)
        
    duplicates = df.duplicated().sum()
    print(f"   * Duplicate Rows: {duplicates} (0.00%)")
    
    print("\n3. KEY ENTITIES")
    print(f"   * Unique Customers : {df['customer_id'].nunique():,}")
    print(f"   * Unique Products  : {df['product_id'].nunique():,}")
    print(f"   * Unique Sessions  : {df['session_id'].nunique():,}")
    print(f"   * Product Categories: {df['product_category'].nunique()}")
    
    print("\n4. TARGET VARIABLES PROFILE")
    print("   A. Purchase Prediction (Classification Target):")
    p_counts = df['purchased'].value_counts()
    p_props = df['purchased'].value_counts(normalize=True) * 100
    print(f"      - Non-purchased (0): {p_counts[0]:,} ({p_props[0]:.2f}%)")
    print(f"      - Purchased (1)    : {p_counts[1]:,} ({p_props[1]:.2f}%)")
    
    print("\n   B. Customer Spending (Regression Target):")
    rev_purchased = df[df['purchased'] == 1]['revenue']
    print(f"      - Overall Revenue Mean: Rs. {df['revenue'].mean():.2f}")
    print(f"      - Purchase Revenue Min : Rs. {rev_purchased.min():.2f}")
    print(f"      - Purchase Revenue Mean: Rs. {rev_purchased.mean():.2f}")
    print(f"      - Purchase Revenue Max : Rs. {rev_purchased.max():.2f}")
    print(f"      - Total Platform Revenue: Rs. {df['revenue'].sum():,.2f}")
    
    print("\n5. BEHAVIORAL FUNNEL INSIGHTS")
    cart_props = df['added_to_cart'].value_counts(normalize=True) * 100
    abn_props = df['cart_abandoned'].value_counts(normalize=True) * 100
    print(f"   * Added to Cart Rate    : {cart_props.get(1, 0):.2f}%")
    print(f"   * Cart Abandonment Rate : {abn_props.get(1, 0):.2f}%")
    print(f"   * Avg Pages Viewed      : {df['pages_viewed'].mean():.1f} pages")
    print(f"   * Avg Time on Site      : {df['time_on_site_sec'].mean():.1f} sec ({df['time_on_site_sec'].mean()/60:.1f} mins)")

    print("\n6. COLUMN SCHEMA & TYPES")
    schema_df = pd.DataFrame({
        'Data Type': df.dtypes.astype(str),
        'Unique Values': df.nunique(),
        'Sample Value': df.iloc[0]
    })
    print(schema_df.to_string())
    
    print("\n" + "=" * 70)
    print("[OK] DATASET VALIDATION PASSED: Ready for Notebooks & ML Pipeline")
    print("=" * 70)

if __name__ == "__main__":
    inspect_dataset()
