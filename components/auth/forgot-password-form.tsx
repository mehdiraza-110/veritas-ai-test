"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, ArrowLeft, Mail, CheckCircle } from "lucide-react"
import Link from "next/link"

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate password reset request
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 2000)
  }

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-md bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">Veritas AI</span>
          </div>
          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-green-400" />
          </div>
          <CardTitle className="text-2xl text-white">Check your email</CardTitle>
          <CardDescription className="text-gray-300">We've sent a password reset link to {email}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-green-600/10 border border-green-600/20">
            <p className="text-sm text-green-400 text-center">
              If you don't see the email, check your spam folder or try again.
            </p>
          </div>

          <Link href="/auth/signin">
            <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Sign In
            </Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md bg-white/5 border-white/10 backdrop-blur-sm">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Shield className="h-8 w-8 text-blue-400" />
          <span className="text-2xl font-bold text-white">Veritas AI</span>
        </div>
        <CardTitle className="text-2xl text-white">Reset your password</CardTitle>
        <CardDescription className="text-gray-300">
          Enter your email address and we'll send you a link to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            disabled={isLoading}
          >
            {isLoading ? (
              "Sending reset link..."
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Send Reset Link
              </>
            )}
          </Button>
        </form>

        <div className="text-center">
          <Link
            href="/auth/signin"
            className="text-sm text-blue-400 hover:text-blue-300 flex items-center justify-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Sign In
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
