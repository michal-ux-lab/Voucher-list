"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"

import { ChevronDown, FileText, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef, useCallback } from "react"
import VoucherCard from "@/components/voucher-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import SideNavigation from "@/components/side-navigation"
import PageTop from "@/components/page-top"

// Function to generate a random voucher number
const generateVoucherNumber = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let result = "VS-"

  // Generate 4 groups of 4 random characters
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    if (i < 3) result += "-"
  }

  return result
}

// Function to generate a random date within a range
const getRandomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

// Function to format date as "MMM DD, YYYY"
const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = { 
    year: "numeric" as const, 
    month: "short" as const, 
    day: "numeric" as const 
  }
  return date.toLocaleDateString("en-US", options)
}

// Function to get a display date (Today, Yesterday, or formatted date)
const getDisplayDate = (date: Date) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  const compareDate = new Date(date)
  compareDate.setHours(0, 0, 0, 0)

  if (compareDate.getTime() === today.getTime()) {
    return "Today"
  } else if (compareDate.getTime() === yesterday.getTime()) {
    return "Yesterday"
  } else {
    return formatDate(date)
  }
}

// Random customer names
const customerNames = [
  "Lucas Mitchell",
  "Guest user",
  "Ethan Reynolds",
  "Jane Doe",
  "Noah Sullivan",
  "Olivia Carter",
  "Ava Harrison",
  "William Johnson",
  "Sophia Martinez",
  "James Anderson",
  "Emma Thomas",
  "Benjamin Wilson",
  "Isabella Jackson",
  "Mason White",
  "Charlotte Harris",
  "Elijah Martin",
  "Amelia Thompson",
  "Alexander Garcia",
  "Mia Robinson",
  "Daniel Clark",
  "Harper Lewis",
  "Michael Lee",
  "Evelyn Walker",
  "Matthew Hall",
  "Abigail Allen",
  "David Young",
  "Emily King",
  "Joseph Wright",
  "Elizabeth Scott",
  "Samuel Green",
]

// Option names
const optionNames = [
  "Six Laser Hair Removal Underarms Sessions",
  "Option: Six Laser Hair Removal Full Legs Sessions",
  "Six Laser Hair Removal Bikini | Brazilian Sessions",
  "Option: Six Laser Hair Removal Face Sessions",
  "Option: Six Laser Hair Removal Back Sessions",
]

// Status options
const statusOptions = ["Unredeemed", "Redeemed", "Expired", "Refunded"]

// Badge options
const badgeOptions = ["Promo", "Gift"]

// Date ranges for purchase and expiration dates
const startPurchaseDate = new Date(2023, 0, 1) // Jan 1, 2023
const endPurchaseDate = new Date() // Today
const startExpirationDate = new Date(2023, 6, 1) // July 1, 2023
const endExpirationDate = new Date(2025, 11, 31) // Dec 31, 2025

// Add treatment thumbnail mapping with actual image paths
const treatmentThumbnails = {
  underarms: "/treatment-images/underarms.jpg",
  legs: "/treatment-images/legs.jpg",
  bikini: "/treatment-images/bikini.jpg",
  face: "/treatment-images/face.jpg",
  back: "/treatment-images/back.jpg"
}

const getTreatmentType = (optionName: string) => {
  const name = optionName.toLowerCase()
  if (name.includes('underarms')) return 'underarms'
  if (name.includes('legs')) return 'legs'
  if (name.includes('bikini')) return 'bikini'
  if (name.includes('face')) return 'face'
  return 'back'
}

// Generate a random voucher
const generateRandomVoucher = (id: number) => {
  const randomStatus = statusOptions[Math.floor(Math.random() * statusOptions.length)]
  const randomBadges = []

  // Generate random 10-digit voucher code for redeemed vouchers
  const voucherCode = randomStatus === "Redeemed" 
    ? Math.floor(Math.random() * 9000000000) + 1000000000 
    : null

  // Randomly add badges
  if (Math.random() > 0.5) {
    randomBadges.push(badgeOptions[Math.floor(Math.random() * badgeOptions.length)])
  }

  // Generate random purchase date
  const purchaseDate = getRandomDate(startPurchaseDate, endPurchaseDate)

  // Generate random expiration date (half past, half future)
  let expirationDate
  if (id % 2 === 0) {
    // Past expiration date
    expirationDate = getRandomDate(startExpirationDate, new Date())
  } else {
    // Future expiration date
    expirationDate = getRandomDate(new Date(), endExpirationDate)
  }

  return {
    id,
    customerName: customerNames[Math.floor(Math.random() * customerNames.length)],
    campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
    optionName: optionNames[Math.floor(Math.random() * optionNames.length)],
    voucherNumber: generateVoucherNumber(),
    voucherCode,
    badges: randomBadges,
    status: randomStatus,
    purchaseDate: "Purchased " + getDisplayDate(purchaseDate),
    expirationDate: formatDate(expirationDate),
    statusDate: randomStatus !== "Unredeemed" ? formatDate(getRandomDate(purchaseDate, new Date())) : undefined,
  }
}

export default function VoucherListPage() {
  // Generate all 27 vouchers with random data - move to state
  const [allVouchers] = useState(() => 
    Array.from({ length: 27 }, (_, i) => generateRandomVoucher(i + 1))
  )

  const [searchQuery, setSearchQuery] = useState("")
  const [filteredVouchers, setFilteredVouchers] = useState(allVouchers)
  const [selectedVoucherId, setSelectedVoucherId] = useState<number | null>(null)
  const [selectedVoucherData, setSelectedVoucherData] = useState<typeof allVouchers[0] | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isDetailAnimating, setIsDetailAnimating] = useState(false)
  const detailRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  // Add these new state variables and refs
  const [showStickyHeader, setShowStickyHeader] = useState(false)
  const firstVoucherRef = useRef<HTMLDivElement>(null)
  const headerObserverRef = useRef<IntersectionObserver | null>(null)

  const [detailWidth, setDetailWidth] = useState(480) // Default width
  const [isResizing, setIsResizing] = useState(false)
  const resizeRef = useRef<HTMLDivElement>(null)

  // Filter vouchers based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredVouchers(allVouchers)
      return
    }

    const lowercaseQuery = searchQuery.toLowerCase()
    const filtered = allVouchers.filter(
      (voucher) =>
        voucher.customerName.toLowerCase().includes(lowercaseQuery) ||
        voucher.voucherNumber.toLowerCase().includes(lowercaseQuery),
    )
    setFilteredVouchers(filtered)
  }, [searchQuery, allVouchers])

  // Handle click outside to close detail panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isDetailOpen &&
        overlayRef.current &&
        event.target === overlayRef.current // Only close when clicking the overlay background
      ) {
        closeDetail()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isDetailOpen])

  // Add this useEffect for the Intersection Observer to detect when to show the sticky header
  useEffect(() => {
    if (firstVoucherRef.current) {
      headerObserverRef.current = new IntersectionObserver(
        ([entry]) => {
          // Add a small delay to ensure smooth transition
          setTimeout(() => {
            setShowStickyHeader(!entry.isIntersecting)
          }, 100)
        },
        { 
          threshold: 0,
          rootMargin: '-73px 0px 0px 0px' // Account for the top bar height
        }
      )

      headerObserverRef.current.observe(firstVoucherRef.current)
    }

    return () => {
      if (headerObserverRef.current) {
        headerObserverRef.current.disconnect()
      }
    }
  }, [filteredVouchers])

  // Create a shared search handler function
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }, [])

  const handleSelectVoucher = (id: number) => {
    const voucher = allVouchers.find((v) => v.id === id)
    if (voucher) {
      setSelectedVoucherId(id)
      setSelectedVoucherData(voucher)
      
      if (!isDetailOpen) {
        setIsDetailOpen(true)
        requestAnimationFrame(() => {
          setIsDetailAnimating(true)
        })
      }
    }
  }

  const closeDetail = () => {
    setIsDetailAnimating(false)
    // After animation completes, close the panel and clear selection
    setTimeout(() => {
      setIsDetailOpen(false)
      setSelectedVoucherId(null)
      setSelectedVoucherData(null)
    }, 300)
  }

  // Handle mouse down on resize handle
  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }

  // Handle mouse move while resizing
  useEffect(() => {
    const handleResize = (e: MouseEvent) => {
      if (!isResizing) return

      const windowWidth = window.innerWidth
      const newWidth = windowWidth - e.clientX
      
      // Constrain width between min and max
      const constrainedWidth = Math.min(Math.max(newWidth, 360), 768)
      setDetailWidth(constrainedWidth)
    }

    const handleResizeEnd = () => {
      setIsResizing(false)
    }

    if (isResizing) {
      document.addEventListener('mousemove', handleResize)
      document.addEventListener('mouseup', handleResizeEnd)
    }

    return () => {
      document.removeEventListener('mousemove', handleResize)
      document.removeEventListener('mouseup', handleResizeEnd)
    }
  }, [isResizing])

  return (
    <PageTop activePage="Voucher List">
      {/* Remove duplicated action bar and start with sticky header */}
      {showStickyHeader && (
        <div className="sticky top-[73px] z-20 bg-white border-b border-2 py-4 px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Voucher list</h1>
          <div className="w-[480px] flex items-center space-x-3">
            <div className="flex-1 relative">
              {/* Search icon */}
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Image src="/icons/search.svg" width={16} height={16} alt="Search icon" />
              </div>

              {/* Search input */}
              <Input
                type="text"
                placeholder="Search by name, redemption code or groupon no."
                className="pl-10 pr-9 py-2 border border-gray-300 radius-8 w-full"
                value={searchQuery}
                onChange={handleSearch}
              />

              {/* Clear button */}
              {searchQuery && (
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Search button */}
            <Button className="bg-gray-900 hover:bg-gray-800 text-white text-sm-bold !text-white radius-8">
              Search
            </Button>

            {/* Filters button */}
            <Button
              variant="outline"
              className="bg-white text-gray-700 border-gray-300 flex items-center gap-2 text-sm-bold radius-8"
            >
              <Image src="/icons/filter.svg" width={20} height={20} alt="Filter icon" />
              Filters
            </Button>
          </div>
        </div>
      )}

      {/* Page Content */}
      <div className="p-6 bg-transparent">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Voucher list</h1>
          <div className="flex items-center space-x-3">
            {/* Export report button */}
            <Button variant="ghost" className="bg-white text-gray-700 flex items-center gap-2 text-xxs-bold">
              <FileText className="w-4 h-4" />
              Export report
            </Button>

            {/* Tour the page button */}
            <Button variant="ghost" className="bg-white text-gray-700 flex items-center gap-2 text-xxs-bold">
              <Image src="/icons/map.svg" width={14} height={14} alt="Map icon" />
              Tour the page
            </Button>

            {/* Print page button */}
            <Button variant="ghost" className="bg-white text-gray-700 flex items-center gap-2 text-xxs-bold">
              <Image src="/icons/printer.svg" width={14} height={14} alt="Printer icon" />
              Print page
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="flex-1 relative">
            {/* Search icon */}
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Image src="/icons/search.svg" width={16} height={16} alt="Search icon" />
            </div>

            {/* Search input */}
            <Input
              type="text"
              placeholder="Search by name, redemption code or groupon no."
              className="pl-10 pr-9 py-2 border border-gray-300 radius-8 w-full"
              value={searchQuery}
              onChange={handleSearch}
            />

            {/* Clear button */}
            {searchQuery && (
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Search button */}
          <Button className="bg-gray-900 hover:bg-gray-800 text-white text-sm-bold !text-white radius-8">
            Search
          </Button>

          {/* Filters button */}
          <Button
            variant="outline"
            className="bg-white text-gray-700 border-gray-300 flex items-center gap-2 text-sm-bold radius-8"
          >
            <Image src="/icons/filter.svg" width={20} height={20} alt="Filter icon" />
            Filters
          </Button>
        </div>

        {/* Voucher Count and Sort */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-gray-600 text-sm">{filteredVouchers.length} vouchers</div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-600 text-sm">Sort by Last purchases</span>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </div>
        </div>

        {/* Voucher Cards */}
        <div className="space-y-4">
          {filteredVouchers.map((voucher, index) => (
            <div key={voucher.id} ref={index === 0 ? firstVoucherRef : null}>
              <VoucherCard
                voucher={voucher}
                searchQuery={searchQuery}
                isSelected={voucher.id === selectedVoucherId}
                onSelect={handleSelectVoucher}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Voucher Detail Overlay */}
      {isDetailOpen && (
        <div className="fixed inset-0 z-50 flex justify-end pointer-events-none">
          <div
            ref={detailRef}
            className="bg-white h-full shadow-xl overflow-hidden pointer-events-auto flex flex-col border-l relative"
            style={{
              width: detailWidth,
              minWidth: 360,
              maxWidth: 768,
              transform: isDetailAnimating ? "translateX(0)" : "translateX(100%)",
              transition: "transform 300ms ease-out, opacity 300ms ease-out",
              opacity: isDetailAnimating ? 1 : 0,
            }}
          >
            {/* Resize Handle */}
            <div
              ref={resizeRef}
              className="absolute left-0 top-0 w-1 h-full cursor-ew-resize hover:bg-gray-200 transition-colors"
              onMouseDown={handleResizeStart}
            />

            {/* Detail Header - Sticky */}
            <div className="px-6 py-4 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-sm">{selectedVoucherData?.voucherNumber}</h2>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={closeDetail}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Detail Content - Scrollable */}
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              {selectedVoucherData && (
                <>
                  {/* Details Section */}
                  <div className="p-6 space-y-3">
                    {/* Option Header with Thumbnail */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-16 h-12 overflow-hidden bg-gray-100 flex-shrink-0 rounded border border-gray-200">
                        <div 
                          className="w-full h-full bg-cover bg-center bg-no-repeat rounded"
                          style={{
                            backgroundImage: `url(${treatmentThumbnails[getTreatmentType(selectedVoucherData.optionName)]})`
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-md">{selectedVoucherData.optionName}</h3>
                      </div>
                    </div>

                    {/* Status Section */}
                    <div className={`p-[8px_12px] space-y-1 rounded-[8px] mb-6 
                      ${selectedVoucherData.status === 'Unredeemed' ? 'bg-white border border-solid border-[rgba(0,0,0,0.08)]' :
                        selectedVoucherData.status === 'Redeemed' ? 'bg-[#E5F3E9]' :
                        selectedVoucherData.status === 'Expired' ? 'bg-[#FFF5E9]' :
                        'bg-[#FFEDED]'}`}
                    >
                      <div className="flex justify-between items-center">
                        <span className={`text-sm-bold
                          ${selectedVoucherData.status === 'Unredeemed' ? 'text-gray-900' :
                            selectedVoucherData.status === 'Redeemed' ? 'text-[#006118]' :
                            selectedVoucherData.status === 'Expired' ? 'text-[#7E4602]' :
                            'text-[#B33434]'}`}
                        >
                          {selectedVoucherData.status}
                        </span>
                        <span className={`text-xxs
                          ${selectedVoucherData.status === 'Unredeemed' ? 'text-gray-900' :
                            selectedVoucherData.status === 'Redeemed' ? 'text-[#006118]' :
                            selectedVoucherData.status === 'Expired' ? 'text-[#7E4602]' :
                            'text-[#B33434]'}`}
                        >
                          {selectedVoucherData.status === 'Unredeemed' 
                            ? `expires ${selectedVoucherData.expirationDate}`
                            : selectedVoucherData.statusDate
                          }
                        </span>
                      </div>
                      
                      {/* Additional text for Redeemed or Refunded status */}
                      {(selectedVoucherData.status === 'Redeemed' || selectedVoucherData.status === 'Refunded') && (
                        <div className="py-2 text-xs text-gray-600">
                          {selectedVoucherData.status === 'Redeemed' 
                            ? `Redeemed by ${['Customer', 'Merchant', 'Groupon'][Math.floor(Math.random() * 3)]}`
                            : 'No Longer Want/Need this Reservation'
                          }
                        </div>
                      )}
                    </div>

                    {/* Voucher Details Section */}
                    <div>
                      <h4 className="text-md-bold mb-4">Voucher details</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Customer:</span>
                          <span className="text-sm-bold">{selectedVoucherData.customerName}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Purchase date:</span>
                          <span className="text-sm">{selectedVoucherData.purchaseDate.replace('Purchased ', '')}</span>
                        </div>
                        {selectedVoucherData.badges.length > 0 && (
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Sold as:</span>
                            <div className="flex gap-2">
                              {selectedVoucherData.badges.map((badge, index) => (
                                <Badge
                                  key={index}
                                  className={`${
                                    badge === "Promo" 
                                      ? "inline-flex items-start px-[6px] py-[2px] gap-1 bg-[#7E40B2] !text-white rounded" 
                                      : "flex items-center px-[6px] py-[2px] gap-1 bg-[#F5EDFC] !text-[#6F389B] rounded"
                                  } border-none text-xxs-bold`}
                                >
                                  {badge === "Gift" && (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="mr-1 !text-[#6F389B]"
                                    >
                                      <path d="M20 12v10H4V12"></path>
                                      <path d="M2 7h20v5H2z"></path>
                                      <path d="M12 22V7"></path>
                                      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
                                      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
                                    </svg>
                                  )}
                                  {badge}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Groupon number:</span>
                          <div className="flex items-center gap-2">
                            <span className="text-mono-xxs bg-gray-100 px-2 py-1 rounded">
                              {selectedVoucherData.voucherNumber}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => navigator.clipboard.writeText(selectedVoucherData.voucherNumber)}
                            >
                              <Image src="/icons/duplicate.svg" width={14} height={14} alt="Copy" />
                            </Button>
                          </div>
                        </div>
                        {/* Voucher code row - only show for redeemed vouchers */}
                        {selectedVoucherData.status === "Redeemed" && (
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Voucher code:</span>
                            <div className="flex items-center gap-2">
                              <span className="text-mono-xxs bg-gray-100 px-2 py-1 rounded">
                                {selectedVoucherData.voucherCode}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => navigator.clipboard.writeText(selectedVoucherData.voucherCode?.toString() || "")}
                              >
                                <Image src="/icons/duplicate.svg" width={14} height={14} alt="Copy" />
                              </Button>
                            </div>
                          </div>
                        )}
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Campaign:</span>
                          <span className="text-sm text-right flex-1 ml-4">{selectedVoucherData.campaignName}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Option:</span>
                          <span className="text-sm text-right flex-1 ml-4">{selectedVoucherData.optionName}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Location:</span>
                          <span className="text-sm text-right">500 Davis Street, Suite 810, Evanston</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Section */}
                  <div className="p-6 border-t">
                    <h4 className="text-md-bold mb-4">Timeline</h4>
                    {/* Timeline content will be added later */}
                  </div>
                </>
              )}
            </div>

            {/* Redemption Section - Sticky Bottom */}
            {selectedVoucherData?.status === "Unredeemed" && (
              <div className="px-6 py-4 border-t sticky bottom-0 bg-white">
                <Button className="bg-green-600 hover:bg-green-700 text-white w-full rounded-full text-sm-bold">
                  Redeem Voucher
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </PageTop>
  )
}