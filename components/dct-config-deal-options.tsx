"use client"

import React, { useState, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { useToast } from '@/components/ui/toast-context'

interface DCTConfigDealOptionsProps {
  options: {
    name: string
    category?: string
  }[]
}

// Available categories for the dropdown
const categories = [
  "Oil Massage",
  "Thai Massage",
  "Deep Tissue Massage",
  "Couple Massage",
  "Spa Package",
  "Foot Massage",
  "Sports Massage",
  "Hot Stone Massage",
  "Aromatherapy Massage"
]

export default function DCTConfigDealOptions({ options: initialOptions }: DCTConfigDealOptionsProps) {
  const [options, setOptions] = useState(initialOptions)
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([])
  const { showToast } = useToast()

  const handleCategorySelect = (index: number, category: string) => {
    const newOptions = [...options]
    newOptions[index] = { ...newOptions[index], category }
    setOptions(newOptions)
    setOpenDropdown(null)
  }

  const handleSave = () => {
    // Here you would typically save the changes to your backend
    showToast('Categories saved successfully', 'success', 2000)
  }

  const setDropdownRef = (el: HTMLDivElement | null, index: number) => {
    dropdownRefs.current[index] = el
  }

  return (
    <div className="flex flex-col items-start gap-3 self-stretch rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center w-full">
        <h3 className="text-xl font-bold text-[#111827]">Secondary option PDS</h3>
        <a href="#" className="text-md text-[#006BC3] hover:underline">How to set up categories</a>
      </div>

      {/* Options Container */}
      <div className="flex flex-col w-full">
        {options.map((option, index) => (
          <div key={index} className="flex flex-col gap-4 py-5">
            <h4 className="text-md-bold text-[#111827]">{option.name}</h4>
            <div className="flex flex-col gap-[6px]">
              <label className="px-1 text-xs-bold text-[#70747D] bg-white">
                Category for this option
              </label>
              <div className="relative">
                <div 
                  ref={(el) => {
                    dropdownRefs.current[index] = el
                  }}
                  className="flex items-center justify-between p-3 rounded-[8px] border border-[rgba(0,0,0,0.08)] bg-white cursor-pointer"
                  onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                >
                  <span className="text-sm text-[#111827]">
                    {option.category || "Select category"}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-[#70747D] transition-transform ${openDropdown === index ? 'rotate-180' : ''}`} />
                </div>

                {/* Dropdown Menu */}
                {openDropdown === index && (
                  <div 
                    className="absolute left-0 right-0 mt-[6px] py-1 bg-white rounded-[8px] border border-[rgba(0,0,0,0.08)] shadow-lg max-h-[240px] overflow-y-auto z-10 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
                    style={{
                      width: dropdownRefs.current[index]?.offsetWidth
                    }}
                  >
                    {categories.map((category) => (
                      <div
                        key={category}
                        className={`px-3 py-2 text-sm cursor-pointer hover:bg-[#F3F4F6] ${
                          option.category === category ? 'bg-[#F3F4F6] text-[#111827]' : 'text-[#70747D]'
                        }`}
                        onClick={() => handleCategorySelect(index, category)}
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <button 
        type="button"
        onClick={handleSave}
        className="mt-4 px-6 py-2 bg-[#008A0E] text-white rounded-full text-sm-bold hover:bg-[#007A0D] transition-colors"
      >
        Save changes
      </button>
    </div>
  )
} 