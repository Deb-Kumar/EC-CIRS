import React from "react";
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  ShoppingCart,
  Sparkles,
  PieChart,
  Cpu,
  BarChart3,
  ShieldCheck,
  ChevronRight,
  Database
} from "lucide-react";

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard, badge: "Overview" },
    { id: "customers", label: "Customers", icon: Users, count: "8.4k" },
    { id: "spending", label: "Spending Prediction", icon: TrendingUp, model: "Linear Reg" },
    { id: "purchase", label: "Purchase Probability", icon: ShoppingCart, model: "Logistic Reg" },
    { id: "recommendations", label: "Product Recommender", icon: Sparkles, model: "KNN" },
    { id: "segments", label: "Customer Segments", icon: PieChart, model: "K-Means" },
    { id: "models", label: "Model Scorecard", icon: Cpu, badge: "Metrics" },
    { id: "analytics", label: "Funnel & Trends", icon: BarChart3 },
    { id: "dataset", label: "Dataset Explorer", icon: Database, count: "25k", badge: "Live" }
  ];

  return (
    <aside style={{
      width: "280px",
      minWidth: "280px",
      height: "100vh",
      background: "var(--bg-sidebar)",
      borderRight: "1px solid var(--border-color)",
      display: "flex",
      flexDirection: "column",
      position: "sticky",
      top: 0,
      zIndex: 40
    }}>
      {/* Brand Header */}
      <div style={{
        padding: "24px 20px",
        borderBottom: "1px solid var(--border-color)",
        display: "flex",
        alignItems: "center",
        gap: "12px"
      }}>
        <div style={{
          width: "42px",
          height: "42px",
          borderRadius: "var(--radius-md)",
          background: "var(--primary-gradient)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 16px rgba(59, 130, 246, 0.4)"
        }}>
          <Sparkles size={22} color="#ffffff" />
        </div>
        <div>
          <h2 style={{ fontSize: "17px", fontWeight: 700, letterSpacing: "-0.01em", color: "#fff" }}>
            EC-CIRS
          </h2>
          <p style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 500 }}>
            Customer Intelligence ML
          </p>
        </div>
      </div>

      {/* Navigation List */}
      <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: "6px", overflowY: "auto" }}>
        <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em", padding: "6px 12px" }}>
          Intelligence Modules
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                width: "100%",
                padding: "11px 14px",
                borderRadius: "var(--radius-md)",
                background: isActive ? "rgba(59, 130, 246, 0.15)" : "transparent",
                color: isActive ? "#ffffff" : "var(--text-muted)",
                border: isActive ? "1px solid rgba(59, 130, 246, 0.35)" : "1px solid transparent",
                fontFamily: "var(--font-heading)",
                fontSize: "13.5px",
                fontWeight: isActive ? 600 : 500,
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                  e.currentTarget.style.color = "#ffffff";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--text-muted)";
                }
              }}
            >
              <Icon size={18} color={isActive ? "#3b82f6" : "currentColor"} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.model && (
                <span style={{
                  fontSize: "9.5px",
                  background: "rgba(255, 255, 255, 0.06)",
                  color: "var(--text-dim)",
                  padding: "2px 5px",
                  borderRadius: "4px"
                }}>
                  {item.model}
                </span>
              )}
              {item.count && (
                <span style={{ fontSize: "11px", color: "var(--text-dim)", fontWeight: 600 }}>
                  {item.count}
                </span>
              )}
              {isActive && <ChevronRight size={14} color="#3b82f6" />}
            </button>
          );
        })}
      </nav>

      {/* Footer System Status */}
      <div style={{
        padding: "16px 20px",
        borderTop: "1px solid var(--border-color)",
        background: "rgba(10, 15, 28, 0.6)",
        display: "flex",
        alignItems: "center",
        gap: "10px"
      }}>
        <div style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "#10b981",
          boxShadow: "0 0 8px #10b981"
        }} />
        <div>
          <div style={{ fontSize: "12px", fontWeight: 600, color: "#fff" }}>Models Engine</div>
          <div style={{ fontSize: "10.5px", color: "var(--text-muted)" }}>FastAPI :8000 Online</div>
        </div>
      </div>
    </aside>
  );
}
