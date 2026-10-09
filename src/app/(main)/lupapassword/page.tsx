'use client'

import ForgotPasswordPage from '@/components/pages/ForgotPasswordPage'
import { useAppNavigate } from '@/lib/useAppNavigate'

export default function LupaPasswordRoute() {
  const navigate = useAppNavigate()
  return <ForgotPasswordPage navigate={navigate} />
}
