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
  const [apiOnline, setApiOnline] = useState(true);
  const [recommendCustomerId, setRecommendCustomerId] = useState(null);

  useEffect(() => {
    async function checkBackend() {
      try {
        await api.checkHealth();
        setApiOnline(true);
      } catch {
        setApiOnline(false);
      }
    }
    checkBackend();
    const timer = setInterval(checkBackend, 15000);
    return () => clearInterval(timer);
  }, []);

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
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Header
          title={getPageTitle()}
          apiOnline={apiOnline}
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
