import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const navLinks = [
  { to: '/', label: ':)', fullLabel: 'Home', ariaLabel: 'Home' },
  { to: '/about', label: 'about', fullLabel: 'About', ariaLabel: 'About' },
  { to: '/work', label: 'work', fullLabel: 'Work', ariaLabel: 'Work' },
  { to: '/contact', label: 'Connect', fullLabel: 'Contact', ariaLabel: 'Contact' },
]

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full flex justify-center px-4 py-3 sm:py-4 mb-4 sm:mb-6 pointer-events-none transition-all duration-300">
      <nav
        className={`pointer-events-auto flex items-center justify-center gap-7 sm:gap-11 font-hand text-2xl sm:text-3xl tracking-wide select-none px-6 sm:px-8 py-1.5 sm:py-2 rounded-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#030d24]/90 backdrop-blur-md border border-[#E4BA83]/40 shadow-xl shadow-[#020712]/70 scale-[0.98]'
            : 'bg-[#030d24]/50 backdrop-blur-sm border border-[#E4BA83]/20 shadow-md shadow-[#020712]/30'
        }`}
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
