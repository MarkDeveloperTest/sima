import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { useRef, useState } from 'react'
import { sima } from '../../data/sima'
import { PhotoPlaceholder } from '../shared/PhotoPlaceholder'

const revealTransition = {
  duration: 0.9,
  ease: [0.22, 1, 0.36, 1] as const,
}

const traitMoments = [
  { range: [0.32, 0.42] as const, text: sima.intro.traitSequence[0] },
  { range: [0.42, 0.52] as const, text: sima.intro.traitSequence[1] },
  { range: [0.52, 0.62] as const, text: sima.intro.traitSequence[2] },
  { range: [0.62, 0.77] as const, text: sima.intro.traitSequence[3], wide: true },
]

const traitPositions = [
  'left-3 top-[12%] sm:-left-10 lg:-left-16',
  'right-3 top-[29%] flex-row-reverse text-right sm:-right-12 lg:-right-20',
  'left-3 top-[43%] sm:-left-14 sm:top-[51%] lg:-left-24',
  'right-3 top-[69%] flex-row-reverse text-right sm:-right-10 lg:-right-16',
  'bottom-[10%] left-3 sm:left-[8%]',
]

const statLayouts = [
  'items-center text-center md:col-span-2 md:min-h-[68svh]',
  'items-start text-left md:min-h-[54svh] md:border-r md:border-black/10',
  'items-end text-right md:min-h-[54svh]',
  'items-center text-center md:col-span-2 md:min-h-[58svh]',
  'items-start text-left md:min-h-[52svh] md:border-r md:border-black/10',
  'items-end text-right md:min-h-[52svh]',
]

const statValueSizes = [
  'text-[clamp(8rem,32vw,25rem)]',
  'text-[clamp(8rem,23vw,17rem)]',
  'text-[clamp(8rem,23vw,17rem)]',
  'text-[clamp(4.4rem,17vw,12rem)]',
  'text-[clamp(6rem,19vw,14rem)]',
  'max-w-[12ch] text-[clamp(2.7rem,9.5vw,8rem)]',
]

function scrollToHero(instant = false) {
  document.getElementById('hero')?.scrollIntoView({
    behavior: instant ? 'auto' : 'smooth',
    block: 'start',
  })
}

function MeetSimaButton({ reducedMotion = false, disabled = false }: { reducedMotion?: boolean; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={() => scrollToHero(reducedMotion)}
      disabled={disabled}
      className="group inline-flex min-h-12 items-center gap-3 rounded-full border border-white/25 bg-white px-5 py-3 text-sm font-semibold tracking-[-0.01em] text-ink shadow-[0_14px_50px_rgba(0,0,0,0.24)] transition-transform duration-300 hover:-translate-y-0.5 disabled:pointer-events-none sm:px-6 sm:text-base"
      aria-label={`${sima.intro.cta}: перейти до головного розділу`}
    >
      {sima.intro.cta}
      <ArrowDown
        aria-hidden="true"
        className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
        strokeWidth={1.8}
      />
    </button>
  )
}

function IntroTrait({
  progress,
  range,
  text,
  wide = false,
}: {
  progress: MotionValue<number>
  range: readonly [number, number]
  text: string
  wide?: boolean
}) {
  const duration = range[1] - range[0]
  const opacity = useTransform(
    progress,
    [range[0], range[0] + duration * 0.23, range[1] - duration * 0.22, range[1]],
    [0, 1, 1, 0],
  )
  const y = useTransform(progress, [range[0], range[0] + duration * 0.25, range[1]], [42, 0, -28])
  const scale = useTransform(progress, [range[0], range[0] + duration * 0.3, range[1]], [0.97, 1, 1.015])

  return (
    <motion.p
      aria-hidden="true"
      style={{ opacity, y, scale }}
      className={`absolute inset-x-5 z-20 m-0 text-center font-semibold leading-[0.94] tracking-[-0.055em] text-white drop-shadow-[0_3px_24px_rgba(0,0,0,0.55)] sm:inset-x-10 ${
        wide ? 'text-[clamp(2.8rem,8vw,7.5rem)]' : 'text-[clamp(4rem,12vw,11rem)]'
      }`}
    >
      {text}
    </motion.p>
  )
}

function ReducedIntro() {
  const birthday = sima.birthday.trim() || sima.birthdayFallback

  return (
    <section
      id="intro"
      aria-labelledby="intro-title"
      className="relative isolate flex min-h-[100svh] overflow-hidden bg-[#090b09] px-5 py-14 text-white sm:px-8 sm:py-20"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_30%,rgba(183,201,168,0.2),transparent_34%),linear-gradient(180deg,#101410_0%,#080908_72%)]"
      />

      <div className="mx-auto flex w-full max-w-[1180px] flex-col items-center justify-center text-center">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-matcha-300 sm:text-sm">
          {sima.intro.introducing}
        </p>
        <h1 id="intro-title" className="display-xl text-white">
          {sima.name.toUpperCase()}
        </h1>
        <p className="mt-7 text-base font-medium text-white/[0.66] sm:text-xl">{sima.intro.generation}</p>
        <p className="mt-2 body-large font-medium text-white">{sima.intro.tagline}</p>

        <ul className="mt-10 flex max-w-4xl flex-wrap justify-center gap-x-5 gap-y-2 text-base text-white/[0.64] sm:text-xl">
          {sima.intro.traitSequence.map((trait) => (
            <li key={trait}>{trait}</li>
          ))}
        </ul>

        <p className="mt-12 text-xs font-semibold uppercase tracking-[0.2em] text-matcha-300 sm:text-sm">
          {sima.intro.availabilityLabel} — {birthday}
        </p>
        <div className="mt-6">
          <MeetSimaButton reducedMotion />
        </div>
      </div>
    </section>
  )
}

export function IntroSection() {
  const shouldReduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const [ctaAvailable, setCtaAvailable] = useState(false)
  const birthday = sima.birthday.trim() || sima.birthdayFallback
  const heroPhoto = sima.photos.find((photo) => photo.featured)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const progress = useSpring(scrollYProgress, {
    stiffness: 84,
    damping: 27,
    mass: 0.32,
  })

  const introducingOpacity = useTransform(progress, [0, 0.09, 0.13], [1, 1, 0])
  const introducingY = useTransform(progress, [0, 0.09, 0.13], [0, 0, -18])
  const nameOpacity = useTransform(progress, [0.065, 0.12, 0.25, 0.3], [0, 1, 1, 0])
  const nameScale = useTransform(progress, [0.065, 0.14, 0.3], [0.88, 1, 1.04])
  const generationOpacity = useTransform(progress, [0.13, 0.18, 0.27, 0.31], [0, 1, 1, 0])
  const taglineOpacity = useTransform(progress, [0.2, 0.245, 0.29, 0.32], [0, 1, 1, 0])
  const photoOpacity = useTransform(progress, [0.265, 0.33, 0.73, 0.79], [0, 0.72, 0.72, 0])
  const photoScale = useTransform(progress, [0.265, 0.37, 0.73, 0.79], [1.08, 1, 1.025, 0.97])
  const finalOpacity = useTransform(progress, [0.76, 0.83, 1], [0, 1, 1])
  const finalY = useTransform(progress, [0.76, 0.84, 1], [36, 0, 0])
  const progressScale = useTransform(progress, [0, 1], [0, 1])

  useMotionValueEvent(progress, 'change', (latest) => {
    setCtaAvailable(latest >= 0.78)
  })

  if (shouldReduceMotion) {
    return <ReducedIntro />
  }

  return (
    <section
      ref={sectionRef}
      id="intro"
      aria-labelledby="intro-title"
      className="relative h-[650svh] bg-[#090b09] text-white sm:h-[720svh]"
    >
      <div className="sticky top-0 isolate flex h-[100svh] items-center justify-center overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_44%,rgba(183,201,168,0.2),transparent_29%),linear-gradient(180deg,#101410_0%,#080908_72%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-[0.09] [background-image:linear-gradient(rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_72%)]"
        />

        <div className="sr-only">
          <h1 id="intro-title">{sima.name}. {sima.intro.generation}.</h1>
          <p>{sima.intro.tagline}</p>
          <p>{sima.intro.traitSequence.join(' ')}</p>
        </div>

        <motion.p
          aria-hidden="true"
          style={{ opacity: introducingOpacity, y: introducingY }}
          className="absolute inset-x-5 m-0 text-center text-xs font-semibold uppercase tracking-[0.25em] text-matcha-300 sm:text-sm"
        >
          {sima.intro.introducing}
        </motion.p>

        <motion.div
          aria-hidden="true"
          style={{ opacity: nameOpacity, scale: nameScale }}
          className="absolute inset-x-3 flex flex-col items-center text-center sm:inset-x-8"
        >
          <p className="display-xl m-0 text-white">{sima.name.toUpperCase()}</p>
          <motion.p
            style={{ opacity: generationOpacity }}
            className="mt-7 text-sm font-medium tracking-[-0.02em] text-white/[0.58] sm:text-xl"
          >
            {sima.intro.generation}
          </motion.p>
          <motion.p
            style={{ opacity: taglineOpacity }}
            className="mt-2 text-[clamp(1.25rem,3vw,2.5rem)] font-semibold tracking-[-0.035em] text-white"
          >
            {sima.intro.tagline}
          </motion.p>
        </motion.div>

        <motion.div
          aria-hidden="true"
          style={{ opacity: photoOpacity, scale: photoScale }}
          className="absolute inset-y-[10svh] left-1/2 w-[min(76vw,36rem)] -translate-x-1/2 sm:inset-y-[7svh]"
        >
          <PhotoPlaceholder
            label={sima.hero.placeholder}
            image={heroPhoto?.image}
            alt=""
            dark
            objectPosition={heroPhoto?.objectPosition}
            loading="eager"
            fetchPriority="high"
            className="h-full min-h-0 w-full rounded-[1.75rem]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
        </motion.div>

        <div aria-hidden="true" className="absolute inset-0 z-10 flex items-center justify-center">
          {traitMoments.map((trait) => (
            <IntroTrait key={trait.text} progress={progress} {...trait} />
          ))}
        </div>

        <motion.div
          style={{ opacity: finalOpacity, y: finalY }}
          className="absolute inset-x-5 z-30 flex flex-col items-center text-center sm:inset-x-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-matcha-300 sm:text-sm">
            {sima.intro.availabilityLabel} — {birthday}
          </p>
          <p aria-hidden="true" className="mt-4 text-[clamp(3.8rem,13vw,10rem)] font-semibold leading-[0.8] tracking-[-0.07em]">
            {sima.name}.
          </p>
          <div className="mt-9">
            <MeetSimaButton disabled={!ctaAvailable} />
          </div>
        </motion.div>

        <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 z-40 h-px bg-white/10">
          <motion.div style={{ scaleX: progressScale }} className="h-full origin-left bg-matcha-300" />
        </div>
      </div>
    </section>
  )
}

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const heroPhoto = sima.photos.find((photo) => photo.featured)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const photoY = useTransform(scrollYProgress, [0, 1], ['-2.5%', '2.5%'])

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-labelledby="hero-title"
      className="section-pad relative isolate overflow-hidden bg-paper py-24 text-ink sm:py-32 lg:py-40"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-2/3 bg-[radial-gradient(circle_at_50%_5%,rgba(183,201,168,0.36),transparent_50%)]"
      />

      <div className="content-shell">
        <header className="grid items-end gap-8 border-t border-black/10 pt-8 sm:pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <motion.h2
            id="hero-title"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 44 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={revealTransition}
            className="display-lg m-0"
          >
            {sima.name}.
          </motion.h2>
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ ...revealTransition, delay: 0.12 }}
            className="lg:pb-2"
          >
            <p className="text-[clamp(2rem,4vw,4.5rem)] font-semibold leading-[0.96] tracking-[-0.055em]">
              {sima.hero.title}
            </p>
            <p className="mt-4 max-w-xl whitespace-pre-line text-base leading-relaxed text-black/[0.58] sm:text-xl lg:text-2xl">
              {sima.hero.description}
            </p>
          </motion.div>
        </header>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.97, y: 42 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-16 w-[min(88%,62rem)] sm:mt-24 sm:w-[min(78%,62rem)]"
        >
          <motion.div style={shouldReduceMotion ? undefined : { y: photoY }}>
            <PhotoPlaceholder
              label={sima.hero.placeholder}
              image={heroPhoto?.image}
              alt="Портрет Сіми"
              objectPosition={heroPhoto?.objectPosition}
              loading="eager"
              fetchPriority="high"
              className="h-[68svh] min-h-[32rem] max-h-[54rem] w-full rounded-[2rem] sm:min-h-[40rem] sm:rounded-[2.75rem]"
            />
          </motion.div>

          <ul className="sr-only" aria-label="Риси Сіми">
            {sima.traits.map((trait) => (
              <li key={trait}>{trait}</li>
            ))}
          </ul>

          {sima.traits.map((trait, index) => (
            <motion.div
              key={trait}
              aria-hidden="true"
              initial={shouldReduceMotion ? false : { opacity: 0, x: index % 2 === 0 ? -18 : 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.65 }}
              transition={{ ...revealTransition, delay: 0.15 + index * 0.09 }}
              className={`absolute z-20 flex items-center gap-2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.17em] text-ink/75 drop-shadow-[0_1px_8px_rgba(247,246,241,1)] sm:text-xs ${traitPositions[index]}`}
            >
              <span className="h-px w-5 bg-current opacity-35 sm:w-8" />
              {trait}
            </motion.div>
          ))}
        </motion.div>

        <p className="mx-auto mt-14 max-w-xl text-center text-sm leading-relaxed text-black/[0.45] sm:mt-20 sm:text-base">
          {sima.intro.generation} · {sima.intro.tagline}
        </p>
      </div>
    </section>
  )
}

function StatItem({
  stat,
  index,
  reducedMotion,
}: {
  stat: (typeof sima.stats)[number]
  index: number
  reducedMotion: boolean
}) {
  return (
    <motion.li
      initial={reducedMotion ? false : { opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.24 }}
      transition={{ duration: 0.95, delay: index % 2 === 0 ? 0 : 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex min-h-[43svh] flex-col justify-center border-t border-black/10 px-1 py-16 sm:px-7 sm:py-24 ${statLayouts[index]}`}
    >
      <motion.span
        aria-hidden="true"
        initial={reducedMotion ? false : { scale: 0.91 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.28 }}
        transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
        className={`block font-semibold leading-[0.76] tracking-[-0.075em] text-matcha-700 ${statValueSizes[index]}`}
      >
        {stat.value}
      </motion.span>
      <span className="sr-only">{stat.value}. </span>
      <p className="mt-8 max-w-xl text-[clamp(1.5rem,3.2vw,3rem)] font-semibold leading-tight tracking-[-0.04em] sm:mt-10">
        {stat.label}
      </p>
      {stat.note && <p className="mt-3 max-w-md text-sm leading-relaxed text-black/[0.52] sm:text-base">{stat.note}</p>}
    </motion.li>
  )
}

export function StatsSection() {
  const shouldReduceMotion = useReducedMotion() === true

  return (
    <section
      id="stats"
      aria-labelledby="stats-title"
      className="section-pad overflow-hidden bg-[#edf2e8] py-24 text-ink sm:py-32 lg:py-40"
    >
      <div className="content-shell">
        <motion.header
          initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={revealTransition}
          className="mb-20 flex items-end justify-between gap-8 sm:mb-28"
        >
          <h2 id="stats-title" className="display-md max-w-[9ch]">
            Сіма в цифрах.
          </h2>
          <p aria-hidden="true" className="hidden text-sm font-medium text-black/[0.38] sm:block">
            24 / ∞
          </p>
        </motion.header>

        <ol className="grid border-b border-black/10 md:grid-cols-2">
          {sima.stats.map((stat, index) => (
            <StatItem key={`${stat.value}-${stat.label}`} stat={stat} index={index} reducedMotion={shouldReduceMotion} />
          ))}
        </ol>
      </div>
    </section>
  )
}
