"use client"

import { X } from "lucide-react"
import { useEffect, useRef } from "react"

interface CategoriesHelpModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CategoriesHelpModal({ isOpen, onClose }: CategoriesHelpModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div ref={modalRef} className="relative w-[640px] max-h-[90vh] bg-white rounded-2xl shadow-xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-[#70747D] hover:text-[#111827] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-[#111827] mb-4">How to set up categories</h2>
          
          <div className="space-y-4 text-[#111827]">
            <p className="text-sm">
              Categories help organize and classify your deal options effectively. Follow these guidelines to set up categories properly:
            </p>

            <div className="space-y-2">
              <h3 className="text-md-bold">1. Choose Appropriate Categories</h3>
              <p className="text-sm text-[#70747D]">
                Select categories that best describe your deal options. Each option can have one category assigned to it.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-md-bold">2. Category Types</h3>
              <ul className="text-sm text-[#70747D] list-disc pl-4 space-y-1">
                <li>Oil Massage - For traditional oil-based massage services</li>
                <li>Thai Massage - For authentic Thai massage techniques</li>
                <li>Deep Tissue Massage - For intensive muscle treatment</li>
                <li>Couples Massage - For services designed for two people</li>
                <li>Spa Package - For combined treatment packages</li>
                <li>Foot Massage - For focused foot treatment</li>
                <li>Sports Massage - For athletic and sports-related massage</li>
                <li>Hot Stone Massage - For treatments using heated stones</li>
                <li>Aromatherapy Massage - For essential oil-based treatments</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-md-bold">3. Best Practices</h3>
              <ul className="text-sm text-[#70747D] list-disc pl-4 space-y-1">
                <li>Ensure all options have categories assigned</li>
                <li>Choose the most specific category that applies</li>
                <li>Be consistent across similar deals</li>
                <li>Review categories periodically</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-full bg-[#111827] text-white text-sm-bold hover:bg-[#2D3748] transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  )
} 