'use client';

export default function CoupangBanner() {
  const partnerId = process.env.NEXT_PUBLIC_COUPANG_PARTNER_ID;
  const isEnabled = partnerId && partnerId !== "나중에_입력" && partnerId.trim() !== "";

  if (!isEnabled) {
    return null;
  }

  return (
    <div className="w-full my-8 flex flex-col items-center gap-2 animate-fade-in">
      <span className="text-[10px] font-bold text-secondary opacity-30 uppercase tracking-widest">Lucky Recommendation</span>
      <div className="w-full glass-card rounded-[2rem] p-4 min-h-[120px] flex items-center justify-center border border-white/5 shadow-inner overflow-hidden bg-white/5">
        <iframe 
          src={`https://ads-partners.coupang.com/widgets.html?id=${partnerId}&template=carousel&trackingCode=AF0000000&subId=blog`} 
          width="100%" 
          height="140" 
          frameBorder="0" 
          scrolling="no" 
          referrerPolicy="unsafe-url"
          title="Coupang Partners Banner"
        ></iframe>
      </div>
      <p className="text-[9px] text-secondary opacity-40 text-center px-4">
        "이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다."
      </p>
    </div>
  );
}
