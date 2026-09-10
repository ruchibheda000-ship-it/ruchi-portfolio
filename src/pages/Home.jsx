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
      {/* 1. HERO SECTION — OVERSIZED EDITORIAL TYPE & DESIGNER INTRODUCTION       */}
      {/* (Inspired by Jackie Zhang's bold headline hierarchy & playful stickers)   */}
      {/* ========================================================================= */}
      <section className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-12 sm:pb-20">
        
        {/* Top Kicker / Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8 pb-3 border-b border-[#173C64]/20">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[#173C64] font-bold bg-[#FFFED8] px-2.5 py-0.5 border border-[#173C64] rounded-full shadow-2xs">
              PORTFOLIO EDITION 2026
            </span>
            <span className="text-xs font-mono text-[#173C64]/70 hidden sm:inline">
              // VISUAL COMMUNICATION & DIGITAL EXPERIMENTS
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#173C64]/80">
            <PixelSparkle size={14} />
            <span>MUMBAI, INDIA</span>
            <span className="opacity-40">•</span>
            <span>GMT +5:30</span>
          </div>
        </div>

        {/* OVERSIZED EDITORIAL HEADLINE */}
        <div className="relative z-10 max-w-5xl">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-[#173C64] leading-[1.08] mb-6 sm:mb-8">
            Visual communication{' '}
            <span className="block sm:inline font-normal italic font-serif opacity-95">
              that feels
            </span>{' '}
            <span className="relative inline-block font-hand font-normal text-[#173C64] text-5xl sm:text-7xl md:text-8xl lg:text-[6.2rem] transform -rotate-1 px-1 underline decoration-[#173C64]/40 decoration-wavy decoration-2">
              tactile
            </span>{' '}
            <span className="font-serif font-bold tracking-tight">
              & unforgettable.
            </span>
          </h1>

          {/* Designer Introduction Copy */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-10 items-start pt-2">
            <p className="md:col-span-8 text-base sm:text-xl text-[#173C64]/90 font-normal leading-relaxed">
              Hey there, I’m <strong className="font-bold font-display text-[#173C64]">Ruchi Bheda</strong> — a multidisciplinary visual designer bridging the tactile warmth of print craft, expressive typography, and packaging die-cuts with experimental digital interactions.
            </p>

            <div className="md:col-span-4 flex flex-col gap-3">
              <a
                href="#fabric-specimen"
                className="inline-flex items-center justify-between gap-3 px-5 py-3 rounded-full bg-[#173C64] text-[#FFFED8] font-display font-bold text-xs sm:text-sm tracking-wide shadow-md hover:bg-[#0e2640] hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>Interact with Typographic Fabric</span>
                <span className="text-base font-mono">↓</span>
              </a>

              <Link
                to="/about"
                className="inline-flex items-center justify-between gap-3 px-5 py-2.5 rounded-full bg-[#FFFED8] text-[#173C64] font-display font-semibold text-xs sm:text-sm border border-[#173C64] shadow-2xs hover:bg-[#173C64]/5 hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>Read Bio & Manifesto</span>
                <span className="text-base font-mono">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* PLAYFUL FLOATING STICKERS / TAGS (Jackie Zhang signature interaction) */}
        <div className="mt-8 sm:mt-12 pt-6 border-t border-[#173C64]/15 flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="text-xs font-mono uppercase text-[#173C64]/70 mr-2 flex items-center gap-1.5">
            <PixelSparkle size={12} />
            <span>CORE FOCUS:</span>
          </span>
          {heroStickers.map((sticker, idx) => (
            <div
              key={idx}
              className={`inline-block text-xs font-display font-bold px-3.5 py-1.5 rounded-full border-1.5 border-[#173C64] ${sticker.bg} ${sticker.text} ${sticker.rotate} shadow-xs hover:scale-105 hover:rotate-0 transition-transform duration-200 cursor-default select-none`}
            >
              {sticker.label}
            </div>
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 2. CENTERPIECE INTERACTIVE SPECIMEN: TYPOGRAPHIC FABRIC                  */}
      {/* 🚨 MANDATORY: Kept 100% intact with physical canvas and audio engine 🚨   */}
      {/* ========================================================================= */}
      <section
        id="fabric-specimen"
        className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 my-4 sm:my-10"
      >
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
