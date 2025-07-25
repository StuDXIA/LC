'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface NetworkNode {
  position: THREE.Vector3
  connections: number[]
  pulsePhase: number
  importance: number
  group: THREE.Group
  coreMesh: THREE.Mesh
  glowMesh: THREE.Mesh
  layer: number
}

interface Connection {
  line: THREE.Line
  sourceIndex: number
  targetIndex: number
  strength: number
}

interface Particle {
  mesh: THREE.Mesh
  sourceIndex: number
  targetIndex: number
  progress: number
  speed: number
}

export default function NeuralGrowthBackground() {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const cameraRef = useRef<THREE.PerspectiveCamera>()
  const nodesRef = useRef<NetworkNode[]>([])
  const connectionsRef = useRef<Connection[]>([])
  const particlesRef = useRef<Particle[]>([])
  const growthCurveRef = useRef<THREE.Line>()
  const animationIdRef = useRef<number>()
  const timeRef = useRef(0)
  const frameCount = useRef(0)
  const isReducedMotion = useRef(false)
  const isLowPerformance = useRef(false)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!mountRef.current) return

    // パフォーマンス設定の検出
    isReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    isLowPerformance.current = navigator.hardwareConcurrency <= 4 || /Android|iPhone|iPad/i.test(navigator.userAgent)

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, 100)
    camera.lookAt(0, 0, 0)
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mountRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    // Create neural network
    const createNodes = () => {
      const nodes: NetworkNode[] = []
      
      // Ultra-professional color palette
      const nodeColors = {
        primary: 0x0066CC,    // IBM Blue - 信頼と安定
        secondary: 0x004999,  // Darker professional blue
        tertiary: 0x003D7A    // Deep professional blue
      }

      // Layer configuration for professional layout
      const layers = isLowPerformance.current ? [
        { count: 1, radius: 0, y: 10, scale: 1.2 },      // Center
        { count: 3, radius: 30, y: 5, scale: 1.0 },      // First layer
        { count: 5, radius: 60, y: 0, scale: 0.9 }       // Second layer
      ] : [
        { count: 1, radius: 0, y: 10, scale: 1.2 },      // Center
        { count: 5, radius: 20, y: 5, scale: 1.0 },      // First layer
        { count: 8, radius: 40, y: 0, scale: 0.9 },      // Second layer
        { count: 12, radius: 60, y: -5, scale: 0.8 },    // Third layer
        { count: 15, radius: 80, y: -10, scale: 0.7 }    // Outer layer
      ]

      let nodeIndex = 0
      layers.forEach((layer, layerIndex) => {
        for (let i = 0; i < layer.count; i++) {
          const angle = (i / layer.count) * Math.PI * 2
          const x = Math.cos(angle) * layer.radius - 20 // Offset left
          const y = layer.y + (Math.random() - 0.5) * 5
          const z = (Math.random() - 0.5) * 20

          // Determine color based on position
          const color = layerIndex === 0 ? nodeColors.primary :
                       i % 3 === 0 ? nodeColors.primary :
                       i % 3 === 1 ? nodeColors.secondary :
                       nodeColors.tertiary

          // Node group
          const group = new THREE.Group()
          group.position.set(x, y, z)
          
          // Core sphere
          const coreGeometry = new THREE.SphereGeometry(0.5 * layer.scale, 16, 16)
          const coreMaterial = new THREE.MeshPhongMaterial({
            color: color,
            emissive: color,
            emissiveIntensity: 0.15,
            transparent: true,
            opacity: 0.9,
          })
          const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial)
          group.add(coreMesh)

          // Glow effect
          const glowGeometry = new THREE.SphereGeometry(1.5 * layer.scale, 16, 16)
          const glowMaterial = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.1,
            side: THREE.BackSide
          })
          const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial)
          group.add(glowMesh)

          // Initially hidden for animation
          group.scale.set(0, 0, 0)
          group.visible = false
          scene.add(group)

          nodes.push({
            position: new THREE.Vector3(x, y, z),
            connections: [],
            pulsePhase: Math.random() * Math.PI * 2,
            importance: layer.scale,
            group,
            coreMesh,
            glowMesh,
            layer: layerIndex
          })

          nodeIndex++
        }
      })

      // Define strategic connections
      let currentIndex = 0
      for (let layerIndex = 0; layerIndex < layers.length - 1; layerIndex++) {
        const currentLayer = layers[layerIndex]
        const nextLayer = layers[layerIndex + 1]
        const nextLayerStart = currentIndex + currentLayer.count

        for (let i = 0; i < currentLayer.count; i++) {
          const nodeIdx = currentIndex + i
          const connectionCount = layerIndex === 0 ? 5 : 2 + Math.floor(Math.random())
          
          for (let j = 0; j < connectionCount; j++) {
            const targetIdx = nextLayerStart + Math.floor(Math.random() * nextLayer.count)
            if (!nodes[nodeIdx].connections.includes(targetIdx)) {
              nodes[nodeIdx].connections.push(targetIdx)
            }
          }
        }
        currentIndex += currentLayer.count
      }

      nodesRef.current = nodes
    }

    // Create connections
    const createConnections = () => {
      const connections: Connection[] = []
      
      nodesRef.current.forEach((node, nodeIndex) => {
        node.connections.forEach(targetIndex => {
          const targetNode = nodesRef.current[targetIndex]
          if (!targetNode) return

          const points = [node.position, targetNode.position]
          const geometry = new THREE.BufferGeometry().setFromPoints(points)
          
          const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x0066CC,
            transparent: true,
            opacity: 0,
            linewidth: 1
          })
          
          const line = new THREE.Line(geometry, lineMaterial)
          line.visible = false
          scene.add(line)

          connections.push({
            line,
            sourceIndex: nodeIndex,
            targetIndex,
            strength: 0.3 + Math.random() * 0.4
          })
        })
      })

      connectionsRef.current = connections
    }

    // Create growth curve
    const createGrowthCurve = () => {
      const points: THREE.Vector3[] = []
      const segments = 100
      
      for (let i = 0; i <= segments; i++) {
        const t = i / segments
        const x = -50 + t * 120
        const y = -30 + 50 * (1 - Math.exp(-3 * t)) // Exponential growth
        points.push(new THREE.Vector3(x, y, 0))
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const material = new THREE.LineBasicMaterial({
        color: 0x0066CC,
        linewidth: 3,
        transparent: true,
        opacity: 0
      })

      const curve = new THREE.Line(geometry, material)
      curve.visible = false
      scene.add(curve)
      growthCurveRef.current = curve
    }

    // Create particles
    const createParticles = () => {
      const particles: Particle[] = []
      const particleGeometry = new THREE.SphereGeometry(0.25, 6, 6)
      
      const particleCount = isLowPerformance.current ? 10 : 20
      for (let i = 0; i < particleCount; i++) {
        const validNodes = nodesRef.current.filter(n => n.connections.length > 0)
        if (validNodes.length === 0) continue

        const sourceNode = validNodes[Math.floor(Math.random() * validNodes.length)]
        const sourceIndex = nodesRef.current.indexOf(sourceNode)
        const targetIndex = sourceNode.connections[Math.floor(Math.random() * sourceNode.connections.length)]

        const particleMaterial = new THREE.MeshStandardMaterial({
          color: 0x0066CC,
          transparent: true,
          opacity: 0,
          emissive: 0x003D7A,
          emissiveIntensity: 0.2
        })

        const mesh = new THREE.Mesh(particleGeometry, particleMaterial)
        mesh.visible = false
        scene.add(mesh)

        particles.push({
          mesh,
          sourceIndex,
          targetIndex,
          progress: Math.random(),
          speed: 0.003 + Math.random() * 0.002
        })
      }

      particlesRef.current = particles
    }

    // Initialize
    createNodes()
    createConnections()
    createGrowthCurve()
    createParticles()

    // Mouse tracking
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    // Animation loop with enhanced performance optimization
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)
      
      // Skip more frames for better performance
      frameCount.current++
      if (isLowPerformance.current && frameCount.current % 3 !== 0) return
      if (!isLowPerformance.current && frameCount.current % 2 !== 0) return

      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return

      const time = Date.now() * 0.001
      const deltaTime = time - timeRef.current
      timeRef.current = time
      const animTime = time - 0.5

      // Animation phases
      if (animTime > 0) {
        // Phase 1: Center node appears (0-0.5s)
        if (animTime < 0.5 && nodesRef.current[0]) {
          const progress = animTime / 0.5
          nodesRef.current[0].group.visible = true
          nodesRef.current[0].group.scale.setScalar(progress * 1.2)
        }

        // Phase 2: Other nodes appear (0.5-2s)
        if (animTime > 0.5 && animTime < 2) {
          const progress = (animTime - 0.5) / 1.5
          nodesRef.current.slice(1).forEach((node, i) => {
            const delay = i * 0.02
            const nodeProgress = Math.max(0, Math.min(1, (progress - delay) * 2))
            node.group.visible = true
            node.group.scale.setScalar(nodeProgress * node.importance)
          })
        }

        // Phase 3: Connections appear (1.5-2.5s)
        if (animTime > 1.5 && animTime < 2.5) {
          const progress = (animTime - 1.5) / 1
          connectionsRef.current.forEach((conn, i) => {
            conn.line.visible = true
            const mat = conn.line.material as THREE.LineBasicMaterial
            mat.opacity = progress * conn.strength * 0.3
          })
        }

        // Phase 4: Growth curve draws (2-3s)
        if (animTime > 2 && animTime < 3 && growthCurveRef.current) {
          const progress = (animTime - 2) / 1
          growthCurveRef.current.visible = true
          const mat = growthCurveRef.current.material as THREE.LineBasicMaterial
          mat.opacity = progress * 0.8
          
          // Animate curve drawing
          const geometry = growthCurveRef.current.geometry as THREE.BufferGeometry
          geometry.setDrawRange(0, Math.floor(progress * 101))
        }

        // Phase 5: Particles start (3s+)
        if (animTime > 3) {
          particlesRef.current.forEach(p => {
            if (!p.mesh.visible) {
              p.mesh.visible = true
            }
          })
        }
      }

      // Update nodes
      nodesRef.current.forEach((node) => {
        if (!node.group.visible) return

        // Gentle pulse (reduced frequency)
        node.pulsePhase += 0.01
        const pulse = isReducedMotion.current ? 0.5 : (0.5 + Math.sin(node.pulsePhase) * 0.05)

        // Mouse interaction
        const distance = new THREE.Vector2(
          mouseRef.current.x * 50 - node.position.x,
          mouseRef.current.y * 50 - node.position.y
        ).length()
        const mouseInfluence = Math.max(0, 1 - distance / 30) * 0.3

        // Update visuals
        // Simplified updates for performance
        const scale = 1 + pulse * 0.1 + mouseInfluence * 0.5
        node.coreMesh.scale.setScalar(scale)
        
        if (frameCount.current % 6 === 0) {
          node.glowMesh.scale.setScalar(scale * 1.5)
          const coreMat = node.coreMesh.material as THREE.MeshPhongMaterial
          coreMat.emissiveIntensity = 0.3 + pulse * 0.1
        }
      })

      // Update particles
      particlesRef.current.forEach(particle => {
        if (!particle.mesh.visible) return

        particle.progress += particle.speed

        if (particle.progress >= 1) {
          // Reset particle
          const validNodes = nodesRef.current.filter(n => n.connections.length > 0)
          if (validNodes.length > 0) {
            const sourceNode = validNodes[Math.floor(Math.random() * validNodes.length)]
            particle.sourceIndex = nodesRef.current.indexOf(sourceNode)
            particle.targetIndex = sourceNode.connections[Math.floor(Math.random() * sourceNode.connections.length)]
            particle.progress = 0
          }
        }

        // Update position
        const sourceNode = nodesRef.current[particle.sourceIndex]
        const targetNode = nodesRef.current[particle.targetIndex]
        
        if (sourceNode && targetNode) {
          const position = new THREE.Vector3().lerpVectors(
            sourceNode.position,
            targetNode.position,
            particle.progress
          )
          particle.mesh.position.copy(position)
          
          // Simplified particle updates
          const particleMat = particle.mesh.material as THREE.MeshStandardMaterial
          const fade = Math.sin(particle.progress * Math.PI)
          particleMat.opacity = fade * 0.8
          
          if (frameCount.current % 4 === 0) {
            particleMat.emissiveIntensity = fade * 0.5
          }
        }
      })

      // Growth curve glow
      if (growthCurveRef.current && animTime > 3) {
        const mat = growthCurveRef.current.material as THREE.LineBasicMaterial
        mat.opacity = 0.8 + Math.sin(time * 2) * 0.1
      }

      rendererRef.current.render(sceneRef.current, cameraRef.current)
    }

    animate()

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement)
      }
      
      rendererRef.current?.dispose()
    }
  }, [])

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  )
}