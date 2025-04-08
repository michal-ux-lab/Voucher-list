"use client"

import React from "react"
import DCTConfigCard from "@/components/dct-config-card"
import Link from "next/link"

export default function DCTConfigPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">DCT Config</h1>
      <p className="text-md text-[#70747D] mt-2 mb-6">
        Configure your DCT settings and preferences.
      </p>
      
      {/* DCT Config Cards */}
      <div className="grid grid-cols-4 gap-6">
        <Link href="#" className="block h-full">
          <DCTConfigCard
            name="Campaign Pause reasons"
            description="Manage all the reasons available for pausing a deal."
          />
        </Link>
        <Link href="/dct-config/option-pds" className="block h-full">
          <DCTConfigCard
            name="Option PDS Configuration"
            description="Configure and manage categories (PDS) for deal options."
          />
        </Link>
        <div className="block h-full">
          <DCTConfigCard
            name="Automation Rules"
            description="Set up automated workflows and triggers for customer communications."
            disabled
          />
        </div>
        <div className="block h-full">
          <DCTConfigCard
            name="Integration Settings"
            description="Configure and manage connections with third-party tools & APIs."
            disabled
          />
        </div>
      </div>
    </div>
  )
} 