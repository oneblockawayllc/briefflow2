# Product Requirements Document: Creative Brief Automation Platform

## Executive Summary

### Product Vision
Build a streamlined SaaS platform that transforms messy client inputs into structured, AI-powered creative briefs in minutes, reducing the typical multi-day brief creation process to a single workflow.

### Core Value Proposition
**For** creative and digital agencies  
**Who** struggle with lengthy brief creation cycles  
**Our product** is an AI-powered brief automation platform  
**That** converts unstructured inputs into professional, client-ready briefs  
**Unlike** manual processes or generic templates  
**We** provide intelligent brief generation with built-in approval workflows  

### Success Metrics (MVP)
- Time to create brief: <30 minutes (vs. 2-3 days baseline)
- First-draft acceptance rate: >70%
- Complete intake → approval cycles: 5-10 successful tests
- Tester NPS: >40

---

## Design System Foundation

### Core Design Principles
1. **Clarity First**: Every interface element should have a clear purpose
2. **Progressive Disclosure**: Show only what's needed when it's needed  
3. **Consistent Feedback**: Every action should have immediate, clear feedback
4. **Mobile-Responsive**: Desktop-first but mobile-ready
5. **Performance Focused**: Smooth animations, fast interactions, optimized assets
6. **Accessibility Built-in**: WCAG 2.1 AA compliant, keyboard navigable, screen reader friendly

### Component Library

#### Typography Scale
```
--font-display: 'Inter', system-ui, sans-serif;
--font-body: 'Inter', system-ui, sans-serif;

--text-xs: 0.75rem;    // 12px - metadata, labels
--text-sm: 0.875rem;   // 14px - helper text, captions
--text-base: 1rem;     // 16px - body text
--text-lg: 1.125rem;   // 18px - lead paragraph
--text-xl: 1.25rem;    // 20px - section headers
--text-2xl: 1.5rem;    // 24px - page titles
--text-3xl: 1.875rem;  // 30px - hero headers
```

#### Color System
```
Primary:
--primary-50: #EFF6FF   // Backgrounds
--primary-100: #DBEAFE  // Hover states
--primary-500: #3B82F6  // Primary actions
--primary-600: #2563EB  // Hover primary
--primary-700: #1D4ED8  // Active states

Neutral:
--gray-50: #F9FAFB      // Backgrounds
--gray-100: #F3F4F6     // Borders
--gray-400: #9CA3AF     // Placeholder text
--gray-600: #4B5563     // Secondary text
--gray-900: #111827     // Primary text

Semantic:
--success-500: #10B981  // Success states
--warning-500: #F59E0B  // Warnings
--error-500: #EF4444    // Errors
--info-500: #3B82F6     // Information
```

#### Spacing System
```
--space-1: 0.25rem;  // 4px
--space-2: 0.5rem;   // 8px
--space-3: 0.75rem;  // 12px
--space-4: 1rem;     // 16px
--space-6: 1.5rem;   // 24px
--space-8: 2rem;     // 32px
--space-12: 3rem;    // 48px
--space-16: 4rem;    // 64px
```

#### Core Components

**Buttons**
- Primary: Filled background, white text
- Secondary: Border only, transparent background
- Ghost: No border, subtle hover
- Sizes: sm (32px), md (40px), lg (48px)
- States: default, hover, active, disabled, loading

**Form Elements**
- Text Input: 40px height, 12px padding, 1px border
- Textarea: Min 80px height, resizable
- Select: Custom dropdown with search
- Radio/Checkbox: 20px custom styled
- File Upload: Drag-and-drop zone with preview

**Cards**
- Container: White background, 1px border, 8px radius
- Padding: 24px standard, 16px compact
- Shadow: 0 1px 3px rgba(0,0,0,0.1)

**Modals**
- Overlay: rgba(0,0,0,0.5) backdrop
- Container: Max-width 600px, centered
- Close button: Top-right corner
- Footer actions: Right-aligned

**Navigation**
- Top bar: 64px height, fixed position
- Sidebar: 240px width, collapsible
- Breadcrumbs: Chevron separators
- Tabs: Underline active indicator

---

## Technical Architecture

### Tech Stack Recommendations
**Frontend:**
- Framework: Next.js 14+ (App Router)
- UI Library: Tailwind CSS + Radix UI primitives
- State Management: Zustand or React Context
- Forms: React Hook Form + Zod validation
- Rich Text: Tiptap or Lexical

**Backend:**
- API: Next.js API routes (start simple)
- Database: PostgreSQL with Prisma ORM
- Authentication: NextAuth.js or Clerk
- File Storage: AWS S3 or Cloudinary
- AI Integration: OpenAI API (GPT-4)

**Infrastructure:**
- Hosting: Vercel (optimal for Next.js)
- Email: Resend or SendGrid
- Analytics: PostHog or Plausible
- Error Tracking: Sentry

### Data Models

```typescript
// Core Entities
interface Organization {
  id: string;
  name: string;
  type: 'agency' | 'client';
  subscription: SubscriptionTier;
  settings: OrgSettings;
}

interface Project {
  id: string;
  orgId: string;
  name: string;
  status: 'draft' | 'pending_approval' | 'approved' | 'archived';
  brief: Brief;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Brief {
  id: string;
  projectId: string;
  version: number;
  metadata: BriefMetadata;
  content: BriefContent;
  intakeData: IntakeFormData;
  aiGenerated: boolean;
  approvals: Approval[];
}

interface BriefContent {
  objectives: string;
  targetAudience: string;
  deliverables: Deliverable[];
  timeline: Timeline;
  budget: BudgetRange;
  keyMessaging: string;
  toneAndStyle: string;
  mandatories: string[];
  constraints: string[];
  successCriteria: string;
}

interface Approval {
  id: string;
  briefId: string;
  approver: User;
  status: 'pending' | 'approved' | 'rejected';
  comments: Comment[];
  timestamp: Date;
}
```

---

## Feature Specifications

### 1. Intake Wizard

#### Overview
Multi-step form with conditional logic that guides users through brief creation.

#### User Flow
1. **Project Setup** → 2. **Strategic Context** → 3. **Deliverables** → 4. **Creative Direction** → 5. **Review**

#### Step Details

**Step 1: Project Setup**
- Project name (required)
- Due date (date picker)
- Brand/Client name (autocomplete from existing)
- Category (dropdown: Campaign, Website, Branding, Content, Other)
- Project owner (user selector)

**Step 2: Strategic Context**
- Objectives (rich text, 3 predefined templates)
- Target audience (guided prompts + free text)
- Key messaging (bullet points interface)
- Budget range (optional, preset ranges)

**Step 3: Deliverables**
- Dynamic deliverable builder
- Each deliverable: Type, Channel, Specifications
- Conditional fields based on type
- Timeline/milestone mapper

**Step 4: Creative Direction**
- Tone selector (multi-select chips)
- Style references (image upload, 5 max)
- Competitor examples (URL input)
- Brand guidelines (file upload)
- Constraints/mandatories (checklist + custom)

**Step 5: Review & Generate**
- Summary view of all inputs
- Edit capability for each section
- "Generate AI Draft" CTA
- Save as draft option

#### Conditional Logic Implementation
```javascript
// Example conditional rules
const conditionalFields = {
  'category.campaign': ['campaignType', 'platforms', 'kpis'],
  'category.website': ['pageCount', 'cms', 'integrations'],
  'category.branding': ['logoNeeded', 'styleGuide', 'applications'],
  'deliverables.video': ['duration', 'aspectRatio', 'platforms'],
  'deliverables.social': ['platforms', 'postCount', 'frequency'],
  'budget.provided': ['estimateHours', 'resourceAllocation']
};
```

### 2. AI Brief Generation

#### Processing Pipeline
1. **Input Collection**: Aggregate all form data + uploaded docs
2. **Context Enhancement**: Parse uploaded brand guidelines/references
3. **AI Generation**: Send to GPT-4 with structured prompt
4. **Post-Processing**: Format output, flag gaps, add structure
5. **Presentation**: Editable draft with inline editing

#### AI Prompt Structure
```
System: You are an expert creative brief writer for agencies...

Context: [Brand guidelines, past projects, references]

Task: Generate a comprehensive creative brief using:
- Project: {metadata}
- Objectives: {objectives}
- Audience: {audience}
- Deliverables: {deliverables}
...

Output Format: 
{
  "executive_summary": "...",
  "objectives": ["..."],
  "target_audience": {...},
  "deliverables": [...],
  "success_metrics": [...],
  "gaps_identified": [...]
}
```

#### Gap Detection
- Missing budget information
- Undefined success metrics
- Incomplete timeline
- Absent approval chain
- Missing brand assets

### 3. Brief Editor

#### Features
- Rich text editing (bold, italic, lists, links)
- Section-based editing (lock/unlock sections)
- Version comparison (show changes)
- Comment system (inline annotations)
- Auto-save with conflict resolution
- Export preview

#### Editor States
- **Draft**: Full editing capabilities
- **In Review**: Comments only
- **Approved**: Read-only
- **Archived**: Read-only with version history

### 4. Client Review Portal

#### Branded Review Link
- Custom subdomain: `{agency}.briefreview.app/p/{project-id}`
- White-label options: Logo, colors, fonts
- No login required for reviewers
- Email verification for security

#### Review Interface
- Clean, distraction-free reading view
- Section-by-section approval
- Inline commenting
- Overall approval/rejection
- Request changes workflow

#### Review Actions
- **Approve**: Locks brief, triggers notification
- **Request Changes**: Opens specific sections for editing
- **Comment**: Adds contextual feedback
- **Delegate**: Forward to another approver

### 5. Export & Integrations

#### Export Formats
- **PDF**: Branded template, table of contents
- **Word**: Structured document with styles
- **Markdown**: For technical documentation
- **JSON**: For API consumption

#### Integration Placeholders (MVP)
- Webhook notifications
- Zapier compatibility prep
- API endpoint structure
- CSV data export

---

## User Journeys

### Journey 1: Agency PM Creates Brief
1. Receives client requirements (email/call)
2. Opens platform → "New Brief"
3. Completes intake wizard (15 min)
4. Reviews AI draft (5 min)
5. Makes edits (5 min)
6. Sends for client approval
7. Receives approval notification
8. Exports final brief

### Journey 2: Client Direct Input
1. Receives intake link from agency
2. Fills out simplified intake form
3. Submits → Agency notified
4. Agency enhances with AI
5. Client reviews enhanced brief
6. Approves or requests changes
7. Final brief delivered

### Journey 3: Quick Brief from Transcript
1. Agency uploads call transcript
2. AI extracts key information
3. Flags gaps for manual input
4. Generates draft brief
5. Agency refines
6. Standard approval flow

---

## MVP Scope Definition

### Must Have (Core MVP)
- [ ] User authentication (email/password)
- [ ] Basic organization/workspace setup
- [ ] Intake wizard with conditional logic
- [ ] AI draft generation (OpenAI integration)
- [ ] Brief editor with rich text
- [ ] Client review portal (public links)
- [ ] PDF export
- [ ] Basic email notifications
- [ ] 3 brief templates

### Should Have (MVP+)
- [ ] File upload parsing (PDF, DOCX)
- [ ] Version history (last 5 versions)
- [ ] Comment system
- [ ] Multiple export formats
- [ ] Custom branding for review portal
- [ ] Team member invites
- [ ] Brief templates library (10+)

### Could Have (Post-MVP)
- [ ] Real-time collaboration
- [ ] Advanced analytics dashboard
- [ ] Estimation engine
- [ ] PM tool integrations (Asana, Monday)
- [ ] Slack notifications
- [ ] Multi-language support
- [ ] Mobile app

### Won't Have (Future)
- [ ] White-label SaaS offering
- [ ] AI-powered resource planning
- [ ] Financial/billing integration
- [ ] Advanced workflow automation
- [ ] Custom AI model training

---

## Implementation Roadmap

### Phase 1: Foundation (Weeks 1-3)
- Set up Next.js project with TypeScript
- Implement design system components
- Database schema and Prisma setup
- Authentication flow
- Basic navigation and layout

### Phase 2: Core Features (Weeks 4-7)
- Intake wizard with conditional logic
- Form data persistence
- AI integration and prompt engineering
- Brief generation pipeline
- Basic brief editor

### Phase 3: Review & Approval (Weeks 8-10)
- Client portal development
- Public link generation
- Review interface
- Approval workflow
- Email notifications

### Phase 4: Polish & Export (Weeks 11-12)
- PDF generation
- Export templates
- Error handling
- Performance optimization
- User onboarding flow

### Phase 5: Testing & Launch (Weeks 13)
- User acceptance testing
- Bug fixes
- Documentation
- Deployment setup
- Beta user onboarding

---

## Testing Strategy

### Functional Testing
- Intake form completion (all paths)
- AI generation reliability
- Export quality verification
- Approval flow end-to-end
- Email delivery

### User Testing Scenarios
1. Create brief from scratch
2. Create brief with uploaded docs
3. Client approval flow
4. Edit and re-approve cycle
5. Export and handoff

### Performance Targets
- Page load: <3 seconds
- AI generation: <30 seconds
- Export generation: <10 seconds
- Auto-save: Every 10 seconds

---

## Security & Compliance

### MVP Requirements
- HTTPS everywhere
- Password hashing (bcrypt)
- JWT or session-based auth
- Input sanitization
- Rate limiting on AI calls
- Basic CORS configuration

### Data Privacy
- Clear data retention policy
- Export user data capability
- Delete account functionality
- Cookie consent (if needed)
- Privacy policy and ToS

### Future Considerations
- SOC 2 preparation
- GDPR compliance
- Enterprise SSO
- Audit logging
- Encryption at rest

---

## Success Criteria

### Quantitative Metrics
- 10 completed brief cycles in testing
- <30 min average time to brief
- >70% first-draft acceptance
- <5% critical bug rate
- 5-10 active beta testers

### Qualitative Metrics
- "This would save us hours each week"
- "The AI drafts are surprisingly good"
- "Clients love the review process"
- "Export quality is professional"
- "Would pay for this today"

---

## Appendices

### A. Competitor Analysis
- **Briefly.ai**: Focus on automation, weak on collaboration
- **Workamajig**: Full agency suite, complex and expensive
- **Function Point**: PM-heavy, brief creation is secondary
- **Opportunity**: Simple, brief-focused, AI-native solution

### B. Technical Decisions
- **Why Next.js**: Full-stack framework, great DX, Vercel hosting
- **Why PostgreSQL**: Relational data, complex queries, proven scale
- **Why Tailwind**: Rapid prototyping, consistent design, small bundle
- **Why OpenAI**: Best-in-class generation, simple API, reliable

### C. Risk Mitigation
- **AI Quality**: Multiple prompt templates, human review required
- **Adoption**: Free tier, easy onboarding, immediate value
- **Technical Debt**: Clean architecture, comprehensive testing
- **Competition**: Move fast, focus on specific use case

---

## Next Steps
1. Validate technical architecture choices
2. Set up development environment
3. Create component library in Storybook
4. Build first vertical slice (intake → generation)
5. Recruit 2-3 early beta testers
6. Begin weekly development sprints

---

*Document Version: 1.0*  
*Last Updated: [Current Date]*  
*Owner: [Founder Name]*  
*Status: Ready for Development*