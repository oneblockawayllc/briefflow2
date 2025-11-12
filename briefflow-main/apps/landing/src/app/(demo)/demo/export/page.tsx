"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  ArrowLeft,
  Download,
  Share,
  Copy,
  FileText,
  Calendar,
  Smartphone,
  Monitor,
  CheckCircle,
  ExternalLink,
  Zap,
  Users,
  BarChart3,
  Clock,
  Sparkles,
  Trophy,
  Target,
  Eye
} from "lucide-react";
import Link from "next/link";

export default function ExportPage() {
  const [selectedFormat] = useState("pdf");
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);
  const [exportStatus, setExportStatus] = useState("ready");

  const exportFormats = [
    {
      id: "pdf",
      name: "PDF Document",
      description: "Professional branded PDF ready for client presentation",
      icon: FileText,
      size: "2.4 MB",
      features: ["Agency branding", "Professional layout", "Print-ready"]
    },
    {
      id: "word",
      name: "Word Document",
      description: "Editable DOCX format for further customization",
      icon: FileText,
      size: "1.8 MB", 
      features: ["Fully editable", "Comments enabled", "Version tracking"]
    },
    {
      id: "copy",
      name: "Copy to Clipboard",
      description: "Plain text version for easy sharing",
      icon: Copy,
      size: "12 KB",
      features: ["Quick sharing", "Email friendly", "Platform agnostic"]
    }
  ];

  const integrations = [
    {
      id: "asana",
      name: "Asana",
      description: "Create project with tasks based on brief deliverables",
      icon: "🎯",
      color: "bg-red-50 border-red-200",
      features: ["Auto-create tasks", "Set deadlines", "Assign team members"]
    },
    {
      id: "monday",
      name: "Monday.com",
      description: "Generate project board with timeline and milestones",
      icon: "📊",
      color: "bg-blue-50 border-blue-200", 
      features: ["Visual timeline", "Progress tracking", "Resource allocation"]
    },
    {
      id: "notion",
      name: "Notion",
      description: "Create structured workspace with brief documentation",
      icon: "📝",
      color: "bg-gray-50 border-gray-200",
      features: ["Rich documentation", "Team collaboration", "Knowledge base"]
    },
    {
      id: "slack",
      name: "Slack",
      description: "Share brief summary in designated channel",
      icon: "💬",
      color: "bg-purple-50 border-purple-200",
      features: ["Instant sharing", "Team notifications", "Quick discussions"]
    },
    {
      id: "trello",
      name: "Trello",
      description: "Convert deliverables into organized board cards",
      icon: "📋",
      color: "bg-green-50 border-green-200",
      features: ["Kanban boards", "Card checklists", "Due dates"]
    },
    {
      id: "email",
      name: "Email Campaign",
      description: "Send formatted brief to stakeholders",
      icon: "📧",
      color: "bg-yellow-50 border-yellow-200",
      features: ["Branded template", "Stakeholder list", "Read receipts"]
    }
  ];

  const handleExport = (format: string) => {
    setExportStatus("exporting");
    setTimeout(() => {
      setExportStatus("completed");
      // Simulate download
      alert(`${format.toUpperCase()} downloaded successfully!`);
      setExportStatus("ready");
    }, 2000);
  };

  const handleIntegration = (integration: {id: string; name: string; description: string; icon: string; color: string; features: string[]}) => {
    setSelectedIntegration(integration.id);
    setTimeout(() => {
      alert(`Successfully integrated with ${integration.name}!`);
      setSelectedIntegration(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/demo/review" className="text-gray-600 hover:text-gray-900 mr-4">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Export & Integration</h1>
              <Badge className="ml-3 bg-green-100 text-green-800">Demo</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Share className="mr-2 h-4 w-4" />
                Share Demo
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Card className="p-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <div className="flex items-center">
              <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mr-6">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Brief Complete & Approved!
                </h1>
                <p className="text-lg text-gray-600 mb-4">
                  Your TechCorp Industries campaign brief is ready for export and team integration.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white p-3 rounded-lg border text-center">
                    <Clock className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                    <p className="text-sm font-medium">Time Saved</p>
                    <p className="text-lg font-bold text-green-600">4.2 hours</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border text-center">
                    <Target className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                    <p className="text-sm font-medium">Completeness</p>
                    <p className="text-lg font-bold text-purple-600">94%</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border text-center">
                    <Users className="h-5 w-5 text-orange-600 mx-auto mb-1" />
                    <p className="text-sm font-medium">Stakeholders</p>
                    <p className="text-lg font-bold text-orange-600">3 approved</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border text-center">
                    <Sparkles className="h-5 w-5 text-pink-600 mx-auto mb-1" />
                    <p className="text-sm font-medium">AI Quality</p>
                    <p className="text-lg font-bold text-pink-600">97%</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Export Options */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Export Options</h2>
              <p className="text-gray-600 mb-6">
                Download your brief in the format that works best for your workflow.
              </p>
            </motion.div>

            <div className="space-y-4">
              {exportFormats.map((format, index) => (
                <motion.div
                  key={format.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <Card className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                    selectedFormat === format.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-lg ${
                          selectedFormat === format.id ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                          <format.icon className={`h-6 w-6 ${
                            selectedFormat === format.id ? 'text-blue-600' : 'text-gray-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{format.name}</h3>
                          <p className="text-gray-600 mb-3">{format.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {format.features.map((feature, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 mb-2">{format.size}</p>
                        <Button
                          onClick={() => handleExport(format.id)}
                          disabled={exportStatus === "exporting"}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          {exportStatus === "exporting" ? (
                            <div className="flex items-center">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Exporting...
                            </div>
                          ) : (
                            <>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-6"
            >
              <Card className="p-6 bg-gradient-to-br from-gray-50 to-blue-50">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Preview</h3>
                <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <Monitor className="h-8 w-8 text-gray-400" />
                    <Smartphone className="h-6 w-6 text-gray-400" />
                  </div>
                  <p className="text-gray-600 mb-4">Preview how your brief looks across devices</p>
                  <Button variant="outline">
                    <Eye className="mr-2 h-4 w-4" />
                    Live Preview
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Integration Options */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Team Integrations</h2>
              <p className="text-gray-600 mb-6">
                Seamlessly connect your brief with your favorite project management tools.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {integrations.map((integration, index) => (
                <motion.div
                  key={integration.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
                >
                  <Card className={`p-4 cursor-pointer transition-all hover:shadow-lg ${integration.color}`}>
                    <div className="text-center">
                      <div className="text-2xl mb-2">{integration.icon}</div>
                      <h3 className="font-semibold text-gray-900 mb-1">{integration.name}</h3>
                      <p className="text-xs text-gray-600 mb-3">{integration.description}</p>
                      <div className="space-y-1 mb-4">
                        {integration.features.map((feature, i) => (
                          <div key={i} className="flex items-center text-xs text-gray-600">
                            <CheckCircle className="h-3 w-3 text-green-600 mr-1" />
                            {feature}
                          </div>
                        ))}
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleIntegration(integration)}
                        disabled={selectedIntegration === integration.id}
                        className="w-full"
                      >
                        {selectedIntegration === integration.id ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                            Connecting...
                          </div>
                        ) : (
                          <>
                            <Zap className="mr-1 h-3 w-3" />
                            Connect
                          </>
                        )}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Demo Completion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-6"
            >
              <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">🎉 Demo Complete!</h3>
                  <p className="text-gray-600 mb-6">
                    You&apos;ve experienced the full BriefFlow workflow from messy client inputs to polished, approved briefs.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div className="bg-white p-3 rounded-lg border">
                      <BarChart3 className="h-5 w-5 text-purple-600 mx-auto mb-2" />
                      <p className="font-medium">ROI Potential</p>
                      <p className="text-2xl font-bold text-purple-600">60x</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border">
                      <Clock className="h-5 w-5 text-green-600 mx-auto mb-2" />
                      <p className="font-medium">Time Savings</p>
                      <p className="text-2xl font-bold text-green-600">95%</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Start Your Free Trial
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Calendar className="mr-2 h-4 w-4" />
                      Book a Live Demo
                    </Button>
                    <Button variant="outline" className="w-full">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Pricing Plans
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}