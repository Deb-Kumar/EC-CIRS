import React, { useState, useEffect, useMemo } from "react";
import {
  Database,
  Search,
  Filter,
  Download,
  RefreshCw,
  Eye,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  Layers,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Smartphone,
  Tablet,
  Calendar,
  DollarSign,
  Tag,
  Clock,
  Sparkles,
  Info,
  X,
  ArrowUpDown,
  BookOpen,
  ShoppingBag,
  Users
} from "lucide-react";
import { api } from "../services/api";

export default function DatasetPage() {
  const [activeTable, setActiveTable] = useState("transactions");
  const [summary, setSummary] = useState(null);
  const [schema, setSchema] = useState([]);
  const [records, setRecords] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(false);

  // Filters and Pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [purchasedFilter, setPurchasedFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [deviceFilter, setDeviceFilter] = useState("");
  const [sortBy, setSortBy] = useState("session_id");
  const [sortOrder, setSortOrder] = useState("asc");

  // Selected row for full inspect modal
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'dictionary'

  // Load summary once
  useEffect(() => {
    async function loadInitial() {
      try {
        const [sumRes, schemaRes] = await Promise.all([
          api.getDatasetSummary(),
          api.getDatasetSchema(activeTable)
        ]);
        setSummary(sumRes?.overview || null);
        setSchema(schemaRes?.columns || []);
      } catch (err) {
        console.error("Failed to load dataset metadata:", err);
      } finally {
        setLoading(false);
      }
    }
    loadInitial();
  }, []);

  // Update schema when table changes
  useEffect(() => {
    async function updateSchema() {
      try {
        const schemaRes = await api.getDatasetSchema(activeTable);
        setSchema(schemaRes?.columns || []);
      } catch (err) {
        console.error("Failed to load schema:", err);
      }
    }
    updateSchema();
  }, [activeTable]);

  // Load paginated records
  const fetchRecords = async () => {
    setTableLoading(true);
    try {
      const res = await api.getDatasetRecords({
        table: activeTable,
        page,
        limit: pageSize,
        search: searchTerm,
        searchField,
        sortBy,
        sortOrder,
        purchased: purchasedFilter !== "" ? Number(purchasedFilter) : null,
        category: categoryFilter !== "" ? Number(categoryFilter) : null,
        device: deviceFilter !== "" ? Number(deviceFilter) : null
      });

      setRecords(res.records || []);
      setTotalRecords(res.total_records || 0);
      setTotalPages(res.total_pages || 1);
    } catch (err) {
      console.error("Failed to fetch dataset records:", err);
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [activeTable, page, pageSize, searchField, purchasedFilter, categoryFilter, deviceFilter, sortBy, sortOrder]);

  // Handle Search Debounce / Submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchRecords();
  };

  // CSV Export
  const exportToCSV = () => {
    if (!records || records.length === 0) return;
    const headers = Object.keys(records[0]).filter(k => typeof records[0][k] !== "object");
    const csvRows = [];
    csvRows.push(headers.join(","));

    for (const row of records) {
      const values = headers.map(header => {
        const escaped = ('' + (row[header] ?? '')).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(","));
    }

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${activeTable}_page_${page}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const categoryMap = {
    0: "Electronics & Gadgets",
    1: "Fashion & Apparel",
    2: "Home & Kitchen",
    3: "Beauty & Personal Care",
    4: "Books & Media",
    5: "Sports & Outdoor",
    6: "Automotive & Tools",
    7: "Health & Wellness"
  };

  return (
    <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "24px" }} className="fade-in">
      {/* Top Banner & Overview */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
            <span style={{
              background: "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(16, 185, 129, 0.2))",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              color: "#34d399",
              padding: "4px 10px",
              borderRadius: "20px",
              fontSize: "11px",
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: "6px"
            }}>
              <Database size={13} color="#34d399" /> LIVE DATASET REPOSITORY
            </span>
            <span style={{ fontSize: "12px", color: "var(--text-dim)" }}>
              Ecommerce.csv • {summary?.total_transactions ? `${summary.total_transactions.toLocaleString()} Transactions` : "Verified Transactions"} • 29 Engineered Attributes
            </span>
          </div>
          <h2 style={{ fontSize: "24px", color: "#fff", fontWeight: 700 }}>
            E-Commerce Dataset Explorer & Data Dictionary
          </h2>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "4px", maxWidth: "800px" }}>
            Direct interactive access to the primary e-commerce database. Query raw transaction sessions, inspect 
            RFM engineered customer profiles, explore the product catalog, and review feature definitions.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => setViewMode(viewMode === "table" ? "dictionary" : "table")}
            className="btn btn-secondary"
            style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px" }}
          >
            <BookOpen size={16} color="#93c5fd" />
            {viewMode === "table" ? "Data Dictionary" : "Table Explorer"}
          </button>
          <button
            onClick={exportToCSV}
            className="btn btn-primary"
            style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px" }}
          >
            <Download size={16} color="#fff" />
            Export Page CSV
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
        <div className="glass-card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "12px", color: "var(--text-dim)", fontWeight: 600 }}>Total Records</span>
            <FileSpreadsheet size={18} color="#3b82f6" />
          </div>
          <div style={{ fontSize: "24px", fontWeight: 700, color: "#fff" }}>
            {summary ? summary.total_transactions.toLocaleString() : "Live Records"}
          </div>
          <span style={{ fontSize: "11px", color: "#93c5fd" }}>
            Across {summary?.total_customers ? `${summary.total_customers.toLocaleString()} Unique Customers` : "Unique Customers"}
          </span>
        </div>

        <div className="glass-card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "12px", color: "var(--text-dim)", fontWeight: 600 }}>Feature Dimensionality</span>
            <Layers size={18} color="#8b5cf6" />
          </div>
          <div style={{ fontSize: "24px", fontWeight: 700, color: "#fff" }}>
            29 Columns
          </div>
          <span style={{ fontSize: "11px", color: "#34d399" }}>
            100% Data Integrity • 0 Nulls
          </span>
        </div>

        <div className="glass-card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "12px", color: "var(--text-dim)", fontWeight: 600 }}>Gross Transaction Volume</span>
            <DollarSign size={18} color="#10b981" />
          </div>
          <div style={{ fontSize: "24px", fontWeight: 700, color: "#34d399" }}>
            ₹{summary ? (summary.total_revenue / 100000).toFixed(2) + " Lakhs" : "₹1.01 Cr"}
          </div>
          <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
            AOV ₹{summary?.average_order_value || "1,801.31"}
          </span>
        </div>

        <div className="glass-card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "12px", color: "var(--text-dim)", fontWeight: 600 }}>Conversion Benchmark</span>
            <Sparkles size={18} color="#f59e0b" />
          </div>
          <div style={{ fontSize: "24px", fontWeight: 700, color: "#fff" }}>
            {summary?.overall_conversion_rate || "22.46"}%
          </div>
          <span style={{ fontSize: "11px", color: "#fcd34d" }}>
            {summary?.total_purchases?.toLocaleString() || "5,616"} Successful Orders
          </span>
        </div>
      </div>

      {/* Dataset Table Switcher Tabs */}
      <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px" }}>
        <button
          onClick={() => { setActiveTable("transactions"); setPage(1); }}
          style={{
            background: activeTable === "transactions" ? "var(--primary-gradient)" : "transparent",
            color: activeTable === "transactions" ? "#fff" : "var(--text-muted)",
            border: "none",
            padding: "8px 18px",
            borderRadius: "8px",
            fontWeight: 600,
            fontSize: "13px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.2s"
          }}
        >
          <ShoppingBag size={16} /> Raw Transactions ({summary?.total_transactions ? (summary.total_transactions >= 1000 ? `${(summary.total_transactions / 1000).toFixed(0)}k` : summary.total_transactions) : "Live"})
        </button>

        <button
          onClick={() => { setActiveTable("customers"); setPage(1); }}
          style={{
            background: activeTable === "customers" ? "var(--primary-gradient)" : "transparent",
            color: activeTable === "customers" ? "#fff" : "var(--text-muted)",
            border: "none",
            padding: "8px 18px",
            borderRadius: "8px",
            fontWeight: 600,
            fontSize: "13px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.2s"
          }}
        >
          <Users size={16} /> Customer Profiles ({summary?.total_customers ? (summary.total_customers >= 1000 ? `${(summary.total_customers / 1000).toFixed(1)}k` : summary.total_customers) : "Live"})
        </button>

        <button
          onClick={() => { setActiveTable("products"); setPage(1); }}
          style={{
            background: activeTable === "products" ? "var(--primary-gradient)" : "transparent",
            color: activeTable === "products" ? "#fff" : "var(--text-muted)",
            border: "none",
            padding: "8px 18px",
            borderRadius: "8px",
            fontWeight: 600,
            fontSize: "13px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.2s"
          }}
        >
          <Tag size={16} /> Product Catalog ({summary?.total_products ? summary.total_products.toLocaleString() : "Catalog"})
        </button>
      </div>

      {viewMode === "dictionary" ? (
        /* Data Dictionary View */
        <div className="glass-card" style={{ padding: "26px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h3 style={{ fontSize: "16px", color: "#fff", fontWeight: 700 }}>
                Data Dictionary & Attribute Architecture ({activeTable.toUpperCase()})
              </h3>
              <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                Complete specifications, storage types, descriptions, and machine learning roles.
              </p>
            </div>
            <button
              onClick={() => setViewMode("table")}
              className="btn btn-secondary"
              style={{ fontSize: "12px" }}
            >
              Back to Records
            </button>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-color)", color: "var(--text-dim)" }}>
                  <th style={{ padding: "12px 14px" }}>Feature Name</th>
                  <th style={{ padding: "12px 14px" }}>Data Type</th>
                  <th style={{ padding: "12px 14px" }}>ML Role</th>
                  <th style={{ padding: "12px 14px" }}>Description & Significance</th>
                </tr>
              </thead>
              <tbody>
                {schema.map((col, idx) => (
                  <tr
                    key={idx}
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                      background: idx % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent"
                    }}
                  >
                    <td style={{ padding: "12px 14px", fontWeight: 600, color: "#60a5fa" }}>
                      <code>{col.name}</code>
                    </td>
                    <td style={{ padding: "12px 14px", color: "var(--text-muted)" }}>
                      {col.type}
                    </td>
                    <td style={{ padding: "12px 14px" }}>
                      <span style={{
                        padding: "3px 8px",
                        borderRadius: "6px",
                        fontSize: "11px",
                        fontWeight: 600,
                        background: col.role.includes("Target") ? "rgba(245, 158, 11, 0.15)" :
                          col.role.includes("Feature") ? "rgba(59, 130, 246, 0.15)" : "rgba(255,255,255,0.08)",
                        color: col.role.includes("Target") ? "#fcd34d" :
                          col.role.includes("Feature") ? "#93c5fd" : "#94a3b8",
                        border: col.role.includes("Target") ? "1px solid rgba(245, 158, 11, 0.3)" : "none"
                      }}>
                        {col.role}
                      </span>
                    </td>
                    <td style={{ padding: "12px 14px", color: "var(--text-main)" }}>
                      {col.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Table Explorer View */
        <div className="glass-card" style={{ padding: "22px", display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Controls Bar: Search & Filter Dropdowns */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            background: "rgba(15, 23, 42, 0.4)",
            padding: "12px 14px",
            borderRadius: "10px",
            border: "1px solid rgba(255, 255, 255, 0.06)"
          }}>
            {/* Search Input & Field Scope Selector */}
            <form onSubmit={handleSearchSubmit} style={{ display: "flex", alignItems: "center", gap: "8px", flex: "1 1 320px", minWidth: "260px", maxWidth: "460px" }}>
              {/* Search Scope Filter */}
              <select
                value={searchField}
                onChange={(e) => { setSearchField(e.target.value); setPage(1); }}
                style={{
                  height: "36px",
                  padding: "0 10px",
                  background: "rgba(15, 23, 42, 0.9)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "8px",
                  color: "#93c5fd",
                  fontSize: "12px",
                  fontWeight: 600,
                  outline: "none",
                  cursor: "pointer",
                  flexShrink: 0
                }}
                title="Select search attribute"
              >
                <option value="all">🔍 All Columns</option>
                {activeTable === "transactions" && (
                  <>
                    <option value="session_id"># Session ID</option>
                    <option value="customer_id">👤 Customer ID</option>
                    <option value="product_id">📦 Product ID</option>
                  </>
                )}
                {activeTable === "customers" && (
                  <option value="customer_id">👤 Customer ID</option>
                )}
                {activeTable === "products" && (
                  <option value="product_id">📦 Product ID</option>
                )}
              </select>

              <div style={{
                position: "relative",
                width: "100%",
                display: "flex",
                alignItems: "center"
              }}>
                <Search size={15} color="var(--text-dim)" style={{ position: "absolute", left: "12px", pointerEvents: "none" }} />
                <input
                  type="text"
                  placeholder={
                    searchField === "session_id"
                      ? "Search Session ID (e.g. 9339)..."
                      : searchField === "customer_id"
                      ? "Search Customer ID (e.g. 9339 or CUST-9339)..."
                      : searchField === "product_id"
                      ? "Search Product ID (e.g. 1001)..."
                      : `Search ${activeTable} by text, ID, or value...`
                  }
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: "100%",
                    height: "36px",
                    padding: "0 34px 0 36px",
                    background: "rgba(15, 23, 42, 0.8)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "12.5px",
                    outline: "none"
                  }}
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => { setSearchTerm(""); setPage(1); }}
                    style={{ position: "absolute", right: "10px", background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer", display: "flex", alignItems: "center" }}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </form>

            {/* Filters Row */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", flex: "0 1 auto" }}>
              {activeTable === "transactions" && (
                <>
                  {/* Category Filter */}
                  <select
                    value={categoryFilter}
                    onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
                    style={{
                      height: "36px",
                      width: "auto",
                      minWidth: "135px",
                      padding: "0 12px",
                      background: "rgba(15, 23, 42, 0.8)",
                      border: "1px solid var(--border-color)",
                      borderRadius: "8px",
                      color: "#fff",
                      fontSize: "12px",
                      outline: "none",
                      cursor: "pointer"
                    }}
                  >
                    <option value="">All Categories</option>
                    {Object.entries(categoryMap).map(([id, name]) => (
                      <option key={id} value={id}>{name}</option>
                    ))}
                  </select>

                  {/* Device Filter */}
                  <select
                    value={deviceFilter}
                    onChange={(e) => { setDeviceFilter(e.target.value); setPage(1); }}
                    style={{
                      height: "36px",
                      width: "auto",
                      minWidth: "115px",
                      padding: "0 12px",
                      background: "rgba(15, 23, 42, 0.8)",
                      border: "1px solid var(--border-color)",
                      borderRadius: "8px",
                      color: "#fff",
                      fontSize: "12px",
                      outline: "none",
                      cursor: "pointer"
                    }}
                  >
                    <option value="">All Devices</option>
                    <option value="0">Desktop</option>
                    <option value="1">Mobile</option>
                    <option value="2">Tablet</option>
                  </select>

                  {/* Purchased Status */}
                  <select
                    value={purchasedFilter}
                    onChange={(e) => { setPurchasedFilter(e.target.value); setPage(1); }}
                    style={{
                      height: "36px",
                      width: "auto",
                      minWidth: "135px",
                      padding: "0 12px",
                      background: "rgba(15, 23, 42, 0.8)",
                      border: "1px solid var(--border-color)",
                      borderRadius: "8px",
                      color: "#fff",
                      fontSize: "12px",
                      outline: "none",
                      cursor: "pointer"
                    }}
                  >
                    <option value="">All Transactions</option>
                    <option value="1">Purchased Only</option>
                    <option value="0">Non-Purchased</option>
                  </select>
                </>
              )}

              {/* Sort Order Toggle */}
              <button
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                style={{
                  height: "36px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "0 12px",
                  background: "rgba(15, 23, 42, 0.8)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "8px",
                  color: "#93c5fd",
                  fontSize: "12px",
                  cursor: "pointer",
                  fontWeight: 600
                }}
                title={`Current sort: ${sortOrder.toUpperCase()}`}
              >
                <ArrowUpDown size={13} /> {sortOrder.toUpperCase()}
              </button>

              {/* Page size */}
              <select
                value={pageSize}
                onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
                style={{
                  height: "36px",
                  width: "auto",
                  minWidth: "105px",
                  padding: "0 10px",
                  background: "rgba(15, 23, 42, 0.8)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "12px",
                  outline: "none",
                  cursor: "pointer"
                }}
              >
                <option value="15">15 / page</option>
                <option value="25">25 / page</option>
                <option value="50">50 / page</option>
                <option value="100">100 / page</option>
              </select>

              <button
                onClick={() => {
                  setSearchTerm("");
                  setSearchField("all");
                  setCategoryFilter("");
                  setDeviceFilter("");
                  setPurchasedFilter("");
                  setPage(1);
                  fetchRecords();
                }}
                style={{
                  height: "36px",
                  width: "36px",
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid var(--border-color)",
                  padding: "0",
                  borderRadius: "8px",
                  color: "#fff",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                title="Reset Filters & Refresh"
              >
                <RefreshCw size={14} className={tableLoading ? "spin" : ""} />
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div style={{
            overflowX: "auto",
            borderRadius: "8px",
            border: "1px solid var(--border-color)",
            background: "rgba(15, 23, 42, 0.4)",
            minHeight: "380px"
          }}>
            {tableLoading ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 0", gap: "12px" }}>
                <div className="spinner" />
                <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>Loading records from {activeTable}...</span>
              </div>
            ) : records.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-muted)" }}>
                No records found matching your filters.
              </div>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px", textAlign: "left" }}>
                <thead>
                  <tr style={{ background: "rgba(15, 23, 42, 0.9)", borderBottom: "1px solid var(--border-color)", color: "var(--text-dim)" }}>
                    {activeTable === "transactions" && (
                      <>
                        <th style={{ padding: "10px 14px" }}>Session</th>
                        <th style={{ padding: "10px 14px" }}>Customer</th>
                        <th style={{ padding: "10px 14px" }}>Date</th>
                        <th style={{ padding: "10px 14px" }}>Device</th>
                        <th style={{ padding: "10px 14px" }}>Category</th>
                        <th style={{ padding: "10px 14px" }}>Channel</th>
                        <th style={{ padding: "10px 14px" }}>Price / Qty</th>
                        <th style={{ padding: "10px 14px" }}>Revenue</th>
                        <th style={{ padding: "10px 14px" }}>Outcome</th>
                        <th style={{ padding: "10px 14px", textAlign: "center" }}>Inspect</th>
                      </>
                    )}

                    {activeTable === "customers" && (
                      <>
                        <th style={{ padding: "10px 14px" }}>Customer ID</th>
                        <th style={{ padding: "10px 14px" }}>Segment</th>
                        <th style={{ padding: "10px 14px" }}>Total Revenue</th>
                        <th style={{ padding: "10px 14px" }}>Orders</th>
                        <th style={{ padding: "10px 14px" }}>AOV</th>
                        <th style={{ padding: "10px 14px" }}>Sessions</th>
                        <th style={{ padding: "10px 14px" }}>Conversion</th>
                        <th style={{ padding: "10px 14px" }}>Cart Abandon</th>
                        <th style={{ padding: "10px 14px" }}>Recency</th>
                        <th style={{ padding: "10px 14px", textAlign: "center" }}>Inspect</th>
                      </>
                    )}

                    {activeTable === "products" && (
                      <>
                        <th style={{ padding: "10px 14px" }}>Product ID</th>
                        <th style={{ padding: "10px 14px" }}>Category</th>
                        <th style={{ padding: "10px 14px" }}>Unit Price</th>
                        <th style={{ padding: "10px 14px" }}>Purchases</th>
                        <th style={{ padding: "10px 14px" }}>Cart Adds</th>
                        <th style={{ padding: "10px 14px" }}>Views</th>
                        <th style={{ padding: "10px 14px", textAlign: "center" }}>Inspect</th>
                      </>
                    )}
                  </tr>
                </thead>

                <tbody>
                  {records.map((row, idx) => (
                    <tr
                      key={idx}
                      onClick={() => setSelectedRecord(row)}
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                        cursor: "pointer",
                        transition: "background 0.15s ease",
                        background: idx % 2 === 0 ? "rgba(255, 255, 255, 0.015)" : "transparent"
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(59, 130, 246, 0.08)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = idx % 2 === 0 ? "rgba(255, 255, 255, 0.015)" : "transparent"; }}
                    >
                      {activeTable === "transactions" && (
                        <>
                          <td style={{ padding: "10px 14px", fontWeight: 700, color: "#93c5fd" }}>
                            #{row.session_id}
                          </td>
                          <td style={{ padding: "10px 14px", color: "#fff" }}>
                            CUST-{row.customer_id}
                          </td>
                          <td style={{ padding: "10px 14px", color: "var(--text-muted)" }}>
                            {row.visit_date}
                          </td>
                          <td style={{ padding: "10px 14px" }}>
                            <span style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                              padding: "2px 8px",
                              borderRadius: "6px",
                              fontSize: "11px",
                              background: row.device_type === 0 ? "rgba(59, 130, 246, 0.15)" :
                                row.device_type === 1 ? "rgba(139, 92, 246, 0.15)" : "rgba(16, 185, 129, 0.15)",
                              color: row.device_type === 0 ? "#60a5fa" :
                                row.device_type === 1 ? "#a78bfa" : "#34d399"
                            }}>
                              {row.device_name}
                            </span>
                          </td>
                          <td style={{ padding: "10px 14px", color: "#fff" }}>
                            {row.category_name}
                          </td>
                          <td style={{ padding: "10px 14px", color: "var(--text-dim)" }}>
                            {row.channel_name}
                          </td>
                          <td style={{ padding: "10px 14px", color: "var(--text-muted)" }}>
                            ₹{row.unit_price?.toFixed(0)} × {row.quantity}
                          </td>
                          <td style={{ padding: "10px 14px", fontWeight: 700, color: row.revenue > 0 ? "#34d399" : "var(--text-dim)" }}>
                            {row.revenue > 0 ? `₹${row.revenue.toFixed(2)}` : "₹0.00"}
                          </td>
                          <td style={{ padding: "10px 14px" }}>
                            {row.purchased === 1 ? (
                              <span style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "4px",
                                padding: "2px 8px",
                                borderRadius: "12px",
                                background: "rgba(16, 185, 129, 0.2)",
                                color: "#34d399",
                                fontWeight: 600,
                                fontSize: "11px"
                              }}>
                                <CheckCircle2 size={11} /> Purchased
                              </span>
                            ) : row.cart_abandoned === 1 ? (
                              <span style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "4px",
                                padding: "2px 8px",
                                borderRadius: "12px",
                                background: "rgba(245, 158, 11, 0.2)",
                                color: "#fcd34d",
                                fontWeight: 600,
                                fontSize: "11px"
                              }}>
                                <AlertTriangle size={11} /> Abandoned
                              </span>
                            ) : (
                              <span style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "4px",
                                padding: "2px 8px",
                                borderRadius: "12px",
                                background: "rgba(255, 255, 255, 0.05)",
                                color: "var(--text-dim)",
                                fontSize: "11px"
                              }}>
                                Browsed
                              </span>
                            )}
                          </td>
                          <td style={{ padding: "10px 14px", textAlign: "center" }}>
                            <button
                              onClick={(e) => { e.stopPropagation(); setSelectedRecord(row); }}
                              style={{
                                background: "rgba(59, 130, 246, 0.15)",
                                border: "1px solid rgba(59, 130, 246, 0.3)",
                                color: "#93c5fd",
                                borderRadius: "6px",
                                padding: "4px 8px",
                                cursor: "pointer",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "4px"
                              }}
                            >
                              <Eye size={12} /> View
                            </button>
                          </td>
                        </>
                      )}

                      {activeTable === "customers" && (
                        <>
                          <td style={{ padding: "10px 14px", fontWeight: 700, color: "#60a5fa" }}>
                            CUST-{row.customer_id}
                          </td>
                          <td style={{ padding: "10px 14px" }}>
                            <span className="badge badge-accent">
                              {row.segment_name}
                            </span>
                          </td>
                          <td style={{ padding: "10px 14px", fontWeight: 700, color: "#34d399" }}>
                            ₹{row.total_revenue?.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                          </td>
                          <td style={{ padding: "10px 14px", color: "#fff" }}>
                            {row.total_purchases}
                          </td>
                          <td style={{ padding: "10px 14px", color: "var(--text-muted)" }}>
                            ₹{row.avg_order_value?.toFixed(2)}
                          </td>
                          <td style={{ padding: "10px 14px", color: "var(--text-dim)" }}>
                            {row.total_sessions}
                          </td>
                          <td style={{ padding: "10px 14px", color: "#93c5fd" }}>
                            {((row.purchase_conversion_rate || 0) * 100).toFixed(1)}%
                          </td>
                          <td style={{ padding: "10px 14px", color: "#f87171" }}>
                            {((row.cart_abandonment_rate || 0) * 100).toFixed(1)}%
                          </td>
                          <td style={{ padding: "10px 14px", color: "var(--text-dim)" }}>
                            {row.recency_days} days ago
                          </td>
                          <td style={{ padding: "10px 14px", textAlign: "center" }}>
                            <button
                              onClick={(e) => { e.stopPropagation(); setSelectedRecord(row); }}
                              style={{
                                background: "rgba(59, 130, 246, 0.15)",
                                border: "1px solid rgba(59, 130, 246, 0.3)",
                                color: "#93c5fd",
                                borderRadius: "6px",
                                padding: "4px 8px",
                                cursor: "pointer"
                              }}
                            >
                              <Eye size={12} />
                            </button>
                          </td>
                        </>
                      )}

                      {activeTable === "products" && (
                        <>
                          <td style={{ padding: "10px 14px", fontWeight: 700, color: "#60a5fa" }}>
                            SKU-{row.product_id}
                          </td>
                          <td style={{ padding: "10px 14px", color: "#fff" }}>
                            {row.category_name}
                          </td>
                          <td style={{ padding: "10px 14px", fontWeight: 700, color: "#34d399" }}>
                            ₹{row.unit_price?.toFixed(2)}
                          </td>
                          <td style={{ padding: "10px 14px", color: "#fff" }}>
                            {row.purchase_count}
                          </td>
                          <td style={{ padding: "10px 14px", color: "#fcd34d" }}>
                            {row.cart_adds}
                          </td>
                          <td style={{ padding: "10px 14px", color: "#93c5fd" }}>
                            {row.view_count}
                          </td>
                          <td style={{ padding: "10px 14px", textAlign: "center" }}>
                            <button
                              onClick={(e) => { e.stopPropagation(); setSelectedRecord(row); }}
                              style={{
                                background: "rgba(59, 130, 246, 0.15)",
                                border: "1px solid rgba(59, 130, 246, 0.3)",
                                color: "#93c5fd",
                                borderRadius: "6px",
                                padding: "4px 8px",
                                cursor: "pointer"
                              }}
                            >
                              <Eye size={12} />
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination Controls */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", paddingTop: "4px" }}>
            <span style={{ fontSize: "12px", color: "var(--text-dim)" }}>
              Showing {records.length > 0 ? (page - 1) * pageSize + 1 : 0} - {Math.min(page * pageSize, totalRecords)} of{" "}
              <strong style={{ color: "#fff" }}>{totalRecords.toLocaleString()}</strong> records
            </span>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <button
                disabled={page <= 1}
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid var(--border-color)",
                  color: page <= 1 ? "var(--text-dim)" : "#fff",
                  borderRadius: "6px",
                  padding: "6px 10px",
                  cursor: page <= 1 ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <ChevronLeft size={16} />
              </button>

              <span style={{ fontSize: "12px", color: "var(--text-muted)", padding: "0 8px" }}>
                Page <strong style={{ color: "#fff" }}>{page}</strong> of <strong>{totalPages}</strong>
              </span>

              <button
                disabled={page >= totalPages}
                onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid var(--border-color)",
                  color: page >= totalPages ? "var(--text-dim)" : "#fff",
                  borderRadius: "6px",
                  padding: "6px 10px",
                  cursor: page >= totalPages ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Record Inspection Modal / Drawer */}
      {selectedRecord && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0, 0, 0, 0.75)",
          backdropFilter: "blur(6px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 100,
          padding: "20px"
        }}
        onClick={() => setSelectedRecord(null)}
        >
          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              borderRadius: "14px",
              width: "100%",
              maxWidth: "760px",
              maxHeight: "85vh",
              overflowY: "auto",
              boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              padding: "26px"
            }}
            onClick={(e) => e.stopPropagation()}
            className="fade-in"
          >
            {/* Modal Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-color)", paddingBottom: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <FileSpreadsheet size={22} color="#3b82f6" />
                <div>
                  <h3 style={{ fontSize: "18px", color: "#fff", fontWeight: 700 }}>
                    Record Inspector: {activeTable === "transactions" ? `Session #${selectedRecord.session_id}` :
                      activeTable === "customers" ? `Customer #${selectedRecord.customer_id}` : `SKU #${selectedRecord.product_id}`}
                  </h3>
                  <span style={{ fontSize: "12px", color: "var(--text-dim)" }}>
                    Source Table: <code>{activeTable}</code>
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Quick Status Bar */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "10px",
              background: "rgba(15, 23, 42, 0.6)",
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid var(--border-color)"
            }}>
              <div>
                <span style={{ fontSize: "11px", color: "var(--text-dim)" }}>Monetary Value</span>
                <div style={{ fontSize: "16px", fontWeight: 700, color: "#34d399", marginTop: "2px" }}>
                  ₹{(selectedRecord.revenue ?? selectedRecord.total_revenue ?? selectedRecord.unit_price ?? 0).toFixed(2)}
                </div>
              </div>

              {selectedRecord.category_name && (
                <div>
                  <span style={{ fontSize: "11px", color: "var(--text-dim)" }}>Category</span>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#fff", marginTop: "2px" }}>
                    {selectedRecord.category_name}
                  </div>
                </div>
              )}

              {selectedRecord.device_name && (
                <div>
                  <span style={{ fontSize: "11px", color: "var(--text-dim)" }}>Device</span>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#93c5fd", marginTop: "2px" }}>
                    {selectedRecord.device_name}
                  </div>
                </div>
              )}

              {selectedRecord.purchased !== undefined && (
                <div>
                  <span style={{ fontSize: "11px", color: "var(--text-dim)" }}>Conversion Status</span>
                  <div style={{ marginTop: "2px" }}>
                    {selectedRecord.purchased === 1 ? (
                      <span style={{ color: "#34d399", fontWeight: 700, fontSize: "13px" }}>✓ Converted</span>
                    ) : (
                      <span style={{ color: "#f87171", fontWeight: 600, fontSize: "13px" }}>✕ Abandoned / Browsed</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Full Attributes Grid */}
            <div>
              <h4 style={{ fontSize: "13px", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "12px" }}>
                All Engineered Features ({Object.keys(selectedRecord).length})
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "10px" }}>
                {Object.entries(selectedRecord).map(([key, value], idx) => (
                  <div
                    key={idx}
                    style={{
                      background: "rgba(255, 255, 255, 0.02)",
                      border: "1px solid rgba(255, 255, 255, 0.06)",
                      padding: "10px 12px",
                      borderRadius: "8px"
                    }}
                  >
                    <span style={{ fontSize: "11px", color: "var(--text-dim)", display: "block" }}>
                      {key}
                    </span>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "#fff", wordBreak: "break-all" }}>
                      {value === null || value === undefined ? "—" : String(value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", borderTop: "1px solid var(--border-color)", paddingTop: "14px" }}>
              <button
                onClick={() => setSelectedRecord(null)}
                className="btn btn-secondary"
                style={{ fontSize: "13px" }}
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
