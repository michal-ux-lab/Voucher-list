import Image from "next/image"

interface EmptySearchProps {
  searchQuery: string
}

export default function EmptySearch({ searchQuery }: EmptySearchProps) {
  return (
    <div className="flex py-16 px-6 flex-col justify-center items-center gap-5 self-stretch">
      {/* Icon Container */}
      <div className="flex w-[44px] h-[44px] justify-center items-center rounded-[8px] border border-[rgba(0,0,0,0.08)] bg-white shadow-[0px_4px_28px_-6px_rgba(8,14,28,0.15)]">
        <Image 
          src="/icons/search-empty.svg" 
          width={20} 
          height={20} 
          alt="Empty search results" 
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-md-bold text-[#111827]">Nothing found</h3>
        <p className="text-sm text-[#70747D] text-center">
          We couldn't find any deal for your search "{searchQuery}".
          <br />
          Try searching for something else.
        </p>
      </div>
    </div>
  )
} 