import React from "react";
import { Search, Bell, Database, CheckCircle2, Shield } from "lucide-react";

export default function Header({ title, subtitle, apiOnline }) {
  return (
    <header style={{
      height: "72px",
      borderBottom: "1px solid var(--border-color)",
      background: "rgba(11, 15, 25, 0.75)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 32px",
      position: "sticky",
      top: 0,
      zIndex: 30
    }}>
      {/* Title & Path */}
      <div>
        <h1 style={{ fontSize: "20px", color: "#fff", fontWeight: 700 }}>
          {title}
        </h1>
        <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
          {subtitle || "E-Commerce Customer Analytics & Machine Learning Platform"}
        </p>
      </div>

      {/* Action Bar */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {/* Backend Connectivity Status Pill */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: apiOnline ? "rgba(16, 185, 129, 0.12)" : "rgba(245, 158, 11, 0.12)",
          border: `1px solid ${apiOnline ? "rgba(16, 185, 129, 0.3)" : "rgba(245, 158, 11, 0.3)"}`,
          padding: "6px 12px",
          borderRadius: "9999px",
          fontSize: "12px",
          fontWeight: 600,
          color: apiOnline ? "#34d399" : "#fbbf24"
        }}>
          <div style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: apiOnline ? "#10b981" : "#f59e0b",
            boxShadow: `0 0 6px ${apiOnline ? "#10b981" : "#f59e0b"}`
          }} />
          <span>{apiOnline ? "FastAPI Connected" : "Local Inference Mode"}</span>
        </div>

        {/* Database Stats Pill */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          background: "rgba(255, 255, 255, 0.04)",
          border: "1px solid var(--border-color)",
          padding: "6px 12px",
          borderRadius: "9999px",
          fontSize: "12px",
          color: "var(--text-muted)"
        }}>
          <Database size={13} color="#94a3b8" />
          <span>25,000 Records</span>
        </div>


      </div>
    </header>
  );
}
