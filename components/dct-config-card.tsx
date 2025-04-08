interface DCTConfigCardProps {
  name: string
  description: string
  disabled?: boolean
}

export default function DCTConfigCard({ name, description, disabled = false }: DCTConfigCardProps) {
  return (
    <div className={`
      w-full h-full p-6 flex flex-col justify-between items-start gap-2 rounded-xl border border-[rgba(0,0,0,0.08)] bg-white
      ${disabled ? 'opacity-50' : 'card-hover cursor-pointer'}
    `}>
      <h4 className="text-md-bold text-[#111827]">{name}</h4>
      <p className="text-sm text-[#70747D] line-clamp-3">{description}</p>
    </div>
  )
} 