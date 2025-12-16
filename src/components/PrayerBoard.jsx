import React, { useState, useEffect } from "react";
import InteractiveRosary from "./InteractiveRosary";
import Controls from "./Controls";

// --- Lógica para Gerar o Terço Completo ---
const generateRosarySequence = () => {
  let sequence = [];
  let id = 0;

  // 1. Início
  sequence.push({ id: id++, name: "Sinal da Cruz", type: "inicio" });
  sequence.push({ id: id++, name: "Oferecimento", type: "inicio" });
  sequence.push({ id: id++, name: "Creio", type: "inicio" });
  sequence.push({ id: id++, name: "Pai Nosso", type: "pai-nosso" });
  sequence.push({ id: id++, name: "Ave Maria (Fé)", type: "ave-maria" });
  sequence.push({ id: id++, name: "Ave Maria (Esperança)", type: "ave-maria" });
  sequence.push({ id: id++, name: "Ave Maria (Caridade)", type: "ave-maria" });
  sequence.push({ id: id++, name: "Glória", type: "gloria" });

  // 2. Os 5 Mistérios
  for (let i = 1; i <= 5; i++) {
    sequence.push({ id: id++, name: `${i}º Mistério`, type: "misterio" });
    sequence.push({ id: id++, name: "Pai Nosso", type: "pai-nosso" });

    // 10 Ave Marias
    for (let j = 1; j <= 10; j++) {
      sequence.push({
        id: id++,
        name: `Ave Maria (${j}/10)`,
        type: "ave-maria",
      });
    }

    sequence.push({ id: id++, name: "Glória", type: "gloria" });
    sequence.push({ id: id++, name: "Ó meu Jesus", type: "oracao" });
  }

  // 3. Finalização
  sequence.push({ id: id++, name: "Salve Rainha", type: "final" });

  return sequence;
};

// Gera a sequência uma vez (fora do componente para não recriar a cada render)
const FULL_SEQUENCE = generateRosarySequence();

function PrayerBoard({ day, mysteryData, onBack }) {
  const [step, setStep] = useState(0);

  // Funções de Navegação
  const nextStep = () => {
    if (step < FULL_SEQUENCE.length - 1) {
      setStep(step + 1);
      // Scroll suave para o topo se estiver em mobile
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  // Atalho de Teclado (Setas)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") nextStep(); // Seta Dir ou Espaço
      if (e.key === "ArrowLeft") prevStep();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextStep][prevStep]);

  const currentPrayer = FULL_SEQUENCE[step];

  // Calcula o progresso em porcentagem para uma barra de progresso (opcional)
  const progress = ((step + 1) / FULL_SEQUENCE.length) * 100;

  return (
    <div className="prayer-board">
      {/* Cabeçalho */}
      <div className="header-board">
        <button onClick={onBack} className="btn-back">
          ← Voltar
        </button>
        <div className="header-info">
          <h3>{day}</h3>
          <span className="mystery-tag">
            {mysteryData?.mystery || "Mistério do Dia"}
          </span>
        </div>
      </div>

      {/* Área Visual (Terço) */}
      <div className="visual-area">
        <InteractiveRosary
          currentStep={step}
          totalSteps={FULL_SEQUENCE.length}
          prayerType={currentPrayer.type}
        />
      </div>

      {/* Texto da Oração */}
      <div className="prayer-text">
        <span className="step-count">
          Passo {step + 1} de {FULL_SEQUENCE.length}
        </span>
        <h2>{currentPrayer.name}</h2>
        {/* Aqui você pode adicionar um if/else para mostrar o texto completo da oração se quiser */}
      </div>

      {/* Barra de Progresso Simples */}
      <div
        style={{
          width: "100%",
          height: "4px",
          background: "#333",
          marginTop: "10px",
          borderRadius: "2px",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "#646cff",
            transition: "width 0.3s",
          }}
        ></div>
      </div>

      {/* Controles */}
      <Controls onNext={nextStep} onPrev={prevStep} />
    </div>
  );
}

export default PrayerBoard;
