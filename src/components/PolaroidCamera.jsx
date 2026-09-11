import React from 'react'

export default function PolaroidCamera({ isPrinting = false }) {
  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[380px] mx-auto flex flex-col items-center select-none">
      
      {/* --------------------------------------------------------------------- */}
      {/* 1. CAMERA BODY CONTAINER (Z-INDEX 20: Sits in front of retracted film)  */}
      {/* --------------------------------------------------------------------- */}
      <div className="relative z-20 w-full">
        
        {/* Top Viewfinder Hump */}
        <div className="w-24 h-3.5 mx-auto bg-[#0B3272] rounded-t-lg border-t border-x border-[#061840]/40 shadow-xs"></div>

        {/* Main Camera Upper Housing (Soft Cream #F6E8D2 with subtle illustrated shadow) */}
        <div className="relative bg-[#F6E8D2] rounded-t-3xl border-2 border-[#E8DEC8] p-4 sm:p-5 shadow-[0_15px_35px_-5px_rgba(0,0,0,0.6)]">
          
          {/* Subtle paper grain texture overlay */}
          <div className="absolute inset-0 bg-diary-grid opacity-25 pointer-events-none rounded-t-3xl"></div>

          {/* Upper Row: Tape Label (Left) | Large Center Lens | Viewfinder (Right) */}
          <div className="relative z-10 flex items-start justify-between gap-2">
            
            {/* Left Column: Hand-drawn Kraft Tape Label & Shutter Button */}
            <div className="flex flex-col items-center gap-3 pt-1 w-20">
              {/* Paper Label (Matching Reference) */}
              <div className="w-full bg-[#EADCC6] border border-[#0B3272]/20 px-2 py-1.5 rounded-sm shadow-xs transform -rotate-2 text-center">
                <div className="font-hand text-[13px] text-[#0B3272] font-bold leading-none">
                  ruchi ツ
                </div>
                <div className="font-mono text-[9px] text-[#0B3272]/70 tracking-wider font-semibold mt-0.5">
                  1080
                </div>
              </div>

              {/* Chunky Shutter Button (Path Gold #E4BA83 with deep rim) */}
              <div className="relative group cursor-pointer mt-1">
                <div className="w-11 h-11 rounded-full bg-[#0B3272] flex items-center justify-center p-1 shadow-md">
                  <div className="w-full h-full rounded-full bg-[#E4BA83] border border-[#F1E3CC] shadow-inner flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-[#E4BA83] shadow-xs"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Center: Large Chunky Polaroid Lens Unit */}
            <div className="flex flex-col items-center">
              {/* Outer Lens Housing (Rounded Square with heavy drop shadow) */}
              <div className="relative w-32 sm:w-36 h-32 sm:h-36 bg-[#061840] rounded-[28px] border-4 border-[#0B3272] shadow-2xl flex items-center justify-center p-3">
                {/* Concentric Lens Ridges */}
                <div className="w-full h-full rounded-full bg-[#0B3272]/40 border-2 border-[#8DA1B4]/30 flex items-center justify-center p-2.5">
                  <div className="w-full h-full rounded-full bg-[#040F28] border border-[#8DA1B4]/40 flex items-center justify-center relative overflow-hidden shadow-inner">
                    {/* Inner Lens Glass Elements */}
                    <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-[#061840] border-2 border-[#0B3272] flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-[#040F28] border border-[#8DA1B4]/50"></div>
                    </div>
                    {/* Lens Specular Reflection Highlights */}
                    <div className="absolute top-2 left-3 w-8 h-4 bg-white/20 rounded-full transform -rotate-45 blur-[0.5px]"></div>
                    <div className="absolute bottom-3 right-4 w-3 h-3 bg-[#E4BA83]/40 rounded-full blur-[0.5px]"></div>
                  </div>
                </div>
              </div>

              {/* Vertical Heritage Ribbon under lens (Approved palette) */}
              <div className="flex w-7 h-6 shadow-xs border-x border-[#0B3272]/15">
                <div className="w-1/4 h-full bg-[#0B3272]"></div>
                <div className="w-1/4 h-full bg-[#8DA1B4]"></div>
                <div className="w-1/4 h-full bg-[#E4BA83]"></div>
                <div className="w-1/4 h-full bg-[#F6E8D2]"></div>
              </div>
            </div>

            {/* Right Column: Optical Viewfinder & Sensor/Flash */}
            <div className="flex flex-col items-center gap-3 pt-1 w-20">
              {/* Optical Viewfinder Glass */}
              <div className="w-14 h-14 bg-[#040F28] rounded-xl border-2 border-[#0B3272] shadow-md p-1.5 relative overflow-hidden">
                {/* Inner viewfinder frame */}
                <div className="w-full h-full border border-[#8DA1B4]/40 rounded-md flex items-center justify-center relative">
                  <div className="w-2.5 h-2.5 bg-[#8DA1B4] rounded-xs shadow-xs"></div>
                  {/* Diagonal reflection tick */}
                  <div className="absolute top-1 right-1 w-3 h-[1px] bg-white/40 transform -rotate-45"></div>
                </div>
              </div>

              {/* Secondary Sensor / Flash Eye */}
              <div className="w-8 h-8 rounded-full bg-[#040F28] border-2 border-[#0B3272] shadow-inner flex items-center justify-center relative overflow-hidden">
                <div className="w-3 h-3 rounded-full bg-[#E4BA83]/70 blur-[0.5px]"></div>
                <div className="absolute top-1 left-1.5 w-2 h-1 bg-white/50 rounded-full"></div>
              </div>
            </div>

          </div>

          {/* Forward Stepped Ledge (Shelf separating upper and lower housing) */}
          <div className="mt-2 h-2.5 bg-[#E8DEC8] rounded-sm border-t border-[#F6E8D2] shadow-inner"></div>
        </div>

        {/* Lower Camera Base Housing (Forest Blue #0B3272 with textured mist band) */}
        <div className="relative bg-[#0B3272] rounded-b-2xl border-x-2 border-b-2 border-[#061840]/60 p-3 shadow-2xl">
          {/* Horizontal Mist Blue Rubber Grip Band */}
          <div className="w-full h-4 bg-[#8DA1B4]/40 rounded-md border-y border-[#8DA1B4]/50 mb-2 shadow-inner"></div>

          {/* Film Ejection Slot Mouth (Where the photo emerges from) */}
          <div className="relative w-full h-4 bg-[#040F28] rounded-full border-2 border-[#061840] shadow-[inset_0_3px_6px_rgba(0,0,0,0.9)] flex items-center justify-center overflow-visible">
            {/* Slot roller highlight */}
            <div className="w-4/5 h-[1.5px] bg-[#8DA1B4]/20 rounded-full"></div>
          </div>
        </div>

      </div>

      {/* --------------------------------------------------------------------- */}
      {/* 2. EMERGING LIVING POLAROID PHOTO STRIP                                */}
      {/* Animates downward from behind the slot when isPrinting is true         */}
      {/* --------------------------------------------------------------------- */}
      <div className="relative z-10 w-[88%] -mt-3 flex justify-center">
        <div
          className={`w-full bg-[#F6E8D2] p-3 sm:p-3.5 pb-7 sm:pb-8 rounded-xs border border-[#E8DEC8] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.85)] ${
            isPrinting ? 'animate-polaroid-eject' : 'translate-y-[-240px] opacity-0'
          }`}
          style={{ willChange: 'transform, opacity' }}
        >
          {/* Top edge attached illusion / roller crease */}
          <div className="w-full h-1 bg-[#061840]/10 rounded-full mb-2"></div>

          {/* The Photographic Image Window with Living Video */}
          <div className="relative w-full aspect-square bg-[#061840] rounded-xs overflow-hidden shadow-inner border border-[#0B3272]/20">
            <video
              src="/ruchi-about-me.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/Ruchi About Me Portfolio.mp4" type="video/mp4" />
            </video>

            {/* Subtle vintage photo surface glare reflection */}
            <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-white/10 pointer-events-none"></div>

            {/* Live Indicator Stamp in corner of photo */}
            <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded bg-[#061840]/75 backdrop-blur-xs font-mono text-[9px] text-[#F1E3CC] border border-[#0B3272]/40">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E4BA83] animate-pulse"></span>
              <span>LIVE PHOTO</span>
            </div>
          </div>

          {/* Wide Classic Polaroid Bottom Chin */}
          <div className="mt-3 sm:mt-3.5 px-1 flex items-center justify-between font-serif text-[#061840]">
            <div>
              <div className="font-hand text-lg sm:text-xl font-bold text-[#0B3272] leading-none">
                Ruchi Bheda
              </div>
              <div className="font-mono text-[9px] text-[#061840]/75 uppercase tracking-wider mt-0.5">
                Product Designer // Mumbai
              </div>
            </div>

            <div className="font-mono text-[10px] text-[#E4BA83] bg-[#0B3272] px-2 py-0.5 rounded font-bold shadow-xs">
              ✦ 2026
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
