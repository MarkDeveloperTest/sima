import { Image as ImageIcon, Maximize2 } from 'lucide-react'

interface PhotoPlaceholderProps {
  label: string
  image?: string
  alt?: string
  className?: string
  dark?: boolean
  onClick?: () => void
  actionLabel?: string
}

export function PhotoPlaceholder({
  label,
  image,
  alt = '',
  className = '',
  dark = false,
  onClick,
  actionLabel = 'Відкрити',
}: PhotoPlaceholderProps) {
  const Component = onClick ? 'button' : 'div'

  return (
    <Component
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={`photo-placeholder group relative isolate overflow-hidden text-left ${dark ? 'photo-placeholder--dark' : ''} ${className}`}
      aria-label={onClick ? `${actionLabel}: ${alt || label}` : undefined}
    >
      {image ? (
        <img src={image} alt={alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <>
          <div className="absolute inset-0 placeholder-light" aria-hidden="true" />
          <div className="absolute left-[14%] top-[9%] h-[78%] w-[52%] rounded-[45%_55%_38%_45%] bg-current opacity-[0.045] blur-2xl" aria-hidden="true" />
          <div className="absolute right-[8%] top-[14%] h-px w-14 bg-current opacity-25" aria-hidden="true" />
          <div className="absolute right-[8%] top-[14%] h-14 w-px bg-current opacity-25" aria-hidden="true" />
          <div className="absolute bottom-[14%] left-[8%] h-px w-14 bg-current opacity-25" aria-hidden="true" />
          <div className="absolute bottom-[14%] left-[8%] h-14 w-px bg-current opacity-25" aria-hidden="true" />
        </>
      )}

      <span className="relative z-10 flex h-full min-h-[inherit] flex-col items-center justify-center gap-3 p-6 text-center">
        {!image && <ImageIcon aria-hidden="true" className="h-5 w-5 opacity-35" strokeWidth={1.25} />}
        <span className="font-mono text-[10px] font-medium tracking-[0.16em] opacity-65 sm:text-xs">{label}</span>
      </span>

      {onClick && (
        <span className="absolute bottom-4 right-4 z-20 flex items-center gap-2 text-[11px] font-medium opacity-60 transition-opacity group-hover:opacity-100">
          {actionLabel}
          <Maximize2 aria-hidden="true" className="h-3.5 w-3.5" />
        </span>
      )}
    </Component>
  )
}
