import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import DaySelector from "./components/DaySelector";
import PrayerBoard from "./components/PrayerBoard";

function App() {
  // Estados (Memórias)
  const [selectedDay, setSelectedDay] = useState(null); // null = mostrando a semana
  const [rosaryData, setRosaryData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Busca os dados assim que o app abre
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Exemplo usando a API do Rosário
        const response = await axios.get(
          "https://the-rosary-api.vercel.app/v1/today"
        );
        setRosaryData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Função para resetar (Voltar para a escolha da semana)
  const handleBack = () => {
    setSelectedDay(null);
  };

  if (loading) return <div className="loading">Carregando Liturgia...</div>;

  return (
    <div className="app-container">
      <header>
        <h1>Meu Rosário Diário</h1>
      </header>

      <main>
        {/* RENDERIZAÇÃO CONDICIONAL: */}
        {/* Se NÃO tem dia selecionado, mostra os dias da semana */}
        {!selectedDay ? (
          <DaySelector
            onSelectDay={(day) => setSelectedDay(day)}
            todayMystery={rosaryData ? rosaryData.mystery : ""}
          />
        ) : (
          /* Se TEM dia selecionado, mostra a "Mesa de Oração" */
          <PrayerBoard
            day={selectedDay}
            mysteryData={rosaryData}
            onBack={handleBack}
          />
        )}
      </main>
    </div>
  );
}

export default App;
