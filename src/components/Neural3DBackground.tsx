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
  innerGlowMesh: THREE.Mesh
  outerGlowMesh: THREE.Mesh
  layer: number
  neuronType: 'input' | 'hidden' | 'output'
}

interface Connection {
  line: THREE.Line
  glowLine: THREE.Line
  pulseLine: THREE.Line
  sourceIndex: number
  targetIndex: number
  strength: number
  flowPhase: number
}

interface ElectricPulse {
  mesh: THREE.Mesh
  trail: THREE.Points
  sourceIndex: number
  targetIndex: number
  progress: number
  speed: number
  energy: number
}

export default function Neural3DBackground() {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const cameraRef = useRef<THREE.PerspectiveCamera>()
  const nodesRef = useRef<NetworkNode[]>([])
  const connectionsRef = useRef<Connection[]>([])
  const pulsesRef = useRef<ElectricPulse[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationIdRef = useRef<number>()
  const timeRef = useRef(0)

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup with dark tech background
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x050512, 150, 500)
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, 100)
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
    renderer.toneMappingExposure = 1.5
    mountRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Ambient lighting for neural glow
    const ambientLight = new THREE.AmbientLight(0x0a0a1f, 0.2)
    scene.add(ambientLight)

    // Create neural network nodes
    const createNodes = () => {
      const nodes: NetworkNode[] = []
      
      // Neon materials for neurons
      const createNeuronMaterials = (type: 'input' | 'hidden' | 'output') => {
        const baseColor = type === 'input' ? 0x00D9FF : 
                         type === 'output' ? 0x00FFFF : 
                         0x00B8E6
        const emissiveColor = type === 'input' ? 0x00D9FF : 
                             type === 'output' ? 0x00FFFF : 
                             0x00B8E6

        return {
          core: new THREE.MeshPhongMaterial({
            color: baseColor,
            emissive: emissiveColor,
            emissiveIntensity: 1.2,
            transparent: true,
            opacity: 0.95,
          }),
          innerGlow: new THREE.MeshBasicMaterial({
            color: emissiveColor,
            transparent: true,
            opacity: 0.4,
            side: THREE.BackSide
          }),
          outerGlow: new THREE.MeshBasicMaterial({
            color: emissiveColor,
            transparent: true,
            opacity: 0.15,
            side: THREE.BackSide
          })
        }
      }

      // Neural network architecture
      const layers = [
        { count: 5, radius: 0, z: -30, type: 'input' as const },      // Input layer
        { count: 8, radius: 30, z: -15, type: 'hidden' as const },    // Hidden layer 1
        { count: 12, radius: 50, z: 0, type: 'hidden' as const },     // Hidden layer 2
        { count: 8, radius: 70, z: 15, type: 'hidden' as const },     // Hidden layer 3
        { count: 5, radius: 90, z: 30, type: 'output' as const }      // Output layer
      ]

      let nodeIndex = 0
      layers.forEach((layer, layerIndex) => {
        for (let i = 0; i < layer.count; i++) {
          const angle = (i / layer.count) * Math.PI * 2
          const angleOffset = layerIndex % 2 === 0 ? 0 : Math.PI / layer.count
          const finalAngle = angle + angleOffset
          
          const x = Math.cos(finalAngle) * layer.radius + (Math.random() - 0.5) * 10
          const y = Math.sin(finalAngle) * layer.radius + (Math.random() - 0.5) * 10
          const z = layer.z + (Math.random() - 0.5) * 5

          const materials = createNeuronMaterials(layer.type)

          // Node group
          const group = new THREE.Group()
          group.position.set(x, y, z)
          
          // Core neuron body
          const coreGeometry = new THREE.SphereGeometry(0.6, 24, 24)
          const coreMesh = new THREE.Mesh(coreGeometry, materials.core)
          group.add(coreMesh)

          // Inner glow
          const innerGlowGeometry = new THREE.SphereGeometry(1.2, 16, 16)
          const innerGlowMesh = new THREE.Mesh(innerGlowGeometry, materials.innerGlow)
          group.add(innerGlowMesh)

          // Outer glow
          const outerGlowGeometry = new THREE.SphereGeometry(2.5, 12, 12)
          const outerGlowMesh = new THREE.Mesh(outerGlowGeometry, materials.outerGlow)
          group.add(outerGlowMesh)

          // Add axon branches (decorative lines)
          const axonCount = 3 + Math.floor(Math.random() * 3)
          for (let j = 0; j < axonCount; j++) {
            const axonAngle = (j / axonCount) * Math.PI * 2
            const axonLength = 2 + Math.random() * 2
            const axonGeometry = new THREE.BufferGeometry()
            const axonPoints = [
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(
                Math.cos(axonAngle) * axonLength,
                Math.sin(axonAngle) * axonLength,
                (Math.random() - 0.5) * 2
              )
            ]
            axonGeometry.setFromPoints(axonPoints)
            const axonMaterial = new THREE.LineBasicMaterial({
              color: materials.core.emissive,
              transparent: true,
              opacity: 0.3,
              linewidth: 1
            })
            const axonLine = new THREE.Line(axonGeometry, axonMaterial)
            group.add(axonLine)
          }

          scene.add(group)

          nodes.push({
            position: new THREE.Vector3(x, y, z),
            connections: [],
            energy: 0.5 + Math.random() * 0.5,
            pulsePhase: Math.random() * Math.PI * 2,
            group,
            coreMesh,
            innerGlowMesh,
            outerGlowMesh,
            layer: layerIndex,
            neuronType: layer.type
          })

          nodeIndex++
        }
      })

      // Create synaptic connections
      let currentIndex = 0
      for (let layerIndex = 0; layerIndex < layers.length - 1; layerIndex++) {
        const currentLayer = layers[layerIndex]
        const nextLayer = layers[layerIndex + 1]
        const nextLayerStart = currentIndex + currentLayer.count

        for (let i = 0; i < currentLayer.count; i++) {
          const nodeIdx = currentIndex + i
          
          // Connect to multiple neurons in next layer (neural network style)
          const connectionCount = 2 + Math.floor(Math.random() * 4)
          const connections = new Set<number>()
          
          // Create connections with some randomness
          for (let j = 0; j < connectionCount; j++) {
            const targetIdx = nextLayerStart + Math.floor(Math.random() * nextLayer.count)
            connections.add(targetIdx)
          }
          
          nodes[nodeIdx].connections = Array.from(connections)
        }
        currentIndex += currentLayer.count
      }

      nodesRef.current = nodes
    }

    // Create synaptic connections with glow
    const createConnections = () => {
      const connections: Connection[] = []
      
      nodesRef.current.forEach((node, nodeIndex) => {
        node.connections.forEach(targetIndex => {
          const targetNode = nodesRef.current[targetIndex]
          if (!targetNode) return

          // Connection strength based on distance
          const distance = node.position.distanceTo(targetNode.position)
          const strength = 1 / (1 + distance * 0.02)

          // Main synaptic connection
          const points = [node.position, targetNode.position]
          const geometry = new THREE.BufferGeometry().setFromPoints(points)
          
          // Base connection line
          const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x00B8E6,
            transparent: true,
            opacity: 0.3 * strength,
            linewidth: 1
          })
          const line = new THREE.Line(geometry, lineMaterial)
          scene.add(line)

          // Glow line
          const glowMaterial = new THREE.LineBasicMaterial({
            color: 0x00D9FF,
            transparent: true,
            opacity: 0.15 * strength,
            linewidth: 2
          })
          const glowLine = new THREE.Line(geometry.clone(), glowMaterial)
          scene.add(glowLine)

          // Pulse line for activity
          const pulseMaterial = new THREE.LineBasicMaterial({
            color: 0x00FFFF,
            transparent: true,
            opacity: 0,
            linewidth: 3
          })
          const pulseLine = new THREE.Line(geometry.clone(), pulseMaterial)
          scene.add(pulseLine)

          connections.push({
            line,
            glowLine,
            pulseLine,
            sourceIndex: nodeIndex,
            targetIndex,
            strength,
            flowPhase: Math.random() * Math.PI * 2
          })
        })
      })

      connectionsRef.current = connections
    }

    // Create electric pulses
    const createPulses = () => {
      const pulses: ElectricPulse[] = []
      const pulseGeometry = new THREE.SphereGeometry(0.3, 12, 12)
      
      // Create more pulses for active neural network
      for (let i = 0; i < 40; i++) {
        const validNodes = nodesRef.current.filter(n => n.connections.length > 0)
        if (validNodes.length === 0) continue

        const sourceNode = validNodes[Math.floor(Math.random() * validNodes.length)]
        const sourceIndex = nodesRef.current.indexOf(sourceNode)
        const targetIndex = sourceNode.connections[Math.floor(Math.random() * sourceNode.connections.length)]

        const pulseMaterial = new THREE.MeshBasicMaterial({
          color: 0x00FFFF,
          transparent: true,
          opacity: 0.8,
        })

        const mesh = new THREE.Mesh(pulseGeometry, pulseMaterial)
        mesh.scale.set(0, 0, 0)
        scene.add(mesh)

        // Create electric trail
        const trailGeometry = new THREE.BufferGeometry()
        const trailPositions = new Float32Array(21 * 3) // 7 trail points
        trailGeometry.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3))
        
        const trailMaterial = new THREE.PointsMaterial({
          color: 0x00D9FF,
          size: 2,
          transparent: true,
          opacity: 0.6,
          sizeAttenuation: true,
          blending: THREE.AdditiveBlending
        })

        const trail = new THREE.Points(trailGeometry, trailMaterial)
        scene.add(trail)

        pulses.push({
          mesh,
          trail,
          sourceIndex,
          targetIndex,
          progress: Math.random(),
          speed: 0.005 + Math.random() * 0.005,
          energy: 0.5 + Math.random() * 0.5
        })
      }

      pulsesRef.current = pulses
    }

    // Initialize
    createNodes()
    createConnections()
    createPulses()

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

      // Camera movement based on mouse
      cameraRef.current.position.x = mouse.x * 10
      cameraRef.current.position.y = mouse.y * 10
      cameraRef.current.lookAt(0, 0, 0)

      // Rotate entire scene slowly
      sceneRef.current.rotation.z = Math.sin(time * 0.1) * 0.05

      // Update neurons with activity
      nodesRef.current.forEach((node, index) => {
        // Neural activity simulation
        node.pulsePhase += 0.03 + Math.sin(time + index) * 0.01
        const activity = 0.5 + Math.sin(node.pulsePhase) * 0.3
        
        // Mouse influence on neural activity
        const raycaster = new THREE.Raycaster()
        raycaster.setFromCamera(new THREE.Vector2(mouse.x, mouse.y), cameraRef.current!)
        const distanceToRay = raycaster.ray.distanceToPoint(node.position)
        const mouseInfluence = Math.max(0, 1 - distanceToRay / 30)
        
        // Update neuron visuals
        const totalActivity = activity + mouseInfluence * 0.5
        node.energy = node.energy * 0.95 + totalActivity * 0.05
        
        // Core pulsing
        node.coreMesh.scale.setScalar(0.8 + node.energy * 0.4)
        const coreMat = node.coreMesh.material as THREE.MeshPhongMaterial
        coreMat.emissiveIntensity = 0.8 + node.energy * 0.8
        
        // Inner glow
        node.innerGlowMesh.scale.setScalar(1.2 + node.energy * 0.6)
        const innerGlowMat = node.innerGlowMesh.material as THREE.MeshBasicMaterial
        innerGlowMat.opacity = 0.3 + node.energy * 0.3
        
        // Outer glow
        node.outerGlowMesh.scale.setScalar(2.5 + node.energy * 1.0)
        const outerGlowMat = node.outerGlowMesh.material as THREE.MeshBasicMaterial
        outerGlowMat.opacity = 0.1 + node.energy * 0.15

        // Slight floating motion
        node.group.position.y += Math.sin(time * 2 + index) * 0.02
        node.group.rotation.z = Math.sin(time + index) * 0.1
      })

      // Update synaptic connections
      connectionsRef.current.forEach((conn) => {
        const sourceNode = nodesRef.current[conn.sourceIndex]
        const targetNode = nodesRef.current[conn.targetIndex]
        if (!sourceNode || !targetNode) return

        // Calculate activity flow
        const activity = (sourceNode.energy + targetNode.energy) * 0.5
        conn.flowPhase += 0.05 * activity

        // Update connection visuals
        const lineMat = conn.line.material as THREE.LineBasicMaterial
        const glowMat = conn.glowLine.material as THREE.LineBasicMaterial
        const pulseMat = conn.pulseLine.material as THREE.LineBasicMaterial
        
        const pulse = Math.sin(conn.flowPhase) * 0.5 + 0.5
        lineMat.opacity = 0.2 + activity * 0.3
        glowMat.opacity = 0.1 + activity * 0.2
        
        // Pulse effect on strong connections
        if (activity > 0.7) {
          pulseMat.opacity = pulse * 0.5 * activity
        } else {
          pulseMat.opacity = 0
        }
      })

      // Update electric pulses
      pulsesRef.current.forEach(pulse => {
        pulse.progress += pulse.speed * (1 + pulse.energy * 0.5)

        if (pulse.progress >= 1) {
          // Reset pulse
          const validNodes = nodesRef.current.filter(n => n.connections.length > 0)
          if (validNodes.length > 0) {
            const sourceNode = validNodes[Math.floor(Math.random() * validNodes.length)]
            pulse.sourceIndex = nodesRef.current.indexOf(sourceNode)
            pulse.targetIndex = sourceNode.connections[Math.floor(Math.random() * sourceNode.connections.length)]
            pulse.progress = 0
            pulse.energy = 0.5 + Math.random() * 0.5
          }
        }

        // Move pulse along synapse
        const sourceNode = nodesRef.current[pulse.sourceIndex]
        const targetNode = nodesRef.current[pulse.targetIndex]
        
        if (sourceNode && targetNode) {
          const t = pulse.progress
          const currentPos = new THREE.Vector3().lerpVectors(
            sourceNode.position,
            targetNode.position,
            t
          )
          
          // Add slight curve to path
          const perpendicular = new THREE.Vector3()
            .subVectors(targetNode.position, sourceNode.position)
            .cross(new THREE.Vector3(0, 0, 1))
            .normalize()
            .multiplyScalar(Math.sin(t * Math.PI) * 2)
          
          currentPos.add(perpendicular)
          pulse.mesh.position.copy(currentPos)
          
          // Pulse size and glow
          const scale = Math.sin(t * Math.PI) * 0.3 + 0.2
          pulse.mesh.scale.setScalar(scale * pulse.energy)
          
          const pulseMat = pulse.mesh.material as THREE.MeshBasicMaterial
          pulseMat.opacity = (1 - Math.abs(t - 0.5) * 2) * 0.8 * pulse.energy
          
          // Update trail
          const trailPositions = pulse.trail.geometry.attributes.position.array as Float32Array
          for (let i = trailPositions.length - 3; i >= 3; i -= 3) {
            trailPositions[i] = trailPositions[i - 3]
            trailPositions[i + 1] = trailPositions[i - 2]
            trailPositions[i + 2] = trailPositions[i - 1]
          }
          trailPositions[0] = currentPos.x
          trailPositions[1] = currentPos.y
          trailPositions[2] = currentPos.z
          pulse.trail.geometry.attributes.position.needsUpdate = true
          
          const trailMat = pulse.trail.material as THREE.PointsMaterial
          trailMat.opacity = 0.6 * pulse.energy * (1 - t)
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
        background: `
          radial-gradient(ellipse at center, 
            rgba(5, 5, 18, 0.7) 0%, 
            rgba(10, 10, 31, 0.85) 40%, 
            rgba(15, 15, 41, 0.9) 70%, 
            rgba(20, 20, 51, 0.95) 100%),
          linear-gradient(180deg,
            rgba(0, 216, 255, 0.05) 0%,
            rgba(0, 184, 230, 0.03) 50%,
            rgba(0, 255, 255, 0.02) 100%)
        `,
        zIndex: 1 
      }}
    />
  )
}