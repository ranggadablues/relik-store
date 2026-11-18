import { useState, useMemo } from 'react'
import type { NavFn } from '@/types/page'
import { CATEGORIES, SORTS, formatPrice } from '@/types/page'
import { ALL_PRODUCTS } from '@/data/products'

export default function CatalogPage({ navigate }: { navigate: NavFn }) {
  const [category, setCategory] = useState('Semua')
  const [sort, setSort]         = useState('default')
  const [search, setSearch]     = useState('')
  const [hovered, setHovered]   = useState<number | null>(null)
  const [view, setView]         = useState<'grid' | 'list'>('grid')

  const filtered = useMemo(() => {
    let list = ALL_PRODUCTS
    if (category !== 'Semua') list = list.filter(p => p.tag === category)
    if (search.trim())        list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    if (sort === 'price-asc')  list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    return list
  }, [category, sort, search])

  /* nav-only pages get pt-16; home gets pt-24 (ticker+nav). Catalog is nav-only. */
  return (
    <div className="min-h-screen" style={{ background: 'var(--background)', paddingTop: '62px' }}>

      {/* ── PAGE MASTHEAD ─────────────────────────────────── */}
      <div className="border-b-4 border-[var(--foreground)]">
        {/* Top label band */}
        <div className="border-b-2 border-[var(--foreground)] px-6 py-2 flex items-center gap-4" style={{ background: 'var(--foreground)' }}>
          <span className="font-mono text-xs uppercase" style={{ color: 'var(--accent)', letterSpacing: '0.2em' }}>// RELIK CATALOG — KOLEKSI LENGKAP</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_2px_auto] items-stretch" style={{ background: 'var(--card)' }}>
          {/* Title */}
          <div className="px-8 py-8">
            <h1 className="font-display leading-none uppercase" style={{ fontSize: 'clamp(4rem, 9vw, 8rem)', color: 'var(--foreground)', lineHeight: 0.86 }}>
              KATA<span style={{ color: 'var(--primary)' }}>LOG</span>
            </h1>
            <p className="font-condensed italic text-base mt-3" style={{ color: 'var(--muted-foreground)' }}>
              Arsip penuh dari koleksi jalanan RELIK — pilih, temukan, miliki.
            </p>
          </div>

          {/* Divider */}
          <div className="hidden md:block" style={{ background: 'var(--foreground)' }} />

          {/* Search box */}
          <div className="border-t-2 md:border-t-0 border-[var(--foreground)] px-8 py-8 flex flex-col justify-center gap-4 min-w-[280px]">
            <p className="font-mono text-xs uppercase" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.16em' }}>// CARI PRODUK</p>
            <div className="relative">
              <input
                type="text"
                placeholder="nama produk..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full font-condensed text-sm px-4 py-3 border-2 outline-none"
                style={{ background: 'var(--background)', color: 'var(--foreground)', borderColor: 'var(--foreground)', borderRadius: 0, letterSpacing: '0.06em' }}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none font-mono text-sm" style={{ color: 'var(--muted-foreground)' }}>⌕</span>
            </div>
            {search && (
              <button
                onClick={() => setSearch('')}
                className="font-mono text-xs underline underline-offset-2 text-left"
                style={{ color: 'var(--muted-foreground)' }}
              >
                × hapus pencarian
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── FILTER BAR ────────────────────────────────────── */}
      <div className="border-b-2 border-[var(--foreground)] overflow-x-auto" style={{ background: 'var(--card)' }}>
        <div className="flex items-stretch min-w-max">
          {/* Category filters */}
          <div className="flex items-stretch border-r-2 border-[var(--foreground)]">
            <span className="font-mono text-xs uppercase px-4 flex items-center border-r-2 border-[var(--foreground)]" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.14em', background: 'var(--muted)' }}>
              KATEGORI
            </span>
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className="font-condensed font-700 uppercase text-sm px-5 py-3 transition-all"
                style={{
                  background: category === cat ? 'var(--foreground)' : 'transparent',
                  color: category === cat ? 'var(--background)' : 'var(--foreground)',
                  letterSpacing: '0.12em',
                  borderRight: i < CATEGORIES.length - 1 ? '1px solid var(--border)' : 'none',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort + view */}
          <div className="flex items-stretch ml-auto">
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="font-mono text-xs px-4 py-3 border-r-2 border-[var(--foreground)] outline-none cursor-pointer"
              style={{ background: 'var(--card)', color: 'var(--foreground)', borderRadius: 0, letterSpacing: '0.08em' }}
            >
              {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>

            {/* Grid/List toggle */}
            <div className="flex items-stretch border-l-2 border-[var(--foreground)]">
              {(['grid', 'list'] as const).map(v => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className="px-4 py-3 transition-colors"
                  style={{ background: view === v ? 'var(--foreground)' : 'transparent' }}
                  title={v === 'grid' ? 'Grid view' : 'List view'}
                >
                  {v === 'grid' ? <GridIcon active={view === 'grid'} /> : <ListIcon active={view === 'list'} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Result count */}
      <div className="border-b-2 border-[var(--foreground)] px-6 py-2 flex items-center gap-3" style={{ background: 'var(--foreground)' }}>
        <span className="font-mono text-xs" style={{ color: 'var(--accent)', letterSpacing: '0.14em' }}>
          {filtered.length} ITEM DITEMUKAN
          {category !== 'Semua' && ` — ${category.toUpperCase()}`}
          {search && ` — "${search}"`}
        </span>
      </div>

      {/* ── CONTENT ───────────────────────────────────────── */}
      <div>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 border-b-4 border-[var(--foreground)]">
            <p className="font-display mb-4" style={{ fontSize: '6rem', lineHeight: 1, color: 'var(--muted)' }}>?</p>
            <p className="font-condensed font-700 uppercase text-xl mb-2" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.1em' }}>Produk tidak ditemukan</p>
            <button
              onClick={() => { setSearch(''); setCategory('Semua') }}
              className="mt-4 font-mono text-xs px-5 py-2 border-2 border-[var(--foreground)] transition-all hover:bg-[var(--foreground)]"
              style={{ color: 'var(--foreground)', letterSpacing: '0.1em' }}
            >
              RESET FILTER
            </button>
          </div>
        ) : view === 'grid' ? (
          /* ── GRID VIEW ── */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 border-b-4 border-[var(--foreground)]">
            {filtered.map((p, i) => {
              const isLastRow4 = i >= filtered.length - (filtered.length % 4 || 4)
              return (
                <div
                  key={p.id}
                  className="group cursor-pointer"
                  style={{
                    borderRight: (i + 1) % 4 !== 0 ? '2px solid var(--foreground)' : 'none',
                    borderBottom: !isLastRow4 ? '2px solid var(--foreground)' : 'none',
                  }}
                  onMouseEnter={() => setHovered(p.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => navigate('product', p.id)}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden border-b-2 border-[var(--foreground)]" style={{ background: 'var(--muted)', aspectRatio: '3/4' }}>
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ filter: 'sepia(12%) saturate(88%)' }}
                    />
                    {/* Index */}
                    <div className="absolute top-0 left-0 border-b-2 border-r-2 border-[var(--foreground)] px-2 py-1" style={{ background: 'var(--card)' }}>
                      <span className="font-mono text-xs" style={{ color: 'var(--foreground)', letterSpacing: '0.1em' }}>{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    {/* Badge */}
                    {p.badge && (
                      <div className="absolute top-0 right-0 border-b-2 border-l-2 border-[var(--foreground)] px-2 py-1"
                        style={{ background: p.badge === 'NEW' ? 'var(--secondary)' : p.badge === 'LIMITED' ? 'var(--foreground)' : 'var(--primary)' }}>
                        <span className="font-mono text-xs" style={{ color: '#F5EDD9', letterSpacing: '0.1em' }}>{p.badge}</span>
                      </div>
                    )}
                    {/* Hover CTA */}
                    <div
                      className="absolute bottom-0 left-0 right-0 py-3 text-center font-condensed font-700 uppercase text-xs border-t-2 border-[var(--foreground)] transition-all duration-200"
                      style={{
                        background: 'var(--foreground)',
                        color: 'var(--background)',
                        letterSpacing: '0.14em',
                        transform: hovered === p.id ? 'translateY(0)' : 'translateY(100%)',
                      }}
                    >
                      LIHAT DETAIL →
                    </div>
                  </div>

                  {/* Info */}
                  <div className="px-4 py-4">
                    <div className="flex items-center gap-1 mb-1">
                      <Stars rating={p.rating} size={10} />
                      <span className="font-mono" style={{ color: 'var(--muted-foreground)', fontSize: '0.62rem', letterSpacing: '0.08em' }}>({p.reviewCount})</span>
                    </div>
                    <p className="font-mono mb-1" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.14em', fontSize: '0.6rem' }}>{p.tag.toUpperCase()}</p>
                    <h3 className="font-condensed font-700 uppercase leading-tight text-sm" style={{ color: 'var(--foreground)', letterSpacing: '0.04em' }}>{p.name}</h3>
                    <p className="font-condensed font-700 text-sm mt-1.5" style={{ color: 'var(--primary)' }}>{formatPrice(p.price)}</p>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          /* ── LIST VIEW ── */
          <div className="border-b-4 border-[var(--foreground)]">
            {/* List header row */}
            <div className="hidden md:grid grid-cols-[48px_80px_1fr_160px_140px_100px] items-center px-0 border-b-2 border-[var(--foreground)]" style={{ background: 'var(--foreground)' }}>
              {['#', 'FOTO', 'PRODUK', 'KATEGORI', 'HARGA', ''].map((h, i) => (
                <div key={i} className="px-4 py-2.5 border-r border-[rgba(245,237,217,0.1)] last:border-0">
                  <span className="font-mono text-xs" style={{ color: 'var(--accent)', letterSpacing: '0.14em' }}>{h}</span>
                </div>
              ))}
            </div>

            {filtered.map((p, i) => (
              <div
                key={p.id}
                className="grid grid-cols-[auto_1fr] md:grid-cols-[48px_80px_1fr_160px_140px_100px] items-center cursor-pointer transition-all border-b-2 border-[var(--foreground)]"
                style={{ background: hovered === p.id ? 'var(--card)' : 'transparent' }}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => navigate('product', p.id)}
              >
                {/* Index */}
                <div className="hidden md:flex px-4 py-4 border-r-2 border-[var(--foreground)] items-center justify-center h-full">
                  <span className="font-mono text-xs" style={{ color: 'var(--muted-foreground)' }}>{String(i + 1).padStart(2, '0')}</span>
                </div>
                {/* Thumb */}
                <div className="overflow-hidden border-r-2 border-[var(--foreground)] shrink-0" style={{ width: 80, height: 88, background: 'var(--muted)' }}>
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover" style={{ filter: 'sepia(10%)' }} />
                </div>
                {/* Name */}
                <div className="px-5 py-4 border-r-2 border-[var(--foreground)]">
                  <h3 className="font-condensed font-700 uppercase text-base leading-tight" style={{ color: 'var(--foreground)', letterSpacing: '0.04em' }}>{p.name}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <Stars rating={p.rating} size={10} />
                    <span className="font-mono" style={{ color: 'var(--muted-foreground)', fontSize: '0.62rem' }}>({p.reviewCount})</span>
                  </div>
                  {p.badge && (
                    <span className="inline-block mt-1.5 font-mono px-2 py-0.5 text-xs" style={{ background: 'var(--primary)', color: '#F5EDD9', fontSize: '0.6rem', letterSpacing: '0.08em' }}>{p.badge}</span>
                  )}
                </div>
                {/* Category */}
                <div className="hidden md:flex px-5 py-4 border-r-2 border-[var(--foreground)] items-center">
                  <span className="font-mono text-xs uppercase" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.1em' }}>{p.tag}</span>
                </div>
                {/* Price */}
                <div className="hidden md:flex px-5 py-4 border-r-2 border-[var(--foreground)] items-center">
                  <span className="font-condensed font-700 text-base" style={{ color: 'var(--primary)' }}>{formatPrice(p.price)}</span>
                </div>
                {/* CTA */}
                <div className="hidden md:flex px-4 py-4 items-center justify-center">
                  <span
                    className="font-mono text-xs uppercase transition-opacity duration-200"
                    style={{ color: 'var(--foreground)', letterSpacing: '0.1em', opacity: hovered === p.id ? 1 : 0 }}
                  >
                    LIHAT →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function Stars({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => {
        const filled = rating >= i
        const half   = !filled && rating >= i - 0.5
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 12 12" fill="none">
            <polygon
              points="6,1 7.5,4.5 11,4.8 8.5,7 9.3,11 6,9 2.7,11 3.5,7 1,4.8 4.5,4.5"
              fill={filled ? 'var(--accent)' : half ? 'var(--accent)' : 'var(--muted)'}
              opacity={half ? 0.5 : 1}
            />
          </svg>
        )
      })}
    </div>
  )
}

function GridIcon({ active }: { active: boolean }) {
  const c = active ? '#F5EDD9' : 'var(--muted-foreground)'
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="0" y="0" width="6" height="6" fill={c}/><rect x="8" y="0" width="6" height="6" fill={c}/>
      <rect x="0" y="8" width="6" height="6" fill={c}/><rect x="8" y="8" width="6" height="6" fill={c}/>
    </svg>
  )
}
function ListIcon({ active }: { active: boolean }) {
  const c = active ? '#F5EDD9' : 'var(--muted-foreground)'
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="0" y="1" width="14" height="2" fill={c}/>
      <rect x="0" y="6" width="14" height="2" fill={c}/>
      <rect x="0" y="11" width="14" height="2" fill={c}/>
    </svg>
  )
}
