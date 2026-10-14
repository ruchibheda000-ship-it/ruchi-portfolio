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
/**
 * InteractiveHeroPage
 * Provides a tactile physical corner page lift whenever the mouse hovers over Page 1 of the diary.
 * The entire page sheet stays stationary (no whole-page shifting or translation).
 * Directional response:
 * - If cursor enters/approaches from the right -> top-right corner curls up.
 * - If cursor enters/approaches from the left -> top-left corner curls up.
 * Both corners exhibit organic paper spring physics and settle completely flat on pointer leave.
 */
export function InteractiveHeroPage({ children, className = "" }) {
  const containerRef = useRef(null)

  // Right corner refs
  const rightCutoutRef = useRef(null)
  const rightCreaseShadowRef = useRef(null)
  const rightFlapRef = useRef(null)

  // Left corner refs
  const leftCutoutRef = useRef(null)
  const leftCreaseShadowRef = useRef(null)
  const leftFlapRef = useRef(null)

  const isHovered = useRef(false)
  const isRunning = useRef(false)
  const rafId = useRef(null)

  // Spring physics state for right corner curl (s in px)
  const rightCurrentS = useRef(0)
  const rightTargetS = useRef(0)
  const rightVS = useRef(0)

  // Spring physics state for left corner curl (s in px)
  const leftCurrentS = useRef(0)
  const leftTargetS = useRef(0)
  const leftVS = useRef(0)

  const W = 96 // Base dimension for corner curl viewBox

  const renderRightCurl = (s) => {
    if (!rightCutoutRef.current || !rightCreaseShadowRef.current || !rightFlapRef.current) return

    if (s <= 0.4) {
      rightCutoutRef.current.setAttribute('d', '')
      rightCreaseShadowRef.current.setAttribute('d', '')
      rightFlapRef.current.setAttribute('d', '')
      return
    }

    const cutoutPath = `M ${(W - s).toFixed(1)} 0 L ${W} 0 L ${W} ${s.toFixed(1)} Z`
    rightCutoutRef.current.setAttribute('d', cutoutPath)
    rightCreaseShadowRef.current.setAttribute('d', cutoutPath)

    const tipX = W - s * 0.94
    const tipY = s * 0.94
    const c1X = W - s * 1.05
    const c1Y = s * 0.46
    const c2X = W - s * 0.46
    const c2Y = s * 1.05

    const flapPath = `M ${(W - s).toFixed(1)} 0 Q ${c1X.toFixed(1)} ${c1Y.toFixed(1)} ${tipX.toFixed(1)} ${tipY.toFixed(1)} Q ${c2X.toFixed(1)} ${c2Y.toFixed(1)} ${W} ${s.toFixed(1)} Z`
    rightFlapRef.current.setAttribute('d', flapPath)
  }

  const renderLeftCurl = (s) => {
    if (!leftCutoutRef.current || !leftCreaseShadowRef.current || !leftFlapRef.current) return

    if (s <= 0.4) {
      leftCutoutRef.current.setAttribute('d', '')
      leftCreaseShadowRef.current.setAttribute('d', '')
      leftFlapRef.current.setAttribute('d', '')
      return
    }

    const cutoutPath = `M ${s.toFixed(1)} 0 L 0 0 L 0 ${s.toFixed(1)} Z`
    leftCutoutRef.current.setAttribute('d', cutoutPath)
    leftCreaseShadowRef.current.setAttribute('d', cutoutPath)

    const tipX = s * 0.94
    const tipY = s * 0.94
    const c1X = s * 1.05
    const c1Y = s * 0.46
    const c2X = s * 0.46
    const c2Y = s * 1.05

    const flapPath = `M ${s.toFixed(1)} 0 Q ${c1X.toFixed(1)} ${c1Y.toFixed(1)} ${tipX.toFixed(1)} ${tipY.toFixed(1)} Q ${c2X.toFixed(1)} ${c2Y.toFixed(1)} 0 ${s.toFixed(1)} Z`
    leftFlapRef.current.setAttribute('d', flapPath)
  }

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const SPRING_K = 0.12
    const DAMPING = 0.76

    const update = () => {
      // Right corner update
      const aR = (rightTargetS.current - rightCurrentS.current) * SPRING_K
      rightVS.current = (rightVS.current + aR) * DAMPING
      rightCurrentS.current += rightVS.current
      renderRightCurl(rightCurrentS.current)

      // Left corner update
      const aL = (leftTargetS.current - leftCurrentS.current) * SPRING_K
      leftVS.current = (leftVS.current + aL) * DAMPING
      leftCurrentS.current += leftVS.current
      renderLeftCurl(leftCurrentS.current)

      const isMovingR =
        Math.abs(rightTargetS.current - rightCurrentS.current) > 0.1 ||
        Math.abs(rightVS.current) > 0.04
      const isMovingL =
        Math.abs(leftTargetS.current - leftCurrentS.current) > 0.1 ||
        Math.abs(leftVS.current) > 0.04

      if (isMovingR || isMovingL) {
        rafId.current = requestAnimationFrame(update)
      } else {
        rightCurrentS.current = rightTargetS.current
        leftCurrentS.current = leftTargetS.current
        renderRightCurl(rightCurrentS.current)
        renderLeftCurl(leftCurrentS.current)
        isRunning.current = false
      }
    }

    const start = () => {
      if (!isRunning.current) {
        isRunning.current = true
        rafId.current = requestAnimationFrame(update)
      }
    }

    const evaluateTargets = (e) => {
      const rect = el.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return

      const normX = (e.clientX - rect.left) / rect.width

      if (normX >= 0.5) {
        // Cursor on right side -> right corner folds
        const dx = rect.right - e.clientX
        const dy = e.clientY - rect.top
        const dist = Math.hypot(dx, dy)
        const proximity = dist < 220 ? (1 - dist / 220) : 0

        rightTargetS.current = 50 + proximity * 14
        leftTargetS.current = 0
      } else {
        // Cursor on left side -> left corner folds
        const dx = e.clientX - rect.left
        const dy = e.clientY - rect.top
        const dist = Math.hypot(dx, dy)
        const proximity = dist < 220 ? (1 - dist / 220) : 0

        leftTargetS.current = 50 + proximity * 14
        rightTargetS.current = 0
      }

      start()
    }

    const onPointerEnter = (e) => {
      if (e.pointerType === 'touch') return
      isHovered.current = true
      evaluateTargets(e)
    }

    const onPointerMove = (e) => {
      if (e.pointerType === 'touch' || !isHovered.current) return
      evaluateTargets(e)
    }

    const onPointerLeave = (e) => {
      if (e.pointerType === 'touch') return
      isHovered.current = false
      rightTargetS.current = 0
      leftTargetS.current = 0
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
        className="corner-lift-layer-right absolute top-0 right-0 pointer-events-none z-30 overflow-hidden w-[96px] h-[96px] rounded-tr-[24px] sm:rounded-tr-[36px]"
        aria-hidden="true"
      >
        <svg
          className="w-full h-full overflow-visible"
          viewBox="0 0 96 96"
          fill="none"
        >
          <defs>
            <filter id="heroCornerShadowRight" x="-50%" y="-50%" width="220%" height="220%">
              <feDropShadow dx="-3" dy="4.5" stdDeviation="3.5" floodColor="#061840" floodOpacity="0.32" />
              <feDropShadow dx="-1" dy="1.5" stdDeviation="1.5" floodColor="#061840" floodOpacity="0.18" />
            </filter>

            <linearGradient id="cornerRecessGradRight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#051532" />
              <stop offset="50%" stopColor="#09275B" />
              <stop offset="100%" stopColor="#0B3272" />
            </linearGradient>

            <linearGradient id="cornerCreaseShadowRight" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(4, 16, 40, 0.42)" />
              <stop offset="35%" stopColor="rgba(4, 16, 40, 0.1)" />
              <stop offset="100%" stopColor="rgba(4, 16, 40, 0)" />
            </linearGradient>

            <linearGradient id="paperFlapGradRight" x1="100%" y1="0%" x2="35%" y2="70%">
              <stop offset="0%" stopColor="#D8C4A7" />
              <stop offset="25%" stopColor="#EAD9C1" />
              <stop offset="55%" stopColor="#FFFDF9" />
              <stop offset="85%" stopColor="#F5E8D3" />
              <stop offset="100%" stopColor="#E4D0B5" />
            </linearGradient>
          </defs>

          <path ref={rightCutoutRef} d="" fill="url(#cornerRecessGradRight)" />
          <path ref={rightCreaseShadowRef} d="" fill="url(#cornerCreaseShadowRight)" />
          <path
            ref={rightFlapRef}
            d=""
            fill="url(#paperFlapGradRight)"
            stroke="rgba(11, 50, 114, 0.18)"
            strokeWidth="0.8"
            filter="url(#heroCornerShadowRight)"
          />
        </svg>
      </div>

      {/* Top-Left Tactile Corner Page Lift */}
      <div
        className="corner-lift-layer-left absolute top-0 left-0 pointer-events-none z-30 overflow-hidden w-[96px] h-[96px] rounded-tl-[24px] sm:rounded-tl-[36px]"
        aria-hidden="true"
      >
        <svg
          className="w-full h-full overflow-visible"
          viewBox="0 0 96 96"
          fill="none"
        >
          <defs>
            <filter id="heroCornerShadowLeft" x="-50%" y="-50%" width="220%" height="220%">
              <feDropShadow dx="3" dy="4.5" stdDeviation="3.5" floodColor="#061840" floodOpacity="0.32" />
              <feDropShadow dx="1" dy="1.5" stdDeviation="1.5" floodColor="#061840" floodOpacity="0.18" />
            </filter>

            <linearGradient id="cornerRecessGradLeft" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#051532" />
              <stop offset="50%" stopColor="#09275B" />
              <stop offset="100%" stopColor="#0B3272" />
            </linearGradient>

            <linearGradient id="cornerCreaseShadowLeft" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="rgba(4, 16, 40, 0.42)" />
              <stop offset="35%" stopColor="rgba(4, 16, 40, 0.1)" />
              <stop offset="100%" stopColor="rgba(4, 16, 40, 0)" />
            </linearGradient>

            <linearGradient id="paperFlapGradLeft" x1="0%" y1="0%" x2="65%" y2="70%">
              <stop offset="0%" stopColor="#D8C4A7" />
              <stop offset="25%" stopColor="#EAD9C1" />
              <stop offset="55%" stopColor="#FFFDF9" />
              <stop offset="85%" stopColor="#F5E8D3" />
              <stop offset="100%" stopColor="#E4D0B5" />
            </linearGradient>
          </defs>

          <path ref={leftCutoutRef} d="" fill="url(#cornerRecessGradLeft)" />
          <path ref={leftCreaseShadowRef} d="" fill="url(#cornerCreaseShadowLeft)" />
          <path
            ref={leftFlapRef}
            d=""
            fill="url(#paperFlapGradLeft)"
            stroke="rgba(11, 50, 114, 0.18)"
            strokeWidth="0.8"
            filter="url(#heroCornerShadowLeft)"
          />
        </svg>
      </div>

      {children}
    </div>
  )
}


