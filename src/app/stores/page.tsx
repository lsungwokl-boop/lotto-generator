'use client';

import Link from 'next/link';
import WeatherWidget from "@/components/WeatherWidget";
import ThemeToggle from "@/components/ThemeToggle";

// 전국 로또 명당 TOP 5 데이터
const lottoStores = [
  {
    id: 1,
    name: '부일카서비스 (부산)',
    address: '부산 동구 자성로 133번길 35',
    wins: '1등 40회 이상 배출',
    description: '대한민국 로또의 성지라고 불리는 곳입니다. 전국에서 가장 많은 당첨자를 배출한 전설의 명당입니다.',
    mapUrl: 'https://maps.google.com/maps?q=부산 동구 자성로 133번길 35&t=&z=15&ie=UTF8&iwloc=&output=embed'
  },
  {
    id: 2,
    name: '스파 (서울 노원)',
    address: '서울 노원구 동일로 1493 상계주공아파트',
    wins: '1등 35회 이상 배출',
    description: '서울의 자존심! 노원구 상계동에 위치한 이곳은 주말이면 번호표를 뽑고 기다릴 정도로 인기가 많습니다.',
    mapUrl: 'https://maps.google.com/maps?q=서울 노원구 동일로 1493&t=&z=15&ie=UTF8&iwloc=&output=embed'
  },
  {
    id: 3,
    name: '잠실매점 (서울 송파)',
    address: '서울 송파구 올림픽로 269 잠실역 8번 출구 앞',
    wins: '1등 15회 이상 배출',
    description: '잠실역 출구 바로 앞에 위치하여 직장인들의 성지로 불립니다. 퇴근길 줄이 끊이지 않는 곳입니다.',
    mapUrl: 'https://maps.google.com/maps?q=서울 송파구 올림픽로 269&t=&z=15&ie=UTF8&iwloc=&output=embed'
  },
  {
    id: 4,
    name: '복권명당 (대구)',
    address: '대구 달서구 월배로 122',
    wins: '1등 10회 이상 배출',
    description: '대구 지역 최고의 명당으로 손꼽히며, 영남권 로또 마니아들이 꼭 들르는 필수 코스입니다.',
    mapUrl: 'https://maps.google.com/maps?q=대구 달서구 월배로 122&t=&z=15&ie=UTF8&iwloc=&output=embed'
  },
  {
    id: 5,
    name: '팡팡복권방 (부산 서면)',
    address: '부산 부산진구 가야대로 705',
    wins: '1등 10회 이상 배출',
    description: '부산 서면의 기운을 담은 명당! 접근성이 좋아 젊은 층부터 어르신들까지 모두가 즐겨 찾습니다.',
    mapUrl: 'https://maps.google.com/maps?q=부산 부산진구 가야대로 705&t=&z=15&ie=UTF8&iwloc=&output=embed'
  }
];

export default function StoresPage() {
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
        <div className="flex items-center gap-3">
          <WeatherWidget />
          <ThemeToggle />
        </div>
      </nav>

      <main className="pt-32 px-4 max-w-5xl mx-auto space-y-12 animate-fade-in">
        <section className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none mb-4">
            전국 로또 명당 <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">TOP 5</span>
          </h1>
          <p className="text-secondary font-medium text-lg">
            대한민국 행운의 기운이 모이는 전국 최고의 1등 배출점을 확인하세요! 🍀
          </p>
        </section>

        <section className="space-y-8">
          {lottoStores.map((store, idx) => (
            <div 
              key={store.id} 
              className="glass-card rounded-[2.5rem] p-6 md:p-8 border border-white/10 shadow-lg flex flex-col md:flex-row gap-8 animate-pop-in relative overflow-hidden group hover:border-primary/30 transition-all"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="md:w-1/2 flex flex-col justify-center space-y-4">
                <div className="inline-block bg-primary/10 text-primary font-bold px-4 py-1.5 rounded-full text-sm w-max border border-primary/20">
                  RANK {idx + 1}
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
              
              <div className="md:w-1/2 h-64 md:h-80 rounded-[1.5rem] overflow-hidden shadow-inner border border-white/10 group-hover:border-primary/20 transition-colors">
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
