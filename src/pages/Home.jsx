import React from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import HangingCloth from '../components/HangingCloth'
import PixelSparkle from '../components/PixelSparkle'
import PixelFolder from '../components/PixelFolder'

const featuredProjects = [
  {
    id: 1,
    title: 'Kitger Packaging System',
    category: 'Packaging Design',
    year: '2025',
    tag: 'Physical & Specimen',
    description: 'Eco-conscious tactile packaging suite featuring custom kraft die-cuts, tactile folds, and vintage screenprinted typography.',
    tags: ['Die-cut', 'Screenprint', 'Sustainable'],
    link: '/work'
  },
  {
    id: 2,
    title: 'Kinetic Type Exhibition',
    category: 'Visual Communication',
    year: '2025',
    tag: 'Typography / Motion',
    description: 'Bespoke experimental hybrid typefaces bridging mid-century calligraphy with 90s cyber-pixel aesthetics.',
    tags: ['Custom Type', 'Editorial', 'Poster'],
    link: '/work'
  },
  {
    id: 3,
    title: 'Atelier Monochrome',
    category: 'Brand Identity',
    year: '2024',
    tag: 'Visual Identity',
    description: 'Complete brand language, stationery suite, and packaging guidelines for an avant-garde design studio.',
    tags: ['Identity', 'Stationery', 'Guidelines'],
    link: '/work'
  },
  {
    id: 4,
    title: 'Cyber-Nostalgia Archive',
    category: 'Web & Interactive',
    year: '2024',
    tag: 'Digital Specimen',
    description: 'Interactive web laboratory exploring retro computing interfaces, early GUI desktop metaphors, and tactile sound design.',
    tags: ['React', 'Interactive', 'UI/UX'],
    link: '/work'
  }
]

const coreBeliefs = [
  {
    number: '01',
    title: 'Tactile over disposable.',
    description: 'Design should possess texture, gravity, and permanence. Whether through screenprinted packaging, paper ephemera, or weighted typography, genuine physical craft creates lasting emotional resonance.',
    tag: 'Craft & Ephemera'
  },
  {
    number: '02',
    title: 'Typography carries the voice.',
    description: 'Type is never neutral. It commands rhythm, establishes authority, and evokes memory. Bespoke letterforms and contrasting editorial scale turn simple statements into memorable visual moments.',
    tag: 'Expressive Type'
  },
  {
    number: '03',
    title: 'Digital tools can feel alive.',
    description: 'Software and web spaces need not be cold or rigid. Incorporating physical motion, tactile feedback, micro-sounds, and playful interaction transforms browsing into an organic experience.',
    tag: 'Interactive Systems'
  }
]

const heroStickers = [
  { label: '✦ Print & Pixels', rotate: '-rotate-2', bg: 'bg-[#FFFED8]', text: 'text-[#173C64]' },
  { label: '✎ Expressive Type', rotate: 'rotate-3', bg: 'bg-[#173C64]', text: 'text-[#FFFED8]' },
  { label: '📦 Packaging Die-Cuts', rotate: '-rotate-3', bg: 'bg-[#FFFED8]', text: 'text-[#173C64]' },
  { label: '⚡ Interactive Web Experiments', rotate: 'rotate-2', bg: 'bg-[#FFFED8]', text: 'text-[#173C64]' },
  { label: '✦ Editorial Systems', rotate: '-rotate-1', bg: 'bg-[#173C64]', text: 'text-[#FFFED8]' },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFFED8] bg-notebook-grid text-[#173C64] font-body selection:bg-[#173C64] selection:text-[#FFFED8] flex flex-col justify-between overflow-x-hidden">
      
      {/* Top Sticky/Floating Navigation */}
      <Nav />

      {/* ========================================================================= */}
      {/* HERO AREA — RECREATED JACKIE ZHANG BLUEPRINT COMPOSITION                  */}
      {/* Oversized typography, vertical letter stack, repeated typography, & fabric*/}
      {/* ========================================================================= */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pt-6 sm:pt-10 pb-12 sm:pb-20">
        
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
            <span className="text-[#173C64] font-semibold">AVAILABLE</span>
          </div>
        </div>

        {/* HERO MAIN GRID: Vertical Typography Pillar on Left + Massive Statement on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-10 sm:mb-14">
          
          {/* LEFT PILLAR: Vertically Arranged Typography & Repeated Typography (Jackie Zhang Blueprint) */}
          <div className="hidden lg:flex lg:col-span-2 flex-col justify-between py-2 border-r border-[#173C64]/20 pr-6 min-h-[380px]">
            {/* Vertically arranged letters: UI/UX DESIGNER */}
            <div className="flex flex-col gap-1 items-center font-mono text-xs font-bold tracking-widest text-[#173C64]">
              {['U', 'I', '/', 'U', 'X'].map((char, i) => (
                <span key={`ui-${i}`} className="leading-tight select-none opacity-90">{char}</span>
              ))}
              <span className="w-1.5 h-1.5 rounded-full bg-[#173C64] my-2"></span>
              {['D', 'E', 'S', 'I', 'G', 'N', 'E', 'R'].map((char, i) => (
                <span key={`des-${i}`} className="leading-tight select-none opacity-90">{char}</span>
              ))}
            </div>

            {/* Repeated Typography Motif: BHEDA repeated vertically (Echoing Jackie Zhang's repeated stamps) */}
            <div className="flex flex-col items-center gap-2 pt-6 mt-6 border-t border-[#173C64]/15">
              {['BHEDA', 'BHEDA', 'BHEDA', 'BHEDA'].map((txt, i) => (
                <span
                  key={`repeat-${i}`}
                  className="font-display font-extrabold text-[11px] tracking-[0.25em] text-[#173C64]/40 select-none hover:text-[#173C64] transition-colors"
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
              <span className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] xl:text-[6rem] tracking-tight">
                I find the
              </span>

              <div className="flex items-baseline gap-3 sm:gap-6 flex-wrap">
                <span className="font-hand font-normal text-6xl sm:text-8xl md:text-9xl lg:text-[7.2rem] xl:text-[8rem] text-[#173C64] leading-none transform -rotate-2 underline decoration-[#173C64]/30 decoration-wavy decoration-2 sm:decoration-4 select-none">
                  why's
                </span>
                <span className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] xl:text-[6rem] tracking-tight">
                  before the
                </span>
              </div>

              <span className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] xl:text-[6rem] tracking-tight">
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
                  href="#fabric-specimen"
                  className="inline-flex items-center justify-between gap-3 px-5 py-3 rounded-full bg-[#173C64] text-[#FFFED8] font-display font-bold text-xs sm:text-sm tracking-wide shadow-md hover:bg-[#0e2640] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span>Interact with Fabric</span>
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
        {/* COEXISTING INTERACTIVE TYPOGRAPHIC FABRIC (INTEGRATED INTO HERO AREA) */}
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
      {/* 3. SELECTED WORK / FEATURED PROJECTS SECTION                              */}
      {/* (Inspired by Jackie Zhang's high-contrast editorial project cards)        */}
      {/* ========================================================================= */}
      <section className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 sm:mb-12 border-b-2 border-[#173C64]">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-[#173C64]">
              <span className="w-2 h-2 rounded-full bg-[#173C64]"></span>
              <span>ARCHIVE 01 // SELECTED WORK</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#173C64] tracking-tight">
              Projects & Visual Experiments
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 font-mono text-xs text-[#173C64]/70">
              <PixelSparkle size={16} />
              <span>4 PINNED CASE STUDIES</span>
            </div>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 font-display font-bold text-xs sm:text-sm px-4 py-2 rounded-full border border-[#173C64] bg-[#FFFED8] text-[#173C64] hover:bg-[#173C64] hover:text-[#FFFED8] shadow-xs transition-colors"
            >
              <span>View Full Archive</span>
              <span className="font-mono">→</span>
            </Link>
          </div>
        </div>

        {/* Editorial Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {featuredProjects.map((project, idx) => (
            <Link
              key={project.id}
              to={project.link}
              className="group relative block bg-[#FFFED8] bg-notebook-grid p-6 sm:p-8 rounded-xs border-2 border-[#173C64] shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 no-underline"
            >
              {/* Corner Specimen Pin */}
              <div className="absolute top-3 right-4 font-mono text-xs text-[#173C64]/50 group-hover:text-[#173C64] transition-colors">
                #{String(idx + 1).padStart(2, '0')}
              </div>

              {/* Top Meta Tags */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="font-mono text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#173C64] text-[#FFFED8]">
                  {project.category}
                </span>
                <span className="font-mono text-xs px-2.5 py-0.5 rounded-full border border-[#173C64]/40 text-[#173C64]">
                  {project.year}
                </span>
                <span className="font-mono text-xs text-[#173C64]/70 hidden sm:inline">
                  ✦ {project.tag}
                </span>
              </div>

              {/* Project Title */}
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#173C64] tracking-tight group-hover:underline decoration-[#173C64]/40 underline-offset-4 mb-3">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-[#173C64]/85 leading-relaxed mb-6 font-normal">
                {project.description}
              </p>

              {/* Bottom Tags & Arrow */}
              <div className="flex items-center justify-between pt-4 border-t border-[#173C64]/20">
                <div className="flex flex-wrap items-center gap-1.5">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-mono text-[#173C64]/80 bg-[#FFFED8] px-2 py-0.5 rounded border border-[#173C64]/20"
                    >
                      #{t}
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

        {/* Interactive Pixel Folder Callout */}
        <div className="mt-10 p-6 sm:p-8 rounded-xs border-2 border-dashed border-[#173C64] bg-[#FFFED8] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#173C64] font-bold uppercase mb-1">
              <PixelSparkle size={14} />
              <span>DIGITAL SPECIMEN ARCHIVE</span>
            </div>
            <p className="font-serif text-lg sm:text-xl text-[#173C64] font-bold">
              Looking for case study documentation, brand guidelines, and process archives?
            </p>
          </div>

          <PixelFolder to="/work" />
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 4. DESIGN MANIFESTO / 3 CORE BELIEFS                                     */}
      {/* (Inspired by Jackie Zhang's "3 things I strongly believe in")            */}
      {/* ========================================================================= */}
      <section className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 border-t border-[#173C64]/20">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#173C64] mb-2">
            <span className="border border-[#173C64] px-2 py-0.5 rounded-full bg-[#173C64] text-[#FFFED8]">
              MANIFESTO
            </span>
            <span>// DESIGN PHILOSOPHY</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#173C64] tracking-tight">
            3 things I strongly believe in
          </h2>
        </div>

        {/* 3 Numbered Statement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {coreBeliefs.map((belief) => (
            <div
              key={belief.number}
              className="relative bg-[#FFFED8] p-6 sm:p-8 rounded-xs border-2 border-[#173C64] shadow-md flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                {/* Large Numeral */}
                <div className="font-serif text-4xl sm:text-5xl font-bold text-[#173C64]/30 mb-4 font-mono">
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

              {/* Tag */}
              <div className="pt-6 mt-6 border-t border-[#173C64]/15">
                <span className="font-mono text-xs font-semibold tracking-wider text-[#173C64] uppercase bg-[#FFFED8] px-2.5 py-1 rounded-full border border-[#173C64]/30">
                  ✦ {belief.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Toolkit & Disciplines */}
        <div className="mt-12 p-6 rounded-xs border border-[#173C64]/30 bg-[#FFFED8] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#173C64] font-bold">
            <PixelSparkle size={14} />
            <span>DISCIPLINES:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              'Visual Communication',
              'Packaging & Die-Cuts',
              'Custom Typography',
              'Art Direction',
              'Interactive Web & UI',
              'Editorial Print Layout'
            ].map((d) => (
              <span
                key={d}
                className="font-display font-semibold text-xs px-3 py-1 rounded-full border border-[#173C64] bg-[#FFFED8] text-[#173C64] shadow-2xs hover:bg-[#173C64] hover:text-[#FFFED8] transition-colors"
              >
                {d}
              </span>
            ))}
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 5. FOOTER / "LET'S CHAT" CONVERSATION CTA                                */}
      {/* (Inspired by Jackie Zhang's high-contrast bold call-to-action)            */}
      {/* ========================================================================= */}
      <footer className="relative w-full border-t-2 border-[#173C64] bg-[#173C64] text-[#FFFED8] pt-14 sm:pt-20 pb-10 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col justify-between">
          
          {/* Large Invitation Headline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start pb-12 sm:pb-16 border-b border-[#FFFED8]/20">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#FFFED8]/70 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#FFFED8] animate-pulse"></span>
                <span>OPEN FOR SELECT COMMISSIONS & COLLABORATIONS</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FFFED8] leading-tight">
                Have an exciting project or idea?{' '}
                <span className="font-hand text-4xl sm:text-6xl lg:text-7xl font-normal block sm:inline text-[#FFFED8]">
                  Let's make it real.
                </span>
              </h2>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-4 lg:items-end lg:justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#FFFED8] text-[#173C64] font-display font-extrabold text-sm sm:text-base tracking-tight shadow-xl hover:bg-white hover:scale-105 transition-all duration-200"
              >
                <span>Start a Conversation</span>
                <span className="font-mono text-lg">→</span>
              </Link>

              <span className="font-mono text-xs text-[#FFFED8]/60 lg:text-right">
                Response within 24–48 business hours
              </span>
            </div>
          </div>

          {/* Social Links & Copyright */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#FFFED8]/80">
            <div className="flex items-center gap-4">
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
              <span>All rights reserved</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  )
}
