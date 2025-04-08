"use client"

import dynamic from 'next/dynamic'
import { Suspense, useState, useEffect } from 'react'

// Dynamically import client components with no SSR
const ClientLayout = dynamic(() => import('@/components/client-layout'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-white" />
})

const ToastProvider = dynamic(() => import('@/components/ui/toast-context').then(mod => mod.ToastProvider), {
  ssr: false,
  loading: () => null
})

export default function Template({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="min-h-screen bg-white" />
  }

  return (
    <ToastProvider>
      <ClientLayout>
        {children}
      </ClientLayout>
    </ToastProvider>
  )
} 