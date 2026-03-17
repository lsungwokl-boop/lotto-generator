import Link from "next/link";
import { notFound } from "next/navigation";
import localInfo from "../../../../public/data/local-info.json";

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

export async function generateStaticParams() {
  const allItems = [...localInfo.events, ...localInfo.benefits];
  return allItems.map((item) => ({
    id: item.id,
  }));
}

export default async function InfoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const allItems = [...localInfo.events, ...localInfo.benefits];
  const item = allItems.find((i) => i.id === id);

  if (!item) {
    notFound();
  }

  const isEvent = item.category === "행사";

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans text-[#212529]">
      {/* 미니멀 헤더 (메인과 동일) */}
      <header className="bg-white border-b border-[#dee2e6]">
        <div className="max-w-4xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <h1 className="text-xl font-black text-[#004ea2] flex items-center gap-2">
              <span className="w-8 h-8 bg-[#004ea2] rounded-lg flex items-center justify-center text-white text-xs">정보</span>
              성남시 생활정보
            </h1>
          </Link>
          <Link href="/" className="text-sm font-bold text-[#868e96] hover:text-[#004ea2] transition-colors">
            ← 목록으로 돌아가기
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white rounded-[2.5rem] shadow-sm border border-[#dee2e6] overflow-hidden">
          {/* 상단 포인트 영역 */}
          <div className={`h-4 py-0 ${isEvent ? "bg-[#004ea2]" : "bg-[#20c997]"}`}></div>
          
          <div className="p-8 md:p-12">
            <header className="mb-10">
              <div className={`inline-block px-3 py-1 rounded-md text-[11px] font-black uppercase tracking-wider mb-4 ${
                isEvent ? "bg-[#e7f5ff] text-[#004ea2]" : "bg-[#e6fffa] text-[#20c997]"
              }`}>
                {item.category} 안내
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-[#212529] leading-tight tracking-tight">
                {item.title}
              </h2>
            </header>

            <div className="grid gap-8 md:grid-cols-[1fr_250px] items-start">
              <div className="space-y-10">
                {/* 메인 상세 설명 */}
                <section>
                  <h3 className="text-lg font-bold text-[#212529] mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-5 bg-[#004ea2] rounded-full"></span>
                    상세내용
                  </h3>
                  <div className="text-[#495057] leading-loose text-base bg-[#f8f9fa] p-8 rounded-3xl border border-[#f1f3f5]">
                    {item.summary}
                    <p className="mt-4 opacity-70 italic text-sm">
                      * 위 내용은 요약된 정보입니다. 자세한 사항은 아래 원본 사이트에서 확인해 주세요.
                    </p>
                  </div>
                </section>

                {/* 하단 버튼 */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link 
                    href={item.link} 
                    target="_blank"
                    className="flex-1 inline-flex items-center justify-center bg-[#004ea2] text-white font-black py-4 px-8 rounded-2xl hover:bg-[#003d80] transition-all duration-300 text-sm tracking-widest uppercase shadow-lg shadow-blue-900/10"
                  >
                    원본 사이트에서 자세히 보기 →
                  </Link>
                  <Link 
                    href="/" 
                    className="inline-flex items-center justify-center bg-white border-2 border-[#dee2e6] text-[#495057] font-bold py-4 px-8 rounded-2xl hover:bg-[#f1f3f5] transition-all duration-300 text-sm"
                  >
                    목록으로 돌아가기
                  </Link>
                </div>
              </div>

              {/* 우측 정보 정보 요약 박스 */}
              <aside className="space-y-6">
                <div className="bg-[#f8f9fa] rounded-3xl p-6 border border-[#f1f3f5]">
                  <h4 className="text-xs font-black text-[#adb5bd] uppercase tracking-widest mb-6 border-b border-[#dee2e6] pb-2">Information</h4>
                  
                  <div className="space-y-6">
                    <div>
                      <span className="block text-[11px] font-bold text-[#adb5bd] mb-1">📅 기간</span>
                      <span className="text-sm font-bold text-[#495057]">
                        {item.startDate} {item.startDate !== item.endDate && `~ ${item.endDate}`}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[11px] font-bold text-[#adb5bd] mb-1">📍 장소</span>
                      <span className="text-sm font-bold text-[#495057]">{item.location}</span>
                    </div>
                    <div>
                      <span className="block text-[11px] font-bold text-[#adb5bd] mb-1">👥 대상</span>
                      <span className="text-sm font-bold text-[#495057]">{item.target}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-2 border-dashed border-[#dee2e6] rounded-3xl text-center">
                  <p className="text-[11px] text-[#adb5bd] font-medium leading-relaxed">
                    본 정보는 공공기관의 데이터를 바탕으로 작성되었습니다.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </article>
      </main>

      {/* 푸터 (메인과 동일) */}
      <footer className="bg-[#343a40] text-white py-12 mt-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-[11px] tracking-widest uppercase mb-4 font-black">Seongnam-si Life Info</p>
          <div className="text-gray-500 text-[10px] space-y-1 font-medium">
            <p>© 2026 우리 동네 생활 정보. All rights reserved.</p>
            <p>본 사이트의 정보는 공공데이터포털의 최신 데이터를 기반으로 합니다.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
