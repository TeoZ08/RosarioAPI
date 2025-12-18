import React, { useState, useEffect, useMemo, useCallback } from "react";
import InteractiveRosary from "./InteractiveRosary";
import Controls from "./Controls";
import { generateRosarySequence } from "../utils/rosaryEngine";
import { motion, AnimatePresence } from "framer-motion";
import "./PrayerBoard.css";

function PrayerBoard({ day, mysteryData, onBack, userIntention }) {
  const [step, setStep] = useState(() => {
    const saved = localStorage.getItem("rosaryStep");
    const savedDay = localStorage.getItem("rosaryDay");
    return saved && savedDay === day ? Number(saved) : 0;
  });

  const fullSequence = useMemo(() => {
    return generateRosarySequence(mysteryData?.mysteries || [], userIntention);
  }, [mysteryData, userIntention]);

  const mysteryIndices = useMemo(() => {
    return fullSequence
      .map((item, index) => (item.type === "pai-nosso-misterio" ? index : -1))
      .filter((index) => index !== -1);
  }, [fullSequence]);

  const currentPrayer = fullSequence[step] || fullSequence[0];

  const activeImage =
    currentPrayer.mysteryInfo?.image || currentPrayer.mysteryContextImage;

  useEffect(() => {
    localStorage.setItem("rosaryStep", step);
    localStorage.setItem("rosaryDay", day);
  }, [step, day]);

  const triggerHaptic = () => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(10);
    }
  };

  const handleNext = useCallback(() => {
    if (step < fullSequence.length - 1) {
      triggerHaptic();
      setStep((s) => s + 1);
    }
  }, [step, fullSequence.length]);

  const handlePrev = useCallback(() => {
    if (step > 0) {
      triggerHaptic();
      setStep((s) => s - 1);
    }
  }, [step]);

  const handleJumpTo = (index) => {
    triggerHaptic();
    setStep(index);
  };

  const handleRestart = () => {
    if (window.confirm("Deseja reiniciar o terço do começo?")) {
      setStep(0);
    }
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleNext, handlePrev]);

  const progress = ((step + 1) / fullSequence.length) * 100;

  // Variantes de Animação (Cards)
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

  // Variantes de Animação (Fundo)
  // Acelerei um pouco a duração (1.5s -> 0.8s) para não parecer que está carregando
  const bgVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.8 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  const getLiturgicalName = (type) => {
    const map = {
      inicio: "Introdução",
      "conta-grande": "Pai Nosso",
      "pai-nosso-misterio": "Anúncio do Mistério",
      "conta-pequena": "Ave Maria",
      gloria: "Glória ao Pai",
      jaculatoria: "Jaculatória",
      final: "Encerramento",
      cruz: "Sinal da Cruz",
    };
    return map[type] || type;
  };

  const headerInfo = (() => {
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
  })();

  const isMysteryAnnouncement = currentPrayer?.type === "pai-nosso-misterio";

  return (
    <motion.div
      className="prayer-board"
      // CORREÇÃO: Removi o initial={{ opacity: 0 }} que causava o apagão na tela.
      // Agora o conteúdo entra imediatamente.
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* IMAGEM DE FUNDO */}
      <div className="sacred-art-background">
        <AnimatePresence mode="popLayout">
          {activeImage && (
            <motion.img
              key={activeImage}
              src={activeImage}
              alt="Arte Sacra"
              className="art-layer"
              variants={bgVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            />
          )}
        </AnimatePresence>
        <div className="art-overlay"></div>
      </div>

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
                className={`prayer-card glass-panel ${
                  isMysteryAnnouncement ? "card-mystery-highlight" : ""
                }`}
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

                {isMysteryAnnouncement && currentPrayer.mysteryInfo && (
                  <div className="mystery-announcement">
                    <span className="mystery-number">
                      {currentPrayer.mysteryInfo.number}º Mistério
                    </span>
                    <motion.h3
                      className="mystery-label-highlight"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {currentPrayer.mysteryInfo.label}
                    </motion.h3>
                  </div>
                )}

                <motion.h1
                  className="prayer-title"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.8 }}
                >
                  {currentPrayer?.label}
                </motion.h1>

                <div className="prayer-text-container">
                  <p className="prayer-text" style={{ whiteSpace: "pre-line" }}>
                    {currentPrayer?.text}
                  </p>
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
          <span className="sidebar-title">Mistérios</span>
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
            onClick={() => handleJumpTo(fullSequence.length - 1)}
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
