import { NavLink } from 'react-router-dom'

export default function Nav() {
  const getLinkClass = ({ isActive }) =>
    isActive
      ? 'bg-[#173C64] text-[#FFFED8] font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full shadow-xs transition-all duration-200'
      : 'text-[#173C64]/80 hover:text-[#173C64] hover:bg-[#173C64]/10 font-medium text-xs sm:text-sm px-4 py-1.5 rounded-full no-underline transition-all duration-200'

  return (
    <header className="w-full z-50 pt-4 pb-2 px-3 sm:px-6">
      <nav className="max-w-6xl mx-auto flex items-center justify-between bg-[#FFFED8]/95 backdrop-blur-md border-2 border-[#173C64] px-3 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-md">
        {/* Brand / Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2 text-xs sm:text-sm font-display font-extrabold tracking-tight text-[#173C64] border border-[#173C64] bg-[#FFFED8] px-3 py-1 rounded-full shadow-2xs hover:bg-[#173C64] hover:text-[#FFFED8] transition-all"
        >
          <span className="font-pixel text-xs" aria-hidden="true">✦</span>
          <span>ruchi bheda</span>
          <span className="hidden md:inline text-[10px] font-mono tracking-normal font-normal opacity-70 border-l border-[#173C64]/30 pl-2">
            visual designer
          </span>
        </NavLink>

        {/* Live Availability Status Pill (Jackie Zhang style) */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full border border-[#173C64]/30 bg-[#FFFED8] text-[11px] font-mono text-[#173C64]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#173C64] animate-pulse"></span>
          <span>Available for select projects</span>
          <span className="opacity-40">•</span>
          <span>GMT +5:30</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          <NavLink to="/" end className={getLinkClass}>
            Home
          </NavLink>
          <NavLink to="/work" className={getLinkClass}>
            Work
          </NavLink>
          <NavLink to="/about" className={getLinkClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={getLinkClass}>
            Contact
          </NavLink>
        </div>
      </nav>
    </header>
  )
}
