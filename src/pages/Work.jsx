import React, { useState } from 'react'
import Nav from '../components/Nav'
import PixelSparkle from '../components/PixelSparkle'
import { Link } from 'react-router-dom'

const allProjects = [
  {
    id: 'ease',
    number: '01',
    title: 'Ease',
    subtitle: 'Unified Healthcare Management Ecosystem',
    category: 'Product Design / HealthTech',
    year: '2025',
    overview: 'A patient-first healthcare suite bridging hospital clinical workflows, automated doctor triaging, and compassionate appointment journeys.',
    role: 'Lead Product Designer',
    disciplines: ['UX Strategy', 'Information Architecture', 'Design Systems', 'Clinical Workflows'],
    impact: 'Reduced clinical intake friction by 40% while empowering patients with transparent diagnostic milestones.',
    tags: ['Healthcare', 'Design Systems', 'Enterprise UX', 'Web App']
  },
  {
    id: 'melt',
    number: '02',
    title: 'Melt',
    subtitle: 'Social Music Streaming & Shared Listening',
    category: 'UI/UX / Social Audio',
    year: '2025',
    overview: 'A mobile audio platform designed around organic human connection—shared real-time listening rooms, collaborative vinyl queues, and tactile haptic controls.',
    role: 'End-to-End Product Designer',
    disciplines: ['Mobile App Design', 'Haptic Interactions', 'Audio UI', 'Community Features'],
    impact: 'Transformed isolated listening into collaborative shared sessions with intuitive swipe-to-tune gestures.',
    tags: ['Mobile App', 'Audio Interaction', 'Community', 'Haptics']
  },
  {
    id: 'shree-shrushti',
    number: '03',
    title: 'Shree Shrushti Farms',
    subtitle: 'Wayfinding & Signage Navigation System',
    category: 'Spatial & Digital Wayfinding',
    year: '2024',
    overview: 'An integrated spatial-digital navigation system connecting physical architectural trail markers with a lightweight GPS-guided mobile guide for agro-tourism visitors.',
    role: 'Environmental & Digital Designer',
    disciplines: ['Signage Typography', 'Spatial Wayfinding', 'Lightweight Web UI', 'Accessibility'],
    impact: 'Guided over 10,000 seasonal farm visitors across 40 acres with seamless physical-digital continuity.',
    tags: ['Wayfinding', 'Physical-Digital', 'Signage System', 'Map UI']
  },
  {
    id: 'code-crafters',
    number: '04',
    title: 'Code Crafters',
    subtitle: 'Cybersecurity Operations Center Dashboard',
    category: 'Enterprise Dashboard / SOC',
    year: '2024',
    overview: 'A high-density security operations center monitoring dashboard for real-time threat intelligence, automated incident triage, and vulnerability relationship graphs.',
    role: 'Senior UI/UX Designer',
    disciplines: ['Complex Data Visualization', 'SOC Workflows', 'Dark Mode Systems', 'Incident Response'],
    impact: 'Enabled security analysts to triage critical multi-vector incidents 3x faster through clustered visual graphs.',
    tags: ['Data Viz', 'SOC Dashboard', 'Enterprise UX', 'Cybersecurity']
  },
  {
    id: 'boredom',
    number: '05',
    title: 'Boredom',
    subtitle: 'Anti-Doomscrolling Behavioral Experience',
    category: 'Behavioral Design / Wellbeing',
    year: '2024',
    overview: 'A mindful digital companion designed to break compulsive phone pickups and doomscrolling loops through intentional friction, breathing pauses, and analog prompt cards.',
    role: 'Concept, Research & UX Design',
    disciplines: ['Behavioral Psychology', 'Friction Architecture', 'Mindful Interactions', 'iOS Design'],
    impact: 'Helped pilot users recover an average of 45 minutes of daily focused attention by interrupting unconscious loops.',
    tags: ['Behavioral UX', 'Digital Wellbeing', 'Friction Design', 'Mobile']
  },
  {
    id: 'pinterest-ai',
    number: '06',
    title: 'Pinterest AI Home Décor',
    subtitle: 'Algorithmic Spatial Curation & Ambient Commerce',
    category: 'Concept & AI Interaction',
    year: '2024',
    overview: 'An exploratory concept bridging Pinterest moodboards with generative spatial models, allowing users to stage their actual living rooms through aesthetic taste graphs.',
    role: 'Product Concept & AI UX',
    disciplines: ['Generative AI Curation', 'Spatial UX', 'E-commerce Flows', 'Visual Search'],
    impact: 'Mapped taste graph affinity scores to physical furniture vendors with frictionless AR preview cards.',
    tags: ['AI Interaction', 'Spatial Curation', 'Concept', 'E-Commerce']
  }
]

export default function Work() {
  const [selectedFilter, setSelectedFilter] = useState('ALL')

  const filterOptions = ['ALL', 'PRODUCT DESIGN', 'UI/UX', 'SPATIAL & WAYFINDING', 'SYSTEMS']

  const filteredProjects = selectedFilter === 'ALL'
    ? allProjects
    : allProjects.filter(p => {
        if (selectedFilter === 'PRODUCT DESIGN') return p.category.includes('Product')
        if (selectedFilter === 'UI/UX') return p.category.includes('UI/UX')
        if (selectedFilter === 'SPATIAL & WAYFINDING') return p.category.includes('Spatial')
        if (selectedFilter === 'SYSTEMS') return p.tags.includes('Design Systems') || p.tags.includes('Complex UX')
        return true
      })

  return (
    <div className="min-h-screen bg-[#FFFED8] bg-notebook-grid text-[#173C64] font-body selection:bg-[#173C64] selection:text-[#FFFED8] flex flex-col justify-between overflow-x-hidden">
      
      {/* Top Editorial Navigation */}
      <Nav />

      {/* Main Studio Archive Header */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pt-6 sm:pt-10 pb-16 sm:pb-24 flex-grow">
        
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 mb-10 border-b-2 border-[#173C64]">
          <div>
            <div className="flex items-center gap-2 mb-3 font-mono text-xs uppercase tracking-widest text-[#173C64]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#173C64]"></span>
              <span>INDEX // SELECTED CASE STUDIES</span>
              <span className="opacity-40">•</span>
              <span>2024–2025</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#173C64]">
              Work & Product Systems
            </h1>
          </div>

          <div className="flex flex-col md:items-end gap-2 text-xs font-mono text-[#173C64]/80">
            <span className="font-bold uppercase tracking-wider bg-[#FFFED8] px-3 py-1 border border-[#173C64] rounded-full shadow-2xs">
              ✦ {allProjects.length} Case Studies Documented
            </span>
            <span className="text-[11px] text-[#173C64]/60">
              Healthcare · Social Audio · Spatial Wayfinding · Cyber Sec · Behavioral UX
            </span>
          </div>
        </div>

        {/* Filter Bar (Jackie Zhang Blueprint style) */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-[#173C64]/20 font-mono text-xs">
          <span className="text-[#173C64]/60 mr-2 flex items-center gap-1">
            <PixelSparkle size={12} />
            <span>FILTER:</span>
          </span>
          {filterOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setSelectedFilter(opt)}
              className={`px-3.5 py-1 rounded-full border transition-all cursor-pointer ${
                selectedFilter === opt
                  ? 'bg-[#173C64] text-[#FFFED8] border-[#173C64] font-bold shadow-xs'
                  : 'bg-[#FFFED8] text-[#173C64] border-[#173C64]/30 hover:border-[#173C64]'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Tactile Cutting Mat Workbench Archive */}
        <div className="relative rounded-xs border-2 sm:border-4 border-[#173C64] cutting-mat-grid p-4 sm:p-8 lg:p-12 shadow-2xl text-[#FFFED8] overflow-hidden mb-12">
          
          {/* Cutting Mat Measurement Numbers */}
          <div className="absolute top-2 left-4 flex gap-8 text-[10px] font-mono text-[#FFFED8]/40 select-none hidden sm:flex">
            <span>01</span>
            <span>02</span>
            <span>03</span>
            <span>04</span>
            <span>05</span>
            <span>06</span>
            <span>07</span>
            <span>08</span>
          </div>

          <div className="absolute bottom-2 right-4 text-[10px] font-mono text-[#FFFED8]/40 select-none hidden sm:block">
            TACTILE PROJECT MAT // RUCHI BHEDA
          </div>

          {/* Project Cards Stack */}
          <div className="space-y-8 relative z-10">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                className="group relative bg-[#FFFED8] bg-notebook-grid text-[#173C64] p-6 sm:p-10 rounded-xs border-2 border-[#173C64] shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
              >
                {/* Header Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-[#173C64]/20">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#173C64] text-[#FFFED8]">
                      {proj.number}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wider text-[#173C64] font-semibold">
                      {proj.category}
                    </span>
                    <span className="opacity-40 font-mono text-xs">•</span>
                    <span className="font-mono text-xs text-[#173C64]/70">
                      {proj.year}
                    </span>
                  </div>

                  <div className="font-mono text-xs text-[#173C64]/70">
                    Role: <strong className="text-[#173C64]">{proj.role}</strong>
                  </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                  
                  {/* Left Column: Title & Overview */}
                  <div className="lg:col-span-8">
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#173C64] mb-2">
                      {proj.title}
                    </h2>
                    <div className="font-display font-semibold text-xs sm:text-sm text-[#173C64]/70 uppercase tracking-wider mb-4">
                      {proj.subtitle}
                    </div>
                    <p className="text-sm sm:text-base text-[#173C64]/90 leading-relaxed font-normal mb-4">
                      {proj.overview}
                    </p>
                    <div className="p-3.5 bg-[#173C64]/5 rounded-xs border border-[#173C64]/20 text-xs sm:text-sm font-mono text-[#173C64]">
                      <strong>Impact:</strong> {proj.impact}
                    </div>
                  </div>

                  {/* Right Column: Disciplines & Action */}
                  <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-4 pt-2">
                    <div>
                      <div className="font-mono text-xs uppercase tracking-wider text-[#173C64]/70 mb-2 font-bold">
                        Disciplines & Systems:
                      </div>
                      <ul className="space-y-1.5 text-xs font-medium text-[#173C64]/80">
                        {proj.disciplines.map((d) => (
                          <li key={d} className="flex items-center gap-2">
                            <span className="text-[#173C64]">✦</span> {d}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-[#173C64]/15 flex flex-wrap gap-1.5">
                      {proj.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-mono text-[#173C64]/80 bg-[#FFFED8] px-2 py-0.5 rounded border border-[#173C64]/20"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>

        </div>

        {/* Back to Home & Connect Jump */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#173C64]/20 font-mono text-xs">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-bold text-[#173C64] hover:underline"
          >
            ← Back to Homepage
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#173C64] text-[#FFFED8] font-bold shadow-xs hover:bg-[#0e2640] transition-colors"
          >
            <span>Have a project in mind? Let's chat</span>
            <span>→</span>
          </Link>
        </div>

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#173C64]/20 py-6 px-4 sm:px-8 text-center text-xs font-mono text-[#173C64]/70 bg-[#FFFED8]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>✦ Ruchi Bheda © 2026</span>
          <span>UI/UX Designer & Product Designer</span>
          <span>Mumbai, India • GMT +5:30</span>
        </div>
      </footer>

    </div>
  )
}
