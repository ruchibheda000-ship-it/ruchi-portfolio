import Nav from '../components/Nav'
import PixelSparkle from '../components/PixelSparkle'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="min-h-screen bg-[#0e2640] text-[#173C64] relative overflow-hidden font-display flex flex-col justify-between">
      {/* Background Locker / Editorial Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-locker" aria-hidden="true"></div>

      {/* Navigation */}
      <div className="relative z-20">
        <Nav />
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 flex-grow flex items-center justify-center">
        
        {/* CORKBOARD FRAME CONTAINER */}
        <div className="w-full rounded-sm p-4 sm:p-6 bg-[#c28e57] shadow-2xl border-4 sm:border-8 border-[#996531] ring-1 ring-black/20">
          <div className="rounded-sm bg-cork p-4 sm:p-8 overflow-hidden shadow-inner border border-[#804e22]">
            
            {/* Folded Paper Bio Sheet */}
            <div className="relative bg-[#FFFED8] bg-notebook-grid text-[#173C64] p-6 sm:p-10 rounded-xs shadow-xl rotate-[-0.6deg] border-2 border-[#173C64] paper-crease">
              
              {/* Pushpins */}
              <div className="absolute -top-3 left-8 push-pin" aria-hidden="true"></div>
              <div className="absolute -top-3 right-8 push-pin" aria-hidden="true"></div>

              {/* Tape on side */}
              <div className="absolute -top-2 right-1/2 w-16 h-5 tape-strip rotate-[2deg] hidden sm:block" aria-hidden="true"></div>

              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#173C64]/20 pb-4 mb-6">
                <div className="border border-[#173C64] rounded-full px-3 py-0.5 text-xs font-bold bg-[#173C64] text-[#FFFED8]">
                  BIO & MANIFESTO
                </div>
                <div className="flex items-center gap-2 font-pixel text-xs text-[#173C64]">
                  <PixelSparkle size={16} />
                  <span>VISUAL DESIGNER</span>
                </div>
              </div>

              {/* Title & Introduction */}
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#173C64] mb-4">
                Ruchi Bheda
              </h1>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {['Visual Communication', 'Packaging Design', 'Typography', 'Art Direction'].map((pill) => (
                  <span
                    key={pill}
                    className="border border-[#173C64] rounded-full px-3 py-0.5 text-xs font-semibold bg-[#FFFED8] text-[#173C64] shadow-2xs"
                  >
                    {pill}
                  </span>
                ))}
              </div>

              {/* Body Text */}
              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#173C64]/90">
                <p>
                  I am a multidisciplinary visual designer driven by the tactile craft of print, expressive typography, and experimental digital interactions. My work bridges vintage analog aesthetics—from screenprinted packaging and distressed paper ephemera—with contemporary digital interfaces.
                </p>
                <p>
                  Rooted in clean typographic systems and playful retro cues, I focus on brand identity systems, physical packaging design, and bespoke web spaces that leave a lasting impression.
                </p>
              </div>

              {/* Toolkit Section */}
              <div className="mt-8 pt-6 border-t border-[#173C64]/20">
                <div className="font-pixel text-xs text-[#173C64] uppercase tracking-wider mb-3">
                  ✦ Selected Toolkit & Disciplines
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="bg-[#FFFED8] p-2.5 rounded border border-[#173C64]/30 text-[#173C64] font-medium">
                    Editorial Layout
                  </div>
                  <div className="bg-[#FFFED8] p-2.5 rounded border border-[#173C64]/30 text-[#173C64] font-medium">
                    Packaging & Die-Cuts
                  </div>
                  <div className="bg-[#FFFED8] p-2.5 rounded border border-[#173C64]/30 text-[#173C64] font-medium">
                    Custom Typography
                  </div>
                  <div className="bg-[#FFFED8] p-2.5 rounded border border-[#173C64]/30 text-[#173C64] font-medium">
                    Interactive Web & UI
                  </div>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="mt-8 flex items-center justify-between pt-4 border-t border-[#173C64]/20">
                <span className="font-pixel text-[11px] text-[#173C64]/70">
                  Available for select commissions & collaborations
                </span>
                <Link
                  to="/contact"
                  className="font-display font-bold text-xs bg-[#173C64] text-[#FFFED8] px-4 py-1.5 rounded-full hover:bg-[#0e2640] transition-colors"
                >
                  Get in Touch →
                </Link>
              </div>

            </div>

          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-20 w-full py-4 text-center">
        <Link
          to="/"
          className="font-pixel text-xs text-[#FFFED8] hover:underline"
        >
          ← Return to Main Poster
        </Link>
      </footer>
    </div>
  )
}
