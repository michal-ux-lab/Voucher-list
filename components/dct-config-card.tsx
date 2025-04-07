interface DCTConfigCardProps {
  name: string
  description: string
}

export default function DCTConfigCard({ name, description }: DCTConfigCardProps) {
  return (
    <div className="inline-flex p-6 flex-col justify-between items-start gap-2 rounded-xl border border-[rgba(0,0,0,0.08)] bg-white card-hover cursor-pointer">
      <h4 className="text-md-bold text-[#111827]">{name}</h4>
      <p className="text-sm text-[#70747D] line-clamp-3">{description}</p>
    </div>
  )
} 