import "./App.css";
import TheButtons from "./components/TheButtons";
import Inputs from "./components/Inputs";
import LocalTime from "./components/LocalTime";
import Temps from "./components/Temps";
import Future from "./components/Future";
import getFormattedWeatherData from "./main/service";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [query, setQuery] = useState({ q: "gaborone" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location.";

      toast.info(message);

      await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.success(
          `Found`
        );

        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-blue-700 to-purple-700";
    const threshold = units === "metric" ? 25 : 50;
    if (weather.temp <= threshold) return "from-blue-700 to-red-700";

    return "from-red-700 to-yellow-700";
  };

  return (
    <div
      className={`mx-auto max-w-screen-md mt-0 py-1 px-1 bg-gradient-to-br  h-full shadow-xl shadow-gray-400 ${formatBackground()}`}
    >
      <TheButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather && (
        <div>
          <LocalTime weather={weather} />
          <Temps weather={weather} />

          <Future title="hourly forecast" items={weather.hourly} />
          <Future title="daily forecast" items={weather.daily} />
        </div>
      )}

      <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
    </div>
  );
}

export default App;
