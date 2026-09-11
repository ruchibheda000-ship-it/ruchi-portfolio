import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import HangingCloth from '../components/HangingCloth'

// Ruchi's Real Portfolio Projects
const projects = [
  {
    id: 'ease',
    number: '01',
    title: 'Ease',
    subtitle: 'Unified Healthcare Management Ecosystem',
    category: 'HealthTech / Systems',
    year: '2025',
    description: 'A patient-first healthcare suite bridging hospital clinical workflows, automated doctor triaging, and compassionate appointment journeys.',
    tags: ['Healthcare', 'Design Systems', 'Enterprise UX', 'Web App'],
    link: '/work',
    note: 'Triage friction down 40%'
  },
  {
    id: 'melt',
    number: '02',
    title: 'Melt',
    subtitle: 'Social Music Streaming & Shared Listening',
    category: 'Social Audio / Mobile',
    year: '2025',
    description: 'A mobile audio platform designed around organic human connection—shared real-time listening rooms, collaborative vinyl queues, and tactile controls.',
    tags: ['Mobile App', 'Audio Interaction', 'Community', 'Haptics'],
    link: '/work',
    note: 'Organic human connection'
  },
  {
    id: 'shree-shrushti',
    number: '03',
    title: 'Shree Shrushti Farms',
    subtitle: 'Wayfinding & Signage Navigation System',
    category: 'Spatial & Digital Wayfinding',
    year: '2024',
    description: 'An integrated spatial-digital navigation system connecting physical trail signage with a lightweight GPS mobile guide across 40 acres.',
    tags: ['Wayfinding', 'Physical-Digital', 'Signage System', 'Map UI'],
    link: '/work',
    note: '10,000+ visitors guided'
  },
  {
    id: 'code-crafters',
    number: '04',
    title: 'Code Crafters',
    subtitle: 'Cybersecurity Operations Center Dashboard',
    category: 'Enterprise Dashboard / SOC',
    year: '2024',
    description: 'High-density security operations center monitoring dashboard for real-time threat intelligence, automated triage, and vulnerability graphs.',
    tags: ['Data Viz', 'SOC Dashboard', 'Enterprise UX', 'Cybersecurity'],
    link: '/work',
    note: '3x faster incident triage'
  },
  {
    id: 'boredom',
    number: '05',
    title: 'Boredom',
    subtitle: 'Anti-Doomscrolling Behavioral Experience',
    category: 'Behavioral UX / Wellbeing',
    year: '2024',
    description: 'A mindful digital companion designed to break compulsive phone pickups and doomscrolling loops through intentional friction and analog prompt cards.',
    tags: ['Behavioral UX', 'Digital Wellbeing', 'Friction Design', 'Mobile'],
    link: '/work',
    note: '45 mins recovered daily'
  },
  {
    id: 'pinterest-ai',
    number: '06',
    title: 'Pinterest AI Home Décor',
    subtitle: 'Algorithmic Spatial Curation & Ambient Commerce',
    category: 'Concept & AI Interaction',
    year: '2024',
    description: 'An exploratory concept bridging Pinterest moodboards with generative spatial models, allowing users to stage living rooms through aesthetic taste graphs.',
    tags: ['AI Interaction', 'Spatial Curation', 'Concept', 'E-Commerce'],
    link: '/work',
    note: 'Taste graph staging'
  }
]

export default function Home() {
  // Live Mumbai IST Time
  const [timeString, setTimeString] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const options = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: true }
      setTimeString(new Intl.DateTimeFormat('en-US', options).format(now))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Interactive checklist state for Contact section
  const [checkedItems, setCheckedItems] = useState({
    opt1: true,
    opt2: true,
    opt3: true
  })

  const toggleCheck = (key) => {
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  // State to trigger the physical 90-degree opening animation
  const [openAnimKey, setOpenAnimKey] = useState(0)
  const handleReplayOpening = () => {
    setOpenAnimKey(k => k + 1)
  }

  return (
    <div className="min-h-screen bg-[#061840] text-[#F1E3CC] font-body selection:bg-[#E4BA83] selection:text-[#061840] relative overflow-x-hidden pb-24">
      
      {/* ========================================================================= */}
      {/* 1. OUTER CHALK DOODLES (Floating in the Midnight Forest background)       */}
      {/* Hand-drawn in Soft Mist Blue & Warm Ivory strokes                         */}
      {/* ========================================================================= */}
      
      {/* Juice Box with Straw */}
      <div className="absolute top-28 left-4 sm:left-10 lg:left-20 pointer-events-none select-none z-10 opacity-60 hidden md:block">
        <svg width="68" height="90" viewBox="0 0 68 90" fill="none" stroke="#8DA1B4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M42 22 L42 6 L32 6 L28 14" strokeDasharray="3 2" />
          <path d="M16 22 L50 22 L48 84 L14 84 Z" />
          <path d="M16 22 L24 16 L56 16 L50 22" />
          <path d="M56 16 L54 78 L48 84" />
          <circle cx="32" cy="52" r="9" />
          <path d="M32 43 L32 39" />
          <path d="M22 66 Q32 72 42 66" />
        </svg>
      </div>

      {/* Bowl of Noodles & Chopsticks */}
      <div className="absolute top-32 right-4 sm:right-10 lg:right-20 pointer-events-none select-none z-10 opacity-60 hidden md:block">
        <svg width="95" height="70" viewBox="0 0 95 70" fill="none" stroke="#8DA1B4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 18 L68 6" />
          <path d="M12 26 L72 10" />
          <path d="M34 18 Q44 10 56 18 Q62 24 68 20" />
          <path d="M38 22 Q48 14 58 22" />
          <ellipse cx="50" cy="30" rx="30" ry="10" />
          <path d="M22 32 Q26 56 50 56 Q74 56 78 32" />
          <path d="M38 56 L38 60 L62 60 L62 56" />
        </svg>
      </div>

      {/* Cute Dinosaur / Monster */}
      <div className="absolute top-[480px] right-4 sm:right-8 lg:right-16 pointer-events-none select-none z-10 opacity-60 hidden md:block">
        <svg width="85" height="110" viewBox="0 0 85 110" fill="none" stroke="#8DA1B4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M62 30 L74 38 L64 46 L76 54 L66 62 L78 70 L68 78" />
          <path d="M24 64 L16 54 L14 36 Q18 20 44 20 Q64 20 62 48 L64 86 Q62 96 46 96 L28 96" />
          <rect x="36" y="32" width="10" height="14" rx="2" />
          <path d="M41 38 L41 42" strokeWidth="3" />
          <path d="M16 48 L32 48" />
          <path d="M20 48 L23 44 L26 48 L29 44" />
        </svg>
      </div>

      {/* Swimming Fish */}
      <div className="absolute top-[940px] left-4 sm:left-8 lg:left-16 pointer-events-none select-none z-10 opacity-60 hidden md:block">
        <svg width="80" height="55" viewBox="0 0 80 55" fill="none" stroke="#8DA1B4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M68 28 Q48 10 24 20 Q12 28 24 36 Q48 46 68 28 Z" />
          <path d="M20 28 L6 14 L12 28 L6 42 Z" />
          <circle cx="56" cy="24" r="3" fill="#8DA1B4" />
          <path d="M44 22 Q40 28 44 34" />
          <path d="M36 24 Q32 28 36 32" />
        </svg>
      </div>

      {/* Little Daisy Flower */}
      <div className="absolute top-[1120px] right-4 sm:right-10 lg:right-20 pointer-events-none select-none z-10 opacity-60 hidden md:block">
        <svg width="75" height="90" viewBox="0 0 75 90" fill="none" stroke="#8DA1B4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M38 46 Q36 68 40 88" />
          <path d="M36 64 Q22 62 26 52 Q34 54 36 64" />
          <path d="M38 72 Q52 70 48 60 Q40 62 38 72" />
          <circle cx="38" cy="32" r="6" />
          <ellipse cx="38" cy="18" rx="5" ry="8" />
          <ellipse cx="38" cy="46" rx="5" ry="8" />
          <ellipse cx="24" cy="32" rx="8" ry="5" />
          <ellipse cx="52" cy="32" rx="8" ry="5" />
          <ellipse cx="28" cy="22" rx="7" ry="6" transform="rotate(-30 28 22)" />
          <ellipse cx="48" cy="22" rx="7" ry="6" transform="rotate(30 48 22)" />
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* 2. TOP NAVIGATION                                                         */}
      {/* ========================================================================= */}
      <Nav />

      {/* Replay Opening Animation Control (Floating subtile trigger) */}
      <div className="max-w-5xl lg:max-w-6xl mx-auto px-6 flex justify-end mb-2">
        <button
          onClick={handleReplayOpening}
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B3272]/50 border border-[#0B3272] text-[#E4BA83] font-mono text-[11px] hover:bg-[#0B3272] hover:text-[#F1E3CC] transition-colors cursor-pointer select-none"
        >
          <span>↻</span>
          <span>Replay Diary Opening (90°)</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 3. CENTRAL PHYSICAL OPEN DIARY (TWO-PAGE LANDSCAPE SPREAD)                */}
      {/* Reference: Image 2 (Opened flat with Page 1 top, Page 2 bottom)           */}
      {/* Upper and lower pages have approximately the same visual importance.      */}
      {/* Palette: #0B3272 Forest Blue cover, #E4BA83 Gold trim, #F6E8D2 Paper     */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full max-w-5xl lg:max-w-6xl mx-auto px-3 sm:px-6 my-4 sm:my-8">
        
        {/* PHYSICAL NOTEBOOK OUTER BINDING (Deep Blue #0B3272 subtle crumpled paper cover) */}
        <div
          key={openAnimKey}
          className="relative rounded-[32px] sm:rounded-[44px] bg-crumpled-cover border-paper-cover p-2.5 sm:p-4 animate-diary-rotate-open"
        >
          
          {/* SILK BOOKMARK RIBBON (Gold #E4BA83 silk ribbon peeking from the central fold / spine seam) */}
          <div className="absolute -left-4 sm:-left-7 top-1/2 -translate-y-1/2 z-30 pointer-events-none select-none">
            <svg width="55" height="34" viewBox="0 0 55 34" fill="none">
              <path d="M55 12 C35 8, 14 20, 0 32 L0 20 C14 8, 35 2, 55 4 Z" fill="#E4BA83" />
            </svg>
          </div>
          <div className="absolute -right-4 sm:-right-7 top-1/2 -translate-y-1/2 z-30 pointer-events-none select-none">
            <svg width="55" height="34" viewBox="0 0 55 34" fill="none" className="transform scale-x-[-1]">
              <path d="M55 12 C35 8, 14 20, 0 32 L0 20 C14 8, 35 2, 55 4 Z" fill="#E4BA83" />
            </svg>
          </div>

          {/* NOTEBOOK INTERIOR (Connected Two Landscape Pages) */}
          <div className="relative rounded-[24px] sm:rounded-[36px] bg-[#F6E8D2] overflow-hidden border border-[#E8DEC8]">
            
            {/* =================================================================== */}
            {/* PAGE 1: UPPER LANDSCAPE PAGE (PORTFOLIO CONTENT SPREAD)             */}
            {/* Composition: Hero + Botanical Illustration + Journal + Projects     */}
            {/* Single cohesive landscape editorial page, NOT stacked web sections. */}
            {/* =================================================================== */}
            <div className="relative bg-diary-grid text-[#061840] p-6 sm:p-10 lg:p-12 page-upper-depth">
              
              {/* Top margin wash */}
              <div className="absolute top-0 left-0 right-0 h-3 bg-linear-to-b from-[#E6D9C8] to-transparent opacity-60 pointer-events-none"></div>

              {/* Landscape Layout Grid: Hero (Left) + Botanical Window (Right) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center pb-6">
                
                {/* Left Column: Wordmark, Role, Core Statement, Time */}
                <div className="md:col-span-6 lg:col-span-6 space-y-3 sm:space-y-4">
                  
                  {/* Hand-drawn wordmark in Forest Blue with Path Gold dot */}
                  <div>
                    <span className="font-hand text-4xl sm:text-5xl lg:text-6xl text-[#0B3272] font-bold tracking-tight inline-block transform -rotate-1 select-none">
                      Ruchi<span className="text-2xl sm:text-3xl font-mono ml-1 text-[#E4BA83]">ツ</span>
                    </span>
                    <div className="font-serif text-lg sm:text-xl md:text-2xl text-[#0B3272] tracking-wide mt-0.5">
                      Product Designer
                    </div>
                  </div>

                  {/* Core Statement */}
                  <div>
                    <h1 className="font-serif text-3xl sm:text-4xl md:text-[2.75rem] text-[#061840] leading-[1.14] tracking-tight">
                      <span>I find the </span>
                      <span className="font-hand font-normal text-4xl sm:text-5xl md:text-6xl text-[#0B3272] inline-block transform -rotate-2 underline decoration-[#E4BA83] decoration-wavy decoration-2">
                        why's
                      </span>
                      <span className="block">before the what's.</span>
                    </h1>
                  </div>

                  {/* Location & Time Indicator */}
                  <div className="flex items-center gap-2 font-serif text-sm sm:text-base text-[#0B3272]/85">
                    <span>Mumbai</span>
                    <span>•</span>
                    <span>GMT +5:30</span>
                    {timeString && (
                      <>
                        <span>•</span>
                        <span className="font-mono text-xs text-[#061840]/70 font-semibold">{timeString}</span>
                      </>
                    )}
                  </div>

                  {/* Stamp buttons */}
                  <div className="pt-1 flex flex-wrap items-center gap-3">
                    <a
                      href="#diary-journal-memo"
                      className="px-4 py-1.5 rounded-full border border-[#0B3272] bg-transparent text-[#0B3272] font-serif text-xs sm:text-sm hover:bg-[#0B3272] hover:text-[#F1E3CC] transition-colors"
                    >
                      Read journal ↓
                    </a>
                    <a
                      href="#diary-archive-index"
                      className="px-4 py-1.5 rounded-full bg-[#0B3272] text-[#F1E3CC] font-serif text-xs sm:text-sm shadow-xs hover:bg-[#082452] transition-colors"
                    >
                      Case studies →
                    </a>
                  </div>

                </div>

                {/* Right Column: Hand-Drawn SVG Botanical Window Illustration */}
                <div className="md:col-span-6 lg:col-span-6 relative flex justify-center items-center">
                  <div className="relative w-full max-w-[340px] sm:max-w-[380px]">
                    <svg viewBox="0 0 380 340" fill="none" stroke="#0B3272" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-auto select-none">
                      
                      {/* Window Header Frame */}
                      <rect x="65" y="60" width="220" height="230" rx="4" strokeWidth="2.5" />
                      <line x1="65" y1="84" x2="285" y2="84" strokeWidth="2" />
                      
                      {/* Window Controls */}
                      <rect x="75" y="68" width="8" height="8" rx="1" />
                      <text x="145" y="77" fill="#0B3272" stroke="none" fontFamily="sans-serif" fontSize="9" fontWeight="bold" letterSpacing="1">UNTITLED</text>
                      <line x1="262" y1="72" x2="274" y2="72" />
                      <line x1="262" y1="76" x2="274" y2="76" />

                      {/* Birds perched on the window */}
                      <path d="M102 60 C102 46, 116 46, 116 60 Z" />
                      <circle cx="111" cy="51" r="1" fill="#E4BA83" />
                      <path d="M115 52 L119 53" />
                      
                      <path d="M124 60 C124 46, 138 46, 138 60 Z" />
                      <circle cx="133" cy="51" r="1" fill="#E4BA83" />
                      <path d="M137 52 L141 53" />
                      
                      <path d="M236 60 C236 46, 250 46, 250 60 Z" />
                      <circle cx="240" cy="51" r="1" fill="#E4BA83" />
                      <path d="M236 52 L232 53" />

                      {/* Search pill inside window */}
                      <rect x="130" y="105" width="80" height="20" rx="10" />
                      <path d="M150 115 Q158 110 166 115" stroke="#E4BA83" />

                      {/* Friendly Character holding screen */}
                      <rect x="135" y="152" width="62" height="82" rx="12" strokeWidth="2.2" fill="#F6E8D2" />
                      <circle cx="212" cy="180" r="18" fill="#F6E8D2" />
                      <circle cx="206" cy="176" r="2" fill="#0B3272" />
                      <circle cx="216" cy="178" r="2" fill="#0B3272" />
                      <path d="M206 186 Q212 192 218 186" />
                      <path d="M198 174 Q204 160 216 164 Q226 162 228 174" />
                      <ellipse cx="140" cy="186" rx="6" ry="4" fill="#F6E8D2" />
                      <ellipse cx="196" cy="204" rx="6" ry="5" fill="#F6E8D2" />
                      <path d="M202 198 L196 245 L228 245 L224 198" />

                      {/* Friendly Peeking Critter on Right */}
                      <path d="M280 190 Q292 186 298 205 L292 270 L274 270" fill="#F6E8D2" />
                      <ellipse cx="294" cy="200" rx="12" ry="16" fill="#F6E8D2" />
                      <circle cx="292" cy="196" r="2" fill="#0B3272" />
                      <path d="M298 190 Q310 188 304 200" />
                      <path d="M304 202 L316 206" stroke="#E4BA83" />

                      {/* Lush Foliage & Ferns */}
                      <path d="M52 230 C30 200, 70 170, 95 190 C110 160, 150 170, 140 210" fill="#F6E8D2" />
                      <path d="M62 255 C40 220, 80 190, 110 220" />
                      <path d="M68 280 C35 240, 100 220, 140 250" fill="#F6E8D2" />

                      <path d="M96 280 C80 250, 120 230, 146 250 C170 220, 220 225, 230 255 C250 225, 300 240, 290 280 Z" fill="#F6E8D2" />
                      <path d="M102 284 L106 274 L110 284" />
                      <path d="M174 286 L178 274 L182 286" />

                      {/* Bottom-left blooming flower buds */}
                      <path d="M4 275 Q24 235 48 200" strokeWidth="2.5" />
                      <ellipse cx="24" cy="216" rx="10" ry="14" transform="rotate(-30 24 216)" fill="#F6E8D2" />
                      <path d="M18 204 Q24 216 22 228" />
                      <ellipse cx="50" cy="192" rx="10" ry="14" transform="rotate(-15 50 192)" fill="#F6E8D2" />
                      <path d="M44 180 Q50 192 48 204" />
                    </svg>
                  </div>
                </div>

              </div>

              {/* Integrated Editorial Scrapbook Band: Journal Memo (Left) + Case Studies (Right) */}
              <div className="pt-6 border-t border-[#0B3272]/20 border-dashed grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left (5 Cols): Taped Journal Entry Clipping */}
                <div id="diary-journal-memo" className="lg:col-span-5 relative p-5 rounded-md bg-[#F1E3CC] border border-[#0B3272]/20 shadow-xs">
                  {/* Washi Tape in Path Gold */}
                  <div className="absolute -top-2.5 left-6 w-16 h-4 bg-[#E4BA83]/80 border border-[#0B3272]/20 transform -rotate-1 select-none pointer-events-none shadow-xs"></div>
                  
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#0B3272] font-semibold block mb-1">
                      ✦ JOURNAL ENTRY // MY PERSPECTIVE
                    </span>
                    <h2 className="font-serif text-lg sm:text-xl text-[#061840] font-normal leading-snug mb-2">
                      I don’t design in isolation.<br />
                      I design for <span className="font-hand text-xl sm:text-2xl text-[#0B3272] underline decoration-[#E4BA83] decoration-wavy">living human ecosystems.</span>
                    </h2>
                    
                    <div className="space-y-2 font-serif text-xs sm:text-sm text-[#061840]/85 leading-relaxed">
                      <p>
                        I am not trying to be limited to just UI/UX. I want to grow into a <strong>design entrepreneur</strong> who understands products, businesses, brands, people, and technology as interconnected parts of a living whole.
                      </p>
                      <p>
                        Too often in technology, teams jump straight into the <em>what</em> before thoroughly interrogating the <em>why</em>. My work starts with relentless curiosity: uncovering the underlying human motivations, emotional frictions, and mental models that determine whether a product actually sticks.
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#0B3272]/15 mt-3">
                      <Link
                        to="/about"
                        className="inline-flex items-center gap-1.5 font-serif text-xs font-semibold text-[#0B3272] hover:text-[#E4BA83] transition-colors"
                      >
                        <span>Read full background & perspective</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Right (7 Cols): Compact Case Studies Scrapbook Grid */}
                <div id="diary-archive-index" className="lg:col-span-7 space-y-3">
                  
                  <div className="flex items-center justify-between pb-1 border-b border-[#0B3272]/20">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#0B3272] font-semibold">
                        ✦ FIELD ARCHIVE // CASE STUDIES
                      </span>
                      <h2 className="font-serif text-lg sm:text-xl text-[#061840] font-normal">
                        Projects & Living Systems
                      </h2>
                    </div>
                    <Link
                      to="/work"
                      className="font-serif text-xs text-[#0B3272] hover:text-[#E4BA83] transition-colors font-semibold"
                    >
                      Explore full archive →
                    </Link>
                  </div>

                  {/* 6 Projects in a 2x3 compact tactile layout */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {projects.map((proj, idx) => (
                      <Link
                        key={proj.id}
                        to="/work"
                        className={`group relative p-3 rounded-md bg-[#F1E3CC] border border-[#0B3272]/20 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 no-underline text-[#061840] ${idx % 2 === 0 ? 'transform -rotate-0.5' : 'transform rotate-0.5'}`}
                      >
                        {/* Washi Tape corner */}
                        <div className="absolute -top-1.5 left-4 w-8 h-3 bg-[#E4BA83]/70 border border-[#0B3272]/20 select-none pointer-events-none"></div>

                        <div className="flex items-center justify-between gap-1 mb-0.5 pt-0.5">
                          <span className="font-mono text-[11px] font-bold text-[#0B3272]">{proj.number}</span>
                          <span className="font-mono text-[9px] uppercase tracking-wider text-[#061840]/60 truncate max-w-[130px]">{proj.category}</span>
                        </div>

                        <h3 className="font-serif text-sm sm:text-base font-bold text-[#061840] group-hover:text-[#0B3272] transition-colors leading-tight">
                          {proj.title}
                        </h3>

                        <p className="font-serif text-[11px] text-[#061840]/75 line-clamp-1 mt-0.5 leading-tight">
                          {proj.description}
                        </p>

                        <div className="mt-1.5 pt-1.5 border-t border-[#0B3272]/15 flex items-center justify-between font-hand text-[11px] text-[#0B3272]">
                          <span>"{proj.note}"</span>
                          <span className="font-mono text-[9px] text-[#E4BA83] font-bold">Open ↗</span>
                        </div>
                      </Link>
                    ))}
                  </div>

                </div>

              </div>

            </div>

            {/* =================================================================== */}
            {/* CENTRAL HORIZONTAL BINDING / SPINE CREASE                           */}
            {/* Visually divides Page 1 and Page 2 as an authentic open book seam   */}
            {/* =================================================================== */}
            <div className="relative w-full h-7 sm:h-8 spine-crease-shadow border-y border-[#0B3272]/30 flex items-center justify-center select-none pointer-events-none z-20">
              <div className="w-full flex items-center justify-center gap-3 px-8">
                <div className="h-[1px] bg-[#0B3272]/40 flex-grow"></div>
                <span className="font-mono text-[10px] sm:text-[11px] tracking-widest uppercase text-[#0B3272]/70 font-semibold">
                  ✦ CENTRAL BINDING CREASE ✦
                </span>
                <div className="h-[1px] bg-[#0B3272]/40 flex-grow"></div>
              </div>
            </div>

            {/* =================================================================== */}
            {/* PAGE 2: LOWER LANDSCAPE PAGE (EXCLUSIVELY 3 BELIEFS)                */}
            {/* Reference: Image 2 ("3 things I strongly believe in")               */}
            {/* NOTHING ELSE INSIDE THIS PAGE. THE DIARY ENDS HERE.                 */}
            {/* =================================================================== */}
            <div id="diary-beliefs" className="relative bg-[#F6E8D2] px-6 sm:px-12 lg:px-16 pt-8 sm:pt-10 pb-12 sm:pb-14 page-lower-depth text-[#061840]">
              
              {/* Header: Exactly matching Image 2 */}
              <div className="max-w-2xl mb-8 sm:mb-10">
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#061840] font-normal tracking-tight">
                  3 things I strongly believe in
                </h2>
              </div>

              {/* THE 3 OVERLAPPING PHYSICAL PAPER CARDS / SCRAPS (Matching Image 2) */}
              <div className="relative min-h-[360px] sm:min-h-[400px] max-w-2xl mx-auto mb-8">
                
                {/* SCRAP 1: Torn Lined Notebook Paper (Top Left, tilted -3°) */}
                <div className="absolute top-0 left-0 sm:left-4 z-10 w-[240px] sm:w-[310px] p-6 rounded-xs bg-notebook-ruled shadow-xl border border-[#0B3272]/20 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                  {/* Jagged Torn Edge */}
                  <div className="absolute -top-1.5 left-0 right-0 h-2 bg-[#F6E8D2]" style={{ clipPath: 'polygon(0% 100%, 5% 0%, 10% 100%, 15% 0%, 20% 100%, 25% 0%, 30% 100%, 35% 0%, 40% 100%, 45% 0%, 50% 100%, 55% 0%, 60% 100%, 65% 0%, 70% 100%, 75% 0%, 80% 100%, 85% 0%, 90% 100%, 95% 0%, 100% 100%)' }}></div>
                  
                  <div className="pt-3 font-hand text-2xl sm:text-3xl lg:text-4xl text-[#061840] font-bold leading-[1.3] select-none pl-4">
                    tirelessly<br />
                    pursue<br />
                    clarity.
                  </div>
                  <div className="text-[11px] font-mono text-[#0B3272] pt-4 pl-4 uppercase font-semibold">
                    01 // The why before what
                  </div>
                </div>

                {/* SCRAP 2: Torn Graph Paper (Top Right, overlapping, tilted +4°) */}
                <div className="absolute top-4 right-0 sm:right-6 z-20 w-[250px] sm:w-[320px] p-6 rounded-xs bg-torn-graph shadow-2xl border border-[#0B3272]/25 transform rotate-4 hover:rotate-0 transition-transform duration-300">
                  {/* Jagged Torn Right Edge */}
                  <div className="absolute -right-1 top-0 bottom-0 w-2 bg-[#F6E8D2]" style={{ clipPath: 'polygon(0% 0%, 100% 5%, 0% 10%, 100% 15%, 0% 20%, 100% 25%, 0% 30%, 100% 35%, 0% 40%, 100% 45%, 0% 50%, 100% 55%, 0% 60%, 100% 65%, 0% 70%, 100% 75%, 0% 80%, 100% 85%, 0% 90%, 100% 95%, 0% 100%)' }}></div>
                  
                  <div className="font-mono text-xl sm:text-2xl lg:text-3xl text-[#061840] font-bold leading-tight select-none">
                    Software<br />
                    should<br />
                    empower.
                  </div>
                  <div className="text-[11px] font-mono text-[#0B3272] pt-4 uppercase font-semibold">
                    02 // Design as an entrepreneurial lever
                  </div>
                </div>

                {/* SCRAP 3: Soft Cream Sticky Note with Paperclip (Center Bottom, overlapping both, tilted -1°) */}
                <div className="absolute top-48 sm:top-50 left-1/2 -translate-x-1/2 z-30 w-[260px] sm:w-[330px] p-6 sm:p-8 rounded-sm bg-kraft-note shadow-2xl border border-[#0B3272]/30 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                  
                  {/* Metallic Paperclip */}
                  <div className="absolute -top-5 left-10 pointer-events-none select-none">
                    <svg width="22" height="42" viewBox="0 0 22 42" fill="none">
                      <path d="M6 10 L6 32 C6 37 16 37 16 32 L16 8 C16 3 3 3 3 8 L3 34 C3 41 19 41 19 34 L19 12" stroke="#0B3272" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <div className="font-serif italic font-bold text-2xl sm:text-3xl lg:text-4xl text-[#061840] leading-tight select-none pt-2">
                    Design for<br />
                    moments
                  </div>
                  <div className="text-[11px] font-mono text-[#0B3272] pt-4 uppercase font-semibold">
                    03 // Tactile & living tools
                  </div>
                </div>

              </div>

              {/* Hand-Drawn Botanical Sketch at Bottom (Forest Blue #0B3272 & Path Gold #E4BA83) */}
              <div className="w-full flex justify-between items-end pt-4 select-none pointer-events-none opacity-80">
                
                {/* Left: Fallen Tree Log with Bark & Mushrooms */}
                <div className="w-44 sm:w-56">
                  <svg viewBox="0 0 200 90" fill="none" stroke="#0B3272" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <ellipse cx="40" cy="50" rx="18" ry="24" />
                    <ellipse cx="40" cy="50" rx="10" ry="14" strokeDasharray="3 3" />
                    <circle cx="40" cy="50" r="3" fill="#E4BA83" />
                    <path d="M40 26 L170 34 C185 36, 185 64, 170 66 L40 74" />
                    <path d="M70 30 L66 70" strokeDasharray="4 4" />
                    <path d="M110 32 L106 68" strokeDasharray="4 4" />
                    <path d="M12 78 Q18 68 24 78 Z" />
                    <line x1="18" y1="78" x2="18" y2="84" />
                    <path d="M26 80 Q30 72 34 80 Z" />
                    <line x1="30" y1="80" x2="30" y2="84" />
                    <path d="M6 86 L10 76 L14 86" />
                    <path d="M174 86 L178 76 L182 86" />
                  </svg>
                </div>

                {/* Right: Wild Wheat & Floral Sprigs */}
                <div className="w-48 sm:w-64">
                  <svg viewBox="0 0 220 110" fill="none" stroke="#0B3272" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M120 100 Q140 50 170 20" />
                    <ellipse cx="170" cy="20" rx="6" ry="12" transform="rotate(40 170 20)" />
                    <ellipse cx="160" cy="30" rx="5" ry="10" transform="rotate(40 160 30)" />
                    <ellipse cx="150" cy="40" rx="5" ry="10" transform="rotate(40 150 40)" />
                    <ellipse cx="140" cy="50" rx="5" ry="10" transform="rotate(40 140 50)" />
                    <path d="M160 100 Q180 60 195 40" />
                    <ellipse cx="195" cy="40" rx="7" ry="10" transform="rotate(20 195 40)" />
                    <ellipse cx="182" cy="52" rx="7" ry="10" transform="rotate(-30 182 52)" />
                    <path d="M60 40 Q66 30 72 40 Q66 50 60 40" stroke="#E4BA83" />
                  </svg>
                </div>

              </div>

              {/* Bottom Page Margin Fold & DIARY CONCLUSION STAMP */}
              <div className="w-full bg-[#E8DEC8] py-2 px-6 flex items-center justify-between font-mono text-[11px] text-[#061840]/70 border-t border-[#0B3272]/20 mt-6 rounded-b-md">
                <span>✦ CHAPTER CONCLUDED</span>
                <span>RUCHI BHEDA DIARY // 2026</span>
                <span>END OF NOTEBOOK ✦</span>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 4. CONTACT ME SECTION (STEPPING OUTSIDE THE DIARY)                        */}
      {/* Separate visual moment in the #061840 Midnight Forest environment         */}
      {/* ========================================================================= */}
      <section className="relative z-20 w-full max-w-5xl mx-auto px-6 sm:px-12 pt-20 pb-16">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#E4BA83] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#E4BA83] animate-pulse"></span>
            <span>NEXT CHAPTER // INQUIRIES & COMMISSIONS</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F1E3CC] font-normal leading-tight">
            Let’s start a conversation.
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#8DA1B4] mt-3">
            Have an exciting product challenge, system architecture need, or early-stage idea? Let's bring it to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: Collaboration Checklist */}
          <div className="lg:col-span-6 bg-[#0B3272]/35 p-6 sm:p-8 rounded-2xl border border-[#0B3272] shadow-xl">
            <div className="flex items-center justify-between pb-3 mb-5 border-b border-[#0B3272] font-mono text-xs text-[#E4BA83]">
              <span className="font-bold uppercase tracking-wider">WAYS WE CAN WORK TOGETHER</span>
              <span>3 / 3 SELECTED</span>
            </div>

            <div className="space-y-3 font-sans text-sm sm:text-base">
              <button
                type="button"
                onClick={() => toggleCheck('opt1')}
                className="w-full flex items-center gap-3.5 p-3.5 rounded-xl bg-[#061840]/60 border border-[#0B3272] text-left cursor-pointer hover:border-[#E4BA83]/50 transition-colors"
              >
                <span className={`w-5 h-5 rounded border border-[#0B3272] flex items-center justify-center font-mono text-xs ${checkedItems.opt1 ? 'bg-[#E4BA83] text-[#061840] border-[#E4BA83]' : 'bg-transparent'}`}>
                  {checkedItems.opt1 ? '✓' : ''}
                </span>
                <span className="text-[#F1E3CC] font-medium">Product Strategy & 0-to-1 UX Systems</span>
              </button>

              <button
                type="button"
                onClick={() => toggleCheck('opt2')}
                className="w-full flex items-center gap-3.5 p-3.5 rounded-xl bg-[#061840]/60 border border-[#0B3272] text-left cursor-pointer hover:border-[#E4BA83]/50 transition-colors"
              >
                <span className={`w-5 h-5 rounded border border-[#0B3272] flex items-center justify-center font-mono text-xs ${checkedItems.opt2 ? 'bg-[#E4BA83] text-[#061840] border-[#E4BA83]' : 'bg-transparent'}`}>
                  {checkedItems.opt2 ? '✓' : ''}
                </span>
                <span className="text-[#F1E3CC] font-medium">High-impact, meaningful problems</span>
              </button>

              <button
                type="button"
                onClick={() => toggleCheck('opt3')}
                className="w-full flex items-center gap-3.5 p-3.5 rounded-xl bg-[#061840]/60 border border-[#0B3272] text-left cursor-pointer hover:border-[#E4BA83]/50 transition-colors"
              >
                <span className={`w-5 h-5 rounded border border-[#0B3272] flex items-center justify-center font-mono text-xs ${checkedItems.opt3 ? 'bg-[#E4BA83] text-[#061840] border-[#E4BA83]' : 'bg-transparent'}`}>
                  {checkedItems.opt3 ? '✓' : ''}
                </span>
                <span className="text-[#F1E3CC] font-medium">Empathetic, ambitious product teams</span>
              </button>
            </div>

            <div className="pt-4 mt-4 border-t border-[#0B3272] text-xs font-mono text-[#8DA1B4]">
              ✦ Click items to toggle values
            </div>
          </div>

          {/* Right: Direct Dispatch Card */}
          <div className="lg:col-span-6 bg-[#0B3272]/35 p-6 sm:p-8 rounded-2xl border border-[#0B3272] shadow-xl space-y-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#E4BA83] font-semibold">
                ✦ DIRECT DISPATCH
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#F1E3CC] font-normal leading-tight mt-1">
                Have a project in mind?{' '}
                <span className="font-hand text-3xl sm:text-4xl text-[#E4BA83]">
                  Let's chat!
                </span>
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                to="/contact"
                className="px-8 py-3.5 rounded-full bg-[#0B3272] text-[#F1E3CC] font-serif font-bold text-sm sm:text-base border border-[#E4BA83] shadow-md hover:bg-[#E4BA83] hover:text-[#061840] transition-colors"
              >
                <span>Go to Contact Page</span>
                <span className="ml-2 font-mono">→</span>
              </Link>
              <span className="font-mono text-xs text-[#8DA1B4]">
                Replies in 24–48 hours
              </span>
            </div>

            {/* Direct Social Links */}
            <div className="pt-4 border-t border-[#0B3272] flex flex-wrap items-center gap-6 font-mono text-xs text-[#8DA1B4]">
              <a href="https://www.linkedin.com/in/ruchibheda/" target="_blank" rel="noreferrer" className="hover:text-[#E4BA83] hover:underline">
                LinkedIn ↗
              </a>
              <a href="https://www.behance.net/ruchibheda2" target="_blank" rel="noreferrer" className="hover:text-[#E4BA83] hover:underline">
                Behance ↗
              </a>
              <a href="https://www.instagram.com/withloveruchi/" target="_blank" rel="noreferrer" className="hover:text-[#E4BA83] hover:underline">
                Instagram ↗
              </a>
            </div>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 5. TYPOGRAPHIC FABRIC (VERY LAST MAJOR VISUAL ELEMENT ON THE WEBSITE)     */}
      {/* Positioned strictly AFTER Contact Me!                                     */}
      {/* 🚨 LOCKED COMPONENT: Physical canvas & Web Audio chimes 100% untouched    */}
      {/* ========================================================================= */}
      <section className="relative z-20 w-full max-w-5xl mx-auto px-6 sm:px-12 pt-12 pb-16">
        
        {/* Fabric Signature Specimen Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-[#0B3272]">
          <div className="flex items-center gap-3">
            <span className="border border-[#0B3272] rounded-full px-3 py-0.5 font-mono font-bold text-[11px] uppercase tracking-wider bg-[#0B3272] text-[#E4BA83]">
              SIGNATURE PIECE
            </span>
            <span className="font-serif font-bold text-base sm:text-lg text-[#F1E3CC] tracking-tight">
              Interactive Typographic Fabric
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#8DA1B4]">
            <span className="hidden sm:inline">PHYSICAL BEADS SIMULATION</span>
            <span className="opacity-40">•</span>
            <span className="underline decoration-dotted text-[#E4BA83]">PROCEDURAL AUDIO CHIMES</span>
          </div>
        </div>

        {/* The Exact Typographic Fabric Component (Untouched physics & sound) */}
        <div className="w-full rounded-2xl overflow-hidden border border-[#0B3272] shadow-2xl bg-[#FFFED8]">
          <HangingCloth />
        </div>

        {/* Specimen Caption */}
        <div className="mt-3 px-1 flex flex-wrap items-center justify-between text-xs font-mono text-[#8DA1B4] gap-2">
          <span>✦ Move cursor or drag across words to ripple bead strings and scatter fairy-dust chimes</span>
          <span className="font-semibold text-[#E4BA83]">TOUCH & MOUSE ENABLED</span>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 6. FOOTER                                                                 */}
      {/* ========================================================================= */}
      <footer className="w-full py-8 text-center font-mono text-xs text-[#8DA1B4] border-t border-[#0B3272]">
        <span>✦ Ruchi Bheda © 2026 • UI/UX Designer & Product Designer • Mumbai, India</span>
      </footer>

    </div>
  )
}
