import React, { useRef, useEffect, useState } from 'react'

/**
 * usePageWakeup
 * Fires once when the user's cursor first enters the page,
 * signalling decorative elements to perform a brief, gentle "waking up" response.
 */
export function usePageWakeup() {
  const [isWakingUp, setIsWakingUp] = useState(false)
  const hasTriggered = useRef(false)

  useEffect(() => {
    const triggerWakeup = () => {
      if (hasTriggered.current) return
      hasTriggered.current = true
      setIsWakingUp(true)
      // Wakeup sequence settles after 550ms
      setTimeout(() => {
        setIsWakingUp(false)
      }, 550)
    }

    const onPointerMove = () => triggerWakeup()
    const onMouseEnter = () => triggerWakeup()

    window.addEventListener('pointermove', onPointerMove, { once: true, passive: true })
    document.addEventListener('mouseenter', onMouseEnter, { once: true })

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('mouseenter', onMouseEnter)
    }
  }, [])

  return isWakingUp
}

/**
 * InteractiveSmile
 * Enhances the Japanese smile glyph "ツ" in "Ruchi ツ".
 * Responds to initial page entry with a friendly nod,
 * and responds spatially to nearby cursor proximity.
 */
export function InteractiveSmile({ isWakingUp, className = "" }) {
  const ref = useRef(null)
  const state = useRef({ x: 0, y: 0, scale: 1, rotate: 0, vx: 0, vy: 0, vscale: 0, vrotate: 0 })
  const target = useRef({ x: 0, y: 0, scale: 1, rotate: 0 })
  const rafId = useRef(null)
  const isRunning = useRef(false)

  // Wakeup animation
  useEffect(() => {
    if (!isWakingUp) return
    const el = ref.current
    if (!el) return

    // Quick, organic 2-phase nod
    el.style.transition = 'transform 260ms cubic-bezier(0.34, 1.56, 0.64, 1)'
    el.style.transform = 'translate3d(0, -3px, 0) rotate(-8deg) scale(1.14)'

    const timer = setTimeout(() => {
      if (ref.current) {
        ref.current.style.transition = 'transform 320ms cubic-bezier(0.25, 1, 0.5, 1)'
        ref.current.style.transform = 'translate3d(0, 0, 0) rotate(0deg) scale(1)'
        setTimeout(() => {
          if (ref.current) ref.current.style.transition = 'none'
        }, 320)
      }
    }, 240)

    return () => clearTimeout(timer)
  }, [isWakingUp])

  // Spatial cursor proximity reaction
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const PROXIMITY_RADIUS = 80
    const SPRING_K = 0.12
    const DAMPING = 0.76

    const update = () => {
      const s = state.current
      const t = target.current

      const ax = (t.x - s.x) * SPRING_K
      s.vx = (s.vx + ax) * DAMPING
      s.x += s.vx

      const ay = (t.y - s.y) * SPRING_K
      s.vy = (s.vy + ay) * DAMPING
      s.y += s.vy

      const aScale = (t.scale - s.scale) * SPRING_K
      s.vscale = (s.vscale + aScale) * DAMPING
      s.scale += s.vscale

      const aRot = (t.rotate - s.rotate) * SPRING_K
      s.vrotate = (s.vrotate + aRot) * DAMPING
      s.rotate += s.vrotate

      el.style.transform = `translate3d(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px, 0) scale(${s.scale.toFixed(3)}) rotate(${s.rotate.toFixed(2)}deg)`

      const isMoving =
        Math.abs(t.x - s.x) > 0.01 ||
        Math.abs(t.y - s.y) > 0.01 ||
        Math.abs(t.scale - s.scale) > 0.003 ||
        Math.abs(t.rotate - s.rotate) > 0.01 ||
        Math.abs(s.vx) + Math.abs(s.vy) + Math.abs(s.vscale) + Math.abs(s.vrotate) > 0.01

      if (isMoving) {
        rafId.current = requestAnimationFrame(update)
      } else {
        isRunning.current = false
      }
    }

    const start = () => {
      if (!isRunning.current) {
        isRunning.current = true
        rafId.current = requestAnimationFrame(update)
      }
    }

    const onPointerMove = (e) => {
      const rect = el.getBoundingClientRect()
      if (rect.width === 0) return

      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = cx - e.clientX
      const dy = cy - e.clientY
      const dist = Math.hypot(dx, dy)

      if (dist < PROXIMITY_RADIUS) {
        const rawT = 1 - dist / PROXIMITY_RADIUS
        const easeT = rawT * rawT * (3 - 2 * rawT)

        target.current.x = (dx / PROXIMITY_RADIUS) * 3 * easeT
        target.current.y = -easeT * 3.5
        target.current.rotate = (dx / PROXIMITY_RADIUS) * 7 * easeT
        target.current.scale = 1 + 0.12 * easeT
        start()
      } else if (target.current.scale !== 1 || target.current.rotate !== 0) {
        target.current.x = 0
        target.current.y = 0
        target.current.rotate = 0
        target.current.scale = 1
        start()
      }
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <span
      ref={ref}
      className={`text-2xl sm:text-3xl font-mono ml-1 text-[#E4BA83] inline-block will-change-transform origin-bottom select-none cursor-default ${className}`}
      aria-hidden="true"
    >
      ツ
    </span>
  )
}

/**
 * InteractiveRibbon
 * Enhances the silk bookmark ribbons peeking from the diary spine.
 * Gives a gentle cloth flutter on page entry and subtle sway on edge cursor proximity.
 */
export function InteractiveRibbon({ side = 'left', isWakingUp, children, className = "" }) {
  const ref = useRef(null)
  const state = useRef({ rotate: 0, vrotate: 0, targetRotate: 0 })
  const rafId = useRef(null)
  const isRunning = useRef(false)

  // Wakeup flutter
  useEffect(() => {
    if (!isWakingUp) return
    const el = ref.current
    if (!el) return

    const angle = side === 'left' ? 3.5 : -3.5
    el.style.transition = 'transform 300ms cubic-bezier(0.25, 1, 0.5, 1)'
    el.style.transform = `rotate(${angle}deg)`

    const timer = setTimeout(() => {
      if (ref.current) {
        ref.current.style.transition = 'transform 350ms cubic-bezier(0.25, 1, 0.5, 1)'
        ref.current.style.transform = 'rotate(0deg)'
        setTimeout(() => {
          if (ref.current) ref.current.style.transition = 'none'
        }, 350)
      }
    }, 220)

    return () => clearTimeout(timer)
  }, [isWakingUp, side])

  // Spatial cursor proximity sway
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const PROXIMITY_RADIUS = 90
    const SPRING_K = 0.08
    const DAMPING = 0.82

    const update = () => {
      const s = state.current
      const a = (s.targetRotate - s.rotate) * SPRING_K
      s.vrotate = (s.vrotate + a) * DAMPING
      s.rotate += s.vrotate

      el.style.transform = `rotate(${s.rotate.toFixed(2)}deg)`

      if (Math.abs(s.targetRotate - s.rotate) > 0.01 || Math.abs(s.vrotate) > 0.01) {
        rafId.current = requestAnimationFrame(update)
      } else {
        isRunning.current = false
      }
    }

    const start = () => {
      if (!isRunning.current) {
        isRunning.current = true
        rafId.current = requestAnimationFrame(update)
      }
    }

    const onPointerMove = (e) => {
      const rect = el.getBoundingClientRect()
      if (rect.width === 0) return

      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dist = Math.hypot(cx - e.clientX, cy - e.clientY)

      if (dist < PROXIMITY_RADIUS) {
        const rawT = 1 - dist / PROXIMITY_RADIUS
        const t = rawT * rawT * (3 - 2 * rawT)
        // Gentle sway reflecting cursor's vertical position relative to ribbon
        const dy = (e.clientY - cy) / PROXIMITY_RADIUS
        state.current.targetRotate = dy * (side === 'left' ? 4 : -4) * t
        start()
      } else if (state.current.targetRotate !== 0) {
        state.current.targetRotate = 0
        start()
      }
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [side])

  return (
    <div
      ref={ref}
      className={`will-change-transform ${side === 'left' ? 'origin-right' : 'origin-left'} ${className}`}
    >
      {children}
    </div>
  )
}

/**
 * InteractiveScrap
 * Enhances each of the 3 paper scraps on Page 2 ("3 Things I Strongly Believe In").
 * Provides a gentle staggered paper-settle on page entry,
 * and spatial tactile buoyancy when the cursor moves nearby.
 */
export function InteractiveScrap({
  baseRotate = 0,
  staggerIndex = 0,
  isWakingUp,
  children,
  className = ""
}) {
  const ref = useRef(null)
  const state = useRef({ y: 0, rotateDelta: 0, vy: 0, vrot: 0, targetY: 0, targetRot: 0 })
  const rafId = useRef(null)
  const isRunning = useRef(false)

  // Wakeup micro-settle
  useEffect(() => {
    if (!isWakingUp) return
    const el = ref.current
    if (!el) return

    const delay = staggerIndex * 60
    const timer1 = setTimeout(() => {
      if (ref.current) {
        ref.current.style.transition = 'transform 280ms cubic-bezier(0.34, 1.56, 0.64, 1)'
        ref.current.style.transform = `translate3d(0, -2.5px, 0) rotate(${baseRotate + (staggerIndex % 2 === 0 ? 0.6 : -0.6)}deg)`

        const timer2 = setTimeout(() => {
          if (ref.current) {
            ref.current.style.transition = 'transform 320ms cubic-bezier(0.25, 1, 0.5, 1)'
            ref.current.style.transform = `translate3d(0, 0, 0) rotate(${baseRotate}deg)`
            setTimeout(() => {
              if (ref.current) ref.current.style.transition = 'none'
            }, 320)
          }
        }, 200)

        return () => clearTimeout(timer2)
      }
    }, delay)

    return () => clearTimeout(timer1)
  }, [isWakingUp, baseRotate, staggerIndex])

  // Spatial cursor proximity
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const PROXIMITY_RADIUS = 110
    const SPRING_K = 0.10
    const DAMPING = 0.78

    const update = () => {
      const s = state.current

      const ay = (s.targetY - s.y) * SPRING_K
      s.vy = (s.vy + ay) * DAMPING
      s.y += s.vy

      const aRot = (s.targetRot - s.rotateDelta) * SPRING_K
      s.vrot = (s.vrot + aRot) * DAMPING
      s.rotateDelta += s.vrot

      const currentRot = baseRotate + s.rotateDelta
      el.style.transform = `translate3d(0, ${s.y.toFixed(2)}px, 0) rotate(${currentRot.toFixed(2)}deg)`

      if (
        Math.abs(s.targetY - s.y) > 0.01 ||
        Math.abs(s.targetRot - s.rotateDelta) > 0.01 ||
        Math.abs(s.vy) + Math.abs(s.vrot) > 0.01
      ) {
        rafId.current = requestAnimationFrame(update)
      } else {
        isRunning.current = false
      }
    }

    const start = () => {
      if (!isRunning.current) {
        isRunning.current = true
        rafId.current = requestAnimationFrame(update)
      }
    }

    const onPointerMove = (e) => {
      const rect = el.getBoundingClientRect()
      if (rect.width === 0) return

      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = cx - e.clientX
      const dy = cy - e.clientY
      const dist = Math.hypot(dx, dy)

      if (dist < PROXIMITY_RADIUS) {
        const rawT = 1 - dist / PROXIMITY_RADIUS
        const t = rawT * rawT * (3 - 2 * rawT)

        // Subtle buoyant lift (up to 3px)
        state.current.targetY = -t * 3
        // Subtle tilt aligning with cursor displacement (max 1.2 deg)
        state.current.targetRot = (dx / PROXIMITY_RADIUS) * 1.5 * t
        start()
      } else if (state.current.targetY !== 0 || state.current.targetRot !== 0) {
        state.current.targetY = 0
        state.current.targetRot = 0
        start()
      }
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [baseRotate])

  return (
    <div
      ref={ref}
      style={{ transform: `rotate(${baseRotate}deg)` }}
      className={`will-change-transform origin-center ${className}`}
    >
      {children}
    </div>
  )
}

/**
 * InteractivePerchedBirds
 * Enhances the 3 little birds perched on the botanical window illustration.
 * When the page wakes up or cursor nears the window sill, birds give a subtle 1.5px nod.
 */
export function InteractivePerchedBirds({ isWakingUp, children }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!isWakingUp) return
    const el = ref.current
    if (!el) return

    el.style.transition = 'transform 260ms cubic-bezier(0.34, 1.56, 0.64, 1)'
    el.style.transform = 'translateY(-2px)'

    const timer = setTimeout(() => {
      if (ref.current) {
        ref.current.style.transition = 'transform 300ms cubic-bezier(0.25, 1, 0.5, 1)'
        ref.current.style.transform = 'translateY(0px)'
        setTimeout(() => {
          if (ref.current) ref.current.style.transition = 'none'
        }, 300)
      }
    }, 200)

    return () => clearTimeout(timer)
  }, [isWakingUp])

  return (
    <g ref={ref} className="will-change-transform origin-bottom">
      {children}
    </g>
  )
}

/**
 * InteractiveIllustration
 * Wraps the hand-drawn hero portrait illustration with subtle ambient page-entry wakeup,
 * the existing gentle buoyant tilt reaction, and a cheeky wink + tongue reaction on hover.
 */
export function InteractiveIllustration({ isWakingUp, className = "" }) {
  const ref = useRef(null)
  const isRunning = useRef(false)
  const rafId = useRef(null)

  const state = useRef({ y: 0, rot: 0, scale: 1, vy: 0, vrot: 0, vscale: 0 })
  const target = useRef({ y: 0, rot: 0, scale: 1 })

  // Wink & tongue character reaction state
  const [isWinking, setIsWinking] = useState(false)
  const winkStartTimer = useRef(null)
  const winkEndTimer = useRef(null)
  const isHovered = useRef(false)

  // Preload wink illustration asset
  useEffect(() => {
    const img = new Image()
    img.src = '/hero-illustration-wink.png'
    return () => {
      if (winkStartTimer.current) clearTimeout(winkStartTimer.current)
      if (winkEndTimer.current) clearTimeout(winkEndTimer.current)
    }
  }, [])

  // Character hover reaction: playful wink + small tongue (persists while hovered)
  const handlePointerEnter = (e) => {
    // Preserve mobile touch behavior without hover interference
    if (e.pointerType === 'touch') return
    if (isHovered.current) return
    isHovered.current = true

    if (winkStartTimer.current) clearTimeout(winkStartTimer.current)

    // Natural brief lead-in so existing tilt begins first, then wink + tongue engage
    winkStartTimer.current = setTimeout(() => {
      if (isHovered.current) {
        setIsWinking(true)
      }
    }, 60)
  }

  const handlePointerLeave = (e) => {
    if (e.pointerType === 'touch') return
    isHovered.current = false
    if (winkStartTimer.current) clearTimeout(winkStartTimer.current)
    setIsWinking(false)
  }

  // Wakeup reaction: gentle nod & breath
  useEffect(() => {
    if (!isWakingUp) return
    const el = ref.current
    if (!el) return

    el.style.transition = 'transform 360ms cubic-bezier(0.34, 1.4, 0.64, 1)'
    el.style.transform = 'translate3d(0, -3px, 0) rotate(-1.5deg) scale(1.02)'

    const timer = setTimeout(() => {
      if (ref.current) {
        ref.current.style.transition = 'transform 450ms cubic-bezier(0.25, 1, 0.5, 1)'
        ref.current.style.transform = 'translate3d(0, 0, 0) rotate(0deg) scale(1)'
        setTimeout(() => {
          if (ref.current) ref.current.style.transition = 'none'
        }, 450)
      }
    }, 280)

    return () => clearTimeout(timer)
  }, [isWakingUp])

  // Existing cursor proximity & tilt physics (strictly preserved)
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const PROXIMITY_RADIUS = 160
    const SPRING_K = 0.08
    const DAMPING = 0.82

    const update = () => {
      const s = state.current
      const t = target.current

      const aY = (t.y - s.y) * SPRING_K
      s.vy = (s.vy + aY) * DAMPING
      s.y += s.vy

      const aRot = (t.rot - s.rot) * SPRING_K
      s.vrot = (s.vrot + aRot) * DAMPING
      s.rot += s.vrot

      const aScale = (t.scale - s.scale) * SPRING_K
      s.vscale = (s.vscale + aScale) * DAMPING
      s.scale += s.vscale

      el.style.transform = `translate3d(0, ${s.y.toFixed(2)}px, 0) rotate(${s.rot.toFixed(2)}deg) scale(${s.scale.toFixed(3)})`

      const isMoving =
        Math.abs(t.y - s.y) > 0.01 ||
        Math.abs(t.rot - s.rot) > 0.01 ||
        Math.abs(t.scale - s.scale) > 0.002 ||
        Math.abs(s.vy) + Math.abs(s.vrot) + Math.abs(s.vscale) > 0.008

      if (isMoving) {
        rafId.current = requestAnimationFrame(update)
      } else {
        isRunning.current = false
      }
    }

    const start = () => {
      if (!isRunning.current) {
        isRunning.current = true
        rafId.current = requestAnimationFrame(update)
      }
    }

    const onPointerMove = (e) => {
      const rect = el.getBoundingClientRect()
      if (rect.width === 0) return

      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = cx - e.clientX
      const dy = cy - e.clientY
      const dist = Math.hypot(dx, dy)

      if (dist < PROXIMITY_RADIUS) {
        const rawT = 1 - dist / PROXIMITY_RADIUS
        const t = rawT * rawT * (3 - 2 * rawT)

        target.current.y = -t * 3
        target.current.rot = (dx / PROXIMITY_RADIUS) * 1.8 * t
        target.current.scale = 1 + 0.015 * t
        start()
      } else if (target.current.y !== 0 || target.current.rot !== 0 || target.current.scale !== 1) {
        target.current.y = 0
        target.current.rot = 0
        target.current.scale = 1
        start()
      }
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <div
      ref={ref}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`relative will-change-transform origin-bottom select-none cursor-default ${className}`}
    >
      {/* Base Normal Portrait */}
      <img
        src="/hero-illustration.png"
        alt="Hand-drawn portrait illustration of Ruchi"
        className="w-full h-auto max-h-[360px] sm:max-h-[400px] md:max-h-[430px] object-contain drop-shadow-sm select-none pointer-events-none transition-opacity duration-100 ease-in-out"
        style={{ opacity: isWinking ? 0 : 1 }}
        draggable="false"
      />

      {/* Layered Playful Wink + Tongue Reaction */}
      <img
        src="/hero-illustration-wink.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none transition-opacity duration-100 ease-in-out"
        style={{ opacity: isWinking ? 1 : 0 }}
        draggable="false"
      />
    </div>
  )
}

/**
 * InteractiveHeroPage
 * Provides a tactile physical corner page lift whenever the mouse hovers over Page 1 of the diary.
 * The entire page sheet stays stationary (no whole-page shifting or translation).
 * Instead, only the top-right unbound corner of the cream paper sheet gracefully uplifts and curls
 * with supple paper spring physics, revealing the rich notebook backing beneath and casting a soft
 * diffuse drop shadow across the paper grid.
 */
export function InteractiveHeroPage({ children, className = "" }) {
  const containerRef = useRef(null)
  const cutoutRef = useRef(null)
  const creaseShadowRef = useRef(null)
  const flapRef = useRef(null)

  const isHovered = useRef(false)
  const isRunning = useRef(false)
  const rafId = useRef(null)

  // Spring physics state for corner curl size (s in px)
  const currentS = useRef(0)
  const targetS = useRef(0)
  const vS = useRef(0)

  const W = 96 // Base dimension for corner curl viewBox

  const renderCurl = (s) => {
    if (!cutoutRef.current || !creaseShadowRef.current || !flapRef.current) return

    if (s <= 0.4) {
      cutoutRef.current.setAttribute('d', '')
      creaseShadowRef.current.setAttribute('d', '')
      flapRef.current.setAttribute('d', '')
      return
    }

    // Cutout reveals dark blue cover well behind the lifted paper corner
    const cutoutPath = `M ${(W - s).toFixed(1)} 0 L ${W} 0 L ${W} ${s.toFixed(1)} Z`
    cutoutRef.current.setAttribute('d', cutoutPath)
    creaseShadowRef.current.setAttribute('d', cutoutPath)

    // Curled flap on top of the crease line
    // Fold line runs from (W - s, 0) to (W, s)
    // Curled tip arches down & left to (tipX, tipY)
    const tipX = W - s * 0.94
    const tipY = s * 0.94
    const c1X = W - s * 1.05
    const c1Y = s * 0.46
    const c2X = W - s * 0.46
    const c2Y = s * 1.05

    const flapPath = `M ${(W - s).toFixed(1)} 0 Q ${c1X.toFixed(1)} ${c1Y.toFixed(1)} ${tipX.toFixed(1)} ${tipY.toFixed(1)} Q ${c2X.toFixed(1)} ${c2Y.toFixed(1)} ${W} ${s.toFixed(1)} Z`
    flapRef.current.setAttribute('d', flapPath)
  }

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    // Spring constants tuned for supple, authentic art paper
    const SPRING_K = 0.12
    const DAMPING = 0.76

    const update = () => {
      const a = (targetS.current - currentS.current) * SPRING_K
      vS.current = (vS.current + a) * DAMPING
      currentS.current += vS.current

      renderCurl(currentS.current)

      const isMoving =
        Math.abs(targetS.current - currentS.current) > 0.1 ||
        Math.abs(vS.current) > 0.04

      if (isMoving) {
        rafId.current = requestAnimationFrame(update)
      } else {
        currentS.current = targetS.current
        renderCurl(currentS.current)
        isRunning.current = false
      }
    }

    const start = () => {
      if (!isRunning.current) {
        isRunning.current = true
        rafId.current = requestAnimationFrame(update)
      }
    }

    const onPointerEnter = (e) => {
      if (e.pointerType === 'touch') return
      isHovered.current = true
      targetS.current = 50
      start()
    }

    const onPointerMove = (e) => {
      if (e.pointerType === 'touch' || !isHovered.current) return
      const rect = el.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return

      // Measure cursor proximity to top-right corner
      const dx = rect.right - e.clientX
      const dy = e.clientY - rect.top
      const dist = Math.hypot(dx, dy)

      // Supple paper life: as cursor approaches top-right corner, gently lift higher (up to 62px)
      if (dist < 220) {
        const proximity = 1 - dist / 220
        targetS.current = 50 + proximity * 14
      } else {
        targetS.current = 50
      }
      start()
    }

    const onPointerLeave = (e) => {
      if (e.pointerType === 'touch') return
      isHovered.current = false
      targetS.current = 0
      start()
    }

    el.addEventListener('pointerenter', onPointerEnter)
    el.addEventListener('pointermove', onPointerMove, { passive: true })
    el.addEventListener('pointerleave', onPointerLeave)

    return () => {
      el.removeEventListener('pointerenter', onPointerEnter)
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerleave', onPointerLeave)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
    >
      {/* Top-Right Tactile Corner Page Lift */}
      <div
        className="corner-lift-layer absolute top-0 right-0 pointer-events-none z-30 overflow-hidden w-[96px] h-[96px] rounded-tr-[24px] sm:rounded-tr-[36px]"
        aria-hidden="true"
      >
        <svg
          className="w-full h-full overflow-visible"
          viewBox="0 0 96 96"
          fill="none"
        >
          <defs>
            {/* Diffuse drop shadow cast by lifted corner onto page grid */}
            <filter id="heroCornerShadow" x="-50%" y="-50%" width="220%" height="220%">
              <feDropShadow dx="-3" dy="4.5" stdDeviation="3.5" floodColor="#061840" floodOpacity="0.32" />
              <feDropShadow dx="-1" dy="1.5" stdDeviation="1.5" floodColor="#061840" floodOpacity="0.18" />
            </filter>

            {/* Notebook recessed bed revealed behind the lifted corner */}
            <linearGradient id="cornerRecessGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#051532" />
              <stop offset="50%" stopColor="#09275B" />
              <stop offset="100%" stopColor="#0B3272" />
            </linearGradient>

            {/* Shadow cast right at the crease inside the gap */}
            <linearGradient id="cornerCreaseShadow" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(4, 16, 40, 0.42)" />
              <stop offset="35%" stopColor="rgba(4, 16, 40, 0.1)" />
              <stop offset="100%" stopColor="rgba(4, 16, 40, 0)" />
            </linearGradient>

            {/* Warm cream paper underside with natural specular curl sheen */}
            <linearGradient id="paperFlapGrad" x1="100%" y1="0%" x2="35%" y2="70%">
              <stop offset="0%" stopColor="#D8C4A7" />
              <stop offset="25%" stopColor="#EAD9C1" />
              <stop offset="55%" stopColor="#FFFDF9" />
              <stop offset="85%" stopColor="#F5E8D3" />
              <stop offset="100%" stopColor="#E4D0B5" />
            </linearGradient>
          </defs>

          {/* Dark blue recessed backing revealed when corner uplifts */}
          <path ref={cutoutRef} d="" fill="url(#cornerRecessGrad)" />
          <path ref={creaseShadowRef} d="" fill="url(#cornerCreaseShadow)" />

          {/* Curled paper flap on top */}
          <path
            ref={flapRef}
            d=""
            fill="url(#paperFlapGrad)"
            stroke="rgba(11, 50, 114, 0.18)"
            strokeWidth="0.8"
            filter="url(#heroCornerShadow)"
          />
        </svg>
      </div>

      {children}
    </div>
  )
}


