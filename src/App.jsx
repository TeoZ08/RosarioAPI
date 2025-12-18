import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import DaySelector from "./components/DaySelector";
import PrayerBoard from "./components/PrayerBoard";
import { MYSTERIES_BY_DAY, DETAILED_MYSTERIES } from "./data/rosaryConstants";

function App() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [userIntention, setUserIntention] = useState(""); // Novo estado
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

  // Agora aceita a intenção como segundo parâmetro
  const handleSelectDay = (day, intention) => {
    setSelectedDay(day);
    setUserIntention(intention);
  };

  const handleBack = () => {
    setSelectedDay(null);
    setUserIntention(""); // Limpa a intenção ao voltar
  };

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

    if (
      selectedDay === todayName &&
      apiData &&
      Array.isArray(apiData.mysteries)
    ) {
      return apiData;
    }

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
          userIntention={userIntention} // Passando a intenção
          onBack={handleBack}
        />
      )}
    </div>
  );
}

export default App;
