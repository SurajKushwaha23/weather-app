import { useState } from "react";
import axios from "axios";
import {
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";

const WeatherWidget = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [unit, setUnit] = useState("celsius");

  const API_KEY = import.meta.env.DEV.VITE_WEATHERAPI_API_KEY;
  console.log("API Key:", import.meta.env.DEV.VITE_WEATHERAPI_API_KEY);

  const fetchWeather = async (e) => {
    e.preventDefault();
    if (!city) return;

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(
          city
        )}`
      );

      console.log("API Response:", response.data);

      if (!response.data.current) {
        throw new Error("Invalid API response format");
      }

      const transformedData = {
        temp_c: response.data.current.temp_c,
        temp_f: response.data.current.temp_f,
        humidity: response.data.current.humidity,
        wind_kph: response.data.current.wind_kph,
        condition: response.data.current.condition.text,
        icon: response.data.current.condition.icon,
      };

      setWeatherData(transformedData);
      setErrorMessage("");
    } catch (err) {
      console.error("API Error:", err);
      const errorMsg =
        err.response?.data?.error?.message ||
        err.message ||
        "Failed to fetch weather data";
      setErrorMessage(errorMsg);
      setWeatherData(null);
    }
    setIsLoading(false);
  };

  const toggleUnit = () => {
    setUnit((prev) => (prev === "celsius" ? "fahrenheit" : "celsius"));
  };

  const displayTemp = () => {
    if (!weatherData) return "--";
    return unit === "celsius"
      ? `${weatherData.temp_c}°C`
      : `${weatherData.temp_f}°F`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-8 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 transition-all duration-300 hover:shadow-2xl">
        <form onSubmit={fetchWeather} className="relative mb-6">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="w-full p-4 pr-12 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="absolute right-2 top-2 p-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <MagnifyingGlassIcon className="w-6 h-6 text-white" />
          </button>
        </form>

        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-100 p-4 rounded-lg flex items-center gap-2 text-red-700">
            <ExclamationTriangleIcon className="w-6 h-6" />
            <span>{errorMessage}</span>
          </div>
        )}

        {weatherData && !isLoading && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{city}</h2>
                <p className="text-gray-500 capitalize">
                  {weatherData.condition}
                </p>
              </div>
              <img
                src={`https:${weatherData.icon}`}
                alt="Weather icon"
                className="w-24 h-24"
              />
            </div>

            <div className="text-center bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-xl text-white">
              <button
                onClick={toggleUnit}
                className="text-4xl font-bold hover:opacity-80 transition-opacity"
              >
                {displayTemp()}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <svg
                    className="w-6 h-6 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500">Humidity</p>
                  <p className="font-bold">{weatherData.humidity}%</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <svg
                    className="w-6 h-6 text-purple-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500">Wind</p>
                  <p className="font-bold">{weatherData.wind_kph} km/h</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherWidget;
