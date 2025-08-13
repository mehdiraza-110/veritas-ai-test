"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Key, Plus, Copy, RotateCcw, Trash2, Eye, EyeOff, Activity, CheckCircle, Clock } from "lucide-react"

interface ApiKey {
  id: string
  name: string
  key: string
  created: string
  lastUsed: string
  requests: number
  status: "Active" | "Inactive" | "Expired"
  permissions: string[]
}

export function ApiManagement() {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [newKeyName, setNewKeyName] = useState("")
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set())

  const [apiKeys] = useState<ApiKey[]>([
    {
      id: "1",
      name: "Production API",
      key: "vt_live_sk_1234567890abcdef",
      created: "Mar 15, 2024",
      lastUsed: "2 hours ago",
      requests: 45678,
      status: "Active",
      permissions: ["read", "write", "admin"],
    },
    {
      id: "2",
      name: "Development API",
      key: "vt_test_sk_abcdef1234567890",
      created: "Mar 10, 2024",
      lastUsed: "1 day ago",
      requests: 12345,
      status: "Active",
      permissions: ["read", "write"],
    },
    {
      id: "3",
      name: "Analytics Only",
      key: "vt_live_sk_fedcba0987654321",
      created: "Feb 28, 2024",
      lastUsed: "1 week ago",
      requests: 8901,
      status: "Inactive",
      permissions: ["read"],
    },
  ])

  const toggleKeyVisibility = (keyId: string) => {
    const newVisible = new Set(visibleKeys)
    if (newVisible.has(keyId)) {
      newVisible.delete(keyId)
    } else {
      newVisible.add(keyId)
    }
    setVisibleKeys(newVisible)
  }

  const maskKey = (key: string) => {
    return key.substring(0, 12) + "..." + key.substring(key.length - 4)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-600/20 text-green-400 border-green-600/30"
      case "Inactive":
        return "bg-gray-600/20 text-gray-400 border-gray-600/30"
      case "Expired":
        return "bg-red-600/20 text-red-400 border-red-600/30"
      default:
        return "bg-gray-600/20 text-gray-400 border-gray-600/30"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">API Management</h1>
          <p className="text-gray-400">Manage API keys, monitor usage, and configure rate limits</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="mr-2 h-4 w-4" />
              Create API Key
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-white/20">
            <DialogHeader>
              <DialogTitle className="text-white">Create New API Key</DialogTitle>
              <DialogDescription className="text-gray-400">
                Generate a new API key for your application integration.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="keyName" className="text-white">
                  Key Name
                </Label>
                <Input
                  id="keyName"
                  placeholder="e.g., Production API, Mobile App"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateOpen(false)}
                  className="border-white/20 text-white hover:text-white hover:bg-white/10 bg-transparent"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => setIsCreateOpen(false)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Key className="mr-2 h-4 w-4" />
                  Generate Key
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Usage Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total API Keys</CardTitle>
            <Key className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{apiKeys.length}</div>
            <p className="text-xs text-green-400">2 active keys</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Requests Today</CardTitle>
            <Activity className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">12,847</div>
            <p className="text-xs text-green-400">+23% from yesterday</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Rate Limit Usage</CardTitle>
            <Activity className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">67%</div>
            <p className="text-xs text-yellow-400">33% remaining</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">45ms</div>
            <p className="text-xs text-green-400">-12ms from last hour</p>
          </CardContent>
        </Card>
      </div>

      {/* API Keys Management */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">API Keys</CardTitle>
          <CardDescription className="text-gray-400">Manage your API keys and their permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {apiKeys.map((apiKey) => (
              <div
                key={apiKey.id}
                className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-blue-600/20">
                      <Key className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{apiKey.name}</h3>
                      <p className="text-sm text-gray-400">Created {apiKey.created}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(apiKey.status)}>{apiKey.status}</Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 p-2 bg-black/20 rounded border border-white/10 font-mono text-sm text-gray-300">
                      {visibleKeys.has(apiKey.id) ? apiKey.key : maskKey(apiKey.key)}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleKeyVisibility(apiKey.id)}
                      className="text-gray-400 hover:text-black"
                    >
                      {visibleKeys.has(apiKey.id) ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(apiKey.key)}
                      className="text-gray-400 hover:text-black"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-400">
                        Last used: <span className="text-white">{apiKey.lastUsed}</span>
                      </span>
                      <span className="text-gray-400">
                        Requests: <span className="text-white">{apiKey.requests.toLocaleString()}</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-black">
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">Permissions:</span>
                    {apiKey.permissions.map((permission) => (
                      <Badge key={permission} variant="outline" className="border-blue-600/30 text-blue-400 text-xs">
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Usage Analytics */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Usage Analytics</CardTitle>
          <CardDescription className="text-gray-400">
            Monitor API usage patterns and performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Daily Requests</span>
                  <span className="text-sm text-white">12,847 / 50,000</span>
                </div>
                <Progress value={25.7} className="h-2 bg-white/10" />
                <p className="text-xs text-gray-400">25.7% of daily limit used</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Monthly Requests</span>
                  <span className="text-sm text-white">387,293 / 1,000,000</span>
                </div>
                <Progress value={38.7} className="h-2 bg-white/10" />
                <p className="text-xs text-gray-400">38.7% of monthly limit used</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-blue-600/10 border border-blue-600/20">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <h3 className="text-white font-medium">API Health Status</h3>
              </div>
              <p className="text-sm text-gray-300">All endpoints operational • 99.9% uptime</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
