"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Shield } from "lucide-react"

export default function IntroPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/results")
    }, 3000) // Extended timer to 3 seconds for better UX

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <nav className="absolute top-0 left-0 right-0 border-b border-white/10 backdrop-blur-sm bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">Veritas AI</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="text-center animate-fade-in">
        <div className="mb-8 animate-scale-in">
          <Shield className="h-24 w-24 text-blue-400 mx-auto mb-6" />
          <h1 className="text-5xl font-bold text-white mb-4">Veritas AI</h1>
          <p className="text-xl text-gray-300">The AI Trust Layer for the Internet</p>
        </div>

        <div className="flex justify-center">
          <div className="animate-pulse">
            <div className="w-2 h-2 bg-blue-400 rounded-full mx-1 inline-block"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full mx-1 inline-block animation-delay-200"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full mx-1 inline-block animation-delay-400"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scale-in {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.6s ease-out 0.2s both;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  )
}
