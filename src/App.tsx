import { motion, useScroll } from 'framer-motion'
import { useLayoutEffect, useState } from 'react'
import { EasterEggOverlay } from './components/EasterEggOverlay'
import { GallerySection, SpecificationsSection, AudiSection, LandscapingSection } from './components/editorial/EditorialChapter'
import { FinaleSection } from './components/finale/FinaleSection'
import { Level24Section } from './components/finale/Level24Section'
import { MusicPlayer } from './components/MusicPlayer'
import { HeroSection, IntroSection, StatsSection } from './components/opening/OpeningChapter'
import { FaithSection, ImpactSection, LeadershipSection, MentorSection } from './components/story/StoryChapter'
import { sima, type InsideJoke } from './data/sima'

type SecretTrigger = InsideJoke['trigger']
const dedicatedPhotoIds = new Set(['featured', 'terrace-portrait', 'church', 'audi'])
const galleryPhotos = sima.photos.filter((photo) => !dedicatedPhotoIds.has(photo.id))

function App() {
  const { scrollYProgress: progress } = useScroll()
  const [activeJoke, setActiveJoke] = useState<InsideJoke | null>(null)

  useLayoutEffect(() => {
    const scrollToHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1))
      if (!id) return

      document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' })
    }

    scrollToHash()
    window.addEventListener('hashchange', scrollToHash)
    return () => window.removeEventListener('hashchange', scrollToHash)
  }, [])

  const revealSecret = (trigger: SecretTrigger) => {
    const joke = sima.insideJokes.find((item) => item.trigger === trigger && item.hidden)
    if (joke) setActiveJoke(joke)
  }

  return (
    <>
      <a
        href="#hero"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink shadow-xl transition-transform focus:translate-y-0"
      >
        Перейти до основного вмісту
      </a>

      <div className="fixed inset-x-0 top-0 z-[80] h-[2px] bg-black/10" aria-hidden="true">
        <motion.div className="h-full origin-left bg-matcha-400" style={{ scaleX: progress }} />
      </div>

      <main>
        <IntroSection />
        <HeroSection />
        <StatsSection />
        <GallerySection photos={galleryPhotos} onSecret={revealSecret} />
        <SpecificationsSection />
        <AudiSection onSecret={revealSecret} />
        <LandscapingSection />
        <LeadershipSection />
        <MentorSection />
        <ImpactSection />
        <FaithSection />
        <Level24Section onSecret={revealSecret} />
        <FinaleSection />
      </main>

      <MusicPlayer songs={sima.songs} />
      <EasterEggOverlay joke={activeJoke} onClose={() => setActiveJoke(null)} />
    </>
  )
}

export default App
