"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Users, UserPlus, Mail, Shield, Crown, Eye, Settings, MoreHorizontal, Search, Filter } from "lucide-react"

interface TeamMember {
  id: string
  name: string
  email: string
  role: "Admin" | "Manager" | "Viewer"
  status: "Active" | "Pending" | "Inactive"
  lastActive: string
  avatar: string
  joinDate: string
}

export function TeamManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isInviteOpen, setIsInviteOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState("Viewer")

  const [teamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "David Chen",
      email: "david.chen@veritasai.com",
      role: "Admin",
      status: "Active",
      lastActive: "5 minutes ago",
      avatar: "/placeholder.svg?height=40&width=40",
      joinDate: "Jan 15, 2024",
    },
    {
      id: "2",
      name: "Sarah Rodriguez",
      email: "sarah.rodriguez@veritasai.com",
      role: "Manager",
      status: "Active",
      lastActive: "2 hours ago",
      avatar: "/placeholder.svg?height=40&width=40",
      joinDate: "Feb 3, 2024",
    },
    {
      id: "3",
      name: "Marcus Thompson",
      email: "marcus.thompson@veritasai.com",
      role: "Manager",
      status: "Active",
      lastActive: "1 hour ago",
      avatar: "/placeholder.svg?height=40&width=40",
      joinDate: "Jan 28, 2024",
    },
    {
      id: "4",
      name: "Lisa Park",
      email: "lisa.park@veritasai.com",
      role: "Viewer",
      status: "Pending",
      lastActive: "Never",
      avatar: "/placeholder.svg?height=40&width=40",
      joinDate: "Mar 18, 2024",
    },
    {
      id: "5",
      name: "James Wilson",
      email: "james.wilson@veritasai.com",
      role: "Manager",
      status: "Active",
      lastActive: "30 minutes ago",
      avatar: "/placeholder.svg?height=40&width=40",
      joinDate: "Feb 12, 2024",
    },
  ])

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Admin":
        return <Crown className="h-4 w-4 text-yellow-400" />
      case "Manager":
        return <Shield className="h-4 w-4 text-blue-400" />
      case "Viewer":
        return <Eye className="h-4 w-4 text-gray-400" />
      default:
        return <Eye className="h-4 w-4 text-gray-400" />
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-yellow-600/20 text-yellow-400 border-yellow-600/30"
      case "Manager":
        return "bg-blue-600/20 text-blue-400 border-blue-600/30"
      case "Viewer":
        return "bg-gray-600/20 text-gray-400 border-gray-600/30"
      default:
        return "bg-gray-600/20 text-gray-400 border-gray-600/30"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-600/20 text-green-400 border-green-600/30"
      case "Pending":
        return "bg-yellow-600/20 text-yellow-400 border-yellow-600/30"
      case "Inactive":
        return "bg-red-600/20 text-red-400 border-red-600/30"
      default:
        return "bg-gray-600/20 text-gray-400 border-gray-600/30"
    }
  }

  const handleInvite = () => {
    // Handle invitation logic here
    console.log(`Inviting ${inviteEmail} as ${inviteRole}`)
    setIsInviteOpen(false)
    setInviteEmail("")
    setInviteRole("Viewer")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Team Management</h1>
          <p className="text-gray-400">Manage team members, roles, and permissions</p>
        </div>
        <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <UserPlus className="mr-2 h-4 w-4" />
              Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-white/20">
            <DialogHeader>
              <DialogTitle className="text-white">Invite Team Member</DialogTitle>
              <DialogDescription className="text-gray-400">
                Send an invitation to join your team with specific role permissions.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="colleague@company.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role" className="text-white">
                  Role
                </Label>
                <Select value={inviteRole} onValueChange={setInviteRole}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-white/20">
                    <SelectItem value="Admin">Admin - Full access</SelectItem>
                    <SelectItem value="Manager">Manager - Limited admin access</SelectItem>
                    <SelectItem value="Viewer">Viewer - Read-only access</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsInviteOpen(false)}
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleInvite}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Send Invitation
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Members</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{teamMembers.length}</div>
            <p className="text-xs text-green-400">+2 this month</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Active Users</CardTitle>
            <Shield className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {teamMembers.filter((m) => m.status === "Active").length}
            </div>
            <p className="text-xs text-green-400">All systems operational</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Pending Invites</CardTitle>
            <Mail className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {teamMembers.filter((m) => m.status === "Pending").length}
            </div>
            <p className="text-xs text-yellow-400">Awaiting response</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Admins</CardTitle>
            <Crown className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{teamMembers.filter((m) => m.role === "Admin").length}</div>
            <p className="text-xs text-gray-400">Full access level</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search team members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Team Members List */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Team Members</CardTitle>
          <CardDescription className="text-gray-400">Manage roles and permissions for your team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-white font-medium">{member.name}</h3>
                        <Badge className={getRoleColor(member.role)}>
                          {getRoleIcon(member.role)}
                          <span className="ml-1">{member.role}</span>
                        </Badge>
                        <Badge className={getStatusColor(member.status)}>{member.status}</Badge>
                      </div>
                      <p className="text-sm text-gray-400">{member.email}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs text-gray-500">Last active: {member.lastActive}</span>
                        <span className="text-xs text-gray-500">Joined: {member.joinDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Role Permissions */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Role Permissions</CardTitle>
          <CardDescription className="text-gray-400">
            Understanding what each role can access and modify
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-lg bg-yellow-600/10 border border-yellow-600/20">
              <div className="flex items-center space-x-2 mb-3">
                <Crown className="h-5 w-5 text-yellow-400" />
                <h3 className="text-white font-medium">Admin</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Full system access</li>
                <li>• Manage team members</li>
                <li>• Configure settings</li>
                <li>• View all analytics</li>
                <li>• Billing management</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-blue-600/10 border border-blue-600/20">
              <div className="flex items-center space-x-2 mb-3">
                <Shield className="h-5 w-5 text-blue-400" />
                <h3 className="text-white font-medium">Manager</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• View analytics</li>
                <li>• Manage API keys</li>
                <li>• Monitor threats</li>
                <li>• Export reports</li>
                <li>• Limited user management</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-gray-600/10 border border-gray-600/20">
              <div className="flex items-center space-x-2 mb-3">
                <Eye className="h-5 w-5 text-gray-400" />
                <h3 className="text-white font-medium">Viewer</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• View dashboard</li>
                <li>• Read-only analytics</li>
                <li>• View threat reports</li>
                <li>• Access documentation</li>
                <li>• No modification rights</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
