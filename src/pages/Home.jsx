import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import HangingCloth from '../components/HangingCloth'
import PixelSparkle from '../components/PixelSparkle'
import PixelFolder from '../components/PixelFolder'

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
  // Interactive checklist state for the Connect section (Jackie Zhang blueprint)
  const [checkedItems, setCheckedItems] = useState({
    opt1: true,
    opt2: true,
    opt3: true
  })

  const toggleCheck = (key) => {
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="min-h-screen bg-[#FFFED8] bg-notebook-grid text-[#173C64] font-body selection:bg-[#173C64] selection:text-[#FFFED8] flex flex-col justify-between overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* 1. TOP NAVIGATION (Minimal, Editorial, Jackie Zhang Placement)            */}
      {/* ========================================================================= */}
      <Nav />

      {/* ========================================================================= */}
      {/* 2. HERO AREA — RECREATED JACKIE ZHANG BLUEPRINT COMPOSITION               */}
      {/* Oversized typography, vertical letter stack, repeated typography, & fabric*/}
      {/* ========================================================================= */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pt-4 sm:pt-8 pb-12 sm:pb-20">
        
        {/* Top Kicker & Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 sm:mb-12 pb-4 border-b border-[#173C64]/20">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs uppercase tracking-widest text-[#173C64] font-bold bg-[#FFFED8] px-2.5 py-0.5 border border-[#173C64] rounded-full shadow-2xs">
              PORTFOLIO EDITION 2026
            </span>
            <span className="text-xs font-mono text-[#173C64]/70 hidden md:inline">
              // UI/UX DESIGNER & DESIGN ENTREPRENEUR
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-[#173C64]/80">
            <PixelSparkle size={14} />
            <span>MUMBAI, INDIA</span>
            <span className="opacity-40">•</span>
            <span>GMT +5:30</span>
            <span className="opacity-40">•</span>
            <span className="text-[#173C64] font-semibold">AVAILABLE FOR SELECT WORK</span>
          </div>
        </div>

        {/* HERO MAIN GRID: Vertical Typography Pillar on Left + Massive Statement on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-8 sm:mb-12">
          
          {/* LEFT PILLAR: Vertically Arranged Typography & Repeated Typography (Jackie Zhang Blueprint) */}
          <div className="hidden lg:flex lg:col-span-2 flex-col justify-between py-2 border-r border-[#173C64]/20 pr-6 min-h-[420px]">
            {/* Vertically arranged letters: UI/UX DESIGNER */}
            <div className="flex flex-col gap-1 items-center font-mono text-xs font-bold tracking-widest text-[#173C64]">
              {['U', 'I', '/', 'U', 'X'].map((char, i) => (
                <span key={`ui-${i}`} className="leading-tight select-none opacity-90">{char}</span>
              ))}
              <span className="w-1.5 h-1.5 rounded-full bg-[#173C64] my-2.5"></span>
              {['D', 'E', 'S', 'I', 'G', 'N', 'E', 'R'].map((char, i) => (
                <span key={`des-${i}`} className="leading-tight select-none opacity-90">{char}</span>
              ))}
            </div>

            {/* Repeated Typography Motif: BHEDA repeated vertically */}
            <div className="flex flex-col items-center gap-2 pt-6 mt-6 border-t border-[#173C64]/15">
              {['BHEDA', 'BHEDA', 'BHEDA', 'BHEDA'].map((txt, i) => (
                <span
                  key={`repeat-${i}`}
                  className="font-display font-extrabold text-[11px] tracking-[0.25em] text-[#173C64]/35 select-none hover:text-[#173C64] transition-colors"
                >
                  {txt}
                </span>
              ))}
            </div>

            {/* Vertical Sub-Label */}
            <div className="text-[10px] font-mono text-[#173C64]/50 tracking-widest uppercase text-center pt-4">
              STUDIO 2026
            </div>
          </div>

          {/* MAIN COLUMN: Oversized Typographic Statement & Identity */}
          <div className="lg:col-span-10 flex flex-col justify-between">
            
            {/* Top Identity Tag */}
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[#173C64]/70">
                ✦ RUCHI BHEDA — DESIGN STATEMENT
              </span>
            </div>

            {/* OVERSIZED TYPOGRAPHIC STATEMENT (Jackie Zhang Blueprint: "I find the why's before the what's.") */}
            <h1 className="flex flex-col gap-1 sm:gap-2 leading-[1.04] text-[#173C64]">
              <span className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] xl:text-[6.2rem] tracking-tight">
                I find the
              </span>

              <div className="flex items-baseline gap-3 sm:gap-6 flex-wrap">
                <span className="font-hand font-normal text-6xl sm:text-8xl md:text-9xl lg:text-[7.5rem] xl:text-[8.5rem] text-[#173C64] leading-none transform -rotate-2 underline decoration-[#173C64]/30 decoration-wavy decoration-2 sm:decoration-4 select-none">
                  why's
                </span>
                <span className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] xl:text-[6.2rem] tracking-tight">
                  before the
                </span>
              </div>

              <span className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] xl:text-[6.2rem] tracking-tight">
                what's.
              </span>
            </h1>

            {/* Explanatory Portfolio Copy & Quick Jump */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start pt-8 sm:pt-10 mt-6 border-t border-[#173C64]/15">
              <p className="md:col-span-8 text-base sm:text-lg md:text-xl text-[#173C64]/90 font-normal leading-relaxed">
                I am a UI/UX designer and design entrepreneur focused on discovering the core user needs, behavioral mental models, and intuitive systems that precede visual execution.
              </p>

              <div className="md:col-span-4 flex flex-col gap-2.5">
                <a
                  href="#work-section"
                  className="inline-flex items-center justify-between gap-3 px-5 py-3 rounded-full bg-[#173C64] text-[#FFFED8] font-display font-bold text-xs sm:text-sm tracking-wide shadow-md hover:bg-[#0e2640] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span>Explore Selected Work</span>
                  <span className="text-base font-mono">↓</span>
                </a>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-between gap-3 px-5 py-2.5 rounded-full bg-[#FFFED8] text-[#173C64] font-display font-semibold text-xs sm:text-sm border border-[#173C64] shadow-2xs hover:bg-[#173C64]/5 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span>About & Process</span>
                  <span className="text-base font-mono">→</span>
                </Link>
              </div>
            </div>

            {/* Mobile Vertical Indicator (When vertical pillar is hidden on small screens) */}
            <div className="flex lg:hidden flex-wrap items-center gap-2 pt-4 text-xs font-mono text-[#173C64]/70">
              <span className="font-bold">✦ UI/UX DESIGNER</span>
              <span>•</span>
              <span className="font-bold">DESIGN ENTREPRENEUR</span>
              <span>•</span>
              <span>RUCHI BHEDA</span>
            </div>

          </div>

        </div>

        {/* ===================================================================== */}
        {/* COEXISTING INTERACTIVE TYPOGRAPHIC FABRIC (LOCKED COMPONENT)           */}
        {/* 🚨 MANDATORY: Kept 100% intact with physical canvas and audio engine 🚨*/}
        {/* ===================================================================== */}
        <div id="fabric-specimen" className="relative w-full mt-6 sm:mt-10 pt-6 border-t border-[#173C64]/20">
          
          {/* Specimen Header & Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3 px-1">
            <div className="flex items-center gap-2">
              <span className="border border-[#173C64] rounded-full px-2.5 py-0.5 font-mono font-bold text-[11px] uppercase tracking-wider bg-[#173C64] text-[#FFFED8]">
                SPECIMEN 01
              </span>
              <span className="font-display font-extrabold text-sm sm:text-base text-[#173C64] tracking-tight">
                Interactive Typographic Fabric
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-[#173C64]/80">
              <span className="hidden sm:inline">PHYSICAL BEADS SIMULATION</span>
              <span className="opacity-40">•</span>
              <span className="underline decoration-dotted">WEB AUDIO CHIMES</span>
            </div>
          </div>

          {/* The Exact Typographic Fabric Component (Untouched physics & sound) */}
          <div className="w-full">
            <HangingCloth />
          </div>

          {/* Specimen Caption & Interaction Instructions */}
          <div className="mt-3 px-2 flex flex-wrap items-center justify-between text-xs font-mono text-[#173C64]/80 gap-2">
            <span>✦ Move cursor across words to bend bead strings and scatter fairy-dust glass chimes</span>
            <span className="font-semibold text-[#173C64]">TOUCH & MOUSE ENABLED // PROCEDURAL AUDIO</span>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 3. VALUES BLOCK ("3 things I strongly believe in")                        */}
      {/* (Recreating Jackie Zhang's exact Value block & tactile numbered cards)     */}
      {/* ========================================================================= */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-14 sm:py-24 border-t-2 border-[#173C64]">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-16">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#173C64] mb-3">
            <span className="border border-[#173C64] px-2.5 py-0.5 rounded-full bg-[#173C64] text-[#FFFED8] font-bold">
              01 // CORE BELIEFS
            </span>
            <span>// DESIGN PHILOSOPHY</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#173C64] tracking-tight">
            3 things I strongly believe in
          </h2>
        </div>

        {/* 3 Numbered Editorial Statement Cards (Jackie Zhang Blueprint) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {coreBeliefs.map((belief) => (
            <div
              key={belief.number}
              className="relative bg-[#FFFED8] p-6 sm:p-8 rounded-xs border-2 border-[#173C64] shadow-md flex flex-col justify-between hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
            >
              <div>
                {/* Large Numeral */}
                <div className="font-serif text-4xl sm:text-5xl font-bold text-[#173C64]/25 mb-4 font-mono select-none">
                  {belief.number}
                </div>

                {/* Belief Title */}
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#173C64] tracking-tight mb-3">
                  {belief.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-[#173C64]/85 leading-relaxed font-normal">
                  {belief.description}
                </p>
              </div>

              {/* Tag / Decorative Pill */}
              <div className="pt-6 mt-6 border-t border-[#173C64]/15 flex items-center justify-between">
                <span className="font-mono text-xs font-semibold tracking-wider text-[#173C64] uppercase bg-[#FFFED8] px-2.5 py-1 rounded-full border border-[#173C64]/30">
                  ✦ {belief.tag}
                </span>
                <PixelSparkle size={14} className="text-[#173C64]/40" />
              </div>
            </div>
          ))}
        </div>

        {/* Selected Disciplines Band */}
        <div className="mt-12 p-6 rounded-xs border border-[#173C64]/30 bg-[#FFFED8] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#173C64] font-bold">
            <PixelSparkle size={14} />
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
                className="font-display font-semibold text-xs px-3.5 py-1 rounded-full border border-[#173C64] bg-[#FFFED8] text-[#173C64] shadow-2xs hover:bg-[#173C64] hover:text-[#FFFED8] transition-colors"
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
        className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-14 sm:py-24 border-t-2 border-[#173C64]"
      >
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 sm:mb-12 border-b border-[#173C64]/20">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-[#173C64]">
              <span className="w-2 h-2 rounded-full bg-[#173C64]"></span>
              <span>02 // SELECTED WORK ARCHIVE</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#173C64] tracking-tight">
              Case Studies & Product Systems
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline font-mono text-xs text-[#173C64]/70">
              5 FEATURED CASE STUDIES
            </span>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 font-display font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full border border-[#173C64] bg-[#173C64] text-[#FFFED8] hover:bg-[#0e2640] shadow-xs transition-colors"
            >
              <span>View Full Archive</span>
              <span className="font-mono">→</span>
            </Link>
          </div>
        </div>

        {/* TACTILE CUTTING MAT WORKBENCH CONTAINER (Jackie Zhang Blueprint: "Cut mat screenies") */}
        <div className="relative rounded-xs border-2 sm:border-4 border-[#173C64] cutting-mat-grid p-4 sm:p-8 lg:p-12 shadow-2xl text-[#FFFED8] overflow-hidden mb-12">
          
          {/* Cutting Mat Measurement Numbers & Grid Ticks */}
          <div className="absolute top-2 left-4 flex gap-6 text-[10px] font-mono text-[#FFFED8]/40 select-none hidden sm:flex">
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

          <div className="absolute bottom-2 right-4 text-[10px] font-mono text-[#FFFED8]/40 select-none hidden sm:block">
            STUDIO WORKBENCH // RUCHI BHEDA
          </div>

          {/* Project Cards Inside Workbench */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 relative z-10">
            {projects.map((proj, idx) => (
              <Link
                key={proj.id}
                to="/work"
                className="group relative block bg-[#FFFED8] bg-notebook-grid text-[#173C64] p-6 sm:p-8 rounded-xs border-2 border-[#173C64] shadow-xl hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 no-underline"
              >
                {/* Top Corner Specimen Pill */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#173C64] text-[#FFFED8]">
                    {proj.category}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#173C64]/70">
                    {proj.year}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#173C64] tracking-tight group-hover:underline decoration-[#173C64]/40 underline-offset-4 mb-1">
                  {proj.title}
                </h3>

                {/* Subtitle */}
                <p className="font-display font-semibold text-xs sm:text-sm text-[#173C64]/70 mb-4 uppercase tracking-wide">
                  {proj.subtitle}
                </p>

                {/* Description */}
                <p className="text-sm sm:text-base text-[#173C64]/85 leading-relaxed mb-6 font-normal">
                  {proj.description}
                </p>

                {/* Tags & Action Arrow */}
                <div className="flex items-center justify-between pt-4 border-t border-[#173C64]/20">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono text-[#173C64]/80 bg-[#FFFED8] px-2 py-0.5 rounded border border-[#173C64]/20"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="w-8 h-8 rounded-full border border-[#173C64] flex items-center justify-center font-mono text-sm text-[#173C64] group-hover:bg-[#173C64] group-hover:text-[#FFFED8] group-hover:translate-x-1 transition-all duration-200">
                    →
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>

        {/* Interactive Pixel Folder Callout */}
        <div className="p-6 sm:p-8 rounded-xs border-2 border-dashed border-[#173C64] bg-[#FFFED8] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#173C64] font-bold uppercase mb-1">
              <PixelSparkle size={14} />
              <span>DIGITAL SPECIMEN ARCHIVE</span>
            </div>
            <p className="font-serif text-lg sm:text-xl text-[#173C64] font-bold">
              Looking for case study documentation, design systems, and process artifacts?
            </p>
          </div>

          <PixelFolder to="/work" />
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 5. ABOUT SECTION ("What's her deal? About me")                            */}
      {/* (Recreating Jackie Zhang's personal editorial bio & perspective)           */}
      {/* ========================================================================= */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-14 sm:py-24 border-t-2 border-[#173C64]">
        
        {/* Section Header */}
        <div className="max-w-4xl mb-8 sm:mb-12">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#173C64] mb-3">
            <span className="border border-[#173C64] px-2.5 py-0.5 rounded-full bg-[#173C64] text-[#FFFED8] font-bold">
              03 // PERSPECTIVE
            </span>
            <span>// ABOUT RUCHI BHEDA</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#173C64] tracking-tight">
            What’s her deal?
          </h2>
        </div>

        {/* Editorial Bio Card */}
        <div className="relative bg-[#FFFED8] bg-notebook-grid p-6 sm:p-10 lg:p-14 rounded-xs border-2 border-[#173C64] shadow-xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            
            {/* Left Main Bio Text */}
            <div className="lg:col-span-8 space-y-5 text-base sm:text-lg md:text-xl text-[#173C64]/90 font-normal leading-relaxed">
              <p>
                I am not trying to be limited to just UI/UX. I want to grow into a <strong className="font-bold text-[#173C64] font-display">design entrepreneur</strong> who understands products, businesses, brands, people, and technology as one cohesive ecosystem.
              </p>
              <p>
                My approach is rooted in human curiosity: finding the <em className="font-serif italic font-semibold">WHY</em> before deciding <em className="font-serif italic font-semibold">WHAT</em> to design. Whether it’s untangling complex clinical workflows in healthcare, creating intimate shared social listening spaces, or crafting physical wayfinding that guides humans through physical space, I care deeply about how software feels in human hands.
              </p>
              <p className="text-sm sm:text-base text-[#173C64]/80 font-mono pt-2 border-t border-[#173C64]/15">
                ✦ Human-centered · Curious · Business-minded · Empathetic · Experimental · Constantly learning
              </p>
            </div>

            {/* Right Fast Facts & Action */}
            <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-6">
              <div className="bg-[#FFFED8] p-5 rounded-xs border border-[#173C64]/30 space-y-3">
                <div className="font-mono text-xs uppercase tracking-wider text-[#173C64] font-bold">
                  Core Foundations
                </div>
                <ul className="text-xs sm:text-sm font-medium text-[#173C64]/85 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-[#173C64]">✦</span> Qualitative User Discovery
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#173C64]">✦</span> Mental Models & Information Architecture
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#173C64]">✦</span> Multi-Platform Design Systems
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#173C64]">✦</span> Product Strategy & 0-to-1 Ventures
                  </li>
                </ul>
              </div>

              <Link
                to="/about"
                className="inline-flex items-center justify-between gap-3 px-6 py-3 rounded-full bg-[#173C64] text-[#FFFED8] font-display font-bold text-xs sm:text-sm tracking-wide shadow-md hover:bg-[#0e2640] transition-all duration-200"
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
      <footer className="relative w-full border-t-2 border-[#173C64] bg-[#173C64] text-[#FFFED8] pt-14 sm:pt-20 pb-10 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto flex flex-col justify-between">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pb-12 sm:pb-16 border-b border-[#FFFED8]/20">
            
            {/* Left: Interactive Collaboration Checklist (Jackie Zhang Blueprint: "Checklist") */}
            <div className="lg:col-span-6 bg-[#FFFED8] text-[#173C64] p-6 sm:p-8 rounded-xs border-2 border-[#173C64] shadow-2xl">
              
              <div className="flex items-center justify-between pb-3 mb-5 border-b border-[#173C64]/20">
                <span className="font-mono text-xs uppercase tracking-widest font-bold">
                  CHECKLIST // WAYS WE CAN COLLABORATE
                </span>
                <span className="font-mono text-xs text-[#173C64]/60">
                  3 OF 3 CHECKED
                </span>
              </div>

              <div className="space-y-3.5 text-sm sm:text-base font-display font-bold">
                
                {/* Option 1 */}
                <button
                  type="button"
                  onClick={() => toggleCheck('opt1')}
                  className="w-full flex items-center gap-3 p-3 rounded-xs border border-[#173C64]/30 hover:bg-[#173C64]/5 transition-colors cursor-pointer text-left"
                >
                  <span className={`w-5 h-5 rounded-xs border-2 border-[#173C64] flex items-center justify-center font-mono text-xs ${checkedItems.opt1 ? 'bg-[#173C64] text-[#FFFED8]' : 'bg-transparent'}`}>
                    {checkedItems.opt1 ? '✓' : ''}
                  </span>
                  <span>Product Strategy & 0-to-1 UX Systems</span>
                </button>

                {/* Option 2 */}
                <button
                  type="button"
                  onClick={() => toggleCheck('opt2')}
                  className="w-full flex items-center gap-3 p-3 rounded-xs border border-[#173C64]/30 hover:bg-[#173C64]/5 transition-colors cursor-pointer text-left"
                >
                  <span className={`w-5 h-5 rounded-xs border-2 border-[#173C64] flex items-center justify-center font-mono text-xs ${checkedItems.opt2 ? 'bg-[#173C64] text-[#FFFED8]' : 'bg-transparent'}`}>
                    {checkedItems.opt2 ? '✓' : ''}
                  </span>
                  <span>High-impact, meaningful problems worth solving</span>
                </button>

                {/* Option 3 */}
                <button
                  type="button"
                  onClick={() => toggleCheck('opt3')}
                  className="w-full flex items-center gap-3 p-3 rounded-xs border border-[#173C64]/30 hover:bg-[#173C64]/5 transition-colors cursor-pointer text-left"
                >
                  <span className={`w-5 h-5 rounded-xs border-2 border-[#173C64] flex items-center justify-center font-mono text-xs ${checkedItems.opt3 ? 'bg-[#173C64] text-[#FFFED8]' : 'bg-transparent'}`}>
                    {checkedItems.opt3 ? '✓' : ''}
                  </span>
                  <span>Empathetic, ambitious teams building for humans</span>
                </button>

              </div>

              <div className="mt-4 pt-3 border-t border-[#173C64]/15 flex items-center justify-between text-[11px] font-mono text-[#173C64]/70">
                <span>✦ Click items to toggle</span>
                <span>AVAILABLE FOR COMMISSIONS</span>
              </div>

            </div>

            {/* Right: "Let's Chat!" Call Card */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-6">
              
              <div>
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#FFFED8]/70 mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#FFFED8] animate-pulse"></span>
                  <span>LET'S CONNECT</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FFFED8] leading-tight">
                  Have an exciting project or idea?{' '}
                  <span className="font-hand text-4xl sm:text-6xl lg:text-7xl font-normal block sm:inline text-[#FFFED8]">
                    Let's make it real.
                  </span>
                </h2>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#FFFED8] text-[#173C64] font-display font-extrabold text-sm sm:text-base tracking-tight shadow-xl hover:bg-white hover:scale-105 transition-all duration-200"
                >
                  <span>Start a Conversation</span>
                  <span className="font-mono text-lg">→</span>
                </Link>

                <span className="font-mono text-xs text-[#FFFED8]/70">
                  Response within 24–48 business hours
                </span>
              </div>

            </div>

          </div>

          {/* Bottom Social Links & Copyright */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#FFFED8]/80">
            <div className="flex items-center gap-5 sm:gap-8">
              <a
                href="https://www.linkedin.com/in/ruchibheda/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#FFFED8] hover:underline"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://www.behance.net/ruchibheda2"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#FFFED8] hover:underline"
              >
                Behance ↗
              </a>
              <a
                href="https://www.instagram.com/withloveruchi/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#FFFED8] hover:underline"
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
