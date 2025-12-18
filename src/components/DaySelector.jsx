import React, { useState } from "react";
import { MYSTERIES_BY_DAY } from "../data/rosaryConstants";
import { GothicRosePattern, LargeRosette } from "./CatholicPattern";
import "./DaySelector.css";

function DaySelector({ onSelectDay, todayMystery }) {
  const [intention, setIntention] = useState(""); // Estado para a intenção

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
  const mysteryName = todayMystery || MYSTERIES_BY_DAY[todayName];

  const formatDayName = (day) => {
    if (day === "Sábado" || day === "Domingo") return day;
    return `${day}-Feira`;
  };

  // Envia o dia E a intenção
  const handleStart = (day) => {
    onSelectDay(day, intention);
  };

  return (
    <div className="selector-wrapper fade-in">
      <div className="hero-section">
        <div className="cross-icon">†</div>
        <h1 className="app-title">Santo Rosário</h1>
        <p className="app-subtitle">Contemplação diária e oração</p>
      </div>

      <div className="today-highlight glass-panel">
        <div className="ornament-bg">
          <LargeRosette className="rotating-rosette" />
        </div>

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

          {/* NOVO: Campo de Intenções */}
          <div className="intention-container">
            <label htmlFor="intention-input" className="intention-label">
              Suas Intenções (Opcional)
            </label>
            <textarea
              id="intention-input"
              className="intention-input"
              placeholder="Por quem você deseja rezar hoje? (Ex: Pela saúde da família, pela paz...)"
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              rows={2}
            />
          </div>

          <button
            className="btn-primary btn-large"
            onClick={() => handleStart(todayName)}
          >
            Iniciar Oração
          </button>
        </div>
      </div>

      <div className="other-days-section">
        <div className="grid-label">Outros dias da semana</div>
        <div className="days-grid">
          {days.map((day) => {
            if (day === todayName) return null;
            return (
              <button
                key={day}
                // Passa a mesma intenção digitada, mesmo se escolher outro dia
                onClick={() => handleStart(day)}
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
