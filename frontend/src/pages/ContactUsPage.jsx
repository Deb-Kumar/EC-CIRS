import React, { useState } from "react";
import {
  Mail,
  Send,
  MessageSquare,
  CheckCircle2,
  ExternalLink,
  ArrowLeft,
  Sparkles,
  MapPin,
  Clock,
  HelpCircle,
  FileCode2
} from "lucide-react";

export default function ContactUsPage({ setActiveTab }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Research Collaboration",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "Research Collaboration", message: "" });
    }, 600);
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
          color: "#34d399",
          background: "rgba(16, 185, 129, 0.12)",
          padding: "6px 14px",
          borderRadius: "9999px",
          border: "1px solid rgba(16, 185, 129, 0.3)",
          fontWeight: 600
        }}>
          Direct Inquiries Welcome
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
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none"
        }} />

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{
            width: "52px",
            height: "52px",
            borderRadius: "14px",
            background: "rgba(59, 130, 246, 0.15)",
            border: "1px solid rgba(59, 130, 246, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#60a5fa"
          }}>
            <MessageSquare size={28} />
          </div>
          <div>
            <h2 style={{ fontSize: "26px", color: "#fff", fontWeight: 700 }}>
              Contact Us & Research Collaboration
            </h2>
            <p style={{ fontSize: "13.5px", color: "var(--text-muted)", marginTop: "2px" }}>
              Connect with the lead developer, explore code specifications, or discuss machine learning architecture.
            </p>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.8fr", gap: "28px" }}>
        {/* Left Column: Developer & Social Channels */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* Profile Card */}
          <div className="glass-card" style={{ padding: "26px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#60a5fa", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Lead Developer & Maintainer
              </span>
              <h3 style={{ fontSize: "20px", color: "#fff", fontWeight: 700, marginTop: "4px" }}>
                Debkumar Payra
              </h3>
              <p style={{ fontSize: "12.5px", color: "var(--text-muted)", marginTop: "4px", lineHeight: "1.5" }}>
                MCA Final Year Project (2024–2026) • Department of Computer Applications. Focus in predictive machine learning, mathematical model serving, and high-performance analytical dashboards.
              </p>
            </div>

            <div style={{ height: "1px", background: "var(--border-color)" }} />

            {/* Social Channels List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <span style={{ fontSize: "12px", color: "#fff", fontWeight: 600 }}>Official Channels & Profiles:</span>

              {/* GitHub */}
              <a
                href="https://github.com/Deb-Kumar"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid var(--border-color)",
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: "13px",
                  transition: "all 0.15s ease"
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#94a3b8"; e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-color)"; e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>GitHub: <strong>Deb-Kumar</strong></span>
                </div>
                <ExternalLink size={13} color="var(--text-dim)" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/debkumar-payra"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  background: "rgba(10, 102, 194, 0.08)",
                  border: "1px solid rgba(10, 102, 194, 0.3)",
                  color: "#93c5fd",
                  textDecoration: "none",
                  fontSize: "13px",
                  transition: "all 0.15s ease"
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#0a66c2"; e.currentTarget.style.background = "rgba(10, 102, 194, 0.18)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(10, 102, 194, 0.3)"; e.currentTarget.style.background = "rgba(10, 102, 194, 0.08)"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z"/>
                  </svg>
                  <span>LinkedIn: <strong>debkumar-payra</strong></span>
                </div>
                <ExternalLink size={13} color="var(--text-dim)" />
              </a>

              {/* X / Twitter */}
              <a
                href="https://x.com/payradevkumar"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid var(--border-color)",
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: "13px",
                  transition: "all 0.15s ease"
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#94a3b8"; e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-color)"; e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span>X: <strong>@payradevkumar</strong></span>
                </div>
                <ExternalLink size={13} color="var(--text-dim)" />
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/payradebkumar/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  background: "rgba(24, 119, 242, 0.08)",
                  border: "1px solid rgba(24, 119, 242, 0.3)",
                  color: "#60a5fa",
                  textDecoration: "none",
                  fontSize: "13px",
                  transition: "all 0.15s ease"
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#1877f2"; e.currentTarget.style.background = "rgba(24, 119, 242, 0.18)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(24, 119, 242, 0.3)"; e.currentTarget.style.background = "rgba(24, 119, 242, 0.08)"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook: <strong>payradebkumar</strong></span>
                </div>
                <ExternalLink size={13} color="var(--text-dim)" />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/alexx__285"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  background: "rgba(225, 48, 108, 0.08)",
                  border: "1px solid rgba(225, 48, 108, 0.3)",
                  color: "#f472b6",
                  textDecoration: "none",
                  fontSize: "13px",
                  transition: "all 0.15s ease"
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#e1306c"; e.currentTarget.style.background = "rgba(225, 48, 108, 0.18)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(225, 48, 108, 0.3)"; e.currentTarget.style.background = "rgba(225, 48, 108, 0.08)"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                  <span>Instagram: <strong>@alexx__285</strong></span>
                </div>
                <ExternalLink size={13} color="var(--text-dim)" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Inquiry Form */}
        <div className="glass-card" style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "18px" }}>
          <div>
            <h3 style={{ fontSize: "18px", color: "#fff", fontWeight: 700 }}>
              Send a Direct Message
            </h3>
            <p style={{ fontSize: "12.5px", color: "var(--text-muted)", marginTop: "2px" }}>
              Submit research queries, report dataset discrepancies, or request demonstration walk-throughs.
            </p>
          </div>

          {submitted && (
            <div style={{
              background: "rgba(16, 185, 129, 0.15)",
              border: "1px solid rgba(16, 185, 129, 0.4)",
              borderRadius: "10px",
              padding: "16px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "#34d399"
            }}>
              <CheckCircle2 size={22} style={{ flexShrink: 0 }} />
              <div>
                <strong style={{ display: "block", fontSize: "13.5px" }}>Message Dispatched Successfully!</strong>
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>Thank you for reaching out. We will respond promptly regarding your inquiry.</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", color: "var(--text-muted)", fontWeight: 600, marginBottom: "6px" }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    background: "var(--bg-input)",
                    border: "1px solid var(--border-color)",
                    color: "#fff",
                    fontSize: "13px",
                    outline: "none"
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", color: "var(--text-muted)", fontWeight: 600, marginBottom: "6px" }}>
                  Your Email / Handle *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@organization.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    background: "var(--bg-input)",
                    border: "1px solid var(--border-color)",
                    color: "#fff",
                    fontSize: "13px",
                    outline: "none"
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", color: "var(--text-muted)", fontWeight: 600, marginBottom: "6px" }}>
                Inquiry Topic
              </label>
              <select
                value={formData.subject}
                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  background: "var(--bg-input)",
                  border: "1px solid var(--border-color)",
                  color: "#fff",
                  fontSize: "13px",
                  outline: "none"
                }}
              >
                <option value="Research Collaboration">Academic / Research Collaboration</option>
                <option value="Code Repository Inquiries">Code Architecture & Model Retraining</option>
                <option value="Commercial Evaluation">Commercial Intelligence Evaluation</option>
                <option value="Bug Report">Feedback or Anomaly Report</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", color: "var(--text-muted)", fontWeight: 600, marginBottom: "6px" }}>
                Message Content *
              </label>
              <textarea
                required
                rows={5}
                placeholder="Detail your question, research interest, or dataset observation..."
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: "8px",
                  background: "var(--bg-input)",
                  border: "1px solid var(--border-color)",
                  color: "#fff",
                  fontSize: "13px",
                  outline: "none",
                  resize: "vertical"
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                background: "var(--primary-gradient)",
                border: "none",
                borderRadius: "8px",
                padding: "12px 20px",
                color: "#fff",
                fontSize: "13px",
                fontWeight: 600,
                cursor: isSubmitting ? "wait" : "pointer",
                transition: "all 0.15s ease",
                boxShadow: "0 0 16px rgba(59, 130, 246, 0.3)"
              }}
            >
              <Send size={15} />
              {isSubmitting ? "Transmitting..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
