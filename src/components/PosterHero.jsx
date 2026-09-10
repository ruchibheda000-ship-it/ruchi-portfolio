import React from 'react'
import PortfolioWordmark from './PortfolioWordmark'
import PixelSparkle from './PixelSparkle'
import PixelFolder from './PixelFolder'

export default function PosterHero() {
  return (
    <section className="relative w-full overflow-hidden py-6 sm:py-10 px-3 sm:px-6 flex justify-center items-center">
      {/* CORKBOARD WOODEN FRAME */}
      <div className="relative w-full max-w-5xl rounded-sm p-3 sm:p-5 bg-[#c28e57] shadow-2xl border-4 sm:border-8 border-[#996531] ring-1 ring-black/20">
        
        {/* Corkboard Inset */}
        <div className="relative w-full rounded-sm bg-cork p-4 sm:p-8 md:p-12 overflow-hidden shadow-inner border border-[#804e22]">
          
          {/* Subtle tape on top-left of cork */}
          <div className="absolute top-2 left-4 w-12 h-6 tape-strip rotate-[-18deg] z-10 hidden sm:block" aria-hidden="true"></div>
          
          {/* Subtle note/tape on bottom-right of cork */}
          <div className="absolute -bottom-1 right-8 w-14 h-8 bg-[#ffffeedd] border border-stone-300 shadow-xs rotate-[8deg] z-10 hidden sm:block" aria-hidden="true"></div>

          {/* MAIN FOLDED PAPER POSTER (Cream #FFFED8 with subtle editorial grid) */}
          <div className="relative mx-auto w-full max-w-4xl bg-[#FFFED8] bg-notebook-grid text-[#173C64] shadow-2xl rounded-xs rotate-[-0.8deg] transition-transform hover:rotate-0 duration-500 paper-crease p-3 sm:p-6 md:p-8">
            
            {/* Push Pins at corners */}
            <div className="absolute -top-2 left-6 push-pin z-30" aria-hidden="true"></div>
            <div className="absolute -top-2 right-6 push-pin z-30" aria-hidden="true"></div>

            {/* BOLD EDITORIAL INSET BORDER (Primary Blue #173C64) */}
            <div className="relative border-2 border-[#173C64] rounded-xs px-4 py-6 sm:px-8 sm:py-10 min-h-[460px] sm:min-h-[540px] flex flex-col justify-between">
              
              {/* TOP ROW */}
              <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
                {/* GraphicDesign Pill */}
                <div className="border-[1.5px] border-[#173C64] rounded-full px-3.5 py-0.5 bg-[#FFFED8] shadow-2xs">
                  <span className="font-display font-extrabold text-[11px] sm:text-xs tracking-tight text-[#173C64]">
                    GraphicDesign
                  </span>
                </div>

                {/* Center Handle / Moniker */}
                <div className="font-display font-extrabold text-xs sm:text-sm tracking-wider text-[#173C64] uppercase">
                  ruchi.design
                </div>

                {/* Packaging Design Text */}
                <div className="font-display font-bold text-[11px] sm:text-xs tracking-tight text-[#173C64]">
                  packaging Design
                </div>
              </div>

              {/* TOP SPARKLES */}
              <div className="absolute top-16 left-12 sm:left-24 text-[#173C64] animate-pulse">
                <PixelSparkle size={24} />
              </div>
              <div className="absolute top-20 right-14 sm:right-32 text-[#173C64] opacity-80">
                <PixelSparkle size={18} />
              </div>

              {/* CENTER HERO WORDMARK ("Portfolio") */}
              <div className="relative my-auto py-6 sm:py-8 flex justify-center items-center z-10 text-center">
                <PortfolioWordmark />
              </div>

              {/* FLOATING SPARKLES AROUND HERO */}
              <div className="absolute bottom-24 left-10 sm:left-20 text-[#173C64]">
                <PixelSparkle size={26} />
              </div>
              <div className="absolute bottom-28 right-44 text-[#173C64] hidden md:block">
                <PixelSparkle size={16} />
              </div>

              {/* BOTTOM ROW */}
              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
                
                {/* Visual Communication Design Pill */}
                <div className="border-[1.5px] border-[#173C64] rounded-full px-5 py-1.5 bg-[#FFFED8] shadow-2xs">
                  <span className="font-display font-bold text-xs sm:text-sm tracking-wide text-[#173C64]">
                    Visual communication Design
                  </span>
                </div>

                {/* Right: Interactive Pixel Folder */}
                <div className="flex items-center gap-3">
                  <div className="text-[#173C64] opacity-80 hidden sm:block">
                    <PixelSparkle size={14} />
                  </div>
                  <PixelFolder to="/work" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
