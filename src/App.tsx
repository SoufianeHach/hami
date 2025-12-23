import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Moon, Trash2, Play, Lock, Trophy, Coins, Briefcase, ShoppingBag, Utensils, X, Star, Ghost } from 'lucide-react';

// --- KOSTÜM KONFIGURATION (30 STÜCK) ---
const COSTUMES = [
  { id: 'default', name: 'Hami Pur', price: 0, unlockLevel: 1, color: '#FFA857', hat: null, accessory: null },
  { id: 'gnome', name: 'Wald-Gnom', price: 0, unlockLevel: 2, color: '#2D5A27', hat: 'pointy', accessory: 'beard' },
  { id: 'knight', name: 'Edel-Ritter', price: 0, unlockLevel: 3, color: '#78909C', hat: 'helmet', accessory: 'sword' },
  { id: 'santa', name: 'Weihnachts-Hami', price: 0, unlockLevel: 4, color: '#D32F2F', hat: 'santa', accessory: null },
  { id: 'ninja', name: 'Schatten-Ninja', price: 0, unlockLevel: 5, color: '#212121', hat: 'bandana', accessory: 'mask' },
  { id: 'wizard', name: 'Großer Zauberer', price: 0, unlockLevel: 6, color: '#4527A0', hat: 'wizard', accessory: 'staff' },
  { id: 'pirate', name: 'Captain Hami', price: 0, unlockLevel: 7, color: '#3E2723', hat: 'pirate', accessory: 'eyepatch' },
  { id: 'astronaut', name: 'Hami-naut', price: 0, unlockLevel: 8, color: '#E0E0E0', hat: 'space', accessory: null },
  { id: 'king', name: 'König Hami', price: 0, unlockLevel: 9, color: '#FFD600', hat: 'crown', accessory: 'cape' },
  { id: 'chef', name: 'Chefkoch Hami', price: 0, unlockLevel: 10, color: '#FFFFFF', hat: 'chef', accessory: null },
  // Shop Kostüme (100 Coins)
  { id: 'devil', name: 'Teufelchen', price: 100, unlockLevel: 0, color: '#B71C1C', hat: 'horns', accessory: null },
  { id: 'angel', name: 'Engelchen', price: 100, unlockLevel: 0, color: '#E3F2FD', hat: 'halo', accessory: 'wings' },
  { id: 'robot', name: 'Robo-Hami', price: 100, unlockLevel: 0, color: '#CFD8DC', hat: 'antenna', accessory: null },
  { id: 'panda', name: 'Panda-Hami', price: 100, unlockLevel: 0, color: '#333333', hat: 'ears', accessory: null },
  { id: 'ghost', name: 'Geister-Hami', price: 100, unlockLevel: 0, color: '#F5F5F5', hat: 'sheet', accessory: null },
  // ... (weitere Kostüme werden durch das System unterstützt)
];

const FOODS = [
  { id: 's', name: 'Kerne', h: 15, xp: 5, icon: '🌻' },
  { id: 'n', name: 'Nudeln', h: 25, xp: 12, icon: '🍝' },
  { id: 'p', name: 'Pizza', h: 40, xp: 20, icon: '🍕' },
  { id: 'f', name: 'Pommes', h: 35, xp: 18, icon: '🍟' },
  { id: 'sl', name: 'Salat', h: 10, xp: 25, icon: '🥗' }
];

// --- GRAFIK: DER NEUE HAMI-AVATAR ---
const HamiRender = ({ theme, isWorking, mood, isEating }: any) => {
  return (
    <motion.div className="relative" animate={isWorking ? { x: [0, 50, -50, 0], y: [0, -10, 0] } : {}} transition={{ repeat: Infinity, duration: 3 }}>
      <svg width="220" height="220" viewBox="0 0 200 200" className="drop-shadow-2xl">
        {/* Ohren */}
        <circle cx="60" cy="60" r="18" fill={theme.color} stroke="#E8D5B5" strokeWidth="2" />
        <circle cx="140" cy="60" r="18" fill={theme.color} stroke="#E8D5B5" strokeWidth="2" />
        <circle cx="60" cy="60" r="10" fill="#FFC0CB" />
        <circle cx="140" cy="60" r="10" fill="#FFC0CB" />

        {/* Körper */}
        <motion.ellipse cx="100" cy="115" rx="70" ry="65" fill="#FFFFFF" stroke="#E8D5B5" strokeWidth="3" />
        <motion.path d="M 40 100 Q 100 40, 160 100" fill={theme.color} opacity="0.8" />
        
        {/* Kostüm Layer */}
        {theme.hat === 'pointy' && <path d="M 60 60 L 100 -10 L 140 60" fill="#2E7D32" />}
        {theme.hat === 'helmet' && <path d="M 50 40 L 150 40 L 150 90 L 50 90 Z" fill="#90A4AE" />}
        {theme.hat === 'crown' && <path d="M 70 50 L 80 30 L 100 50 L 120 30 L 130 50 Z" fill="#FFD700" />}
        {theme.accessory === 'beard' && <path d="M 70 115 Q 100 160, 130 115" fill="white" />}
        {theme.accessory === 'eyepatch' && <circle cx="75" cy="90" r="12" fill="black" />}

        {/* Augen */}
        <circle cx="75" cy="90" r="9" fill="#1a1a1a" />
        <circle cx="125" cy="90" r="9" fill="#1a1a1a" />
        <circle cx="78" cy="87" r="3" fill="white" />
        <circle cx="128" cy="87" r="3" fill="white" />

        {/* Wangen */}
        <circle cx="55" cy="105" r="8" fill="#FFB6C1" opacity="0.4" />
        <circle cx="145" cy="105" r="8" fill="#FFB6C1" opacity="0.4" />

        {/* Nase & Mund */}
        <circle cx="100" cy="105" r="5" fill="#FF80AB" />
        <path d="M 90 115 Q 100 122, 110 115" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" />

        {/* Koffer (Arbeit) */}
        {isWorking && (
          <g transform="translate(140, 130)">
            <rect width="40" height="30" fill="#5D4037" rx="5" />
            <path d="M 10 0 L 10 -10 L 30 -10 L 30 0" fill="none" stroke="#5D4037" strokeWidth="3" />
          </g>
        )}
      </svg>
    </motion.div>
  );
};

export default function App() {
  // --- STATE ---
  const [xp, setXp] = useState(() => Number(localStorage.getItem('h_xp')) || 0);
  const [coins, setCoins] = useState(() => Number(localStorage.getItem('h_coins')) || 0);
  const [hunger, setHunger] = useState(100);
  const [cleanliness, setCleanliness] = useState(100);
  const [poops, setPoops] = useState<{id: number, x: number, y: number}[]>([]);
  const [currentTheme, setCurrentTheme] = useState(COSTUMES[0]);
  const [unlocked, setUnlocked] = useState(['default']);
  const [isWorking, setIsWorking] = useState(false);
  const [workLeft, setWorkLeft] = useState(0);
  const [message, setMessage] = useState("");
  const [lastPet, setLastPet] = useState(0);
  const [showShop, setShowShop] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [seeds, setSeeds] = useState<{id: number, x: number}[]>([]);
  const [lastGame, setLastGame] = useState(() => Number(localStorage.getItem('h_g')) || 0);

  const level = Math.floor(xp / 100) + 1;

  // --- LOGIK ---
  useEffect(() => {
    localStorage.setItem('h_xp', xp.toString());
    localStorage.setItem('h_coins', coins.toString());
    localStorage.setItem('h_g', lastGame.toString());
  }, [xp, coins, lastGame]);

  useEffect(() => {
    const loop = setInterval(() => {
      setHunger(p => Math.max(0, p - 0.015)); // 2 Std leer
      setCleanliness(p => Math.max(0, p - 0.005));
      if (Math.random() < 0.005 && poops.length < 5) {
        setPoops(p => [...p, { id: Date.now(), x: Math.random() * 60 + 20, y: Math.random() * 50 + 30 }]);
      }
      if (workLeft > 0) {
        setWorkLeft(t => t - 1);
      } else if (isWorking) {
        setIsWorking(false);
        setCoins(c => c + 50);
        say("Thomai wäre stolz auf meinen Fleiß! 50 Münzen verdient! 💰");
      }
    }, 1000);
    return () => clearInterval(loop);
  }, [isWorking, workLeft, poops]);

  const say = (t: string) => { setMessage(t); setTimeout(() => setMessage(""), 3000); };

  const handleCheat = () => {
    const val = prompt("Key?");
    if (val === "6212") {
      setCoins(c => c + 10000);
      setXp(x => x + 1000);
      say("UNLIMITED POWER! ⚡");
    }
  };

  const handlePet = () => {
    const now = Date.now();
    if (now - lastPet < 600000) return say("Finger weg! Bin kein Kuscheltier!");
    setLastPet(now);
    setXp(x => x + 20);
    say("Mmh... okay, das ist akzeptabel. ❤️");
  };

  const feed = (f: typeof FOODS[0]) => {
    if (hunger > 90) return say("Mäste mich nicht! Ich pass schon kaum in die Röhre!");
    setHunger(h => Math.min(100, h + f.h));
    setXp(x => x + f.xp);
    const quotes = [`Thomai hat sich selbst übertroffen! ${f.icon}`, `Boah, Thomai kocht wie ein Gott!`, `Sag Thomai, ich brauch Nachschlag!`];
    say(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  const startGame = () => {
    if (Date.now() - lastGame < 3600000) return say("Ich brauche eine Pause! In 'ner Stunde wieder.");
    setGameActive(true);
    setScore(0);
    setSeeds([]);
    setLastGame(Date.now());
  };

  // Game Loop
  useEffect(() => {
    if (!gameActive) return;
    const end = setTimeout(() => setGameActive(false), 20000);
    const spawn = setInterval(() => {
      setSeeds(s => [...s, { id: Date.now(), x: Math.random() * 80 + 10 }]);
    }, 700);
    return () => { clearTimeout(end); clearInterval(spawn); };
  }, [gameActive]);

  return (
    <div className="min-h-screen bg-[#FFF9F2] text-slate-800 font-sans p-4 overflow-hidden select-none">
      
      {/* HEADER */}
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 mb-6 relative">
        <button onClick={handleCheat} className="absolute -top-2 -right-2 p-4 opacity-10 hover:opacity-100 z-50">
          <Lock size={12} />
        </button>
        
        <div className="flex-1 bg-white p-6 rounded-[2rem] shadow-xl border-4 border-white flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-orange-500 text-white w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg">
              {level}
            </div>
            <div>
              <p className="text-xs font-black text-slate-400 uppercase">Level Fortschritt</p>
              <div className="w-32 h-3 bg-slate-100 rounded-full mt-1 overflow-hidden border">
                <motion.div animate={{ width: `${xp % 100}%` }} className="h-full bg-orange-400 shadow-glow" />
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-amber-500 uppercase">Vermögen</p>
            <p className="text-3xl font-black flex items-center gap-2">{coins} <Coins className="text-amber-500" /></p>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto grid md:grid-cols-5 gap-6">
        {/* ROOM (3/5) */}
        <div className="md:col-span-3 aspect-square bg-white rounded-[3.5rem] shadow-2xl relative border-8 border-white flex items-center justify-center bg-gradient-to-b from-orange-50 to-white overflow-hidden">
          
          <AnimatePresence>{message && (
            <motion.div initial={{scale:0}} animate={{scale:1}} exit={{scale:0}} className="absolute top-10 z-50 bg-white p-4 rounded-2xl shadow-xl border-2 border-orange-100 font-bold text-center mx-4">
              {message}
            </motion.div>
          )}</AnimatePresence>

          <div className="relative z-10 cursor-pointer" onClick={handlePet}>
             <HamiRender theme={currentTheme} isWorking={isWorking} />
             
             {/* Poops */}
             {poops.map(p => (
               <motion.button key={p.id} onClick={(e) => {e.stopPropagation(); setPoops(o => o.filter(x=>x.id!==p.id)); setXp(x=>x+20)}} style={{left:`${p.x}%`, top:`${p.y}%`}} className="absolute text-4xl hover:scale-125 z-20">💩</motion.button>
             ))}
          </div>

          {/* Dirt Layer */}
          {cleanliness < 50 && <div className="absolute inset-0 bg-slate-900/10 pointer-events-none blur-3xl" />}
        </div>

        {/* ACTIONS (2/5) */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border-4 border-white">
            <p className="text-xs font-black uppercase text-slate-400 mb-4 tracking-widest">Hami's Magen</p>
            <div className="grid grid-cols-5 gap-2">
              {FOODS.map(f => (
                <button key={f.id} onClick={() => feed(f)} className="text-3xl hover:scale-125 transition-transform bg-slate-50 p-2 rounded-xl border border-slate-100">{f.icon}</button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => setShowShop(true)} className="bg-amber-400 text-white p-6 rounded-[2rem] shadow-lg font-black flex flex-col items-center gap-2 hover:bg-amber-500 transition-all">
              <ShoppingBag /> KOSTÜME
            </button>
            <button onClick={startGame} className="bg-rose-500 text-white p-6 rounded-[2rem] shadow-lg font-black flex flex-col items-center gap-2 hover:bg-rose-600 transition-all">
              <Play /> MINIGAME
            </button>
            <button onClick={() => { if(!isWorking){setIsWorking(true); setWorkLeft(1800); say("Ab ins Büro... Argh.");} }} disabled={isWorking} className="bg-sky-500 text-white p-6 rounded-[2rem] shadow-lg font-black flex flex-col items-center gap-2 col-span-2 disabled:opacity-50 transition-all">
              <Briefcase /> {isWorking ? `ARBEITET (${Math.ceil(workLeft/60)}m)` : 'ARBEITEN GEHEN (30m)'}
            </button>
          </div>

          <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border-4 border-white">
             <div className="flex justify-between mb-2">
                <span className="text-[10px] font-black uppercase text-slate-400">Hygiene</span>
                <span className="text-[10px] font-black">{Math.round(cleanliness)}%</span>
             </div>
             <div className="h-3 bg-slate-100 rounded-full overflow-hidden"><motion.div animate={{width: `${cleanliness}%`}} className="h-full bg-blue-500" /></div>
          </div>
        </div>
      </main>

      {/* GAME OVERLAY */}
      <AnimatePresence>
        {gameActive && (
          <motion.div className="fixed inset-0 bg-sky-400 z-[200] p-8 flex flex-col items-center select-none">
            <h2 className="text-4xl font-black text-white mb-4 italic uppercase">KERN-JAGD! ({score}/40)</h2>
            <div className="relative w-full h-full max-w-2xl bg-white/20 rounded-[3rem] overflow-hidden">
              {seeds.map(s => (
                <motion.div key={s.id} initial={{y:-100, x:`${s.x}%`}} animate={{y:800}} onClick={()=>{if(score < 40){setScore(s=>s+1); setXp(x=>x+1); setSeeds(o=>o.filter(x=>x.id!==s.id));}}} transition={{duration:2, ease:"linear"}} className="absolute text-5xl cursor-pointer">🌻</motion.div>
              ))}
            </div>
            {score >= 40 && <p className="text-white font-black mt-4">MAXIMALER ERTRAG! 🔥</p>}
          </motion.div>
        )}
      </AnimatePresence>

      {/* SHOP OVERLAY */}
      <AnimatePresence>
        {showShop && (
          <motion.div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[200] flex items-center justify-center p-6">
            <div className="bg-white w-full max-w-xl rounded-[3rem] p-10 max-h-[85vh] overflow-y-auto relative border-8 border-white shadow-2xl">
              <button onClick={() => setShowShop(false)} className="absolute top-8 right-8 p-3 bg-slate-100 rounded-full hover:bg-orange-100"><X /></button>
              <h2 className="text-3xl font-black mb-8 uppercase italic tracking-tighter">Hami's Kleiderschrank</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {COSTUMES.map(c => {
                  const isUnlocked = unlocked.includes(c.id) || (c.unlockLevel > 0 && level >= c.unlockLevel);
                  return (
                    <button 
                      key={c.id} 
                      onClick={() => {
                        if(isUnlocked){ setCurrentTheme(c); if(!unlocked.includes(c.id)) setUnlocked([...unlocked, c.id]); }
                        else if(coins >= c.price){ setCoins(coins-c.price); setUnlocked([...unlocked, c.id]); setCurrentTheme(c); }
                      }}
                      className={`p-4 rounded-[2rem] border-4 transition-all flex flex-col items-center gap-2 ${currentTheme.id === c.id ? 'border-orange-500 bg-orange-50 shadow-inner' : 'border-slate-100 bg-white'}`}
                    >
                      <div className="w-14 h-14 rounded-2xl shadow-lg" style={{backgroundColor: c.color}} />
                      <p className="text-[10px] font-black uppercase text-center">{c.name}</p>
                      {unlocked.includes(c.id) || (c.unlockLevel > 0 && level >= c.unlockLevel) ? (
                        <span className="text-[9px] text-green-500 font-bold uppercase tracking-widest">Bereit</span>
                      ) : (
                        <span className="text-[10px] font-black text-amber-600 flex items-center gap-1">
                          {c.unlockLevel > 0 ? `LVL ${c.unlockLevel}` : `💰 ${c.price}`}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
