'use client'

import { useEffect, useRef, useState } from 'react'

interface Node {
  x: number
  y: number
  z: number
  energy: number
  pulse: number
  connections: number[]
}

interface DataParticle {
  x: number
  y: number
  z: number
  targetX: number
  targetY: number
  targetZ: number
  speed: number
  progress: number
  connectionIndex: number
  brightness: number
}

export default function NeuralNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>()
  const [nodes, setNodes] = useState<Node[]>([])
  const [particles, setParticles] = useState<DataParticle[]>([])

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

    // Create neural network nodes
    const createNodes = () => {
      const newNodes: Node[] = []
      const layers = 4
      const nodesPerLayer = [8, 12, 12, 8]
      
      for (let layer = 0; layer < layers; layer++) {
        const nodeCount = nodesPerLayer[layer]
        for (let i = 0; i < nodeCount; i++) {
          const x = (canvas.width / (layers + 1)) * (layer + 1)
          const y = (canvas.height / (nodeCount + 1)) * (i + 1)
          const z = (Math.random() - 0.5) * 300
          
          const node: Node = {
            x,
            y,
            z,
            energy: Math.random(),
            pulse: Math.random() * Math.PI * 2,
            connections: []
          }
          
          // Create connections to next layer
          if (layer < layers - 1) {
            const nextLayerStart = newNodes.length + nodeCount
            const nextLayerSize = nodesPerLayer[layer + 1]
            const connectionsCount = Math.min(3 + Math.floor(Math.random() * 3), nextLayerSize)
            
            for (let j = 0; j < connectionsCount; j++) {
              const targetIndex = nextLayerStart + Math.floor(Math.random() * nextLayerSize)
              node.connections.push(targetIndex)
            }
          }
          
          newNodes.push(node)
        }
      }
      
      setNodes(newNodes)
      return newNodes
    }

    // Create data particles
    const createParticles = (nodeList: Node[]) => {
      const newParticles: DataParticle[] = []
      
      for (let i = 0; i < 30; i++) {
        const sourceNode = nodeList[Math.floor(Math.random() * nodeList.length)]
        if (sourceNode.connections.length > 0) {
          const targetIndex = sourceNode.connections[Math.floor(Math.random() * sourceNode.connections.length)]
          const targetNode = nodeList[targetIndex]
          
          if (targetNode) {
            newParticles.push({
              x: sourceNode.x,
              y: sourceNode.y,
              z: sourceNode.z,
              targetX: targetNode.x,
              targetY: targetNode.y,
              targetZ: targetNode.z,
              speed: 0.02 + Math.random() * 0.03,
              progress: Math.random(),
              connectionIndex: i,
              brightness: 0.5 + Math.random() * 0.5
            })
          }
        }
      }
      
      setParticles(newParticles)
    }

    const nodeList = createNodes()
    createParticles(nodeList)

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      }
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const time = Date.now() * 0.001
      const mouse = mouseRef.current

      // Update and draw nodes
      nodes.forEach((node, index) => {
        // Update pulse
        node.pulse += 0.05
        node.energy = 0.3 + 0.7 * Math.sin(node.pulse)

        // Mouse interaction
        const dx = mouse.x - node.x
        const dy = mouse.y - node.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const mouseInfluence = Math.max(0, 1 - distance / 200)

        // 3D perspective calculation
        const perspective = 800
        const scale = perspective / (perspective + node.z)
        const screenX = node.x * scale + (1 - scale) * canvas.width / 2
        const screenY = node.y * scale + (1 - scale) * canvas.height / 2

        // Draw node
        const nodeSize = (3 + node.energy * 5 + mouseInfluence * 8) * scale
        const alpha = 0.6 + node.energy * 0.4 + mouseInfluence * 0.4

        ctx.beginPath()
        ctx.arc(screenX, screenY, nodeSize, 0, Math.PI * 2)
        
        // Gradient based on energy and mouse proximity
        const gradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, nodeSize * 2)
        if (mouseInfluence > 0.1) {
          gradient.addColorStop(0, `rgba(0, 217, 255, ${alpha})`)
          gradient.addColorStop(1, `rgba(147, 51, 234, ${alpha * 0.3})`)
        } else {
          gradient.addColorStop(0, `rgba(0, 217, 255, ${alpha})`)
          gradient.addColorStop(1, `rgba(0, 217, 255, 0)`)
        }
        
        ctx.fillStyle = gradient
        ctx.fill()

        // Draw connections
        node.connections.forEach(targetIndex => {
          const targetNode = nodes[targetIndex]
          if (!targetNode) return

          const targetScale = perspective / (perspective + targetNode.z)
          const targetScreenX = targetNode.x * targetScale + (1 - targetScale) * canvas.width / 2
          const targetScreenY = targetNode.y * targetScale + (1 - targetScale) * canvas.height / 2

          // Calculate connection strength based on mouse proximity
          const connectionMidX = (screenX + targetScreenX) / 2
          const connectionMidY = (screenY + targetScreenY) / 2
          const connectionDx = mouse.x - connectionMidX
          const connectionDy = mouse.y - connectionMidY
          const connectionDistance = Math.sqrt(connectionDx * connectionDx + connectionDy * connectionDy)
          const connectionInfluence = Math.max(0, 1 - connectionDistance / 150)

          ctx.beginPath()
          ctx.moveTo(screenX, screenY)
          ctx.lineTo(targetScreenX, targetScreenY)
          
          const lineAlpha = 0.2 + node.energy * 0.3 + connectionInfluence * 0.5
          ctx.strokeStyle = `rgba(0, 217, 255, ${lineAlpha})`
          ctx.lineWidth = (1 + connectionInfluence * 3) * Math.min(scale, targetScale)
          ctx.stroke()
        })
      })

      // Update and draw particles
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          // Update position
          particle.progress += particle.speed

          if (particle.progress >= 1) {
            // Reset particle to a new random connection
            const sourceNode = nodes[Math.floor(Math.random() * nodes.length)]
            if (sourceNode.connections.length > 0) {
              const targetIndex = sourceNode.connections[Math.floor(Math.random() * sourceNode.connections.length)]
              const targetNode = nodes[targetIndex]
              
              if (targetNode) {
                particle.x = sourceNode.x
                particle.y = sourceNode.y
                particle.z = sourceNode.z
                particle.targetX = targetNode.x
                particle.targetY = targetNode.y
                particle.targetZ = targetNode.z
                particle.progress = 0
                particle.brightness = 0.5 + Math.random() * 0.5
              }
            }
          }

          // Interpolate position
          const currentX = particle.x + (particle.targetX - particle.x) * particle.progress
          const currentY = particle.y + (particle.targetY - particle.y) * particle.progress
          const currentZ = particle.z + (particle.targetZ - particle.z) * particle.progress

          // 3D perspective for particle
          const particleScale = perspective / (perspective + currentZ)
          const particleScreenX = currentX * particleScale + (1 - particleScale) * canvas.width / 2
          const particleScreenY = currentY * particleScale + (1 - particleScale) * canvas.height / 2

          // Mouse interaction for speed boost
          const dx = mouse.x - particleScreenX
          const dy = mouse.y - particleScreenY
          const distance = Math.sqrt(dx * dx + dy * dy)
          const speedBoost = distance < 100 ? 2 : 1

          // Draw particle
          const particleSize = (2 + particle.brightness * 3) * particleScale
          ctx.beginPath()
          ctx.arc(particleScreenX, particleScreenY, particleSize, 0, Math.PI * 2)
          
          const particleGradient = ctx.createRadialGradient(
            particleScreenX, particleScreenY, 0,
            particleScreenX, particleScreenY, particleSize * 2
          )
          particleGradient.addColorStop(0, `rgba(255, 255, 255, ${particle.brightness})`)
          particleGradient.addColorStop(1, `rgba(0, 217, 255, 0)`)
          
          ctx.fillStyle = particleGradient
          ctx.fill()

          return {
            ...particle,
            speed: (particle.speed * 0.98 + (0.02 + Math.random() * 0.03) * speedBoost * 0.02)
          }
        })
      )

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
  }, [nodes, particles])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ 
        background: 'radial-gradient(ellipse at center, rgba(0, 217, 255, 0.03) 0%, rgba(0, 0, 0, 0.1) 70%)',
        zIndex: 1
      }}
    />
  )
}