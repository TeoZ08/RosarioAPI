/* src/components/InteractiveRosary.jsx */
import React, { useEffect, useRef } from "react";
import "./InteractiveRosary.css";

function InteractiveRosary({ currentStep, sequence }) {
  const scrollRef = useRef(null);
  const beadsRef = useRef([]);

  // Auto-scroll para manter a conta ativa no centro
  useEffect(() => {
    if (beadsRef.current[currentStep] && scrollRef.current) {
      const container = scrollRef.current;
      const bead = beadsRef.current[currentStep];

      // Calcula o centro
      const containerWidth = container.offsetWidth;
      const beadLeft = bead.offsetLeft;
      const beadWidth = bead.offsetWidth;

      const scrollPos = beadLeft - containerWidth / 2 + beadWidth / 2;

      container.scrollTo({
        left: scrollPos,
        behavior: "smooth",
      });
    }
  }, [currentStep]);

  return (
    <div className="rosary-visualizer-container">
      {/* Luz divina central para indicar foco */}
      <div className="focus-light"></div>

      <div className="rosary-track" ref={scrollRef}>
        <div className="beads-wrapper">
          {sequence.map((item, index) => {
            const isActive = index === currentStep;
            const isPast = index < currentStep;

            // Define classes baseadas no tipo
            let beadClass = "bead";
            if (item.type === "conta-grande" || item.type === "pai-nosso")
              beadClass += " bead-large";
            if (item.type === "misterio") beadClass += " bead-mystery";
            if (item.type === "cruz" || item.type === "inicio")
              beadClass += " bead-cross";
            if (isActive) beadClass += " active";
            if (isPast) beadClass += " past";

            return (
              <div
                key={item.id}
                ref={(el) => (beadsRef.current[index] = el)}
                className={beadClass}
              >
                {/* Se for mistério, mostra número romano ou ícone */}
                {item.type === "misterio" && (
                  <span className="bead-icon">M</span>
                )}
                {item.type === "inicio" && <span className="bead-icon">†</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default InteractiveRosary;
