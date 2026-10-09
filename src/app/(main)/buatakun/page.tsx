'use client'

import RegisterPage from '@/components/pages/RegisterPage'
import { useAppNavigate } from '@/lib/useAppNavigate'

export default function BuatAkunRoute() {
  const navigate = useAppNavigate()
  return <RegisterPage navigate={navigate} />
}
