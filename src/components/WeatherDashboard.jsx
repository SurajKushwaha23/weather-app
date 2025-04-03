import { useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  GlobeAmericasIcon,
  ArrowPathIcon,
  ViewfinderCircleIcon,
  EyeIcon,
  BeakerIcon,
  XMarkIcon,
  ArrowTrendingUpIcon,
  AdjustmentsHorizontalIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";
const API_KEY = import.meta.env.VITE_WEATHERAPI_API_KEY;
const API_URL = import.meta.env.VITE_WEATHERAPI_API_URL;

const WeatherDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("India");
  const [unit, setUnit] = useState("C");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  // Update the temperature display based on unit
  const displayTemp = unit === "C" ? weatherData?.temp_c : weatherData?.temp_f;

  // Update feels-like temperature
  const displayFeelsLike =
    unit === "C" ? weatherData?.feelslike_c : weatherData?.feelslike_f;

  const fetchData = async (query) => {
    if (!query.trim()) {
      setError("Please enter a city or country");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}?key=${API_KEY}&q=${query}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error?.message || "Failed to fetch weather data"
        );
      }
      const data = await response.json();
      setWeatherData({
        temp_c: data.current.temp_c,
        temp_f: data.current.temp_f,
        feelslike_c: data.current.feelslike_c,
        feelslike_f: data.current.feelslike_f,
        name: data.location.name,
        condition: data.current.condition.text,
        img: data.current.condition.icon,
        date: formatDate(data.location.localtime),
        humidity: data.current.humidity,
        uvIndex: data.current.uv,
        pressure: data.current.pressure_mb,
        visibility: data.current.vis_miles,
        windSpeed: data.current.wind_kph,
        feelsLike: data.current.heatindex_c,
        latitude: data.location.lat,
        longitude: data.location.lon,
        precipitation: data.current.precip_in,
        country: data.location.country,
      });
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(searchQuery); // Initial fetch on mount
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(searchQuery);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-8 relative">
      <div className="top-0 left-0 w-full bg-white/7 backdrop-blur-lg rounded-t-lg z-50">
        <div className="max-w-6xl mx-auto p-4">
          <div className="relative">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <button
                type="submit"
                className="p-3 text-white/50 bg-white/7 rounded-md hover:text-white transition-colors cursor-pointer"
              >
                <MagnifyingGlassIcon className="w-8 h-8 cursor-pointer" />
              </button>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for Country or city..."
                className="w-full text-2xl p-4 bg-transparent text-white placeholder-gray-300 focus:outline-none focus:border-white/60 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="p-2 text-white/50 hover:text-white transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              )}
            </form>
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
        <div className="mx-auto bg-yellow-50/90 backdrop-blur-lg rounded-b-lg shadow-2xl p-8">
          <div className="md:flex ms:flex-col-reverse md:justify-between md:items-center mb-8">
            <div className="mb-4 md:mb-0">
              <h1 className="md:text-4xl text-2xl font-bold text-gray-800">
                {weatherData.name} , {weatherData.country}
              </h1>
              <p className="text-gray-500 text-lg">{weatherData.date}</p>
            </div>
            {/* Unit Toggle Buttons - Update to use proper state */}
            <div className="flex gap-2">
              <button
                onClick={() => setUnit("C")}
                className={`px-4 py-2 rounded-lg ${
                  unit === "C" ? "bg-blue-500 text-white" : "bg-gray-100"
                } hover:bg-blue-400 transition-colors`}
              >
                °C
              </button>
              <button
                onClick={() => setUnit("F")}
                className={`px-4 py-2 rounded-lg ${
                  unit === "F" ? "bg-blue-500 text-white" : "bg-gray-100"
                } hover:bg-blue-400 transition-colors`}
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
                  {/* Main Temperature */}
                  <div className="md:text-6xl text-3xl font-bold mb-2">
                    {displayTemp}°{unit}
                  </div>
                  <div className="text-2xl">{weatherData.condition}</div>
                </div>
                {/* <CloudIcon className="w-32 h-32 opacity-75" /> */}
                <div className="p-1">
                  <img
                    src={weatherData.img}
                    className="w-auto md:h-36 h-24"
                    alt="Weather Icon"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              {/* Feels Like */}
              <h2 className="text-xl font-semibold mb-4">
                Feels like {displayFeelsLike}°
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <GlobeAmericasIcon className="w-8 h-8 text-blue-700" />
                  <div>
                    <div className="text-gray-500">Latitude</div>
                    <div className="font-semibold">{weatherData.latitude}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <GlobeAmericasIcon className="w-8 h-8 text-yellow-500" />
                  <div>
                    <div className="text-gray-500">Longitude</div>
                    <div className="font-semibold">{weatherData.longitude}</div>
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
                {weatherData.pressure} mb
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
      {error && (
        <div className="mx-auto bg-red-50/90 backdrop-blur-lg shadow-2xl p-8 mb-8">
          <div className="flex items-center gap-4 text-red-600">
            <ExclamationTriangleIcon className="w-16 h-16 text-red-600" />
            <div>
              <h2 className="text-2xl font-bold">
                Error Fetching Weather Data
              </h2>
              <p className="mt-2 text-xl">{error}</p>
            </div>
          </div>
        </div>
      )}
      {!weatherData && !error && (
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
      {/* Brand footer */}
      <div className="w-full mt-8">
        <div className="flex flex-col items-center">
          <span className="text-gray-500 text-3xl md:text-5xl font-bold mb-4 flex items-center gap-2">
            Crafted with
            <HeartIcon className="w-10 h-10 text-red-400 animate-pulse" />
            by
          </span>
          <a
            href="mailto:Kushwahasuraj093@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 font-bold text-4xl transition-colors"
          >
            Suraj Kushwaha
          </a>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
