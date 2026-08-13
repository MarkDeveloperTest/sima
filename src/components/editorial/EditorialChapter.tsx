import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Expand,
  Image as ImageIcon,
  Leaf,
  MoveHorizontal,
  X,
} from 'lucide-react'
import {
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'
import { sima, type SimaConfig, type SimaPhoto } from '../../data/sima'
import { useScrollLock } from '../../hooks/useScrollLock'
import { Reveal } from '../shared/Reveal'

type SecretTrigger = 'photo' | 'audi'

interface SecretProps {
  onSecret?: (trigger: SecretTrigger) => void
}

export interface GallerySectionProps extends SecretProps {
  photos?: readonly SimaPhoto[]
}

export interface SpecificationsSectionProps {
  specifications?: SimaConfig['specifications']
  footnote?: string
}

type AudiConfig = SimaConfig['audi'] & {
  image?: string
  alt?: string
  objectPosition?: string
}

export interface AudiSectionProps extends SecretProps {
  audi?: AudiConfig
}

export interface LandscapingSectionProps {
  landscaping?: SimaConfig['landscaping']
}

interface PlaceholderArtworkProps {
  label: string
  dark?: boolean
  variant?: 'default' | 'before' | 'after'
  className?: string
}

const galleryLayouts = [
  'w-full',
  'mr-auto w-[92%] md:mt-28 md:w-[55%]',
  'ml-auto w-[86%] md:-mt-[24vw] md:w-[40%]',
  'mx-auto w-full md:mt-28 md:w-[76%]',
  'ml-auto w-[88%] md:mr-[7%] md:w-[38%]',
  'mr-auto w-[94%] md:-mt-[13vw] md:w-[47%]',
]

const galleryRatios = [
  'aspect-[16/11] md:aspect-[16/9]',
  'aspect-[4/5]',
  'aspect-[4/5]',
  'aspect-[16/11]',
  'aspect-[3/4]',
  'aspect-[5/4]',
]

function PlaceholderArtwork({
  label,
  dark = false,
  variant = 'default',
  className = '',
}: PlaceholderArtworkProps) {
  const backgrounds: Record<NonNullable<PlaceholderArtworkProps['variant']>, CSSProperties['background']> = {
    default: dark
      ? 'radial-gradient(circle at 70% 44%, rgba(183,201,168,.17), transparent 29%), linear-gradient(135deg, #080a09 0%, #181c19 56%, #090a09 100%)'
      : 'radial-gradient(circle at 68% 30%, rgba(183,201,168,.55), transparent 31%), linear-gradient(138deg, #eef2e9 0%, #ffffff 52%, #d7ddcf 100%)',
    before:
      'radial-gradient(circle at 26% 72%, rgba(77,91,61,.32), transparent 30%), linear-gradient(145deg, #c8c8b6 0%, #9ca28f 48%, #716f62 100%)',
    after:
      'radial-gradient(circle at 70% 25%, rgba(244,248,224,.48), transparent 24%), linear-gradient(145deg, #c9d9a7 0%, #78915c 49%, #36523a 100%)',
  }

  return (
    <div
      className={`absolute inset-0 isolate overflow-hidden ${dark ? 'text-white' : 'text-ink'} ${className}`}
      style={{ background: backgrounds[variant] }}
      aria-hidden="true"
    >
      <div className="absolute -left-[9%] top-[9%] h-[82%] w-[58%] rounded-[48%_52%_38%_62%] bg-current opacity-[0.035] blur-3xl" />
      <div className="absolute inset-x-[8%] top-[12%] h-px bg-current opacity-15" />
      <div className="absolute inset-x-[8%] bottom-[12%] h-px bg-current opacity-15" />
      <div className="absolute inset-y-[12%] left-[8%] w-px bg-current opacity-15" />
      <div className="absolute inset-y-[12%] right-[8%] w-px bg-current opacity-15" />
      <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
        <ImageIcon className="h-5 w-5 opacity-35" strokeWidth={1.25} />
        <span className="font-mono text-[10px] font-medium tracking-[0.16em] opacity-65 sm:text-xs">
          {label}
        </span>
      </span>
    </div>
  )
}

function useSecretActivation(onActivate?: () => void, holdDuration = 900, requiredClicks = 5) {
  const holdTimer = useRef<number | null>(null)
  const clickCount = useRef(0)
  const lastClickAt = useRef(0)
  const suppressNextClick = useRef(false)

  const clearHold = useCallback(() => {
    if (holdTimer.current !== null) {
      window.clearTimeout(holdTimer.current)
      holdTimer.current = null
    }
  }, [])

  useEffect(() => clearHold, [clearHold])

  const onPointerDown = () => {
    if (!onActivate) return
    clearHold()
    holdTimer.current = window.setTimeout(() => {
      suppressNextClick.current = true
      clickCount.current = 0
      onActivate()
    }, holdDuration)
  }

  const onPointerEnd = () => clearHold()

  const registerClick = () => {
    if (!onActivate) return false
    if (suppressNextClick.current) {
      suppressNextClick.current = false
      return true
    }

    const now = Date.now()
    clickCount.current = now - lastClickAt.current < 1_100 ? clickCount.current + 1 : 1
    lastClickAt.current = now

    if (clickCount.current >= requiredClicks) {
      clickCount.current = 0
      onActivate()
      return true
    }

    return false
  }

  return { onPointerDown, onPointerEnd, registerClick }
}

interface GalleryCardProps {
  photo: SimaPhoto
  index: number
  onOpen: (button: HTMLButtonElement) => void
  onSecret?: () => void
}

function GalleryCard({ photo, index, onOpen, onSecret }: GalleryCardProps) {
  const reducedMotion = useReducedMotion()
  const secret = useSecretActivation(onSecret)
  const layoutIndex = index % galleryLayouts.length
  const isFeatured = photo.featured || index === 0
  const funnyTilt = photo.category === 'Сумнівне' ? (index % 2 === 0 ? 'md:-rotate-1' : 'md:rotate-1') : ''

  return (
    <motion.li
      className={`${isFeatured ? 'w-full' : galleryLayouts[layoutIndex]} ${funnyTilt} relative`}
      initial={{ opacity: 0, y: reducedMotion ? 0 : 54 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        type="button"
        className={`group relative block w-full overflow-hidden rounded-[1.15rem] bg-white text-left shadow-[0_22px_70px_rgba(24,27,24,0.11)] sm:rounded-[1.5rem] ${
          isFeatured ? 'aspect-[16/11] md:aspect-[16/9]' : galleryRatios[layoutIndex]
        }`}
        aria-label={`Відкрити фото: ${photo.alt || photo.caption}`}
        aria-haspopup="dialog"
        onPointerDown={secret.onPointerDown}
        onPointerUp={secret.onPointerEnd}
        onPointerCancel={secret.onPointerEnd}
        onPointerLeave={secret.onPointerEnd}
        onClick={(event) => {
          if (!secret.registerClick()) onOpen(event.currentTarget)
        }}
      >
        {photo.image ? (
          <img
            src={photo.image}
            alt=""
            loading={isFeatured ? 'eager' : 'lazy'}
            fetchPriority={isFeatured ? 'high' : 'auto'}
            decoding="async"
            style={{ objectPosition: photo.objectPosition }}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
          />
        ) : (
          <PlaceholderArtwork label={photo.placeholder} />
        )}

        <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-ink opacity-0 shadow-sm backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <Expand aria-hidden="true" className="h-4 w-4" strokeWidth={1.6} />
        </span>
      </button>

      <div className={`mt-4 flex items-start justify-between gap-5 ${isFeatured ? 'md:px-1' : ''}`}>
        <div>
          <p className="text-base font-semibold tracking-[-0.02em] text-ink sm:text-lg">{photo.caption}</p>
          {photo.funnyCaption && (
            <p className="mt-1 text-sm tracking-[-0.01em] text-ink/55">{photo.funnyCaption}</p>
          )}
        </div>
        <div className="shrink-0 text-right font-mono text-[9px] uppercase tracking-[0.16em] text-ink/45 sm:text-[10px]">
          <span className="block">{photo.category}</span>
          <span className="mt-1 block">{photo.date}</span>
        </div>
      </div>
    </motion.li>
  )
}

interface GalleryViewerProps {
  photos: readonly SimaPhoto[]
  selectedIndex: number | null
  onIndexChange: (index: number) => void
  onClose: () => void
  returnFocusRef: React.MutableRefObject<HTMLButtonElement | null>
  onSecret?: () => void
}

function GalleryViewer({
  photos,
  selectedIndex,
  onIndexChange,
  onClose,
  returnFocusRef,
  onSecret,
}: GalleryViewerProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()
  const reducedMotion = useReducedMotion()
  const secret = useSecretActivation(onSecret, 850, 5)
  const isOpen = selectedIndex !== null && photos[selectedIndex] !== undefined
  const selectedPhoto = isOpen ? photos[selectedIndex] : null
  useScrollLock(isOpen)

  useEffect(() => {
    if (!isOpen) return

    const returnFocus = returnFocusRef.current
    window.requestAnimationFrame(() => closeRef.current?.focus())

    return () => {
      returnFocus?.focus()
    }
  }, [isOpen, returnFocusRef])

  useEffect(() => {
    if (!isOpen || selectedIndex === null) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        onIndexChange((selectedIndex - 1 + photos.length) % photos.length)
        return
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        onIndexChange((selectedIndex + 1) % photos.length)
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
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onClose, onIndexChange, photos.length, selectedIndex])

  return (
    <AnimatePresence>
      {selectedPhoto && selectedIndex !== null && (
        <motion.div
          ref={dialogRef}
          className="fixed inset-0 z-[100] flex flex-col bg-[#080a09]/95 text-white backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.28 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose()
          }}
        >
          <div className="flex shrink-0 items-center justify-between px-4 py-4 sm:px-7">
            <p className="font-mono text-[10px] tracking-[0.18em] text-white/55">
              {String(selectedIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
            </p>
            <button
              ref={closeRef}
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              onClick={onClose}
              aria-label="Закрити перегляд фото"
            >
              <X aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-2 sm:px-20">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={selectedPhoto.id}
                className="relative h-full w-full overflow-hidden rounded-xl"
                initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: reducedMotion ? 1 : 1.01 }}
                transition={{ duration: reducedMotion ? 0 : 0.32 }}
              >
                {selectedPhoto.image ? (
                  <img
                    src={selectedPhoto.image}
                    alt={selectedPhoto.alt}
                    decoding="async"
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <PlaceholderArtwork label={selectedPhoto.placeholder} dark />
                )}
              </motion.div>
            </AnimatePresence>

            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:left-6"
                  onClick={() => onIndexChange((selectedIndex - 1 + photos.length) % photos.length)}
                  aria-label="Попереднє фото"
                >
                  <ChevronLeft aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:right-6"
                  onClick={() => onIndexChange((selectedIndex + 1) % photos.length)}
                  aria-label="Наступне фото"
                >
                  <ChevronRight aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
                </button>
              </>
            )}
          </div>

          <div className="shrink-0 px-5 py-5 text-center sm:px-8 sm:py-6">
            <button
              type="button"
              id={titleId}
              className="text-lg font-semibold tracking-[-0.025em] text-white sm:text-xl"
              aria-label={`Підпис: ${selectedPhoto.caption}`}
              onPointerDown={secret.onPointerDown}
              onPointerUp={secret.onPointerEnd}
              onPointerCancel={secret.onPointerEnd}
              onPointerLeave={secret.onPointerEnd}
              onClick={secret.registerClick}
            >
              {selectedPhoto.caption}
            </button>
            {selectedPhoto.funnyCaption && (
              <p className="mt-1 text-sm text-white/55">{selectedPhoto.funnyCaption}</p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function GallerySection({ photos = sima.photos, onSecret }: GallerySectionProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const returnFocusRef = useRef<HTMLButtonElement | null>(null)
  const closeViewer = useCallback(() => setSelectedIndex(null), [])
  const orderedPhotos = useMemo(
    () => [...photos].sort((left, right) => Number(right.featured) - Number(left.featured)),
    [photos],
  )

  return (
    <section id="gallery" className="section-pad overflow-hidden bg-paper py-24 sm:py-32 lg:py-44">
      <div className="content-shell">
        <Reveal className="mb-16 max-w-4xl sm:mb-24 lg:mb-32">
          <h2 className="display-lg text-ink">Сіма.<br />У кадрі.</h2>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-ink/55 sm:ml-auto sm:mt-10 sm:text-lg">
            Серйозні моменти. Сумнівні рішення. Жодного зайвого контексту.
          </p>
        </Reveal>

        {orderedPhotos.length > 0 ? (
          <ol className="relative flex flex-col gap-16 sm:gap-24 md:block">
            {orderedPhotos.map((photo, index) => (
              <GalleryCard
                key={photo.id}
                photo={photo}
                index={index}
                onOpen={(button) => {
                  returnFocusRef.current = button
                  setSelectedIndex(index)
                }}
                onSecret={onSecret ? () => onSecret('photo') : undefined}
              />
            ))}
          </ol>
        ) : (
          <p className="border-y border-ink/15 py-12 text-lg text-ink/55">Фотографії скоро з’являться.</p>
        )}
      </div>

      <GalleryViewer
        photos={orderedPhotos}
        selectedIndex={selectedIndex}
        onIndexChange={setSelectedIndex}
        onClose={closeViewer}
        returnFocusRef={returnFocusRef}
        onSecret={onSecret ? () => onSecret('photo') : undefined}
      />
    </section>
  )
}

export function SpecificationsSection({
  specifications = sima.specifications,
  footnote = sima.specificationsFootnote,
}: SpecificationsSectionProps) {
  return (
    <section id="specifications" className="section-pad bg-white py-24 sm:py-32 lg:py-44">
      <div className="content-shell lg:grid lg:grid-cols-[minmax(0,0.8fr)_minmax(28rem,1.2fr)] lg:gap-20 xl:gap-32">
        <Reveal className="mb-16 lg:mb-0">
          <div className="lg:sticky lg:top-28">
            <h2 className="display-md max-w-3xl text-ink">Сіма.<br />Характеристики.</h2>
            <p className="mt-7 max-w-sm text-base leading-relaxed text-ink/50 sm:text-lg">
              24-те покоління. Перевірене друзями. Оновлення тривають.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <dl className="border-b border-ink/15">
            {specifications.map((specification, index) => (
              <motion.div
                key={`${specification[0]}-${index}`}
                className="grid grid-cols-1 gap-2 border-t border-ink/15 py-6 sm:grid-cols-[minmax(9rem,0.72fr)_minmax(0,1.28fr)] sm:gap-8 sm:py-8"
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.55, delay: Math.min(index * 0.025, 0.2) }}
              >
                <dt className="text-sm font-medium text-ink/48">{specification[0]}</dt>
                <dd className="m-0 text-xl font-semibold tracking-[-0.035em] text-ink sm:text-2xl">
                  {specification[1]}
                </dd>
              </motion.div>
            ))}
          </dl>
          <p className="mt-6 max-w-xl text-xs leading-relaxed text-ink/45">* {footnote}</p>
        </Reveal>
      </div>
    </section>
  )
}

interface AudiTitleProps {
  children: ReactNode
  onSecret?: () => void
}

function AudiTitle({ children, onSecret }: AudiTitleProps) {
  const secret = useSecretActivation(onSecret, 850, 5)

  return (
    <button
      type="button"
      className="block w-full cursor-default text-left text-inherit"
      aria-label="Audi A3"
      onPointerDown={secret.onPointerDown}
      onPointerUp={secret.onPointerEnd}
      onPointerCancel={secret.onPointerEnd}
      onPointerLeave={secret.onPointerEnd}
      onClick={secret.registerClick}
    >
      {children}
    </button>
  )
}

export function AudiSection({ audi = sima.audi, onSecret }: AudiSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const mediaY = useTransform(scrollYProgress, [0, 1], ['-5%', '7%'])
  const sheenX = useTransform(scrollYProgress, [0.05, 0.85], ['-35%', '65%'])

  return (
    <section
      ref={sectionRef}
      id="audi"
      className="section-pad relative isolate overflow-hidden bg-[#080a09] py-24 text-white sm:py-32 lg:py-44"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-80"
        style={{ background: 'radial-gradient(circle at 72% 22%, rgba(183,201,168,.13), transparent 31%)' }}
        aria-hidden="true"
      />

      <div className="content-shell">
        <Reveal>
          <h2 className="display-lg">
            <AudiTitle onSecret={onSecret ? () => onSecret('audi') : undefined}>{audi.title}</AudiTitle>
          </h2>
        </Reveal>
        <div className="mt-7 sm:mt-10">
          <Reveal delay={0.12}>
            <p className="body-large text-white/45">{audi.designed}</p>
          </Reveal>
          <Reveal delay={0.42}>
            <p className="body-large mt-1 text-white">{audi.operated}</p>
          </Reveal>
        </div>

        <motion.div
          className="relative mt-16 aspect-[4/5] overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#111412] shadow-[0_35px_130px_rgba(0,0,0,.7)] sm:mt-24 sm:aspect-[16/9] sm:rounded-[1.75rem]"
          style={{ y: reducedMotion ? 0 : mediaY }}
        >
          {audi.image ? (
            <img
              src={audi.image}
              alt={audi.alt || 'Audi A3 Сіми'}
              loading="lazy"
              decoding="async"
              style={{ objectPosition: audi.objectPosition }}
              className="h-full w-full object-cover"
            />
          ) : (
            <PlaceholderArtwork label={audi.placeholder} dark />
          )}
          <motion.div
            className="pointer-events-none absolute -inset-y-1/3 left-0 w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent blur-2xl"
            style={{ x: reducedMotion ? '12%' : sheenX }}
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" aria-hidden="true" />
        </motion.div>

        <Reveal className="mt-20 sm:mt-28" delay={0.08}>
          <dl className="flex snap-x snap-mandatory overflow-x-auto border-y border-white/15 [scrollbar-width:none] md:grid md:grid-cols-4 md:overflow-visible [&::-webkit-scrollbar]:hidden">
            {audi.facts.map((fact, index) => (
              <div
                key={`${fact[0]}-${index}`}
                className="min-w-[76vw] snap-start py-7 pr-10 sm:min-w-[21rem] md:min-w-0 md:border-r md:border-white/15 md:px-7 md:py-9 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
              >
                <dt className="text-xs font-medium text-white/42">{fact[0]}</dt>
                <dd className="m-0 mt-3 max-w-xs text-lg font-semibold leading-snug tracking-[-0.03em] text-white sm:text-xl">
                  {fact[1]}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-right font-mono text-[9px] uppercase tracking-[0.18em] text-white/30 md:hidden">
            Проведіть убік
          </p>
        </Reveal>
      </div>
    </section>
  )
}

interface LandscapeImageProps {
  image: string
  placeholder: string
  label: string
  variant: 'before' | 'after'
}

function LandscapeImage({ image, placeholder, variant }: LandscapeImageProps) {
  if (image) {
    return (
      <img
        src={image}
        alt=""
        loading="lazy"
        decoding="async"
        draggable="false"
        className="absolute inset-0 h-full w-full select-none object-cover"
      />
    )
  }

  return <PlaceholderArtwork label={placeholder} variant={variant} />
}

export function LandscapingSection({ landscaping = sima.landscaping }: LandscapingSectionProps) {
  const [position, setPosition] = useState(52)
  const [isFocused, setIsFocused] = useState(false)

  const onRangeKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Home') setPosition(0)
    if (event.key === 'End') setPosition(100)
  }

  return (
    <section id="landscaping" className="section-pad relative isolate overflow-hidden bg-matcha-100 py-24 sm:py-32 lg:py-44">
      <Leaf
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 top-20 -z-10 h-52 w-52 rotate-[-24deg] text-matcha-600/[0.08] sm:h-80 sm:w-80"
        strokeWidth={0.55}
      />
      <Leaf
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-16 -z-10 h-60 w-60 rotate-[32deg] text-matcha-600/[0.07] sm:h-96 sm:w-96"
        strokeWidth={0.55}
      />

      <div className="content-shell">
        <Reveal>
          <h2 className="display-md max-w-5xl text-ink">{landscaping.title}</h2>
          <p className="mt-5 text-2xl font-semibold tracking-[-0.035em] text-matcha-700 sm:mt-7 sm:text-4xl">
            {landscaping.punchline}
          </p>
        </Reveal>

        <Reveal className="mt-16 sm:mt-24" delay={0.08}>
          <div className="mb-5 flex items-end justify-between gap-5 sm:mb-7">
            <h3 className="text-lg font-semibold tracking-[-0.025em] text-ink sm:text-2xl">{landscaping.brand}</h3>
            <output
              htmlFor="landscape-comparison"
              className="shrink-0 font-mono text-[9px] uppercase tracking-[0.15em] text-ink/45 sm:text-[10px]"
            >
              {position}% / {100 - position}%
            </output>
          </div>

          <figure aria-label="Ландшафт до і після роботи Сіми">
            <div
              className={`relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-matcha-800 shadow-[0_28px_90px_rgba(47,65,40,.22)] transition-shadow sm:aspect-[16/9] sm:rounded-[1.75rem] ${
                isFocused ? 'ring-2 ring-matcha-700 ring-offset-4 ring-offset-matcha-100' : ''
              }`}
            >
              <div className="absolute inset-0">
                <LandscapeImage {...landscaping.after} variant="after" />
              </div>

              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
              >
                <LandscapeImage {...landscaping.before} variant="before" />
              </div>

              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-between p-4 sm:p-6">
                <span className="rounded-full bg-[#101410]/72 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md sm:text-xs">
                  {landscaping.before.label}
                </span>
                <span className="rounded-full bg-white/82 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink backdrop-blur-md sm:text-xs">
                  {landscaping.after.label}
                </span>
              </div>

              <div
                className="pointer-events-none absolute inset-y-0 z-20 w-px bg-white shadow-[0_0_16px_rgba(0,0,0,.42)]"
                style={{ left: `${position}%` }}
                aria-hidden="true"
              >
                <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/65 bg-[#101410]/76 text-white shadow-lg backdrop-blur-md sm:h-14 sm:w-14">
                  <MoveHorizontal className="h-5 w-5" strokeWidth={1.5} />
                </span>
              </div>

              <label htmlFor="landscape-comparison" className="sr-only">
                Порівняйте ландшафт до і після роботи Сіми
              </label>
              <input
                id="landscape-comparison"
                type="range"
                min="0"
                max="100"
                value={position}
                onChange={(event) => setPosition(Number(event.target.value))}
                onKeyDown={onRangeKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="absolute inset-0 z-30 h-full w-full touch-pan-y cursor-col-resize opacity-0"
                aria-valuetext={`Видно: до Сіми ${position}%, після Сіми ${100 - position}%`}
              />
            </div>

            <figcaption className="mt-5 text-center text-xs text-ink/50 sm:text-sm">
              Перетягніть межу, щоб порівняти
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
