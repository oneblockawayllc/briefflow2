"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import ContactSection from "@/components/ContactSection";
import Link from "next/link";
import { 
  ArrowRight, 
  Clock, 
  Target, 
  Zap, 
  CheckCircle, 
  BarChart3,
  Users,
  FileText,
  PlayCircle
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Navigation Header */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                BriefFlow
              </h1>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How It Works</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
              <a href="#roi" className="text-gray-600 hover:text-gray-900 transition-colors">ROI Calculator</a>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/signin">
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                  Sign In
                </Button>
              </Link>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          {/* Announcement Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-blue-50 text-blue-700 border-blue-200">
              🚀 Save 30% of your marketing budget with AI-powered briefs
            </Badge>
          </motion.div>

          {/* Main Headline */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6">
              Transform 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Messy Client Inputs</span>
              <br />
              into Approved Briefs
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">in Minutes, Not Days</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
              Stop wasting weeks on brief revisions. Our AI-powered platform turns chaotic client inputs 
              into structured, client-approved creative briefs that save time, money, and sanity.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button size="lg" className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700">
                <PlayCircle className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            {/* Social Proof */}
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center space-x-1">
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="destructive" className="mb-4">The Brief Problem</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Your Creative Process is Bleeding Money
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Poor briefing habits are costing agencies millions in wasted time and failed projects
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex"
            >
              <Card className="p-8 text-center border-red-200 bg-red-50 flex-1 flex flex-col">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">30% Time Wasted¹</h3>
                <div className="flex-grow">
                  <p className="text-gray-600 mb-4">
                    Teams waste nearly one-third of their project time on poor briefing and endless revisions
                  </p>
                </div>
                <div className="text-3xl font-bold text-red-600">21-56 days</div>
                <p className="text-sm text-gray-500">Typical review cycles without optimization²</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex"
            >
              <Card className="p-8 text-center border-orange-200 bg-orange-50 flex-1 flex flex-col">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Budget Drain¹</h3>
                <div className="flex-grow">
                  <p className="text-gray-600 mb-4">
                    Nearly one-third of marketing budgets squandered on misdirected work and rework
                  </p>
                </div>
                <div className="text-3xl font-bold text-orange-600">33%</div>
                <p className="text-sm text-gray-500">Of marketing spend wasted¹</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex"
            >
              <Card className="p-8 text-center border-yellow-200 bg-yellow-50 flex-1 flex flex-col">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Productivity Impact</h3>
                <div className="flex-grow">
                  <p className="text-gray-600 mb-4">
                    AI-powered workflows can increase team productivity by up to 40%
                  </p>
                </div>
                <div className="text-3xl font-bold text-yellow-600">40%</div>
                <p className="text-sm text-gray-500">Productivity increase potential³</p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="features" className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-green-100 text-green-800">The Solution</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              AI-Powered Briefing That Actually Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform chaotic inputs into structured, client-approved briefs in minutes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Target,
                title: "Smart Intake Forms",
                description: "Conditional logic guides clients through the right questions, capturing everything you need",
                color: "blue"
              },
              {
                icon: Zap,
                title: "AI Brief Generation",
                description: "Advanced AI transforms messy inputs into professional, structured creative briefs",
                color: "purple"
              },
              {
                icon: CheckCircle,
                title: "Client Approval Flow",
                description: "Branded review links let clients comment, approve, and sign off seamlessly",
                color: "green"
              },
              {
                icon: FileText,
                title: "Export & Integration",
                description: "Export polished PDFs or integrate directly with your project management tools",
                color: "orange"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <div className={`bg-${feature.color}-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    <feature.icon className={`h-6 w-6 text-${feature.color}-600`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">How It Works</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              From Chaos to Clarity in 3 Simple Steps
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Upload & Input",
                description: "Clients fill guided forms, upload docs, or even submit voice recordings. Our system captures everything.",
                icon: "📥"
              },
              {
                step: "02", 
                title: "AI Generates",
                description: "Advanced AI analyzes inputs and generates a professional brief, flagging any missing information.",
                icon: "🤖"
              },
              {
                step: "03",
                title: "Review & Approve", 
                description: "Clients review via branded link, add comments, and approve. Export ready-to-use briefs instantly.",
                icon: "✅"
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative">
                  <div className="bg-blue-600 text-white text-2xl font-bold w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    {step.step}
                  </div>
                  {index < 2 && (
                    <ArrowRight className="hidden md:block absolute top-8 -right-4 h-8 w-8 text-gray-300" />
                  )}
                </div>
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-purple-100 text-purple-800">Pricing</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that fits your agency&apos;s needs. All plans include unlimited revisions and 24/7 support.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex"
            >
              <Card className="p-8 border-2 hover:border-blue-300 transition-colors flex-1 flex flex-col">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
                  <p className="text-gray-600 mb-6">Perfect for small agencies</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">$99</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <Button className="w-full mb-6">Start Free Trial</Button>
                  <div className="text-left space-y-3 flex-grow">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                      <span className="text-gray-700">5 briefs per month</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                      <span className="text-gray-700">AI-powered generation</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                      <span className="text-gray-700">Client approval workflow</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                      <span className="text-gray-700">PDF export</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                      <span className="text-gray-700">Email support</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Professional Plan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex"
            >
              <Card className="p-8 border-4 border-blue-500 relative shadow-xl flex-1 flex flex-col">
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white">
                  Most Popular
                </Badge>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Professional</h3>
                  <p className="text-gray-600 mb-6">Best for growing agencies</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">$299</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <Button className="w-full mb-6 bg-blue-600 hover:bg-blue-700">Start Free Trial</Button>
                  <div className="text-left space-y-3 flex-grow">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                      <span className="text-gray-700">Unlimited briefs</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                      <span className="text-gray-700">Advanced AI features</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                      <span className="text-gray-700">Team collaboration</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                      <span className="text-gray-700">Custom templates</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                      <span className="text-gray-700">Priority support</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                      <span className="text-gray-700">Analytics dashboard</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex"
            >
              <Card className="p-8 border-2 hover:border-purple-300 transition-colors flex-1 flex flex-col">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                  <p className="text-gray-600 mb-6">For large agencies</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">Custom</span>
                  </div>
                  <Button variant="outline" className="w-full mb-6">Contact Sales</Button>
                  <div className="text-left space-y-3 flex-grow">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                      <span className="text-gray-700">Everything in Professional</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                      <span className="text-gray-700">SSO integration</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                      <span className="text-gray-700">White-label branding</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                      <span className="text-gray-700">API access</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                      <span className="text-gray-700">Dedicated support</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                      <span className="text-gray-700">Custom integrations</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section id="roi" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-green-100 text-green-800">ROI Calculator</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Calculate Your Brief Creation Savings
            </h2>
            <p className="text-xl text-gray-600">
              See how much time and budget BriefFlow saves pharma marketing teams
            </p>
          </motion.div>

          <Card className="p-8 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Your Current Briefing Process</h3>
                <div className="space-y-4">
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Project time wasted on poor briefs¹</span>
                      <span className="text-2xl font-bold text-red-600">30%</span>
                    </div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Marketing budget lost to rework¹</span>
                      <span className="text-2xl font-bold text-orange-600">33%</span>
                    </div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">External agency inefficiency costs</span>
                      <span className="text-2xl font-bold text-yellow-600">High</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">With AI-Powered BriefFlow</h3>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Wasted project time recovered</span>
                      <span className="text-2xl font-bold text-green-600">~30%</span>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Team productivity increase³</span>
                      <span className="text-2xl font-bold text-blue-600">+40%</span>
                    </div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Revenue boost from better content⁴</span>
                      <span className="text-2xl font-bold text-purple-600">+10%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg border-2 border-green-300">
              <div className="text-center">
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Estimated Annual Impact</h4>
                <div className="text-5xl font-bold text-green-600 mb-2">$8.8M+*</div>
                <p className="text-gray-700">Estimated for pharma team with $10M marketing budget based on industry research¹⁻⁵</p>
                <div className="grid grid-cols-3 gap-4 mt-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">30%</div>
                    <div className="text-sm text-gray-600">Project time recovered</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">33%</div>
                    <div className="text-sm text-gray-600">Budget waste eliminated</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">25%+</div>
                    <div className="text-sm text-gray-600">Agency cost reduction⁵</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Briefing Process?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join hundreds of agencies saving time and money with AI-powered briefs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6 bg-white text-blue-600 hover:bg-gray-50 hover:text-blue-700 shadow-lg">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" className="text-lg px-8 py-6 bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 shadow-lg transition-all duration-300">
                <PlayCircle className="mr-2 h-5 w-5" />
                Book a Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* Sources Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Sources & Research</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p><strong>[1]</strong> &ldquo;Got Bad Briefing Habits? Here&apos;s How Admation Helps You Brief Better.&rdquo; <em>Simple Marketing Blog</em>, Simple.io, 2024. 
              <a href="https://www.simple.io/blog/got-bad-briefing-habits-heres-how-admation-helps-you-brief-better" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                View Source
              </a>
            </p>
            <p><strong>[2]</strong> &ldquo;The State of MLR Review Efficiency: Trends & Best Practices.&rdquo; <em>Aqurance</em>, March 2025. 
              <a href="https://www.aqurance.com/the-state-of-mlr-review-efficiency-trends-best-practices" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                View Source
              </a>
            </p>
            <p><strong>[3]</strong> &ldquo;AI in Pharma Marketing: meaning, strategy and best practices.&rdquo; <em>Anthill Agency</em>, 2024. 
              <a href="https://www.anthillagency.com/ai-in-pharma-marketing-guide" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                View Source
              </a>
            </p>
            <p><strong>[4]</strong> &ldquo;AI in Pharma Marketing: meaning, strategy and best practices.&rdquo; <em>Anthill Agency</em>, 2024. Revenue impact from effective content creation and reuse.</p>
            <p><strong>[5]</strong> &ldquo;AI in Pharma Marketing: meaning, strategy and best practices.&rdquo; <em>Anthill Agency</em>, 2024. External agency spend reduction through automation.</p>
            <p className="pt-4 border-t border-gray-200 mt-6"><strong>*Methodology:</strong> Annual impact calculation based on combining industry research statistics applied to typical $10M pharma marketing budget. Individual results may vary.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">BriefFlow</h3>
              <p className="text-gray-400 mb-4">Transform messy inputs into approved briefs in minutes</p>
              <div className="text-gray-400">
                <p>Contact us:</p>
                <a href="mailto:info@pragmatic.digital" className="text-blue-400 hover:text-blue-300">
                  info@pragmatic.digital
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
                <li><a href="#roi" className="hover:text-white">ROI Calculator</a></li>
                <li><a href="#demo" className="hover:text-white">Book Demo</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-white">About Us</a></li>
                <li><a href="#privacy" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-gray-500 mb-4 md:mb-0">
                © 2025 BriefFlow. All rights reserved.
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Powered by</span>
                {/* Placeholder for Pragmatic Digital logo - add pragmatic_logo.svg to public folder */}
                <span className="text-sm font-semibold text-gray-400">Pragmatic Digital</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
