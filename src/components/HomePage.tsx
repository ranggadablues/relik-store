import { useState } from 'react'
import type { NavFn } from '@/types/page'

const PRODUCTS = [
  { id: 1, name: 'Bomber Archive 94', tag: 'OUTERWEAR', price: 'Rp 890.000', img: 'https://images.unsplash.com/photo-1538751252895-baf363358ff7?w=600&h=720&fit=crop&auto=format', badge: 'TERLARIS' },
  { id: 2, name: 'Kaos Tape Side B', tag: 'TOPS', price: 'Rp 320.000', img: 'https://images.unsplash.com/photo-1612739980319-3d70ac237feb?w=600&h=720&fit=crop&auto=format', badge: null },
  { id: 3, name: 'Jaket Denim Rewind', tag: 'OUTERWEAR', price: 'Rp 750.000', img: 'https://images.unsplash.com/photo-1579531936377-b29525a21d63?w=600&h=720&fit=crop&auto=format', badge: 'NEW' },
  { id: 4, name: 'Varsity Jacket Kasur', tag: 'OUTERWEAR', price: 'Rp 1.100.000', img: 'https://images.unsplash.com/photo-1586583903558-bf4ae02b9f29?w=600&h=720&fit=crop&auto=format', badge: 'LIMITED' },
]


export default function HomePage({ navigate }: { navigate: NavFn }) {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div style={{ background: 'var(--background)', fontFamily: "'Barlow Condensed', sans-serif", paddingTop: '96px' }}>

      {/* ── HERO EDITORIAL ─────────────────────────────────── */}
      <section className="border-b-4 border-[var(--foreground)]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2px_1fr_2px_320px]">

          {/* LEFT — brand statement */}
          <div className="flex flex-col justify-between p-8 md:p-10 border-b-4 lg:border-b-0" style={{ borderColor: 'var(--foreground)' }}>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3" style={{ background: 'var(--primary)' }} />
                <span className="font-mono text-xs uppercase" style={{ color: 'var(--primary)', letterSpacing: '0.22em' }}>KOLEKSI UTAMA</span>
              </div>

              <h1 className="font-display leading-none mb-0 select-none" style={{ fontSize: 'clamp(5rem, 11vw, 9.5rem)', color: 'var(--foreground)', letterSpacing: '0.02em', lineHeight: 0.86 }}>
                REL<span style={{ color: 'var(--primary)' }}>IK</span>
              </h1>

              <div className="mt-4 mb-6 h-1" style={{ background: 'var(--foreground)', width: '100%' }} />

              <p className="font-condensed text-lg leading-snug italic" style={{ color: 'var(--muted-foreground)', maxWidth: 340 }}>
                "Seperti menemukan kaset lama di lemari — RELIK membawa kembali energi jalanan yang tak pernah mati."
              </p>
            </div>

            <div className="mt-8">
              {/* Stats row — oldschool column style */}
              <div className="grid grid-cols-3 border-t-2 border-[var(--foreground)] pt-5 gap-4">
                {[['30+', 'PIECES'], ['12K+', 'MEMBERS'], ["'94", 'EST.']].map(([v, l]) => (
                  <div key={l}>
                    <p className="font-display text-3xl leading-none" style={{ color: 'var(--primary)' }}>{v}</p>
                    <p className="font-mono text-xs mt-1" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.14em' }}>{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="hidden lg:block" style={{ background: 'var(--foreground)' }} />

          {/* CENTER — hero image */}
          <div className="relative overflow-hidden" style={{ minHeight: 520, background: 'var(--muted)' }}>
            <img
              src="https://images.unsplash.com/photo-1538751252895-baf363358ff7?w=900&h=1100&fit=crop&auto=format"
              alt="Gaya streetwear 90an"
              className="w-full h-full object-cover object-top"
              style={{ filter: 'sepia(25%) saturate(80%) contrast(1.08)', minHeight: 520 }}
            />
            {/* Caption strip */}
            <div className="absolute bottom-0 left-0 right-0 border-t-2 border-[var(--foreground)] px-5 py-3" style={{ background: 'var(--card)' }}>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.14em' }}>FOTO: KOLEKSI MUSIM INI</span>
                <span className="font-mono text-xs" style={{ color: 'var(--primary)', letterSpacing: '0.1em' }}>2024</span>
              </div>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="hidden lg:block" style={{ background: 'var(--foreground)' }} />

          {/* RIGHT — sidebar info */}
          <div className="border-t-4 lg:border-t-0 border-[var(--foreground)] flex flex-col">
            {/* New drop alert */}
            <div className="border-b-2 border-[var(--foreground)] px-6 py-5" style={{ background: 'var(--primary)' }}>
              <p className="font-mono text-xs mb-1" style={{ color: 'rgba(245,237,217,0.7)', letterSpacing: '0.18em' }}>// NEW DROP</p>
              <p className="font-display text-2xl leading-tight" style={{ color: '#F5EDD9' }}>BOMBER<br />ARCHIVE 94</p>
              <p className="font-condensed text-base mt-2" style={{ color: 'rgba(245,237,217,0.8)' }}>Rp 890.000</p>
              <button
                onClick={() => navigate('product', 1)}
                className="mt-4 w-full font-condensed font-700 uppercase py-2.5 text-sm transition-opacity hover:opacity-85"
                style={{ background: '#F5EDD9', color: 'var(--foreground)', letterSpacing: '0.14em' }}
              >
                Lihat Sekarang →
              </button>
            </div>

            {/* Event teaser */}
            <div className="border-b-2 border-[var(--foreground)] px-6 py-5">
              <p className="font-mono text-xs mb-3" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.18em' }}>// EVENT TERDEKAT</p>
              <div className="flex items-start gap-4">
                <div className="text-center border-2 border-[var(--foreground)] px-3 py-2 shrink-0">
                  <p className="font-display text-2xl leading-none" style={{ color: 'var(--foreground)' }}>14</p>
                  <p className="font-mono text-xs" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.1em' }}>SEP</p>
                </div>
                <div>
                  <p className="font-condensed font-700 uppercase text-sm leading-tight" style={{ color: 'var(--foreground)' }}>POP-UP JAKARTA<br />Senayan City</p>
                  <p className="font-mono text-xs mt-1.5" style={{ color: 'var(--muted-foreground)' }}>12.00 – 20.00 WIB</p>
                </div>
              </div>
              <button
                onClick={() => navigate('event')}
                className="mt-4 w-full font-condensed font-700 uppercase py-2 text-xs border-2 border-[var(--foreground)] transition-colors"
                style={{ color: 'var(--foreground)', letterSpacing: '0.14em' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--foreground)'; e.currentTarget.style.color = 'var(--background)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--foreground)' }}
              >
                Semua Event
              </button>
            </div>

            {/* Quick links */}
            <div className="px-6 py-5 flex-1">
              <p className="font-mono text-xs mb-3" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.18em' }}>// CEPAT KE</p>
              <div className="flex flex-col gap-0">
                {[
                  { label: 'Katalog Lengkap', page: 'catalog' as const },
                  { label: 'Daftar Member', page: 'register' as const },
                  { label: 'Login Akun', page: 'login' as const },
                ].map(({ label, page }) => (
                  <button
                    key={page}
                    onClick={() => navigate(page)}
                    className="flex items-center justify-between py-3 border-b border-[var(--border)] font-condensed font-700 uppercase text-sm hover:opacity-60 transition-opacity text-left"
                    style={{ color: 'var(--foreground)', letterSpacing: '0.1em' }}
                  >
                    <span>{label}</span>
                    <span style={{ color: 'var(--primary)' }}>→</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT — 2-col editorial block ─────────────────── */}
      <section className="border-b-4 border-[var(--foreground)]">
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] items-stretch">
          {/* Label column — vertical text */}
          <div className="hidden md:flex items-center justify-center border-r-4 border-[var(--foreground)] px-5" style={{ background: 'var(--foreground)', writingMode: 'vertical-rl', minWidth: 52 }}>
            <span className="font-mono text-xs uppercase" style={{ color: 'var(--accent)', letterSpacing: '0.22em', transform: 'rotate(180deg)' }}>TENTANG KAMI</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Text */}
            <div className="p-8 md:p-10 border-b-2 md:border-b-0 md:border-r-2 border-[var(--foreground)]">
              <h2 className="font-display mb-5" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', lineHeight: 0.92, color: 'var(--foreground)' }}>
                BUKAN<br />SEKADAR<br />BRAND.
              </h2>
              <p className="font-body text-sm leading-relaxed mb-4" style={{ color: 'var(--muted-foreground)', maxWidth: 380 }}>
                Kami adalah arsip dari era yang membentuk kita — ketika musik masih diputar dari kaset, ketika pakaian punya karakter, ketika jalanan adalah tempat bercerita.
              </p>
              <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)', maxWidth: 380 }}>
                Setiap potongan, setiap grafis, setiap jahitan RELIK terinspirasi dari dekade yang paling jujur dalam sejarah mode jalanan Indonesia.
              </p>
              <div className="mt-8 border-t-2 border-[var(--foreground)] pt-6">
                <button
                  onClick={() => navigate('catalog')}
                  className="font-condensed font-700 uppercase text-sm px-8 py-3 border-2 border-[var(--foreground)] transition-all"
                  style={{ color: 'var(--foreground)', letterSpacing: '0.14em' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--foreground)'; e.currentTarget.style.color = 'var(--background)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--foreground)' }}
                >
                  LIHAT KATALOG
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="relative overflow-hidden" style={{ background: 'var(--muted)', minHeight: 380 }}>
              <img
                src="https://images.unsplash.com/photo-1612739980319-3d70ac237feb?w=800&h=900&fit=crop&auto=format"
                alt="Komunitas streetwear vintage"
                className="w-full h-full object-cover"
                style={{ filter: 'sepia(20%) saturate(85%) contrast(1.05)', minHeight: 380 }}
              />
              {/* Corner tag */}
              <div className="absolute top-0 left-0 px-4 py-2 border-b-2 border-r-2 border-[var(--foreground)]" style={{ background: 'var(--card)' }}>
                <span className="font-mono text-xs uppercase" style={{ color: 'var(--foreground)', letterSpacing: '0.14em' }}>JAKARTA · 2024</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS — catalog table style ─────────────────── */}
      <section className="border-b-4 border-[var(--foreground)]">
        {/* Section header row */}
        <div className="border-b-2 border-[var(--foreground)] grid grid-cols-[1fr_auto] items-center px-8 py-4" style={{ background: 'var(--card)' }}>
          <div className="flex items-center gap-4">
            <span className="font-display text-4xl leading-none" style={{ color: 'var(--primary)' }}>✦</span>
            <div>
              <p className="font-mono text-xs uppercase" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.18em' }}>PILIHAN EDITOR</p>
              <h2 className="font-display text-3xl leading-none" style={{ color: 'var(--foreground)' }}>ARSIP MUSIM INI</h2>
            </div>
          </div>
          <button
            onClick={() => navigate('catalog')}
            className="font-condensed font-700 uppercase text-xs px-5 py-2 border-2 border-[var(--foreground)] transition-all hidden md:block"
            style={{ color: 'var(--foreground)', letterSpacing: '0.14em' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--foreground)'; e.currentTarget.style.color = 'var(--background)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--foreground)' }}
          >
            LIHAT SEMUA →
          </button>
        </div>

        {/* Products — magazine/catalog grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p, i) => (
            <div
              key={p.id}
              className="group cursor-pointer border-r-0 sm:last:border-r-0"
              style={{ borderRight: i < 3 ? '2px solid var(--foreground)' : 'none', borderBottom: '0' }}
              onClick={() => navigate('product', p.id)}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Image */}
              <div className="relative overflow-hidden border-b-2 border-[var(--foreground)]" style={{ background: 'var(--muted)', aspectRatio: '3/4' }}>
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ filter: 'sepia(12%) saturate(88%)' }}
                />
                {/* Index number */}
                <div className="absolute top-0 left-0 border-b-2 border-r-2 border-[var(--foreground)] px-3 py-1.5" style={{ background: 'var(--card)' }}>
                  <span className="font-mono text-xs" style={{ color: 'var(--foreground)', letterSpacing: '0.1em' }}>0{i + 1}</span>
                </div>
                {/* Badge */}
                {p.badge && (
                  <div className="absolute top-0 right-0 border-b-2 border-l-2 border-[var(--foreground)] px-3 py-1.5" style={{ background: 'var(--primary)' }}>
                    <span className="font-mono text-xs" style={{ color: '#F5EDD9', letterSpacing: '0.1em' }}>{p.badge}</span>
                  </div>
                )}
                {/* Hover CTA */}
                <div
                  className="absolute bottom-0 left-0 right-0 border-t-2 border-[var(--foreground)] py-3 text-center font-condensed font-700 uppercase text-sm transition-all duration-200"
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

              {/* Product info */}
              <div className="px-5 py-4">
                <p className="font-mono text-xs mb-1" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.14em' }}>{p.tag}</p>
                <h3 className="font-display text-xl leading-tight uppercase" style={{ color: 'var(--foreground)' }}>{p.name}</h3>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-condensed font-700 text-base" style={{ color: 'var(--primary)' }}>{p.price}</span>
                  <span className="font-mono text-xs" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.1em' }}>IN STOCK</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MANIFESTO — full-width dark block ──────────────── */}
      <section className="relative overflow-hidden border-b-4 border-[var(--foreground)]" style={{ background: 'var(--foreground)' }}>
        <div className="stripe-pattern absolute inset-0 opacity-10" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_2px_1fr]">
          {/* Left — quote */}
          <div className="px-10 py-14">
            <p className="font-mono text-xs uppercase mb-5" style={{ color: 'var(--accent)', letterSpacing: '0.22em' }}>// MANIFESTO</p>
            <blockquote className="font-display leading-none mb-8" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.8rem)', color: '#F5EDD9', lineHeight: 0.9 }}>
              "KAMI ADALAH<br />ARSIP DARI<br />ERA YANG<br />MEMBENTUK<br />KITA."
            </blockquote>
            <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(245,237,217,0.55)', maxWidth: 340 }}>
              Ketika musik masih diputar dari kaset, ketika pakaian punya karakter, ketika jalanan adalah tempat bercerita.
            </p>
          </div>

          {/* Divider */}
          <div style={{ background: 'rgba(245,237,217,0.12)' }} />

          {/* Right — CTA */}
          <div className="px-10 py-14 flex flex-col justify-between">
            <div>
              <p className="font-mono text-xs uppercase mb-4" style={{ color: 'var(--accent)', letterSpacing: '0.22em' }}>// BERGABUNG</p>
              <h3 className="font-display mb-4" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: '#F5EDD9', lineHeight: 0.92 }}>
                JADILAH<br />BAGIAN<br />DARI ARSIP.
              </h3>
              <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(245,237,217,0.55)', maxWidth: 280 }}>
                Daftar sebagai member RELIK dan dapatkan akses awal ke koleksi terbatas.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 items-start">
              <button
                onClick={() => navigate('register')}
                className="font-condensed font-700 uppercase px-8 py-3.5 text-sm transition-opacity hover:opacity-85 border-2"
                style={{ background: 'var(--accent)', color: 'var(--accent-foreground)', letterSpacing: '0.16em', border: '2px solid var(--accent)' }}
              >
                DAFTAR SEKARANG
              </button>
              <button
                onClick={() => navigate('catalog')}
                className="font-condensed font-700 uppercase px-8 py-3.5 text-sm transition-opacity hover:opacity-70 border-2"
                style={{ background: 'transparent', color: '#F5EDD9', letterSpacing: '0.16em', border: '2px solid rgba(245,237,217,0.3)' }}
              >
                LIHAT KATALOG
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM META STRIP ──────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4" style={{ background: 'var(--card)' }}>
        {[
          { icon: '📦', title: 'FREE ONGKIR', sub: 'Min. pembelian Rp 500.000' },
          { icon: '🔄', title: 'RETUR 14 HARI', sub: 'Garansi kepuasan produk' },
          { icon: '🔒', title: 'BAYAR AMAN', sub: 'Enkripsi SSL terjamin' },
          { icon: '📞', title: 'CS AKTIF', sub: 'Senin–Sabtu 09.00–18.00' },
        ].map((b, i) => (
          <div
            key={b.title}
            className="flex items-center gap-4 px-6 py-5 border-r-0 border-b-2 md:border-b-0"
            style={{
              borderRight: i < 3 ? '2px solid var(--border)' : 'none',
              borderBottom: '2px solid var(--border)',
            }}
          >
            <span className="text-2xl shrink-0">{b.icon}</span>
            <div>
              <p className="font-condensed font-700 uppercase text-sm leading-tight" style={{ color: 'var(--foreground)', letterSpacing: '0.08em' }}>{b.title}</p>
              <p className="font-mono text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>{b.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
