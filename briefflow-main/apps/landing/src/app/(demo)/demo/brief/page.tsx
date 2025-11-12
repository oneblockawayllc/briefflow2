"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  ArrowLeft,
  ArrowRight,
  Upload,
  Mic,
  FileText,
  Calendar,
  DollarSign,
  CheckCircle
} from "lucide-react";
import Link from "next/link";

export default function BriefWizardPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    clientName: "NovaMed Pharmaceuticals",
    projectName: "HCP Portal Website Launch",
    deadline: "2025-06-01",
    budget: "$100,000 - $150,000",
    customBudget: "",
    sowReference: "SOW-NOVA-HCP-2025-001",
    clientContext: `Just wrapped up the call with NovaMed's brand team. They're launching a new indication for their T2D treatment and need an HCP portal to support the launch.

Dr. Sarah Chen (Medical Director) emphasized the need for peer-reviewed content and KOL testimonials. The portal must include dosing calculators, patient selection tools, and case studies from the recent Phase III trials.

Legal stressed all content needs MLR approval with proper ISI placement. They want gated content behind HCP verification for deeper clinical data and real-world evidence studies.

The brand manager mentioned they need to differentiate from Competitor X who just launched a similar indication. Our advantage is the simplified BID dosing vs their TID regimen, plus our superior CV safety profile from the OUTCOMES trial.

Timeline: Portal must be live before the ADA congress in June where they're presenting new data. Budget approved at $125K with potential for additional $25K if we can fast-track MLR reviews.

Compliance requirements: All claims must be substantiated, proper fair balance, and ISI on every page. Dr. Chen wants prominent placement of the MOA animation and patient selection algorithm.

Brand manager's exact words: "Make it clinical but accessible, credible but engaging. HCPs need to trust the science but also find it easy to use."`,
    targetAudience: "",
    keyMessages: "",
    deliverables: []
  });


  const sampleFiles = [
    { name: "MLR_Approved_Guidelines.pdf", size: "3.2 MB", uploaded: true },
    { name: "Medical_Advisory_Board_Notes.txt", size: "67 KB", uploaded: true },
    { name: "Previous_HCP_Campaign.pptx", size: "12.4 MB", uploaded: true },
    { name: "Competitive_Landscape_T2D.docx", size: "2.8 MB", uploaded: false }
  ];

  const handleGenerate = () => {
    router.push('/demo/generation');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/demo" className="text-gray-600 hover:text-gray-900 mr-4">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Create New Brief</h1>
              <Badge className="ml-3 bg-green-100 text-green-800">Demo</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                Save Draft
              </Button>
              <Button variant="outline">
                Exit Demo
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Form Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Basics</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Client Name
                    </label>
                    <input
                      type="text"
                      value={formData.clientName}
                      onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Name
                    </label>
                    <input
                      type="text"
                      value={formData.projectName}
                      onChange={(e) => setFormData({...formData, projectName: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="inline h-4 w-4 mr-1" />
                      Deadline
                    </label>
                    <input
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <DollarSign className="inline h-4 w-4 mr-1" />
                      Budget Range
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                    >
                      <option>$50,000 - $75,000</option>
                      <option>$75,000 - $100,000</option>
                      <option>$100,000 - $150,000</option>
                      <option>$150,000 - $200,000</option>
                      <option>$200,000+</option>
                      <option>Custom Amount</option>
                    </select>
                    
                    {formData.budget === "Custom Amount" && (
                      <input
                        type="text"
                        placeholder="Enter custom budget amount"
                        value={formData.customBudget}
                        onChange={(e) => setFormData({...formData, customBudget: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                      />
                    )}
                    
                    <label className="block text-sm font-medium text-gray-700 mb-2 mt-3">
                      <FileText className="inline h-4 w-4 mr-1" />
                      SOW Reference
                    </label>
                    <input
                      type="text"
                      value={formData.sowReference}
                      onChange={(e) => setFormData({...formData, sowReference: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., SOW-CLIENT-PROJECT-2025-001"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mic className="inline h-4 w-4 mr-1" />
                    Client Context & Meeting Notes
                  </label>
                  <p className="text-sm text-gray-500 mb-3">
                    Tell us everything the client shared - meeting notes, requirements, preferences, concerns, or any context that will help our AI create the perfect brief.
                  </p>
                  <textarea
                    value={formData.clientContext}
                    onChange={(e) => setFormData({...formData, clientContext: e.target.value})}
                    rows={12}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Paste meeting notes, client requirements, or describe what the client told you..."
                  />
                  <div className="flex justify-between mt-2">
                    <p className="text-xs text-gray-500">
                      The more context you provide, the better our AI can craft your brief
                    </p>
                    <p className="text-xs text-gray-400">
                      {formData.clientContext.length} characters
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Supporting Documents</h2>
              
              <div className="space-y-6">
                {/* File Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Files</h3>
                  <p className="text-gray-600 mb-4">
                    Drop files here or click to browse
                  </p>
                  <Button variant="outline">
                    Choose Files
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">
                    Supports: PDF, DOC, PPT, TXT (Max 25MB)
                  </p>
                </div>

                {/* Voice Input */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <Mic className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-lg font-medium text-gray-900">Voice Input</h3>
                      <p className="text-gray-600">Record audio notes or upload meeting recordings</p>
                    </div>
                    <Button variant="outline" className="ml-4">
                      <Mic className="mr-2 h-4 w-4" />
                      Start Recording
                    </Button>
                  </div>
                </div>

                {/* Sample Files */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Previously Uploaded Files</h3>
                  <div className="space-y-3">
                    {sampleFiles.map((file, index) => (
                      <motion.div
                        key={file.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`flex items-center justify-between p-4 border rounded-lg ${
                          file.uploaded ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`p-2 rounded-lg ${
                            file.uploaded ? 'bg-green-100' : 'bg-gray-100'
                          }`}>
                            <FileText className={`h-5 w-5 ${
                              file.uploaded ? 'text-green-600' : 'text-gray-500'
                            }`} />
                          </div>
                          <div className="ml-3">
                            <p className="font-medium text-gray-900">{file.name}</p>
                            <p className="text-sm text-gray-500">{file.size}</p>
                          </div>
                        </div>
                        {file.uploaded && (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <Button 
            onClick={handleGenerate}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Generate Brief
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}