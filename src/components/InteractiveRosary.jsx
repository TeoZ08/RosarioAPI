import React, { useState, useEffect, useMemo } from "react";
import InteractiveRosary from "./InteractiveRosary";
import Controls from "./Controls";
import { generateRosarySequence } from "../utils/rosaryEngine";

function PrayerBoard({ day, mysteryData, onBack }) {
  // Inicializa o state lendo do localStorage, se existir
  const [step, setStep] = useState(() => {
    const saved = localStorage.getItem("rosaryStep");
    return saved ? Number(saved) : 0;
  });

  const [showText, setShowText] = useState(false);

  // Gera a sequência MEMORIZADA
  const fullSequence = useMemo(() => {
    const mysteriesList = mysteryData?.mysteries || [];
    return generateRosarySequence(mysteriesList);
  }, [mysteryData]);

  const currentPrayer = fullSequence[step] || fullSequence[0];

  // Salva no localStorage sempre que o passo mudar
  useEffect(() => {
    localStorage.setItem("rosaryStep", step);
  }, [step]);

  // Limpa o progresso ao voltar para o menu
  const handleBack = () => {
    localStorage.removeItem("rosaryStep");
    onBack();
  };

  // Navegação
  const nextStep = () => {
    if (step < fullSequence.length - 1) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) setStep((prev) => prev - 1);
  };

  // Teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        nextStep();
      }
      if (e.key === "ArrowLeft") prevStep();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [step, fullSequence]);

  const progress = ((step + 1) / fullSequence.length) * 100;

  return (
    <div className="prayer-board">
      <div className="header-board">
        <button onClick={handleBack} className="btn-back">
          ← Voltar
        </button>
        <div className="header-info">
          <h3>{day}</h3>
          <span className="mystery-tag">
            {mysteryData?.mystery || "Mistérios do Dia"}
          </span>
        </div>
      </div>

      {/* Visualização */}
      <InteractiveRosary currentStep={step} sequence={fullSequence} />

      {/* Conteúdo da Oração */}
      <div className="prayer-card">
        <span className="step-counter">
          Passo {step + 1} de {fullSequence.length}
        </span>

        <h2 className="prayer-title">{currentPrayer?.label}</h2>

        <div className={`prayer-content ${showText ? "expanded" : ""}`}>
          <p>{currentPrayer?.text}</p>
        </div>

        <button
          className="btn-toggle-text"
          onClick={() => setShowText(!showText)}
        >
          {showText ? "Ocultar Oração" : "Mostrar Oração Completa"}
        </button>
      </div>

      {/* Barra de Progresso */}
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <Controls onNext={nextStep} onPrev={prevStep} />
    </div>
  );
}

export default PrayerBoard;
