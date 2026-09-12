"""
E-Commerce Customer Intelligence API Routes Package
"""

from . import health, customers, predictions, recommendations, analytics, models_info, dataset

__all__ = [
    "health",
    "customers",
    "predictions",
    "recommendations",
    "analytics",
    "models_info",
    "dataset"
]
