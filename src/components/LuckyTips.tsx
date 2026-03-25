'use client';

import { useState } from 'react';

const tips = [
  "로또는 매주 수백만 명이 참여하는 확률 게임입니다. 즐거움으로만 즐기세요! 🍀",
  "꿈에서 본 숫자가 있다면, 그것이 바로 당신의 행운의 열쇠일지도 모릅니다. ✨",
  "평소 자주 가던 편의점이 아닌, 새로운 명당을 찾아 기분 전환을 해보는 건 어떨까요? 🚶",
  "가족의 생일이나 기념일 숫자를 조합해 보는 것도 로또를 즐기는 고전적인 방법입니다. 🎂",
  "직관이 매우 날카로운 날에는 분석보다는 마음이 이끄는 번호를 선택해 보세요! 🔮",
  "당첨의 기대감은 한 주의 활력소가 되기도 합니다. 하지만 과도한 몰입은 금물! 🛡️"
];

export default function LuckyTips() {
  const [index, setIndex] = useState(0);

  const nextTip = () => {
    setIndex((prev) => (prev + 1) % tips.length);
  };

  return (
    <div 
      onClick={nextTip}
      className="glass-card p-8 rounded-[2.5rem] space-y-4 cursor-pointer hover:border-primary/50 transition-all group active:scale-[0.98]"
    >
      <div className="flex justify-between items-center">
        <h3 className="font-black text-xl">💡 행운의 팁</h3>
        <span className="text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-tighter">Click to change</span>
      </div>
      <p className="text-secondary leading-relaxed min-h-[3rem] animate-fade-in" key={index}>
        {tips[index]}
      </p>
    </div>
  );
}
