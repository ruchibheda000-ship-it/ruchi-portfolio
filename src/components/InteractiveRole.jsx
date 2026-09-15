import React, { useRef, useEffect } from 'react'

/**
 * InteractiveRole
 * Renders "UI/UX Designer" where each individual letter organically reacts
 * to cursor proximity with smooth spring physics, subtle displacement,
 * tiny scale/tilt, and fluid neighbor response.
 */
export default function InteractiveRole({ text = "UI/UX Designer", className = "" }) {
  const containerRef = useRef(null)
  const letterRefs = useRef([])
  const physicsState = useRef([])
  const mousePos = useRef({ x: -9999, y: -9999, active: false })
  const rafId = useRef(null)
  const isRunning = useRef(false)

  // Split phrase into words and letters while preserving natural word wrapping
  const words = text.split(' ')

  // Initialize physics states for each character
  const totalChars = text.replace(/ /g, '').length
  if (physicsState.current.length !== totalChars) {
    physicsState.current = Array.from({ length: totalChars }, () => ({
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      vx: 0,
      vy: 0,
      vscale: 0,
      vrotate: 0,
      targetX: 0,
      targetY: 0,
      targetScale: 1,
      targetRotate: 0,
    }))
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Spring physics configuration (organic, tactile, playful, subtle)
    const SPRING_STIFFNESS = 0.12
    const SPRING_DAMPING = 0.78
    const PROXIMITY_RADIUS = 75 // radius of influence in px per character
    const BOUND_MARGIN = 60 // window proximity margin around the text block

    const updatePhysics = () => {
      let isMoving = false
      const mouse = mousePos.current

      letterRefs.current.forEach((el, i) => {
        if (!el) return
        const state = physicsState.current[i]
        if (!state) return

        if (mouse.active) {
          const rect = el.getBoundingClientRect()
          const charCenterX = rect.left + rect.width / 2
          const charCenterY = rect.top + rect.height / 2

          const dx = charCenterX - mouse.x
          const dy = charCenterY - mouse.y
          const dist = Math.hypot(dx, dy)

          if (dist < PROXIMITY_RADIUS) {
            // Smooth hermite falloff (0 at edge, 1 at center)
            const rawT = 1 - dist / PROXIMITY_RADIUS
            const t = rawT * rawT * (3 - 2 * rawT)

            const angle = Math.atan2(dy, dx)
            // Subtle outward repulsion (max ~4px)
            const pushDist = t * 4.2
            // Gentle buoyant lift (max ~3.5px)
            const lift = -t * 3.5

            state.targetX = Math.cos(angle) * pushDist
            state.targetY = Math.sin(angle) * pushDist + lift
            // Subtle organic tilt (max ~4 deg)
            state.targetRotate = Math.max(-4.5, Math.min(4.5, (dx / PROXIMITY_RADIUS) * 5 * t))
            // Subtle scale (max 1.10x)
            state.targetScale = 1 + 0.10 * t
          } else {
            state.targetX = 0
            state.targetY = 0
            state.targetRotate = 0
            state.targetScale = 1
          }
        } else {
          state.targetX = 0
          state.targetY = 0
          state.targetRotate = 0
          state.targetScale = 1
        }

        // Spring physics: F = -k * x - c * v
        const ax = (state.targetX - state.x) * SPRING_STIFFNESS
        state.vx = (state.vx + ax) * SPRING_DAMPING
        state.x += state.vx

        const ay = (state.targetY - state.y) * SPRING_STIFFNESS
        state.vy = (state.vy + ay) * SPRING_DAMPING
        state.y += state.vy

        const aScale = (state.targetScale - state.scale) * SPRING_STIFFNESS
        state.vscale = (state.vscale + aScale) * SPRING_DAMPING
        state.scale += state.vscale

        const aRotate = (state.targetRotate - state.rotate) * SPRING_STIFFNESS
        state.vrotate = (state.vrotate + aRotate) * SPRING_DAMPING
        state.rotate += state.vrotate

        // Apply hardware-accelerated 3D transform
        el.style.transform = `translate3d(${state.x.toFixed(2)}px, ${state.y.toFixed(2)}px, 0) scale(${state.scale.toFixed(3)}) rotate(${state.rotate.toFixed(2)}deg)`

        // Check settling threshold
        const deltaX = Math.abs(state.targetX - state.x)
        const deltaY = Math.abs(state.targetY - state.y)
        const deltaScale = Math.abs(state.targetScale - state.scale)
        const deltaRotate = Math.abs(state.targetRotate - state.rotate)
        const speed = Math.abs(state.vx) + Math.abs(state.vy) + Math.abs(state.vscale) + Math.abs(state.vrotate)

        if (deltaX > 0.01 || deltaY > 0.01 || deltaScale > 0.003 || deltaRotate > 0.01 || speed > 0.01) {
          isMoving = true
        }
      })

      if (isMoving || mouse.active) {
        rafId.current = requestAnimationFrame(updatePhysics)
      } else {
        isRunning.current = false
      }
    }

    const startPhysics = () => {
      if (!isRunning.current) {
        isRunning.current = true
        rafId.current = requestAnimationFrame(updatePhysics)
      }
    }

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return

      const inRange = (
        e.clientX >= rect.left - BOUND_MARGIN &&
        e.clientX <= rect.right + BOUND_MARGIN &&
        e.clientY >= rect.top - BOUND_MARGIN &&
        e.clientY <= rect.bottom + BOUND_MARGIN
      )

      if (inRange) {
        mousePos.current.x = e.clientX
        mousePos.current.y = e.clientY
        mousePos.current.active = true
        startPhysics()
      } else if (mousePos.current.active) {
        mousePos.current.active = false
        startPhysics()
      }
    }

    const onPointerLeave = () => {
      if (mousePos.current.active) {
        mousePos.current.active = false
        startPhysics()
      }
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('mouseleave', onPointerLeave)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('mouseleave', onPointerLeave)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  let charIndexCounter = 0

  return (
    <div
      ref={containerRef}
      className={`inline-block select-none cursor-default py-0.5 ${className}`}
      aria-label={text}
      role="text"
    >
      {words.map((word, wordIdx) => (
        <React.Fragment key={wordIdx}>
          <span className="inline-block whitespace-nowrap">
            {word.split('').map((char, charInWordIdx) => {
              const globalIndex = charIndexCounter++
              return (
                <span
                  key={charInWordIdx}
                  ref={(el) => (letterRefs.current[globalIndex] = el)}
                  className="inline-block transition-none will-change-transform origin-bottom"
                  aria-hidden="true"
                >
                  {char}
                </span>
              )
            })}
          </span>
          {wordIdx < words.length - 1 && (
            <span className="inline-block whitespace-pre" aria-hidden="true">
              {' '}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
