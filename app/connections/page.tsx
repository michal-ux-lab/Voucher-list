"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { ChevronDown, X } from "lucide-react"
import IntegrationCard from "@/components/integration-card"
import PageTop from "@/components/page-top"

export default function ConnectionsPage() {
  return (
    <PageTop activePage="Connections">
      <div className="p-6 self-stretch">
        <h1 className="text-2xl font-bold">Connections</h1>
        <p className="text-md text-[#70747D] mt-2 mb-6">
          Enhance your Groupon experience by connecting a wide variety of tools you use the most.
        </p>


        {/* List of Integration Cards */}
        <div className="grid grid-cols-2 gap-6 mb-12">
          <IntegrationCard
            toolName="Mindbody"
            toolDescription="Offer class scheduling, client management, and marketing tools for fitness, wellness, and beauty businesses."
            showSpecialOffer={true}
            showStatus={true}
            status="Connected"
            logoSrc="/Connections/Mindbody.svg"
          />

          <IntegrationCard
            toolName="Booker"
            toolDescription="Handle online scheduling, staff management, and client bookings, designed for salons, spas, and wellness businesses."
            showSpecialOffer={false}
            showStatus={true}
            status="Incomplete"
            logoSrc="/Connections/Booker.svg"
          />

          <IntegrationCard
            toolName="Square"
            toolDescription="Manage payments and appointments with Square's POS system, making it easy to track sales and bookings in one place."
            showSpecialOffer={false}
            showStatus={false}
            logoSrc="/Connections/Square.svg"
          />

          <IntegrationCard
            toolName="Booksy"
            toolDescription="Allow customers to book services online 24/7, with automated reminders and client management features."
            showSpecialOffer={false}
            showStatus={false}
            logoSrc="/Connections/Booksy.svg"
          />
        </div>

        {/* Integration Feedback Section */}
        <div className="flex p-6 items-center gap-16 self-stretch justify-between rounded-xl bg-[rgba(0,0,0,0.05)]">
          {/* Content Wrapper */}
          <div className="flex flex-col items-start gap-3 flex-1 max-w-xl">
            <h3 className="h3 text-[#111827] self-stretch">
              Didn't find the integration you're looking for?
            </h3>
            <p className="text-sm text-[#70747D] self-stretch">
              We're continuously working on adding new tools. Let us know what you'd like to add!
            </p>
          </div>

          {/* Input Wrapper */}
          <div className="flex items-center gap-2 flex-1 max-w-xl">
            <input
              type="text"
              placeholder="Type tools you wish to add..."
              className="flex h-[44px] px-5 items-center gap-2 self-stretch rounded-full border border-[rgba(0,0,0,0.12)] bg-white text-sm text-[#70747D] flex-1"
            />
            <button className="h-[44px] px-5 rounded-full bg-[#111827] text-white text-sm font-semibold whitespace-nowrap">
              I want these
            </button>
          </div>
        </div>
      </div>
    </PageTop>
  )
}