import React, { useState, useEffect, useCallback } from 'react'

// Unique ID counter for sparkle instances
let sparkleId = 0

// A palette of authentic hand-drawn doodle sparkle SVG variations
function DoodleSparkleSVG({ size = 42, color = '#E4BA83', accentColor = '#F1E3CC', variant = 0 }) {
  if (variant === 1) {
    // Variant 1: Bold playful doodle with 3 sparkles & accent dots
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 52 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-[0_2px_8px_rgba(228,186,131,0.5)]"
      >
        {/* Main 4-pointed organic doodle star */}
        <path
          d="M 26 4 C 26 15, 29 22, 44 26 C 29 30, 26 37, 26 48 C 26 37, 23 30, 8 26 C 23 22, 26 15, 26 4 Z"
          fill={color}
          stroke={accentColor}
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        {/* Inner hand-drawn cross highlight */}
        <path
          d="M 26 14 L 26 38 M 14 26 L 38 26"
          stroke={accentColor}
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.75"
        />
        {/* Secondary buddy sparkle (top-right) */}
        <path
          d="M 41 7 C 41 11, 42 13, 47 14 C 42 15, 41 17, 41 21 C 41 17, 40 15, 35 14 C 40 13, 41 11, 41 7 Z"
          fill={accentColor}
          stroke={color}
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {/* Tertiary mini sparkle (bottom-left) */}
        <path
          d="M 11 36 C 11 39, 12 40, 15 41 C 12 42, 11 43, 11 46 C 11 43, 10 42, 7 41 C 10 40, 11 39, 11 36 Z"
          fill={accentColor}
          stroke={color}
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        {/* Playful hand-drawn dust dots */}
        <circle cx="10" cy="14" r="1.6" fill={color} />
        <circle cx="43" cy="40" r="1.4" fill={accentColor} />
      </svg>
    )
  }

  if (variant === 2) {
    // Variant 2: Delicate sketched fairy-dust sparkle cluster
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 52 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-[0_2px_8px_rgba(241,227,204,0.5)]"
      >
        {/* Main star: slightly tilted hand-drawn diamond */}
        <path
          d="M 26 6 C 26 16, 29 23, 42 26 C 29 29, 26 36, 26 46 C 26 36, 23 29, 10 26 C 23 23, 26 16, 26 6 Z"
          fill={accentColor}
          stroke={color}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Center core highlight */}
        <circle cx="26" cy="26" r="2.2" fill="#FFFFFF" opacity="0.9" />

        {/* Top-right sparkle */}
        <path
          d="M 40 8 C 40 12, 41 14, 46 15 C 41 16, 40 18, 40 22 C 40 18, 39 16, 34 15 C 39 14, 40 12, 40 8 Z"
          fill={color}
          stroke={accentColor}
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {/* Lower-left sparkle */}
        <path
          d="M 12 34 C 12 37, 13 38, 17 39 C 13 40, 12 41, 12 44 C 12 41, 11 40, 7 39 C 11 38, 12 37, 12 34 Z"
          fill={color}
          stroke={accentColor}
          strokeWidth="0.8"
        />
        {/* Hand-drawn tiny twinkle cross */}
        <path
          d="M 41 38 L 41 44 M 38 41 L 44 41"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M 12 14 L 12 18 M 10 16 L 14 16"
          stroke={accentColor}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  // Variant 0 (Default): Classic ✨ doodle emoji layout
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="filter drop-shadow-[0_2px_10px_rgba(228,186,131,0.6)]"
    >
      {/* Primary Central Sparkle */}
      <path
        d="M 26 5 C 26 16, 29 23, 44 26 C 29 29, 26 36, 26 47 C 26 36, 23 29, 8 26 C 23 23, 26 16, 26 5 Z"
        fill={color}
        stroke={accentColor}
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      {/* Hand-drawn organic interior star reflection */}
      <path
        d="M 26 12 C 26 19, 28 23, 37 26 C 28 29, 26 33, 26 40 C 26 33, 24 29, 15 26 C 24 23, 26 19, 26 12 Z"
        fill={accentColor}
        opacity="0.45"
      />
      {/* Upper-right buddy star */}
      <path
        d="M 41 8 C 41 12, 42 14, 47 15 C 42 16, 41 18, 41 22 C 41 18, 40 16, 35 15 C 40 14, 41 12, 41 8 Z"
        fill={accentColor}
        stroke={color}
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      {/* Lower-left buddy star */}
      <path
        d="M 12 34 C 12 37, 13 39, 16 40 C 13 41, 12 43, 12 46 C 12 43, 11 41, 8 40 C 11 39, 12 37, 12 34 Z"
        fill={accentColor}
        stroke={color}
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
      {/* Little magical dust dots */}
      <circle cx="12" cy="12" r="1.5" fill={color} />
      <circle cx="43" cy="38" r="1.8" fill={color} />
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
            color="#E4BA83"
            accentColor="#F1E3CC"
            variant={sparkle.variant}
          />
        </div>
      ))}
    </div>
  )
}
