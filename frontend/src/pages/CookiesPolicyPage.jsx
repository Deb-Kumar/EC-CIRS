import React, { useState } from "react";
import {
  Cookie,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  HardDrive,
  EyeOff,
  ArrowLeft,
  Settings,
  HelpCircle
} from "lucide-react";

export default function CookiesPolicyPage({ setActiveTab }) {
  const [clearedNotice, setClearedNotice] = useState(false);

  const handleClearCache = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      setClearedNotice(true);
      setTimeout(() => setClearedNotice(false), 3500);
    } catch (e) {
      console.error(e);
    }
  };

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
          color: "#fbbf24",
          background: "rgba(245, 158, 11, 0.12)",
          padding: "6px 14px",
          borderRadius: "9999px",
          border: "1px solid rgba(245, 158, 11, 0.3)",
          fontWeight: 600
        }}>
          Transparent Storage Standards
        </span>
      </div>

      {/* Hero Header */}
      <div className="glass-card" style={{ padding: "36px", display: "flex", flexDirection: "column", gap: "14px", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute",
          top: "-50px",
          right: "-50px",
          width: "240px",
          height: "240px",
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.18) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none"
        }} />

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{
            width: "52px",
            height: "52px",
            borderRadius: "14px",
            background: "rgba(245, 158, 11, 0.15)",
            border: "1px solid rgba(245, 158, 11, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fbbf24"
          }}>
            <Cookie size={28} />
          </div>
          <div>
            <h2 style={{ fontSize: "26px", color: "#fff", fontWeight: 700 }}>
              Cookies & Local Storage Policy
            </h2>
            <p style={{ fontSize: "13.5px", color: "var(--text-muted)", marginTop: "2px" }}>
              How client storage is used for UI state, simulator caches, and telemetry with zero commercial tracking.
            </p>
          </div>
        </div>
      </div>

      {clearedNotice && (
        <div style={{
          background: "rgba(16, 185, 129, 0.15)",
          border: "1px solid rgba(16, 185, 129, 0.4)",
          borderRadius: "10px",
          padding: "14px 18px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          color: "#34d399",
          fontSize: "13px"
        }}>
          <CheckCircle2 size={18} />
          <span>Local storage and session storage cache have been successfully cleared!</span>
        </div>
      )}

      {/* Grid Content */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
        {/* Left Column: Storage Details */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* Section 1: What we use */}
          <div className="glass-card" style={{ padding: "26px" }}>
            <h3 style={{ fontSize: "16px", color: "#fff", fontWeight: 600, display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <HardDrive size={18} color="#60a5fa" />
              1. What Technologies Are Used?
            </h3>
            <p style={{ fontSize: "13.5px", color: "var(--text-muted)", lineHeight: "1.7", marginBottom: "12px" }}>
              EC-CIRS does <strong>not</strong> write traditional HTTP tracking cookies to your browser header. Instead, we use modern HTML5 <code>localStorage</code> and <code>sessionStorage</code> APIs strictly for front-end user experience persistence.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                { title: "Navigation State", desc: "Saves your last active platform module (e.g. Spending vs. Customers) so a browser reload does not reset your workflow." },
                { title: "Simulation Parameters", desc: "Temporarily holds what-if slider positions in the Spending and Purchase simulators for comparison." },
                { title: "Catalog Search Filters", desc: "Retains active customer or SKU filter strings across directory pagination queries." }
              ].map((item, idx) => (
                <div key={idx} style={{ background: "rgba(15, 23, 42, 0.5)", padding: "12px", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
                  <div style={{ color: "#fff", fontSize: "13px", fontWeight: 600 }}>{item.title}</div>
                  <div style={{ color: "var(--text-muted)", fontSize: "12px", marginTop: "2px" }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Zero Ad Tracking */}
          <div className="glass-card" style={{ padding: "26px" }}>
            <h3 style={{ fontSize: "16px", color: "#fff", fontWeight: 600, display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <EyeOff size={18} color="#34d399" />
              2. Absolute Zero Ad-Tracking or Fingerprinting
            </h3>
            <p style={{ fontSize: "13.5px", color: "var(--text-muted)", lineHeight: "1.7" }}>
              We never participate in cross-site tracking, device fingerprinting, or behavioral retargeting. No marketing pixels (e.g. Facebook Pixel, Google Ads, TikTok Pixel, or Criteo) exist in our codebase. Your navigation journeys within the platform remain entirely private to your local computer.
            </p>
          </div>

          {/* Section 3: Managing Storage */}
          <div className="glass-card" style={{ padding: "26px" }}>
            <h3 style={{ fontSize: "16px", color: "#fff", fontWeight: 600, display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <Settings size={18} color="#c084fc" />
              3. How to Inspect or Flush Stored Data
            </h3>
            <p style={{ fontSize: "13.5px", color: "var(--text-muted)", lineHeight: "1.7", marginBottom: "12px" }}>
              You can independently inspect all data written by EC-CIRS using your browser's Developer Tools (F12 or right-click → Inspect → Application → Local Storage).
            </p>
            <p style={{ fontSize: "13.5px", color: "var(--text-muted)", lineHeight: "1.7" }}>
              You may also instantly flush all platform storage directly using the interactive utility button below.
            </p>
          </div>

        </div>

        {/* Right Column: Actions & Compliance */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Flush Cache Action */}
          <div className="glass-card" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "14px" }}>
            <h4 style={{ fontSize: "14px", color: "#fff", fontWeight: 700 }}>
              Storage Management
            </h4>
            <p style={{ fontSize: "12.5px", color: "var(--text-muted)", lineHeight: "1.6" }}>
              Want to reset all saved simulator sliders, active filters, and navigation states to factory defaults?
            </p>
            <button
              type="button"
              onClick={handleClearCache}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                background: "rgba(239, 68, 68, 0.15)",
                border: "1px solid rgba(239, 68, 68, 0.35)",
                borderRadius: "8px",
                padding: "10px 16px",
                color: "#f87171",
                fontSize: "12.5px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s ease"
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(239, 68, 68, 0.25)"; e.currentTarget.style.borderColor = "#ef4444"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(239, 68, 68, 0.15)"; e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.35)"; }}
            >
              <Trash2 size={14} /> Clear Local Storage Cache
            </button>
          </div>

          {/* Quick Facts */}
          <div className="glass-card" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <h4 style={{ fontSize: "14px", color: "#fff", fontWeight: 700 }}>
              Quick Facts
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)" }}>
                <span>Third-Party Cookies:</span>
                <strong style={{ color: "#34d399" }}>0 (None)</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)" }}>
                <span>Ad Network Pixels:</span>
                <strong style={{ color: "#34d399" }}>0 (None)</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)" }}>
                <span>Client Storage Size:</span>
                <strong style={{ color: "#60a5fa" }}>&lt; 5 KB</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)" }}>
                <span>Compliance:</span>
                <strong style={{ color: "#fbbf24" }}>ePrivacy & GDPR</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
