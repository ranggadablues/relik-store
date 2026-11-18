'use client'

import ForgotPasswordPage from '@/components/lupapassword/ForgotPasswordPage'
import { useAppNavigate } from '@/lib/useAppNavigate'

export default function LupaPasswordRoute() {
  const navigate = useAppNavigate()
  return <ForgotPasswordPage navigate={navigate} />
}
