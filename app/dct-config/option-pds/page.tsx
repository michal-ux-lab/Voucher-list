"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { X, ChevronLeft } from "lucide-react"
import DCTConfigDealCard from "@/components/dct-config-deal-card"
import { Deal } from "@/lib/mock-database"
import EmptySearch from "@/components/empty-search"

export default function OptionPDSConfigPage() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>([])

  useEffect(() => {
    async function fetchDeals() {
      try {
        const response = await fetch('/api/deals')
        if (!response.ok) {
          throw new Error('Failed to fetch deals')
        }
        const data = await response.json()
        setDeals(data)
        setFilteredDeals(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch deals')
      } finally {
        setLoading(false)
      }
    }

    fetchDeals()
  }, [])

  useEffect(() => {
    const filtered = deals.filter(deal =>
      deal.salesforceId.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredDeals(filtered)
  }, [searchQuery, deals])

  const clearSearch = () => {
    setSearchQuery("")
    setFilteredDeals(deals)
  }

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Option PDS Configuration</h1>
        <p className="text-md text-[#70747D] mt-2 mb-6">Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Option PDS Configuration</h1>
        <p className="text-md text-[#70747D] mt-2 mb-6">{error}</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Back button */}
      <Link 
        href="/dct-config"
        className="inline-flex items-center text-sm text-[#006BC3] hover:text-[#004B87] mb-6"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back to DCT Config
      </Link>

      <h1 className="text-2xl font-bold">Option PDS Configuration</h1>
      <p className="text-md text-[#70747D] mt-2 mb-6">
        Configure and manage categories (PDS) for deal options.
      </p>

      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Image src="/icons/search.svg" width={16} height={16} alt="Search icon" />
        </div>
        <input
          type="text"
          className="block w-full rounded-[8px] border border-[#D1D5DB] bg-white py-2 pl-10 pr-9 text-sm placeholder:text-[#70747D] focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
          placeholder="Search deal by Salesforce ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={clearSearch}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Deal Cards Container */}
      {filteredDeals.length > 0 ? (
        <div className="flex flex-col items-start gap-3 self-stretch">
          {filteredDeals.map((deal) => (
            <Link 
              key={deal.id}
              href={`/dct-config/option-pds/${deal.id}`}
              className="block w-full"
            >
              <DCTConfigDealCard deal={deal} />
            </Link>
          ))}
        </div>
      ) : (
        <EmptySearch searchQuery={searchQuery} />
      )}
    </div>
  )
} 