import React, { useRef, useEffect } from "react";
import "./InteractiveRosary.css"; // Vamos criar esse CSS abaixo

function InteractiveRosary({ currentStep, sequence }) {
  const scrollRef = useRef(null);

  // Mantém a conta ativa sempre visível no scroll
  useEffect(() => {
    if (scrollRef.current) {
      const activeNode = scrollRef.current.children[currentStep];
      if (activeNode) {
        activeNode.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
    }
  }, [currentStep]);

  return (
    <div className="rosary-visualizer">
      <div className="beads-track" ref={scrollRef}>
        {sequence.map((step, index) => {
          const isActive = index === currentStep;
          const isPast = index < currentStep;

          let beadClass = "bead";
          if (step.type === "conta-grande") beadClass += " bead-large";
          if (step.type === "conta-pequena") beadClass += " bead-small";
          if (step.type === "misterio") beadClass += " bead-mystery";
          if (step.type === "inicio" || step.type === "final")
            beadClass += " bead-cross";

          return (
            <div
              key={step.id}
              className={`${beadClass} ${isActive ? "active" : ""} ${
                isPast ? "past" : ""
              }`}
            >
              {/* Opcional: Número dentro da conta se for Ave Maria */}
              {step.type === "conta-pequena" && step.label.includes("/") && (
                <span className="bead-number">
                  {step.label.match(/\d+/)[0]}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default InteractiveRosary;
