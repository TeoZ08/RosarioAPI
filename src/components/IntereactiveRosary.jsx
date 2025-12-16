import React from "react";

function InteractiveRosary({ currentStep, prayerType }) {
  // Define a cor da bolinha ativa baseada no tipo de oração
  const getActiveColor = () => {
    switch (prayerType) {
      case "pai-nosso":
        return "#FFD700"; // Dourado
      case "ave-maria":
        return "#87CEEB"; // Azul Céu
      case "misterio":
        return "#FF69B4"; // Rosa
      default:
        return "#FFF";
    }
  };

  return (
    <div className="rosary-svg-container">
      {/* SVG Simbolico: 5 Bolinhas representando o progresso */}
      <svg height="100" width="300">
        <line x1="20" y1="50" x2="280" y2="50" stroke="#555" strokeWidth="2" />

        {/* Renderiza bolinhas dinamicamente baseado na sequência */}
        {[...Array(5)].map((_, i) => {
          // Apenas exemplo visual com 5
          const isActive = i === stepToVisualIndex(currentStep);
          return (
            <circle
              key={i}
              cx={50 + i * 50}
              cy="50"
              r={isActive ? 15 : 10}
              fill={isActive ? getActiveColor() : "#333"}
              stroke="white"
              strokeWidth="2"
              transition="all 0.3s ease"
            />
          );
        })}
      </svg>
    </div>
  );
}

// Função auxiliar simples para mapear o passo real para a visualização (exemplo)
// Num app real, você mapearia cada ID da sequência para uma coordenada X/Y do SVG
const stepToVisualIndex = (step) => {
  return step % 5;
};

export default InteractiveRosary;
