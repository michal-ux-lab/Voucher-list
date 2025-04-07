interface DCTConfigDealHeroProps {
  salesforceId: string
  dealName: string
  location: string
  imageUrl: string
}

export default function DCTConfigDealHero({ salesforceId, dealName, location, imageUrl }: DCTConfigDealHeroProps) {
  return (
    <div className="flex items-start gap-3 self-stretch bg-white">
      {/* Deal Image with Rating */}
      <div className="relative w-[200px] h-[120px] flex-shrink-0">
        <div 
          className="w-full h-full rounded-[8px] border border-[rgba(0,0,0,0.08)] bg-cover bg-no-repeat bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className="absolute bottom-1 left-1 flex items-center gap-1 px-2 py-1 rounded-full bg-white/90 backdrop-blur-sm">
          <svg className="w-4 h-4 text-[#FFB800]" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-xs-bold font-bold">4.9</span>
          <span className="text-xs text-[#70747D]">(755)</span>
        </div>
      </div>

      {/* Content Container */}
      <div className="flex flex-col items-start gap-4 flex-1">
        {/* Deal Info */}
        <div className="flex flex-col gap-1">
          <span className="text-sm text-[#70747D]">{salesforceId}</span>
          <h2 className="text-md font-bold text-[#111827]">{dealName}</h2>
          <p className="text-sm text-[#70747D]">{location}</p>
        </div>

        {/* Pricing */}
        <div className="flex flex-col gap-1">
        <div className="flex items-baseline gap-1">
          <span className="text-xl line-through text-[#70747D]">$999.99</span>
          <span className="text-xl font-bold text-[#111827]">$699.99</span>
          <span className="text-sm font-bold text-[#008A0E]">-30%</span>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-lg font-bold text-[#7E40B2]">$699.99</span>
          <span className="text-xxs-bold text-[#7E40B2]">with code GROUPON</span>
        </div>
        </div>
      </div>

      {/* See Deal Details Button */}
      <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(0,0,0,0.08)] bg-[#F3F4F6] hover:bg-[#E5E7EB] transition-colors">
        <span className="text-sm-bold">See deal details</span>
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
} 