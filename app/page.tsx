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
const getRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

// Function to format date as "MMM DD, YYYY"
const formatDate = (date) => {
  const options = { year: "numeric", month: "short", day: "numeric" }
  return date.toLocaleDateString("en-US", options)
}

// Function to get a display date (Today, Yesterday, or formatted date)
const getDisplayDate = (date) => {
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

// Generate a random voucher
const generateRandomVoucher = (id) => {
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
          setShowStickyHeader(!entry.isIntersecting)
        },
        { threshold: 0 },
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
    <div className="flex bg-white min-h-screen">
      {/* Left Sidebar Navigation - Fixed */}
      <aside className="w-[210px] bg-white border-r border-gray-200 flex flex-col fixed top-0 left-0 h-screen z-10">
        {/* Logo container */}
        <div className="px-4">
          <Image src="/logo.svg" alt="Logo" width={72} height={75} className="text-green-600" />
        </div>

        {/* Navigation menu */}
        <nav className="flex flex-col flex-1 p-2 space-y-1 overflow-y-auto">
          <NavItem icon={<Image src="/icons/home.svg" width={16} height={16} alt="Home icon" />} label="Home" />
          <NavItem
            icon={<Image src="/icons/campaigns.svg" width={16} height={16} alt="Campaigns icon" />}
            label="Campaigns"
            hasDropdown
          />
          <NavItem
            icon={<Image src="/icons/roi.svg" width={16} height={16} alt="ROI icon" />}
            label="Sponsored Campaigns"
          />
          <NavItem
            icon={<Image src="/icons/voucher-list.svg" width={16} height={16} alt="Voucher list icon" />}
            label="Voucher List"
            active
          />
          <NavItem
            icon={<Image src="/icons/feedback.svg" width={16} height={16} alt="Feedback icon" />}
            label="Feedback"
          />
          <NavItem
            icon={<Image src="/icons/demographics.svg" width={16} height={16} alt="Demographics icon" />}
            label="Demographics"
          />
          <NavItem
            icon={<Image src="/icons/payments.svg" width={16} height={16} alt="Payments icon" />}
            label="Payments"
          />
          <NavItem
            icon={<Image src="/icons/connections.svg" width={16} height={16} alt="Connections icon" />}
            label="Connections"
          />
          <NavItem icon={<Image src="/icons/help.svg" width={16} height={16} alt="Help icon" />} label="Support" />
          <NavItem icon={<Image src="/icons/admin.svg" width={16} height={16} alt="Admin icon" />} label="Admin" />
        </nav>

        {/* Company info footer */}
        <div className="p-4 border-t border-gray-200 flex items-center">
          <div className="flex-1">
            <p className="text-xs text-gray-500">Valvoline Instant Oil</p>
            <p className="text-xs text-gray-500">Change - Ivy Lane Corp</p>
          </div>
          <button className="text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </aside>

      {/* Main Content - With left margin to account for fixed sidebar */}
      <main 
        className="flex-1 ml-[210px] overflow-auto"
        onClick={(e) => {
          if (isDetailOpen && e.target === e.currentTarget) {
            closeDetail()
          }
        }}
      >
        {/* Top Action Bar - Sticky */}
        <div className="bg-white border-b border-gray-200 p-4 flex justify-end items-center space-x-3 sticky top-0 z-10">
          <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 rounded-full text-xs-bold !text-white">
            <Image src="/icons/redemption.svg" width={16} height={16} alt="Redemption icon" />
            Redeem
          </Button>

          <Button
            variant="outline"
            className="bg-white text-gray-700 border-gray-300 flex items-center gap-2 rounded-full text-xs-bold"
          >
            <Image src="/icons/add.svg" width={16} height={16} alt="Add icon" />
            New Campaign
          </Button>

          <Button
            variant="outline"
            className="bg-white text-gray-700 border-gray-300 p-2 w-10 h-10 flex items-center justify-center rounded-full"
          >
            <Image src="/icons/send.svg" width={16} height={16} alt="Send icon" />
          </Button>

          <div className="relative">
            <Button
              variant="outline"
              className="bg-white text-gray-700 border-gray-300 p-2 w-10 h-10 flex items-center justify-center rounded-full"
            >
              <Image src="/icons/notification.svg" width={16} height={16} alt="Notification icon" />
            </Button>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              24
            </span>
          </div>
        </div>

        {/* Sticky Header - Appears when scrolling past first voucher */}
        {showStickyHeader && (
          <div className="sticky top-[72px] z-10 bg-white border-b border-2 py-4 px-6 flex justify-between items-center">
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
                  className="pl-10 pr-4 py-2 border border-gray-300 radius-8 w-full"
                  value={searchQuery}
                  onChange={handleSearch}
                />
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
                className="pl-10 pr-4 py-2 border border-gray-300 radius-8 w-full"
                value={searchQuery}
                onChange={handleSearch}
              />
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
      </main>

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
                      <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <img
                          src={`/treatment-images/${selectedVoucherData.optionName.toLowerCase().includes('underarms') ? 'underarms' : 
                            selectedVoucherData.optionName.toLowerCase().includes('legs') ? 'legs' :
                            selectedVoucherData.optionName.toLowerCase().includes('bikini') ? 'bikini' :
                            selectedVoucherData.optionName.toLowerCase().includes('face') ? 'face' : 'back'}.jpg`}
                          alt={selectedVoucherData.optionName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-md">{selectedVoucherData.optionName}</h3>
                      </div>
                    </div>

                    {/* Status Section - Placeholder for now */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium
                          ${selectedVoucherData.status === 'Unredeemed' ? 'bg-blue-100 text-blue-700' :
                            selectedVoucherData.status === 'Redeemed' ? 'bg-green-100 text-green-700' :
                            selectedVoucherData.status === 'Expired' ? 'bg-gray-100 text-gray-700' :
                            'bg-red-100 text-red-700'}`}
                        >
                          {selectedVoucherData.status}
                        </span>
                        <span className="text-sm text-gray-500">
                          expires {selectedVoucherData.expirationDate}
                        </span>
                      </div>
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
                                    badge === "Promo" ? "bg-purple-100 text-purple-600" : "bg-pink-100 text-pink-600"
                                  } border-none text-xxs-bold`}
                                >
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
    </div>
  )
}

function NavItem({ icon, label, active = false, hasDropdown = false }) {
  return (
    <Link
      href={label === "Connections" ? "/connections" : label === "Voucher List" ? "/" : "#"}
      className={`flex items-center space-x-3 px-3 py-2 rounded-md ${active ? "bg-gray-100" : "hover:bg-gray-50"}`}
    >
      <span className="text-gray-500">{icon}</span>
      <span className="flex-1 font-sans font-bold text-sm leading-5">{label}</span>
      {hasDropdown && <ChevronDown className="w-4 h-4 text-gray-400" />}
    </Link>
  )
}

