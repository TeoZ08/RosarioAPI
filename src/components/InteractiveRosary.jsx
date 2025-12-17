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

      // Centraliza a conta (ou o ponto invisível) na tela
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

            // Identifica orações que NÃO possuem conta física no terço
            // O 'inicio' (Oferecimento) é feito na Cruz, então ocultamos sua "conta" própria
            const isGhost = [
              "gloria",
              "jaculatoria",
              "inicio",
              "final",
            ].includes(item.type);

            let beadClass = "bead";

            if (isGhost) {
              beadClass += " bead-ghost";
            } else {
              // Lógica para contas visíveis
              if (
                item.type === "conta-grande" ||
                item.type === "pai-nosso" ||
                item.type === "pai-nosso-misterio"
              ) {
                beadClass += " bead-large";
              }

              if (item.type === "cruz") {
                beadClass += " bead-cross";
              }
            }

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
                {/* Opcional: Conteúdo interno da conta se necessário */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default InteractiveRosary;
