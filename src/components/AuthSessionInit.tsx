'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'

/** Loads session once for the whole app (see root layout). */
export function AuthSessionInit() {
  const checkSession = useAuthStore((s) => s.checkSession)

  useEffect(() => {
    void checkSession()
  }, [checkSession])

  return null
}