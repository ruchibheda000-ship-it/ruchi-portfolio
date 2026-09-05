import Nav from '../components/Nav'
import PixelSparkle from '../components/PixelSparkle'
import { Link } from 'react-router-dom'

const projects = [
  {
    id: 1,
    title: 'Kitger Packaging System',
    category: 'Packaging Design',
    year: '2025',
    tag: 'Physical & Specimen',
    description: 'Eco-conscious tactile packaging suite featuring custom kraft die-cuts and vintage screenprinted typography.',
    tags: ['Die-cut', 'Screenprint', 'Sustainable']
  },
  {
    id: 2,
    title: 'Kinetic Type Exhibition',
    category: 'Visual communication',
    year: '2025',
    tag: 'Typography / Motion',
    description: 'Bespoke experimental hybrid typefaces bridging mid-century calligraphy with 90s cyber-pixel aesthetics.',
    tags: ['Custom Type', 'Editorial', 'Poster']
  },
  {
    id: 3,
    title: 'Atelier Monochrome',
    category: 'Brand Identity',
    year: '2024',
    tag: 'Visual Identity',
    description: 'Complete brand language, stationery suite, and packaging guidelines for an avant-garde design studio.',
    tags: ['Identity', 'Stationery', 'Guidelines']
  },
  {
    id: 4,
    title: 'Cyber-Nostalgia Archive',
    category: 'Web & Interactive',
    year: '2024',
    tag: 'Digital Specimen',
    description: 'Interactive web laboratory exploring retro computing interfaces, early GUI desktop metaphors, and sound design.',
    tags: ['React', 'Interactive', 'UI/UX']
  }
]

export default function Work() {
  return (
    <div className="min-h-screen bg-[#4f778f] text-[#281712] relative overflow-hidden font-display flex flex-col justify-between">
      {/* Background Locker Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-35 bg-locker"></div>

      {/* Navigation */}
      <div className="relative z-20">
        <Nav />
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 flex-grow">
        
        {/* CORKBOARD FRAME CONTAINER */}
        <div className="rounded-sm p-4 sm:p-6 bg-[#c28e57] shadow-2xl border-4 sm:border-8 border-[#996531] ring-1 ring-black/20">
          <div className="rounded-sm bg-cork p-4 sm:p-8 overflow-hidden shadow-inner border border-[#804e22]">
            
            {/* Header Specimen Paper */}
            <div className="relative mb-8 bg-[#f4ede1] text-[#281712] shadow-md p-4 sm:p-6 rounded-xs rotate-[-0.5deg] border-[1.5px] border-[#4b73b5] flex flex-wrap items-center justify-between gap-4">
              <div className="absolute -top-3 left-6 push-pin"></div>
              <div className="absolute -top-3 right-6 push-pin"></div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="border border-[#281712] rounded-full px-2.5 py-0.5 font-display font-bold text-[10px] uppercase tracking-wider bg-[#281712] text-[#f4ede1]">
                    Archive 01
                  </span>
                  <span className="font-pixel text-xs text-[#4b73b5]">✦ SELECTED WORK</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#281712]">
                  Design & Visual Projects
                </h1>
              </div>

              <div className="flex items-center gap-2">
                <PixelSparkle size={20} className="text-[#281712]" />
                <span className="font-pixel text-xs text-[#281712] bg-[#e6ddca] px-3 py-1 rounded border border-[#281712]/30">
                  4 Items Pinned
                </span>
              </div>
            </div>

            {/* Pinned Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((item, idx) => (
                <div
                  key={item.id}
                  className={`relative bg-[#f4ede1] text-[#281712] p-5 sm:p-6 rounded-xs shadow-lg border-[1.5px] border-[#4b73b5] transition-all hover:-translate-y-1 hover:shadow-xl ${
                    idx % 2 === 0 ? 'rotate-[-0.8deg]' : 'rotate-[0.8deg]'
                  }`}
                >
                  {/* Push Pin */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 push-pin"></div>
                  
                  {/* Top metadata pill */}
                  <div className="flex items-center justify-between gap-2 mb-3 pt-1">
                    <span className="border border-[#281712] rounded-full px-3 py-0.5 text-[11px] font-bold tracking-tight bg-white/60">
                      {item.category}
                    </span>
                    <span className="font-pixel text-[11px] text-[#4b73b5] font-semibold">
                      {item.year}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#281712] mb-2">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#281712]/80 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#281712]/15">
                    {item.tags.map((t) => (
                      <span
                        key={t}
                        className="font-pixel text-[10px] text-[#281712] bg-[#eae2d0] px-2 py-0.5 rounded border border-[#281712]/25"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-20 w-full py-4 text-center">
        <Link
          to="/"
          className="font-pixel text-xs text-[#f4ede1] hover:underline"
        >
          ← Return to Main Poster
        </Link>
      </footer>
    </div>
  )
}
