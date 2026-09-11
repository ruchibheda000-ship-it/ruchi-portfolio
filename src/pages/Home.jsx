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
    category: 'Product Design / HealthTech',
    year: '2025',
    description: 'End-to-end clinical workflow and patient care portal connecting electronic health records, automated triaging, and empathetic appointment navigation for patients and practitioners.',
    tags: ['Healthcare', 'Design Systems', 'Complex UX', 'Web App'],
    link: '/work'
  },
  {
    id: 'melt',
    number: '02',
    title: 'Melt',
    subtitle: 'Social Music Streaming & Shared Listening',
    category: 'UI/UX / Social Audio',
    year: '2025',
    description: 'Mobile listening platform designed around organic human connection—shared real-time listening rooms, collaborative vinyl queues, and tactile haptic audio controls.',
    tags: ['Mobile App', 'Audio Interaction', 'Community', 'Haptics'],
    link: '/work'
  },
  {
    id: 'shree-shrushti',
    number: '03',
    title: 'Shree Shrushti Farms',
    subtitle: 'Wayfinding & Signage Navigation System',
    category: 'Spatial & Digital Wayfinding',
    year: '2024',
    description: 'Integrated physical-digital wayfinding system connecting architectural trail signage with a lightweight GPS-assisted mobile guide for agro-tourism visitors.',
    tags: ['Wayfinding', 'Physical-Digital', 'Signage System', 'Map UI'],
    link: '/work'
  },
  {
    id: 'code-crafters',
    number: '04',
    title: 'Code Crafters',
    subtitle: 'Cybersecurity Operations Center Dashboard',
    category: 'Enterprise Dashboard / SOC',
    year: '2024',
    description: 'High-density security operations center monitoring dashboard for real-time threat intelligence, automated incident triage, and vulnerability relationship graphs.',
    tags: ['Data Viz', 'SOC Dashboard', 'Enterprise UX', 'Dark Mode'],
    link: '/work'
  },
  {
    id: 'boredom',
    number: '05',
    title: 'Boredom',
    subtitle: 'Anti-Doomscrolling Behavioral Experience',
    category: 'Behavioral Design / Wellbeing',
    year: '2024',
    description: 'A mindful digital companion designed to break compulsive phone pickups and doomscrolling loops through intentional friction, breathing pauses, and tactile analog prompt cards.',
    tags: ['Behavioral UX', 'Digital Wellbeing', 'Friction Design', 'Mobile'],
    link: '/work'
  },
  {
    id: 'pinterest-ai',
    number: '06',
    title: 'Pinterest AI Home Décor',
    subtitle: 'Algorithmic Spatial Curation & Ambient Commerce',
    category: 'Concept & AI Interaction',
    year: '2024',
    description: 'An exploratory concept bridging Pinterest moodboards with generative spatial models, allowing users to stage their actual living rooms through aesthetic taste graphs.',
    tags: ['AI Interaction', 'Spatial Curation', 'Concept', 'E-Commerce'],
    link: '/work'
  }
]

// 3 Core Beliefs (Jackie Zhang Blueprint: "3 things I strongly believe in")
const coreBeliefs = [
  {
    number: '01',
    title: 'Understand the WHY before deciding WHAT.',
    description: 'Design begins with human curiosity, not interface components. Before deciding what screens, buttons, or features to build, I tirelessly pursue the behavioral truths, mental models, and organizational bottlenecks that define the real challenge.',
    tag: 'Human Discovery & Research'
  },
  {
    number: '02',
    title: 'Design as an entrepreneurial lever.',
    description: 'I am not limited to just UI/UX. I look at design through the lens of a design entrepreneur—aligning product desirability, technical feasibility, and business viability to create products that generate real commercial and cultural impact.',
    tag: 'Design Entrepreneurship'
  },
  {
    number: '03',
    title: 'Digital tools should feel alive & tactile.',
    description: 'Software and web spaces need not be cold or rigid. Incorporating physical motion, tactile feedback, micro-sounds, and sensory friction transforms everyday software from a utilitarian chore into an intuitive, memorable discovery.',
    tag: 'Living Systems & Craft'
  }
]

export default function Home() {
  // Live India Time (GMT +5:30)
  const [timeString, setTimeString] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      // Format time in Indian Standard Time (IST)
      const options = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }
      setTimeString(new Intl.DateTimeFormat('en-US', options).format(now))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Interactive checklist state for Connect section (Jackie Zhang blueprint)
  const [checkedItems, setCheckedItems] = useState({
    opt1: true,
    opt2: true,
    opt3: true
  })

  const toggleCheck = (key) => {
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="min-h-screen bg-[#F5EFEB] text-[#171717] font-body selection:bg-[#171717] selection:text-[#F5EFEB] flex flex-col justify-between overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* 1. TOP NAVIGATION (Minimal Jackie Zhang Blueprint)                       */}
      {/* ========================================================================= */}
      <Nav />

      {/* ========================================================================= */}
      {/* 2. HERO AREA — RECREATED JACKIE ZHANG BLUEPRINT COMPOSITION               */}
      {/* Oversized typography, vertical letter stack, repeated typography, & fabric*/}
      {/* ========================================================================= */}
      <section className="relative w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 pt-4 sm:pt-8 pb-16 sm:pb-24">
        
        {/* Top Kicker & Live Time Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-10 sm:mb-16 pb-4 border-b border-[#171717]/15">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#E35342] animate-pulse"></span>
            <span className="font-mono text-xs uppercase tracking-widest text-[#171717]/70">
              MUMBAI, INDIA • GMT +5:30 {timeString && `• ${timeString}`}
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-[#171717]/60">
            <span>AVAILABLE FOR SELECT WORK</span>
            <span className="opacity-40">•</span>
            <span>PORTFOLIO 2026</span>
          </div>
        </div>

        {/* HERO MAIN GRID: Vertical Typography Pillar on Left + Massive Statement on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start mb-12 sm:mb-16">
          
          {/* LEFT PILLAR: Vertically Arranged Typography & Repeated Typography (Jackie Zhang Blueprint) */}
          <div className="hidden lg:flex lg:col-span-2 flex-col justify-between py-2 border-r border-[#171717]/15 pr-8 min-h-[440px]">
            
            {/* Vertically stacked letters: P R O D U C T   D E S I G N E R */}
            <div className="flex flex-col gap-1 items-center font-mono text-xs font-bold tracking-[0.25em] text-[#171717]">
              {['P', 'R', 'O', 'D', 'U', 'C', 'T'].map((char, i) => (
                <span key={`p-${i}`} className="leading-tight select-none opacity-90">{char}</span>
              ))}
              <span className="w-1.5 h-1.5 rounded-full bg-[#E35342] my-3"></span>
              {['D', 'E', 'S', 'I', 'G', 'N', 'E', 'R'].map((char, i) => (
                <span key={`d-${i}`} className="leading-tight select-none opacity-90">{char}</span>
              ))}
            </div>

            {/* Repeated Typography Motif: BHEDA repeated vertically */}
            <div className="flex flex-col items-center gap-2 pt-8 mt-8 border-t border-[#171717]/10">
              {['BHEDA', 'BHEDA', 'BHEDA', 'BHEDA'].map((txt, i) => (
                <span
                  key={`repeat-${i}`}
                  className="font-display font-extrabold text-[11px] tracking-[0.3em] text-[#171717]/25 select-none hover:text-[#E35342] transition-colors"
                >
                  {txt}
                </span>
              ))}
            </div>

            {/* Vertical Sub-Label */}
            <div className="text-[10px] font-mono text-[#171717]/40 tracking-widest uppercase text-center pt-4">
              STUDIO EDITION
            </div>
          </div>

          {/* MAIN COLUMN: Oversized Typographic Statement & Identity */}
          <div className="lg:col-span-10 flex flex-col justify-between">
            
            {/* Top Identity Tag */}
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[#E35342] font-semibold">
                ✦ RUCHI BHEDA — DESIGN STATEMENT
              </span>
            </div>

            {/* OVERSIZED TYPOGRAPHIC STATEMENT (Jackie Zhang Blueprint: "I find the why's before the what's.") */}
            <h1 className="flex flex-col gap-1 sm:gap-2 leading-[1.04] text-[#171717]">
              <span className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] tracking-tight">
                I find the
              </span>

              <div className="flex items-baseline gap-3 sm:gap-6 flex-wrap">
                <span className="font-hand font-normal text-6xl sm:text-8xl md:text-9xl lg:text-[7.8rem] xl:text-[8.8rem] text-[#E35342] leading-none transform -rotate-2 underline decoration-[#E35342]/35 decoration-wavy decoration-2 sm:decoration-4 select-none">
                  why's
                </span>
                <span className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] tracking-tight">
                  before the
                </span>
              </div>

              <span className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] tracking-tight">
                what's.
              </span>
            </h1>

            {/* Explanatory Portfolio Copy & Quick Jump */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start pt-8 sm:pt-12 mt-6 border-t border-[#171717]/15">
              <p className="md:col-span-8 text-base sm:text-lg md:text-xl text-[#171717]/85 font-normal leading-relaxed">
                I am a UI/UX designer and product designer focused on discovering the core user needs, behavioral mental models, and intuitive systems that precede visual execution.
              </p>

              <div className="md:col-span-4 flex flex-col gap-3">
                <a
                  href="#work-section"
                  className="inline-flex items-center justify-between gap-3 px-6 py-3.5 rounded-full bg-[#171717] text-[#F5EFEB] font-display font-bold text-xs sm:text-sm tracking-wide shadow-md hover:bg-[#E35342] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span>Explore Selected Work</span>
                  <span className="text-base font-mono">↓</span>
                </a>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-between gap-3 px-6 py-3 rounded-full bg-transparent text-[#171717] font-display font-semibold text-xs sm:text-sm border border-[#171717]/40 hover:border-[#171717] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span>About & Perspective</span>
                  <span className="text-base font-mono">→</span>
                </Link>
              </div>
            </div>

            {/* Mobile Vertical Indicator (When vertical pillar is hidden on small screens) */}
            <div className="flex lg:hidden flex-wrap items-center gap-2 pt-6 text-xs font-mono text-[#171717]/70">
              <span className="font-bold text-[#E35342]">✦ PRODUCT DESIGNER</span>
              <span>•</span>
              <span className="font-bold">UI/UX DESIGNER</span>
              <span>•</span>
              <span>RUCHI BHEDA</span>
            </div>

          </div>

        </div>

        {/* ===================================================================== */}
        {/* COEXISTING INTERACTIVE TYPOGRAPHIC FABRIC (LOCKED COMPONENT)           */}
        {/* 🚨 MANDATORY: Kept 100% intact with physical canvas and audio engine 🚨*/}
        {/* ===================================================================== */}
        <div id="fabric-specimen" className="relative w-full mt-6 sm:mt-10 pt-8 border-t border-[#171717]/15">
          
          {/* Specimen Header & Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3 px-1">
            <div className="flex items-center gap-2">
              <span className="border border-[#171717] rounded-full px-3 py-0.5 font-mono font-bold text-[11px] uppercase tracking-wider bg-[#171717] text-[#F5EFEB]">
                SPECIMEN 01
              </span>
              <span className="font-serif font-bold text-sm sm:text-base text-[#171717] tracking-tight">
                Interactive Typographic Fabric
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-[#171717]/70">
              <span className="hidden sm:inline">PHYSICAL BEADS SIMULATION</span>
              <span className="opacity-40">•</span>
              <span className="underline decoration-dotted text-[#E35342]">WEB AUDIO CHIMES</span>
            </div>
          </div>

          {/* The Exact Typographic Fabric Component (Untouched physics & sound) */}
          <div className="w-full">
            <HangingCloth />
          </div>

          {/* Specimen Caption & Interaction Instructions */}
          <div className="mt-3 px-2 flex flex-wrap items-center justify-between text-xs font-mono text-[#171717]/70 gap-2">
            <span>✦ Move cursor across words to bend bead strings and scatter fairy-dust glass chimes</span>
            <span className="font-semibold text-[#171717]">TOUCH & MOUSE ENABLED // PROCEDURAL AUDIO</span>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 3. VALUES BLOCK ("3 things I strongly believe in")                        */}
      {/* (Recreating Jackie Zhang's exact Value block & tactile numbered cards)     */}
      {/* ========================================================================= */}
      <section className="relative w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-16 sm:py-24 border-t-2 border-[#171717]">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#E35342] mb-3">
            <span className="border border-[#E35342] px-2.5 py-0.5 rounded-full bg-[#E35342] text-[#F5EFEB] font-bold">
              01 // CORE BELIEFS
            </span>
            <span>// DESIGN PHILOSOPHY</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#171717] tracking-tight">
            3 things I strongly believe in
          </h2>
        </div>

        {/* 3 Numbered Editorial Statement Cards (Jackie Zhang Blueprint) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {coreBeliefs.map((belief) => (
            <div
              key={belief.number}
              className="relative bg-[#FAF7F2] p-6 sm:p-8 rounded-xs border border-[#171717]/20 shadow-xs flex flex-col justify-between hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
            >
              <div>
                {/* Large Numeral */}
                <div className="font-serif text-4xl sm:text-5xl font-bold text-[#171717]/20 mb-4 font-mono select-none">
                  {belief.number}
                </div>

                {/* Belief Title */}
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#171717] tracking-tight mb-3">
                  {belief.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-[#171717]/80 leading-relaxed font-normal">
                  {belief.description}
                </p>
              </div>

              {/* Tag / Decorative Pill */}
              <div className="pt-6 mt-6 border-t border-[#171717]/10 flex items-center justify-between">
                <span className="font-mono text-xs font-semibold tracking-wider text-[#171717] uppercase bg-white/70 px-2.5 py-1 rounded-full border border-[#171717]/20">
                  ✦ {belief.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Disciplines Band */}
        <div className="mt-12 p-6 rounded-xs border border-[#171717]/20 bg-[#FAF7F2] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#E35342] font-bold">
            <span>DISCIPLINES:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              'Product Strategy',
              'Complex UX Systems',
              'Design Systems',
              'User Research & Mental Models',
              'Design Entrepreneurship',
              'Rapid Interactive Prototyping'
            ].map((d) => (
              <span
                key={d}
                className="font-display font-semibold text-xs px-3.5 py-1 rounded-full border border-[#171717]/20 bg-white/80 text-[#171717] shadow-2xs hover:border-[#171717] transition-colors"
              >
                {d}
              </span>
            ))}
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 4. WORK SECTION — STUDIO CUTTING MAT WORKBENCH                             */}
      {/* (Recreating Jackie Zhang's tactile cutting mat & editorial presentations)  */}
      {/* ========================================================================= */}
      <section
        id="work-section"
        className="relative w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-16 sm:py-24 border-t-2 border-[#171717]"
      >
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 sm:mb-12 border-b border-[#171717]/20">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-[#E35342]">
              <span className="w-2 h-2 rounded-full bg-[#E35342]"></span>
              <span>02 // SELECTED WORK ARCHIVE</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#171717] tracking-tight">
              Case Studies & Product Systems
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline font-mono text-xs text-[#171717]/60">
              6 DOCUMENTED CASE STUDIES
            </span>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 font-display font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full border border-[#171717] bg-[#171717] text-[#F5EFEB] hover:bg-[#E35342] hover:border-[#E35342] shadow-xs transition-colors"
            >
              <span>View Full Archive</span>
              <span className="font-mono">→</span>
            </Link>
          </div>
        </div>

        {/* TACTILE CUTTING MAT WORKBENCH CONTAINER (Jackie Zhang Blueprint: "Cut mat screenies") */}
        <div className="relative rounded-xs border-2 sm:border-4 border-[#171717] cutting-mat-grid p-6 sm:p-10 lg:p-14 shadow-2xl text-[#F5EFEB] overflow-hidden mb-12">
          
          {/* Cutting Mat Measurement Numbers & Grid Ticks */}
          <div className="absolute top-2 left-6 flex gap-8 text-[10px] font-mono text-[#F5EFEB]/35 select-none hidden sm:flex">
            <span>01</span>
            <span>02</span>
            <span>03</span>
            <span>04</span>
            <span>05</span>
            <span>06</span>
            <span>07</span>
            <span>08</span>
            <span>09</span>
            <span>10</span>
          </div>

          <div className="absolute bottom-2 right-6 text-[10px] font-mono text-[#F5EFEB]/35 select-none hidden sm:block">
            STUDIO WORKBENCH // RUCHI BHEDA
          </div>

          {/* Project Cards Inside Workbench */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 relative z-10">
            {projects.map((proj) => (
              <Link
                key={proj.id}
                to="/work"
                className="group relative block bg-[#FAF7F2] text-[#171717] p-6 sm:p-8 rounded-xs border border-[#171717]/20 shadow-xl hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 no-underline"
              >
                {/* Top Corner Specimen Pill */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#171717] text-[#F5EFEB]">
                    {proj.category}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#171717]/60">
                    {proj.year}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717] tracking-tight group-hover:text-[#E35342] transition-colors mb-1">
                  {proj.title}
                </h3>

                {/* Subtitle */}
                <p className="font-display font-semibold text-xs sm:text-sm text-[#171717]/60 mb-4 uppercase tracking-wide">
                  {proj.subtitle}
                </p>

                {/* Description */}
                <p className="text-sm sm:text-base text-[#171717]/80 leading-relaxed mb-6 font-normal">
                  {proj.description}
                </p>

                {/* Tags & Action Arrow */}
                <div className="flex items-center justify-between pt-4 border-t border-[#171717]/15">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono text-[#171717]/70 bg-white/70 px-2 py-0.5 rounded border border-[#171717]/15"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="w-8 h-8 rounded-full border border-[#171717] flex items-center justify-center font-mono text-sm text-[#171717] group-hover:bg-[#E35342] group-hover:border-[#E35342] group-hover:text-[#F5EFEB] group-hover:translate-x-1 transition-all duration-200">
                    →
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 5. ABOUT SECTION ("What's her deal? About me")                            */}
      {/* (Recreating Jackie Zhang's personal editorial bio & perspective)           */}
      {/* ========================================================================= */}
      <section className="relative w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-16 sm:py-24 border-t-2 border-[#171717]">
        
        {/* Section Header */}
        <div className="max-w-4xl mb-8 sm:mb-12">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#E35342] mb-3">
            <span className="border border-[#E35342] px-2.5 py-0.5 rounded-full bg-[#E35342] text-[#F5EFEB] font-bold">
              03 // PERSPECTIVE
            </span>
            <span>// ABOUT RUCHI BHEDA</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#171717] tracking-tight">
            What’s her deal?
          </h2>
        </div>

        {/* Editorial Bio Card */}
        <div className="relative bg-[#FAF7F2] p-6 sm:p-10 lg:p-14 rounded-xs border border-[#171717]/20 shadow-lg">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            
            {/* Left Main Bio Text */}
            <div className="lg:col-span-8 space-y-5 text-base sm:text-lg md:text-xl text-[#171717]/85 font-normal leading-relaxed">
              <p>
                I am not trying to be limited to just UI/UX. I want to grow into a <strong className="font-serif font-bold text-[#171717]">design entrepreneur</strong> who understands products, businesses, brands, people, and technology as one cohesive ecosystem.
              </p>
              <p>
                My approach is rooted in human curiosity: finding the <em className="font-serif italic font-semibold text-[#E35342]">WHY</em> before deciding <em className="font-serif italic font-semibold text-[#E35342]">WHAT</em> to design. Whether it’s untangling complex clinical workflows in healthcare, creating intimate shared social listening spaces, or crafting physical wayfinding that guides humans through real space, I care deeply about how software feels in human hands.
              </p>
              <p className="text-sm sm:text-base text-[#171717]/70 font-mono pt-3 border-t border-[#171717]/10">
                ✦ Human-centered · Curious · Business-minded · Empathetic · Experimental · Constantly learning
              </p>
            </div>

            {/* Right Fast Facts & Action */}
            <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-6">
              <div className="bg-white/80 p-5 rounded-xs border border-[#171717]/20 space-y-3">
                <div className="font-mono text-xs uppercase tracking-wider text-[#171717] font-bold">
                  Core Foundations
                </div>
                <ul className="text-xs sm:text-sm font-medium text-[#171717]/80 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-[#E35342]">✦</span> Qualitative User Discovery
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#E35342]">✦</span> Mental Models & Architecture
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#E35342]">✦</span> Multi-Platform Design Systems
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#E35342]">✦</span> Product Strategy & 0-to-1 Ventures
                  </li>
                </ul>
              </div>

              <Link
                to="/about"
                className="inline-flex items-center justify-between gap-3 px-6 py-3.5 rounded-full bg-[#171717] text-[#F5EFEB] font-display font-bold text-xs sm:text-sm tracking-wide shadow-md hover:bg-[#E35342] transition-all duration-200"
              >
                <span>Read Full Story & Bio</span>
                <span className="font-mono text-base">→</span>
              </Link>
            </div>

          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 6. CONNECT / FOOTER SECTION — CHECKLIST & CALL CARD                       */}
      {/* (Recreating Jackie Zhang's exact interactive checklist & call card)        */}
      {/* ========================================================================= */}
      <footer className="relative w-full border-t-2 border-[#171717] bg-[#171717] text-[#F5EFEB] pt-16 sm:pt-24 pb-12 px-6 sm:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto flex flex-col justify-between">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start pb-12 sm:pb-16 border-b border-[#F5EFEB]/15">
            
            {/* Left: Interactive Collaboration Checklist (Jackie Zhang Blueprint: "Checklist") */}
            <div className="lg:col-span-6 bg-[#FAF7F2] text-[#171717] p-6 sm:p-8 rounded-xs border border-[#171717]/20 shadow-2xl">
              
              <div className="flex items-center justify-between pb-3 mb-5 border-b border-[#171717]/15 font-mono text-xs">
                <span className="font-bold uppercase tracking-widest text-[#E35342]">
                  CHECKLIST // WAYS WE CAN COLLABORATE
                </span>
                <span className="text-[#171717]/50">
                  3 OF 3 CHECKED
                </span>
              </div>

              <div className="space-y-3 font-display font-bold text-sm sm:text-base">
                
                {/* Option 1 */}
                <button
                  type="button"
                  onClick={() => toggleCheck('opt1')}
                  className="w-full flex items-center gap-3 p-3 rounded-xs border border-[#171717]/20 hover:bg-black/5 transition-colors cursor-pointer text-left"
                >
                  <span className={`w-5 h-5 rounded-xs border-2 border-[#171717] flex items-center justify-center font-mono text-xs ${checkedItems.opt1 ? 'bg-[#E35342] border-[#E35342] text-white' : 'bg-transparent'}`}>
                    {checkedItems.opt1 ? '✓' : ''}
                  </span>
                  <span>Product Strategy & 0-to-1 UX Systems</span>
                </button>

                {/* Option 2 */}
                <button
                  type="button"
                  onClick={() => toggleCheck('opt2')}
                  className="w-full flex items-center gap-3 p-3 rounded-xs border border-[#171717]/20 hover:bg-black/5 transition-colors cursor-pointer text-left"
                >
                  <span className={`w-5 h-5 rounded-xs border-2 border-[#171717] flex items-center justify-center font-mono text-xs ${checkedItems.opt2 ? 'bg-[#E35342] border-[#E35342] text-white' : 'bg-transparent'}`}>
                    {checkedItems.opt2 ? '✓' : ''}
                  </span>
                  <span>High-impact, meaningful problems worth solving</span>
                </button>

                {/* Option 3 */}
                <button
                  type="button"
                  onClick={() => toggleCheck('opt3')}
                  className="w-full flex items-center gap-3 p-3 rounded-xs border border-[#171717]/20 hover:bg-black/5 transition-colors cursor-pointer text-left"
                >
                  <span className={`w-5 h-5 rounded-xs border-2 border-[#171717] flex items-center justify-center font-mono text-xs ${checkedItems.opt3 ? 'bg-[#E35342] border-[#E35342] text-white' : 'bg-transparent'}`}>
                    {checkedItems.opt3 ? '✓' : ''}
                  </span>
                  <span>Empathetic, ambitious teams building for humans</span>
                </button>

              </div>

              <div className="mt-4 pt-3 border-t border-[#171717]/10 flex items-center justify-between text-[11px] font-mono text-[#171717]/60">
                <span>✦ Click items to toggle values</span>
                <span>AVAILABLE FOR COMMISSIONS</span>
              </div>

            </div>

            {/* Right: "Let's Chat!" Call Card */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-6">
              
              <div>
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#E35342] mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#E35342] animate-pulse"></span>
                  <span>LET'S CONNECT</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F5EFEB] leading-tight">
                  Have an exciting project or idea?{' '}
                  <span className="font-hand text-4xl sm:text-6xl lg:text-7xl font-normal block sm:inline text-[#E35342]">
                    Let's make it real.
                  </span>
                </h2>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#E35342] text-white font-display font-extrabold text-sm sm:text-base tracking-tight shadow-xl hover:bg-[#c24234] hover:scale-105 transition-all duration-200"
                >
                  <span>Start a Conversation</span>
                  <span className="font-mono text-lg">→</span>
                </Link>

                <span className="font-mono text-xs text-[#F5EFEB]/60">
                  Response within 24–48 business hours
                </span>
              </div>

            </div>

          </div>

          {/* Bottom Social Links & Copyright */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#F5EFEB]/70">
            <div className="flex items-center gap-6 sm:gap-8">
              <a
                href="https://www.linkedin.com/in/ruchibheda/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#E35342] hover:underline"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://www.behance.net/ruchibheda2"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#E35342] hover:underline"
              >
                Behance ↗
              </a>
              <a
                href="https://www.instagram.com/withloveruchi/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#E35342] hover:underline"
              >
                Instagram ↗
              </a>
            </div>

            <div className="flex items-center gap-2">
              <span>✦ Ruchi Bheda © 2026</span>
              <span className="opacity-40">•</span>
              <span>Made with care</span>
              <span className="opacity-40">•</span>
              <span>Mumbai, India</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  )
}
