"""
SQLAlchemy Database Models
File: backend/app/models.py
"""

from sqlalchemy import Column, Integer, Float, String, Date, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from .database import Base

class Customer(Base):
    __tablename__ = "customers"

    customer_id = Column(Integer, primary_key=True, index=True)
    total_sessions = Column(Integer, default=1)
    total_purchases = Column(Integer, default=0)
    total_revenue = Column(Float, default=0.0)
    total_cart_adds = Column(Integer, default=0)
    total_cart_abandons = Column(Integer, default=0)
    avg_pages_viewed = Column(Float, default=0.0)
    avg_time_on_site_sec = Column(Float, default=0.0)
    avg_discount_received = Column(Float, default=0.0)
    avg_rating_given = Column(Float, default=0.0)
    recency_days = Column(Integer, default=0)
    avg_order_value = Column(Float, default=0.0)
    cart_abandonment_rate = Column(Float, default=0.0)
    purchase_conversion_rate = Column(Float, default=0.0)
    cluster = Column(Integer, default=0, index=True)
    segment_name = Column(String(100), default="Unknown")
    location = Column(Integer, default=0)
    primary_device = Column(Integer, default=0)
    primary_category = Column(Integer, default=0)
    last_visit_date = Column(String(50), nullable=True)

class Product(Base):
    __tablename__ = "products"

    product_id = Column(Integer, primary_key=True, index=True)
    category = Column(Integer, index=True)
    unit_price = Column(Float, default=0.0)
    avg_rating = Column(Float, default=0.0)
    purchase_count = Column(Integer, default=0)
    view_count = Column(Integer, default=0)

class Transaction(Base):
    __tablename__ = "transactions"

    session_id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("customers.customer_id"), index=True)
    product_id = Column(Integer, ForeignKey("products.product_id"), index=True)
    visit_date = Column(String(50))
    device_type = Column(Integer)
    pages_viewed = Column(Integer)
    time_on_site_sec = Column(Integer)
    added_to_cart = Column(Integer)
    purchased = Column(Integer, index=True)
    cart_abandoned = Column(Integer)
    revenue = Column(Float, default=0.0)
    unit_price = Column(Float)
    quantity = Column(Integer)
    discount_percent = Column(Integer)

class CustomerSegment(Base):
    __tablename__ = "customer_segments"

    cluster_id = Column(Integer, primary_key=True)
    segment_name = Column(String(100), nullable=False)
    customer_count = Column(Integer)
    avg_revenue = Column(Float)
    avg_purchases = Column(Float)
    avg_sessions = Column(Float)
    avg_recency = Column(Float)
    avg_cart_abandon = Column(Float)
