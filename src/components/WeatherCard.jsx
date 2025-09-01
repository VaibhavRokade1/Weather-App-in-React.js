import { useEffect, useState } from "react";

function WeatherCard() {
  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState("");

  const HandleSearch = async (s_city) => {
    try {
      const apiKey = import.meta.env.VITE_WEATHER_APP_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${s_city}&units=metric&appid=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();

      setWeatherData({
        locn: data.name,
        weather: data.weather,
        description: data.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        tempreture: Math.floor(data.main.temp),
        windSpeed: data.wind.speed,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
      });
    } catch (error) {
      console.log(`Api Error : ${error}`);
    }
  };

  useEffect(() => {
    HandleSearch("Pune");
  }, []);

  return (
    <div className="bg-white/10 backdrop-blur-lg text-white rounded-3xl shadow-2xl p-6 w-full max-w-sm mx-auto">
      {/* Search Bar */}
      <div className="flex items-center bg-white/20 rounded-xl p-2 mb-6">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          type="text"
          placeholder="Search city..."
          className="flex-1 bg-transparent outline-none text-white placeholder-gray-300 px-3 py-2 rounded-lg"
        />
        <button
          onClick={() => HandleSearch(city)}
          className="bg-purple-500 hover:bg-purple-600 transition px-4 py-2 rounded-lg text-sm font-medium"
        >
          Search
        </button>
      </div>

      {/* Location and Icon */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">{weatherData.locn}</h1>
          <p className="text-sm text-gray-200">
            {new Date().toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="w-20 h-20">
          {weatherData.icon && (
            <img
              src={weatherData.icon}
              alt="weather-icon"
              className="w-full h-full object-contain"
            />
          )}
        </div>
      </div>

      {/* Temperature and Description */}
      <div className="text-center my-4">
        <h2 className="text-6xl font-extrabold">{weatherData.tempreture}°C</h2>
        <p className="text-lg capitalize text-gray-200">
          {weatherData.description}
        </p>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="flex flex-col items-center text-center bg-white/20 p-4 rounded-2xl">
          <span className="text-xl">💨</span>
          <p className="mt-1 font-semibold">{weatherData.windSpeed} km/h</p>
          <p className="text-gray-300 text-xs">Wind</p>
        </div>
        <div className="flex flex-col items-center bg-white/20 p-4 rounded-2xl">
          <span className="text-xl">💧</span>
          <p className="mt-1 font-semibold">{weatherData.humidity}%</p>
          <p className="text-gray-300 text-xs">Humidity</p>
        </div>
        <div className="flex flex-col items-center bg-white/20 p-4 rounded-2xl">
          <span className="text-xl">🌡️</span>
          <p className="mt-1 font-semibold">{weatherData.pressure} hPa</p>
          <p className="text-gray-300 text-xs">Pressure</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
