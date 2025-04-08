"use client"

import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import SideNavigation from '@/components/side-navigation'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const activePage = pathname.includes("/dct-config") ? "DCT Config" : pathname.slice(1) || "Voucher List"

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-white">
      <SideNavigation activePage={activePage} />
      <main className="flex-1 ml-[232px]">
        {children}
      </main>
    </div>
  )
} 