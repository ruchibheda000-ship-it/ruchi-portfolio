import React, { useEffect, useRef } from 'react'

export default function TransparentVideo({
  src = '/ruchi-about-me.mp4',
  className = ''
}) {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    let animId = null
    let gl = null
    let ctx = null
    let program = null
    let texture = null

    // Attempt WebGL for 60fps GPU-accelerated background removal
    try {
      gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false })
    } catch (e) {
      gl = null
    }

    if (gl) {
      const vsSource = `
        attribute vec2 a_position;
        attribute vec2 a_texCoord;
        varying vec2 v_texCoord;
        void main() {
          gl_Position = vec4(a_position, 0.0, 1.0);
          v_texCoord = a_texCoord;
        }
      `
      // Chroma key shader: removes white background and antialiases edges
      const fsSource = `
        precision mediump float;
        uniform sampler2D u_image;
        varying vec2 v_texCoord;
        void main() {
          vec4 c = texture2D(u_image, v_texCoord);
          // If pure or near white, remove background
          if (c.r > 0.96 && c.g > 0.96 && c.b > 0.96) {
            gl_FragColor = vec4(0.0);
          } else if (c.r > 0.91 && c.g > 0.91 && c.b > 0.91) {
            float minVal = min(c.r, min(c.g, c.b));
            float a = clamp((0.96 - minVal) / 0.05, 0.0, 1.0);
            gl_FragColor = vec4(c.rgb, c.a * a);
          } else {
            gl_FragColor = c;
          }
        }
      `

      const createShader = (type, source) => {
        const shader = gl.createShader(type)
        gl.shaderSource(shader, source)
        gl.compileShader(shader)
        return shader
      }

      const vs = createShader(gl.VERTEX_SHADER, vsSource)
      const fs = createShader(gl.FRAGMENT_SHADER, fsSource)
      program = gl.createProgram()
      gl.attachShader(program, vs)
      gl.attachShader(program, fs)
      gl.linkProgram(program)
      gl.useProgram(program)

      const positionBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
          -1, -1,
           1, -1,
          -1,  1,
          -1,  1,
           1, -1,
           1,  1,
        ]),
        gl.STATIC_DRAW
      )

      const posAttr = gl.getAttribLocation(program, 'a_position')
      gl.enableVertexAttribArray(posAttr)
      gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0)

      const texCoordBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer)
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
          0, 1,
          1, 1,
          0, 0,
          0, 0,
          1, 1,
          1, 0,
        ]),
        gl.STATIC_DRAW
      )

      const texAttr = gl.getAttribLocation(program, 'a_texCoord')
      gl.enableVertexAttribArray(texAttr)
      gl.vertexAttribPointer(texAttr, 2, gl.FLOAT, false, 0, 0)

      texture = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

      const renderGL = () => {
        if (video.readyState >= 2) {
          const vw = video.videoWidth || 1080
          const vh = video.videoHeight || 1920
          if (canvas.width !== vw || canvas.height !== vh) {
            canvas.width = vw
            canvas.height = vh
            gl.viewport(0, 0, vw, vh)
          }
          gl.bindTexture(gl.TEXTURE_2D, texture)
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video)
          gl.clearColor(0, 0, 0, 0)
          gl.clear(gl.COLOR_BUFFER_BIT)
          gl.drawArrays(gl.TRIANGLES, 0, 6)
        }
        animId = requestAnimationFrame(renderGL)
      }

      video.play().catch(() => {})
      animId = requestAnimationFrame(renderGL)
    } else {
      // 2D Canvas fallback with TypedArray
      ctx = canvas.getContext('2d', { willReadFrequently: true })
      const render2D = () => {
        if (video.readyState >= 2) {
          const w = 540
          const h = 960
          if (canvas.width !== w) {
            canvas.width = w
            canvas.height = h
          }
          ctx.drawImage(video, 0, 0, w, h)
          const imgData = ctx.getImageData(0, 0, w, h)
          const data32 = new Uint32Array(imgData.data.buffer)
          for (let i = 0; i < data32.length; i++) {
            const pixel = data32[i]
            const r = pixel & 0xff
            const g = (pixel >> 8) & 0xff
            const b = (pixel >> 16) & 0xff
            if (r > 245 && g > 245 && b > 245) {
              data32[i] = 0
            }
          }
          ctx.putImageData(imgData, 0, 0)
        }
        animId = requestAnimationFrame(render2D)
      }

      video.play().catch(() => {})
      animId = requestAnimationFrame(render2D)
    }

    return () => {
      if (animId) cancelAnimationFrame(animId)
    }
  }, [src])

  // Restart video on scroll and viewport entry (no loop)
  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    video.loop = false

    let lastRestartTime = 0
    let lastScrollY = window.scrollY

    const restartVideo = () => {
      try {
        video.currentTime = 0
        video.play().catch(() => {})
      } catch (err) {
        // ignore autoplay restriction if any
      }
    }

    const handleScroll = () => {
      const rect = canvas.getBoundingClientRect()
      // Check if visible in viewport
      const inView = rect.top < window.innerHeight && rect.bottom > 0
      if (!inView) return

      const delta = Math.abs(window.scrollY - lastScrollY)
      if (delta > 3) {
        lastScrollY = window.scrollY
        const now = Date.now()
        // Trigger immediate restart when scroll starts, throttled to 500ms so it doesn't freeze on frame 0
        if (now - lastRestartTime > 500) {
          lastRestartTime = now
          restartVideo()
        }
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            lastRestartTime = Date.now()
            restartVideo()
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(canvas)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      className={`relative flex items-center justify-center transition-transform duration-500 ${className}`}
      style={{ transform: 'rotate(7deg)' }}
    >
      {/* Hidden Source Video (No Loop) */}
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="sr-only pointer-events-none"
        style={{ position: 'absolute', width: '1px', height: '1px', opacity: 0 }}
      >
        <source src="/Ruchi About Me Portfolio.mp4" type="video/mp4" />
      </video>

      {/* Real-time Transparent Canvas with White Background Keyed Out & 7 deg tilt */}
      <canvas
        ref={canvasRef}
        className="w-full h-auto max-w-[340px] sm:max-w-[400px] lg:max-w-[430px] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.65)] select-none pointer-events-none"
      />
    </div>
  )
}

