import React from 'react'
import Nav from '../components/Nav'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="min-h-screen bg-[#061840] text-[#F1E3CC] font-sans selection:bg-[#E4BA83] selection:text-[#061840] flex flex-col justify-between overflow-x-hidden">
      
      {/* Editorial Navigation */}
      <Nav />

      {/* Main Content */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-12 lg:px-20 py-8 sm:py-16 flex-grow">
        
        {/* Editorial Paper Document Container */}
        <div className="relative bg-[#0B3272]/25 text-[#F1E3CC] p-8 sm:p-14 lg:p-20 rounded-lg shadow-sm border border-[#0B3272]">
          
          {/* Header Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-10 border-b border-[#0B3272]">
            <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-[#8DA1B4]">
              <span className="w-2 h-2 rounded-full bg-[#E4BA83]"></span>
              <span>PERSPECTIVE // ABOUT RUCHI BHEDA</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#8DA1B4]/70">
              <span className="text-[#E4BA83]">✦</span>
              <span>MUMBAI, INDIA • GMT +5:30</span>
            </div>
          </div>

          {/* Title & Core Philosophy Statement */}
          <div className="mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-[#E4BA83] block mb-3 font-semibold">
              ✦ UI/UX DESIGNER & BUILDER
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#F1E3CC] leading-tight mb-6">
              I design the way I've lived;{' '}
              <span className="text-[#E4BA83] underline decoration-[#E4BA83]/60 decoration-wavy decoration-2">
                not in a straight line.
              </span>
            </h1>
            <p className="font-sans text-lg sm:text-xl text-[#8DA1B4] font-normal leading-relaxed">
              HI, I'm Ruchi. A UI/UX designer who believes the best design work doesn't announce itself, it just makes the way forward clearer.
            </p>
          </div>

          {/* Main Story & Approach */}
          <div className="space-y-6 text-base sm:text-lg text-[#8DA1B4] font-normal leading-relaxed border-t border-[#0B3272] pt-8">
            <p>
              My path here hasn't been linear; I've tried different roles, tools, and approaches, and kept what worked.
            </p>
            <p>
              What hasn't changed is a commitment to designing with empathy first, clarity always, and care for the people who'll actually use what I make. Still learning, still building, still moving forward.
            </p>
          </div>

          {/* Core Operating Principles (Jackie Zhang Blueprint style) */}
          <div className="mt-14 pt-10 border-t border-[#0B3272]">
            <div className="font-mono text-xs uppercase tracking-widest text-[#E4BA83] font-semibold mb-8">
              ✦ CORE PRINCIPLES & ATTRIBUTES
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm sm:text-base">
              <div className="p-6 rounded-md border border-[#0B3272] bg-[#061840] space-y-2.5">
                <div className="font-serif text-lg font-normal text-[#F1E3CC] flex items-center gap-2">
                  <span className="font-mono text-xs text-[#E4BA83] font-semibold">01.</span> Human-Centered & Empathetic
                </div>
                <p className="text-xs sm:text-sm text-[#8DA1B4] font-normal leading-relaxed">
                  Deeply observant of human habits, cognitive load, and unspoken needs before sketching a single screen.
                </p>
              </div>

              <div className="p-6 rounded-md border border-[#0B3272] bg-[#061840] space-y-2.5">
                <div className="font-serif text-lg font-normal text-[#F1E3CC] flex items-center gap-2">
                  <span className="font-mono text-xs text-[#E4BA83] font-semibold">02.</span> Business-Minded & Strategic
                </div>
                <p className="text-xs sm:text-sm text-[#8DA1B4] font-normal leading-relaxed">
                  Aligning UX elegance with commercial feasibility, conversion, retention, and long-term product-market fit.
                </p>
              </div>

              <div className="p-6 rounded-md border border-[#0B3272] bg-[#061840] space-y-2.5">
                <div className="font-serif text-lg font-normal text-[#F1E3CC] flex items-center gap-2">
                  <span className="font-mono text-xs text-[#E4BA83] font-semibold">03.</span> Experimental & Constantly Learning
                </div>
                <p className="text-xs sm:text-sm text-[#8DA1B4] font-normal leading-relaxed">
                  Exploring tactile physics, generative spatial tools, audio interactions, and emerging digital frontiers.
                </p>
              </div>

              <div className="p-6 rounded-md border border-[#0B3272] bg-[#061840] space-y-2.5">
                <div className="font-serif text-lg font-normal text-[#F1E3CC] flex items-center gap-2">
                  <span className="font-mono text-xs text-[#E4BA83] font-semibold">04.</span> Systems Thinking & Clarity
                </div>
                <p className="text-xs sm:text-sm text-[#8DA1B4] font-normal leading-relaxed">
                  Building scalable design tokens, component architecture, and structured information models.
                </p>
              </div>
            </div>
          </div>

          {/* Selected Toolkit */}
          <div className="mt-12 pt-8 border-t border-[#0B3272]">
            <div className="font-mono text-xs uppercase tracking-widest text-[#8DA1B4] mb-4">
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
                  className="px-3.5 py-1.5 bg-[#0B3272]/40 rounded-full border border-[#0B3272] text-[#8DA1B4] hover:border-[#E4BA83]/50 hover:text-[#F1E3CC] transition-colors"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Navigation Jump */}
          <div className="mt-14 pt-8 border-t border-[#0B3272] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <Link
              to="/work"
              className="inline-flex items-center gap-2 font-medium text-[#8DA1B4] hover:text-[#E4BA83] transition-colors"
            >
              ← Explore Case Studies
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0B3272] text-[#F1E3CC] font-medium border border-[#0B3272] hover:bg-[#E4BA83] hover:text-[#061840] hover:border-[#E4BA83] transition-colors"
            >
              <span>Get in Touch / Let's Connect</span>
              <span>→</span>
            </Link>
          </div>

        </div>

      </main>

      {/* Page Footer */}
      <footer className="w-full border-t border-[#0B3272] py-8 px-6 sm:px-12 lg:px-20 text-xs font-mono text-[#8DA1B4] bg-[#061840]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[#F1E3CC]">✦ Ruchi Bheda © 2026</span>
          <span>UI/UX Designer & Design Entrepreneur</span>
          <span>Mumbai, India • GMT +5:30</span>
        </div>
      </footer>

    </div>
  )
}
