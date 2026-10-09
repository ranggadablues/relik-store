import { useState } from 'react'
import type { NavFn } from '@/types/page'
import { formatPrice } from '@/types/page'
import { ALL_PRODUCTS, getReviews } from '@/data/products'
import { Stars } from './CatalogPage'

export default function ProductDetailPage({ productId, navigate }: { productId: number; navigate: NavFn }) {
  const product = ALL_PRODUCTS.find(p => p.id === productId) ?? ALL_PRODUCTS[0]
  const related = ALL_PRODUCTS.filter(p => p.tag === product.tag && p.id !== product.id).slice(0, 4)
  const reviews  = getReviews(product.id)

  const [selectedImg,  setSelectedImg]  = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [qty,          setQty]          = useState(1)
  const [sizeError,    setSizeError]    = useState(false)
  const [addedToCart,  setAddedToCart]  = useState(false)
  const [checkedOut,   setCheckedOut]   = useState(false)
  const [tab,          setTab]          = useState<'desc' | 'material' | 'care'>('desc')

  // Review form
  const [reviewName,    setReviewName]    = useState('')
  const [reviewRating,  setReviewRating]  = useState(0)
  const [reviewHover,   setReviewHover]   = useState(0)
  const [reviewComment, setReviewComment] = useState('')
  const [reviewDone,    setReviewDone]    = useState(false)
  const [localReviews,  setLocalReviews]  = useState(reviews)

  const avgRating = localReviews.reduce((s, r) => s + r.rating, 0) / localReviews.length

  function handleAddCart() {
    if (!selectedSize) { setSizeError(true); return }
    setSizeError(false)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  function handleCheckout() {
    if (!selectedSize) { setSizeError(true); return }
    setSizeError(false)
    setCheckedOut(true)
  }

  function handleReviewSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!reviewName.trim() || reviewRating === 0 || !reviewComment.trim()) return
    const newReview = {
      id: localReviews.length + 1,
      name: reviewName,
      avatar: reviewName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2),
      rating: reviewRating,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      comment: reviewComment,
      verified: false,
    }
    setLocalReviews(prev => [newReview, ...prev])
    setReviewDone(true)
    setReviewName(''); setReviewRating(0); setReviewComment('')
    setTimeout(() => setReviewDone(false), 3000)
  }

  if (checkedOut) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 pt-24" style={{ background: 'var(--background)' }}>
        <div className="max-w-sm w-full text-center">
          <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border-2" style={{ borderColor: 'var(--primary)' }}>
            <span className="font-display text-3xl" style={{ color: 'var(--primary)' }}>✓</span>
          </div>
          <h2 className="font-display mb-3" style={{ fontSize: '3rem', lineHeight: '0.92', color: 'var(--foreground)' }}>PESANAN<br/>DITERIMA!</h2>
          <p className="font-body text-sm leading-relaxed mb-2" style={{ color: 'var(--muted-foreground)' }}>
            <strong style={{ color: 'var(--foreground)' }}>{product.name}</strong> · {selectedSize} · {qty} pcs
          </p>
          <p className="font-condensed font-700 text-lg mb-8" style={{ color: 'var(--primary)' }}>
            Total: {formatPrice(product.price * qty)}
          </p>
          <div className="flex flex-col gap-3">
            <button onClick={() => { setCheckedOut(false) }} className="font-condensed font-700 uppercase py-3 text-sm transition-opacity hover:opacity-80" style={{ background: 'var(--primary)', color: '#F5EDD9', letterSpacing: '0.14em' }}>
              Lanjut Belanja
            </button>
            <button onClick={() => navigate('catalog')} className="font-condensed font-600 uppercase py-3 text-sm border transition-opacity hover:opacity-80" style={{ border: '1.5px solid var(--border)', color: 'var(--muted-foreground)', letterSpacing: '0.14em' }}>
              Kembali ke Katalog
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20" style={{ background: 'var(--background)' }}>

      {/* ── BREADCRUMB ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-2">
        <button onClick={() => navigate('catalog')} className="font-mono text-xs hover:opacity-60 transition-opacity" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.1em' }}>KATALOG</button>
        <span className="font-mono text-xs" style={{ color: 'var(--border)' }}>/</span>
        <span className="font-mono text-xs" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.1em' }}>{product.tag.toUpperCase()}</span>
        <span className="font-mono text-xs" style={{ color: 'var(--border)' }}>/</span>
        <span className="font-mono text-xs" style={{ color: 'var(--foreground)', letterSpacing: '0.1em' }}>{product.name.toUpperCase()}</span>
      </div>

      {/* ── MAIN PRODUCT ───────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-12">

        {/* LEFT — images */}
        <div className="flex flex-col-reverse md:flex-row gap-3">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-2 shrink-0">
            {product.imgs.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImg(i)}
                className="overflow-hidden shrink-0 transition-all duration-150"
                style={{
                  width: 72, height: 88,
                  background: 'var(--muted)',
                  border: `2px solid ${selectedImg === i ? 'var(--primary)' : 'transparent'}`,
                  opacity: selectedImg === i ? 1 : 0.65,
                }}
              >
                <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" style={{ filter: 'sepia(8%)' }} />
              </button>
            ))}
          </div>

          {/* Main image */}
          <div className="relative flex-1 overflow-hidden" style={{ background: 'var(--muted)', minHeight: 460 }}>
            <img
              src={product.imgs[selectedImg]}
              alt={product.name}
              className="w-full h-full object-cover"
              style={{ filter: 'sepia(8%) saturate(92%)', minHeight: 460 }}
            />
            {product.badge && (
              <span className="absolute top-4 left-4 font-mono px-3 py-1.5"
                style={{ background: product.badge === 'NEW' ? 'var(--secondary)' : product.badge === 'LIMITED' ? 'var(--foreground)' : 'var(--primary)', color: '#F5EDD9', letterSpacing: '0.1em', fontSize: '0.7rem' }}>
                {product.badge}
              </span>
            )}
            {/* Stock warning */}
            {product.stock <= 10 && (
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 px-3 py-2" style={{ background: 'rgba(36,26,14,0.85)' }}>
                <span className="w-2 h-2 rounded-full animate-pulse shrink-0" style={{ background: 'var(--accent)' }} />
                <span className="font-mono text-xs" style={{ color: 'var(--accent)', letterSpacing: '0.1em' }}>HAMPIR HABIS — SISA {product.stock} PCS</span>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT — details */}
        <div className="flex flex-col gap-6">
          {/* Tag + name */}
          <div>
            <p className="font-mono text-xs uppercase mb-2" style={{ color: 'var(--primary)', letterSpacing: '0.22em' }}>{product.tag}</p>
            <h1 className="font-display mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: '0.92', color: 'var(--foreground)' }}>
              {product.name.toUpperCase()}
            </h1>

            {/* Rating summary */}
            <div className="flex items-center gap-3">
              <Stars rating={avgRating} size={14} />
              <span className="font-condensed font-700 text-sm" style={{ color: 'var(--foreground)' }}>{avgRating.toFixed(1)}</span>
              <span className="font-mono text-xs" style={{ color: 'var(--muted-foreground)' }}>({localReviews.length} ulasan)</span>
              <a href="#reviews" className="font-mono text-xs underline underline-offset-2 hover:opacity-70 transition-opacity" style={{ color: 'var(--primary)' }}>Lihat semua</a>
            </div>
          </div>

          {/* Price */}
          <div className="py-4 border-y border-[var(--border)]">
            <p className="font-display text-4xl" style={{ color: 'var(--primary)' }}>{formatPrice(product.price)}</p>
            <p className="font-mono text-xs mt-1" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.1em' }}>Belum termasuk ongkos kirim</p>
          </div>

          {/* Size selector */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="font-mono text-xs uppercase" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.14em' }}>Pilih Ukuran</p>
              <button className="font-mono text-xs underline underline-offset-2 hover:opacity-70 transition-opacity" style={{ color: 'var(--muted-foreground)' }}>Panduan Ukuran</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => { setSelectedSize(size); setSizeError(false) }}
                  className="font-condensed font-700 uppercase px-4 py-2.5 text-sm transition-all duration-150 min-w-[48px]"
                  style={{
                    background:   selectedSize === size ? 'var(--foreground)' : 'transparent',
                    color:        selectedSize === size ? 'var(--background)' : 'var(--foreground)',
                    border:       `1.5px solid ${selectedSize === size ? 'var(--foreground)' : 'var(--border)'}`,
                    letterSpacing: '0.1em',
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
            {sizeError && <p className="font-mono text-xs mt-2" style={{ color: 'var(--primary)' }}>Pilih ukuran terlebih dahulu.</p>}
          </div>

          {/* Quantity */}
          <div>
            <p className="font-mono text-xs uppercase mb-3" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.14em' }}>Jumlah</p>
            <div className="flex items-center gap-0">
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center font-condensed font-700 text-lg transition-colors hover:opacity-70"
                style={{ border: '1.5px solid var(--border)', color: 'var(--foreground)' }}
              >−</button>
              <div className="w-14 h-10 flex items-center justify-center font-condensed font-700 text-base border-y border-[var(--border)]" style={{ color: 'var(--foreground)' }}>
                {qty}
              </div>
              <button
                onClick={() => setQty(q => Math.min(product.stock, q + 1))}
                className="w-10 h-10 flex items-center justify-center font-condensed font-700 text-lg transition-colors hover:opacity-70"
                style={{ border: '1.5px solid var(--border)', color: 'var(--foreground)' }}
              >+</button>
              <span className="ml-4 font-mono text-xs" style={{ color: 'var(--muted-foreground)' }}>Stok: {product.stock} pcs</span>
            </div>
          </div>

          {/* Subtotal */}
          <div className="flex items-center justify-between py-3 px-4" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
            <span className="font-mono text-xs uppercase" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.12em' }}>Subtotal</span>
            <span className="font-display text-2xl" style={{ color: 'var(--foreground)' }}>{formatPrice(product.price * qty)}</span>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <button
              onClick={handleCheckout}
              className="w-full font-condensed font-700 uppercase py-4 text-sm transition-opacity hover:opacity-85"
              style={{ background: 'var(--primary)', color: '#F5EDD9', letterSpacing: '0.16em' }}
            >
              Checkout Sekarang
            </button>
            <button
              onClick={handleAddCart}
              className="w-full font-condensed font-700 uppercase py-3.5 text-sm border transition-all duration-200"
              style={{
                background: addedToCart ? 'var(--secondary)' : 'transparent',
                color: addedToCart ? '#F5EDD9' : 'var(--foreground)',
                border: `1.5px solid ${addedToCart ? 'var(--secondary)' : 'var(--border)'}`,
                letterSpacing: '0.16em',
              }}
            >
              {addedToCart ? '✓ Ditambahkan ke Keranjang' : '+ Tambah ke Keranjang'}
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            {[
              { icon: '🚚', label: 'Gratis Ongkir', sub: 'Min. Rp 500rb' },
              { icon: '↩️', label: 'Retur 14 Hari', sub: 'Syarat berlaku' },
              { icon: '🔒', label: 'Pembayaran Aman', sub: 'Enkripsi SSL' },
            ].map(b => (
              <div key={b.label} className="text-center px-2 py-3" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
                <div className="text-xl mb-1">{b.icon}</div>
                <p className="font-condensed font-700 uppercase text-xs leading-tight" style={{ color: 'var(--foreground)', letterSpacing: '0.06em' }}>{b.label}</p>
                <p className="font-mono mt-0.5" style={{ color: 'var(--muted-foreground)', fontSize: '0.58rem' }}>{b.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PRODUCT INFO TABS ──────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-10 border-t border-[var(--border)]">
        <div className="flex gap-0 mb-6 border-b border-[var(--border)]">
          {([['desc', 'Deskripsi'], ['material', 'Material'], ['care', 'Perawatan']] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className="font-condensed font-700 uppercase text-sm px-5 py-3 transition-all"
              style={{
                color: tab === key ? 'var(--primary)' : 'var(--muted-foreground)',
                borderBottom: `2px solid ${tab === key ? 'var(--primary)' : 'transparent'}`,
                marginBottom: -1,
                letterSpacing: '0.12em',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="max-w-2xl">
          {tab === 'desc' && (
            <p className="font-body text-base leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{product.longDesc}</p>
          )}
          {tab === 'material' && (
            <div className="space-y-3">
              <div className="flex gap-4">
                <span className="font-mono text-xs uppercase w-20 shrink-0 pt-0.5" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.1em' }}>Bahan</span>
                <p className="font-body text-sm" style={{ color: 'var(--foreground)' }}>{product.material}</p>
              </div>
              <div className="flex gap-4">
                <span className="font-mono text-xs uppercase w-20 shrink-0 pt-0.5" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.1em' }}>Berat</span>
                <p className="font-body text-sm" style={{ color: 'var(--foreground)' }}>{product.weight}</p>
              </div>
            </div>
          )}
          {tab === 'care' && (
            <ul className="space-y-2">
              {product.care.map((c, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="shrink-0 w-5 h-5 flex items-center justify-center border mt-0.5" style={{ border: '1px solid var(--border)' }}>
                    <span className="font-mono" style={{ fontSize: '0.5rem', color: 'var(--primary)' }}>✓</span>
                  </span>
                  <span className="font-body text-sm" style={{ color: 'var(--muted-foreground)' }}>{c}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* ── REVIEWS ────────────────────────────────────── */}
      <div id="reviews" className="border-t border-[var(--border)]" style={{ background: 'var(--card)' }}>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">

            {/* Rating summary */}
            <div>
              <p className="font-mono text-xs uppercase mb-5" style={{ color: 'var(--primary)', letterSpacing: '0.22em' }}>— Ulasan Pembeli</p>
              <div className="text-center py-6 border border-[var(--border)] mb-6" style={{ background: 'var(--background)' }}>
                <p className="font-display" style={{ fontSize: '4rem', lineHeight: 1, color: 'var(--foreground)' }}>{avgRating.toFixed(1)}</p>
                <div className="flex justify-center mt-2 mb-1">
                  <Stars rating={avgRating} size={16} />
                </div>
                <p className="font-mono text-xs" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.1em' }}>dari {localReviews.length} ulasan</p>
              </div>

              {/* Rating bars */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map(star => {
                  const count = localReviews.filter(r => r.rating === star).length
                  const pct   = localReviews.length ? (count / localReviews.length) * 100 : 0
                  return (
                    <div key={star} className="flex items-center gap-2">
                      <span className="font-mono text-xs w-3 shrink-0" style={{ color: 'var(--muted-foreground)' }}>{star}</span>
                      <div className="flex-1 h-1.5 overflow-hidden" style={{ background: 'var(--muted)' }}>
                        <div className="h-full transition-all" style={{ width: `${pct}%`, background: 'var(--accent)' }} />
                      </div>
                      <span className="font-mono text-xs w-6 text-right shrink-0" style={{ color: 'var(--muted-foreground)' }}>{count}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Review list + form */}
            <div>
              {/* Existing reviews */}
              <div className="space-y-5 mb-10">
                {localReviews.map(r => (
                  <div key={r.id} className="p-5 border border-[var(--border)]" style={{ background: 'var(--background)' }}>
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className="w-9 h-9 shrink-0 flex items-center justify-center font-condensed font-700 text-sm" style={{ background: 'var(--primary)', color: '#F5EDD9' }}>
                        {r.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                          <div className="flex items-center gap-2">
                            <span className="font-condensed font-700 text-sm" style={{ color: 'var(--foreground)' }}>{r.name}</span>
                            {r.verified && (
                              <span className="font-mono px-1.5 py-0.5" style={{ background: 'rgba(122,142,106,0.15)', color: 'var(--secondary)', fontSize: '0.55rem', letterSpacing: '0.08em', border: '1px solid var(--secondary)' }}>VERIFIED</span>
                            )}
                          </div>
                          <span className="font-mono text-xs" style={{ color: 'var(--muted-foreground)' }}>{r.date}</span>
                        </div>
                        <div className="mb-2">
                          <Stars rating={r.rating} size={11} />
                        </div>
                        <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{r.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Write review form */}
              <div className="border border-[var(--border)] p-6" style={{ background: 'var(--background)' }}>
                <p className="font-mono text-xs uppercase mb-5" style={{ color: 'var(--primary)', letterSpacing: '0.2em' }}>— Tulis Ulasan</p>

                {reviewDone ? (
                  <div className="text-center py-6">
                    <span className="font-display text-3xl" style={{ color: 'var(--secondary)' }}>✓</span>
                    <p className="font-condensed font-700 uppercase mt-2" style={{ color: 'var(--foreground)', letterSpacing: '0.1em' }}>Ulasan berhasil dikirim!</p>
                    <p className="font-body text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>Terima kasih sudah berbagi pengalaman.</p>
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    {/* Star picker */}
                    <div>
                      <p className="font-mono text-xs uppercase mb-2" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.14em' }}>Rating *</p>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(i => (
                          <button
                            type="button"
                            key={i}
                            onMouseEnter={() => setReviewHover(i)}
                            onMouseLeave={() => setReviewHover(0)}
                            onClick={() => setReviewRating(i)}
                          >
                            <svg width="24" height="24" viewBox="0 0 12 12" fill="none">
                              <polygon
                                points="6,1 7.5,4.5 11,4.8 8.5,7 9.3,11 6,9 2.7,11 3.5,7 1,4.8 4.5,4.5"
                                fill={(reviewHover || reviewRating) >= i ? 'var(--accent)' : 'var(--muted)'}
                              />
                            </svg>
                          </button>
                        ))}
                        {reviewRating > 0 && (
                          <span className="font-condensed font-700 text-sm ml-2" style={{ color: 'var(--foreground)' }}>
                            {['', 'Sangat Buruk', 'Buruk', 'Cukup', 'Bagus', 'Sangat Bagus'][reviewRating]}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Name */}
                    <div>
                      <label className="font-mono text-xs uppercase block mb-1.5" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.12em' }}>Nama *</label>
                      <input
                        type="text"
                        value={reviewName}
                        onChange={e => setReviewName(e.target.value)}
                        placeholder="Nama kamu"
                        className="w-full px-4 py-3 text-sm font-body border outline-none"
                        style={{ background: 'var(--card)', color: 'var(--foreground)', border: '1.5px solid var(--border)', borderRadius: 0 }}
                        onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
                        onBlur={e  => (e.currentTarget.style.borderColor = 'var(--border)')}
                      />
                    </div>

                    {/* Comment */}
                    <div>
                      <label className="font-mono text-xs uppercase block mb-1.5" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.12em' }}>Ulasan *</label>
                      <textarea
                        value={reviewComment}
                        onChange={e => setReviewComment(e.target.value)}
                        placeholder="Bagikan pengalaman kamu dengan produk ini..."
                        rows={3}
                        className="w-full px-4 py-3 text-sm font-body border outline-none resize-none"
                        style={{ background: 'var(--card)', color: 'var(--foreground)', border: '1.5px solid var(--border)', borderRadius: 0 }}
                        onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
                        onBlur={e  => (e.currentTarget.style.borderColor = 'var(--border)')}
                      />
                    </div>

                    <button
                      type="submit"
                      className="font-condensed font-700 uppercase px-8 py-3 text-sm transition-opacity hover:opacity-85"
                      style={{ background: 'var(--foreground)', color: '#F5EDD9', letterSpacing: '0.14em' }}
                    >
                      Kirim Ulasan
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── RELATED PRODUCTS ───────────────────────────── */}
      {related.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 py-12 border-t border-[var(--border)]">
          <p className="font-mono text-xs uppercase mb-2" style={{ color: 'var(--primary)', letterSpacing: '0.22em' }}>— Produk Terkait</p>
          <h2 className="font-display mb-8" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', lineHeight: '0.92', color: 'var(--foreground)' }}>
            LAINNYA DARI<br/>{product.tag.toUpperCase()}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map(p => (
              <div
                key={p.id}
                className="group cursor-pointer"
                onClick={() => { navigate('product', p.id); window.scrollTo(0, 0) }}
              >
                <div className="relative overflow-hidden aspect-[3/4]" style={{ background: 'var(--muted)' }}>
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" style={{ filter: 'sepia(10%)' }} />
                  {p.badge && (
                    <span className="absolute top-2 left-2 font-mono px-2 py-0.5" style={{ background: 'var(--primary)', color: '#F5EDD9', fontSize: '0.6rem', letterSpacing: '0.1em' }}>{p.badge}</span>
                  )}
                </div>
                <div className="mt-2.5">
                  <div className="flex items-center gap-1 mb-0.5">
                    <Stars rating={p.rating} size={10} />
                  </div>
                  <h3 className="font-condensed font-700 uppercase text-sm leading-tight" style={{ color: 'var(--foreground)', letterSpacing: '0.04em' }}>{p.name}</h3>
                  <p className="font-condensed font-700 text-sm mt-1" style={{ color: 'var(--primary)' }}>{formatPrice(p.price)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
