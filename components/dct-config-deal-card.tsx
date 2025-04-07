interface DCTConfigDealCardProps {
  salesforceId: string
  dealName: string
  location: string
  imageUrl: string
}

export default function DCTConfigDealCard({ salesforceId, dealName, location, imageUrl }: DCTConfigDealCardProps) {
  return (
    <div className="flex p-3 items-start gap-3 self-stretch rounded-xl border border-[rgba(0,0,0,0.08)] bg-white cursor-pointer card-hover">
      {/* Deal Image */}
      <div 
        className="w-[200px] h-[120px] rounded-[8px] border border-[rgba(0,0,0,0.08)] bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />

      {/* Content Container */}
      <div className="flex flex-col items-start gap-1 flex-1">
        <span className="text-sm text-[#70747D]">{salesforceId}</span>
        <h3 className="text-md-bold text-[#111827] line-clamp-2">{dealName}</h3>
        <p className="text-sm text-[#70747D] line-clamp-1">{location}</p>
      </div>

      {/* Button Container */}
      <div className="pl-14">
        <button className="px-4 py-2 rounded-full bg-[#111827] text-white text-sm-bold">
          Edit categories
        </button>
      </div>
    </div>
  )
} 