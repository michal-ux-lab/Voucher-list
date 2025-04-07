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
        <Link href="#" className="block">
          <DCTConfigCard
            name="Campaign Analytics"
            description="Track and analyze campaign performance metrics, including conversion rates, customer engagement, and ROI across different marketing channels."
          />
        </Link>
        <Link href="/dct-config/option-pds" className="block">
          <DCTConfigCard
            name="Option PDS Configuration"
            description="Configure and manage Product Description System settings for deal options, ensuring accurate and consistent product information."
          />
        </Link>
        <Link href="#" className="block">
          <DCTConfigCard
            name="Automation Rules"
            description="Set up automated workflows and triggers for customer communications, campaign management, and system notifications based on predefined conditions."
          />
        </Link>
        <Link href="#" className="block">
          <DCTConfigCard
            name="Integration Settings"
            description="Configure and manage connections with third-party tools, APIs, and services to streamline data flow and enhance functionality."
          />
        </Link>
      </div>
    </div>
  )
} 