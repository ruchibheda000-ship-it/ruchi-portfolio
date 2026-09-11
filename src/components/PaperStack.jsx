import React from 'react'

export default function PaperStack({ children, className = '' }) {
  return (
    <div className={`relative w-full select-text ${className}`}>
      
      {/* --------------------------------------------------------------------- */}
      {/* LAYER 1: BOTTOM PAPER (Angled slightly counter-clockwise, ~ -2.5 deg)  */}
      {/* --------------------------------------------------------------------- */}
      <div
        className="absolute inset-0 rounded-2xl bg-[#EDE7DC] border border-[#DDD5C7] shadow-xl pointer-events-none transform -rotate-2 sm:-rotate-3 -translate-x-1.5 sm:-translate-x-2.5 -translate-y-1 sm:-translate-y-1.5 z-0"
        style={{
          boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.45)',
        }}
      >
        {/* Subtle faux printed lines peeking on the left edge like real document */}
        <div className="absolute top-10 left-3 w-8 space-y-2 opacity-35 hidden sm:block">
          <div className="h-0.5 bg-[#0B3272]/40 rounded-full w-6"></div>
          <div className="h-0.5 bg-[#0B3272]/30 rounded-full w-8"></div>
          <div className="h-0.5 bg-[#0B3272]/30 rounded-full w-5"></div>
          <div className="h-0.5 bg-[#0B3272]/40 rounded-full w-7"></div>
        </div>
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* LAYER 2: MIDDLE PAPER (Angled slightly clockwise, ~ +1.8 deg)          */}
      {/* --------------------------------------------------------------------- */}
      <div
        className="absolute inset-0 rounded-2xl bg-[#F4EFE6] border border-[#E4DDD0] shadow-xl pointer-events-none transform rotate-1 sm:rotate-2 translate-x-1 sm:translate-x-2 translate-y-1 sm:translate-y-2 z-0"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Subtle faux printed lines peeking on the bottom edge */}
        <div className="absolute bottom-6 right-8 space-y-1.5 opacity-25 hidden sm:block">
          <div className="h-0.5 bg-[#0B3272]/30 rounded-full w-12"></div>
          <div className="h-0.5 bg-[#0B3272]/30 rounded-full w-16"></div>
        </div>
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* LAYER 3: FOREGROUND MAIN PAPER (Warm Ivory, Crisp & Tactile)           */}
      {/* --------------------------------------------------------------------- */}
      <div
        className="relative z-10 rounded-2xl bg-linear-to-b from-[#FBF9F5] via-[#FAF7F2] to-[#F5F1E8] border border-[#E5DFD5] p-7 sm:p-10 lg:p-12 text-[#061840]"
        style={{
          boxShadow:
            '0 4px 12px rgba(0, 0, 0, 0.12), 0 15px 35px -5px rgba(0, 0, 0, 0.45), 0 35px 65px -10px rgba(0, 0, 0, 0.6)',
        }}
      >
        {/* Faint fine paper grain overlay */}
        <div
          className="absolute inset-0 rounded-2xl opacity-40 pointer-events-none mix-blend-multiply"
          style={{
            backgroundImage:
              'radial-gradient(#D6CEBF 0.75px, transparent 0.75px)',
            backgroundSize: '12px 12px',
          }}
        ></div>

        {/* ------------------------------------------------------------------- */}
        {/* SILVER WIRE PAPERCLIP (TOP-LEFT CORNER)                             */}
        {/* Modeled directly from the reference image                           */}
        {/* ------------------------------------------------------------------- */}
        <div
          className="absolute -top-5 left-8 sm:left-12 z-30 pointer-events-none select-none"
          title="Paperclip"
        >
          <svg
            width="34"
            height="72"
            viewBox="0 0 34 72"
            fill="none"
            className="filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.35)]"
          >
            <defs>
              <linearGradient id="silver-clip-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="20%" stopColor="#D5D9DC" />
                <stop offset="45%" stopColor="#8A929A" />
                <stop offset="70%" stopColor="#E6E9EC" />
                <stop offset="90%" stopColor="#7E868E" />
                <stop offset="100%" stopColor="#C4C9CE" />
              </linearGradient>
            </defs>

            {/* Behind paper portion of clip (shadow on paper edge) */}
            <path
              d="M11 14 L11 54 C11 61 23 61 23 54 L23 18 C23 10 5 10 5 18 L5 60 C5 70 29 70 29 60 L29 22"
              stroke="#000000"
              strokeWidth="2.8"
              strokeOpacity="0.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(1.5, 2)"
            />

            {/* Front metallic wire loop */}
            <path
              d="M11 14 L11 54 C11 61 23 61 23 54 L23 18 C23 10 5 10 5 18 L5 60 C5 70 29 70 29 60 L29 22"
              stroke="url(#silver-clip-grad)"
              strokeWidth="2.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* ------------------------------------------------------------------- */}
        {/* METAL BINDER CLIP (RIGHT EDGE)                                      */}
        {/* Modeled directly from the reference image                           */}
        {/* ------------------------------------------------------------------- */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-5 z-30 pointer-events-none select-none"
          title="Binder Clip"
        >
          <svg
            width="56"
            height="64"
            viewBox="0 0 56 64"
            fill="none"
            className="filter drop-shadow-[0_6px_10px_rgba(0,0,0,0.4)]"
          >
            <defs>
              {/* Metallic clamp body gradient */}
              <linearGradient id="binder-body-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4A5056" />
                <stop offset="15%" stopColor="#9CA3AA" />
                <stop offset="40%" stopColor="#F0F3F6" />
                <stop offset="70%" stopColor="#7B838B" />
                <stop offset="90%" stopColor="#555C63" />
                <stop offset="100%" stopColor="#3B4147" />
              </linearGradient>

              {/* Wire handle gradient */}
              <linearGradient id="binder-wire-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="40%" stopColor="#8F969E" />
                <stop offset="75%" stopColor="#E2E6EA" />
                <stop offset="100%" stopColor="#697178" />
              </linearGradient>
            </defs>

            {/* Cast shadow of the clamp body onto the paper & background */}
            <rect
              x="2"
              y="15"
              width="20"
              height="34"
              rx="2.5"
              fill="#000000"
              fillOpacity="0.35"
              transform="translate(2, 3)"
            />

            {/* Metal Clamp Body gripping paper edge */}
            <rect
              x="2"
              y="15"
              width="20"
              height="34"
              rx="2.5"
              fill="url(#binder-body-grad)"
              stroke="#2E3338"
              strokeWidth="0.8"
            />

            {/* Inner bevel groove on the clamp */}
            <line x1="7" y1="17" x2="7" y2="47" stroke="#252A2E" strokeWidth="1.2" opacity="0.8" />
            <line x1="8.5" y1="17" x2="8.5" y2="47" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.6" />
            <line x1="16" y1="17" x2="16" y2="47" stroke="#252A2E" strokeWidth="1" opacity="0.6" />

            {/* Wire handle wings extending to the right */}
            <path
              d="M17 23 C 24 23, 40 21, 46 26 C 51 31, 48 35, 41 35 L 17 35"
              fill="none"
              stroke="url(#binder-wire-grad)"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M17 27 C 24 27, 40 27, 46 32 C 51 37, 48 41, 41 41 L 17 41"
              fill="none"
              stroke="url(#binder-wire-grad)"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Wire handle pivot knobs on the clamp */}
            <circle cx="17" cy="23" r="2.2" fill="#2E3338" stroke="#8F969E" strokeWidth="0.6" />
            <circle cx="17" cy="27" r="2.2" fill="#2E3338" stroke="#8F969E" strokeWidth="0.6" />
            <circle cx="17" cy="35" r="2.2" fill="#2E3338" stroke="#8F969E" strokeWidth="0.6" />
            <circle cx="17" cy="41" r="2.2" fill="#2E3338" stroke="#8F969E" strokeWidth="0.6" />
          </svg>
        </div>

        {/* Content Children */}
        <div className="relative z-10">{children}</div>

        {/* ------------------------------------------------------------------- */}
        {/* TACTILE BLIND DEBOSS AT BOTTOM (Inspired by "LIDEAT." in reference) */}
        {/* ------------------------------------------------------------------- */}
        <div className="pt-8 pb-1 text-center pointer-events-none select-none">
          <span
            className="font-mono text-[11px] uppercase tracking-[0.35em] text-[#A69B88]/60 font-semibold"
            style={{
              textShadow: '0 1px 0 rgba(255, 255, 255, 0.85), 0 -1px 0 rgba(0, 0, 0, 0.1)',
            }}
          >
            RUCHI BHEDA // PORTFOLIO
          </span>
        </div>

      </div>

    </div>
  )
}
