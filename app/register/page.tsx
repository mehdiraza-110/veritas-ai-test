"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Shield, ArrowRight, Eye, EyeOff, CheckCircle, Lock } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [demoData, setDemoData] = useState<any>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    agreeToMarketing: false,
  })

  useEffect(() => {
    // Load data from previous steps
    const planData = localStorage.getItem("selectedPlan")
    const demoBooking = localStorage.getItem("demoBooking")

    if (planData) {
      setSelectedPlan(JSON.parse(planData))
    }

    if (demoBooking) {
      const demo = JSON.parse(demoBooking)
      setDemoData(demo)
      // Pre-fill form with demo data
      setFormData((prev) => ({
        ...prev,
        firstName: demo.firstName || "",
        lastName: demo.lastName || "",
        email: demo.email || "",
        company: demo.company || "",
      }))
    }
  }, [])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match")
      return
    }

    if (!formData.agreeToTerms) {
      alert("Please agree to the Terms of Service")
      return
    }

    // Store registration data
    localStorage.setItem("registrationData", JSON.stringify(formData))
    router.push("/payment")
  }

  const passwordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const getStrengthColor = (strength: number) => {
    if (strength < 2) return "bg-red-500"
    if (strength < 4) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getStrengthText = (strength: number) => {
    if (strength < 2) return "Weak"
    if (strength < 4) return "Medium"
    return "Strong"
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
        <div className="max-w-4xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <span className="ml-2 text-green-400 font-medium">Demo Booked</span>
              </div>
              <div className="w-16 h-0.5 bg-green-500"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <span className="ml-2 text-green-400 font-medium">Plan Selected</span>
              </div>
              <div className="w-16 h-0.5 bg-blue-500"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <span className="ml-2 text-blue-400 font-medium">Create Account</span>
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

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm h-fit">
                <CardHeader>
                  <CardTitle className="text-white">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedPlan && (
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-white font-semibold">{selectedPlan.name} Plan</h3>
                          <p className="text-gray-400 text-sm">{selectedPlan.description}</p>
                        </div>
                        {selectedPlan.popular && (
                          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600">Popular</Badge>
                        )}
                      </div>
                      <div className="text-2xl font-bold text-white">
                        {selectedPlan.price}
                        {selectedPlan.price !== "Custom" && <span className="text-lg text-gray-400">/month</span>}
                      </div>
                    </div>
                  )}

                  {demoData && (
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <h4 className="text-white font-medium mb-2">Demo Scheduled</h4>
                      <p className="text-gray-400 text-sm">
                        {demoData.preferredDate && demoData.preferredTime
                          ? `${demoData.preferredDate} at ${demoData.preferredTime}`
                          : "We'll contact you to schedule"}
                      </p>
                      <p className="text-gray-400 text-sm">Use case: {demoData.useCase}</p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-green-400 text-sm">
                      <Lock className="h-4 w-4" />
                      <span>Secure checkout with 256-bit SSL</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Registration Form */}
            <div className="lg:col-span-2">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Create Your Account</CardTitle>
                  <CardDescription className="text-gray-300">
                    Set up your Veritas AI account to get started
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">First Name *</label>
                        <Input
                          required
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Last Name *</label>
                        <Input
                          required
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Email Address *</label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        placeholder="john@company.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Company *</label>
                      <Input
                        required
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        placeholder="Acme Corp"
                      />
                    </div>

                    {/* Password Fields */}
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Password *</label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          required
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 pr-10"
                          placeholder="Create a strong password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {formData.password && (
                        <div className="mt-2">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-700 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(
                                  passwordStrength(formData.password),
                                )}`}
                                style={{ width: `${(passwordStrength(formData.password) / 5) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-400">
                              {getStrengthText(passwordStrength(formData.password))}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Confirm Password *</label>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          required
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 pr-10"
                          placeholder="Confirm your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                        <p className="text-red-400 text-sm mt-1">Passwords don't match</p>
                      )}
                    </div>

                    {/* Terms and Conditions */}
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="terms"
                          checked={formData.agreeToTerms}
                          onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                          className="mt-1"
                        />
                        <label htmlFor="terms" className="text-sm text-gray-300 leading-relaxed">
                          I agree to the{" "}
                          <Link href="/terms" className="text-blue-400 hover:text-blue-300 underline">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-blue-400 hover:text-blue-300 underline">
                            Privacy Policy
                          </Link>
                          *
                        </label>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="marketing"
                          checked={formData.agreeToMarketing}
                          onCheckedChange={(checked) => handleInputChange("agreeToMarketing", checked as boolean)}
                          className="mt-1"
                        />
                        <label htmlFor="marketing" className="text-sm text-gray-300 leading-relaxed">
                          I'd like to receive product updates, security alerts, and marketing communications from
                          Veritas AI
                        </label>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={!formData.agreeToTerms || formData.password !== formData.confirmPassword}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg py-6 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Create Account & Continue to Payment
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
