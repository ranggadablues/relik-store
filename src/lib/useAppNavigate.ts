'use client'

import { useRouter } from 'next/navigation'
import type { Page, NavFn } from '@/types/page'
import { getRoutePath } from '@/types/page'

export function useAppNavigate(): NavFn {
  const router = useRouter()
  return (page: Page, productId?: number) => {
    const path = getRoutePath(page, productId)
    router.push(path)
  }
}
