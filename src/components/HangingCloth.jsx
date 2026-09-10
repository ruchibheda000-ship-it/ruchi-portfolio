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
 * Celestial scale harmonics for miniature glass crystal beads (C7 to C9).
 * Tuned to ethereal high intervals for crystalline clinks and fairy dust.
 */
const GLASS_BEAD_FREQUENCIES = [
  2093.00, // C7
  2349.32, // D7
  2637.02, // E7
  3135.96, // G7
  3520.00, // A7
  4186.01, // C8
  4698.63, // D8
  5274.04, // E8
  6271.93, // G8
  7040.00, // A8
  8372.02, // C9
]

/**
 * Procedural Web Audio Engine for "Sparkly Glass Beads in a Shallow Bowl"
 * Synthesizes small sparkly glass beads brushed, dragged, and lightly clinked together.
 * Features:
 * - 30-40% louder & punchier through dynamics compressor limiter + makeup gain (zero clipping).
 * - Tactile hard bead collision transient ("tik / tck / tiny clack") for physical impact bite.
 * - Resonant singing glass chime modes & transversal harmonics (Q = 26.0 - 28.0) for pure crystal tones.
 * - Air shimmering fairy dust & crystal friction textures.
 * - Irregular multi-bead clatter & cascades (2-4 staggered micro-beads) mimicking beads tumbling in a bowl.
 */
class BeadAudioEngine {
  constructor() {
    this.ctx = null
    this.compressor = null
    this.makeupGain = null
    this.enabled = true
    this.lastBurstTime = 0
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
        
        // Fast transparent brickwall limiter / compressor (+35% punch, sparkling headroom, zero clipping)
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

  /**
   * Synthesize a single tactile glass bead clink:
   * 1. Hard tactile "tik / tck" impact snap (<2.5ms)
   * 2. High-Q crystalline glass chime ring
   * 3. Transverse glass harmonic overtone
   * 4. Airy fairy dust friction shimmer
   */
  _synthesizeBeadClink(audioTime, baseFreq, volume, panX, isStrong = false, decayScale = 1.0) {
    if (!this.ctx || this.ctx.state === 'suspended') return

    try {
      let outputNode = this.compressor || this.ctx.destination
      if (this.ctx.createStereoPanner) {
        const panner = this.ctx.createStereoPanner()
        const clampedPan = Math.max(-0.85, Math.min(0.85, panX + (Math.random() * 0.10 - 0.05)))
        panner.pan.setValueAtTime(clampedPan, audioTime)
        panner.connect(outputNode)
        outputNode = panner
      }

      const beadMasterGain = this.ctx.createGain()
      beadMasterGain.connect(outputNode)

      // -----------------------------------------------------------------
      // LAYER 1: TACTILE HARD BEAD CONTACT SNAP ("tik / tck / tiny clack")
      // Physical micro-strike transient (<2.5ms) gives the hard bead collision bite
      // -----------------------------------------------------------------
      const oscTik = this.ctx.createOscillator()
      const gainTik = this.ctx.createGain()
      oscTik.type = 'sine'
      const startTik = isStrong ? 7800 : 6400 + Math.random() * 1200
      const endTik = isStrong ? 2600 : 2100 + Math.random() * 600
      oscTik.frequency.setValueAtTime(startTik, audioTime)
      oscTik.frequency.exponentialRampToValueAtTime(endTik, audioTime + 0.0022)

      gainTik.gain.setValueAtTime(volume * (isStrong ? 1.45 : 1.15), audioTime)
      gainTik.gain.exponentialRampToValueAtTime(0.0001, audioTime + 0.0028)

      oscTik.connect(gainTik)
      gainTik.connect(beadMasterGain)
      oscTik.start(audioTime)
      oscTik.stop(audioTime + 0.0032)

      // Physical micro-noise impact spike for bead surface clack
      const clickLen = Math.max(1, Math.floor(this.ctx.sampleRate * 0.0018))
      const clickBuf = this.ctx.createBuffer(1, clickLen, this.ctx.sampleRate)
      const clickData = clickBuf.getChannelData(0)
      for (let i = 0; i < clickLen; i++) {
        clickData[i] = (Math.random() * 2 - 1) * (1 - i / clickLen)
      }
      const clickSrc = this.ctx.createBufferSource()
      clickSrc.buffer = clickBuf

      const clickFilter = this.ctx.createBiquadFilter()
      clickFilter.type = 'highpass'
      clickFilter.frequency.setValueAtTime(4500 + Math.random() * 1800, audioTime)

      const clickGain = this.ctx.createGain()
      clickGain.gain.setValueAtTime(volume * 1.05, audioTime)
      clickGain.gain.exponentialRampToValueAtTime(0.0001, audioTime + 0.0020)

      clickSrc.connect(clickFilter)
      clickFilter.connect(clickGain)
      clickGain.connect(beadMasterGain)
      clickSrc.start(audioTime)

      // -----------------------------------------------------------------
      // LAYER 2: RESONANT SINGING GLASS CHIME TONE
      // Pure crystalline bell ring-down
      // -----------------------------------------------------------------
      const oscChime = this.ctx.createOscillator()
      const filterChime = this.ctx.createBiquadFilter()
      const gainChime = this.ctx.createGain()

      oscChime.type = 'sine'
      oscChime.frequency.setValueAtTime(baseFreq, audioTime)
      oscChime.frequency.exponentialRampToValueAtTime(baseFreq * 0.985, audioTime + 0.040)

      filterChime.type = 'bandpass'
      filterChime.frequency.setValueAtTime(baseFreq, audioTime)
      filterChime.Q.setValueAtTime(26.0, audioTime) // Rich resonant glass ringing

      const ringDuration = (0.028 + Math.random() * 0.018) * decayScale
      gainChime.gain.setValueAtTime(volume * 1.35, audioTime)
      gainChime.gain.exponentialRampToValueAtTime(0.0001, audioTime + ringDuration)

      oscChime.connect(filterChime)
      filterChime.connect(gainChime)
      gainChime.connect(beadMasterGain)

      oscChime.start(audioTime)
      oscChime.stop(audioTime + ringDuration + 0.005)

      // -----------------------------------------------------------------
      // LAYER 3: TRANSVERSE HARMONIC OVERTONE (Glass mode ~2.76x)
      // -----------------------------------------------------------------
      const oscOvertone = this.ctx.createOscillator()
      const filterOvertone = this.ctx.createBiquadFilter()
      const gainOvertone = this.ctx.createGain()

      const overtoneFreq = Math.min(11500, baseFreq * (2.74 + Math.random() * 0.04))
      oscOvertone.type = 'sine'
      oscOvertone.frequency.setValueAtTime(overtoneFreq, audioTime)

      filterOvertone.type = 'bandpass'
      filterOvertone.frequency.setValueAtTime(overtoneFreq, audioTime)
      filterOvertone.Q.setValueAtTime(28.0, audioTime)

      const overtoneDuration = ringDuration * 0.72
      gainOvertone.gain.setValueAtTime(volume * 0.90, audioTime)
      gainOvertone.gain.exponentialRampToValueAtTime(0.0001, audioTime + overtoneDuration)

      oscOvertone.connect(filterOvertone)
      filterOvertone.connect(gainOvertone)
      gainOvertone.connect(beadMasterGain)

      oscOvertone.start(audioTime)
      oscOvertone.stop(audioTime + overtoneDuration + 0.005)

      // -----------------------------------------------------------------
      // LAYER 4: FAIRY DUST & CRYSTAL FRICTION SHIMMER
      // -----------------------------------------------------------------
      const dustLen = Math.max(1, Math.floor(this.ctx.sampleRate * 0.0055))
      const dustBuf = this.ctx.createBuffer(1, dustLen, this.ctx.sampleRate)
      const dustData = dustBuf.getChannelData(0)
      for (let i = 0; i < dustLen; i++) {
        dustData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (dustLen * 0.28))
      }

      const dustSrc = this.ctx.createBufferSource()
      dustSrc.buffer = dustBuf

      const dustFilter = this.ctx.createBiquadFilter()
      dustFilter.type = 'bandpass'
      dustFilter.frequency.setValueAtTime(6800 + Math.random() * 3400, audioTime)
      dustFilter.Q.setValueAtTime(3.8, audioTime)

      const dustGain = this.ctx.createGain()
      dustGain.gain.setValueAtTime(volume * 0.88, audioTime)
      dustGain.gain.exponentialRampToValueAtTime(0.0001, audioTime + 0.0065)

      dustSrc.connect(dustFilter)
      dustFilter.connect(dustGain)
      dustGain.connect(beadMasterGain)

      dustSrc.start(audioTime)
    } catch {
      // AudioContext state safeguard
    }
  }

  /**
   * Sparkle Burst: Triggers multiple tiny glass bead clinks tumbling and scattering
   * like small sparkly glass beads shifting in a shallow bowl.
   */
  playSparkleBurst(intensity = 0.5, panX = 0) {
    if (!this.enabled || !this.ctx || this.ctx.state === 'suspended') return

    const now = performance.now()
    // Dynamic interval: fast movement gives sparkling cascades, gentle gives airy spaced clinks
    const minInterval = Math.max(45, 95 - intensity * 35)
    if (now - this.lastBurstTime < minInterval) return
    this.lastBurstTime = now

    try {
      const audioTime = this.ctx.currentTime

      // 30-40% boosted perceived loudness
      const baseVol = Math.min(0.82, Math.max(0.16, intensity * 0.68))
      const isStrong = intensity > 0.65

      // Base pitch selection from celestial glass scale with organic detuning (±16 cents)
      const baseIdx = Math.floor(Math.random() * (GLASS_BEAD_FREQUENCIES.length - 4))
      const detune1 = Math.pow(2, (Math.random() * 32 - 16) / 1200)
      const f1 = GLASS_BEAD_FREQUENCIES[baseIdx] * detune1

      // 1. Primary hard bead clink ("tik / clack" + singing glass ring)
      this._synthesizeBeadClink(audioTime, f1, baseVol * 1.0, panX, isStrong, 1.0)

      // 2. Sister micro-bead clatter (6ms - 14ms later, slightly different pitch & pan)
      const delay2 = 0.007 + Math.random() * 0.007
      const idx2 = Math.min(GLASS_BEAD_FREQUENCIES.length - 1, baseIdx + 1 + (Math.random() < 0.5 ? 1 : 0))
      const detune2 = Math.pow(2, (Math.random() * 32 - 16) / 1200)
      const f2 = GLASS_BEAD_FREQUENCIES[idx2] * detune2
      const vol2 = baseVol * (0.72 + Math.random() * 0.18)
      const pan2 = panX + (Math.random() * 0.12 - 0.06)
      this._synthesizeBeadClink(audioTime + delay2, f2, vol2, pan2, false, 0.85)

      // 3. Third cascading crystal bead (20ms - 36ms later, for normal/stronger interaction)
      if (intensity > 0.26 || Math.random() < 0.78) {
        const delay3 = 0.022 + Math.random() * 0.014
        const idx3 = Math.min(GLASS_BEAD_FREQUENCIES.length - 1, baseIdx + 2 + Math.floor(Math.random() * 2))
        const detune3 = Math.pow(2, (Math.random() * 32 - 16) / 1200)
        const f3 = GLASS_BEAD_FREQUENCIES[idx3] * detune3
        const vol3 = baseVol * (0.64 + Math.random() * 0.20)
        const pan3 = panX + (Math.random() * 0.14 - 0.07)
        this._synthesizeBeadClink(audioTime + delay3, f3, vol3, pan3, false, 1.1)
      }

      // 4. Fourth trailing light skitter on fast sweeps
      if (intensity > 0.60) {
        const delay4 = 0.040 + Math.random() * 0.016
        const idx4 = Math.min(GLASS_BEAD_FREQUENCIES.length - 1, baseIdx + 3 + Math.floor(Math.random() * 2))
        const detune4 = Math.pow(2, (Math.random() * 32 - 16) / 1200)
        const f4 = GLASS_BEAD_FREQUENCIES[idx4] * detune4
        const vol4 = baseVol * 0.52
        const pan4 = panX + (Math.random() * 0.16 - 0.08)
        this._synthesizeBeadClink(audioTime + delay4, f4, vol4, pan4, false, 0.9)
      }
    } catch {
      // AudioContext state safeguard
    }
  }

  // Alias for compatibility
  playBeadContact(intensity = 0.5, panX = 0) {
    this.playSparkleBurst(intensity, panX)
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

        if (contactActivity > 0.24) {
          contactAccumulator += contactActivity

          if (contactAccumulator >= nextTriggerThreshold) {
            contactAccumulator = 0
            // Dynamic timing: treat each meaningful contact/deformation as a single sparkle burst
            const speedFactor = Math.min(6, cursorSpeed * 0.25)
            nextTriggerThreshold = Math.max(12, 22 - speedFactor * 1.6 + Math.random() * 8)

            const pan = width > 0 ? (contactAvgX / width) * 1.7 - 0.85 : 0
            const intensity = Math.min(1, 0.24 + (cursorSpeed * 0.045) + (contactMaxDisplacement * 0.042))

            // Trigger 2-3 chime pixie dust sparkle burst (twiink → ting → tliiing ✨)
            audioEngineRef.current.playSparkleBurst(intensity, pan)
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
