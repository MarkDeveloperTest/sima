import { ArrowRight, Sparkles } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { sima } from '../../data/sima'
import { Reveal } from '../shared/Reveal'

interface Particle {
  id: number
  left: number
  delay: number
  duration: number
  rotate: number
  drift: number
  width: number
}

function CelebrationParticles({ active }: { active: boolean }) {
  const reduceMotion = useReducedMotion()
  const particles = useMemo<Particle[]>(
    () => Array.from({ length: 34 }, (_, id) => ({
      id,
      left: (id * 37.7) % 100,
      delay: (id % 8) * 0.045,
      duration: 1.8 + (id % 5) * 0.16,
      rotate: 80 + (id % 7) * 70,
      drift: ((id % 9) - 4) * 14,
      width: 3 + (id % 4) * 2,
    })),
    [],
  )

  if (!active || reduceMotion) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden" aria-hidden="true">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute -top-5 block rounded-full bg-matcha-300 shadow-[0_0_16px_rgba(183,201,168,.65)]"
          style={{ left: `${particle.left}%`, width: particle.width, height: particle.width * 3.6 }}
          initial={{ y: -30, x: 0, opacity: 0, rotate: 0 }}
          animate={{ y: '110vh', x: particle.drift, opacity: [0, 1, 1, 0], rotate: particle.rotate }}
          transition={{ delay: particle.delay, duration: particle.duration, ease: 'easeIn' }}
        />
      ))}
    </div>
  )
}

export function FinaleSection() {
  const [celebrated, setCelebrated] = useState(false)

  const celebrate = () => {
    setCelebrated(true)
    window.setTimeout(() => setCelebrated(false), 3400)
  }

  return (
    <section id="finale" className="relative overflow-hidden bg-[#090a09] text-white">
      <div className="section-pad content-shell flex min-h-[85svh] flex-col justify-center py-28 sm:py-40">
        <Reveal>
          <p className="mb-8 text-sm font-medium text-matcha-300 sm:text-base">{sima.finale.oneMoreThing}</p>
          <h2 className="display-lg">{sima.name}<span className="text-matcha-300">.</span></h2>
        </Reveal>
      </div>

      <div className="section-pad content-shell pb-32 sm:pb-48">
        <div className="ml-auto max-w-4xl space-y-[34vh]">
          {sima.finale.lines.map((line, index) => (
            <Reveal key={line}>
              <p className={`${index === 1 || index === 2 ? 'text-[clamp(2.3rem,5.4vw,5.7rem)]' : 'text-[clamp(1.75rem,3.6vw,3.8rem)]'} font-medium leading-[1.03] tracking-[-0.05em]`}>
                {line}
              </p>
            </Reveal>
          ))}
          <Reveal>
            <p className="text-[clamp(2.8rem,7vw,7.4rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-matcha-300">
              {sima.finale.gratitude}
            </p>
          </Reveal>
        </div>
      </div>

      <div className="relative bg-matcha-300 text-ink">
        <div className="absolute inset-x-0 -top-20 h-20 bg-gradient-to-b from-transparent to-matcha-300" aria-hidden="true" />
        <div className="section-pad content-shell flex min-h-[100svh] flex-col items-start justify-center py-28">
          <Reveal>
            <h2 className="max-w-6xl text-[clamp(3.4rem,9vw,9.5rem)] font-semibold leading-[0.88] tracking-[-0.07em]">
              {sima.finale.birthday}
            </h2>
            <p className="mt-10 text-[clamp(1.7rem,3.5vw,3.7rem)] font-medium tracking-[-0.04em]">{sima.finale.keepBeing}</p>
            <p className="mt-3 text-base text-black/65 sm:text-lg">{sima.finale.working}</p>
          </Reveal>

          <button
            type="button"
            onClick={celebrate}
            className="mt-16 inline-flex min-h-16 items-center gap-4 rounded-full bg-ink px-8 text-base font-semibold text-white shadow-2xl shadow-black/15 transition-transform hover:scale-[1.025] active:scale-[0.975] sm:px-10"
          >
            {sima.finale.cta}
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </button>

          <AnimatePresence>
            {celebrated && (
              <motion.div
                role="status"
                initial={{ opacity: 0, y: 30, scale: 0.96, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mt-16"
              >
                <Sparkles className="mb-5 h-7 w-7" aria-hidden="true" />
                <p className="text-[clamp(2.6rem,7vw,7rem)] font-semibold leading-[0.92] tracking-[-0.06em]">{sima.finale.reveal}</p>
                <p className="mt-4 text-[clamp(1.5rem,3vw,3rem)] font-medium tracking-[-0.04em]">{sima.finale.revealSub}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <footer className="section-pad content-shell flex flex-col gap-1 border-t border-black/15 pb-[calc(7rem+env(safe-area-inset-bottom))] pt-12 text-xs text-black/60 sm:flex-row sm:items-center sm:justify-between sm:pb-28 sm:pr-72">
          <p>{sima.finale.madeFor}</p>
          <p>{sima.finale.madeBecause}</p>
        </footer>
      </div>

      <CelebrationParticles active={celebrated} />
    </section>
  )
}
