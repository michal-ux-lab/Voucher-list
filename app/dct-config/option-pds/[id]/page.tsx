"use client"

import React from "react"
import { useParams } from "next/navigation"
import DCTConfigDealHero from "@/components/dct-config-deal-hero"
import DCTConfigDealOptions from "@/components/dct-config-deal-options"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

// Sample deal data (same as in the list page)
const deals = [
  {
    id: "SF-12345678",
    name: "DQ Luxury Reflexology Massage & Relaxation Retreat - Enjoy a Relaxing and Revitalizing Couples Massage or Head, Neck, and Shoulder Massage, with up to 29% off!",
    location: "910 South Michigan Avenue, Chicago",
    imageUrl: "/treatment-images/massage1.png",
    options: [
      {
        name: "30-Minute Head, Neck, and Shoulder Massage with Himalayan Stone, Aloe Vera, and Vitamin E Oil for One - valid Mon-Thur",
        category: "Oil Massage"
      },
      {
        name: "60-Minute Customized Couples Massage with Himalayan Stone, Jojoba Cream, and Avocado Oil (Valid all days)",
        category: "Couple Massage"
      }
    ]
  },
  {
    id: "SF-87654321",
    name: "Serenity Spa & Wellness Center - Indulge in a Premium Spa Day Package with Full Body Massage, Facial, and Aromatherapy Treatment",
    location: "223 West Jackson Boulevard, Chicago",
    imageUrl: "/treatment-images/massage2.png",
    options: [
      {
        name: "90-Minute Premium Spa Package with Full Body Massage and Facial",
        category: "Spa Package"
      },
      {
        name: "120-Minute Deluxe Spa Package with Massage, Facial, and Aromatherapy",
        category: "Spa Package"
      }
    ]
  },
  {
    id: "SF-98765432",
    name: "Zen Garden Massage Studio - Experience Traditional Thai Massage or Deep Tissue Massage with Optional Hot Stone Therapy",
    location: "456 North State Street, Chicago",
    imageUrl: "/treatment-images/massage3.jpg",
    options: [
      {
        name: "60-Minute Traditional Thai Massage",
        category: "Thai Massage"
      },
      {
        name: "90-Minute Deep Tissue Massage with Hot Stone Therapy",
        category: "Deep Tissue Massage"
      }
    ]
  }
]

export default function DealPage() {
  const params = useParams()
  const dealId = params.id as string
  const deal = deals.find(d => d.id === dealId)

  if (!deal) {
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
          <p className="text-md text-gray-600 mt-2">The deal you're looking for doesn't exist or has been removed.</p>
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
          salesforceId={deal.id}
          dealName={deal.name}
          location={deal.location}
          imageUrl={deal.imageUrl}
        />

        <DCTConfigDealOptions options={deal.options} />
      </div>
    </div>
  )
} 