"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, TrendingUp, Zap, Globe, ArrowRight, CheckCircle } from "lucide-react"

export default function CTAPage() {
  const router = useRouter()

  const handleGetAPIAccess = () => {
    router.push("/plans")
  }

  const handleScheduleDemo = () => {
    router.push("/enterprise-demo")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Hero */}
        <div className="mb-12">
          <Shield className="h-20 w-20 text-blue-400 mx-auto mb-6 animate-pulse" />
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">Veritas AI</h1>
          <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-8">
            Preventing Billions in Fraud Losses
          </p>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            The AI Trust Layer for the Internet. Enterprise-grade fraud detection that stops threats before they reach
            your customers.
          </p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">99.2%</div>
              <div className="text-gray-300">Detection Accuracy</div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Zap className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">24ms</div>
              <div className="text-gray-300">Response Time</div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Globe className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">$2.1B</div>
              <div className="text-gray-300">Fraud Prevented</div>
            </CardContent>
          </Card>
        </div>

        {/* Ready Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-lg px-4 py-2">
            <CheckCircle className="h-5 w-5 mr-2" />
            API Ready
          </Badge>
          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-lg px-4 py-2">
            <CheckCircle className="h-5 w-5 mr-2" />
            Deployment Ready
          </Badge>
          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-lg px-4 py-2">
            <CheckCircle className="h-5 w-5 mr-2" />
            Acquisition Ready
          </Badge>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <Button
            size="lg"
            onClick={handleScheduleDemo}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-xl px-8 py-4 h-auto"
          >
            Schedule Enterprise Demo
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={handleGetAPIAccess}
            className="border-white/20 text-white hover:bg-white/10 bg-transparent text-xl px-8 py-4 h-auto"
          >
            Get API Access
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <span>SOC 2 Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <span>GDPR Ready</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <span>99.9% Uptime SLA</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <span>Enterprise Support</span>
          </div>
        </div>

        {/* Footer tagline */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-gray-400 text-lg">
            Trusted by financial institutions, fintech companies, and dating platforms worldwide
          </p>
        </div>
      </div>
    </div>
  )
}
