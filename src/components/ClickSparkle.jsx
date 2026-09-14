import React, { useState, useEffect, useCallback } from 'react'

// Unique ID counter for sparkle instances
let sparkleId = 0

// A palette of authentic handmade doodle sparkle SVG variations (Strictly 3 stars, #FFBA26)
function DoodleSparkleSVG({ size = 46, color = '#FFBA26', variant = 0 }) {
  if (variant === 1) {
    // Variant 1: Sketched / Crayon-style handmade doodle (3 stars only)
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 54 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-[0_2px_10px_rgba(255,186,38,0.65)]"
      >
        {/* 1. Large Central Star - Hand-drawn organic sketch */}
        <path
          d="M 27 5.5 C 27 16, 29.5 22.5, 43.5 25.5 C 29.5 28.5, 27 35, 27 46.5 C 27 35, 24.5 28.5, 10.5 25.5 C 24.5 22.5, 27 16, 27 5.5 Z"
          fill={color}
          stroke={color}
          strokeWidth="1.6"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Handmade crayon-style inner twinkle line */}
        <path
          d="M 27 13 L 27 38 M 15 25.5 L 39 25.5"
          stroke="#FFF2C6"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* 2. Medium Star (Top-Right) */}
        <path
          d="M 42.5 6.5 C 42.5 11.5, 44 13.5, 48.5 14.5 C 44 15.5, 42.5 17.5, 42.5 22.5 C 42.5 17.5, 41 15.5, 36.5 14.5 C 41 13.5, 42.5 11.5, 42.5 6.5 Z"
          fill={color}
          stroke={color}
          strokeWidth="1.2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d="M 42.5 10 L 42.5 19 M 38.5 14.5 L 46.5 14.5"
          stroke="#FFF2C6"
          strokeWidth="0.9"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* 3. Small Star (Bottom-Left) */}
        <path
          d="M 11.5 35.5 C 11.5 39.5, 12.5 41, 16 42 C 12.5 43, 11.5 44.5, 11.5 48.5 C 11.5 44.5, 10.5 43, 7 42 C 10.5 41, 11.5 39.5, 11.5 35.5 Z"
          fill={color}
          stroke={color}
          strokeWidth="1"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  if (variant === 2) {
    // Variant 2: Slightly playful tilted hand-drawn doodle (3 stars only)
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 54 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-[0_2px_10px_rgba(255,186,38,0.65)]"
      >
        {/* 1. Large Central Star - slightly tilted organic doodle */}
        <path
          d="M 27 6 C 27.5 16, 30.5 22.5, 43 25 C 30 28.5, 27 35.5, 26.5 46 C 26 35.5, 23 28.5, 11 26 C 23.5 22.5, 26.5 16, 27 6 Z"
          fill={color}
          stroke={color}
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Soft core highlight */}
        <circle cx="27" cy="25.5" r="2.8" fill="#FFF4D0" opacity="0.9" />

        {/* 2. Medium Star (Top-Right) */}
        <path
          d="M 43 7 C 43 11.5, 44.5 13.5, 49 14.5 C 44.5 15.5, 43 17.5, 43 22 C 43 17.5, 41.5 15.5, 37 14.5 C 41.5 13.5, 43 11.5, 43 7 Z"
          fill={color}
          stroke={color}
          strokeWidth="1.2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* 3. Small Star (Bottom-Left) */}
        <path
          d="M 12 36 C 12 39.5, 13 41, 16.5 42 C 13 43, 12 44.5, 12 48 C 12 44.5, 11 43, 7.5 42 C 11 41, 12 39.5, 12 36 Z"
          fill={color}
          stroke={color}
          strokeWidth="1"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  // Variant 0 (Default): Classic ✨ Handmade 3-Star Doodle in #FFBA26
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 54 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="filter drop-shadow-[0_2px_12px_rgba(255,186,38,0.7)]"
    >
      {/* 1. Large Central Star */}
      <path
        d="M 27 5 C 27 16, 29.5 22.5, 44 25.5 C 29.5 28.5, 27 35.5, 27 47 C 27 35.5, 24.5 28.5, 10 25.5 C 24.5 22.5, 27 16, 27 5 Z"
        fill={color}
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Hand-drawn organic inner facet */}
      <path
        d="M 27 12 C 27 19, 28.5 22.5, 37 25.5 C 28.5 28.5, 27 32.5, 27 39.5 C 27 32.5, 25.5 28.5, 17 25.5 C 25.5 22.5, 27 19, 27 12 Z"
        fill="#FFE899"
        opacity="0.55"
      />

      {/* 2. Medium Star (Top-Right) */}
      <path
        d="M 42 7.5 C 42 12, 43.5 14, 48 15 C 43.5 16, 42 18, 42 22.5 C 42 18, 40.5 16, 36 15 C 40.5 14, 42 12, 42 7.5 Z"
        fill={color}
        stroke={color}
        strokeWidth="1.2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* 3. Small Star (Bottom-Left) */}
      <path
        d="M 12 35.5 C 12 39, 13 40.5, 16.5 41.5 C 13 42.5, 12 44, 12 47.5 C 12 44, 11 42.5, 7.5 41.5 C 11 40.5, 12 39, 12 35.5 Z"
        fill={color}
        stroke={color}
        strokeWidth="1"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function ClickSparkle() {
  const [sparkles, setSparkles] = useState([])

  const addSparkle = useCallback((e) => {
    // Ignore clicks if modifier keys are pressed (Ctrl/Cmd click for new tabs, etc.)
    if (e.metaKey || e.ctrlKey) return

    const x = e.clientX
    const y = e.clientY

    // Random slight rotation and scale variations for natural organic feel
    const rotation = (Math.random() - 0.5) * 36 // -18deg to +18deg
    const scale = 0.85 + Math.random() * 0.35   // 0.85 to 1.2
    const variant = Math.floor(Math.random() * 3)

    const newSparkle = {
      id: ++sparkleId,
      x,
      y,
      rotation,
      scale,
      variant,
    }

    setSparkles((prev) => {
      // Keep at most 20 concurrent sparkles for peak 60fps performance
      const trimmed = prev.length > 20 ? prev.slice(prev.length - 15) : prev
      return [...trimmed, newSparkle]
    })
  }, [])

  useEffect(() => {
    // Listen to pointerdown for instantaneous response across mouse, trackpad, and touch
    window.addEventListener('pointerdown', addSparkle, { passive: true })
    return () => {
      window.removeEventListener('pointerdown', addSparkle)
    }
  }, [addSparkle])

  const handleAnimationEnd = useCallback((id) => {
    setSparkles((prev) => prev.filter((s) => s.id !== id))
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden z-[9999]"
      aria-hidden="true"
    >
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          onAnimationEnd={() => handleAnimationEnd(sparkle.id)}
          className="absolute select-none pointer-events-none animate-doodle-sparkle"
          style={{
            left: `${sparkle.x}px`,
            top: `${sparkle.y}px`,
            '--sparkle-rot': `${sparkle.rotation}deg`,
            '--sparkle-scale': sparkle.scale,
          }}
        >
          <DoodleSparkleSVG
            size={48}
            color="#FFBA26"
            variant={sparkle.variant}
          />
        </div>
      ))}
    </div>
  )
}
