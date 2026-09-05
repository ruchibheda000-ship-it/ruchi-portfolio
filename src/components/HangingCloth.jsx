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

  // Audio Context Ref
  const audioCtxRef = useRef(null)
  const noiseNodeRef = useRef(null)
  const filterNodeRef = useRef(null)
  const gainNodeRef = useRef(null)
  const chimeGainRef = useRef(null)
  const audioInitializedRef = useRef(false)
  const lastSoundTimeRef = useRef(0)

  // Initialize Web Audio API
  const initAudio = () => {
    if (audioInitializedRef.current) {
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume()
      }
      return
    }

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      if (!AudioContext) return
      const ctx = new AudioContext()
      audioCtxRef.current = ctx

      // 1. Procedural Noise Buffer (Fabric Rustle / Texture)
      const bufferSize = ctx.sampleRate * 2
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const output = noiseBuffer.getChannelData(0)
      let lastOut = 0.0
      for (let i = 0; i < bufferSize; i++) {
        // Pink-ish noise filter for organic textile rustle
        const white = Math.random() * 2 - 1
        output[i] = (lastOut + 0.02 * white) / 1.02
        lastOut = output[i]
        output[i] *= 3.5 // scale
      }

      const noiseSource = ctx.createBufferSource()
      noiseSource.buffer = noiseBuffer
      noiseSource.loop = true

      // Filter to shape into soft fabric swoosh
      const filter = ctx.createBiquadFilter()
      filter.type = 'bandpass'
      filter.frequency.setValueAtTime(800, ctx.currentTime)
      filter.Q.setValueAtTime(1.8, ctx.currentTime)

      // Master Gain for Rustle
      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0, ctx.currentTime)

      // Chime Master Gain
      const chimeGain = ctx.createGain()
      chimeGain.gain.setValueAtTime(0.04, ctx.currentTime)

      noiseSource.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)
      chimeGain.connect(ctx.destination)

      noiseSource.start()

      noiseNodeRef.current = noiseSource
      filterNodeRef.current = filter
      gainNodeRef.current = gain
      chimeGainRef.current = chimeGain
      audioInitializedRef.current = true
    } catch (e) {
      console.warn('Web Audio not supported or failed to initialize:', e)
    }
  }

  // Trigger Procedural Fabric Rustle & Micro-Chime
  const playFabricSound = (velocity, agitationCount) => {
    if (isMuted || !audioCtxRef.current) return
    const ctx = audioCtxRef.current
    if (ctx.state === 'suspended') {
      ctx.resume()
    }

    const now = ctx.currentTime
    const speed = Math.min(Math.max(velocity, 0), 45) // clamp speed
    if (speed < 0.8) return

    // Modulate Filter Frequency and Volume based on cursor velocity
    if (filterNodeRef.current && gainNodeRef.current) {
      const targetFreq = 400 + speed * 45 // 400Hz to ~2400Hz
      const targetVolume = Math.min(0.02 + (speed / 45) * 0.12, 0.16)

      filterNodeRef.current.frequency.cancelScheduledValues(now)
      filterNodeRef.current.frequency.linearRampToValueAtTime(targetFreq, now + 0.05)

      gainNodeRef.current.gain.cancelScheduledValues(now)
      gainNodeRef.current.gain.linearRampToValueAtTime(targetVolume, now + 0.04)
      gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, now + 0.35)
    }

    // Play subtle soft micro-harmonic flutter occasionally
    if (now - lastSoundTimeRef.current > 0.18 && speed > 5) {
      lastSoundTimeRef.current = now
      const osc = ctx.createOscillator()
      const oscGain = ctx.createGain()

      // Pentatonic / harmonic pitch based on velocity
      const pitches = [392, 440, 523.25, 587.33, 659.25, 783.99]
      const note = pitches[Math.floor(Math.random() * pitches.length)]
      osc.type = 'sine'
      osc.frequency.setValueAtTime(note, now)

      const noteVol = Math.min((speed / 45) * 0.035, 0.04)
      oscGain.gain.setValueAtTime(0.0001, now)
      oscGain.gain.linearRampToValueAtTime(noteVol, now + 0.03)
      oscGain.gain.exponentialRampToValueAtTime(0.00001, now + 0.45)

      osc.connect(oscGain)
      oscGain.connect(chimeGainRef.current || ctx.destination)

      osc.start(now)
      osc.stop(now + 0.5)
    }
  }

  // Physics Simulation & Verlet Mesh Setup
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let animationFrameId
    let width = (canvas.width = canvas.parentElement.clientWidth)
    let height = (canvas.height = 420)

    // Handle High DPI / Retina Displays
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    // Grid Dimensions
    const rows = DESIGN_TOKENS.length
    const cols = 36 // Particle columns across width
    const clothWidth = Math.min(width - 60, 780)
    const clothHeight = 270
    const startX = (width - clothWidth) / 2
    const startY = 40

    const spacingX = clothWidth / (cols - 1)
    const spacingY = clothHeight / (rows - 1)

    // Particles Setup
    const particles = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = startX + c * spacingX
        const y = startY + r * spacingY
        particles.push({
          x,
          y,
          oldX: x,
          oldY: y,
          pinned: r === 0, // Pin top row horizontally
          row: r,
          col: c,
        })
      }
    }

    // Constraints Setup
    const constraints = []
    const getIndex = (r, c) => r * cols + c

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Structural Horizontal
        if (c < cols - 1) {
          constraints.push({
            p1: particles[getIndex(r, c)],
            p2: particles[getIndex(r, c + 1)],
            dist: spacingX,
          })
        }
        // Structural Vertical
        if (r < rows - 1) {
          constraints.push({
            p1: particles[getIndex(r, c)],
            p2: particles[getIndex(r + 1, c)],
            dist: spacingY,
          })
        }
        // Diagonal Shear Constraints (Wrinkle / Fabric Stiffness)
        if (r < rows - 1 && c < cols - 1) {
          constraints.push({
            p1: particles[getIndex(r, c)],
            p2: particles[getIndex(r + 1, c + 1)],
            dist: Math.hypot(spacingX, spacingY),
          })
        }
        if (r < rows - 1 && c > 0) {
          constraints.push({
            p1: particles[getIndex(r, c)],
            p2: particles[getIndex(r + 1, c - 1)],
            dist: Math.hypot(spacingX, spacingY),
          })
        }
      }
    }

    // Mouse Tracking State
    const mouse = {
      x: -9999,
      y: -9999,
      prevX: -9999,
      prevY: -9999,
      vx: 0,
      vy: 0,
      active: false,
    }

    const handleMouseMove = (e) => {
      initAudio()
      const rect = canvas.getBoundingClientRect()
      const currentX = e.clientX - rect.left
      const currentY = e.clientY - rect.top

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

    const handleMouseLeave = () => {
      mouse.active = false
      mouse.x = -9999
      mouse.y = -9999
      mouse.prevX = -9999
      mouse.prevY = -9999
      setIsInteracting(false)
    }

    const handleTouchMove = (e) => {
      initAudio()
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect()
        const currentX = e.touches[0].clientX - rect.left
        const currentY = e.touches[0].clientY - rect.top
        mouse.vx = currentX - (mouse.prevX === -9999 ? currentX : mouse.prevX)
        mouse.vy = currentY - (mouse.prevY === -9999 ? currentY : mouse.prevY)
        mouse.x = currentX
        mouse.y = currentY
        mouse.prevX = currentX
        mouse.prevY = currentY
        mouse.active = true
      }
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true })
    canvas.addEventListener('touchend', handleMouseLeave)

    // Physics Loop Parameters
    const gravity = 0.28
    const damping = 0.985
    const brushRadius = 75
    const impulseStrength = 0.75

    // Animation Render Loop
    const tick = () => {
      // 1. Verlet Integration & Impulse forces
      let agitatedParticles = 0
      const mouseSpeed = Math.hypot(mouse.vx, mouse.vy)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        if (p.pinned) continue

        // Velocity from previous step
        const vx = (p.x - p.oldX) * damping
        const vy = (p.y - p.oldY) * damping

        p.oldX = p.x
        p.oldY = p.y

        p.x += vx
        p.y += vy + gravity

        // Cursor Interaction (Impulse & Displacement)
        if (mouse.active) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.hypot(dx, dy)

          if (dist < brushRadius) {
            agitatedParticles++
            const force = (1 - dist / brushRadius) * impulseStrength
            // Apply both mouse velocity direction and radial brush displacement
            p.x += mouse.vx * force * 0.65 + (dx / (dist || 1)) * force * 3.5
            p.y += mouse.vy * force * 0.65 + (dy / (dist || 1)) * force * 3.5
          }
        }
      }

      // Smooth mouse decay
      mouse.vx *= 0.7
      mouse.vy *= 0.7

      // Trigger Web Audio rustle if cloth is agitated
      if (agitatedParticles > 0 && mouseSpeed > 1) {
        playFabricSound(mouseSpeed, agitatedParticles)
      }

      // 2. Solve Distance Constraints (Relaxation iterations)
      const iterations = 5
      for (let iter = 0; iter < iterations; iter++) {
        for (let i = 0; i < constraints.length; i++) {
          const { p1, p2, dist } = constraints[i]
          const dx = p2.x - p1.x
          const dy = p2.y - p1.y
          const currentDist = Math.hypot(dx, dy) || 0.001
          const difference = (currentDist - dist) / currentDist

          const offsetX = dx * 0.5 * difference
          const offsetY = dy * 0.5 * difference

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

      // 3. Clear Canvas
      ctx.clearRect(0, 0, width, height)

      // 4. Render Subtle Fabric Warp & Weft Grid Mesh Lines
      ctx.save()
      ctx.lineWidth = 0.75
      ctx.strokeStyle = 'rgba(40, 23, 18, 0.07)'

      // Draw horizontal lines across cloth
      for (let r = 0; r < rows; r++) {
        ctx.beginPath()
        const start = particles[getIndex(r, 0)]
        ctx.moveTo(start.x, start.y)
        for (let c = 1; c < cols; c++) {
          const p = particles[getIndex(r, c)]
          ctx.lineTo(p.x, p.y)
        }
        ctx.stroke()
      }

      // Draw vertical lines across cloth
      for (let c = 0; c < cols; c += 2) {
        ctx.beginPath()
        const start = particles[getIndex(0, c)]
        ctx.moveTo(start.x, start.y)
        for (let r = 1; r < rows; r++) {
          const p = particles[getIndex(r, c)]
          ctx.lineTo(p.x, p.y)
        }
        ctx.stroke()
      }
      ctx.restore()

      // 5. Render Crisp Monospaced Design Tokens onto Deformed Mesh
      ctx.save()
      ctx.font = '500 11.5px "JetBrains Mono", "Fira Code", monospace'
      ctx.fillStyle = '#18181b'
      ctx.textBaseline = 'middle'

      for (let r = 0; r < rows; r++) {
        const text = DESIGN_TOKENS[r]
        const textLen = text.length

        // Interpolate character positions along row particles
        for (let charIdx = 0; charIdx < textLen; charIdx++) {
          const progress = charIdx / (textLen - 1)
          const colFloat = progress * (cols - 1)
          const colIndex = Math.floor(colFloat)
          const frac = colFloat - colIndex

          const p1 = particles[getIndex(r, colIndex)]
          const p2 = particles[getIndex(r, Math.min(colIndex + 1, cols - 1))]

          const charX = p1.x + (p2.x - p1.x) * frac
          const charY = p1.y + (p2.y - p1.y) * frac
          const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x)

          ctx.save()
          ctx.translate(charX, charY)
          ctx.rotate(angle)
          ctx.fillText(text[charIdx], 0, 0)
          ctx.restore()
        }
      }
      ctx.restore()

      // 6. Draw Top Hanging Eyelets / Pins
      ctx.save()
      const eyeletIndices = [0, Math.floor(cols * 0.25), Math.floor(cols * 0.5), Math.floor(cols * 0.75), cols - 1]
      for (const idx of eyeletIndices) {
        const p = particles[getIndex(0, idx)]
        // Pin ring shadow
        ctx.beginPath()
        ctx.arc(p.x, p.y - 2, 4.5, 0, Math.PI * 2)
        ctx.fillStyle = '#281712'
        ctx.fill()

        // Brass pin center
        ctx.beginPath()
        ctx.arc(p.x, p.y - 2, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = '#cb9559'
        ctx.fill()
      }
      ctx.restore()

      animationFrameId = requestAnimationFrame(tick)
    }

    animationFrameId = requestAnimationFrame(tick)

    // Resize Handler
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
  }, [isMuted])

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
                {isInteracting ? 'Billowing fabric...' : 'Brush cursor to swish cloth'}
              </span>

              {/* Minimal Web Audio Sound Toggle */}
              <button
                onClick={() => {
                  initAudio()
                  setIsMuted(!isMuted)
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-pixel tracking-wide border transition-colors ${
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
              <span>PHYSICS: VERLET 2D MESH (36×10 PARTICLES)</span>
              <span>SYNTHESIZED RUSTLE // NATIVE WEB AUDIO API</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
