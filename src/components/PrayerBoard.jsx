import React, { useState, useEffect, useMemo, useCallback } from "react";
import InteractiveRosary from "./InteractiveRosary";
import Controls from "./Controls";
import { generateRosarySequence } from "../utils/rosaryEngine";
import { motion, AnimatePresence } from "framer-motion";
import "./PrayerBoard.css";

function PrayerBoard({ day, mysteryData, onBack }) {
  const [step, setStep] = useState(() => {
    const saved = localStorage.getItem("rosaryStep");
    const savedDay = localStorage.getItem("rosaryDay");
    return saved && savedDay === day ? Number(saved) : 0;
  });

  const fullSequence = useMemo(() => {
    return generateRosarySequence(mysteryData?.mysteries || []);
  }, [mysteryData]);

  const mysteryIndices = useMemo(() => {
    return fullSequence
      .map((item, index) => (item.type === "misterio" ? index : -1))
      .filter((index) => index !== -1);
  }, [fullSequence]);

  const currentPrayer = fullSequence[step] || fullSequence[0];

  useEffect(() => {
    localStorage.setItem("rosaryStep", step);
    localStorage.setItem("rosaryDay", day);
  }, [step, day]);

  // Função "memorizada" para evitar recriação desnecessária
  const handleNext = useCallback(() => {
    if (step < fullSequence.length - 1) setStep((s) => s + 1);
  }, [step, fullSequence.length]);

  // Função "memorizada"
  const handlePrev = useCallback(() => {
    if (step > 0) setStep((s) => s - 1);
  }, [step]);

  const handleJumpTo = (index) => {
    setStep(index);
  };

  const handleRestart = () => {
    if (window.confirm("Deseja reiniciar o terço do começo?")) {
      setStep(0);
    }
  };

  // CORREÇÃO DAS DEPENDÊNCIAS DO useEffect
  // Agora dependemos apenas das funções estáveis handleNext e handlePrev
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleNext, handlePrev]);

  const progress = ((step + 1) / fullSequence.length) * 100;

  const cardVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.98,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  const getLiturgicalName = (type) => {
    const map = {
      inicio: "Introdução",
      "conta-grande": "Pai Nosso",
      "conta-pequena": "Ave Maria",
      gloria: "Glória ao Pai",
      jaculatoria: "Jaculatória",
      misterio: "Contemplação",
      final: "Encerramento",
      cruz: "Sinal da Cruz",
    };
    return map[type] || type;
  };

  const formatFullTitle = () => {
    const dayMap = {
      Domingo: "Domingo",
      Segunda: "Segunda-Feira",
      Terça: "Terça-Feira",
      Quarta: "Quarta-Feira",
      Quinta: "Quinta-Feira",
      Sexta: "Sexta-Feira",
      Sábado: "Sábado",
    };
    const fullDay = dayMap[day] || day;
    const mysteryName = mysteryData?.mystery || "Mistério";

    return {
      title: `Mistérios ${mysteryName}`,
      subtitle: `(${fullDay})`,
    };
  };

  const headerInfo = formatFullTitle();

  return (
    // CORREÇÃO DO MOTION: Trocamos <div> por <motion.div> aqui na raiz.
    // Isso força o uso da variável 'motion' e restaura a animação de entrada da página.
    <motion.div
      className="prayer-board"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <header className="board-header">
        <button onClick={onBack} className="btn-back">
          <span className="icon">✕</span> Encerrar
        </button>

        <div className="header-titles">
          <h2 className="mystery-title">{headerInfo.title}</h2>
          <span className="mystery-subtitle">{headerInfo.subtitle}</span>
        </div>

        <button
          onClick={handleRestart}
          className="btn-restart"
          title="Reiniciar Terço"
        >
          <span className="icon">↻</span>
        </button>
      </header>

      <div className="rosary-wrapper">
        <InteractiveRosary
          currentStep={step}
          sequence={fullSequence}
          onBeadClick={handleJumpTo}
        />
      </div>

      <div className="prayer-workspace">
        <div className="card-column">
          <div className="card-container">
            <AnimatePresence mode="wait">
              <motion.main
                key={step}
                className="prayer-card glass-panel"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="card-header">
                  <span className="step-indicator">
                    Passo {step + 1} / {fullSequence.length}
                  </span>
                  <span className="prayer-type-tag">
                    {getLiturgicalName(currentPrayer?.type)}
                  </span>
                </div>

                <motion.h1
                  className="prayer-title"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.8 }}
                >
                  {currentPrayer?.label}
                </motion.h1>

                <div className="prayer-text-container">
                  <p className="prayer-text">{currentPrayer?.text}</p>
                </div>
              </motion.main>
            </AnimatePresence>
          </div>

          <footer className="board-footer">
            <div className="progress-track">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>

            <Controls
              onNext={handleNext}
              onPrev={handlePrev}
              isFirstStep={step === 0}
              isLastStep={step === fullSequence.length - 1}
            />
          </footer>
        </div>

        <aside className="shortcuts-sidebar glass-panel-sm">
          <span className="sidebar-title">Ir para Mistério</span>
          <div className="shortcuts-grid">
            {mysteryIndices.map((idx, i) => {
              const nextIdx = mysteryIndices[i + 1] || fullSequence.length;
              const isActive = step >= idx && step < nextIdx;

              return (
                <button
                  key={i}
                  onClick={() => handleJumpTo(idx)}
                  className={`btn-shortcut ${isActive ? "active" : ""}`}
                >
                  {i + 1}º
                </button>
              );
            })}
          </div>
          <div className="shortcut-divider"></div>
          <button onClick={() => handleJumpTo(0)} className="btn-shortcut-text">
            Início
          </button>
          <button
            onClick={() => handleJumpTo(fullSequence.length - 5)}
            className="btn-shortcut-text"
          >
            Final
          </button>
        </aside>
      </div>
    </motion.div>
  );
}

export default PrayerBoard;
