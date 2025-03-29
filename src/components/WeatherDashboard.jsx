import { useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  SunIcon,
  MoonIcon,
  CloudIcon,
  ArrowPathIcon,
  ViewfinderCircleIcon,
  EyeIcon,
  BeakerIcon,
  XMarkIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
const API_KEY = import.meta.env.VITE_WEATHERAPI_API_KEY;
const API_URL = import.meta.env.VITE_WEATHERAPI_API_URL;

const WeatherDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("India");
  const [unit, setUnit] = useState("C");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCityChange = (e) => {
    setSearchQuery(e.target.value);
    console.log(searchQuery);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `${API_URL}?key=${API_KEY}&q=${searchQuery}`
        );
        const data = await response.json();
        console.log(data);
        setWeatherData({
          name: data.location.name,
          temp: data.current.temp_c,
          condition: data.current.condition.text,
          img: data.current.condition.icon,
        });
      } catch (err) {
        setError(
          err.response?.data?.error?.message ||
            err.message ||
            "Failed to fetch weather data"
        );
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-8 relative">
      <div className="top-0 left-0 w-full bg-white/7 backdrop-blur-lg z-50">
        <div className="max-w-6xl mx-auto p-4">
          <div className="relative">
            <div className="flex items-center gap-2">
              <MagnifyingGlassIcon className="w-6 h-6 text-white cursor-pointer" />
              <input
                type="text"
                onChange={handleCityChange}
                placeholder="Search for Country or city..."
                className="w-full text-2xl p-4 bg-transparent text-white placeholder-gray-300  focus:outline-none focus:border-white/60 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-2 text-white/50 hover:text-white transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div className="mx-auto bg-yellow-50/90 backdrop-blur-lg shadow-2xl p-8">
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-700"></div>
          </div>
        </div>
      )}

      {weatherData && (
        <div className="mx-auto bg-yellow-50/90 backdrop-blur-lg shadow-2xl p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-800">
                {weatherData.name}
              </h1>
              <p className="text-gray-500 text-lg">Tuesday, 15 March 2025</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setUnit("C")}
                className={`px-4 py-2 rounded-lg ${
                  unit === "C" ? "bg-blue-500 text-white" : "bg-gray-100"
                }`}
              >
                °C
              </button>
              <button
                onClick={() => setUnit("F")}
                className={`px-4 py-2 rounded-lg ${
                  unit === "F" ? "bg-blue-500 text-white" : "bg-gray-100"
                }`}
              >
                °F
              </button>
            </div>
          </div>

          {/* Main Weather Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="col-span-1 lg:col-span-2 bg-white rounded-2xl p-8 ">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-6xl font-bold mb-2">
                    {weatherData.temp}°{unit}
                  </div>
                  <div className="text-2xl">{weatherData.condition}</div>
                </div>
                {/* <CloudIcon className="w-32 h-32 opacity-75" /> */}
                <img
                  src={weatherData.img}
                  className="w-auto h-36"
                  alt="Weather Icon"
                />
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4">
                Feels like {weatherData.feelsLike}°
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <SunIcon className="w-8 h-8 text-yellow-500" />
                  <div>
                    <div className="text-gray-500">Sunrise</div>
                    <div className="font-semibold">{weatherData.sunrise}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MoonIcon className="w-8 h-8 text-blue-500" />
                  <div>
                    <div className="text-gray-500">Sunset</div>
                    <div className="font-semibold">{weatherData.sunset}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <ArrowPathIcon className="w-8 h-8 text-blue-500" />
                <h3 className="text-lg font-semibold">Wind</h3>
              </div>
              <div className="text-3xl font-bold">
                {weatherData.windSpeed} km/h
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <ViewfinderCircleIcon className="w-8 h-8 text-purple-500" />
                <h3 className="text-lg font-semibold">Visibility</h3>
              </div>
              <div className="text-3xl font-bold">
                {weatherData.visibility} km
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <BeakerIcon className="w-8 h-8 text-green-500" />
                <h3 className="text-lg font-semibold">Pressure</h3>
              </div>
              <div className="text-3xl font-bold">
                {weatherData.pressure} hPa
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <EyeIcon className="w-8 h-8 text-red-500" />
                <h3 className="text-lg font-semibold">Humidity</h3>
              </div>
              <div className="text-3xl font-bold">{weatherData.humidity}%</div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <ArrowTrendingUpIcon className="w-8 h-8 text-orange-500" />
                <h3 className="text-lg font-semibold">UV Index</h3>
              </div>
              <div className="text-3xl font-bold">{weatherData.uvIndex}</div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <ClockIcon className="w-8 h-8 text-pink-500" />
                <h3 className="text-lg font-semibold">Precipitation</h3>
              </div>
              <div className="text-3xl font-bold">
                {weatherData.precipitation}%
              </div>
            </div>
          </div>
        </div>
      )}
      {!weatherData && (
        <div className="mx-auto bg-yellow-50/90 backdrop-blur-lg shadow-2xl py-16 px-8">
          <div className="flex items-center gap-4 text-red-600">
            <InformationCircleIcon className="w-16 h-16 bg-red-600 text-white rounded-full" />
            <div>
              <h2 className="text-2xl font-bold">No Weather Data Available</h2>
              <p className="mt-2 text-xl">
                Search for a city to view weather information
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
