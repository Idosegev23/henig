'use client'

import { useEffect, useState } from 'react'
import { useAccessibility } from '@/contexts/AccessibilityContext'

export default function ReadingAids() {
  const { settings } = useAccessibility()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [magnifierContent, setMagnifierContent] = useState<string>('')

  // Reading Guide
  useEffect(() => {
    if (!settings.readingGuide) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [settings.readingGuide])

  // Reading Mask
  useEffect(() => {
    if (!settings.readingMask) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [settings.readingMask])

  // Magnifier
  useEffect(() => {
    if (!settings.magnifier) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      
      // Get text content under cursor
      const element = document.elementFromPoint(e.clientX, e.clientY)
      if (element) {
        setMagnifierContent(element.textContent?.slice(0, 50) || '')
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [settings.magnifier])

  return (
    <>
      {/* Reading Guide Line */}
      {settings.readingGuide && (
        <div
          className="reading-guide-line"
          style={{
            top: `${mousePosition.y}px`,
          }}
        />
      )}

      {/* Reading Mask */}
      {settings.readingMask && (
        <div
          className="reading-mask-window"
          style={{
            top: `${mousePosition.y - 50}px`,
          }}
        />
      )}

      {/* Magnifier */}
      {settings.magnifier && (
        <div
          className="magnifier"
          style={{
            left: `${mousePosition.x + 20}px`,
            top: `${mousePosition.y + 20}px`,
          }}
        >
          <div className="magnifier-content p-4 text-center">
            <div className="text-lg font-bold mb-2">זכוכית מגדלת</div>
            <div className="text-sm">{magnifierContent || 'העבר עכבר על טקסט'}</div>
          </div>
        </div>
      )}
    </>
  )
}
