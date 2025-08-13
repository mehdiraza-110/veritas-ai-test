"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Shield, ArrowRight, CheckCircle, Lock, CreditCard, Calendar, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function PaymentPage() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [registrationData, setRegistrationData] = useState<any>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    billingAddress: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "US",
    },
  })

  useEffect(() => {
    // Load data from previous steps
    const planData = localStorage.getItem("selectedPlan")
    const regData = localStorage.getItem("registrationData")

    if (planData) {
      setSelectedPlan(JSON.parse(planData))
    }

    if (regData) {
      const registration = JSON.parse(regData)
      setRegistrationData(registration)
      // Pre-fill cardholder name
      setPaymentData((prev) => ({
        ...prev,
        cardholderName: `${registration.firstName} ${registration.lastName}`,
      }))
    }
  }, [])

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith("billing.")) {
      const billingField = field.split(".")[1]
      setPaymentData((prev) => ({
        ...prev,
        billingAddress: {
          ...prev.billingAddress,
          [billingField]: value,
        },
      }))
    } else {
      setPaymentData((prev) => ({ ...prev, [field]: value }))
    }
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, "")
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`
    }
    return v
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    if (formatted.length <= 19) {
      handleInputChange("cardNumber", formatted)
    }
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value)
    if (formatted.length <= 5) {
      handleInputChange("expiryDate", formatted)
    }
  }

  const getCardType = (number: string) => {
    const num = number.replace(/\s/g, "")
    if (/^4/.test(num)) return "Visa"
    if (/^5[1-5]/.test(num)) return "Mastercard"
    if (/^3[47]/.test(num)) return "American Express"
    if (/^6/.test(num)) return "Discover"
    return "Card"
  }

  const calculateTotal = () => {
    if (!selectedPlan) return 0
    if (selectedPlan.price === "Custom") return 0
    return Number.parseFloat(selectedPlan.price.replace("$", ""))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Store payment completion
    localStorage.setItem("paymentCompleted", "true")
    localStorage.setItem("accountCreated", "true")

    setIsProcessing(false)
    router.push("/account-created")
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
            <div className="flex items-center space-x-2 text-green-400">
              <Lock className="h-4 w-4" />
              <span className="text-sm">Secure Checkout</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
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
              <div className="w-16 h-0.5 bg-green-500"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <span className="ml-2 text-green-400 font-medium">Account Info</span>
              </div>
              <div className="w-16 h-0.5 bg-blue-500"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  4
                </div>
                <span className="ml-2 text-blue-400 font-medium">Payment</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-3">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Information
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Enter your payment details to complete your subscription
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Card Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">Card Details</h3>

                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Card Number *</label>
                        <div className="relative">
                          <Input
                            required
                            value={paymentData.cardNumber}
                            onChange={handleCardNumberChange}
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 pl-10"
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                          />
                          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          {paymentData.cardNumber && (
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                              {getCardType(paymentData.cardNumber)}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Expiry Date *</label>
                          <div className="relative">
                            <Input
                              required
                              value={paymentData.expiryDate}
                              onChange={handleExpiryChange}
                              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 pl-10"
                              placeholder="MM/YY"
                              maxLength={5}
                            />
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">CVV *</label>
                          <Input
                            required
                            value={paymentData.cvv}
                            onChange={(e) => handleInputChange("cvv", e.target.value.replace(/\D/g, "").slice(0, 4))}
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                            placeholder="123"
                            maxLength={4}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Cardholder Name *</label>
                        <div className="relative">
                          <Input
                            required
                            value={paymentData.cardholderName}
                            onChange={(e) => handleInputChange("cardholderName", e.target.value)}
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 pl-10"
                            placeholder="John Doe"
                          />
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-white/10" />

                    {/* Billing Address */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">Billing Address</h3>

                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Street Address *</label>
                        <Input
                          required
                          value={paymentData.billingAddress.street}
                          onChange={(e) => handleInputChange("billing.street", e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                          placeholder="123 Main Street"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">City *</label>
                          <Input
                            required
                            value={paymentData.billingAddress.city}
                            onChange={(e) => handleInputChange("billing.city", e.target.value)}
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                            placeholder="New York"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">State *</label>
                          <Input
                            required
                            value={paymentData.billingAddress.state}
                            onChange={(e) => handleInputChange("billing.state", e.target.value)}
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                            placeholder="NY"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">ZIP Code *</label>
                          <Input
                            required
                            value={paymentData.billingAddress.zipCode}
                            onChange={(e) => handleInputChange("billing.zipCode", e.target.value)}
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                            placeholder="10001"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Country *</label>
                          <Select
                            value={paymentData.billingAddress.country}
                            onValueChange={(value) => handleInputChange("billing.country", value)}
                          >
                            <SelectTrigger className="bg-white/10 border-white/20 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="US">United States</SelectItem>
                              <SelectItem value="CA">Canada</SelectItem>
                              <SelectItem value="GB">United Kingdom</SelectItem>
                              <SelectItem value="AU">Australia</SelectItem>
                              <SelectItem value="DE">Germany</SelectItem>
                              <SelectItem value="FR">France</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg py-6 disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Processing Payment...
                        </div>
                      ) : (
                        <>
                          Complete Payment ${calculateTotal()}
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-2">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm h-fit sticky top-8">
                <CardHeader>
                  <CardTitle className="text-white">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedPlan && (
                    <>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-white font-semibold">{selectedPlan.name} Plan</h3>
                          <p className="text-gray-400 text-sm">{selectedPlan.description}</p>
                          {selectedPlan.popular && (
                            <Badge className="mt-1 bg-gradient-to-r from-blue-600 to-purple-600">Popular</Badge>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-white">
                            {selectedPlan.price}
                            {selectedPlan.price !== "Custom" && <span className="text-sm text-gray-400">/month</span>}
                          </div>
                        </div>
                      </div>

                      <Separator className="bg-white/10" />

                      <div className="space-y-2">
                        <div className="flex justify-between text-gray-300">
                          <span>Subtotal</span>
                          <span>${calculateTotal()}</span>
                        </div>
                        <div className="flex justify-between text-gray-300">
                          <span>Tax</span>
                          <span>$0.00</span>
                        </div>
                        <Separator className="bg-white/10" />
                        <div className="flex justify-between text-white font-semibold text-lg">
                          <span>Total</span>
                          <span>${calculateTotal()}</span>
                        </div>
                      </div>
                    </>
                  )}

                  {registrationData && (
                    <>
                      <Separator className="bg-white/10" />
                      <div className="p-3 bg-white/5 rounded-lg">
                        <h4 className="text-white font-medium mb-1">Account Details</h4>
                        <p className="text-gray-400 text-sm">{registrationData.email}</p>
                        <p className="text-gray-400 text-sm">{registrationData.company}</p>
                      </div>
                    </>
                  )}

                  <div className="pt-4 space-y-3">
                    <div className="flex items-center gap-2 text-green-400 text-sm">
                      <Lock className="h-4 w-4" />
                      <span>256-bit SSL encryption</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-400 text-sm">
                      <Shield className="h-4 w-4" />
                      <span>PCI DSS compliant</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-400 text-sm">
                      <CheckCircle className="h-4 w-4" />
                      <span>30-day money-back guarantee</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
