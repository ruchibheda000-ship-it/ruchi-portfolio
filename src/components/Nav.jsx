import React from 'react'
import { NavLink, Link } from 'react-router-dom'

export default function Nav() {
  return (
    <header className="w-full z-50 pt-8 sm:pt-12 pb-4 sm:pb-6 px-6 sm:px-12 lg:px-20">
      <nav
        className="max-w-7xl mx-auto flex items-baseline justify-between"
        aria-label="Main Navigation"
      >
        {/* Left: Designer Name / Wordmark */}
        <Link
          to="/"
          className="group flex flex-col sm:flex-row sm:items-baseline sm:gap-3 text-[#171717] no-underline focus:outline-hidden"
        >
          <span className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight group-hover:text-[#E35342] transition-colors duration-200">
            ruchi bheda
          </span>
          <span className="font-mono text-[10px] sm:text-xs text-[#171717]/50 tracking-wider uppercase">
            product designer
          </span>
        </Link>

        {/* Right: Editorial Links (about, Work, Connect) */}
        <div className="flex items-center gap-6 sm:gap-10 md:gap-14 text-[#171717]">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `group relative py-1 text-sm sm:text-base md:text-lg transition-colors duration-200 ${
                isActive
                  ? 'font-bold text-[#E35342]'
                  : 'font-normal text-[#171717]/80 hover:text-[#E35342]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>about</span>
                <span
                  className={`block absolute -bottom-0.5 left-0 h-[1.5px] bg-[#E35342] transition-all duration-200 ease-out ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                  aria-hidden="true"
                />
              </>
            )}
          </NavLink>

          <NavLink
            to="/work"
            className={({ isActive }) =>
              `group relative py-1 text-sm sm:text-base md:text-lg transition-colors duration-200 ${
                isActive
                  ? 'font-bold text-[#E35342]'
                  : 'font-normal text-[#171717]/80 hover:text-[#E35342]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>Work</span>
                <span
                  className={`block absolute -bottom-0.5 left-0 h-[1.5px] bg-[#E35342] transition-all duration-200 ease-out ${
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
                  ? 'font-bold text-[#E35342]'
                  : 'font-normal text-[#171717]/80 hover:text-[#E35342]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>Connect</span>
                <span
                  className={`block absolute -bottom-0.5 left-0 h-[1.5px] bg-[#E35342] transition-all duration-200 ease-out ${
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
