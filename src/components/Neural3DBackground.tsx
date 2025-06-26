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
}

interface DataParticle {
  mesh: THREE.Mesh
  sourceIndex: number
  targetIndex: number
  progress: number
  speed: number
  trail: THREE.Points
}

export default function Neural3DBackground() {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const cameraRef = useRef<THREE.PerspectiveCamera>()
  const nodesRef = useRef<NetworkNode[]>([])
  const connectionsRef = useRef<THREE.Line[]>([])
  const particlesRef = useRef<DataParticle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationIdRef = useRef<number>()

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x000000, 50, 300)
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
      alpha: true 
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mountRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x0080ff, 0.2)
    scene.add(ambientLight)

    // Create network nodes
    const createNodes = () => {
      const nodes: NetworkNode[] = []
      const nodeGeometry = new THREE.SphereGeometry(0.8, 16, 16)
      const glowGeometry = new THREE.SphereGeometry(2, 16, 16)
      
      // Create nodes in 3D space
      const layers = 4
      const nodesPerLayer = [5, 8, 8, 5]
      let nodeIndex = 0

      for (let layer = 0; layer < layers; layer++) {
        const z = (layer - (layers - 1) / 2) * 40
        const nodeCount = nodesPerLayer[layer]
        
        for (let i = 0; i < nodeCount; i++) {
          const angle = (i / nodeCount) * Math.PI * 2
          const radius = 30 + (layer % 2) * 10
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius

          // Node group
          const group = new THREE.Group()
          
          // Core node
          const coreMaterial = new THREE.MeshPhongMaterial({
            color: 0x00d9ff,
            emissive: 0x00d9ff,
            emissiveIntensity: 0.5,
            transparent: true,
            opacity: 0.8
          })
          const coreMesh = new THREE.Mesh(nodeGeometry, coreMaterial)
          group.add(coreMesh)

          // Glow effect
          const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0x00d9ff,
            transparent: true,
            opacity: 0.15
          })
          const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial)
          group.add(glowMesh)

          group.position.set(x, y, z)
          scene.add(group)

          nodes.push({
            position: new THREE.Vector3(x, y, z),
            connections: [],
            energy: 0.5,
            pulsePhase: Math.random() * Math.PI * 2,
            group,
            coreMesh,
            glowMesh
          })

          nodeIndex++
        }
      }

      // Create connections between layers
      let currentIndex = 0
      for (let layer = 0; layer < layers - 1; layer++) {
        const currentLayerSize = nodesPerLayer[layer]
        const nextLayerSize = nodesPerLayer[layer + 1]
        const nextLayerStart = currentIndex + currentLayerSize

        for (let i = 0; i < currentLayerSize; i++) {
          const nodeIdx = currentIndex + i
          // Connect to 2-4 nodes in next layer
          const connectionCount = 2 + Math.floor(Math.random() * 3)
          
          for (let j = 0; j < connectionCount; j++) {
            const targetIdx = nextLayerStart + Math.floor(Math.random() * nextLayerSize)
            if (!nodes[nodeIdx].connections.includes(targetIdx)) {
              nodes[nodeIdx].connections.push(targetIdx)
            }
          }
        }
        currentIndex += currentLayerSize
      }

      nodesRef.current = nodes
    }

    // Create connection lines
    const createConnections = () => {
      const connections: THREE.Line[] = []
      
      nodesRef.current.forEach((node, nodeIndex) => {
        node.connections.forEach(targetIndex => {
          const targetNode = nodesRef.current[targetIndex]
          if (!targetNode) return

          const geometry = new THREE.BufferGeometry()
          const positions = new Float32Array([
            node.position.x, node.position.y, node.position.z,
            targetNode.position.x, targetNode.position.y, targetNode.position.z
          ])
          geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

          const material = new THREE.LineBasicMaterial({
            color: 0x00d9ff,
            transparent: true,
            opacity: 0.15,
            linewidth: 1
          })

          const line = new THREE.Line(geometry, material)
          scene.add(line)
          connections.push(line)
        })
      })

      connectionsRef.current = connections
    }

    // Create data particles
    const createParticles = () => {
      const particles: DataParticle[] = []
      const particleGeometry = new THREE.SphereGeometry(0.3, 8, 8)
      
      for (let i = 0; i < 30; i++) {
        // Find a random connection
        const validNodes = nodesRef.current.filter(n => n.connections.length > 0)
        if (validNodes.length === 0) continue

        const sourceNode = validNodes[Math.floor(Math.random() * validNodes.length)]
        const sourceIndex = nodesRef.current.indexOf(sourceNode)
        const targetIndex = sourceNode.connections[Math.floor(Math.random() * sourceNode.connections.length)]

        const material = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.8
        })

        const mesh = new THREE.Mesh(particleGeometry, material)
        scene.add(mesh)

        // Create particle trail
        const trailGeometry = new THREE.BufferGeometry()
        const trailPositions = new Float32Array(30 * 3) // 10 trail points
        trailGeometry.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3))
        
        const trailMaterial = new THREE.PointsMaterial({
          color: 0x00d9ff,
          size: 1,
          transparent: true,
          opacity: 0.3,
          sizeAttenuation: true
        })

        const trail = new THREE.Points(trailGeometry, trailMaterial)
        scene.add(trail)

        particles.push({
          mesh,
          sourceIndex,
          targetIndex,
          progress: Math.random(),
          speed: 0.005 + Math.random() * 0.01,
          trail
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
      const mouse = mouseRef.current

      // Camera parallax effect based on mouse
      cameraRef.current.position.x = mouse.x * 10
      cameraRef.current.position.y = mouse.y * 10
      cameraRef.current.lookAt(0, 0, 0)

      // Update nodes
      nodesRef.current.forEach((node, index) => {
        // Gentle pulse
        node.pulsePhase += 0.02
        node.energy = 0.4 + Math.sin(node.pulsePhase) * 0.2

        // Calculate distance to mouse in 3D space
        const raycaster = new THREE.Raycaster()
        raycaster.setFromCamera(new THREE.Vector2(mouse.x, mouse.y), cameraRef.current!)
        const nodeWorldPos = new THREE.Vector3()
        node.group.getWorldPosition(nodeWorldPos)
        const distanceToRay = raycaster.ray.distanceToPoint(nodeWorldPos)
        
        const mouseInfluence = Math.max(0, 1 - distanceToRay / 30)

        // Update node appearance
        node.coreMesh.scale.setScalar(1 + node.energy * 0.3 + mouseInfluence * 0.5)
        ;(node.coreMesh.material as THREE.MeshPhongMaterial).emissiveIntensity = 
          0.3 + node.energy * 0.2 + mouseInfluence * 0.5
        
        node.glowMesh.scale.setScalar(1 + node.energy * 0.5 + mouseInfluence * 0.8)
        ;(node.glowMesh.material as THREE.MeshBasicMaterial).opacity = 
          0.1 + node.energy * 0.1 + mouseInfluence * 0.2

        // Subtle rotation
        node.group.rotation.y = Math.sin(time * 0.5 + index) * 0.1
        node.group.rotation.z = Math.cos(time * 0.3 + index) * 0.1
      })

      // Update connections opacity based on connected nodes
      connectionsRef.current.forEach((connection, index) => {
        const positions = connection.geometry.attributes.position.array
        const start = new THREE.Vector3(positions[0], positions[1], positions[2])
        const end = new THREE.Vector3(positions[3], positions[4], positions[5])
        
        // Find connected nodes
        let mouseInfluence = 0
        nodesRef.current.forEach(node => {
          if (node.position.distanceTo(start) < 1 || node.position.distanceTo(end) < 1) {
            const raycaster = new THREE.Raycaster()
            raycaster.setFromCamera(new THREE.Vector2(mouse.x, mouse.y), cameraRef.current!)
            const nodeWorldPos = new THREE.Vector3()
            node.group.getWorldPosition(nodeWorldPos)
            const distanceToRay = raycaster.ray.distanceToPoint(nodeWorldPos)
            mouseInfluence = Math.max(mouseInfluence, Math.max(0, 1 - distanceToRay / 30))
          }
        })

        ;(connection.material as THREE.LineBasicMaterial).opacity = 0.1 + mouseInfluence * 0.3
      })

      // Update particles
      particlesRef.current.forEach(particle => {
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

        // Interpolate position along connection
        const sourceNode = nodesRef.current[particle.sourceIndex]
        const targetNode = nodesRef.current[particle.targetIndex]
        
        if (sourceNode && targetNode) {
          const currentPos = new THREE.Vector3().lerpVectors(
            sourceNode.position,
            targetNode.position,
            particle.progress
          )
          
          particle.mesh.position.copy(currentPos)
          
          // Add some wave motion
          const offset = Math.sin(particle.progress * Math.PI * 2 + time * 2) * 2
          particle.mesh.position.y += offset
          
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
          
          // Particle glow based on speed and mouse proximity
          const raycaster = new THREE.Raycaster()
          raycaster.setFromCamera(new THREE.Vector2(mouse.x, mouse.y), cameraRef.current!)
          const distanceToRay = raycaster.ray.distanceToPoint(currentPos)
          const mouseInfluence = Math.max(0, 1 - distanceToRay / 20)
          
          particle.speed = 0.005 + mouseInfluence * 0.015
          ;(particle.mesh.material as THREE.MeshBasicMaterial).opacity = 0.5 + mouseInfluence * 0.5
        }
      })

      // Render
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
        background: 'radial-gradient(ellipse at center, rgba(0, 30, 60, 0.3) 0%, rgba(0, 0, 0, 0.8) 100%)',
        zIndex: 1 
      }}
    />
  )
}