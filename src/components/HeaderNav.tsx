'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CassetteIcon } from '@/components/ui/CassetteIcon'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/katalog', label: 'Katalog' },
  { href: '/event', label: 'Event' },
]

const TICKER_ITEMS = [
  'RELIK STREETWEAR',
  '////',
  'KOLEKSI BARU 2024',
  '////',
  'POP-UP JAKARTA 14 SEP',
  '////',
  'FREE ONGKIR MIN 500RB',
  '////',
  'ARSIP JALANAN EST.1994',
  '////',
]

export function HeaderNav() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b-2 border-[var(--foreground)]" style={{ background: 'var(--card)' }}>
      {/* Ticker — only on home page */}
      {isHome && (
        <div className="overflow-hidden border-b-2 border-[var(--foreground)]" style={{ background: 'var(--foreground)', paddingTop: '0.3rem', paddingBottom: '0.3rem' }}>
          <div className="marquee-track">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
              <span key={i} className="mx-6 whitespace-nowrap font-mono text-xs uppercase" style={{ color: 'var(--accent)', letterSpacing: '0.18em' }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Main nav bar */}
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <CassetteIcon color="var(--primary)" />
          <span className="font-display text-2xl" style={{ color: 'var(--foreground)', letterSpacing: '0.22em' }}>
            RELIK
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-0">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href || (href !== '/' && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                className="font-condensed uppercase text-sm px-5 py-2 border-l-2 border-[var(--foreground)] transition-colors inline-block"
                style={{
                  color: active ? 'var(--background)' : 'var(--foreground)',
                  background: active ? 'var(--foreground)' : 'transparent',
                  letterSpacing: '0.14em',
                  fontWeight: 700,
                }}
              >
                {label}
              </Link>
            )
          })}
          <Link
            href="/daftar"
            className="font-condensed font-700 uppercase text-xs px-6 py-2 ml-0 border-l-2 border-r-0 border-[var(--foreground)] transition-all inline-block"
            style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', letterSpacing: '0.16em' }}
          >
            Login
          </Link>
        </div>

        {/* Hamburger */}
        <button className="md:hidden flex flex-col gap-1.5 p-1" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span className={`block h-0.5 w-6 transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} style={{ background: 'var(--foreground)' }} />
          <span className={`block h-0.5 w-6 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} style={{ background: 'var(--foreground)' }} />
          <span className={`block h-0.5 w-6 transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ background: 'var(--foreground)' }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t-2 border-[var(--foreground)] px-6 py-4 space-y-0" style={{ background: 'var(--background)' }}>
          {[
            ...NAV_LINKS,
            { href: '/daftar', label: 'Login' },
            { href: '/buatakun', label: 'Daftar' },
          ].map(({ href, label }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between w-full font-condensed font-700 uppercase py-3 border-b-2 border-[var(--foreground)] last:border-0"
                style={{ color: active ? 'var(--primary)' : 'var(--foreground)', letterSpacing: '0.14em' }}
              >
                <span>{label}</span>
                <span className="text-xs opacity-40">→</span>
              </Link>
            )
          })}
        </div>
      )}
    </nav>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)]" style={{ background: 'var(--card)' }}>
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <CassetteIcon small color="var(--primary)" />
            <span className="font-display text-xl" style={{ color: 'var(--foreground)', letterSpacing: '0.22em' }}>RELIK</span>
          </div>
          <p className="font-body text-sm leading-relaxed mb-4 max-w-xs" style={{ color: 'var(--muted-foreground)' }}>
            Arsip dari era yang membentuk kita — ketika pakaian punya karakter dan jalanan adalah tempat bercerita.
          </p>
          <p className="font-mono text-xs" style={{ color: 'var(--muted-foreground)' }}>hello@relik.id &nbsp;·&nbsp; @relik.id</p>
        </div>

        <div>
          <p className="font-mono text-xs uppercase mb-4" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.16em' }}>Halaman</p>
          <div className="flex flex-col gap-2">
            {[...NAV_LINKS, { href: '/daftar', label: 'Login' }].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-left font-condensed font-600 text-sm uppercase hover:opacity-60 transition-opacity"
                style={{ color: 'var(--foreground)', letterSpacing: '0.08em' }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-xs uppercase mb-4" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.16em' }}>Akun</p>
          <div className="flex flex-col gap-2">
            {[
              { href: '/daftar', label: 'Masuk' },
              { href: '/buatakun', label: 'Daftar' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-left font-condensed font-600 text-sm uppercase hover:opacity-60 transition-opacity"
                style={{ color: 'var(--foreground)', letterSpacing: '0.08em' }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--border)] px-6 py-4 flex items-center justify-between">
        <p className="font-mono text-xs" style={{ color: 'var(--muted-foreground)' }}>© 2024 RELIK. Semua hak dilindungi.</p>
        <p className="font-mono text-xs" style={{ color: 'var(--muted-foreground)' }}>EST. 1994</p>
      </div>
    </footer>
  )
}
