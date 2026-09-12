"""
FastAPI Main Application Entrypoint
File: backend/app/main.py
"""

import sys
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

try:
    from .database import engine, Base
    from .routes import (
        health,
        customers,
        predictions,
        recommendations,
        analytics,
        models_info,
        dataset
    )
except (ImportError, ValueError):
    backend_dir = Path(__file__).resolve().parent.parent
    if str(backend_dir) not in sys.path:
        sys.path.insert(0, str(backend_dir))
    from app.database import engine, Base
    from app.routes import (
        health,
        customers,
        predictions,
        recommendations,
        analytics,
        models_info,
        dataset
    )

# Initialize database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="E-Commerce Customer Intelligence & Recommendation API",
    description="REST API backend powering customer segmentation, spending prediction, conversion scoring, and product recommendations.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Routes
app.include_router(health.router)
app.include_router(customers.router)
app.include_router(predictions.router)
app.include_router(recommendations.router)
app.include_router(analytics.router)
app.include_router(models_info.router)
app.include_router(dataset.router)

@app.get("/", tags=["Root"])
def root():
    return {
        "message": "Welcome to the E-Commerce Customer Intelligence API",
        "documentation": "/docs",
        "status": "online"
    }

if __name__ == "__main__":
    import uvicorn
    # Add project root to sys.path so uvicorn worker reload can find 'backend'
    project_root = str(Path(__file__).resolve().parent.parent.parent)
    if project_root not in sys.path:
        sys.path.insert(0, project_root)
    uvicorn.run("backend.app.main:app", host="127.0.0.1", port=8000, reload=True)
