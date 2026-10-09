'use client'

import LoginPage from '@/components/pages/LoginPage'
import { useAppNavigate } from '@/lib/useAppNavigate'

export default function DaftarRoute() {
  const navigate = useAppNavigate()
  return <LoginPage navigate={navigate} />
}
