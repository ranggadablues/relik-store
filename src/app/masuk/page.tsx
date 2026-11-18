'use client'

import LoginPage from '@/components/masuk/LoginPage'
import { useAppNavigate } from '@/lib/useAppNavigate'
import { useRedirectIfAuthenticated } from '@/hooks/useRedirectIfAuthenticated'

export default function MasukRoute() {
  const navigate = useAppNavigate()
  useRedirectIfAuthenticated({ onRedirect: () => navigate('home') })
  return <LoginPage navigate={navigate} />
}
