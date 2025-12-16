import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import DaySelector from "./components/DaySelector";
import PrayerBoard from "./components/PrayerBoard";
import { MYSTERIES_BY_DAY } from "./data/rosaryConstants"; // Constante criada no passo 1

function App() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Busca dados de HOJE
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://the-rosary-api.vercel.app/v1/today"
        );
        setApiData(response.data); // Ex: { mystery: "Dolorosos", mysteries: [...] }
      } catch (error) {
        console.error("Erro API", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSelectDay = (day) => {
    setSelectedDay(day);
  };

  // Lógica para determinar quais dados passar para o Board
  const getMysteryDataForSelectedDay = () => {
    if (!selectedDay) return null;

    // Verifica qual é o dia da semana atual (0-6)
    const days = [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ];
    const todayName = days[new Date().getDay()];

    // Se o usuário escolheu o dia de hoje E temos dados da API, usa a API
    if (selectedDay === todayName && apiData) {
      return apiData;
    }

    // Se escolheu outro dia, usamos nossa base local apenas para definir o TIPO de mistério
    // Nota: Para ter os textos dos mistérios específicos de outros dias (ex: Batismo de Jesus na Quinta),
    // você precisaria expandir o arquivo `rosaryConstants.js` com a lista completa de mistérios.
    return {
      mystery: MYSTERIES_BY_DAY[selectedDay] || "Mistério do Dia",
      mysteries: [], // Aqui você passaria a lista hardcoded se tivesse criado no passo 1
    };
  };

  if (loading) return <div className="loading">Carregando Liturgia...</div>;

  return (
    <div className="app-container">
      {!selectedDay ? (
        <DaySelector
          onSelectDay={handleSelectDay}
          todayMystery={apiData ? apiData.mystery : "Carregando..."}
        />
      ) : (
        <PrayerBoard
          day={selectedDay}
          mysteryData={getMysteryDataForSelectedDay()}
          onBack={() => setSelectedDay(null)}
        />
      )}
    </div>
  );
}

export default App;
