'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface NetworkNode {
  position: THREE.Vector3
  connections: number[]
  energy: number
  pulsePhase: number
  group: THREE.Group
  coreMesh: THREE.Mesh
  glowMesh: THREE.Mesh
  ringMesh: THREE.Mesh
  layer: number
  angle: number
}

interface Connection {
  line: THREE.Line
  glow: THREE.Line
  sourceIndex: number
  targetIndex: number
  flowPhase: number
}

interface LightParticle {
  mesh: THREE.Mesh
  sourceIndex: number
  targetIndex: number
  progress: number
  speed: number
  trail: THREE.Points
  birthTime: number
}

export default function Neural3DBackground() {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const cameraRef = useRef<THREE.PerspectiveCamera>()
  const nodesRef = useRef<NetworkNode[]>([])
  const connectionsRef = useRef<Connection[]>([])
  const particlesRef = useRef<LightParticle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationIdRef = useRef<number>()
  const timeRef = useRef(0)
  const buildPhaseRef = useRef(0)

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup with dark gradient background
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x0a0a0f, 100, 400)
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      65,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, 120)
    camera.lookAt(0, 0, 0)
    cameraRef.current = camera

    // Renderer setup with high quality
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    mountRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Ambient lighting for neon effect
    const ambientLight = new THREE.AmbientLight(0x0a0a0f, 0.4)
    scene.add(ambientLight)

    // Create network nodes with staged animation
    const createNodes = () => {
      const nodes: NetworkNode[] = []
      
      // Neon materials
      const createNodeMaterials = (color: number, emissiveColor: number) => ({
        core: new THREE.MeshPhongMaterial({
          color: color,
          emissive: emissiveColor,
          emissiveIntensity: 0.8,
          transparent: true,
          opacity: 0.9,
        }),
        glow: new THREE.MeshBasicMaterial({
          color: emissiveColor,
          transparent: true,
          opacity: 0.15,
          side: THREE.BackSide
        }),
        ring: new THREE.MeshBasicMaterial({
          color: emissiveColor,
          transparent: true,
          opacity: 0.3,
          side: THREE.DoubleSide
        })
      })

      // Create nodes in elegant formation
      const centerNode = {
        position: new THREE.Vector3(0, 0, 0),
        materials: createNodeMaterials(0x00D9FF, 0x00D9FF),
        scale: 1.5,
        layer: 0,
        angle: 0
      }

      // Layer configuration for elegant network
      const layers = [
        { count: 1, radius: 0, z: 0, scale: 1.5 },      // Center
        { count: 6, radius: 25, z: 0, scale: 1.0 },     // Inner ring
        { count: 12, radius: 50, z: -20, scale: 0.8 },  // Middle layer
        { count: 18, radius: 80, z: 20, scale: 0.7 },   // Outer layer
        { count: 12, radius: 110, z: -10, scale: 0.6 }  // Far layer
      ]

      let nodeIndex = 0
      layers.forEach((layer, layerIndex) => {
        for (let i = 0; i < layer.count; i++) {
          const angle = (i / layer.count) * Math.PI * 2
          const x = Math.cos(angle) * layer.radius
          const y = Math.sin(angle) * layer.radius
          const z = layer.z + (Math.random() - 0.5) * 10

          // Color variation based on position
          const hue = layerIndex === 0 ? 0x00D9FF : 
                     (i % 3 === 0) ? 0x00D9FF : 
                     (i % 3 === 1) ? 0x00FFFF : 
                     0x9D00FF

          const materials = createNodeMaterials(hue, hue)

          // Node group
          const group = new THREE.Group()
          group.position.set(x, y, z)
          
          // Core sphere - smaller and more refined
          const coreGeometry = new THREE.SphereGeometry(0.4 * layer.scale, 16, 16)
          const coreMesh = new THREE.Mesh(coreGeometry, materials.core)
          group.add(coreMesh)

          // Glow sphere
          const glowGeometry = new THREE.SphereGeometry(1.5 * layer.scale, 16, 16)
          const glowMesh = new THREE.Mesh(glowGeometry, materials.glow)
          group.add(glowMesh)

          // Decorative ring
          const ringGeometry = new THREE.RingGeometry(0.8 * layer.scale, 1.2 * layer.scale, 32)
          const ringMesh = new THREE.Mesh(ringGeometry, materials.ring)
          ringMesh.rotation.x = Math.PI / 2
          group.add(ringMesh)

          // Initially hidden for build animation
          group.scale.set(0, 0, 0)
          group.visible = false
          scene.add(group)

          nodes.push({
            position: new THREE.Vector3(x, y, z),
            connections: [],
            energy: 0.5,
            pulsePhase: Math.random() * Math.PI * 2,
            group,
            coreMesh,
            glowMesh,
            ringMesh,
            layer: layerIndex,
            angle
          })

          nodeIndex++
        }
      })

      // Define connections - elegant and purposeful
      let currentIndex = 0
      for (let layerIndex = 0; layerIndex < layers.length - 1; layerIndex++) {
        const currentLayer = layers[layerIndex]
        const nextLayer = layers[layerIndex + 1]
        const nextLayerStart = currentIndex + currentLayer.count

        for (let i = 0; i < currentLayer.count; i++) {
          const nodeIdx = currentIndex + i
          
          // Connect to 2-3 nodes in next layer
          const connectionCount = layerIndex === 0 ? 6 : 2 + Math.floor(Math.random() * 2)
          const connections = new Set<number>()
          
          // Prioritize nearby nodes
          for (let j = 0; j < connectionCount; j++) {
            const baseTarget = Math.floor(i * nextLayer.count / currentLayer.count)
            const offset = Math.floor(Math.random() * 3) - 1
            const targetIdx = nextLayerStart + (baseTarget + offset + nextLayer.count) % nextLayer.count
            connections.add(targetIdx)
          }
          
          nodes[nodeIdx].connections = Array.from(connections)
        }
        currentIndex += currentLayer.count
      }

      nodesRef.current = nodes
    }

    // Create elegant neon connections
    const createConnections = () => {
      const connections: Connection[] = []
      
      nodesRef.current.forEach((node, nodeIndex) => {
        node.connections.forEach(targetIndex => {
          const targetNode = nodesRef.current[targetIndex]
          if (!targetNode) return

          // Main connection line - ultra thin
          const points = [node.position, targetNode.position]
          const geometry = new THREE.BufferGeometry().setFromPoints(points)
          
          const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x00D9FF,
            transparent: true,
            opacity: 0.6,
            linewidth: 1
          })
          
          const line = new THREE.Line(geometry, lineMaterial)
          line.visible = false // Initially hidden
          scene.add(line)

          // Glow line for neon effect
          const glowMaterial = new THREE.LineBasicMaterial({
            color: 0x00D9FF,
            transparent: true,
            opacity: 0.2,
            linewidth: 3
          })
          
          const glowLine = new THREE.Line(geometry.clone(), glowMaterial)
          glowLine.visible = false
          scene.add(glowLine)

          connections.push({
            line,
            glow: glowLine,
            sourceIndex: nodeIndex,
            targetIndex,
            flowPhase: Math.random() * Math.PI * 2
          })
        })
      })

      connectionsRef.current = connections
    }

    // Create light particles for data flow
    const createParticles = () => {
      const particles: LightParticle[] = []
      const particleGeometry = new THREE.SphereGeometry(0.2, 8, 8)
      
      // Create fewer, more impactful particles
      for (let i = 0; i < 20; i++) {
        const validNodes = nodesRef.current.filter(n => n.connections.length > 0)
        if (validNodes.length === 0) continue

        const sourceNode = validNodes[Math.floor(Math.random() * validNodes.length)]
        const sourceIndex = nodesRef.current.indexOf(sourceNode)
        const targetIndex = sourceNode.connections[Math.floor(Math.random() * sourceNode.connections.length)]

        const particleMaterial = new THREE.MeshBasicMaterial({
          color: 0x00FFFF,
          transparent: true,
          opacity: 0,
        })

        const mesh = new THREE.Mesh(particleGeometry, particleMaterial)
        mesh.visible = false
        scene.add(mesh)

        // Create elegant trail
        const trailGeometry = new THREE.BufferGeometry()
        const trailPositions = new Float32Array(15 * 3) // 5 trail points
        trailGeometry.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3))
        
        const trailMaterial = new THREE.PointsMaterial({
          color: 0x00D9FF,
          size: 1.5,
          transparent: true,
          opacity: 0,
          sizeAttenuation: true,
          blending: THREE.AdditiveBlending
        })

        const trail = new THREE.Points(trailGeometry, trailMaterial)
        trail.visible = false
        scene.add(trail)

        particles.push({
          mesh,
          sourceIndex,
          targetIndex,
          progress: Math.random(),
          speed: 0.003 + Math.random() * 0.002,
          trail,
          birthTime: 0
        })
      }

      particlesRef.current = particles
    }

    // Initialize
    createNodes()
    createConnections()
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

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)

      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return

      const time = Date.now() * 0.001
      const deltaTime = time - timeRef.current
      timeRef.current = time
      const mouse = mouseRef.current

      // Build animation phases
      const animTime = time - 0.5 // Start after 0.5s delay
      if (animTime > 0) {
        // Phase 1: Center node appears (0-1s)
        if (animTime < 1 && nodesRef.current[0]) {
          const progress = animTime
          nodesRef.current[0].group.visible = true
          nodesRef.current[0].group.scale.setScalar(progress * 1.5)
        }

        // Phase 2: First ring expands (1-2s)
        if (animTime > 0.8 && animTime < 2) {
          const progress = (animTime - 0.8) / 1.2
          nodesRef.current.slice(1, 7).forEach((node, i) => {
            node.group.visible = true
            node.group.scale.setScalar(progress)
          })
        }

        // Phase 3: Connections and outer nodes (2-3s)
        if (animTime > 1.8 && animTime < 3) {
          const progress = (animTime - 1.8) / 1.2
          
          // Show remaining nodes
          nodesRef.current.slice(7).forEach((node, i) => {
            node.group.visible = true
            node.group.scale.setScalar(progress * (0.6 + i * 0.01))
          })

          // Show connections
          connectionsRef.current.forEach((conn, i) => {
            const connProgress = Math.min(1, progress + i * 0.01)
            conn.line.visible = true
            conn.glow.visible = true
            ;(conn.line.material as THREE.LineBasicMaterial).opacity = connProgress * 0.4
            ;(conn.glow.material as THREE.LineBasicMaterial).opacity = connProgress * 0.1
          })
        }

        // Phase 4: Activate particles (3s+)
        if (animTime > 3) {
          particlesRef.current.forEach(p => {
            if (!p.mesh.visible) {
              p.mesh.visible = true
              p.trail.visible = true
              p.birthTime = time
            }
          })
        }
      }

      // Camera subtle movement
      cameraRef.current.position.x = mouse.x * 3
      cameraRef.current.position.y = mouse.y * 3
      cameraRef.current.lookAt(0, 0, 0)

      // Update nodes with elegant animations
      nodesRef.current.forEach((node, index) => {
        if (!node.group.visible) return

        // Breathing effect
        node.pulsePhase += 0.02
        const breathing = 0.5 + Math.sin(node.pulsePhase) * 0.1

        // Mouse interaction
        const raycaster = new THREE.Raycaster()
        raycaster.setFromCamera(new THREE.Vector2(mouse.x, mouse.y), cameraRef.current!)
        const distanceToRay = raycaster.ray.distanceToPoint(node.position)
        const mouseInfluence = Math.max(0, 1 - distanceToRay / 40) * 0.5

        // Update node visuals
        const scale = node.group.scale.x
        node.coreMesh.scale.setScalar(1 + breathing * 0.2 + mouseInfluence)
        node.glowMesh.scale.setScalar(1 + breathing * 0.4 + mouseInfluence * 2)
        
        // Neon glow intensity
        const coreMat = node.coreMesh.material as THREE.MeshPhongMaterial
        coreMat.emissiveIntensity = 0.8 + breathing * 0.2 + mouseInfluence
        
        const glowMat = node.glowMesh.material as THREE.MeshBasicMaterial
        glowMat.opacity = 0.15 + breathing * 0.05 + mouseInfluence * 0.15

        // Ring rotation
        node.ringMesh.rotation.z = time * 0.5 + index
        node.ringMesh.scale.setScalar(1 + mouseInfluence * 0.5)
      })

      // Update connections with flowing light effect
      connectionsRef.current.forEach((conn) => {
        const sourceNode = nodesRef.current[conn.sourceIndex]
        const targetNode = nodesRef.current[conn.targetIndex]
        if (!sourceNode || !targetNode) return

        // Calculate mouse influence on connection
        const midpoint = new THREE.Vector3().addVectors(sourceNode.position, targetNode.position).multiplyScalar(0.5)
        const raycaster = new THREE.Raycaster()
        raycaster.setFromCamera(new THREE.Vector2(mouse.x, mouse.y), cameraRef.current!)
        const distanceToRay = raycaster.ray.distanceToPoint(midpoint)
        const mouseInfluence = Math.max(0, 1 - distanceToRay / 50)

        // Update connection opacity
        const lineMat = conn.line.material as THREE.LineBasicMaterial
        const glowMat = conn.glow.material as THREE.LineBasicMaterial
        
        const baseOpacity = 0.3
        const flowPulse = Math.sin(time * 2 + conn.flowPhase) * 0.1
        
        lineMat.opacity = baseOpacity + flowPulse + mouseInfluence * 0.3
        glowMat.opacity = (baseOpacity * 0.3) + (flowPulse * 0.5) + mouseInfluence * 0.2
      })

      // Update particles with elegant trails
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
            particle.birthTime = time
          }
        }

        // Smooth position along path
        const sourceNode = nodesRef.current[particle.sourceIndex]
        const targetNode = nodesRef.current[particle.targetIndex]
        
        if (sourceNode && targetNode) {
          // Cubic bezier for smooth path
          const t = particle.progress
          const controlOffset = 15
          const control1 = sourceNode.position.clone()
          control1.y += controlOffset
          const control2 = targetNode.position.clone()
          control2.y += controlOffset

          const currentPos = new THREE.Vector3()
          const bezier = new THREE.CubicBezierCurve3(
            sourceNode.position,
            control1,
            control2,
            targetNode.position
          )
          bezier.getPoint(t, currentPos)
          
          particle.mesh.position.copy(currentPos)
          
          // Update trail
          const trailPositions = particle.trail.geometry.attributes.position.array as Float32Array
          for (let i = trailPositions.length - 3; i >= 3; i -= 3) {
            trailPositions[i] = trailPositions[i - 3]
            trailPositions[i + 1] = trailPositions[i - 2]
            trailPositions[i + 2] = trailPositions[i - 1]
          }
          trailPositions[0] = currentPos.x
          trailPositions[1] = currentPos.y
          trailPositions[2] = currentPos.z
          particle.trail.geometry.attributes.position.needsUpdate = true
          
          // Particle and trail visibility
          const age = time - particle.birthTime
          const fadeIn = Math.min(1, age * 2)
          const particleMat = particle.mesh.material as THREE.MeshBasicMaterial
          const trailMat = particle.trail.material as THREE.PointsMaterial
          
          particleMat.opacity = fadeIn * 0.9
          trailMat.opacity = fadeIn * 0.3
          
          // Speed variation
          const speedBoost = Math.sin(t * Math.PI) * 0.5 + 0.5
          particle.speed = 0.004 + speedBoost * 0.002
        }
      })

      // Render with post-processing feel
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
      style={{ 
        background: `
          radial-gradient(ellipse at center, 
            rgba(255, 255, 255, 0.95) 0%, 
            rgba(248, 250, 252, 0.92) 40%, 
            rgba(241, 245, 249, 0.88) 70%, 
            rgba(226, 232, 240, 0.85) 100%)
        `,
        zIndex: 1 
      }}
    />
  )
}