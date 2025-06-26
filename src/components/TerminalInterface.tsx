'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface Command {
  input: string
  output: string[]
  timestamp: Date
}

const commands = {
  help: [
    'Available commands:',
    '  help     - Show this help message',
    '  about    - Learn about LC Platform',
    '  status   - Check system status',
    '  demo     - Run interactive demo',
    '  clear    - Clear terminal',
    '  contact  - Get in touch',
  ],
  about: [
    'LC Platform v1.0.0',
    'A revolutionary technology platform built for the future.',
    'Powered by AI, secured by blockchain, scaled by cloud.',
    '',
    'Visit our documentation at docs.lcplatform.com',
  ],
  status: [
    'System Status: OPERATIONAL',
    '',
    'API Gateway: ✓ Online (12ms)',
    'AI Engine: ✓ Active (99.9% uptime)',
    'Data Pipeline: ✓ Processing (1.2M ops/sec)',
    'Security Layer: ✓ Armed',
    '',
    'All systems functioning within normal parameters.',
  ],
  demo: [
    'Initializing demo environment...',
    '[████████████████████] 100%',
    '',
    'Demo features:',
    '• Real-time data processing',
    '• AI-powered analytics',
    '• Quantum-ready encryption',
    '• Edge computing capabilities',
    '',
    'Demo environment ready. Type "start" to begin.',
  ],
  contact: [
    'Get in touch with our team:',
    '',
    'Email: hello@lcplatform.com',
    'Discord: discord.gg/lcplatform',
    'GitHub: github.com/lcplatform',
    '',
    'We\'d love to hear from you!',
  ],
}

export default function TerminalInterface() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [history, setHistory] = useState<Command[]>([
    {
      input: 'welcome',
      output: [
        'Welcome to LC Terminal v1.0.0',
        'Type "help" for available commands.',
        '',
      ],
      timestamp: new Date(),
    },
  ])
  const [currentInput, setCurrentInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])
  
  const processCommand = (input: string) => {
    const cmd = input.toLowerCase().trim()
    
    if (cmd === 'clear') {
      setHistory([])
      return
    }
    
    let output: string[]
    
    if (cmd in commands) {
      output = commands[cmd as keyof typeof commands]
    } else if (cmd === '') {
      output = []
    } else {
      output = [`Command not found: ${input}`, 'Type "help" for available commands.']
    }
    
    const newCommand: Command = {
      input,
      output,
      timestamp: new Date(),
    }
    
    setHistory(prev => [...prev, newCommand])
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentInput.trim()) {
      setIsTyping(true)
      processCommand(currentInput)
      setCurrentInput('')
      
      setTimeout(() => {
        setIsTyping(false)
      }, 500)
    }
  }
  
  const focusInput = () => {
    inputRef.current?.focus()
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
            <span className="text-gradient">Interactive Terminal</span>
          </h2>
          <p className="text-center text-gray-400 mb-12 text-lg">
            Experience our platform through the command line
          </p>
          
          <div 
            className="glass-effect rounded-lg p-6 max-w-4xl mx-auto cursor-text"
            onClick={focusInput}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-gray-400 text-sm ml-4 font-mono">terminal@lcplatform</span>
            </div>
            
            <div 
              ref={terminalRef}
              className="bg-black/50 rounded p-4 h-96 overflow-y-auto font-mono text-sm"
            >
              {history.map((cmd, index) => (
                <div key={index} className="mb-4">
                  {cmd.input && (
                    <div className="flex items-center text-primary-blue">
                      <span className="mr-2">❯</span>
                      <span>{cmd.input}</span>
                    </div>
                  )}
                  {cmd.output.map((line, lineIndex) => (
                    <motion.div
                      key={lineIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: lineIndex * 0.05 }}
                      className="text-gray-300 ml-4"
                    >
                      {line || '\u00A0'}
                    </motion.div>
                  ))}
                </div>
              ))}
              
              <form onSubmit={handleSubmit} className="flex items-center text-primary-blue">
                <span className="mr-2">❯</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  className="flex-1 bg-transparent outline-none terminal-cursor"
                  placeholder="Type a command..."
                  disabled={isTyping}
                  autoFocus
                />
              </form>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {Object.keys(commands).map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => {
                    setCurrentInput(cmd)
                    inputRef.current?.focus()
                  }}
                  className="px-3 py-1 text-xs glass-effect rounded hover:border-primary-blue transition-all"
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}