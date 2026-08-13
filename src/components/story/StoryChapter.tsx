import { motion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'

import { sima } from '../../data/sima'
import { PhotoPlaceholder } from '../shared/PhotoPlaceholder'
import { Reveal } from '../shared/Reveal'

const leadershipPhoto = sima.photos.find((photo) => photo.id === 'church')

export function LeadershipSection() {
  const { leadership } = sima

  return (
    <section
      id="leadership"
      aria-labelledby="leadership-title"
      className="scroll-mt-20 overflow-hidden bg-paper text-ink"
    >
      <div className="section-pad content-shell pb-24 pt-28 sm:pb-32 sm:pt-40 lg:pb-44 lg:pt-52">
        <Reveal>
          <p className="section-label mb-8 sm:mb-12">{leadership.label}</p>
        </Reveal>

        <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(28rem,1.18fr)] lg:gap-16">
          <Reveal className="pb-1 lg:pb-10">
            <h2 id="leadership-title" className="display-md max-w-4xl text-balance">
              {leadership.title}
            </h2>
            <p className="mt-7 max-w-xl text-xl font-medium tracking-[-0.03em] text-matcha-700 sm:mt-9 sm:text-3xl">
              {leadership.punchline}
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <PhotoPlaceholder
              label={leadershipPhoto?.placeholder ?? 'SIMA_CHURCH'}
              image={leadershipPhoto?.image}
              alt={leadershipPhoto?.alt ?? 'Сіма з групою під час служіння'}
              objectPosition={leadershipPhoto?.objectPosition}
              className="h-[62svh] min-h-[30rem] w-full sm:min-h-[38rem] lg:h-[76svh] lg:max-h-[56rem]"
            />
          </Reveal>
        </div>
      </div>

      <div className="section-pad flex min-h-[62svh] items-center border-y hairline bg-white py-24 sm:min-h-[74svh]">
        <div className="content-shell">
          <Reveal>
            <p className="display-md max-w-5xl text-balance">{leadership.serious}</p>
          </Reveal>
        </div>
      </div>

      <ol className="section-pad content-shell" aria-label="Що означає лідерство Сіми">
        {leadership.lines.map((line, index) => (
          <li
            key={line}
            className="flex min-h-[46svh] items-center border-b hairline py-20 sm:min-h-[54svh] sm:py-28"
          >
            <Reveal className="grid w-full gap-8 sm:grid-cols-[5rem_minmax(0,1fr)] sm:items-start sm:gap-10 lg:grid-cols-[8rem_minmax(0,1fr)]">
              <span
                className="font-mono text-xs font-medium tracking-[0.14em] text-matcha-600 sm:pt-3"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="max-w-5xl text-balance text-[clamp(2rem,5.5vw,5.75rem)] font-semibold leading-[0.98] tracking-[-0.055em]">
                {line}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function MentorSection() {
  const { mentor } = sima

  return (
    <section
      id="mentor"
      aria-labelledby="mentor-title"
      className="scroll-mt-20 bg-white text-ink"
    >
      <div className="section-pad content-shell pb-16 pt-32 sm:pb-24 sm:pt-44 lg:pt-56">
        <Reveal>
          <h2 id="mentor-title" className="display-md max-w-5xl text-balance">
            {mentor.title}
          </h2>
        </Reveal>
      </div>

      <ol className="section-pad content-shell pb-12 sm:pb-24" aria-label="Чому Сіма більше, ніж друг">
        {mentor.lines.map((line) => (
          <li key={line} className="flex min-h-[40svh] items-center py-16 sm:min-h-[48svh] sm:py-24">
            <Reveal className="w-full">
              <p className="max-w-6xl text-balance text-[clamp(2rem,5vw,5.25rem)] font-semibold leading-[1.02] tracking-[-0.055em]">
                {line}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>

      <div className="section-pad flex min-h-[82svh] items-center border-t hairline py-28 sm:min-h-screen sm:py-40">
        <div className="content-shell">
          <Reveal>
            <p className="display-md max-w-5xl text-balance">{mentor.notice}</p>
            <p className="mt-8 max-w-3xl text-balance text-2xl font-semibold leading-tight tracking-[-0.035em] text-matcha-700 sm:mt-12 sm:text-4xl lg:text-5xl">
              {mentor.respect}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export function ImpactSection() {
  const { impact } = sima
  const [openItems, setOpenItems] = useState<Set<number>>(() => new Set())

  const toggleItem = (index: number) => {
    setOpenItems((current) => {
      const next = new Set(current)

      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }

      return next
    })
  }

  return (
    <section
      id="impact"
      aria-labelledby="impact-title"
      className="scroll-mt-20 overflow-hidden bg-ink text-white"
    >
      <div className="section-pad content-shell py-28 sm:py-40 lg:py-52">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)] lg:gap-24">
          <Reveal>
            <h2 id="impact-title" className="display-md max-w-5xl text-balance">
              {impact.title}
            </h2>
          </Reveal>

          <div className="space-y-4 self-end sm:space-y-5">
            {impact.intro.map((line, index) => (
              <Reveal key={line} delay={index * 0.08}>
                <p
                  className={`text-balance text-xl leading-snug tracking-[-0.025em] sm:text-2xl ${
                    index === impact.intro.length - 1 ? 'font-semibold text-matcha-300' : 'text-white/64'
                  }`}
                >
                  {line}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-24 sm:mt-36 lg:mt-44">
          <div className="border-t border-white/20">
            {impact.items.map((item, index) => {
              const isOpen = openItems.has(index)
              const triggerId = `impact-trigger-${index}`
              const panelId = `impact-panel-${index}`

              return (
                <article key={item.title} className="border-b border-white/20">
                  <h3>
                    <button
                      id={triggerId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleItem(index)}
                      className="group flex w-full items-center justify-between gap-8 py-7 text-left sm:py-10"
                    >
                      <span className="text-balance text-2xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">
                        {item.title}
                      </span>
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/25 text-matcha-300 transition-colors duration-300 group-hover:border-matcha-300 group-hover:bg-matcha-300 group-hover:text-ink sm:h-12 sm:w-12">
                        {isOpen ? (
                          <Minus className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                        ) : (
                          <Plus className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                        )}
                      </span>
                    </button>
                  </h3>

                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    aria-hidden={!isOpen}
                    initial={false}
                    animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-3xl pb-8 pr-14 text-lg leading-relaxed text-white/68 sm:pb-11 sm:pr-24 sm:text-xl">
                      {item.body}
                    </p>
                  </motion.div>
                </article>
              )
            })}
          </div>
        </Reveal>

        <Reveal className="pb-4 pt-32 sm:pt-44">
          <p className="text-balance text-[clamp(3.5rem,10vw,10rem)] font-semibold leading-[0.86] tracking-[-0.07em] text-matcha-300">
            {impact.thanks}
          </p>
        </Reveal>
      </div>
    </section>
  )
}

export function FaithSection() {
  const { faith } = sima

  return (
    <section
      id="faith"
      aria-labelledby="faith-title"
      className="relative isolate scroll-mt-20 overflow-hidden bg-matcha-50 text-ink"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[-20%] top-[-16rem] -z-10 h-[42rem] rounded-[50%] bg-matcha-200/55 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-18rem] right-[-14rem] -z-10 h-[34rem] w-[34rem] rounded-full bg-white/90 blur-[90px]"
      />

      <div className="section-pad content-shell py-32 sm:py-48 lg:py-60">
        <header className="mx-auto max-w-6xl text-center">
          <h2 id="faith-title" className="display-md text-balance">
            {faith.title}
          </h2>
        </header>

        <blockquote className="mx-auto my-28 max-w-5xl border-y border-matcha-700/20 py-16 text-center sm:my-40 sm:py-24">
          <p className="text-balance text-[clamp(2rem,5vw,5rem)] font-medium leading-[1.06] tracking-[-0.05em]">
            «{faith.quote}»
          </p>
          <footer className="mt-8 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-matcha-700 sm:mt-12">
            {faith.reference}
          </footer>
        </blockquote>

        <div className="mx-auto max-w-4xl text-center">
          <p className="body-large text-balance text-ink/72">{faith.gratitude}</p>
          <p className="mt-9 text-balance text-3xl font-semibold tracking-[-0.04em] sm:mt-12 sm:text-5xl">
            {faith.personal}
          </p>
        </div>

        <div className="mx-auto mt-40 max-w-5xl border-t border-matcha-700/20 pt-16 text-center sm:mt-56 sm:pt-24">
          <h3 className="text-balance text-[clamp(2.5rem,6vw,6.5rem)] font-semibold leading-[0.96] tracking-[-0.06em]">
            {faith.blessingTitle}
          </h3>
          <div className="mx-auto mt-12 max-w-3xl space-y-8 text-balance text-lg leading-relaxed text-ink/70 sm:mt-16 sm:text-xl sm:leading-relaxed">
            <p>{faith.blessing}</p>
            <p>{faith.blessingMore}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
