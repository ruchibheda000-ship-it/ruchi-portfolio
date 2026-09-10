import React from 'react'
import { NavLink, Link } from 'react-router-dom'

export default function Nav() {
  return (
    <header className="w-full z-50 pt-6 sm:pt-10 pb-4 sm:pb-6 px-5 sm:px-10 lg:px-16">
      <nav
        className="max-w-7xl mx-auto flex items-baseline justify-between"
        aria-label="Main Navigation"
      >
        {/* Left: Designer / Portfolio Name */}
        <Link
          to="/"
          className="group flex flex-col sm:flex-row sm:items-baseline sm:gap-3 text-[#173C64] no-underline focus:outline-hidden"
        >
          <span className="font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-tight group-hover:opacity-70 transition-opacity duration-200">
            ruchi bheda
          </span>
          <span className="font-mono text-[11px] sm:text-xs text-[#173C64]/60 tracking-wider uppercase">
            visual communication
          </span>
        </Link>

        {/* Right: Editorial Navigation Links */}
        <div className="flex items-center gap-5 sm:gap-8 md:gap-12 text-[#173C64]">
          <NavLink
            to="/work"
            className={({ isActive }) =>
              `group relative py-1 text-sm sm:text-base md:text-lg transition-colors duration-200 ${
                isActive
                  ? 'font-semibold text-[#173C64]'
                  : 'font-normal text-[#173C64]/70 hover:text-[#173C64]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>Work</span>
                <span
                  className={`block absolute bottom-0 left-0 h-[1.5px] bg-[#173C64] transition-all duration-200 ease-out ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                  aria-hidden="true"
                />
              </>
            )}
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `group relative py-1 text-sm sm:text-base md:text-lg transition-colors duration-200 ${
                isActive
                  ? 'font-semibold text-[#173C64]'
                  : 'font-normal text-[#173C64]/70 hover:text-[#173C64]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>About</span>
                <span
                  className={`block absolute bottom-0 left-0 h-[1.5px] bg-[#173C64] transition-all duration-200 ease-out ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                  aria-hidden="true"
                />
              </>
            )}
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `group relative py-1 text-sm sm:text-base md:text-lg transition-colors duration-200 ${
                isActive
                  ? 'font-semibold text-[#173C64]'
                  : 'font-normal text-[#173C64]/70 hover:text-[#173C64]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>Contact</span>
                <span
                  className={`block absolute bottom-0 left-0 h-[1.5px] bg-[#173C64] transition-all duration-200 ease-out ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                  aria-hidden="true"
                />
              </>
            )}
          </NavLink>
        </div>
      </nav>
    </header>
  )
}
