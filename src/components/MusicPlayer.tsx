import { ChevronDown, ListMusic, Pause, Play, SkipForward, Volume2 } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Song } from '../data/sima'

interface MusicPlayerProps {
  songs: Song[]
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) return '0:00'
  const minutes = Math.floor(seconds / 60)
  return `${minutes}:${Math.floor(seconds % 60).toString().padStart(2, '0')}`
}

export function MusicPlayer({ songs }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [expanded, setExpanded] = useState(false)
  const [trackIndex, setTrackIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const shortViewport = typeof window !== 'undefined' && window.innerHeight <= 450

  const playableSongs = useMemo(() => songs.filter((song) => song.src.trim()), [songs])
  const displayTrack = playableSongs[trackIndex] ?? songs[0]
  const hasAudio = playableSongs.length > 0

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = volume
  }, [volume])

  useEffect(() => {
    if (!expanded) return
    const collapseOnScroll = () => setExpanded(false)
    window.addEventListener('scroll', collapseOnScroll, { passive: true, once: true })
    return () => window.removeEventListener('scroll', collapseOnScroll)
  }, [expanded])

  const togglePlayback = async () => {
    const audio = audioRef.current
    if (!audio || !hasAudio) return
    if (audio.paused) {
      await audio.play()
      setPlaying(true)
    } else {
      audio.pause()
      setPlaying(false)
    }
  }

  const nextTrack = () => {
    if (!playableSongs.length) return
    audioRef.current?.pause()
    setPlaying(false)
    setCurrentTime(0)
    setTrackIndex((index) => (index + 1) % playableSongs.length)
  }

  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-50 sm:bottom-6 sm:right-6">
      {hasAudio && (
        <audio
          ref={audioRef}
          src={playableSongs[trackIndex]?.src}
          onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
          onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
          onEnded={nextTrack}
          preload="metadata"
        />
      )}

      <AnimatePresence mode="wait">
        {expanded && !shortViewport ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            className="max-h-[calc(100svh-2rem)] w-[min(22rem,calc(100vw-2rem))] overflow-y-auto rounded-[1.5rem] border border-white/30 bg-[#171918]/95 p-4 text-white shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-matcha-300">Фоновий трек</p>
                <p className="mt-1 truncate text-sm font-semibold">{displayTrack?.title ?? 'Локальна музика'}</p>
                <p className="truncate text-xs text-white/50">{hasAudio ? displayTrack.artist : 'Трек недоступний'}</p>
              </div>
              <button type="button" onClick={() => setExpanded(false)} aria-label="Згорнути плеєр" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10">
                <ChevronDown className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <button type="button" onClick={togglePlayback} disabled={!hasAudio} aria-label={playing ? 'Пауза' : 'Відтворити'} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-black disabled:cursor-not-allowed disabled:opacity-45">
                {playing ? <Pause className="h-5 w-5 fill-current" aria-hidden="true" /> : <Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden="true" />}
              </button>
              <button type="button" onClick={nextTrack} disabled={playableSongs.length < 2} aria-label="Наступний трек" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full hover:bg-white/10 disabled:opacity-35">
                <SkipForward className="h-5 w-5 fill-current" aria-hidden="true" />
              </button>
              <div className="ml-auto flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-white/50" aria-hidden="true" />
                <label className="sr-only" htmlFor="music-volume">Гучність</label>
                <input id="music-volume" type="range" min="0" max="1" step="0.05" value={volume} onChange={(event) => setVolume(Number(event.target.value))} className="h-1 w-20 accent-matcha-300" />
              </div>
            </div>

            <div className="mt-5">
              <label className="sr-only" htmlFor="music-progress">Позиція треку</label>
              <input
                id="music-progress"
                type="range"
                min="0"
                max={duration || 0}
                step="0.1"
                value={Math.min(currentTime, duration || 0)}
                disabled={!hasAudio}
                onChange={(event) => {
                  const next = Number(event.target.value)
                  setCurrentTime(next)
                  if (audioRef.current) audioRef.current.currentTime = next
                }}
                className="h-1 w-full accent-matcha-300 disabled:opacity-30"
              />
              <div className="mt-1 flex justify-between text-[10px] tabular-nums text-white/40"><span>{formatTime(currentTime)}</span><span>{formatTime(duration)}</span></div>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="collapsed"
            type="button"
            onClick={() => setExpanded(true)}
            initial={{ opacity: 0, y: 12, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.94 }}
            aria-label="Відкрити музичний плеєр"
            className="flex min-h-14 items-center gap-3 rounded-full border border-white/25 bg-[#171918]/92 py-2 pl-3 pr-5 text-left text-white shadow-2xl backdrop-blur-xl"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-matcha-300 text-ink">
              {playing ? <Pause className="h-4 w-4 fill-current" aria-hidden="true" /> : <ListMusic className="h-4 w-4" aria-hidden="true" />}
            </span>
            <span>
              <span className="block max-w-36 truncate text-xs font-semibold">{displayTrack?.title ?? 'Музика'}</span>
              <span className="block text-[10px] text-white/50">{playing ? 'Відтворюється' : 'Готово до відтворення'}</span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
