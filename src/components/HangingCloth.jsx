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
 * Pentatonic scale harmonics for miniature glass windchimes (E6 to A8).
 * Ensures every glass collision rings in magical ethereal harmony.
 */
const GLASS_CHIME_FREQUENCIES = [
  1975.53, // B6
  2349.32, // D7
  2637.02, // E7
  3135.96, // G7
  3520.00, // A7
  3951.07, // B7
  4698.63, // D8
  5274.04, // E8
  6271.93, // G8
  7040.00, // A8
  7902.13, // B8
  9397.27, // D9
]

/**
 * Procedural Web Audio Engine for "Magical Glass Windchimes & Fairy Dust Shimmer"
 * Synthesizes delicate glass windchimes and tiny crystal beads drifting, brushing, and colliding.
 * Features:
 * - 30-40% louder & punchier through dynamics compressor limiter + makeup gain (zero clipping).
 * - Ultra-crisp tactile "tik / tck / tiny clack" micro-transient (<3ms) for physical hard bead collision.
 * - Resonant singing glass bell & transverse rod harmonics (Q = 26.0 - 28.0) for pure crystal chime tones.
 * - Air shimmering fairy dust layer (high bandpass noise + micro crystal sprinkles).
 * - Natural irregularity with organic micro-chime sister collisions for lively multi-bead textures.
 */
class BeadAudioEngine {
  constructor() {
    this.ctx = null
    this.compressor = null
    this.makeupGain = null
    this.enabled = true
    this.lastChimeTime = 0
    this.lastClinkTime = 0
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
        
        // Fast transparent brickwall limiter / compressor to prevent any clipping
        this.compressor = this.ctx.createDynamicsCompressor()
        this.compressor.threshold.setValueAtTime(-15, this.ctx.currentTime)
        this.compressor.knee.setValueAtTime(4, this.ctx.currentTime)
        this.compressor.ratio.setValueAtTime(6.0, this.ctx.currentTime)
        this.compressor.attack.setValueAtTime(0.0008, this.ctx.currentTime)
        this.compressor.release.setValueAtTime(0.038, this.ctx.currentTime)

        // Makeup gain to deliver 30-40% louder perceived presence without distortion
        this.makeupGain = this.ctx.createGain()
        this.makeupGain.gain.setValueAtTime(1.38, this.ctx.currentTime)

        this.compressor.connect(this.makeupGain)
        this.makeupGain.connect(this.ctx.destination)
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  playBeadContact(intensity = 0.5, panX = 0, isClack = false, isSecondary = false) {
    if (!this.enabled || !this.ctx || this.ctx.state === 'suspended') return

    const now = performance.now()
    const minInterval = isClack ? 30 : isSecondary ? 6 : Math.max(10, 28 - intensity * 18)
    if (isClack) {
      if (now - this.lastClinkTime < minInterval) return
      this.lastClinkTime = now
    } else if (!isSecondary) {
      if (now - this.lastChimeTime < minInterval) return
      this.lastChimeTime = now
    }

    try {
      const audioTime = this.ctx.currentTime

      // Output routes through stereo panner into compressor limiter
      let outputNode = this.compressor || this.ctx.destination
      if (this.ctx.createStereoPanner) {
        const panner = this.ctx.createStereoPanner()
        const clampedPan = Math.max(-0.85, Math.min(0.85, panX + (Math.random() * 0.08 - 0.04)))
        panner.pan.setValueAtTime(clampedPan, audioTime)
        panner.connect(outputNode)
        outputNode = panner
      }

      const masterGain = this.ctx.createGain()
      masterGain.connect(outputNode)

      // 30-40% boosted perceived loudness, with dynamic scaling
      const baseVol = isSecondary ? 0.38 : 0.64
      const volume = Math.min(0.82, Math.max(0.12, intensity * baseVol))

      // Pick a random pitch from the magical glass wind chime harmonic scale with micro-detune
      const pitchIdx = Math.floor(Math.random() * GLASS_CHIME_FREQUENCIES.length)
      const detuneFactor = Math.pow(2, (Math.random() * 32 - 16) / 1200) // ±16 cents organic variation
      const baseFreq = GLASS_CHIME_FREQUENCIES[pitchIdx] * detuneFactor

      // -------------------------------------------------------------
      // LAYER 1: TACTILE HARD BEAD / ROD IMPACT SNAP ("tik / tck / tiny clack")
      // -------------------------------------------------------------
      // High-speed frequency drop (<2.8ms) provides the physical contact bite
      const oscTik = this.ctx.createOscillator()
      const gainTik = this.ctx.createGain()
      oscTik.type = 'sine'
      const tikStart = isClack ? 7600 : 6200 + Math.random() * 1200
      const tikEnd = isClack ? 2400 : 1900 + Math.random() * 700
      oscTik.frequency.setValueAtTime(tikStart, audioTime)
      oscTik.frequency.exponentialRampToValueAtTime(tikEnd, audioTime + 0.0026)

      gainTik.gain.setValueAtTime(volume * (isClack ? 1.5 : 1.15), audioTime)
      gainTik.gain.exponentialRampToValueAtTime(0.0001, audioTime + 0.0032)

      oscTik.connect(gainTik)
      gainTik.connect(masterGain)
      oscTik.start(audioTime)
      oscTik.stop(audioTime + 0.0036)

      // Micro-noise click spike for tactile bead surface clack
      const clickLen = Math.max(1, Math.floor(this.ctx.sampleRate * 0.0022))
      const clickBuf = this.ctx.createBuffer(1, clickLen, this.ctx.sampleRate)
      const clickData = clickBuf.getChannelData(0)
      for (let i = 0; i < clickLen; i++) {
        clickData[i] = (Math.random() * 2 - 1) * (1 - i / clickLen)
      }
      const clickSrc = this.ctx.createBufferSource()
      clickSrc.buffer = clickBuf

      const clickFilter = this.ctx.createBiquadFilter()
      clickFilter.type = 'highpass'
      clickFilter.frequency.setValueAtTime(4200 + Math.random() * 1600, audioTime)

      const clickGain = this.ctx.createGain()
      clickGain.gain.setValueAtTime(volume * 1.05, audioTime)
      clickGain.gain.exponentialRampToValueAtTime(0.0001, audioTime + 0.0024)

      clickSrc.connect(clickFilter)
      clickFilter.connect(clickGain)
      clickGain.connect(masterGain)
      clickSrc.start(audioTime)

      // -------------------------------------------------------------
      // LAYER 2: RESONANT SINGING GLASS CHIME BELL TONE
      // -------------------------------------------------------------
      const oscChime = this.ctx.createOscillator()
      const filterChime = this.ctx.createBiquadFilter()
      const gainChime = this.ctx.createGain()

      oscChime.type = 'sine'
      oscChime.frequency.setValueAtTime(baseFreq, audioTime)
      oscChime.frequency.exponentialRampToValueAtTime(baseFreq * 0.985, audioTime + 0.045)

      filterChime.type = 'bandpass'
      filterChime.frequency.setValueAtTime(baseFreq, audioTime)
      filterChime.Q.setValueAtTime(26.0, audioTime) // Rich resonant glass ring

      const ringDuration = isClack ? (0.042 + Math.random() * 0.024) : (0.026 + Math.random() * 0.018)
      gainChime.gain.setValueAtTime(volume * 1.4, audioTime)
      gainChime.gain.exponentialRampToValueAtTime(0.0001, audioTime + ringDuration)

      oscChime.connect(filterChime)
      filterChime.connect(gainChime)
      gainChime.connect(masterGain)
      oscChime.start(audioTime)
      oscChime.stop(audioTime + ringDuration + 0.005)

      // -------------------------------------------------------------
      // LAYER 3: TRANSVERSE HARMONIC OVERTONE (Rod collision mode ~2.76x)
      // -------------------------------------------------------------
      const oscOvertone = this.ctx.createOscillator()
      const filterOvertone = this.ctx.createBiquadFilter()
      const gainOvertone = this.ctx.createGain()

      const overtoneFreq = Math.min(11000, baseFreq * (2.74 + Math.random() * 0.04))
      oscOvertone.type = 'sine'
      oscOvertone.frequency.setValueAtTime(overtoneFreq, audioTime)

      filterOvertone.type = 'bandpass'
      filterOvertone.frequency.setValueAtTime(overtoneFreq, audioTime)
      filterOvertone.Q.setValueAtTime(28.0, audioTime)

      const overtoneDuration = ringDuration * 0.75
      gainOvertone.gain.setValueAtTime(volume * 0.95, audioTime)
      gainOvertone.gain.exponentialRampToValueAtTime(0.0001, audioTime + overtoneDuration)

      oscOvertone.connect(filterOvertone)
      filterOvertone.connect(gainOvertone)
      gainOvertone.connect(masterGain)
      oscOvertone.start(audioTime)
      oscOvertone.stop(audioTime + overtoneDuration + 0.005)

      // -------------------------------------------------------------
      // LAYER 4: FAIRY DUST SHIMMER & GENTLE BREEZE TEXTURE
      // -------------------------------------------------------------
      const dustLen = Math.max(1, Math.floor(this.ctx.sampleRate * 0.006))
      const dustBuf = this.ctx.createBuffer(1, dustLen, this.ctx.sampleRate)
      const dustData = dustBuf.getChannelData(0)
      for (let i = 0; i < dustLen; i++) {
        dustData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (dustLen * 0.28))
      }

      const dustSrc = this.ctx.createBufferSource()
      dustSrc.buffer = dustBuf

      const dustFilter = this.ctx.createBiquadFilter()
      dustFilter.type = 'bandpass'
      dustFilter.frequency.setValueAtTime(6000 + Math.random() * 3200, audioTime)
      dustFilter.Q.setValueAtTime(3.8, audioTime)

      const dustGain = this.ctx.createGain()
      dustGain.gain.setValueAtTime(volume * 0.98, audioTime)
      dustGain.gain.exponentialRampToValueAtTime(0.0001, audioTime + 0.007)

      dustSrc.connect(dustFilter)
      dustFilter.connect(dustGain)
      dustGain.connect(masterGain)
      dustSrc.start(audioTime)

      // -------------------------------------------------------------
      // NATURAL ORGANIC IRREGULARITY: SISTER MICRO-CLACK (40% chance)
      // Creates the authentic sound of multiple tiny beads clattering
      // rather than an isolated click.
      // -------------------------------------------------------------
      if (!isSecondary && Math.random() < 0.42) {
        setTimeout(() => {
          if (this.enabled && this.ctx && this.ctx.state === 'running') {
            this.playBeadContact(
              intensity * 0.72,
              panX + (Math.random() * 0.1 - 0.05),
              false,
              true
            )
          }
        }, 4 + Math.random() * 7)
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
  const [hasFabricContact, setHasFabricContact] = useState(false)
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

    // Audio excitation accumulator
    let contactAccumulator = 0
    let nextTriggerThreshold = 9 + Math.random() * 8

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
            isSpace: char === ' ',
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
    const CURSOR_PHYSICS_RADIUS = width < 600 ? 75 : 95
    const CONTACT_AUDIO_RADIUS = 30 // Tight localized contact radius for audio excitation

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
        }
      }

      // 3. Contact Detection (Strictly identifying particles touching the cursor)
      const contactParticles = []
      let contactKineticEnergy = 0
      let contactMaxDisplacement = 0
      let contactAvgX = 0

      if (mouse.isHovering) {
        for (let r = 0; r < rows; r++) {
          const row = particles[r]
          for (let c = 0; c < row.length; c++) {
            const p = row[c]
            const dx = p.x - mouse.x
            const dy = p.y - mouse.y
            const dist = Math.hypot(dx, dy)

            // Physics deformation within wider radius
            if (dist < CURSOR_PHYSICS_RADIUS) {
              const factor = Math.pow(1 - dist / CURSOR_PHYSICS_RADIUS, 1.6)

              // Push away (parts the bead curtain)
              const pushMag = (1 - dist / CURSOR_PHYSICS_RADIUS) * Math.min(20, 5 + mouse.speed * 0.25)
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

            // Direct Physical Contact for Audio (strictly non-space characters within contact radius)
            if (!p.isSpace && dist < CONTACT_AUDIO_RADIUS) {
              contactParticles.push(p)
              const pSpeed = Math.hypot(p.x - p.oldX, p.y - p.oldY)
              contactKineticEnergy += pSpeed
              const pDisp = Math.hypot(p.x - p.baseX, p.y - p.baseY)
              if (pDisp > contactMaxDisplacement) contactMaxDisplacement = pDisp
              contactAvgX += p.x
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

      // 5. Strictly Contact-Coupled Audio Triggering
      // RULE: NO CONTACT -> COMPLETE SILENCE
      const hasContact = contactParticles.length > 0
      setHasFabricContact(hasContact)

      if (!hasContact) {
        // Cursor is outside typography or in blank margins -> complete silence
        contactAccumulator = 0
      } else if (audioEngineRef.current && audioEngineRef.current.enabled) {
        contactAvgX /= contactParticles.length
        const avgParticleSpeed = contactKineticEnergy / contactParticles.length
        const cursorSpeed = mouse.speed

        // Audio excitation increases with cursor speed and local particle movement
        const contactActivity = (cursorSpeed * 0.72) + (avgParticleSpeed * 0.48)

        if (contactActivity > 0.22) {
          contactAccumulator += contactActivity

          if (contactAccumulator >= nextTriggerThreshold) {
            contactAccumulator = 0
            // Dynamic irregular timing: faster sweeps create denser clusters, slow dragging is spaced & airy
            const speedFactor = Math.min(5, cursorSpeed * 0.22)
            nextTriggerThreshold = Math.max(3.5, 7.5 - speedFactor + Math.random() * 7.5)

            const pan = width > 0 ? (contactAvgX / width) * 1.7 - 0.85 : 0
            const intensity = Math.min(1, 0.24 + (cursorSpeed * 0.045) + (contactMaxDisplacement * 0.042))
            const isClack = (cursorSpeed > 14 && contactMaxDisplacement > 8) || contactMaxDisplacement > 20

            // Primary hard bead contact
            audioEngineRef.current.playBeadContact(intensity, pan, isClack, false)

            // Dynamic cascading flurries (like beads tumbling against each other in a bowl)
            if (cursorSpeed > 4.0) {
              // 1st micro-bead collision (quick tumble)
              setTimeout(() => {
                if (audioEngineRef.current && audioEngineRef.current.enabled && mouse.isHovering) {
                  audioEngineRef.current.playBeadContact(
                    intensity * 0.82,
                    pan + (Math.random() * 0.08 - 0.04),
                    false,
                    true
                  )
                }
              }, 9 + Math.random() * 12)

              // 2nd micro-bead clatter on faster sweeps
              if (cursorSpeed > 8.5) {
                setTimeout(() => {
                  if (audioEngineRef.current && audioEngineRef.current.enabled && mouse.isHovering) {
                    audioEngineRef.current.playBeadContact(
                      intensity * 0.68,
                      pan + (Math.random() * 0.12 - 0.06),
                      false,
                      true
                    )
                  }
                }, 22 + Math.random() * 16)
              }

              // 3rd light trailing bead skitter
              if (cursorSpeed > 14) {
                setTimeout(() => {
                  if (audioEngineRef.current && audioEngineRef.current.enabled && mouse.isHovering) {
                    audioEngineRef.current.playBeadContact(
                      intensity * 0.52,
                      pan + (Math.random() * 0.14 - 0.07),
                      false,
                      true
                    )
                  }
                }, 38 + Math.random() * 20)
              }
            }
          }
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
          if (p.isSpace) continue

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
                <span>{hasFabricContact ? 'BEAD STRINGS: ACTIVE CONTACT' : 'RESTING STATE: 100% STABLE'}</span>
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
