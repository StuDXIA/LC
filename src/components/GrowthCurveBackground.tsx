'use client'

import { useEffect, useRef, useState } from 'react'

interface GrowthLine {
  id: number
  startX: number
  progress: number
  speed: number
  amplitude: number
  frequency: number
  opacity: number
  hovered: boolean
  color: {
    r: number
    g: number
    b: number
  }
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  opacity: number
  followMouse: boolean
}

export default function GrowthCurveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>()
  const [growthLines, setGrowthLines] = useState<GrowthLine[]>([])
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Canvas setup
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Create growth curves
    const createGrowthLines = () => {
      const lines: GrowthLine[] = []
      const colors = [
        { r: 0, g: 217, b: 255 },    // neon-blue
        { r: 100, g: 200, b: 255 },  // lighter blue
        { r: 0, g: 180, b: 220 },    // deeper blue
        { r: 50, g: 150, b: 255 },   // medium blue
        { r: 0, g: 250, b: 200 },    // blue-cyan
      ]

      for (let i = 0; i < 5; i++) {
        lines.push({
          id: i,
          startX: (canvas.width / 6) * (i + 1),
          progress: Math.random() * 0.3,
          speed: 0.002 + Math.random() * 0.003,
          amplitude: 50 + Math.random() * 100,
          frequency: 0.003 + Math.random() * 0.002,
          opacity: 0.3 + Math.random() * 0.4,
          hovered: false,
          color: colors[i]
        })
      }
      setGrowthLines(lines)
    }

    // Create upward flowing particles
    const createParticles = () => {
      const newParticles: Particle[] = []
      for (let i = 0; i < 80; i++) {
        newParticles.push({
          x: Math.random() * canvas.width,
          y: canvas.height + Math.random() * 200,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -0.5 - Math.random() * 1.5,
          life: 0,
          maxLife: 100 + Math.random() * 200,
          size: 1 + Math.random() * 2,
          opacity: 0.2 + Math.random() * 0.5,
          followMouse: false
        })
      }
      setParticles(newParticles)
    }

    createGrowthLines()
    createParticles()

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      }
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Growth curve mathematical function (exponential growth)
    const getGrowthCurveY = (x: number, line: GrowthLine, progress: number) => {
      const normalizedX = (x - line.startX) / canvas.width
      if (normalizedX < 0 || normalizedX > progress) return null

      // Exponential growth curve: y = a * e^(b*x) + wave
      const exponentialGrowth = Math.pow(normalizedX * 3, 1.8)
      const wave = Math.sin(normalizedX * Math.PI * line.frequency * 50) * line.amplitude * 0.3
      
      return canvas.height - (exponentialGrowth * canvas.height * 0.6 + wave + 100)
    }

    // Animation loop
    const animate = () => {
      // Clear with subtle trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const mouse = mouseRef.current

      // Update and draw growth lines
      setGrowthLines(prevLines => 
        prevLines.map(line => {
          // Update progress
          let newProgress = line.progress + line.speed
          if (newProgress > 1) {
            newProgress = 0 // Reset for continuous animation
          }

          // Check mouse hover
          const linePoints: { x: number, y: number }[] = []
          for (let x = line.startX; x <= line.startX + canvas.width * newProgress; x += 5) {
            const y = getGrowthCurveY(x, line, newProgress)
            if (y !== null) {
              linePoints.push({ x, y })
            }
          }

          // Check if mouse is near the line
          let isHovered = false
          for (const point of linePoints) {
            const distance = Math.sqrt(
              Math.pow(mouse.x - point.x, 2) + Math.pow(mouse.y - point.y, 2)
            )
            if (distance < 30) {
              isHovered = true
              break
            }
          }

          return {
            ...line,
            progress: newProgress,
            hovered: isHovered
          }
        })
      )

      // Draw growth curves
      growthLines.forEach(line => {
        const points: { x: number, y: number }[] = []
        
        // Calculate curve points
        for (let x = line.startX; x <= line.startX + canvas.width * line.progress; x += 3) {
          const y = getGrowthCurveY(x, line, line.progress)
          if (y !== null) {
            points.push({ x, y })
          }
        }

        if (points.length < 2) return

        // Draw glow effect
        const glowIntensity = line.hovered ? 3 : 1
        const glowSize = line.hovered ? 8 : 4
        
        for (let i = 0; i < glowIntensity; i++) {
          ctx.beginPath()
          ctx.moveTo(points[0].x, points[0].y)
          
          for (let j = 1; j < points.length; j++) {
            ctx.lineTo(points[j].x, points[j].y)
          }
          
          const alpha = (line.opacity * (line.hovered ? 0.8 : 0.4)) / (i + 1)
          ctx.strokeStyle = `rgba(${line.color.r}, ${line.color.g}, ${line.color.b}, ${alpha})`
          ctx.lineWidth = (line.hovered ? 6 : 3) + glowSize - i * 2
          ctx.lineCap = 'round'
          ctx.lineJoin = 'round'
          ctx.stroke()
        }

        // Draw core line
        ctx.beginPath()
        ctx.moveTo(points[0].x, points[0].y)
        
        for (let j = 1; j < points.length; j++) {
          ctx.lineTo(points[j].x, points[j].y)
        }
        
        ctx.strokeStyle = `rgba(${line.color.r}, ${line.color.g}, ${line.color.b}, ${line.hovered ? 1 : 0.8})`
        ctx.lineWidth = line.hovered ? 3 : 1.5
        ctx.stroke()

        // Draw growth points (dots along the curve)
        if (line.hovered) {
          points.forEach((point, index) => {
            if (index % 8 === 0) {
              ctx.beginPath()
              ctx.arc(point.x, point.y, 3, 0, Math.PI * 2)
              ctx.fillStyle = `rgba(255, 255, 255, 0.8)`
              ctx.fill()
              
              // Outer glow
              ctx.beginPath()
              ctx.arc(point.x, point.y, 6, 0, Math.PI * 2)
              ctx.fillStyle = `rgba(${line.color.r}, ${line.color.g}, ${line.color.b}, 0.3)`
              ctx.fill()
            }
          })
        }
      })

      // Update and draw particles
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          // Update particle position
          let newVx = particle.vx
          let newVy = particle.vy
          let newFollowMouse = particle.followMouse

          // Mouse attraction
          const mouseDistance = Math.sqrt(
            Math.pow(mouse.x - particle.x, 2) + Math.pow(mouse.y - particle.y, 2)
          )

          if (mouseDistance < 150) {
            const attractionForce = (150 - mouseDistance) / 150 * 0.02
            const angleToMouse = Math.atan2(mouse.y - particle.y, mouse.x - particle.x)
            newVx += Math.cos(angleToMouse) * attractionForce
            newVy += Math.sin(angleToMouse) * attractionForce
            newFollowMouse = true
          } else {
            newFollowMouse = false
          }

          // Apply some drag to prevent infinite acceleration
          newVx *= 0.98
          newVy *= 0.98

          // Ensure upward movement
          if (newVy > -0.2) {
            newVy = -0.2 - Math.random() * 0.5
          }

          const newX = particle.x + newVx
          const newY = particle.y + newVy
          const newLife = particle.life + 1

          // Reset particle if it goes off screen or dies
          if (newY < -50 || newLife > particle.maxLife) {
            return {
              x: Math.random() * canvas.width,
              y: canvas.height + Math.random() * 100,
              vx: (Math.random() - 0.5) * 0.5,
              vy: -0.5 - Math.random() * 1.5,
              life: 0,
              maxLife: 100 + Math.random() * 200,
              size: 1 + Math.random() * 2,
              opacity: 0.2 + Math.random() * 0.5,
              followMouse: false
            }
          }

          return {
            ...particle,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
            life: newLife,
            followMouse: newFollowMouse
          }
        })
      )

      // Draw particles
      particles.forEach(particle => {
        const lifeRatio = 1 - (particle.life / particle.maxLife)
        const alpha = particle.opacity * lifeRatio * (particle.followMouse ? 1.5 : 1)
        const size = particle.size * (particle.followMouse ? 1.5 : 1)

        // Particle glow
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, size * 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 217, 255, ${alpha * 0.1})`
        ctx.fill()

        // Particle core
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2)
        ctx.fillStyle = particle.followMouse 
          ? `rgba(255, 255, 255, ${alpha})`
          : `rgba(0, 217, 255, ${alpha})`
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [growthLines, particles])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ 
        background: 'linear-gradient(180deg, rgba(0, 10, 20, 0.8) 0%, rgba(0, 30, 60, 0.3) 50%, rgba(0, 50, 100, 0.1) 100%)',
        zIndex: 1
      }}
    />
  )
}