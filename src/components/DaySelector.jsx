import React from "react";
import { MYSTERIES_BY_DAY } from "../data/rosaryConstants";
import { GothicRosePattern, LargeRosette } from "./CatholicPattern";
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

  // Lógica de Fallback: Se a API não carregou (todayMystery for nulo),
  // usamos nossa constante local para não mostrar "..."
  const mysteryName = todayMystery || MYSTERIES_BY_DAY[todayName];

  // Formatação: "Segunda" -> "Segunda-Feira"
  const formatDayName = (day) => {
    if (day === "Sábado" || day === "Domingo") return day;
    return `${day}-Feira`;
  };

  return (
    <div className="selector-wrapper fade-in">
      {/* Cabeçalho da App */}
      <div className="hero-section">
        <div className="cross-icon">†</div>
        <h1 className="app-title">Santo Rosário</h1>
        <p className="app-subtitle">Contemplação diária e oração</p>
      </div>

      {/* Destaque do Dia (Card Principal) */}
      <div className="today-highlight glass-panel">
        {/* Ornamento de Fundo (Gira lentamente) */}
        <div className="ornament-bg">
          <LargeRosette className="rotating-rosette" />
        </div>

        {/* Padrão de textura sutil */}
        <div className="texture-overlay">
          <GothicRosePattern color="#d4af37" opacity={0.15} />
        </div>

        <div className="content-relative">
          <span className="label-day">
            Oração de Hoje • {formatDayName(todayName)}
          </span>

          <h2 className="mystery-today-title">
            Mistérios <br />
            <span className="highlight-text">{mysteryName}</span>
          </h2>

          <button
            className="btn-primary btn-large"
            onClick={() => onSelectDay(todayName)}
          >
            Iniciar Oração
          </button>
        </div>
      </div>

      {/* Grid de Outros Dias */}
      <div className="other-days-section">
        <div className="grid-label">Outros dias da semana</div>
        <div className="days-grid">
          {days.map((day) => {
            if (day === todayName) return null;
            return (
              <button
                key={day}
                onClick={() => onSelectDay(day)}
                className="day-card"
              >
                <span className="day-name">{day}</span>
                <span className="day-mystery">{MYSTERIES_BY_DAY[day]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DaySelector;
