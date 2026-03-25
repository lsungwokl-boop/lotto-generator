'use client';

import Link from 'next/link';
import WeatherWidget from "@/components/WeatherWidget";
import ThemeToggle from "@/components/ThemeToggle";

export default function AboutPage() {
  return (
    <div className="min-h-screen transition-colors duration-500 pb-20">
      <nav className="fixed top-0 w-full z-50 glass-card px-6 py-4 flex justify-between items-center border-b border-white/10">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-primary to-accent rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg rotate-3">7</div>
            <span className="text-xl font-black tracking-tighter">PREMIUM LOTTO</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 border-l border-white/10 pl-6 h-6">
            <Link href="/about" className="text-sm font-bold text-primary transition-colors">소개</Link>
            <Link href="/stores" className="text-sm font-bold text-secondary hover:text-primary transition-colors">명당 리스트</Link>
            <Link href="/blog" className="text-sm font-bold text-secondary hover:text-primary transition-colors">블로그</Link>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <WeatherWidget />
          <ThemeToggle />
        </div>
      </nav>

      <main className="pt-32 px-4 max-w-4xl mx-auto space-y-12 animate-fade-in">
        <section className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none mb-4">
            서비스 <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">소개</span>
          </h1>
        </section>

        <section className="glass-card rounded-[3rem] p-8 md:p-14 shadow-2xl border border-white/5 space-y-8">
          <div>
            <h2 className="text-2xl font-black mb-4">🎯 사이트 운영 목적</h2>
            <p className="text-secondary leading-relaxed">
              본 사이트는 지역 주민분들을 위한 유용한 생활 정보(행사, 축제, 지원금, 혜택 등)를 매일 새롭게 제공하고, 소소한 일상의 재미를 위해 프리미엄 로또 번호 생성 및 명당 안내 서비스를 함께 운영하고 있습니다.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-black mb-4">📊 데이터 출처</h2>
            <p className="text-secondary leading-relaxed">
              제공되는 모든 공공 정보는 대한민국 <strong>공공데이터포털(data.go.kr)</strong>의 신뢰할 수 있는 공식 API 데이터를 기반으로 자동으로 수집됩니다.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-black mb-4">🤖 콘텐츠 생성 방식</h2>
            <p className="text-secondary leading-relaxed">
              수집된 원시 공공데이터는 읽기 편하고 친근한 톤의 블로그 형태 글로 재가공됩니다. 이 과정에서 최신 <strong>AI(Gemini) 모델을 활용</strong>하여 콘텐츠를 자동 생성하고 있으며, 모든 생성된 글의 하단에는 정확한 원본 비교를 위해 출처 링크를 명시하고 있습니다.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
