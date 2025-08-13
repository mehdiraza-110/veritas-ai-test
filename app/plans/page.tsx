"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Zap, Building2, Crown, Shield, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Perfect for getting started with basic threat detection",
    icon: Zap,
    features: [
      "1,000 API calls/month",
      "Basic threat detection",
      "Email support",
      "Community access",
      "Basic analytics dashboard",
    ],
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$49",
    period: "/month",
    description: "Advanced features for growing teams and businesses",
    icon: Building2,
    features: [
      "50,000 API calls/month",
      "Advanced ML models",
      "Priority support",
      "99.9% uptime SLA",
      "Advanced analytics",
      "Custom rules engine",
      "Webhook integrations",
      "Team collaboration",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Tailored solutions for large-scale operations",
    icon: Crown,
    features: [
      "Unlimited API calls",
      "Custom ML training",
      "Dedicated support",
      "99.99% uptime SLA",
      "White-label solution",
      "On-premise deployment",
      "Custom integrations",
      "Compliance certifications",
    ],
    popular: false,
  },
]

export default function PlansPage() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [demoData, setDemoData] = useState<any>(null)

  useEffect(() => {
    // Load demo booking data if available
    const demoBooking = localStorage.getItem("demoBooking")
    if (demoBooking) {
      setDemoData(JSON.parse(demoBooking))
    }
  }, [])

  const handleSelectPlan = (planId: string) => {
    const selectedPlanData = plans.find((plan) => plan.id === planId)

    // Store selected plan
    localStorage.setItem("selectedPlan", JSON.stringify(selectedPlanData))

    // Redirect to registration
    router.push("/register")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 backdrop-blur-sm bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">Veritas AI</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/auth/signin">
                <Button variant="ghost" className="text-white hover:text-blue-400">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <span className="ml-2 text-green-400 font-medium">Demo Booked</span>
              </div>
              <div className="w-16 h-0.5 bg-blue-500"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <span className="ml-2 text-blue-400 font-medium">Select Plan</span>
              </div>
              <div className="w-16 h-0.5 bg-gray-600"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-gray-400 font-bold">
                  3
                </div>
                <span className="ml-2 text-gray-400 font-medium">Create Account</span>
              </div>
              <div className="w-16 h-0.5 bg-gray-600"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-gray-400 font-bold">
                  4
                </div>
                <span className="ml-2 text-gray-400 font-medium">Payment</span>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30">Choose Your Plan</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Select Your Veritas AI Plan</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Choose the perfect plan for your organization's threat detection needs. Start free and scale as you grow.
            </p>

            {demoData && (
              <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10 max-w-md mx-auto">
                <p className="text-green-400 text-sm">
                  Demo scheduled for {demoData.company} • {demoData.useCase}
                </p>
              </div>
            )}
          </div>

          {/* Plans Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {plans.map((plan) => {
              const Icon = plan.icon
              const isPopular = plan.popular

              return (
                <Card
                  key={plan.id}
                  className={`relative bg-white/5 border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 ${
                    isPopular ? "ring-2 ring-blue-500/50" : ""
                  }`}
                >
                  {isPopular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600">
                      Most Popular
                    </Badge>
                  )}

                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center ${
                          isPopular ? "bg-gradient-to-r from-blue-600 to-purple-600" : "bg-white/10"
                        }`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-white">{plan.name}</CardTitle>
                    <CardDescription className="text-gray-300">{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      <span className="text-gray-400">{plan.period}</span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                          <span className="text-gray-200">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => handleSelectPlan(plan.id)}
                      className={`w-full ${
                        isPopular
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          : "bg-white/10 hover:bg-white/20 border border-white/20"
                      } text-white`}
                    >
                      {plan.id === "enterprise" ? "Contact Sales" : `Select ${plan.name}`}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Trust Indicators */}
          <div className="text-center">
            <p className="text-gray-300 mb-6">Trusted by leading companies worldwide</p>
            <div className="flex flex-wrap justify-center items-center gap-4 text-gray-400">
              <Badge variant="outline" className="border-white/20 text-gray-300 bg-white/5">
                SOC 2 Certified
              </Badge>
              <Badge variant="outline" className="border-white/20 text-gray-300 bg-white/5">
                GDPR Compliant
              </Badge>
              <Badge variant="outline" className="border-white/20 text-gray-300 bg-white/5">
                99.9% Uptime SLA
              </Badge>
              <Badge variant="outline" className="border-white/20 text-gray-300 bg-white/5">
                Enterprise Security
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
