import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import type { InsideJoke } from '../data/sima'

interface EasterEggOverlayProps {
  joke: InsideJoke | null
  onClose: () => void
}

export function EasterEggOverlay({ joke, onClose }: EasterEggOverlayProps) {
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
            role="dialog"
            aria-modal="true"
            aria-labelledby="achievement-title"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-xl rounded-[1.6rem] border border-white/45 bg-paper p-7 text-ink shadow-2xl sm:p-10"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Закрити"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border hairline transition-colors hover:bg-black/5"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <p className="section-label mb-6">Досягнення відкрито.</p>
            <h2 id="achievement-title" className="pr-12 text-4xl font-semibold leading-none tracking-[-0.05em] sm:text-6xl">{joke.title}</h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-black/65 sm:text-lg">{joke.description}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
