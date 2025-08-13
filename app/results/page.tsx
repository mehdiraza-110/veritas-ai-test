"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertTriangle, TrendingUp, Clock, ChevronDown, ChevronUp } from "lucide-react"
import { useRouter } from "next/navigation"

const scenarios = [
  {
    id: 1,
    industry: "Banking",
    title: "Crypto Investment Scam",
    message:
      "🚨 URGENT: Your account shows suspicious activity. Click here to verify your crypto wallet immediately or risk permanent suspension. Limited time offer - 500% returns guaranteed!",
    score: 8,
    risk: "HIGH",
    details: {
      indicators: ["Urgency tactics", "Unrealistic returns", "Suspicious links", "Impersonation"],
      confidence: 94,
      processingTime: "23ms",
    },
  },
  {
    id: 2,
    industry: "Fintech",
    title: "Loan Approval Phishing",
    message:
      "Congratulations! You've been pre-approved for a $50,000 personal loan at 0% APR. No credit check required. Click to claim your funds before this exclusive offer expires in 24 hours.",
    score: 9,
    risk: "CRITICAL",
    details: {
      indicators: ["Too good to be true", "No verification", "Time pressure", "Financial manipulation"],
      confidence: 97,
      processingTime: "18ms",
    },
  },
  {
    id: 3,
    industry: "Dating",
    title: "Romance Scam Pattern",
    message:
      "My dearest, I'm stuck in Turkey and need $2,000 for emergency medical treatment. I promise to pay you back when I return. You're the only person I trust. Please help me, my love.",
    score: 10,
    risk: "CRITICAL",
    details: {
      indicators: ["Emergency money request", "Emotional manipulation", "Geographic isolation", "Trust exploitation"],
      confidence: 99,
      processingTime: "31ms",
    },
  },
]

export default function ResultsPage() {
  const [expandedScenario, setExpandedScenario] = useState<number | null>(null)
  const router = useRouter()

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "CRITICAL":
        return "bg-red-500"
      case "HIGH":
        return "bg-orange-500"
      default:
        return "bg-yellow-500"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-red-400"
    if (score >= 6) return "text-orange-400"
    return "text-yellow-400"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-blue-400 mr-3" />
            <h1 className="text-3xl font-bold text-white">Veritas AI Detection Results</h1>
          </div>
          <p className="text-gray-300">Real-time fraud detection across industries</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">99.2%</div>
              <div className="text-sm text-gray-300">Detection Accuracy</div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">24ms</div>
              <div className="text-sm text-gray-300">Avg Response Time</div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="h-8 w-8 text-red-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">3/3</div>
              <div className="text-sm text-gray-300">Threats Detected</div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">$2.1M</div>
              <div className="text-sm text-gray-300">Fraud Prevented</div>
            </CardContent>
          </Card>
        </div>

        {/* Scenario Results */}
        <div className="space-y-6">
          {scenarios.map((scenario) => (
            <Card
              key={scenario.id}
              className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">{scenario.industry}</Badge>
                    <CardTitle className="text-white">{scenario.title}</CardTitle>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge className={`${getRiskColor(scenario.risk)} text-white`}>{scenario.risk} RISK</Badge>
                    <div className="text-right">
                      <div className={`text-3xl font-bold ${getScoreColor(scenario.score)}`}>{scenario.score}/10</div>
                      <div className="text-sm text-gray-400">Veritas Score™</div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="bg-slate-800/50 p-4 rounded-lg mb-4">
                  <p className="text-gray-300 italic">"{scenario.message}"</p>
                </div>

                <Button
                  variant="ghost"
                  onClick={() => setExpandedScenario(expandedScenario === scenario.id ? null : scenario.id)}
                  className="text-blue-400 hover:text-blue-300 p-0 h-auto"
                >
                  {expandedScenario === scenario.id ? (
                    <>
                      Hide Details <ChevronUp className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Show Analysis <ChevronDown className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                {expandedScenario === scenario.id && (
                  <div className="mt-4 p-4 bg-slate-800/30 rounded-lg animate-in slide-in-from-top-2 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="text-white font-semibold mb-2">Threat Indicators</h4>
                        <ul className="space-y-1">
                          {scenario.details.indicators.map((indicator, index) => (
                            <li key={index} className="text-gray-300 text-sm flex items-center">
                              <AlertTriangle className="h-3 w-3 text-red-400 mr-2" />
                              {indicator}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-2">Confidence Level</h4>
                        <div className="text-2xl font-bold text-green-400">{scenario.details.confidence}%</div>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-2">Processing Time</h4>
                        <div className="text-2xl font-bold text-blue-400">{scenario.details.processingTime}</div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Button
            onClick={() => router.push("/cta")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3"
          >
            See How Veritas AI Can Protect Your Business
          </Button>
        </div>
      </div>
    </div>
  )
}
