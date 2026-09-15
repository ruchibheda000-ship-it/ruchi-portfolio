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
 * Wraps the hand-drawn hero portrait illustration with subtle ambient page-entry wakeup
 * and gentle buoyant reaction when the cursor nears it.
 */
export function InteractiveIllustration({ isWakingUp, className = "" }) {
  const ref = useRef(null)
  const isRunning = useRef(false)
  const rafId = useRef(null)

  const state = useRef({ y: 0, rot: 0, scale: 1, vy: 0, vrot: 0, vscale: 0 })
  const target = useRef({ y: 0, rot: 0, scale: 1 })

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

  // Cursor proximity physics
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
      className={`will-change-transform origin-bottom select-none ${className}`}
    >
      <img
        src="/hero-illustration.png"
        alt="Hand-drawn portrait illustration of Ruchi"
        className="w-full h-auto max-h-[360px] sm:max-h-[400px] md:max-h-[430px] object-contain drop-shadow-sm select-none pointer-events-none"
        draggable="false"
      />
    </div>
  )
}

