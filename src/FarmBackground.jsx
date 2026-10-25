import React from "react";
import "./FarmBackground.css";

export default function FarmBackground({
  onOpenDownloadModal,
  onScanClick
}) {
  return (
    <section className="farm-hero">
      {/* Animated agricultural background */}
      <video
        className="farm-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/assets/grainwish-background.png"
        aria-hidden="true"
      >
        <source
          src="/assets/Sustainable_farm_sunset.mp4"
          type="video/mp4"
        />
        <source
          src="/assets/flow_farm_background.mp4"
          type="video/mp4"
        />
        <source
          src="/assets/real_crops_field.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark overlay for readable text */}
      <div className="farm-overlay" />

      {/* Animated technology effects */}
      <div className="farm-grid" aria-hidden="true" />
      <div className="farm-particles" aria-hidden="true">
        {Array.from({ length: 18 }, (_, i) => (
          <span
            key={i}
            style={{
              "--i": i,
              "--x": `${(i * 37 + 7) % 100}%`,
              "--y": `${(i * 23 + 11) % 100}%`,
            }}
          />
        ))}
      </div>

      {/* Website content */}
      <div className="farm-content">
        <div className="farm-badge">
          <span>🇮🇳</span>
          MADE IN INDIA
          <span className="farm-separator">·</span>
          PRECISION AGRICULTURE
        </div>

        <h1>
          Smarter Farming.
          <br />
          <span>Stronger Harvests.</span>
        </h1>

        <p className="farm-description">
          AI crop diagnostics, real-time mandi updates,
          NPK calculator and 24/7 guidance from Ananya AI.
          Built for every farmer, for a productive and
          sustainable India.
        </p>

        <div className="farm-actions">
          <a
            href="#download"
            className="farm-button"
            onClick={(e) => {
              if (onOpenDownloadModal) {
                e.preventDefault();
                onOpenDownloadModal();
              }
            }}
          >
            <span>▯</span>
            Download the App <span>→</span>
          </a>

          <a
            href="#features"
            className="farm-button-secondary"
            onClick={(e) => {
              if (onScanClick) {
                e.preventDefault();
                onScanClick();
              }
            }}
          >
            <span className="play-icon">▶</span>
            Explore AI Features
          </a>
        </div>

        <div className="farm-stats">
          <div>
            <strong>22</strong>
            <span>Indian Languages</span>
          </div>
          <div>
            <strong>AI Powered</strong>
            <span>Crop Analysis</span>
          </div>
          <div>
            <strong>24/7</strong>
            <span>Ananya AI Support</span>
          </div>
        </div>
      </div>

      {/* Decorative scan interface */}
      <div className="farm-tech-card" aria-hidden="true">
        <div className="tech-header">
          <span className="live-dot" />
          LIVE AI DIAGNOSTICS
          <span className="tech-status">REAL-TIME ANALYSIS</span>
        </div>

        <div className="scan-window">
          <div className="scan-ring ring-one" />
          <div className="scan-ring ring-two" />
          <div className="scan-target">✳</div>
          <span className="scan-label">CROP SCAN ACTIVE</span>
          <span className="scan-point point-one">✦</span>
          <span className="scan-point point-two">💧</span>
          <span className="scan-point point-three">NPK</span>
        </div>

        <div className="tech-footer">
          <span>◉ Camera AI</span>
          <span>✧ Ananya AI</span>
        </div>
      </div>
    </section>
  );
}
