import React, { useState } from "react";
import axios from "axios";
import {
  Search,
  Download,
  AlertCircle,
  Loader2,
  Trophy,
  Award,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Certificate {
  email: string;
  name: string;
  eventName: string;
  fileId: string;
}

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

export default function App() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [previewLoaded, setPreviewLoaded] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setCertificate(null);
    setPreviewLoaded(false);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/certificates/find`,
        { email }
      );
      setCertificate(response.data);
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
        "Certificate not found. Please check your email."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!certificate) return;
    window.open(
      `${API_BASE_URL}/certificates/download/${certificate.fileId}`,
      "_blank"
    );
  };

  return (
    <div className="app-root">
      {/* Search Loading Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="full-screen-loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="status"
            aria-live="polite"
          >
            <Loader2 size={60} className="animate-spin" color="var(--primary)" />
            <h3 className="loader-text">Searching Certificates...</h3>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <nav className="app-nav">
        <div className="nav-content">
          <div className="brand">
            <Award size={28} color="var(--primary)" />
            <h2>NULL TO ONE</h2>
          </div>
          <div className="status-badge">● CERTIFICATE PORTAL</div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="hero-subtitle">WE4X ECOSYSTEM PRESENTS</div>
            <h1 className="hero-title">NULL TO ONE</h1>
            <h3 className="hero-tagline">From Idea → Prototype → Innovation</h3>
            <p className="hero-description">
              Welcome to the official Null to One Hackathon Certificate Portal.
              Enter your registered email to retrieve and download your
              participation certificate.
            </p>
          </motion.div>
        </section>

        {/* Search Panel */}
        <section className="search-container">
          <motion.div
            className="search-panel"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2>Find Your Certificate</h2>
            <form onSubmit={handleSearch}>
              <div className="search-row">
                <input
                  type="email"
                  required
                  placeholder="Enter Registered Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="search-input"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className="search-button"
                  aria-label="Search"
                  disabled={loading}
                >
                  <Search size={20} />
                </button>
              </div>
            </form>

            {error && (
              <div className="error-message" role="alert">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}
          </motion.div>
        </section>

        {/* Results Section */}
        <AnimatePresence>
          {certificate && (
            <motion.section
              className="results-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <div className="results-grid">
                {/* Info Card */}
                <div className="info-card">
                  <div className="info-header">
                    <Trophy size={60} color="var(--accent)" />
                    <div className="info-title">
                      <h2>{certificate.name}</h2>
                      <p>Null to One Hackathon 2026</p>
                    </div>
                  </div>

                  <div className="info-details">
                    <p><strong>Certificate ID:</strong> {certificate.fileId.substring(0, 12)}...</p>
                    <p><strong>Status:</strong> Verified</p>
                    <p><strong>Organizer:</strong> We4X Ecosystem</p>
                  </div>

                  <button onClick={handleDownload} className="download-button">
                    <Download size={18} />
                    Download Certificate
                  </button>
                </div>

                {/* Preview Card */}
                <div className="preview-card">
                  <div className="preview-header">Certificate Preview</div>
                  <div className="preview-content">
                    {!previewLoaded && (
                      <div className="preview-loading">
                        <Loader2 size={40} className="animate-spin" color="var(--primary)" />
                      </div>
                    )}
                    <iframe
                      src={`${API_BASE_URL}/certificates/preview/${certificate.fileId}#toolbar=0`}
                      title="Certificate Preview"
                      className="preview-iframe"
                      onLoad={() => setPreviewLoaded(true)}
                    />
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <footer className="app-footer">
        <p>© 2026 We4X Ecosystem. All rights reserved.</p>
      </footer>
    </div>
  );
}
