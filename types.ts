import React from 'react';

export type ProjectType = 'Website' | 'Video' | 'Campaign' | 'Branding' | 'Email' | 'Strategy' | 'Print' | 'Other' | '';

export interface ProjectTypeConfig {
  id: ProjectType;
  name: string;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  subtypes?: string[];
}

export interface StepConfig {
  tabTitle: string;
  header: string;
  subHeader: string;
  guidanceTitle: string;
  guidanceBody: string;
  guidanceTip: string;
}

export interface WebsiteDeliverablesGuidance {
  UX: Partial<StepConfig>;
  Creative: Partial<StepConfig>;
  Functionality: Partial<StepConfig>;
}

export interface Deliverable {
  id: string;
  type: string;
  spec: string;
}

export interface BrandDocument {
  id:string;
  name: string;
  type: 'PDF' | 'DOCX' | 'LINK';
}

export interface Tone {
  formalPlayful: number; // 0-100 slider
  minimalExpressive: number; // 0-100 slider
}

export interface Stakeholder {
  id: string;
  name: string;
  role: string;
  avatar: string;
  type: 'client' | 'agency';
}

// Website-specific Deliverables
export interface UxDeliverable {
  id: string;
  name: string;
  spec: string;
}

export type CreativeDeliverableFormat = 'Figma' | 'Webflow' | 'PDF' | '';
export type CreativeDeliverablePhase = 'Wireframes' | 'Design' | 'Prototype';
export type CreativeDeliverableResponsiveFocus = 'Mobile-first' | 'Desktop-first' | 'Adaptive' | '';

export interface CreativeDeliverable {
  id: string;
  name: string;
  format: CreativeDeliverableFormat;
  phases: CreativeDeliverablePhase[];
  responsiveFocus: CreativeDeliverableResponsiveFocus;
  postLaunchSupport: boolean;
}

export interface WebsiteFunctionality {
  functionality: string[];
  integrations: string[];
  accessibility: string[];
  pages: string[];
}

// Social Campaign Specific
export interface SocialFormat {
  id: string;
  name: string;
  spec: string;
  selected: boolean;
  isCustom?: boolean;
}

export interface SocialPlatform {
  id: string;
  name: string;
  formats: SocialFormat[];
}

export interface SocialCampaign {
  platforms: SocialPlatform[];
}


export interface Brief {
  // Step 1: Overview
  projectType: ProjectType;
  projectSubtypes: string[];
  projectName: string;
  description: string;
  budgetRange: string;
  launchDate: string;
  owners: Stakeholder[];
  stakeholders: Stakeholder[];
  
  // Step 2: Objectives
  primaryObjective: string;
  secondaryObjective: string;
  kpiTemplate: string;

  // Step 3: Audience
  targetAudience: string;
  audienceDocuments: BrandDocument[];
  keyTension: string;
  keyMessaging: string;
  industryInsights: string;
  industryResearchDocuments: BrandDocument[];
  proofPoints: string;
  
  // Step 4: Brand Identity
  brandIdentityText: string;
  brandGuidelines: BrandDocument[];

  // Step 5: Deliverables
  deliverables: Deliverable[];
  tone: Tone;
  
  // Step 5 (Website Specific)
  uxDeliverables: UxDeliverable[];
  creativeDeliverables: CreativeDeliverable[];
  functionality: WebsiteFunctionality;

  // Step 5 (Social Campaign Specific)
  socialCampaign: SocialCampaign;
}