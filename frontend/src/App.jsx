import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import DashboardOverview from "./pages/DashboardOverview";
import CustomersPage from "./pages/CustomersPage";
import SpendingPredictionPage from "./pages/SpendingPredictionPage";
import PurchasePredictionPage from "./pages/PurchasePredictionPage";
import RecommendationsPage from "./pages/RecommendationsPage";
import SegmentsPage from "./pages/SegmentsPage";
import ModelPerformancePage from "./pages/ModelPerformancePage";
import AnalyticsPage from "./pages/AnalyticsPage";
import DatasetPage from "./pages/DatasetPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactUsPage from "./pages/ContactUsPage";
import CookiesPolicyPage from "./pages/CookiesPolicyPage";
import Footer from "./components/Footer";
import { api } from "./services/api";

export default function App() {
  const [activeTab, setActiveTab] = useState("overview");
  const [apiOnline, setApiOnline] = useState(false);
  const [recommendCustomerId, setRecommendCustomerId] = useState(null);
  const [stats, setStats] = useState({
    totalRecords: null,
    totalCustomers: null,
    totalProducts: null
  });

  useEffect(() => {
    let isMounted = true;
    async function checkBackend() {
      try {
        await api.checkHealth();
        if (isMounted) setApiOnline(true);
      } catch {
        if (isMounted) setApiOnline(false);
      }
    }
    checkBackend();
    // Fast 3-second heartbeat to instantly detect when backend starts or terminates
    const timer = setInterval(checkBackend, 3000);

    // Re-check immediately when user switches focus back to the browser window
    const handleFocus = () => checkBackend();
    window.addEventListener("focus", handleFocus);

    return () => {
      isMounted = false;
      clearInterval(timer);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await api.getDatasetSummary();
        if (res?.overview) {
          setStats({
            totalRecords: res.overview.total_transactions,
            totalCustomers: res.overview.total_customers,
            totalProducts: res.overview.total_products
          });
        }
      } catch (err) {
        console.warn("Could not fetch dataset summary stats:", err);
      }
    }
    fetchStats();
  }, [apiOnline]);

  const handleSelectCustomerForRecommend = (customerId) => {
    setRecommendCustomerId(customerId);
    setActiveTab("recommendations");
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case "overview": return "Executive Intelligence Dashboard";
      case "customers": return "Customer Directory & Profiles";
      case "spending": return "Spending Prediction (Linear Regression)";
      case "purchase": return "Purchase Probability (Logistic Regression)";
      case "recommendations": return "Personalized Product Recommender (KNN)";
      case "segments": return "Customer Segmentation (K-Means)";
      case "models": return "Machine Learning Model Scorecard";
      case "analytics": return "Funnel & Category Analytics";
      case "dataset": return "E-Commerce Dataset Explorer & Data Dictionary";
      case "terms": return "Terms & Conditions of Service";
      case "privacy": return "Platform Privacy Policy & Data Governance";
      case "about": return "About EC-CIRS Intelligence Platform";
      case "contact": return "Contact & Research Collaboration";
      case "cookies": return "Cookies & Local Storage Policy";
      default: return "E-Commerce Intelligence";
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-main)" }}>
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        totalCustomers={stats.totalCustomers}
        totalRecords={stats.totalRecords}
      />

      {/* Main Content Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Header
          title={getPageTitle()}
          apiOnline={apiOnline}
          totalRecords={stats.totalRecords}
        />

        <main style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1 }}>
            {activeTab === "overview" && <DashboardOverview setActiveTab={setActiveTab} />}
            {activeTab === "customers" && <CustomersPage onSelectCustomerForRecommend={handleSelectCustomerForRecommend} />}
            {activeTab === "spending" && <SpendingPredictionPage />}
            {activeTab === "purchase" && <PurchasePredictionPage />}
            {activeTab === "recommendations" && <RecommendationsPage initialCustomerId={recommendCustomerId} />}
            {activeTab === "segments" && <SegmentsPage />}
            {activeTab === "models" && <ModelPerformancePage />}
            {activeTab === "analytics" && <AnalyticsPage />}
            {activeTab === "dataset" && <DatasetPage />}
            {activeTab === "terms" && <TermsPage setActiveTab={setActiveTab} />}
            {activeTab === "privacy" && <PrivacyPolicyPage setActiveTab={setActiveTab} />}
            {activeTab === "about" && <AboutUsPage setActiveTab={setActiveTab} />}
            {activeTab === "contact" && <ContactUsPage setActiveTab={setActiveTab} />}
            {activeTab === "cookies" && <CookiesPolicyPage setActiveTab={setActiveTab} />}
          </div>
          <Footer setActiveTab={setActiveTab} />
        </main>
      </div>
    </div>
  );
}
