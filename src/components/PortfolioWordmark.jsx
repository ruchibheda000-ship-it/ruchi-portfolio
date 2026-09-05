import React from 'react'

export default function PortfolioWordmark({ className = "" }) {
  return (
    <div
      className={`relative inline-flex items-baseline justify-center select-none text-[#281712] ${className}`}
    >
      {/* Cursive Sweeping 'P' */}
      <span
        className="font-script text-7xl sm:text-9xl md:text-[13rem] leading-none -mr-2 sm:-mr-4 md:-mr-6 translate-y-1 sm:translate-y-2 select-none pointer-events-none"
        style={{
          fontFamily: "'Pinyon Script', 'Alex Brush', cursive",
          fontWeight: 400,
        }}
      >
        P
      </span>

      {/* Chunky Pixel 'ort' */}
      <span
        className="font-pixel text-4xl sm:text-6xl md:text-8xl tracking-tight font-bold select-none"
        style={{
          fontFamily: "'Pixelify Sans', 'Silkscreen', monospace",
          letterSpacing: "-0.04em",
        }}
      >
        ort
      </span>

      {/* Cursive Sweeping 'f' */}
      <span
        className="font-script text-7xl sm:text-9xl md:text-[13rem] leading-none mx-0.5 sm:mx-1 -translate-y-1 sm:-translate-y-2 select-none pointer-events-none"
        style={{
          fontFamily: "'Pinyon Script', 'Alex Brush', cursive",
          fontWeight: 400,
        }}
      >
        f
      </span>

      {/* Chunky Pixel 'olio' */}
      <span
        className="font-pixel text-4xl sm:text-6xl md:text-8xl tracking-tight font-bold select-none"
        style={{
          fontFamily: "'Pixelify Sans', 'Silkscreen', monospace",
          letterSpacing: "-0.04em",
        }}
      >
        olio
      </span>
    </div>
  )
}
