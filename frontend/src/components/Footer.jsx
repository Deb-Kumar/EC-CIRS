import React from "react";
import {
  Sparkles,
  ArrowUp,
  Database,
  Cpu,
  ShieldCheck,
  Code2,
  Layers,
  TrendingUp,
  ShoppingCart,
  Users,
  PieChart,
  LayoutDashboard,
  BarChart3,
  ExternalLink
} from "lucide-react";

export default function Footer({ setActiveTab }) {
  const handleNavigatePolicy = (tabId) => {
    if (setActiveTab) {
      setActiveTab(tabId);
      scrollToTop();
    }
  };

  const scrollToTop = () => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } catch {
      window.scrollTo(0, 0);
    }
    try {
      document.documentElement.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } catch {
      document.documentElement.scrollTop = 0;
    }
    try {
      document.body.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } catch {
      document.body.scrollTop = 0;
    }
    const mainEl = document.querySelector("main");
    if (mainEl) {
      try {
        mainEl.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } catch {
        mainEl.scrollTop = 0;
      }
    }
    const topEl = document.querySelector("header") || document.getElementById("root");
    if (topEl && typeof topEl.scrollIntoView === "function") {
      try {
        topEl.scrollIntoView({ behavior: "smooth", block: "start" });
      } catch {
        topEl.scrollIntoView();
      }
    }
  };

  return (
    <footer style={{
      marginTop: "auto",
      background: "rgba(10, 15, 26, 0.85)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      borderTop: "1px solid var(--border-color)",
      padding: "40px 32px 24px 32px",
      display: "flex",
      flexDirection: "column",
      gap: "32px"
    }}>
      {/* Top Grid: Brand & Links */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1.8fr 1fr 1fr 1.2fr",
        gap: "32px",
        flexWrap: "wrap"
      }}>
        {/* Brand Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "38px",
              height: "38px",
              borderRadius: "10px",
              background: "var(--primary-gradient)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 16px rgba(59, 130, 246, 0.4)"
            }}>
              <Sparkles size={20} color="#ffffff" />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ fontSize: "16px", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
                  EC-CIRS
                </span>
              </div>
              <p style={{ fontSize: "11px", color: "var(--text-dim)", marginTop: "1px" }}>
                E-Commerce Customer Intelligence & Recommendation System
              </p>
            </div>
          </div>

          <p style={{ fontSize: "12.5px", color: "var(--text-muted)", lineHeight: "1.5", maxWidth: "340px" }}>
            Enterprise machine learning intelligence platform powering customer lifetime value modeling, conversion scoring, and personalized collaborative filtering across 25,000 empirical session journeys.
          </p>

        </div>

        {/* Column 1: Intelligence Modules */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <h4 style={{ fontSize: "13px", fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Platform Modules
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              { id: "overview", label: "Executive Dashboard", icon: LayoutDashboard },
              { id: "customers", label: "Customer Directory", icon: Users },
              { id: "models", label: "Model Scorecard", icon: Cpu },
              { id: "analytics", label: "Funnel & Trends", icon: BarChart3 },
              { id: "dataset", label: "Dataset Explorer", icon: Database }
            ].map(link => {
              const Icon = link.icon;
              return (
                <li key={link.id}>
                  <button
                    onClick={() => setActiveTab && setActiveTab(link.id)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "var(--text-muted)",
                      fontSize: "12.5px",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "7px",
                      padding: "2px 0",
                      transition: "all 0.15s ease"
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = "#60a5fa"}
                    onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}
                  >
                    <Icon size={13} /> {link.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Column 2: Predictive ML Engines */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <h4 style={{ fontSize: "13px", fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            ML Intelligence
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              { id: "spending", label: "Spending Simulator (OLS)", icon: TrendingUp },
              { id: "purchase", label: "Purchase Probability (Logit)", icon: ShoppingCart },
              { id: "recommendations", label: "Product Recommender (KNN)", icon: Sparkles },
              { id: "segments", label: "Customer Clusters (K-Means)", icon: PieChart }
            ].map(link => {
              const Icon = link.icon;
              return (
                <li key={link.id}>
                  <button
                    onClick={() => setActiveTab && setActiveTab(link.id)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "var(--text-muted)",
                      fontSize: "12.5px",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "7px",
                      padding: "2px 0",
                      transition: "all 0.15s ease"
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = "#a78bfa"}
                    onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}
                  >
                    <Icon size={13} /> {link.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Column 3: Architecture & Telemetry */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <h4 style={{ fontSize: "13px", fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Engine Specs
          </h4>
          <div style={{
            background: "rgba(15, 23, 42, 0.6)",
            border: "1px solid var(--border-color)",
            borderRadius: "10px",
            padding: "12px 14px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            fontSize: "11.5px"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--text-dim)" }}>Backend:</span>
              <strong style={{ color: "#fff" }}>Python 3.11 • FastAPI</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--text-dim)" }}>Inference:</span>
              <strong style={{ color: "#34d399" }}>&lt;12ms p95 Latency</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--text-dim)" }}>Frontend:</span>
              <strong style={{ color: "#60a5fa" }}>React 19 • Vite 5</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--text-dim)" }}>Database:</span>
              <strong style={{ color: "#c084fc" }}>SQLite Unified Store</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--text-dim)" }}>ML Models:</span>
              <strong style={{ color: "#fbbf24" }}>4 Production Pipelines</strong>
            </div>
          </div>
        </div>

      </div>

      {/* Upper Utility Bar: Policy Links (Left) & Social Links + Back to Top (Right) */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "16px",
        paddingTop: "24px",
        borderTop: "1px solid rgba(255, 255, 255, 0.06)"
      }}>
        {/* Policy & Legal Links */}
        <div style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          fontSize: "12.5px"
        }}>
          {[
            { id: "terms", label: "Terms & Conditions" },
            { id: "privacy", label: "Privacy Policy" },
            { id: "about", label: "About Us" },
            { id: "contact", label: "Contact Us" },
            { id: "cookies", label: "Cookies Policy" }
          ].map((item, idx) => (
            <React.Fragment key={item.id}>
              {idx > 0 && <span style={{ color: "rgba(255, 255, 255, 0.15)", userSelect: "none" }}>•</span>}
              <button
                type="button"
                onClick={() => handleNavigatePolicy(item.id)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--text-muted)",
                  fontSize: "12.5px",
                  cursor: "pointer",
                  padding: "2px 0",
                  fontWeight: 500,
                  transition: "all 0.15s ease"
                }}
                onMouseEnter={e => e.currentTarget.style.color = "#60a5fa"}
                onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}
              >
                {item.label}
              </button>
            </React.Fragment>
          ))}
        </div>

        {/* Right Side: Social Media Links & Back to Top */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          {/* Social Links */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {/* GitHub */}
            <a
              href="https://github.com/Deb-Kumar"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub Profile"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid var(--border-color)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-muted)",
                transition: "all 0.15s ease"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.borderColor = "#94a3b8";
                e.currentTarget.style.boxShadow = "0 0 10px rgba(255,255,255,0.2)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = "var(--text-muted)";
                e.currentTarget.style.borderColor = "var(--border-color)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/payradebkumar/"
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook Profile"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid var(--border-color)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-muted)",
                transition: "all 0.15s ease"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = "#1877f2";
                e.currentTarget.style.borderColor = "#1877f2";
                e.currentTarget.style.boxShadow = "0 0 10px rgba(24,119,242,0.4)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = "var(--text-muted)";
                e.currentTarget.style.borderColor = "var(--border-color)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/alexx__285"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram Profile"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid var(--border-color)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-muted)",
                transition: "all 0.15s ease"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = "#e1306c";
                e.currentTarget.style.borderColor = "#e1306c";
                e.currentTarget.style.boxShadow = "0 0 10px rgba(225,48,108,0.4)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = "var(--text-muted)";
                e.currentTarget.style.borderColor = "var(--border-color)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/debkumar-payra"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn Profile"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid var(--border-color)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-muted)",
                transition: "all 0.15s ease"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = "#0a66c2";
                e.currentTarget.style.borderColor = "#0a66c2";
                e.currentTarget.style.boxShadow = "0 0 10px rgba(10,102,194,0.4)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = "var(--text-muted)";
                e.currentTarget.style.borderColor = "var(--border-color)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z"/>
              </svg>
            </a>

            {/* X (formerly Twitter) */}
            <a
              href="https://x.com/payradevkumar"
              target="_blank"
              rel="noopener noreferrer"
              title="X Profile"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid var(--border-color)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-muted)",
                transition: "all 0.15s ease"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.borderColor = "#94a3b8";
                e.currentTarget.style.boxShadow = "0 0 10px rgba(255,255,255,0.2)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = "var(--text-muted)";
                e.currentTarget.style.borderColor = "var(--border-color)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>

          <div style={{ width: "1px", height: "18px", background: "rgba(255, 255, 255, 0.12)", margin: "0 4px" }} />

          {/* Back to Top Button */}
          <button
            type="button"
            id="back-to-top-btn"
            aria-label="Back to top"
            onClick={scrollToTop}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 12px",
              borderRadius: "8px",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid var(--border-color)",
              color: "var(--text-muted)",
              fontSize: "12px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.15s ease"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "#60a5fa";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "var(--border-color)";
              e.currentTarget.style.color = "var(--text-muted)";
            }}
          >
            <ArrowUp size={13} /> Back to Top
          </button>
        </div>
      </div>

      {/* Centered Copyright Notice */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        paddingTop: "16px",
        paddingBottom: "4px",
        borderTop: "1px solid rgba(255, 255, 255, 0.04)",
        color: "var(--text-dim)",
        fontSize: "12px",
        textAlign: "center",
        width: "100%"
      }}>
        <span>© 2024-2026 EC-CIRS. Customer Intelligence ML Platform.</span>
        <span>•</span>
        <span>All rights reserved.</span>
      </div>
    </footer>
  );
}
