import { useState } from 'react'
import type { NavFn } from '@/types/page'
import { CassetteIcon } from '@/components/ui/CassetteIcon'

export default function ForgotPasswordPage({ navigate }: { navigate: NavFn }) {
  const [email, setEmail]   = useState('')
  const [sent, setSent]     = useState(false)
  const [error, setError]   = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes('@')) { setError('Masukkan alamat email yang valid.'); return }
    setError('')
    setSent(true)
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* ── LEFT — visual panel ─────────────────────────── */}
      <div className="hidden md:flex flex-col relative overflow-hidden" style={{ background: 'var(--foreground)' }}>
        <div className="stripe-pattern absolute inset-0 opacity-10" />
        <img
          src="https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?w=900&h=1200&fit=crop&auto=format"
          alt="vintage street"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ mixBlendMode: 'multiply', opacity: 0.45, filter: 'sepia(30%)' }}
        />

        <div className="relative z-10 flex flex-col justify-between h-full p-10">
          {/* Logo */}
          <button onClick={() => navigate('home')} className="flex items-center gap-2.5">
            <CassetteIcon color="#F5EDD9" />
            <span className="font-display text-2xl" style={{ color: '#F5EDD9', letterSpacing: '0.22em' }}>RELIK</span>
          </button>

          {/* Center copy */}
          <div>
            <p className="font-mono text-xs mb-4" style={{ color: 'var(--accent)', letterSpacing: '0.22em' }}>— SISI B</p>
            <h2 className="font-display mb-4" style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', color: '#F5EDD9', lineHeight: '0.92' }}>
              "SEMUA YANG<br/>HILANG BISA<br/>DITEMUKAN<br/>KEMBALI."
            </h2>
            <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(245,237,217,0.55)', maxWidth: '260px' }}>
              Seperti kaset lama yang ketemu di sudut lemari — akun kamu tidak kemana-mana.
            </p>
          </div>

          <p className="font-mono text-xs" style={{ color: 'rgba(245,237,217,0.2)', letterSpacing: '0.2em' }}>EST. 1994 — RELIK STREETWEAR</p>
        </div>

        {/* Vertical label */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
          <p className="font-mono text-xs" style={{ color: 'rgba(245,237,217,0.12)', writingMode: 'vertical-rl', letterSpacing: '0.2em' }}>RESET PASSWORD — RELIK</p>
        </div>
      </div>

      {/* ── RIGHT — form ────────────────────────────────── */}
      <div className="flex items-center justify-center px-6 py-20" style={{ background: 'var(--background)' }}>
        <div className="w-full max-w-sm">

          {/* Mobile logo */}
          <div className="md:hidden flex items-center gap-2.5 mb-8">
            <CassetteIcon color="var(--primary)" />
            <span className="font-display text-xl" style={{ color: 'var(--foreground)', letterSpacing: '0.22em' }}>RELIK</span>
          </div>

          {sent ? (
            /* ── SUCCESS STATE ── */
            <div>
              {/* Animated envelope icon */}
              <div className="w-14 h-14 mb-6 flex items-center justify-center border-2" style={{ borderColor: 'var(--primary)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="4" width="20" height="16" rx="1" stroke="var(--primary)" strokeWidth="1.5"/>
                  <path d="M2 7l10 7 10-7" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>

              <p className="font-mono text-xs uppercase mb-2" style={{ color: 'var(--primary)', letterSpacing: '0.22em' }}>— Email Terkirim</p>
              <h2 className="font-display mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: '0.92', color: 'var(--foreground)' }}>
                CEK<br/>INBOX<br/>KAMU.
              </h2>
              <p className="font-body text-sm leading-relaxed mb-2" style={{ color: 'var(--muted-foreground)' }}>
                Kami mengirim link reset password ke:
              </p>
              <p className="font-condensed font-700 text-base mb-6" style={{ color: 'var(--foreground)' }}>{email}</p>
              <p className="font-body text-sm leading-relaxed mb-8" style={{ color: 'var(--muted-foreground)' }}>
                Link akan kedaluwarsa dalam <strong style={{ color: 'var(--foreground)' }}>15 menit</strong>. Cek folder spam jika tidak muncul di inbox.
              </p>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={() => { setSent(false); setEmail('') }}
                  className="w-full font-condensed font-700 uppercase py-3.5 text-sm border transition-all hover:opacity-70"
                  style={{ border: '1.5px solid var(--border)', color: 'var(--muted-foreground)', letterSpacing: '0.14em' }}
                >
                  Kirim Ulang Email
                </button>
                <button
                  onClick={() => navigate('login')}
                  className="w-full font-condensed font-700 uppercase py-3.5 text-sm transition-opacity hover:opacity-85"
                  style={{ background: 'var(--primary)', color: '#F5EDD9', letterSpacing: '0.14em' }}
                >
                  Kembali ke Login
                </button>
              </div>
            </div>
          ) : (
            /* ── FORM STATE ── */
            <div>
              <p className="font-mono text-xs uppercase mb-2" style={{ color: 'var(--primary)', letterSpacing: '0.22em' }}>— Reset Password</p>
              <h1 className="font-display mb-3" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', lineHeight: '0.92', color: 'var(--foreground)' }}>
                LUPA<br/>PASSWORD?
              </h1>
              <p className="font-body text-sm leading-relaxed mb-8" style={{ color: 'var(--muted-foreground)' }}>
                Masukkan email yang terdaftar. Kami akan mengirimkan link untuk membuat password baru.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Email field */}
                <div>
                  <label className="font-mono text-xs uppercase block mb-1.5" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.12em' }}>
                    Alamat Email <span style={{ color: 'var(--primary)' }}>*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setError('') }}
                    placeholder="kamu@email.com"
                    className="w-full px-4 py-3 text-sm font-body border outline-none transition-colors"
                    style={{
                      background: 'var(--card)',
                      color: 'var(--foreground)',
                      border: `1.5px solid ${error ? 'var(--primary)' : 'var(--border)'}`,
                      borderRadius: 0,
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
                    onBlur={e  => (e.currentTarget.style.borderColor = error ? 'var(--primary)' : 'var(--border)')}
                  />
                  {error && (
                    <p className="font-mono text-xs mt-1.5" style={{ color: 'var(--primary)' }}>{error}</p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full font-condensed font-700 uppercase py-4 text-sm transition-opacity hover:opacity-85"
                  style={{ background: 'var(--primary)', color: '#F5EDD9', letterSpacing: '0.16em' }}
                >
                  Kirim Link Reset
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
                  <span className="font-mono text-xs" style={{ color: 'var(--muted-foreground)' }}>atau</span>
                  <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
                </div>

                {/* Back to login */}
                <button
                  type="button"
                  onClick={() => navigate('login')}
                  className="w-full font-condensed font-700 uppercase py-3.5 text-sm border transition-all"
                  style={{ border: '1.5px solid var(--border)', color: 'var(--muted-foreground)', letterSpacing: '0.14em' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--foreground)'
                    e.currentTarget.style.color = 'var(--foreground)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.color = 'var(--muted-foreground)'
                  }}
                >
                  ← Kembali ke Login
                </button>
              </form>

              {/* Register link */}
              <p className="font-body text-sm text-center mt-6" style={{ color: 'var(--muted-foreground)' }}>
                Belum punya akun?{' '}
                <button
                  onClick={() => navigate('register')}
                  className="font-condensed font-700 uppercase underline underline-offset-2 hover:opacity-70 transition-opacity"
                  style={{ color: 'var(--primary)', letterSpacing: '0.06em' }}
                >
                  Daftar
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
