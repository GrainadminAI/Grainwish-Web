import React from "react";
import "./FarmBackground.css";

export default function FarmBackground({
  children,
  title,
  subtitle,
  label = "🇮🇳 MADE IN INDIA · PRECISION AGRICULTURE",
  buttonText = "Explore AI Features →",
  buttonHref = "#features"
}) {
  return (
    <section className="farm-hero">
      <video
        className="farm-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/assets/grainwish-background.png"
      >
        <source
          src="/assets/grainwish-farm.mp4"
          type="video/mp4"
        />
        <source
          src="/assets/Sustainable_farm_sunset.mp4"
          type="video/mp4"
        />
        <source
          src="/assets/flow_farm_background.mp4"
          type="video/mp4"
        />
      </video>

      <div className="farm-overlay" />

      {children ? (
        children
      ) : (
        <div className="farm-content">
          <span className="farm-label">
            {label}
          </span>

          <h1>
            {title ? (
              title
            ) : (
              <>
                Smarter Farming.
                <br />
                <span>Stronger Harvests.</span>
              </>
            )}
          </h1>

          <p>
            {subtitle ||
              "AI crop diagnostics, real-time mandi updates, NPK intelligence and 24/7 guidance from Ananya AI."}
          </p>

          <a className="farm-button" href={buttonHref}>
            {buttonText}
          </a>
        </div>
      )}

      <div className="farm-glow" aria-hidden="true" />
    </section>
  );
}
