import { useState } from 'react'
import type { NavFn } from '@/types/page'
import { PROVINCES } from '@/types/page'
import { CassetteIcon } from '@/components/ui/CassetteIcon'

type FormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  province: string
  city: string
  postalCode: string
  agree: boolean
}

const EMPTY: FormData = {
  firstName: '', lastName: '', email: '', phone: '',
  address: '', province: '', city: '', postalCode: '', agree: false,
}

export default function RegisterPage({ navigate }: { navigate: NavFn }) {
  const [form, setForm]       = useState<FormData>(EMPTY)
  const [errors, setErrors]   = useState<Partial<Record<keyof FormData, string>>>({})
  const [submitted, setSubmitted] = useState(false)

  const set = (field: keyof FormData) => (val: string | boolean) =>
    setForm(f => ({ ...f, [field]: val }))

  function validate(): boolean {
    const e: Partial<Record<keyof FormData, string>> = {}
    if (!form.firstName.trim())  e.firstName  = 'Nama depan wajib diisi'
    if (!form.lastName.trim())   e.lastName   = 'Nama belakang wajib diisi'
    if (!form.email.includes('@')) e.email    = 'Email tidak valid'
    if (form.phone.length < 8)   e.phone      = 'Nomor telepon minimal 8 digit'
    if (!form.address.trim())    e.address    = 'Alamat wajib diisi'
    if (!form.province)          e.province   = 'Pilih provinsi'
    if (!form.city.trim())       e.city       = 'Kota/kabupaten wajib diisi'
    if (form.postalCode.length < 5) e.postalCode = 'Kode pos minimal 5 digit'
    if (!form.agree)             e.agree      = 'Kamu harus menyetujui syarat & ketentuan'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setSubmitted(true)
    setTimeout(() => navigate('home'), 2200)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--background)' }}>
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border-2 border-[var(--primary)]">
            <span className="font-display text-3xl" style={{ color: 'var(--primary)' }}>✓</span>
          </div>
          <h2 className="font-display text-4xl mb-3" style={{ color: 'var(--foreground)', lineHeight: '0.95' }}>SELAMAT<br/>DATANG!</h2>
          <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
            Akun kamu berhasil dibuat. Kamu kini bagian dari arsip RELIK.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: 'var(--primary)', animationDelay: '0ms' }} />
            <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: 'var(--primary)', animationDelay: '150ms' }} />
            <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: 'var(--primary)', animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[420px_1fr]">

      {/* ── LEFT PANEL ─────────────────────────────────── */}
      <div className="hidden lg:flex flex-col relative overflow-hidden" style={{ background: 'var(--foreground)' }}>
        <div className="stripe-pattern absolute inset-0 opacity-10" />
        <img
          src="https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?w=840&h=1200&fit=crop&auto=format"
          alt="90s streetwear"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ mixBlendMode: 'multiply', opacity: 0.45, filter: 'sepia(25%)' }}
        />

        <div className="relative z-10 flex flex-col justify-between h-full p-10">
          {/* Logo */}
          <button onClick={() => navigate('home')} className="flex items-center gap-2.5">
            <CassetteIcon color="#F5EDD9" />
            <span className="font-display text-2xl" style={{ color: '#F5EDD9', letterSpacing: '0.22em' }}>RELIK</span>
          </button>

          {/* Middle copy */}
          <div>
            <p className="font-mono text-xs mb-4" style={{ color: 'var(--accent)', letterSpacing: '0.22em' }}>— BERGABUNG</p>
            <h2 className="font-display mb-4" style={{ fontSize: 'clamp(2.4rem, 3.5vw, 3.5rem)', color: '#F5EDD9', lineHeight: '0.92' }}>
              JADILAH<br/>BAGIAN<br/>DARI ARSIP.
            </h2>
            <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(245,237,217,0.6)', maxWidth: '280px' }}>
              Akses koleksi terbatas, undangan event eksklusif, dan pengiriman lebih cepat untuk member RELIK.
            </p>

            {/* Benefits */}
            <div className="mt-8 space-y-3">
              {['Akses koleksi limited sebelum umum', 'Undangan pop-up & event eksklusif', 'Notifikasi restock langsung ke kamu'].map((b) => (
                <div key={b} className="flex items-start gap-3">
                  <span className="mt-1 w-4 h-4 shrink-0 flex items-center justify-center border border-[var(--accent)]">
                    <span className="font-mono text-xs" style={{ color: 'var(--accent)', fontSize: '0.5rem' }}>✓</span>
                  </span>
                  <p className="font-body text-sm" style={{ color: 'rgba(245,237,217,0.7)' }}>{b}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <p className="font-mono text-xs" style={{ color: 'rgba(245,237,217,0.25)', letterSpacing: '0.18em' }}>EST. 1994 — RELIK STREETWEAR</p>
        </div>
      </div>

      {/* ── RIGHT PANEL / FORM ─────────────────────────── */}
      <div className="px-6 py-10 lg:py-14 overflow-y-auto" style={{ background: 'var(--background)' }}>
        <div className="max-w-xl mx-auto">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <CassetteIcon color="var(--primary)" />
            <span className="font-display text-xl" style={{ color: 'var(--foreground)', letterSpacing: '0.22em' }}>RELIK</span>
          </div>

          <p className="font-mono text-xs uppercase mb-2" style={{ color: 'var(--primary)', letterSpacing: '0.22em' }}>— Buat Akun</p>
          <h1 className="font-display mb-2" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', lineHeight: '0.92', color: 'var(--foreground)' }}>
            DAFTAR<br/>SEKARANG.
          </h1>
          <p className="font-body text-sm mb-8" style={{ color: 'var(--muted-foreground)' }}>
            Sudah punya akun?{' '}
            <button onClick={() => navigate('login')} className="font-condensed font-700 uppercase underline underline-offset-2 hover:opacity-70 transition-opacity" style={{ color: 'var(--primary)', letterSpacing: '0.06em' }}>
              Masuk
            </button>
          </p>

          {/* ── SOCIAL SIGNUP ──────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
            <SocialBtn icon={<GoogleIcon />} label="Google"   onClick={() => {}} />
            <SocialBtn icon={<FacebookIcon />} label="Facebook" onClick={() => {}} />
            <SocialBtn icon={<TikTokIcon />}   label="TikTok"   onClick={() => {}} />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-7">
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
            <span className="font-mono text-xs" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.08em' }}>atau daftar manual</span>
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          </div>

          {/* ── FORM ───────────────────────────────── */}
          <form onSubmit={handleSubmit} noValidate>
            {/* Row: nama depan + belakang */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <Field label="Nama Depan" type="text" value={form.firstName} onChange={v => set('firstName')(v)}
                placeholder="Budi" error={errors.firstName} required />
              <Field label="Nama Belakang" type="text" value={form.lastName} onChange={v => set('lastName')(v)}
                placeholder="Santoso" error={errors.lastName} required />
            </div>

            {/* Email */}
            <div className="mb-3">
              <Field label="Email" type="email" value={form.email} onChange={v => set('email')(v)}
                placeholder="budi@email.com" error={errors.email} required />
            </div>

            {/* Phone */}
            <div className="mb-3">
              <Field label="Nomor Telepon" type="tel" value={form.phone} onChange={v => set('phone')(v)}
                placeholder="08xxxxxxxxxx" error={errors.phone} required />
            </div>

            {/* Divider label */}
            <p className="font-mono text-xs uppercase mb-3 mt-5 pt-4 border-t border-[var(--border)]" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.18em' }}>
              — Alamat Pengiriman
            </p>

            {/* Address */}
            <div className="mb-3">
              <label className="font-mono text-xs uppercase block mb-1.5" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.12em' }}>
                Alamat Rumah <span style={{ color: 'var(--primary)' }}>*</span>
              </label>
              <textarea
                value={form.address}
                onChange={e => set('address')(e.target.value)}
                placeholder="Jl. Merdeka No. 12, RT 03/RW 05"
                rows={2}
                className="w-full px-4 py-3 text-sm font-body border outline-none resize-none transition-colors"
                style={{ background: 'var(--card)', color: 'var(--foreground)', border: '1.5px solid ' + (errors.address ? 'var(--primary)' : 'var(--border)'), borderRadius: 0 }}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
                onBlur={e  => (e.currentTarget.style.borderColor = errors.address ? 'var(--primary)' : 'var(--border)')}
              />
              {errors.address && <p className="font-mono text-xs mt-1" style={{ color: 'var(--primary)' }}>{errors.address}</p>}
            </div>

            {/* Province */}
            <div className="mb-3">
              <label className="font-mono text-xs uppercase block mb-1.5" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.12em' }}>
                Provinsi <span style={{ color: 'var(--primary)' }}>*</span>
              </label>
              <select
                value={form.province}
                onChange={e => set('province')(e.target.value)}
                className="w-full px-4 py-3 text-sm font-body border outline-none cursor-pointer"
                style={{ background: 'var(--card)', color: form.province ? 'var(--foreground)' : 'var(--muted-foreground)', border: '1.5px solid ' + (errors.province ? 'var(--primary)' : 'var(--border)'), borderRadius: 0 }}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
                onBlur={e  => (e.currentTarget.style.borderColor = errors.province ? 'var(--primary)' : 'var(--border)')}
              >
                <option value="" disabled>Pilih Provinsi</option>
                {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              {errors.province && <p className="font-mono text-xs mt-1" style={{ color: 'var(--primary)' }}>{errors.province}</p>}
            </div>

            {/* City + Postal */}
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_140px] gap-3 mb-5">
              <Field label="Kota / Kabupaten" type="text" value={form.city} onChange={v => set('city')(v)}
                placeholder="Jakarta Selatan" error={errors.city} required />
              <Field label="Kode Pos" type="text" value={form.postalCode} onChange={v => set('postalCode')(v.replace(/\D/g, ''))}
                placeholder="12345" error={errors.postalCode} required maxLength={5} />
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer mb-6">
              <button
                type="button"
                role="checkbox"
                aria-checked={form.agree}
                onClick={() => set('agree')(!form.agree)}
                className="mt-0.5 shrink-0 w-4 h-4 border flex items-center justify-center transition-colors"
                style={{ background: form.agree ? 'var(--primary)' : 'transparent', border: '1.5px solid ' + (errors.agree ? 'var(--primary)' : 'var(--border)') }}
              >
                {form.agree && <span className="text-white font-mono" style={{ fontSize: '0.55rem', lineHeight: 1 }}>✓</span>}
              </button>
              <span className="font-body text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                Saya menyetujui{' '}
                <span className="underline underline-offset-2 cursor-pointer" style={{ color: 'var(--foreground)' }}>Syarat & Ketentuan</span>
                {' '}serta{' '}
                <span className="underline underline-offset-2 cursor-pointer" style={{ color: 'var(--foreground)' }}>Kebijakan Privasi</span>
                {' '}RELIK.
              </span>
            </label>
            {errors.agree && <p className="font-mono text-xs -mt-4 mb-4" style={{ color: 'var(--primary)' }}>{errors.agree}</p>}

            {/* Submit */}
            <button
              type="submit"
              className="w-full font-condensed font-700 uppercase py-4 text-sm transition-opacity hover:opacity-85"
              style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', letterSpacing: '0.16em' }}
            >
              Buat Akun RELIK
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

/* ── Field helper ─────────────────────────────────────────── */
function Field({ label, type, value, onChange, placeholder, error, required, maxLength }: {
  label: string; type: string; value: string
  onChange: (v: string) => void; placeholder: string
  error?: string; required?: boolean; maxLength?: number
}) {
  return (
    <div>
      <label className="font-mono text-xs uppercase block mb-1.5" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.12em' }}>
        {label} {required && <span style={{ color: 'var(--primary)' }}>*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full px-4 py-3 text-sm font-body border outline-none transition-colors"
        style={{ background: 'var(--card)', color: 'var(--foreground)', border: '1.5px solid ' + (error ? 'var(--primary)' : 'var(--border)'), borderRadius: 0 }}
        onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
        onBlur={e  => (e.currentTarget.style.borderColor = error ? 'var(--primary)' : 'var(--border)')}
      />
      {error && <p className="font-mono text-xs mt-1" style={{ color: 'var(--primary)' }}>{error}</p>}
    </div>
  )
}

/* ── Social button ─────────────────────────────────────────── */
function SocialBtn({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center gap-2 py-2.5 px-4 border transition-all duration-150 font-condensed font-700 uppercase text-xs hover:opacity-80"
      style={{ background: 'var(--card)', color: 'var(--foreground)', border: '1.5px solid var(--border)', letterSpacing: '0.1em' }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--foreground)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

/* ── Brand icons ───────────────────────────────────────────── */
function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" fill="none">
      <path d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 2.9l5.7-5.7C34 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.9z" fill="#FFC107"/>
      <path d="M6.3 14.7l6.6 4.8C14.6 16.1 19 13 24 13c3.1 0 5.8 1.1 8 2.9l5.7-5.7C34 6.5 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z" fill="#FF3D00"/>
      <path d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.5 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8H6.3C9.7 35.5 16.3 44 24 44z" fill="#4CAF50"/>
      <path d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.3 5.5l6.2 5.2C36.9 40 44 35 44 24c0-1.3-.1-2.7-.4-3.9z" fill="#1976D2"/>
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" fill="#1877F2"/>
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.24 8.24 0 004.84 1.55V6.84a4.85 4.85 0 01-1.07-.15z" fill="var(--foreground)"/>
    </svg>
  )
}
