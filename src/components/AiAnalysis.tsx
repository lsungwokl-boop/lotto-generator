'use client';

import { useState, useEffect } from "react";

// 가상의 역대 당첨번호 통계 데이터 (실제 출현 빈도가 높은 번호들 기준)
const frequentNumbers = [
  { num: 1, count: 182 },
  { num: 13, count: 175 },
  { num: 27, count: 172 },
  { num: 34, count: 168 },
  { num: 43, count: 165 },
  { num: 45, count: 163 },
  { num: 18, count: 160 },
  { num: 33, count: 158 },
  { num: 5, count: 155 },
  { num: 11, count: 152 }
];

export default function AiAnalysis() {
  const [recommendedNums, setRecommendedNums] = useState<number[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const generateAiRecommendation = () => {
    setIsAnalyzing(true);
    
    // AI 분석 느낌을 주기 위한 가짜 딜레이
    setTimeout(() => {
      const topNums = frequentNumbers.map(f => f.num);
      const recommendation: number[] = [];
      
      // 상위 빈도 번호 중 3개 선택
      const pool = [...topNums];
      for (let i = 0; i < 3; i++) {
        const idx = Math.floor(Math.random() * pool.length);
        recommendation.push(pool.splice(idx, 1)[0]);
      }
      
      // 나머지 3개는 완전 랜덤
      while (recommendation.length < 6) {
        const randomNum = Math.floor(Math.random() * 45) + 1;
        if (!recommendation.includes(randomNum)) {
          recommendation.push(randomNum);
        }
      }

      setRecommendedNums(recommendation.sort((a, b) => a - b));
      setIsAnalyzing(false);
    }, 1500);
  };

  const getBallColorClass = (num: number) => {
    if (num <= 10) return "ball-yellow";
    if (num <= 20) return "ball-blue";
    if (num <= 30) return "ball-red";
    if (num <= 40) return "ball-gray";
    return "ball-green";
  };

  return (
    <section className="glass-card rounded-[3rem] p-8 md:p-12 border border-white/10 shadow-xl space-y-10 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-black tracking-tight">AI 기반 <span className="text-accent">번계 분석</span></h2>
            <p className="text-sm font-bold text-secondary opacity-60 uppercase tracking-widest">Statistical winning frequency analysis</p>
          </div>
          
          <div className="grid grid-cols-5 gap-4">
            {frequentNumbers.slice(0, 5).map((f, i) => (
              <div key={i} className="flex flex-col items-center gap-2 p-3 bg-secondary/5 rounded-2xl border border-secondary/10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black text-white ${getBallColorClass(f.num)}`}>
                  {f.num}
                </div>
                <div className="text-[10px] font-bold text-secondary opacity-40 uppercase tracking-tighter">
                  {f.count}회 출현
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-secondary leading-relaxed font-medium">
            * 위 데이터는 역대 1,000회 이상의 당첨 결과를 분석하여 가장 많이 출현한 번호 상위 5개를 실시간 통계로 보여줍니다. (가상 데이터 기반)
          </p>
        </div>

        <div className="w-full md:w-[350px] space-y-6 bg-accent/5 p-8 rounded-[2.5rem] border border-accent/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent pointer-events-none"></div>
          <h3 className="font-black text-xl italic text-accent">AI Smart Predictor</h3>
          
          <button 
            onClick={generateAiRecommendation}
            disabled={isAnalyzing}
            className={`w-full py-5 rounded-2xl text-lg font-black transition-all transform active:scale-95 shadow-xl relative overflow-hidden group
              ${isAnalyzing ? 'bg-secondary/20 cursor-not-allowed' : 'bg-foreground text-background hover:-translate-y-1 hover:shadow-2xl'}`}
          >
            {isAnalyzing ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-primary animate-ping rounded-full"></span>
                분석 중...
              </span>
            ) : 'AI 추천 번호 받기'}
          </button>

          <div className="flex flex-wrap justify-center gap-2 min-h-[60px] items-center">
            {recommendedNums.length > 0 ? (
              recommendedNums.map((num, i) => (
                <div 
                  key={i} 
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black text-white ${getBallColorClass(num)} animate-pop-in`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {num}
                </div>
              ))
            ) : (
              <div className="text-xs font-black text-secondary/30 italic">분석 버튼을 눌러주세요.</div>
            )}
          </div>
          <p className="text-[10px] text-secondary opacity-40 text-center">확률 통계와 인공지능이 만난 고유 추천 서비스</p>
        </div>
      </div>
    </section>
  );
}
