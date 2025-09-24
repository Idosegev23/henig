'use client'

import React, { createContext, useContext, useReducer, useEffect } from 'react'

export interface AccessibilitySettings {
  // Text & Font Settings
  fontSize: number
  lineHeight: number
  letterSpacing: number
  fontFamily: 'default' | 'dyslexic' | 'readable'
  
  // Color & Contrast Settings
  highContrast: boolean
  darkMode: boolean
  monoChrome: boolean
  invertColors: boolean
  colorBlindSupport: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia'
  
  // Motion & Animation Settings
  reduceMotion: boolean
  pauseAnimations: boolean
  
  // Navigation & Interaction Settings
  keyboardNavigation: boolean
  focusIndicators: boolean
  skipLinks: boolean
  
  // Screen Reader Settings
  screenReaderOptimized: boolean
  readableText: boolean
  altTextVisible: boolean
  
  // Layout Settings
  simplifiedLayout: boolean
  hideImages: boolean
  highlightLinks: boolean
  
  // Audio Settings
  soundEnabled: boolean
  clickSounds: boolean
  
  // Reading Settings
  readingMask: boolean
  readingGuide: boolean
  magnifier: boolean
  
  // Cognitive Support
  tooltipsEnabled: boolean
  simplifiedLanguage: boolean
}

type AccessibilityAction =
  | { type: 'SET_FONT_SIZE'; payload: number }
  | { type: 'SET_LINE_HEIGHT'; payload: number }
  | { type: 'SET_LETTER_SPACING'; payload: number }
  | { type: 'SET_FONT_FAMILY'; payload: AccessibilitySettings['fontFamily'] }
  | { type: 'TOGGLE_HIGH_CONTRAST' }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'TOGGLE_MONO_CHROME' }
  | { type: 'TOGGLE_INVERT_COLORS' }
  | { type: 'SET_COLOR_BLIND_SUPPORT'; payload: AccessibilitySettings['colorBlindSupport'] }
  | { type: 'TOGGLE_REDUCE_MOTION' }
  | { type: 'TOGGLE_PAUSE_ANIMATIONS' }
  | { type: 'TOGGLE_KEYBOARD_NAVIGATION' }
  | { type: 'TOGGLE_FOCUS_INDICATORS' }
  | { type: 'TOGGLE_SKIP_LINKS' }
  | { type: 'TOGGLE_SCREEN_READER_OPTIMIZED' }
  | { type: 'TOGGLE_READABLE_TEXT' }
  | { type: 'TOGGLE_ALT_TEXT_VISIBLE' }
  | { type: 'TOGGLE_SIMPLIFIED_LAYOUT' }
  | { type: 'TOGGLE_HIDE_IMAGES' }
  | { type: 'TOGGLE_HIGHLIGHT_LINKS' }
  | { type: 'TOGGLE_SOUND_ENABLED' }
  | { type: 'TOGGLE_CLICK_SOUNDS' }
  | { type: 'TOGGLE_READING_MASK' }
  | { type: 'TOGGLE_READING_GUIDE' }
  | { type: 'TOGGLE_MAGNIFIER' }
  | { type: 'TOGGLE_TOOLTIPS_ENABLED' }
  | { type: 'TOGGLE_SIMPLIFIED_LANGUAGE' }
  | { type: 'RESET_ALL' }
  | { type: 'LOAD_SETTINGS'; payload: AccessibilitySettings }

const defaultSettings: AccessibilitySettings = {
  fontSize: 16,
  lineHeight: 1.5,
  letterSpacing: 0,
  fontFamily: 'default',
  highContrast: false,
  darkMode: false,
  monoChrome: false,
  invertColors: false,
  colorBlindSupport: 'none',
  reduceMotion: false,
  pauseAnimations: false,
  keyboardNavigation: true,
  focusIndicators: true,
  skipLinks: true,
  screenReaderOptimized: false,
  readableText: false,
  altTextVisible: false,
  simplifiedLayout: false,
  hideImages: false,
  highlightLinks: false,
  soundEnabled: false,
  clickSounds: false,
  readingMask: false,
  readingGuide: false,
  magnifier: false,
  tooltipsEnabled: true,
  simplifiedLanguage: false,
}

const AccessibilityContext = createContext<{
  settings: AccessibilitySettings
  dispatch: React.Dispatch<AccessibilityAction>
  updateFontSize: (size: number) => void
  updateLineHeight: (height: number) => void
  updateLetterSpacing: (spacing: number) => void
  toggleHighContrast: () => void
  toggleDarkMode: () => void
  toggleReduceMotion: () => void
  resetAllSettings: () => void
  announceToScreenReader: (message: string) => void
} | null>(null)

const accessibilityReducer = (
  state: AccessibilitySettings,
  action: AccessibilityAction
): AccessibilitySettings => {
  switch (action.type) {
    case 'SET_FONT_SIZE':
      return { ...state, fontSize: Math.max(12, Math.min(32, action.payload)) }
    case 'SET_LINE_HEIGHT':
      return { ...state, lineHeight: Math.max(1, Math.min(3, action.payload)) }
    case 'SET_LETTER_SPACING':
      return { ...state, letterSpacing: Math.max(-1, Math.min(5, action.payload)) }
    case 'SET_FONT_FAMILY':
      return { ...state, fontFamily: action.payload }
    case 'TOGGLE_HIGH_CONTRAST':
      return { ...state, highContrast: !state.highContrast }
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode }
    case 'TOGGLE_MONO_CHROME':
      return { ...state, monoChrome: !state.monoChrome }
    case 'TOGGLE_INVERT_COLORS':
      return { ...state, invertColors: !state.invertColors }
    case 'SET_COLOR_BLIND_SUPPORT':
      return { ...state, colorBlindSupport: action.payload }
    case 'TOGGLE_REDUCE_MOTION':
      return { ...state, reduceMotion: !state.reduceMotion }
    case 'TOGGLE_PAUSE_ANIMATIONS':
      return { ...state, pauseAnimations: !state.pauseAnimations }
    case 'TOGGLE_KEYBOARD_NAVIGATION':
      return { ...state, keyboardNavigation: !state.keyboardNavigation }
    case 'TOGGLE_FOCUS_INDICATORS':
      return { ...state, focusIndicators: !state.focusIndicators }
    case 'TOGGLE_SKIP_LINKS':
      return { ...state, skipLinks: !state.skipLinks }
    case 'TOGGLE_SCREEN_READER_OPTIMIZED':
      return { ...state, screenReaderOptimized: !state.screenReaderOptimized }
    case 'TOGGLE_READABLE_TEXT':
      return { ...state, readableText: !state.readableText }
    case 'TOGGLE_ALT_TEXT_VISIBLE':
      return { ...state, altTextVisible: !state.altTextVisible }
    case 'TOGGLE_SIMPLIFIED_LAYOUT':
      return { ...state, simplifiedLayout: !state.simplifiedLayout }
    case 'TOGGLE_HIDE_IMAGES':
      return { ...state, hideImages: !state.hideImages }
    case 'TOGGLE_HIGHLIGHT_LINKS':
      return { ...state, highlightLinks: !state.highlightLinks }
    case 'TOGGLE_SOUND_ENABLED':
      return { ...state, soundEnabled: !state.soundEnabled }
    case 'TOGGLE_CLICK_SOUNDS':
      return { ...state, clickSounds: !state.clickSounds }
    case 'TOGGLE_READING_MASK':
      return { ...state, readingMask: !state.readingMask }
    case 'TOGGLE_READING_GUIDE':
      return { ...state, readingGuide: !state.readingGuide }
    case 'TOGGLE_MAGNIFIER':
      return { ...state, magnifier: !state.magnifier }
    case 'TOGGLE_TOOLTIPS_ENABLED':
      return { ...state, tooltipsEnabled: !state.tooltipsEnabled }
    case 'TOGGLE_SIMPLIFIED_LANGUAGE':
      return { ...state, simplifiedLanguage: !state.simplifiedLanguage }
    case 'RESET_ALL':
      return defaultSettings
    case 'LOAD_SETTINGS':
      return action.payload
    default:
      return state
  }
}

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, dispatch] = useReducer(accessibilityReducer, defaultSettings)

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('henig-accessibility-settings')
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings)
        dispatch({ type: 'LOAD_SETTINGS', payload: { ...defaultSettings, ...parsedSettings } })
      } catch (error) {
        console.error('Error loading accessibility settings:', error)
      }
    }
  }, [])

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('henig-accessibility-settings', JSON.stringify(settings))
    
    // Apply CSS custom properties
    const root = document.documentElement
    root.style.setProperty('--accessibility-font-size', `${settings.fontSize}px`)
    root.style.setProperty('--accessibility-line-height', settings.lineHeight.toString())
    root.style.setProperty('--accessibility-letter-spacing', `${settings.letterSpacing}px`)
    
    // Apply body classes for different accessibility modes
    document.body.classList.toggle('high-contrast', settings.highContrast)
    document.body.classList.toggle('dark-mode', settings.darkMode)
    document.body.classList.toggle('mono-chrome', settings.monoChrome)
    document.body.classList.toggle('invert-colors', settings.invertColors)
    document.body.classList.toggle('reduce-motion', settings.reduceMotion)
    document.body.classList.toggle('pause-animations', settings.pauseAnimations)
    document.body.classList.toggle('focus-indicators', settings.focusIndicators)
    document.body.classList.toggle('simplified-layout', settings.simplifiedLayout)
    document.body.classList.toggle('hide-images', settings.hideImages)
    document.body.classList.toggle('highlight-links', settings.highlightLinks)
    document.body.classList.toggle('readable-text', settings.readableText)
    document.body.classList.toggle('alt-text-visible', settings.altTextVisible)
    document.body.classList.toggle('reading-mask', settings.readingMask)
    document.body.classList.toggle('reading-guide', settings.readingGuide)
    document.body.classList.toggle('magnifier', settings.magnifier)
    
    // Apply font family
    if (settings.fontFamily !== 'default') {
      document.body.classList.add(`font-${settings.fontFamily}`)
    }
    
    // Apply color blind support
    if (settings.colorBlindSupport !== 'none') {
      document.body.classList.add(`color-blind-${settings.colorBlindSupport}`)
    }
    
  }, [settings])

  // Helper functions
  const updateFontSize = (size: number) => {
    dispatch({ type: 'SET_FONT_SIZE', payload: size })
  }

  const updateLineHeight = (height: number) => {
    dispatch({ type: 'SET_LINE_HEIGHT', payload: height })
  }

  const updateLetterSpacing = (spacing: number) => {
    dispatch({ type: 'SET_LETTER_SPACING', payload: spacing })
  }

  const toggleHighContrast = () => {
    dispatch({ type: 'TOGGLE_HIGH_CONTRAST' })
  }

  const toggleDarkMode = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' })
  }

  const toggleReduceMotion = () => {
    dispatch({ type: 'TOGGLE_REDUCE_MOTION' })
  }

  const resetAllSettings = () => {
    dispatch({ type: 'RESET_ALL' })
  }

  // Screen reader announcements
  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', 'polite')
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = message
    document.body.appendChild(announcement)
    
    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        dispatch,
        updateFontSize,
        updateLineHeight,
        updateLetterSpacing,
        toggleHighContrast,
        toggleDarkMode,
        toggleReduceMotion,
        resetAllSettings,
        announceToScreenReader,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  )
}

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext)
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider')
  }
  return context
}
