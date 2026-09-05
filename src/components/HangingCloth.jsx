import React from 'react'

const UI_UX_TYPOGRAPHY_BLOCK = [
  'USER EXPERIENCE · VISUAL HIERARCHY · AFFORDANCE · USER RESEARCH · EMPATHY · PROTOTYPE',
  'INFORMATION ARCHITECTURE · DESIGN SYSTEM · COMPONENT LIBRARY · USABILITY TESTING · UI/UX',
  'WIREFRAMING · USER JOURNEY MAP · MENTAL MODEL · COGNITIVE LOAD · DESIGN THINKING · ITERATE',
  'INTERACTION DESIGN · DESIGN TOKENS · MICROINTERACTION · HEURISTICS · FRICTIONLESS · CLARITY',
  'HUMAN CENTERED DESIGN · BEHAVIORAL DESIGN · SYSTEMS THINKING · PRODUCT STRATEGY · GRID',
  'ACCESSIBILITY · WCAG AAA · CONTRAST RATIO · TYPE SCALE · KERNING · RESPONSIVE LAYOUT',
  'USER FLOW · PROBLEM STATEMENT · PERSONA · STORYBOARD · IDEATION · DISCOVERY · VALIDATION',
  'VISUAL LANGUAGE · CREATIVE DIRECTION · MOTION DESIGN · DELIGHT · ENGAGEMENT · SIMPLICITY',
  'DESIGN LANGUAGE · CONSISTENCY · SCALABILITY · FLEXIBILITY · INTUITIVE · INCLUSIVE · ADAPTIVE',
  'QUALITATIVE RESEARCH · QUANTITATIVE DATA · TASK ANALYSIS · USABILITY METRICS · PROTOTYPING',
  'DESIGN SPRINTS · RAPID ITERATION · FEEDBACK LOOPS · PRODUCT THINKING · FEASIBLE · DESIRABLE',
  'USER CENTRIC · INFORMATION DESIGN · SPATIAL SYSTEM · ATOMIC DESIGN · FRICTIONLESS FLOW',
]

export default function HangingCloth() {
  return (
    <div className="relative w-full max-w-5xl mx-auto my-12 px-3 sm:px-6">
      {/* FRAME CONTAINER — 100% PRESERVED APPROVED VISUAL DESIGN */}
      <div className="relative rounded-sm p-4 sm:p-6 bg-[#c28e57] shadow-2xl border-4 sm:border-8 border-[#996531] ring-1 ring-black/20">
        <div className="relative rounded-sm bg-cork p-3 sm:p-6 overflow-hidden shadow-inner border border-[#804e22]">
          
          {/* TOP CARD BAR */}
          <div className="relative bg-[#f4ede1] text-[#281712] px-4 py-3 sm:px-6 sm:py-3.5 rounded-t-xs border-[1.5px] border-b-0 border-[#4b73b5] flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#e15554]"></span>
              <span className="font-pixel text-xs font-bold tracking-wider uppercase text-[#281712]">
                ✦ TYPOGRAPHIC FABRIC // UI/UX SPECIMEN
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-display text-[11px] text-[#281712]/75 font-medium">
                Static Typographic Composition
              </span>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-pixel tracking-wide border border-[#281712]/40 text-[#281712]/70 bg-white/50">
                <span>UI/UX SPECIMEN</span>
              </div>
            </div>
          </div>

          {/* MAIN POSTER PAPER WITH DENSE UI/UX TYPOGRAPHY */}
          <div className="relative bg-[#f4ede1] text-[#281712] rounded-b-xs border-[1.5px] border-[#4b73b5] p-6 sm:p-10 overflow-hidden shadow-xl paper-crease min-h-[360px] sm:min-h-[400px] flex flex-col justify-between">
            
            {/* Top Push Pins */}
            <div className="absolute -top-2.5 left-10 push-pin z-20"></div>
            <div className="absolute -top-2.5 right-10 push-pin z-20"></div>

            {/* DENSE UI/UX TYPOGRAPHIC FIELD (STATIC, BULLETPROOF, NEVER DISAPPEARS) */}
            <div className="w-full flex-grow flex flex-col justify-center select-none py-2">
              <div className="space-y-2 sm:space-y-2.5 font-mono text-[10px] sm:text-[11.5px] md:text-[12.5px] text-[#18181b] tracking-tight leading-relaxed text-center font-medium overflow-hidden">
                {UI_UX_TYPOGRAPHY_BLOCK.map((line, idx) => (
                  <div
                    key={idx}
                    className="whitespace-nowrap overflow-hidden text-ellipsis opacity-90 hover:opacity-100 transition-opacity"
                    style={{ fontFamily: '"JetBrains Mono", "Fira Code", monospace' }}
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Status Row */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-4 px-1 text-[11px] font-pixel text-[#281712]/60 border-t border-[#281712]/15">
              <span>SPECIMEN: DENSE UI/UX & PRODUCT DESIGN VOCABULARY</span>
              <span>RESTING STATE: 100% STABLE // STATIC RESTORED</span>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
