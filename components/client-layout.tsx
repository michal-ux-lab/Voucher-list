"use client"

import { usePathname } from 'next/navigation'
import SideNavigation from '@/components/side-navigation'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const activePage = pathname.includes("/dct-config") ? "DCT Config" : pathname.slice(1) || "Voucher List"

  return (
    <div className="flex">
      <SideNavigation activePage={activePage} />
      <main className="flex-1 ml-[232px]">
        {children}
      </main>
    </div>
  )
} 