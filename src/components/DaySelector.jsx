import React from "react";
import "./DaySelector.css";

function DaySelector({ onSelectDay, todayMystery }) {
  const days = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];

  // Pega o nome do dia de hoje em português
  const todayName = days[new Date().getDay()];

  return (
    <div className="day-selector-container">
      {/* Adicionei um título principal para dar cara de site */}
      <h1 className="main-title">Santo Rosário</h1>
      <p className="subtitle">Selecione o dia para iniciar sua oração.</p>

      <div className="days-grid">
        {days.map((day) => {
          const isToday = day === todayName;
          return (
            <button
              key={day}
              onClick={() => onSelectDay(day)}
              className={`day-button ${isToday ? "today" : ""}`}
            >
              {isToday && <span className="today-label">Hoje</span>}
              <span className="day-name">{day}</span>
            </button>
          );
        })}
      </div>

      <div className="today-info">
        <p>Mistérios de hoje ({todayName}):</p>
        <p className="highlight">{todayMystery || "Carregando..."}</p>
      </div>
    </div>
  );
}

export default DaySelector;
