1. Core Outcome
In one sentence: Prove that messy client inputs can be transformed into a structured, client-approved creative brief in minutes, not days.
Minimum visible outcome: User uploads or enters project inputs → system generates an AI-powered draft brief → client/agency can review, edit, and approve via a branded link.
2. User Flows (Final for PoC/MVP)
These MUST work end-to-end:
Flow 1: Client/agency fills guided intake form (including optional voice input or uploaded call transcripts) → AI generates draft brief → agency edits → client reviews/approves.
Flow 2: Agency uploads supporting docs (e.g., brand guidelines) → system uses them in the draft brief → flagged gaps prompt user.
Flow 3: Final approved brief exported as structured document (PDF + copyable text) → saved in system.
3. Success Criteria
Complete when: A real agency tester can go from intake → AI draft → approval → export in one seamless experience.
Done looks like:
Intake wizard with conditional logic
AI draft with editable text
Missing info flags
Client-facing review/approval link
Export option (PDF + copy)
Nice-to-have (not required):
PM tool integrations (Asana, Monday, etc.)
Advanced analytics (brief quality scores, dashboards)
Multi-language support


4. Scope Boundaries
Out of scope (this phase):
Deep PSA/PM integrations (Productive, Asana, Jira, etc.)
Real-time multi-user collaboration
Full estimation engine (only placeholder messaging now)
Mobile apps
If cut one thing now: Document upload parsing. Keep intake form + AI draft core alive first.
5. Users & Testers
Testers: 5–10 agency PMs, client service directors, and strategy leads at mid-market creative/digital agencies.
They need to see:
AI-generated draft that looks like a “real” brief they’d actually send
A simple approval flow (client can comment/approve)
Export they can hand off internally
Most important feedback:
Accuracy of AI draft
Clarity/ease of intake process
Client approval experience
6. Constraints
Budget tolerance: Lean SaaS PoC budget. Optimize for speed, not bells & whistles.
Timeline tolerance: 90 days max (from kickoff to live PoC).
Compliance/security (PoC):
Basic data encryption
SOC 2/security posture messaging placeholder, but don’t invest heavy yet
GDPR/CPRA awareness (but no enterprise-grade hosting until v1.0)
7. Beyond This Phase
Next build if success:
Estimation engine (historical data + role-rate scoping)
Deeper client approval workflows (version tracking, side-by-side diffs)
Pilot PSA/PM integrations (Productive, Asana, Monday)
Can safely wait until v2.0+:
Real-time multi-user editing
Advanced analytics dashboards (rebrief rates, cycle times, ROI)
Marketplace integrations (Slack, Teams, CRM, etc.)
White-label customization
8. Required Input Fields (Initial Scope)
To begin the intake process, the following fields must be collected from the user:
Project Metadata
Brief Submission Date
Project Due Date
Project Name
Project Owner
Brand
Category
Scope & Deliverables
Deliverables (with channel/platform detail)
Project Brief (file upload)
Strategic Context
Objectives & Goals
Target Audience (personas, demographics, psychographics)
Key Messaging / Value Proposition
Mandatories (brand assets, legal disclaimers, required copy)
Budget & Resources (range if known)
Timeline / Milestones (beyond final due date)
Creative Direction
Tone & Style (formal, playful, premium, etc.)
Competitors / Inspiration (examples to follow or avoid)
Approvals & Constraints
Approval Stakeholders (names/roles)
Risks / Constraints (regulatory, sensitive topics)
Optional but Valuable
KPIs & Success Criteria (metrics for success)
Background Context (prior campaigns, research, insights)
9. Conditional Logic Rules (Intake Wizard)
To ensure users only see relevant questions, the intake form must include conditional branching:
Project Category → Deliverables
If user selects “Social Campaign” → show fields for social platforms, ad formats, KPIs.
If “Website Redesign” → show fields for pages, CMS preferences, integrations.
If “Branding” → show fields for logo, visual identity, style guide references.
Deliverables → Channels
If Deliverables include “Video” → ask for length, aspect ratio, distribution channels.
If Deliverables include “Print” → ask for format, dimensions, print specs.
Budget
If budget range provided → enable AI to scope feasibility and estimate ballpark hours/costs.
If no budget provided → skip estimation, flag as missing for follow-up.
Target Audience
If “General” → minimal demographic prompts.
If “Specific Persona” → expand to ask about demographics, psychographics, and pain points.
Tone & Style
If user selects “Custom” → open free text box for detailed guidance.
If “Use Brand Guidelines” → prompt file upload/link to existing guide.
Approval Stakeholders
If >1 stakeholder → display option to assign primary approver vs. reviewers.

