"use client"

import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"

interface TopBarProps {
  title: string
  showButtons?: boolean
}

export default function TopBar({ title, showButtons = true }: TopBarProps) {
  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{title}</h1>
          
          {showButtons && (
            <div className="flex items-center gap-3">
              <Button variant="outline" className="text-[#0077D9] border-[#0077D9] hover:bg-[#0077D9] hover:text-white">
                <FileText className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" className="text-[#0077D9] border-[#0077D9] hover:bg-[#0077D9] hover:text-white">
                <FileText className="w-4 h-4 mr-2" />
                Import
              </Button>
              <Button variant="outline" className="text-[#0077D9] border-[#0077D9] hover:bg-[#0077D9] hover:text-white">
                <FileText className="w-4 h-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" className="text-[#0077D9] border-[#0077D9] hover:bg-[#0077D9] hover:text-white">
                <FileText className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 