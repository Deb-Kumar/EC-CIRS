"""
Health & Status API Endpoints
File: backend/app/routes/health.py
"""

from fastapi import APIRouter

router = APIRouter(prefix="/api", tags=["Health"])

@router.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "E-Commerce Customer Intelligence API",
        "version": "1.0.0"
    }
