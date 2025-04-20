export const AQIDisplay = ({ aqi, airQuality }) => {
  // AQI scale information
  const aqiScale = [
    {
      level: "Good",
      range: "0-50",
      color: "bg-green-500",
      text: "text-green-500",
    },
    {
      level: "Moderate",
      range: "51-100",
      color: "bg-yellow-500",
      text: "text-yellow-500",
    },
    {
      level: "Unhealthy for Sensitive",
      range: "101-150",
      color: "bg-orange-500",
      text: "text-orange-500",
    },
    {
      level: "Unhealthy",
      range: "151-200",
      color: "bg-red-500",
      text: "text-red-500",
    },
    {
      level: "Very Unhealthy",
      range: "201-300",
      color: "bg-purple-500",
      text: "text-purple-500",
    },
    {
      level: "Hazardous",
      range: "301+",
      color: "bg-red-800",
      text: "text-red-800",
    },
  ];

  // Get current AQI level
  const currentLevel =
    aqi !== null ? aqiScale[Math.min(Math.floor(aqi / 50), 5)] : null;

  return (
    <div className="bg-gray-50 p-6 rounded-xl mb-7">
      <div className="flex items-center gap-3 mb-4">
        <svg
          className="w-8 h-8 text-gray-700"
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
        <h3 className="text-lg font-semibold">Air Quality</h3>
      </div>

      {aqi !== null ? (
        <>
          <div className="flex items-center gap-4 mb-4">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center ${currentLevel.color} text-white text-2xl font-bold`}
            >
              {aqi}
            </div>
            <div>
              <div className="font-semibold">{currentLevel.level}</div>
              <div className="text-sm text-gray-500">
                US AQI {currentLevel.range}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>PM2.5:</span>
              <span className="font-medium">
                {airQuality.pm2_5?.toFixed(1) || "--"} µg/m³
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>PM10:</span>
              <span className="font-medium">
                {airQuality.pm10?.toFixed(1) || "--"} µg/m³
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>CO:</span>
              <span className="font-medium">
                {airQuality.co?.toFixed(1) || "--"} ppm
              </span>
            </div>
          </div>
        </>
      ) : (
        <div className="text-gray-500">Air quality data not available</div>
      )}
    </div>
  );
};
