import { useEffect, useRef, useState } from 'react'

// Curated UI/UX, Product Design & Behavioral Design Vocabulary
const UI_UX_VOCABULARY = [
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

export default function HangingCloth() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const [isMuted, setIsMuted] = useState(false)
  const [isInteracting, setIsInteracting] = useState(false)

  // Web Audio Refs
  const audioCtxRef = useRef(null)
  const noiseSourceRef = useRef(null)
  const lowpassFilterRef = useRef(null)
  const bandpassFilterRef = useRef(null)
  const masterGainRef = useRef(null)
  const audioInitializedRef = useRef(false)
  const isMutedRef = useRef(false)

  // Sync mute ref with state
  useEffect(() => {
    isMutedRef.current = isMuted
    if (isMuted && masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(0, audioCtxRef.current.currentTime)
    }
  }, [isMuted])

  // Initialize and unlock Web Audio API on genuine user gesture
  const initWebAudio = () => {
    if (!audioInitializedRef.current) {
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext
        if (!AudioContextClass) return

        const ctx = new AudioContextClass()
        audioCtxRef.current = ctx

        // Generate 3-second seamless organic pink noise buffer for tactile paper/fabric rustle
        const bufferSize = ctx.sampleRate * 3
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
        const output = noiseBuffer.getChannelData(0)

        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1
          b0 = 0.99886 * b0 + white * 0.0555179
          b1 = 0.99332 * b1 + white * 0.0750759
          b2 = 0.96900 * b2 + white * 0.1538520
          b3 = 0.86650 * b3 + white * 0.3104856
          b4 = 0.55000 * b4 + white * 0.5329522
          b5 = -0.7616 * b5 - white * 0.0168980
          output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.16
          b6 = white * 0.115926
        }

        const noiseSource = ctx.createBufferSource()
        noiseSource.buffer = noiseBuffer
        noiseSource.loop = true

        // Lowpass filter modulates with swipe velocity (muffled friction -> airy rustle)
        const lowpass = ctx.createBiquadFilter()
        lowpass.type = 'lowpass'
        lowpass.frequency.setValueAtTime(380, ctx.currentTime)
        lowpass.Q.setValueAtTime(0.7, ctx.currentTime)

        // Bandpass filter adds textile body resonance
        const bandpass = ctx.createBiquadFilter()
        bandpass.type = 'bandpass'
        bandpass.frequency.setValueAtTime(700, ctx.currentTime)
        bandpass.Q.setValueAtTime(1.2, ctx.currentTime)

        // Master Gain
        const masterGain = ctx.createGain()
        masterGain.gain.setValueAtTime(0, ctx.currentTime)

        // Wire graph: Noise -> Lowpass -> Bandpass -> MasterGain -> Destination
        noiseSource.connect(lowpass)
        lowpass.connect(bandpass)
        bandpass.connect(masterGain)
        masterGain.connect(ctx.destination)

        noiseSource.start(0)

        noiseSourceRef.current = noiseSource
        lowpassFilterRef.current = lowpass
        bandpassFilterRef.current = bandpass
        masterGainRef.current = masterGain
        audioInitializedRef.current = true
      } catch (err) {
        console.warn('Web Audio initialization deferred:', err)
      }
    }

    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {})
    }
  }

  // Modulate tactile audio strictly based on physical drag velocity and deformation
  const playTactileAudio = (velocity, deformationEnergy) => {
    if (isMutedRef.current || !audioCtxRef.current || !masterGainRef.current) return
    const ctx = audioCtxRef.current

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {})
      return
    }

    const now = ctx.currentTime
    const speed = Math.min(Math.max(velocity, 0), 75)
    if (speed < 0.6 && deformationEnergy < 0.05) return

    const normalizedVelocity = Math.min(speed / 35, 1.0)
    const normalizedDeformation = Math.min(deformationEnergy / 8.0, 1.0)
    const combinedIntensity = Math.max(normalizedVelocity, normalizedDeformation * 0.7)

    // Volume scales from barely perceptible whisper to crisp full paper/fabric rustle
    const targetGain = 0.05 + combinedIntensity * 0.28
    // Filter frequency opens up with speed: 380Hz (muffled) to 1950Hz (airy dragging sound)
    const targetFreq = 380 + combinedIntensity * 1550

    try {
      if (lowpassFilterRef.current) {
        lowpassFilterRef.current.frequency.setTargetAtTime(targetFreq, now, 0.03)
      }
      if (masterGainRef.current) {
        masterGainRef.current.gain.setTargetAtTime(targetGain, now, 0.025)
        // Smooth organic fade out as hand stops
        masterGainRef.current.gain.setTargetAtTime(0.0001, now + 0.08, 0.09)
      }
    } catch {
      // Audio fallback
    }
  }

  // Setup global interaction listeners to unlock AudioContext on first touch/click
  useEffect(() => {
    const handleGesture = () => {
      initWebAudio()
    }
    window.addEventListener('pointerdown', handleGesture, { passive: true })
    window.addEventListener('click', handleGesture, { passive: true })
    window.addEventListener('touchstart', handleGesture, { passive: true })

    return () => {
      window.removeEventListener('pointerdown', handleGesture)
      window.removeEventListener('click', handleGesture)
      window.removeEventListener('touchstart', handleGesture)
    }
  }, [])

  // Canvas Physics & Directional Typographic Warp Engine
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

    // Typographic Surface Mesh Setup
    const cols = 28
    const rows = 14
    const clothWidth = Math.min(width - 40, 780)
    const clothHeight = 285
    const startX = (width - clothWidth) / 2
    const startY = 35

    const spacingX = clothWidth / (cols - 1)
    const spacingY = clothHeight / (rows - 1)

    // Render High-DPI Offscreen Canvas for Crisp Typography
    const offscreen = document.createElement('canvas')
    const offCtx = offscreen.getContext('2d')
    offscreen.width = Math.round(clothWidth * dpr)
    offscreen.height = Math.round(clothHeight * dpr)
    offCtx.scale(dpr, dpr)

    const renderOffscreenText = () => {
      offCtx.clearRect(0, 0, clothWidth, clothHeight)
      offCtx.font = '500 11.5px "JetBrains Mono", "Fira Code", monospace'
      offCtx.fillStyle = '#18181b'
      offCtx.textBaseline = 'middle'

      const lineSpacing = clothHeight / UI_UX_VOCABULARY.length
      for (let i = 0; i < UI_UX_VOCABULARY.length; i++) {
        const lineY = i * lineSpacing + lineSpacing * 0.5
        offCtx.fillText(UI_UX_VOCABULARY[i], 12, lineY)
      }
    }
    renderOffscreenText()

    // Mesh Particles
    const particles = []
    const getIndex = (r, c) => r * cols + c

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = startX + c * spacingX
        const y = startY + r * spacingY
        particles.push({
          x,
          y,
          vx: 0,
          vy: 0,
          restX: x,
          restY: y,
          pinned: r === 0, // Top pinned edge
          u: (c / (cols - 1)) * offscreen.width,
          v: (r / (rows - 1)) * offscreen.height,
        })
      }
    }

    // Pointer State
    const mouse = {
      x: -9999,
      y: -9999,
      prevX: -9999,
      prevY: -9999,
      vx: 0,
      vy: 0,
      active: false,
    }

    const updatePointer = (clientX, clientY) => {
      initWebAudio()
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

    const handleMouseMove = (e) => updatePointer(e.clientX, e.clientY)
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        updatePointer(e.touches[0].clientX, e.touches[0].clientY)
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

    // Physics Parameters for Extreme Tactile Fluid Deformation
    const baseRadius = 95
    const springK = 0.042 // Restoring spring
    const damping = 0.94 // Air & fabric drag
    const diffusion = 0.22 // Surface tension & neighbor propagation

    // Fast Affine Triangle Texture Warper with subpixel overlap (no visible seams)
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

      // Subpixel outward dilation prevents anti-aliasing gaps between triangles
      const cx = (x0 + x1 + x2) / 3
      const cy = (y0 + y1 + y2) / 3
      const delta = 0.025

      targetCtx.beginPath()
      targetCtx.moveTo(x0 + (x0 - cx) * delta, y0 + (y0 - cy) * delta)
      targetCtx.lineTo(x1 + (x1 - cx) * delta, y1 + (y1 - cy) * delta)
      targetCtx.lineTo(x2 + (x2 - cx) * delta, y2 + (y2 - cy) * delta)
      targetCtx.closePath()
      targetCtx.clip()

      // Affine transform matrix mapping (u, v) -> (x, y)
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

    // Main 60FPS Physics Simulation & Render Loop
    const tick = () => {
      const mouseSpeed = Math.hypot(mouse.vx, mouse.vy)
      // Radius expands with velocity: sweeping fast drags a wider section of the fabric
      const brushRadius = baseRadius + Math.min(mouseSpeed * 2.2, 85)

      let totalDeformationEnergy = 0

      // 1. Apply Velocity-Driven Directional Drag Force to Typography
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        if (p.pinned) continue

        if (mouse.active) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.hypot(dx, dy)

          if (dist < brushRadius) {
            // Smooth cubic Hermite falloff
            const t = 1 - dist / brushRadius
            const smooth = t * t * (3 - 2 * t)

            // Directional drag momentum: directly pulls the text in the cursor's trajectory
            const dragScale = 0.95 * smooth
            p.vx += mouse.vx * dragScale
            p.vy += mouse.vy * dragScale

            // Directional bulge displacement: pushes and stretches characters along the stroke
            const pushMag = Math.min(mouseSpeed * 0.35 + 2.5, 18.0) * smooth
            p.vx += (dx / (dist || 1)) * pushMag * 0.5
            p.vy += (dy / (dist || 1)) * pushMag * 0.5
          }
        }
      }

      // Smooth pointer velocity decay
      mouse.vx *= 0.65
      mouse.vy *= 0.65

      // 2. Continuous Surface Physics (Elastic Springs, Surface Tension & Propagation)
      for (let r = 1; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = getIndex(r, c)
          const p = particles[idx]

          // Restoring spring pulling particle back to its original layout position
          p.vx += (p.restX - p.x) * springK
          p.vy += (p.restY - p.y) * springK

          // Surface Tension / Neighbor Propagation: pulls adjacent characters together as one continuous sheet
          let neighborAvgX = 0
          let neighborAvgY = 0
          let count = 0

          if (c > 0) {
            const left = particles[getIndex(r, c - 1)]
            neighborAvgX += left.x
            neighborAvgY += left.y
            count++
          }
          if (c < cols - 1) {
            const right = particles[getIndex(r, c + 1)]
            neighborAvgX += right.x
            neighborAvgY += right.y
            count++
          }
          if (r > 0) {
            const top = particles[getIndex(r - 1, c)]
            neighborAvgX += top.x
            neighborAvgY += top.y
            count++
          }
          if (r < rows - 1) {
            const bottom = particles[getIndex(r + 1, c)]
            neighborAvgX += bottom.x
            neighborAvgY += bottom.y
            count++
          }

          if (count > 0) {
            const avgX = neighborAvgX / count
            const avgY = neighborAvgY / count
            p.vx += (avgX - p.x) * diffusion
            p.vy += (avgY - p.y) * diffusion
          }

          // Damping
          p.vx *= damping
          p.vy *= damping

          // Update position
          p.x += p.vx
          p.y += p.vy

          // Track kinetic energy for sound modulation
          totalDeformationEnergy += Math.hypot(p.vx, p.vy)
        }
      }

      // 3. Modulate Real Web Audio API Fabric Rustle
      if (mouseSpeed > 0.6 || totalDeformationEnergy > 0.2) {
        playTactileAudio(mouseSpeed, totalDeformationEnergy)
      }

      // 4. Render Main Canvas
      ctx.clearRect(0, 0, width, height)

      // 5. Warp and Render the Entire Dense Typographic Surface
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

      // 6. Draw Top Hanging Eyelets (Anchoring the Typography)
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
      renderOffscreenText()
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
      {/* FRAME CONTAINER — PRESERVED 100% VISUAL DESIGN */}
      <div className="relative rounded-sm p-4 sm:p-6 bg-[#c28e57] shadow-2xl border-4 sm:border-8 border-[#996531] ring-1 ring-black/20">
        <div className="relative rounded-sm bg-cork p-3 sm:p-6 overflow-hidden shadow-inner border border-[#804e22]">
          
          {/* TOP CARD BAR */}
          <div className="relative bg-[#f4ede1] text-[#281712] px-4 py-3 sm:px-6 sm:py-3.5 rounded-t-xs border-[1.5px] border-b-0 border-[#4b73b5] flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#e15554] animate-ping"></span>
              <span className="font-pixel text-xs font-bold tracking-wider uppercase text-[#281712]">
                ✦ TYPOGRAPHIC FABRIC // UI/UX SPECIMEN
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Interaction Hint */}
              <span className="hidden sm:inline-block font-display text-[11px] text-[#281712]/75 font-medium">
                {isInteracting ? 'Dragging typography...' : 'Drag cursor across text to deform'}
              </span>

              {/* Minimal Web Audio Sound Toggle */}
              <button
                type="button"
                onClick={() => {
                  initWebAudio()
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
              <span>INTERACTION: DIRECTIONAL TYPOGRAPHIC WARP // FLUID MOMENTUM</span>
              <span>AUDIO: PROCEDURAL TEXTILE FRICTION // WEB AUDIO API</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
