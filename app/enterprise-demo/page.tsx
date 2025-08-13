"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Shield, ArrowRight, CheckCircle, Building2, Lock } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function EnterpriseDemoPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    jobTitle: "",
    phone: "",
    companySize: "",
    industry: "",
    currentSolution: "",
    budget: "",
    timeline: "",
    useCase: "",
    complianceRequirements: [] as string[],
    integrationNeeds: "",
    expectedVolume: "",
    preferredDate: "",
    preferredTime: "",
    timezone: "",
    attendees: "",
    specificRequirements: "",
    gdprConsent: false,
  })

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleComplianceChange = (requirement: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      complianceRequirements: checked
        ? [...prev.complianceRequirements, requirement]
        : prev.complianceRequirements.filter((r) => r !== requirement),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Store enterprise demo data
    localStorage.setItem("enterpriseDemoBooking", JSON.stringify(formData))
    // Redirect to confirmation or contact sales
    router.push("/contact")
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
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-500/30">
              Enterprise Demo
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Schedule Your Enterprise Demo</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get a personalized demonstration of Veritas AI's enterprise-grade fraud detection platform. Our solutions
              team will show you how to protect your organization at scale.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Enterprise Benefits */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-blue-400" />
                    Enterprise Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">Custom ML Training</p>
                      <p className="text-gray-400 text-sm">Models trained on your specific data</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">On-Premise Deployment</p>
                      <p className="text-gray-400 text-sm">Full control over your data</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">Dedicated Support</p>
                      <p className="text-gray-400 text-sm">24/7 enterprise support team</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">White-Label Solution</p>
                      <p className="text-gray-400 text-sm">Branded for your organization</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Lock className="h-5 w-5 text-purple-400" />
                    Security & Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-gray-300 text-sm">SOC 2 Type II Certified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-gray-300 text-sm">GDPR & CCPA Compliant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-gray-300 text-sm">ISO 27001 Certified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-gray-300 text-sm">99.99% Uptime SLA</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enterprise Demo Form */}
            <div className="lg:col-span-2">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Enterprise Demo Request</CardTitle>
                  <CardDescription className="text-gray-300">
                    Tell us about your organization and we'll customize the demo to your specific needs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Contact Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
                        Contact Information
                      </h3>
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

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Work Email *</label>
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
                          <label className="block text-sm font-medium text-white mb-2">Phone Number *</label>
                          <Input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Job Title *</label>
                          <Input
                            required
                            value={formData.jobTitle}
                            onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                            placeholder="Chief Security Officer"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Company *</label>
                          <Input
                            required
                            value={formData.company}
                            onChange={(e) => handleInputChange("company", e.target.value)}
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                            placeholder="Enterprise Corp"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Company Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
                        Company Information
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Company Size *</label>
                          <Select
                            value={formData.companySize}
                            onValueChange={(value) => handleInputChange("companySize", value)}
                          >
                            <SelectTrigger className="bg-white/10 border-white/20 text-white">
                              <SelectValue placeholder="Select company size" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1000-5000">1,000-5,000 employees</SelectItem>
                              <SelectItem value="5000-10000">5,000-10,000 employees</SelectItem>
                              <SelectItem value="10000+">10,000+ employees</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Industry *</label>
                          <Select
                            value={formData.industry}
                            onValueChange={(value) => handleInputChange("industry", value)}
                          >
                            <SelectTrigger className="bg-white/10 border-white/20 text-white">
                              <SelectValue placeholder="Select industry" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="financial-services">Financial Services</SelectItem>
                              <SelectItem value="fintech">Fintech</SelectItem>
                              <SelectItem value="e-commerce">E-commerce</SelectItem>
                              <SelectItem value="dating-social">Dating & Social</SelectItem>
                              <SelectItem value="gaming">Gaming</SelectItem>
                              <SelectItem value="healthcare">Healthcare</SelectItem>
                              <SelectItem value="insurance">Insurance</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Current Solution</label>
                          <Input
                            value={formData.currentSolution}
                            onChange={(e) => handleInputChange("currentSolution", e.target.value)}
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                            placeholder="Current fraud detection solution"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Expected Monthly Volume</label>
                          <Select
                            value={formData.expectedVolume}
                            onValueChange={(value) => handleInputChange("expectedVolume", value)}
                          >
                            <SelectTrigger className="bg-white/10 border-white/20 text-white">
                              <SelectValue placeholder="Select volume" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1m-10m">1M - 10M requests</SelectItem>
                              <SelectItem value="10m-100m">10M - 100M requests</SelectItem>
                              <SelectItem value="100m+">100M+ requests</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
                        Project Details
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Budget Range</label>
                          <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                            <SelectTrigger className="bg-white/10 border-white/20 text-white">
                              <SelectValue placeholder="Select budget range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="100k-500k">$100K - $500K annually</SelectItem>
                              <SelectItem value="500k-1m">$500K - $1M annually</SelectItem>
                              <SelectItem value="1m+">$1M+ annually</SelectItem>
                              <SelectItem value="not-disclosed">Prefer not to disclose</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Implementation Timeline</label>
                          <Select
                            value={formData.timeline}
                            onValueChange={(value) => handleInputChange("timeline", value)}
                          >
                            <SelectTrigger className="bg-white/10 border-white/20 text-white">
                              <SelectValue placeholder="Select timeline" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="immediate">Immediate (0-3 months)</SelectItem>
                              <SelectItem value="short-term">Short-term (3-6 months)</SelectItem>
                              <SelectItem value="medium-term">Medium-term (6-12 months)</SelectItem>
                              <SelectItem value="long-term">Long-term (12+ months)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Primary Use Case *</label>
                        <Select value={formData.useCase} onValueChange={(value) => handleInputChange("useCase", value)}>
                          <SelectTrigger className="bg-white/10 border-white/20 text-white">
                            <SelectValue placeholder="Select primary use case" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="payment-fraud">Payment Fraud Detection</SelectItem>
                            <SelectItem value="account-takeover">Account Takeover Prevention</SelectItem>
                            <SelectItem value="identity-verification">Identity Verification</SelectItem>
                            <SelectItem value="content-moderation">Content Moderation</SelectItem>
                            <SelectItem value="bot-detection">Bot Detection</SelectItem>
                            <SelectItem value="compliance">Compliance & Risk Management</SelectItem>
                            <SelectItem value="multiple">Multiple Use Cases</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white mb-3">
                          Compliance Requirements (select all that apply)
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {["PCI DSS", "SOX", "GDPR", "CCPA", "HIPAA", "SOC 2"].map((requirement) => (
                            <div key={requirement} className="flex items-center space-x-2">
                              <Checkbox
                                id={requirement}
                                checked={formData.complianceRequirements.includes(requirement)}
                                onCheckedChange={(checked) => handleComplianceChange(requirement, checked as boolean)}
                                className="border-white/20 data-[state=checked]:bg-blue-600"
                              />
                              <label htmlFor={requirement} className="text-sm text-gray-300">
                                {requirement}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Integration Requirements</label>
                        <Textarea
                          value={formData.integrationNeeds}
                          onChange={(e) => handleInputChange("integrationNeeds", e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                          placeholder="Describe your integration needs (APIs, databases, existing systems...)"
                          rows={3}
                        />
                      </div>
                    </div>

                    {/* Demo Scheduling */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
                        Demo Scheduling
                      </h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Preferred Date</label>
                          <Input
                            type="date"
                            value={formData.preferredDate}
                            onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                            className="bg-white/10 border-white/20 text-white"
                            min={new Date().toISOString().split("T")[0]}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Preferred Time</label>
                          <Select
                            value={formData.preferredTime}
                            onValueChange={(value) => handleInputChange("preferredTime", value)}
                          >
                            <SelectTrigger className="bg-white/10 border-white/20 text-white">
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                              <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                              <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                              <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                              <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                              <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                              <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Timezone</label>
                          <Select
                            value={formData.timezone}
                            onValueChange={(value) => handleInputChange("timezone", value)}
                          >
                            <SelectTrigger className="bg-white/10 border-white/20 text-white">
                              <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="EST">Eastern (EST)</SelectItem>
                              <SelectItem value="CST">Central (CST)</SelectItem>
                              <SelectItem value="MST">Mountain (MST)</SelectItem>
                              <SelectItem value="PST">Pacific (PST)</SelectItem>
                              <SelectItem value="GMT">GMT</SelectItem>
                              <SelectItem value="CET">Central European (CET)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Demo Attendees</label>
                        <Input
                          value={formData.attendees}
                          onChange={(e) => handleInputChange("attendees", e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                          placeholder="Number of attendees and their roles (e.g., 3 - CISO, Security Manager, IT Director)"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Specific Requirements</label>
                        <Textarea
                          value={formData.specificRequirements}
                          onChange={(e) => handleInputChange("specificRequirements", e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                          placeholder="Any specific features, scenarios, or questions you'd like us to address during the demo..."
                          rows={4}
                        />
                      </div>
                    </div>

                    {/* Consent */}
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="gdpr-consent"
                        checked={formData.gdprConsent}
                        onCheckedChange={(checked) => handleInputChange("gdprConsent", checked as boolean)}
                        className="border-white/20 data-[state=checked]:bg-blue-600 mt-1"
                        required
                      />
                      <label htmlFor="gdpr-consent" className="text-sm text-gray-300 leading-relaxed">
                        I consent to Veritas AI processing my personal data for the purpose of scheduling and conducting
                        this enterprise demo. I understand that I can withdraw this consent at any time. *
                      </label>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg py-6"
                    >
                      Schedule Enterprise Demo
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
