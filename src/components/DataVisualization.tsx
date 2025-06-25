'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import * as d3 from 'd3'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const generateRandomData = (count: number, min: number, max: number) => {
  return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min)
}

function NetworkGraph() {
  const svgRef = useRef<SVGSVGElement>(null)
  
  useEffect(() => {
    if (!svgRef.current) return
    
    const width = 400
    const height = 300
    
    const nodes = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 10 + 5,
    }))
    
    const links = Array.from({ length: 30 }, () => ({
      source: Math.floor(Math.random() * nodes.length),
      target: Math.floor(Math.random() * nodes.length),
    })).filter(link => link.source !== link.target)
    
    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()
    
    const g = svg.append('g')
    
    const link = g
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', '#00D9FF')
      .attr('stroke-opacity', 0.3)
      .attr('stroke-width', 1)
    
    const node = g
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r', d => d.r)
      .attr('fill', '#BF00FF')
      .attr('fill-opacity', 0.8)
      .attr('stroke', '#00D9FF')
      .attr('stroke-width', 2)
    
    const simulation = d3
      .forceSimulation(nodes as any)
      .force('charge', d3.forceManyBody().strength(-50))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius((d: any) => d.r + 2))
    
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => nodes[d.source].x!)
        .attr('y1', (d: any) => nodes[d.source].y!)
        .attr('x2', (d: any) => nodes[d.target].x!)
        .attr('y2', (d: any) => nodes[d.target].y!)
      
      node
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y)
    })
    
    return () => {
      simulation.stop()
    }
  }, [])
  
  return <svg ref={svgRef} width="100%" height="300" />
}

export default function DataVisualization() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [chartData, setChartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: generateRandomData(6, 20, 100),
  })
  
  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setChartData({
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          values: generateRandomData(6, 20, 100),
        })
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [inView])
  
  const lineData = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Performance Metrics',
        data: chartData.values,
        fill: true,
        borderColor: '#00D9FF',
        backgroundColor: 'rgba(0, 217, 255, 0.1)',
        tension: 0.4,
      },
    ],
  }
  
  const barData = {
    labels: ['AI', 'Cloud', 'Security', 'Analytics', 'API'],
    datasets: [
      {
        label: 'Usage Statistics',
        data: generateRandomData(5, 50, 150),
        backgroundColor: [
          'rgba(191, 0, 255, 0.8)',
          'rgba(0, 217, 255, 0.8)',
          'rgba(255, 0, 110, 0.8)',
          'rgba(0, 255, 163, 0.8)',
          'rgba(255, 217, 0, 0.8)',
        ],
        borderColor: [
          '#BF00FF',
          '#00D9FF',
          '#FF006E',
          '#00FFA3',
          '#FFD900',
        ],
        borderWidth: 2,
      },
    ],
  }
  
  const doughnutData = {
    labels: ['Active', 'Idle', 'Processing'],
    datasets: [
      {
        data: [65, 20, 15],
        backgroundColor: [
          'rgba(0, 217, 255, 0.8)',
          'rgba(191, 0, 255, 0.8)',
          'rgba(255, 0, 110, 0.8)',
        ],
        borderColor: ['#00D9FF', '#BF00FF', '#FF006E'],
        borderWidth: 2,
      },
    ],
  }
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderColor: '#00D9FF',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
    },
  }
  
  return (
    <section ref={ref} className="py-20 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold text-center mb-4">
            <span className="text-gradient">Live Analytics</span>
          </h2>
          <p className="text-center text-gray-400 mb-12 text-lg">
            Real-time data visualization and insights
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="glass-effect p-6 rounded-lg"
            >
              <h3 className="text-xl font-semibold mb-4 text-neon-blue">Performance Trends</h3>
              <div className="h-64">
                <Line data={lineData} options={chartOptions} />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="glass-effect p-6 rounded-lg"
            >
              <h3 className="text-xl font-semibold mb-4 text-neon-purple">Resource Usage</h3>
              <div className="h-64">
                <Bar data={barData} options={chartOptions} />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="glass-effect p-6 rounded-lg"
            >
              <h3 className="text-xl font-semibold mb-4 text-neon-pink">System Status</h3>
              <div className="h-64 flex items-center justify-center">
                <div className="w-48 h-48">
                  <Doughnut data={doughnutData} options={{ ...chartOptions, cutout: '70%' }} />
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="mt-12 glass-effect p-6 rounded-lg"
          >
            <h3 className="text-xl font-semibold mb-4 text-center">Network Topology</h3>
            <div className="flex justify-center">
              <NetworkGraph />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}