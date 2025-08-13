"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Shield,
  Users,
  MessageSquare,
  Eye,
  Activity,
  Zap,
  Globe,
} from "lucide-react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const hourlyData = [
  { time: "00:00", messages: 2847, threats: 23 },
  { time: "04:00", messages: 1923, threats: 12 },
  { time: "08:00", messages: 4521, threats: 67 },
  { time: "12:00", messages: 6834, threats: 89 },
  { time: "16:00", messages: 5967, threats: 76 },
  { time: "20:00", messages: 3456, threats: 34 },
]

const weeklyTrends = [
  { day: "Mon", score: 87, volume: 28000 },
  { day: "Tue", score: 84, volume: 32000 },
  { day: "Wed", score: 91, volume: 35000 },
  { day: "Thu", score: 89, volume: 31000 },
  { day: "Fri", score: 82, volume: 38000 },
  { day: "Sat", score: 93, volume: 18000 },
  { day: "Sun", score: 88, volume: 15000 },
]

const threatDistribution = [
  { name: "Phishing Attempts", value: 42, color: "#3b82f6" },
  { name: "AI Generated Content", value: 28, color: "#8b5cf6" },
  { name: "Social Engineering", value: 18, color: "#6366f1" },
  { name: "Financial Scams", value: 12, color: "#a855f7" },
]

export function AnalyticsDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Analytics Dashboard
          </h1>
          <p className="text-gray-400 mt-2">Real-time insights and threat detection overview</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
            <Eye className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics with Enhanced Glass Effect */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Messages Processed</CardTitle>
            <div className="p-2 rounded-lg bg-blue-500/20 backdrop-blur-sm">
              <MessageSquare className="h-4 w-4 text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">847,293</div>
            <p className="text-xs text-green-400 flex items-center">
              <TrendingUp className="mr-1 h-3 w-3" />
              +18.2% from last week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl shadow-2xl hover:shadow-red-500/10 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Threats Blocked</CardTitle>
            <div className="p-2 rounded-lg bg-red-500/20 backdrop-blur-sm">
              <AlertTriangle className="h-4 w-4 text-red-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">12,847</div>
            <p className="text-xs text-red-400 flex items-center">
              <TrendingUp className="mr-1 h-3 w-3" />
              +7.3% from last week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl shadow-2xl hover:shadow-green-500/10 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Active Organizations</CardTitle>
            <div className="p-2 rounded-lg bg-green-500/20 backdrop-blur-sm">
              <Users className="h-4 w-4 text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">2,847</div>
            <p className="text-xs text-green-400 flex items-center">
              <TrendingUp className="mr-1 h-3 w-3" />
              +12.4% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">System Uptime</CardTitle>
            <div className="p-2 rounded-lg bg-green-500/20 backdrop-blur-sm">
              <Shield className="h-4 w-4 text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">99.97%</div>
            <p className="text-xs text-green-400">All systems operational</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Real-time Activity Chart */}
        <Card className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Activity className="mr-2 h-5 w-5 text-blue-400" />
              Real-time Activity
            </CardTitle>
            <CardDescription className="text-gray-400">Messages and threats over the last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={hourlyData}>
                <defs>
                  <linearGradient id="messagesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="threatsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(17, 24, 39, 0.9)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                    backdropFilter: "blur(10px)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="messages"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#messagesGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="threats"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#threatsGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Threat Distribution Pie Chart */}
        <Card className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Zap className="mr-2 h-5 w-5 text-purple-400" />
              Threat Distribution
            </CardTitle>
            <CardDescription className="text-gray-400">Breakdown of detected threat types</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={threatDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {threatDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(17, 24, 39, 0.9)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                    backdropFilter: "blur(10px)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {threatDistribution.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-xs text-gray-300">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Trends and Veritas Score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Weekly Performance */}
        <Card className="lg:col-span-2 bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-green-400" />
              Weekly Performance
            </CardTitle>
            <CardDescription className="text-gray-400">Average Veritas Score and message volume</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyTrends}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(17, 24, 39, 0.9)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                    backdropFilter: "blur(10px)",
                  }}
                />
                <Bar dataKey="score" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Veritas Score Distribution */}
        <Card className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Globe className="mr-2 h-5 w-5 text-blue-400" />
              Veritas Score™
            </CardTitle>
            <CardDescription className="text-gray-400">Message authenticity distribution</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">High Risk (0-30)</span>
                <span className="text-sm text-purple-400 font-medium">8.4%</span>
              </div>
              <div className="relative">
                <Progress value={8.4} className="h-3 bg-white/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-purple-600/30 rounded-full"></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Medium Risk (31-70)</span>
                <span className="text-sm text-blue-400 font-medium">23.7%</span>
              </div>
              <div className="relative">
                <Progress value={23.7} className="h-3 bg-white/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-indigo-600/30 rounded-full"></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Low Risk (71-100)</span>
                <span className="text-sm text-blue-300 font-medium">67.9%</span>
              </div>
              <div className="relative">
                <Progress value={67.9} className="h-3 bg-white/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-blue-500/30 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Threat Categories */}
      <Card className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white">Top Threat Categories</CardTitle>
          <CardDescription className="text-gray-400">Most common threats detected this week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20">
              <div className="flex items-center space-x-3">
                <Badge variant="destructive" className="bg-blue-600/20 text-blue-400 border-blue-600/30">
                  Phishing
                </Badge>
                <span className="text-sm text-gray-300">Email scams</span>
              </div>
              <span className="text-lg font-bold text-white">2,847</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-purple-600/10 border border-purple-500/20">
              <div className="flex items-center space-x-3">
                <Badge variant="destructive" className="bg-purple-600/20 text-purple-400 border-purple-600/30">
                  AI Generated
                </Badge>
                <span className="text-sm text-gray-300">Synthetic content</span>
              </div>
              <span className="text-lg font-bold text-white">1,923</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-indigo-500/10 to-indigo-600/10 border border-indigo-500/20">
              <div className="flex items-center space-x-3">
                <Badge variant="destructive" className="bg-indigo-600/20 text-indigo-400 border-indigo-600/30">
                  Social Engineering
                </Badge>
                <span className="text-sm text-gray-300">Manipulation</span>
              </div>
              <span className="text-lg font-bold text-white">1,456</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-violet-500/10 to-violet-600/10 border border-violet-500/20">
              <div className="flex items-center space-x-3">
                <Badge variant="destructive" className="bg-violet-600/20 text-violet-400 border-violet-600/30">
                  Financial Fraud
                </Badge>
                <span className="text-sm text-gray-300">Investment scams</span>
              </div>
              <span className="text-lg font-bold text-white">847</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
