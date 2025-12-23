import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Moon, Trash2, Play, Lock, Trophy, Coins, Briefcase, ShoppingBag, Utensils, X, Star, AlertTriangle, RefreshCw, Key, Zap } from 'lucide-react';

// --- TEXTE & ZITATE ---
const QUOTES = {
  pet: ["Mmh, okay, akzeptabel.", "Hach, mein Fell ist göttlich!", "Nicht die Frisur ruinieren!", "Du darfst mich huldigen!"],
  petFull: ["Ich bin wunschlos glücklich!", "Zuneigungslimit erreicht!", "Nerv nicht, Mensch!"],
  feed: ["Thomai hat sich selbst übertroffen!", "Boah, Thomai kocht wie ein Gott!", "Thomai ist ein Magier in der Küche!"],
  fat: ["Mäste mich nicht!", "Ich rolle sonst bald!", "Ich bin pappsatt!"],
  workStart: ["Ab ins Büro... argh.", "Karriere ruft! Hami macht Cash!", "Zeit ist Gold."],
  workCancel: ["Früh Feierabend? Faulpelz!", "Karriere abgebrochen."],
  clean: ["Endlich sauber!", "Glänze wieder wie ein Neuwagen!"],
  gameEnd: ["Spiel vorbei!", "Kerne gesichert!", "Gute Ausbeute!"]
};

// --- KOSTÜM-DEFINITIONEN ---
const COSTUMES = [
  { id: 'default', name: 'Hami Pur', price: 0, lvl: 1, color: '#FFA857' },
  { id: 'gnome', name: 'Gnom', price: 0, lvl: 2, color: '#2D5A27' },
  { id: 'knight', name: 'Ritter', price: 0, lvl: 3, color: '#90A4AE' },
  { id: 'santa', name: 'Weihnachten', price: 0, lvl: 4, color: '#D32F2F' },
  { id: 'wizard', name: 'Zauberer', price: 0, lvl: 5, color: '#4527A0' },
  { id: 'ninja', name: 'Konoha Shinobi', price: 0, lvl: 6, color: '#1a1a1a' },
  { id: 'king', name: 'König Hami', price: 0, lvl: 7, color: '#FFD700' },
  { id: 'angel', name: 'Hami-Engel', price: 100, lvl: 0, color: '#E3F2FD' },
  { id: 'devil', name: 'Teufelsbraten', price: 100, lvl: 0, color: '#B71C1C' },
  { id: 'samurai', name: 'Ronin', price: 150, lvl: 0, color: '#880E4F' },
  { id: 'cyber', name: 'Cyberpunk', price: 200, lvl: 0, color: '#00E5FF' },
  { id: 'dino', name: 'Hami-Saurus', price: 150, lvl: 0, color: '#4CAF50' },
  { id: 'unicorn', name: 'Einhorn', price: 250, lvl: 0, color: '#F48FB1' },
  { id: 'astronaut', name: 'Hami-naut', price: 200, lvl: 0, color: '#CFD8DC' }
];

// --- DIE HIGH-END GRAFIK ENGINE ---
const HamiRender = ({ id, isWorking }: { id: string, isWorking: boolean }) => {
  const c = useMemo(() => COSTUMES.find(x => x.id === id) || COSTUMES[0], [id]);
  
  return (
    <motion.div className="relative" animate={isWorking ? { x: [-8, 8, -8], rotate: [-2, 2, -2] } : { y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}>
      <svg width="260" height="260" viewBox="0 0 200 200" className="drop-shadow-2xl overflow-visible">
        
        {/* HINTERGRUND LAYER (Flügel, Umhänge) */}
        {id === 'angel' && (
          <motion.g animate={{ scale: [1, 1.1, 1], rotate: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 2 }}>
            <path d="M 40 100 Q 0 40 40 60 Q 10 90 40 110" fill="white" opacity="0.8" />
            <path d="M 160 100 Q 200 40 160 60 Q 190 90 160 110" fill="white" opacity="0.8" />
          </motion.g>
        )}
        {id === 'unicorn' && <path d="M 40 120 Q 20 160 10 120 T 40 140" fill="url(#rainbow)" stroke="white" strokeWidth="2" />}

        {/* DEFINITIONS (Gradients & Patterns) */}
        <defs>
          <linearGradient id="rainbow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF0000" /><stop offset="20%" stopColor="#FFFF00" /><stop offset="40%" stopColor="#00FF00" />
            <stop offset="60%" stopColor="#00FFFF" /><stop offset="80%" stopColor="#0000FF" /><stop offset="100%" stopColor="#FF00FF" />
          </linearGradient>
          <radialGradient id="sharingan" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff0000" /><stop offset="100%" stopColor="#8b0000" />
          </radialGradient>
        </defs>

        {/* BASIS KÖRPER */}
        <circle cx="65" cy="55" r="18" fill={c.color} stroke="#E8D5B5" strokeWidth="2" />
        <circle cx="135" cy="55" r="18" fill={c.color} stroke="#E8D5B5" strokeWidth="2" />
        <ellipse cx="100" cy="120" rx="85" ry="75" fill="#FFFFFF" stroke="#E8D5B5" strokeWidth="3" />
        <path d="M 35 110 Q 100 35, 165 110" fill={c.color} opacity="0.9" />

        {/* KOSTÜM LAYER - SPEZIFISCHE DESIGNS */}
        
        {id === 'gnome' && (
          <g>
            <path d="M 55 65 L 100 -10 L 145 65 Z" fill="#1B5E20" stroke="#0A3D0A" strokeWidth="2" />
            <circle cx="100" cy="-10" r="5" fill="white" />
            <path d="M 70 125 Q 100 185, 130 125" fill="white" stroke="#EEE" strokeWidth="1" />
          </g>
        )}

        {id === 'knight' && (
          <g>
            <path d="M 50 40 L 150 40 L 150 90 Q 100 100, 50 90 Z" fill="#90A4AE" stroke="#455A64" strokeWidth="2" />
            <rect x="65" y="60" width="70" height="6" fill="#263238" rx="2" />
            <path d="M 100 15 L 115 40 L 85 40 Z" fill="#D32F2F" />
          </g>
        )}

        {id === 'ninja' && (
          <g>
            <rect x="40" y="70" width="120" height="30" fill="#222" />
            <rect x="80" y="75" width="40" height="20" fill="#BBB" rx="3" />
            {/* Konoha Wirbel */}
            <path d="M 95 85 Q 100 78, 105 85 T 100 92" fill="none" stroke="black" strokeWidth="1.5" />
            <circle cx="92" cy="88" r="1" fill="black" />
          </g>
        )}

        {id === 'wizard' && (
          <g>
            <path d="M 40 70 L 100 -20 L 160 70 Z" fill="#311B92" />
            <path d="M 30 70 L 170 70 L 170 80 L 30 80 Z" fill="#311B92" />
            <Star size={10} x="90" y="20" color="gold" fill="gold" />
          </g>
        )}

        {id === 'cyber' && (
          <g>
            <rect x="55" y="80" width="90" height="25" fill="rgba(0, 229, 255, 0.4)" stroke="#00E5FF" strokeWidth="2" rx="4" />
            <motion.path 
              d="M 40 80 L 20 60 M 160 80 L 180 60" 
              stroke="#00E5FF" strokeWidth="2" 
              animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.5 }} 
            />
            <Zap size={12} x="95" y="45" color="#00E5FF" fill="#00E5FF" />
          </g>
        )}

        {id === 'angel' && <ellipse cx="100" cy="30" rx="35" ry="10" fill="none" stroke="#FFD700" strokeWidth="5" />}
        
        {id === 'astronaut' && (
          <g>
            <circle cx="100" cy="95" r="68" fill="rgba(173, 216, 230, 0.2)" stroke="white" strokeWidth="4" />
            <rect x="80" y="145" width="40" height="15" fill="#D32F2F" rx="4" />
          </g>
        )}

        {id === 'dino' && (
          <g fill="#388E3C">
            <path d="M 80 40 L 100 10 L 120 40" />
            <path d="M 50 60 L 65 40 L 80 60" />
            <path d="M 120 60 L 135 40 L 150 60" />
          </g>
        )}

        {/* GESICHTSEBENE */}
        <g>
          {/* Ninja Sharingan Spezial */}
          {id === 'ninja' ? (
            <g>
              <circle cx="75" cy="95" r="10" fill="url(#sharingan)" stroke="black" strokeWidth="1" />
              <circle cx="125" cy="95" r="10" fill="url(#sharingan)" stroke="black" strokeWidth="1" />
              <circle cx="75" cy="95" r="2" fill="black" />
              <circle cx="125" cy="95" r="2" fill="black" />
              <circle cx="75" cy="90" r="1.5" fill="black" />
              <circle cx="125" cy="90" r="1.5" fill="black" />
            </g>
          ) : (
            <>
              <circle cx="75" cy="95" r="10" fill="#1a1a1a" />
              <circle cx="125" cy="95" r="10" fill="#1a1a1a" />
              <circle cx="78" cy="91" r="4" fill="white" />
              <circle cx="128" cy="91" r="4" fill="white" />
            </>
          )}

          {/* Wangen & Schnurrhaare */}
          <circle cx="55" cy="115" r="10" fill="#FFB6C1" opacity="0.4" />
          <circle cx="145" cy="115" r="10" fill="#FFB6C1" opacity="0.4" />
          <g stroke="#D2B48C" strokeWidth="1" strokeLinecap="round">
            <line x1="50" y1="110" x2="20" y2="105" /><line x1="50" y1="118" x2="20" y2="125" />
            <line x1="150" y1="110" x2="180" y2="105" /><line x1="150" y1="118" x2="180" y2="125" />
          </g>

          <circle cx="100" cy="110" r="6" fill="#FF80AB" />
          <path d="M 90 125 Q 100 135, 110 125" fill="none" stroke="#333" strokeWidth="3" strokeLinecap="round" />
          <rect x="96" y="118" width="8" height="6" fill="white" stroke="#333" strokeWidth="1" />
        </g>

        {/* Pfötchen */}
        <ellipse cx="70" cy="150" rx="12" ry="10" fill="white" stroke="#E8D5B5" />
        <ellipse cx="130" cy="150" rx="12" ry="10" fill="white" stroke="#E8D5B5" />

        {isWorking && (
          <g transform="translate(150, 140)">
            <rect width="40" height="30" fill="#5D4037" rx="5" />
            <path d="M 10 0 L 10 -10 L 30 -10 L 30 0" fill="none" stroke="#5D4037" strokeWidth="3" />
            <rect x="-100" y="-120" width="40" height="20" fill="#222" rx="2" />
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
  const [message, setMessage] = useState("Na, heute schon Kerne gegessen?");
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

  const say = (arr: string[]) => { 
    setMessage(arr[Math.floor(Math.random() * arr.length)]); 
    setTimeout(() => setMessage(""), 6000); // 6 Sekunden Lesezeit
  };

  const handleCheat1 = () => { if(prompt("Cheat Code (Rich/XP)?") === "6212") { setCoins(c => c + 10000); setXp(x => x + 1000); say(["BAM! Wer ist jetzt der King?"]); }};
  const handleCheat2 = () => { if(prompt("Cheat Code (Hunger/💩)?") === "6212") { setHunger(h => h / 2); setPoops(p => [...p, {id:Date.now(), x:30, y:40},{id:Date.now()+1, x:50, y:60},{id:Date.now()+2, x:70, y:50}]); say(["Das war definitiv abgelaufen..."]); }};

  const resetProgress = () => {
    if(prompt("Reset Code?") === "6212") {
      if(window.confirm("Bist du sicher? ALLES wird gelöscht!")) {
        localStorage.clear(); window.location.reload();
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
                setGameActive(false); setGameResult(gameScore); setXp(x => x + gameScore);
                clearInterval(spawn); clearInterval(timer);
                return 0;
            }
            return t - 1;
        });
    }, 1000);
    return () => { clearInterval(spawn); clearInterval(timer); };
  }, [gameActive, gameScore]);

  return (
    <div className="min-h-screen bg-[#FFF9F2] p-4 font-sans select-none overflow-hidden flex flex-col items-center">
      
      {/* CHEATS MIT BESCHRIFTUNG */}
      <button onClick={handleCheat2} className="fixed top-2 left-2 bg-white/40 p-1 rounded text-[8px] font-black z-[100] hover:bg-white border italic flex items-center gap-1 opacity-20 hover:opacity-100 transition-opacity"><Key size={8}/> CHEAT: HUNGER/💩</button>
      <button onClick={handleCheat1} className="fixed top-2 right-2 bg-white/40 p-1 rounded text-[8px] font-black z-[100] hover:bg-white border italic flex items-center gap-1 opacity-20 hover:opacity-100 transition-opacity"><Key size={8}/> CHEAT: XP/GOLD</button>

      {/* HEADER */}
      <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-[2rem] shadow-xl border-4 border-white flex flex-col items-center">
          <Trophy className="text-orange-400 mb-1" />
          <span className="text-2xl font-black italic">LVL {level}</span>
          <div className="w-full h-2 bg-slate-100 rounded-full mt-2 overflow-hidden border">
            <motion.div animate={{ width: `${xp % 100}%` }} className="h-full bg-orange-400" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-[2rem] shadow-xl border-4 border-white flex flex-col items-center">
          <Coins className="text-amber-500 mb-1" />
          <span className="text-2xl font-black italic">{coins}</span>
        </div>
        <div className="bg-white p-4 rounded-[2rem] shadow-xl border-4 border-white flex flex-col items-center">
          <Utensils className="text-green-500 mb-1" />
          <span className="text-xl font-black italic">{Math.round(hunger)}% Hunger</span>
        </div>
        <div className="bg-white p-4 rounded-[2rem] shadow-xl border-4 border-white flex flex-col items-center text-red-500">
          <Heart className="mb-1" />
          <span className="text-xl font-black italic">{Math.round(affection)}% Liebe</span>
          <div className="w-full h-2 bg-slate-100 rounded-full mt-2 overflow-hidden border">
            <motion.div animate={{ width: `${affection}%` }} className="h-full bg-red-400" />
          </div>
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
                    }} className={`p-2 rounded-xl border-2 text-[10px] font-black uppercase transition-all ${currentId === c.id ? 'border-orange-500 bg-orange-50' : 'border-slate-50'} ${!canUse ? 'opacity-60 cursor-not-allowed' : 'opacity-100'}`}>
                      {c.name} {!canUse && <div className="text-[8px] text-amber-600 font-bold">{c.lvl > 0 ? `LVL ${c.lvl}` : `💰 ${c.price}`}</div>}
                    </button>
                  );
                })}
             </div>
          </div>
        </div>
      </main>

      {/* MINIGAME OVERLAY */}
      <AnimatePresence>
        {gameActive && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 bg-sky-400 z-[200] p-8 flex flex-col items-center">
             <div className="flex justify-between w-full max-w-2xl mb-4 text-white font-black italic text-4xl uppercase">
                 <h2>KERNE: {gameScore}/40</h2>
                 <h2>ZEIT: {gameTime}S</h2>
             </div>
             <div className="relative w-full h-full max-w-2xl bg-white/20 rounded-[3rem] overflow-hidden cursor-crosshair">
               <AnimatePresence>
                 {seeds.map(s => (
                   <motion.div 
                    key={s.id} 
                    initial={{y:-100, x:`${s.x}%`}} 
                    animate={{y:1000}} 
                    exit={{scale:0, opacity:0, rotate: 180}} // Verschwindet beim Klicken
                    onClick={(e) => { 
                      e.stopPropagation(); // Verhindert Doppelklicks
                      if(gameScore < 40){
                        setGameScore(prev => prev + 1); 
                        setSeeds(prev => prev.filter(x => x.id !== s.id));
                      }
                    }} 
                    transition={{duration:2, ease:"linear"}} 
                    className="absolute text-5xl cursor-pointer select-none"
                   >🌻</motion.div>
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
