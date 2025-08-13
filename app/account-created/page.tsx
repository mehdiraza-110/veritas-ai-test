"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, CheckCircle, ArrowRight, Mail, Calendar, CreditCard, User, Zap } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AccountCreatedPage() {
  const router = useRouter()
  const [accountData, setAccountData] = useState<any>(null)
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [demoData, setDemoData] = useState<any>(null)

  useEffect(() => {
    // Load all the data from the flow
    const regData = localStorage.getItem("registrationData")
    const planData = localStorage.getItem("selectedPlan")
    const demoBooking = localStorage.getItem("demoBooking")
    const paymentCompleted = localStorage.getItem("paymentCompleted")

    // Redirect if payment wasn't completed
    if (!paymentCompleted) {
      router.push("/payment")
      return
    }

    if (regData) {
      setAccountData(JSON.parse(regData))
    }

    if (planData) {
      setSelectedPlan(JSON.parse(planData))
    }

    if (demoBooking) {
      setDemoData(JSON.parse(demoBooking))
    }
  }, [router])

  const handleLoginRedirect = () => {
    // Clear the flow data since account is created
    localStorage.removeItem("selectedPlan")
    localStorage.removeItem("registrationData")
    localStorage.removeItem("demoBooking")
    localStorage.removeItem("paymentCompleted")
    localStorage.removeItem("accountCreated")

    // Redirect to login
    router.push("/auth/signin")
  }

  const nextSteps = [
    {
      icon: Mail,
      title: "Check Your Email",
      description: "We've sent a welcome email with your account details and getting started guide.",
      action: "Verify Email",
    },
    {
      icon: Calendar,
      title: "Demo Scheduled",
      description: demoData?.preferredDate
        ? `Your demo is scheduled for ${demoData.preferredDate} at ${demoData.preferredTime}`
        : "Our team will contact you within 24 hours to schedule your personalized demo.",
      action: "View Calendar",
    },
    {
      icon: Zap,
      title: "Start Using Veritas AI",
      description: "Access your dashboard and begin protecting your organization with AI-powered threat detection.",
      action: "Go to Dashboard",
    },
  ]

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
          </div>
        </div>
      </nav>

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
            <Badge className="mb-4 bg-green-500/20 text-green-300 border-green-500/30">Account Created</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Welcome to Veritas AI!</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Your account has been successfully created and your subscription is now active. Get ready to experience
              next-generation threat detection.
            </p>
          </div>

          {/* Account Summary */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-400" />
                  Account Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {accountData && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Name</span>
                      <span className="text-white">{`${accountData.firstName} ${accountData.lastName}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Email</span>
                      <span className="text-white">{accountData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Company</span>
                      <span className="text-white">{accountData.company}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Account ID</span>
                      <span className="text-white font-mono text-sm">
                        VA-{Math.random().toString(36).substr(2, 8).toUpperCase()}
                      </span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-purple-400" />
                  Subscription Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {selectedPlan && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Plan</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white">{selectedPlan.name}</span>
                        {selectedPlan.popular && (
                          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-xs">Popular</Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Price</span>
                      <span className="text-white">
                        {selectedPlan.price}
                        {selectedPlan.price !== "Custom" && <span className="text-gray-400">/month</span>}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status</span>
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Active</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Next Billing</span>
                      <span className="text-white">
                        {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                      </span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Next Steps */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle className="text-white">What's Next?</CardTitle>
              <CardDescription className="text-gray-300">
                Here are your next steps to get the most out of Veritas AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {nextSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <step.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold mb-1">{step.title}</h3>
                      <p className="text-gray-300 text-sm mb-3">{step.description}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                      >
                        {step.action}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Login CTA */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/30 backdrop-blur-sm">
              <CardContent className="py-8">
                <h2 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h2>
                <p className="text-gray-300 mb-6">
                  Log in to your new Veritas AI account and start protecting your organization today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={handleLoginRedirect}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3"
                  >
                    Sign In to Your Account
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 bg-transparent text-lg px-8 py-3"
                  >
                    View Documentation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Support */}
          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm">
              Need help getting started?{" "}
              <Link href="/support" className="text-blue-400 hover:text-blue-300 underline">
                Contact our support team
              </Link>{" "}
              or{" "}
              <Link href="/docs" className="text-blue-400 hover:text-blue-300 underline">
                browse our documentation
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
