"use client"

import React from "react"
import Link from "next/link"
import DCTConfigDealCard from "@/components/dct-config-deal-card"

// Sample deal data
const deals = [
  {
    id: "SF-12345678",
    name: "DQ Luxury Reflexology Massage & Relaxation Retreat - Enjoy a Relaxing and Revitalizing Couples Massage or Head, Neck, and Shoulder Massage, with up to 29% off!",
    location: "910 South Michigan Avenue, Chicago",
    imageUrl: "/treatment-images/massage1.png"
  },
  {
    id: "SF-87654321",
    name: "Serenity Spa & Wellness Center - Indulge in a Premium Spa Day Package with Full Body Massage, Facial, and Aromatherapy Treatment",
    location: "223 West Jackson Boulevard, Chicago",
    imageUrl: "/treatment-images/massage2.png"
  },
  {
    id: "SF-98765432",
    name: "Zen Garden Massage Studio - Experience Traditional Thai Massage or Deep Tissue Massage with Optional Hot Stone Therapy",
    location: "456 North State Street, Chicago",
    imageUrl: "/treatment-images/massage3.jpg"
  }
]

export default function OptionPDSConfigPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Option PDS Configuration</h1>
      <p className="text-md text-[#70747D] mt-2 mb-6">
        Configure and manage Product Description System settings for deal options, ensuring accurate and consistent product information.
      </p>

      {/* Deal Cards Container */}
      <div className="flex flex-col items-start gap-3 self-stretch">
        {deals.map((deal) => (
          <Link 
            key={deal.id}
            href={`/dct-config/option-pds/${deal.id}`}
            className="block w-full"
          >
            <DCTConfigDealCard
              salesforceId={deal.id}
              dealName={deal.name}
              location={deal.location}
              imageUrl={deal.imageUrl}
            />
          </Link>
        ))}
      </div>
    </div>
  )
} 