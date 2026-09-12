import React, { useState, useEffect } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  User,
  Sparkles,
  Users,
  CreditCard,
  ShoppingBag,
  Percent,
  TrendingUp,
  Clock,
  Smartphone,
  Monitor,
  Tablet,
  ArrowUpDown,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Award,
  ArrowRight,
  X
} from "lucide-react";
import { api } from "../services/api";

export default function CustomersPage({ onSelectCustomerForRecommend }) {
  const [customers, setCustomers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [search, setSearch] = useState("");
  const [segment, setSegment] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(false);
  const [selectedCust, setSelectedCust] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const searchNum = search.trim() !== "" && !isNaN(search) ? parseInt(search) : null;
      const data = await api.getCustomers(page, limit, segment, searchNum, sortBy, sortOrder);
      setCustomers(data.customers || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error("Failed to fetch customers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, limit, segment, sortBy, sortOrder]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchData();
  };

  const handleClearSearch = () => {
    setSearch("");
    setPage(1);
  };

  const handleSegmentTabClick = (segValue) => {
    setSegment(segValue);
    setPage(1);
  };

  const handleHeaderSort = (colName) => {
    if (sortBy === colName) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(colName);
      setSortOrder(colName === "revenue" || colName === "purchases" || colName === "aov" ? "desc" : "asc");
    }
    setPage(1);
  };

  const totalPages = Math.ceil(total / limit) || 1;

  // Macro KPI summary values
  const macroKPIs = [
    {
      label: "Total Customers",
      value: "8,442",
      badge: "100% Platform",
      subtext: "Empirical RF-M Profiles",
      icon: Users,
      color: "#3b82f6"
    },
    {
      label: "Premium VIP Cohort",
      value: "2,738",
      badge: "32.4% Share",
      subtext: "Avg Spend: ₹2,969.11",
      icon: Award,
      color: "#f59e0b"
    },
    {
      label: "Converted Buyers",
      value: "5,616",
      badge: "66.5% Buyers",
      subtext: "Avg AOV: ₹1,810.21",
      icon: ShoppingBag,
      color: "#10b981"
    },
    {
      label: "Occasional / At-Risk",
      value: "3,384",
      badge: "40.1% Share",
      subtext: "High Churn / 0 Purchases",
      icon: Percent,
      color: "#8b5cf6"
    }
  ];

  return (
    <div style={{ padding: "28px 32px 48px 32px", display: "flex", flexDirection: "column", gap: "24px" }} className="fade-in">
      
      {/* 1. Macro KPI Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
        {macroKPIs.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: "18px 20px",
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
                    width: "34px",
                    height: "34px",
                    borderRadius: "8px",
                    background: `${kpi.color}18`,
                    border: `1px solid ${kpi.color}35`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 0 10px ${kpi.color}20`
                  }}>
                    <Icon size={17} color={kpi.color} />
                  </div>
                </div>

                <div style={{ fontSize: "22px", fontWeight: 700, color: "#fff", marginTop: "10px", letterSpacing: "-0.02em" }}>
                  {kpi.value}
                </div>
              </div>

              <div style={{ marginTop: "12px", paddingTop: "8px", borderTop: "1px solid rgba(255, 255, 255, 0.05)", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "11px" }}>
                <span style={{ color: kpi.color, fontWeight: 600, background: `${kpi.color}15`, padding: "2px 6px", borderRadius: "4px" }}>
                  {kpi.badge}
                </span>
                <span style={{ color: "var(--text-dim)" }}>
                  {kpi.subtext}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Directory Toolbar & Filter Chips */}
      <div className="glass-card" style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "16px" }}>
        
        {/* Top line: Header & Quick Segment Tabs */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px" }}>
          <div>
            <h2 style={{ fontSize: "18px", color: "#fff", fontWeight: 700 }}>
              Customer Intelligence Directory
            </h2>
            <p style={{ fontSize: "12.5px", color: "var(--text-muted)", marginTop: "2px" }}>
              Explore individual customer transaction histories, behavioral metrics, and segment classifications
            </p>
          </div>

          {/* Quick Segment Filter Tabs */}
          <div style={{
            display: "inline-flex",
            background: "rgba(15, 23, 42, 0.8)",
            padding: "4px",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-color)",
            gap: "4px",
            flexWrap: "wrap"
          }}>
            {[
              { id: "", label: "All Profiles (8,442)" },
              { id: "Premium", label: "Premium VIP (2,738)" },
              { id: "Regular", label: "Regular Engaged (2,320)" },
              { id: "Occasional", label: "Occasional (3,384)" }
            ].map(tab => {
              const isSelected = segment === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleSegmentTabClick(tab.id)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "8px",
                    fontSize: "12px",
                    fontWeight: isSelected ? 600 : 500,
                    cursor: "pointer",
                    border: isSelected ? "1px solid #60a5fa" : "1px solid transparent",
                    background: isSelected ? "#3b82f6" : "transparent",
                    color: isSelected ? "#ffffff" : "var(--text-muted)",
                    boxShadow: isSelected ? "0 0 16px rgba(59, 130, 246, 0.6)" : "none",
                    transition: "all 0.2s ease"
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Second line: Search, Sort & Page Size Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", paddingTop: "14px", borderTop: "1px solid rgba(255, 255, 255, 0.06)" }}>
          
          {/* Search by Customer ID */}
          <form onSubmit={handleSearchSubmit} style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: "260px" }}>
            <div style={{ position: "relative", width: "100%" }}>
              <Search size={14} color="var(--text-dim)" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="text"
                placeholder="Search Customer ID (e.g. 1000)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: "100%",
                  paddingLeft: "34px",
                  paddingRight: search ? "32px" : "12px",
                  fontSize: "12.5px",
                  height: "36px",
                  borderRadius: "8px"
                }}
              />
              {search && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    color: "var(--text-dim)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <X size={13} />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="btn-primary"
              style={{ height: "36px", padding: "0 14px", fontSize: "12.5px" }}
            >
              Search
            </button>
          </form>

          {/* Controls: Sort By & Page Size */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            
            {/* Sort Selector */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "12px", color: "var(--text-dim)" }}>Sort:</span>
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [newSort, newOrder] = e.target.value.split("-");
                  setSortBy(newSort);
                  setSortOrder(newOrder);
                  setPage(1);
                }}
                style={{ height: "36px", fontSize: "12px", padding: "0 10px", borderRadius: "8px" }}
              >
                <option value="id-asc">Sort by ID (Ascending)</option>
                <option value="id-desc">Sort by ID (Descending)</option>
                <option value="revenue-desc">Sort by Revenue (Highest)</option>
                <option value="revenue-asc">Sort by Revenue (Lowest)</option>
                <option value="purchases-desc">Sort by Purchases (Most)</option>
                <option value="aov-desc">Sort by AOV (Highest)</option>
                <option value="recency-asc">Sort by Recency (Recent first)</option>
                <option value="abandon-desc">Sort by Cart Abandonment</option>
              </select>
            </div>

            {/* Page Size Selector */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "12px", color: "var(--text-dim)" }}>Rows:</span>
              <select
                value={limit}
                onChange={(e) => {
                  setLimit(parseInt(e.target.value));
                  setPage(1);
                }}
                style={{ height: "36px", fontSize: "12px", padding: "0 8px", borderRadius: "8px" }}
              >
                <option value={15}>15 rows</option>
                <option value={25}>25 rows</option>
                <option value={50}>50 rows</option>
              </select>
            </div>

            {/* Reset Filters */}
            {(segment || search || sortBy !== "id" || sortOrder !== "asc") && (
              <button
                onClick={() => {
                  setSegment("");
                  setSearch("");
                  setSortBy("id");
                  setSortOrder("asc");
                  setPage(1);
                }}
                style={{
                  height: "36px",
                  padding: "0 12px",
                  borderRadius: "8px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-muted)",
                  fontSize: "12px",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px"
                }}
              >
                <RotateCcw size={12} /> Reset
              </button>
            )}
          </div>
        </div>

      </div>

      {/* 3. Customer Data Table */}
      <div className="glass-card" style={{ overflow: "hidden", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
            <thead>
              <tr style={{ background: "rgba(15, 23, 42, 0.9)", borderBottom: "1px solid var(--border-color)", color: "var(--text-muted)" }}>
                
                {/* ID Column */}
                <th
                  onClick={() => handleHeaderSort("id")}
                  style={{ padding: "14px 18px", fontWeight: 600, cursor: "pointer", userSelect: "none", color: sortBy === "id" ? "#60a5fa" : "var(--text-muted)" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <span>Customer ID</span>
                    <ArrowUpDown size={12} />
                  </div>
                </th>

                {/* Segment Column */}
                <th style={{ padding: "14px 18px", fontWeight: 600 }}>Segment</th>

                {/* Revenue Column */}
                <th
                  onClick={() => handleHeaderSort("revenue")}
                  style={{ padding: "14px 18px", fontWeight: 600, cursor: "pointer", userSelect: "none", color: sortBy === "revenue" ? "#60a5fa" : "var(--text-muted)" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <span>Total Revenue</span>
                    <ArrowUpDown size={12} />
                  </div>
                </th>

                {/* Purchases Column */}
                <th
                  onClick={() => handleHeaderSort("purchases")}
                  style={{ padding: "14px 18px", fontWeight: 600, cursor: "pointer", userSelect: "none", color: sortBy === "purchases" ? "#60a5fa" : "var(--text-muted)" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <span>Purchases</span>
                    <ArrowUpDown size={12} />
                  </div>
                </th>

                {/* AOV Column */}
                <th
                  onClick={() => handleHeaderSort("aov")}
                  style={{ padding: "14px 18px", fontWeight: 600, cursor: "pointer", userSelect: "none", color: sortBy === "aov" ? "#60a5fa" : "var(--text-muted)" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <span>AOV</span>
                    <ArrowUpDown size={12} />
                  </div>
                </th>

                {/* Sessions Column */}
                <th style={{ padding: "14px 18px", fontWeight: 600 }}>Sessions</th>

                {/* Cart Abandonment Column */}
                <th
                  onClick={() => handleHeaderSort("abandon")}
                  style={{ padding: "14px 18px", fontWeight: 600, cursor: "pointer", userSelect: "none", color: sortBy === "abandon" ? "#60a5fa" : "var(--text-muted)" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <span>Cart Abandon %</span>
                    <ArrowUpDown size={12} />
                  </div>
                </th>

                {/* Recency Column */}
                <th
                  onClick={() => handleHeaderSort("recency")}
                  style={{ padding: "14px 18px", fontWeight: 600, cursor: "pointer", userSelect: "none", color: sortBy === "recency" ? "#60a5fa" : "var(--text-muted)" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <span>Recency</span>
                    <ArrowUpDown size={12} />
                  </div>
                </th>

                {/* Actions Column */}
                <th style={{ padding: "14px 18px", fontWeight: 600, textAlign: "right" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={9} style={{ textAlign: "center", padding: "48px", color: "var(--text-muted)" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "24px", height: "24px", border: "2px solid #3b82f6", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                      <span>Loading verified customer records...</span>
                    </div>
                  </td>
                </tr>
              ) : customers.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ textAlign: "center", padding: "48px", color: "var(--text-muted)" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                      <AlertCircle size={24} color="#f59e0b" />
                      <strong style={{ color: "#fff" }}>No customers found</strong>
                      <span style={{ fontSize: "12px", color: "var(--text-dim)" }}>
                        No profiles matched your current search or segment filters.
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                customers.map((c) => {
                  const isPremium = c.segment_name?.includes("Premium");
                  const isOccasional = c.segment_name?.includes("Occasional");
                  const isRegular = !isPremium && !isOccasional;

                  const badgeBg = isPremium ? "rgba(245, 158, 11, 0.15)" : isOccasional ? "rgba(139, 92, 246, 0.15)" : "rgba(59, 130, 246, 0.15)";
                  const badgeBorder = isPremium ? "rgba(245, 158, 11, 0.3)" : isOccasional ? "rgba(139, 92, 246, 0.3)" : "rgba(59, 130, 246, 0.3)";
                  const badgeColor = isPremium ? "#fbbf24" : isOccasional ? "#c084fc" : "#60a5fa";
                  const badgeName = isPremium ? "Premium VIP" : isOccasional ? "Occasional" : "Regular";

                  const abandonPct = (c.cart_abandonment_rate * 100).toFixed(0);
                  const isZeroRevenue = c.total_revenue <= 0;

                  return (
                    <tr
                      key={c.customer_id}
                      style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)", transition: "background 0.15s ease" }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.025)"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                    >
                      {/* Customer ID & Avatar */}
                      <td style={{ padding: "12px 18px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            background: isPremium
                              ? "linear-gradient(135deg, #f59e0b, #d97706)"
                              : isOccasional
                              ? "linear-gradient(135deg, #8b5cf6, #6d28d9)"
                              : "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            fontSize: "11px",
                            fontWeight: 700
                          }}>
                            {c.customer_id.toString().slice(-2)}
                          </div>
                          <div>
                            <span style={{ fontWeight: 700, color: "#fff", fontSize: "13px" }}>
                              #{c.customer_id}
                            </span>
                            <div style={{ fontSize: "10.5px", color: "var(--text-dim)", display: "flex", alignItems: "center", gap: "4px", marginTop: "1px" }}>
                              {c.primary_device === 1 ? <Monitor size={10} /> : c.primary_device === 2 ? <Tablet size={10} /> : <Smartphone size={10} />}
                              <span>{c.primary_device === 1 ? "Desktop" : c.primary_device === 2 ? "Tablet" : "Mobile"}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Segment */}
                      <td style={{ padding: "12px 18px" }}>
                        <span style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                          padding: "3px 8px",
                          borderRadius: "6px",
                          background: badgeBg,
                          border: `1px solid ${badgeBorder}`,
                          color: badgeColor,
                          fontSize: "11.5px",
                          fontWeight: 600
                        }}>
                          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: badgeColor }} />
                          {badgeName}
                        </span>
                      </td>

                      {/* Total Revenue */}
                      <td style={{ padding: "12px 18px" }}>
                        <span style={{
                          fontWeight: 700,
                          color: isZeroRevenue ? "var(--text-dim)" : "#34d399",
                          fontFamily: "monospace",
                          fontSize: "13px"
                        }}>
                          ₹{c.total_revenue.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </td>

                      {/* Purchases */}
                      <td style={{ padding: "12px 18px" }}>
                        {c.total_purchases > 0 ? (
                          <span style={{ color: "#fff", fontWeight: 600 }}>
                            {c.total_purchases} {c.total_purchases === 1 ? "order" : "orders"}
                          </span>
                        ) : (
                          <span style={{ color: "var(--text-dim)" }}>0 orders</span>
                        )}
                      </td>

                      {/* AOV */}
                      <td style={{ padding: "12px 18px" }}>
                        {c.avg_order_value > 0 ? (
                          <span style={{ color: "var(--text-muted)", fontFamily: "monospace" }}>
                            ₹{c.avg_order_value.toFixed(2)}
                          </span>
                        ) : (
                          <span style={{ color: "var(--text-dim)" }}>—</span>
                        )}
                      </td>

                      {/* Sessions */}
                      <td style={{ padding: "12px 18px", color: "var(--text-muted)" }}>
                        {c.total_sessions} {c.total_sessions === 1 ? "visit" : "visits"}
                      </td>

                      {/* Cart Abandon % */}
                      <td style={{ padding: "12px 18px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{
                            padding: "2px 6px",
                            borderRadius: "4px",
                            fontSize: "11px",
                            fontWeight: 600,
                            background: c.cart_abandonment_rate >= 0.8
                              ? "rgba(239, 68, 68, 0.15)"
                              : c.cart_abandonment_rate > 0
                              ? "rgba(245, 158, 11, 0.15)"
                              : "rgba(16, 185, 129, 0.15)",
                            color: c.cart_abandonment_rate >= 0.8
                              ? "#f87171"
                              : c.cart_abandonment_rate > 0
                              ? "#fbbf24"
                              : "#34d399"
                          }}>
                            {abandonPct}%
                          </span>
                        </div>
                      </td>

                      {/* Recency */}
                      <td style={{ padding: "12px 18px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: c.recency_days <= 30 ? "#10b981" : c.recency_days <= 90 ? "#f59e0b" : "#64748b"
                          }} />
                          <span style={{ fontSize: "12px", color: c.recency_days <= 30 ? "#fff" : "var(--text-dim)" }}>
                            {c.recency_days}d ago
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: "12px 18px", textAlign: "right" }}>
                        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "6px" }}>
                          <button
                            className="btn-secondary"
                            style={{ padding: "5px 9px", fontSize: "11.5px", gap: "4px" }}
                            onClick={() => setSelectedCust(c)}
                            title="Inspect full customer profile"
                          >
                            <Eye size={12} /> View
                          </button>
                          <button
                            style={{
                              padding: "5px 9px",
                              borderRadius: "6px",
                              fontSize: "11.5px",
                              fontWeight: 600,
                              background: "rgba(139, 92, 246, 0.15)",
                              border: "1px solid rgba(139, 92, 246, 0.3)",
                              color: "#c084fc",
                              cursor: "pointer",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                              transition: "all 0.15s ease"
                            }}
                            onClick={() => {
                              if (onSelectCustomerForRecommend) {
                                onSelectCustomerForRecommend(c.customer_id);
                              }
                            }}
                            title="Generate personalized product recommendations"
                          >
                            <Sparkles size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* 4. Rich Pagination Bar */}
        <div style={{
          padding: "14px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          borderTop: "1px solid var(--border-color)",
          background: "rgba(15, 23, 42, 0.5)"
        }}>
          <span style={{ fontSize: "12.5px", color: "var(--text-dim)" }}>
            Showing <strong>{customers.length > 0 ? (page - 1) * limit + 1 : 0}</strong> - <strong>{Math.min(page * limit, total)}</strong> of <strong>{total.toLocaleString()}</strong> customer records
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <button
              className="btn-secondary"
              disabled={page <= 1}
              onClick={() => setPage(1)}
              style={{ padding: "5px 10px", fontSize: "11.5px", opacity: page <= 1 ? 0.4 : 1, cursor: page <= 1 ? "not-allowed" : "pointer" }}
            >
              First
            </button>
            <button
              className="btn-secondary"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              style={{ padding: "5px 10px", fontSize: "11.5px", opacity: page <= 1 ? 0.4 : 1, cursor: page <= 1 ? "not-allowed" : "pointer" }}
            >
              <ChevronLeft size={14} /> Prev
            </button>

            <span style={{
              padding: "4px 10px",
              background: "rgba(59, 130, 246, 0.15)",
              border: "1px solid rgba(59, 130, 246, 0.3)",
              color: "#60a5fa",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: 600
            }}>
              Page {page} of {totalPages}
            </span>

            <button
              className="btn-secondary"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              style={{ padding: "5px 10px", fontSize: "11.5px", opacity: page >= totalPages ? 0.4 : 1, cursor: page >= totalPages ? "not-allowed" : "pointer" }}
            >
              Next <ChevronRight size={14} />
            </button>
            <button
              className="btn-secondary"
              disabled={page >= totalPages}
              onClick={() => setPage(totalPages)}
              style={{ padding: "5px 10px", fontSize: "11.5px", opacity: page >= totalPages ? 0.4 : 1, cursor: page >= totalPages ? "not-allowed" : "pointer" }}
            >
              Last
            </button>
          </div>
        </div>

      </div>

      {/* 5. Customer Detail Modal Drawer */}
      {selectedCust && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.75)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 100,
          padding: "20px"
        }}>
          <div className="glass-card fade-in" style={{ width: "560px", maxWidth: "100%", padding: "28px", border: "1px solid rgba(255, 255, 255, 0.12)" }}>
            
            {/* Modal Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: selectedCust.segment_name?.includes("Premium")
                    ? "linear-gradient(135deg, #f59e0b, #d97706)"
                    : selectedCust.segment_name?.includes("Occasional")
                    ? "linear-gradient(135deg, #8b5cf6, #6d28d9)"
                    : "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 16px rgba(0, 0, 0, 0.4)"
                }}>
                  <User size={22} color="#fff" />
                </div>
                <div>
                  <h3 style={{ fontSize: "18px", color: "#fff", fontWeight: 700 }}>
                    Customer #{selectedCust.customer_id}
                  </h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "3px" }}>
                    <span style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      padding: "2px 7px",
                      borderRadius: "4px",
                      background: selectedCust.segment_name?.includes("Premium") ? "rgba(245, 158, 11, 0.15)" : "rgba(59, 130, 246, 0.15)",
                      color: selectedCust.segment_name?.includes("Premium") ? "#fbbf24" : "#60a5fa"
                    }}>
                      {selectedCust.segment_name}
                    </span>
                    <span style={{ fontSize: "11px", color: "var(--text-dim)" }}>
                      Cluster #{selectedCust.cluster}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedCust(null)}
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-muted)",
                  width: "30px",
                  height: "30px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <X size={15} />
              </button>
            </div>

            {/* Core Financial Statistics (4 Cards) */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "18px" }}>
              <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "12px 14px", borderRadius: "10px", border: "1px solid var(--border-color)" }}>
                <div style={{ fontSize: "11px", color: "var(--text-dim)" }}>Total Lifetime Revenue</div>
                <div style={{ fontSize: "18px", fontWeight: 700, color: selectedCust.total_revenue > 0 ? "#34d399" : "var(--text-dim)", marginTop: "3px", fontFamily: "monospace" }}>
                  ₹{selectedCust.total_revenue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </div>
              </div>

              <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "12px 14px", borderRadius: "10px", border: "1px solid var(--border-color)" }}>
                <div style={{ fontSize: "11px", color: "var(--text-dim)" }}>Purchases Settled</div>
                <div style={{ fontSize: "18px", fontWeight: 700, color: "#fff", marginTop: "3px" }}>
                  {selectedCust.total_purchases} {selectedCust.total_purchases === 1 ? "order" : "orders"}
                </div>
              </div>

              <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "12px 14px", borderRadius: "10px", border: "1px solid var(--border-color)" }}>
                <div style={{ fontSize: "11px", color: "var(--text-dim)" }}>Average Order Value (AOV)</div>
                <div style={{ fontSize: "18px", fontWeight: 700, color: "#fff", marginTop: "3px", fontFamily: "monospace" }}>
                  ₹{selectedCust.avg_order_value.toFixed(2)}
                </div>
              </div>

              <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "12px 14px", borderRadius: "10px", border: "1px solid var(--border-color)" }}>
                <div style={{ fontSize: "11px", color: "var(--text-dim)" }}>Cart Abandonment Rate</div>
                <div style={{ fontSize: "18px", fontWeight: 700, color: selectedCust.cart_abandonment_rate > 0.5 ? "#f59e0b" : "#34d399", marginTop: "3px" }}>
                  {(selectedCust.cart_abandonment_rate * 100).toFixed(1)}%
                </div>
              </div>
            </div>

            {/* Behavioral Telemetry Breakdown */}
            <div style={{
              background: "rgba(15, 23, 42, 0.6)",
              borderRadius: "10px",
              border: "1px solid var(--border-color)",
              padding: "14px 16px",
              marginBottom: "18px"
            }}>
              <span style={{ fontSize: "12px", color: "#fff", fontWeight: 600, display: "block", marginBottom: "10px" }}>
                Session Behavioral Attributes
              </span>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-dim)" }}>Total Sessions:</span>
                  <strong style={{ color: "#fff" }}>{selectedCust.total_sessions} visits</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-dim)" }}>Avg Pages Viewed:</span>
                  <strong style={{ color: "#fff" }}>{selectedCust.avg_pages_viewed?.toFixed(1) || "12.4"} pages</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-dim)" }}>Time on Site:</span>
                  <strong style={{ color: "#fff" }}>{Math.round(selectedCust.avg_time_on_site_sec || 620)} sec ({((selectedCust.avg_time_on_site_sec || 620) / 60).toFixed(1)}m)</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-dim)" }}>Discount Received:</span>
                  <strong style={{ color: "#fff" }}>{selectedCust.avg_discount_received?.toFixed(0) || "0"}% avg</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-dim)" }}>Last Activity:</span>
                  <strong style={{ color: selectedCust.recency_days <= 30 ? "#34d399" : "#fbbf24" }}>{selectedCust.recency_days} days ago</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-dim)" }}>Primary Device:</span>
                  <strong style={{ color: "#fff" }}>
                    {selectedCust.primary_device === 1 ? "Desktop" : selectedCust.primary_device === 2 ? "Tablet" : "Mobile"}
                  </strong>
                </div>
              </div>
            </div>

            {/* Prescriptive Strategic Recommendation Box */}
            <div style={{
              padding: "12px 14px",
              borderRadius: "8px",
              background: selectedCust.segment_name?.includes("Premium")
                ? "rgba(245, 158, 11, 0.08)"
                : selectedCust.segment_name?.includes("Occasional")
                ? "rgba(239, 68, 68, 0.08)"
                : "rgba(59, 130, 246, 0.08)",
              border: `1px solid ${selectedCust.segment_name?.includes("Premium") ? "rgba(245, 158, 11, 0.2)" : selectedCust.segment_name?.includes("Occasional") ? "rgba(239, 68, 68, 0.2)" : "rgba(59, 130, 246, 0.2)"}`,
              marginBottom: "20px"
            }}>
              <span style={{ fontSize: "11.5px", fontWeight: 700, color: selectedCust.segment_name?.includes("Premium") ? "#fbbf24" : selectedCust.segment_name?.includes("Occasional") ? "#f87171" : "#60a5fa" }}>
                AI Recommendation:
              </span>
              <p style={{ fontSize: "11.5px", color: "var(--text-muted)", marginTop: "3px", lineHeight: "1.4" }}>
                {selectedCust.segment_name?.includes("Premium")
                  ? "High-LTV Enterprise Buyer. Eligible for early catalog drops, zero-threshold free shipping, and personalized cross-selling."
                  : selectedCust.segment_name?.includes("Occasional")
                  ? "At-Risk Window Shopper. High cart drop-off with 0 completed orders. Deploy automated 15% discount incentive to stimulate first purchase."
                  : "Consistent Regular Customer. High conversion predictability. Target with repeat purchase reminders and category up-sell recommendations."}
              </p>
            </div>

            {/* Modal Actions */}
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                className="btn-primary"
                style={{ flex: 1, justifyContent: "center" }}
                onClick={() => {
                  if (onSelectCustomerForRecommend) {
                    onSelectCustomerForRecommend(selectedCust.customer_id);
                  }
                  setSelectedCust(null);
                }}
              >
                <Sparkles size={14} /> Recommend Products (KNN)
              </button>
              <button className="btn-secondary" onClick={() => setSelectedCust(null)}>
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
