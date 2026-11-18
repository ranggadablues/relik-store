import { useState } from 'react'
import type { NavFn } from '@/types/page'

const EVENTS = [
  {
    id: 1,
    title: 'RELIK POP-UP JAKARTA',
    date: '14 Sep 2024',
    day: '14',
    month: 'SEP',
    time: '12.00 — 20.00 WIB',
    location: 'Senayan City, Level 2',
    city: 'JAKARTA',
    type: 'POP-UP STORE',
    desc: 'Temukan koleksi eksklusif yang tidak tersedia secara online. Sesi meet & greet dengan tim RELIK, live DJ set, dan limited drop khusus hari H.',
    img: 'https://images.unsplash.com/photo-1777232260032-4a4ea6600c7b?w=800&h=500&fit=crop&auto=format',
    featured: true,
    status: 'UPCOMING',
  },
  {
    id: 2,
    title: 'KOLEKTIF ZINE FAIR',
    date: '22 Sep 2024',
    day: '22',
    month: 'SEP',
    time: '10.00 — 18.00 WIB',
    location: 'Gedung Kesenian Jakarta',
    city: 'JAKARTA',
    type: 'PAMERAN',
    desc: 'Pameran zine dan budaya visual jalanan. RELIK hadir dengan arsip visual eksklusif dari koleksi 1994—2004.',
    img: 'https://images.unsplash.com/photo-1634133118270-d5ed05c18e59?w=800&h=500&fit=crop&auto=format',
    featured: false,
    status: 'UPCOMING',
  },
  {
    id: 3,
    title: 'RELIK BANDUNG INVASION',
    date: '5 Okt 2024',
    day: '05',
    month: 'OKT',
    time: '13.00 — 21.00 WIB',
    location: 'Jl. Dago No. 7, Bandung',
    city: 'BANDUNG',
    type: 'POP-UP STORE',
    desc: 'Ekspansi ke kota kembang. Edisi Bandung dengan koleksi khusus bertema musik indie lokal 90an.',
    img: 'https://images.unsplash.com/photo-1680362667647-c2a8c6994742?w=800&h=500&fit=crop&auto=format',
    featured: false,
    status: 'UPCOMING',
  },
  {
    id: 4,
    title: 'TAPE REWIND — JOGJA',
    date: '19 Okt 2024',
    day: '19',
    month: 'OKT',
    time: '15.00 — 22.00 WIB',
    location: 'Pasar Seni Gabusan',
    city: 'YOGYAKARTA',
    type: 'FESTIVAL',
    desc: 'Festival streetwear & musik independen. Kolaborasi dengan 12 brand lokal, live performance, dan screening film dokumenter jalanan.',
    img: 'https://images.unsplash.com/photo-1764423262445-2e96f63ddf9c?w=800&h=500&fit=crop&auto=format',
    featured: false,
    status: 'UPCOMING',
  },
  {
    id: 5,
    title: 'PASAR LOAK RELIK',
    date: '3 Agu 2024',
    day: '03',
    month: 'AGU',
    time: '09.00 — 15.00 WIB',
    location: 'Blok M Square, Jakarta',
    city: 'JAKARTA',
    type: 'FLEA MARKET',
    desc: 'Pasar thrift eksklusif dengan kurasi vintage RELIK. Archive sale dengan diskon hingga 60%.',
    img: 'https://images.unsplash.com/photo-1634133118060-99de9d0dc039?w=800&h=500&fit=crop&auto=format',
    featured: false,
    status: 'SELESAI',
  },
]

const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  'POP-UP STORE': { bg: 'var(--primary)', text: 'var(--primary-foreground)' },
  'PAMERAN': { bg: 'var(--secondary)', text: 'var(--secondary-foreground)' },
  'FESTIVAL': { bg: 'var(--accent)', text: 'var(--accent-foreground)' },
  'FLEA MARKET': { bg: 'var(--muted)', text: 'var(--muted-foreground)' },
}

export default function EventPage({ navigate: _navigate }: { navigate: NavFn }) {
  const [filter, setFilter] = useState<'ALL' | 'UPCOMING' | 'SELESAI'>('ALL')
  const [selected, setSelected] = useState<number | null>(null)

  const featured = EVENTS[0]
  const filtered = EVENTS.slice(1).filter(e => filter === 'ALL' || e.status === filter)

  const selectedEvent = selected !== null ? EVENTS.find(e => e.id === selected) : null

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)', paddingTop: '62px' }}>
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-8 border-b border-[var(--border)]">
        <p className="font-mono text-xs uppercase mb-3" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.2em' }}>// Jadwal & Event</p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h1 className="font-display" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: '0.9', color: 'var(--foreground)' }}>
            KALENDER<br/>RELIK
          </h1>
          <p className="font-body text-sm max-w-xs" style={{ color: 'var(--muted-foreground)', lineHeight: '1.6' }}>
            Temui kami langsung. Pop-up, pameran, festival — jalanan selalu jadi rumah.
          </p>
        </div>
      </div>

      {/* Featured event */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <p className="font-mono text-xs uppercase mb-4" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.2em' }}>// EVENT UTAMA</p>
        <div
          className="relative overflow-hidden cursor-pointer group"
          style={{ background: 'var(--card)' }}
          onClick={() => setSelected(featured.id)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative h-64 md:h-auto overflow-hidden" style={{ background: 'var(--muted)', minHeight: '280px' }}>
              <img
                src={featured.img}
                alt={featured.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ filter: 'sepia(20%) saturate(80%)' }}
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent, rgba(232,220,202,0.2))' }} />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <TypeBadge type={featured.type} />
                  <StatusBadge status={featured.status} />
                </div>
                <h2 className="font-display mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', lineHeight: '0.95', color: 'var(--foreground)' }}>
                  {featured.title}
                </h2>
                <p className="font-body text-sm leading-relaxed mb-6" style={{ color: 'var(--muted-foreground)' }}>
                  {featured.desc}
                </p>
              </div>
              <div className="space-y-2">
                <EventMeta icon="📅" text={`${featured.date} · ${featured.time}`} />
                <EventMeta icon="📍" text={featured.location} />
                <button className="mt-4 font-condensed font-700 uppercase text-sm px-6 py-2.5 transition-opacity hover:opacity-80 inline-block" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', letterSpacing: '0.12em' }}>
                  Daftar Hadir
                </button>
              </div>
            </div>
          </div>
          {/* Date badge */}
          <div className="absolute top-4 right-4 text-center px-3 py-2" style={{ background: 'var(--foreground)' }}>
            <p className="font-display text-3xl leading-none" style={{ color: 'var(--background)' }}>{featured.day}</p>
            <p className="font-mono text-xs" style={{ color: 'var(--muted)', letterSpacing: '0.1em' }}>{featured.month}</p>
          </div>
        </div>
      </div>

      {/* Other events */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex items-center justify-between mb-6">
          <p className="font-mono text-xs uppercase" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.2em' }}>// Semua Event</p>
          <div className="flex gap-1">
            {(['ALL', 'UPCOMING', 'SELESAI'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="font-mono text-xs uppercase px-3 py-1.5 transition-all"
                style={{
                  background: filter === f ? 'var(--foreground)' : 'transparent',
                  color: filter === f ? 'var(--background)' : 'var(--muted-foreground)',
                  border: '1px solid var(--border)',
                  letterSpacing: '0.1em',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-px">
          {filtered.map((event, i) => (
            <EventRow key={event.id} event={event} index={i} onClick={() => setSelected(event.id)} />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(36,26,14,0.7)', backdropFilter: 'blur(4px)' }}
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-lg overflow-hidden"
            style={{ background: 'var(--background)' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="relative h-52 overflow-hidden" style={{ background: 'var(--muted)' }}>
              <img src={selectedEvent.img} alt={selectedEvent.title} className="w-full h-full object-cover" style={{ filter: 'sepia(20%) saturate(80%)' }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(36,26,14,0.6), transparent)' }} />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 font-mono text-xs w-8 h-8 flex items-center justify-center"
                style={{ background: 'var(--foreground)', color: 'var(--background)' }}
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <TypeBadge type={selectedEvent.type} />
                <StatusBadge status={selectedEvent.status} />
              </div>
              <h2 className="font-display mb-3" style={{ fontSize: '1.8rem', lineHeight: '0.95', color: 'var(--foreground)' }}>{selectedEvent.title}</h2>
              <p className="font-body text-sm leading-relaxed mb-5" style={{ color: 'var(--muted-foreground)' }}>{selectedEvent.desc}</p>
              <div className="space-y-2 mb-6">
                <EventMeta icon="📅" text={`${selectedEvent.date} · ${selectedEvent.time}`} />
                <EventMeta icon="📍" text={`${selectedEvent.location}, ${selectedEvent.city}`} />
              </div>
              {selectedEvent.status === 'UPCOMING' && (
                <button className="w-full font-condensed font-700 uppercase py-3 text-sm transition-opacity hover:opacity-80" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', letterSpacing: '0.15em' }}>
                  Daftar Hadir
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function EventRow({ event, onClick }: { event: typeof EVENTS[0]; index: number; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="grid grid-cols-[64px_1fr_auto] md:grid-cols-[80px_1fr_200px_120px] gap-4 items-center px-5 py-5 cursor-pointer transition-colors duration-150 border-b border-[var(--border)]"
      style={{ background: hovered ? 'var(--card)' : 'transparent' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Date */}
      <div className="text-center">
        <p className="font-display text-2xl leading-none" style={{ color: 'var(--foreground)' }}>{event.day}</p>
        <p className="font-mono text-xs" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.1em' }}>{event.month}</p>
      </div>
      {/* Info */}
      <div>
        <div className="flex items-center gap-2 mb-0.5">
          <h3 className="font-condensed font-700 uppercase" style={{ color: 'var(--foreground)', letterSpacing: '0.05em' }}>{event.title}</h3>
        </div>
        <p className="font-mono text-xs" style={{ color: 'var(--muted-foreground)' }}>{event.city} · {event.time}</p>
      </div>
      {/* Type */}
      <div className="hidden md:flex">
        <TypeBadge type={event.type} />
      </div>
      {/* Status */}
      <div className="flex justify-end">
        <StatusBadge status={event.status} />
      </div>
    </div>
  )
}

function TypeBadge({ type }: { type: string }) {
  const colors = TYPE_COLORS[type] ?? { bg: 'var(--muted)', text: 'var(--muted-foreground)' }
  return (
    <span className="font-mono text-xs px-2 py-0.5 whitespace-nowrap" style={{ background: colors.bg, color: colors.text, letterSpacing: '0.08em' }}>
      {type}
    </span>
  )
}

function StatusBadge({ status }: { status: string }) {
  const isUpcoming = status === 'UPCOMING'
  return (
    <span className="font-mono text-xs px-2 py-0.5 whitespace-nowrap" style={{ background: isUpcoming ? 'rgba(212,167,44,0.15)' : 'var(--muted)', color: isUpcoming ? 'var(--accent)' : 'var(--muted-foreground)', letterSpacing: '0.08em', border: `1px solid ${isUpcoming ? 'var(--accent)' : 'var(--border)'}` }}>
      {status}
    </span>
  )
}

function EventMeta({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-sm">{icon}</span>
      <span className="font-body text-sm" style={{ color: 'var(--muted-foreground)' }}>{text}</span>
    </div>
  )
}
