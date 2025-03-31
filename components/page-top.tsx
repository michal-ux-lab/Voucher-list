"use client"

import React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import SideNavigation from "@/components/side-navigation"

interface PageTopProps {
  children: React.ReactNode
  activePage: string
  showActionBar?: boolean
}

export default function PageTop({ children, activePage, showActionBar = true }: PageTopProps) {
  return (
    <div className="flex bg-white min-h-screen">
      {/* Left Sidebar Navigation */}
      <SideNavigation activePage={activePage} />

      {/* Main Content - With left margin to account for fixed sidebar */}
      <main className="flex-1 ml-[232px] overflow-auto">
        {showActionBar && (
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
        )}

        {children}
      </main>
    </div>
  )
} 