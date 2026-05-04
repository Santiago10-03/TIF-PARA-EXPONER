/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  BarChart, 
  Users, 
  AlertTriangle, 
  Heart, 
  Brain, 
  Activity, 
  Globe, 
  Search, 
  Lightbulb, 
  AlertCircle,
  Menu,
  X
} from 'lucide-react';
import { 
  BarChart as ReBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { slides, type SlideData } from './data';
import { cn } from './lib/utils';

const ICON_MAP: Record<string, any> = {
  'bar-chart': BarChart,
  'users': Users,
  'alert-triangle': AlertTriangle,
  'heart': Heart,
  'brain': Brain,
  'activity': Activity,
  'globe': Globe,
  'users-2': Users,
  'search': Search,
  'bar-chart-3': BarChart,
  'lightbulb': Lightbulb,
  'alert-circle': AlertCircle,
};

export default function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showMenu, setShowMenu] = useState(false);

  const nextSlide = useCallback(() => {
    if (currentSlideIndex < slides.length - 1) {
      setDirection(1);
      setCurrentSlideIndex(prev => prev + 1);
    }
  }, [currentSlideIndex]);

  const prevSlide = useCallback(() => {
    if (currentSlideIndex > 0) {
      setDirection(-1);
      setCurrentSlideIndex(prev => prev - 1);
    }
  }, [currentSlideIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const currentSlide = slides[currentSlideIndex];

  return (
    <div className="relative h-screen w-full bg-midnight overflow-hidden font-sans selection:bg-brand-pink/30 mesh-gradient">
      {/* Header / Nav */}
      <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50">
        <div className="flex items-center gap-3">
          <div className="glass w-10 h-10 bg-brand-purple rounded-lg flex items-center justify-center font-bold text-lg shadow-lg">
            P
          </div>
          <span className="text-sm font-medium tracking-wider text-white/70 hidden sm:block">
            INVESTIGACIÓN UCV 2026
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowMenu(true)}
            className="glass p-3 hover:bg-white/10 rounded-xl transition-colors"
          >
            <Menu className="w-6 h-6 text-white/70" />
          </button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-white/5 z-50">
        <motion.div 
          className="h-full bg-brand-purple"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlideIndex + 1) / slides.length) * 100}%` }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        />
      </div>

      {/* Main Content Area */}
      <main className="relative h-full w-full flex items-center justify-center p-8 sm:p-12 md:p-24 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide.id}
            custom={direction}
            initial={{ x: direction > 0 ? 1000 : -1000, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? -1000 : 1000, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            className="w-full max-w-6xl z-10 glass rounded-[2.5rem] p-12 md:p-16 relative overflow-hidden"
          >
            {/* Background Number Detail */}
            <div className="absolute top-0 right-0 p-8 text-white/5 font-black text-9xl select-none hidden md:block">
              {String(currentSlideIndex + 1).padStart(2, '0')}
            </div>
            <SlideRenderer slide={currentSlide} />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer / Controls */}
      <footer className="absolute bottom-0 left-0 right-0 p-8 flex justify-between items-center z-50">
        <div className="glass px-6 h-12 flex items-center rounded-full text-white/60 text-xs font-mono uppercase tracking-widest backdrop-blur-md">
          Pág {currentSlideIndex + 1} de {slides.length}
        </div>
        
        <div className="flex gap-3">
          <button 
            disabled={currentSlideIndex === 0}
            onClick={prevSlide}
            className="glass w-14 h-14 flex items-center justify-center rounded-full hover:bg-white/15 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            disabled={currentSlideIndex === slides.length - 1}
            onClick={nextSlide}
            className="glass w-14 h-14 flex items-center justify-center rounded-full bg-brand-purple/40 border-brand-purple/50 hover:bg-brand-purple/60 disabled:opacity-20 disabled:cursor-not-allowed shadow-lg shadow-brand-purple/20 transition-all font-bold"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </footer>

      {/* Navigation Menu Overlay */}
      <AnimatePresence>
        {showMenu && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-midnight/95 backdrop-blur-md z-[100] flex items-center justify-center p-8"
          >
            <button 
              onClick={() => setShowMenu(false)}
              className="absolute top-8 right-8 p-4 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="max-w-2xl w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setDirection(idx > currentSlideIndex ? 1 : -1);
                    setCurrentSlideIndex(idx);
                    setShowMenu(false);
                  }}
                  className={cn(
                    "text-left p-4 rounded-xl border transition-all flex items-start gap-4",
                    idx === currentSlideIndex 
                      ? "bg-brand-pink/10 border-brand-pink text-white" 
                      : "bg-white/5 border-white/5 hover:bg-white/10 text-white/50"
                  )}
                >
                  <span className="font-mono text-xs mt-1 shrink-0">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="font-medium truncate">{s.title}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SlideRenderer({ slide }: { slide: SlideData }) {
  const content = slide.content;

  switch (slide.type) {
    case 'title':
      return (
        <div className="space-y-8 pt-24 md:pt-40">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 bg-brand-purple rounded-md text-xs font-bold uppercase tracking-[0.2em] shadow-lg shadow-brand-purple/30"
          >
            {content.tag}
          </motion.div>
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-6xl font-display font-extrabold tracking-tight leading-[1.1] text-white"
          >
            {slide.title}
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl text-slate-400 font-medium italic max-w-2xl leading-relaxed"
          >
            {slide.subtitle}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="pt-12 border-t border-white/5 text-slate-500 text-sm font-medium"
          >
            {content.authors}
          </motion.div>
        </div>
      );

    case 'stats':
      return (
        <div className="space-y-12 w-full">
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-12 border-l-4 border-brand-purple pl-6">
            {slide.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.stats && content.stats.map((stat: any, i: number) => (
              <motion.div 
                key={i}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 * i }}
                className="glass p-10 rounded-3xl group"
              >
                <div className="text-5xl lg:text-7xl font-display font-black text-brand-purple mb-4 group-hover:scale-105 transition-transform origin-left">
                  {stat.value}
                </div>
                <div className="text-lg text-slate-300 leading-relaxed font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
            {content.grid && content.grid.map((item: any, i: number) => {
              const Icon = ICON_MAP[item.icon] || Globe;
              return (
                <motion.div 
                  key={i}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * i }}
                  className="glass p-8 rounded-3xl"
                >
                  <Icon className="w-10 h-10 text-brand-purple mb-6" />
                  <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
            {content.findings && content.findings.map((finding: any, i: number) => {
              const Icon = ICON_MAP[finding.icon] || Globe;
              return (
                <motion.div 
                  key={i}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * i }}
                  className="glass p-8 rounded-3xl"
                >
                  <div className="w-12 h-12 bg-brand-purple rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-brand-purple/20">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-brand-purple">{finding.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{finding.desc}</p>
                </motion.div>
              );
            })}
          </div>
          {content.footer && (
            <div className="glass bg-white/5 p-6 rounded-2xl flex items-start gap-4">
              <AlertCircle className="w-5 h-5 text-brand-pink shrink-0" />
              <p className="text-sm text-slate-300 leading-relaxed italic">{content.footer}</p>
            </div>
          )}
          {content.source && (
            <p className="text-right text-xs text-white/30 font-medium">
              {content.source}
            </p>
          )}
        </div>
      );

    case 'list':
      return (
        <div className="space-y-12">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-8">
            {slide.title}
          </h2>
          {content.mainBox && (
            <motion.div 
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="glass p-10 md:p-14 rounded-[2rem] text-2xl md:text-3xl leading-snug font-medium italic mb-16 text-slate-100 text-center shadow-2xl"
            >
              "{content.mainBox}"
            </motion.div>
          )}
          <div className="space-y-6">
            {content.items && content.items.map((item: any, i: number) => {
              const Icon = ICON_MAP[item.icon] || BarChart;
              return (
                <motion.div 
                  key={i}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * i }}
                  className="flex items-center gap-8 group"
                >
                   <div className="glass w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform bg-white/5">
                    <Icon className="w-8 h-8 text-brand-purple" />
                   </div>
                   <div>
                    <div className="text-3xl md:text-4xl font-display font-black text-white">
                      {item.value}
                    </div>
                    <div className="text-slate-400 font-medium">
                      {item.label}
                    </div>
                   </div>
                </motion.div>
              );
            })}
            
            {content.objectives && (
              <div className="space-y-8">
                <h3 className="text-brand-purple font-bold uppercase tracking-widest text-sm">{content.objectivesTitle}</h3>
                <div className="space-y-4">
                  {content.objectives.map((obj: string, i: number) => (
                    <motion.div 
                      key={i}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 * i }}
                      className="flex items-center gap-4 text-lg md:text-xl text-slate-300"
                    >
                      <span className="w-10 h-10 rounded-full flex items-center justify-center glass bg-brand-purple text-white font-bold shrink-0">{i + 1}</span>
                      {obj}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {content.literature && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.literature.map((lit: any, i: number) => (
                  <motion.div 
                    key={i}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * i }}
                    className="p-8 glass border-l-4 border-brand-purple rounded-r-2xl"
                  >
                    <h4 className="text-sm font-bold text-brand-purple mb-1">{lit.author}</h4>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-4">{lit.journal}</p>
                    <p className="text-slate-300 font-medium leading-relaxed italic">"{lit.text}"</p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
          {content.source && <p className="text-right text-xs text-white/30 font-medium mt-12">{content.source}</p>}
        </div>
      );

    case 'chart':
      return (
        <div className="space-y-12 h-full">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-12">{slide.title}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-2 h-[450px] glass p-8 rounded-3xl">
              <ResponsiveContainer width="100%" height="100%">
                <ReBarChart
                  data={content.data}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis 
                    dataKey="name" 
                    stroke="rgba(255,255,255,0.3)" 
                    tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 14 }}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.3)" 
                    tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 14 }}
                    unit="%"
                    axisLine={false}
                  />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ 
                      backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                      borderColor: 'rgba(99, 102, 241, 0.3)',
                      borderRadius: '16px',
                      color: 'white',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px' }}
                    verticalAlign="bottom"
                    align="center"
                    iconType="circle"
                  />
                  <Bar dataKey="Peru" name="Perú 2023 (%)" radius={[6, 6, 0, 0]}>
                    {content.data.map((_: any, index: number) => (
                      <Cell key={`cell-peru-${index}`} fill="#334155" />
                    ))}
                  </Bar>
                  <Bar dataKey="Piura" name="Piura 2024 (%)" radius={[6, 6, 0, 0]}>
                    {content.data.map((_: any, index: number) => (
                      <Cell key={`cell-piura-${index}`} fill="#6366f1" />
                    ))}
                  </Bar>
                </ReBarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-6">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="glass bg-brand-purple/20 p-10 rounded-[2rem] border-brand-purple/30"
              >
                <div className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-4">Dato clave</div>
                <p className="text-2xl md:text-3xl font-display font-extrabold leading-tight text-white">
                  {content.keyNote}
                </p>
              </motion.div>
              <div className="px-6 flex items-center gap-4 text-slate-400 text-sm font-medium italic">
                <AlertCircle className="w-5 h-5 text-brand-purple" />
                {content.observation}
              </div>
            </div>
          </div>
        </div>
      );

    case 'columns':
      return (
        <div className="space-y-12">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-12">{slide.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content.sections.map((section: any, i: number) => (
              <div key={i} className="space-y-6">
                <div className={cn(
                  "glass p-4 rounded-xl text-sm font-black tracking-[0.3em] text-center",
                  i === 0 ? "bg-brand-purple/40 border-brand-purple/50 shadow-lg shadow-brand-purple/20" : "bg-white/5 border-white/10"
                )}>
                  {section.title}
                </div>
                <div className="space-y-4">
                  {section.items.map((item: string, j: number) => (
                    <motion.div 
                      key={j}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * j + 0.3 * i }}
                      className="glass p-6 rounded-2xl text-lg font-medium hover:bg-white/10 transition-colors text-slate-200"
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-slate-500 italic pt-12">{content.footer}</p>
        </div>
      );

    case 'conclusion':
      return (
        <div className="space-y-12">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-12 text-white">
            {slide.title}
          </h2>
          <div className="flex flex-col gap-4">
            {content.bullets.map((bullet: string, i: number) => (
              <motion.div 
                key={i}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 * i }}
                className="group flex items-center gap-8 p-6 glass rounded-3xl hover:bg-white/10 transition-all"
              >
                <div className="w-12 h-12 shrink-0 rounded-full bg-brand-purple flex items-center justify-center text-white shadow-lg shadow-brand-purple/20">
                  <Activity className="w-6 h-6" />
                </div>
                <p className="text-lg md:text-xl font-medium text-slate-200 leading-snug">
                  {bullet}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      );

    case 'final':
      return (
        <div className="text-center space-y-16 pt-24 md:pt-32">
          <div className="space-y-12">
            <motion.h1 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-4xl md:text-6xl font-display font-black leading-[1.1] tracking-tight text-white"
            >
              {slide.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-3xl text-slate-400 font-medium max-w-4xl mx-auto italic"
            >
              {slide.subtitle}
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, type: 'spring' }}
            className="inline-block px-14 py-8 glass bg-brand-purple/30 rounded-[2.5rem] text-3xl md:text-4xl font-extrabold shadow-2xl shadow-brand-purple/20 border-brand-purple/50 active:scale-95 transition-transform cursor-pointer"
          >
            {content.thanks}
          </motion.div>
          
          <div className="pt-24 text-slate-600 text-xs font-medium uppercase tracking-[0.3em]">
            {content.authors}
          </div>
        </div>
      );

    default:
      return null;
  }
}

