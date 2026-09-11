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

  // Interactive checklist state for Connect section
  const [checkedItems, setCheckedItems] = useState({
    opt1: true,
    opt2: true,
    opt3: true
  })

  const toggleCheck = (key) => {
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="min-h-screen bg-[#061840] text-[#F1E3CC] font-body selection:bg-[#E4BA83] selection:text-[#061840] relative overflow-x-hidden pb-20 sm:pb-32">
      
      {/* ========================================================================= */}
      {/* 1. OUTER CHALK DOODLES (Floating in the Midnight Forest background)       */}
      {/* Faithfully matching the doodles outside the diary in the screenshot       */}
      {/* ========================================================================= */}
      
      {/* Top Left Chalk Doodle: Juice Box with Straw */}
      <div className="absolute top-28 left-4 sm:left-12 lg:left-24 pointer-events-none select-none z-10 opacity-75 hidden md:block">
        <svg width="68" height="90" viewBox="0 0 68 90" fill="none" stroke="#F1E3CC" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Straw */}
          <path d="M42 22 L42 6 L32 6 L28 14" strokeDasharray="3 2" />
          {/* Box outline */}
          <path d="M16 22 L50 22 L48 84 L14 84 Z" />
          <path d="M16 22 L24 16 L56 16 L50 22" />
          <path d="M56 16 L54 78 L48 84" />
          {/* Juice fruit icon */}
          <circle cx="32" cy="52" r="9" />
          <path d="M32 43 L32 39" />
          <path d="M22 66 Q32 72 42 66" />
        </svg>
      </div>

      {/* Top Right Chalk Doodle: Bowl of Noodles & Chopsticks */}
      <div className="absolute top-32 right-4 sm:right-12 lg:right-24 pointer-events-none select-none z-10 opacity-75 hidden md:block">
        <svg width="95" height="70" viewBox="0 0 95 70" fill="none" stroke="#F1E3CC" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Chopsticks */}
          <path d="M10 18 L68 6" />
          <path d="M12 26 L72 10" />
          {/* Noodles */}
          <path d="M34 18 Q44 10 56 18 Q62 24 68 20" />
          <path d="M38 22 Q48 14 58 22" />
          {/* Bowl */}
          <ellipse cx="50" cy="30" rx="30" ry="10" />
          <path d="M22 32 Q26 56 50 56 Q74 56 78 32" />
          <path d="M38 56 L38 60 L62 60 L62 56" />
        </svg>
      </div>

      {/* Middle Right Chalk Doodle: Cute Dinosaur / Monster */}
      <div className="absolute top-[480px] right-4 sm:right-10 lg:right-20 pointer-events-none select-none z-10 opacity-75 hidden md:block">
        <svg width="85" height="110" viewBox="0 0 85 110" fill="none" stroke="#F1E3CC" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Spikes */}
          <path d="M62 30 L74 38 L64 46 L76 54 L66 62 L78 70 L68 78" />
          {/* Head & Body */}
          <path d="M24 64 L16 54 L14 36 Q18 20 44 20 Q64 20 62 48 L64 86 Q62 96 46 96 L28 96" />
          {/* Eye */}
          <rect x="36" y="32" width="10" height="14" rx="2" />
          <path d="M41 38 L41 42" strokeWidth="3" />
          {/* Mouth */}
          <path d="M16 48 L32 48" />
          <path d="M20 48 L23 44 L26 48 L29 44" />
        </svg>
      </div>

      {/* Middle Left Chalk Doodle: Swimming Fish */}
      <div className="absolute top-[920px] left-4 sm:left-10 lg:left-20 pointer-events-none select-none z-10 opacity-75 hidden md:block">
        <svg width="80" height="55" viewBox="0 0 80 55" fill="none" stroke="#F1E3CC" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Fish body */}
          <path d="M68 28 Q48 10 24 20 Q12 28 24 36 Q48 46 68 28 Z" />
          {/* Tail */}
          <path d="M20 28 L6 14 L12 28 L6 42 Z" />
          {/* Eye & Scales */}
          <circle cx="56" cy="24" r="3" fill="#F1E3CC" />
          <path d="M44 22 Q40 28 44 34" />
          <path d="M36 24 Q32 28 36 32" />
        </svg>
      </div>

      {/* Lower Right Chalk Doodle: Little Daisy Flower */}
      <div className="absolute top-[1080px] right-4 sm:right-12 lg:right-24 pointer-events-none select-none z-10 opacity-75 hidden md:block">
        <svg width="75" height="90" viewBox="0 0 75 90" fill="none" stroke="#F1E3CC" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Stem & Leaves */}
          <path d="M38 46 Q36 68 40 88" />
          <path d="M36 64 Q22 62 26 52 Q34 54 36 64" />
          <path d="M38 72 Q52 70 48 60 Q40 62 38 72" />
          {/* Petals */}
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
      {/* 2. TOP FLOATING NAVIGATION                                                */}
      {/* Hand-drawn Gochi Hand links floating cleanly on Midnight Forest           */}
      {/* ========================================================================= */}
      <Nav />

      {/* ========================================================================= */}
      {/* 3. CENTRAL DIARY / NOTEBOOK OBJECT (PRIMARY DESIGN REFERENCE)              */}
      {/* Large rounded physical notebook placed in the center of the viewport      */}
      {/* ========================================================================= */}
      <main className="relative z-20 w-full max-w-4xl lg:max-w-5xl mx-auto px-3 sm:px-6">
        
        {/* PHYSICAL NOTEBOOK OUTER WRAPPER */}
        <div className="relative rounded-[32px] sm:rounded-[44px] bg-[#C45540] p-2.5 sm:p-4 shadow-[0_30px_90px_-15px_rgba(0,0,0,0.85)] border-4 sm:border-[6px] border-[#A84330]">
          
          {/* BOOKMARK RIBBON (Peeking out of the bottom-left edge) */}
          <div className="absolute -left-3 sm:-left-5 bottom-24 z-30 pointer-events-none select-none">
            <svg width="45" height="30" viewBox="0 0 45 30" fill="none">
              <path d="M45 10 C30 8, 12 18, 2 28 L2 18 C12 8, 30 2, 45 4 Z" fill="#E4BA83" />
            </svg>
          </div>
          
          <div className="absolute -left-4 sm:-left-6 bottom-14 z-30 pointer-events-none select-none">
            <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
              <path d="M60 14 C40 10, 16 26, 0 38 L0 26 C16 14, 40 4, 60 6 Z" fill="#D2604B" />
            </svg>
          </div>

          {/* NOTEBOOK INTERIOR PAGES */}
          <div className="relative rounded-[24px] sm:rounded-[36px] bg-diary-grid text-[#2C1E18] overflow-hidden shadow-inner border border-[#D8C7B5]">
            
            {/* Top Page Margin Fold */}
            <div className="w-full h-3 sm:h-4 bg-linear-to-b from-[#E6D9C8] to-transparent opacity-60"></div>

            {/* ===================================================================== */}
            {/* SPREAD 1: HERO SPREAD (Exact Composition of Screenshot 1)              */}
            {/* ===================================================================== */}
            <section className="relative px-6 sm:px-12 lg:px-16 pt-6 sm:pt-10 pb-12 sm:pb-16">
              
              {/* Two Column Grid: Left Typography / Right Hand-Drawn Window Illustration */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center">
                
                {/* Left Column: Designer Name, Role, Statement, Location */}
                <div className="md:col-span-6 lg:col-span-6 space-y-4 sm:space-y-6">
                  
                  {/* Handwritten Wordmark / Signature */}
                  <div>
                    <span className="font-hand text-4xl sm:text-5xl lg:text-6xl text-[#C45540] font-bold tracking-tight inline-block transform -rotate-1 select-none">
                      Ruchi<span className="text-2xl sm:text-3xl font-mono ml-1 text-[#C45540]">ツ</span>
                    </span>
                    <div className="font-serif text-lg sm:text-xl md:text-2xl text-[#C45540] tracking-wide mt-1">
                      Product Designer
                    </div>
                  </div>

                  {/* Core Statement (Exact hierarchy of Screenshot 1) */}
                  <div className="pt-2">
                    <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] text-[#C45540] leading-[1.12] tracking-tight">
                      <span>I find the </span>
                      <span className="font-hand font-normal text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#C45540] inline-block transform -rotate-2">
                        why's
                      </span>
                      <span className="block">before the what's.</span>
                    </h1>
                  </div>

                  {/* Location & Time Indicator */}
                  <div className="pt-2 flex items-center gap-2 font-serif text-sm sm:text-base text-[#C45540]/80">
                    <span>Mumbai</span>
                    <span>•</span>
                    <span>GMT +5:30</span>
                    {timeString && (
                      <>
                        <span>•</span>
                        <span className="font-mono text-xs text-[#C45540]/70">{timeString}</span>
                      </>
                    )}
                  </div>

                  {/* Quick CTAs styled as notebook stamps */}
                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    <a
                      href="#diary-beliefs"
                      className="px-4 py-1.5 rounded-full border border-[#C45540] bg-transparent text-[#C45540] font-serif text-xs sm:text-sm hover:bg-[#C45540] hover:text-[#FAF4EB] transition-colors"
                    >
                      3 things I believe in ↓
                    </a>
                    <a
                      href="#diary-work"
                      className="px-4 py-1.5 rounded-full bg-[#C45540] text-[#FAF4EB] font-serif text-xs sm:text-sm shadow-xs hover:bg-[#A84330] transition-colors"
                    >
                      Browse projects →
                    </a>
                  </div>

                </div>

                {/* Right Column: Hand-Drawn SVG Botanical Window Illustration (Matching Screenshot 1) */}
                <div className="md:col-span-6 lg:col-span-6 relative flex justify-center items-center py-4">
                  
                  {/* Outer container holding the illustration */}
                  <div className="relative w-full max-w-[340px] sm:max-w-[420px]">
                    <svg viewBox="0 0 380 340" fill="none" stroke="#C45540" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-auto select-none">
                      
                      {/* Window Header Frame */}
                      <rect x="65" y="60" width="220" height="230" rx="4" strokeWidth="2.5" />
                      <line x1="65" y1="84" x2="285" y2="84" strokeWidth="2" />
                      
                      {/* Window Controls */}
                      <rect x="75" y="68" width="8" height="8" rx="1" />
                      <text x="145" y="77" fill="#C45540" stroke="none" fontFamily="sans-serif" fontSize="9" fontWeight="bold" letterSpacing="1">UNTITLED</text>
                      <line x1="262" y1="72" x2="274" y2="72" />
                      <line x1="262" y1="76" x2="274" y2="76" />

                      {/* Birds perched on the window */}
                      {/* Bird 1 */}
                      <path d="M102 60 C102 46, 116 46, 116 60 Z" />
                      <circle cx="111" cy="51" r="1" fill="#C45540" />
                      <path d="M115 52 L119 53" />
                      {/* Bird 2 */}
                      <path d="M124 60 C124 46, 138 46, 138 60 Z" />
                      <circle cx="133" cy="51" r="1" fill="#C45540" />
                      <path d="M137 52 L141 53" />
                      {/* Bird 3 */}
                      <path d="M236 60 C236 46, 250 46, 250 60 Z" />
                      <circle cx="240" cy="51" r="1" fill="#C45540" />
                      <path d="M236 52 L232 53" />

                      {/* Search / URL pill inside window */}
                      <rect x="130" y="105" width="80" height="20" rx="10" />
                      <path d="M150 115 Q158 110 166 115" />
                      <path d="M152 140 Q160 134 168 140 Q176 146 184 140" />

                      {/* Friendly Character holding screen/card */}
                      <rect x="135" y="152" width="62" height="82" rx="12" strokeWidth="2.2" fill="#FAF4EB" />
                      {/* Character Head */}
                      <circle cx="212" cy="180" r="18" fill="#FAF4EB" />
                      {/* Smile & Eyes */}
                      <circle cx="206" cy="176" r="2" fill="#C45540" />
                      <circle cx="216" cy="178" r="2" fill="#C45540" />
                      <path d="M206 186 Q212 192 218 186" />
                      {/* Hair */}
                      <path d="M198 174 Q204 160 216 164 Q226 162 228 174" />
                      {/* Hands holding card */}
                      <ellipse cx="140" cy="186" rx="6" ry="4" fill="#FAF4EB" />
                      <ellipse cx="196" cy="204" rx="6" ry="5" fill="#FAF4EB" />
                      {/* Body */}
                      <path d="M202 198 L196 245 L228 245 L224 198" />

                      {/* Friendly Peeking Critter on Right */}
                      <path d="M280 190 Q292 186 298 205 L292 270 L274 270" fill="#FAF4EB" />
                      <ellipse cx="294" cy="200" rx="12" ry="16" fill="#FAF4EB" />
                      <circle cx="292" cy="196" r="2" fill="#C45540" />
                      <path d="M298 190 Q310 188 304 200" />
                      <path d="M304 202 L316 206" /> {/* leaf in mouth */}

                      {/* Lush Foliage, Ferns, Vines, Leaves */}
                      {/* Left foliage cluster */}
                      <path d="M52 230 C30 200, 70 170, 95 190 C110 160, 150 170, 140 210" fill="#FAF4EB" />
                      <path d="M62 255 C40 220, 80 190, 110 220" />
                      <path d="M68 280 C35 240, 100 220, 140 250" fill="#FAF4EB" />

                      {/* Big Bush at Center Bottom */}
                      <path d="M96 280 C80 250, 120 230, 146 250 C170 220, 220 225, 230 255 C250 225, 300 240, 290 280 Z" fill="#FAF4EB" />
                      <path d="M120 280 L120 290 M140 280 L140 290 M210 280 L210 290" />
                      {/* Little grass tufts */}
                      <path d="M102 284 L106 274 L110 284" />
                      <path d="M174 286 L178 274 L182 286" />
                      <path d="M260 284 L264 274 L268 284" />
                      {/* Little mushroom */}
                      <path d="M90 274 Q96 264 102 274 Z" fill="#FAF4EB" />
                      <line x1="96" y1="274" x2="96" y2="282" />

                      {/* Bottom-left blooming flower buds (Matching Screenshot 1) */}
                      <path d="M4 275 Q24 235 48 200" strokeWidth="2.5" />
                      <path d="M22 250 Q12 240 6 250 Q16 260 22 250" />
                      {/* Flower 1 */}
                      <ellipse cx="24" cy="216" rx="10" ry="14" transform="rotate(-30 24 216)" fill="#FAF4EB" />
                      <path d="M18 204 Q24 216 22 228" />
                      <path d="M14 210 Q24 216 28 222" />
                      {/* Flower 2 */}
                      <ellipse cx="50" cy="192" rx="10" ry="14" transform="rotate(-15 50 192)" fill="#FAF4EB" />
                      <path d="M44 180 Q50 192 48 204" />
                      <path d="M42 186 Q50 192 56 198" />
                    </svg>
                  </div>

                </div>

              </div>

            </section>

            {/* Page Divider Line inside the Diary */}
            <div className="w-full border-b-2 border-[#D8C7B5] border-dashed my-4"></div>

            {/* ===================================================================== */}
            {/* SPREAD 2: COEXISTING INTERACTIVE TYPOGRAPHIC FABRIC                   */}
            {/* 🚨 LOCKED COMPONENT: Embedded untouched inside the physical diary     */}
            {/* ===================================================================== */}
            <section className="relative px-4 sm:px-10 lg:px-12 py-8">
              
              {/* Taped Specimen Title */}
              <div className="flex items-center justify-between gap-4 mb-4 pb-2 border-b border-[#D8C7B5]">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs uppercase tracking-wider bg-[#C45540] text-[#FAF4EB] px-3 py-0.5 rounded-full font-bold">
                    SPECIMEN 01
                  </span>
                  <span className="font-serif font-bold text-base sm:text-lg text-[#2C1E18]">
                    Interactive Typographic Fabric
                  </span>
                </div>
                <div className="font-serif italic text-xs sm:text-sm text-[#C45540]">
                  Procedural Wind-Chime Audio • Touch & Cursor Active
                </div>
              </div>

              {/* The Locked Typographic Fabric */}
              <div className="w-full rounded-xl overflow-hidden border border-[#D8C7B5] shadow-md bg-[#FFFED8]">
                <HangingCloth />
              </div>

              <div className="mt-3 flex items-center justify-between text-xs font-mono text-[#2C1E18]/70">
                <span>✦ Move cursor or drag across words to ripple beads and chime harmonics</span>
                <span className="font-serif italic text-[#C45540]">Field Study #01</span>
              </div>

            </section>

            {/* Page Divider Line */}
            <div className="w-full border-b-2 border-[#D8C7B5] border-dashed my-6"></div>

            {/* ===================================================================== */}
            {/* SPREAD 3: "3 THINGS I STRONGLY BELIEVE IN"                            */}
            {/* (Faithfully recreating the 3 overlapping paper scraps of Screenshot 2) */}
            {/* ===================================================================== */}
            <section id="diary-beliefs" className="relative px-6 sm:px-12 lg:px-16 pt-8 pb-16">
              
              {/* Editorial Section Header */}
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#C45540] font-normal mb-12 sm:mb-16 tracking-tight">
                3 things I strongly believe in
              </h2>

              {/* THE 3 OVERLAPPING PAPER SCRAPS / STICKY NOTES */}
              <div className="relative min-h-[380px] sm:min-h-[440px] max-w-2xl mx-auto mb-12">
                
                {/* SCRAP 1: Torn Lined Notebook Paper (Top Left, tilted -3°) */}
                <div className="absolute top-0 left-0 sm:left-4 z-10 w-[240px] sm:w-[310px] p-6 rounded-xs bg-notebook-ruled shadow-xl border border-[#D6C4B0] transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                  {/* Ragged Torn Top Edge Marker */}
                  <div className="absolute -top-1.5 left-0 right-0 h-2 bg-[#FAF4EB]" style={{ clipPath: 'polygon(0% 100%, 5% 0%, 10% 100%, 15% 0%, 20% 100%, 25% 0%, 30% 100%, 35% 0%, 40% 100%, 45% 0%, 50% 100%, 55% 0%, 60% 100%, 65% 0%, 70% 100%, 75% 0%, 80% 100%, 85% 0%, 90% 100%, 95% 0%, 100% 100%)' }}></div>
                  
                  {/* Handwritten text */}
                  <div className="pt-3 font-hand text-2xl sm:text-3xl lg:text-4xl text-[#1a2d52] font-bold leading-[1.3] select-none pl-4">
                    tirelessly<br />
                    pursue<br />
                    clarity.
                  </div>
                  <div className="text-[11px] font-mono text-[#C45540] pt-4 pl-4 uppercase font-semibold">
                    01 // The why before what
                  </div>
                </div>

                {/* SCRAP 2: Torn Graph Paper (Top Right, overlapping, tilted +4°) */}
                <div className="absolute top-4 right-0 sm:right-6 z-20 w-[250px] sm:w-[320px] p-6 rounded-xs bg-torn-graph shadow-2xl border border-[#C2C0B8] transform rotate-4 hover:rotate-0 transition-transform duration-300">
                  {/* Ragged Right Edge */}
                  <div className="absolute -right-1 top-0 bottom-0 w-2 bg-[#FAF4EB]" style={{ clipPath: 'polygon(0% 0%, 100% 5%, 0% 10%, 100% 15%, 0% 20%, 100% 25%, 0% 30%, 100% 35%, 0% 40%, 100% 45%, 0% 50%, 100% 55%, 0% 60%, 100% 65%, 0% 70%, 100% 75%, 0% 80%, 100% 85%, 0% 90%, 100% 95%, 0% 100%)' }}></div>
                  
                  {/* Typewriter text */}
                  <div className="font-mono text-xl sm:text-2xl lg:text-3xl text-[#171717] font-bold leading-tight select-none">
                    Software<br />
                    should<br />
                    empower.
                  </div>
                  <div className="text-[11px] font-mono text-[#555] pt-4 uppercase">
                    02 // Design as an entrepreneurial lever
                  </div>
                </div>

                {/* SCRAP 3: Kraft Sticky Note with Paperclip (Center Bottom, overlapping both, tilted -1°) */}
                <div className="absolute top-48 sm:top-52 left-1/2 -translate-x-1/2 z-30 w-[260px] sm:w-[330px] p-6 sm:p-8 rounded-sm bg-kraft-note shadow-2xl border border-[#B3A08C] transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                  
                  {/* Realistic SVG Paperclip pinned on top */}
                  <div className="absolute -top-5 left-10 pointer-events-none select-none">
                    <svg width="22" height="42" viewBox="0 0 22 42" fill="none">
                      <path d="M6 10 L6 32 C6 37 16 37 16 32 L16 8 C16 3 3 3 3 8 L3 34 C3 41 19 41 19 34 L19 12" stroke="#4A5568" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  {/* Elegant Italic Serif statement */}
                  <div className="font-serif italic font-bold text-2xl sm:text-3xl lg:text-4xl text-[#2C1E18] leading-tight select-none pt-2">
                    Design for<br />
                    moments
                  </div>
                  <div className="text-[11px] font-mono text-[#2C1E18]/70 pt-4 uppercase font-semibold">
                    03 // Tactile & living tools
                  </div>
                </div>

              </div>

              {/* Hand-Drawn Terracotta Botanical Sketch at Bottom (Matching Screenshot 2) */}
              <div className="w-full flex justify-between items-end pt-4 select-none pointer-events-none">
                
                {/* Left botanical: Fallen Tree Log with Bark & Mushrooms */}
                <div className="w-44 sm:w-56">
                  <svg viewBox="0 0 200 90" fill="none" stroke="#C45540" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {/* Log cut face */}
                    <ellipse cx="40" cy="50" rx="18" ry="24" />
                    <ellipse cx="40" cy="50" rx="10" ry="14" strokeDasharray="3 3" />
                    <circle cx="40" cy="50" r="3" fill="#C45540" />
                    {/* Log body */}
                    <path d="M40 26 L170 34 C185 36, 185 64, 170 66 L40 74" />
                    <path d="M70 30 L66 70" strokeDasharray="4 4" />
                    <path d="M110 32 L106 68" strokeDasharray="4 4" />
                    {/* Little mushrooms on the ground */}
                    <path d="M12 78 Q18 68 24 78 Z" />
                    <line x1="18" y1="78" x2="18" y2="84" />
                    <path d="M26 80 Q30 72 34 80 Z" />
                    <line x1="30" y1="80" x2="30" y2="84" />
                    {/* Grass tufts */}
                    <path d="M6 86 L10 76 L14 86" />
                    <path d="M174 86 L178 76 L182 86" />
                  </svg>
                </div>

                {/* Right botanical: Wild Wheat, Grasses & Floral Sprigs */}
                <div className="w-48 sm:w-64">
                  <svg viewBox="0 0 220 110" fill="none" stroke="#C45540" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {/* Grass stalk 1 */}
                    <path d="M120 100 Q140 50 170 20" />
                    {/* Wheat head */}
                    <ellipse cx="170" cy="20" rx="6" ry="12" transform="rotate(40 170 20)" />
                    <ellipse cx="160" cy="30" rx="5" ry="10" transform="rotate(40 160 30)" />
                    <ellipse cx="150" cy="40" rx="5" ry="10" transform="rotate(40 150 40)" />
                    <ellipse cx="140" cy="50" rx="5" ry="10" transform="rotate(40 140 50)" />
                    {/* Flower stem & leaves */}
                    <path d="M160 100 Q180 60 195 40" />
                    <ellipse cx="195" cy="40" rx="7" ry="10" transform="rotate(20 195 40)" />
                    <ellipse cx="182" cy="52" rx="7" ry="10" transform="rotate(-30 182 52)" />
                    {/* Little butterfly */}
                    <path d="M60 40 Q66 30 72 40 Q66 50 60 40" />
                    <path d="M54 38 Q48 30 42 38 Q48 46 54 38" />
                  </svg>
                </div>

              </div>

            </section>

            {/* Page Divider Line */}
            <div className="w-full border-b-2 border-[#D8C7B5] border-dashed my-6"></div>

            {/* ===================================================================== */}
            {/* SPREAD 4: SELECTED WORKS & FIELD NOTES                                */}
            {/* ===================================================================== */}
            <section id="diary-work" className="relative px-6 sm:px-12 lg:px-16 pt-8 pb-16">
              
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-8">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#C45540] font-semibold">
                    ✦ FIELD ARCHIVE // CASE STUDIES
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-[#2C1E18] font-normal tracking-tight mt-1">
                    Projects & Living Systems
                  </h2>
                </div>
                <Link
                  to="/work"
                  className="inline-flex items-center gap-2 font-serif text-sm text-[#C45540] hover:underline"
                >
                  <span>Explore All 6 Studies</span>
                  <span>→</span>
                </Link>
              </div>

              {/* Grid of Journal Project Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {projects.map((proj, idx) => (
                  <Link
                    key={proj.id}
                    to="/work"
                    className={`group relative p-6 sm:p-7 rounded-md bg-[#FAF4EB] border border-[#D8C7B5] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 no-underline text-[#2C1E18] ${idx % 2 === 0 ? 'transform -rotate-0.5' : 'transform rotate-0.5'}`}
                  >
                    {/* Washi Tape at corner */}
                    <div className="absolute -top-2.5 left-6 w-16 h-5 bg-[#E4BA83]/60 border border-[#C45540]/30 transform -rotate-2 select-none pointer-events-none shadow-xs"></div>
                    
                    {/* Top Row */}
                    <div className="flex items-center justify-between gap-2 pt-2 mb-3">
                      <span className="font-mono text-xs font-bold text-[#C45540]">
                        {proj.number}
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-[#2C1E18]/60">
                        {proj.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C1E18] group-hover:text-[#C45540] transition-colors mb-1">
                      {proj.title}
                    </h3>

                    {/* Subtitle */}
                    <div className="font-mono text-xs text-[#2C1E18]/60 uppercase tracking-wider mb-3">
                      {proj.subtitle}
                    </div>

                    {/* Description */}
                    <p className="font-serif text-sm text-[#2C1E18]/80 leading-relaxed mb-4">
                      {proj.description}
                    </p>

                    {/* Handwritten Field Note Sticky */}
                    <div className="p-2.5 rounded bg-[#FDFBF7] border border-[#D8C7B5] font-hand text-base text-[#1a2d52] flex items-center justify-between">
                      <span>"{proj.note}"</span>
                      <span className="text-xs font-mono text-[#C45540] font-bold">Open ↗</span>
                    </div>

                  </Link>
                ))}
              </div>

            </section>

            {/* Page Divider Line */}
            <div className="w-full border-b-2 border-[#D8C7B5] border-dashed my-6"></div>

            {/* ===================================================================== */}
            {/* SPREAD 5: ABOUT ME & PERSONAL JOURNAL ENTRY                           */}
            {/* ===================================================================== */}
            <section className="relative px-6 sm:px-12 lg:px-16 pt-8 pb-16">
              
              <div className="max-w-3xl space-y-6">
                <span className="font-mono text-xs uppercase tracking-widest text-[#C45540] font-semibold">
                  ✦ JOURNAL ENTRY // ABOUT RUCHI BHEDA
                </span>
                
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2C1E18] font-normal leading-tight">
                  I don’t design in isolation.<br />
                  I design for <span className="font-hand text-4xl sm:text-5xl text-[#C45540]">living ecosystems.</span>
                </h2>

                <div className="space-y-4 font-serif text-base sm:text-lg text-[#2C1E18]/85 leading-relaxed pt-2">
                  <p>
                    I am not trying to be limited to just UI/UX. I want to grow into a <strong>design entrepreneur</strong> who understands products, businesses, brands, people, and technology as interconnected parts of a living whole.
                  </p>
                  <p>
                    Too often in technology, teams jump straight into the <em>what</em> before thoroughly interrogating the <em>why</em>. My work starts with relentless curiosity: uncovering the underlying human motivations, emotional frictions, and mental models that determine whether a product actually sticks.
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#C45540] bg-[#C45540] text-[#FAF4EB] font-serif text-sm shadow-sm hover:bg-[#A84330] transition-colors"
                  >
                    <span>Read Full Perspective & Core Principles</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

            </section>

            {/* Page Divider Line */}
            <div className="w-full border-b-2 border-[#D8C7B5] border-dashed my-6"></div>

            {/* ===================================================================== */}
            {/* SPREAD 6: CONNECT // COLLABORATION CHECKLIST & DISPATCH               */}
            {/* ===================================================================== */}
            <section className="relative px-6 sm:px-12 lg:px-16 pt-8 pb-16">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                
                {/* Left: Taped Collaboration Checklist */}
                <div className="lg:col-span-6 p-6 sm:p-8 rounded-md bg-[#FDFBF7] border border-[#D8C7B5] shadow-lg relative transform -rotate-0.5">
                  <div className="absolute -top-3 left-10 w-20 h-5 bg-[#E4BA83]/50 border border-[#C45540]/30 transform -rotate-1 select-none pointer-events-none"></div>

                  <div className="flex items-center justify-between pb-3 mb-5 border-b border-[#D8C7B5] font-mono text-xs text-[#C45540]">
                    <span className="font-bold uppercase tracking-wider">COLLABORATION CHECKLIST</span>
                    <span>3 / 3 SELECTED</span>
                  </div>

                  <div className="space-y-3 font-serif text-sm sm:text-base">
                    <button
                      type="button"
                      onClick={() => toggleCheck('opt1')}
                      className="w-full flex items-center gap-3 p-3 rounded bg-[#FAF4EB] border border-[#D8C7B5] text-left cursor-pointer hover:border-[#C45540] transition-colors"
                    >
                      <span className={`w-5 h-5 rounded border border-[#C45540] flex items-center justify-center font-mono text-xs ${checkedItems.opt1 ? 'bg-[#C45540] text-[#FAF4EB]' : 'bg-transparent'}`}>
                        {checkedItems.opt1 ? '✓' : ''}
                      </span>
                      <span>Product Strategy & 0-to-1 Systems</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleCheck('opt2')}
                      className="w-full flex items-center gap-3 p-3 rounded bg-[#FAF4EB] border border-[#D8C7B5] text-left cursor-pointer hover:border-[#C45540] transition-colors"
                    >
                      <span className={`w-5 h-5 rounded border border-[#C45540] flex items-center justify-center font-mono text-xs ${checkedItems.opt2 ? 'bg-[#C45540] text-[#FAF4EB]' : 'bg-transparent'}`}>
                        {checkedItems.opt2 ? '✓' : ''}
                      </span>
                      <span>High-impact, meaningful problems</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleCheck('opt3')}
                      className="w-full flex items-center gap-3 p-3 rounded bg-[#FAF4EB] border border-[#D8C7B5] text-left cursor-pointer hover:border-[#C45540] transition-colors"
                    >
                      <span className={`w-5 h-5 rounded border border-[#C45540] flex items-center justify-center font-mono text-xs ${checkedItems.opt3 ? 'bg-[#C45540] text-[#FAF4EB]' : 'bg-transparent'}`}>
                        {checkedItems.opt3 ? '✓' : ''}
                      </span>
                      <span>Empathetic, ambitious product teams</span>
                    </button>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#D8C7B5] text-xs font-mono text-[#2C1E18]/60">
                    ✦ Click items to toggle values
                  </div>
                </div>

                {/* Right: "Let's Chat" Call Card */}
                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-[#C45540] font-semibold">
                      ✦ OPEN FOR OPPORTUNITIES
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2C1E18] font-normal leading-tight mt-1">
                      Have an exciting project?{' '}
                      <span className="font-hand text-4xl sm:text-5xl text-[#C45540]">
                        Let's chat!
                      </span>
                    </h2>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <Link
                      to="/contact"
                      className="px-8 py-3.5 rounded-full bg-[#C45540] text-[#FAF4EB] font-serif font-bold text-sm sm:text-base shadow-md hover:bg-[#A84330] transition-colors"
                    >
                      <span>Start a Conversation</span>
                      <span className="ml-2 font-mono">→</span>
                    </Link>
                    <span className="font-mono text-xs text-[#2C1E18]/60">
                      Replies in 24–48 hours
                    </span>
                  </div>

                  {/* Direct Social Links */}
                  <div className="pt-4 flex flex-wrap items-center gap-6 font-mono text-xs text-[#C45540]">
                    <a href="https://www.linkedin.com/in/ruchibheda/" target="_blank" rel="noreferrer" className="hover:underline">
                      LinkedIn ↗
                    </a>
                    <a href="https://www.behance.net/ruchibheda2" target="_blank" rel="noreferrer" className="hover:underline">
                      Behance ↗
                    </a>
                    <a href="https://www.instagram.com/withloveruchi/" target="_blank" rel="noreferrer" className="hover:underline">
                      Instagram ↗
                    </a>
                  </div>
                </div>

              </div>

            </section>

            {/* Bottom Page Margin Fold */}
            <div className="w-full h-4 bg-linear-to-t from-[#E6D9C8] to-transparent opacity-60"></div>

          </div>

        </div>

        {/* Outer Footer Signature */}
        <footer className="w-full py-8 text-center font-mono text-xs text-[#F1E3CC]/60">
          <span>✦ Ruchi Bheda © 2026 • UI/UX Designer & Product Designer • Mumbai, India</span>
        </footer>

      </main>

    </div>
  )
}
