'use client';

import { useState, useEffect } from "react";

const fortunes = [
  "오늘은 뜻밖의 횡재수가 있는 날입니다! 작은 희망이 큰 기쁨으로 돌아올 거예요. ✨",
  "주변 사람들과의 조화가 행운을 가져다줍니다. 함께 웃는 시간을 가져보세요. 😊",
  "꾸준한 노력이 결실을 맺는 시기입니다. 자신감을 가지고 나아가세요! 💪",
  "직관이 매우 날카로운 날입니다. 첫 번째 떠오르는 번호를 믿어보세요! 🔮",
  "마음의 여유가 행운을 부릅니다. 조급해하지 말고 천천히 움직이세요. 🌿",
  "새로운 시작을 하기에 아주 좋은 기운이 감도는 날입니다. 용기를 내보세요! 🚀",
  "사소한 배려가 복이 되어 돌아옵니다. 친절을 베푸는 하루가 되시길. 💖"
];

export default function FortuneAnalysis() {
  const [fortune, setFortune] = useState("");
  const [luckyNums, setLuckyNums] = useState<number[]>([]);

  useEffect(() => {
    // 날짜를 시드로 사용하여 매일 고정된 운세와 숫자 제공
    const today = new Date();
    const dateString = today.getFullYear().toString() + (today.getMonth() + 1).toString() + today.getDate().toString();
    const seed = parseInt(dateString);
    
    // 운세 결정
    setFortune(fortunes[seed % fortunes.length]);
    
    // 행운의 숫자 3개 생성
    const nums: number[] = [];
    let currentSeed = seed;
    while (nums.length < 3) {
      currentSeed = (currentSeed * 16807) % 2147483647;
      const num = (currentSeed % 45) + 1;
      if (!nums.includes(num)) {
        nums.push(num);
      }
    }
    setLuckyNums(nums.sort((a, b) => a - b));
  }, []);

  return (
    <section className="glass-card rounded-[3rem] p-8 md:p-12 border border-white/10 shadow-xl space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-black tracking-tight">오늘의 <span className="text-primary">운세</span></h2>
          <div className="p-6 bg-primary/5 rounded-[2rem] border border-primary/10 italic text-lg leading-relaxed text-secondary relative overflow-hidden">
            <span className="absolute top-2 left-4 text-4xl opacity-10 font-serif">"</span>
            {fortune || "오늘의 운세를 불러오는 중입니다..."}
            <span className="absolute bottom-2 right-4 text-4xl opacity-10 font-serif">"</span>
          </div>
        </div>

        <div className="w-full md:w-auto min-w-[200px] flex flex-col items-center gap-4 p-6 bg-secondary/5 rounded-[2rem] border border-secondary/10">
          <h3 className="font-bold text-sm text-secondary uppercase tracking-widest">Today's Lucky Numbers</h3>
          <div className="flex gap-3">
            {luckyNums.map((num, i) => (
              <div key={i} className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center font-black text-lg shadow-lg transform hover:scale-110 transition-transform">
                {num}
              </div>
            ))}
          </div>
          <p className="text-[10px] text-secondary opacity-50">매일 오전 0시 갱신됩니다.</p>
        </div>
      </div>
    </section>
  );
}
