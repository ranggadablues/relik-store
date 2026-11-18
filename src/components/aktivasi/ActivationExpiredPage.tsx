'use client'

import { useState } from 'react'
import type { NavFn } from '@/types/page'
import { CassetteIcon } from '@/components/ui/CassetteIcon'

export default function ActivationExpiredPage({ navigate }: { navigate: NavFn }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  function handleResend(event: React.FormEvent) {
    event.preventDefault()
    if (!email.includes('@')) {
      setError('Masukkan alamat email yang valid.')
      return
    }
    setError('')
    setSent(true)
  }

  return (
    <div className="min-h-screen pt-24" style={{ background: 'var(--background)' }}>
      <div className="grid min-h-[calc(100vh-6rem)] grid-cols-1 lg:grid-cols-[420px_minmax(0,1fr)]">
        <aside className="relative flex min-h-[360px] flex-col justify-between overflow-hidden border-b-4 border-[var(--foreground)] p-8 lg:min-h-0 lg:border-b-0 lg:border-r-4 lg:p-10" style={{ background: 'var(--accent)' }}>
          <div className="stripe-pattern absolute inset-0 opacity-20" />
          <div className="relative z-10 flex items-center gap-2.5">
            <CassetteIcon color="var(--foreground)" />
            <span className="font-display text-2xl" style={{ color: 'var(--foreground)', letterSpacing: '0.22em' }}>RELIK</span>
          </div>

          <div className="relative z-10 my-10">
            <p className="font-mono text-xs uppercase" style={{ color: 'var(--foreground)', letterSpacing: '0.2em' }}>
              Error / Tape End
            </p>
            <p className="mt-4 font-display text-6xl leading-[0.85]" style={{ color: 'var(--foreground)' }}>
              LINK<br />SUDAH<br />USANG.
            </p>
            <div className="mt-8 flex items-center gap-4 border-y-2 border-[var(--foreground)] py-4">
              <span className="font-display text-4xl">15</span>
              <span className="font-mono text-[0.65rem] uppercase leading-relaxed" style={{ letterSpacing: '0.12em' }}>
                Menit masa aktif<br />tautan verifikasi
              </span>
            </div>
          </div>

          <p className="relative z-10 font-mono text-[0.65rem] uppercase opacity-50" style={{ letterSpacing: '0.18em' }}>
            Rewind required / RELIK 1994
          </p>
        </aside>

        <section className="flex items-center px-6 py-14 lg:px-14">
          <div className="mx-auto w-full max-w-xl">
            <div className="mb-7 flex h-16 w-16 items-center justify-center border-2 border-[var(--primary)]" aria-hidden="true">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                <circle cx="15" cy="15" r="12" stroke="var(--primary)" strokeWidth="2" />
                <path d="M15 8V16" stroke="var(--primary)" strokeWidth="2.5" />
                <circle cx="15" cy="21" r="1.5" fill="var(--primary)" />
              </svg>
            </div>

            <p className="font-mono text-xs uppercase" style={{ color: 'var(--primary)', letterSpacing: '0.22em' }}>
              // Aktivasi Kadaluarsa
            </p>
            <h1
              className="mt-3 font-display"
              style={{ color: 'var(--foreground)', fontSize: 'clamp(3.4rem, 8vw, 6.2rem)', lineHeight: 0.88 }}
            >
              PUTAR<br />ULANG<br />LINK-NYA.
            </h1>
            <p className="mt-6 max-w-lg font-body text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              Tautan aktivasi sudah melewati batas waktu atau pernah digunakan. Masukkan email yang kamu daftarkan untuk menerima tautan aktivasi baru.
            </p>

            {sent ? (
              <div className="mt-9 border-2 border-[var(--secondary)] p-6" style={{ background: 'var(--card)' }}>
                <p className="font-mono text-xs uppercase" style={{ color: 'var(--secondary)', letterSpacing: '0.18em' }}>
                  // Link Baru Terkirim
                </p>
                <p className="mt-3 font-condensed text-xl font-bold uppercase" style={{ color: 'var(--foreground)' }}>
                  Cek inbox kamu.
                </p>
                <p className="mt-2 font-body text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                  Kami mengirim tautan aktivasi baru ke <strong style={{ color: 'var(--foreground)' }}>{email}</strong>. Link berlaku selama 15 menit.
                </p>
                <button
                  onClick={() => navigate('login')}
                  className="mt-6 w-full py-3.5 font-condensed text-sm font-bold uppercase transition-opacity hover:opacity-85 cursor-pointer"
                  style={{ background: 'var(--secondary)', color: 'var(--secondary-foreground)', letterSpacing: '0.14em' }}
                >
                  Kembali ke Login
                </button>
              </div>
            ) : (
              <form onSubmit={handleResend} className="mt-9" noValidate>
                <label className="mb-2 block font-mono text-xs uppercase" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.14em' }}>
                  Email Terdaftar
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value)
                    setError('')
                  }}
                  placeholder="kamu@email.com"
                  className="w-full border-2 px-4 py-4 font-body text-sm outline-none"
                  style={{
                    background: 'var(--card)',
                    color: 'var(--foreground)',
                    borderColor: error ? 'var(--primary)' : 'var(--foreground)',
                  }}
                />
                {error && <p className="mt-2 font-mono text-xs" style={{ color: 'var(--primary)' }}>{error}</p>}
                <button
                  type="submit"
                  className="mt-3 w-full py-4 font-condensed text-sm font-bold uppercase transition-opacity hover:opacity-85 cursor-pointer"
                  style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', letterSpacing: '0.16em' }}
                >
                  Kirim Link Aktivasi Baru
                </button>
              </form>
            )}

            {!sent && (
              <div className="mt-6 flex items-center justify-between gap-4 border-t border-[var(--border)] pt-5">
                <p className="font-body text-sm" style={{ color: 'var(--muted-foreground)' }}>Salah memasukkan email?</p>
                <button
                  onClick={() => navigate('register')}
                  className="font-condensed text-sm font-bold uppercase underline underline-offset-4 cursor-pointer"
                  style={{ color: 'var(--foreground)', letterSpacing: '0.1em' }}
                >
                  Daftar Ulang
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
