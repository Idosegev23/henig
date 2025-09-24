'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  rippleColor?: string
  children: React.ReactNode
}

export function RippleButton({ 
  rippleColor = '#ffffff', 
  className, 
  children, 
  onClick,
  ...props 
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([])

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2
    const newRipple = { x, y, id: Date.now() }

    setRipples(prev => [...prev, newRipple])

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
    }, 600)

    // Call original onClick if provided
    if (onClick) {
      onClick(event)
    }
  }

  return (
    <button
      className={cn(
        'relative overflow-hidden transition-all duration-200',
        className
      )}
      onClick={createRipple}
      {...props}
    >
      {children}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute pointer-events-none rounded-full opacity-75"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: '100px',
            height: '100px',
            backgroundColor: rippleColor,
            animation: 'ripple 0.6s ease-out',
          }}
        />
      ))}
    </button>
  )
}
