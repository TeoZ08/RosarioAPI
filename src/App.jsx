import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import DaySelector from "./components/DaySelector";
import PrayerBoard from "./components/PrayerBoard";
import { MYSTERIES_BY_DAY, DETAILED_MYSTERIES } from "./data/rosaryConstants";

function App() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [userIntention, setUserIntention] = useState("");
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Calcula o dia da semana atual (0 = Domingo, 1 = Segunda...)
  const daysOfWeek = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];
  const todayDate = new Date();
  const todayName = daysOfWeek[todayDate.getDay()];

  // Busca dados da API (opcional, fallback para constante local)
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

  const handleSelectDay = (day, intention) => {
    setSelectedDay(day);
    setUserIntention(intention);
  };

  const handleBack = () => {
    setSelectedDay(null);
    setUserIntention("");
  };

  const getMysteryDataForSelectedDay = () => {
    if (!selectedDay) return null;

    // Se o dia selecionado for hoje e tivermos dados da API, usa a API
    if (
      selectedDay === todayName &&
      apiData &&
      Array.isArray(apiData.mysteries)
    ) {
      return apiData;
    }

    // Caso contrário, usa os dados locais (fallback)
    const mysteryType = MYSTERIES_BY_DAY[selectedDay] || "Mistério do Dia";
    return {
      mystery: mysteryType,
      mysteries: DETAILED_MYSTERIES[mysteryType] || [],
    };
  };

  // Define qual mistério mostrar na tela inicial (API ou Local)
  const currentMysteryDisplay = apiData
    ? apiData.mystery
    : MYSTERIES_BY_DAY[todayName];

  if (loading) return <div className="loading">Carregando Liturgia...</div>;

  return (
    <div className="app-container">
      {!selectedDay ? (
        <DaySelector
          onSelectDay={handleSelectDay}
          currentDayName={todayName}
          currentMystery={currentMysteryDisplay}
        />
      ) : (
        <PrayerBoard
          day={selectedDay}
          mysteryData={getMysteryDataForSelectedDay()}
          userIntention={userIntention}
          onBack={handleBack}
        />
      )}
    </div>
  );
}

export default App;
