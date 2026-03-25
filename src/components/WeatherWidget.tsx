'use client';

import { useState, useEffect } from 'react';

export default function WeatherWidget() {
  const [weather, setWeather] = useState<{ temp: number; icon: string; description: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
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
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Weather API Error:", errorData);
          throw new Error(errorData.message || "날씨 정보를 불러올 수 없습니다.");
        }

        const data = await response.json();
        
        if (data.main) {
          setWeather({
            temp: Math.round(data.main.temp),
            icon: data.weather[0].icon,
            description: data.weather[0].description
          });
        }
      } catch (err: any) {
        console.error("Weather fetch error:", err);
        setError(err.message);
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
  
  if (error || !weather) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 rounded-xl text-[10px] font-bold text-red-500 border border-red-500/20">
        <span>⚠️ 날씨 오류</span>
        <span className="opacity-70 hidden md:inline">{error || "연결 실패"}</span>
      </div>
    );
  }

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
