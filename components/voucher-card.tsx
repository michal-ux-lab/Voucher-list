"use client"

import { ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface VoucherCardProps {
  voucher: {
    id: number
    customerName: string
    campaignName: string
    optionName: string
    voucherNumber: string
    badges: string[]
    status: string
    purchaseDate: string
    expirationDate: string
    statusDate?: string
  }
  searchQuery?: string
  isSelected?: boolean
  onSelect: (id: number) => void
}

export default function VoucherCard({ voucher, searchQuery = "", isSelected = false, onSelect }: VoucherCardProps) {
  // Function to determine status color based on status type
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Unredeemed":
        return "bg-white text-gray-900 border-2"
      case "Redeemed":
        return "bg-[#E5F3E9] text-[#006118]"
      case "Expired":
        return "bg-[#FFF5E9] text-[#7E4602]"
      case "Refunded":
        return "bg-[#FFEDED] text-[#B33434]"
      default:
        return "bg-gray-50 text-gray-600"
    }
  }

  // Function to determine badge color based on badge type
  const getBadgeColor = (type: string) => {
    switch (type) {
      case "Promo":
        return "bg-purple-100 text-purple-600 hover:bg-purple-100"
      case "Gift":
        return "bg-pink-100 text-pink-600 hover:bg-pink-100"
      default:
        return "bg-gray-100 text-gray-600 hover:bg-gray-100"
    }
  }

  // Function to highlight search text in customer name and voucher number
  const highlightText = (text: string, query: string) => {
    if (!query || query.trim() === "") return text

    const regex = new RegExp(`(${query})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, index) => {
      if (part.toLowerCase() === query.toLowerCase()) {
        return (
          <span key={index} className="bg-yellow-200 text-gray-800">
            {part}
          </span>
        )
      }
      return part
    })
  }

  // Determine border style based on selection state
  const borderStyle = isSelected
    ? "border-[#0077D9] border-2 card-hover-shadow"
    : "border border-solid border-[rgba(0,0,0,0.08)] hover:border-[#0077D9] hover:card-hover-shadow"

  return (
    <div
      className={`radius-12 bg-white p-3 relative transition-all duration-200 ease-in-out cursor-pointer ${borderStyle}`}
      onClick={() => onSelect(voucher.id)}
    >
      {/* Card header with customer name and purchase date */}
      <div className="flex justify-between mb-2">
        <h3 className="text-md-bold">{highlightText(voucher.customerName, searchQuery)}</h3>
        <span className="text-xxs text-gray-500">{voucher.purchaseDate}</span>
      </div>

      <div className="flex items-end gap-4 w-full">
        {/* Left content with campaign details */}
        <div className="flex-1 flex flex-col gap-1">
          {/* Campaign name with 2-line ellipsis */}
          <p className="text-xxs text-gray-600 line-clamp-2">{voucher.campaignName}</p>

          {/* Option name with 2-line ellipsis */}
          <p className="text-xxs-bold line-clamp-2">{voucher.optionName}</p>

          {/* Voucher number and badges */}
          <div className="flex items-center mt-1 space-x-2">
            {/* Voucher number with special styling */}
            <span className="text-mono-xxs bg-level3 px-1 py-0.5 radius-4">
              {highlightText(voucher.voucherNumber, searchQuery)}
            </span>

            {/* Badge container */}
            <div className="flex space-x-2">
              {voucher.badges.map((badge, index) => (
                <Badge key={index} className={`${getBadgeColor(badge)} border-none text-xxs-bold`}>
                  {badge === "Gift" ? (
                    <span className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-1"
                      >
                        <path d="M20 12v10H4V12"></path>
                        <path d="M2 7h20v5H2z"></path>
                        <path d="M12 22V7"></path>
                        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
                        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
                      </svg>
                      {badge}
                    </span>
                  ) : (
                    badge
                  )}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Right Status container */}
        <div
          className={`w-36 flex flex-col items-center justify-center p-3 rounded-lg gap-1 ${getStatusColor(
            voucher.status,
          )}`}
        >
          <div className="text-center">
            <div className="text-xs-bold">{voucher.status}</div>
            {voucher.statusDate && <div className="text-xxs">{voucher.statusDate}</div>}
          </div>

          {/* Redeem button for unredeemed vouchers */}
          {voucher.status === "Unredeemed" && (
            <button className="mt-1 text-[#0077D9] text-xxs-bold flex items-center">
              Redeem
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

