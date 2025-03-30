"use client"

import { ChevronDown, FileText, Filter, Printer, SearchIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
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

// Purchase date options
const purchaseDateOptions = [
  "Purchased Today",
  "Purchased Yesterday",
  "Purchased 21 Feb 2025",
  "Purchased 15 Mar 2025",
  "Purchased 10 Apr 2025",
]

// Badge options
const badgeOptions = ["Promo", "Gift"]

// Generate a random voucher
const generateRandomVoucher = (id) => {
  const randomStatus = statusOptions[Math.floor(Math.random() * statusOptions.length)]
  const randomBadges = []

  // Randomly add badges
  if (Math.random() > 0.5) {
    randomBadges.push(badgeOptions[Math.floor(Math.random() * badgeOptions.length)])
  }

  return {
    id,
    customerName: customerNames[Math.floor(Math.random() * customerNames.length)],
    campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
    optionName: optionNames[Math.floor(Math.random() * optionNames.length)],
    voucherNumber: generateVoucherNumber(),
    badges: randomBadges,
    status: randomStatus,
    purchaseDate: purchaseDateOptions[Math.floor(Math.random() * purchaseDateOptions.length)],
    statusDate: randomStatus !== "Unredeemed" ? "14 Mar 2024" : undefined,
  }
}

export default function VoucherListPage() {
  // Generate initial voucher data
  const initialVoucherData = [
    {
      id: 1,
      customerName: "Lucas Mitchell",
      campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
      optionName: "Six Laser Hair Removal Underarms Sessions",
      voucherNumber: generateVoucherNumber(),
      badges: ["Promo", "Gift"],
      status: "Unredeemed",
      purchaseDate: "Purchased Today",
    },
    {
      id: 2,
      customerName: "Guest user",
      campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
      optionName: "Option: Six Laser Hair Removal Full Legs Sessions",
      voucherNumber: generateVoucherNumber(),
      badges: [],
      status: "Unredeemed",
      purchaseDate: "Purchased 21 Feb 2025",
    },
    {
      id: 3,
      customerName: "Ethan Reynolds",
      campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
      optionName: "Option: Six Laser Hair Removal Full Legs Sessions",
      voucherNumber: generateVoucherNumber(),
      badges: [],
      status: "Redeemed",
      purchaseDate: "Purchased Today",
      statusDate: "14 Mar 2024",
    },
    {
      id: 4,
      customerName: "Jane Doe",
      campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
      optionName: "Option: Six Laser Hair Removal Full Legs Sessions",
      voucherNumber: generateVoucherNumber(),
      badges: ["Promo"],
      status: "Refunded",
      purchaseDate: "Purchased Yesterday",
      statusDate: "14 Mar 2024",
    },
    {
      id: 5,
      customerName: "Noah Sullivan",
      campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
      optionName: "Option: Six Laser Hair Removal Full Legs Sessions",
      voucherNumber: generateVoucherNumber(),
      badges: ["Gift"],
      status: "Expired",
      purchaseDate: "Purchased 21 Feb 2025",
      statusDate: "14 Mar 2024",
    },
    {
      id: 6,
      customerName: "Olivia Carter",
      campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
      optionName: "Six Laser Hair Removal Bikini | Brazilian Sessions",
      voucherNumber: generateVoucherNumber(),
      badges: [],
      status: "Redeemed",
      purchaseDate: "Purchased Yesterday",
      statusDate: "14 Mar 2024",
    },
    {
      id: 7,
      customerName: "Ava Harrison",
      campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
      optionName: "Option: Six Laser Hair Removal Full Legs Sessions",
      voucherNumber: generateVoucherNumber(),
      badges: [],
      status: "Unredeemed",
      purchaseDate: "Purchased 21 Feb 2025",
    },
  ]

  // Generate 20 more vouchers
  const additionalVouchers = Array.from({ length: 20 }, (_, i) => generateRandomVoucher(i + 8))

  const allVouchers = [...initialVoucherData, ...additionalVouchers]

  const [searchQuery, setSearchQuery] = useState("")
  const [filteredVouchers, setFilteredVouchers] = useState(allVouchers)
  const [selectedVoucherId, setSelectedVoucherId] = useState<number | null>(null)

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
  }, [searchQuery])

  const handleSelectVoucher = (id: number) => {
    setSelectedVoucherId(id === selectedVoucherId ? null : id)
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Left Sidebar Navigation - Fixed */}
      <aside className="w-[210px] bg-white border-r border-gray-200 flex flex-col fixed top-0 left-0 h-screen z-10">
        <div className="px-4">
          <Image src="/logo.svg" alt="Logo" width={72} height={75} className="text-green-600" />
        </div>

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
          <NavItem icon={<Image src="/icons/help.svg" width={16} height={16} alt="Help icon" />} label="Support" />
          <NavItem icon={<Image src="/icons/admin.svg" width={16} height={16} alt="Admin icon" />} label="Admin" />
        </nav>

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
      <main className="flex-1 ml-[210px] overflow-auto">
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

        {/* Page Header */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Voucher list</h1>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" className="bg-white text-gray-700 flex items-center gap-2 text-xxs-bold">
                <FileText className="w-4 h-4" />
                Export report
              </Button>

              <Button variant="ghost" className="bg-white text-gray-700 flex items-center gap-2 text-xxs-bold">
                <FileText className="w-4 h-4" />
                Tour the page
              </Button>

              <Button variant="ghost" className="bg-white text-gray-700 flex items-center gap-2 text-xxs-bold">
                <Printer className="w-4 h-4" />
                Print page
              </Button>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search by name, redemption code or groupon no."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Button className="bg-gray-900 hover:bg-gray-800 text-white text-sm-bold !text-white">Search</Button>

            <Button
              variant="outline"
              className="bg-white text-gray-700 border-gray-300 flex items-center gap-2 text-sm-bold"
            >
              <Filter className="w-4 h-4" />
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
            {filteredVouchers.map((voucher) => (
              <VoucherCard
                key={voucher.id}
                voucher={voucher}
                searchQuery={searchQuery}
                isSelected={voucher.id === selectedVoucherId}
                onSelect={handleSelectVoucher}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

function NavItem({ icon, label, active = false, hasDropdown = false }) {
  return (
    <Link
      href="#"
      className={`flex items-center space-x-3 px-3 py-2 rounded-md ${active ? "bg-gray-100" : "hover:bg-gray-50"}`}
    >
      <span className="text-gray-500">{icon}</span>
      <span className="flex-1 font-sans font-bold text-sm leading-5">{label}</span>
      {hasDropdown && <ChevronDown className="w-4 h-4 text-gray-400" />}
    </Link>
  )
}

