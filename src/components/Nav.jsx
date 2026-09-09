import { NavLink } from 'react-router-dom'

export default function Nav() {
  const getLinkClass = ({ isActive }) =>
    isActive
      ? 'bg-[#281712] text-[#f4ede1] font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full shadow-xs transition-all duration-200'
      : 'text-[#281712]/75 hover:text-[#281712] hover:bg-[#281712]/10 font-medium text-xs sm:text-sm px-4 py-1.5 rounded-full no-underline transition-all duration-200'

  return (
    <header className="w-full z-50 pt-4 pb-2 px-4 sm:px-8">
      <nav className="max-w-5xl mx-auto flex items-center justify-between bg-[#f4ede1]/90 backdrop-blur-md border-2 border-[#281712] px-4 py-2.5 rounded-full shadow-lg">
        {/* Brand / Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2 text-xs sm:text-sm font-display font-extrabold tracking-tight text-[#281712] border border-[#281712] bg-[#f4ede1] px-3 py-1 rounded-full shadow-2xs hover:bg-[#281712] hover:text-[#f4ede1] transition-all"
        >
          <span className="font-pixel text-xs" aria-hidden="true">✦</span>
          <span>ruchi.portfolio</span>
        </NavLink>

        {/* Links */}
        <div className="flex items-center gap-1 sm:gap-2">
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
