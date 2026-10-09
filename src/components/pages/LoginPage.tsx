import { useState } from 'react'
import type { NavFn } from '@/types/page'
import { CassetteIcon } from '@/components/ui/CassetteIcon'

export default function LoginPage({ navigate }: { navigate: NavFn }) {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      navigate('home')
    }, 1800)
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* ── LEFT — visual panel ───────────────────────────── */}
      <div className="hidden md:block relative overflow-hidden" style={{ background: 'var(--foreground)' }}>
        <div className="stripe-pattern absolute inset-0 opacity-10" />
        <img
          src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=900&h=1200&fit=crop&auto=format"
          alt="90s street fashion"
          className="w-full h-full object-cover absolute inset-0"
          style={{ mixBlendMode: 'multiply', opacity: 0.5, filter: 'sepia(30%)' }}
        />
        <div className="relative z-10 flex flex-col justify-between h-full p-10">
          <button onClick={() => navigate('home')} className="flex items-center gap-2.5">
            <CassetteIcon color="#F5EDD9" />
            <span className="font-display text-2xl" style={{ color: '#F5EDD9', letterSpacing: '0.22em' }}>RELIK</span>
          </button>

          <div>
            <p className="font-mono text-xs mb-4" style={{ color: 'var(--accent)', letterSpacing: '0.22em' }}>— SISI A</p>
            <blockquote className="font-display mb-3" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: '#F5EDD9', lineHeight: '0.95' }}>
              "KETIKA<br/>PAKAIAN<br/>MASIH<br/>PUNYA JIWA."
            </blockquote>
            <div className="mt-5 flex gap-1.5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-0.5 rounded-full transition-all" style={{ width: i === 2 ? 28 : 8, background: i === 2 ? 'var(--primary)' : 'rgba(240,232,214,0.3)' }} />
              ))}
            </div>
          </div>

          <p className="font-mono text-xs" style={{ color: 'rgba(245,237,217,0.2)', letterSpacing: '0.2em' }}>EST. 1994 — RELIK STREETWEAR</p>
        </div>
      </div>

      {/* ── RIGHT — form ──────────────────────────────────── */}
      <div className="flex items-center justify-center px-6 py-20" style={{ background: 'var(--background)' }}>
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="md:hidden flex items-center gap-2.5 mb-8">
            <CassetteIcon color="var(--primary)" />
            <span className="font-display text-xl" style={{ color: 'var(--foreground)', letterSpacing: '0.22em' }}>RELIK</span>
          </div>

          <p className="font-mono text-xs uppercase mb-2" style={{ color: 'var(--primary)', letterSpacing: '0.22em' }}>— Masuk ke Arsip</p>
          <h1 className="font-display mb-2" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', lineHeight: '0.92', color: 'var(--foreground)' }}>
            SELAMAT<br/>DATANG<br/>KEMBALI.
          </h1>
          <p className="font-body text-sm mb-8" style={{ color: 'var(--muted-foreground)' }}>
            Belum punya akun?{' '}
            <button
              onClick={() => navigate('register')}
              className="font-condensed font-700 uppercase underline underline-offset-2 hover:opacity-70 transition-opacity"
              style={{ color: 'var(--primary)', letterSpacing: '0.06em' }}
            >
              Daftar
            </button>
          </p>

          {/* Social login */}
          <div className="grid grid-cols-3 gap-2 mb-5">
            {[
              { label: 'Google',   icon: <GoogleIcon /> },
              { label: 'Facebook', icon: <FacebookIcon /> },
              { label: 'TikTok',  icon: <TikTokIcon /> },
            ].map(({ label, icon }) => (
              <button
                key={label}
                type="button"
                className="flex flex-col items-center gap-1.5 py-2.5 border transition-all hover:opacity-80 font-mono text-xs"
                style={{ background: 'var(--card)', border: '1.5px solid var(--border)', color: 'var(--muted-foreground)', letterSpacing: '0.08em' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--foreground)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                {icon}
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
            <span className="font-mono text-xs" style={{ color: 'var(--muted-foreground)' }}>atau</span>
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          </div>

          {submitted ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center border-2 border-[var(--primary)]">
                <span className="font-display text-2xl" style={{ color: 'var(--primary)' }}>✓</span>
              </div>
              <p className="font-condensed font-700 uppercase text-lg" style={{ color: 'var(--foreground)', letterSpacing: '0.08em' }}>Berhasil masuk!</p>
              <p className="font-body text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>Mengalihkan...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="kamu@email.com" required />
              <Field label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" required />

              <div className="text-right -mt-1">
                <button type="button" onClick={() => navigate('forgot-password')} className="font-mono text-xs underline underline-offset-2 hover:opacity-70 transition-opacity" style={{ color: 'var(--muted-foreground)' }}>
                  Lupa password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full font-condensed font-700 uppercase py-4 text-sm transition-opacity hover:opacity-85"
                style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', letterSpacing: '0.16em' }}
              >
                Masuk
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

function Field({ label, type, value, onChange, placeholder, required }: {
  label: string; type: string; value: string
  onChange: (v: string) => void; placeholder: string; required?: boolean
}) {
  return (
    <div>
      <label className="font-mono text-xs uppercase block mb-1.5" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.12em' }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 text-sm font-body border outline-none transition-colors"
        style={{ background: 'var(--card)', color: 'var(--foreground)', border: '1.5px solid var(--border)', borderRadius: 0 }}
        onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
        onBlur={e  => (e.currentTarget.style.borderColor = 'var(--border)')}
      />
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
      <path d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 2.9l5.7-5.7C34 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.9z" fill="#FFC107"/>
      <path d="M6.3 14.7l6.6 4.8C14.6 16.1 19 13 24 13c3.1 0 5.8 1.1 8 2.9l5.7-5.7C34 6.5 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z" fill="#FF3D00"/>
      <path d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.5 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8H6.3C9.7 35.5 16.3 44 24 44z" fill="#4CAF50"/>
      <path d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.3 5.5l6.2 5.2C36.9 40 44 35 44 24c0-1.3-.1-2.7-.4-3.9z" fill="#1976D2"/>
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" fill="#1877F2"/>
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.24 8.24 0 004.84 1.55V6.84a4.85 4.85 0 01-1.07-.15z" fill="var(--foreground)"/>
    </svg>
  )
}
