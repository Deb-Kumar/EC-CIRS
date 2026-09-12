import React from "react";
import {
  FileText,
  ShieldCheck,
  Scale,
  Cpu,
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Database
} from "lucide-react";

export default function TermsPage({ setActiveTab }) {
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
          color: "var(--text-dim)",
          background: "rgba(15, 23, 42, 0.6)",
          padding: "6px 14px",
          borderRadius: "9999px",
          border: "1px solid var(--border-color)"
        }}>
          Effective Date: January 2026 • Version 2.4.0
        </span>
      </div>

      {/* Hero Header */}
      <div className="glass-card" style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "14px", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute",
          top: "-40px",
          right: "-40px",
          width: "200px",
          height: "200px",
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none"
        }} />

        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            background: "rgba(59, 130, 246, 0.15)",
            border: "1px solid rgba(59, 130, 246, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#60a5fa"
          }}>
            <Scale size={26} />
          </div>
          <div>
            <h2 style={{ fontSize: "24px", color: "#fff", fontWeight: 700 }}>
              Terms & Conditions
            </h2>
            <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
              Platform usage rules, algorithmic transparency disclaimers, and research software license terms.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
        {/* Left Column: Detailed Terms */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* Section 1: Acceptance */}
          <div className="glass-card" style={{ padding: "24px" }}>
            <h3 style={{ fontSize: "16px", color: "#fff", fontWeight: 600, display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <CheckCircle2 size={18} color="#34d399" />
              1. Acceptance of Terms
            </h3>
            <p style={{ fontSize: "13.5px", color: "var(--text-muted)", lineHeight: "1.7" }}>
              By accessing, browsing, or utilizing the EC-CIRS (E-Commerce Customer Intelligence & Recommendation System) platform, you acknowledge that you have read, understood, and agreed to be bound by these Terms and Conditions. This platform is engineered for academic research, algorithmic evaluation, and enterprise business intelligence simulations. If you do not agree with any portion of these terms, please discontinue use immediately.
            </p>
          </div>

          {/* Section 2: Machine Learning Disclaimer */}
          <div className="glass-card" style={{ padding: "24px" }}>
            <h3 style={{ fontSize: "16px", color: "#fff", fontWeight: 600, display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <Cpu size={18} color="#818cf8" />
              2. Algorithmic Predictions & Decision Support
            </h3>
            <p style={{ fontSize: "13.5px", color: "var(--text-muted)", lineHeight: "1.7", marginBottom: "12px" }}>
              All predictive outputs generated by EC-CIRS—including Ordinary Least Squares (OLS) spending elasticities, Logistic Regression purchase likelihood scores, and K-Nearest Neighbors (KNN) collaborative recommendations—are empirical statistical estimates.
            </p>
            <ul style={{ paddingLeft: "20px", fontSize: "13.5px", color: "var(--text-muted)", lineHeight: "1.7", display: "flex", flexDirection: "column", gap: "6px" }}>
              <li>Outputs serve as an analytics and decision-support tool, not guaranteed financial forecasts.</li>
              <li>Actual customer lifetime spend may diverge based on macroeconomic factors, inventory variances, or external market volatility.</li>
              <li>Neither the developers nor the university assume liability for commercial decisions executed solely upon simulated outputs.</li>
            </ul>
          </div>

          {/* Section 3: Data Usage & Synthetic Benchmark */}
          <div className="glass-card" style={{ padding: "24px" }}>
            <h3 style={{ fontSize: "16px", color: "#fff", fontWeight: 600, display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <Database size={18} color="#38bdf8" />
              3. Data Usage & Intellectual Property
            </h3>
            <p style={{ fontSize: "13.5px", color: "var(--text-muted)", lineHeight: "1.7", marginBottom: "10px" }}>
              The 25,000 transaction records benchmarked within this platform represent anonymized empirical e-commerce customer journeys. Customer IDs (e.g. CUST-100 to CUST-8500) and product entities are synthesized or de-identified for compliance with data protection laws.
            </p>
            <p style={{ fontSize: "13.5px", color: "var(--text-muted)", lineHeight: "1.7" }}>
              The software architecture, predictive model pipelines, training artifacts, and analytical UI design are the intellectual property of the project maintainers under the MIT research license.
            </p>
          </div>

          {/* Section 4: Acceptable Use */}
          <div className="glass-card" style={{ padding: "24px" }}>
            <h3 style={{ fontSize: "16px", color: "#fff", fontWeight: 600, display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <Lock size={18} color="#f59e0b" />
              4. Prohibited Activities
            </h3>
            <p style={{ fontSize: "13.5px", color: "var(--text-muted)", lineHeight: "1.7" }}>
              Users agree not to: (a) attempt denial-of-service or high-frequency automated scraping against the local FastAPI microservices; (b) reverse engineer, decompile, or tamper with the model checkpoint artifacts without attribution; or (c) introduce malicious payloads into interactive simulation inputs.
            </p>
          </div>

        </div>

        {/* Right Column: Key Summary & Navigation */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div className="glass-card" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <h4 style={{ fontSize: "14px", color: "#fff", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Summary Highlights
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", gap: "10px" }}>
                <ShieldCheck size={18} color="#34d399" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <div style={{ fontSize: "13px", color: "#fff", fontWeight: 600 }}>Non-Commercial Research</div>
                  <p style={{ fontSize: "12px", color: "var(--text-dim)", marginTop: "2px" }}>Built as an academic and professional machine learning engineering milestone.</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <Cpu size={18} color="#60a5fa" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <div style={{ fontSize: "13px", color: "#fff", fontWeight: 600 }}>Statistical Transparency</div>
                  <p style={{ fontSize: "12px", color: "var(--text-dim)", marginTop: "2px" }}>All 4 production model weights, metrics, and ROC/AUC curves are fully inspectable.</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <Lock size={18} color="#c084fc" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <div style={{ fontSize: "13px", color: "#fff", fontWeight: 600 }}>Zero Personal Tracking</div>
                  <p style={{ fontSize: "12px", color: "var(--text-dim)", marginTop: "2px" }}>No personal credit card, email, or physical address data is ever processed.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <h4 style={{ fontSize: "14px", color: "#fff", fontWeight: 700 }}>
              Related Policies
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <button
                type="button"
                onClick={() => setActiveTab && setActiveTab("privacy")}
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "8px",
                  padding: "10px 14px",
                  color: "#93c5fd",
                  fontSize: "12.5px",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.15s ease"
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#60a5fa"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border-color)"}
              >
                → View Privacy Policy
              </button>

              <button
                type="button"
                onClick={() => setActiveTab && setActiveTab("cookies")}
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "8px",
                  padding: "10px 14px",
                  color: "#93c5fd",
                  fontSize: "12.5px",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.15s ease"
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#60a5fa"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border-color)"}
              >
                → View Cookies Policy
              </button>

              <button
                type="button"
                onClick={() => setActiveTab && setActiveTab("contact")}
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "8px",
                  padding: "10px 14px",
                  color: "#93c5fd",
                  fontSize: "12.5px",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.15s ease"
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#60a5fa"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border-color)"}
              >
                → Contact Research Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
