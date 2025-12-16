/* src/components/DaySelector.jsx */
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

  const todayIndex = new Date().getDay();
  const todayName = days[todayIndex];

  return (
    <div className="selector-wrapper fade-in">
      <div className="hero-section">
        <h1 className="app-title">Santo Rosário</h1>
        <p className="app-subtitle">Contemplação e oração diária</p>
      </div>

      <div className="today-highlight glass-panel">
        <span className="label">Liturgia de Hoje</span>
        <h2 className="mystery-today">{todayMystery || "Mistérios..."}</h2>
        <button className="btn-primary" onClick={() => onSelectDay(todayName)}>
          Rezar Mistérios de Hoje
        </button>
      </div>

      <div className="grid-label">Outros dias</div>
      <div className="days-grid">
        {days.map((day, index) => {
          if (day === todayName) return null; // Já mostrado no destaque
          return (
            <button
              key={day}
              onClick={() => onSelectDay(day)}
              className="day-card"
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default DaySelector;
