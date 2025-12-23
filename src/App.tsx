import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Moon, Trash2, Play, Lock, Trophy, Coins, Briefcase, ShoppingBag, Utensils, X, Star, AlertTriangle, RefreshCw, Key } from 'lucide-react';

// --- TEXTE & KOSTÜME ---
const QUOTES = {
  pet: ["Mmh, okay, akzeptabel.", "Hach, mein Fell ist göttlich!", "Nicht die Frisur ruinieren!", "Du darfst mich huldigen!"],
  petFull: ["Ich bin wunschlos glücklich!", "Zuneigungslimit erreicht!", "Ich bin vollgestopft mit Liebe, bäh!"],
  feed: ["Thomai hat sich selbst übertroffen!", "Boah, Thomai kocht wie ein Gott!", "Nom nom... Thomai for President!", "Thomai ist ein Magier in der Küche!"],
  fat: ["Mäste mich nicht! Ich pass kaum noch durch die Röhre!", "Ich rolle sonst bald!", "Ich bin pappsatt, danke!"],
  workStart: ["Ab ins Büro... argh.", "Karriere ruft! Hami macht Cash!", "Zeit ist Gold, ich bin dann mal weg."],
  workCancel: ["Früh Feierabend? Du bist ja noch fauler als ich!", "Karriere abgebrochen. Zurück zum Fressen."],
  clean: ["Endlich! Hier hat's gestunken wie im Zoo.", "Glänze wieder wie ein Neuwagen!"],
  gameEnd: ["Spiel vorbei!", "Kerne gesichert!", "Gute Ausbeute, Kumpel!"]
};

const COSTUMES = [
  { id: 'default', name: 'Hami Pur', price: 0, lvl: 1, color: '#FFA857' },
  { id: 'gnome', name: 'Wald-Gnom', price: 0, lvl: 2, color: '#2D5A27' },
  { id: 'knight', name: 'Edel-Ritter', price: 0, lvl: 3, color: '#90A4AE' },
  { id: 'santa', name: 'Weihnachten', price: 0, lvl: 4, color: '#D32F2F' },
  { id: 'wizard', name: 'Zauberer', price: 0, lvl: 5, color: '#4527A0' },
  { id: 'ninja', name: 'Shinobi', price: 0, lvl: 6, color: '#1a1a1a' },
  { id: 'king', name: 'König Hami', price: 0, lvl: 7, color: '#FFD700' },
  // Gold Skins
  { id: 'angel', name: 'Hami-Engel', price: 100, lvl: 0, color: '#E3F2FD' },
  { id: 'devil', name: 'Hami-Teufel', price: 100, lvl: 0, color: '#B71C1C' },
  { id: 'samurai', name: 'Samurai', price: 150, lvl: 0, color: '#880E4F' },
  { id: 'cyber', name: 'Cyber-Hami', price: 200, lvl: 0, color: '#00E5FF' },
  { id: 'dino', name: 'Hami-Saurus', price: 150, lvl: 0, color: '#4CAF50' },
  { id: 'unicorn', name: 'Einhorn', price: 250, lvl: 0, color: '#F48FB1' },
  { id: 'astronaut', name: 'Hami-naut', price: 200, lvl: 0, color: '#CFD8DC' }
];

// --- HAMI GRAFIK (VERBESSERT) ---
const HamiRender = ({ id, isWorking }: any) => {
  const c = COSTUMES.find(x => x.id === id) || COSTUMES[0];
  return (
    <motion.div animate={isWorking ? { x: [-8, 8, -8], rotate: [-2, 2, -2] } : { y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}>
      <svg width="240" height="240" viewBox="0 0 200 200" className="drop-shadow-2xl">
        {/* Spezial-Hintergründe */}
        {id === 'angel' && <motion.circle cx="100" cy="30" r="25" fill="none" stroke="#FFD700" strokeWidth="4" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} />}
        {id === 'unicorn' && <path d="M 100 40 L 110 10 L 120 40 Z" fill="#E1BEE7" />}

        {/* Öhrchen */}
        <circle cx="65" cy="55" r="18" fill={c.color} stroke="#E8D5B5" strokeWidth="2" />
        <circle cx="135" cy="55" r="18" fill={c.color} stroke="#E8D5B5" strokeWidth="2" />
        
        {/* Pausbackiger Körper */}
        <ellipse cx="100" cy="120" rx="85" ry="75" fill="#FFFFFF" stroke="#E8D5B5" strokeWidth="3" />
        <path d="M 35 110 Q 100 35, 165 110" fill={c.color} opacity="0.9" />
        
        {/* Pfötchen (Oben) */}
        <ellipse cx="70" cy="140" rx="10" ry="8" fill="white" stroke="#E8D5B5" />
        <ellipse cx="130" cy="140" rx="10" ry="8" fill="white" stroke="#E8D5B5" />

        {/* Gesicht Details */}
        <g>
          {/* Augen */}
          <circle cx="75" cy="95" r="11" fill="#1a1a1a" />
          <circle cx="125" cy="95" r="11" fill="#1a1a1a" />
          <circle cx="78" cy="91" r="4" fill="white" />
          <circle cx="128" cy="91" r="4" fill="white" />
          
          {/* Schnurrhaare */}
          <line x1="55" y1="110" x2="25" y2="105" stroke="#D2B48C" strokeWidth="1" />
          <line x1="55" y1="115" x2="25" y2="120" stroke="#D2B48C" strokeWidth="1" />
          <line x1="145" y1="110" x2="175" y2="105" stroke="#D2B48C" strokeWidth="1" />
          <line x1="145" y1="115" x2="175" y2="120" stroke="#D2B48C" strokeWidth="1" />

          {/* Nase & Mund */}
          <circle cx="100" cy="110" r="6" fill="#FF80AB" />
          <path d="M 90 125 Q 100 135, 110 125" fill="none" stroke="#333" strokeWidth="3" strokeLinecap="round" />
          {/* Kleine Hamsterzähne */}
          <rect x="96" y="118" width="8" height="6" fill="white" stroke="#333" strokeWidth="1" />
        </g>

        {/* Kostüm Layer (Verbessert) */}
        {id === 'knight' && <g><path d="M 50 40 L 150 40 L 150 90 L 50 90 Z" fill="#90A4AE" /><rect x="65" y="65" width="70" height="5" fill="#333" /></g>}
        {id === 'gnome' && <g><path d="M 55 65 L 100 -5 L 145 65 Z" fill="#1B5E20" /><path d="M 70 120 Q 100 180, 130 120 Z" fill="white" /></g>}
        {id === 'cyber' && <rect x="60" y="80" width="80" height="30" fill="rgba(0, 229, 255, 0.3)" stroke="#00E5FF" strokeWidth="2" rx="5" />}

        {/* Füßchen (Unten) */}
        <ellipse cx="75" cy="180" rx="12" ry="7" fill="#FFB6C1" opacity="0.8" />
        <ellipse cx="125" cy="180" rx="12" ry="7" fill="#FFB6C1" opacity="0.8" />

        {isWorking && (
          <g transform="translate(150, 140)">
            <rect width="35" height="25" fill="#5D4037" rx="3" />
            <path d="M 10 0 L 10 -8 L 25 -8 L 25 0" fill="none" stroke="#5D4037" strokeWidth="3" />
          </g>
        )}
      </svg>
    </motion.div>
  );
};

export default function App() {
  const [xp, setXp] = useState(() => Number(localStorage.getItem('h_xp')) || 0);
  const [coins, setCoins] = useState(() => Number(localStorage.getItem('h_coins')) || 0);
  const [hunger, setHunger] = useState(100);
  const [affection, setAffection] = useState(100);
  const [poops, setPoops] = useState<{id: number, x: number, y: number}[]>([]);
  const [currentId, setCurrentId] = useState('default');
  const [unlocked, setUnlocked] = useState(['default']);
  const [isWorking, setIsWorking] = useState(false);
  const [workLeft, setWorkLeft] = useState(0);
  const [message, setMessage] = useState("Was willst du?");
  const [gameActive, setGameActive] = useState(false);
  const [gameResult, setGameResult] = useState<number | null>(null);
  const [gameScore, setGameScore] = useState(0);
  const [gameTime, setGameTime] = useState(20);
  const [seeds, setSeeds] = useState<{id: number, x: number}[]>([]);
  const [lastGame, setLastGame] = useState(() => Number(localStorage.getItem('h_game')) || 0);

  const level = Math.floor(xp / 100) + 1;

  useEffect(() => {
    localStorage.setItem('h_xp', xp.toString());
    localStorage.setItem('h_coins', coins.toString());
    localStorage.setItem('h_game', lastGame.toString());
  }, [xp, coins, lastGame]);

  useEffect(() => {
    const loop = setInterval(() => {
      setHunger(p => Math.max(0, p - 0.02));
      setAffection(p => Math.max(0, p - 0.05));
      if (Math.random() < 0.005 && poops.length < 5) setPoops(p => [...p, { id: Date.now(), x: Math.random() * 60 + 20, y: Math.random() * 50 + 30 }]);
      if (isWorking && workLeft > 0) setWorkLeft(t => t - 1);
      else if (isWorking) { setIsWorking(false); setCoins(c => c + 50); setXp(x => x + 50); say(QUOTES.feed); }
    }, 1000);
    return () => clearInterval(loop);
  }, [isWorking, workLeft, poops.length]);

  const say = (arr: string[]) => { setMessage(arr[Math.floor(Math.random() * arr.length)]); setTimeout(() => setMessage(""), 6000); };

  const handleCheat1 = () => { if(prompt("Cheat Code (Rich/XP)?") === "6212") { setCoins(c => c + 10000); setXp(x => x + 1000); say(["BAM! Reich!"]); }};
  const handleCheat2 = () => { if(prompt("Cheat Code (Hunger/💩)?") === "6212") { setHunger(h => h / 2); setPoops(p => [...p, {id:Date.now(), x:30, y:40},{id:Date.now()+1, x:50, y:60},{id:Date.now()+2, x:70, y:50}]); say(["Ugh... mein Bauch..."]); }};

  const resetProgress = () => {
    if(prompt("Reset Code?") === "6212") {
      if(window.confirm("Bist du sicher? ALLES wird gelöscht!")) {
        localStorage.clear();
        window.location.reload();
      }
    }
  };

  const startGame = () => {
    if (Date.now() - lastGame < 3600000) return say(["Ich bin müde! In einer Stunde wieder."]);
    setGameActive(true); setGameScore(0); setSeeds([]); setGameResult(null); setGameTime(20); setLastGame(Date.now());
  };

  useEffect(() => {
    if (!gameActive) return;
    const spawn = setInterval(() => setSeeds(s => [...s, { id: Date.now(), x: Math.random() * 80 + 10 }]), 500);
    const timer = setInterval(() => {
        setGameTime(t => {
            if (t <= 1) {
                setGameActive(false);
                setGameResult(gameScore);
                setXp(x => x + gameScore);
                clearInterval(spawn);
                clearInterval(timer);
                return 0;
            }
            return t - 1;
        });
    }, 1000);
    return () => { clearInterval(spawn); clearInterval(timer); };
  }, [gameActive, gameScore]);

  return (
    <div className="min-h-screen bg-[#FFF9F2] p-4 font-sans select-none overflow-hidden flex flex-col items-center">
      
      <button onClick={handleCheat2} className="fixed top-2 left-2 bg-white/40 p-1 rounded text-[8px] font-black z-[100] hover:bg-white border italic opacity-20 hover:opacity-100 flex items-center gap-1"><Key size={8}/> CHEAT: HUNGER/💩</button>
      <button onClick={handleCheat1} className="fixed top-2 right-2 bg-white/40 p-1 rounded text-[8px] font-black z-[100] hover:bg-white border italic opacity-20 hover:opacity-100 flex items-center gap-1"><Key size={8}/> CHEAT: XP/GOLD</button>

      {/* HEADER */}
      <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-[2rem] shadow-xl border-4 border-white flex flex-col items-center">
          <Trophy className="text-orange-400 mb-1" />
          <span className="text-2xl font-black italic">LVL {level}</span>
          <div className="w-full h-2 bg-slate-100 rounded-full mt-2 overflow-hidden border"><motion.div animate={{ width: `${xp % 100}%` }} className="h-full bg-orange-400" /></div>
        </div>
        <div className="bg-white p-4 rounded-[2rem] shadow-xl border-4 border-white flex flex-col items-center">
          <Coins className="text-amber-500 mb-1" />
          <span className="text-2xl font-black italic">{coins}</span>
        </div>
        <div className="bg-white p-4 rounded-[2rem] shadow-xl border-4 border-white flex flex-col items-center">
          <Utensils className="text-green-500 mb-1" />
          <span className="text-xl font-black italic">{Math.round(hunger)}% Hunger</span>
        </div>
        <div className="bg-white p-4 rounded-[2rem] shadow-xl border-4 border-white flex flex-col items-center">
          <Heart className="text-red-500 mb-1" />
          <span className="text-xl font-black italic">{Math.round(affection)}% Liebe</span>
          <div className="w-full h-2 bg-slate-100 rounded-full mt-2 overflow-hidden border"><motion.div animate={{ width: `${affection}%` }} className="h-full bg-red-400" /></div>
        </div>
      </div>

      <main className="w-full max-w-5xl flex flex-col md:flex-row gap-8 items-center justify-center">
        <div className="w-full md:w-2/3 aspect-square bg-white rounded-[4rem] shadow-2xl relative border-8 border-white overflow-hidden flex items-center justify-center bg-gradient-to-b from-orange-50 to-white">
          <AnimatePresence>{message && <motion.div initial={{scale:0}} animate={{scale:1}} exit={{scale:0}} className="absolute top-10 z-50 bg-white p-4 rounded-2xl shadow-xl border-2 border-orange-100 font-bold max-w-[80%] text-center italic leading-tight">{message}</motion.div>}</AnimatePresence>

          {isWorking ? (
            <div className="text-center">
              <HamiRender id={currentId} isWorking={true} />
              <p className="mt-4 font-black text-slate-400 animate-pulse uppercase tracking-widest">Bin schuften... {Math.ceil(workLeft/60)}m</p>
              <button onClick={() => {if(window.confirm("Abbrechen? Keine XP, kein Gold!")){setIsWorking(false); setWorkLeft(0); say(QUOTES.workCancel)}}} className="mt-4 bg-red-100 text-red-600 px-6 py-2 rounded-2xl font-black uppercase text-xs flex items-center gap-2"><AlertTriangle size={14}/> Abbruch</button>
            </div>
          ) : (
            <div className="relative cursor-pointer" onClick={() => { if(affection>95){say(QUOTES.petFull)} else {setXp(x=>x+20); setAffection(100); say(QUOTES.pet)}}}>
              <HamiRender id={currentId} isWorking={false} />
              {poops.map(p => <button key={p.id} onClick={(e) => {e.stopPropagation(); setPoops(o=>o.filter(x=>x.id!==p.id)); setXp(x=>x+20); say(QUOTES.clean)}} style={{left:`${p.x}%`, top:`${p.y}%`}} className="absolute text-4xl z-40 transition-transform hover:scale-125">💩</button>)}
            </div>
          )}
        </div>

        <div className="w-full md:w-1/3 space-y-4">
          <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border-4 border-white text-center">
            <h3 className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest italic text-green-600">Thomai's Spezialitäten</h3>
            <div className="flex justify-around">
              {['🌻','🍝','🍕','🍟','🥗'].map((e, i) => (
                <button key={i} onClick={() => {if(hunger<90){setHunger(h=>Math.min(100,h+20)); setXp(x=>x+15); say(QUOTES.feed)} else {say(QUOTES.fat)}}} className="text-3xl hover:scale-125 transition-transform">{e}</button>
              ))}
            </div>
          </div>

          <button onClick={() => {if(!isWorking){setIsWorking(true); setWorkLeft(1800); say(QUOTES.workStart)}}} className="w-full bg-sky-500 text-white p-6 rounded-[2.5rem] shadow-lg font-black flex items-center justify-center gap-4 hover:bg-sky-600 transition-all disabled:opacity-50" disabled={isWorking}><Briefcase /> ARBEITEN</button>
          <button onClick={startGame} className="w-full bg-rose-500 text-white p-6 rounded-[2.5rem] shadow-lg font-black flex items-center justify-center gap-4 hover:bg-rose-600 transition-all"><Play /> MINIGAME</button>

          <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border-4 border-white max-h-60 overflow-y-auto">
             <h3 className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest flex items-center gap-2 italic"><ShoppingBag size={14}/> Kleiderschrank</h3>
             <div className="grid grid-cols-2 gap-2">
                {COSTUMES.map(c => {
                  const isLvlUnlocked = c.lvl > 0 && level >= c.lvl;
                  const isBought = unlocked.includes(c.id);
                  const canUse = isLvlUnlocked || isBought;
                  return (
                    <button key={c.id} onClick={() => {
                        if(canUse){ setCurrentId(c.id); } 
                        else if(c.lvl === 0 && coins >= c.price){ setCoins(coins-c.price); setUnlocked([...unlocked, c.id]); setCurrentId(c.id); }
                        else if(c.lvl > 0 && level < c.lvl){ say([`Level ${c.lvl} benötigt! Ich bin noch nicht bereit!`]); }
                    }} className={`p-2 rounded-xl border-2 text-[10px] font-black uppercase transition-all ${currentId === c.id ? 'border-orange-500 bg-orange-50' : 'border-slate-50'} ${!canUse ? 'opacity-60' : 'opacity-100'}`}>
                      {c.name} {!canUse && <div className="text-[8px] text-amber-600">{c.lvl > 0 ? `LVL ${c.lvl}` : `💰 ${c.price}`}</div>}
                    </button>
                  );
                })}
             </div>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {gameActive && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 bg-sky-400 z-[200] p-8 flex flex-col items-center">
             <div className="flex justify-between w-full max-w-2xl mb-4 text-white font-black italic text-4xl uppercase">
                 <h2>KERNE: {gameScore}/40</h2>
                 <h2>ZEIT: {gameTime}S</h2>
             </div>
             <div className="relative w-full h-full max-w-2xl bg-white/20 rounded-[3rem] overflow-hidden">
               <AnimatePresence>
                 {seeds.map(s => (
                   <motion.div key={s.id} initial={{y:-100, x:`${s.x}%`}} animate={{y:1000}} exit={{scale:0, opacity:0}} onClick={()=>{if(gameScore<40){setGameScore(s=>s+1); setSeeds(o=>o.filter(x=>x.id!==s.id))}}} transition={{duration:2, ease:"linear"}} className="absolute text-5xl cursor-pointer">🌻</motion.div>
                 ))}
               </AnimatePresence>
             </div>
          </motion.div>
        )}

        {gameResult !== null && (
            <motion.div initial={{opacity:0, scale:0.5}} animate={{opacity:1, scale:1}} exit={{opacity:0}} className="fixed inset-0 bg-black/80 z-[250] flex items-center justify-center p-8">
                <div className="bg-white p-10 rounded-[3rem] text-center shadow-2xl border-8 border-orange-400">
                    <h2 className="text-4xl font-black mb-4 italic uppercase tracking-tighter">ERGEBNIS</h2>
                    <p className="text-2xl font-bold mb-2">Du hast <span className="text-orange-500">{gameResult}</span> Kerne gefangen!</p>
                    <p className="text-xl text-green-600 font-black mb-8 italic">+{gameResult} XP erhalten</p>
                    <button onClick={() => setGameResult(null)} className="bg-orange-500 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-orange-600 shadow-lg active:scale-95">Super!</button>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      <button onClick={resetProgress} className="fixed bottom-2 left-2 opacity-10 hover:opacity-100 p-2 text-red-600 transition-all z-[100] flex items-center gap-1 text-[10px] font-black italic"><RefreshCw size={10}/> RESET PROGRESS</button>
    </div>
  );
}
