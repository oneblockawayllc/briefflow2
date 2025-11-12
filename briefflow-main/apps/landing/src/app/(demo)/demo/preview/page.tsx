"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Edit,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  Eye,
  Download,
  Share,
  Clock,
  DollarSign,
  Target,
  Users,
  Calendar,
  BarChart3,
  ChevronDown,
  ChevronRight,
  Plus,
  User,
  Mail,
  Phone,
  Building2,
  TrendingUp,
  Shield,
  Palette,
  Package,
  List
} from "lucide-react";
import Link from "next/link";

export default function BriefPreviewPage() {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [expandedDeliverables, setExpandedDeliverables] = useState<number[]>([0, 1, 2, 3, 4, 5]);
  const [showAddSection, setShowAddSection] = useState(false);

  // Navigation system state
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const [expandedGaps, setExpandedGaps] = useState<Record<number, boolean>>({});

  // Refs for all sections
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Color mapping system for section categorization
  const getSectionColors = (sectionName: string) => {
    const colorMappings = {
      // Core Business (Blues) - Executive Summary, Objectives, Key Messages
      'summary': {
        primary: 'blue-600',
        secondary: 'blue-50',
        accent: 'blue-100',
        border: 'border-l-blue-500',
        gradient: 'from-blue-400 to-blue-600',
        category: 'Core Business'
      },
      'objectives': {
        primary: 'blue-600',
        secondary: 'blue-50',
        accent: 'blue-100',
        border: 'border-l-blue-500',
        gradient: 'from-blue-400 to-blue-600',
        category: 'Core Business'
      },
      'messages': {
        primary: 'blue-600',
        secondary: 'blue-50',
        accent: 'blue-100',
        border: 'border-l-blue-500',
        gradient: 'from-blue-400 to-blue-600',
        category: 'Core Business'
      },

      // Strategic Planning (Purples) - Target Audience, Competitive Analysis, Brand Guidelines
      'audience': {
        primary: 'purple-600',
        secondary: 'purple-50',
        accent: 'purple-100',
        border: 'border-l-purple-500',
        gradient: 'from-purple-400 to-purple-600',
        category: 'Strategic Planning'
      },
      'brandGuidelines': {
        primary: 'purple-600',
        secondary: 'purple-50',
        accent: 'purple-100',
        border: 'border-l-purple-500',
        gradient: 'from-purple-400 to-purple-600',
        category: 'Strategic Planning'
      },
      'competitiveAnalysis': {
        primary: 'purple-600',
        secondary: 'purple-50',
        accent: 'purple-100',
        border: 'border-l-purple-500',
        gradient: 'from-purple-400 to-purple-600',
        category: 'Strategic Planning'
      },

      // Performance & Analytics (Greens) - Measurements & KPIs, Success Metrics, Risk Assessment
      'measurementsKpis': {
        primary: 'green-600',
        secondary: 'green-50',
        accent: 'green-100',
        border: 'border-l-green-500',
        gradient: 'from-green-400 to-green-600',
        category: 'Performance & Analytics'
      },
      'successMetrics': {
        primary: 'green-600',
        secondary: 'green-50',
        accent: 'green-100',
        border: 'border-l-green-500',
        gradient: 'from-green-400 to-green-600',
        category: 'Performance & Analytics'
      },
      'riskAssessment': {
        primary: 'green-600',
        secondary: 'green-50',
        accent: 'green-100',
        border: 'border-l-green-500',
        gradient: 'from-green-400 to-green-600',
        category: 'Performance & Analytics'
      },

      // Operations & Delivery (Oranges) - Deliverables, Timeline & Milestones
      'deliverables': {
        primary: 'orange-600',
        secondary: 'orange-50',
        accent: 'orange-100',
        border: 'border-l-orange-500',
        gradient: 'from-orange-400 to-orange-600',
        category: 'Operations & Delivery'
      },
      'timelineMilestones': {
        primary: 'orange-600',
        secondary: 'orange-50',
        accent: 'orange-100',
        border: 'border-l-orange-500',
        gradient: 'from-orange-400 to-orange-600',
        category: 'Operations & Delivery'
      },
      'timeline': {
        primary: 'orange-600',
        secondary: 'orange-50',
        accent: 'orange-100',
        border: 'border-l-orange-500',
        gradient: 'from-orange-400 to-orange-600',
        category: 'Operations & Delivery'
      },

      // Finance & Resources (Teals) - Budget Breakdown, Technical Requirements
      'budget': {
        primary: 'teal-600',
        secondary: 'teal-50',
        accent: 'teal-100',
        border: 'border-l-teal-500',
        gradient: 'from-teal-400 to-teal-600',
        category: 'Finance & Resources'
      },
      'techRequirements': {
        primary: 'teal-600',
        secondary: 'teal-50',
        accent: 'teal-100',
        border: 'border-l-teal-500',
        gradient: 'from-teal-400 to-teal-600',
        category: 'Finance & Resources'
      },

      // Compliance & Governance (Indigos) - MLR Requirements, Approval Workflow
      'mlrRequirements': {
        primary: 'indigo-600',
        secondary: 'indigo-50',
        accent: 'indigo-100',
        border: 'border-l-indigo-500',
        gradient: 'from-indigo-400 to-indigo-600',
        category: 'Compliance & Governance'
      },
      'approvalWorkflow': {
        primary: 'indigo-600',
        secondary: 'indigo-50',
        accent: 'indigo-100',
        border: 'border-l-indigo-500',
        gradient: 'from-indigo-400 to-indigo-600',
        category: 'Compliance & Governance'
      },
      'approval': {
        primary: 'indigo-600',
        secondary: 'indigo-50',
        accent: 'indigo-100',
        border: 'border-l-indigo-500',
        gradient: 'from-indigo-400 to-indigo-600',
        category: 'Compliance & Governance'
      },

      // Communication & Contacts (Cyans) - Key Contacts
      'contacts': {
        primary: 'cyan-600',
        secondary: 'cyan-50',
        accent: 'cyan-100',
        border: 'border-l-cyan-500',
        gradient: 'from-cyan-400 to-cyan-600',
        category: 'Communication & Contacts'
      }
    };

    // If section exists in mapping, return it
    if (colorMappings[sectionName as keyof typeof colorMappings]) {
      return colorMappings[sectionName as keyof typeof colorMappings];
    }

    // Fallback: Generate consistent colors for unknown sections
    const fallbackColors = [
      { primary: 'slate-600', secondary: 'slate-50', accent: 'slate-100', border: 'border-l-slate-500', gradient: 'from-slate-400 to-slate-600' },
      { primary: 'rose-600', secondary: 'rose-50', accent: 'rose-100', border: 'border-l-rose-500', gradient: 'from-rose-400 to-rose-600' },
      { primary: 'amber-600', secondary: 'amber-50', accent: 'amber-100', border: 'border-l-amber-500', gradient: 'from-amber-400 to-amber-600' },
      { primary: 'emerald-600', secondary: 'emerald-50', accent: 'emerald-100', border: 'border-l-emerald-500', gradient: 'from-emerald-400 to-emerald-600' },
      { primary: 'violet-600', secondary: 'violet-50', accent: 'violet-100', border: 'border-l-violet-500', gradient: 'from-violet-400 to-violet-600' },
      { primary: 'pink-600', secondary: 'pink-50', accent: 'pink-100', border: 'border-l-pink-500', gradient: 'from-pink-400 to-pink-600' }
    ];

    // Use hash of section name to consistently assign color
    const hash = sectionName.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    const colorIndex = Math.abs(hash) % fallbackColors.length;

    return {
      ...fallbackColors[colorIndex],
      category: 'Custom Section'
    };
  };

  // Section configuration for navigation
  const sections = [
    { id: 'contacts', name: 'Key Contacts', category: 'Communication & Contacts' },
    { id: 'summary', name: 'Executive Summary', category: 'Core Business' },
    { id: 'objectives', name: 'Objectives', category: 'Core Business' },
    { id: 'measurementsKpis', name: 'Measurements & KPIs', category: 'Performance & Analytics' },
    { id: 'audience', name: 'Target Audience', category: 'Strategic Planning' },
    { id: 'messages', name: 'Key Messages', category: 'Core Business' },
    { id: 'deliverables', name: 'Deliverables', category: 'Operations & Delivery' },
    { id: 'budget', name: 'Budget Breakdown', category: 'Finance & Resources' },
    { id: 'mlrRequirements', name: 'MLR Requirements', category: 'Compliance & Governance' },
    { id: 'brandGuidelines', name: 'Brand Guidelines', category: 'Strategic Planning' },
    { id: 'timelineMilestones', name: 'Timeline & Milestones', category: 'Operations & Delivery' },
    { id: 'approvalWorkflow', name: 'Approval Workflow', category: 'Compliance & Governance' }
  ];

  // Get section icon based on category
  const getSectionIcon = (sectionName: string) => {
    const colors = getSectionColors(sectionName);
    const iconClass = `h-5 w-5 text-${colors.primary}`;

    switch (colors.category) {
      case 'Core Business':
        return <Building2 className={iconClass} />;
      case 'Strategic Planning':
        return <Target className={iconClass} />;
      case 'Performance & Analytics':
        return <TrendingUp className={iconClass} />;
      case 'Operations & Delivery':
        return <Package className={iconClass} />;
      case 'Finance & Resources':
        return <DollarSign className={iconClass} />;
      case 'Compliance & Governance':
        return <Shield className={iconClass} />;
      case 'Communication & Contacts':
        return <Users className={iconClass} />;
      default:
        return <Palette className={iconClass} />;
    }
  };
  const [availableSections] = useState([
    { id: 'timeline', name: 'Timeline & Milestones', description: 'Project schedule and key milestones' },
    { id: 'approval', name: 'Approval Workflow', description: 'Review and approval process' },
    { id: 'riskAssessment', name: 'Risk Assessment', description: 'Project risks and mitigation strategies' },
    { id: 'competitiveAnalysis', name: 'Competitive Analysis', description: 'Market positioning and competitor review' },
    { id: 'successMetrics', name: 'Success Metrics', description: 'Additional performance indicators' },
    { id: 'techRequirements', name: 'Technical Requirements', description: 'Infrastructure and technical specifications' },
    { id: 'custom', name: 'Custom Section', description: 'Create a custom section' }
  ]);
  const addSectionDropdownRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to dropdown when it opens
  useEffect(() => {
    if (showAddSection && addSectionDropdownRef.current) {
      setTimeout(() => {
        addSectionDropdownRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest'
        });
      }, 100); // Small delay to ensure dropdown is rendered
    }
  }, [showAddSection]);
  const [collapsedSections, setCollapsedSections] = useState({
    contacts: false,      // Start expanded
    summary: false,       // Start expanded
    objectives: false,    // Start expanded
    measurementsKpis: false, // Start expanded
    audience: false,      // Start expanded
    messages: false,      // Start expanded
    deliverables: false,  // Start expanded
    budget: false,        // Start expanded
    mlrRequirements: false, // Start expanded
    brandGuidelines: false, // Start expanded
    timelineMilestones: false, // Start expanded
    approvalWorkflow: false // Start expanded
  });
  const [briefData, setBriefData] = useState({
    executiveSummary: "NovaMed Pharmaceuticals is launching an HCP-focused digital portal to support the new indication launch for their T2D treatment. This comprehensive platform will provide healthcare professionals with peer-reviewed content, KOL testimonials, dosing calculators, and patient selection tools backed by Phase III trial data. The portal emphasizes our competitive advantage of simplified BID dosing versus competitor TID regimens and superior CV safety profile from the OUTCOMES trial.",

    objectives: [
      "Drive HCP adoption of new T2D indication within 6 months of launch",
      "Achieve 15% market penetration among target endocrinologists",
      "Generate 2,500+ qualified HCP registrations for portal access",
      "Support ADA congress presentation with 25% increase in engagement"
    ],

    measurementsKpis: [
      {
        category: "Adoption Metrics",
        kpis: [
          { metric: "HCP Portal Registrations", target: "2,500+", timeframe: "6 months", measurement: "Registration form completions" },
          { metric: "Market Penetration", target: "15%", timeframe: "6 months", measurement: "% of target endocrinologists engaged" },
          { metric: "Content Engagement", target: "65%", timeframe: "Ongoing", measurement: "Average session duration >3 minutes" }
        ]
      },
      {
        category: "Clinical Metrics",
        kpis: [
          { metric: "Dosing Calculator Usage", target: "1,200+", timeframe: "6 months", measurement: "Unique calculator sessions" },
          { metric: "MOA Animation Views", target: "75%", timeframe: "Ongoing", measurement: "% of portal users viewing complete animation" },
          { metric: "Clinical Study Downloads", target: "800+", timeframe: "6 months", measurement: "PDF downloads of Phase III data" }
        ]
      },
      {
        category: "Business Impact",
        kpis: [
          { metric: "Lead Quality Score", target: "8.5/10", timeframe: "Ongoing", measurement: "Qualified HCP lead scoring" },
          { metric: "ADA Congress Engagement", target: "25%", timeframe: "Event period", measurement: "Increase from previous year" },
          { metric: "ROI on Digital Investment", target: "3.2x", timeframe: "12 months", measurement: "Revenue attributed to portal activity" }
        ]
      }
    ],

    targetAudience: {
      primary: "Endocrinologists and diabetes specialists treating T2D patients",
      secondary: "Primary care physicians managing complex diabetes cases",
      psychographics: "Evidence-based decision makers who value peer-reviewed data, clinical efficacy, and patient safety profiles"
    },

    keyMessages: [
      "Simplified BID dosing offers superior convenience versus TID competitors",
      "Proven CV safety profile backed by OUTCOMES trial data",
      "Evidence-based patient selection tools for optimal outcomes",
      "Comprehensive clinical support from Phase III trial results"
    ],

    deliverables: [
      {
        name: "HCP portal website with gated clinical content",
        specs: [
          "Desktop: 1920×1080 responsive, ADA compliant",
          "Mobile: 375×667, touch-optimized navigation",
          "Security: HCP verification system required",
          "Performance: <3 second load time, 99.9% uptime"
        ]
      },
      {
        name: "Interactive dosing calculator and patient selection tools",
        specs: [
          "Web application: React-based, mobile responsive",
          "Calculations: Real-time dosing algorithms",
          "Data export: PDF reports, 8.5\"×11\" format",
          "Integration: EMR system compatibility"
        ]
      },
      {
        name: "MOA animation and clinical mechanism content",
        specs: [
          "Video format: 1080p MP4, closed captions",
          "Duration: 2-3 minutes educational segments",
          "Interactive: Click-through animations",
          "Compliance: Fair balance audio required"
        ]
      },
      {
        name: "KOL testimonial video library",
        specs: [
          "Video quality: 4K production, professional lighting",
          "Format: MP4, WebM for web compatibility",
          "Length: 3-5 minute expert interviews",
          "Captions: Closed captions and transcripts"
        ]
      },
      {
        name: "MLR-approved educational materials and case studies",
        specs: [
          "Print materials: 8.5\"×11\", 300 DPI, CMYK",
          "Digital assets: PDF, interactive web versions",
          "Email templates: 600px width, mobile responsive",
          "Legal review: MLR approval workflow integrated"
        ]
      },
      {
        name: "Real-world evidence studies and peer-reviewed content",
        specs: [
          "Format: Interactive web presentations",
          "Data visualization: Charts, graphs, infographics",
          "References: Linked citations to PubMed",
          "Updates: Quarterly content refresh cycle"
        ]
      }
    ],

    timeline: "Portal must be live before ADA congress in June 2025",
    budget: "$125,000 with potential $25K fast-track MLR budget",

    budgetBreakdown: {
      total: 125000,
      fastTrack: 25000,
      categories: [
        {
          name: "Development & Technical",
          amount: 50000,
          percentage: 40,
          description: "HCP Portal Website & Interactive Tools",
          color: "blue"
        },
        {
          name: "Content Creation",
          amount: 37500,
          percentage: 30,
          description: "MOA Animations & KOL Videos",
          color: "purple"
        },
        {
          name: "Design & UX",
          amount: 18750,
          percentage: 15,
          description: "Visual Design & User Experience",
          color: "green"
        },
        {
          name: "Review & Compliance",
          amount: 12500,
          percentage: 10,
          description: "MLR Review & Legal Compliance",
          color: "orange"
        },
        {
          name: "Contingency Buffer",
          amount: 6250,
          percentage: 5,
          description: "Project Buffer & Risk Mitigation",
          color: "gray"
        }
      ]
    },

    mandatories: [
      "All content requires MLR approval with proper ISI placement",
      "HCP verification required for gated clinical data access",
      "Fair balance and substantiated claims on all pages",
      "Compliance with pharmaceutical advertising regulations",
      "Prominent placement of MOA animation and patient selection algorithm"
    ],

    mlrRequirements: {
      reviewProcess: "All materials require MLR approval before publication",
      timeline: "Allow 10-15 business days for initial review, 5-7 days for revisions",
      keyContacts: [
        { name: "Dr. Patricia Wong", title: "MLR Director", email: "p.wong@novamed.com", phone: "(555) 987-6550" },
        { name: "Robert Kim", title: "Regulatory Affairs Manager", email: "r.kim@novamed.com", phone: "(555) 987-6551" }
      ],
      requirements: [
        "Fair balance placement on all promotional materials",
        "ISI (Important Safety Information) must appear prominently",
        "All claims must be substantiated with clinical data",
        "Patient selection criteria clearly stated",
        "Dosing information must match approved labeling",
        "Contraindications and warnings properly displayed"
      ],
      submissionGuidelines: [
        "Submit materials in native format (InDesign, After Effects)",
        "Include reference list with all claims",
        "Provide target audience classification",
        "Include distribution plan and media placement strategy"
      ]
    },

    brandGuidelines: {
      brandVoice: "Scientific, authoritative, yet approachable and patient-focused",
      visualIdentity: {
        primaryColors: ["#2563EB (Brand Blue)", "#7C3AED (Brand Purple)", "#059669 (Success Green)"],
        secondaryColors: ["#64748B (Text Gray)", "#F8FAFC (Background)", "#FEF3C7 (Accent Yellow)"],
        typography: ["Montserrat (Headlines)", "Inter (Body Text)", "Source Code Pro (Data/Numbers)"],
        logoUsage: "NovaMed logo must appear on all materials with minimum 24px height"
      },
      tonalGuidelines: [
        "Use evidence-based language with clinical terminology",
        "Maintain professional medical tone throughout",
        "Emphasize patient outcomes and safety",
        "Avoid promotional language in educational content",
        "Include appropriate disclaimers and fair balance"
      ],
      designPrinciples: [
        "Clean, clinical aesthetic with ample white space",
        "Data visualization should prioritize clarity over decoration",
        "Use consistent grid system and spacing",
        "Maintain accessibility standards (WCAG 2.1 AA)",
        "Responsive design for all device types"
      ]
    },

    timelineMilestones: [
      {
        phase: "Discovery & Strategy",
        duration: "Weeks 1-2",
        deliverables: ["Stakeholder interviews", "Competitive analysis", "Content audit"],
        dependencies: ["Client team availability", "Access to clinical data"],
        status: "upcoming"
      },
      {
        phase: "Design & Prototyping",
        duration: "Weeks 3-5",
        deliverables: ["UX wireframes", "Visual designs", "Interactive prototype"],
        dependencies: ["Brand guidelines approval", "MLR initial feedback"],
        status: "upcoming"
      },
      {
        phase: "Content Development",
        duration: "Weeks 4-8",
        deliverables: ["MOA animations", "KOL video production", "Clinical content writing"],
        dependencies: ["KOL availability", "Video production scheduling"],
        status: "upcoming"
      },
      {
        phase: "Technical Development",
        duration: "Weeks 6-10",
        deliverables: ["Portal development", "Calculator functionality", "HCP verification system"],
        dependencies: ["Final designs", "Content delivery", "Third-party integrations"],
        status: "upcoming"
      },
      {
        phase: "MLR Review & Revisions",
        duration: "Weeks 10-12",
        deliverables: ["MLR submissions", "Revision implementations", "Final approvals"],
        dependencies: ["Complete materials", "MLR team availability"],
        status: "upcoming"
      },
      {
        phase: "Testing & Launch",
        duration: "Weeks 13-14",
        deliverables: ["QA testing", "User acceptance testing", "Production deployment"],
        dependencies: ["MLR approvals", "Technical readiness"],
        status: "upcoming"
      }
    ],

    approvalWorkflow: {
      stages: [
        {
          stage: "Creative Review",
          approvers: ["David Chen (Account Director)", "Emma Rodriguez (Sr. Account Executive)"],
          criteria: ["Brand compliance", "Message accuracy", "Design quality"],
          timeline: "2-3 business days"
        },
        {
          stage: "Client Review",
          approvers: ["Rachel Williams (Brand Manager)", "James Foster (Marketing Director)"],
          criteria: ["Strategic alignment", "Message approval", "Budget alignment"],
          timeline: "3-5 business days"
        },
        {
          stage: "Medical Review",
          approvers: ["Dr. Sarah Chen (Medical Director)", "Dr. Patricia Wong (MLR Director)"],
          criteria: ["Clinical accuracy", "Regulatory compliance", "Safety information"],
          timeline: "5-7 business days"
        },
        {
          stage: "Final MLR Approval",
          approvers: ["Robert Kim (Regulatory Affairs)", "Legal Team"],
          criteria: ["Full regulatory compliance", "Legal clearance", "Risk assessment"],
          timeline: "7-10 business days"
        }
      ],
      expeditedProcess: {
        available: true,
        conditions: ["Minor content changes", "Pre-approved templates", "Emergency launches"],
        timeline: "50% reduction in standard timeline",
        additionalCost: "$25,000 fast-track fee"
      }
    },

    contacts: {
      agency: [
        { name: "Sarah Mitchell", title: "SVP, Account Management", email: "s.mitchell@agency.com", phone: "(555) 123-4567" },
        { name: "David Chen", title: "Account Director", email: "d.chen@agency.com", phone: "(555) 123-4568" },
        { name: "Emma Rodriguez", title: "Senior Account Executive", email: "e.rodriguez@agency.com", phone: "(555) 123-4569" },
        { name: "Michael Thompson", title: "Production Lead", email: "m.thompson@agency.com", phone: "(555) 123-4570" },
        { name: "Jessica Park", title: "Project Manager", email: "j.park@agency.com", phone: "(555) 123-4571" }
      ],
      client: [
        { name: "Dr. Sarah Chen", title: "Medical Director", email: "s.chen@novamed.com", phone: "(555) 987-6543" },
        { name: "Rachel Williams", title: "Brand Manager", email: "r.williams@novamed.com", phone: "(555) 987-6544" },
        { name: "James Foster", title: "Marketing Director", email: "j.foster@novamed.com", phone: "(555) 987-6545" },
        { name: "Lisa Chang", title: "Digital Marketing Manager", email: "l.chang@novamed.com", phone: "(555) 987-6546" }
      ]
    }
  });

  // Map gaps to sections for inline display
  const gaps = [
    {
      id: 1,
      type: "missing",
      sectionId: "deliverables", // HCP Portal is part of deliverables
      section: "HCP Portal Access",
      description: "HCP verification system integration with existing NPI databases unclear",
      severity: "high",
      suggestion: "Define specific verification workflow: NPI lookup → DEA validation → specialty confirmation for endocrinologists"
    },
    {
      id: 2,
      type: "opportunity",
      sectionId: "mlrRequirements",
      section: "MLR Review Process",
      description: "Interactive dosing calculator requires expedited MLR pathway for real-time updates",
      severity: "high",
      suggestion: "Establish pre-approved clinical algorithm framework to enable calculator updates without full MLR cycle"
    },
    {
      id: 3,
      type: "clarification",
      sectionId: "brandGuidelines",
      section: "Competitive Data",
      description: "Head-to-head efficacy claims vs. TID competitors need stronger Phase III data positioning",
      severity: "medium",
      suggestion: "Highlight OUTCOMES trial CV safety superiority and simplified BID dosing advantage in all HCP touchpoints"
    },
    {
      id: 4,
      type: "missing",
      sectionId: "deliverables",
      section: "Fair Balance",
      description: "MOA animation requires comprehensive adverse event disclosure integration",
      severity: "high",
      suggestion: "Ensure all interactive content includes proper ISI placement and adverse event reporting mechanisms"
    }
  ];

  // Helper function to get gaps for a specific section
  const getGapsForSection = (sectionId: string) => {
    return gaps.filter(gap => gap.sectionId === sectionId);
  };

  // Helper function to toggle gap expansion
  const toggleGap = (gapId: number) => {
    setExpandedGaps(prev => ({
      ...prev,
      [gapId]: !prev[gapId]
    }));
  };

  const handleEdit = (section: string) => {
    setEditingSection(section);
  };

  const handleSave = () => {
    setEditingSection(null);
  };

  const handleEnhance = (section: string) => {
    // Simulate AI enhancement
    alert(`AI enhancement applied to ${section}! More detailed content has been generated.`);
  };

  const toggleDeliverable = (index: number) => {
    setExpandedDeliverables(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const toggleSection = (sectionName: string) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName as keyof typeof prev]
    }));
  };

  const addSpecification = (deliverableIndex: number) => {
    const newSpec = prompt("Enter new technical specification:");
    if (newSpec && newSpec.trim()) {
      setBriefData(prev => ({
        ...prev,
        deliverables: prev.deliverables.map((deliverable, index) =>
          index === deliverableIndex
            ? { ...deliverable, specs: [...deliverable.specs, newSpec.trim()] }
            : deliverable
        )
      }));
    }
  };

  // Navigation system functions
  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  const groupSectionsByCategory = () => {
    const grouped: Record<string, typeof sections> = {};
    sections.forEach(section => {
      if (!grouped[section.category]) {
        grouped[section.category] = [];
      }
      grouped[section.category].push(section);
    });
    return grouped;
  };

  // Intersection Observer for current section detection
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: [0, 0.1, 0.5]
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section');
          if (sectionId) {
            setCurrentSection(sectionId);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);



  const handleAddSection = (sectionId: string) => {
    if (sectionId === 'custom') {
      const customName = prompt("Enter custom section name:");
      if (customName && customName.trim()) {
        alert(`Custom section "${customName}" would be added to the brief.`);
      }
    } else {
      const section = availableSections.find(s => s.id === sectionId);
      if (section) {
        alert(`${section.name} section would be added to the brief.`);
      }
    }
    setShowAddSection(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default: return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  // Component to render gaps inline within section headers
  const renderSectionGaps = (sectionId: string) => {
    const sectionGaps = getGapsForSection(sectionId);
    if (sectionGaps.length === 0) return null;

    return (
      <div className="mt-6 mb-6 space-y-3 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
        <div className="flex items-center space-x-2 mb-2">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <h4 className="text-sm font-semibold text-gray-900">
            {sectionGaps.length} {sectionGaps.length === 1 ? 'Gap' : 'Gaps'} Identified
          </h4>
        </div>
        {sectionGaps.map((gap) => {
          const isExpanded = expandedGaps[gap.id];
          return (
            <div
              key={gap.id}
              className={`border-l-4 ${
                gap.severity === 'high' ? 'border-red-500' : 'border-yellow-500'
              } bg-white rounded-lg shadow-md overflow-hidden`}
            >
              {/* Gap Header - Always Visible */}
              <button
                onClick={() => toggleGap(gap.id)}
                className="w-full px-4 py-3 flex items-start justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start space-x-3 flex-1">
                  <AlertTriangle className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                    gap.severity === 'high' ? 'text-red-600' : 'text-yellow-600'
                  }`} />
                  <div className="flex-1 text-left">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-sm text-gray-900">{gap.section}</span>
                      <Badge className={`text-xs ${getSeverityColor(gap.severity)}`}>
                        {gap.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700">{gap.description}</p>
                  </div>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-gray-400 flex-shrink-0 ml-2 transition-transform duration-200 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Gap Details - Expandable */}
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="px-4 pb-4 pt-2 bg-gray-50 border-t border-gray-100"
                >
                  <div className="flex items-start space-x-2">
                    <Sparkles className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-gray-700 mb-1">AI Suggestion:</p>
                      <p className="text-sm text-gray-600 italic">{gap.suggestion}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/demo/generation" className="text-gray-600 hover:text-gray-900 mr-4">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Creative Brief Preview</h1>
              <Badge className="ml-3 bg-green-100 text-green-800">Demo</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export PDF
              </Button>
              <Button variant="outline">
                <Share className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Link href="/demo/review">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Send for Review
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sticky Table of Contents Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-8 space-y-4">
              <Card className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                  <List className="h-4 w-4 mr-2" />
                  Table of Contents
                </h3>
                <div className="space-y-1 max-h-[calc(100vh-12rem)] overflow-y-auto">
                  {Object.entries(groupSectionsByCategory()).map(([category, categorySections]) => {
                    const categoryColor = getSectionColors(categorySections[0].id);

                    return (
                      <div key={category} className="mb-4">
                        {/* Category Header */}
                        <div className="flex items-center space-x-2 mb-2 px-2">
                          {getSectionIcon(categorySections[0].id)}
                          <span className="text-xs font-semibold text-gray-800 uppercase tracking-wide">{category}</span>
                        </div>

                        {/* Sections in Category with Visual Hierarchy */}
                        <div className="relative pl-3">
                          {/* Vertical line connecting all sections in category */}
                          <div
                            className={`absolute left-0 top-0 bottom-0 w-0.5 bg-${categoryColor.primary} opacity-20`}
                            style={{ backgroundColor: `var(--${categoryColor.primary})` }}
                          />

                          <div className="space-y-1">
                            {categorySections.map((section, index) => {
                              const colors = getSectionColors(section.id);
                              const isCurrentSection = currentSection === section.id;
                              const sectionGaps = getGapsForSection(section.id);
                              const hasGaps = sectionGaps.length > 0;
                              const isLast = index === categorySections.length - 1;

                              return (
                                <div key={section.id} className="relative">
                                  {/* Horizontal tick mark */}
                                  <div
                                    className={`absolute left-[-12px] top-1/2 -translate-y-1/2 w-2 h-0.5 bg-${colors.primary} opacity-40`}
                                    style={{ backgroundColor: `var(--${colors.primary})` }}
                                  />

                                  <button
                                    onClick={() => scrollToSection(section.id)}
                                    className={`w-full px-3 py-2 text-left text-sm transition-all duration-150 flex items-center justify-between group rounded-md relative ${
                                      isCurrentSection
                                        ? `bg-${colors.secondary} border-l-2 border-${colors.primary} shadow-sm`
                                        : 'hover:bg-gray-100'
                                    }`}
                                  >
                                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                                      <div className={`font-medium text-xs truncate ${
                                        isCurrentSection ? `text-${colors.primary}` : 'text-gray-700'
                                      }`}>
                                        {section.name}
                                      </div>
                                    </div>

                                    {/* Gap indicator */}
                                    {hasGaps && (
                                      <AlertTriangle className="h-3 w-3 text-orange-600 flex-shrink-0" />
                                    )}
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer Stats */}
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <div className="text-xs text-gray-600 space-y-1">
                    <div className="flex justify-between">
                      <span>Sections:</span>
                      <span className="font-medium">{sections.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Gaps:</span>
                      <span className="font-medium text-orange-600">{gaps.length}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </aside>

          {/* Main Brief Content */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Brief Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      HCP Portal Website Launch
                    </h1>
                    <p className="text-lg text-gray-600">NovaMed Pharmaceuticals • T2D Treatment Launch</p>
                    <div className="flex items-center mt-4 space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        June 2025
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        $125,000
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Pre-ADA Launch
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-green-500 text-white">
                    AI Generated
                  </Badge>
                </div>
              </Card>
            </motion.div>


            {/* Key Contacts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              viewport={{ once: true }}
              ref={(el) => { if (el) sectionRefs.current['contacts'] = el; }}
              data-section="contacts"
            >
              <Card className={`p-6 border-l-4 ${getSectionColors('contacts').border} transition-all duration-300 shadow-sm hover:shadow-md ${!collapsedSections.contacts ? 'border-l-8' : ''}`}>
                <div
                  className="flex items-center justify-between cursor-pointer hover:bg-gray-50 -m-2 p-2 rounded-lg transition-colors mb-6"
                  onClick={() => toggleSection('contacts')}
                  data-testid="section-header-contacts"
                  role="button"
                  aria-expanded={!collapsedSections.contacts}
                  onKeyDown={(e) => e.key === 'Enter' && toggleSection('contacts')}
                  tabIndex={0}
                >
                  <div className="flex items-center space-x-3">
                    {getSectionIcon('contacts')}
                    <h2 className="text-xl font-semibold text-gray-900">Key Contacts</h2>
                    <Badge className={`bg-${getSectionColors('contacts').secondary} text-${getSectionColors('contacts').primary} border-${getSectionColors('contacts').primary} text-xs`}>
                      {getSectionColors('contacts').category}
                    </Badge>
                  </div>
                  {!collapsedSections.contacts ? (
                    <ChevronDown className="h-5 w-5 text-gray-500 rotate-0" data-testid="chevron-contacts" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-500 -rotate-90" data-testid="chevron-contacts" />
                  )}
                </div>
                {!collapsedSections.contacts && (
                  <motion.div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                  {/* Agency Contacts */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                      <Users className="h-5 w-5 mr-2 text-blue-600" />
                      Agency Team
                    </h3>
                    <div className="space-y-4">
                      {briefData.contacts.agency.map((contact, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center">
                              <User className="h-8 w-8 text-gray-400 mr-3" />
                              <div>
                                <h4 className="font-medium text-gray-900">{contact.name}</h4>
                                <p className="text-sm text-gray-600">{contact.title}</p>
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 ml-11 space-y-1">
                            <div className="flex items-center text-sm text-gray-600">
                              <Mail className="h-3 w-3 mr-2" />
                              <a href={`mailto:${contact.email}`} className="hover:text-blue-600">
                                {contact.email}
                              </a>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Phone className="h-3 w-3 mr-2" />
                              <a href={`tel:${contact.phone}`} className="hover:text-blue-600">
                                {contact.phone}
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Client Contacts */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                      <Target className="h-5 w-5 mr-2 text-purple-600" />
                      NovaMed Team
                    </h3>
                    <div className="space-y-4">
                      {briefData.contacts.client.map((contact, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center">
                              <User className="h-8 w-8 text-gray-400 mr-3" />
                              <div>
                                <h4 className="font-medium text-gray-900">{contact.name}</h4>
                                <p className="text-sm text-gray-600">{contact.title}</p>
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 ml-11 space-y-1">
                            <div className="flex items-center text-sm text-gray-600">
                              <Mail className="h-3 w-3 mr-2" />
                              <a href={`mailto:${contact.email}`} className="hover:text-purple-600">
                                {contact.email}
                              </a>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Phone className="h-3 w-3 mr-2" />
                              <a href={`tel:${contact.phone}`} className="hover:text-purple-600">
                                {contact.phone}
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  </motion.div>
                )}
              </Card>
            </motion.div>

            {/* Executive Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              ref={(el) => { if (el) sectionRefs.current['summary'] = el; }}
              data-section="summary"
            >
              <Card className={`p-6 border-l-4 ${getSectionColors('summary').border} transition-all duration-300 shadow-sm hover:shadow-md ${!collapsedSections.summary ? 'border-l-8' : ''}`}>
                <div
                  className="flex items-center justify-between cursor-pointer hover:bg-gray-50 -m-2 p-2 rounded-lg transition-colors mb-4"
                  onClick={() => toggleSection('summary')}
                >
                  <div className="flex items-center space-x-3">
                    {getSectionIcon('summary')}
                    <h2 className="text-xl font-semibold text-gray-900">Executive Summary</h2>
                    <Badge className={`bg-${getSectionColors('summary').secondary} text-${getSectionColors('summary').primary} border-${getSectionColors('summary').primary} text-xs`}>
                      {getSectionColors('summary').category}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEnhance('executiveSummary')}
                      >
                        <Sparkles className="h-4 w-4 mr-1" />
                        Enhance
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit('executiveSummary')}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    {!collapsedSections.summary ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </div>
                {!collapsedSections.summary && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {editingSection === 'executiveSummary' ? (
                      <div>
                        <textarea
                          value={briefData.executiveSummary}
                          onChange={(e) => setBriefData({...briefData, executiveSummary: e.target.value})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          rows={4}
                        />
                        <div className="flex space-x-2 mt-2">
                          <Button size="sm" onClick={() => handleSave()}>Save</Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingSection(null)}>Cancel</Button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-700 leading-relaxed">{briefData.executiveSummary}</p>
                    )}
                  </motion.div>
                )}
              </Card>
            </motion.div>

            {/* Objectives & KPIs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              ref={(el) => { if (el) sectionRefs.current['objectives'] = el; }}
              data-section="objectives"
            >
              <Card className={`p-6 border-l-4 ${getSectionColors('objectives').border} transition-all duration-200 shadow-sm hover:shadow-md`}>
                <div
                  className="flex items-center justify-between cursor-pointer hover:bg-gray-50 -m-2 p-2 rounded-lg transition-colors mb-4"
                  onClick={() => toggleSection('objectives')}
                >
                  <div className="flex items-center space-x-3">
                    {getSectionIcon('objectives')}
                    <h2 className="text-xl font-semibold text-gray-900">Objectives</h2>
                    <Badge className={`bg-${getSectionColors('objectives').secondary} text-${getSectionColors('objectives').primary} border-${getSectionColors('objectives').primary} text-xs`}>
                      {getSectionColors('objectives').category}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                      <Button size="sm" variant="outline">
                        <Sparkles className="h-4 w-4 mr-1" />
                        Enhance
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    {!collapsedSections.objectives ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </div>
                {!collapsedSections.objectives && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ul className="space-y-2">
                      {briefData.objectives.map((objective, index) => (
                        <li key={index} className="flex items-start">
                          <Target className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                          <span className="text-gray-700">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </Card>
            </motion.div>

            {/* Measurements & KPIs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              ref={(el) => { if (el) sectionRefs.current['measurementsKpis'] = el; }}
              data-section="measurementsKpis"
            >
              <Card className={`p-6 border-l-4 ${getSectionColors('measurementsKpis').border} transition-all duration-200 shadow-sm hover:shadow-md`}>
                <div
                  className="flex items-center justify-between cursor-pointer hover:bg-gray-50 -m-2 p-2 rounded-lg transition-colors mb-4"
                  onClick={() => toggleSection('measurementsKpis')}
                >
                  <div className="flex items-center space-x-3">
                    {getSectionIcon('measurementsKpis')}
                    <h2 className="text-xl font-semibold text-gray-900">Measurements & KPIs</h2>
                    <Badge className={`bg-${getSectionColors('measurementsKpis').secondary} text-${getSectionColors('measurementsKpis').primary} border-${getSectionColors('measurementsKpis').primary} text-xs`}>
                      {getSectionColors('measurementsKpis').category}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                      <Button size="sm" variant="outline">
                        <Sparkles className="h-4 w-4 mr-1" />
                        Enhance
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    {!collapsedSections.measurementsKpis ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </div>
                {!collapsedSections.measurementsKpis && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-6">
                      {briefData.measurementsKpis.map((category, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                            <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                            {category.category}
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {category.kpis.map((kpi, kpiIndex) => (
                              <div key={kpiIndex} className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-medium text-gray-900">{kpi.metric}</h4>
                                  <span className="text-lg font-bold text-blue-600">{kpi.target}</span>
                                </div>
                                <div className="space-y-1 text-sm text-gray-600">
                                  <div className="flex items-center">
                                    <Clock className="h-3 w-3 mr-1" />
                                    <span>{kpi.timeframe}</span>
                                  </div>
                                  <div className="flex items-start">
                                    <Target className="h-3 w-3 mr-1 mt-0.5" />
                                    <span>{kpi.measurement}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </Card>
            </motion.div>

            {/* Target Audience */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              ref={(el) => { if (el) sectionRefs.current['audience'] = el; }}
              data-section="audience"
            >
              <Card className={`p-6 border-l-4 ${getSectionColors('audience').border} transition-all duration-200 shadow-sm hover:shadow-md`}>
                <div
                  className="flex items-center justify-between cursor-pointer hover:bg-gray-50 -m-2 p-2 rounded-lg transition-colors mb-4"
                  onClick={() => toggleSection('audience')}
                >
                  <div className="flex items-center space-x-3">
                    {getSectionIcon('audience')}
                    <h2 className="text-xl font-semibold text-gray-900">Target Audience</h2>
                    <Badge className={`bg-${getSectionColors('audience').secondary} text-${getSectionColors('audience').primary} border-${getSectionColors('audience').primary} text-xs`}>
                      {getSectionColors('audience').category}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                      <Button size="sm" variant="outline">
                        <Sparkles className="h-4 w-4 mr-1" />
                        Enhance
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    {!collapsedSections.audience ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </div>
                {!collapsedSections.audience && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Primary Audience</h3>
                        <p className="text-gray-700">{briefData.targetAudience.primary}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Secondary Audience</h3>
                        <p className="text-gray-700">{briefData.targetAudience.secondary}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Psychographics</h3>
                        <p className="text-gray-700">{briefData.targetAudience.psychographics}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </Card>
            </motion.div>

            {/* Key Messages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              ref={(el) => { if (el) sectionRefs.current['messages'] = el; }}
              data-section="messages"
            >
              <Card className={`p-6 border-l-4 ${getSectionColors('messages').border} transition-all duration-200 shadow-sm hover:shadow-md`}>
                <div
                  className="flex items-center justify-between cursor-pointer hover:bg-gray-50 -m-2 p-2 rounded-lg transition-colors mb-4"
                  onClick={() => toggleSection('messages')}
                >
                  <div className="flex items-center space-x-3">
                    {getSectionIcon('messages')}
                    <h2 className="text-xl font-semibold text-gray-900">Key Messages</h2>
                    <Badge className={`bg-${getSectionColors('messages').secondary} text-${getSectionColors('messages').primary} border-${getSectionColors('messages').primary} text-xs`}>
                      {getSectionColors('messages').category}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                      <Button size="sm" variant="outline">
                        <Sparkles className="h-4 w-4 mr-1" />
                        Enhance
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    {!collapsedSections.messages ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </div>
                {!collapsedSections.messages && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ul className="space-y-3">
                      {briefData.keyMessages.map((message, index) => (
                        <li key={index} className={`bg-${getSectionColors('messages').secondary} p-3 rounded-lg border-l-4 ${getSectionColors('messages').border} hover:shadow-sm transition-shadow duration-200`}>
                          <span className="text-gray-700 font-medium">&ldquo;{message}&rdquo;</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </Card>
            </motion.div>

            {/* Deliverables */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              ref={(el) => { if (el) sectionRefs.current['deliverables'] = el; }}
              data-section="deliverables"
            >
              <Card className={`p-6 border-l-4 ${getSectionColors('deliverables').border} transition-all duration-200 shadow-sm hover:shadow-md`}>
                <div
                  className="flex items-center justify-between cursor-pointer hover:bg-gray-50 -m-2 p-2 rounded-lg transition-colors mb-4"
                  onClick={() => toggleSection('deliverables')}
                >
                  <div className="flex items-center space-x-3">
                    {getSectionIcon('deliverables')}
                    <h2 className="text-xl font-semibold text-gray-900">Deliverables</h2>
                    <Badge className={`bg-${getSectionColors('deliverables').secondary} text-${getSectionColors('deliverables').primary} border-${getSectionColors('deliverables').primary} text-xs`}>
                      {getSectionColors('deliverables').category}
                    </Badge>
                    {getGapsForSection('deliverables').length > 0 && (
                      <Badge className="bg-red-100 text-red-800 border-red-200 text-xs flex items-center">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        {getGapsForSection('deliverables').length} {getGapsForSection('deliverables').length === 1 ? 'Gap' : 'Gaps'}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                      <Button size="sm" variant="outline">
                        <Sparkles className="h-4 w-4 mr-1" />
                        Enhance
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    {!collapsedSections.deliverables ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </div>

                {/* Display gaps for this section */}
                {renderSectionGaps('deliverables')}
                {!collapsedSections.deliverables && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3"
                  >
                  {briefData.deliverables.map((deliverable, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg">
                      <div
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => toggleDeliverable(index)}
                      >
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                          <span className="text-gray-700 font-medium">{deliverable.name}</span>
                        </div>
                        {expandedDeliverables.includes(index) ? (
                          <ChevronDown className="h-4 w-4 text-gray-500" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-gray-500" />
                        )}
                      </div>

                      {expandedDeliverables.includes(index) && (
                        <div className="p-4 border-t border-gray-200 bg-white">
                          <h4 className="text-sm font-medium text-gray-900 mb-3">Technical Specifications</h4>
                          <div className="space-y-2">
                            {deliverable.specs.map((spec, specIndex) => (
                              <div key={specIndex} className="flex items-start text-sm text-gray-600">
                                <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span>{spec}</span>
                              </div>
                            ))}
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="mt-3 text-blue-600 border-blue-200 hover:bg-blue-50"
                            onClick={(e) => {
                              e.stopPropagation();
                              addSpecification(index);
                            }}
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Add specification
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                  </motion.div>
                )}
              </Card>
            </motion.div>

            {/* Budget Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              ref={(el) => { if (el) sectionRefs.current['budget'] = el; }}
              data-section="budget"
            >
              <Card className={`p-6 border-l-4 ${getSectionColors('budget').border} transition-all duration-200 shadow-sm hover:shadow-md`}>
                <div
                  className="flex items-center justify-between cursor-pointer hover:bg-gray-50 -m-2 p-2 rounded-lg transition-colors mb-4"
                  onClick={() => toggleSection('budget')}
                >
                  <div className="flex items-center space-x-3">
                    {getSectionIcon('budget')}
                    <h2 className="text-xl font-semibold text-gray-900">Budget Breakdown</h2>
                    <Badge className={`bg-${getSectionColors('budget').secondary} text-${getSectionColors('budget').primary} border-${getSectionColors('budget').primary} text-xs`}>
                      {getSectionColors('budget').category}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                      <Button size="sm" variant="outline">
                        <Sparkles className="h-4 w-4 mr-1" />
                        Enhance
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    {!collapsedSections.budget ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </div>

                {!collapsedSections.budget && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Total Budget Display */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mb-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Total Project Budget</h3>
                      <p className="text-sm text-gray-600">Base budget with fast-track option</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        ${briefData.budgetBreakdown.total.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">
                        + ${briefData.budgetBreakdown.fastTrack.toLocaleString()} fast-track
                      </div>
                    </div>
                  </div>
                </div>

                {/* Budget Categories */}
                <div className="space-y-4">
                  {briefData.budgetBreakdown.categories.map((category, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{category.name}</h4>
                          <p className="text-sm text-gray-600">{category.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-900">
                            ${category.amount.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">
                            {category.percentage}%
                          </div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full bg-gradient-to-r ${getSectionColors('budget').gradient}`}
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                  </motion.div>
                )}
              </Card>
            </motion.div>

            {/* MLR Requirements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              ref={(el) => { if (el) sectionRefs.current['mlrRequirements'] = el; }}
              data-section="mlrRequirements"
            >
              <Card className={`p-6 border-l-4 ${getSectionColors('mlrRequirements').border} transition-all duration-300 shadow-sm hover:shadow-md ${!collapsedSections.mlrRequirements ? 'border-l-8' : ''}`}>
                <div
                  className="flex items-center justify-between cursor-pointer hover:bg-gray-50 -m-2 p-2 rounded-lg transition-colors mb-4"
                  onClick={() => toggleSection('mlrRequirements')}
                >
                  <div className="flex items-center space-x-3">
                    {getSectionIcon('mlrRequirements')}
                    <h2 className="text-xl font-semibold text-gray-900">MLR Requirements</h2>
                    <Badge className={`bg-${getSectionColors('mlrRequirements').secondary} text-${getSectionColors('mlrRequirements').primary} border-${getSectionColors('mlrRequirements').primary} text-xs`}>
                      {getSectionColors('mlrRequirements').category}
                    </Badge>
                    {getGapsForSection('mlrRequirements').length > 0 && (
                      <Badge className="bg-red-100 text-red-800 border-red-200 text-xs flex items-center">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        {getGapsForSection('mlrRequirements').length} {getGapsForSection('mlrRequirements').length === 1 ? 'Gap' : 'Gaps'}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                      <Button size="sm" variant="outline">
                        <Sparkles className="h-4 w-4 mr-1" />
                        Enhance
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    {!collapsedSections.mlrRequirements ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </div>

                {/* Display gaps for this section */}
                {renderSectionGaps('mlrRequirements')}
                {!collapsedSections.mlrRequirements && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-6">
                      {/* Review Process */}
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <h3 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
                          <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
                          Review Process
                        </h3>
                        <p className="text-gray-700 mb-2">{briefData.mlrRequirements.reviewProcess}</p>
                        <p className="text-sm text-gray-600">
                          <Clock className="h-4 w-4 inline mr-1" />
                          {briefData.mlrRequirements.timeline}
                        </p>
                      </div>

                      {/* Key Contacts */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                          <Users className="h-5 w-5 mr-2 text-purple-600" />
                          MLR Team Contacts
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {briefData.mlrRequirements.keyContacts.map((contact, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                              <div className="flex items-center mb-2">
                                <User className="h-6 w-6 text-gray-400 mr-2" />
                                <div>
                                  <h4 className="font-medium text-gray-900">{contact.name}</h4>
                                  <p className="text-sm text-gray-600">{contact.title}</p>
                                </div>
                              </div>
                              <div className="space-y-1 text-sm text-gray-600">
                                <div className="flex items-center">
                                  <Mail className="h-3 w-3 mr-2" />
                                  <a href={`mailto:${contact.email}`} className="hover:text-purple-600">
                                    {contact.email}
                                  </a>
                                </div>
                                <div className="flex items-center">
                                  <Phone className="h-3 w-3 mr-2" />
                                  <a href={`tel:${contact.phone}`} className="hover:text-purple-600">
                                    {contact.phone}
                                  </a>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Requirements */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                          <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                          Compliance Requirements
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {briefData.mlrRequirements.requirements.map((requirement, index) => (
                            <div key={index} className="flex items-start bg-green-50 border border-green-200 rounded-lg p-3">
                              <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{requirement}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Submission Guidelines */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                          <Download className="h-5 w-5 mr-2 text-blue-600" />
                          Submission Guidelines
                        </h3>
                        <div className="space-y-2">
                          {briefData.mlrRequirements.submissionGuidelines.map((guideline, index) => (
                            <div key={index} className="flex items-start bg-blue-50 border border-blue-200 rounded-lg p-3">
                              <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <span className="text-sm text-gray-700">{guideline}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </Card>
            </motion.div>

            {/* Brand Guidelines */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              ref={(el) => { if (el) sectionRefs.current['brandGuidelines'] = el; }}
              data-section="brandGuidelines"
            >
              <Card className={`p-6 border-l-4 ${getSectionColors('brandGuidelines').border} transition-all duration-200 shadow-sm hover:shadow-md`}>
                <div
                  className="flex items-center justify-between cursor-pointer hover:bg-gray-50 -m-2 p-2 rounded-lg transition-colors mb-4"
                  onClick={() => toggleSection('brandGuidelines')}
                >
                  <div className="flex items-center space-x-3">
                    {getSectionIcon('brandGuidelines')}
                    <h2 className="text-xl font-semibold text-gray-900">Brand Guidelines</h2>
                    <Badge className={`bg-${getSectionColors('brandGuidelines').secondary} text-${getSectionColors('brandGuidelines').primary} border-${getSectionColors('brandGuidelines').primary} text-xs`}>
                      {getSectionColors('brandGuidelines').category}
                    </Badge>
                    {getGapsForSection('brandGuidelines').length > 0 && (
                      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs flex items-center">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        {getGapsForSection('brandGuidelines').length} {getGapsForSection('brandGuidelines').length === 1 ? 'Gap' : 'Gaps'}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                      <Button size="sm" variant="outline">
                        <Sparkles className="h-4 w-4 mr-1" />
                        Enhance
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    {!collapsedSections.brandGuidelines ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </div>

                {/* Display gaps for this section */}
                {renderSectionGaps('brandGuidelines')}
                {!collapsedSections.brandGuidelines && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-6">
                      {/* Brand Voice */}
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <h3 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
                          <Users className="h-5 w-5 mr-2 text-purple-600" />
                          Brand Voice
                        </h3>
                        <p className="text-gray-700">{briefData.brandGuidelines.brandVoice}</p>
                      </div>

                      {/* Visual Identity */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                          <Eye className="h-5 w-5 mr-2 text-blue-600" />
                          Visual Identity
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Primary Colors</h4>
                              <div className="space-y-1">
                                {briefData.brandGuidelines.visualIdentity.primaryColors.map((color, index) => (
                                  <div key={index} className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded">
                                    {color}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Secondary Colors</h4>
                              <div className="space-y-1">
                                {briefData.brandGuidelines.visualIdentity.secondaryColors.map((color, index) => (
                                  <div key={index} className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded">
                                    {color}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Typography</h4>
                              <div className="space-y-1">
                                {briefData.brandGuidelines.visualIdentity.typography.map((font, index) => (
                                  <div key={index} className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded">
                                    {font}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Logo Usage</h4>
                              <div className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded">
                                {briefData.brandGuidelines.visualIdentity.logoUsage}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Tonal Guidelines */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                          <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                          Tonal Guidelines
                        </h3>
                        <div className="space-y-2">
                          {briefData.brandGuidelines.tonalGuidelines.map((guideline, index) => (
                            <div key={index} className="flex items-start bg-green-50 border border-green-200 rounded-lg p-3">
                              <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{guideline}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Design Principles */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                          <Target className="h-5 w-5 mr-2 text-orange-600" />
                          Design Principles
                        </h3>
                        <div className="space-y-2">
                          {briefData.brandGuidelines.designPrinciples.map((principle, index) => (
                            <div key={index} className="flex items-start bg-orange-50 border border-orange-200 rounded-lg p-3">
                              <Target className="h-4 w-4 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{principle}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </Card>
            </motion.div>

            {/* Timeline & Milestones */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              ref={(el) => { if (el) sectionRefs.current['timelineMilestones'] = el; }}
              data-section="timelineMilestones"
            >
              <Card className={`p-6 border-l-4 ${getSectionColors('timelineMilestones').border} transition-all duration-200 shadow-sm hover:shadow-md`}>
                <div
                  className="flex items-center justify-between cursor-pointer hover:bg-gray-50 -m-2 p-2 rounded-lg transition-colors mb-4"
                  onClick={() => toggleSection('timelineMilestones')}
                  data-testid="section-header-timelineMilestones"
                  role="button"
                  aria-expanded={!collapsedSections.timelineMilestones}
                  onKeyDown={(e) => e.key === 'Enter' && toggleSection('timelineMilestones')}
                  tabIndex={0}
                >
                  <div className="flex items-center space-x-3">
                    {getSectionIcon('timelineMilestones')}
                    <h2 className="text-xl font-semibold text-gray-900">Timeline & Milestones</h2>
                    <Badge className={`bg-${getSectionColors('timelineMilestones').secondary} text-${getSectionColors('timelineMilestones').primary} border-${getSectionColors('timelineMilestones').primary} text-xs`}>
                      {getSectionColors('timelineMilestones').category}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                      <Button size="sm" variant="outline">
                        <Sparkles className="h-4 w-4 mr-1" />
                        Enhance
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    {!collapsedSections.timelineMilestones ? (
                      <ChevronDown className="h-5 w-5 text-gray-500 rotate-0" data-testid="chevron-timelineMilestones" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500 -rotate-90" data-testid="chevron-timelineMilestones" />
                    )}
                  </div>
                </div>
                {!collapsedSections.timelineMilestones && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-4">
                      {briefData.timelineMilestones.map((phase, index) => (
                        <div key={index} className="relative border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                          {/* Phase Timeline Indicator */}
                          <div className="flex items-start">
                            <div className="flex flex-col items-center mr-4">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                                phase.status === 'completed' ? 'bg-green-500' :
                                phase.status === 'in-progress' ? 'bg-blue-500' :
                                'bg-gray-400'
                              }`}>
                                {index + 1}
                              </div>
                              {index < briefData.timelineMilestones.length - 1 && (
                                <div className="w-0.5 h-16 bg-gray-300 mt-2"></div>
                              )}
                            </div>

                            {/* Phase Content */}
                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h3 className="text-lg font-medium text-gray-900">{phase.phase}</h3>
                                  <div className="flex items-center text-sm text-gray-600 mt-1">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    <span>{phase.duration}</span>
                                  </div>
                                </div>
                                <Badge className={`text-xs ${
                                  phase.status === 'completed' ? 'bg-green-100 text-green-800' :
                                  phase.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {phase.status.replace('-', ' ')}
                                </Badge>
                              </div>

                              {/* Deliverables */}
                              <div className="mb-3">
                                <h4 className="font-medium text-sm text-gray-900 mb-2">Deliverables</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                  {phase.deliverables.map((deliverable, delIndex) => (
                                    <div key={delIndex} className="bg-blue-50 text-blue-800 text-xs px-2 py-1 rounded border border-blue-200">
                                      {deliverable}
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Dependencies */}
                              <div>
                                <h4 className="font-medium text-sm text-gray-900 mb-2">Dependencies</h4>
                                <div className="space-y-1">
                                  {phase.dependencies.map((dependency, depIndex) => (
                                    <div key={depIndex} className="flex items-center text-sm text-gray-600">
                                      <AlertTriangle className="h-3 w-3 mr-2 text-orange-500" />
                                      <span>{dependency}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </Card>
            </motion.div>

            {/* Approval Workflow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              ref={(el) => { if (el) sectionRefs.current['approvalWorkflow'] = el; }}
              data-section="approvalWorkflow"
            >
              <Card className={`p-6 border-l-4 ${getSectionColors('approvalWorkflow').border} transition-all duration-200 shadow-sm hover:shadow-md`}>
                <div
                  className="flex items-center justify-between cursor-pointer hover:bg-gray-50 -m-2 p-2 rounded-lg transition-colors mb-4"
                  onClick={() => toggleSection('approvalWorkflow')}
                  data-testid="section-header-approvalWorkflow"
                  role="button"
                  aria-expanded={!collapsedSections.approvalWorkflow}
                  onKeyDown={(e) => e.key === 'Enter' && toggleSection('approvalWorkflow')}
                  tabIndex={0}
                >
                  <div className="flex items-center space-x-3">
                    {getSectionIcon('approvalWorkflow')}
                    <h2 className="text-xl font-semibold text-gray-900">Approval Workflow</h2>
                    <Badge className={`bg-${getSectionColors('approvalWorkflow').secondary} text-${getSectionColors('approvalWorkflow').primary} border-${getSectionColors('approvalWorkflow').primary} text-xs`}>
                      {getSectionColors('approvalWorkflow').category}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                      <Button size="sm" variant="outline">
                        <Sparkles className="h-4 w-4 mr-1" />
                        Enhance
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    {!collapsedSections.approvalWorkflow ? (
                      <ChevronDown className="h-5 w-5 text-gray-500 rotate-0" data-testid="chevron-approvalWorkflow" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500 -rotate-90" data-testid="chevron-approvalWorkflow" />
                    )}
                  </div>
                </div>
                {!collapsedSections.approvalWorkflow && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-6">
                      {/* Approval Stages */}
                      <div className="space-y-4">
                        {briefData.approvalWorkflow.stages.map((stage, index) => (
                          <div key={index} className="relative border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
                            <div className="flex items-start">
                              <div className="flex flex-col items-center mr-4">
                                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-medium">
                                  {index + 1}
                                </div>
                                {index < briefData.approvalWorkflow.stages.length - 1 && (
                                  <div className="w-0.5 h-12 bg-gray-300 mt-2"></div>
                                )}
                              </div>

                              <div className="flex-1">
                                <div className="flex justify-between items-start mb-3">
                                  <h3 className="text-lg font-medium text-gray-900">{stage.stage}</h3>
                                  <div className="text-right">
                                    <div className="flex items-center text-sm text-gray-600">
                                      <Clock className="h-4 w-4 mr-1" />
                                      <span>{stage.timeline}</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Approvers */}
                                <div className="mb-3">
                                  <h4 className="font-medium text-sm text-gray-900 mb-2">Approvers</h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {stage.approvers.map((approver, appIndex) => (
                                      <div key={appIndex} className="bg-purple-50 text-purple-800 text-sm px-3 py-1 rounded border border-purple-200 flex items-center">
                                        <User className="h-3 w-3 mr-2" />
                                        {approver}
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Criteria */}
                                <div>
                                  <h4 className="font-medium text-sm text-gray-900 mb-2">Review Criteria</h4>
                                  <div className="space-y-1">
                                    {stage.criteria.map((criterion, critIndex) => (
                                      <div key={critIndex} className="flex items-center text-sm text-gray-600">
                                        <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                                        <span>{criterion}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </Card>
            </motion.div>

            {/* Add Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <Card
                className="p-6 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors relative"
                data-testid="add-section-card"
                aria-label="Add new section to brief"
              >
                <div
                  className="flex items-center justify-center cursor-pointer"
                  onClick={() => setShowAddSection(!showAddSection)}
                >
                  <div className="text-center">
                    <Plus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <h2 className="text-xl font-semibold text-gray-600">Add Section</h2>
                    <p className="text-sm text-gray-500 mt-1">Add a new section to this brief</p>
                  </div>
                </div>

                {/* Dropdown Menu */}
                {showAddSection && (
                  <motion.div
                    ref={addSectionDropdownRef}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                    data-testid="add-section-dropdown"
                    role="menu"
                  >
                    <div className="p-2">
                      <h3 className="text-sm font-medium text-gray-900 px-3 py-2 border-b border-gray-100 mb-2">
                        Available Sections
                      </h3>
                      {availableSections.map((section) => (
                        <button
                          key={section.id}
                          className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
                          onClick={() => handleAddSection(section.id)}
                          data-testid={`section-option-${section.id}`}
                        >
                          <div className="font-medium text-gray-900">{section.name}</div>
                          <div className="text-sm text-gray-600">{section.description}</div>
                        </button>
                      ))}
                    </div>
                    <div className="border-t border-gray-100 p-2">
                      <button
                        className="w-full text-left px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 rounded-md transition-colors"
                        onClick={() => setShowAddSection(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          </div>


        </div>
      </div>
    </div>
  );
}