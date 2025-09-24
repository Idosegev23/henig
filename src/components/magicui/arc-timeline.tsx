'use client'

import React, { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

export interface ArcTimelineStep {
  icon: React.ReactNode
  content: string
}

export interface ArcTimelineItem {
  time: string
  steps: ArcTimelineStep[]
}

export interface ArcTimelineProps {
  data: ArcTimelineItem[]
  defaultActiveStep?: { time: string; stepIndex: number }
  arcConfig?: {
    circleWidth: number
    angleBetweenMinorSteps: number
    lineCountFillBetweenSteps: number
    boundaryPlaceholderLinesCount: number
  }
  className?: string
}

export function ArcTimeline({
  data,
  defaultActiveStep,
  arcConfig = {
    circleWidth: 4500,
    angleBetweenMinorSteps: 0.4,
    lineCountFillBetweenSteps: 8,
    boundaryPlaceholderLinesCount: 50,
  },
  className,
}: ArcTimelineProps) {
  const [activeTimeIndex, setActiveTimeIndex] = useState(0)
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Initialize active step
  useEffect(() => {
    if (defaultActiveStep) {
      const timeIndex = data.findIndex(item => item.time === defaultActiveStep.time)
      if (timeIndex !== -1) {
        setActiveTimeIndex(timeIndex)
        setActiveStepIndex(defaultActiveStep.stepIndex)
      }
    }
  }, [data, defaultActiveStep])

  // Calculate total steps and positions
  const totalSteps = data.reduce((acc, item) => acc + item.steps.length, 0)
  const radius = 200
  const centerX = 400
  const centerY = 300

  // Generate positions for all steps
  const stepPositions: Array<{
    x: number
    y: number
    timeIndex: number
    stepIndex: number
    isActive: boolean
  }> = []

  let globalStepIndex = 0
  data.forEach((timeItem, timeIndex) => {
    timeItem.steps.forEach((step, stepIndex) => {
      const angle = (globalStepIndex / (totalSteps - 1)) * Math.PI // Half circle
      const x = centerX - Math.cos(angle) * radius
      const y = centerY - Math.sin(angle) * radius
      
      stepPositions.push({
        x,
        y,
        timeIndex,
        stepIndex,
        isActive: timeIndex === activeTimeIndex && stepIndex === activeStepIndex
      })
      
      globalStepIndex++
    })
  })

  const currentStep = data[activeTimeIndex]?.steps[activeStepIndex]

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full h-[500px] bg-white rounded-lg border overflow-hidden',
        className
      )}
    >
      {/* SVG Arc */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 800 500"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#027333" />
            <stop offset="50%" stopColor="#29D967" />
            <stop offset="100%" stopColor="#9CCED9" />
          </linearGradient>
        </defs>
        
        {/* Main arc path */}
        <path
          d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}`}
          fill="none"
          stroke="url(#arcGradient)"
          strokeWidth="2"
          opacity="0.6"
        />
        
        {/* Active arc segment */}
        {stepPositions.length > 0 && (
          <path
            d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${stepPositions.find(p => p.isActive)?.x || centerX} ${stepPositions.find(p => p.isActive)?.y || centerY}`}
            fill="none"
            stroke="url(#arcGradient)"
            strokeWidth="3"
          />
        )}
        
        {/* Step points */}
        {stepPositions.map((position, index) => (
          <g key={index}>
            {/* Connection line to arc */}
            <line
              x1={centerX - Math.cos((index / (totalSteps - 1)) * Math.PI) * (radius - 20)}
              y1={centerY - Math.sin((index / (totalSteps - 1)) * Math.PI) * (radius - 20)}
              x2={position.x}
              y2={position.y}
              stroke={position.isActive ? '#29D967' : '#027333'}
              strokeWidth="1"
              opacity="0.5"
            />
            
            {/* Step circle */}
            <circle
              cx={position.x}
              cy={position.y}
              r={position.isActive ? 8 : 5}
              fill={position.isActive ? '#29D967' : '#027333'}
              stroke="white"
              strokeWidth="2"
              className="cursor-pointer transition-all duration-300 hover:r-6"
              onClick={() => {
                setActiveTimeIndex(position.timeIndex)
                setActiveStepIndex(position.stepIndex)
              }}
            />
          </g>
        ))}
      </svg>

      {/* Time labels */}
      <div className="absolute inset-0 pointer-events-none">
        {data.map((timeItem, timeIndex) => {
          const firstStepIndex = data.slice(0, timeIndex).reduce((acc, item) => acc + item.steps.length, 0)
          const lastStepIndex = firstStepIndex + timeItem.steps.length - 1
          const middleIndex = Math.floor((firstStepIndex + lastStepIndex) / 2)
          
          if (stepPositions[middleIndex]) {
            const position = stepPositions[middleIndex]
            return (
              <div
                key={timeIndex}
                className="absolute text-sm font-semibold text-primary-800 bg-white px-2 py-1 rounded shadow-md border border-primary-200"
                style={{
                  left: `${(position.x / 800) * 100}%`,
                  top: `${((position.y - 30) / 500) * 100}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {timeItem.time}
              </div>
            )
          }
          return null
        })}
      </div>

      {/* Content area */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="bg-white/95 backdrop-blur-sm rounded-lg border border-primary-200 p-6 shadow-lg">
          {currentStep && (
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center text-white">
                {currentStep.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-primary-800 mb-2">
                  {data[activeTimeIndex].time}
                </h3>
                <p className="text-primary-700 leading-relaxed">
                  {currentStep.content}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
