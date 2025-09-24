'use client'

import React, { useState } from 'react'
import { useAccessibility } from '@/contexts/AccessibilityContext'
import { 
  EyeIcon,
  SunIcon,
  MoonIcon,
  XMarkIcon,
  PlusIcon,
  MinusIcon,
  ArrowPathIcon,
  Cog6ToothIcon,
  EyeSlashIcon,
  SpeakerWaveIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'

interface AccessibilityWidgetProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
}

export default function AccessibilityWidget({ position = 'bottom-right' }: AccessibilityWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  
  const { 
    settings, 
    dispatch, 
    updateFontSize,
    toggleHighContrast,
    toggleDarkMode,
    toggleReduceMotion,
    resetAllSettings,
    announceToScreenReader
  } = useAccessibility()

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  }

  const toggleWidget = () => {
    setIsOpen(!isOpen)
    announceToScreenReader(isOpen ? 'תפריט נגישות נסגר' : 'תפריט נגישות נפתח')
  }

  // Quick actions for the compact menu
  const quickActions = [
    {
      icon: settings.fontSize > 16 ? MinusIcon : PlusIcon,
      label: settings.fontSize > 16 ? 'הקטן טקסט' : 'הגדל טקסט',
      action: () => {
        const newSize = settings.fontSize > 16 ? settings.fontSize - 2 : settings.fontSize + 2
        updateFontSize(newSize)
        announceToScreenReader(`גודל הטקסט עודכן ל-${newSize} פיקסל`)
      },
      active: settings.fontSize !== 16,
    },
    {
      icon: EyeIcon,
      label: settings.highContrast ? 'ניגודיות רגילה' : 'ניגודיות גבוהה',
      action: () => {
        toggleHighContrast()
        announceToScreenReader(settings.highContrast ? 'ניגודיות רגילה הופעלה' : 'ניגודיות גבוהה הופעלה')
      },
      active: settings.highContrast,
    },
    {
      icon: settings.darkMode ? SunIcon : MoonIcon,
      label: settings.darkMode ? 'מצב יום' : 'מצב לילה',
      action: () => {
        toggleDarkMode()
        announceToScreenReader(settings.darkMode ? 'מצב יום הופעל' : 'מצב לילה הופעל')
      },
      active: settings.darkMode,
    },
    {
      icon: DocumentTextIcon,
      label: settings.reduceMotion ? 'הפעל אנימציות' : 'עצור אנימציות',
      action: () => {
        toggleReduceMotion()
        announceToScreenReader(settings.reduceMotion ? 'אנימציות הופעלו' : 'אנימציות נעצרו')
      },
      active: settings.reduceMotion,
    },
    {
      icon: ArrowPathIcon,
      label: 'איפוס הגדרות',
      action: () => {
        resetAllSettings()
        announceToScreenReader('כל הגדרות הנגישות אופסו')
      },
      active: false,
    },
  ]

  return (
    <>
      {/* Floating Accessibility Widget */}
      <div className={`fixed ${positionClasses[position]} z-50`}>
        
        {/* Main Accessibility Button */}
        <div className="relative">
          <button
            onClick={toggleWidget}
            className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 ${
              isOpen 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-200'
            }`}
            aria-label={isOpen ? 'סגור תפריט נגישות' : 'פתח תפריט נגישות'}
            title="נגישות"
          >
            {isOpen ? (
              <XMarkIcon className="w-7 h-7" />
            ) : (
              <Cog6ToothIcon className="w-7 h-7" />
            )}
          </button>
          
          {/* Activity Indicator */}
          {(settings.fontSize !== 16 || settings.highContrast || settings.darkMode || settings.reduceMotion) && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
          )}
        </div>

        {/* Compact Menu */}
        {isOpen && (
          <div className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-2xl border border-gray-200 p-3 w-64 animate-slide-up">
            
            {/* Header */}
            <div className="text-center mb-3 pb-3 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 flex items-center justify-center gap-2">
                <Cog6ToothIcon className="w-5 h-5 text-blue-600" />
                נגישות
              </h3>
              <p className="text-xs text-gray-500 mt-1">פעולות מהירות</p>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 text-center hover:scale-102 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                    action.active
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-800'
                  }`}
                  aria-label={action.label}
                  title={action.label}
                >
                  <action.icon className="w-6 h-6 mx-auto mb-1" />
                  <div className="text-xs font-medium leading-tight">{action.label}</div>
                </button>
              ))}
            </div>

            {/* Current Settings Display */}
            {(settings.fontSize !== 16 || settings.highContrast || settings.darkMode) && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="text-xs text-gray-500 text-center">
                  הגדרות פעילות:
                  {settings.fontSize !== 16 && <span className="block text-blue-600">טקסט: {settings.fontSize}px</span>}
                  {settings.highContrast && <span className="block text-blue-600">ניגודיות גבוהה</span>}
                  {settings.darkMode && <span className="block text-blue-600">מצב לילה</span>}
                  {settings.reduceMotion && <span className="block text-blue-600">אנימציות מופסקות</span>}
                </div>
              </div>
            )}

            {/* Help Text */}
            <div className="mt-3 pt-3 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-400">
                Alt + A להיפוכה מהירה
              </p>
            </div>
          </div>
        )}
      </div>

    </>
  )
}
