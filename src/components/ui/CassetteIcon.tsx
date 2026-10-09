export function CassetteIcon({ small, color }: Readonly<{ small?: boolean; color?: string }>) {
  const s = small ? 20 : 26
  const c = color ?? 'var(--primary)'

  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transition: 'all 0.3s' }}
    >
      <rect x="2" y="6" width="24" height="16" rx="2" stroke={c} strokeWidth="1.8" fill="none" />
      <circle cx="9" cy="14" r="3" stroke={c} strokeWidth="1.4" fill="none" />
      <circle cx="19" cy="14" r="3" stroke={c} strokeWidth="1.4" fill="none" />
      <path d="M12 14H16" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
      <rect x="10" y="17" width="8" height="2.5" rx="0.5" fill={c} opacity="0.35" />
    </svg>
  )
}
