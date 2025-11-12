import { ProjectType, ProjectTypeConfig, StepConfig, Stakeholder, Brief, WebsiteDeliverablesGuidance } from './types.ts';
import { WebsiteIcon } from './components/icons/WebsiteIcon.tsx';
import { VideoIcon } from './components/icons/VideoIcon.tsx';
import { SocialIcon } from './components/icons/SocialIcon.tsx';
import { BrandingIcon } from './components/icons/BrandingIcon.tsx';
import { EmailIcon } from './components/icons/EmailIcon.tsx';
import { CustomIcon } from './components/icons/CustomIcon.tsx';
import { StrategyIcon } from './components/icons/StrategyIcon.tsx';
import { PrintIcon } from './components/icons/PrintIcon.tsx';
import { InstagramIcon } from './components/icons/platforms/InstagramIcon.tsx';
import { FacebookIcon } from './components/icons/platforms/FacebookIcon.tsx';
import { LinkedInIcon } from './components/icons/platforms/LinkedInIcon.tsx';
import { TikTokIcon } from './components/icons/platforms/TikTokIcon.tsx';
import { YouTubeIcon } from './components/icons/platforms/YouTubeIcon.tsx';
import { XIcon } from './components/icons/platforms/XIcon.tsx';
import { PinterestIcon } from './components/icons/platforms/PinterestIcon.tsx';
import { ThreadsIcon } from './components/icons/platforms/ThreadsIcon.tsx';

export const STEPS: StepConfig[] = [
  { 
    tabTitle: 'Project Overview',
    header: 'Start with the big picture.',
    subHeader: 'What are we creating, and why does it matter?',
    guidanceTitle: 'Project Overview',
    guidanceBody: 'Start with the “why.” What’s the story behind this project, and why does it matter now? This is your north star — it sets the tone for everything that follows.',
    guidanceTip: 'Clear purpose creates faster alignment.'
  },
  { 
    tabTitle: 'Objectives & KPIs',
    header: 'Define what success really means.',
    subHeader: 'Align your team on measurable goals that matter most.',
    guidanceTitle: 'Objectives & KPIs',
    guidanceBody: 'Define success in plain terms. What will make everyone say, “Yes — that’s what we set out to do”? Keep it measurable and meaningful.',
    guidanceTip: 'Clarity here turns debate into direction.'
  },
  { 
    tabTitle: 'Audience & Insight',
    header: 'Get to know who you’re talking to.',
    subHeader: 'The more clearly you describe your audience, the sharper your strategy becomes.',
    guidanceTitle: 'Audience & Insight',
    guidanceBody: 'Who are you really talking to? Picture them, name their pressure points, and call out what they need to hear. Great insights connect business goals to human truths.',
    guidanceTip: 'Speak to their world, not your workflow.'
  },
  {
    tabTitle: 'Brand Identity',
    header: 'Define the brand’s voice and rules.',
    subHeader: 'Outline the brand personality and attach any relevant guidelines.',
    guidanceTitle: 'Brand Identity',
    guidanceBody: 'How should this brand look, feel, and sound? Define its personality. Is it a mentor, a maverick, or a friend? Attach any existing brand guides to ensure consistency.',
    guidanceTip: 'A well-defined brand is a shortcut to consistent creative.'
  },
  { 
    tabTitle: 'Project Scope',
    header: 'Define the full project scope.',
    subHeader: 'Define the specific assets, formats, and specifications for the project.',
    guidanceTitle: 'Project Scope',
    guidanceBody: 'Translate the strategy into action. Define exactly what you’re making. Being specific now prevents confusion and scope creep later.',
    guidanceTip: 'The clearer the spec, the faster the work sings.'
  },
  { 
    tabTitle: 'Review & Confirm',
    header: 'Review your brief before generating.',
    subHeader: 'Check your details and make sure everything reflects the project’s intent. You’re almost there.',
    guidanceTitle: 'Review & Confirm',
    guidanceBody: 'Step back and look at the whole picture. Does the brief tell one coherent story from goal to output? Small edits now save major friction later.',
    guidanceTip: 'A clear brief is creative alignment in writing.'
  },
];

export const PROJECT_TYPES: ProjectTypeConfig[] = [
  { 
    id: 'Website', 
    name: 'Website / Digital Experience', 
    description: 'For website builds, microsites, landing pages, or UX/UI projects.',
    icon: WebsiteIcon,
    subtypes: ['Landing Page', 'Website Refresh / Optimization', 'Full Website Build', 'UX / UI Redesign', 'Microsite', 'Mobile App']
  },
  { 
    id: 'Video', 
    name: 'Video / Commercial', 
    description: 'For broadcast, online video, or animation-based content.',
    icon: VideoIcon,
    subtypes: ['Social Video', 'Cutdowns / Variations', 'Animation / Motion', 'Case Study / Testimonial', 'Explainer', 'Long-form Content', 'Broadcast Commercial', 'Radio']
  },
  { 
    id: 'Campaign', 
    name: 'Campaign (Social / Integrated)', 
    description: 'For campaign-based work spanning multiple channels or deliverables.',
    icon: SocialIcon,
    subtypes: ['Organic Social', 'Paid Media', 'Product Launch', 'Integrated / Multi-channel', 'Always-On / Retention', 'Influencer / Partnership Campaign', 'Seasonal / Tent-pole Campaign', 'Event-Based / Activation']
  },
  { 
    id: 'Branding', 
    name: 'Branding / Identity', 
    description: 'For brand strategy, visual identity, naming, or packaging design.',
    icon: BrandingIcon,
    subtypes: ['Logo', 'Visual Identity', 'Brand Guidelines', 'Naming / Messaging', 'Brand Strategy', 'Rebrand / Refresh', 'New Product Launch', 'Packaging']
  },
  { 
    id: 'Print', 
    name: 'Print / Collateral', 
    description: 'For brochures, packaging, signage, or other printed brand materials.',
    icon: PrintIcon,
    subtypes: [
      'Brochure / One-Pager',
      'Poster / Flyer',
      'Print Ad (Magazine / Newspaper)',
      'Packaging',
      'Catalog / Booklet',
      'Sales / Pitch Deck',
      'Trade Show Materials',
      'Out-of-Home (OOH) Ad',
      'Point-of-Sale (POS) Materials',
      'Event Signage / Environmental',
    ]
  },
  { 
    id: 'Email', 
    name: 'Email / CRM / Demand Gen', 
    description: 'For lifecycle, nurture, or B2B campaigns through CRM platforms.',
    icon: EmailIcon,
    subtypes: ['One-off Send', 'Newsletter', 'Lifecycle Campaign', 'Nurture / Automation', 'ABM Campaign', 'Customer Retention', 'Lead Magnet / Download Flow']
  },
  {
    id: 'Strategy',
    name: 'Strategy / Brief Development',
    description: 'For upstream planning, research, or insight generation work.',
    icon: StrategyIcon,
    subtypes: ['Campaign Brief', 'Discovery', 'Research & Insights', 'Messaging Framework', 'Competitive Analysis', 'Persona Development', 'Brand Audit', 'Journey Mapping']
  },
  { 
    id: 'Other', 
    name: 'Custom Project', 
    description: 'For internal comms, training decks, or project types not listed above.',
    icon: CustomIcon,
    subtypes: ['Presentation or Pitch Material', 'Training / Onboarding Deck', 'Internal Communications', 'Concept Prototype', 'Exploratory / Experimental Work']
  },
];

export const STAKEHOLDERS: Stakeholder[] = [
  // Agency Coworkers
  { id: 'agency-1', name: 'Alex Chen', role: 'Creative Director', avatar: 'https://i.pravatar.cc/40?u=agency-1', type: 'agency' },
  { id: 'agency-2', name: 'Brenda Rodriguez', role: 'Lead Designer', avatar: 'https://i.pravatar.cc/40?u=agency-3', type: 'agency' },
  { id: 'agency-3', name: 'Carlos Martinez', role: 'Copywriter', avatar: 'https://i.pravatar.cc/40?u=agency-2', type: 'agency' },
  { id: 'agency-4', name: 'Diana Wells', role: 'Project Manager', avatar: 'https://i.pravatar.cc/40?u=agency-5', type: 'agency' },
  { id: 'agency-5', name: 'Ethan Grant', role: 'Strategist', avatar: 'https://i.pravatar.cc/40?u=agency-4', type: 'agency' },
  // Clients
  { id: 'client-1', name: 'Fiona Harper', role: 'Marketing Lead @ Innovate Inc.', avatar: 'https://i.pravatar.cc/40?u=client-1', type: 'client' },
  { id: 'client-2', name: 'George Banks', role: 'CEO @ TechCorp', avatar: 'https://i.pravatar.cc/40?u=client-2', type: 'client' },
  { id: 'client-3', name: 'Hannah Desai', role: 'Brand Manager @ Connectly', avatar: 'https://i.pravatar.cc/40?u=client-3', type: 'client' },
];

export const SOCIAL_PLATFORMS = [
  { id: 'instagram', name: 'Instagram', icon: InstagramIcon, formats: [
    { name: 'Square Image', spec: '1080×1080' }, { name: 'Carousel', spec: '1080×1080, up to 10' },
    { name: 'Reel', spec: '1080×1920' }, { name: 'Story', spec: '1080×1920' }
  ]},
  { id: 'tiktok', name: 'TikTok', icon: TikTokIcon, formats: [
    { name: 'Vertical Video', spec: '1080×1920' }, { name: 'Story', spec: '1080×1920' }
  ]},
  { id: 'facebook', name: 'Facebook', icon: FacebookIcon, formats: [
    { name: 'Image', spec: '1200×1200' }, { name: 'Story', spec: '1080×1920' }, { name: 'Reel', spec: '1080×1920' }
  ]},
  { id: 'linkedin', name: 'LinkedIn', icon: LinkedInIcon, formats: [
    { name: 'Image', spec: '1200×627' }, { name: 'PDF Carousel', spec: '8–10 slides' }, { name: 'Video', spec: '1080p, 16:9' }
  ]},
  { id: 'youtube', name: 'YouTube Shorts', icon: YouTubeIcon, formats: [
    { name: 'Vertical Video', spec: '1080×1920' }, { name: 'Thumbnail', spec: '1280×720' }
  ]},
  { id: 'x', name: 'X (Twitter)', icon: XIcon, formats: [
    { name: 'Image', spec: '1200×675' }, { name: 'Short Video', spec: '720p, 16:9' }, { name: 'Post Copy', spec: '≤280 chars' }
  ]},
  { id: 'pinterest', name: 'Pinterest', icon: PinterestIcon, formats: [
    { name: 'Standard Pin', spec: '1000×1500' }, { name: 'Idea Pin', spec: '1080×1920' }
  ]},
  { id: 'threads', name: 'Threads', icon: ThreadsIcon, formats: [
    { name: 'Image', spec: '1080×1350' }, { name: 'Text + Image', spec: 'N/A' }
  ]},
];

export const WEBSITE_DELIVERABLES = {
  UX: ['User Research', 'Sitemap', 'Wireframes', 'User Testing', 'UX Audit', 'Persona Development'],
  CREATIVE: ['Moodboard / Style Tile', 'Key Page Layouts', 'Visual Design System', 'Copywriting', 'Iconography', 'Motion Design'],
  FUNCTIONALITY: {
    'Functionality': {
        options: ['Forms', 'Chatbot', 'CMS Migration', 'E-commerce', 'Search', 'User Accounts'],
        placeholder: 'e.g., forms, chatbot, CMS migration, ecommerce checkout'
    },
    'Integrations & Platforms': {
        options: ['WordPress', 'Sitecore', 'Shopify', 'Google Analytics', 'Google Tag Manager', 'HubSpot', 'Salesforce', 'Payment Gateway', 'Social APIs'],
        placeholder: 'e.g., WordPress, Shopify, Google Analytics'
    },
    'Accessibility / Compliance': {
        options: ['WCAG 2.1 AA', 'HIPAA', 'GDPR', 'ADA Compliance'],
        placeholder: 'e.g., WCAG 2.1, HIPAA, GDPR'
    },
    'Pages': {
        options: ['Homepage', 'About Us', 'Blog', 'Contact', 'Product Detail Page', 'Landing Page', 'Pricing'],
        placeholder: 'e.g., Homepage, About, Blog, Contact, Product Detail'
    },
  }
};


interface ContextualConfig {
  kpiPlaceholder: string;
  deliverableTypePlaceholder: string;
  deliverableSpecPlaceholder: string;
  subMetrics: (brief: Brief) => { label: string, score: number }[];
  step_deliverables_guidance?: StepConfig;
  website_deliverables_guidance?: WebsiteDeliverablesGuidance;
}

export const CONTEXTUAL_CONFIG: Record<ProjectType, ContextualConfig> = {
  'Website': {
    kpiPlaceholder: 'e.g., Increase free trial sign-ups by 15%',
    deliverableTypePlaceholder: 'e.g., Interactive Landing Page',
    deliverableSpecPlaceholder: 'Desktop and mobile, with a WebGL hero animation',
    subMetrics: (brief) => {
      const totalUx = brief.uxDeliverables.length;
      const completedUx = brief.uxDeliverables.filter(d => d.spec.trim()).length;
      const totalCreative = brief.creativeDeliverables.length;
      const completedCreative = brief.creativeDeliverables.filter(d => d.format).length;

      return [
        { label: 'UX Scope Clarity', score: totalUx === 0 ? 0 : Math.round((completedUx / totalUx) * 100) },
        { label: 'Creative Scope Clarity', score: totalCreative === 0 ? 0 : Math.round((completedCreative / totalCreative) * 100) },
        { label: 'Technical Scope Clarity', score: (brief.functionality.pages.length + brief.functionality.functionality.length) > 3 ? 95 : (brief.functionality.pages.length + brief.functionality.functionality.length) > 0 ? 65 : 25 },
      ]
    },
    step_deliverables_guidance: {
        tabTitle: 'Project Scope',
        header: 'Define the full project scope.',
        subHeader: 'Break down the UX, Creative, and Technical deliverables for a comprehensive website plan.',
        guidanceTitle: 'Project Scope Overview',
        guidanceBody: 'Capture the full site scope — what it does, what pages it includes, and the key UX and creative milestones required to get there. A detailed scope prevents drift.',
        guidanceTip: 'Solid green items indicate confirmed deliverables — a complete scope improves Brief Health.'
    },
    website_deliverables_guidance: {
        UX: {
            guidanceTitle: 'UX Deliverables',
            guidanceBody: 'Focus on structure, testing, and flow to anchor the creative process.',
            guidanceTip: 'UX deliverables define structure, flow, and usability testing plans.'
        },
        Creative: {
            guidanceTitle: 'Creative Deliverables',
            guidanceBody: 'Define how assets move from concept to handoff — visual clarity prevents drift.',
            guidanceTip: 'Define how creative assets move from concept to launch.'
        },
        Functionality: {
            guidanceTitle: 'Functionality & Pages',
            guidanceBody: 'Define site structure and integrations. A clear scope reduces downstream dev questions.',
            guidanceTip: 'Capture the full site scope — what it does and what pages it includes.'
        }
    }
  },
  'Video': {
    kpiPlaceholder: 'e.g., Achieve 2M views and a 50% completion rate',
    deliverableTypePlaceholder: 'e.g., 30s Brand Anthem Spot',
    deliverableSpecPlaceholder: '16:9 4K for YouTube, 9:16 cut for social stories',
    subMetrics: (brief) => ([
      { label: 'Story Definition', score: brief.primaryObjective.length > 20 ? 95 : 45 },
      { label: 'Message Focus', score: brief.keyTension.length > 25 ? 90 : 50 },
      { label: 'Format Specificity', score: brief.deliverables.filter(d=>d.type).every(d => d.spec.length > 10) ? 90 : 55 },
    ])
  },
  'Campaign': {
    kpiPlaceholder: 'e.g., Grow follower count by 10k and double engagement rate',
    deliverableTypePlaceholder: 'e.g., TikTok Challenge Series',
    deliverableSpecPlaceholder: '3x 15s videos with trending audio and creator cameos',
     subMetrics: (brief) => {
      const isOrganicSocial = brief.projectSubtypes.includes('Organic Social') && !brief.projectSubtypes.includes('Paid Media');
      if (isOrganicSocial) {
        const platformCount = brief.socialCampaign.platforms.length;
        const formatCount = brief.socialCampaign.platforms.reduce((acc, p) => acc + p.formats.filter(f => f.selected).length, 0);
        return [
          { label: 'Platform Strategy', score: platformCount > 0 ? (platformCount > 2 ? 90 : 60) : 10 },
          { label: 'Audience Insight', score: brief.targetAudience.length > 30 ? 90 : 50 },
          { label: 'Asset Specificity', score: formatCount > 0 ? (formatCount > 3 ? 95 : 70) : 20 },
        ]
      }
      return [
        { label: 'Platform Alignment', score: brief.primaryObjective.length > 20 ? 80 : 40 },
        { label: 'Audience Insight', score: brief.targetAudience.length > 30 ? 90 : 50 },
        { label: 'Asset Specificity', score: brief.deliverables.filter(d=>d.type).every(d => d.spec.length > 10) ? 95 : 65 },
      ]
    }
  },
  'Branding': {
    kpiPlaceholder: 'e.g., Increase positive brand sentiment by 20%',
    deliverableTypePlaceholder: 'e.g., Full Visual Identity Suite',
    deliverableSpecPlaceholder: 'Logo, color palette, typography, and brand book',
     subMetrics: (brief) => ([
      { label: 'Mission Clarity', score: brief.primaryObjective.length > 20 ? 90 : 40 },
      { label: 'Value Proposition', score: brief.proofPoints.length > 20 ? 85 : 45 },
      { label: 'Asset Definition', score: brief.deliverables.filter(d=>d.type).every(d => d.spec.length > 10) ? 95 : 60 },
    ])
  },
  'Print': {
    kpiPlaceholder: 'e.g., Increase in-store traffic by 10%',
    deliverableTypePlaceholder: 'e.g., Trifold Brochure',
    deliverableSpecPlaceholder: 'A4 size, glossy finish, 300gsm paper',
    subMetrics: (brief) => ([
      { label: 'Design Clarity', score: brief.brandIdentityText.length > 20 ? 85 : 40 },
      { label: 'Message Hierarchy', score: brief.keyMessaging.length > 25 ? 90 : 50 },
      { label: 'Format Specificity', score: brief.deliverables.filter(d=>d.type).every(d => d.spec.length > 10) ? 95 : 60 },
    ])
  },
  'Email': {
    kpiPlaceholder: 'e.g., Achieve a 25% open rate and 5% click-through rate',
    deliverableTypePlaceholder: 'e.g., Onboarding Email Sequence',
    deliverableSpecPlaceholder: '3-part automated flow with personalized content blocks',
    subMetrics: (brief) => ([
      { label: 'Goal Clarity', score: brief.primaryObjective.length > 20 ? 90 : 40 },
      { label: 'Audience Segmentation', score: brief.targetAudience.length > 20 ? 85 : 45 },
      { label: 'CTA Specificity', score: brief.deliverables.filter(d=>d.type).every(d => d.spec.includes('CTA')) ? 95 : 50 },
    ])
  },
  'Strategy': {
    kpiPlaceholder: 'e.g., Identify 3 new audience segments for FY25',
    deliverableTypePlaceholder: 'e.g., Competitive Analysis Deck',
    deliverableSpecPlaceholder: 'Analysis of top 5 competitors and market positioning',
    subMetrics: (brief) => ([
      { label: 'Research Depth', score: brief.industryResearchDocuments.length > 0 ? 90 : 40 },
      { label: 'Objective Clarity', score: brief.primaryObjective.length > 25 ? 85 : 45 },
      { label: 'Deliverable Definition', score: brief.deliverables.filter(d=>d.type).every(d => d.spec.length > 10) ? 95 : 60 },
    ])
  },
  'Other': {
    kpiPlaceholder: 'e.g., Describe a specific, measurable outcome for the project',
    deliverableTypePlaceholder: 'e.g., Podcast Ad Read',
    deliverableSpecPlaceholder: 'Specify length, tone, key message, and call to action',
    subMetrics: (brief) => ([
      { label: 'Objectives Clarity', score: brief.primaryObjective.length > 20 && (/\d/.test(brief.primaryObjective) || brief.kpiTemplate) ? 90 : brief.primaryObjective.length > 10 ? 50 : 10 },
      { label: 'Audience Definition', score: brief.targetAudience.length > 30 ? 85 : brief.targetAudience.length > 15 ? 40 : 5 },
      { label: 'Deliverable Specificity', score: brief.deliverables.filter(d=>d.type).every(d => d.spec.length > 10) ? 95 : brief.deliverables.some(d => d.spec.length > 5) ? 60 : 20 },
    ])
  },
  '': { // Default/fallback
    kpiPlaceholder: 'e.g., Increase website traffic by 20%',
    deliverableTypePlaceholder: 'e.g., Social Media Post',
    deliverableSpecPlaceholder: 'e.g., 1080x1080, static image, for Instagram',
    subMetrics: (brief) => ([
      { label: 'Objectives Clarity', score: brief.primaryObjective.length > 20 && (/\d/.test(brief.primaryObjective) || brief.kpiTemplate) ? 90 : brief.primaryObjective.length > 10 ? 50 : 10 },
      { label: 'Audience Definition', score: brief.targetAudience.length > 30 ? 85 : brief.targetAudience.length > 15 ? 40 : 5 },
      { label: 'Deliverable Specificity', score: brief.deliverables.filter(d=>d.type).every(d => d.spec.length > 10) ? 95 : brief.deliverables.some(d => d.spec.length > 5) ? 60 : 20 },
    ])
  }
};