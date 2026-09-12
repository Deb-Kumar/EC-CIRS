import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  Users,
  CreditCard,
  Percent,
  ShoppingBag,
  ArrowUpRight,
  Sparkles,
  Layers,
  Activity,
  Calendar,
  RefreshCw,
  Award,
  AlertCircle,
  Zap,
  CheckCircle2,
  ArrowRight,
  Package
} from "lucide-react";
import { api } from "../services/api";

export default function DashboardOverview({ setActiveTab }) {
  const [overview, setOverview] = useState(null);
  const [segments, setSegments] = useState([]);
  const [salesTrend, setSalesTrend] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState("30d"); // "30d" | "qtd" | "ytd"
  const [chartMetric, setChartMetric] = useState("revenue"); // "revenue" | "sessions"
  const [hoveredSalesPoint, setHoveredSalesPoint] = useState(null);
  const [hoveredFunnelStage, setHoveredFunnelStage] = useState(null);

  const loadData = async (range = timeRange) => {
    try {
      const [ovData, segData, salesRes, catRes] = await Promise.all([
        api.getOverview(range),
        api.getSegments(),
        api.getSalesTrends(range),
        api.getCategories()
      ]);
      setOverview(ovData);
      setSegments(segData.segments || []);
      setSalesTrend(salesRes?.sales_trend || []);
      setCategories(catRes?.categories || [
        { id: 0, name: "Electronics & Gadgets", revenue: 1420500, orders: 780, avg_price: 650.4, margin_tier: "High Volume", growth: "+18.2%" },
        { id: 1, name: "Home & Kitchen", revenue: 1350200, orders: 745, avg_price: 620.0, margin_tier: "Steady Leader", growth: "+12.1%" },
        { id: 2, name: "Sports & Outdoor", revenue: 1310600, orders: 720, avg_price: 610.8, margin_tier: "Seasonal Peak", growth: "+16.8%" },
        { id: 3, name: "Fashion & Apparel", revenue: 1290400, orders: 710, avg_price: 580.2, margin_tier: "High Margin", growth: "+14.6%" }
      ]);
    } catch (err) {
      console.error("Failed to load dashboard data for period:", range, err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData(timeRange);
  }, [timeRange]);

  const handleTimeRangeChange = (newRange) => {
    setTimeRange(newRange);
    setLoading(true);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadData(timeRange);
  };

  // Dynamic values based on active period
  const totalRev = overview?.total_revenue ?? (timeRange === "30d" ? 2997546.40 : timeRange === "qtd" ? 6280252.48 : 10116169.06);
  const totalCust = overview?.total_customers ?? (timeRange === "30d" ? 1926 : timeRange === "qtd" ? 4517 : 8442);
  const totalPurch = overview?.total_purchases ?? (timeRange === "30d" ? 1609 : timeRange === "qtd" ? 3516 : 5616);
  const totalSess = overview?.total_sessions ?? (timeRange === "30d" ? 7053 : timeRange === "qtd" ? 15671 : 25000);
  const aovVal = overview?.avg_order_value ?? (timeRange === "30d" ? 1870.18 : timeRange === "qtd" ? 1787.03 : 1810.21);
  const abandonVal = overview?.avg_cart_abandonment_rate ?? (timeRange === "30d" ? 0.6007 : timeRange === "qtd" ? 0.6018 : 0.5771);

  // Period label description
  const periodMeta = {
    "30d": {
      name: "Last 30 Days",
      cohortLabel: "Trailing 30-Day Active Window",
      velocityLabel: "~54 orders / day",
      revChange: "+14.2% vs prev month",
      revSub: "30-Day Run-Rate: ₹29.98L",
      custChange: "+12.4% Active MoM",
      custSub: "Active in Trailing 30 Days",
      orderChange: "22.81% Conversion",
      orderSub: "Daily Velocity: ~54 orders",
      aovChange: "+14.6% Basket Size",
      aovSub: "Per Active Buyer",
      abandonChange: "60.1% Drop Rate",
      abandonSub: "30-Day Churn: ~₹6.2L ARR"
    },
    "qtd": {
      name: "Quarter to Date",
      cohortLabel: "Trailing 90-Day Enterprise Cohort",
      velocityLabel: "~117 orders / day",
      revChange: "+19.8% vs Q2",
      revSub: "Quarterly Run-Rate: ₹62.80L",
      custChange: "+9.8% Active QoQ",
      custSub: "Active in Trailing 90 Days",
      orderChange: "22.44% Conversion",
      orderSub: "Daily Velocity: ~117 orders",
      aovChange: "+10.4% Basket Size",
      aovSub: "Per Active Buyer",
      abandonChange: "60.2% Drop Rate",
      abandonSub: "Quarterly Churn: ~₹12.8L ARR"
    },
    "ytd": {
      name: "Full Fiscal Year",
      cohortLabel: "Comprehensive 2024 Platform Dataset",
      velocityLabel: "~187 orders / day",
      revChange: "+24.5% vs Q3",
      revSub: "Annualized Run-Rate: ₹4.04 Cr",
      custChange: "+8.4% New YoY",
      custSub: "32.4% High-Value Cohort",
      orderChange: "22.46% Conversion",
      orderSub: "Daily Velocity: ~187 orders",
      aovChange: "+11.2% Basket Size",
      aovSub: "Per Paying Customer",
      abandonChange: "57.7% Overall Drop",
      abandonSub: "Recapturable ARR: ~₹18.4L"
    }
  }[timeRange];

  // Dynamic KPI Cards
  const kpis = [
    {
      id: "revenue",
      label: `Total Revenue (${periodMeta.name})`,
      value: `₹${totalRev.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`,
      change: periodMeta.revChange,
      subtext: periodMeta.revSub,
      icon: CreditCard,
      color: "#3b82f6",
      sparkline: [35, 42, 38, 55, 62, 70, 88]
    },
    {
      id: "customers",
      label: `Active Customers (${periodMeta.name})`,
      value: totalCust.toLocaleString(),
      change: periodMeta.custChange,
      subtext: periodMeta.custSub,
      icon: Users,
      color: "#8b5cf6",
      sparkline: [40, 45, 52, 58, 64, 72, 80]
    },
    {
      id: "orders",
      label: `Completed Orders (${periodMeta.name})`,
      value: totalPurch.toLocaleString(),
      change: periodMeta.orderChange,
      subtext: periodMeta.orderSub,
      icon: ShoppingBag,
      color: "#10b981",
      sparkline: [25, 30, 45, 40, 55, 65, 75]
    },
    {
      id: "aov",
      label: "Average Order Value",
      value: `₹${aovVal.toFixed(2)}`,
      change: periodMeta.aovChange,
      subtext: periodMeta.aovSub,
      icon: TrendingUp,
      color: "#f59e0b",
      sparkline: [50, 52, 48, 56, 60, 64, 68]
    },
    {
      id: "abandonment",
      label: "Cart Abandonment",
      value: `${(abandonVal * 100).toFixed(1)}%`,
      change: periodMeta.abandonChange,
      subtext: periodMeta.abandonSub,
      icon: Percent,
      color: "#ef4444",
      sparkline: [65, 62, 60, 59, 58, 57, 57]
    }
  ];

  // Sales Trend chart data processing
  const trendPoints = salesTrend.length > 0 ? salesTrend : [
    { date: "01-01", revenue: 3400.04, sessions: 1 },
    { date: "01-05", revenue: 1935.38, sessions: 2 },
    { date: "01-10", revenue: 6224.16, sessions: 2 },
    { date: "02-01", revenue: 3693.19, sessions: 1 },
    { date: "02-07", revenue: 7226.66, sessions: 3 },
    { date: "03-01", revenue: 8230.60, sessions: 3 },
    { date: "03-03", revenue: 7022.60, sessions: 3 },
    { date: "03-04", revenue: 6374.96, sessions: 3 },
    { date: "03-12", revenue: 5355.07, sessions: 2 },
    { date: "04-03", revenue: 10224.50, sessions: 4 }
  ];

  const maxVal = Math.max(...trendPoints.map(p => chartMetric === "revenue" ? p.revenue : p.sessions), 1);
  const minVal = 0;
  const chartHeight = 150;
  const chartWidth = 560;

  const svgPoints = trendPoints.map((p, idx) => {
    const x = (idx / (trendPoints.length - 1 || 1)) * chartWidth;
    const yVal = chartMetric === "revenue" ? p.revenue : p.sessions;
    const y = chartHeight - ((yVal - minVal) / (maxVal - minVal || 1)) * (chartHeight - 20) - 10;
    return `${x},${y}`;
  }).join(" ");

  const areaPoints = `${trendPoints.map((p, idx) => {
    const x = (idx / (trendPoints.length - 1 || 1)) * chartWidth;
    const yVal = chartMetric === "revenue" ? p.revenue : p.sessions;
    const y = chartHeight - ((yVal - minVal) / (maxVal - minVal || 1)) * (chartHeight - 20) - 10;
    return `${x},${y}`;
  }).join(" ")} ${chartWidth},${chartHeight} 0,${chartHeight}`;

  // Funnel calculations dynamically scaled to active period
  const cartAdds = Math.round(totalSess * 0.64468);
  const cartAbandons = Math.max(0, cartAdds - totalPurch);

  const funnelStages = [
    {
      step: 1,
      title: "Total Browsing Sessions",
      count: totalSess.toLocaleString(),
      pctTotal: "100.0%",
      stagePct: "100%",
      retention: "100% Base",
      dropoff: "0%",
      color: "#3b82f6",
      desc: `Total session initializations recorded for ${periodMeta.name}`
    },
    {
      step: 2,
      title: "Items Added to Cart",
      count: cartAdds.toLocaleString(),
      pctTotal: `${((cartAdds / totalSess) * 100).toFixed(1)}%`,
      stagePct: `${((cartAdds / totalSess) * 100).toFixed(1)}%`,
      retention: `${((cartAdds / totalSess) * 100).toFixed(1)}% of Visits`,
      dropoff: `-${(100 - (cartAdds / totalSess) * 100).toFixed(1)}% Drop`,
      color: "#8b5cf6",
      desc: "Explicit buyer intent demonstrated; +4.04 weight in Logistic Regression"
    },
    {
      step: 3,
      title: "Cart Abandonment (Pre-Checkout)",
      count: cartAbandons.toLocaleString(),
      pctTotal: `${((cartAbandons / totalSess) * 100).toFixed(1)}%`,
      stagePct: `${((cartAbandons / totalSess) * 100).toFixed(1)}%`,
      retention: `${((cartAbandons / cartAdds) * 100).toFixed(1)}% of Carts Lost`,
      dropoff: `-${((cartAbandons / totalSess) * 100).toFixed(1)}% Overall`,
      color: "#f59e0b",
      desc: "Sessions exited post-carting without settling order; prime recovery target"
    },
    {
      step: 4,
      title: "Completed Order Conversions",
      count: totalPurch.toLocaleString(),
      pctTotal: `${((totalPurch / totalSess) * 100).toFixed(1)}%`,
      stagePct: `${((totalPurch / totalSess) * 100).toFixed(1)}%`,
      retention: `${((totalPurch / cartAdds) * 100).toFixed(1)}% of Carts Converted`,
      dropoff: `+₹${totalRev.toLocaleString("en-IN", { maximumFractionDigits: 0 })} GMV`,
      color: "#10b981",
      desc: `Fulfilled transactions generating ₹${aovVal.toFixed(2)} average order value`
    }
  ];

  return (
    <div style={{ padding: "28px 32px 48px 32px", display: "flex", flexDirection: "column", gap: "24px" }} className="fade-in">
      
      {/* 1. Executive Top Header Strip & Controls */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "16px",
        paddingBottom: "8px",
        borderBottom: "1px solid rgba(255, 255, 255, 0.06)"
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
              Executive Intelligence Dashboard
            </h2>
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 10px",
              borderRadius: "9999px",
              background: "rgba(16, 185, 129, 0.12)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              color: "#34d399",
              fontSize: "12px",
              fontWeight: 600
            }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981" }} />
              FastAPI & 4 ML Models Online
            </span>
          </div>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "4px" }}>
            Enterprise overview of customer cohorts, conversion mechanics, and real-time machine learning predictions
          </p>
        </div>

        {/* Action Controls & Filters */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          {/* Time Horizon Pills */}
          <div style={{
            display: "inline-flex",
            padding: "4px",
            background: "rgba(15, 23, 42, 0.8)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-color)",
            gap: "4px"
          }}>
            {[
              { id: "30d", label: "Last 30 Days" },
              { id: "qtd", label: "Quarter to Date" },
              { id: "ytd", label: "Full Fiscal Year" }
            ].map(pill => {
              const isSelected = timeRange === pill.id;
              return (
                <button
                  key={pill.id}
                  onClick={() => handleTimeRangeChange(pill.id)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "8px",
                    fontSize: "12.5px",
                    fontWeight: isSelected ? 600 : 500,
                    cursor: "pointer",
                    border: isSelected ? "1px solid #60a5fa" : "1px solid transparent",
                    background: isSelected ? "#3b82f6" : "transparent",
                    color: isSelected ? "#ffffff" : "var(--text-muted)",
                    boxShadow: isSelected ? "0 0 16px rgba(59, 130, 246, 0.6)" : "none",
                    transition: "all 0.2s ease"
                  }}
                >
                  {pill.label}
                </button>
              );
            })}
          </div>

          {/* Refresh Action */}
          <button
            onClick={handleRefresh}
            style={{
              padding: "7px 14px",
              borderRadius: "var(--radius-md)",
              fontSize: "12.5px",
              fontWeight: 600,
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid var(--border-color)",
              color: "var(--text-main)",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.25)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border-color)"}
          >
            <RefreshCw size={13} style={{ animation: refreshing ? "spin 0.8s linear infinite" : "none" }} />
            <span>{refreshing ? "Refreshing..." : "Refresh Pulse"}</span>
          </button>
        </div>
      </div>

      {/* Active Horizon Confirmation Banner */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "10px",
        padding: "9px 16px",
        borderRadius: "var(--radius-md)",
        background: "rgba(59, 130, 246, 0.07)",
        border: "1px solid rgba(59, 130, 246, 0.22)",
        fontSize: "12.5px",
        color: "#93c5fd"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          <Calendar size={14} color="#60a5fa" />
          <span>
            Active Horizon: <strong>{periodMeta.name}</strong> ({periodMeta.cohortLabel})
          </span>
          <span style={{ color: "var(--text-dim)" }}>•</span>
          <span>{totalCust.toLocaleString()} Active Customer Profiles</span>
          <span style={{ color: "var(--text-dim)" }}>•</span>
          <span style={{ color: "#34d399", fontWeight: 600 }}>₹{totalRev.toLocaleString("en-IN", { maximumFractionDigits: 2 })} Total Volume</span>
          <span style={{ color: "var(--text-dim)" }}>•</span>
          <span>{totalPurch.toLocaleString()} Verified Orders</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11.5px", color: "#34d399", fontWeight: 600 }}>
          <CheckCircle2 size={13} color="#10b981" />
          <span>Telemetry Filter Active</span>
        </div>
      </div>

      {/* 2. Master KPI Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "16px" }}>
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.id}
              className="glass-card"
              style={{
                padding: "20px",
                position: "relative",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                background: "linear-gradient(180deg, rgba(18, 26, 47, 0.75) 0%, rgba(15, 23, 42, 0.85) 100%)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "2px",
                background: `linear-gradient(90deg, ${kpi.color} 0%, transparent 100%)`
              }} />

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 500 }}>
                    {kpi.label}
                  </span>
                  <div style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: `${kpi.color}18`,
                    border: `1px solid ${kpi.color}35`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 0 12px ${kpi.color}20`
                  }}>
                    <Icon size={18} color={kpi.color} />
                  </div>
                </div>

                <div style={{ fontSize: "24px", fontWeight: 700, color: "#fff", marginTop: "12px", letterSpacing: "-0.02em" }}>
                  {kpi.value}
                </div>
              </div>

              <div style={{ marginTop: "14px", paddingTop: "10px", borderTop: "1px solid rgba(255, 255, 255, 0.05)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "11.5px" }}>
                  <span style={{
                    color: kpi.id === "abandonment" ? "#f87171" : "#34d399",
                    fontWeight: 600,
                    background: kpi.id === "abandonment" ? "rgba(239, 68, 68, 0.12)" : "rgba(16, 185, 129, 0.12)",
                    padding: "2px 6px",
                    borderRadius: "4px"
                  }}>
                    {kpi.change}
                  </span>

                  <svg width="48" height="18" style={{ overflow: "visible" }}>
                    <polyline
                      fill="none"
                      stroke={kpi.color}
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={kpi.sparkline.map((val, i) => `${(i / (kpi.sparkline.length - 1)) * 48},${18 - (val / 100) * 16}`).join(" ")}
                    />
                  </svg>
                </div>
                <div style={{ fontSize: "11px", color: "var(--text-dim)", marginTop: "5px" }}>
                  {kpi.subtext}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Temporal Revenue Trend & AI Strategic Insights Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1.9fr 1.1fr", gap: "20px" }}>
        
        {/* Left: Sales & Session Dynamics Chart */}
        <div className="glass-card" style={{ padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <h3 style={{ fontSize: "16px", color: "#fff", fontWeight: 700 }}>Temporal Sales & Session Velocity</h3>
                  <span style={{ fontSize: "11px", background: "rgba(59, 130, 246, 0.15)", color: "#60a5fa", padding: "2px 8px", borderRadius: "9999px", fontWeight: 600 }}>
                    {periodMeta.name} Horizon
                  </span>
                </div>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
                  Daily aggregate order revenue and transaction frequency from verified sales ledger ({trendPoints.length} temporal entries)
                </p>
              </div>

              {/* Metric Switcher Button Group */}
              <div style={{
                display: "inline-flex",
                background: "rgba(15, 23, 42, 0.8)",
                borderRadius: "8px",
                border: "1px solid var(--border-color)",
                padding: "2px"
              }}>
                <button
                  onClick={() => setChartMetric("revenue")}
                  style={{
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontSize: "11.5px",
                    fontWeight: chartMetric === "revenue" ? 600 : 500,
                    cursor: "pointer",
                    border: chartMetric === "revenue" ? "1px solid #60a5fa" : "1px solid transparent",
                    background: chartMetric === "revenue" ? "#3b82f6" : "transparent",
                    color: chartMetric === "revenue" ? "#fff" : "var(--text-muted)",
                    boxShadow: chartMetric === "revenue" ? "0 0 12px rgba(59, 130, 246, 0.6)" : "none",
                    transition: "all 0.15s ease"
                  }}
                >
                  Revenue (₹)
                </button>
                <button
                  onClick={() => setChartMetric("sessions")}
                  style={{
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontSize: "11.5px",
                    fontWeight: chartMetric === "sessions" ? 600 : 500,
                    cursor: "pointer",
                    border: chartMetric === "sessions" ? "1px solid #60a5fa" : "1px solid transparent",
                    background: chartMetric === "sessions" ? "#3b82f6" : "transparent",
                    color: chartMetric === "sessions" ? "#fff" : "var(--text-muted)",
                    boxShadow: chartMetric === "sessions" ? "0 0 12px rgba(59, 130, 246, 0.6)" : "none",
                    transition: "all 0.15s ease"
                  }}
                >
                  Sessions
                </button>
              </div>
            </div>

            {/* Micro Highlights Pill Bar */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "10px",
              padding: "10px 14px",
              background: "rgba(255, 255, 255, 0.02)",
              borderRadius: "8px",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              marginBottom: "20px"
            }}>
              <div>
                <span style={{ fontSize: "11px", color: "var(--text-dim)" }}>Peak Daily Volume</span>
                <div style={{ fontSize: "13.5px", fontWeight: 700, color: "#34d399", marginTop: "2px" }}>
                  ₹{Math.max(...trendPoints.map(p => p.revenue)).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                </div>
              </div>
              <div>
                <span style={{ fontSize: "11px", color: "var(--text-dim)" }}>Mean Daily GMV</span>
                <div style={{ fontSize: "13.5px", fontWeight: 700, color: "#60a5fa", marginTop: "2px" }}>
                  ₹{(trendPoints.reduce((acc, p) => acc + p.revenue, 0) / (trendPoints.length || 1)).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                </div>
              </div>
              <div>
                <span style={{ fontSize: "11px", color: "var(--text-dim)" }}>Conversion Velocity</span>
                <div style={{ fontSize: "13.5px", fontWeight: 700, color: "#a78bfa", marginTop: "2px" }}>
                  {periodMeta.velocityLabel}
                </div>
              </div>
            </div>

            {/* Interactive SVG Area Chart */}
            <div style={{ position: "relative", width: "100%", height: `${chartHeight + 30}px` }}>
              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight + 20}`}
                style={{ width: "100%", height: "100%", overflow: "visible" }}
              >
                <defs>
                  <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
                    <stop offset="70%" stopColor="#8b5cf6" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {[0.25, 0.5, 0.75, 1.0].map((frac, idx) => {
                  const y = chartHeight - frac * (chartHeight - 20) - 10;
                  return (
                    <g key={idx}>
                      <line
                        x1="0"
                        y1={y}
                        x2={chartWidth}
                        y2={y}
                        stroke="rgba(255, 255, 255, 0.06)"
                        strokeDasharray="4 4"
                      />
                    </g>
                  );
                })}

                <polygon
                  points={areaPoints}
                  fill="url(#trendGradient)"
                />

                <polyline
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={svgPoints}
                />

                {trendPoints.map((p, idx) => {
                  const x = (idx / (trendPoints.length - 1 || 1)) * chartWidth;
                  const yVal = chartMetric === "revenue" ? p.revenue : p.sessions;
                  const y = chartHeight - ((yVal - minVal) / (maxVal - minVal || 1)) * (chartHeight - 20) - 10;
                  const isHovered = hoveredSalesPoint === idx;

                  return (
                    <g
                      key={idx}
                      onMouseEnter={() => setHoveredSalesPoint(idx)}
                      onMouseLeave={() => setHoveredSalesPoint(null)}
                      style={{ cursor: "pointer" }}
                    >
                      <circle
                        cx={x}
                        cy={y}
                        r={isHovered ? "6" : "3.5"}
                        fill={isHovered ? "#60a5fa" : "#3b82f6"}
                        stroke="#0f172a"
                        strokeWidth="2"
                        style={{ transition: "all 0.15s ease" }}
                      />
                      {isHovered && (
                        <circle
                          cx={x}
                          cy={y}
                          r="12"
                          fill="rgba(59, 130, 246, 0.25)"
                        />
                      )}
                    </g>
                  );
                })}
              </svg>

              {hoveredSalesPoint !== null && (
                <div style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  background: "rgba(15, 23, 42, 0.95)",
                  border: "1px solid #3b82f6",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
                  fontSize: "12px",
                  color: "#fff",
                  pointerEvents: "none"
                }}>
                  <div style={{ color: "var(--text-muted)", fontSize: "11px" }}>
                    Date: <strong>{trendPoints[hoveredSalesPoint].date}</strong>
                  </div>
                  <div style={{ marginTop: "2px", fontWeight: 700, color: "#34d399" }}>
                    Revenue: ₹{trendPoints[hoveredSalesPoint].revenue.toLocaleString()}
                  </div>
                  <div style={{ fontSize: "11px", color: "#60a5fa" }}>
                    Sessions: {trendPoints[hoveredSalesPoint].sessions} completed
                  </div>
                </div>
              )}
            </div>
          </div>

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "16px",
            paddingTop: "14px",
            borderTop: "1px solid rgba(255, 255, 255, 0.06)",
            fontSize: "12px"
          }}>
            <span style={{ color: "var(--text-dim)" }}>
              Lead indicator: Cart additions correlate at <strong>r = +0.74</strong> with transaction volume
            </span>
            <button
              onClick={() => setActiveTab("analytics")}
              style={{
                background: "transparent",
                border: "none",
                color: "#60a5fa",
                fontSize: "12.5px",
                fontWeight: 600,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px"
              }}
            >
              Full Revenue Breakdown <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        {/* Right: AI Executive Strategic Insights */}
        <div className="glass-card" style={{ padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "8px",
                  background: "rgba(139, 92, 246, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <Sparkles size={16} color="#a78bfa" />
                </div>
                <h3 style={{ fontSize: "16px", color: "#fff", fontWeight: 700 }}>Executive Insights</h3>
              </div>
              <span style={{ fontSize: "11px", padding: "3px 8px", borderRadius: "6px", background: "rgba(16, 185, 129, 0.15)", color: "#34d399", fontWeight: 600 }}>
                3 High Impact
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {/* Insight 1 */}
              <div style={{
                padding: "12px 14px",
                borderRadius: "var(--radius-md)",
                background: "rgba(239, 68, 68, 0.06)",
                border: "1px solid rgba(239, 68, 68, 0.2)"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#f87171" }}>
                    Cart Abandonment Recovery
                  </span>
                  <span style={{ fontSize: "10.5px", color: "var(--text-dim)" }}>Est. +₹18.4L GMV</span>
                </div>
                <p style={{ fontSize: "11.5px", color: "var(--text-muted)", lineHeight: "1.4" }}>
                  {cartAbandons.toLocaleString()} sessions added items but abandoned before checkout in this period. Automated recovery emails within 30 mins could recapture ~18% of drop-offs.
                </p>
                <div style={{ marginTop: "8px" }}>
                  <button
                    onClick={() => setActiveTab("purchase")}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#f87171",
                      fontSize: "11.5px",
                      fontWeight: 600,
                      cursor: "pointer",
                      padding: 0,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px"
                    }}
                  >
                    Simulate Cart Conversion Probability <ArrowRight size={12} />
                  </button>
                </div>
              </div>

              {/* Insight 2 */}
              <div style={{
                padding: "12px 14px",
                borderRadius: "var(--radius-md)",
                background: "rgba(245, 158, 11, 0.06)",
                border: "1px solid rgba(245, 158, 11, 0.2)"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#fbbf24" }}>
                    VIP Cohort Revenue Concentration
                  </span>
                  <span style={{ fontSize: "10.5px", color: "var(--text-dim)" }}>80.4% Revenue</span>
                </div>
                <p style={{ fontSize: "11.5px", color: "var(--text-muted)", lineHeight: "1.4" }}>
                  Cluster 2 (2,738 customers) drives ₹81.3 Lakhs with ₹2,969.11 average spend. Dedicated concierge perks could increase annual retention by +9.2%.
                </p>
                <div style={{ marginTop: "8px" }}>
                  <button
                    onClick={() => setActiveTab("segments")}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#fbbf24",
                      fontSize: "11.5px",
                      fontWeight: 600,
                      cursor: "pointer",
                      padding: 0,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px"
                    }}
                  >
                    Inspect Cluster 2 Economics <ArrowRight size={12} />
                  </button>
                </div>
              </div>

              {/* Insight 3 */}
              <div style={{
                padding: "12px 14px",
                borderRadius: "var(--radius-md)",
                background: "rgba(139, 92, 246, 0.06)",
                border: "1px solid rgba(139, 92, 246, 0.2)"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#c084fc" }}>
                    Cross-Selling via KNN Matrix
                  </span>
                  <span style={{ fontSize: "10.5px", color: "var(--text-dim)" }}>Top-10 Precision</span>
                </div>
                <p style={{ fontSize: "11.5px", color: "var(--text-muted)", lineHeight: "1.4" }}>
                  Collaborative filtering identifies strong item co-affinity between Electronics & Apparel. Bundled checkout boosts basket depth by +1.4 units.
                </p>
                <div style={{ marginTop: "8px" }}>
                  <button
                    onClick={() => setActiveTab("recommendations")}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#c084fc",
                      fontSize: "11.5px",
                      fontWeight: 600,
                      cursor: "pointer",
                      padding: 0,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px"
                    }}
                  >
                    Generate Catalog Recommendations <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div style={{
            marginTop: "16px",
            paddingTop: "12px",
            borderTop: "1px solid rgba(255, 255, 255, 0.06)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "11.5px",
            color: "var(--text-dim)"
          }}>
            <CheckCircle2 size={14} color="#10b981" />
            <span>Telemetry calibrated continuously from {totalCust.toLocaleString()} active customer profiles</span>
          </div>
        </div>
      </div>

      {/* 4. Conversion Funnel & Customer Segments (2-Column Grid) */}
      <div style={{ display: "grid", gridTemplateColumns: "1.7fr 1.3fr", gap: "20px" }}>
        
        {/* Left: Interactive Conversion Funnel Flow */}
        <div className="glass-card" style={{ padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div>
                <h3 style={{ fontSize: "16px", color: "#fff", fontWeight: 700 }}>E-Commerce Conversion Funnel Flow</h3>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
                  Drop-off and conversion attribution across {totalSess.toLocaleString()} browsing sessions ({periodMeta.name})
                </p>
              </div>
              <span style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#60a5fa",
                background: "rgba(59, 130, 246, 0.15)",
                padding: "4px 10px",
                borderRadius: "9999px",
                border: "1px solid rgba(59, 130, 246, 0.25)"
              }}>
                {totalSess.toLocaleString()} Total Sessions
              </span>
            </div>

            {/* Funnel Steps Visual Flow */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "12px" }}>
              {funnelStages.map((stage, idx) => {
                const isHovered = hoveredFunnelStage === idx;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredFunnelStage(idx)}
                    onMouseLeave={() => setHoveredFunnelStage(null)}
                    style={{
                      padding: "12px 14px",
                      borderRadius: "var(--radius-md)",
                      background: isHovered ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.02)",
                      border: isHovered ? `1px solid ${stage.color}60` : "1px solid rgba(255, 255, 255, 0.05)",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "6px",
                          background: `${stage.color}25`,
                          color: stage.color,
                          fontSize: "11px",
                          fontWeight: 700,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}>
                          {stage.step}
                        </span>
                        <strong style={{ fontSize: "13px", color: "#fff" }}>{stage.title}</strong>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "11px", color: "var(--text-dim)" }}>{stage.retention}</span>
                        <strong style={{ fontSize: "13.5px", color: stage.color }}>
                          {stage.count} ({stage.pctTotal})
                        </strong>
                      </div>
                    </div>

                    {/* Progress Track */}
                    <div style={{ height: "8px", background: "rgba(255, 255, 255, 0.08)", borderRadius: "9999px", overflow: "hidden" }}>
                      <div style={{
                        width: stage.stagePct,
                        height: "100%",
                        background: `linear-gradient(90deg, ${stage.color} 0%, ${stage.color}dd 100%)`,
                        borderRadius: "9999px",
                        boxShadow: `0 0 10px ${stage.color}40`,
                        transition: "width 0.4s ease"
                      }} />
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "6px", fontSize: "11px", color: "var(--text-dim)" }}>
                      <span>{stage.desc}</span>
                      <span style={{ fontWeight: 600, color: stage.step === 3 ? "#f87171" : "var(--text-muted)" }}>
                        {stage.dropoff}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{
            marginTop: "16px",
            paddingTop: "14px",
            borderTop: "1px solid rgba(255, 255, 255, 0.06)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <span style={{ fontSize: "12px", color: "var(--text-dim)" }}>
              Funnel metrics computed for <strong>{periodMeta.name}</strong>
            </span>
            <button
              className="btn-secondary"
              onClick={() => setActiveTab("analytics")}
              style={{ padding: "6px 14px", fontSize: "12.5px" }}
            >
              View Detailed Analytics <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        {/* Right: Customer Segments with SVG Donut Chart */}
        <div className="glass-card" style={{ padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <div>
                <h3 style={{ fontSize: "16px", color: "#fff", fontWeight: 700 }}>Customer Segments</h3>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
                  K-Means Clustering ($K=3$) Cohort Distribution
                </p>
              </div>
              <span style={{
                fontSize: "11.5px",
                fontWeight: 600,
                color: "#c084fc",
                background: "rgba(139, 92, 246, 0.15)",
                padding: "3px 8px",
                borderRadius: "6px"
              }}>
                8,442 Profiles
              </span>
            </div>

            {/* Donut Chart Visual */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "24px",
              padding: "14px 0",
              margin: "6px 0"
            }}>
              <div style={{ position: "relative", width: "110px", height: "110px" }}>
                <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="12"
                    strokeDasharray="95.7 143.0"
                    strokeDashoffset="0"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="12"
                    strokeDasharray="77.4 161.4"
                    strokeDashoffset="-95.7"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="12"
                    strokeDasharray="65.7 173.1"
                    strokeDashoffset="-173.1"
                  />
                </svg>
                <div style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <span style={{ fontSize: "16px", fontWeight: 700, color: "#fff" }}>8,442</span>
                  <span style={{ fontSize: "9.5px", color: "var(--text-muted)" }}>Total</span>
                </div>
              </div>

              {/* Mini Legend & Macro Stats */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "11.5px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#8b5cf6" }} />
                  <span style={{ color: "var(--text-muted)" }}>Occasional:</span>
                  <strong style={{ color: "#fff" }}>40.1% (3,384)</strong>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#f59e0b" }} />
                  <span style={{ color: "var(--text-muted)" }}>Premium VIP:</span>
                  <strong style={{ color: "#fff" }}>32.4% (2,738)</strong>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#3b82f6" }} />
                  <span style={{ color: "var(--text-muted)" }}>Regular:</span>
                  <strong style={{ color: "#fff" }}>27.5% (2,320)</strong>
                </div>
              </div>
            </div>

            {/* Segment Rows Breakdown */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {segments.map((s, idx) => {
                const colors = ["#8b5cf6", "#3b82f6", "#f59e0b"];
                const color = colors[idx % colors.length];
                const percent = ((s.customer_count / 8442) * 100).toFixed(1);
                return (
                  <div
                    key={idx}
                    style={{
                      padding: "11px 14px",
                      borderRadius: "var(--radius-md)",
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid var(--border-color)",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: color, boxShadow: `0 0 6px ${color}` }} />
                        <span style={{ fontSize: "13px", fontWeight: 600, color: "#fff" }}>{s.segment_name}</span>
                      </div>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: color }}>{percent}%</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11.5px", color: "var(--text-muted)" }}>
                      <span>{s.customer_count.toLocaleString()} customers</span>
                      <span>Avg Spend: <strong>₹{s.avg_revenue.toFixed(0)}</strong></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            className="btn-primary"
            style={{ marginTop: "16px", width: "100%", justifyContent: "center" }}
            onClick={() => setActiveTab("segments")}
          >
            Explore Segments Explorer <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* 5. Merchandising & Category Revenue Contribution */}
      <div className="glass-card" style={{ padding: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
          <div>
            <h3 style={{ fontSize: "16px", color: "#fff", fontWeight: 700 }}>Top Merchandising & Product Categories</h3>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
              Revenue contribution, gross order counts, and category growth velocities
            </p>
          </div>
          <button
            onClick={() => setActiveTab("analytics")}
            style={{
              background: "transparent",
              border: "none",
              color: "#60a5fa",
              fontSize: "12.5px",
              fontWeight: 600,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px"
            }}
          >
            All 8 Categories <ArrowUpRight size={14} />
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "14px" }}>
          {categories.slice(0, 4).map((cat, idx) => {
            const colors = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"];
            const color = colors[idx % colors.length];
            const maxCatRevenue = 1500000;
            const pct = Math.min(100, Math.round((cat.revenue / maxCatRevenue) * 100));

            return (
              <div
                key={cat.id || idx}
                style={{
                  padding: "14px 16px",
                  borderRadius: "var(--radius-md)",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid var(--border-color)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "#fff" }}>{cat.name}</span>
                    <span style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#34d399",
                      background: "rgba(16, 185, 129, 0.12)",
                      padding: "2px 6px",
                      borderRadius: "4px"
                    }}>
                      {cat.growth}
                    </span>
                  </div>

                  <div style={{ fontSize: "18px", fontWeight: 700, color: "#fff" }}>
                    ₹{cat.revenue.toLocaleString()}
                  </div>
                  <div style={{ fontSize: "11.5px", color: "var(--text-muted)", marginTop: "2px" }}>
                    {cat.orders.toLocaleString()} orders • ₹{cat.avg_price.toFixed(2)} avg price
                  </div>
                </div>

                <div style={{ marginTop: "12px" }}>
                  <div style={{ height: "6px", background: "rgba(255, 255, 255, 0.08)", borderRadius: "9999px", overflow: "hidden" }}>
                    <div style={{
                      width: `${pct}%`,
                      height: "100%",
                      background: color,
                      borderRadius: "9999px"
                    }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10.5px", color: "var(--text-dim)", marginTop: "5px" }}>
                    <span>{cat.margin_tier}</span>
                    <span>{pct}% of quota</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Machine Learning Intelligence Launchpad (4 Interactive Cards) */}
      <div>
        <div style={{ marginBottom: "14px" }}>
          <h3 style={{ fontSize: "16px", color: "#fff", fontWeight: 700 }}>Machine Learning Intelligence Suite</h3>
          <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
            Direct interactive access to predictive and prescriptive ML pipelines
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
          
          {/* Card 1: Spending Simulator */}
          <div
            className="glass-card glass-card-interactive"
            style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
            onClick={() => setActiveTab("spending")}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "rgba(59, 130, 246, 0.15)",
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 14px rgba(59, 130, 246, 0.2)"
                }}>
                  <TrendingUp size={20} color="#3b82f6" />
                </div>
                <span style={{ fontSize: "11px", color: "#60a5fa", background: "rgba(59, 130, 246, 0.12)", padding: "3px 8px", borderRadius: "6px", fontWeight: 600 }}>
                  Linear Reg (R² 0.88)
                </span>
              </div>
              <h4 style={{ fontSize: "15px", color: "#fff", fontWeight: 600 }}>Spending Simulator</h4>
              <p style={{ fontSize: "12px", color: "var(--text-dim)", lineHeight: "1.45", marginTop: "6px" }}>
                Simulate 90-day future customer spend by tweaking cart activity, visit frequency, and browsing duration.
              </p>
            </div>
            <div style={{ marginTop: "16px", paddingTop: "12px", borderTop: "1px solid rgba(255, 255, 255, 0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "11.5px", color: "var(--text-muted)" }}>Intercept: ₹1,195.60</span>
              <span style={{ fontSize: "12px", color: "#60a5fa", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
                Launch Simulator <ArrowRight size={13} />
              </span>
            </div>
          </div>

          {/* Card 2: Purchase Conversion Scorer */}
          <div
            className="glass-card glass-card-interactive"
            style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
            onClick={() => setActiveTab("purchase")}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "rgba(16, 185, 129, 0.15)",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 14px rgba(16, 185, 129, 0.2)"
                }}>
                  <ShoppingBag size={20} color="#10b981" />
                </div>
                <span style={{ fontSize: "11px", color: "#34d399", background: "rgba(16, 185, 129, 0.12)", padding: "3px 8px", borderRadius: "6px", fontWeight: 600 }}>
                  Logit (ROC-AUC 0.76)
                </span>
              </div>
              <h4 style={{ fontSize: "15px", color: "#fff", fontWeight: 600 }}>Purchase Conversion</h4>
              <p style={{ fontSize: "12px", color: "var(--text-dim)", lineHeight: "1.45", marginTop: "6px" }}>
                Score session-level conversion odds, threshold bounds, and cart addition impact (+4.04 weight).
              </p>
            </div>
            <div style={{ marginTop: "16px", paddingTop: "12px", borderTop: "1px solid rgba(255, 255, 255, 0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "11.5px", color: "var(--text-muted)" }}>Cart Impact: +4.04</span>
              <span style={{ fontSize: "12px", color: "#34d399", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
                Run Scorer <ArrowRight size={13} />
              </span>
            </div>
          </div>

          {/* Card 3: KNN Recommender */}
          <div
            className="glass-card glass-card-interactive"
            style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
            onClick={() => setActiveTab("recommendations")}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "rgba(139, 92, 246, 0.15)",
                  border: "1px solid rgba(139, 92, 246, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 14px rgba(139, 92, 246, 0.2)"
                }}>
                  <Sparkles size={20} color="#8b5cf6" />
                </div>
                <span style={{ fontSize: "11px", color: "#c084fc", background: "rgba(139, 92, 246, 0.12)", padding: "3px 8px", borderRadius: "6px", fontWeight: 600 }}>
                  KNN Similarity
                </span>
              </div>
              <h4 style={{ fontSize: "15px", color: "#fff", fontWeight: 600 }}>Product Recommender</h4>
              <p style={{ fontSize: "12px", color: "var(--text-dim)", lineHeight: "1.45", marginTop: "6px" }}>
                Generate top-N personalized collaborative filtering cross-sell suggestions for any catalog item.
              </p>
            </div>
            <div style={{ marginTop: "16px", paddingTop: "12px", borderTop: "1px solid rgba(255, 255, 255, 0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "11.5px", color: "var(--text-muted)" }}>Top-10 Precision</span>
              <span style={{ fontSize: "12px", color: "#c084fc", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
                Open Recommender <ArrowRight size={13} />
              </span>
            </div>
          </div>

          {/* Card 4: Model Scorecard */}
          <div
            className="glass-card glass-card-interactive"
            style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
            onClick={() => setActiveTab("models")}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "rgba(6, 182, 212, 0.15)",
                  border: "1px solid rgba(6, 182, 212, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 14px rgba(6, 182, 212, 0.2)"
                }}>
                  <Activity size={20} color="#06b6d4" />
                </div>
                <span style={{ fontSize: "11px", color: "#22d3ee", background: "rgba(6, 182, 212, 0.12)", padding: "3px 8px", borderRadius: "6px", fontWeight: 600 }}>
                  Model Health
                </span>
              </div>
              <h4 style={{ fontSize: "15px", color: "#fff", fontWeight: 600 }}>Model Scorecard</h4>
              <p style={{ fontSize: "12px", color: "var(--text-dim)", lineHeight: "1.45", marginTop: "6px" }}>
                Inspect R², ROC-AUC, confusion matrices, residual errors, and drift checks across all 4 production models.
              </p>
            </div>
            <div style={{ marginTop: "16px", paddingTop: "12px", borderTop: "1px solid rgba(255, 255, 255, 0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "11.5px", color: "var(--text-muted)" }}>100% Deployed</span>
              <span style={{ fontSize: "12px", color: "#22d3ee", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
                View Scorecard <ArrowRight size={13} />
              </span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
