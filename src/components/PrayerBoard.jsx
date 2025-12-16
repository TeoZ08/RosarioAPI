/* src/components/PrayerBoard.jsx */
import React, { useState, useEffect, useMemo } from "react";
import InteractiveRosary from "./InteractiveRosary";
import Controls from "./Controls";
import { generateRosarySequence } from "../utils/rosaryEngine";
import "./PrayerBoard.css";

function PrayerBoard({ day, mysteryData, onBack }) {
  // Inicializa estado ou recupera
  const [step, setStep] = useState(() => {
    const saved = localStorage.getItem("rosaryStep");
    const savedDay = localStorage.getItem("rosaryDay");
    // Só recupera se for o mesmo dia, senão reinicia
    return saved && savedDay === day ? Number(saved) : 0;
  });

  const [isExpanded, setIsExpanded] = useState(true);

  const fullSequence = useMemo(() => {
    return generateRosarySequence(mysteryData?.mysteries || []);
  }, [mysteryData]);

  const currentPrayer = fullSequence[step] || fullSequence[0];

  // Persistência
  useEffect(() => {
    localStorage.setItem("rosaryStep", step);
    localStorage.setItem("rosaryDay", day);
  }, [step, day]);

  const handleNext = () => {
    if (step < fullSequence.length - 1) setStep((s) => s + 1);
  };

  const handlePrev = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  // Teclado
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [step, fullSequence]);

  const progress = ((step + 1) / fullSequence.length) * 100;

  return (
    <div className="prayer-board fade-in">
      <header className="board-header">
        <button onClick={onBack} className="btn-back">
          <span className="icon">‹</span> Voltar
        </button>
        <div className="header-titles">
          <span className="mystery-label">Mistérios {day}</span>
          <h2 className="mystery-title">{mysteryData?.mystery}</h2>
        </div>
        <div style={{ width: 80 }}></div>{" "}
        {/* Espaçador para balancear header */}
      </header>

      <InteractiveRosary currentStep={step} sequence={fullSequence} />

      <main className="prayer-card glass-panel">
        <div className="card-header">
          <span className="step-indicator">
            {step + 1} / {fullSequence.length}
          </span>
        </div>

        <h1 className="prayer-title">{currentPrayer?.label}</h1>

        <div
          className={`prayer-text-container ${
            isExpanded ? "expanded" : "collapsed"
          }`}
        >
          <p className="prayer-text">{currentPrayer?.text}</p>
        </div>
      </main>

      {/* Controles fixos na parte inferior para mobile */}
      <footer className="board-footer">
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <Controls onNext={handleNext} onPrev={handlePrev} />
      </footer>
    </div>
  );
}

export default PrayerBoard;
