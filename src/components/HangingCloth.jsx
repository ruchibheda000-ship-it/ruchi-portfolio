import React, { useEffect, useRef, useState, useCallback } from 'react'

const UI_UX_TYPOGRAPHY_BLOCK = [
  'USER EXPERIENCE · VISUAL HIERARCHY · AFFORDANCE · USER RESEARCH · EMPATHY · PROTOTYPE',
  'INFORMATION ARCHITECTURE · DESIGN SYSTEM · COMPONENT LIBRARY · USABILITY TESTING · UI/UX',
  'WIREFRAMING · USER JOURNEY MAP · MENTAL MODEL · COGNITIVE LOAD · DESIGN THINKING · ITERATE',
  'INTERACTION DESIGN · DESIGN TOKENS · MICROINTERACTION · HEURISTICS · FRICTIONLESS · CLARITY',
  'HUMAN CENTERED DESIGN · BEHAVIORAL DESIGN · SYSTEMS THINKING · PRODUCT STRATEGY · GRID',
  'ACCESSIBILITY · WCAG AAA · CONTRAST RATIO · TYPE SCALE · KERNING · RESPONSIVE LAYOUT',
  'USER FLOW · PROBLEM STATEMENT · PERSONA · STORYBOARD · IDEATION · DISCOVERY · VALIDATION',
  'VISUAL LANGUAGE · CREATIVE DIRECTION · MOTION DESIGN · DELIGHT · ENGAGEMENT · SIMPLICITY',
  'DESIGN LANGUAGE · CONSISTENCY · SCALABILITY · FLEXIBILITY · INTUITIVE · INCLUSIVE · ADAPTIVE',
  'QUALITATIVE RESEARCH · QUANTITATIVE DATA · TASK ANALYSIS · USABILITY METRICS · PROTOTYPING',
  'DESIGN SPRINTS · RAPID ITERATION · FEEDBACK LOOPS · PRODUCT THINKING · FEASIBLE · DESIRABLE',
  'USER CENTRIC · INFORMATION DESIGN · SPATIAL SYSTEM · ATOMIC DESIGN · FRICTIONLESS FLOW',
]

/**
 * Procedural Web Audio Engine for "Beads on a String"
 * Synthesizes short physical bead collisions (ticks & hollow clacks).
 */
class BeadAudioEngine {
  constructor() {
    this.ctx = null
    this.enabled = true
    this.lastTickTime = 0
    this.lastClackTime = 0
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  playBeadTick(intensity = 0.5, panX = 0, isClack = false) {
    if (!this.enabled || !this.ctx || this.ctx.state === 'suspended') return

    const now = performance.now()
    const minInterval = isClack ? 70 : Math.max(28, 65 - intensity * 35)
    if (isClack) {
      if (now - this.lastClackTime < minInterval) return
      this.lastClackTime = now
    } else {
      if (now - this.lastTickTime < minInterval) return
      this.lastTickTime = now
    }

    try {
      const audioTime = this.ctx.currentTime

      // Stereo Panner
      let outputNode = this.ctx.destination
      if (this.ctx.createStereoPanner) {
        const panner = this.ctx.createStereoPanner()
        const clampedPan = Math.max(-0.85, Math.min(0.85, panX))
        panner.pan.setValueAtTime(clampedPan, audioTime)
        panner.connect(outputNode)
        outputNode = panner
      }

      const masterGain = this.ctx.createGain()
      masterGain.connect(outputNode)

      const volume = Math.min(0.24, Math.max(0.03, intensity * 0.18))

      if (isClack) {
        // Deep hollow wooden/acrylic bead "clack"
        const osc = this.ctx.createOscillator()
        const filter = this.ctx.createBiquadFilter()
        const gain = this.ctx.createGain()

        const baseFreq = 480 + Math.random() * 260
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(baseFreq, audioTime)
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.55, audioTime + 0.035)

        filter.type = 'bandpass'
        filter.frequency.setValueAtTime(baseFreq * 1.15, audioTime)
        filter.Q.setValueAtTime(4.5, audioTime)

        gain.gain.setValueAtTime(volume * 1.3, audioTime)
        gain.gain.exponentialRampToValueAtTime(0.0001, audioTime + 0.038)

        osc.connect(filter)
        filter.connect(gain)
        gain.connect(masterGain)

        osc.start(audioTime)
        osc.stop(audioTime + 0.045)
      } else {
        // Crisp tactile bead "tik" / "tck"
        const baseFreq = 1600 + Math.random() * 1800
        const osc = this.ctx.createOscillator()
        const filter = this.ctx.createBiquadFilter()
        const gain = this.ctx.createGain()

        osc.type = Math.random() > 0.45 ? 'sine' : 'triangle'
        osc.frequency.setValueAtTime(baseFreq, audioTime)
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.65, audioTime + 0.016)

        filter.type = 'highpass'
        filter.frequency.setValueAtTime(1400, audioTime)

        const duration = 0.014 + Math.random() * 0.008
        gain.gain.setValueAtTime(volume, audioTime)
        gain.gain.exponentialRampToValueAtTime(0.0001, audioTime + duration)

        osc.connect(filter)
        filter.connect(gain)
        gain.connect(masterGain)

        osc.start(audioTime)
        osc.stop(audioTime + duration + 0.005)

        // Ultra-short tactile contact noise burst (3ms)
        const bufferSize = Math.max(1, Math.floor(this.ctx.sampleRate * 0.0035))
        const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
        const output = noiseBuffer.getChannelData(0)
        for (let i = 0; i < bufferSize; i++) {
          output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35))
        }

        const noise = this.ctx.createBufferSource()
        noise.buffer = noiseBuffer

        const noiseFilter = this.ctx.createBiquadFilter()
        noiseFilter.type = 'bandpass'
        noiseFilter.frequency.setValueAtTime(2600 + Math.random() * 1200, audioTime)
        noiseFilter.Q.setValueAtTime(2.2, audioTime)

        const noiseGain = this.ctx.createGain()
        noiseGain.gain.setValueAtTime(volume * 0.85, audioTime)
        noiseGain.gain.exponentialRampToValueAtTime(0.0001, audioTime + 0.004)

        noise.connect(noiseFilter)
        noiseFilter.connect(noiseGain)
        noiseGain.connect(masterGain)

        noise.start(audioTime)
      }
    } catch {
      // Graceful fallback if audio context state changes
    }
  }
}

export default function HangingCloth() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const [soundOn, setSoundOn] = useState(true)
  const [isInteracting, setIsInteracting] = useState(false)
  const audioEngineRef = useRef(null)

  // Initialize audio engine instance once
  useEffect(() => {
    audioEngineRef.current = new BeadAudioEngine()
  }, [])

  // Sync sound toggle state with engine
  useEffect(() => {
    if (audioEngineRef.current) {
      audioEngineRef.current.enabled = soundOn
    }
  }, [soundOn])

  const toggleSound = useCallback(() => {
    if (audioEngineRef.current) {
      audioEngineRef.current.init()
    }
    setSoundOn((prev) => !prev)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let width = 0
    let height = 0

    // Particle grid representing character beads
    // particles[row][col]
    let particles = []
    let rows = UI_UX_TYPOGRAPHY_BLOCK.length
    let maxCols = 0
    UI_UX_TYPOGRAPHY_BLOCK.forEach((line) => {
      if (line.length > maxCols) maxCols = line.length
    })

    // Mouse / Cursor state
    const mouse = {
      x: -9999,
      y: -9999,
      prevX: -9999,
      prevY: -9999,
      vx: 0,
      vy: 0,
      speed: 0,
      isHovering: false,
    }

    // Measure character metrics & build particle grid
    const initGrid = () => {
      if (!canvas.parentElement) return
      width = canvas.parentElement.clientWidth
      height = Math.max(340, Math.min(420, canvas.parentElement.clientHeight || 380))

      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)

      // Calculate typography size to fit gracefully
      const baseFontSize = width < 500 ? 9 : width < 768 ? 10.5 : 12.2
      const lineHeight = height / (rows + 1.2)
      const charWidth = width < 500 ? 5.4 : width < 768 ? 6.4 : 7.4
      const startY = lineHeight * 1.05

      particles = []

      for (let r = 0; r < rows; r++) {
        const line = UI_UX_TYPOGRAPHY_BLOCK[r]
        const rowParticles = []
        const totalLineWidth = line.length * charWidth
        const startX = (width - totalLineWidth) / 2

        for (let c = 0; c < line.length; c++) {
          const char = line[c]
          const x = startX + c * charWidth + charWidth / 2
          const y = startY + r * lineHeight

          rowParticles.push({
            r,
            c,
            char,
            x,
            y,
            oldX: x,
            oldY: y,
            baseX: x,
            baseY: y,
            pinX: x,
            pinY: y - lineHeight * 0.95, // Top string anchor
          })
        }
        particles.push(rowParticles)
      }
    }

    initGrid()

    // Physics parameters
    const DAMPING = 0.935
    const RESTORE_STRENGTH = 0.048
    const VERTICAL_STIFFNESS = 0.78
    const HORIZONTAL_STIFFNESS = 0.32
    const CONSTRAINT_ITERATIONS = 3
    const CURSOR_RADIUS = width < 600 ? 75 : 95

    let activeDeformationAmount = 0

    // Animation & Physics Loop
    const tick = () => {
      // 1. Calculate cursor speed and decay
      if (mouse.isHovering) {
        mouse.vx = mouse.x - mouse.prevX
        mouse.vy = mouse.y - mouse.prevY
        mouse.speed = Math.hypot(mouse.vx, mouse.vy)
        mouse.prevX = mouse.x
        mouse.prevY = mouse.y
      } else {
        mouse.vx *= 0.85
        mouse.vy *= 0.85
        mouse.speed = Math.hypot(mouse.vx, mouse.vy)
      }

      let frameMaxDisplacement = 0
      let totalKineticEnergy = 0

      // 2. Verlet Integration + Restoring Spring
      for (let r = 0; r < rows; r++) {
        const row = particles[r]
        for (let c = 0; c < row.length; c++) {
          const p = row[c]

          // Verlet velocity
          const vx = (p.x - p.oldX) * DAMPING
          const vy = (p.y - p.oldY) * DAMPING

          p.oldX = p.x
          p.oldY = p.y

          // Elastic spring pulling each bead back to its resting typographical coordinate
          const rx = (p.baseX - p.x) * RESTORE_STRENGTH
          const ry = (p.baseY - p.y) * RESTORE_STRENGTH

          p.x += vx + rx
          p.y += vy + ry

          // Track kinetic energy & displacement
          const disp = Math.hypot(p.x - p.baseX, p.y - p.baseY)
          if (disp > frameMaxDisplacement) frameMaxDisplacement = disp
          totalKineticEnergy += Math.hypot(vx, vy)
        }
      }

      // 3. Cursor Interaction (Physical Disturbance & Trailing Forces)
      if (mouse.isHovering || mouse.speed > 0.5) {
        for (let r = 0; r < rows; r++) {
          const row = particles[r]
          for (let c = 0; c < row.length; c++) {
            const p = row[c]
            const dx = p.x - mouse.x
            const dy = p.y - mouse.y
            const dist = Math.hypot(dx, dy)

            if (dist < CURSOR_RADIUS) {
              const factor = Math.pow(1 - dist / CURSOR_RADIUS, 1.6)

              // Push away (parts the bead curtain)
              const pushMag = (1 - dist / CURSOR_RADIUS) * Math.min(20, 5 + mouse.speed * 0.25)
              const nx = dx / (dist + 1e-4)
              const ny = dy / (dist + 1e-4)
              p.x += nx * pushMag * 0.35
              p.y += ny * pushMag * 0.35

              // Trailing force in the direction of cursor swipe
              if (mouse.speed > 0.2) {
                const dragAmount = Math.min(26, mouse.speed * 1.1) * factor
                p.x += (mouse.vx / (mouse.speed + 1e-3)) * dragAmount
                p.y += (mouse.vy / (mouse.speed + 1e-3)) * dragAmount
              }
            }
          }
        }
      }

      // 4. Constraint Solver (Verlet String & Bead Linkages)
      for (let iter = 0; iter < CONSTRAINT_ITERATIONS; iter++) {
        for (let r = 0; r < rows; r++) {
          const row = particles[r]
          const charDist = width < 500 ? 5.4 : width < 768 ? 6.4 : 7.4
          const rowDist = height / (rows + 1.2)

          for (let c = 0; c < row.length; c++) {
            const p = row[c]

            // Top row: connected to virtual pinned ceiling anchors
            if (r === 0) {
              const dx = p.x - p.pinX
              const dy = p.y - p.pinY
              const dist = Math.hypot(dx, dy)
              if (dist > 1e-4) {
                const diff = (dist - rowDist) / dist * 0.5 * VERTICAL_STIFFNESS
                p.x -= dx * diff
                p.y -= dy * diff
              }
            }

            // Vertical strings (beads on same vertical hanging column)
            if (r < rows - 1 && particles[r + 1][c]) {
              const pBelow = particles[r + 1][c]
              const dx = pBelow.x - p.x
              const dy = pBelow.y - p.y
              const dist = Math.hypot(dx, dy)
              if (dist > 1e-4) {
                const diff = (dist - rowDist) / dist * 0.5 * VERTICAL_STIFFNESS
                p.x += dx * diff
                p.y += dy * diff
                pBelow.x -= dx * diff
                pBelow.y -= dy * diff
              }
            }

            // Horizontal neighbors (spacing between adjacent characters)
            if (c < row.length - 1) {
              const pRight = row[c + 1]
              const dx = pRight.x - p.x
              const dy = pRight.y - p.y
              const dist = Math.hypot(dx, dy)
              if (dist > 1e-4) {
                const diff = (dist - charDist) / dist * 0.5 * HORIZONTAL_STIFFNESS
                p.x += dx * diff
                p.y += dy * diff
                pRight.x -= dx * diff
                pRight.y -= dy * diff
              }
            }
          }
        }
      }

      // 5. Audio Triggering Connected to Real Physical Motion
      activeDeformationAmount = frameMaxDisplacement
      const isMoving = mouse.speed > 1.2 || frameMaxDisplacement > 4.5
      setIsInteracting(isMoving)

      if (audioEngineRef.current && audioEngineRef.current.enabled && isMoving) {
        // Calculate collision likelihood
        const pan = width > 0 ? (mouse.x / width) * 1.7 - 0.85 : 0
        const intensity = Math.min(1, (mouse.speed * 0.05) + (frameMaxDisplacement * 0.03))

        // Trigger bead tick if velocity or deformation exceeds threshold
        if (Math.random() < Math.min(0.82, 0.25 + intensity * 0.65)) {
          const isClack = mouse.speed > 22 || frameMaxDisplacement > 24
          audioEngineRef.current.playBeadTick(intensity, pan, isClack)
        }
      }

      // 6. Render Canvas Frame (Characters as Beads on String)
      ctx.clearRect(0, 0, width, height)

      const baseFontSize = width < 500 ? 9 : width < 768 ? 10.5 : 12.2
      ctx.font = `500 ${baseFontSize}px "JetBrains Mono", "Fira Code", monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = '#18181b'

      for (let r = 0; r < rows; r++) {
        const row = particles[r]
        for (let c = 0; c < row.length; c++) {
          const p = row[c]
          if (p.char === ' ') continue

          // Compute string tilt angle from vertical neighbor
          let angle = 0
          if (r < rows - 1 && particles[r + 1][c]) {
            const pBelow = particles[r + 1][c]
            angle = Math.atan2(pBelow.x - p.x, pBelow.y - p.y)
          } else if (r > 0 && particles[r - 1][c]) {
            const pAbove = particles[r - 1][c]
            angle = Math.atan2(p.x - pAbove.x, p.y - pAbove.y)
          }

          // Clamp angle slightly for crisp typography legibility
          const clampedAngle = Math.max(-0.65, Math.min(0.65, angle))

          ctx.save()
          ctx.translate(p.x, p.y)
          if (Math.abs(clampedAngle) > 0.005) {
            ctx.rotate(clampedAngle)
          }

          // Gentle opacity enhancement during dynamic movement
          const speed = Math.hypot(p.x - p.oldX, p.y - p.oldY)
          ctx.globalAlpha = Math.min(1, 0.88 + speed * 0.04)
          ctx.fillText(p.char, 0, 0)
          ctx.restore()
        }
      }

      animationFrameId = requestAnimationFrame(tick)
    }

    animationFrameId = requestAnimationFrame(tick)

    // Mouse & Touch Event Handlers
    const updateMouse = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top

      if (mouse.prevX === -9999) {
        mouse.prevX = x
        mouse.prevY = y
      }

      mouse.x = x
      mouse.y = y
      mouse.isHovering = true

      // Initialize audio context on first direct user interaction
      if (audioEngineRef.current) {
        audioEngineRef.current.init()
      }
    }

    const handleMouseMove = (e) => {
      updateMouse(e.clientX, e.clientY)
    }

    const handleMouseEnter = (e) => {
      updateMouse(e.clientX, e.clientY)
      if (audioEngineRef.current) {
        audioEngineRef.current.init()
      }
    }

    const handleMouseLeave = () => {
      mouse.isHovering = false
      mouse.x = -9999
      mouse.y = -9999
      mouse.prevX = -9999
      mouse.prevY = -9999
    }

    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0]
        updateMouse(touch.clientX, touch.clientY)
      }
    }

    const handleTouchEnd = () => {
      handleMouseLeave()
    }

    const handleResize = () => {
      initGrid()
    }

    canvas.addEventListener('mousemove', handleMouseMove, { passive: true })
    canvas.addEventListener('mouseenter', handleMouseEnter, { passive: true })
    canvas.addEventListener('mouseleave', handleMouseLeave, { passive: true })
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true })
    canvas.addEventListener('touchstart', handleMouseEnter, { passive: true })
    canvas.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseenter', handleMouseEnter)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('touchstart', handleMouseEnter)
      canvas.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-5xl mx-auto my-12 px-3 sm:px-6"
    >
      {/* FRAME CONTAINER — 100% PRESERVED APPROVED VISUAL DESIGN */}
      <div className="relative rounded-sm p-4 sm:p-6 bg-[#c28e57] shadow-2xl border-4 sm:border-8 border-[#996531] ring-1 ring-black/20">
        <div className="relative rounded-sm bg-cork p-3 sm:p-6 overflow-hidden shadow-inner border border-[#804e22]">
          
          {/* TOP CARD BAR */}
          <div className="relative bg-[#f4ede1] text-[#281712] px-4 py-3 sm:px-6 sm:py-3.5 rounded-t-xs border-[1.5px] border-b-0 border-[#4b73b5] flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#e15554]" aria-hidden="true"></span>
              <span className="font-pixel text-xs font-bold tracking-wider uppercase text-[#281712]">
                ✦ TYPOGRAPHIC FABRIC // UI/UX SPECIMEN
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-display text-[11px] text-[#281712]/75 font-medium hidden sm:inline-block">
                Static Typographic Composition
              </span>

              {/* Functional Bead Audio Toggle in existing Pill Style */}
              <button
                type="button"
                onClick={toggleSound}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-pixel tracking-wide border border-[#281712]/40 text-[#281712]/70 bg-white/50 hover:bg-[#281712] hover:text-[#f4ede1] transition-colors cursor-pointer select-none shadow-2xs"
                title={soundOn ? 'Bead Sounds: ON (click to mute)' : 'Bead Sounds: OFF (click to unmute)'}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    soundOn ? 'bg-[#e15554] animate-pulse' : 'bg-[#281712]/30'
                  }`}
                  aria-hidden="true"
                ></span>
                <span>{soundOn ? 'SOUND ON' : 'SOUND OFF'}</span>
              </button>
            </div>
          </div>

          {/* MAIN POSTER PAPER WITH PHYSICAL INTERACTIVE TYPOGRAPHY CANVAS */}
          <div className="relative bg-[#f4ede1] text-[#281712] rounded-b-xs border-[1.5px] border-[#4b73b5] p-3 sm:p-6 overflow-hidden shadow-xl paper-crease min-h-[360px] sm:min-h-[400px] flex flex-col justify-between">
            
            {/* Top Push Pins */}
            <div className="absolute -top-2.5 left-10 push-pin z-20" aria-hidden="true"></div>
            <div className="absolute -top-2.5 right-10 push-pin z-20" aria-hidden="true"></div>

            {/* Subtle Vertical Center Crease Line (from screenshot) */}
            <div
              className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-[#281712]/10 pointer-events-none z-10"
              aria-hidden="true"
            ></div>

            {/* Canvas Rendering the String/Beads Typography */}
            <div className="w-full flex-grow flex items-center justify-center select-none py-1 relative z-20">
              <canvas
                ref={canvasRef}
                className="w-full h-[320px] sm:h-[370px] block cursor-crosshair select-none"
                style={{ touchAction: 'none' }}
                aria-label="Interactive bead-curtain typography specimen. Move cursor across text to bend and hear bead sounds."
                role="img"
              />
            </div>

            {/* Bottom Status Row */}
            <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 pt-3 px-1 text-[11px] font-pixel text-[#281712]/60 border-t border-[#281712]/15">
              <span>SPECIMEN: DENSE UI/UX & PRODUCT DESIGN VOCABULARY</span>
              <span className="flex items-center gap-1.5">
                <span>{isInteracting ? 'BEAD STRINGS: ACTIVE DEFORMATION' : 'RESTING STATE: 100% STABLE'}</span>
                <span>//</span>
                <button
                  type="button"
                  onClick={toggleSound}
                  className="hover:text-[#281712] underline cursor-pointer"
                >
                  AUDIO: {soundOn ? 'BEADS ACTIVE' : 'MUTED'}
                </button>
              </span>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
