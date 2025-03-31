import { ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ConnectionsPage() {
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
            active
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
        {/* Page Header */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Connections</h1>
          </div>

          {/* Placeholder content */}
          <div className="bg-white p-8 rounded-lg text-center">
            <p className="text-gray-500 mb-4">This is the Connections page.</p>
            <p className="text-gray-500">Content will be added in future updates.</p>
          </div>
        </div>
      </main>
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

