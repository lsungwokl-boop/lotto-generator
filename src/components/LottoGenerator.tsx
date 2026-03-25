'use client';

import { useState, useEffect } from "react";

interface LottoGame {
  numbers: number[];
  bonus: number;
}

export default function LottoGenerator() {
  const [gameCount, setGameCount] = useState(5);
  const [games, setGames] = useState<LottoGame[]>([]);
  const [savedGames, setSavedGames] = useState<LottoGame[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // 데이터 불러오기 및 테마 설정
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    const saved = localStorage.getItem('savedLotto');
    if (saved) {
      setSavedGames(JSON.parse(saved).slice(0, 10)); // 최대 10개까지
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    const theme = newMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  // 로또 번호 생성 로직 (6개 + 보너스 1개)
  const generateLottoNumbers = () => {
    setIsGenerating(true);
    setGames([]); // 기존 번호 초기화 (애니메이션 효과를 위해)
    
    const newGames: LottoGame[] = [];
    for (let i = 0; i < gameCount; i++) {
      const pool = Array.from({ length: 45 }, (_, i) => i + 1);
      const numbers: number[] = [];
      
      // 6개 추출
      for (let j = 0; j < 6; j++) {
        const randomIndex = Math.floor(Math.random() * pool.length);
        numbers.push(pool.splice(randomIndex, 1)[0]);
      }
      
      // 보너스 1개 추출
      const bonusIndex = Math.floor(Math.random() * pool.length);
      const bonus = pool.splice(bonusIndex, 1)[0];
      
      newGames.push({
        numbers: numbers.sort((a, b) => a - b),
        bonus: bonus
      });
    }

    // 약간의 딜레이 후 표시 (생성 중인 느낌 전달)
    setTimeout(() => {
      setGames(newGames);
      setIsGenerating(false);
    }, 500);
  };

  const saveGame = (game: LottoGame) => {
    const isAlreadySaved = savedGames.some(g => 
      JSON.stringify(g.numbers) === JSON.stringify(game.numbers) && g.bonus === game.bonus
    );
    
    if (isAlreadySaved) {
      alert("이미 저장된 번호입니다! ✨");
      return;
    }

    const updated = [game, ...savedGames].slice(0, 10);
    setSavedGames(updated);
    localStorage.setItem('savedLotto', JSON.stringify(updated));
    alert("번호가 저장되었습니다! 🍀");
  };

  const copyToClipboard = (game: LottoGame) => {
    const text = `행운의 번호: ${game.numbers.join(', ')} [보너스: ${game.bonus}]`;
    navigator.clipboard.writeText(text);
    alert("클립보드에 복사되었습니다! 📋");
  };

  const getBallColorClass = (num: number) => {
    if (num <= 10) return "ball-yellow";
    if (num <= 20) return "ball-blue";
    if (num <= 30) return "ball-red";
    if (num <= 40) return "ball-gray";
    return "ball-green";
  };

  return (
    <>
      <div className="absolute top-4 right-6 pt-24 md:pt-0 z-40">
        <button onClick={toggleDarkMode} className="p-3 rounded-2xl bg-secondary/10 hover:bg-secondary/20 transition-all border border-secondary/5">
          {isDarkMode ? '🌞' : '🌙'}
        </button>
      </div>

      {/* 1. 생성기 섹션 */}
      <section id="generator" className="glass-card rounded-[3rem] p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border-t border-white/20 space-y-12 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="text-2xl font-black">추첨기</h2>
          <div className="flex items-center gap-4 bg-secondary/5 p-2 rounded-2xl border border-secondary/10">
            <button 
              onClick={() => setGameCount(Math.max(1, gameCount - 1))}
              className="w-10 h-10 rounded-xl bg-background flex items-center justify-center font-bold hover:bg-primary hover:text-white transition-colors border border-secondary/10 shadow-sm"
            >-</button>
            <span className="font-black text-lg w-16 text-center">{gameCount} 세트</span>
            <button 
              onClick={() => setGameCount(Math.min(10, gameCount + 1))}
              className="w-10 h-10 rounded-xl bg-background flex items-center justify-center font-bold hover:bg-primary hover:text-white transition-colors border border-secondary/10 shadow-sm"
            >+</button>
          </div>
        </div>

        <button 
          onClick={generateLottoNumbers}
          disabled={isGenerating}
          className={`w-full py-6 rounded-[2rem] text-2xl font-black transition-all transform active:scale-95 shadow-2xl relative overflow-hidden group
            ${isGenerating ? 'bg-secondary/50 cursor-not-allowed text-white/50' : 'bg-primary hover:bg-primary-hover text-white hover:-translate-y-1'}`}
        >
          {isGenerating ? '번호 추출 중...' : '번호 추첨하기'}
          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        </button>

        <div className="space-y-6">
          {games.map((game, idx) => (
            <div 
              key={idx} 
              className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 md:p-8 bg-secondary/5 rounded-[2.5rem] border border-secondary/10 hover:border-primary/30 transition-all animate-pop-in shadow-sm"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex flex-wrap justify-center gap-3">
                {game.numbers.map((num, nIdx) => (
                  <div 
                    key={nIdx} 
                    className={`lotto-ball ${getBallColorClass(num)} animate-pop-in`} 
                    style={{ animationDelay: `${(idx * 0.1) + (nIdx * 0.05)}s` }}
                  >
                    {num}
                  </div>
                ))}
                <div className="flex items-center px-1 text-2xl font-bold opacity-30">+</div>
                <div 
                  className={`lotto-ball ball-bonus animate-pop-in`} 
                  style={{ animationDelay: `${(idx * 0.1) + (6 * 0.05)}s` }}
                >
                  {game.bonus}
                </div>
              </div>
              
              <div className="flex gap-2">
                <button onClick={() => copyToClipboard(game)} className="p-4 rounded-2xl bg-background hover:bg-secondary/10 transition-colors border border-secondary/10 shadow-sm" title="복사">📋</button>
                <button onClick={() => saveGame(game)} className="p-4 rounded-2xl bg-background hover:bg-secondary/10 transition-colors border border-secondary/10 shadow-sm" title="저장">⭐</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. 저장기록 섹션 */}
      {savedGames.length > 0 && (
        <section id="history" className="space-y-6 animate-fade-in">
          <h2 className="text-3xl font-black italic ml-4">Saved History</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {savedGames.map((game, idx) => (
              <div key={idx} className="glass-card p-4 md:p-6 rounded-[2rem] flex items-center justify-between hover:scale-[1.02] transition-transform cursor-pointer border border-white/5 shadow-lg relative overflow-hidden group">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {game.numbers.map((num, nIdx) => (
                    <div key={nIdx} className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black text-white ${getBallColorClass(num)}`}>
                      {num}
                    </div>
                  ))}
                  <span className="px-1 opacity-20 text-xs">+</span>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black text-white ball-bonus">
                    {game.bonus}
                  </div>
                </div>
                <button 
                  onClick={() => {
                    const updated = savedGames.filter((_, i) => i !== idx);
                    setSavedGames(updated);
                    localStorage.setItem('savedLotto', JSON.stringify(updated));
                  }}
                  className="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all text-xs"
                >✕</button>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
