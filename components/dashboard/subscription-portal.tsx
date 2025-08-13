"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, Download, Mail, Check, Zap, Crown, Building, Calendar } from "lucide-react"

export function SubscriptionPortal() {
  const [promoCode, setPromoCode] = useState("")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Subscription & Billing</h1>
        <p className="text-gray-400">Manage your plan, usage, and billing information</p>
      </div>

      {/* Current Plan */}
      <Card className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-blue-500/30 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center">
                <Crown className="mr-2 h-5 w-5 text-yellow-400" />
                Pro Plan
              </CardTitle>
              <CardDescription className="text-gray-300">Your current subscription</CardDescription>
            </div>
            <Badge className="bg-green-600/20 text-green-400 border-green-600/30">Active</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">$49</div>
              <p className="text-sm text-gray-400">per month</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">Dec 25, 2024</div>
              <p className="text-sm text-gray-400">Next billing date</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">14 days</div>
              <p className="text-sm text-gray-400">Trial remaining</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
              Change Plan
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
              Cancel Subscription
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Usage Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Usage This Month</CardTitle>
            <CardDescription className="text-gray-400">Track your API calls and message processing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Messages Processed</span>
                <span className="text-sm text-white">847,293 / 1,000,000</span>
              </div>
              <Progress value={84.7} className="h-2 bg-white/10" />
              <p className="text-xs text-gray-400">84.7% of monthly limit used</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">API Calls</span>
                <span className="text-sm text-white">234,567 / 500,000</span>
              </div>
              <Progress value={46.9} className="h-2 bg-white/10" />
              <p className="text-xs text-gray-400">46.9% of monthly limit used</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Team Members</span>
                <span className="text-sm text-white">8 / 25</span>
              </div>
              <Progress value={32} className="h-2 bg-white/10" />
              <p className="text-xs text-gray-400">17 seats available</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Promo Code</CardTitle>
            <CardDescription className="text-gray-400">Apply a promotional code to your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="promo" className="text-white">
                Promo Code
              </Label>
              <div className="flex space-x-2">
                <Input
                  id="promo"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Apply
                </Button>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-green-600/20 border border-green-600/30">
              <p className="text-sm text-green-400">🎉 WELCOME20 applied! 20% off your first 3 months.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pricing Plans */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-blue-400" />
                <CardTitle className="text-white">Free</CardTitle>
              </div>
              <CardDescription className="text-gray-400">Perfect for getting started</CardDescription>
              <div className="text-3xl font-bold text-white">
                $0<span className="text-lg text-gray-400">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-300">
                  <Check className="mr-2 h-4 w-4 text-green-400" />
                  10,000 messages/month
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <Check className="mr-2 h-4 w-4 text-green-400" />
                  Basic threat detection
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <Check className="mr-2 h-4 w-4 text-green-400" />
                  Email support
                </li>
              </ul>
              <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent">
                Current Plan
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-blue-500/30 backdrop-blur-sm relative">
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600">
              Most Popular
            </Badge>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Crown className="h-5 w-5 text-yellow-400" />
                <CardTitle className="text-white">Pro</CardTitle>
              </div>
              <CardDescription className="text-gray-300">For growing teams</CardDescription>
              <div className="text-3xl font-bold text-white">
                $49<span className="text-lg text-gray-400">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-300">
                  <Check className="mr-2 h-4 w-4 text-green-400" />
                  1M messages/month
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <Check className="mr-2 h-4 w-4 text-green-400" />
                  Advanced AI detection
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <Check className="mr-2 h-4 w-4 text-green-400" />
                  25 team members
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <Check className="mr-2 h-4 w-4 text-green-400" />
                  Priority support
                </li>
              </ul>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Upgrade to Pro
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Building className="h-5 w-5 text-purple-400" />
                <CardTitle className="text-white">Enterprise</CardTitle>
              </div>
              <CardDescription className="text-gray-400">For large organizations</CardDescription>
              <div className="text-3xl font-bold text-white">Custom</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-300">
                  <Check className="mr-2 h-4 w-4 text-green-400" />
                  Unlimited messages
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <Check className="mr-2 h-4 w-4 text-green-400" />
                  Custom AI models
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <Check className="mr-2 h-4 w-4 text-green-400" />
                  Unlimited team members
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <Check className="mr-2 h-4 w-4 text-green-400" />
                  Dedicated support
                </li>
              </ul>
              <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent">
                Contact Sales
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Invoice History */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <CreditCard className="mr-2 h-5 w-5" />
            Invoice History
          </CardTitle>
          <CardDescription className="text-gray-400">Download and manage your billing history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { date: "Nov 25, 2024", amount: "$49.00", status: "Paid", invoice: "INV-2024-001" },
              { date: "Oct 25, 2024", amount: "$49.00", status: "Paid", invoice: "INV-2024-002" },
              { date: "Sep 25, 2024", amount: "$49.00", status: "Paid", invoice: "INV-2024-003" },
            ].map((invoice, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div className="flex items-center space-x-4">
                  <div>
                    <Calendar className="h-4 w-4 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{invoice.invoice}</p>
                    <p className="text-xs text-gray-400">{invoice.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">{invoice.amount}</p>
                    <Badge variant="outline" className="border-green-500/30 text-green-400">
                      {invoice.status}
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <Mail className="h-4 w-4" />
                    </Button>
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
