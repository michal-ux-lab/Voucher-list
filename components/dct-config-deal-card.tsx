"use client"

import { Deal } from '@/lib/mock-database'

interface DCTConfigDealCardProps {
  deal?: Deal
  salesforceId?: string
  dealName?: string
  location?: string
  imageUrl?: string
  merchantName?: string
  onEditClick?: (deal: any) => void
}

export default function DCTConfigDealCard({ 
  deal,
  salesforceId,
  dealName,
  location,
  imageUrl,
  merchantName,
  onEditClick 
}: DCTConfigDealCardProps) {
  // Use either the deal object or individual props
  const displayData = {
    imageUrl: deal?.imageUrl || imageUrl || '',
    merchantName: deal?.merchantName || merchantName || '',
    dealName: deal?.dealName || dealName || '',
    location: deal?.location || location || '',
    id: deal?.id || salesforceId || '',
    dealCategory: deal?.dealCategory || ''
  }

  return (
    <div className="flex p-3 items-start gap-3 self-stretch rounded-xl border border-[rgba(0,0,0,0.08)] bg-white cursor-pointer card-hover">
      {/* Deal Image */}
      <img 
        src={displayData.imageUrl}
        alt={displayData.dealName}
        className="w-[200px] h-[120px] rounded-[8px] border border-[rgba(0,0,0,0.08)] object-cover"
      />

      {/* Content Container */}
      <div className="flex flex-col justify-between">
      <div className="flex flex-col items-start gap-1 flex-1">
        <span className="text-sm text-[#70747D]">{displayData.merchantName}</span>
        <h3 className="text-md-bold text-[#111827] line-clamp-2">{displayData.dealName}</h3>
        <p className="text-sm text-[#70747D] whitespace-nowrap overflow-hidden text-ellipsis">{displayData.location}</p>
        
        
      </div>
        {/* Category Badge */}
        {displayData.dealCategory && (
          <div className="mt-2">
            <span className="bg-level3 rounded-[6px] px-2 py-1 text-xs-bold">
              {displayData.dealCategory}
            </span>
          </div>
        )}
      </div>

      {/* Button Container */}
      {onEditClick && (
        <div className="pl-14">
          <button 
            onClick={() => onEditClick(deal || displayData)}
            className="px-4 py-2 rounded-full bg-[#111827] text-white text-sm-bold hover:bg-[#2D3748] transition-colors"
          >
            Edit categories
          </button>
        </div>
      )}
    </div>
  )
} 