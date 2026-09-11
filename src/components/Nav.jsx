import React from 'react'
import { NavLink } from 'react-router-dom'

const navLinks = [
  { to: '/', label: ':)', fullLabel: 'Home', ariaLabel: 'Home' },
  { to: '/about', label: 'about', fullLabel: 'About', ariaLabel: 'About' },
  { to: '/work', label: 'work', fullLabel: 'Work', ariaLabel: 'Work' },
  { to: '/contact', label: 'Connect', fullLabel: 'Contact', ariaLabel: 'Contact' },
]

export default function Nav() {
  return (
    <header className="sticky top-4 sm:top-6 z-50 w-full flex justify-center px-4 mb-6 sm:mb-10 pointer-events-none">
      <nav
        className="pointer-events-auto bg-[#0B3272]/90 text-[#F1E3CC] px-8 sm:px-12 py-2 sm:py-2.5 rounded-full shadow-2xl border border-[#0B3272] flex items-center justify-center gap-7 sm:gap-11 font-hand text-2xl sm:text-3xl tracking-wide select-none backdrop-blur-md"
        aria-label="Main Navigation"
      >
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            title={link.fullLabel}
            aria-label={link.ariaLabel}
            className={({ isActive }) =>
              `relative inline-block transition-colors duration-200 cursor-pointer ${
                isActive
                  ? 'text-[#E4BA83] font-bold underline decoration-[#E4BA83] decoration-2 underline-offset-6'
                  : 'text-[#F1E3CC]/85 no-underline hover:text-[#F6E8D2] hover:underline hover:decoration-[#E4BA83] hover:decoration-2 hover:underline-offset-4'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
