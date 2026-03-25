'use client';

export default function AdBanner() {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;
  const isEnabled = adsenseId && adsenseId !== "나중에_입력" && adsenseId.trim() !== "";

  if (!isEnabled) {
    return null;
  }

  return (
    <div className="w-full my-12 flex flex-col items-center gap-2 animate-fade-in">
      <span className="text-[10px] font-bold text-secondary opacity-30 uppercase tracking-widest">Advertisement</span>
      <div className="w-full glass-card rounded-[2rem] p-4 min-h-[100px] flex items-center justify-center border border-white/5 shadow-inner overflow-hidden">
        {/* 구글 애드센스 광고 코드 */}
        <ins className="adsbygoogle"
             style={{ display: 'block', width: '100%' }}
             data-ad-client={adsenseId}
             data-ad-slot="auto" // 실제 슬롯 ID가 있다면 여기에 입력 가능
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script
          dangerouslySetInnerHTML={{
            __html: `(adsbygoogle = window.adsbygoogle || []).push({});`,
          }}
        />
      </div>
    </div>
  );
}
