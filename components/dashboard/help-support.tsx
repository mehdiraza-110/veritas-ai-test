"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HelpCircle, MessageSquare, Mail, Phone, Clock, Send, Search, Book, Video, Users } from "lucide-react"

interface SupportTicket {
  id: string
  subject: string
  status: "open" | "in-progress" | "resolved" | "closed"
  priority: "low" | "medium" | "high" | "urgent"
  created: string
  lastUpdate: string
}

export function HelpSupport() {
  const [searchTerm, setSearchTerm] = useState("")
  const [ticketForm, setTicketForm] = useState({
    subject: "",
    category: "",
    priority: "medium",
    description: "",
  })

  const [supportTickets] = useState<SupportTicket[]>([
    {
      id: "TICKET-001",
      subject: "API rate limit questions",
      status: "resolved",
      priority: "medium",
      created: "Mar 10, 2024",
      lastUpdate: "Mar 12, 2024",
    },
    {
      id: "TICKET-002",
      subject: "Integration with Slack",
      status: "in-progress",
      priority: "high",
      created: "Mar 14, 2024",
      lastUpdate: "Mar 15, 2024",
    },
    {
      id: "TICKET-003",
      subject: "Billing inquiry",
      status: "open",
      priority: "low",
      created: "Mar 15, 2024",
      lastUpdate: "Mar 15, 2024",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-600/20 text-blue-400 border-blue-600/30"
      case "in-progress":
        return "bg-yellow-600/20 text-yellow-400 border-yellow-600/30"
      case "resolved":
        return "bg-green-600/20 text-green-400 border-green-600/30"
      case "closed":
        return "bg-gray-600/20 text-gray-400 border-gray-600/30"
      default:
        return "bg-gray-600/20 text-gray-400 border-gray-600/30"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-600/20 text-red-400 border-red-600/30"
      case "high":
        return "bg-orange-600/20 text-orange-400 border-orange-600/30"
      case "medium":
        return "bg-yellow-600/20 text-yellow-400 border-yellow-600/30"
      case "low":
        return "bg-green-600/20 text-green-400 border-green-600/30"
      default:
        return "bg-gray-600/20 text-gray-400 border-gray-600/30"
    }
  }

  const handleSubmitTicket = () => {
    console.log("Submitting ticket:", ticketForm)
    // Reset form
    setTicketForm({
      subject: "",
      category: "",
      priority: "medium",
      description: "",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Help & Support</h1>
        <p className="text-gray-400">Get help, submit tickets, and access resources</p>
      </div>

      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <MessageSquare className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-white font-medium mb-2">Live Chat</h3>
            <p className="text-gray-400 text-sm mb-4">Get instant help from our support team</p>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Start Chat
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <Mail className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-white font-medium mb-2">Email Support</h3>
            <p className="text-gray-400 text-sm mb-4">Send us an email for detailed assistance</p>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
              support@veritas.ai
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <Phone className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-white font-medium mb-2">Phone Support</h3>
            <p className="text-gray-400 text-sm mb-4">Enterprise customers only</p>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
              Schedule Call
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Support Hours */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Clock className="mr-2 h-5 w-5" />
            Support Hours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-white font-medium mb-2">Standard Support</h3>
              <div className="space-y-1 text-sm text-gray-300">
                <p>Monday - Friday: 9:00 AM - 6:00 PM PST</p>
                <p>Saturday: 10:00 AM - 4:00 PM PST</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
            <div>
              <h3 className="text-white font-medium mb-2">Enterprise Support</h3>
              <div className="space-y-1 text-sm text-gray-300">
                <p>24/7 Priority Support</p>
                <p>Dedicated Account Manager</p>
                <p>Phone & Video Call Support</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Resources */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Book className="h-5 w-5 text-blue-400" />
              <span className="text-white font-medium">Documentation</span>
            </div>
            <p className="text-sm text-gray-400 mt-1">API guides and tutorials</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Video className="h-5 w-5 text-green-400" />
              <span className="text-white font-medium">Video Tutorials</span>
            </div>
            <p className="text-sm text-gray-400 mt-1">Step-by-step walkthroughs</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-yellow-400" />
              <span className="text-white font-medium">Community</span>
            </div>
            <p className="text-sm text-gray-400 mt-1">Connect with other users</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <HelpCircle className="h-5 w-5 text-purple-400" />
              <span className="text-white font-medium">FAQ</span>
            </div>
            <p className="text-sm text-gray-400 mt-1">Common questions answered</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Submit Ticket */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Submit Support Ticket</CardTitle>
            <CardDescription className="text-gray-400">
              Describe your issue and we'll get back to you soon
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-white">
                Subject
              </Label>
              <Input
                id="subject"
                placeholder="Brief description of your issue"
                value={ticketForm.subject}
                onChange={(e) => setTicketForm((prev) => ({ ...prev, subject: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-white">
                  Category
                </Label>
                <Select
                  value={ticketForm.category}
                  onValueChange={(value) => setTicketForm((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-white/20">
                    <SelectItem value="technical">Technical Issue</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                    <SelectItem value="api">API Support</SelectItem>
                    <SelectItem value="account">Account Management</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority" className="text-white">
                  Priority
                </Label>
                <Select
                  value={ticketForm.priority}
                  onValueChange={(value) => setTicketForm((prev) => ({ ...prev, priority: value }))}
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-white/20">
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Please provide detailed information about your issue..."
                value={ticketForm.description}
                onChange={(e) => setTicketForm((prev) => ({ ...prev, description: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[120px]"
              />
            </div>

            <Button
              onClick={handleSubmitTicket}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Send className="mr-2 h-4 w-4" />
              Submit Ticket
            </Button>
          </CardContent>
        </Card>

        {/* My Tickets */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">My Support Tickets</CardTitle>
            <CardDescription className="text-gray-400">Track the status of your submitted tickets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {supportTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-medium">{ticket.id}</span>
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status === "in-progress"
                          ? "In Progress"
                          : ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                      </Badge>
                      <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority.toUpperCase()}</Badge>
                    </div>
                  </div>
                  <h3 className="text-white font-medium mb-2">{ticket.subject}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>Created: {ticket.created}</span>
                    <span>Updated: {ticket.lastUpdate}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Knowledge Base Search */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Search Knowledge Base</CardTitle>
          <CardDescription className="text-gray-400">Find answers to common questions and issues</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search for help articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 cursor-pointer">
              <h3 className="text-white font-medium mb-1">How to integrate Veritas AI with Slack</h3>
              <p className="text-sm text-gray-400">Step-by-step guide for setting up Slack integration</p>
            </div>

            <div className="p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 cursor-pointer">
              <h3 className="text-white font-medium mb-1">Understanding Veritas Scores</h3>
              <p className="text-sm text-gray-400">Learn how our scoring system works and what the numbers mean</p>
            </div>

            <div className="p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 cursor-pointer">
              <h3 className="text-white font-medium mb-1">API Rate Limits and Best Practices</h3>
              <p className="text-sm text-gray-400">Optimize your API usage and handle rate limiting</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
