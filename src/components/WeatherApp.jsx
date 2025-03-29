import { useState } from "react";
import {
  MagnifyingGlassIcon,
  SunIcon,
  CloudArrowDownIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const WeatherApp = () => {
  const [location, setLocation] = useState("");
  const [unit, setUnit] = useState("C");

  // Mock data for UI demonstration
  const weatherData = {
    temp: 22,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    icon: "🌤️",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 p-4 sm:p-8 flex items-center justify-center">
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl w-full max-w-md p-6 transition-all duration-300 hover:shadow-2xl">
        {/* Search Bar */}
        <div className="relative mb-6">
          <form className="flex gap-2">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter city name"
              className="w-full p-3 pl-4 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:ring-0 focus:outline-none transition-all"
            />
            <button
              type="submit"
              className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
            >
              <MagnifyingGlassIcon className="w-6 h-6" />
            </button>
          </form>
        </div>

        {/* Loading State */}
        {/* <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div> */}

        {/* Error State */}
        {/* <div className="bg-red-100 p-4 rounded-lg flex items-center gap-2 text-red-700 mb-6">
          <ExclamationTriangleIcon className="w-6 h-6" />
          <span>City not found</span>
        </div> */}

        {/* Weather Display */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">New York</h2>
            <p className="text-gray-500">Thursday, 15 Sept</p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="text-8xl">{weatherData.icon}</div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="text-5xl font-bold text-gray-800">
                  {weatherData.temp}°
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setUnit("C")}
                    className={`px-2 py-1 rounded-lg ${
                      unit === "C" ? "bg-blue-500 text-white" : "bg-gray-100"
                    }`}
                  >
                    C
                  </button>
                  <button
                    onClick={() => setUnit("F")}
                    className={`px-2 py-1 rounded-lg ${
                      unit === "F" ? "bg-blue-500 text-white" : "bg-gray-100"
                    }`}
                  >
                    F
                  </button>
                </div>
              </div>
              <p className="text-gray-500 text-xl mt-2">
                {weatherData.condition}
              </p>
            </div>
          </div>

          {/* Weather Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <CloudArrowDownIcon className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Humidity</p>
                  <p className="font-bold text-lg">{weatherData.humidity}%</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <SunIcon className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Wind Speed</p>
                  <p className="font-bold text-lg">
                    {weatherData.windSpeed} km/h
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
