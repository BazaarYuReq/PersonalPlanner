"use client";
import { useState } from "react";
import ReturnButton from "@/components/ui/returnbutton"

export default function WeatherApp({ setActiveApp }) {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=ffc74c9e41d3cd99bf6bb25a7f582a7a`
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "City not found");
        return;
      }

      setWeather(data);
    } catch {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
  <main >
    <ReturnButton setActiveApp={setActiveApp}/>
    <div className="min-h-screen flex items-center justify-center border-2 border-black bg-blue-600">
      <div className="p-6 w-80 text-center h-[600px]">
        <h1 className="text-2xl font-bold mb-4 text-white">
          Weather App
        </h1>

        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-2 mb-3 rounded border-[5px] border-black focus:outline-none"
        />

        <button
          onClick={getWeather}
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50 transition"
        >
          {loading ? "Loading..." : "Get Weather"}
        </button>

        {error && (
          <p className="text-red-600 mt-3 text-sm font-semibold">
            {error}
          </p>
        )}

        {weather && (
  <div className="mt-5 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 p-4 text-white shadow-lg ">
    {/* City + Main Weather */}
    <div className="flex items-center justify-between mb-3">
      <div>
        <h2 className="text-xl font-bold">{weather.name}</h2>
        <p className="capitalize text-sm opacity-90">
          {weather.weather[0].description}
        </p>
      </div>
      <div className="text-4xl font-bold">
        {Math.round(weather.main.temp)}°
      </div>
    </div>

    {/* Stats Grid */}
    <div className="grid grid-cols-2 gap-3 text-sm">
      <div className="bg-white/20 rounded-lg p-2">
        <p className="opacity-80">Pressure</p>
        <p className="font-semibold">{weather.main.pressure} hPa</p>
      </div>

      <div className="bg-white/20 rounded-lg p-2">
        <p className="opacity-80">Clouds</p>
        <p className="font-semibold">{weather.clouds.all}%</p>
      </div>

      <div className="bg-white/20 rounded-lg p-2">
        <p className="opacity-80">Wind</p>
        <p className="font-semibold">{weather.wind.speed} m/s</p>
      </div>

      <div className="bg-white/20 rounded-lg p-2">
        <p className="opacity-80">Coordinates</p>
        <p className="font-semibold text-xs">
          {weather.coord.lat}, {weather.coord.lon}
        </p>
      </div>
    </div>
  </div>
)}

      </div>
    </div></main>
  );
}
