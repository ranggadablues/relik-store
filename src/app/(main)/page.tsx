'use client'

import HomePage from '@/components/pages/HomePage'
import { useAppNavigate } from '@/lib/useAppNavigate'

export default function HomeRoute() {
  const navigate = useAppNavigate()
  return <HomePage navigate={navigate} />
}
