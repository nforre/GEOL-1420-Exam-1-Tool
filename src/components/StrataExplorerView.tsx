import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Layers, 
  Waves, 
  Atom, 
  Flame, 
  HelpCircle, 
  Info, 
  Sparkles,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  RefreshCw
} from 'lucide-react';
import { GEOLOGICAL_TIMELINE_STRATA } from '../data/geologyData';
import { sound } from '../utils/sound';

export const StrataExplorerView: React.FC = () => {
  const [activeModel, setActiveModel] = useState<'facies' | 'steno' | 'isotopes' | 'carbon'>('facies');

  // Facies model state
  const [seaLevel, setSeaLevel] = useState<number>(50); // 0 = lowest (Regression), 100 = highest (Transgression)

  // Isotope / Radioactive decay model state
  const [halfLivesElapsed, setHalfLivesElapsed] = useState<number>(2); // 0 to 5

  // Carbon cycle toggle
  const [carbonMode, setCarbonMode] = useState<'burial_wins' | 'decomp_wins'>('burial_wins');
  const [climateMode, setClimateMode] = useState<'glacial' | 'interglacial'>('glacial');

  // Calculations for radioactive decay
  const parentPct = Math.max(0, 100 * Math.pow(0.5, halfLivesElapsed));
  const daughterPct = 100 - parentPct;
  const zirconU238HalfLifeMa = 4468; // 4.468 billion years (4,468 Ma)
  const calculatedAgeMa = Math.round(halfLivesElapsed * zirconU238HalfLifeMa);

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-white flex items-center gap-2">
            <Layers className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            Interactive Geological Strata & Concept Models
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Simulate Walther's Law, Steno’s principles of relative dating, Zircon U-Pb radioactive decay, and carbon cycle fluxes.
          </p>
        </div>

        {/* Model Switcher Tabs */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-slate-800 rounded-xl">
          <button
            onClick={() => { sound.playFlip(); setActiveModel('facies'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeModel === 'facies'
                ? 'bg-white dark:bg-slate-700 text-stone-900 dark:text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Facies Spectrum
          </button>
          <button
            onClick={() => { sound.playFlip(); setActiveModel('steno'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeModel === 'steno'
                ? 'bg-white dark:bg-slate-700 text-stone-900 dark:text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Steno's Principles
          </button>
          <button
            onClick={() => { sound.playFlip(); setActiveModel('isotopes'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeModel === 'isotopes'
                ? 'bg-white dark:bg-slate-700 text-stone-900 dark:text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Zircon Dating
          </button>
          <button
            onClick={() => { sound.playFlip(); setActiveModel('carbon'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeModel === 'carbon'
                ? 'bg-white dark:bg-slate-700 text-stone-900 dark:text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Carbon & Isotopes
          </button>
        </div>
      </div>

      {/* Model 1: Facies & Transgression / Regression */}
      {activeModel === 'facies' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Visualizer: Interactive Strata Column */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-stone-900 dark:text-white">
                  Lithology Spectrum: Walther's Law
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Coarse Sand → Fine Sand → Shale → Limestone
                </p>
              </div>
              <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-stone-100 dark:bg-slate-700 text-stone-700 dark:text-stone-300">
                {seaLevel > 50 ? 'Transgression (Sea Rise)' : 'Regression (Sea Fall)'}
              </span>
            </div>

            {/* Sea Level Slider Control */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-750 border border-stone-200/80 dark:border-slate-700/80 space-y-2">
              <div className="flex items-center justify-between text-xs font-medium text-stone-700 dark:text-stone-300">
                <span className="flex items-center gap-1.5">
                  <Waves className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  Relative Sea Level: <strong className="font-mono">{seaLevel}%</strong>
                </span>
                <span className="text-[11px] text-stone-400">
                  Slide to simulate Shoreline Shift
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                value={seaLevel}
                onChange={(e) => setSeaLevel(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 font-medium">
                <span>Nearshore / Beach Regression</span>
                <span>Deep Marine Transgression</span>
              </div>
            </div>

            {/* Dynamic Stratigraphic Column */}
            <div className="space-y-2 pt-2">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 flex justify-between">
                <span>Youngest (Top of Column)</span>
                <span>Principle of Superposition</span>
              </div>

              {/* Render dynamic strata height according to sea level */}
              <div className="rounded-2xl border-2 border-stone-300 dark:border-slate-700 overflow-hidden shadow-xs divide-y divide-stone-300/40 dark:divide-slate-700">
                {/* 1. Limestone (thicker when sea level is high) */}
                <motion.div
                  animate={{ height: `${25 + (seaLevel / 100) * 45}px` }}
                  className="bg-[#3b4a54] text-white p-3 flex items-center justify-between text-xs font-semibold relative overflow-hidden transition-all"
                  style={{
                    backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)',
                    backgroundSize: '12px 12px'
                  }}
                >
                  <div className="relative z-10 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block" />
                    <span>Limestone Facies (Deep Quiet Offshore)</span>
                  </div>
                  <span className="text-[10px] opacity-80 font-mono">Mollusks & Corals</span>
                </motion.div>

                {/* 2. Shale */}
                <motion.div
                  animate={{ height: `${35 + Math.sin(seaLevel / 20) * 10}px` }}
                  className="bg-[#6e7f86] text-white p-3 flex items-center justify-between text-xs font-semibold relative overflow-hidden transition-all"
                >
                  <div className="relative z-10 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-300 inline-block" />
                    <span>Shale / Mudstone Facies (Low-Oxygen Dysoxic Shelf)</span>
                  </div>
                  <span className="text-[10px] opacity-80 font-mono">Graptolites & Pyrite</span>
                </motion.div>

                {/* 3. Fine Sandstone */}
                <motion.div
                  animate={{ height: `${40 - (seaLevel / 100) * 15}px` }}
                  className="bg-[#8e9a63] text-stone-900 p-3 flex items-center justify-between text-xs font-semibold relative overflow-hidden transition-all"
                >
                  <div className="relative z-10 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-lime-800 inline-block" />
                    <span>Fine Sandstone (Distal Shoreface)</span>
                  </div>
                  <span className="text-[10px] opacity-80 font-mono">Trace Burrows</span>
                </motion.div>

                {/* 4. Coarse Sandstone / Conglomerate */}
                <motion.div
                  animate={{ height: `${50 - (seaLevel / 100) * 25}px` }}
                  className="bg-[#c9a46a] text-stone-950 p-3 flex items-center justify-between text-xs font-semibold relative overflow-hidden transition-all"
                >
                  <div className="relative z-10 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-900 inline-block" />
                    <span>Coarse Sand & Conglomerate (Nearshore Surf Zone)</span>
                  </div>
                  <span className="text-[10px] opacity-80 font-mono">High Energy Abrasion</span>
                </motion.div>
              </div>

              <div className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
                Oldest (Bottom of Column)
              </div>
            </div>
          </div>

          {/* Right Information & Exam Takeaways */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
              <Sparkles className="w-5 h-5" />
              <h3 className="text-sm font-bold">Exam Review Sheet Context</h3>
            </div>

            <div className="space-y-3 text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-slate-750 border border-stone-200/80 dark:border-slate-700/80 space-y-1">
                <strong className="font-bold text-stone-900 dark:text-white block">
                  Grain Size Spectrum (Exam Page 7)
                </strong>
                <p>
                  Sediment particles settle according to energy: <code className="font-mono text-amber-800 dark:text-amber-300">Coarse Sand → Fine Sand → Shale → Limestone</code>.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-slate-750 border border-stone-200/80 dark:border-slate-700/80 space-y-1">
                <strong className="font-bold text-stone-900 dark:text-white block">
                  Transgression vs. Regression
                </strong>
                <p>
                  During a <strong>transgression</strong> (sea level rise), deep marine limestone gets deposited on top of nearshore sand. During a <strong>regression</strong> (sea level fall), nearshore coarse sand is deposited on top of offshore shale/limestone.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-slate-750 border border-stone-200/80 dark:border-slate-700/80 space-y-1">
                <strong className="font-bold text-stone-900 dark:text-white block">
                  Mega Sequences (Exam Page 6)
                </strong>
                <p>
                  The review sheet defines Mega Sequences as: <em>"Really big transgression / regression cycles"</em>, bounded across continents by major craton-wide unconformities.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Model 2: Steno's Principles & Relative Dating Cross Section */}
      {activeModel === 'steno' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold text-stone-900 dark:text-white">
                Steno's Principles of Relative Dating (Exam Review Page 5)
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Nicholas Steno (1669) established the foundational laws of historical geology.
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60">
              5 Core Principles
            </span>
          </div>

          {/* Interactive Illustrated Diagram */}
          <div className="relative p-6 rounded-2xl bg-stone-100 dark:bg-slate-900 border border-stone-300 dark:border-slate-700 overflow-hidden min-h-[300px]">
            {/* Strata Bed 3 (Top - Younger) */}
            <div className="h-16 bg-[#a8633f]/70 border-b-2 border-stone-400/50 flex items-center px-4 justify-between text-xs font-bold text-white relative">
              <span>Layer C (Sandstone) — Deposited Horizontally on Top</span>
              <span className="text-[10px] bg-black/30 px-2 py-0.5 rounded">Youngest Sedimentary Bed</span>
            </div>

            {/* Strata Bed 2 (Middle) */}
            <div className="h-16 bg-[#6e7f86]/80 border-b-2 border-stone-400/50 flex items-center px-4 justify-between text-xs font-bold text-white relative">
              <span>Layer B (Shale with Graptolites)</span>
              <span className="text-[10px] bg-black/30 px-2 py-0.5 rounded">Faunal Succession</span>
            </div>

            {/* Strata Bed 1 (Bottom - Oldest) */}
            <div className="h-16 bg-[#3b4a54] flex items-center px-4 justify-between text-xs font-bold text-white relative">
              <span>Layer A (Limestone with Corals)</span>
              <span className="text-[10px] bg-black/30 px-2 py-0.5 rounded">Oldest Sedimentary Bed</span>
            </div>

            {/* Cross-Cutting Igneous Dike */}
            <div 
              className="absolute top-2 bottom-0 left-1/3 w-12 bg-red-800/90 transform -rotate-12 flex items-center justify-center text-white text-[10px] font-bold text-center border-x-2 border-red-500 shadow-lg"
              title="Cross-Cutting Dike: Younger than Layers A & B"
            >
              <span className="transform -rotate-90 whitespace-nowrap">
                Igneous Dike
              </span>
            </div>

            {/* Inclusions inside the Dike */}
            <div 
              className="absolute top-1/2 left-[31%] w-4 h-4 rounded-full bg-stone-300 border border-stone-600 shadow-xs"
              title="Inclusion: Fragment of Layer A trapped inside the dike (Older than dike!)"
            />
          </div>

          {/* Cards for each principle */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-750 border border-stone-200/80 dark:border-slate-700/80 space-y-1">
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400">1. Superposition</span>
              <p className="text-xs text-stone-600 dark:text-stone-300">
                In undeformed sedimentary layers, older beds lie at the bottom and younger beds lie at the top.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-750 border border-stone-200/80 dark:border-slate-700/80 space-y-1">
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400">2. Cross-Cutting</span>
              <p className="text-xs text-stone-600 dark:text-stone-300">
                Any feature (fault, igneous dike) cutting across rock layers must be <strong>younger</strong> than the rocks it cuts.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-750 border border-stone-200/80 dark:border-slate-700/80 space-y-1">
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400">3. Inclusions</span>
              <p className="text-xs text-stone-600 dark:text-stone-300">
                Any rock fragment enclosed within another rock must be <strong>older</strong> than the host rock containing it.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Model 3: Zircon Dating & Radioactive Decay */}
      {activeModel === 'isotopes' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold text-stone-900 dark:text-white">
                Zircon U-Pb Dating & Radioactive Decay (Exam Review Page 6)
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Simulating half-life parent-to-daughter ratios ($\lambda$) and why Zircon is the gold standard for geochronology.
              </p>
            </div>
            <div className="px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
              Half-Life Simulator
            </div>
          </div>

          {/* Half-Life Slider Control */}
          <div className="p-5 rounded-2xl bg-stone-50 dark:bg-slate-750 border border-stone-200/80 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                Half-Lives Elapsed: <strong className="font-mono text-base text-amber-600 dark:text-amber-400">{halfLivesElapsed}</strong>
              </span>
              <span className="text-xs font-mono font-bold text-stone-600 dark:text-stone-300">
                Estimated Sample Age: {calculatedAgeMa.toLocaleString()} Million Years
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={halfLivesElapsed}
              onChange={(e) => setHalfLivesElapsed(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />

            <div className="flex justify-between text-[11px] text-stone-500 font-mono">
              <span>0 (Fresh Ash)</span>
              <span>1 Half-Life (50:50)</span>
              <span>2 Half-Lives (25:75)</span>
              <span>3 Half-Lives (12.5:87.5)</span>
              <span>4 Half-Lives</span>
              <span>5 Half-Lives</span>
            </div>
          </div>

          {/* Atomic Ratio Visualizer Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-amber-700 dark:text-amber-400">
                Parent Uranium Nuclei (²³⁸U): {parentPct.toFixed(1)}%
              </span>
              <span className="text-teal-700 dark:text-teal-400">
                Radiogenic Daughter Lead (²⁰⁶Pb): {daughterPct.toFixed(1)}%
              </span>
            </div>

            <div className="w-full h-8 rounded-xl bg-stone-200 dark:bg-slate-700 overflow-hidden flex shadow-inner">
              <motion.div
                animate={{ width: `${parentPct}%` }}
                className="bg-amber-600 flex items-center justify-center text-[10px] text-white font-bold font-mono transition-all duration-300"
              >
                {parentPct > 10 ? `${parentPct.toFixed(1)}% U` : ''}
              </motion.div>
              <motion.div
                animate={{ width: `${daughterPct}%` }}
                className="bg-teal-600 flex items-center justify-center text-[10px] text-white font-bold font-mono transition-all duration-300"
              >
                {daughterPct > 10 ? `${daughterPct.toFixed(1)}% Pb` : ''}
              </motion.div>
            </div>
          </div>

          {/* Explanatory callouts from PDF */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 text-xs space-y-1.5">
              <strong className="font-bold text-amber-950 dark:text-amber-300 block">
                Why is Zircon the Gold Standard?
              </strong>
              <p className="text-amber-900/90 dark:text-amber-200 leading-relaxed">
                As stated verbatim on page 6 of your review guide: <em>"Zircon incorporates uranium into its crystal lattice upon formation while strictly excluding lead."</em> Thus, all lead discovered in a zircon is 100% radiogenic daughter product!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-750 border border-stone-200/80 dark:border-slate-700/80 text-xs space-y-1.5">
              <strong className="font-bold text-stone-900 dark:text-white block">
                Where are Zircons Located?
              </strong>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                Exam Page 6 notes: Found in <strong>felsic igneous rocks</strong> and <strong>volcanic ashes (tuffs)</strong>. By combining ash bed zircon radiometric dates with the Principle of Superposition, sedimentary strata are bracketed with precise ages.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Model 4: Carbon Cycle Flux & Stable Isotope Glacial Shifts */}
      {activeModel === 'carbon' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold text-stone-900 dark:text-white">
                Carbon Cycle & Stable Oxygen/Carbon Isotopes (Exam Pages 6–7)
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Flux rate balance and glacial vs. interglacial oceanic stable isotope shifts.
              </p>
            </div>
          </div>

          {/* Section 1: Carbon Rate Balance */}
          <div className="p-5 rounded-2xl bg-stone-50 dark:bg-slate-750 border border-stone-200/80 dark:border-slate-700/80 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300">
              Carbon Influx vs. Decomposition Balance
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setCarbonMode('burial_wins')}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  carbonMode === 'burial_wins'
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-stone-900 dark:text-white shadow-2xs'
                    : 'border-stone-200 dark:border-slate-700 text-stone-600 dark:text-stone-400'
                }`}
              >
                <div className="font-bold text-xs mb-1">Burial Rate &gt; Decomposition Rate</div>
                <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  → Lithospheric Influx
                </div>
                <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
                  Carbon sinks into sediment/rock record (e.g. coal beds, deep ocean shale).
                </div>
              </button>

              <button
                onClick={() => setCarbonMode('decomp_wins')}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  carbonMode === 'decomp_wins'
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-stone-900 dark:text-white shadow-2xs'
                    : 'border-stone-200 dark:border-slate-700 text-stone-600 dark:text-stone-400'
                }`}
              >
                <div className="font-bold text-xs mb-1">Decomposition Rate &gt; Burial Rate</div>
                <div className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                  → Atmospheric Influx
                </div>
                <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
                  Microbial decay releases gaseous CO2 and methane into the atmosphere.
                </div>
              </button>
            </div>
          </div>

          {/* Section 2: Glacial vs Interglacial Oxygen Isotopes */}
          <div className="p-5 rounded-2xl bg-stone-50 dark:bg-slate-750 border border-stone-200/80 dark:border-slate-700/80 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300">
                Ocean Stable Isotope Thermometer (¹⁸O / ¹⁶O)
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setClimateMode('glacial')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    climateMode === 'glacial'
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-stone-200 dark:bg-slate-700 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  Glacial Period
                </button>
                <button
                  onClick={() => setClimateMode('interglacial')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    climateMode === 'interglacial'
                      ? 'bg-amber-600 text-white shadow-2xs'
                      : 'bg-stone-200 dark:bg-slate-700 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  Interglacial Period
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-900 dark:text-white">
                  {climateMode === 'glacial' ? 'Glacial Period (Ice Age)' : 'Interglacial Period (Warm Epoch)'}
                </span>
                <span className="font-mono font-bold text-amber-700 dark:text-amber-400">
                  {climateMode === 'glacial' ? 'Higher Stable Isotope Values (Enriched in ¹⁸O)' : 'Lower Stable Isotope Values'}
                </span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                {climateMode === 'glacial'
                  ? 'During glacial periods, light ¹⁶O evaporates preferentially and becomes locked in massive continental ice sheets. This leaves the oceans enriched in heavy ¹⁸O (higher positive stable isotope values recorded in mollusk shells and corals).'
                  : 'During interglacial warming periods, glaciers melt and return light ¹⁶O to the ocean basins, causing oceanic stable isotope ratios to shift lower (more negative values).'}
              </p>
              <div className="text-[11px] text-stone-400 pt-1">
                Accumulated at regular rate: <strong>Mollusk shells & Corals</strong> (Exam Review Page 7).
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
