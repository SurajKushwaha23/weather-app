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
  ShareIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";
import { AQIDisplay } from "../components/AQIDisplay";
import { VoiceSearch } from "./VoiceSearch";
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

  const handleVoiceSearch = (query) => {
    setSearchQuery(query);
    fetchData(query);
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
      console.log(data.current);
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
        // Add AQI data
        aqi: data.current.air_quality?.["us-epa-index"] || null,
        airQuality: {
          co: data.current.air_quality?.co || null,
          no2: data.current.air_quality?.no2 || null,
          o3: data.current.air_quality?.o3 || null,
          so2: data.current.air_quality?.so2 || null,
          pm2_5: data.current.air_quality?.pm2_5 || null,
          pm10: data.current.air_quality?.pm10 || null,
        },
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

  // Add share functionality
  const shareWeather = (platform) => {
    if (!weatherData) return;

    const shareText = `Current weather in ${weatherData.name}, ${
      weatherData.country
    }: 
    🌡️ Temperature: ${displayTemp}°${unit} (Feels like ${displayFeelsLike}°)
    ☁️ Condition: ${weatherData.condition}
    💧 Humidity: ${weatherData.humidity}%
    🌬️ Wind: ${weatherData.windSpeed} km/h
   🌫️ Air Quality: ${
     weatherData.aqi !== null
       ? `US AQI ${weatherData.aqi} (${getAQILevel(weatherData.aqi)})`
       : "Data not available"
   }`;

    const encodedText = encodeURIComponent(shareText);
    const url = encodeURIComponent(window.location.href);

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodedText}&url=${url}`
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodedText}`
        );
        break;
      case "whatsapp":
        window.open(`https://wa.me/?text=${encodedText} ${url}`);
        break;
      default:
        if (navigator.share) {
          navigator
            .share({
              title: `Weather in ${weatherData.name}`,
              text: shareText,
              url: window.location.href,
            })
            .catch((err) => console.log("Error sharing:", err));
        } else {
          // Fallback for browsers that don't support Web Share API
          alert("Share this weather:\n\n" + shareText);
        }
    }
  };

  // Add this to your JSX where you want the share buttons to appear
  // For example, you can add it near the unit toggle buttons
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-4 md:p-8 relative">
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
                className="w-full md:text-2xl text-xl p-4 bg-transparent text-white placeholder-gray-300 focus:outline-none focus:border-white/60 transition-all"
              />
              <div className="flex items-center gap-2">
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="p-2 text-white/50 hover:text-white transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                )}
                <VoiceSearch onSearch={handleVoiceSearch} />
              </div>
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
        <div className="mx-auto bg-yellow-50/90 backdrop-blur-lg rounded-b-lg shadow-2xl md:p-8 p-6">
          <div className="md:flex ms:flex-col-reverse md:justify-between md:items-center mb-8">
            <div className="mb-4 md:mb-0">
              <h1 className="md:text-4xl text-3xl font-bold text-gray-800">
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
              <button
                onClick={() => shareWeather("twitter")}
                className="bg-blue-400 px-3 py-2 rounded-lg text-white hover:bg-blue-500 transition-colors"
                aria-label="Share on Twitter"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </button>
              <button
                onClick={() => shareWeather("facebook")}
                className=" bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                aria-label="Share on Facebook"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                onClick={() => shareWeather("whatsapp")}
                className=" bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition-colors"
                aria-label="Share on WhatsApp"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </button>
              <button
                onClick={() => shareWeather()}
                className=" bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                aria-label="Share"
              >
                <ShareIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Weather Card */}
          <AQIDisplay
            aqi={weatherData.aqi}
            airQuality={weatherData.airQuality}
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Add the AQI component */}

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
