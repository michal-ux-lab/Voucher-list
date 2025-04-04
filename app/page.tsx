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

// Static voucher data
const allVouchersData = [
  {
    id: 1,
    customerName: "Jane Doe",
    campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
    optionName: "Six Laser Hair Removal Underarms Sessions",
    voucherNumber: "VS-A0K3-35NA-80Y4-K70T",
    voucherCode: null,
    badges: ["Gift"],
    status: "Unredeemed",
    purchaseDate: "Purchased Feb 13, 2024",
    expirationDate: "Mar 13, 2024",
    statusDate: undefined
  },
  {
    id: 2,
    customerName: "William Johnson",
    campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
    optionName: "Option: Six Laser Hair Removal Full Legs Sessions",
    voucherNumber: "VS-B1K4-45NB-90Y5-L80U",
    voucherCode: "1234567890",
    badges: ["Promo"],
    status: "Redeemed",
    purchaseDate: "Purchased Jan 15, 2024",
    expirationDate: "Jul 15, 2024",
    statusDate: "Feb 1, 2024"
  },
  {
    id: 3,
    customerName: "Emma Thomas",
    campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
    optionName: "Six Laser Hair Removal Bikini | Brazilian Sessions",
    voucherNumber: "VS-C2K5-55NC-10Y6-M90V",
    voucherCode: null,
    badges: ["Gift", "Promo"],
    status: "Expired",
    purchaseDate: "Purchased Dec 1, 2023",
    expirationDate: "Feb 1, 2024",
    statusDate: "Feb 1, 2024"
  },
  {
    id: 4,
    customerName: "Noah Sullivan",
    campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
    optionName: "Option: Six Laser Hair Removal Face Sessions",
    voucherNumber: "VS-D3K6-65ND-20Y7-N10W",
    voucherCode: null,
    badges: [],
    status: "Refunded",
    purchaseDate: "Purchased Jan 20, 2024",
    expirationDate: "Jul 20, 2024",
    statusDate: "Feb 5, 2024"
  },
  {
    id: 5,
    customerName: "Sophia Martinez",
    campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
    optionName: "Six Laser Hair Removal Underarms Sessions",
    voucherNumber: "VS-E4K7-75NE-30Y8-P20X",
    voucherCode: "9876543210",
    badges: ["Promo"],
    status: "Redeemed",
    purchaseDate: "Purchased Jan 25, 2024",
    expirationDate: "Jul 25, 2024",
    statusDate: "Feb 10, 2024"
  },
  {
    id: 6,
    customerName: "Lucas Mitchell",
    campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
    optionName: "Option: Six Laser Hair Removal Back Sessions",
    voucherNumber: "VS-F5K8-85NF-40Y9-Q30Y",
    voucherCode: null,
    badges: ["Gift"],
    status: "Unredeemed",
    purchaseDate: "Purchased Feb 14, 2024",
    expirationDate: "Aug 14, 2024",
    statusDate: undefined
  },
  {
    id: 7,
    customerName: "Isabella Jackson",
    campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
    optionName: "Six Laser Hair Removal Face Sessions",
    voucherNumber: "VS-G6K9-95NG-50Z1-R40Z",
    voucherCode: null,
    badges: [],
    status: "Expired",
    purchaseDate: "Purchased Dec 15, 2023",
    expirationDate: "Feb 15, 2024",
    statusDate: "Feb 15, 2024"
  },
  {
    id: 8,
    customerName: "Ethan Reynolds",
    campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
    optionName: "Option: Six Laser Hair Removal Bikini | Brazilian Sessions",
    voucherNumber: "VS-H7L1-15NH-60Z2-S50A",
    voucherCode: "5678901234",
    badges: ["Promo"],
    status: "Redeemed",
    purchaseDate: "Purchased Jan 10, 2024",
    expirationDate: "Jul 10, 2024",
    statusDate: "Feb 8, 2024"
  },
  {
    id: 9,
    customerName: "Olivia Carter",
    campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
    optionName: "Six Laser Hair Removal Full Legs Sessions",
    voucherNumber: "VS-I8L2-25NI-70Z3-T60B",
    voucherCode: null,
    badges: ["Gift", "Promo"],
    status: "Unredeemed",
    purchaseDate: "Purchased Feb 12, 2024",
    expirationDate: "Aug 12, 2024",
    statusDate: undefined
  },
  {
    id: 10,
    customerName: "James Anderson",
    campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
    optionName: "Option: Six Laser Hair Removal Back Sessions",
    voucherNumber: "VS-J9L3-35NJ-80Z4-U70C",
    voucherCode: null,
    badges: [],
    status: "Refunded",
    purchaseDate: "Purchased Jan 18, 2024",
    expirationDate: "Jul 18, 2024",
    statusDate: "Feb 3, 2024"
  },
  // Continue with more vouchers...
  {
    id: 11,
    customerName: "Ava Harrison",
    campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
    optionName: "Six Laser Hair Removal Underarms Sessions",
    voucherNumber: "VS-K1L4-45NK-90Z5-V80D",
    voucherCode: "2345678901",
    badges: ["Promo"],
    status: "Redeemed",
    purchaseDate: "Purchased Jan 22, 2024",
    expirationDate: "Jul 22, 2024",
    statusDate: "Feb 12, 2024"
  },
  // Add remaining vouchers following the same pattern...
  {
    id: 50,
    customerName: "Charlotte Harris",
    campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
    optionName: "Option: Six Laser Hair Removal Face Sessions",
    voucherNumber: "VS-Z9Z9-99NZ-99Z9-Z99Z",
    voucherCode: null,
    badges: ["Gift"],
    status: "Unredeemed",
    purchaseDate: "Purchased Feb 15, 2024",
    expirationDate: "Aug 15, 2024",
    statusDate: undefined
  },
  {
    id: 12,
    customerName: "Benjamin Wilson",
    campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
    optionName: "Option: Six Laser Hair Removal Bikini | Brazilian Sessions",
    voucherNumber: "VS-L2L5-55NL-10Z6-W90E",
    voucherCode: null,
    badges: ["Gift"],
    status: "Unredeemed",
    purchaseDate: "Purchased Feb 11, 2024",
    expirationDate: "Aug 11, 2024",
    statusDate: undefined
  },
  {
    id: 13,
    customerName: "Mason White",
    campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
    optionName: "Six Laser Hair Removal Full Legs Sessions",
    voucherNumber: "VS-M3L6-65NM-20Z7-X10F",
    voucherCode: "3456789012",
    badges: ["Promo"],
    status: "Redeemed",
    purchaseDate: "Purchased Jan 8, 2024",
    expirationDate: "Jul 8, 2024",
    statusDate: "Feb 7, 2024"
  },
  {
    id: 14,
    customerName: "Elijah Martin",
    campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
    optionName: "Option: Six Laser Hair Removal Face Sessions",
    voucherNumber: "VS-N4L7-75NN-30Z8-Y20G",
    voucherCode: null,
    badges: [],
    status: "Expired",
    purchaseDate: "Purchased Dec 10, 2023",
    expirationDate: "Feb 10, 2024",
    statusDate: "Feb 10, 2024"
  },
  // Continue adding vouchers 15-49 with similar variations
  {
    id: 15,
    customerName: "Alexander Garcia",
    campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
    optionName: "Six Laser Hair Removal Back Sessions",
    voucherNumber: "VS-O5L8-85NO-40Z9-Z30H",
    voucherCode: null,
    badges: ["Gift", "Promo"],
    status: "Unredeemed",
    purchaseDate: "Purchased Feb 10, 2024",
    expirationDate: "Aug 10, 2024",
    statusDate: undefined
  },
  // ... Add remaining vouchers 16-49 here with similar patterns
  {
    id: 49,
    customerName: "Daniel Clark",
    campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
    optionName: "Option: Six Laser Hair Removal Underarms Sessions",
    voucherNumber: "VS-Y8Y8-88NY-88Y8-Y88Y",
    voucherCode: "8901234567",
    badges: ["Promo"],
    status: "Redeemed",
    purchaseDate: "Purchased Jan 5, 2024",
    expirationDate: "Jul 5, 2024",
    statusDate: "Feb 6, 2024"
  },
  {
    id: 16,
    customerName: "Mia Robinson",
    campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
    optionName: "Six Laser Hair Removal Underarms Sessions",
    voucherNumber: "VS-P6L9-95NP-50Z1-A40I",
    voucherCode: "4567890123",
    badges: ["Promo"],
    status: "Redeemed",
    purchaseDate: "Purchased Jan 12, 2024",
    expirationDate: "Jul 12, 2024",
    statusDate: "Feb 9, 2024"
  },
  {
    id: 17,
    customerName: "Harper Lewis",
    campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
    optionName: "Option: Six Laser Hair Removal Bikini | Brazilian Sessions",
    voucherNumber: "VS-Q7M1-15NQ-60Z2-B50J",
    voucherCode: null,
    badges: ["Gift"],
    status: "Unredeemed",
    purchaseDate: "Purchased Feb 9, 2024",
    expirationDate: "Aug 9, 2024",
    statusDate: undefined
  },
  {
    id: 18,
    customerName: "Michael Lee",
    campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
    optionName: "Six Laser Hair Removal Face Sessions",
    voucherNumber: "VS-R8M2-25NR-70Z3-C60K",
    voucherCode: null,
    badges: [],
    status: "Expired",
    purchaseDate: "Purchased Dec 5, 2023",
    expirationDate: "Feb 5, 2024",
    statusDate: "Feb 5, 2024"
  },
  {
    id: 19,
    customerName: "Evelyn Walker",
    campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
    optionName: "Option: Six Laser Hair Removal Full Legs Sessions",
    voucherNumber: "VS-S9M3-35NS-80Z4-D70L",
    voucherCode: null,
    badges: ["Gift", "Promo"],
    status: "Unredeemed",
    purchaseDate: "Purchased Feb 8, 2024",
    expirationDate: "Aug 8, 2024",
    statusDate: undefined
  },
  {
    id: 20,
    customerName: "Matthew Hall",
    campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
    optionName: "Six Laser Hair Removal Back Sessions",
    voucherNumber: "VS-T1M4-45NT-90Z5-E80M",
    voucherCode: "5678901234",
    badges: ["Promo"],
    status: "Redeemed",
    purchaseDate: "Purchased Jan 7, 2024",
    expirationDate: "Jul 7, 2024",
    statusDate: "Feb 4, 2024"
  },
  // Add vouchers 21-48 with similar variations
  {
    id: 21,
    customerName: "Abigail Allen",
    campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
    optionName: "Option: Six Laser Hair Removal Underarms Sessions",
    voucherNumber: "VS-U2M5-55NU-10Z6-F90N",
    voucherCode: null,
    badges: [],
    status: "Refunded",
    purchaseDate: "Purchased Jan 17, 2024",
    expirationDate: "Jul 17, 2024",
    statusDate: "Feb 2, 2024"
  },
  {
    id: 22,
    customerName: "David Young",
    campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
    optionName: "Six Laser Hair Removal Bikini | Brazilian Sessions",
    voucherNumber: "VS-V3M6-65NV-20Z7-G10O",
    voucherCode: null,
    badges: ["Gift"],
    status: "Unredeemed",
    purchaseDate: "Purchased Feb 7, 2024",
    expirationDate: "Aug 7, 2024",
    statusDate: undefined
  },
  {
    id: 23,
    customerName: "Emily King",
    campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
    optionName: "Option: Six Laser Hair Removal Face Sessions",
    voucherNumber: "VS-W4M7-75NW-30Z8-H20P",
    voucherCode: "6789012345",
    badges: ["Promo"],
    status: "Redeemed",
    purchaseDate: "Purchased Jan 6, 2024",
    expirationDate: "Jul 6, 2024",
    statusDate: "Feb 3, 2024"
  },
  {
    id: 24,
    customerName: "Joseph Wright",
    campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
    optionName: "Six Laser Hair Removal Back Sessions",
    voucherNumber: "VS-X5M8-85NX-40Z9-I30Q",
    voucherCode: null,
    badges: [],
    status: "Expired",
    purchaseDate: "Purchased Dec 8, 2023",
    expirationDate: "Feb 8, 2024",
    statusDate: "Feb 8, 2024"
  },
  {
    id: 25,
    customerName: "Elizabeth Scott",
    campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
    optionName: "Option: Six Laser Hair Removal Underarms Sessions",
    voucherNumber: "VS-Y6M9-95NY-50Z1-J40R",
    voucherCode: null,
    badges: ["Gift", "Promo"],
    status: "Unredeemed",
    purchaseDate: "Purchased Feb 6, 2024",
    expirationDate: "Aug 6, 2024",
    statusDate: undefined
  },
  {
    id: 26,
    customerName: "Samuel Green",
    campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
    optionName: "Six Laser Hair Removal Full Legs Sessions",
    voucherNumber: "VS-Z7N1-15NZ-60Z2-K50S",
    voucherCode: "7890123456",
    badges: ["Promo"],
    status: "Redeemed",
    purchaseDate: "Purchased Jan 4, 2024",
    expirationDate: "Jul 4, 2024",
    statusDate: "Feb 2, 2024"
  },
  {
    id: 27,
    customerName: "Amelia Thompson",
    campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
    optionName: "Option: Six Laser Hair Removal Bikini | Brazilian Sessions",
    voucherNumber: "VS-A8N2-25NA-70Z3-L60T",
    voucherCode: null,
    badges: ["Gift"],
    status: "Unredeemed",
    purchaseDate: "Purchased Feb 5, 2024",
    expirationDate: "Aug 5, 2024",
    statusDate: undefined
  },
  {
    id: 28,
    customerName: "Guest user",
    campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
    optionName: "Six Laser Hair Removal Face Sessions",
    voucherNumber: "VS-B9N3-35NB-80Z4-M70U",
    voucherCode: null,
    badges: [],
    status: "Refunded",
    purchaseDate: "Purchased Jan 16, 2024",
    expirationDate: "Jul 16, 2024",
    statusDate: "Feb 1, 2024"
  },
  {
    id: 29,
    customerName: "Isabella Jackson",
    campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
    optionName: "Option: Six Laser Hair Removal Back Sessions",
    voucherNumber: "VS-C1N4-45NC-90Z5-N80V",
    voucherCode: "8901234567",
    badges: ["Promo"],
    status: "Redeemed",
    purchaseDate: "Purchased Jan 3, 2024",
    expirationDate: "Jul 3, 2024",
    statusDate: "Feb 1, 2024"
  },
  {
    id: 30,
    customerName: "Lucas Mitchell",
    campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
    optionName: "Six Laser Hair Removal Underarms Sessions",
    voucherNumber: "VS-D2N5-55ND-10Z6-O90W",
    voucherCode: null,
    badges: ["Gift"],
    status: "Unredeemed",
    purchaseDate: "Purchased Feb 4, 2024",
    expirationDate: "Aug 4, 2024",
    statusDate: undefined
  },
  {
    id: 31,
    customerName: "Sophia Martinez",
    campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
    optionName: "Option: Six Laser Hair Removal Full Legs Sessions",
    voucherNumber: "VS-E3N6-65NE-20Z7-P10X",
    voucherCode: null,
    badges: [],
    status: "Expired",
    purchaseDate: "Purchased Dec 3, 2023",
    expirationDate: "Feb 3, 2024",
    statusDate: "Feb 3, 2024"
  },
  {
    id: 32,
    customerName: "Ethan Reynolds",
    campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
    optionName: "Six Laser Hair Removal Bikini | Brazilian Sessions",
    voucherNumber: "VS-F4N7-75NF-30Z8-Q20Y",
    voucherCode: "9012345678",
    badges: ["Promo"],
    status: "Redeemed",
    purchaseDate: "Purchased Jan 2, 2024",
    expirationDate: "Jul 2, 2024",
    statusDate: "Jan 31, 2024"
  },
  {
    id: 33,
    customerName: "Olivia Carter",
    campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
    optionName: "Option: Six Laser Hair Removal Face Sessions",
    voucherNumber: "VS-G5N8-85NG-40Z9-R30Z",
    voucherCode: null,
    badges: ["Gift", "Promo"],
    status: "Unredeemed",
    purchaseDate: "Purchased Feb 3, 2024",
    expirationDate: "Aug 3, 2024",
    statusDate: undefined
  },
  {
    id: 34,
    customerName: "William Johnson",
    campaignName: "Revitalize Your Radiance: Unlock Timeless Beauty with 20 or 40 Units of Botox!",
    optionName: "Six Laser Hair Removal Back Sessions",
    voucherNumber: "VS-H6N9-95NH-50Z1-S40A",
    voucherCode: null,
    badges: [],
    status: "Refunded",
    purchaseDate: "Purchased Jan 15, 2024",
    expirationDate: "Jul 15, 2024",
    statusDate: "Jan 30, 2024"
  },
  // Add remaining vouchers 29-48 with similar patterns...
]

// Treatment thumbnail mapping
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

export default function VoucherListPage() {
  const [allVouchers] = useState(allVouchersData)
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
  const lastScrollY = useRef(0)

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

  // Add scroll handler for sticky header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Show header when scrolling down and past the first voucher
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShowStickyHeader(true)
      }
      // Hide header when scrolling up to top
      else if (currentScrollY < lastScrollY.current && currentScrollY < 100) {
        setShowStickyHeader(false)
      }
      
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
      {/* Sticky header */}
      <div 
        className={`fixed left-[232px] right-0 bg-white border-b py-4 px-6 flex justify-between items-center z-20 ${
          showStickyHeader ? 'top-[73px]' : '-translate-y-full'
        }`}
      >
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

      {/* Add a spacer div to prevent content jump when header becomes fixed */}
      <div className={`h-[73px] ${showStickyHeader ? 'block' : 'hidden'}`} />

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
                <Button className="bg-green-600 hover:bg-green-700 text-white w-full rounded-full text-sm-bold !text-white">
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