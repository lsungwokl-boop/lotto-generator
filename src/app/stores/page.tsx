'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import WeatherWidget from "@/components/WeatherWidget";

// 부산 로또 명당 TOP 5 데이터
const lottoStores = [
  {
    id: 1,
    name: '부일카서비스',
    address: '부산 동구 자성로 133번길 35',
    wins: '1등 40+회 배출',
    description: '전국구 로또 성지! 부산을 넘어 대한민국 최고의 명당 중 하나로 손꼽히는 곳입니다.',
    mapUrl: 'https://maps.google.com/maps?q=부산 동구 자성로 133번길 35&t=&z=15&ie=UTF8&iwloc=&output=embed'
  },
  {
    id: 2,
    name: '뉴빅마트',
    address: '부산 기장군 정관중앙로 48',
    wins: '1등 다수 배출',
    description: '최근 당첨자를 무더기로 배출하며 신흥 명당으로 떠오른 기장의 핫플레이스입니다.',
    mapUrl: 'https://maps.google.com/maps?q=부산 기장군 정관중앙로 48&t=&z=15&ie=UTF8&iwloc=&output=embed'
  },
  {
    id: 3,
    name: '팡팡복권방',
    address: '부산 부산진구 가야대로 705',
    wins: '1등 10+회 배출',
    description: '서면 중심가와 가까워 접근성이 매우 뛰어나며, 오랜 세월 당첨자를 꾸준히 내놓고 있습니다.',
    mapUrl: 'https://maps.google.com/maps?q=부산 부산진구 가야대로 705&t=&z=15&ie=UTF8&iwloc=&output=embed'
  },
  {
    id: 4,
    name: '세원로또복권방',
    address: '부산 수영구 수영로 723',
    wins: '1등 다수 배출',
    description: '수영구 최고의 명당! 주변 유동인구가 많아 주말이면 긍정적인 에너지가 가득합니다.',
    mapUrl: 'https://maps.google.com/maps?q=부산 수영구 수영로 723&t=&z=15&ie=UTF8&iwloc=&output=embed'
  },
  {
    id: 5,
    name: '로또명당 해운대점',
    address: '부산 해운대구 해운대로 608',
    wins: '1등 10+회 배출',
    description: '바다의 기운을 담아! 해운대 여행 객들과 지역 주민 모두에게 사랑받는 행운의 장소입니다.',
    mapUrl: 'https://maps.google.com/maps?q=부산 해운대구 해운대로 608&t=&z=15&ie=UTF8&iwloc=&output=embed'
  }
];

export default function StoresPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    const theme = newMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  return (
    <div className="min-h-screen transition-colors duration-500 pb-20">
      <nav className="fixed top-0 w-full z-50 glass-card px-6 py-4 flex justify-between items-center border-b border-white/10">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-primary to-accent rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg rotate-3">7</div>
            <span className="text-xl font-black tracking-tighter">PREMIUM LOTTO</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 border-l border-white/10 pl-6 h-6">
            <Link href="/about" className="text-sm font-bold text-secondary hover:text-primary transition-colors">소개</Link>
            <Link href="/stores" className="text-sm font-bold text-primary transition-colors">명당 리스트</Link>
            <Link href="/blog" className="text-sm font-bold text-secondary hover:text-primary transition-colors">블로그</Link>
          </div>
        </div>
        <WeatherWidget />
        <button onClick={toggleDarkMode} className="p-3 rounded-2xl bg-secondary/10 hover:bg-secondary/20 transition-all border border-secondary/5">
          {isDarkMode ? '🌞' : '🌙'}
        </button>
      </nav>

      <main className="pt-32 px-4 max-w-5xl mx-auto space-y-12 animate-fade-in">
        <section className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none mb-4">
            부산 로또 명당 <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">TOP 5</span>
          </h1>
          <p className="text-secondary font-medium text-lg">
            행운의 기운이 가득한 부산 최고의 1등 배출점을 지도와 함께 확인하세요! 🍀
          </p>
        </section>

        <section className="space-y-8">
          {lottoStores.map((store, idx) => (
            <div 
              key={store.id} 
              className="glass-card rounded-[2.5rem] p-6 md:p-8 border border-white/10 shadow-lg flex flex-col md:flex-row gap-8 animate-pop-in relative overflow-hidden group"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="md:w-1/2 flex flex-col justify-center space-y-4">
                <div className="inline-block bg-primary/10 text-primary font-bold px-4 py-1.5 rounded-full text-sm w-max border border-primary/20">
                  TOP {store.id}
                </div>
                <h2 className="text-3xl font-black">{store.name}</h2>
                <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-orange-500">
                  🏆 {store.wins}
                </div>
                <p className="text-secondary leading-relaxed">
                  {store.description}
                </p>
                <div className="flex items-center gap-2 pt-2 text-sm font-medium">
                  <span>📍</span>
                  <span>{store.address}</span>
                </div>
              </div>
              
              <div className="md:w-1/2 h-64 md:h-80 rounded-[1.5rem] overflow-hidden shadow-inner border border-white/10 group-hover:border-primary/30 transition-colors">
                <iframe 
                  src={store.mapUrl} 
                  className="w-full h-full border-0" 
                  aria-hidden="false" 
                  tabIndex={0}
                  loading="lazy"
                  title={`${store.name} 위치`}
                ></iframe>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
