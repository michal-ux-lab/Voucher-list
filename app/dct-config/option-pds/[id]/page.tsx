"use client"

import React, { useEffect, useState, useCallback } from "react"
import { useParams } from "next/navigation"
import DCTConfigDealHero from "@/components/dct-config-deal-hero"
import DCTConfigDealOptions from "@/components/dct-config-deal-options"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Deal } from "@/lib/mock-database"

export default function DealPage() {
  const params = useParams()
  const dealId = params.id as string
  const [deal, setDeal] = useState<Deal | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDeal = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/deals?id=${dealId}`)
      if (!response.ok) {
        throw new Error('Deal not found')
      }
      const data = await response.json()
      setDeal(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch deal')
    } finally {
      setLoading(false)
    }
  }, [dealId])

  useEffect(() => {
    fetchDeal()
  }, [fetchDeal])

  const handleSaveSuccess = useCallback(() => {
    fetchDeal()
  }, [fetchDeal])

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Link 
            href="/dct-config/option-pds"
            className="flex items-center gap-2 text-[#006BC3] hover:underline"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Option PDS Configuration</span>
          </Link>
        </div>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900">Loading...</h1>
        </div>
      </div>
    )
  }

  if (error || !deal) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Link 
            href="/dct-config/option-pds"
            className="flex items-center gap-2 text-[#006BC3] hover:underline"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Option PDS Configuration</span>
          </Link>
        </div>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900">Deal not found</h1>
          <p className="text-md text-gray-600 mt-2">{error || "The deal you're looking for doesn't exist or has been removed."}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Link 
          href="/dct-config/option-pds"
          className="flex items-center gap-2 text-[#006BC3] hover:underline"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Option PDS Configuration</span>
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">Edit deal categories</h1>
            
      <div className="flex flex-col gap-6">
        <DCTConfigDealHero
          deal={deal}
        />

        <DCTConfigDealOptions 
          options={deal.options} 
          dealId={deal.id}
          onSaveSuccess={handleSaveSuccess}
        />
      </div>
    </div>
  )
} 