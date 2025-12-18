import React, { useState } from "react";
import "./DaySelector.css";

// Ícones simples (SVGs inline para facilitar)
const CrossIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="cross-icon"
  >
    <path
      d="M12 2V22M6 8H18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const DecorativeDivider = () => (
  <div className="decorative-divider">
    <span className="line"></span>
    <span className="diamond">❖</span>
    <span className="line"></span>
  </div>
);

function DaySelector({ onSelectDay, currentDayName, currentMystery, days }) {
  const [intention, setIntention] = useState("");

  const handleStart = () => {
    // Passa o dia atual e a intenção para o componente pai
    onSelectDay(currentDayName, intention);
  };

  const otherDays = Object.keys(days).filter((d) => d !== currentDayName);

  return (
    <div className="selector-wrapper fade-in">
      {/* HEADER: Título e Citação Inspiradora */}
      <header className="hero-section">
        <CrossIcon />
        <h1 className="app-title">Santo Rosário</h1>
        <p className="app-subtitle">Contemplação e Oração Diária</p>

        <div className="daily-quote-card">
          <p className="quote-text">
            "Não há problema, por mais difícil que seja, que não possamos
            resolver com a oração do Santo Rosário."
          </p>
          <span className="quote-author">— Irmã Lúcia de Fátima</span>
        </div>
      </header>

      {/* CARD PRINCIPAL: O Dia de Hoje */}
      <main className="main-content">
        <div className="today-highlight">
          <div className="glow-effect"></div> {/* Luz de fundo */}
          <div className="content-relative">
            <span className="label-day">Hoje é {currentDayName}</span>
            <h2 className="highlight-text">{currentMystery}</h2>
            <p className="mystery-today-title">Mistérios do dia</p>

            <div className="intention-container">
              <label className="intention-label">Sua Intenção (Opcional)</label>
              <textarea
                className="intention-input"
                placeholder="Por quem ou pelo que você deseja rezar hoje?"
                rows="1"
                value={intention}
                onChange={(e) => setIntention(e.target.value)}
              />
            </div>

            <button className="btn-primary btn-large" onClick={handleStart}>
              Iniciar Oração
            </button>
          </div>
        </div>
      </main>

      <DecorativeDivider />

      {/* SELEÇÃO DE OUTROS DIAS */}
      <section className="other-days-section">
        <span className="grid-label">Ou selecione outro dia</span>
        <div className="days-grid">
          {otherDays.map((day) => (
            <div
              key={day}
              className="day-card"
              onClick={() => onSelectDay(day, intention)}
            >
              <span className="day-name">{day}</span>
              <span className="day-mystery">{days[day]}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="app-footer">
        <p>Desenvolvido para auxiliar sua vida de oração.</p>
        <span className="version">v1.0 • A.M.D.G.</span>
      </footer>
    </div>
  );
}

export default DaySelector;
