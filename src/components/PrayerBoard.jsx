import React, { useState, useEffect, useMemo } from "react";
import InteractiveRosary from "./InteractiveRosary";
import Controls from "./Controls";
import { generateRosarySequence } from "../utils/rosaryEngine"; // Importe a engine criada

function PrayerBoard({ day, mysteryData, onBack }) {
  const [step, setStep] = useState(0);
  const [showText, setShowText] = useState(false); // Toggle para ver a oração

  // Gera a sequência MEMORIZADA (useMemo) baseada nos mistérios recebidos
  const fullSequence = useMemo(() => {
    // Tenta pegar os mistérios da prop mysteryData, senão usa um array vazio
    // Se a API retornar uma estrutura diferente, ajuste aqui.
    // Supondo mysteryData = ["Anunciação", "Visitação"...] ou mysteryData.mysteries
    const mysteriesList = mysteryData?.mysteries || [];
    return generateRosarySequence(mysteriesList);
  }, [mysteryData]);

  const currentPrayer = fullSequence[step];

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
  }, [step, fullSequence]); // Dependências atualizadas

  // Cálculo de progresso
  const progress = ((step + 1) / fullSequence.length) * 100;

  return (
    <div className="prayer-board">
      <div className="header-board">
        <button onClick={onBack} className="btn-back">
          ← Voltar
        </button>
        <div className="header-info">
          <h3>{day}</h3>
          <span className="mystery-tag">
            {mysteryData?.mystery || "Mistérios do Dia"}
          </span>
        </div>
      </div>

      {/* VISUALIZAÇÃO NOVA */}
      <InteractiveRosary currentStep={step} sequence={fullSequence} />

      {/* CONTEÚDO DA ORAÇÃO */}
      <div className="prayer-card">
        <span className="step-counter">
          Passo {step + 1} de {fullSequence.length}
        </span>

        <h2 className="prayer-title">{currentPrayer.label}</h2>

        <div className={`prayer-content ${showText ? "expanded" : ""}`}>
          <p>{currentPrayer.text}</p>
        </div>

        <button
          className="btn-toggle-text"
          onClick={() => setShowText(!showText)}
        >
          {showText ? "Ocultar Oração" : "Mostrar Oração Completa"}
        </button>
      </div>

      {/* BARRA DE PROGRESSO */}
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <Controls onNext={nextStep} onPrev={prevStep} />
    </div>
  );
}

export default PrayerBoard;
