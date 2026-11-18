'use client'

import type { NavFn } from '@/types/page'
import { CassetteIcon } from '@/components/ui/CassetteIcon'

export default function ActivationSuccessPage({ navigate }: { navigate: NavFn }) {
  return (
    <div className="min-h-screen pt-24" style={{ background: 'var(--background)' }}>
      <div className="grid min-h-[calc(100vh-6rem)] grid-cols-1 lg:grid-cols-[minmax(0,1fr)_420px]">
        <section className="flex items-center border-b-4 border-[var(--foreground)] px-6 py-14 lg:border-b-0 lg:border-r-4 lg:px-14">
          <div className="mx-auto w-full max-w-3xl">
            <div className="mb-8 flex items-center gap-3">
              <span className="h-3 w-3 bg-[var(--secondary)]" />
              <p className="font-mono text-xs uppercase" style={{ color: 'var(--secondary)', letterSpacing: '0.22em' }}>
                // Aktivasi Berhasil
              </p>
            </div>

            <div className="grid items-end gap-8 md:grid-cols-[1fr_auto]">
              <div>
                <p className="font-mono text-xs uppercase" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.16em' }}>
                  Member Archive No. 01994
                </p>
                <h1
                  className="mt-3 font-display"
                  style={{ color: 'var(--foreground)', fontSize: 'clamp(4rem, 10vw, 8.5rem)', lineHeight: 0.86 }}
                >
                  AKUN<br />
                  <span style={{ color: 'var(--primary)' }}>AKTIF.</span>
                </h1>
              </div>

              <div
                className="flex h-28 w-28 rotate-3 items-center justify-center border-4 border-[var(--secondary)]"
                style={{ background: 'var(--card)', boxShadow: '8px 8px 0 var(--foreground)' }}
                aria-hidden="true"
              >
                <svg width="58" height="58" viewBox="0 0 58 58" fill="none">
                  <circle cx="29" cy="29" r="24" stroke="var(--secondary)" strokeWidth="4" />
                  <path d="M17 29.5L25.5 38 42 20" stroke="var(--secondary)" strokeWidth="5" strokeLinecap="square" />
                </svg>
              </div>
            </div>

            <div className="my-9 h-1 bg-[var(--foreground)]" />

            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <p className="font-condensed text-xl font-bold uppercase" style={{ color: 'var(--foreground)', letterSpacing: '0.06em' }}>
                  Selamat datang di arsip.
                </p>
                <p className="mt-3 max-w-md font-body text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                  Email kamu telah terverifikasi. Sekarang kamu bisa masuk, menyimpan koleksi favorit, dan mendapat akses awal ke rilisan terbatas RELIK.
                </p>
              </div>

              <div className="grid grid-cols-2 border-2 border-[var(--foreground)]">
                {[
                  ['STATUS', 'AKTIF'],
                  ['AKSES', 'FULL'],
                  ['EDISI', 'SIDE A'],
                  ['SEJAK', '2024'],
                ].map(([label, value], index) => (
                  <div
                    key={label}
                    className={`p-4 ${index % 2 === 0 ? 'border-r-2' : ''} ${index < 2 ? 'border-b-2' : ''} border-[var(--foreground)]`}
                  >
                    <p className="font-mono text-[0.6rem] uppercase" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.14em' }}>
                      {label}
                    </p>
                    <p className="mt-1 font-display text-xl" style={{ color: index === 0 ? 'var(--secondary)' : 'var(--foreground)' }}>
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => navigate('login')}
                className="px-9 py-4 font-condensed text-sm font-bold uppercase transition-opacity hover:opacity-85 cursor-pointer"
                style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', letterSpacing: '0.16em' }}
              >
                Masuk ke Akun
              </button>
              <button
                onClick={() => navigate('catalog')}
                className="border-2 border-[var(--foreground)] px-9 py-4 font-condensed text-sm font-bold uppercase transition-colors hover:bg-[var(--foreground)] hover:text-[var(--background)] cursor-pointer"
                style={{ color: 'var(--foreground)', letterSpacing: '0.16em' }}
              >
                Lihat Katalog
              </button>
            </div>
          </div>
        </section>

        <aside className="relative flex min-h-[420px] flex-col justify-between overflow-hidden p-8 lg:min-h-0 lg:p-10" style={{ background: 'var(--foreground)' }}>
          <div className="stripe-pattern absolute inset-0 opacity-10" />
          <div className="relative z-10 flex items-center gap-2.5">
            <CassetteIcon color="var(--accent)" />
            <span className="font-display text-2xl" style={{ color: 'var(--background)', letterSpacing: '0.22em' }}>RELIK</span>
          </div>

          <div className="relative z-10 my-10">
            <p className="font-mono text-xs uppercase" style={{ color: 'var(--accent)', letterSpacing: '0.2em' }}>
              Putar dari awal
            </p>
            <p className="mt-4 font-display text-5xl leading-[0.9]" style={{ color: 'var(--background)' }}>
              SIDE A<br />SIAP<br />DIMULAI.
            </p>
            <div className="mt-8 border-y border-white/20 py-4">
              <p className="font-body text-sm leading-relaxed text-white/60">
                “Pakaian punya cerita. Sekarang kamu resmi menjadi bagian dari ceritanya.”
              </p>
            </div>
          </div>

          <p className="relative z-10 font-mono text-[0.65rem] uppercase text-white/25" style={{ letterSpacing: '0.18em' }}>
            Activation confirmed / RELIK 1994
          </p>
        </aside>
      </div>
    </div>
  )
}
