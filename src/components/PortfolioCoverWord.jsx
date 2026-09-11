import React from 'react'

/**
 * PortfolioCoverWord
 * 
 * Faithfully recreates the hybrid cursive calligraphy + 8-bit chunky pixel typography
 * inspired by Reference 1:
 * - Grandiose, sweeping flourished script for 'P', 'f', 'l'
 * - Chunky 8-bit pixel monospace blocks for 'o', 'r', 't', 'o', 'i', 'o'
 * - Floating pixel stars / sparkles in Path Gold (#E4BA83) and Warm Ivory (#F1E3CC)
 */
export default function PortfolioCoverWord({ className = '' }) {
  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      
      {/* Top Subtle Stamp / Metadata */}
      <div className="w-full flex items-center justify-between px-2 sm:px-6 mb-3 sm:mb-6 font-mono text-[10px] sm:text-xs text-[#8DA1B4]/80 tracking-widest uppercase">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-[#E4BA83] rounded-xs inline-block"></span>
          <span>RUCHI BHEDA</span>
        </span>
        <span className="border border-[#F1E3CC]/20 rounded-full px-2.5 py-0.5 text-[9px] sm:text-[10px] text-[#F1E3CC]/90">
          2026 // ARCHIVE
        </span>
        <span>MUMBAI, IN</span>
      </div>

      {/* Main Hybrid Wordmark: "Portfolio" */}
      <div className="relative w-full max-w-[620px] px-2 py-4 flex items-center justify-center">
        
        {/* Floating Pixel Stars / Sparkles (Reference 1 Style) */}
        {/* Top-left 4-point pixel star */}
        <div className="absolute top-0 left-6 sm:left-12 pointer-events-none opacity-80 animate-pulse">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="#E4BA83">
            <rect x="9" y="0" width="4" height="22" />
            <rect x="0" y="9" width="22" height="4" />
            <rect x="7" y="7" width="8" height="8" fill="#F1E3CC" />
          </svg>
        </div>

        {/* Top-right floating pixel sparkle */}
        <div className="absolute top-2 right-8 sm:right-16 pointer-events-none opacity-70">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="#F1E3CC">
            <rect x="7" y="0" width="4" height="18" />
            <rect x="0" y="7" width="18" height="4" />
          </svg>
        </div>

        {/* Bottom-left small pixel sparkle */}
        <div className="absolute bottom-1 left-16 sm:left-24 pointer-events-none opacity-60">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="#E4BA83">
            <rect x="5" y="0" width="4" height="14" />
            <rect x="0" y="5" width="14" height="4" />
          </svg>
        </div>

        {/* Bottom-right pixel sparkle */}
        <div className="absolute bottom-2 right-12 sm:right-20 pointer-events-none opacity-75">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="#F1E3CC">
            <rect x="6" y="0" width="4" height="16" />
            <rect x="0" y="6" width="16" height="4" />
            <rect x="5" y="5" width="6" height="6" fill="#E4BA83" />
          </svg>
        </div>

        {/* Scalable Vector Artwork for the Hybrid Word "Portfolio" */}
        <svg
          viewBox="0 0 740 240"
          className="w-full h-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
          fill="none"
        >
          {/* ================================================================= */}
          {/* LETTER 'P': Grandiose sweeping calligraphic script flourish       */}
          {/* ================================================================= */}
          {/* Flourish entry curve */}
          <path
            d="M 50 145 C 30 130, 20 90, 48 55 C 75 22, 130 18, 160 48 C 185 75, 175 118, 140 135 C 105 152, 60 140, 52 110 C 46 88, 62 65, 92 60 C 112 56, 128 66, 126 80 C 124 95, 105 106, 92 102"
            stroke="#F1E3CC"
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Main Stem of 'P' */}
          <path
            d="M 120 48 C 115 80, 95 150, 80 205 C 76 220, 68 228, 58 222 C 50 216, 54 200, 65 190"
            stroke="#F1E3CC"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          {/* Shaded calligraphic bulb on 'P' stem */}
          <path
            d="M 112 70 C 118 60, 150 62, 156 82 C 160 102, 135 116, 104 118"
            stroke="#F1E3CC"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          {/* ================================================================= */}
          {/* LETTERS 'o', 'r', 't': 8-Bit Chunky Pixel Glyphs                  */}
          {/* ================================================================= */}
          {/* Letter 'o' (Pixel) around x=175, y=100-160 */}
          <g fill="#F1E3CC">
            {/* Top row */}
            <rect x="186" y="112" width="28" height="8" />
            {/* Left col */}
            <rect x="178" y="120" width="8" height="24" />
            {/* Right col */}
            <rect x="214" y="120" width="8" height="24" />
            {/* Bottom row */}
            <rect x="186" y="144" width="28" height="8" />
          </g>

          {/* Letter 'r' (Pixel) around x=232, y=112-152 */}
          <g fill="#F1E3CC">
            {/* Vertical stem */}
            <rect x="236" y="112" width="8" height="40" />
            {/* Shoulder arch */}
            <rect x="244" y="112" width="16" height="8" />
            <rect x="260" y="120" width="8" height="8" />
          </g>

          {/* Letter 't' (Pixel) around x=278, y=96-152 */}
          <g fill="#F1E3CC">
            {/* Crossbar */}
            <rect x="274" y="112" width="28" height="8" />
            {/* Stem */}
            <rect x="284" y="96" width="8" height="48" />
            {/* Bottom foot */}
            <rect x="292" y="144" width="10" height="8" />
          </g>

          {/* ================================================================= */}
          {/* LETTER 'f': Elegant Sweeping Calligraphic Script Ascender & Desc  */}
          {/* ================================================================= */}
          <path
            d="M 312 188 C 304 212, 296 230, 288 226 C 280 220, 286 195, 302 165 L 340 70 C 352 40, 368 24, 382 32 C 392 40, 384 62, 362 96 L 332 165 C 318 198, 304 228, 294 235 C 286 240, 280 234, 282 222"
            stroke="#F1E3CC"
            strokeWidth="3.6"
            strokeLinecap="round"
            fill="none"
          />
          {/* Crossbar loop of 'f' */}
          <path
            d="M 314 116 C 330 112, 350 114, 356 120"
            stroke="#E4BA83"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          {/* ================================================================= */}
          {/* LETTER 'o': 8-Bit Chunky Pixel Glyph                              */}
          {/* ================================================================= */}
          <g fill="#F1E3CC">
            <rect x="372" y="112" width="28" height="8" />
            <rect x="364" y="120" width="8" height="24" />
            <rect x="400" y="120" width="8" height="24" />
            <rect x="372" y="144" width="28" height="8" />
          </g>

          {/* ================================================================= */}
          {/* LETTER 'l': Sweeping Calligraphic Ascender Loop                   */}
          {/* ================================================================= */}
          <path
            d="M 416 152 C 420 120, 440 50, 452 35 C 462 24, 470 30, 464 48 C 452 82, 434 135, 430 152 C 428 160, 434 156, 442 148"
            stroke="#F1E3CC"
            strokeWidth="3.4"
            strokeLinecap="round"
            fill="none"
          />

          {/* ================================================================= */}
          {/* LETTER 'i': 8-Bit Chunky Pixel Glyph + Pixel Dot                  */}
          {/* ================================================================= */}
          <g fill="#F1E3CC">
            {/* Square dot */}
            <rect x="456" y="96" width="8" height="8" fill="#E4BA83" />
            {/* Stem */}
            <rect x="456" y="112" width="8" height="40" />
          </g>

          {/* ================================================================= */}
          {/* LETTER 'o': 8-Bit Chunky Pixel Glyph                              */}
          {/* ================================================================= */}
          <g fill="#F1E3CC">
            <rect x="484" y="112" width="28" height="8" />
            <rect x="476" y="120" width="8" height="24" />
            <rect x="512" y="120" width="8" height="24" />
            <rect x="484" y="144" width="28" height="8" />
          </g>

          {/* Delicate flourished underline swoosh extending from 'l' */}
          <path
            d="M 440 152 C 470 175, 520 178, 560 165 C 575 160, 585 168, 580 174 C 570 185, 510 190, 450 172"
            stroke="#E4BA83"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.8"
            fill="none"
          />
        </svg>

      </div>

      {/* Bottom Capsule Label (Reference 1 Style) */}
      <div className="mt-2 sm:mt-4">
        <div className="px-4 py-1 rounded-full border border-[#F1E3CC]/30 bg-[#061840]/40 text-[#F1E3CC] font-mono text-[11px] sm:text-xs tracking-wider flex items-center gap-2 shadow-inner">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E4BA83] animate-pulse"></span>
          <span>Product Design & Interaction Systems</span>
        </div>
      </div>

    </div>
  )
}
