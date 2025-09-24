'use client'

import { useEffect } from 'react'
import { useAccessibility } from '@/contexts/AccessibilityContext'

export default function KeyboardHandler() {
  const { settings, announceToScreenReader } = useAccessibility()

  useEffect(() => {
    if (!settings.keyboardNavigation) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt + A: Open Accessibility Menu
      if (e.altKey && e.key === 'a') {
        e.preventDefault()
        const accessibilityButton = document.querySelector('[aria-label="פתח תפריט נגישות"]') as HTMLButtonElement
        if (accessibilityButton) {
          accessibilityButton.click()
          announceToScreenReader('תפריט נגישות נפתח')
        }
      }

      // Alt + S: Skip to main content
      if (e.altKey && e.key === 's') {
        e.preventDefault()
        const mainContent = document.querySelector('#main-content') as HTMLElement
        if (mainContent) {
          mainContent.focus()
          mainContent.scrollIntoView({ behavior: 'smooth' })
          announceToScreenReader('עברת לתוכן הראשי')
        }
      }

      // Alt + N: Skip to navigation
      if (e.altKey && e.key === 'n') {
        e.preventDefault()
        const navigation = document.querySelector('#main-navigation') as HTMLElement
        if (navigation) {
          navigation.focus()
          navigation.scrollIntoView({ behavior: 'smooth' })
          announceToScreenReader('עברת לתפריט הניווט')
        }
      }

      // Alt + H: Go to homepage
      if (e.altKey && e.key === 'h') {
        e.preventDefault()
        window.location.href = '/'
        announceToScreenReader('עובר לעמוד הבית')
      }

      // Alt + Plus: Increase font size
      if (e.altKey && e.key === '+') {
        e.preventDefault()
        // This would need to be implemented with the accessibility context
        announceToScreenReader('הגדלת גודל הטקסט')
      }

      // Alt + Minus: Decrease font size
      if (e.altKey && e.key === '-') {
        e.preventDefault()
        // This would need to be implemented with the accessibility context
        announceToScreenReader('הקטנת גודל הטקסט')
      }

      // Escape: Close any open modals or menus
      if (e.key === 'Escape') {
        const openModal = document.querySelector('[role="dialog"][aria-hidden="false"]')
        if (openModal) {
          const closeButton = openModal.querySelector('button[aria-label*="סגור"]') as HTMLButtonElement
          if (closeButton) {
            closeButton.click()
            announceToScreenReader('החלון נסגר')
          }
        }
      }

      // Tab navigation announcements
      if (e.key === 'Tab') {
        setTimeout(() => {
          const focusedElement = document.activeElement as HTMLElement
          if (focusedElement && focusedElement.tagName) {
            const elementType = focusedElement.tagName.toLowerCase()
            const ariaLabel = focusedElement.getAttribute('aria-label')
            const title = focusedElement.getAttribute('title')
            const text = focusedElement.textContent?.trim()
            
            let announcement = ''
            
            if (ariaLabel) {
              announcement = ariaLabel
            } else if (title) {
              announcement = title
            } else if (text && text.length < 50) {
              announcement = text
            }
            
            if (announcement) {
              // Add element type context
              const typeMap: { [key: string]: string } = {
                'button': 'כפתור',
                'a': 'קישור',
                'input': 'שדה קלט',
                'select': 'תפריט בחירה',
                'textarea': 'אזור טקסט',
                'h1': 'כותרת ראשית',
                'h2': 'כותרת משנה',
                'h3': 'כותרת משנה',
                'img': 'תמונה'
              }
              
              const typeDescription = typeMap[elementType] || elementType
              announceToScreenReader(`${typeDescription}: ${announcement}`)
            }
          }
        }, 100)
      }
    }

    // Handle focus indicators
    const handleFocusIn = (e: FocusEvent) => {
      if (settings.focusIndicators) {
        const target = e.target as HTMLElement
        if (target && target.tagName) {
          target.style.outline = '3px solid #0066cc'
          target.style.outlineOffset = '2px'
        }
      }
    }

    const handleFocusOut = (e: FocusEvent) => {
      if (settings.focusIndicators) {
        const target = e.target as HTMLElement
        if (target && target.tagName) {
          target.style.outline = ''
          target.style.outlineOffset = ''
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('focusin', handleFocusIn)
    document.addEventListener('focusout', handleFocusOut)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('focusin', handleFocusIn)
      document.removeEventListener('focusout', handleFocusOut)
    }
  }, [settings, announceToScreenReader])

  // Add keyboard shortcuts info to page
  useEffect(() => {
    if (!settings.keyboardNavigation) return

    // Create or update keyboard shortcuts info
    let shortcutsInfo = document.querySelector('#keyboard-shortcuts-info')
    
    if (!shortcutsInfo) {
      shortcutsInfo = document.createElement('div')
      shortcutsInfo.id = 'keyboard-shortcuts-info'
      shortcutsInfo.className = 'sr-only'
      shortcutsInfo.setAttribute('aria-live', 'polite')
      document.body.appendChild(shortcutsInfo)
    }

    shortcutsInfo.textContent = `קיצורי מקלדת זמינים: Alt+A לתפריט נגישות, Alt+S לתוכן ראשי, Alt+N לניווט, Alt+H לעמוד הבית, Escape לסגירה`

    return () => {
      const element = document.querySelector('#keyboard-shortcuts-info')
      if (element) {
        document.body.removeChild(element)
      }
    }
  }, [settings.keyboardNavigation])

  return null // This component doesn't render anything visible
}
