"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Bell, Search, Settings } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <SidebarTrigger className="text-white hover:bg-white/10" />
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search messages, users, or flags..."
              className="pl-10 w-80 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="border-green-500/30 text-green-400">
            System Healthy
          </Badge>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
