import { Check, ChevronRight, Heart, Sprout, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { sima } from '../../data/sima'
import { Reveal } from '../shared/Reveal'

interface Level24SectionProps {
  onSecret?: (trigger: 'age') => void
}

const featureIcons = [TrendingUp, TrendingUp, Sprout, Check, TrendingUp, Heart, Check]

export function Level24Section({ onSecret }: Level24SectionProps) {
  const [expanded, setExpanded] = useState(false)
  const [ageTaps, setAgeTaps] = useState(0)

  const tapAge = () => {
    const next = ageTaps + 1
    setAgeTaps(next)
    if (next >= 5) {
      onSecret?.('age')
      setAgeTaps(0)
    }
  }

  return (
    <section id="level-24" className="section-pad relative overflow-hidden bg-white py-28 sm:py-36 lg:py-48">
      <div className="content-shell grid items-start gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-24">
        <Reveal>
          <p className="section-label mb-8">{sima.level24.system}</p>
          <button
            type="button"
            onClick={tapAge}
            aria-label="24. Натисніть п’ять разів, щоб відкрити секрет."
            className="group -ml-2 block text-left"
          >
            <motion.span
              animate={ageTaps > 0 ? { scale: [1, 1.025, 1] } : undefined}
              className="display-xl block bg-gradient-to-b from-matcha-300 to-matcha-600 bg-clip-text pr-8 text-transparent"
            >
              24<span className="text-matcha-400">.</span>
            </motion.span>
          </button>
          <h2 className="mt-8 text-[clamp(2.25rem,5vw,5rem)] font-semibold leading-[0.92] tracking-[-0.055em]">
            {sima.level24.title}
          </h2>
        </Reveal>

        <Reveal delay={0.12} className="lg:pt-10">
          <div className="mb-10 flex items-center gap-4 border-b hairline pb-7">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-matcha-400 text-matcha-700">
              <Check className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-medium text-matcha-700">100%</p>
              <p className="text-lg font-medium tracking-tight">{sima.level24.status}</p>
            </div>
          </div>

          <div className="relative mb-10 h-2 overflow-hidden rounded-full bg-matcha-100" aria-label="Оновлення завершено на 100 відсотків">
            <motion.div
              className="absolute inset-y-0 left-0 bg-matcha-400"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            className="flex min-h-14 w-full items-center justify-between rounded-full bg-matcha-300 px-6 text-[15px] font-semibold transition-colors hover:bg-matcha-400 sm:px-8"
          >
            {sima.level24.cta}
            <ChevronRight className={`h-5 w-5 transition-transform ${expanded ? 'rotate-90' : ''}`} aria-hidden="true" />
          </button>

          <motion.div
            initial={false}
            animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
            className="overflow-hidden"
          >
            <ul className="pt-5">
              {sima.level24.features.map((feature, index) => {
                const Icon = featureIcons[index] ?? Check
                return (
                  <motion.li
                    key={feature}
                    initial={false}
                    animate={{ x: expanded ? 0 : 12, opacity: expanded ? 1 : 0 }}
                    transition={{ delay: expanded ? index * 0.045 : 0 }}
                    className="flex min-h-14 items-center gap-4 border-b hairline py-3 text-base font-medium tracking-tight sm:text-lg"
                  >
                    <Icon className="h-5 w-5 text-matcha-600" strokeWidth={1.6} aria-hidden="true" />
                    {feature}
                  </motion.li>
                )
              })}
            </ul>
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}
