import Image from "next/image"
import { Badge } from "@/components/ui/badge"

interface IntegrationCardProps {
  toolName: string
  toolDescription: string
  showSpecialOffer: boolean
  showStatus: boolean
  status?: "Connected" | "Disconnected" | "Incomplete"
  logoSrc: string
}

export default function IntegrationCard({
  toolName,
  toolDescription,
  showSpecialOffer,
  showStatus,
  status,
  logoSrc,
}: IntegrationCardProps) {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Connected":
        return "bg-[#E5F3E9] text-[#006118]"
      case "Disconnected":
        return "bg-[rgba(0,0,0,0.05)] text-[#70747D]"
      case "Incomplete":
        return "bg-[#FFEDED] text-[#B33434]"
      default:
        return ""
    }
  }

  return (
    <div className="min-w-[328px] rounded-[12px] p-6 bg-white border border-solid border-[rgba(0,0,0,0.08)] card-hover cursor-pointer">
      <div className="flex flex-col items-start gap-4 self-stretch">
        {/* Content Top */}
        <div className="flex justify-between items-start self-stretch">
          {/* Integration Logo */}
          <div className="w-12 h-12 rounded-[8px] border border-solid border-[rgba(0,0,0,0.08)] flex justify-center items-center">
            <Image src={logoSrc} width={32} height={32} alt={`${toolName} logo`} />
          </div>

          {/* Integration Status */}
          {showStatus && status && (
            <Badge
              className={`flex px-[6px] py-[2px] items-center gap-1 rounded text-xxs-bold border-none hover:bg-none ${getStatusStyles(
                status,
              )}`}
            >
              {status}
            </Badge>
          )}
        </div>

        {/* Content Bottom */}
        <div className="flex flex-col items-start gap-2 self-stretch">
          {/* Tool Name and Special Offer */}
          <div className="flex items-center gap-2 self-stretch">
            <h4 className="text-[18px] font-bold leading-[22px] text-[#111827] font-nunito">
              {toolName}
            </h4>
            {showSpecialOffer && (
              <div className="flex h-5 min-w-[20px] px-[6px] justify-center items-center gap-1 rounded-full bg-[#F5EDFC]">
                <Image src="/icons/gift.svg" width={14} height={14} alt="Special offer" className="text-[#6F389B] [&>path]:fill-[#6F389B]" />
                <span className="text-xxs-bold text-[#6F389B]">Special offer</span>
              </div>
            )}
          </div>

          {/* Tool Description */}
          <p className="text-sm text-[#70747D] self-stretch line-clamp-2">
            {toolDescription}
          </p>

          {/* See Details Link */}
          <a href="#" className="text-sm-bold text-[#006BC3] underline">
            See details
          </a>
        </div>
      </div>
    </div>
  )
} 