import React from 'react'
import Nav from '../components/Nav'
import PixelSparkle from '../components/PixelSparkle'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="min-h-screen bg-[#FFFED8] bg-notebook-grid text-[#173C64] font-body selection:bg-[#173C64] selection:text-[#FFFED8] flex flex-col justify-between overflow-x-hidden">
      
      {/* Editorial Navigation */}
      <Nav />

      {/* Main Content */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-16 flex-grow">
        
        {/* Editorial Paper Document Container */}
        <div className="relative bg-[#FFFED8] bg-notebook-grid text-[#173C64] p-6 sm:p-12 lg:p-16 rounded-xs shadow-2xl border-2 sm:border-4 border-[#173C64]">
          
          {/* Header Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-8 border-b-2 border-[#173C64]">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#173C64]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#173C64]"></span>
              <span>PERSPECTIVE // ABOUT RUCHI BHEDA</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#173C64]/70">
              <PixelSparkle size={14} />
              <span>MUMBAI, INDIA • GMT +5:30</span>
            </div>
          </div>

          {/* Title & Core Philosophy Statement */}
          <div className="mb-10">
            <span className="font-mono text-xs uppercase tracking-widest text-[#173C64]/70 block mb-2">
              ✦ DESIGN ENTREPRENEUR & PRODUCT DESIGNER
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#173C64] leading-tight mb-4">
              I find the <span className="font-hand text-5xl sm:text-7xl lg:text-8xl underline decoration-[#173C64]/40 decoration-wavy decoration-2">why’s</span> before the what’s.
            </h1>
            <p className="font-display font-semibold text-base sm:text-xl text-[#173C64]/80 uppercase tracking-wide">
              Designing at the intersection of human empathy, business systems, and tactile digital craft.
            </p>
          </div>

          {/* Main Story & Approach */}
          <div className="space-y-6 text-base sm:text-lg md:text-xl text-[#173C64]/90 font-normal leading-relaxed border-t border-[#173C64]/20 pt-8">
            <p>
              I am not trying to be limited to just UI/UX. I want to grow into a <strong className="font-display font-bold text-[#173C64]">design entrepreneur</strong> who understands products, businesses, brands, people, and technology as interconnected parts of a living whole.
            </p>
            <p>
              Too often in technology, teams jump straight into the <em>what</em>—the wireframes, the design systems, the feature checklists—before thoroughly interrogating the <em>why</em>. My work starts with relentless curiosity: uncovering the underlying human motivations, emotional frictions, and mental models that determine whether a product actually sticks.
            </p>
            <p>
              Whether structuring complex clinical workflows in healthcare management, designing shared spatial music listening experiences, or creating physical wayfinding that guides thousands of visitors through real space, I bring a builder's curiosity and a founder's accountability to every project.
            </p>
          </div>

          {/* Core Operating Principles (Jackie Zhang Blueprint style) */}
          <div className="mt-12 pt-8 border-t-2 border-[#173C64]">
            <div className="font-mono text-xs uppercase tracking-widest text-[#173C64] font-bold mb-6">
              ✦ CORE PRINCIPLES & ATTRIBUTES
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base">
              <div className="p-5 rounded-xs border border-[#173C64]/30 bg-[#FFFED8] space-y-2">
                <div className="font-display font-bold text-[#173C64] flex items-center gap-2">
                  <span>01.</span> Human-Centered & Empathetic
                </div>
                <p className="text-xs sm:text-sm text-[#173C64]/80 font-normal leading-relaxed">
                  Deeply observant of human habits, cognitive load, and unspoken needs before sketching a single screen.
                </p>
              </div>

              <div className="p-5 rounded-xs border border-[#173C64]/30 bg-[#FFFED8] space-y-2">
                <div className="font-display font-bold text-[#173C64] flex items-center gap-2">
                  <span>02.</span> Business-Minded & Strategic
                </div>
                <p className="text-xs sm:text-sm text-[#173C64]/80 font-normal leading-relaxed">
                  Aligning UX elegance with commercial feasibility, conversion, retention, and long-term product-market fit.
                </p>
              </div>

              <div className="p-5 rounded-xs border border-[#173C64]/30 bg-[#FFFED8] space-y-2">
                <div className="font-display font-bold text-[#173C64] flex items-center gap-2">
                  <span>03.</span> Experimental & Constantly Learning
                </div>
                <p className="text-xs sm:text-sm text-[#173C64]/80 font-normal leading-relaxed">
                  Exploring tactile physics, generative spatial tools, audio interactions, and emerging digital frontiers.
                </p>
              </div>

              <div className="p-5 rounded-xs border border-[#173C64]/30 bg-[#FFFED8] space-y-2">
                <div className="font-display font-bold text-[#173C64] flex items-center gap-2">
                  <span>04.</span> Systems Thinking & Clarity
                </div>
                <p className="text-xs sm:text-sm text-[#173C64]/80 font-normal leading-relaxed">
                  Building scalable design tokens, component architecture, and structured information models.
                </p>
              </div>
            </div>
          </div>

          {/* Selected Toolkit */}
          <div className="mt-10 pt-6 border-t border-[#173C64]/20">
            <div className="font-mono text-xs uppercase tracking-widest text-[#173C64]/70 mb-3">
              ✦ TOOLKIT & COMPETENCIES
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {[
                'Product Strategy',
                'User Research & Interviews',
                'Information Architecture',
                'Figma & Design Systems',
                'Rapid Prototyping',
                'Behavioral UX',
                'Wayfinding & Spatial Design',
                'HTML/CSS & React Fundamentals'
              ].map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1 bg-[#FFFED8] rounded-full border border-[#173C64]/30 text-[#173C64]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Navigation Jump */}
          <div className="mt-12 pt-6 border-t-2 border-[#173C64] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <Link
              to="/work"
              className="inline-flex items-center gap-2 font-bold text-[#173C64] hover:underline"
            >
              ← Explore Case Studies
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#173C64] text-[#FFFED8] font-bold shadow-xs hover:bg-[#0e2640] transition-colors"
            >
              <span>Get in Touch / Let's Connect</span>
              <span>→</span>
            </Link>
          </div>

        </div>

      </main>

      {/* Page Footer */}
      <footer className="w-full border-t border-[#173C64]/20 py-6 px-4 sm:px-8 text-center text-xs font-mono text-[#173C64]/70 bg-[#FFFED8]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>✦ Ruchi Bheda © 2026</span>
          <span>UI/UX Designer & Design Entrepreneur</span>
          <span>Mumbai, India • GMT +5:30</span>
        </div>
      </footer>

    </div>
  )
}
