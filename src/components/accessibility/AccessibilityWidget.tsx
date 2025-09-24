'use client'

import React, { useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useAccessibility, AccessibilitySettings } from '@/contexts/AccessibilityContext'
import { 
  EyeIcon,
  EyeSlashIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
  MagnifyingGlassIcon,
  DocumentTextIcon,
  LinkIcon,
  PhotoIcon,
  PlayIcon,
  PauseIcon,
  ArrowPathIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline'

interface AccessibilityWidgetProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
}

export default function AccessibilityWidget({ position = 'bottom-right' }: AccessibilityWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'display' | 'navigation' | 'content' | 'audio'>('display')
  
  const { 
    settings, 
    dispatch, 
    updateFontSize, 
    updateLineHeight, 
    updateLetterSpacing,
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

  const openWidget = () => {
    setIsOpen(true)
    announceToScreenReader('תפריט נגישות נפתח')
  }

  const closeWidget = () => {
    setIsOpen(false)
    announceToScreenReader('תפריט נגישות נסגר')
  }

  return (
    <>
      {/* Floating Button */}
      <div className={`fixed ${positionClasses[position]} z-50`}>
        <button
          onClick={openWidget}
          className="w-16 h-16 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary-300"
          aria-label="פתח תפריט נגישות"
          title="נגישות"
        >
          <AdjustmentsHorizontalIcon className="w-8 h-8" />
        </button>
      </div>

      {/* Accessibility Panel */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeWidget}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-3xl bg-white p-8 text-right align-middle shadow-xl transition-all hebrew-text">
                  
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <Dialog.Title className="text-3xl font-bold text-primary-800">
                      🌟 מרכז נגישות מתקדם
                    </Dialog.Title>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={resetAllSettings}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                        aria-label="איפוס כל ההגדרות"
                      >
                        <ArrowPathIcon className="w-5 h-5 inline ml-2" />
                        איפוס הכל
                      </button>
                      <button
                        onClick={closeWidget}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-lg"
                        aria-label="סגור תפריט נגישות"
                      >
                        <XMarkIcon className="h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  {/* Navigation Tabs */}
                  <div className="flex mb-8 bg-gray-100 rounded-2xl p-1">
                    {[
                      { id: 'display', label: 'תצוגה וצבעים', icon: EyeIcon },
                      { id: 'navigation', label: 'ניווט ופוקוס', icon: LinkIcon },
                      { id: 'content', label: 'תוכן וקריאה', icon: DocumentTextIcon },
                      { id: 'audio', label: 'שמע וקול', icon: SpeakerWaveIcon },
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as 'display' | 'navigation' | 'content' | 'audio')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all duration-200 font-medium ${
                          activeTab === tab.id
                            ? 'bg-white text-primary-600 shadow-md'
                            : 'text-gray-600 hover:text-gray-800'
                        }`}
                        aria-label={`עבור לכרטיסייה ${tab.label}`}
                      >
                        <tab.icon className="w-5 h-5" />
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <div className="space-y-6">
                    
                    {/* Display & Colors Tab */}
                    {activeTab === 'display' && (
                      <div className="space-y-8">
                        
                        {/* Font Size Control */}
                        <div className="bg-gray-50 p-6 rounded-2xl">
                          <h3 className="text-xl font-bold text-primary-800 mb-4 flex items-center gap-2">
                            📝 גודל טקסט ואותיות
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                גודל פונט: {settings.fontSize}px
                              </label>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => updateFontSize(settings.fontSize - 2)}
                                  className="w-10 h-10 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors font-bold"
                                  aria-label="הקטן טקסט"
                                >
                                  -
                                </button>
                                <input
                                  type="range"
                                  min="12"
                                  max="32"
                                  value={settings.fontSize}
                                  onChange={(e) => updateFontSize(Number(e.target.value))}
                                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                  aria-label="התאמת גודל טקסט"
                                />
                                <button
                                  onClick={() => updateFontSize(settings.fontSize + 2)}
                                  className="w-10 h-10 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors font-bold"
                                  aria-label="הגדל טקסט"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                גובה שורה: {settings.lineHeight}
                              </label>
                              <input
                                type="range"
                                min="1"
                                max="3"
                                step="0.1"
                                value={settings.lineHeight}
                                onChange={(e) => updateLineHeight(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                aria-label="התאמת גובה שורה"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                מרווח בין אותיות: {settings.letterSpacing}px
                              </label>
                              <input
                                type="range"
                                min="-1"
                                max="5"
                                step="0.5"
                                value={settings.letterSpacing}
                                onChange={(e) => updateLetterSpacing(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                aria-label="התאמת מרווח בין אותיות"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Color & Contrast Controls */}
                        <div className="bg-gray-50 p-6 rounded-2xl">
                          <h3 className="text-xl font-bold text-primary-800 mb-4 flex items-center gap-2">
                            🎨 צבעים וניגודיות
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <button
                              onClick={toggleHighContrast}
                              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                                settings.highContrast
                                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                              aria-pressed={settings.highContrast}
                              aria-label="הפעלת ניגודיות גבוהה"
                            >
                              <EyeIcon className="w-8 h-8 mx-auto mb-2" />
                              <div className="font-medium">ניגודיות גבוהה</div>
                            </button>

                            <button
                              onClick={toggleDarkMode}
                              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                                settings.darkMode
                                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                              aria-pressed={settings.darkMode}
                              aria-label="הפעלת מצב לילה"
                            >
                              {settings.darkMode ? 
                                <SunIcon className="w-8 h-8 mx-auto mb-2" /> : 
                                <MoonIcon className="w-8 h-8 mx-auto mb-2" />
                              }
                              <div className="font-medium">מצב לילה</div>
                            </button>

                            <button
                              onClick={() => dispatch({ type: 'TOGGLE_MONO_CHROME' })}
                              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                                settings.monoChrome
                                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                              aria-pressed={settings.monoChrome}
                              aria-label="הפעלת מצב שחור לבן"
                            >
                              <PhotoIcon className="w-8 h-8 mx-auto mb-2" />
                              <div className="font-medium">שחור לבן</div>
                            </button>

                            <button
                              onClick={() => dispatch({ type: 'TOGGLE_INVERT_COLORS' })}
                              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                                settings.invertColors
                                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                              aria-pressed={settings.invertColors}
                              aria-label="הפיכת צבעים"
                            >
                              <ArrowPathIcon className="w-8 h-8 mx-auto mb-2" />
                              <div className="font-medium">הפיכת צבעים</div>
                            </button>
                          </div>
                        </div>

                        {/* Font Family Selection */}
                        <div className="bg-gray-50 p-6 rounded-2xl">
                          <h3 className="text-xl font-bold text-primary-800 mb-4">
                            🔤 סוג פונט
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                              { value: 'default', label: 'פונט רגיל', sample: 'טקסט לדוגמה' },
                              { value: 'dyslexic', label: 'פונט לדיסלקסיה', sample: 'טקסט לדוגמה' },
                              { value: 'readable', label: 'פונט קריא', sample: 'טקסט לדוגמה' },
                            ].map(font => (
                              <button
                                key={font.value}
                                onClick={() => dispatch({ type: 'SET_FONT_FAMILY', payload: font.value as AccessibilitySettings['fontFamily'] })}
                                className={`p-4 rounded-xl border-2 transition-all duration-200 text-right ${
                                  settings.fontFamily === font.value
                                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                                aria-pressed={settings.fontFamily === font.value}
                                aria-label={`בחר פונט ${font.label}`}
                              >
                                <div className="font-medium mb-2">{font.label}</div>
                                <div className="text-sm text-gray-600">{font.sample}</div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Navigation Tab */}
                    {activeTab === 'navigation' && (
                      <div className="space-y-8">
                        
                        <div className="bg-gray-50 p-6 rounded-2xl">
                          <h3 className="text-xl font-bold text-primary-800 mb-4 flex items-center gap-2">
                            🎯 ניווט ופוקוס
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                                <div>
                                  <div className="font-medium">ניווט עם מקלדת</div>
                                  <div className="text-sm text-gray-600">הפעלת ניווט עם מקלדת בלבד</div>
                                </div>
                                <button
                                  onClick={() => dispatch({ type: 'TOGGLE_KEYBOARD_NAVIGATION' })}
                                  className={`w-12 h-6 rounded-full transition-colors relative ${
                                    settings.keyboardNavigation ? 'bg-primary-500' : 'bg-gray-300'
                                  }`}
                                  aria-pressed={settings.keyboardNavigation}
                                  aria-label="הפעלת ניווט עם מקלדת"
                                >
                                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                                    settings.keyboardNavigation ? 'translate-x-6' : 'translate-x-0.5'
                                  }`} />
                                </button>
                              </div>

                              <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                                <div>
                                  <div className="font-medium">מדגיש פוקוס</div>
                                  <div className="text-sm text-gray-600">הדגשת אלמנטים במיקוד</div>
                                </div>
                                <button
                                  onClick={() => dispatch({ type: 'TOGGLE_FOCUS_INDICATORS' })}
                                  className={`w-12 h-6 rounded-full transition-colors relative ${
                                    settings.focusIndicators ? 'bg-primary-500' : 'bg-gray-300'
                                  }`}
                                  aria-pressed={settings.focusIndicators}
                                  aria-label="הפעלת מדגישי פוקוס"
                                >
                                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                                    settings.focusIndicators ? 'translate-x-6' : 'translate-x-0.5'
                                  }`} />
                                </button>
                              </div>

                              <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                                <div>
                                  <div className="font-medium">קישורי דילוג</div>
                                  <div className="text-sm text-gray-600">הוספת קישורי דילוג לתוכן</div>
                                </div>
                                <button
                                  onClick={() => dispatch({ type: 'TOGGLE_SKIP_LINKS' })}
                                  className={`w-12 h-6 rounded-full transition-colors relative ${
                                    settings.skipLinks ? 'bg-primary-500' : 'bg-gray-300'
                                  }`}
                                  aria-pressed={settings.skipLinks}
                                  aria-label="הפעלת קישורי דילוג"
                                >
                                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                                    settings.skipLinks ? 'translate-x-6' : 'translate-x-0.5'
                                  }`} />
                                </button>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                                <div>
                                  <div className="font-medium">הדגשת קישורים</div>
                                  <div className="text-sm text-gray-600">הדגשה חזותית של כל הקישורים</div>
                                </div>
                                <button
                                  onClick={() => dispatch({ type: 'TOGGLE_HIGHLIGHT_LINKS' })}
                                  className={`w-12 h-6 rounded-full transition-colors relative ${
                                    settings.highlightLinks ? 'bg-primary-500' : 'bg-gray-300'
                                  }`}
                                  aria-pressed={settings.highlightLinks}
                                  aria-label="הפעלת הדגשת קישורים"
                                >
                                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                                    settings.highlightLinks ? 'translate-x-6' : 'translate-x-0.5'
                                  }`} />
                                </button>
                              </div>

                              <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                                <div>
                                  <div className="font-medium">הפסקת אנימציות</div>
                                  <div className="text-sm text-gray-600">הפסקת כל התנועות והאנימציות</div>
                                </div>
                                <button
                                  onClick={toggleReduceMotion}
                                  className={`w-12 h-6 rounded-full transition-colors relative ${
                                    settings.reduceMotion ? 'bg-primary-500' : 'bg-gray-300'
                                  }`}
                                  aria-pressed={settings.reduceMotion}
                                  aria-label="הפעלת הפסקת אנימציות"
                                >
                                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                                    settings.reduceMotion ? 'translate-x-6' : 'translate-x-0.5'
                                  }`} />
                                </button>
                              </div>

                              <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                                <div>
                                  <div className="font-medium">פישוט עמוד</div>
                                  <div className="text-sm text-gray-600">הסתרת אלמנטים מיותרים</div>
                                </div>
                                <button
                                  onClick={() => dispatch({ type: 'TOGGLE_SIMPLIFIED_LAYOUT' })}
                                  className={`w-12 h-6 rounded-full transition-colors relative ${
                                    settings.simplifiedLayout ? 'bg-primary-500' : 'bg-gray-300'
                                  }`}
                                  aria-pressed={settings.simplifiedLayout}
                                  aria-label="הפעלת פישוט עמוד"
                                >
                                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                                    settings.simplifiedLayout ? 'translate-x-6' : 'translate-x-0.5'
                                  }`} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Content Tab */}
                    {activeTab === 'content' && (
                      <div className="space-y-8">
                        
                        <div className="bg-gray-50 p-6 rounded-2xl">
                          <h3 className="text-xl font-bold text-primary-800 mb-4 flex items-center gap-2">
                            📖 תוכן וקריאה
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                                <div>
                                  <div className="font-medium">אופטימיזציה לקורא מסך</div>
                                  <div className="text-sm text-gray-600">התאמה לקוראי מסך</div>
                                </div>
                                <button
                                  onClick={() => dispatch({ type: 'TOGGLE_SCREEN_READER_OPTIMIZED' })}
                                  className={`w-12 h-6 rounded-full transition-colors relative ${
                                    settings.screenReaderOptimized ? 'bg-primary-500' : 'bg-gray-300'
                                  }`}
                                  aria-pressed={settings.screenReaderOptimized}
                                  aria-label="הפעלת אופטימיזציה לקורא מסך"
                                >
                                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                                    settings.screenReaderOptimized ? 'translate-x-6' : 'translate-x-0.5'
                                  }`} />
                                </button>
                              </div>

                              <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                                <div>
                                  <div className="font-medium">טקסט קריא</div>
                                  <div className="text-sm text-gray-600">שיפור קריאות הטקסט</div>
                                </div>
                                <button
                                  onClick={() => dispatch({ type: 'TOGGLE_READABLE_TEXT' })}
                                  className={`w-12 h-6 rounded-full transition-colors relative ${
                                    settings.readableText ? 'bg-primary-500' : 'bg-gray-300'
                                  }`}
                                  aria-pressed={settings.readableText}
                                  aria-label="הפעלת טקסט קריא"
                                >
                                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                                    settings.readableText ? 'translate-x-6' : 'translate-x-0.5'
                                  }`} />
                                </button>
                              </div>

                              <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                                <div>
                                  <div className="font-medium">הצגת טקסט חלופי</div>
                                  <div className="text-sm text-gray-600">הצגת טקסט Alt בתמונות</div>
                                </div>
                                <button
                                  onClick={() => dispatch({ type: 'TOGGLE_ALT_TEXT_VISIBLE' })}
                                  className={`w-12 h-6 rounded-full transition-colors relative ${
                                    settings.altTextVisible ? 'bg-primary-500' : 'bg-gray-300'
                                  }`}
                                  aria-pressed={settings.altTextVisible}
                                  aria-label="הפעלת הצגת טקסט חלופי"
                                >
                                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                                    settings.altTextVisible ? 'translate-x-6' : 'translate-x-0.5'
                                  }`} />
                                </button>
                              </div>

                              <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                                <div>
                                  <div className="font-medium">הסתרת תמונות</div>
                                  <div className="text-sm text-gray-600">הסתרת כל התמונות</div>
                                </div>
                                <button
                                  onClick={() => dispatch({ type: 'TOGGLE_HIDE_IMAGES' })}
                                  className={`w-12 h-6 rounded-full transition-colors relative ${
                                    settings.hideImages ? 'bg-primary-500' : 'bg-gray-300'
                                  }`}
                                  aria-pressed={settings.hideImages}
                                  aria-label="הפעלת הסתרת תמונות"
                                >
                                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                                    settings.hideImages ? 'translate-x-6' : 'translate-x-0.5'
                                  }`} />
                                </button>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                                <div>
                                  <div className="font-medium">מסכת קריאה</div>
                                  <div className="text-sm text-gray-600">מסכה להתמקדות בטקסט</div>
                                </div>
                                <button
                                  onClick={() => dispatch({ type: 'TOGGLE_READING_MASK' })}
                                  className={`w-12 h-6 rounded-full transition-colors relative ${
                                    settings.readingMask ? 'bg-primary-500' : 'bg-gray-300'
                                  }`}
                                  aria-pressed={settings.readingMask}
                                  aria-label="הפעלת מסכת קריאה"
                                >
                                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                                    settings.readingMask ? 'translate-x-6' : 'translate-x-0.5'
                                  }`} />
                                </button>
                              </div>

                              <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                                <div>
                                  <div className="font-medium">מדריך קריאה</div>
                                  <div className="text-sm text-gray-600">קו מדריך לקריאה</div>
                                </div>
                                <button
                                  onClick={() => dispatch({ type: 'TOGGLE_READING_GUIDE' })}
                                  className={`w-12 h-6 rounded-full transition-colors relative ${
                                    settings.readingGuide ? 'bg-primary-500' : 'bg-gray-300'
                                  }`}
                                  aria-pressed={settings.readingGuide}
                                  aria-label="הפעלת מדריך קריאה"
                                >
                                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                                    settings.readingGuide ? 'translate-x-6' : 'translate-x-0.5'
                                  }`} />
                                </button>
                              </div>

                              <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                                <div>
                                  <div className="font-medium">זכוכית מגדלת</div>
                                  <div className="text-sm text-gray-600">הגדלת אזור בעמוד</div>
                                </div>
                                <button
                                  onClick={() => dispatch({ type: 'TOGGLE_MAGNIFIER' })}
                                  className={`w-12 h-6 rounded-full transition-colors relative ${
                                    settings.magnifier ? 'bg-primary-500' : 'bg-gray-300'
                                  }`}
                                  aria-pressed={settings.magnifier}
                                  aria-label="הפעלת זכוכית מגדלת"
                                >
                                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                                    settings.magnifier ? 'translate-x-6' : 'translate-x-0.5'
                                  }`} />
                                </button>
                              </div>

                              <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                                <div>
                                  <div className="font-medium">טיפים וכלים</div>
                                  <div className="text-sm text-gray-600">הצגת טיפים מועילים</div>
                                </div>
                                <button
                                  onClick={() => dispatch({ type: 'TOGGLE_TOOLTIPS_ENABLED' })}
                                  className={`w-12 h-6 rounded-full transition-colors relative ${
                                    settings.tooltipsEnabled ? 'bg-primary-500' : 'bg-gray-300'
                                  }`}
                                  aria-pressed={settings.tooltipsEnabled}
                                  aria-label="הפעלת טיפים וכלים"
                                >
                                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                                    settings.tooltipsEnabled ? 'translate-x-6' : 'translate-x-0.5'
                                  }`} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Audio Tab */}
                    {activeTab === 'audio' && (
                      <div className="space-y-8">
                        
                        <div className="bg-gray-50 p-6 rounded-2xl">
                          <h3 className="text-xl font-bold text-primary-800 mb-4 flex items-center gap-2">
                            🔊 הגדרות שמע
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                                <div>
                                  <div className="font-medium">הפעלת צלילים</div>
                                  <div className="text-sm text-gray-600">הפעלת צלילי מערכת</div>
                                </div>
                                <button
                                  onClick={() => dispatch({ type: 'TOGGLE_SOUND_ENABLED' })}
                                  className={`w-12 h-6 rounded-full transition-colors relative ${
                                    settings.soundEnabled ? 'bg-primary-500' : 'bg-gray-300'
                                  }`}
                                  aria-pressed={settings.soundEnabled}
                                  aria-label="הפעלת צלילים"
                                >
                                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                                    settings.soundEnabled ? 'translate-x-6' : 'translate-x-0.5'
                                  }`} />
                                </button>
                              </div>

                              <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                                <div>
                                  <div className="font-medium">צלילי לחיצה</div>
                                  <div className="text-sm text-gray-600">צליל בלחיצה על כפתורים</div>
                                </div>
                                <button
                                  onClick={() => dispatch({ type: 'TOGGLE_CLICK_SOUNDS' })}
                                  className={`w-12 h-6 rounded-full transition-colors relative ${
                                    settings.clickSounds ? 'bg-primary-500' : 'bg-gray-300'
                                  }`}
                                  aria-pressed={settings.clickSounds}
                                  aria-label="הפעלת צלילי לחיצה"
                                >
                                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                                    settings.clickSounds ? 'translate-x-6' : 'translate-x-0.5'
                                  }`} />
                                </button>
                              </div>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg">
                              <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                                <QuestionMarkCircleIcon className="w-5 h-5" />
                                עזרה נוספת
                              </h4>
                              <p className="text-blue-700 text-sm leading-relaxed">
                                לעזרה נוספת בנגישות, אנא פנו אלינו בטלפון 
                                <span className="font-medium"> 03-1234567</span> או במייל 
                                <span className="font-medium"> accessibility@henig.co.il</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                    <p className="text-gray-600">
                      🌟 רכיב נגישות מתקדם תקן AA | פותח עבור מכון הניג
                    </p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
