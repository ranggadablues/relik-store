'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import ActivationSuccessPage from '@/components/aktivasi/ActivationSuccessPage'
import ActivationExpiredPage from '@/components/aktivasi/ActivationExpiredPage'
import { useAppNavigate } from '@/lib/useAppNavigate'
import { api, ApiResponse } from '@/lib/api/client'

type VerifyResponse = {
  success: boolean
}

export default function ActivationVerification() {
  const navigate = useAppNavigate()
  const params = useParams<{ id: string }>()
  const rawId = Array.isArray(params?.id) ? params.id[0] : params?.id
  const [status, setStatus] = useState<'loading' | 'success' | 'expired'>('loading')

  useEffect(() => {
    if (!rawId) {
      setStatus('expired')
      return
    }

    const token = decodeURIComponent(rawId)

    if (token === 'success' || token === 'berhasil') {
      setStatus('success')
      return
    }

    if (token === 'expired' || token === 'kadaluarsa') {
      setStatus('expired')
      return
    }

    let cancelled = false

    const verifyActivation = async () => {
      try {
        const response = await api.get<ApiResponse<VerifyResponse>>(
          `/api/auth/signup/accountactivation`,
          { token }
        )

        if (cancelled) return

        if (response?.success && response?.data?.success) {
          setStatus('success')
        } else {
          setStatus('expired')
        }
      } catch {
        if (!cancelled) {
          setStatus('expired')
        }
      }
    }

    verifyActivation()

    return () => {
      cancelled = true
    }
  }, [rawId])

  if (status === 'loading') {
    return (
      <div
        className="min-h-screen pt-24 flex items-center justify-center px-6"
        style={{ background: 'var(--background)' }}
      >
        <div className="border-2 border-[var(--foreground)] p-8 text-center" style={{ background: 'var(--card)', boxShadow: '6px 6px 0 var(--foreground)' }}>
          <p
            className="font-mono text-xs uppercase"
            style={{ color: 'var(--primary)', letterSpacing: '0.2em' }}
          >
            // Memverifikasi Tautan Aktivasi
          </p>
          <p
            className="mt-3 font-display text-3xl uppercase"
            style={{ color: 'var(--foreground)', letterSpacing: '0.08em' }}
          >
            MEMUAT ARSIP...
          </p>
        </div>
      </div>
    )
  }

  if (status === 'success') {
    return <ActivationSuccessPage navigate={navigate} />
  }

  return <ActivationExpiredPage navigate={navigate} />
}
