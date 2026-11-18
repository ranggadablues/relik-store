'use client'

import RegisterPage from '@/components/daftar/RegisterPage'
import { useAppNavigate } from '@/lib/useAppNavigate'
import { useRedirectIfAuthenticated } from '@/hooks/useRedirectIfAuthenticated'

export default function BuatAkunRoute() {
  const navigate = useAppNavigate()
  useRedirectIfAuthenticated({ onRedirect: () => navigate('home') })
  return <RegisterPage navigate={navigate} />
}
