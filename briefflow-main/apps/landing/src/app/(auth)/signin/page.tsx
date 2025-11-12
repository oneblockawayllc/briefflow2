"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ArrowRight, Play, User, Lock, Sparkles } from "lucide-react";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            BriefFlow
          </Link>
          <p className="text-gray-600 mt-2">Choose how you&apos;d like to experience BriefFlow</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Demo Presentation Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-8 border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
              <Badge className="absolute top-4 right-4 bg-green-500 text-white">
                🔥 Most Popular
              </Badge>
              
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Play className="h-8 w-8 text-white" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Demo Presentation
                </h2>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Experience BriefFlow in action with our interactive demo. See exactly how we transform chaotic client inputs into polished briefs in minutes.
                </p>

                <div className="space-y-3 mb-8 text-left">
                  <div className="flex items-center text-gray-700">
                    <Sparkles className="h-5 w-5 text-blue-600 mr-3" />
                    <span>Live AI brief generation</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Sparkles className="h-5 w-5 text-purple-600 mr-3" />
                    <span>Interactive client review simulation</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Sparkles className="h-5 w-5 text-green-600 mr-3" />
                    <span>Real export & integration preview</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Sparkles className="h-5 w-5 text-orange-600 mr-3" />
                    <span>No signup required • 5 minutes</span>
                  </div>
                </div>

                <Link href="/demo">
                  <Button size="lg" className="w-full text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Start Demo Presentation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>

                <p className="text-sm text-gray-500 mt-4">
                  ⚡ Get instant access to the full demo experience
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Sign In Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="p-8 border-2 border-gray-200 hover:border-gray-300 transition-colors">
              <div className="text-center">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <User className="h-8 w-8 text-gray-600" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Sign In to Account
                </h2>
                
                <p className="text-gray-600 mb-6">
                  Already have a BriefFlow account? Sign in to access your briefs, team, and settings.
                </p>

                <div className="space-y-4 mb-6">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <Button size="lg" variant="outline" className="w-full text-lg border-2 mb-4">
                  <Lock className="mr-2 h-5 w-5" />
                  Sign In
                </Button>

                <div className="text-sm text-gray-500 space-y-2">
                  <p>
                    <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
                  </p>
                  <p>
                    Don&apos;t have an account? <a href="#" className="text-blue-600 hover:underline">Start free trial</a>
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}