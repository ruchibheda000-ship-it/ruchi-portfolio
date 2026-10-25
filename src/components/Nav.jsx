import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

/**
 * Hand-drawn Jackie Zhang inspired Navigation Menu
 * - Deep blue background: #173C64
 * - Warm cream elements/illustrations: #FFFED8
 * - Small hand-drawn profile illustration with dynamic responsive gaze
 * - Interactive hand-sketched animated oval on hover / active
 * - Link-specific decorative doodles that pop around the face:
 *     * about: thought sprout, sparkle bursts, idea balloon
 *     * Work: mini laptop, steaming coffee mug, sparkles
 *     * Connect: hand-drawn paper airplane, speech bubble, message signals
 */

// Oval loop path 1 (about & Connect)
const OVAL_PATH_1 =
  'M 81.49 16.931 C 81.49 1.676 14.701 -11.069 1.021 14.985 C -12.659 41.038 116.452 46.71 69.49 8.931'

// Oval loop path 2 (Work)
const OVAL_PATH_2 =
  'M 68.759 4.519 C 80.965 -2.317 -5.485 -4.757 0.275 22.178 C 3.425 36.908 42.214 39.876 66.46 31.45 C 101.924 19.124 86.56 3.488 67.822 1.483'

export default function Nav() {
  const location = useLocation()
  const [hoveredKey, setHoveredKey] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Map route to active link key
  const activeKey =
    location.pathname === '/about'
      ? 'about'
      : location.pathname === '/work'
      ? 'work'
      : location.pathname === '/contact'
      ? 'connect'
      : null

  // State determines which facial expression and doodles to show
  const currentKey = hoveredKey || activeKey

  return (
    <header className="sticky top-0 z-50 w-full flex justify-center px-4 py-3 sm:py-4 pointer-events-none transition-all duration-300">
      <nav
        className={`pointer-events-auto relative flex flex-col items-center justify-center select-none rounded-2xl sm:rounded-3xl px-7 sm:px-10 pt-2 pb-2.5 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#173C64]/95 backdrop-blur-md shadow-2xl border border-[#FFFED8]/30 scale-[0.98]'
            : 'bg-[#173C64] shadow-xl border border-[#FFFED8]/20'
        }`}
        aria-label="Main Navigation"
      >
        {/* ========================================================================= */}
        {/* 1. PROFILE ILLUSTRATION + DECORATIVE DOODLES                              */}
        {/* ========================================================================= */}
        <div className="relative flex items-center justify-center w-full min-h-[46px] mb-1">
          {/* Decorative Doodles for "about" */}
          <div
            className={`absolute inset-0 pointer-events-none transition-all duration-300 ${
              currentKey === 'about'
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-90'
            }`}
          >
            {/* Thought sprout top-left */}
            <img
              src="/nav/navie1_about.png"
              alt=""
              className="absolute -top-3 left-[calc(50%-48px)] w-7 h-auto animate-pulse"
              style={{ filter: 'brightness(1.1) drop-shadow(0 0 2px rgba(255,254,216,0.3))' }}
            />
            {/* Sparkle burst bottom-left */}
            <img
              src="/nav/navie2_about.png"
              alt=""
              className="absolute -bottom-1 left-[calc(50%-44px)] w-6 h-auto"
              style={{ filter: 'brightness(1.1)' }}
            />
            {/* Idea balloon top-right */}
            <img
              src="/nav/navie3_about.png"
              alt=""
              className="absolute -top-2.5 right-[calc(50%-46px)] w-6 h-auto"
              style={{ filter: 'brightness(1.1)' }}
            />
          </div>

          {/* Decorative Doodles for "work" */}
          <div
            className={`absolute inset-0 pointer-events-none transition-all duration-300 ${
              currentKey === 'work'
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-90'
            }`}
          >
            {/* Mini laptop on top */}
            <img
              src="/nav/navie4_work.png"
              alt=""
              className="absolute -top-7 left-[calc(50%-22px)] w-11 h-auto"
              style={{ filter: 'brightness(1.1) drop-shadow(0 0 2px rgba(255,254,216,0.3))' }}
            />
            {/* Steaming coffee cup on right */}
            <img
              src="/nav/navie5_work.png"
              alt=""
              className="absolute top-1 right-[calc(50%-42px)] w-5 h-auto animate-bounce"
              style={{ filter: 'brightness(1.1)', animationDuration: '2s' }}
            />
            {/* Left little sparkle star */}
            <svg
              viewBox="0 0 20 20"
              className="absolute top-2 left-[calc(50%-38px)] w-4 h-4 text-[#FFFED8]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M10 2 L10 18 M2 10 L18 10 M5 5 L15 15 M5 15 L15 5" />
            </svg>
          </div>

          {/* Decorative Doodles for "connect" */}
          <div
            className={`absolute inset-0 pointer-events-none transition-all duration-300 ${
              currentKey === 'connect'
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-90'
            }`}
          >
            {/* Hand-drawn paper airplane on top-right */}
            <svg
              viewBox="0 0 24 24"
              className="absolute -top-3.5 right-[calc(50%-46px)] w-7 h-7 text-[#FFFED8] transform rotate-12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M 2 12 L 22 2 L 14 22 L 10 14 Z M 10 14 L 22 2" />
            </svg>
            {/* Hand-drawn chat speech bubble on top-left */}
            <svg
              viewBox="0 0 26 24"
              className="absolute -top-3 left-[calc(50%-46px)] w-6 h-6 text-[#FFFED8]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M 4 4 C 18 2, 24 5, 24 13 C 24 19, 17 21, 10 20 L 4 23 L 5 18 C 2 16, 2 9, 4 4 Z" />
              <path d="M 8 11 L 18 11" strokeDasharray="1 2" strokeWidth="2.5" />
            </svg>
            {/* Connection antenna signal lines */}
            <svg
              viewBox="0 0 20 12"
              className="absolute -top-4 left-[calc(50%-8px)] w-5 h-3 text-[#FFFED8]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M 3 10 C 6 4, 14 4, 17 10" />
              <path d="M 6 10 C 8 7, 12 7, 14 10" />
            </svg>
          </div>

          {/* Profile Illustration (Interactive Face Avatar) */}
          <Link
            to="/"
            title="Home"
            aria-label="Home"
            onMouseEnter={() => setHoveredKey('face')}
            onMouseLeave={() => setHoveredKey(null)}
            className="relative z-10 block cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            <div className="w-[42px] h-[34px] sm:w-[44px] sm:h-[35px] flex items-center justify-center">
              {currentKey === 'about' ? (
                /* Looking Down / About */
                <svg
                  viewBox="0 0 36.528 37.582"
                  className="w-full h-full overflow-visible transition-all duration-200"
                  fill="none"
                >
                  <g>
                    <path d="M 14.024 18.582 L 14.024 19.582" stroke="#FFFED8" strokeWidth="3" strokeLinecap="round" />
                    <path d="M 23.024 18.582 L 23.024 19.582" stroke="#FFFED8" strokeWidth="3" strokeLinecap="round" />
                    <path d="M 18.524 23.582 L 18.524 25.082" stroke="#FFFED8" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 13.024 27.667 C 13.024 27.667 16.036 30.44 18.786 30.043 C 21.536 29.647 24.024 27.082 24.024 27.082" stroke="#FFFED8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M 0 11.734 L 1 6.734 L 5.975 6.372 L 6.834 1.707 L 14.328 5.281 L 20.319 0 L 22.028 5.631 L 27.117 2.253 L 29.634 8.799" transform="translate(3.609 -0.637) rotate(8 14.75 5.75)" stroke="#FFFED8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M 4.543 16.582 C 4.543 16.582 3.749 37.582 19.539 37.582 C 35.329 37.582 31.266 17.582 31.266 17.582" stroke="#FFFED8" strokeWidth="3" strokeLinecap="round" />
                    <path d="M 4 0.069 C -1.401 -0.911 -1.113 8.846 3.543 7.941" transform="translate(0.024 17.082) rotate(-7 2 4)" stroke="#FFFED8" strokeWidth="3" strokeLinecap="round" />
                    <path d="M 4 0.069 C -1.401 -0.911 -1.113 8.846 3.543 7.941" transform="translate(32.524 16.582) rotate(-183 2 4)" stroke="#FFFED8" strokeWidth="3" strokeLinecap="round" />
                  </g>
                </svg>
              ) : currentKey === 'connect' ? (
                /* Looking Side / Connect */
                <svg
                  viewBox="0 0 36.528 36.994"
                  className="w-full h-full overflow-visible transition-all duration-200"
                  fill="none"
                >
                  <g>
                    <path d="M 17.024 17.375 L 17.024 18.375" stroke="#FFFED8" strokeWidth="3" strokeLinecap="round" />
                    <path d="M 26.024 17.375 L 26.024 18.375" stroke="#FFFED8" strokeWidth="3" strokeLinecap="round" />
                    <path d="M 21.524 23.375 L 21.524 24.875" stroke="#FFFED8" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 17.024 27.875 C 17.024 27.875 19.899 29.625 22.524 29.375 C 25.149 29.125 27.524 26.875 27.524 26.875" stroke="#FFFED8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M 1.409 14.859 L 0 5.877 L 7 8.877 L 10.409 1.426 L 13.65 6.524 L 17.48 1.442 L 22 5.377 L 26.844 0 L 28.5 6.877" transform="translate(3.268 -0.95) rotate(8 14.25 7.5)" stroke="#FFFED8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M 4.543 17.375 C 4.543 17.375 5.897 38.766 21.543 36.875 C 37.188 34.984 31.266 18.375 31.266 18.375" stroke="#FFFED8" strokeWidth="3" strokeLinecap="round" />
                    <path d="M 4 0.069 C -1.401 -0.911 -1.113 8.846 3.543 7.941" transform="translate(0.024 17.875) rotate(-7 2 4)" stroke="#FFFED8" strokeWidth="3" strokeLinecap="round" />
                    <path d="M 4 0.069 C -1.401 -0.911 -1.113 8.846 3.543 7.941" transform="translate(32.524 17.375) rotate(-183 2 4)" stroke="#FFFED8" strokeWidth="3" strokeLinecap="round" />
                  </g>
                </svg>
              ) : currentKey === 'work' ? (
                /* Focused & Happy / Work (winking / cheerful front gaze) */
                <svg
                  viewBox="0 0 41.528 32.408"
                  className="w-full h-full overflow-visible transition-all duration-200"
                  fill="none"
                >
                  <g>
                    {/* Winking left eye */}
                    <path d="M 16.5 21 C 18 19.5, 19.5 21, 20.5 21.5" stroke="#FFFED8" strokeWidth="3" strokeLinecap="round" />
                    {/* Open right eye */}
                    <path d="M 27.024 20.908 L 27.024 21.908" stroke="#FFFED8" strokeWidth="3" strokeLinecap="round" />
                    {/* Nose */}
                    <path d="M 22.524 21.908 L 22.524 23.408" stroke="#FFFED8" strokeWidth="2" strokeLinecap="round" />
                    {/* Big happy smile */}
                    <path d="M 16.024 26.0 C 17.024 29.0, 25.5 29.5, 28.5 25.0" stroke="#FFFED8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    {/* Hair */}
                    <path d="M 0 10.5 L 1 5.5 L 8 8.5 L 8 2 L 16 7 L 16 1.5 L 23 5 L 27 0 L 29.5 6.5" transform="translate(5.524 -1.092) rotate(8 14.75 5.25)" stroke="#FFFED8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    {/* Head shape */}
                    <path d="M 7.524 12.908 C 7.524 12.908 8 32.408 22.524 32.408 C 37.048 32.408 34.52 11.408 34.52 11.408" stroke="#FFFED8" strokeWidth="3" strokeLinecap="round" />
                    {/* Left ear */}
                    <path d="M 4 0.069 C -1.401 -0.911 -1.113 8.846 3.543 7.941" transform="translate(0.024 11.408) rotate(-7 2 4)" stroke="#FFFED8" strokeWidth="3" strokeLinecap="round" />
                    {/* Right ear */}
                    <path d="M 4 0.069 C -1.401 -0.911 -1.113 8.846 3.543 7.941" transform="translate(37.524 9.908) rotate(-183 2 4)" stroke="#FFFED8" strokeWidth="3" strokeLinecap="round" />
                  </g>
                </svg>
              ) : (
                /* Default Rest Face (Forward gaze) */
                <svg
                  viewBox="0 0 41.528 32.408"
                  className="w-full h-full overflow-visible transition-all duration-200"
                  fill="none"
                >
                  <g>
                    <path d="M 18.024 20.908 L 18.024 21.908" stroke="#FFFED8" strokeWidth="3" strokeLinecap="round" />
                    <path d="M 27.024 20.908 L 27.024 21.908" stroke="#FFFED8" strokeWidth="3" strokeLinecap="round" />
                    <path d="M 22.524 21.908 L 22.524 23.408" stroke="#FFFED8" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 17.024 26.408 C 17.024 26.408 19.899 28.158 22.524 27.908 C 25.149 27.658 27.524 25.408 27.524 25.408" stroke="#FFFED8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M 0 10.5 L 1 5.5 L 8 8.5 L 8 2 L 16 7 L 16 1.5 L 23 5 L 27 0 L 29.5 6.5" transform="translate(5.524 -1.092) rotate(8 14.75 5.25)" stroke="#FFFED8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M 7.524 12.908 C 7.524 12.908 8 32.408 22.524 32.408 C 37.048 32.408 34.52 11.408 34.52 11.408" stroke="#FFFED8" strokeWidth="3" strokeLinecap="round" />
                    <path d="M 4 0.069 C -1.401 -0.911 -1.113 8.846 3.543 7.941" transform="translate(0.024 11.408) rotate(-7 2 4)" stroke="#FFFED8" strokeWidth="3" strokeLinecap="round" />
                    <path d="M 4 0.069 C -1.401 -0.911 -1.113 8.846 3.543 7.941" transform="translate(37.524 9.908) rotate(-183 2 4)" stroke="#FFFED8" strokeWidth="3" strokeLinecap="round" />
                  </g>
                </svg>
              )}
            </div>
          </Link>
        </div>

        {/* ========================================================================= */}
        {/* 2. THREE NAVIGATION LINKS: about, Work, Connect                           */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-center gap-7 sm:gap-11">
          {/* Link 1: about */}
          <NavLinkItem
            to="/about"
            label="about"
            ariaLabel="About"
            itemKey="about"
            hoveredKey={hoveredKey}
            activeKey={activeKey}
            setHoveredKey={setHoveredKey}
            ovalPath={OVAL_PATH_1}
          />

          {/* Link 2: Work */}
          <NavLinkItem
            to="/work"
            label="Work"
            ariaLabel="Work"
            itemKey="work"
            hoveredKey={hoveredKey}
            activeKey={activeKey}
            setHoveredKey={setHoveredKey}
            ovalPath={OVAL_PATH_2}
          />

          {/* Link 3: Connect */}
          <NavLinkItem
            to="/contact"
            label="Connect"
            ariaLabel="Connect"
            itemKey="connect"
            hoveredKey={hoveredKey}
            activeKey={activeKey}
            setHoveredKey={setHoveredKey}
            ovalPath={OVAL_PATH_1}
          />
        </div>
      </nav>
    </header>
  )
}

/**
 * Individual Nav Link with Hand-Sketched Animated Oval
 */
function NavLinkItem({
  to,
  label,
  ariaLabel,
  itemKey,
  hoveredKey,
  activeKey,
  setHoveredKey,
  ovalPath,
}) {
  const isHovered = hoveredKey === itemKey
  const isActive = activeKey === itemKey && !hoveredKey
  const isHighlighted = isHovered || isActive

  return (
    <Link
      to={to}
      aria-label={ariaLabel}
      onMouseEnter={() => setHoveredKey(itemKey)}
      onMouseLeave={() => setHoveredKey(null)}
      onTouchStart={() => setHoveredKey(itemKey)}
      className="relative inline-flex items-center justify-center font-hand text-[22px] sm:text-[24px] text-[#FFFED8] px-3.5 py-1 tracking-wide cursor-pointer transition-colors duration-200 outline-none"
    >
      <span className="relative z-10 select-none">{label}</span>

      {/* Irregular hand-sketched animated oval around text */}
      <svg
        viewBox="0 0 95 43"
        className="absolute -inset-x-3.5 -inset-y-2 w-[calc(100%+28px)] h-[calc(100%+16px)] pointer-events-none overflow-visible"
        aria-hidden="true"
      >
        <path
          d={ovalPath}
          fill="none"
          stroke="#FFFED8"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 215,
            strokeDashoffset: isHighlighted ? 0 : 215,
            transition:
              'stroke-dashoffset 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.2s ease',
            opacity: isHighlighted ? 1 : 0,
          }}
        />
      </svg>
    </Link>
  )
}
