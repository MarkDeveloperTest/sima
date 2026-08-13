import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useId, useRef } from 'react'
import type { InsideJoke } from '../data/sima'
import { useScrollLock } from '../hooks/useScrollLock'

interface EasterEggOverlayProps {
  joke: InsideJoke | null
  onClose: () => void
}

export function EasterEggOverlay({ joke, onClose }: EasterEggOverlayProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()
  useScrollLock(Boolean(joke))

  useEffect(() => {
    if (!joke) return

    const returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const focusCloseButton = window.requestAnimationFrame(() => closeRef.current?.focus())

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.cancelAnimationFrame(focusCloseButton)
      window.removeEventListener('keydown', onKeyDown)
      returnFocus?.focus()
    }
  }, [joke, onClose])

  return (
    <AnimatePresence>
      {joke && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center bg-black/45 p-4 backdrop-blur-md sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-xl rounded-[1.6rem] border border-white/45 bg-paper p-7 text-ink shadow-2xl sm:p-10"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Закрити"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border hairline transition-colors hover:bg-black/5"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <p className="section-label mb-6">Досягнення відкрито.</p>
            <h2 id={titleId} className="pr-12 text-4xl font-semibold leading-none tracking-[-0.05em] sm:text-6xl">{joke.title}</h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-black/65 sm:text-lg">{joke.description}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
