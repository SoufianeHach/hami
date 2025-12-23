import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Moon, Trash2, Play, Lock, Trophy, Coins, Briefcase, ShoppingBag, Utensils, X, Star, AlertTriangle, RefreshCw } from 'lucide-react';

// --- TEXTE & KOSTÜME (Bleiben erhalten & erweitert) ---
const QUOTES = {
  pet: ["Mmh, okay, akzeptabel.", "Hach, mein Fell ist göttlich!", "Nicht die Frisur ruinieren!", "Okay, das reicht für heute.", "Du darfst mich huldigen!"],
  petFull: ["Ich bin wunschlos glücklich, lass mich!", "Kein Bedarf an Liebe gerade, geh weg!", "Zuneigungslimit erreicht! Nerv nicht!", "Ich bin vollgestopft mit Liebe, bäh!"],
  feed: ["Thomai hat sich selbst übertroffen!", "Boah, Thomai kocht wie ein Gott!", "Nom nom... Thomai for President!", "Sag Thomai, das war 5-Sterne-Niveau!"],
  fat: ["Willst du mich mästen? Ich pass kaum noch in die Rüstung!", "Stopp! Ich rolle sonst bald durchs Zimmer!", "Ich bin satt!"],
  workStart: ["Ab ins Büro... argh.", "Karriere ruft! Stör mich bloß nicht!", "Zeit ist Gold."],
  workCancel: ["Früh Feierabend? Faulpelz!", "Karriere abgebrochen. Zurück zum Sofa."],
  clean: ["Endlich! Hier hat's gestunken.", "Glänze wieder wie ein Neuwagen!"],
  gameEnd: ["Spiel vorbei!", "Kerne gesichert!", "Gute Ausbeute!"]
};

const COSTUMES = [
  { id: 'default', name: 'Hami Pur', price: 0, lvl: 1, color: '#FFA857' },
  { id: 'gnome', name: 'Gnom', price: 0, lvl: 2, color: '#2D5A27' },
  { id: 'knight', name: 'Ritter', price: 0, lvl: 3, color: '#90A4AE' },
  { id: 'santa', name: 'Weihnachten', price: 0, lvl: 4, color: '#D32F2F' },
  { id: 'wizard', name: 'Zauberer', price: 0, lvl: 5, color: '#4527A0' },
  { id: 'angel', name: 'Engel', price: 100, lvl: 0, color: '#E3F2FD' },
  { id: 'devil', name: 'Teufel', price: 100, lvl: 0, color: '#B71C1C' },
  { id: 'pirate', name: 'Pirat', price: 100, lvl: 0, color: '#3E2723' },
  { id: 'astronaut', name: 'Astronaut', price: 150, lvl: 0, color: '#CFD8DC' },
  { id: 'chef', name: 'Chefkoch', price: 100, lvl: 0, color: '#FFFFFF' }
];

// --- HAMI GRAFIK (Aufwendig wie gewünscht) ---
const HamiRender = ({ id, isWorking }: any) => {
  const c = COSTUMES.find(x => x.id === id) || COSTUMES[0];
  return (
    <motion.div animate={isWorking ? { x: [-5, 5, -5], rotate: [-1, 1, -1] } : { y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}>
      <svg width="220" height="220" viewBox="0 0 200 200" className="drop-shadow-2xl">
        {id === 'angel' && <motion.g animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ repeat: Infinity, duration: 2 }} fill="white"><path d="M40 100 Q10 40 50 60 Z" /><path d="M160 100 Q190 40 150 60 Z" /></motion.g>}
        <circle cx="65" cy="55" r="18" fill={c.color} stroke="#E8D5B5" strokeWidth="2" />
        <circle cx="135" cy="55" r="18" fill={c.color} stroke="#E8D5B5" strokeWidth="2" />
        <ellipse cx="100" cy="115" rx="75" ry="70" fill="#FFFFFF" stroke="#E8D5B5" strokeWidth="3" />
        <path d="M 40 100 Q 100 40, 160 100" fill={c.color} opacity="0.9" />
        {id === 'knight' && <g><rect x="55" y="45" width="90" height="50" rx="10" fill="#B0BEC5" /><rect x="65" y="65" width="70" height="4" fill="#546E7A" /><path d="M100 20 L110 45 L90 45 Z" fill="red" /></g>}
        {id === 'gnome' && <g><path d="M55 65 L100 0 L145 65 Z" fill="#1B5E20" /><path d="M70 115 Q100 170, 130 115 Z" fill="white" /></g>}
        {id === 'angel' && <ellipse cx="100" cy="35" rx="30" ry="8" fill="none" stroke="#FFD700" strokeWidth="4" />}
        {id === 'devil' && <g fill="#B71C1C"><path d="M60 60 L50 30 L80 55 Z" /><path d="M140 60 L150 30 L120 55 Z" /></g>}
        {id === 'wizard' && <g><path d="M50 65 L100 -10 L150 65 Z" fill="#311B92" /><circle cx="100" cy="20" r="3" fill="yellow" /></g>}
        {id === 'chef' && <rect x="75" y="10" width="50" height="55" rx="10" fill="white" stroke="#DDD" />}
        {id === 'pirate' && <g><path d="M50 65 L150 65 Q100 20, 50 65" fill="black" /><circle cx="75" cy="90" r="12" fill="black" /></g>}
        {id === 'astronaut' && <circle cx="100" cy="90" r="65" fill="rgba(173,216,230,0.2)" stroke="white" strokeWidth="3" />}
        <circle cx="75" cy="95" r="9" fill="#1a1a1a" />
        <circle cx="125" cy="95" r="9" fill="#1a1a1a" />
        <circle cx="78" cy="92" r="3" fill="white" />
        <circle cx="100" cy="110" r="5" fill="#FF80AB" />
        <path d="M 90 120 Q 100 128, 110 120" fill="none" stroke="#333" strokeWidth="2.5" strokeLinecap="round" />
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
  const [affection, setAffection] = useState(100); // NEUE LEISTE
  const [poops, setPoops] = useState<{id: number, x: number, y: number}[]>([]);
  const [currentId, setCurrentId] = useState('default');
  const [unlocked, setUnlocked] = useState(['default']);
  const [isWorking, setIsWorking] = useState(false);
  const [workLeft, setWorkLeft] = useState(0);
  const [message, setMessage] = useState("Was willst du?");
  const [gameActive, setGameActive] = useState(false);
  const [gameResult, setGameResult] = useState<number | null>(null);
  const [gameScore, setGameScore] = useState(0);
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
      setAffection(p => Math.max(0, p - 0.05)); // Zuneigung sinkt langsam
      if (Math.random() < 0.005 && poops.length < 5) setPoops(p => [...p, { id: Date.now(), x: Math.random() * 60 + 20, y: Math.random() * 50 + 30 }]);
      if (isWorking && workLeft > 0) setWorkLeft(t => t - 1);
      else if (isWorking) { setIsWorking(false); setCoins(c => c + 50); setXp(x => x + 50); say(QUOTES.feed); }
    }, 1000);
    return () => clearInterval(loop);
  }, [isWorking, workLeft, poops.length]);

  const say = (arr: string[]) => { setMessage(arr[Math.floor(Math.random() * arr.length)]); setTimeout(() => setMessage(""), 3500); };

  const handleCheat1 = () => { if(prompt("Code?") === "6212") { setCoins(c => c + 10000); setXp(x => x + 1000); say(["BAM! Reich!"]); }};
  const handleCheat2 = () => { if(prompt("Code?") === "6212") { setHunger(h => h / 2); setPoops(p => [...p, {id:1, x:30, y:40},{id:2, x:50, y:60},{id:3, x:70, y:50}]); say(["Ugh... mein Bauch..."]); }};

  const resetProgress = () => {
    if(prompt("Code?") === "6212") {
      if(window.confirm("Bist du sicher? ALLES wird gelöscht!")) {
        localStorage.clear();
        window.location.reload();
      }
    }
  };

  const petHami = () => {
    if (affection > 95) return say(QUOTES.petFull);
    const gain = 100 - affection;
    setXp(x => x + Math.floor(gain / 2));
    setAffection(100);
    say(QUOTES.pet);
  };

  const startGame = () => {
    if (Date.now() - lastGame < 3600000) return say(["Ich bin müde! In einer Stunde wieder."]);
    setGameActive(true); setGameScore(0); setSeeds([]); setGameResult(null); setLastGame(Date.now());
  };

  useEffect(() => {
    if (!gameActive) return;
    const end = setTimeout(() => {
        setGameActive(false);
        setGameResult(gameScore); // Ergebnis speichern
    }, 20000);
    const spawn = setInterval(() => setSeeds(s => [...s, { id: Date.now(), x: Math.random() * 80 + 10 }]), 600);
    return () => { clearTimeout(end); clearInterval(spawn); };
  }, [gameActive, gameScore]);

  return (
    <div className="min-h-screen bg-[#FFF9F2] p-4 font-sans select-none overflow-hidden flex flex-col items-center">
      
      {/* RESET BUTTON UNTEN LINKS */}
      <button onClick={resetProgress} className="fixed bottom-2 left-2 opacity-5 hover:opacity-100 p-2 text-red-600 transition-all z-[100] flex items-center gap-1 text-[10px] font-black italic">
        <RefreshCw size={10}/> RESET PROGRESS
      </button>

      {/* CHEAT BUTTONS OBEN */}
      <div onClick={handleCheat2} className="fixed top-0 left-0 w-16 h-16 z-[100] cursor-pointer" />
      <div onClick={handleCheat1} className="fixed top-0 right-0 w-16 h-16 z-[100] cursor-pointer" />

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
          <AnimatePresence>{message && <motion.div initial={{scale:0}} animate={{scale:1}} exit={{scale:0}} className="absolute top-10 z-50 bg-white p-4 rounded-2xl shadow-xl border-2 border-orange-100 font-bold max-w-[80%] text-center italic">{message}</motion.div>}</AnimatePresence>

          {isWorking ? (
            <div className="text-center">
              <HamiRender id={currentId} isWorking={true} />
              <p className="mt-4 font-black text-slate-400 animate-pulse uppercase tracking-widest">Bin schuften... {Math.ceil(workLeft/60)}m</p>
              <button onClick={() => {if(window.confirm("Abbrechen? Keine XP, kein Gold!")){setIsWorking(false); setWorkLeft(0); say(QUOTES.workCancel)}}} className="mt-4 bg-red-100 text-red-600 px-6 py-2 rounded-2xl font-black uppercase text-xs flex items-center gap-2"><AlertTriangle size={14}/> Abbruch</button>
            </div>
          ) : (
            <div className="relative cursor-pointer" onClick={petHami}>
              <HamiRender id={currentId} isWorking={false} />
              {poops.map(p => <button key={p.id} onClick={(e) => {e.stopPropagation(); setPoops(o=>o.filter(x=>x.id!==p.id)); setXp(x=>x+20); say(QUOTES.clean)}} style={{left:`${p.x}%`, top:`${p.y}%`}} className="absolute text-4xl z-40 transition-transform hover:scale-125">💩</button>)}
            </div>
          )}
        </div>

        <div className="w-full md:w-1/3 space-y-4">
          <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border-4 border-white">
            <h3 className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest text-center italic text-green-600">Thomai's Spezialitäten</h3>
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
                  const owned = unlocked.includes(c.id) || (c.lvl > 0 && level >= c.lvl);
                  return (
                    <button key={c.id} onClick={() => {if(owned){setCurrentId(c.id)} else if(coins >= c.price){setCoins(coins-c.price); setUnlocked([...unlocked, c.id]); setCurrentId(c.id)}}} className={`p-2 rounded-xl border-2 text-[10px] font-black uppercase ${currentId === c.id ? 'border-orange-500 bg-orange-50' : 'border-slate-50'}`}>
                      {c.name} {!owned && <div className="text-[8px] text-amber-600">{c.lvl > 0 ? `LVL ${c.lvl}` : `💰 ${c.price}`}</div>}
                    </button>
                  );
                })}
             </div>
          </div>
        </div>
      </main>

      {/* MINIGAME & RESULT OVERLAY */}
      <AnimatePresence>
        {gameActive && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 bg-sky-400 z-[200] p-8 flex flex-col items-center">
             <h2 className="text-5xl font-black text-white mb-4 italic">KERN-JAGD! ({gameScore}/40)</h2>
             <div className="relative w-full h-[120%] max-w-2xl bg-white/20 rounded-[3rem] overflow-hidden">
               {seeds.map(s => <motion.div key={s.id} initial={{y:-100, x:`${s.x}%`}} animate={{y:1500}} onClick={()=>{if(gameScore<40){setGameScore(s=>s+1); setXp(x=>x+1); setSeeds(o=>o.filter(x=>x.id!==s.id))}}} transition={{duration:2.5, ease:"linear"}} className="absolute text-5xl cursor-pointer">🌻</motion.div>)}
             </div>
          </motion.div>
        )}

        {gameResult !== null && (
            <motion.div initial={{opacity:0, scale:0.5}} animate={{opacity:1, scale:1}} exit={{opacity:0}} className="fixed inset-0 bg-black/80 z-[250] flex items-center justify-center p-8">
                <div className="bg-white p-10 rounded-[3rem] text-center shadow-2xl border-8 border-orange-400">
                    <h2 className="text-4xl font-black mb-4 italic">ERGEBNIS</h2>
                    <p className="text-2xl font-bold mb-6">Du hast <span className="text-orange-500">{gameResult}</span> Kerne gefangen!</p>
                    <p className="text-xl text-green-600 font-black mb-8">+{gameResult} XP erhalten</p>
                    <button onClick={() => setGameResult(null)} className="bg-orange-500 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-orange-600 transition-all">Super!</button>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
