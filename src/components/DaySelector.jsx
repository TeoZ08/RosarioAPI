import React from "react";

const daysOfWeek = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

function DaySelector({ onSelectDay, todayMystery }) {
  // Pega o dia da semana atual (0 = Domingo, 1 = Segunda...)
  const currentDayIndex = new Date().getDay();

  return (
    <div className="selector-container">
      <h2>Escolha o dia para rezar</h2>
      <p className="subtitle">
        Mistério de Hoje: <strong>{todayMystery}</strong>
      </p>

      <div className="cards-grid">
        {daysOfWeek.map((day, index) => (
          <button
            key={day}
            className={`day-card ${index === currentDayIndex ? "today" : ""}`}
            onClick={() => onSelectDay(day)}
          >
            {day}
            {index === currentDayIndex && <span className="badge">Hoje</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DaySelector;
