"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  ThumbsUp,
  CheckCircle,
  Clock,
  Calendar,
  Eye,
  Download,
  Share,
  AlertCircle,
  Send
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ClientReviewPage() {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Sarah Chen",
      role: "Marketing Director",
      avatar: "/bobby_hill.jpeg",
      timestamp: "2 hours ago",
      section: "Executive Summary",
      content: "Love the direction! This captures exactly what we discussed in our meeting. The positioning against FitTech Pro is spot on.",
      type: "positive",
      resolved: false
    },
    {
      id: 2,
      author: "Mike Rodriguez", 
      role: "CEO",
      avatar: "/bobby_hill.jpeg",
      timestamp: "1 hour ago",
      section: "Timeline",
      content: "Can we adjust the timeline? We need to launch 2 weeks earlier to beat the competition. Is this feasible?",
      type: "question",
      resolved: false
    },
    {
      id: 3,
      author: "Jessica Park",
      role: "Brand Manager", 
      avatar: "/bobby_hill.jpeg",
      timestamp: "45 minutes ago",
      section: "Key Messages",
      content: "The messaging feels a bit too technical. Can we make it more lifestyle-focused? Our target audience cares more about how it fits their daily routine.",
      type: "revision",
      resolved: false
    }
  ]);

  const [newComment, setNewComment] = useState("");
  const [selectedSection, setSelectedSection] = useState("Executive Summary");
  const [approvalStatus, setApprovalStatus] = useState("pending");
  const [showApproval, setShowApproval] = useState(false);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: "You",
        role: "Agency Representative",
        avatar: "/bobby_hill.jpeg",
        timestamp: "Just now",
        section: selectedSection,
        content: newComment,
        type: "response",
        resolved: false
      };
      setComments([...comments, comment]);
      setNewComment("");
    }
  };

  const handleApprove = () => {
    setApprovalStatus("approved");
    setShowApproval(true);
    setTimeout(() => {
      window.location.href = '/demo/export';
    }, 3000);
  };

  const getCommentTypeColor = (type: string) => {
    switch (type) {
      case "positive": return "border-green-200 bg-green-50";
      case "question": return "border-blue-200 bg-blue-50"; 
      case "revision": return "border-orange-200 bg-orange-50";
      case "response": return "border-purple-200 bg-purple-50";
      default: return "border-gray-200 bg-gray-50";
    }
  };

  const getCommentIcon = (type: string) => {
    switch (type) {
      case "positive": return <ThumbsUp className="h-4 w-4 text-green-600" />;
      case "question": return <MessageCircle className="h-4 w-4 text-blue-600" />;
      case "revision": return <AlertCircle className="h-4 w-4 text-orange-600" />;
      case "response": return <Send className="h-4 w-4 text-purple-600" />;
      default: return <MessageCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/demo/preview" className="text-gray-600 hover:text-gray-900 mr-4">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Client Review</h1>
              <Badge className="ml-3 bg-green-100 text-green-800">Demo</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className={`${
                approvalStatus === 'approved' ? 'bg-green-500' : 
                approvalStatus === 'pending' ? 'bg-yellow-500' : 'bg-gray-500'
              } text-white`}>
                {approvalStatus === 'approved' ? 'Approved' : 
                 approvalStatus === 'pending' ? 'Pending Review' : 'Draft'}
              </Badge>
              <Button variant="outline">
                <Share className="mr-2 h-4 w-4" />
                Share Link
              </Button>
              <Button variant="outline">
                Exit Demo
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Client View Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Q1 2025 Product Launch Campaign
                </h1>
                <p className="text-lg text-gray-600 mb-4">Creative Brief for Client Review</p>
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Shared on Dec 10, 2024
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    3 reviewers
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {comments.length} comments
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                  <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">Review Deadline</p>
                  <p className="text-xs text-gray-500">Dec 12, 2024</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Brief Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Executive Summary</h2>
                <div className="relative">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    TechCorp Industries is launching a revolutionary smartwatch in Q1 2025, targeting tech-savvy millennials and Gen Z consumers. This campaign will position the product as a game-changing health and connectivity device that seamlessly integrates into modern lifestyles.
                  </p>
                  {/* Inline Comments */}
                  <div className="absolute -right-2 top-0">
                    <div className="bg-green-100 border border-green-300 rounded-full p-1 cursor-pointer">
                      <MessageCircle className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Messages</h2>
                <div className="relative">
                  <ul className="space-y-3">
                    <li className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
                      <span className="text-gray-700 font-medium">&ldquo;Revolutionary smartwatch technology that fits your lifestyle&rdquo;</span>
                    </li>
                    <li className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
                      <span className="text-gray-700 font-medium">&ldquo;Advanced health tracking meets seamless connectivity&rdquo;</span>
                    </li>
                  </ul>
                  <div className="absolute -right-2 top-4">
                    <div className="bg-orange-100 border border-orange-300 rounded-full p-1 cursor-pointer">
                      <AlertCircle className="h-4 w-4 text-orange-600" />
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Timeline</h2>
                <div className="relative">
                  <p className="text-gray-700">
                    12-week campaign launch starting January 15, 2025
                  </p>
                  <div className="absolute -right-2 top-0">
                    <div className="bg-blue-100 border border-blue-300 rounded-full p-1 cursor-pointer">
                      <MessageCircle className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Comments & Actions Sidebar */}
          <div className="space-y-6">
            {/* Client Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Actions</h3>
                <div className="space-y-3">
                  <Button 
                    onClick={handleApprove}
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={approvalStatus === 'approved'}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    {approvalStatus === 'approved' ? 'Approved!' : 'Approve Brief'}
                  </Button>
                  <Button variant="outline" className="w-full">
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Request Changes
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Comments Thread */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Comments ({comments.length})
                </h3>
                
                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                  <AnimatePresence>
                    {comments.map((comment, index) => (
                      <motion.div
                        key={comment.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`p-4 rounded-lg border ${getCommentTypeColor(comment.type)}`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-full overflow-hidden">
                            <Image
                              src={comment.avatar}
                              alt={comment.author}
                              width={32}
                              height={32}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-gray-900">{comment.author}</span>
                              <span className="text-xs text-gray-500">{comment.role}</span>
                              {getCommentIcon(comment.type)}
                            </div>
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge variant="outline" className="text-xs">
                                {comment.section}
                              </Badge>
                              <span className="text-xs text-gray-500">{comment.timestamp}</span>
                            </div>
                            <p className="text-sm text-gray-700">{comment.content}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Add Comment */}
                <div className="border-t pt-4">
                  <div className="mb-3">
                    <select 
                      value={selectedSection}
                      onChange={(e) => setSelectedSection(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option>Executive Summary</option>
                      <option>Key Messages</option>
                      <option>Timeline</option>
                      <option>Target Audience</option>
                      <option>Deliverables</option>
                    </select>
                  </div>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-3"
                    rows={3}
                  />
                  <Button 
                    size="sm" 
                    onClick={handleAddComment}
                    className="w-full"
                    disabled={!newComment.trim()}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Add Comment
                  </Button>
                </div>
              </Card>
            </motion.div>

          </div>
        </div>

        {/* Approval Success Modal */}
        <AnimatePresence>
          {showApproval && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg p-8 max-w-md w-full mx-4"
              >
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Brief Approved!</h3>
                  <p className="text-gray-600 mb-6">
                    The creative brief has been approved and will now move to the export phase.
                  </p>
                  <div className="flex space-x-3">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setShowApproval(false)}
                    >
                      Continue Reviewing
                    </Button>
                    <Link href="/demo/export">
                      <Button className="flex-1 bg-green-600 hover:bg-green-700">
                        View Export Options
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}