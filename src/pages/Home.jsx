import Nav from '../components/Nav'
import PosterHero from '../components/PosterHero'
import HangingCloth from '../components/HangingCloth'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#4f778f] text-[#281712] relative overflow-hidden font-display flex flex-col justify-between">
      {/* Background Locker Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-35 bg-locker"></div>
      
      {/* Decorative locker vents (louvers) */}
      <div className="absolute top-12 left-6 sm:left-12 flex flex-col gap-1.5 opacity-25 pointer-events-none hidden md:flex">
        <div className="w-16 h-1.5 bg-black rounded-full"></div>
        <div className="w-16 h-1.5 bg-black rounded-full"></div>
        <div className="w-16 h-1.5 bg-black rounded-full"></div>
        <div className="w-16 h-1.5 bg-black rounded-full"></div>
        <div className="w-16 h-1.5 bg-black rounded-full"></div>
      </div>

      <div className="absolute top-12 right-6 sm:right-12 flex flex-col gap-1.5 opacity-25 pointer-events-none hidden md:flex">
        <div className="w-16 h-1.5 bg-black rounded-full"></div>
        <div className="w-16 h-1.5 bg-black rounded-full"></div>
        <div className="w-16 h-1.5 bg-black rounded-full"></div>
        <div className="w-16 h-1.5 bg-black rounded-full"></div>
        <div className="w-16 h-1.5 bg-black rounded-full"></div>
      </div>

      {/* Navigation */}
      <div className="relative z-20">
        <Nav />
      </div>

      {/* Main Poster Section */}
      <main className="relative z-10 w-full flex flex-col items-center justify-center">
        <PosterHero />
        
        {/* Interactive Physics-Based Hanging Cloth Component */}
        <section className="w-full flex justify-center mt-4 mb-8">
          <HangingCloth />
        </section>
      </main>

      {/* Bottom Sticky Footnote / Quick Tags */}
      <footer className="relative z-20 w-full py-4 px-6 text-center">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-3">
          <span className="font-pixel text-xs text-[#f4ede1] tracking-wider uppercase bg-[#281712] px-3 py-1 rounded-full">
            ✦ Ruchi Bheda © 2026
          </span>
          <Link
            to="/work"
            className="font-display font-semibold text-xs text-[#281712] bg-[#f4ede1] hover:bg-white px-3.5 py-1 rounded-full border border-[#281712] transition-colors"
          >
            Explore Projects →
          </Link>
          <Link
            to="/about"
            className="font-display font-semibold text-xs text-[#281712] bg-[#f4ede1] hover:bg-white px-3.5 py-1 rounded-full border border-[#281712] transition-colors"
          >
            Read Bio
          </Link>
        </div>
      </footer>
    </div>
  )
}
