export type Page = 'home' | 'login' | 'register' | 'event' | 'catalog' | 'product' | 'forgot-password'
export type NavFn = (page: Page, productId?: number) => void

export const ROUTE_MAP: Record<Page, string> = {
  home: '/',
  catalog: '/katalog',
  event: '/event',
  login: '/daftar',
  register: '/buatakun',
  product: '/produk',
  'forgot-password': '/lupapassword',
}

export function getRoutePath(page: Page, productId?: number): string {
  if (page === 'product' && productId !== undefined) {
    return `/produk/${productId}`
  }
  return ROUTE_MAP[page] || '/'
}

export const CATEGORIES = ['Semua', 'Outerwear', 'Tops', 'Bottoms', 'Aksesoris'] as const

export const SORTS = [
  { value: 'default',    label: 'Terbaru' },
  { value: 'price-asc',  label: 'Harga Terendah' },
  { value: 'price-desc', label: 'Harga Tertinggi' },
] as const

export const PROVINCES = [
  'DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur', 'DI Yogyakarta',
  'Banten', 'Bali', 'Sumatera Utara', 'Sumatera Selatan', 'Sumatera Barat',
  'Riau', 'Kepulauan Riau', 'Lampung', 'Kalimantan Barat', 'Kalimantan Selatan',
  'Kalimantan Timur', 'Sulawesi Selatan', 'Sulawesi Utara', 'Papua', 'Papua Barat',
] as const

export function formatPrice(n: number) {
  return 'Rp ' + n.toLocaleString('id-ID')
}
