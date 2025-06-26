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

    // No particles - just beautiful floating lights
    const createParticles = (nodeList: Node[]) => {
      setParticles([])
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
      ctx.fillStyle = 'rgba(0, 0, 0, 0.01)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const time = Date.now() * 0.001
      const mouse = mouseRef.current
      const perspective = 1200

      // Update and draw nodes
      nodes.forEach((node, index) => {
        // Extremely slow, almost static pulse
        node.pulse += 0.002
        node.energy = 0.5 + 0.1 * Math.sin(node.pulse)

        // Very subtle mouse interaction
        const dx = mouse.x - node.x
        const dy = mouse.y - node.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const mouseInfluence = Math.max(0, 1 - distance / 200) * 0.2

        // 3D perspective calculation
        const scale = perspective / (perspective + node.z)
        const screenX = node.x * scale + (1 - scale) * canvas.width / 2
        const screenY = node.y * scale + (1 - scale) * canvas.height / 2

        // Draw very subtle glowing node
        const nodeSize = (1.5 + node.energy * 1 + mouseInfluence * 2) * scale
        const alpha = 0.2 + node.energy * 0.15 + mouseInfluence * 0.2

        // Draw very subtle outer glow
        ctx.beginPath()
        ctx.arc(screenX, screenY, nodeSize * 2, 0, Math.PI * 2)
        const outerGradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, nodeSize * 2)
        outerGradient.addColorStop(0, `rgba(0, 217, 255, ${alpha * 0.05})`)
        outerGradient.addColorStop(0.5, `rgba(0, 217, 255, ${alpha * 0.02})`)
        outerGradient.addColorStop(1, `rgba(0, 217, 255, 0)`)
        ctx.fillStyle = outerGradient
        ctx.fill()

        // Draw main node with neon effect
        ctx.beginPath()
        ctx.arc(screenX, screenY, nodeSize, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, nodeSize * 1.5)
        
        if (mouseInfluence > 0.05) {
          gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.4})`)
          gradient.addColorStop(0.4, `rgba(0, 217, 255, ${alpha * 0.3})`)
          gradient.addColorStop(1, `rgba(0, 217, 255, 0)`)
        } else {
          gradient.addColorStop(0, `rgba(0, 217, 255, ${alpha * 0.3})`)
          gradient.addColorStop(0.6, `rgba(0, 180, 220, ${alpha * 0.2})`)
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

          // Very subtle connection lines
          const connectionMidX = (screenX + targetScreenX) / 2
          const connectionMidY = (screenY + targetScreenY) / 2
          const connectionDx = mouse.x - connectionMidX
          const connectionDy = mouse.y - connectionMidY
          const connectionDistance = Math.sqrt(connectionDx * connectionDx + connectionDy * connectionDy)
          const connectionInfluence = Math.max(0, 1 - connectionDistance / 150) * 0.15

          // Draw very subtle connection
          ctx.beginPath()
          ctx.moveTo(screenX, screenY)
          ctx.lineTo(targetScreenX, targetScreenY)
          
          const lineAlpha = 0.03 + node.energy * 0.05 + connectionInfluence * 0.1
          ctx.strokeStyle = `rgba(0, 217, 255, ${lineAlpha})`
          ctx.lineWidth = (0.5 + connectionInfluence * 0.5) * Math.min(scale, targetScale)
          ctx.stroke()
        })
      })

      // No particles - just the beautiful floating network


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
        background: 'radial-gradient(ellipse at center, rgba(0, 217, 255, 0.02) 0%, rgba(0, 150, 200, 0.01) 50%, rgba(0, 0, 0, 0.1) 100%)',
        zIndex: 1
      }}
    />
  )
}