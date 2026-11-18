'use client'

import EventPage from '@/components/event/EventPage'
import { useAppNavigate } from '@/lib/useAppNavigate'

export default function EventRoute() {
  const navigate = useAppNavigate()
  return <EventPage navigate={navigate} />
}
