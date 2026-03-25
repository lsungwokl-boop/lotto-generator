'use client';

import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans leading-relaxed selection:bg-blue-100">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 space-y-12">
        <Link 
          href="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-bold transition-colors group"
        >
          <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
          메인 페이지로 돌아가기
        </Link>
        
        <header className="space-y-4 border-b pb-8">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 italic">개인정보처리방침</h1>
          <p className="text-gray-500 font-medium">최종 개정일: 2026년 3월 24일</p>
        </header>
        
        <article className="space-y-12 text-gray-700">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">제1조 (개인정보의 수집 항목 및 목적)</h2>
            <p>
              본 플랫폼('나의 로또 플랫폼', 이하 '서비스')은 사용자의 개인정보를 소중히 여기며, 개인정보 보호법을 준수합니다.
              서비스는 회원가입 기능이 없으며, 어떠한 개인정보도 서버에 강제로 저장하지 않습니다.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>사용자가 생성한 번호: 오직 사용자의 브라우저(LocalStorage)에만 저장됩니다.</li>
              <li>문의하기 정보: 문의 응대 및 기록 확인을 위해 성함(별명), 이메일 주소를 수집합니다.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">제2조 (광고 및 쿠키 정책)</h2>
            <p>
              본 서비스는 수익 창출 및 안정적인 운영을 위해 **Google AdSense** 광고를 게재합니다.
              Google은 사용자가 당사 사이트 또는 다른 사이트를 방문한 기록을 바탕으로 맞춤형 광고를 게재하기 위해 쿠키를 사용합니다.
            </p>
            <p className="bg-gray-50 p-4 rounded-xl border-l-4 border-blue-500 text-sm">
              사용자는 <Link href="https://www.google.com/settings/ads" target="_blank" className="text-blue-600 underline">Google 광고 설정</Link>을 방문하여 맞춤설정 광고를 해제할 수 있습니다.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">제3조 (개인정보의 파기)</h2>
            <p>
              문의 채널을 통해 수집된 정보는 문의 내용이 해결된 후 즉시 혹은 1년 이내에 안전하게 파기됩니다.
              브라우저에 저장된 데이터는 사용자가 직접 '기록 삭제'를 하거나 브라우저 캐시를 지울 때 삭제됩니다.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">제4조 (권리 및 연락처)</h2>
            <p>
              사용자는 언제든지 서비스 이용을 중단할 수 있으며, 쿠키 수집을 거부할 권리가 있습니다.
              본 방침에 대한 문의는 메인 페이지의 '문의하기' 폼을 이용해 주시기 바랍니다.
            </p>
          </section>
        </article>

        <footer className="pt-16 text-center">
          <p className="text-gray-400 text-sm">© 2026 나의 로또 플랫폼. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
