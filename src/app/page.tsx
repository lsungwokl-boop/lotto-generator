import Link from "next/link";
import fs from "fs";
import path from "path";
import LottoGenerator from "@/components/LottoGenerator";
import AdBanner from "@/components/AdBanner";
import FortuneAnalysis from "@/components/FortuneAnalysis";
import AiAnalysis from "@/components/AiAnalysis";
import WeatherWidget from "@/components/WeatherWidget";

export default function Home() {
  const dataPath = path.join(process.cwd(), 'public', 'data', 'local-info.json');
  let localInfo: any[] = [];
  if (fs.existsSync(dataPath)) {
    try {
      localInfo = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    } catch(e) {}
  }

  // 최신 데이터 필터링
  const eventInfo = localInfo.filter(item => item.category === "행사").slice(-2).reverse();
  const serviceInfo = localInfo.filter(item => item.category === "혜택" || item.category === "지원금").slice(-2).reverse();

  return (
    <div className="min-h-screen transition-colors duration-500 pb-20">
      {/* 프리미엄 네비게이션 */}
      <nav className="fixed top-0 w-full z-50 glass-card px-6 py-4 flex justify-between items-center border-b border-white/10">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-primary to-accent rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg rotate-3">7</div>
            <span className="text-xl font-black tracking-tighter">PREMIUM LOTTO</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 border-l border-white/10 pl-6 h-6">
            <Link href="/about" className="text-sm font-bold text-secondary hover:text-primary transition-colors">소개</Link>
            <Link href="/stores" className="text-sm font-bold text-secondary hover:text-primary transition-colors">명당 리스트</Link>
            <Link href="/blog" className="text-sm font-bold text-secondary hover:text-primary transition-colors">블로그</Link>
          </div>
        </div>
        <WeatherWidget />
      </nav>

      <main className="pt-28 px-4 max-w-4xl mx-auto space-y-12">
        
        {/* 히어로 섹션 */}
        <section className="text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-4">
            오늘 당신의 <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">행운은 몇 번?</span>
          </h1>
          <p className="text-secondary font-medium text-lg">
            최신 알고리즘으로 추출하는 6+1 행운의 번호
          </p>
        </section>

        {/* 로또 생성기 (클라이언트 컴포넌트) */}
        <LottoGenerator />

        {/* 신규 기능: 오늘의 운세 및 행운의 숫자 */}
        <FortuneAnalysis />

        {/* 신규 기능: AI 번호 분석 및 추천 */}
        <AiAnalysis />

        {/* 3. 최신 지역 행사 섹션 */}
        <section id="events" className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between px-4">
            <h2 className="text-2xl font-black tracking-tight">최신 지역 <span className="text-accent">행사/축제</span></h2>
            <Link href="/blog" className="text-xs font-bold text-secondary hover:text-primary transition-colors">더보기</Link>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {eventInfo.length > 0 ? eventInfo.map((info, idx) => (
              <div key={idx} className="glass-card rounded-[2rem] p-6 border border-white/10 shadow-lg group hover:border-accent/30 transition-all">
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Event",
                    "name": info.name,
                    "startDate": info.startDate,
                    "endDate": info.endDate,
                    "location": { "@type": "Place", "name": info.location, "address": info.location },
                    "description": info.summary
                  }) }}
                />
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-accent/10 text-accent px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">EVENT</span>
                    <span className="text-[10px] text-secondary font-bold">{info.startDate} ~ {info.endDate}</span>
                  </div>
                  <h3 className="text-xl font-black">{info.name}</h3>
                  <p className="text-sm text-secondary leading-relaxed line-clamp-2">{info.summary}</p>
                </div>
              </div>
            )) : (
              <div className="text-center py-10 opacity-30 text-xs font-bold">새로운 행사가 곧 업데이트됩니다.</div>
            )}
          </div>
        </section>

        {/* 광고 배치 */}
        <AdBanner />

        {/* 4. 최신 행정 혜택 섹션 */}
        <section id="benefits" className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between px-4">
            <h2 className="text-2xl font-black tracking-tight">최신 행정 <span className="text-primary">혜택/지원금</span></h2>
            <Link href="/blog" className="text-xs font-bold text-secondary hover:text-primary transition-colors">더보기</Link>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {serviceInfo.length > 0 ? serviceInfo.map((info, idx) => (
              <div key={idx} className="glass-card rounded-[2rem] p-6 border border-white/10 shadow-lg group hover:border-primary/30 transition-all">
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "GovernmentService",
                    "name": info.name,
                    "description": info.summary,
                    "provider": { "@type": "GovernmentOrganization", "name": "부산광역시" }
                  }) }}
                />
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">BENEFIT</span>
                    <span className="text-[10px] text-secondary font-bold">상시 접수</span>
                  </div>
                  <h3 className="text-xl font-black">{info.name}</h3>
                  <p className="text-sm text-secondary leading-relaxed line-clamp-2">{info.summary}</p>
                </div>
              </div>
            )) : (
              <div className="text-center py-10 opacity-30 text-xs font-bold">새로운 혜택이 곧 업데이트됩니다.</div>
            )}
          </div>
        </section>

        {/* 4. 명언/당첨 정보 */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12 text-sm">
          <div className="glass-card p-8 rounded-[2.5rem] space-y-4">
            <h3 className="font-black text-xl">💡 행운의 팁</h3>
            <p className="text-secondary leading-relaxed">
              로또는 매주 수백만 명이 참여하는 확률 게임입니다. <br/>
              너무 큰 기대보다는 일상의 즐거움으로 한 주를 채우는 용도로 즐기시는 것이 가장 좋습니다!
            </p>
          </div>
          <div className="glass-card p-8 rounded-[2.5rem] space-y-4 border-l-4 border-accent">
            <h3 className="font-black text-xl">🛡️ 정보 보호</h3>
            <p className="text-secondary leading-relaxed">
              이 사이트는 생성된 번호를 사용자님의 브라우저에만 임시로 저장하며, 외부 서버로 전송하거나 누구와도 공유하지 않습니다.
            </p>
          </div>
        </section>

      </main>

      <footer className="py-12 text-center space-y-4 opacity-50 text-xs font-medium">
        <p>© 2026 PREMIUM LOTTO MACHINE. ALL RIGHTS RESERVED.</p>
        <Link href="/privacy" className="hover:text-primary transition-colors cursor-pointer underline">개인정보처리방침</Link>
      </footer>
    </div>
  );
}
