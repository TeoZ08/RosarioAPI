import React, { useEffect, useRef } from "react";
import "./InteractiveRosary.css";

function InteractiveRosary({ currentStep, sequence }) {
  const scrollRef = useRef(null);
  const beadsRef = useRef([]);

  useEffect(() => {
    if (beadsRef.current[currentStep] && scrollRef.current) {
      const container = scrollRef.current;
      const bead = beadsRef.current[currentStep];

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
      {/* Luz divina central removida ou sutilizada no CSS */}
      <div className="focus-guide"></div>

      <div className="rosary-track" ref={scrollRef}>
        <div className="beads-wrapper">
          {sequence.map((item, index) => {
            const isActive = index === currentStep;
            const isPast = index < currentStep; // <--- CORRIGIDO AQUI (Adicionei o espaço)

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
                {/* REMOVIDO: O ícone de texto da cruz (†) para evitar duplicação */}

                {/* Se for mistério, mantemos o número romano ou M */}
                {item.type === "misterio" && (
                  <span className="bead-icon">M</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default InteractiveRosary;
