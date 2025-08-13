"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bug, AlertTriangle, CheckCircle, Clock, Send, Search, Plus } from "lucide-react"

interface BugReport {
  id: string
  title: string
  description: string
  severity: "low" | "medium" | "high" | "critical"
  status: "open" | "in-progress" | "resolved" | "closed"
  reporter: string
  created: string
  lastUpdate: string
  component: string
}

export function BugReports() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isReportingBug, setIsReportingBug] = useState(false)
  const [bugForm, setBugForm] = useState({
    title: "",
    component: "",
    severity: "medium",
    description: "",
    stepsToReproduce: "",
  })

  const [bugReports] = useState<BugReport[]>([
    {
      id: "VER-2024-001",
      title: "API rate limiting not enforcing correctly for enterprise tier",
      description:
        "Enterprise customers are experiencing unexpected rate limiting despite having unlimited API access in their subscription plan.",
      severity: "high",
      status: "in-progress",
      reporter: "sarah.rodriguez@veritasai.com",
      created: "Mar 18, 2024",
      lastUpdate: "Mar 20, 2024",
      component: "API Gateway",
    },
    {
      id: "VER-2024-002",
      title: "Dashboard analytics charts display incorrect timezone data",
      description:
        "Time-series charts in the analytics dashboard are showing data in UTC instead of the user's configured timezone.",
      severity: "medium",
      status: "open",
      reporter: "marcus.thompson@veritasai.com",
      created: "Mar 19, 2024",
      lastUpdate: "Mar 19, 2024",
      component: "Dashboard",
    },
    {
      id: "VER-2024-003",
      title: "Veritas score calculation inconsistent for multilingual content",
      description:
        "Messages containing non-English text are receiving lower accuracy scores compared to English-only content.",
      severity: "medium",
      status: "resolved",
      reporter: "lisa.park@veritasai.com",
      created: "Mar 15, 2024",
      lastUpdate: "Mar 20, 2024",
      component: "AI Engine",
    },
    {
      id: "VER-2024-004",
      title: "Memory leak in real-time message processing service",
      description:
        "Production servers are experiencing gradual memory increase during high-volume message processing, requiring daily restarts.",
      severity: "critical",
      status: "open",
      reporter: "david.chen@veritasai.com",
      created: "Mar 20, 2024",
      lastUpdate: "Mar 20, 2024",
      component: "Message Processor",
    },
    {
      id: "VER-2024-005",
      title: "SSO integration failing for Microsoft Azure AD",
      description:
        "Enterprise customers using Azure AD for single sign-on are unable to authenticate, receiving 'invalid_grant' errors.",
      severity: "high",
      status: "in-progress",
      reporter: "james.wilson@veritasai.com",
      created: "Mar 17, 2024",
      lastUpdate: "Mar 20, 2024",
      component: "Authentication",
    },
  ])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-600/20 text-red-400 border-red-600/30"
      case "high":
        return "bg-orange-600/20 text-orange-400 border-orange-600/30"
      case "medium":
        return "bg-yellow-600/20 text-yellow-400 border-yellow-600/30"
      case "low":
        return "bg-green-600/20 text-green-400 border-green-600/30"
      default:
        return "bg-gray-600/20 text-gray-400 border-gray-600/30"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-600/20 text-blue-400 border-blue-600/30"
      case "in-progress":
        return "bg-yellow-600/20 text-yellow-400 border-yellow-600/30"
      case "resolved":
        return "bg-green-600/20 text-green-400 border-green-600/30"
      case "closed":
        return "bg-gray-600/20 text-gray-400 border-gray-600/30"
      default:
        return "bg-gray-600/20 text-gray-400 border-gray-600/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertTriangle className="h-4 w-4" />
      case "in-progress":
        return <Clock className="h-4 w-4" />
      case "resolved":
        return <CheckCircle className="h-4 w-4" />
      case "closed":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Bug className="h-4 w-4" />
    }
  }

  const handleSubmitBug = () => {
    console.log("Submitting bug report:", bugForm)
    setBugForm({
      title: "",
      component: "",
      severity: "medium",
      description: "",
      stepsToReproduce: "",
    })
    setIsReportingBug(false)
  }

  const filteredBugs = bugReports.filter((bug) => {
    const matchesSearch =
      bug.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bug.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || bug.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Bug Reports</h1>
          <p className="text-gray-400">Report issues and track bug fixes</p>
        </div>
        <Button
          onClick={() => setIsReportingBug(true)}
          className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Report Bug
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Open Bugs</CardTitle>
            <Bug className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{bugReports.filter((b) => b.status === "open").length}</div>
            <p className="text-xs text-red-400">Needs attention</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {bugReports.filter((b) => b.status === "in-progress").length}
            </div>
            <p className="text-xs text-yellow-400">Being worked on</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {bugReports.filter((b) => b.status === "resolved").length}
            </div>
            <p className="text-xs text-green-400">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Critical Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {bugReports.filter((b) => b.severity === "critical").length}
            </div>
            <p className="text-xs text-red-400">High priority</p>
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
                placeholder="Search bug reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-white/20">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bug Report Form */}
      {isReportingBug && (
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Report a Bug</CardTitle>
            <CardDescription className="text-gray-400">
              Provide detailed information to help us fix the issue quickly
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bugTitle" className="text-white">
                Bug Title
              </Label>
              <Input
                id="bugTitle"
                placeholder="Brief description of the bug"
                value={bugForm.title}
                onChange={(e) => setBugForm((prev) => ({ ...prev, title: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="component" className="text-white">
                  Component
                </Label>
                <Select
                  value={bugForm.component}
                  onValueChange={(value) => setBugForm((prev) => ({ ...prev, component: value }))}
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select component" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-white/20">
                    <SelectItem value="dashboard">Dashboard</SelectItem>
                    <SelectItem value="api">API Gateway</SelectItem>
                    <SelectItem value="ai-engine">AI Engine</SelectItem>
                    <SelectItem value="auth">Authentication</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="severity" className="text-white">
                  Severity
                </Label>
                <Select
                  value={bugForm.severity}
                  onValueChange={(value) => setBugForm((prev) => ({ ...prev, severity: value }))}
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-white/20">
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Detailed description of the bug..."
                value={bugForm.description}
                onChange={(e) => setBugForm((prev) => ({ ...prev, description: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="steps" className="text-white">
                Steps to Reproduce
              </Label>
              <Textarea
                id="steps"
                placeholder="1. Go to...&#10;2. Click on...&#10;3. Expected vs actual behavior..."
                value={bugForm.stepsToReproduce}
                onChange={(e) => setBugForm((prev) => ({ ...prev, stepsToReproduce: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[100px]"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsReportingBug(false)}
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitBug}
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
              >
                <Send className="mr-2 h-4 w-4" />
                Submit Bug Report
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bug Reports List */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Bug Reports</CardTitle>
          <CardDescription className="text-gray-400">
            {filteredBugs.length} of {bugReports.length} bug reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredBugs.map((bug) => (
              <div
                key={bug.id}
                className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-red-600/20">
                      <Bug className="h-4 w-4 text-red-400" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-mono text-gray-400">{bug.id}</span>
                        <Badge className={getSeverityColor(bug.severity)}>{bug.severity.toUpperCase()}</Badge>
                        <Badge className={getStatusColor(bug.status)}>
                          {getStatusIcon(bug.status)}
                          <span className="ml-1">{bug.status.replace("-", " ").toUpperCase()}</span>
                        </Badge>
                      </div>
                      <h3 className="text-white font-medium">{bug.title}</h3>
                      <p className="text-sm text-gray-400 mt-1">{bug.description}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center space-x-4">
                    <span>
                      Component: <span className="text-blue-400">{bug.component}</span>
                    </span>
                    <span>
                      Reporter: <span className="text-white">{bug.reporter}</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span>Created: {bug.created}</span>
                    <span>Updated: {bug.lastUpdate}</span>
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
