import React from "react";

function Controls({ onNext, onPrev, isFirstStep, isLastStep }) {
  return (
    <div className="controls-wrapper">
      <button
        onClick={onPrev}
        className="btn-nav btn-prev"
        disabled={isFirstStep}
        aria-label="Passo anterior"
      >
        <span className="icon">←</span> Anterior
      </button>

      <button
        onClick={onNext}
        className="btn-nav btn-next"
        disabled={isLastStep}
        aria-label="Próximo passo"
      >
        Próximo <span className="icon">→</span>
      </button>
    </div>
  );
}

export default Controls;
