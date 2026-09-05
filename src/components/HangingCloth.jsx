import { useEffect, useRef, useState } from 'react'

const DESIGN_TOKENS = [
  '--design-system: "atomic"; --contrast-ratio: 4.5:1; --grid-columns: 12;',
  '--typography: "responsive"; --kerning: -0.02em; --font-optical-sizing: auto;',
  '--user-journey: "frictionless"; --hierarchy: "visual"; --affordance: true;',
  '--touch-target-min: 44px; --baseline-grid: 8px; --heuristics: "validated";',
  '--ease-fluid: cubic-bezier(0.25, 1, 0.5, 1); --micro-interaction: 180ms;',
  '--color-space: oklch(0.85 0.12 65); --surface-elevation: "paper-drop";',
  '--cognitive-load: "minimized"; --wcag-compliance: "AAA"; --layout: "adaptive";',
  '--fitts-law: "optimized"; --mental-model: "coherent"; --design-tokens: true;',
  '--gestalt-proximity: 16px; --state-machine: "deterministic"; --svg-precision: 0.1;',
  '--interaction-fidelity: "high"; --framerate: 60fps; --render-pipeline: "canvas";'
]

export default function HangingCloth() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const [isMuted, setIsMuted] = useState(false)
  const [isInteracting, setIsInteracting] = useState(false)

  // Web Audio Refs
  const audioCtxRef = useRef(null)
  const noiseSourceRef = useRef(null)
  const filterNodeRef = useRef(null)
  const bandpassNodeRef = useRef(null)
  const gainNodeRef = useRef(null)
  const audioInitializedRef = useRef(false)
  const isMutedRef = useRef(false)

  // Sync ref with state
  useEffect(() => {
    isMutedRef.current = isMuted
    if (isMuted && gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(0, audioCtxRef.current.currentTime)
    }
  }, [isMuted])

  // Bulletproof AudioContext initialization & resumption on any user gesture
  const ensureAudioReady = () => {
    if (!audioInitializedRef.current) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext
        if (!AudioContext) return
        const ctx = new AudioContext()
        audioCtxRef.current = ctx

        // Create high quality 3-second looped organic pink/textile noise buffer
        const bufferSize = ctx.sampleRate * 3
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
        const output = noiseBuffer.getChannelData(0)

        // Paul Kellet filtered pink noise algorithm for soft natural textile rustle
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1
          b0 = 0.99886 * b0 + white * 0.0555179
          b1 = 0.99332 * b1 + white * 0.0750759
          b2 = 0.96900 * b2 + white * 0.1538520
          b3 = 0.86650 * b3 + white * 0.3104856
          b4 = 0.55000 * b4 + white * 0.5329522
          b5 = -0.7616 * b5 - white * 0.0168980
          output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.14
          b6 = white * 0.115926
        }

        const noiseSource = ctx.createBufferSource()
        noiseSource.buffer = noiseBuffer
        noiseSource.loop = true

        // Lowpass filter modulates with brush speed (airy swish)
        const lowpass = ctx.createBiquadFilter()
        lowpass.type = 'lowpass'
        lowpass.frequency.setValueAtTime(450, ctx.currentTime)
        lowpass.Q.setValueAtTime(0.7, ctx.currentTime)

        // Subtle bandpass filter for organic textile friction resonance
        const bandpass = ctx.createBiquadFilter()
        bandpass.type = 'bandpass'
        bandpass.frequency.setValueAtTime(650, ctx.currentTime)
        bandpass.Q.setValueAtTime(1.1, ctx.currentTime)

        // Master Gain Node
        const masterGain = ctx.createGain()
        masterGain.gain.setValueAtTime(0, ctx.currentTime)

        // Connect audio graph
        noiseSource.connect(lowpass)
        lowpass.connect(bandpass)
        bandpass.connect(masterGain)
        masterGain.connect(ctx.destination)

        noiseSource.start()

        noiseSourceRef.current = noiseSource
        filterNodeRef.current = lowpass
        bandpassNodeRef.current = bandpass
        gainNodeRef.current = masterGain
        audioInitializedRef.current = true
      } catch (err) {
        console.warn('AudioContext initialization deferred:', err)
      }
    }

    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {})
    }
  }

  // Modulate tactile fabric rustle sound based on pointer velocity
  const triggerFabricRustle = (velocity) => {
    if (isMutedRef.current || !audioCtxRef.current || !gainNodeRef.current) return
    const ctx = audioCtxRef.current
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {})
      return
    }

    const now = ctx.currentTime
    const speed = Math.min(Math.max(velocity, 0), 65) // clamp velocity
    if (speed < 0.6) return

    const normalized = Math.min(speed / 35, 1.0)
    // Tactile, soft, non-intrusive fabric volume
    const targetGain = 0.04 + normalized * 0.22
    // Cutoff expands from warm muffled friction (350Hz) to airy fabric wave (1800Hz)
    const targetFreq = 380 + normalized * 1450

    try {
      if (filterNodeRef.current) {
        filterNodeRef.current.frequency.setTargetAtTime(targetFreq, now, 0.035)
      }
      if (gainNodeRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(targetGain, now, 0.03)
        // Gentle decay as hand slows down or stops
        gainNodeRef.current.gain.setTargetAtTime(0.0001, now + 0.09, 0.1)
      }
    } catch {
      // safe fallback
    }
  }

  // Set up user gesture listeners to unlock AudioContext immediately
  useEffect(() => {
    const handleUserGesture = () => {
      ensureAudioReady()
    }

    window.addEventListener('pointerdown', handleUserGesture, { passive: true })
    window.addEventListener('click', handleUserGesture, { passive: true })
    window.addEventListener('touchstart', handleUserGesture, { passive: true })

    return () => {
      window.removeEventListener('pointerdown', handleUserGesture)
      window.removeEventListener('click', handleUserGesture)
      window.removeEventListener('touchstart', handleUserGesture)
    }
  }, [])

  // Physics Simulation & Continuous Mesh Text Warping
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let animationFrameId
    let width = (canvas.width = canvas.parentElement.clientWidth)
    let height = (canvas.height = 420)

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    // Cloth Mesh Resolution
    const cols = 26
    const rows = 14
    const clothWidth = Math.min(width - 50, 780)
    const clothHeight = 280
    const startX = (width - clothWidth) / 2
    const startY = 36

    const spacingX = clothWidth / (cols - 1)
    const spacingY = clothHeight / (rows - 1)

    // Generate Offscreen Texture Canvas for Text (Drawn Once)
    const offscreen = document.createElement('canvas')
    const offCtx = offscreen.getContext('2d')
    offscreen.width = Math.round(clothWidth * dpr)
    offscreen.height = Math.round(clothHeight * dpr)
    offCtx.scale(dpr, dpr)

    // Render Clean Monospaced Text Texture
    offCtx.clearRect(0, 0, clothWidth, clothHeight)
    offCtx.font = '500 12px "JetBrains Mono", "Fira Code", monospace'
    offCtx.fillStyle = '#18181b'
    offCtx.textBaseline = 'middle'

    const textLineSpacing = clothHeight / DESIGN_TOKENS.length
    for (let i = 0; i < DESIGN_TOKENS.length; i++) {
      const lineY = i * textLineSpacing + textLineSpacing * 0.5
      offCtx.fillText(DESIGN_TOKENS[i], 12, lineY)
    }

    // Initialize Particles
    const particles = []
    const getIndex = (r, c) => r * cols + c

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = startX + c * spacingX
        const y = startY + r * spacingY
        particles.push({
          x,
          y,
          oldX: x,
          oldY: y,
          origX: x,
          origY: y,
          pinned: r === 0, // Top edge pinned horizontally
          u: (c / (cols - 1)) * offscreen.width,
          v: (r / (rows - 1)) * offscreen.height,
        })
      }
    }

    // Constraints (Structural, Shear, and Bending for smooth continuous cloth)
    const constraints = []

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Horizontal Structural
        if (c < cols - 1) {
          constraints.push({
            p1: particles[getIndex(r, c)],
            p2: particles[getIndex(r, c + 1)],
            dist: spacingX,
            stiffness: 0.95,
          })
        }
        // Vertical Structural
        if (r < rows - 1) {
          constraints.push({
            p1: particles[getIndex(r, c)],
            p2: particles[getIndex(r + 1, c)],
            dist: spacingY,
            stiffness: 0.95,
          })
        }
        // Diagonal Shear (Resists excessive skewing)
        if (r < rows - 1 && c < cols - 1) {
          constraints.push({
            p1: particles[getIndex(r, c)],
            p2: particles[getIndex(r + 1, c + 1)],
            dist: Math.hypot(spacingX, spacingY),
            stiffness: 0.45,
          })
        }
        if (r < rows - 1 && c > 0) {
          constraints.push({
            p1: particles[getIndex(r, c)],
            p2: particles[getIndex(r + 1, c - 1)],
            dist: Math.hypot(spacingX, spacingY),
            stiffness: 0.45,
          })
        }
        // Bending Constraints (Ensures continuous curvature & prevents creasing)
        if (c < cols - 2) {
          constraints.push({
            p1: particles[getIndex(r, c)],
            p2: particles[getIndex(r, c + 2)],
            dist: spacingX * 2,
            stiffness: 0.3,
          })
        }
        if (r < rows - 2) {
          constraints.push({
            p1: particles[getIndex(r, c)],
            p2: particles[getIndex(r + 2, c)],
            dist: spacingY * 2,
            stiffness: 0.3,
          })
        }
      }
    }

    // Mouse Tracking
    const mouse = {
      x: -9999,
      y: -9999,
      prevX: -9999,
      prevY: -9999,
      vx: 0,
      vy: 0,
      active: false,
    }

    const updateMouse = (clientX, clientY) => {
      ensureAudioReady()
      const rect = canvas.getBoundingClientRect()
      const currentX = clientX - rect.left
      const currentY = clientY - rect.top

      if (mouse.prevX === -9999) {
        mouse.prevX = currentX
        mouse.prevY = currentY
      }

      mouse.vx = currentX - mouse.prevX
      mouse.vy = currentY - mouse.prevY
      mouse.x = currentX
      mouse.y = currentY
      mouse.prevX = currentX
      mouse.prevY = currentY
      mouse.active = true
      setIsInteracting(true)
    }

    const handleMouseMove = (e) => updateMouse(e.clientX, e.clientY)
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        updateMouse(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    const handleMouseLeave = () => {
      mouse.active = false
      mouse.x = -9999
      mouse.y = -9999
      mouse.prevX = -9999
      mouse.prevY = -9999
      setIsInteracting(false)
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true })
    canvas.addEventListener('touchend', handleMouseLeave)

    // Physics Loop Variables
    const gravity = 0.22
    const damping = 0.97
    const baseRadius = 95

    // Helper: Fast Affine Texture-Mapped Triangle with 0.5px subpixel seam overlap
    const drawTexturedTriangle = (
      targetCtx,
      img,
      x0, y0,
      x1, y1,
      x2, y2,
      u0, v0,
      u1, v1,
      u2, v2
    ) => {
      const denom = u0 * (v1 - v2) - u1 * (v0 - v2) + u2 * (v0 - v1)
      if (denom === 0) return

      targetCtx.save()

      // Expand clip slightly from triangle center to prevent subpixel seams
      const cx = (x0 + x1 + x2) / 3
      const cy = (y0 + y1 + y2) / 3
      const delta = 0.025

      targetCtx.beginPath()
      targetCtx.moveTo(x0 + (x0 - cx) * delta, y0 + (y0 - cy) * delta)
      targetCtx.lineTo(x1 + (x1 - cx) * delta, y1 + (y1 - cy) * delta)
      targetCtx.lineTo(x2 + (x2 - cx) * delta, y2 + (y2 - cy) * delta)
      targetCtx.closePath()
      targetCtx.clip()

      // Affine transform matrix
      const a = (x0 * (v1 - v2) - x1 * (v0 - v2) + x2 * (v0 - v1)) / denom
      const b = (y0 * (v1 - v2) - y1 * (v0 - v2) + y2 * (v0 - v1)) / denom
      const c = (u0 * (x2 - x1) + u1 * (x0 - x2) + u2 * (x1 - x0)) / denom
      const d = (u0 * (y2 - y1) + u1 * (y0 - y2) + u2 * (y1 - y0)) / denom
      const e = (u0 * (v2 * x1 - v1 * x2) + v0 * (u1 * x2 - u2 * x1) + (u2 * v1 - u1 * v2) * x0) / denom
      const f = (u0 * (v2 * y1 - v1 * y2) + v0 * (u1 * y2 - u2 * y1) + (u2 * v1 - u1 * v2) * y0) / denom

      targetCtx.transform(a, b, c, d, e, f)
      targetCtx.drawImage(img, 0, 0)
      targetCtx.restore()
    }

    // Main Animation Loop
    const tick = () => {
      const mouseSpeed = Math.hypot(mouse.vx, mouse.vy)
      // Dynamic brush radius scales with cursor speed like a sweeping hand
      const brushRadius = baseRadius + Math.min(mouseSpeed * 1.8, 65)

      // 1. Verlet Integration & Velocity-Based Hand Impulse
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        if (p.pinned) continue

        const vx = (p.x - p.oldX) * damping
        const vy = (p.y - p.oldY) * damping

        p.oldX = p.x
        p.oldY = p.y

        p.x += vx
        p.y += vy + gravity

        // Subtle elastic home-restoring force guarantees perfect settling
        p.x += (p.origX - p.x) * 0.015
        p.y += (p.origY - p.y) * 0.015

        // Cursor Force (Brushing hand physics)
        if (mouse.active) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.hypot(dx, dy)

          if (dist < brushRadius) {
            // Smooth Hermite distance falloff (0 at edge, 1 at center)
            const t = 1 - dist / brushRadius
            const smooth = t * t * (3 - 2 * t)

            // Directional momentum drag along mouse direction
            const dragForce = 0.75 * smooth
            p.x += mouse.vx * dragForce
            p.y += mouse.vy * dragForce

            // Subtle outward displacement push to billow the cloth
            const pushMag = Math.min(mouseSpeed * 0.25 + 2.0, 14.0) * smooth
            p.x += (dx / (dist || 1)) * pushMag
            p.y += (dy / (dist || 1)) * pushMag
          }
        }
      }

      // Smooth mouse velocity decay
      mouse.vx *= 0.65
      mouse.vy *= 0.65

      // Trigger Web Audio rustle if moving
      if (mouseSpeed > 0.8 && mouse.active) {
        triggerFabricRustle(mouseSpeed)
      }

      // 2. Solve Distance Constraints (8 relaxation passes for smooth fabric wave propagation)
      const iterations = 8
      for (let iter = 0; iter < iterations; iter++) {
        for (let i = 0; i < constraints.length; i++) {
          const { p1, p2, dist, stiffness } = constraints[i]
          const dx = p2.x - p1.x
          const dy = p2.y - p1.y
          const currentDist = Math.hypot(dx, dy) || 0.001
          const difference = (currentDist - dist) / currentDist

          const offsetX = dx * 0.5 * difference * stiffness
          const offsetY = dy * 0.5 * difference * stiffness

          if (!p1.pinned) {
            p1.x += offsetX
            p1.y += offsetY
          }
          if (!p2.pinned) {
            p2.x -= offsetX
            p2.y -= offsetY
          }
        }
      }

      // 3. Render Canvas
      ctx.clearRect(0, 0, width, height)

      // 4. Warp & Render the Entire Text Fabric through the Deformed Mesh
      for (let r = 0; r < rows - 1; r++) {
        for (let c = 0; c < cols - 1; c++) {
          const p00 = particles[getIndex(r, c)]
          const p10 = particles[getIndex(r, c + 1)]
          const p01 = particles[getIndex(r + 1, c)]
          const p11 = particles[getIndex(r + 1, c + 1)]

          // Triangle 1: Top-Left half of quad
          drawTexturedTriangle(
            ctx,
            offscreen,
            p00.x, p00.y,
            p10.x, p10.y,
            p01.x, p01.y,
            p00.u, p00.v,
            p10.u, p10.v,
            p01.u, p01.v
          )

          // Triangle 2: Bottom-Right half of quad
          drawTexturedTriangle(
            ctx,
            offscreen,
            p10.x, p10.y,
            p11.x, p11.y,
            p01.x, p01.y,
            p10.u, p10.v,
            p11.u, p11.v,
            p01.u, p01.v
          )
        }
      }

      // 5. Draw Hanging Brass Eyelets Along Top Pinned Edge
      ctx.save()
      const eyeletCols = [0, Math.floor(cols * 0.25), Math.floor(cols * 0.5), Math.floor(cols * 0.75), cols - 1]
      for (const colIdx of eyeletCols) {
        const p = particles[getIndex(0, colIdx)]
        // Shadow ring
        ctx.beginPath()
        ctx.arc(p.x, p.y - 2, 4.5, 0, Math.PI * 2)
        ctx.fillStyle = '#281712'
        ctx.fill()

        // Brass pin
        ctx.beginPath()
        ctx.arc(p.x, p.y - 2, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = '#cb9559'
        ctx.fill()
      }
      ctx.restore()

      animationFrameId = requestAnimationFrame(tick)
    }

    animationFrameId = requestAnimationFrame(tick)

    const handleResize = () => {
      width = canvas.parentElement.clientWidth
      height = 420
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('touchend', handleMouseLeave)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-5xl mx-auto my-12 px-3 sm:px-6"
    >
      {/* FRAME CONTAINER */}
      <div className="relative rounded-sm p-4 sm:p-6 bg-[#c28e57] shadow-2xl border-4 sm:border-8 border-[#996531] ring-1 ring-black/20">
        <div className="relative rounded-sm bg-cork p-3 sm:p-6 overflow-hidden shadow-inner border border-[#804e22]">
          
          {/* TOP CARD BAR */}
          <div className="relative bg-[#f4ede1] text-[#281712] px-4 py-3 sm:px-6 sm:py-3.5 rounded-t-xs border-[1.5px] border-b-0 border-[#4b73b5] flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#e15554] animate-ping"></span>
              <span className="font-pixel text-xs font-bold tracking-wider uppercase text-[#281712]">
                ✦ VERLET CLOTH // DESIGN TOKENS
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Interaction Hint */}
              <span className="hidden sm:inline-block font-display text-[11px] text-[#281712]/75 font-medium">
                {isInteracting ? 'Billowing fabric...' : 'Brush cursor across text to wave'}
              </span>

              {/* Minimal Web Audio Sound Toggle */}
              <button
                type="button"
                onClick={() => {
                  ensureAudioReady()
                  setIsMuted(!isMuted)
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-pixel tracking-wide border transition-colors cursor-pointer ${
                  isMuted
                    ? 'border-[#281712]/30 text-[#281712]/60 hover:border-[#281712]'
                    : 'border-[#281712] bg-[#281712] text-[#f4ede1] shadow-2xs'
                }`}
                title={isMuted ? 'Unmute fabric sound' : 'Mute fabric sound'}
              >
                {isMuted ? (
                  <>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                      <line x1="23" y1="9" x2="17" y2="15"></line>
                      <line x1="17" y1="9" x2="23" y2="15"></line>
                    </svg>
                    <span>MUTED</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                    </svg>
                    <span>SOUND ON</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* CANVAS MOUNTED ON POSTER PAPER */}
          <div className="relative bg-[#f4ede1] text-[#281712] rounded-b-xs border-[1.5px] border-[#4b73b5] p-2 sm:p-4 overflow-hidden shadow-xl paper-crease">
            
            {/* Top Push Pins */}
            <div className="absolute -top-2.5 left-10 push-pin z-20"></div>
            <div className="absolute -top-2.5 right-10 push-pin z-20"></div>

            {/* Canvas */}
            <canvas
              ref={canvasRef}
              className="w-full h-[380px] sm:h-[420px] block cursor-grab active:cursor-grabbing select-none"
              style={{ touchAction: 'none' }}
            />

            {/* Bottom Status Row */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 text-[11px] font-pixel text-[#281712]/60 border-t border-[#281712]/15">
              <span>PHYSICS: VERLET 2D MESH (CONTINUOUS FABRIC WARP)</span>
              <span>SYNTHESIZED RUSTLE // NATIVE WEB AUDIO API</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
