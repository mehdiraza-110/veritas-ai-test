"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MessageSquare,
  AlertTriangle,
  Shield,
  Clock,
  Filter,
  Search,
  Play,
  Pause,
  Eye,
  MoreHorizontal,
} from "lucide-react"

interface Message {
  id: string
  content: string
  user: string
  timestamp: string
  veritasScore: number
  flags: string[]
  confidence: number
  riskLevel: "low" | "medium" | "high"
  avatar: string
}

export function LiveFeed() {
  const [isLive, setIsLive] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "URGENT: Your account has been compromised! Click this link immediately to secure your funds: bit.ly/secure-account-now. You have only 2 hours before permanent suspension!",
      user: "security_alert_team",
      timestamp: "1 minute ago",
      veritasScore: 5,
      flags: ["Phishing Attempt", "Urgency Manipulation", "Suspicious Link"],
      confidence: 98,
      riskLevel: "high",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "2",
      content:
        "Great presentation today on the Q4 marketing strategy. The customer acquisition metrics look promising, and I think the social media campaign will drive significant engagement. Let's connect next week to discuss budget allocation.",
      user: "jennifer_marketing",
      timestamp: "12 minutes ago",
      veritasScore: 89,
      flags: [],
      confidence: 12,
      riskLevel: "low",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "3",
      content:
        "The new API integration is working smoothly. Response times have improved by 40% since the optimization. Thanks to the dev team for the excellent work on this sprint.",
      user: "alex_devops",
      timestamp: "25 minutes ago",
      veritasScore: 94,
      flags: [],
      confidence: 7,
      riskLevel: "low",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ])

  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        // Simulate new messages
        const newMessage: Message = {
          id: Date.now().toString(),
          content: "This is a simulated real-time message for demonstration purposes.",
          user: `user_${Math.floor(Math.random() * 1000)}`,
          timestamp: "Just now",
          veritasScore: Math.floor(Math.random() * 100),
          flags: Math.random() > 0.7 ? ["AI Generated"] : [],
          confidence: Math.floor(Math.random() * 100),
          riskLevel: Math.random() > 0.8 ? "high" : Math.random() > 0.5 ? "medium" : "low",
          avatar: "/placeholder.svg?height=32&width=32",
        }
        setMessages((prev) => [newMessage, ...prev.slice(0, 19)]) // Keep only 20 messages
      }, 10000) // New message every 10 seconds

      return () => clearInterval(interval)
    }
  }, [isLive])

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high":
        return "text-red-400 bg-red-600/20 border-red-600/30"
      case "medium":
        return "text-yellow-400 bg-yellow-600/20 border-yellow-600/30"
      case "low":
        return "text-green-400 bg-green-600/20 border-green-600/30"
      default:
        return "text-gray-400 bg-gray-600/20 border-gray-600/30"
    }
  }

  const getScoreColor = (score: number) => {
    if (score <= 30) return "text-red-400"
    if (score <= 70) return "text-yellow-400"
    return "text-green-400"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Live Message Feed</h1>
          <p className="text-gray-400">Real-time monitoring of incoming messages and threat detection</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={isLive ? "default" : "outline"}
            onClick={() => setIsLive(!isLive)}
            className={
              isLive
                ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                : "border-white/20 text-white hover:bg-white/10 bg-transparent"
            }
          >
            {isLive ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
            {isLive ? "Pause Feed" : "Resume Feed"}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Live Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">2,847</div>
            <p className="text-xs text-green-400">+156 in last hour</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Threats Detected</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">23</div>
            <p className="text-xs text-red-400">+8 in last hour</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Avg Veritas Score</CardTitle>
            <Shield className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">84.7</div>
            <p className="text-xs text-green-400">+3.2 from yesterday</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Processing Time</CardTitle>
            <Clock className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">127ms</div>
            <p className="text-xs text-green-400">-15ms from average</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Filter className="mr-2 h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search messages, users, or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-white/20">
                <SelectItem value="all">All Messages</SelectItem>
                <SelectItem value="high-risk">High Risk Only</SelectItem>
                <SelectItem value="flagged">Flagged Messages</SelectItem>
                <SelectItem value="ai-generated">AI Generated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Message Feed */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Message Stream</CardTitle>
              <CardDescription className="text-gray-400">
                {isLive ? "Live feed active" : "Feed paused"} • {messages.length} messages shown
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              {isLive && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm text-green-400">Live</span>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200"
              >
                <div className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={message.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs">
                      {message.user.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-white">{message.user}</span>
                        <span className="text-xs text-gray-400">{message.timestamp}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>

                    <p className="text-sm text-gray-300 mb-3 leading-relaxed">{message.content}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-400">Veritas Score:</span>
                          <span className={`text-sm font-bold ${getScoreColor(message.veritasScore)}`}>
                            {message.veritasScore}/100
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-400">Confidence:</span>
                          <span className="text-sm text-white">{message.confidence}%</span>
                        </div>

                        <Badge className={getRiskColor(message.riskLevel)}>
                          {message.riskLevel.toUpperCase()} RISK
                        </Badge>
                      </div>

                      <div className="flex items-center space-x-2">
                        {message.flags.map((flag, index) => (
                          <Badge key={index} variant="outline" className="border-red-600/30 text-red-400 text-xs">
                            {flag}
                          </Badge>
                        ))}
                        <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                          <Eye className="h-3 w-3 mr-1" />
                          Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
