import React from "react";
import {
  Sparkles,
  Cpu,
  Layers,
  Code2,
  Database,
  ArrowLeft,
  TrendingUp,
  ShoppingCart,
  PieChart,
  Users,
  CheckCircle2,
  ExternalLink,
  Award
} from "lucide-react";

export default function AboutUsPage({ setActiveTab }) {
  return (
    <div style={{ padding: "32px", maxWidth: "1280px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Top Breadcrumb / Back Button */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button
          type="button"
          onClick={() => setActiveTab && setActiveTab("overview")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid var(--border-color)",
            padding: "8px 16px",
            borderRadius: "10px",
            color: "var(--text-muted)",
            fontSize: "13px",
            fontWeight: 500,
            cursor: "pointer",
            transition: "all 0.15s ease"
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.borderColor = "#60a5fa";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = "var(--text-muted)";
            e.currentTarget.style.borderColor = "var(--border-color)";
          }}
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        <span style={{
          fontSize: "12px",
          color: "#93c5fd",
          background: "rgba(59, 130, 246, 0.15)",
          padding: "6px 14px",
          borderRadius: "9999px",
          border: "1px solid rgba(59, 130, 246, 0.3)",
          fontWeight: 600
        }}>
          EC-CIRS Enterprise ML Platform
        </span>
      </div>

      {/* Hero Header */}
      <div className="glass-card" style={{ padding: "36px", display: "flex", flexDirection: "column", gap: "16px", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute",
          top: "-50px",
          right: "-50px",
          width: "250px",
          height: "250px",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none"
        }} />

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{
            width: "56px",
            height: "56px",
            borderRadius: "14px",
            background: "var(--primary-gradient)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 24px rgba(59, 130, 246, 0.4)",
            color: "#fff"
          }}>
            <Sparkles size={30} />
          </div>
          <div>
            <h2 style={{ fontSize: "26px", color: "#fff", fontWeight: 700, letterSpacing: "-0.01em" }}>
              About EC-CIRS Intelligence Platform
            </h2>
            <p style={{ fontSize: "14px", color: "var(--text-muted)", marginTop: "4px" }}>
              Enterprise machine learning platform combining empirical statistical inference with real-time customer behavior modeling.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Overview */}
      <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1.2fr", gap: "24px" }}>
        <div className="glass-card" style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <h3 style={{ fontSize: "18px", color: "#fff", fontWeight: 700, display: "flex", alignItems: "center", gap: "10px" }}>
            <Award size={20} color="#fbbf24" />
            Executive Mission & Purpose
          </h3>
          <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: "1.7" }}>
            The <strong>E-Commerce Customer Intelligence & Recommendation System (EC-CIRS)</strong> is an end-to-end analytical application designed to bridge the gap between machine learning research and actionable e-commerce commercial decisions.
          </p>
          <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: "1.7" }}>
            By training and serving multiple specialized predictive architectures on 25,000 transaction journeys across 8,429 customers, the platform delivers instantaneous micro-second inference for Customer Lifetime Value (CLV), purchase likelihood forecasting, and personalized collaborative product cross-selling.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "12px",
            marginTop: "8px",
            paddingTop: "16px",
            borderTop: "1px solid var(--border-color)"
          }}>
            <div style={{ textAlign: "center", padding: "12px", background: "rgba(15, 23, 42, 0.5)", borderRadius: "8px" }}>
              <div style={{ fontSize: "20px", fontWeight: 800, color: "#60a5fa" }}>25,000</div>
              <div style={{ fontSize: "11.5px", color: "var(--text-dim)", marginTop: "2px" }}>Session Records</div>
            </div>
            <div style={{ textAlign: "center", padding: "12px", background: "rgba(15, 23, 42, 0.5)", borderRadius: "8px" }}>
              <div style={{ fontSize: "20px", fontWeight: 800, color: "#34d399" }}>8,429</div>
              <div style={{ fontSize: "11.5px", color: "var(--text-dim)", marginTop: "2px" }}>Active Customers</div>
            </div>
            <div style={{ textAlign: "center", padding: "12px", background: "rgba(15, 23, 42, 0.5)", borderRadius: "8px" }}>
              <div style={{ fontSize: "20px", fontWeight: 800, color: "#c084fc" }}>&lt;12ms</div>
              <div style={{ fontSize: "11.5px", color: "var(--text-dim)", marginTop: "2px" }}>Inference Latency</div>
            </div>
          </div>
        </div>

        {/* Lead Developer Card */}
        <div className="glass-card" style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <h3 style={{ fontSize: "18px", color: "#fff", fontWeight: 700, display: "flex", alignItems: "center", gap: "10px" }}>
            <Users size={20} color="#60a5fa" />
            Lead Developer & Researcher
          </h3>
          <div style={{
            background: "rgba(15, 23, 42, 0.6)",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid var(--border-color)",
            display: "flex",
            flexDirection: "column",
            gap: "12px"
          }}>
            <div>
              <h4 style={{ fontSize: "17px", color: "#fff", fontWeight: 700 }}>Debkumar Payra</h4>
              <p style={{ fontSize: "12.5px", color: "#93c5fd", marginTop: "2px" }}>
                Machine Learning & Full-Stack Engineer
              </p>
              <p style={{ fontSize: "12px", color: "var(--text-dim)", marginTop: "1px" }}>
                MCA Final Year Project (2024–2026)
              </p>
            </div>

            <p style={{ fontSize: "12.5px", color: "var(--text-muted)", lineHeight: "1.6" }}>
              Specializing in statistical inference, predictive modeling with Scikit-Learn/FastAPI, and modern reactive interface architecture.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "4px" }}>
              <a
                href="https://github.com/Deb-Kumar"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid var(--border-color)",
                  color: "#fff",
                  fontSize: "12px",
                  textDecoration: "none",
                  fontWeight: 500
                }}
              >
                GitHub <ExternalLink size={12} />
              </a>

              <a
                href="https://www.linkedin.com/in/debkumar-payra"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  background: "rgba(10, 102, 194, 0.15)",
                  border: "1px solid rgba(10, 102, 194, 0.4)",
                  color: "#93c5fd",
                  fontSize: "12px",
                  textDecoration: "none",
                  fontWeight: 500
                }}
              >
                LinkedIn <ExternalLink size={12} />
              </a>

              <button
                type="button"
                onClick={() => setActiveTab && setActiveTab("contact")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  background: "var(--primary-gradient)",
                  border: "none",
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* The 4 Core Machine Learning Pillars */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <h3 style={{ fontSize: "18px", color: "#fff", fontWeight: 700, display: "flex", alignItems: "center", gap: "10px" }}>
          <Cpu size={20} color="#a78bfa" />
          The 4 Production ML Engines
        </h3>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
          {/* Card 1: Linear Regression */}
          <div className="glass-card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ padding: "8px", borderRadius: "8px", background: "rgba(59, 130, 246, 0.15)", color: "#60a5fa" }}>
                <TrendingUp size={18} />
              </div>
              <div>
                <h4 style={{ fontSize: "15px", color: "#fff", fontWeight: 600 }}>Spending Simulator</h4>
                <span style={{ fontSize: "11px", color: "#93c5fd" }}>OLS Linear Regression</span>
              </div>
            </div>
            <p style={{ fontSize: "12.5px", color: "var(--text-muted)", lineHeight: "1.6" }}>
              Measures feature elasticity across Session Duration, Cart Size, Page Views, and Historical Purchases to forecast 90-day Customer Spending with high R² accuracy.
            </p>
            <button
              type="button"
              onClick={() => setActiveTab && setActiveTab("spending")}
              style={{
                marginTop: "auto",
                background: "transparent",
                border: "none",
                color: "#60a5fa",
                fontSize: "12px",
                fontWeight: 600,
                textAlign: "left",
                cursor: "pointer",
                padding: 0
              }}
            >
              Launch Simulator →
            </button>
          </div>

          {/* Card 2: Logistic Regression */}
          <div className="glass-card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ padding: "8px", borderRadius: "8px", background: "rgba(16, 185, 129, 0.15)", color: "#34d399" }}>
                <ShoppingCart size={18} />
              </div>
              <div>
                <h4 style={{ fontSize: "15px", color: "#fff", fontWeight: 600 }}>Purchase Propensity</h4>
                <span style={{ fontSize: "11px", color: "#34d399" }}>Weighted Logistic Regression</span>
              </div>
            </div>
            <p style={{ fontSize: "12.5px", color: "var(--text-muted)", lineHeight: "1.6" }}>
              Classifies whether a visitor will convert before checkout. Employs inverse frequency class weights to counteract empirical checkout class imbalance.
            </p>
            <button
              type="button"
              onClick={() => setActiveTab && setActiveTab("purchase")}
              style={{
                marginTop: "auto",
                background: "transparent",
                border: "none",
                color: "#34d399",
                fontSize: "12px",
                fontWeight: 600,
                textAlign: "left",
                cursor: "pointer",
                padding: 0
              }}
            >
              Test Probability Engine →
            </button>
          </div>

          {/* Card 3: KNN Recommender */}
          <div className="glass-card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ padding: "8px", borderRadius: "8px", background: "rgba(168, 85, 247, 0.15)", color: "#c084fc" }}>
                <Sparkles size={18} />
              </div>
              <div>
                <h4 style={{ fontSize: "15px", color: "#fff", fontWeight: 600 }}>Collaborative Filtering</h4>
                <span style={{ fontSize: "11px", color: "#c084fc" }}>K-Nearest Neighbors (KNN)</span>
              </div>
            </div>
            <p style={{ fontSize: "12.5px", color: "var(--text-muted)", lineHeight: "1.6" }}>
              Computes cosine vector similarity across customer basket histories to recommend personalized product bundles with precision confidence scores.
            </p>
            <button
              type="button"
              onClick={() => setActiveTab && setActiveTab("recommendations")}
              style={{
                marginTop: "auto",
                background: "transparent",
                border: "none",
                color: "#c084fc",
                fontSize: "12px",
                fontWeight: 600,
                textAlign: "left",
                cursor: "pointer",
                padding: 0
              }}
            >
              Explore Recommender →
            </button>
          </div>

          {/* Card 4: K-Means Segmentation */}
          <div className="glass-card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ padding: "8px", borderRadius: "8px", background: "rgba(245, 158, 11, 0.15)", color: "#fbbf24" }}>
                <PieChart size={18} />
              </div>
              <div>
                <h4 style={{ fontSize: "15px", color: "#fff", fontWeight: 600 }}>Customer Clustering</h4>
                <span style={{ fontSize: "11px", color: "#fbbf24" }}>K-Means Unsupervised</span>
              </div>
            </div>
            <p style={{ fontSize: "12.5px", color: "var(--text-muted)", lineHeight: "1.6" }}>
              Segments 8,429 customers into actionable cohorts (High-Value VIPs, Window Shoppers, Discount Hunters, and Emerging Loyalists) using standardized behavioral vectors.
            </p>
            <button
              type="button"
              onClick={() => setActiveTab && setActiveTab("segments")}
              style={{
                marginTop: "auto",
                background: "transparent",
                border: "none",
                color: "#fbbf24",
                fontSize: "12px",
                fontWeight: 600,
                textAlign: "left",
                cursor: "pointer",
                padding: 0
              }}
            >
              View Clusters →
            </button>
          </div>
        </div>
      </div>

      {/* Technical Architecture Stack */}
      <div className="glass-card" style={{ padding: "28px" }}>
        <h3 style={{ fontSize: "18px", color: "#fff", fontWeight: 700, display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
          <Code2 size={20} color="#06b6d4" />
          Full-Stack Technology Ecosystem
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
          <div style={{ background: "rgba(15, 23, 42, 0.5)", padding: "16px", borderRadius: "10px", border: "1px solid var(--border-color)" }}>
            <div style={{ color: "#60a5fa", fontWeight: 700, fontSize: "13px" }}>FRONTEND CLIENT</div>
            <ul style={{ listStyle: "none", padding: 0, marginTop: "8px", fontSize: "12.5px", color: "var(--text-muted)", display: "flex", flexDirection: "column", gap: "6px" }}>
              <li>• React 19 SPA Architecture</li>
              <li>• Vite 5 Ultra-Fast Bundler</li>
              <li>• Vanilla CSS Custom System</li>
              <li>• Lucide Reactive Icons</li>
            </ul>
          </div>

          <div style={{ background: "rgba(15, 23, 42, 0.5)", padding: "16px", borderRadius: "10px", border: "1px solid var(--border-color)" }}>
            <div style={{ color: "#34d399", fontWeight: 700, fontSize: "13px" }}>BACKEND INFERENCE</div>
            <ul style={{ listStyle: "none", padding: 0, marginTop: "8px", fontSize: "12.5px", color: "var(--text-muted)", display: "flex", flexDirection: "column", gap: "6px" }}>
              <li>• Python 3.11 Microservice</li>
              <li>• FastAPI Asynchronous Router</li>
              <li>• Uvicorn ASGI Server</li>
              <li>• Pydantic v2 Type Validation</li>
            </ul>
          </div>

          <div style={{ background: "rgba(15, 23, 42, 0.5)", padding: "16px", borderRadius: "10px", border: "1px solid var(--border-color)" }}>
            <div style={{ color: "#c084fc", fontWeight: 700, fontSize: "13px" }}>MACHINE LEARNING</div>
            <ul style={{ listStyle: "none", padding: 0, marginTop: "8px", fontSize: "12.5px", color: "var(--text-muted)", display: "flex", flexDirection: "column", gap: "6px" }}>
              <li>• Scikit-Learn 1.4+</li>
              <li>• NumPy & Pandas Analysis</li>
              <li>• Joblib Serialization</li>
              <li>• Statsmodels Empirical Checks</li>
            </ul>
          </div>

          <div style={{ background: "rgba(15, 23, 42, 0.5)", padding: "16px", borderRadius: "10px", border: "1px solid var(--border-color)" }}>
            <div style={{ color: "#fbbf24", fontWeight: 700, fontSize: "13px" }}>DATABASE & STORAGE</div>
            <ul style={{ listStyle: "none", padding: 0, marginTop: "8px", fontSize: "12.5px", color: "var(--text-muted)", display: "flex", flexDirection: "column", gap: "6px" }}>
              <li>• SQLite Unified Store</li>
              <li>• 25,000 Indexed Records</li>
              <li>• Zero-Overhead In-Memory Caching</li>
              <li>• Instant Query Latency</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
