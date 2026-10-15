"use client"
import type { NavFn } from '@/types/page'

export default function NotFoundPage({ navigate }: { navigate: NavFn }) {
    return (
        <div className="min-h-screen pt-[62px]" style={{ background: 'var(--background)' }}>
            <div className="border-b-4 border-[var(--foreground)]">
                <div
                    className="flex items-center justify-between gap-4 border-b-2 border-[var(--foreground)] px-6 py-2"
                    style={{ background: 'var(--foreground)' }}
                >
                    <p
                        className="font-mono text-xs uppercase"
                        style={{ color: 'var(--accent)', letterSpacing: '0.18em' }}
                    >
            // ERROR LOG — ARSIP TIDAK TERBACA
                    </p>
                    <p
                        className="hidden font-mono text-xs uppercase sm:block"
                        style={{ color: 'var(--muted)', letterSpacing: '0.12em' }}
                    >
                        KODE: 404
                    </p>
                </div>

                <section className="grid min-h-[calc(100vh-96px)] grid-cols-1 lg:grid-cols-[1fr_2px_0.82fr]">
                    <div className="flex flex-col justify-between p-7 md:p-12 lg:p-16">
                        <div>
                            <p
                                className="mb-5 font-mono text-xs uppercase"
                                style={{ color: 'var(--primary)', letterSpacing: '0.2em' }}
                            >
                                SIDE A / TRACK TIDAK DITEMUKAN
                            </p>
                            <h1
                                className="font-display leading-none"
                                style={{
                                    color: 'var(--foreground)',
                                    fontSize: 'clamp(8rem, 25vw, 18rem)',
                                    letterSpacing: '-0.04em',
                                    lineHeight: 0.75,
                                }}
                            >
                                4<span style={{ color: 'var(--primary)' }}>0</span>4
                            </h1>
                        </div>

                        <div className="mt-16 max-w-xl border-t-4 border-[var(--foreground)] pt-6">
                            <h2
                                className="font-display text-4xl uppercase leading-none md:text-5xl"
                                style={{ color: 'var(--foreground)' }}
                            >
                                KASETNYA HILANG.
                            </h2>
                            <p
                                className="mt-4 max-w-md font-body text-sm leading-relaxed"
                                style={{ color: 'var(--muted-foreground)' }}
                            >
                                Halaman yang kamu cari mungkin sudah dipindahkan, dihapus, atau tidak pernah masuk ke arsip RELIK.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <button
                                    onClick={() => navigate('home')}
                                    className="border-2 border-[var(--foreground)] px-7 py-3 font-condensed text-sm font-bold uppercase transition-opacity hover:opacity-80"
                                    style={{
                                        background: 'var(--primary)',
                                        color: 'var(--primary-foreground)',
                                        letterSpacing: '0.14em',
                                    }}
                                >
                                    Kembali ke Home
                                </button>
                                <button
                                    onClick={() => navigate('catalog')}
                                    className="border-2 border-[var(--foreground)] px-7 py-3 font-condensed text-sm font-bold uppercase transition-colors hover:bg-[var(--muted)]"
                                    style={{ color: 'var(--foreground)', letterSpacing: '0.14em' }}
                                >
                                    Buka Katalog
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="hidden bg-[var(--foreground)] lg:block" />

                    <div
                        className="relative flex min-h-[420px] items-center justify-center overflow-hidden border-t-4 border-[var(--foreground)] p-8 lg:border-t-0"
                        style={{ background: 'var(--accent)' }}
                    >
                        <div
                            className="absolute inset-0 opacity-20 stripe-pattern"
                            aria-hidden="true"
                        />
                        <div className="relative w-full max-w-md -rotate-3">
                            <div
                                className="border-4 border-[var(--foreground)] p-5 shadow-[12px_12px_0_var(--primary)]"
                                style={{ background: 'var(--card)' }}
                            >
                                <div className="mb-4 flex items-center justify-between border-b-2 border-[var(--foreground)] pb-3">
                                    <span
                                        className="font-mono text-xs uppercase"
                                        style={{ color: 'var(--muted-foreground)', letterSpacing: '0.14em' }}
                                    >
                                        RELIK MIXTAPE
                                    </span>
                                    <span className="font-display text-2xl" style={{ color: 'var(--primary)' }}>
                                        SIDE B
                                    </span>
                                </div>

                                <svg
                                    viewBox="0 0 440 270"
                                    className="h-auto w-full"
                                    role="img"
                                    aria-label="Ilustrasi kaset RELIK dengan pita terlepas"
                                >
                                    <rect x="22" y="20" width="396" height="230" rx="12" fill="var(--primary)" stroke="var(--foreground)" strokeWidth="8" />
                                    <rect x="54" y="48" width="332" height="108" rx="5" fill="var(--background)" stroke="var(--foreground)" strokeWidth="6" />
                                    <path d="M74 76H365" stroke="var(--foreground)" strokeWidth="5" />
                                    <text x="77" y="103" fill="var(--foreground)" fontFamily="Space Mono, monospace" fontSize="14" fontWeight="700">TRACK NOT FOUND</text>
                                    <circle cx="130" cy="130" r="28" fill="var(--accent)" stroke="var(--foreground)" strokeWidth="6" />
                                    <circle cx="310" cy="130" r="28" fill="var(--accent)" stroke="var(--foreground)" strokeWidth="6" />
                                    <circle cx="130" cy="130" r="9" fill="var(--background)" stroke="var(--foreground)" strokeWidth="4" />
                                    <circle cx="310" cy="130" r="9" fill="var(--background)" stroke="var(--foreground)" strokeWidth="4" />
                                    <path d="M158 130H282" stroke="var(--foreground)" strokeWidth="5" strokeDasharray="8 8" />
                                    <path d="M105 196L124 168H316L337 196" fill="var(--secondary)" stroke="var(--foreground)" strokeWidth="6" />
                                    <circle cx="151" cy="193" r="8" fill="var(--background)" stroke="var(--foreground)" strokeWidth="4" />
                                    <circle cx="289" cy="193" r="8" fill="var(--background)" stroke="var(--foreground)" strokeWidth="4" />
                                    <path d="M310 130C390 140 372 235 432 226" fill="none" stroke="var(--foreground)" strokeWidth="5" strokeLinecap="round" />
                                </svg>

                                <div className="mt-4 grid grid-cols-2 gap-3 border-t-2 border-[var(--foreground)] pt-3">
                                    <p className="font-mono text-xs" style={{ color: 'var(--muted-foreground)' }}>
                                        NO. 404—94
                                    </p>
                                    <p className="text-right font-mono text-xs" style={{ color: 'var(--muted-foreground)' }}>
                                        JKT / ID
                                    </p>
                                </div>
                            </div>
                        </div>

                        <p
                            className="absolute bottom-4 right-5 font-mono text-xs uppercase"
                            style={{ color: 'var(--foreground)', letterSpacing: '0.16em' }}
                        >
                            PUTAR BALIK / REWIND
                        </p>
                    </div>
                </section>
            </div>
        </div>
    )
}