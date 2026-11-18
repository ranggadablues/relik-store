'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { CassetteIcon } from '@/components/ui/CassetteIcon'
import { useAuthStore } from '@/store/authStore'
import { toast } from 'react-toastify'

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
  const router = useRouter()
  const isHome = pathname === '/'
  const [menuOpen, setMenuOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)

  const { isAuthenticated, user, logout } = useAuthStore()

  useEffect(() => {
    setMenuOpen(false)
    setAccountOpen(false)
  }, [pathname])

  const username = user?.name || (user?.email ? user.email.split('@')[0] : '') || (isAuthenticated ? 'Member' : '')

  const handleLogout = async () => {
    setAccountOpen(false)
    setMenuOpen(false)
    try {
      await logout()
      toast.success('Berhasil keluar.')
      router.push('/')
      router.refresh()
    } catch {
      toast.error('Gagal keluar, silakan coba lagi.')
    }
  }

  const handleSettingClick = () => {
    setAccountOpen(false)
    setMenuOpen(false)
    toast.info('Halaman Setting akan segera hadir.')
  }

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

          {isAuthenticated ? (
            <div
              className="relative border-l-2 border-[var(--foreground)]"
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) setAccountOpen(false)
              }}
            >
              <button
                onClick={() => setAccountOpen((open) => !open)}
                className="flex items-center gap-3 px-5 py-2 font-condensed text-xs font-bold uppercase transition-colors cursor-pointer"
                style={{
                  background: accountOpen ? 'var(--foreground)' : 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  letterSpacing: '0.12em',
                }}
                aria-expanded={accountOpen}
                aria-haspopup="menu"
              >
                <span
                  className="flex h-5 w-5 items-center justify-center border border-current font-mono text-[0.6rem]"
                  aria-hidden="true"
                >
                  {username ? username.charAt(0).toUpperCase() : 'M'}
                </span>
                <span className="max-w-32 truncate">{username}</span>
                <span className={`transition-transform ${accountOpen ? 'rotate-180' : ''}`} aria-hidden="true">
                  ↓
                </span>
              </button>

              {accountOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-52 border-2 border-[var(--foreground)] shadow-[6px_6px_0_var(--foreground)] z-50"
                  style={{ background: 'var(--background)' }}
                  role="menu"
                >
                  <div className="border-b-2 border-[var(--foreground)] px-4 py-3">
                    <p className="font-mono text-[0.6rem] uppercase" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.14em' }}>
                      // MEMBER RELIK
                    </p>
                    <p className="mt-1 truncate font-condensed text-sm font-bold uppercase" style={{ color: 'var(--foreground)', letterSpacing: '0.08em' }}>
                      {username}
                    </p>
                  </div>
                  <button
                    className="flex w-full items-center justify-between px-4 py-3 text-left font-condensed text-sm font-bold uppercase transition-colors hover:bg-[var(--muted)] cursor-pointer"
                    style={{ color: 'var(--foreground)', letterSpacing: '0.1em' }}
                    onClick={handleSettingClick}
                    role="menuitem"
                  >
                    <span>Seting</span>
                    <span className="font-mono text-xs" style={{ color: 'var(--primary)' }}>
                      →
                    </span>
                  </button>
                  <button
                    className="flex w-full items-center justify-between border-t-2 border-[var(--foreground)] px-4 py-3 text-left font-condensed text-sm font-bold uppercase text-[var(--primary)] transition-colors hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] cursor-pointer"
                    style={{ letterSpacing: '0.1em' }}
                    onClick={handleLogout}
                    role="menuitem"
                  >
                    <span>Keluar</span>
                    <span className="font-mono text-xs">×</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/masuk"
              className="font-condensed font-700 uppercase text-xs px-6 py-2 ml-0 border-l-2 border-r-0 border-[var(--foreground)] transition-all inline-block hover:opacity-90"
              style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', letterSpacing: '0.16em' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--foreground)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--primary)'
              }}
            >
              Masuk
            </Link>
          )}
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
            ...(!isAuthenticated
              ? [
                  { href: '/masuk', label: 'Login' },
                  { href: '/daftar', label: 'Daftar' },
                ]
              : []),
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

          {isAuthenticated && (
            <div className="border-b-2 border-[var(--foreground)] py-3">
              <p className="font-mono text-[0.6rem] uppercase" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.14em' }}>
                // MEMBER RELIK
              </p>
              <div className="mt-1 flex items-center justify-between gap-4">
                <span className="font-condensed text-base font-bold uppercase" style={{ color: 'var(--primary)', letterSpacing: '0.1em' }}>
                  {username}
                </span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleSettingClick}
                    className="font-condensed text-sm font-bold uppercase cursor-pointer"
                    style={{ color: 'var(--foreground)', letterSpacing: '0.1em' }}
                  >
                    Seting
                  </button>
                  <button
                    onClick={handleLogout}
                    className="font-condensed text-sm font-bold uppercase cursor-pointer"
                    style={{ color: 'var(--primary)', letterSpacing: '0.1em' }}
                  >
                    Keluar
                  </button>
                </div>
              </div>
            </div>
          )}
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
            {[...NAV_LINKS, { href: '/masuk', label: 'Login' }].map(({ href, label }) => (
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
              { href: '/masuk', label: 'Masuk' },
              { href: '/daftar', label: 'Daftar' },
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
