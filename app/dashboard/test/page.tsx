"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { TestTube, Send, Shield, AlertTriangle, CheckCircle, Zap, Copy, RefreshCw } from "lucide-react"

interface TestResult {
  veritasScore: number
  riskLevel: "low" | "medium" | "high"
  flags: string[]
  confidence: number
  processingTime: number
  analysis: {
    sentiment: string
    language: string
    patterns: string[]
    recommendations: string[]
  }
}

export default function MessageTesterPage() {
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<TestResult | null>(null)

  const handleTest = async () => {
    if (!message.trim()) return

    setIsLoading(true)

    // Simulate API call with realistic delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generate realistic test results based on message content
    const messageContent = message.toLowerCase()
    let veritasScore = 85
    const flags: string[] = []
    let riskLevel: "low" | "medium" | "high" = "low"

    // Fraud detection logic
    if (
      messageContent.includes("money") ||
      messageContent.includes("investment") ||
      messageContent.includes("guaranteed")
    ) {
      veritasScore = Math.floor(Math.random() * 30) + 10 // 10-40
      flags.push("Financial Scam Risk")
      riskLevel = "high"
    }

    if (messageContent.includes("crypto") || messageContent.includes("bitcoin")) {
      veritasScore = Math.floor(Math.random() * 25) + 15 // 15-40
      flags.push("Crypto Lure", "Investment Fraud")
      riskLevel = "high"
    }

    if (
      messageContent.includes("urgent") ||
      messageContent.includes("limited time") ||
      messageContent.includes("act now")
    ) {
      veritasScore -= 20
      flags.push("Urgency Manipulation")
      if (riskLevel === "low") riskLevel = "medium"
    }

    if (
      messageContent.includes("ai") ||
      messageContent.includes("generated") ||
      messageContent.includes("comprehensive")
    ) {
      veritasScore = Math.floor(Math.random() * 30) + 50 // 50-80
      flags.push("AI Generated")
      if (riskLevel === "low") riskLevel = "medium"
    }

    // Ensure score is within bounds
    veritasScore = Math.max(0, Math.min(100, veritasScore))

    const mockResult: TestResult = {
      veritasScore,
      riskLevel,
      flags,
      confidence: Math.floor(Math.random() * 30) + 70, // 70-100
      processingTime: Math.floor(Math.random() * 50) + 25, // 25-75ms
      analysis: {
        sentiment: veritasScore > 70 ? "Neutral" : veritasScore > 40 ? "Suspicious" : "Highly Suspicious",
        language: "English",
        patterns: flags.length > 0 ? ["Persuasive Language", "Call to Action"] : ["Standard Communication"],
        recommendations:
          veritasScore < 50
            ? ["Block message", "Flag for review", "Alert user"]
            : veritasScore < 80
              ? ["Monitor closely", "Request verification"]
              : ["Allow with standard monitoring"],
      },
    }

    setResult(mockResult)
    setIsLoading(false)
  }

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

  const copyResult = () => {
    if (result) {
      const resultText = `Veritas Score: ${result.veritasScore}/100
Risk Level: ${result.riskLevel.toUpperCase()}
Confidence: ${result.confidence}%
Processing Time: ${result.processingTime}ms
Flags: ${result.flags.join(", ") || "None"}
Sentiment: ${result.analysis.sentiment}
Recommendations: ${result.analysis.recommendations.join(", ")}`

      navigator.clipboard.writeText(resultText)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg mr-4">
              <TestTube className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Message Tester
              </h1>
              <p className="text-gray-400 text-lg">Advanced fraud detection and message analysis</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="xl:col-span-1">
            <Card className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl shadow-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-white flex items-center text-xl">
                  <Send className="mr-3 h-6 w-6 text-blue-400" />
                  Test Message
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Enter any message to analyze for fraud patterns, AI content, and risk assessment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="message" className="text-white font-medium">
                    Message Content
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Paste or type the message you want to analyze..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[200px] bg-white/10 border-white/20 text-white placeholder:text-gray-400 resize-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  />
                  <div className="text-xs text-gray-500 text-right">{message.length} characters</div>
                </div>

                <Button
                  onClick={handleTest}
                  disabled={!message.trim() || isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 h-12 text-lg font-medium shadow-lg hover:shadow-xl transition-all"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="mr-3 h-5 w-5 animate-spin" />
                      Analyzing Message...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-3 h-5 w-5" />
                      Run Analysis
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="xl:col-span-2">
            <Card className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl shadow-2xl">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white flex items-center text-xl">
                      <Shield className="mr-3 h-6 w-6 text-purple-400" />
                      Analysis Results
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Comprehensive Veritas AI fraud detection analysis
                    </CardDescription>
                  </div>
                  {result && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyResult}
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {!result ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="p-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg mb-6">
                      <TestTube className="h-16 w-16 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Ready to Analyze</h3>
                    <p className="text-gray-400 max-w-md">
                      Enter a message and click "Run Analysis" to get comprehensive fraud detection results
                    </p>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {/* Score and Risk Level */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 backdrop-blur-sm">
                        <div className="flex items-center justify-center mb-3">
                          <Shield className="h-6 w-6 text-blue-400 mr-2" />
                          <span className="text-gray-300 font-medium">Veritas Score</span>
                        </div>
                        <div className={`text-5xl font-bold mb-2 ${getScoreColor(result.veritasScore)}`}>
                          {result.veritasScore}
                        </div>
                        <div className="text-gray-400 text-sm">out of 100</div>
                      </div>

                      <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 backdrop-blur-sm">
                        <div className="flex items-center justify-center mb-3">
                          <AlertTriangle className="h-6 w-6 text-purple-400 mr-2" />
                          <span className="text-gray-300 font-medium">Risk Assessment</span>
                        </div>
                        <Badge className={`${getRiskColor(result.riskLevel)} text-lg px-4 py-2 font-semibold`}>
                          {result.riskLevel.toUpperCase()}
                        </Badge>
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-white/10 to-white/5 border border-white/20 backdrop-blur-sm">
                        <span className="text-gray-400 font-medium">Confidence Level</span>
                        <span className="text-white font-bold text-lg">{result.confidence}%</span>
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-white/10 to-white/5 border border-white/20 backdrop-blur-sm">
                        <span className="text-gray-400 font-medium">Processing Time</span>
                        <span className="text-white font-bold text-lg">{result.processingTime}ms</span>
                      </div>
                    </div>

                    {/* Flags */}
                    {result.flags.length > 0 && (
                      <div className="p-6 rounded-xl bg-gradient-to-r from-red-600/10 to-red-500/10 border border-red-600/30 backdrop-blur-sm">
                        <h4 className="text-white font-semibold mb-4 flex items-center">
                          <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
                          Security Flags Detected
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {result.flags.map((flag, index) => (
                            <Badge key={index} className="border-red-600/50 text-red-300 bg-red-600/20 px-3 py-1">
                              {flag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Analysis Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm">
                        <h4 className="text-white font-semibold mb-4">Analysis Details</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                            <span className="text-gray-400">Sentiment</span>
                            <span className="text-white font-medium">{result.analysis.sentiment}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                            <span className="text-gray-400">Language</span>
                            <span className="text-white font-medium">{result.analysis.language}</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm">
                        <h4 className="text-white font-semibold mb-4">Recommendations</h4>
                        <div className="space-y-2">
                          {result.analysis.recommendations.map((rec, index) => (
                            <div key={index} className="flex items-start p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                              <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-300 text-sm leading-relaxed">{rec}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Example Messages */}
        <div className="mt-8">
          <Card className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white text-xl">Quick Test Examples</CardTitle>
              <CardDescription className="text-gray-400">
                Try these sample messages to see Veritas AI in action
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h5 className="text-red-400 font-semibold flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    High Risk Examples
                  </h5>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full text-left justify-start h-auto p-4 border-red-600/30 text-red-300 hover:bg-red-600/10 bg-transparent backdrop-blur-sm"
                      onClick={() =>
                        setMessage("Send me $500 and I'll show you how to make $50,000 in crypto! Guaranteed returns!")
                      }
                    >
                      <div className="text-left">
                        <div className="font-medium">Crypto Investment Scam</div>
                        <div className="text-xs text-red-400/70 mt-1">Financial fraud with urgency tactics</div>
                      </div>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full text-left justify-start h-auto p-4 border-red-600/30 text-red-300 hover:bg-red-600/10 bg-transparent backdrop-blur-sm"
                      onClick={() =>
                        setMessage(
                          "URGENT: Your account will be closed! Click here immediately to verify your information.",
                        )
                      }
                    >
                      <div className="text-left">
                        <div className="font-medium">Phishing Attempt</div>
                        <div className="text-xs text-red-400/70 mt-1">Account verification scam</div>
                      </div>
                    </Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <h5 className="text-green-400 font-semibold flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Low Risk Examples
                  </h5>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full text-left justify-start h-auto p-4 border-green-600/30 text-green-300 hover:bg-green-600/10 bg-transparent backdrop-blur-sm"
                      onClick={() =>
                        setMessage(
                          "Thanks for the helpful tutorial! This really helped me understand the process better.",
                        )
                      }
                    >
                      <div className="text-left">
                        <div className="font-medium">Genuine Feedback</div>
                        <div className="text-xs text-green-400/70 mt-1">Positive user interaction</div>
                      </div>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full text-left justify-start h-auto p-4 border-green-600/30 text-green-300 hover:bg-green-600/10 bg-transparent backdrop-blur-sm"
                      onClick={() =>
                        setMessage("Looking forward to our meeting tomorrow at 2 PM. I'll bring the quarterly reports.")
                      }
                    >
                      <div className="text-left">
                        <div className="font-medium">Business Communication</div>
                        <div className="text-xs text-green-400/70 mt-1">Professional correspondence</div>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
