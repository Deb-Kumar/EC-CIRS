"""
Database Seeder Script
File: backend/seed_db.py
"""

import os
import sys
import json
import joblib
import pandas as pd
from sqlalchemy.orm import Session

# Ensure console UTF-8 on Windows
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

# Add project root to sys.path
base_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.abspath(os.path.join(base_dir, ".."))
sys.path.insert(0, project_root)

from backend.app.database import engine, SessionLocal, Base
from backend.app.models import Customer, Product, Transaction, CustomerSegment

def seed():
    print("=" * 70)
    print("[*] SEEDING DATABASE FOR E-COMMERCE INTELLIGENCE SYSTEM")
    print("=" * 70)

    # 1. Create tables
    print("Creating database tables...")
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()

    try:
        # 2. Seed Customer Segments
        print("\n1. Seeding Customer Segments...")
        meta_path = os.path.join(project_root, "models", "metadata.json")
        with open(meta_path, 'r') as f:
            meta = json.load(f)
            
        profiles = meta["customer_segmentation"]["cluster_profiles"]
        for p in profiles:
            seg = CustomerSegment(
                cluster_id=p["cluster"],
                segment_name=p["segment_name"],
                customer_count=p["customer_count"],
                avg_revenue=p["avg_revenue"],
                avg_purchases=p["avg_purchases"],
                avg_sessions=p["avg_sessions"],
                avg_recency=p["avg_recency"],
                avg_cart_abandon=p["avg_cart_abandon"]
            )
            db.add(seg)
        db.commit()
        print(f"   -> Seeded {len(profiles)} customer segment profiles.")

        # 3. Seed Products
        print("\n2. Seeding Product Catalog...")
        cat_path = os.path.join(project_root, "models", "product_catalog.pkl")
        cat_df = joblib.load(cat_path)
        product_objs = [
            Product(
                product_id=int(row['product_id']),
                category=int(row['category']),
                unit_price=float(row['unit_price']),
                avg_rating=float(row['avg_rating']),
                purchase_count=int(row['purchase_count']),
                view_count=int(row['view_count'])
            )
            for _, row in cat_df.iterrows()
        ]
        db.bulk_save_objects(product_objs)
        db.commit()
        print(f"   -> Seeded {len(product_objs):,} products into product catalog.")

        # 4. Seed Customers
        print("\n3. Seeding Customer Features Table...")
        cust_path = os.path.join(project_root, "data", "processed", "customer_features.csv")
        cust_df = pd.read_csv(cust_path)
        
        customer_objs = [
            Customer(
                customer_id=int(row['customer_id']),
                total_sessions=int(row['total_sessions']),
                total_purchases=int(row['total_purchases']),
                total_revenue=float(row['total_revenue']),
                total_cart_adds=int(row['total_cart_adds']),
                total_cart_abandons=int(row['total_cart_abandons']),
                avg_pages_viewed=float(row['avg_pages_viewed']),
                avg_time_on_site_sec=float(row['avg_time_on_site_sec']),
                avg_discount_received=float(row['avg_discount_received']),
                avg_rating_given=float(row['avg_rating_given']),
                recency_days=int(row['recency_days']),
                avg_order_value=float(row['avg_order_value']),
                cart_abandonment_rate=float(row['cart_abandonment_rate']),
                purchase_conversion_rate=float(row['purchase_conversion_rate']),
                cluster=int(row['cluster']),
                segment_name=str(row['segment_name']),
                location=int(row['location']),
                primary_device=int(row['primary_device']),
                primary_category=int(row['primary_category']),
                last_visit_date=str(row['last_visit_date'])
            )
            for _, row in cust_df.iterrows()
        ]
        db.bulk_save_objects(customer_objs)
        db.commit()
        print(f"   -> Seeded {len(customer_objs):,} customer records.")

        # 5. Seed Transactions (Sample of sessions for sales analytics)
        print("\n4. Seeding Sample Transactions...")
        clean_path = os.path.join(project_root, "data", "processed", "cleaned_data.csv")
        clean_df = pd.read_csv(clean_path).head(2000)
        
        tx_objs = [
            Transaction(
                session_id=int(row['session_id']),
                customer_id=int(row['customer_id']),
                product_id=int(row['product_id']),
                visit_date=str(row['visit_date']),
                device_type=int(row['device_type']),
                pages_viewed=int(row['pages_viewed']),
                time_on_site_sec=int(row['time_on_site_sec']),
                added_to_cart=int(row['added_to_cart']),
                purchased=int(row['purchased']),
                cart_abandoned=int(row['cart_abandoned']),
                revenue=float(row['revenue']),
                unit_price=float(row['unit_price']),
                quantity=int(row['quantity']),
                discount_percent=int(row['discount_percent'])
            )
            for _, row in clean_df.iterrows()
        ]
        db.bulk_save_objects(tx_objs)
        db.commit()
        print(f"   -> Seeded {len(tx_objs):,} transactions for analytics.")

        print("\n" + "=" * 70)
        print("[OK] DATABASE SEEDING COMPLETED SUCCESSFULLY!")
        print("=" * 70)

    except Exception as e:
        db.rollback()
        print(f"[!] Error during seeding: {e}")
        raise e
    finally:
        db.close()

if __name__ == "__main__":
    seed()
