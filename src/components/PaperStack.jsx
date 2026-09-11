import React from 'react'

export default function PaperStack({ children, className = '' }) {
  return (
    <div className={`relative w-full max-w-[540px] mx-auto select-text ${className}`}>
      {/* Real-Life Photographic Paper Stack with Drop Shadow */}
      <div className="relative w-full filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.7)]">
        
        {/* The Exact Real-Life Photographic Paper Stack Asset */}
        <img
          src="/real-paper-stack.png"
          alt="Real paper stack with paperclip and binder clip"
          className="w-full h-auto block select-none pointer-events-none"
        />

        {/* Content Layer: mapped precisely onto the front paper sheet */}
        <div className="absolute inset-0 pt-[13%] pb-[9%] pl-[13%] pr-[16%] flex flex-col justify-center">
          <div className="relative z-10 w-full">
            {children}
          </div>
        </div>

      </div>
    </div>
  )
}
