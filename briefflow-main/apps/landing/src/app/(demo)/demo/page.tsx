"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  Plus,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Users,
  Calendar,
  BarChart3,
  ArrowRight,
  Eye,
  Edit,
  MessageCircle,
  UserCheck
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function DemoPage() {
  const recentBriefs = [
    {
      id: 1,
      client: "NovaMed Pharmaceuticals",
      project: "HCP Portal Website Launch",
      status: "completed",
      date: "2 hours ago",
      approvals: "3/3",
      isParent: false,
      parentId: null
    },
    {
      id: 2,
      client: "BioGen Therapeutics",
      project: "Patient Support Program",
      status: "pending",
      date: "1 day ago",
      approvals: "2/3",
      isParent: false,
      parentId: null
    },
    {
      id: 3,
      client: "Vertex Health",
      project: "Disease Awareness Campaign",
      status: "in_review",
      date: "3 days ago",
      approvals: "1/2",
      isParent: true,
      parentId: null
    },
    {
      id: 6,
      client: "Vertex Health",
      project: "Patient Education Materials",
      status: "completed",
      date: "2 days ago",
      approvals: "2/2",
      isParent: false,
      parentId: 3
    },
    {
      id: 7,
      client: "Vertex Health",
      project: "HCP Awareness Content",
      status: "draft",
      date: "1 day ago",
      approvals: "0/1",
      isParent: false,
      parentId: 3
    },
    {
      id: 4,
      client: "Meridian Pharma",
      project: "Congress Booth Experience",
      status: "completed",
      date: "1 week ago",
      approvals: "2/2",
      isParent: false,
      parentId: null
    },
    {
      id: 5,
      client: "Apex BioPharma",
      project: "KOL Engagement Materials",
      status: "draft",
      date: "2 weeks ago",
      approvals: "0/1",
      isParent: false,
      parentId: null
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "in_review": return "bg-blue-100 text-blue-800";
      case "draft": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4" />;
      case "pending": return <Clock className="h-4 w-4" />;
      case "in_review": return <Eye className="h-4 w-4" />;
      case "draft": return <Edit className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const groupBriefsByCompany = () => {
    const grouped: Record<string, typeof recentBriefs> = {};
    recentBriefs.forEach(brief => {
      if (!grouped[brief.client]) {
        grouped[brief.client] = [];
      }
      grouped[brief.client].push(brief);
    });
    return grouped;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                BriefFlow
              </h1>
              <Badge className="ml-3 bg-green-100 text-green-800">Demo</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                Exit Demo
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-blue-100">
              <Image
                src="/bobby_hill.jpeg"
                alt="Bobby Hill"
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Welcome Back, Bobby!</h2>
              <p className="text-gray-600">The world of Briefs awaits you.</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Briefs</p>
                <p className="text-2xl font-bold text-gray-900">23</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Time Saved</p>
                <p className="text-2xl font-bold text-gray-900">73%</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Clients</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Create New Brief Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <Card className="p-8 border-2 border-dashed border-blue-300 bg-gradient-to-br from-blue-50 to-purple-50 hover:border-blue-400 transition-colors">
                <div className="text-center">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Create New Brief</h3>
                  <p className="text-gray-600 mb-6">Transform your client&apos;s messy inputs into a polished brief with AI</p>
                  <Link href="/demo/brief">
                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Start Brief Creation
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>

            {/* Recent Briefs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Briefs</h3>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
                
                <div className="space-y-6">
                  {Object.entries(groupBriefsByCompany()).map(([company, companyBriefs], companyIndex) => (
                    <motion.div
                      key={company}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * companyIndex }}
                    >
                      {/* Company Header */}
                      <div className="flex items-center space-x-3 mb-4 pb-2 border-b border-gray-200">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-8 h-8 rounded-full flex items-center justify-center">
                          <Users className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">{company}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {companyBriefs.length} project{companyBriefs.length !== 1 ? 's' : ''}
                        </Badge>
                      </div>

                      {/* Company Briefs */}
                      <div className="space-y-3">
                        {companyBriefs.map((brief, briefIndex) => (
                          <motion.div
                            key={brief.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: (companyIndex * 0.1) + (briefIndex * 0.05) }}
                            className={`flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors ${brief.parentId ? 'ml-6 border-l-4 border-l-blue-200 bg-blue-50/30' : ''}`}
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`p-2 rounded-lg ${brief.parentId ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                {getStatusIcon(brief.status)}
                              </div>
                              <div>
                                <div className="flex items-center space-x-2">
                                  {brief.parentId && (
                                    <div className="w-4 h-px bg-gray-300"></div>
                                  )}
                                  <h4 className="font-medium text-gray-900">{brief.project}</h4>
                                  {brief.isParent && (
                                    <Badge variant="secondary" className="text-xs px-2 py-1">
                                      Parent
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center space-x-4">
                              <div className="text-right">
                                <Badge className={getStatusColor(brief.status)}>
                                  {brief.status.replace('_', ' ')}
                                </Badge>
                                <p className="text-xs text-gray-500 mt-1">{brief.date}</p>
                              </div>
                              <div className="text-sm text-gray-500">
                                {brief.approvals}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col space-y-8">
            {/* Quick Actions - Aligned with Create New Brief */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="p-8 h-full flex flex-col justify-center">
                <div className="text-center">
                  <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      Browse Templates
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      View Analytics
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Review
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Team Activity - Aligned with Recent Briefs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="p-6 h-full">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Team Activity</h3>
                  <div className="flex items-center text-xs text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                    4 online
                  </div>
                </div>
                
                <div className="space-y-4 flex-1">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium text-blue-600">SM</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium text-gray-900">Sarah Miller</p>
                        <UserCheck className="h-3 w-3 text-green-500" />
                      </div>
                      <p className="text-xs text-gray-500">Approved NovaMed HCP portal brief</p>
                      <p className="text-xs text-gray-400">2 min ago</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium text-purple-600">JD</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium text-gray-900">John Davis</p>
                        <MessageCircle className="h-3 w-3 text-blue-500" />
                      </div>
                      <p className="text-xs text-gray-500">Added MLR feedback on BioGen materials</p>
                      <p className="text-xs text-gray-400">15 min ago</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium text-green-600">ER</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium text-gray-900">Emily Rodriguez</p>
                        <Edit className="h-3 w-3 text-orange-500" />
                      </div>
                      <p className="text-xs text-gray-500">Started Vertex disease awareness brief</p>
                      <p className="text-xs text-gray-400">1 hour ago</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium text-yellow-600">MK</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium text-gray-900">Mark Kumar</p>
                        <Eye className="h-3 w-3 text-gray-500" />
                      </div>
                      <p className="text-xs text-gray-500">Reviewed Meridian congress strategy</p>
                      <p className="text-xs text-gray-400">2 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium text-red-600">AL</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium text-gray-900">Alex Liu</p>
                        <MessageCircle className="h-3 w-3 text-blue-500" />
                      </div>
                      <p className="text-xs text-gray-500">Added compliance notes to Apex KOL materials</p>
                      <p className="text-xs text-gray-400">3 hours ago</p>
                    </div>
                  </div>
                </div>
                
                <button className="w-full mt-4 text-xs text-gray-600 hover:text-gray-700 font-medium border-t border-gray-200 pt-3">
                  View All Activity
                </button>
              </Card>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}