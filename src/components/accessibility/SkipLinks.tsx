'use client'

import { useAccessibility } from '@/contexts/AccessibilityContext'

export default function SkipLinks() {
  const { settings } = useAccessibility()

  if (!settings.skipLinks) return null

  const skipLinks = [
    { href: '#main-content', label: 'דלג לתוכן הראשי' },
    { href: '#main-navigation', label: 'דלג לתפריט הניווט' },
    { href: '#search', label: 'דלג לחיפוש' },
    { href: '#footer', label: 'דלג לתחתית העמוד' },
  ]

  return (
    <div className="skip-links-container">
      {skipLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="skip-link"
          onClick={(e) => {
            e.preventDefault()
            const target = document.querySelector(link.href)
            if (target) {
              target.scrollIntoView({ behavior: 'smooth' })
              // Focus the target element
              const focusableTarget = target as HTMLElement
              focusableTarget.focus()
              
              // Announce to screen readers
              const announcement = document.createElement('div')
              announcement.setAttribute('aria-live', 'polite')
              announcement.className = 'sr-only'
              announcement.textContent = `עברת ל${link.label}`
              document.body.appendChild(announcement)
              
              setTimeout(() => {
                document.body.removeChild(announcement)
              }, 1000)
            }
          }}
        >
          {link.label}
        </a>
      ))}
    </div>
  )
}
