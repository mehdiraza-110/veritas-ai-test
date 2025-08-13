"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Search, FileText, ChevronDown, ChevronRight, Book, Code, Zap, Shield, ExternalLink, Copy } from "lucide-react"

interface DocSection {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  subsections: DocSubsection[]
}

interface DocSubsection {
  id: string
  title: string
  content: string
  codeExample?: string
}

export function Documentation() {
  const [searchTerm, setSearchTerm] = useState("")
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(["getting-started"]))

  const toggleSection = (sectionId: string) => {
    const newOpenSections = new Set(openSections)
    if (newOpenSections.has(sectionId)) {
      newOpenSections.delete(sectionId)
    } else {
      newOpenSections.add(sectionId)
    }
    setOpenSections(newOpenSections)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const docSections: DocSection[] = [
    {
      id: "getting-started",
      title: "Getting Started",
      description: "Quick start guide and basic setup",
      icon: <Zap className="h-5 w-5 text-blue-400" />,
      subsections: [
        {
          id: "installation",
          title: "Installation",
          content: "Get started with Veritas AI by setting up your account and obtaining your API keys.",
          codeExample: `curl -X POST https://api.veritas.ai/v1/analyze \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"text": "Your message to analyze"}'`,
        },
        {
          id: "authentication",
          title: "Authentication",
          content: "All API requests require authentication using your API key in the Authorization header.",
          codeExample: `const response = await fetch('https://api.veritas.ai/v1/analyze', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    text: 'Message to analyze'
  })
});`,
        },
      ],
    },
    {
      id: "api-reference",
      title: "API Reference",
      description: "Complete API documentation and endpoints",
      icon: <Code className="h-5 w-5 text-green-400" />,
      subsections: [
        {
          id: "analyze-endpoint",
          title: "Analyze Text",
          content: "The primary endpoint for analyzing text content and getting Veritas scores.",
          codeExample: `POST /v1/analyze

{
  "text": "Message content to analyze",
  "options": {
    "include_flags": true,
    "confidence_threshold": 0.8
  }
}

Response:
{
  "veritas_score": 85,
  "confidence": 92,
  "flags": ["ai-generated"],
  "risk_level": "low",
  "processing_time": 45
}`,
        },
        {
          id: "batch-processing",
          title: "Batch Processing",
          content: "Process multiple messages in a single request for improved efficiency.",
          codeExample: `POST /v1/batch

{
  "messages": [
    {"id": "1", "text": "First message"},
    {"id": "2", "text": "Second message"}
  ],
  "options": {
    "include_flags": true
  }
}`,
        },
      ],
    },
    {
      id: "security",
      title: "Security & Privacy",
      description: "Security best practices and privacy guidelines",
      icon: <Shield className="h-5 w-5 text-purple-400" />,
      subsections: [
        {
          id: "data-privacy",
          title: "Data Privacy",
          content: "Learn how Veritas AI handles and protects your data with enterprise-grade security measures.",
        },
        {
          id: "rate-limiting",
          title: "Rate Limiting",
          content: "Understanding rate limits and how to handle them in your applications.",
        },
      ],
    },
    {
      id: "sdks",
      title: "SDKs & Libraries",
      description: "Official SDKs and community libraries",
      icon: <Book className="h-5 w-5 text-yellow-400" />,
      subsections: [
        {
          id: "javascript-sdk",
          title: "JavaScript SDK",
          content: "Official JavaScript/TypeScript SDK for web and Node.js applications.",
          codeExample: `npm install @veritas-ai/sdk

import { VeritasAI } from '@veritas-ai/sdk';

const veritas = new VeritasAI('YOUR_API_KEY');

const result = await veritas.analyze({
  text: 'Message to analyze'
});

console.log(result.veritasScore);`,
        },
        {
          id: "python-sdk",
          title: "Python SDK",
          content: "Official Python SDK for server-side applications and data science workflows.",
          codeExample: `pip install veritas-ai

from veritas_ai import VeritasAI

client = VeritasAI(api_key='YOUR_API_KEY')

result = client.analyze(text='Message to analyze')
print(f"Veritas Score: {result.veritas_score}")`,
        },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Documentation</h1>
          <p className="text-gray-400">Comprehensive guides and API reference</p>
        </div>
        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
          <ExternalLink className="mr-2 h-4 w-4" />
          View Full Docs
        </Button>
      </div>

      {/* Search */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search documentation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-blue-400" />
              <span className="text-white font-medium">Quick Start</span>
            </div>
            <p className="text-sm text-gray-400 mt-1">Get up and running in 5 minutes</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Code className="h-5 w-5 text-green-400" />
              <span className="text-white font-medium">API Reference</span>
            </div>
            <p className="text-sm text-gray-400 mt-1">Complete endpoint documentation</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Book className="h-5 w-5 text-yellow-400" />
              <span className="text-white font-medium">SDKs</span>
            </div>
            <p className="text-sm text-gray-400 mt-1">Official libraries and tools</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-purple-400" />
              <span className="text-white font-medium">Security</span>
            </div>
            <p className="text-sm text-gray-400 mt-1">Best practices and guidelines</p>
          </CardContent>
        </Card>
      </div>

      {/* Documentation Sections */}
      <div className="space-y-4">
        {docSections.map((section) => (
          <Card key={section.id} className="bg-white/5 border-white/10 backdrop-blur-sm">
            <Collapsible open={openSections.has(section.id)} onOpenChange={() => toggleSection(section.id)}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-white/5 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {section.icon}
                      <div>
                        <CardTitle className="text-white">{section.title}</CardTitle>
                        <CardDescription className="text-gray-400">{section.description}</CardDescription>
                      </div>
                    </div>
                    {openSections.has(section.id) ? (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="space-y-6">
                    {section.subsections.map((subsection) => (
                      <div key={subsection.id} className="border-l-2 border-blue-600/30 pl-4">
                        <h3 className="text-lg font-medium text-white mb-2">{subsection.title}</h3>
                        <p className="text-gray-300 mb-4">{subsection.content}</p>

                        {subsection.codeExample && (
                          <div className="relative">
                            <div className="bg-black/40 rounded-lg p-4 border border-white/10">
                              <div className="flex items-center justify-between mb-2">
                                <Badge variant="outline" className="border-blue-600/30 text-blue-400">
                                  <Code className="h-3 w-3 mr-1" />
                                  Example
                                </Badge>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyToClipboard(subsection.codeExample!)}
                                  className="text-gray-400 hover:text-white"
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </div>
                              <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
                                <code>{subsection.codeExample}</code>
                              </pre>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>

      {/* FAQ Section */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            Frequently Asked Questions
          </CardTitle>
          <CardDescription className="text-gray-400">Common questions and answers about Veritas AI</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-white font-medium mb-2">What is the Veritas Score?</h3>
              <p className="text-gray-300 text-sm">
                The Veritas Score is a proprietary metric ranging from 0-100 that indicates the authenticity and
                trustworthiness of a message. Higher scores indicate more trustworthy content.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-white font-medium mb-2">How accurate is the AI detection?</h3>
              <p className="text-gray-300 text-sm">
                Our AI detection models achieve over 95% accuracy in identifying AI-generated content, with continuous
                improvements through machine learning and user feedback.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-white font-medium mb-2">What data do you store?</h3>
              <p className="text-gray-300 text-sm">
                We only store metadata about your requests for analytics purposes. The actual message content is
                processed in real-time and not permanently stored on our servers.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
