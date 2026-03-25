'use client';

import { useState, useEffect } from 'react';

export default function WeatherWidget() {
  const [weather, setWeather] = useState<{ temp: number; icon: string; description: string } | null>(null);
  const [loading, setLoading] = useState(true);
  
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  const isEnabled = apiKey && apiKey !== "나중에_입력" && apiKey.trim() !== "";

  useEffect(() => {
    if (!isEnabled) {
      setLoading(false);
      return;
    }

    const fetchWeather = async () => {
      try {
        // 부산(Busan) 기준 날씨 정보 가져오기
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Busan&units=metric&appid=${apiKey}&lang=kr`
        );
        const data = await response.json();
        
        if (data.main) {
          setWeather({
            temp: Math.round(data.main.temp),
            icon: data.weather[0].icon,
            description: data.weather[0].description
          });
        }
      } catch (error) {
        console.error("Weather fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [apiKey, isEnabled]);

  if (!isEnabled) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-xl text-[10px] font-bold text-secondary/50 border border-secondary/5">
        <span>📍 부산</span>
        <span className="opacity-50">API 키 필요</span>
      </div>
    );
  }

  if (loading) return <div className="animate-pulse bg-secondary/10 w-24 h-8 rounded-xl"></div>;
  if (!weather) return null;

  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-primary/5 hover:bg-primary/10 transition-all rounded-xl border border-primary/10 group cursor-default shadow-sm">
      <div className="relative w-8 h-8">
        <img 
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} 
          alt={weather.description}
          className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-black tracking-tight">{weather.temp}°C</span>
          <span className="w-1 h-1 rounded-full bg-primary/30"></span>
          <span className="text-[10px] font-bold text-secondary uppercase tracking-tighter">Busan</span>
        </div>
        <span className="text-[9px] font-medium text-secondary/60 leading-none">{weather.description}</span>
      </div>
    </div>
  );
}
