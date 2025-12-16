import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import DaySelector from "./components/DaySelector";
import PrayerBoard from "./components/PrayerBoard";
import { MYSTERIES_BY_DAY, DETAILED_MYSTERIES } from "./data/rosaryConstants";

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
        setApiData(response.data);
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

    // 1. Se for HOJE e tivermos dados da API, usa a API
    if (selectedDay === todayName && apiData) {
      return apiData;
    }

    // 2. Se for outro dia (ou API falhou), usa nossa base local detalhada
    const mysteryType = MYSTERIES_BY_DAY[selectedDay] || "Mistério do Dia";

    return {
      mystery: mysteryType,
      mysteries: DETAILED_MYSTERIES[mysteryType] || [],
    };
  };

  if (loading) return <div className="loading">Carregando Liturgia...</div>;

  return (
    <div className="app-container">
      {!selectedDay ? (
        <DaySelector
          onSelectDay={handleSelectDay}
          todayMystery={apiData ? apiData.mystery : null}
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
