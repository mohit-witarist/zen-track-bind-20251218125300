import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, CloudRain, CloudFog, Snowflake, Zap, 
  Map, Mountain, Waves, Building2, Trees,
  Play, Pause, ZoomIn, ZoomOut, Clock
} from 'lucide-react';
import useStore from '../../state/useStore';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const IconButton = ({ active, onClick, children, label }) => (
  <button
    onClick={onClick}
    className={cn(
      "p-3 rounded-xl transition-all duration-300 flex flex-col items-center gap-1 group",
      active ? "bg-white/20 text-white shadow-lg shadow-white/10" : "text-white/50 hover:text-white hover:bg-white/10"
    )}
  >
    {children}
    <span className="text-[10px] uppercase tracking-wider font-bold opacity-0 group-hover:opacity-100 transition-opacity">
      {label}
    </span>
  </button>
);

const ControlPanel = () => {
  const { 
    weather, setWeather, 
    scene, setScene, 
    speed, setSpeed, 
    time, setTime,
    isPaused, togglePause,
    cameraZoom, setCameraZoom
  } = useStore();

  const weatherIcons = [
    { id: 'sunny', icon: Sun, label: 'Sunny' },
    { id: 'rain', icon: CloudRain, label: 'Rain' },
    { id: 'fog', icon: CloudFog, label: 'Fog' },
    { id: 'snow', icon: Snowflake, label: 'Snow' },
    { id: 'storm', icon: Zap, label: 'Storm' },
  ];

  const sceneIcons = [
    { id: 'countryside', icon: Map, label: 'Fields' },
    { id: 'mountains', icon: Mountain, label: 'Peaks' },
    { id: 'coastal', icon: Waves, label: 'Sea' },
    { id: 'city', icon: Building2, label: 'Metro' },
    { id: 'forest', icon: Trees, label: 'Woods' },
  ];

  return (
    <motion.div 
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50 pointer-events-none"
    >
      {/* Weather Controls */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-2 rounded-2xl flex flex-col gap-1 pointer-events-auto">
        <p className="text-white/30 text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1">Weather</p>
        {weatherIcons.map(({ id, icon: Icon, label }) => (
          <IconButton key={id} active={weather === id} onClick={() => setWeather(id)} label={label}>
            <Icon size={20} />
          </IconButton>
        ))}
      </div>

      {/* Scene Controls */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-2 rounded-2xl flex flex-col gap-1 pointer-events-auto">
        <p className="text-white/30 text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1">Scene</p>
        {sceneIcons.map(({ id, icon: Icon, label }) => (
          <IconButton key={id} active={scene === id} onClick={() => setScene(id)} label={label}>
            <Icon size={20} />
          </IconButton>
        ))}
      </div>

      {/* Simulation Controls */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex flex-col gap-4 pointer-events-auto w-64 absolute -left-[280px] top-0">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={togglePause}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-white"
            >
              {isPaused ? <Play fill="currentColor" size={20} /> : <Pause fill="currentColor" size={20} />}
            </button>
            <div className="flex gap-2">
               <button onClick={() => setCameraZoom(Math.max(0.5, cameraZoom - 0.1))} className="p-3 bg-white/10 rounded-xl text-white"><ZoomOut size={20}/></button>
               <button onClick={() => setCameraZoom(Math.min(2, cameraZoom + 0.1))} className="p-3 bg-white/10 rounded-xl text-white"><ZoomIn size={20}/></button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-[10px] text-white/50 uppercase font-bold tracking-widest">
              <span>Speed</span>
              <span>{Math.round(speed * 100)}%</span>
            </div>
            <input 
              type="range" min="0" max="1" step="0.01" value={speed} 
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full accent-white"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-[10px] text-white/50 uppercase font-bold tracking-widest">
              <span>Time of Day</span>
              <span>{Math.floor(time)}:00</span>
            </div>
            <div className="relative">
              <input 
                type="range" min="0" max="24" step="0.1" value={time} 
                onChange={(e) => setTime(parseFloat(e.target.value))}
                className="w-full accent-white"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ControlPanel;
