import React, { useEffect, useRef } from "react";
import "./InteractiveRosary.css";

function InteractiveRosary({ currentStep, sequence, onBeadClick }) {
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
      <div className="focus-guide"></div>

      <div className="rosary-track" ref={scrollRef}>
        <div className="beads-wrapper">
          {sequence.map((item, index) => {
            const isActive = index === currentStep;
            const isPast = index < currentStep;

            let beadClass = "bead";

            // LÓGICA ATUALIZADA:
            // O 'pai-nosso-misterio' agora é visualmente uma conta grande comum
            if (
              item.type === "conta-grande" ||
              item.type === "pai-nosso" ||
              item.type === "pai-nosso-misterio"
            ) {
              beadClass += " bead-large";
            }

            // Removemos o 'bead-mystery' (quadrado) pois não existe mais esse passo

            if (item.type === "cruz" || item.type === "inicio")
              beadClass += " bead-cross";

            if (isActive) beadClass += " active";
            if (isPast) beadClass += " past";

            return (
              <div
                key={item.id}
                ref={(el) => (beadsRef.current[index] = el)}
                className={beadClass}
                onClick={() => onBeadClick && onBeadClick(index)}
                title={item.label}
              >
                {/* Se quiser colocar um número romano dentro da conta grande do mistério, pode descomentar abaixo */}
                {/* {item.type === "pai-nosso-misterio" && item.mysteryInfo && (
                  <span className="bead-number">{item.mysteryInfo.number}</span>
                )} */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default InteractiveRosary;
