"use client"

import React, { useState, useRef, useCallback } from 'react'
import { ChevronDown, Loader2 } from 'lucide-react'
import { useToast } from '@/components/ui/toast-context'
import { deals, DealOption } from '@/lib/mock-database'
import CategoriesHelpModal from '@/components/ui/categories-help-modal'

interface DCTConfigDealOptionsProps {
  options: DealOption[]
  dealId?: string
  onSaveSuccess?: () => void
}

// Available categories with proper type safety
const categories = [
  "Oil Massage",
  "Thai Massage",
  "Deep Tissue Massage",
  "Couple Massage",
  "Couples Massage",
  "Spa Package",
  "Foot Massage",
  "Sports Massage",
  "Hot Stone Massage",
  "Aromatherapy Massage"
] as const

type Category = typeof categories[number]

export default function DCTConfigDealOptions({ 
  options: initialOptions, 
  dealId,
  onSaveSuccess 
}: DCTConfigDealOptionsProps) {
  const [options, setOptions] = useState<DealOption[]>(initialOptions)
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false)
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([])
  const { showToast } = useToast()

  const handleCategorySelect = useCallback((index: number, category: Category) => {
    setOptions(prevOptions => {
      const newOptions = prevOptions.map((option, i) => 
        i === index ? { ...option, category } : option
      );
      if (prevOptions[index].category !== category) {
        setHasChanges(true);
      }
      return newOptions;
    });
    // Close dropdown after successful selection
    setOpenDropdown(null);
  }, []);

  // Separate handler for dropdown toggle
  const handleDropdownToggle = useCallback((index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isSaving) {
      setOpenDropdown(prev => prev === index ? null : index);
    }
  }, [isSaving]);

  // Handle option click separately
  const handleOptionClick = useCallback((e: React.MouseEvent, index: number, category: Category) => {
    e.preventDefault();
    e.stopPropagation();
    handleCategorySelect(index, category);
  }, [handleCategorySelect]);

  const validateOptions = useCallback(() => {
    const uncategorizedOptions = options.filter(option => !option.category)
    if (uncategorizedOptions.length > 0) {
      showToast('Please select categories for all options', 'error', 3000)
      return false
    }
    if (!dealId) {
      showToast('Deal ID is required', 'error', 3000)
      return false
    }
    return true
  }, [options, dealId, showToast])

  const handleSave = useCallback(async () => {
    if (!validateOptions()) return

    try {
      setIsSaving(true)

      // Send update to the API
      const response = await fetch(`/api/deals/${dealId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          options
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update deal')
      }

      // Get the updated deal data
      const updatedDeal = await response.json()

      // Update local state with the response
      setOptions(updatedDeal.options)
      showToast('Categories saved successfully', 'success', 3000)
      setHasChanges(false)
      onSaveSuccess?.()
    } catch (error) {
      showToast('Failed to save categories', 'error', 3000)
      console.error('Error saving categories:', error)
    } finally {
      setIsSaving(false)
    }
  }, [options, dealId, showToast, validateOptions, onSaveSuccess])

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown !== null && 
          dropdownRefs.current[openDropdown] && 
          !dropdownRefs.current[openDropdown]?.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [openDropdown])

  return (
    <div className="flex flex-col items-start gap-3 self-stretch rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center w-full">
        <h3 className="text-xl font-bold text-[#111827]">Secondary option PDS</h3>
        <button 
          onClick={() => setIsHelpModalOpen(true)}
          className="text-md text-[#006BC3] hover:underline"
        >
          How to set up categories
        </button>
      </div>

      {/* Help Modal */}
      <CategoriesHelpModal 
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />

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
                  className="flex items-center justify-between p-3 rounded-[8px] border border-[rgba(0,0,0,0.08)] bg-white cursor-pointer hover:border-[#006BC3] transition-colors"
                  onClick={(e) => handleDropdownToggle(index, e)}
                >
                  <span className={`text-sm ${option.category ? 'text-[#111827]' : 'text-[#70747D]'}`}>
                    {option.category || "Select category"}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-[#70747D] transition-transform ${openDropdown === index ? 'rotate-180' : ''}`} />
                </div>

                {/* Dropdown Menu */}
                {openDropdown === index && (
                  <div 
                    className="absolute left-0 right-0 mt-[6px] py-1 bg-white rounded-[8px] border border-[rgba(0,0,0,0.08)] shadow-lg max-h-[240px] overflow-y-auto z-50"
                  >
                    {categories.map((category) => (
                      <div
                        key={category}
                        className={`px-3 py-2 text-sm cursor-pointer hover:bg-[#F3F4F6] ${
                          option.category === category ? 'bg-[#F3F4F6] text-[#111827]' : 'text-[#70747D]'
                        }`}
                        onMouseDown={(e) => handleOptionClick(e, index, category)}
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
        disabled={isSaving || !hasChanges}
        className={`mt-4 px-6 py-2 rounded-full text-sm-bold flex items-center gap-2 transition-colors ${
          isSaving || !hasChanges
            ? 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
            : 'bg-[#008A0E] text-white hover:bg-[#007A0D]'
        }`}
      >
        {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
        {isSaving ? 'Saving...' : 'Save changes'}
      </button>
    </div>
  )
} 