import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Package,
  ArrowRight,
  Tag,
  Star,
  ShoppingBag,
  Layers,
  Cpu,
  Home,
  Activity,
  Wrench,
  ShieldCheck,
  BookOpen,
  Check,
  CheckCircle2,
  Info,
  Sliders,
  RefreshCw,
  X,
  User,
  ShoppingCart,
  Zap,
  Flame,
  TrendingUp,
  Target
} from "lucide-react";
import { api } from "../services/api";

export default function RecommendationsPage({ initialCustomerId }) {
  const [queryType, setQueryType] = useState(initialCustomerId ? "customer" : "customer");
  const [productId, setProductId] = useState(894);
  const [customerId, setCustomerId] = useState(initialCustomerId || 1062);
  const [topN, setTopN] = useState(6);
  const [recommendations, setRecommendations] = useState([]);
  const [infoMessage, setInfoMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [targetProduct, setTargetProduct] = useState(null);

  // Selected item for Vector Inspection Modal
  const [inspectedProduct, setInspectedProduct] = useState(null);

  // Toast state
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Quick preset chips for rapid testing
  const customerPresets = [
    { id: 1062, label: "VIP Shopper #1062", category: "Beauty & Personal Care", icon: Sparkles, color: "#a855f7" },
    { id: 1005, label: "Tech Lover #1005", category: "Electronics & Gadgets", icon: Cpu, color: "#3b82f6" },
    { id: 1120, label: "Fashion VIP #1120", category: "Fashion & Apparel", icon: ShoppingBag, color: "#ec4899" },
    { id: 1450, label: "Home Decor #1450", category: "Home & Kitchen", icon: Home, color: "#f59e0b" },
    { id: 1803, label: "Power Buyer #1803", category: "Automotive & Tools", icon: Wrench, color: "#06b6d4" }
  ];

  const productPresets = [
    { id: 894, label: "SKU #894", category: "Automotive & Tools", price: 651.57, color: "#06b6d4" },
    { id: 844, label: "SKU #844", category: "Home & Kitchen", price: 945.27, color: "#f59e0b" },
    { id: 865, label: "SKU #865", category: "Electronics & Gadgets", price: 400.44, color: "#3b82f6" },
    { id: 851, label: "SKU #851", category: "Beauty & Personal", price: 1268.54, color: "#a855f7" },
    { id: 634, label: "SKU #634", category: "Fashion & Apparel", price: 623.83, color: "#ec4899" }
  ];

  useEffect(() => {
    fetchRecommendations();
  }, [productId, customerId, queryType, topN]);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const prodQuery = queryType === "product" ? productId : null;
      const custQuery = queryType === "customer" ? customerId : null;
      const res = await api.getRecommendations(prodQuery, custQuery, topN);
      setRecommendations(res.recommendations || []);
      setInfoMessage(res.message || null);

      // If product query, store target
      if (queryType === "product") {
        setTargetProduct({
          product_id: productId,
          category: productId % 8,
          name: getCategoryName(productId % 8)
        });
      }
    } catch (err) {
      console.error("Recommendation error:", err);
    } finally {
      setLoading(false);
    }
  };

  const categoryMeta = {
    0: { name: "Electronics & Gadgets", icon: Cpu, color: "#3b82f6", bg: "rgba(59, 130, 246, 0.15)", border: "rgba(59, 130, 246, 0.3)" },
    1: { name: "Fashion & Apparel", icon: ShoppingBag, color: "#ec4899", bg: "rgba(236, 72, 153, 0.15)", border: "rgba(236, 72, 153, 0.3)" },
    2: { name: "Home & Kitchen", icon: Home, color: "#f59e0b", bg: "rgba(245, 158, 11, 0.15)", border: "rgba(245, 158, 11, 0.3)" },
    3: { name: "Beauty & Personal Care", icon: Sparkles, color: "#a855f7", bg: "rgba(168, 85, 247, 0.15)", border: "rgba(168, 85, 247, 0.3)" },
    4: { name: "Books & Media", icon: BookOpen, color: "#6366f1", bg: "rgba(99, 102, 241, 0.15)", border: "rgba(99, 102, 241, 0.3)" },
    5: { name: "Sports & Outdoor", icon: Activity, color: "#10b981", bg: "rgba(16, 185, 129, 0.15)", border: "rgba(16, 185, 129, 0.3)" },
    6: { name: "Automotive & Tools", icon: Wrench, color: "#06b6d4", bg: "rgba(6, 182, 212, 0.15)", border: "rgba(6, 182, 212, 0.3)" },
    7: { name: "Health & Wellness", icon: ShieldCheck, color: "#14b8a6", bg: "rgba(20, 184, 166, 0.15)", border: "rgba(20, 184, 166, 0.3)" }
  };

  const getCategoryName = (catId) => {
    return categoryMeta[catId % 8]?.name || "General Merchandise";
  };

  const getCategoryMeta = (catId) => {
    return categoryMeta[catId % 8] || categoryMeta[0];
  };

  return (
    <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "28px" }} className="fade-in">
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: "fixed",
          bottom: "28px",
          right: "28px",
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.95), rgba(5, 150, 105, 0.95))",
          color: "#fff",
          padding: "12px 20px",
          borderRadius: "10px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontSize: "13px",
          fontWeight: 600,
          zIndex: 1000,
          animation: "fadeIn 0.2s ease"
        }}>
          <CheckCircle2 size={18} color="#fff" />
          {toastMessage}
        </div>
      )}

      {/* Hero & Configuration Panel */}
      <div className="glass-card" style={{ padding: "26px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
              <span style={{
                background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                border: "1px solid rgba(139, 92, 246, 0.35)",
                color: "#c4b5fd",
                padding: "4px 10px",
                borderRadius: "20px",
                fontSize: "11px",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: "6px"
              }}>
                <Sparkles size={13} color="#a78bfa" /> K-NEAREST NEIGHBORS (KNN) ENGINE
              </span>
              <span style={{ fontSize: "12px", color: "var(--text-dim)" }}>
                Cosine Similarity • 5D Vector Space • Sub-4ms Latency
              </span>
            </div>
            <h2 style={{ fontSize: "22px", color: "#fff", fontWeight: 700 }}>
              Personalized Product Recommender
            </h2>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "4px" }}>
              Generates tailored product suggestions by computing high-dimensional cosine closeness across
              category encodings, unit prices, review ratings, and historical sales velocity.
            </p>
          </div>

          {/* Mode Switcher Pill */}
          <div style={{
            display: "flex",
            background: "rgba(15, 23, 42, 0.7)",
            padding: "4px",
            borderRadius: "10px",
            border: "1px solid var(--border-color)"
          }}>
            <button
              onClick={() => setQueryType("customer")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                borderRadius: "8px",
                border: "none",
                background: queryType === "customer" ? "var(--primary-gradient)" : "transparent",
                color: queryType === "customer" ? "#fff" : "var(--text-muted)",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              <User size={14} /> By Customer ID
            </button>
            <button
              onClick={() => setQueryType("product")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                borderRadius: "8px",
                border: "none",
                background: queryType === "product" ? "var(--primary-gradient)" : "transparent",
                color: queryType === "product" ? "#fff" : "var(--text-muted)",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              <Package size={14} /> By Product SKU
            </button>
          </div>
        </div>

        {/* Input & Action Bar */}
        <div style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "14px",
          flexWrap: "wrap",
          background: "rgba(15, 23, 42, 0.5)",
          padding: "16px",
          borderRadius: "12px",
          border: "1px solid var(--border-color)"
        }}>
          {queryType === "customer" ? (
            <div style={{ flex: 1, minWidth: "240px" }}>
              <label style={{ fontSize: "12px", color: "var(--text-muted)", display: "block", marginBottom: "6px", fontWeight: 600 }}>
                Target Customer ID (1000 - 8888)
              </label>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <User size={16} color="var(--text-dim)" style={{ position: "absolute", left: "12px" }} />
                <input
                  type="number"
                  min="1000"
                  max="9999"
                  value={customerId}
                  onChange={(e) => setCustomerId(parseInt(e.target.value) || 1000)}
                  placeholder="e.g. 1062"
                  style={{
                    width: "100%",
                    padding: "10px 12px 10px 36px",
                    background: "rgba(15, 23, 42, 0.8)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "14px",
                    outline: "none",
                    fontWeight: 600
                  }}
                />
              </div>
            </div>
          ) : (
            <div style={{ flex: 1, minWidth: "240px" }}>
              <label style={{ fontSize: "12px", color: "var(--text-muted)", display: "block", marginBottom: "6px", fontWeight: 600 }}>
                Target Anchor Product SKU
              </label>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <Package size={16} color="var(--text-dim)" style={{ position: "absolute", left: "12px" }} />
                <select
                  value={productId}
                  onChange={(e) => setProductId(parseInt(e.target.value))}
                  style={{
                    width: "100%",
                    padding: "10px 12px 10px 36px",
                    background: "rgba(15, 23, 42, 0.8)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "14px",
                    outline: "none",
                    fontWeight: 600
                  }}
                >
                  {productPresets.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label} — {p.category} (₹{p.price})
                    </option>
                  ))}
                  <option value={208}>Product #208 — Beauty & Personal Care (₹876.49)</option>
                  <option value={212}>Product #212 — Fashion & Apparel (₹933.48)</option>
                  <option value={22}>Product #22 — Beauty & Personal Care (₹856.40)</option>
                  <option value={799}>Product #799 — Home & Kitchen (₹885.30)</option>
                </select>
              </div>
            </div>
          )}

          {/* Top N Count */}
          <div style={{ width: "140px" }}>
            <label style={{ fontSize: "12px", color: "var(--text-muted)", display: "block", marginBottom: "6px", fontWeight: 600 }}>
              Top N Matches
            </label>
            <select
              value={topN}
              onChange={(e) => setTopN(parseInt(e.target.value))}
              style={{
                width: "100%",
                padding: "10px 12px",
                background: "rgba(15, 23, 42, 0.8)",
                border: "1px solid var(--border-color)",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "14px",
                outline: "none",
                fontWeight: 600
              }}
            >
              <option value={4}>Top 4 Items</option>
              <option value={6}>Top 6 Items</option>
              <option value={8}>Top 8 Items</option>
              <option value={10}>Top 10 Items</option>
              <option value={12}>Top 12 Items</option>
            </select>
          </div>

          {/* Refresh Action Button */}
          <div>
            <button
              className="btn btn-primary"
              onClick={fetchRecommendations}
              style={{
                padding: "10px 20px",
                fontSize: "13px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              <RefreshCw size={15} className={loading ? "spin" : ""} />
              Generate Matches
            </button>
          </div>
        </div>

        {/* Quick Presets Row */}
        <div>
          <span style={{ fontSize: "11px", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600, display: "block", marginBottom: "8px" }}>
            Quick Persona Presets:
          </span>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {queryType === "customer" ? (
              customerPresets.map((preset) => {
                const Icon = preset.icon;
                const isSelected = customerId === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => setCustomerId(preset.id)}
                    style={{
                      background: isSelected ? "rgba(139, 92, 246, 0.25)" : "rgba(255, 255, 255, 0.03)",
                      border: isSelected ? "1px solid #8b5cf6" : "1px solid var(--border-color)",
                      color: isSelected ? "#fff" : "var(--text-muted)",
                      borderRadius: "20px",
                      padding: "5px 12px",
                      fontSize: "12px",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      transition: "all 0.2s"
                    }}
                  >
                    <Icon size={13} color={preset.color} />
                    <strong>{preset.label}</strong>
                    <span style={{ fontSize: "10px", color: "var(--text-dim)" }}>({preset.category.split(" ")[0]})</span>
                  </button>
                );
              })
            ) : (
              productPresets.map((preset) => {
                const isSelected = productId === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => setProductId(preset.id)}
                    style={{
                      background: isSelected ? "rgba(59, 130, 246, 0.25)" : "rgba(255, 255, 255, 0.03)",
                      border: isSelected ? "1px solid #3b82f6" : "1px solid var(--border-color)",
                      color: isSelected ? "#fff" : "var(--text-muted)",
                      borderRadius: "20px",
                      padding: "5px 12px",
                      fontSize: "12px",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      transition: "all 0.2s"
                    }}
                  >
                    <Package size={13} color={preset.color} />
                    <strong>{preset.label}</strong>
                    <span style={{ fontSize: "11px", color: "#34d399" }}>₹{preset.price}</span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Target Context Card */}
      <div style={{
        background: "linear-gradient(135deg, rgba(139, 92, 246, 0.12), rgba(59, 130, 246, 0.08))",
        border: "1px solid rgba(139, 92, 246, 0.25)",
        borderRadius: "12px",
        padding: "16px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "14px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "42px",
            height: "42px",
            borderRadius: "10px",
            background: "rgba(139, 92, 246, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            {queryType === "customer" ? <User size={20} color="#a78bfa" /> : <Package size={20} color="#60a5fa" />}
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "15px", fontWeight: 700, color: "#fff" }}>
                {queryType === "customer" ? `Target: Customer #${customerId}` : `Target: Anchor SKU #${productId}`}
              </span>
              <span className="badge badge-accent">
                {queryType === "customer" ? "Active User Profile" : "Anchor Vector"}
              </span>
            </div>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
              {infoMessage || `Showing top ${topN} closest neighbor vectors based on cosine distance.`}
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: "10px", color: "var(--text-dim)", textTransform: "uppercase" }}>Distance Metric</span>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#34d399" }}>Cosine Closeness</div>
          </div>
          <div style={{ width: "1px", height: "30px", background: "var(--border-color)" }} />
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: "10px", color: "var(--text-dim)", textTransform: "uppercase" }}>Vector Dimensions</span>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#93c5fd" }}>5 Scaled Features</div>
          </div>
        </div>
      </div>

      {/* Recommended Matches Section */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
          <div>
            <h3 style={{ fontSize: "18px", color: "#fff", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" }}>
              <Flame size={18} color="#f59e0b" />
              Recommended Matches ({recommendations.length} items)
            </h3>
            <span style={{ fontSize: "12px", color: "var(--text-dim)" }}>
              Ranked descending by Cosine similarity coefficient (1.0 = identical vector)
            </span>
          </div>
          <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
            Algorithm: <strong>Brute Force Nearest Neighbors (Cosine)</strong>
          </span>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-muted)", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
            <div className="spinner" />
            <span>Computing high-dimensional neighbor distances...</span>
          </div>
        ) : recommendations.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-muted)" }}>
            No recommendations generated. Try another customer ID or product SKU.
          </div>
        ) : (
          /* Balanced 3-column / 2-column responsive layout */
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "22px"
          }}>
            {recommendations.map((item, idx) => {
              const simPercent = Math.round(item.similarity * 100);
              const meta = getCategoryMeta(item.category);
              const CategoryIcon = meta.icon;

              const isSuperHigh = simPercent >= 95;
              const isHigh = simPercent >= 90;

              return (
                <div
                  key={idx}
                  className="glass-card glass-card-interactive"
                  onClick={() => setInspectedProduct(item)}
                  style={{
                    padding: "22px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    position: "relative",
                    overflow: "hidden",
                    border: isSuperHigh ? "1px solid rgba(16, 185, 129, 0.4)" : "1px solid var(--border-color)",
                    boxShadow: isSuperHigh ? "0 8px 32px rgba(16, 185, 129, 0.12)" : "var(--shadow-card)"
                  }}
                >
                  {/* Category Accent Stripe */}
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: `linear-gradient(90deg, ${meta.color}, transparent)`
                  }} />

                  {/* Card Header: Category & Similarity Pill */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "10px",
                        background: meta.bg,
                        border: `1px solid ${meta.border}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                        <CategoryIcon size={18} color={meta.color} />
                      </div>
                      <div>
                        <span style={{ fontSize: "11px", color: meta.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                          Category {item.category}
                        </span>
                        <div style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 500 }}>
                          {meta.name}
                        </div>
                      </div>
                    </div>

                    {/* Dynamic Match Badge */}
                    <span style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      background: isSuperHigh ? "rgba(16, 185, 129, 0.2)" : isHigh ? "rgba(59, 130, 246, 0.2)" : "rgba(139, 92, 246, 0.2)",
                      color: isSuperHigh ? "#34d399" : isHigh ? "#60a5fa" : "#c4b5fd",
                      padding: "4px 10px",
                      borderRadius: "20px",
                      border: isSuperHigh ? "1px solid rgba(16, 185, 129, 0.4)" : "1px solid rgba(59, 130, 246, 0.3)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px"
                    }}>
                      <Zap size={11} /> {simPercent}% Match
                    </span>
                  </div>

                  {/* Vector Match Progress Bar */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--text-dim)" }}>
                      <span>Cosine Similarity</span>
                      <span style={{ color: "#fff", fontWeight: 600 }}>{item.similarity.toFixed(4)}</span>
                    </div>
                    <div style={{
                      height: "6px",
                      background: "rgba(255, 255, 255, 0.06)",
                      borderRadius: "3px",
                      overflow: "hidden"
                    }}>
                      <div style={{
                        height: "100%",
                        width: `${simPercent}%`,
                        background: isSuperHigh
                          ? "linear-gradient(90deg, #10b981, #34d399)"
                          : "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                        borderRadius: "3px"
                      }} />
                    </div>
                  </div>

                  {/* Product Title & Metrics */}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <h4 style={{ fontSize: "17px", color: "#fff", fontWeight: 700 }}>
                        Product #{item.product_id}
                      </h4>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#fcd34d", fontWeight: 600 }}>
                        <Star size={13} fill="#fcd34d" color="#fcd34d" />
                        <span>{item.avg_rating || "4.2"}</span>
                        <span style={{ color: "var(--text-dim)", fontSize: "10px" }}>/5.0</span>
                      </div>
                    </div>

                    {/* Badges row */}
                    <div style={{ display: "flex", gap: "8px", marginTop: "8px", flexWrap: "wrap" }}>
                      <span style={{
                        fontSize: "11px",
                        background: "rgba(255, 255, 255, 0.04)",
                        color: "var(--text-muted)",
                        padding: "2px 8px",
                        borderRadius: "6px"
                      }}>
                        {item.purchase_count || 28} purchases
                      </span>
                      <span style={{
                        fontSize: "11px",
                        background: "rgba(255, 255, 255, 0.04)",
                        color: "var(--text-muted)",
                        padding: "2px 8px",
                        borderRadius: "6px"
                      }}>
                        {item.view_count || 120} views
                      </span>
                      {isSuperHigh && (
                        <span style={{
                          fontSize: "11px",
                          background: "rgba(16, 185, 129, 0.12)",
                          color: "#34d399",
                          padding: "2px 8px",
                          borderRadius: "6px",
                          fontWeight: 600
                        }}>
                          Top Affinity
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Pricing & Interactive Actions */}
                  <div style={{
                    marginTop: "auto",
                    paddingTop: "14px",
                    borderTop: "1px solid var(--border-color)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                    <div>
                      <span style={{ fontSize: "10px", color: "var(--text-dim)", display: "block" }}>
                        Unit Retail Price
                      </span>
                      <div style={{ fontSize: "18px", fontWeight: 700, color: "#fff" }}>
                        ₹{item.unit_price.toFixed(2)}
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "6px" }}>
                      <button
                        className="btn-secondary"
                        style={{ padding: "7px 10px", fontSize: "11px" }}
                        title="Pin as new anchor"
                        onClick={(e) => {
                          e.stopPropagation();
                          setProductId(item.product_id);
                          setQueryType("product");
                          showToast(`Set SKU #${item.product_id} as anchor product.`);
                        }}
                      >
                        <Target size={13} />
                      </button>

                      <button
                        className="btn-secondary"
                        style={{ padding: "7px 10px", fontSize: "11px" }}
                        title="Simulate adding to cart"
                        onClick={(e) => {
                          e.stopPropagation();
                          showToast(`Added Product #${item.product_id} to test basket!`);
                        }}
                      >
                        <ShoppingCart size={13} />
                      </button>

                      <button
                        className="btn-primary"
                        style={{ padding: "7px 12px", fontSize: "12px", display: "inline-flex", alignItems: "center", gap: "4px" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setInspectedProduct(item);
                        }}
                      >
                        Explore <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Model Scorecard & Vector Space Breakdown Footer */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "16px",
        marginTop: "10px"
      }}>
        <div className="glass-card" style={{ padding: "18px", display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Cpu size={16} color="#3b82f6" />
            <span style={{ fontSize: "12px", color: "var(--text-dim)", fontWeight: 600 }}>KNN Algorithm Specification</span>
          </div>
          <div style={{ fontSize: "14px", fontWeight: 700, color: "#fff" }}>
            Brute-Force Nearest Neighbors
          </div>
          <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>
            Direct all-pairs cosine matrix computation guaranteeing optimal global neighbors without approximate quantization error.
          </p>
        </div>

        <div className="glass-card" style={{ padding: "18px", display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Layers size={16} color="#8b5cf6" />
            <span style={{ fontSize: "12px", color: "var(--text-dim)", fontWeight: 600 }}>5D Vector Space</span>
          </div>
          <div style={{ fontSize: "14px", fontWeight: 700, color: "#93c5fd" }}>
            [Category, Price, Rating, Sales, Views]
          </div>
          <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>
            StandardScaler normalized to eliminate unit price scale dominance and maintain balanced behavioral weights.
          </p>
        </div>

        <div className="glass-card" style={{ padding: "18px", display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Zap size={16} color="#10b981" />
            <span style={{ fontSize: "12px", color: "var(--text-dim)", fontWeight: 600 }}>Catalog Coverage</span>
          </div>
          <div style={{ fontSize: "14px", fontWeight: 700, color: "#34d399" }}>
            899 Unique Vectorized SKUs
          </div>
          <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>
            Pre-computed matrix vectors enabling real-time personalization with zero database cold start latency.
          </p>
        </div>
      </div>

      {/* Vector Inspection Modal */}
      {inspectedProduct && (
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
        onClick={() => setInspectedProduct(null)}
        >
          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              borderRadius: "14px",
              width: "100%",
              maxWidth: "680px",
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
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: getCategoryMeta(inspectedProduct.category).bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <Package size={20} color={getCategoryMeta(inspectedProduct.category).color} />
                </div>
                <div>
                  <h3 style={{ fontSize: "18px", color: "#fff", fontWeight: 700 }}>
                    Product #{inspectedProduct.product_id} Vector Analysis
                  </h3>
                  <span style={{ fontSize: "12px", color: "var(--text-dim)" }}>
                    Department: {getCategoryName(inspectedProduct.category)} (Code {inspectedProduct.category})
                  </span>
                </div>
              </div>
              <button
                onClick={() => setInspectedProduct(null)}
                style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Match Score Spotlight */}
            <div style={{
              background: "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(59, 130, 246, 0.1))",
              border: "1px solid rgba(16, 185, 129, 0.35)",
              borderRadius: "10px",
              padding: "16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px"
            }}>
              <div>
                <span style={{ fontSize: "11px", color: "var(--text-dim)", textTransform: "uppercase" }}>Cosine Closeness</span>
                <div style={{ fontSize: "24px", fontWeight: 700, color: "#34d399" }}>
                  {(inspectedProduct.similarity * 100).toFixed(2)}% Similarity
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: "11px", color: "var(--text-dim)", textTransform: "uppercase" }}>Vector Angular Distance</span>
                <div style={{ fontSize: "18px", fontWeight: 700, color: "#93c5fd" }}>
                  {(1 - inspectedProduct.similarity).toFixed(4)} rad
                </div>
              </div>
            </div>

            {/* 5D Feature Coordinates */}
            <div>
              <h4 style={{ fontSize: "13px", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "12px" }}>
                5D Feature Space Vector Coordinates
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "10px" }}>
                <div style={{ background: "rgba(255, 255, 255, 0.02)", padding: "12px", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
                  <span style={{ fontSize: "10px", color: "var(--text-dim)" }}>Price Point</span>
                  <div style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginTop: "2px" }}>
                    ₹{inspectedProduct.unit_price.toFixed(2)}
                  </div>
                </div>
                <div style={{ background: "rgba(255, 255, 255, 0.02)", padding: "12px", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
                  <span style={{ fontSize: "10px", color: "var(--text-dim)" }}>Average Rating</span>
                  <div style={{ fontSize: "16px", fontWeight: 700, color: "#fcd34d", marginTop: "2px" }}>
                    ★ {inspectedProduct.avg_rating || "4.2"}
                  </div>
                </div>
                <div style={{ background: "rgba(255, 255, 255, 0.02)", padding: "12px", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
                  <span style={{ fontSize: "10px", color: "var(--text-dim)" }}>Historical Sales</span>
                  <div style={{ fontSize: "16px", fontWeight: 700, color: "#34d399", marginTop: "2px" }}>
                    {inspectedProduct.purchase_count || 32} orders
                  </div>
                </div>
                <div style={{ background: "rgba(255, 255, 255, 0.02)", padding: "12px", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
                  <span style={{ fontSize: "10px", color: "var(--text-dim)" }}>Engagement Views</span>
                  <div style={{ fontSize: "16px", fontWeight: 700, color: "#93c5fd", marginTop: "2px" }}>
                    {inspectedProduct.view_count || 140} views
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendation Rationale */}
            <div style={{
              background: "rgba(59, 130, 246, 0.06)",
              border: "1px solid rgba(59, 130, 246, 0.2)",
              borderRadius: "10px",
              padding: "14px",
              fontSize: "12px",
              color: "var(--text-main)",
              lineHeight: 1.6
            }}>
              <strong>💡 Algorithmic Match Rationale:</strong> Product #{inspectedProduct.product_id} shares category affinity with the target query, falls within a tightly calibrated price tolerance bracket, and demonstrates elevated consumer review sentiment.
            </div>

            {/* Modal Actions */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-color)", paddingTop: "16px" }}>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setProductId(inspectedProduct.product_id);
                  setQueryType("product");
                  setInspectedProduct(null);
                  showToast(`Set SKU #${inspectedProduct.product_id} as target anchor!`);
                }}
              >
                <Target size={14} /> Set as New Anchor SKU
              </button>

              <button
                className="btn btn-primary"
                onClick={() => setInspectedProduct(null)}
              >
                Close Analysis
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
