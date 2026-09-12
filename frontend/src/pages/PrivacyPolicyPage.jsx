import React from "react";
import {
  ShieldCheck,
  Lock,
  EyeOff,
  Server,
  Database,
  ArrowLeft,
  CheckCircle2,
  FileCheck,
  RefreshCw
} from "lucide-react";

export default function PrivacyPolicyPage({ setActiveTab }) {
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
          Compliance Standard: GDPR & CCPA Aligned • 2026
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
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none"
        }} />

        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            background: "rgba(16, 185, 129, 0.15)",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#34d399"
          }}>
            <ShieldCheck size={26} />
          </div>
          <div>
            <h2 style={{ fontSize: "24px", color: "#fff", fontWeight: 700 }}>
              Privacy Policy & Data Governance
            </h2>
            <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
              Detailed explanation of data handling, zero-PII principles, telemetry storage, and privacy safeguards.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
        {/* Left Column: Privacy Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* Principle 1: Zero Personal Data Collection */}
          <div className="glass-card" style={{ padding: "24px" }}>
            <h3 style={{ fontSize: "16px", color: "#fff", fontWeight: 600, display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <EyeOff size={18} color="#34d399" />
              1. Zero Personally Identifiable Information (PII)
            </h3>
            <p style={{ fontSize: "13.5px", color: "var(--text-muted)", lineHeight: "1.7", marginBottom: "10px" }}>
              EC-CIRS operates under strict privacy-by-design standards. The application does <strong>not</strong> request, harvest, log, or persist any of the following personal identifiers:
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "12px" }}>
              {[
                "No Real Names or User Accounts",
                "No Email Addresses or Phone Numbers",
                "No Credit Cards or Billing Data",
                "No Device Geolocation or GPS Pins",
                "No IP Addresses logged to databases",
                "No Social Security or ID numbers"
              ].map((item, idx) => (
                <div key={idx} style={{
                  background: "rgba(15, 23, 42, 0.6)",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  fontSize: "12.5px",
                  color: "#94a3b8",
                  border: "1px solid var(--border-color)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}>
                  <CheckCircle2 size={14} color="#10b981" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Principle 2: Local Telemetry Processing */}
          <div className="glass-card" style={{ padding: "24px" }}>
            <h3 style={{ fontSize: "16px", color: "#fff", fontWeight: 600, display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <Server size={18} color="#60a5fa" />
              2. Local Inference Processing & Edge Privacy
            </h3>
            <p style={{ fontSize: "13.5px", color: "var(--text-muted)", lineHeight: "1.7", marginBottom: "12px" }}>
              When you adjust feature sliders in the <strong>Spending Prediction Simulator</strong> or the <strong>Purchase Propensity Logit Engine</strong>, calculations execute directly through your local environment microservice endpoints (FastAPI on localhost).
            </p>
            <ul style={{ paddingLeft: "20px", fontSize: "13.5px", color: "var(--text-muted)", lineHeight: "1.7", display: "flex", flexDirection: "column", gap: "6px" }}>
              <li>Simulator inputs are processed in-memory and discarded upon response transmission.</li>
              <li>No query telemetry or inference parameters are forwarded to external multi-tenant cloud providers or advertising networks.</li>
              <li>If the Python backend is offline, inference falls back to client-side mathematical coefficients directly in React with zero network transmission.</li>
            </ul>
          </div>

          {/* Principle 3: Synthetic Empirical Benchmarks */}
          <div className="glass-card" style={{ padding: "24px" }}>
            <h3 style={{ fontSize: "16px", color: "#fff", fontWeight: 600, display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <Database size={18} color="#a78bfa" />
              3. Dataset Anonymization & Governance
            </h3>
            <p style={{ fontSize: "13.5px", color: "var(--text-muted)", lineHeight: "1.7" }}>
              The 25,000 empirical session records loaded into SQLite and visualized in the Dataset Explorer contain only synthetic customer reference keys (`CUST-100` to `CUST-8500`), product SKUs (`PROD-1000` to `PROD-1019`), and quantitative telemetry attributes (session duration, cart size, discount utilization, and purchase binary). This ensures 100% compliance with international research privacy standards.
            </p>
          </div>

          {/* Principle 4: Rights & Data Deletion */}
          <div className="glass-card" style={{ padding: "24px" }}>
            <h3 style={{ fontSize: "16px", color: "#fff", fontWeight: 600, display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <RefreshCw size={18} color="#fbbf24" />
              4. User Control & Preference Clearing
            </h3>
            <p style={{ fontSize: "13.5px", color: "var(--text-muted)", lineHeight: "1.7" }}>
              Users retain full sovereignty over their client session. You can clear all cached presets, active tab preferences, and filter configurations at any time simply by clearing your browser local storage or pressing Hard Refresh (`Ctrl + F5`).
            </p>
          </div>

        </div>

        {/* Right Column: Key Safeguards & Badges */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div className="glass-card" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <h4 style={{ fontSize: "14px", color: "#fff", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Privacy Commitments
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{
                background: "rgba(16, 185, 129, 0.08)",
                border: "1px solid rgba(16, 185, 129, 0.25)",
                padding: "12px 14px",
                borderRadius: "10px"
              }}>
                <div style={{ color: "#34d399", fontWeight: 600, fontSize: "13px" }}>Zero Third-Party Trackers</div>
                <p style={{ fontSize: "11.5px", color: "var(--text-muted)", marginTop: "4px" }}>No Google Analytics, Meta Pixel, or marketing beacons are present.</p>
              </div>

              <div style={{
                background: "rgba(59, 130, 246, 0.08)",
                border: "1px solid rgba(59, 130, 246, 0.25)",
                padding: "12px 14px",
                borderRadius: "10px"
              }}>
                <div style={{ color: "#60a5fa", fontWeight: 600, fontSize: "13px" }}>Ephemeral Model Inferences</div>
                <p style={{ fontSize: "11.5px", color: "var(--text-muted)", marginTop: "4px" }}>What-If inputs are calculated dynamically in RAM and never saved to disk.</p>
              </div>

              <div style={{
                background: "rgba(139, 92, 246, 0.08)",
                border: "1px solid rgba(139, 92, 246, 0.25)",
                padding: "12px 14px",
                borderRadius: "10px"
              }}>
                <div style={{ color: "#c084fc", fontWeight: 600, fontSize: "13px" }}>Open Source Transparency</div>
                <p style={{ fontSize: "11.5px", color: "var(--text-muted)", marginTop: "4px" }}>Backend route schemas and inference code are open for academic audit.</p>
              </div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <h4 style={{ fontSize: "14px", color: "#fff", fontWeight: 700 }}>
              Need Clarification?
            </h4>
            <p style={{ fontSize: "12.5px", color: "var(--text-muted)", lineHeight: "1.6" }}>
              If you have any questions concerning algorithmic fairness, privacy architecture, or data handling protocols:
            </p>
            <button
              type="button"
              onClick={() => setActiveTab && setActiveTab("contact")}
              style={{
                background: "var(--primary-gradient)",
                border: "none",
                borderRadius: "8px",
                padding: "10px 14px",
                color: "#fff",
                fontSize: "12.5px",
                fontWeight: 600,
                cursor: "pointer",
                marginTop: "6px"
              }}
            >
              Contact Data Governance Lead
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
