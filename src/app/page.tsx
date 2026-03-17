import Link from "next/link";
import localInfo from "../../public/data/local-info.json";

interface InfoItem {
  id: string;
  title: string;
  category: string;
  startDate: string;
  endDate: string;
  location: string;
  target: string;
  summary: string;
  link: string;
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans text-[#212529]">
      {/* 1. 부산시청 스타일의 미니멀 헤더 */}
      <header className="bg-white border-b border-[#dee2e6] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-[#004ea2] flex items-center gap-2">
              <span className="w-8 h-8 bg-[#004ea2] rounded-lg flex items-center justify-center text-white text-xs">정보</span>
              성남시 생활정보
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-8 text-[15px] font-bold text-[#495057]">
              <Link href="#" className="hover:text-[#004ea2] transition-colors">공지사항</Link>
              <Link href="#" className="hover:text-[#004ea2] transition-colors">민원안내</Link>
              <Link href="#" className="hover:text-[#004ea2] transition-colors">분야별정보</Link>
            </nav>
            <button className="p-2.5 rounded-full bg-[#f1f3f5] hover:bg-[#e9ecef] transition-colors">
              <svg className="w-5 h-5 text-[#495057]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-16">
        {/* 히어로/배너 섹션 */}
        <section className="bg-gradient-to-r from-[#004ea2] to-[#007bff] rounded-[2rem] p-10 text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              성남의 내일을 여는<br />생활 정보 플랫폼
            </h2>
            <p className="text-blue-100 text-sm md:text-base max-w-xl leading-relaxed opacity-90">
              성남시민을 위한 최신 행사 소식부터 풍성한 지원금 혜택까지,<br />
              꼭 필요한 정보를 정직하고 빠르게 전달해 드립니다.
            </p>
          </div>
          {/* 장식용 패턴 (부산시청 느낌의 기하학 패턴 생략, 단순한 구 형태로 대체) */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-1/2 w-48 h-48 bg-blue-400/20 rounded-full blur-2xl"></div>
        </section>

        {/* 2. 이번 달 행사/축제 (카드 그리드) */}
        <section>
          <div className="flex items-center justify-between mb-8 border-b-2 border-[#004ea2] pb-4">
            <h2 className="text-2xl font-black text-[#212529] tracking-tight">문화 · 관광 소식</h2>
            <Link href="#" className="text-sm font-bold text-[#868e96] hover:text-[#004ea2] flex items-center gap-1 group">
              전체보기 <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {localInfo.events.map((event: InfoItem) => (
              <div 
                key={event.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#e9ecef] shadow-sm hover:shadow-xl hover:border-[#dee2e6] transition-all duration-300 flex flex-col"
              >
                <div className="h-40 bg-[#f1f3f5] flex items-center justify-center text-4xl group-hover:scale-105 transition-transform duration-500">
                  {event.id === "event-1" ? "🌸" : event.id === "event-2" ? "💻" : "🎈"}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-[#e7f5ff] text-[#004ea2] text-[11px] font-black px-2.5 py-1 rounded-md">
                      {event.category}
                    </span>
                    <span className="text-[#adb5bd] text-[11px] font-medium tracking-tighter uppercase">{event.startDate}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-[#212529] line-clamp-2 leading-snug">
                    {event.title}
                  </h3>
                  <p className="text-[#868e96] text-[13px] line-clamp-2 leading-relaxed mb-6">
                    {event.summary}
                  </p>
                  <div className="mt-auto pt-4 border-t border-[#f1f3f5] flex items-center justify-between text-[#868e96] text-[12px]">
                    <span className="flex items-center gap-1">📍 {event.location}</span>
                    <Link href={`/info/${event.id}`} className="text-[#004ea2] font-bold">상세보기</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. 지원금/혜택 정보 (리스트/카드 혼합) */}
        <section className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-[#dee2e6] shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-black text-[#212529]">복지 · 혜택 안내</h2>
            <div className="flex gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff4d4f]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffc107]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#20c997]"></span>
            </div>
          </div>
          <div className="grid gap-6">
            {localInfo.benefits.map((benefit: InfoItem) => (
              <div 
                key={benefit.id}
                className="group p-6 rounded-2xl bg-[#f8f9fa] border border-transparent hover:border-[#004ea2] hover:bg-white transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[#20c997] font-black text-[10px] tracking-widest uppercase mb-1">Benefit No.{benefit.id.split('-')[1]}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#212529] group-hover:text-[#004ea2] transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-[#868e96] text-[14px] leading-relaxed max-w-2xl">
                      {benefit.summary}
                    </p>
                  </div>
                  <Link 
                    href={`/info/${benefit.id}`}
                    className="shrink-0 inline-flex items-center justify-center bg-white border-2 border-[#dee2e6] text-[#495057] font-bold py-3 px-6 rounded-xl hover:bg-[#004ea2] hover:border-[#004ea2] hover:text-white transition-all duration-300 text-sm shadow-sm"
                  >
                    지금 확인하기
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 4. 부산시청 스타일의 정돈된 푸터 */}
      <footer className="bg-[#343a40] text-white py-16 mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start gap-10">
            <div className="space-y-6">
              <h2 className="text-xl font-black opacity-80 mb-6 tracking-tight">성남시 생활정보</h2>
              <div className="flex gap-6 text-[13px] font-bold text-gray-400">
                <Link href="#" className="hover:text-white transition-colors">개인정보처리방침</Link>
                <Link href="#" className="hover:text-white transition-colors">이용약관</Link>
                <Link href="#" className="hover:text-white transition-colors">사이트맵</Link>
              </div>
              <p className="text-gray-500 text-[12px] leading-loose max-w-sm">
                본 웹사이트는 공공데이터를 기반으로 시민들에게 유용한 생활 정보를 제공하는 공익 목적의 서비스입니다. 
                모든 정보는 매일 아침 자동으로 업데이트됩니다.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-12">
              <div>
                <span className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-4">데이터 출처</span>
                <span className="text-sm font-bold opacity-80">공공데이터포털</span>
              </div>
              <div>
                <span className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-4">최종 업데이트</span>
                <span className="text-sm font-bold opacity-80">{localInfo.lastUpdated}</span>
              </div>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-gray-500 font-medium">
            <p>© 2026 Seongnam-si Life Info. All rights reserved.</p>
            <div className="flex gap-4">
              <span className="px-2 py-0.5 rounded bg-gray-700 text-gray-400">Web Accessibility Verified</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
