# Batch 4: Specialized Components - Implementation Plan

**Date:** November 12, 2025
**Batch:** 4 of 4
**Parent Design:** [Complete Design System Coverage](2025-11-11-complete-design-system-coverage.md)
**Status:** Ready for Implementation

---

## Overview

This is the final batch of the design system coverage initiative. Batch 4 focuses on specialized, domain-specific components that handle complex business logic and user interactions: stakeholder management, clarity feedback, summary panels, and export/preview functionality.

### Components in This Batch

1. **StakeholderSelector** - Person chips with avatar circles, role management
2. **ClarityFeedback** - Inline guidance with progress indicators
3. **SnapshotSummary/SummaryPanel** - Multi-section brief overview with edit navigation
4. **PreviewBriefModal/Export** - Full preview with copy and export functionality

---

## Source Components

- `/Users/wallymo/BriefFlow-Playground-main/components/ui/StakeholderSelector.tsx` (80 lines)
- `/Users/wallymo/BriefFlow-Playground-main/components/ui/ClarityFeedback.tsx` (60 lines)
- `/Users/wallymo/BriefFlow-Playground-main/components/SnapshotSummary.tsx` (200 lines)
- `/Users/wallymo/BriefFlow-Playground-main/components/PreviewBriefModal.tsx` (136 lines)

---

## Task Breakdown

### Task 1: StakeholderSelector Component Section

**Goal:** Document the person chip selector pattern with avatar circles, role labels, and add/remove functionality.

**Source:** `components/ui/StakeholderSelector.tsx` lines 1-80

**Key Patterns:**
- Avatar circles with initials (bg-primary, text-white)
- Role/email display under name
- Add button with dropdown
- Remove button (X) on hover
- Agency vs Client categorization
- Chip layout with flex wrapping

**Implementation Steps:**

1. **Add Section to design-system.html** after the BriefHealthWidget section (around line 1700)

```html
<!-- Stakeholder Selector Component -->
<div class="bg-white rounded-xl p-8 border border-gray-200 shadow-lg mb-8">
    <h3 class="text-2xl font-bold text-gray-900 mb-6">Stakeholder Selector</h3>
    <p class="text-gray-600 mb-8">Person chips with avatar circles for managing project stakeholders and team members.</p>

    <!-- Interactive Demo -->
    <div class="mb-8">
        <h4 class="text-lg font-semibold text-gray-900 mb-4">Interactive Demo</h4>

        <div class="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <!-- Agency Stakeholders -->
            <div class="mb-6">
                <label class="block text-sm font-medium text-gray-900 mb-3">Agency Team</label>
                <div class="flex flex-wrap gap-2 mb-3" id="agency-chips">
                    <div class="stakeholder-chip group flex items-center gap-2 bg-white border border-gray-300 rounded-full py-1.5 px-3 hover:border-gray-400 transition-all" data-id="1">
                        <div class="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-semibold">
                            SM
                        </div>
                        <div class="flex flex-col">
                            <span class="text-sm font-medium text-gray-900">Sarah Miller</span>
                            <span class="text-xs text-gray-500">Creative Director</span>
                        </div>
                        <button class="remove-chip ml-2 w-5 h-5 rounded-full bg-gray-200 text-gray-600 hover:bg-red-100 hover:text-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Remove Sarah Miller">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                    <div class="stakeholder-chip group flex items-center gap-2 bg-white border border-gray-300 rounded-full py-1.5 px-3 hover:border-gray-400 transition-all" data-id="2">
                        <div class="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-semibold">
                            JD
                        </div>
                        <div class="flex flex-col">
                            <span class="text-sm font-medium text-gray-900">John Davis</span>
                            <span class="text-xs text-gray-500">Account Manager</span>
                        </div>
                        <button class="remove-chip ml-2 w-5 h-5 rounded-full bg-gray-200 text-gray-600 hover:bg-red-100 hover:text-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Remove John Davis">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <button id="add-agency-btn" class="text-sm font-medium text-gray-900 hover:text-gray-700 flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                    </svg>
                    Add Team Member
                </button>
            </div>

            <!-- Client Stakeholders -->
            <div>
                <label class="block text-sm font-medium text-gray-900 mb-3">Client Stakeholders</label>
                <div class="flex flex-wrap gap-2 mb-3" id="client-chips">
                    <div class="stakeholder-chip group flex items-center gap-2 bg-white border border-gray-300 rounded-full py-1.5 px-3 hover:border-gray-400 transition-all" data-id="3">
                        <div class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
                            EJ
                        </div>
                        <div class="flex flex-col">
                            <span class="text-sm font-medium text-gray-900">Emily Johnson</span>
                            <span class="text-xs text-gray-500">Marketing VP</span>
                        </div>
                        <button class="remove-chip ml-2 w-5 h-5 rounded-full bg-gray-200 text-gray-600 hover:bg-red-100 hover:text-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Remove Emily Johnson">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <button id="add-client-btn" class="text-sm font-medium text-gray-900 hover:text-gray-700 flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                    </svg>
                    Add Stakeholder
                </button>
            </div>
        </div>
    </div>

    <!-- Variants -->
    <div class="mb-8">
        <h4 class="text-lg font-semibold text-gray-900 mb-4">Avatar Variants</h4>
        <div class="flex flex-wrap gap-4">
            <!-- Primary (Agency) -->
            <div class="flex items-center gap-2 bg-white border border-gray-300 rounded-full py-1.5 px-3">
                <div class="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-semibold">AB</div>
                <div class="flex flex-col">
                    <span class="text-sm font-medium text-gray-900">Agency Member</span>
                    <span class="text-xs text-gray-500">Designer</span>
                </div>
            </div>

            <!-- Client -->
            <div class="flex items-center gap-2 bg-white border border-gray-300 rounded-full py-1.5 px-3">
                <div class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">CD</div>
                <div class="flex flex-col">
                    <span class="text-sm font-medium text-gray-900">Client Contact</span>
                    <span class="text-xs text-gray-500">Brand Manager</span>
                </div>
            </div>

            <!-- With Email -->
            <div class="flex items-center gap-2 bg-white border border-gray-300 rounded-full py-1.5 px-3">
                <div class="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-semibold">EF</div>
                <div class="flex flex-col">
                    <span class="text-sm font-medium text-gray-900">External Partner</span>
                    <span class="text-xs text-gray-500">partner@example.com</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Technical Details -->
    <div>
        <h4 class="text-lg font-semibold text-gray-900 mb-4">Technical Details</h4>
        <dl class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
                <dt class="font-semibold text-gray-900">Avatar Size</dt>
                <dd class="text-gray-600">w-8 h-8 (32px)</dd>
            </div>
            <div>
                <dt class="font-semibold text-gray-900">Agency Color</dt>
                <dd class="text-gray-600">bg-gray-900</dd>
            </div>
            <div>
                <dt class="font-semibold text-gray-900">Client Color</dt>
                <dd class="text-gray-600">bg-blue-600</dd>
            </div>
            <div>
                <dt class="font-semibold text-gray-900">Hover State</dt>
                <dd class="text-gray-600">border-gray-400, show remove button</dd>
            </div>
            <div>
                <dt class="font-semibold text-gray-900">Remove Button</dt>
                <dd class="text-gray-600">Opacity 0 → 100 on group-hover</dd>
            </div>
            <div>
                <dt class="font-semibold text-gray-900">Layout</dt>
                <dd class="text-gray-600">flex flex-wrap gap-2</dd>
            </div>
        </dl>
    </div>
</div>
```

2. **Verify** the section renders correctly with proper spacing and avatar circles

---

### Task 2: ClarityFeedback Component Section

**Goal:** Document the inline guidance component with progress bar and contextual tips.

**Source:** `components/ui/ClarityFeedback.tsx` lines 1-60

**Key Patterns:**
- Progress bar with percentage calculation
- Color-coded states (red < 30%, yellow 30-70%, green > 70%)
- Info/warning icons
- Expandable tips
- Field-adjacent positioning

**Implementation Steps:**

1. **Add Section** after StakeholderSelector

```html
<!-- Clarity Feedback Component -->
<div class="bg-white rounded-xl p-8 border border-gray-200 shadow-lg mb-8">
    <h3 class="text-2xl font-bold text-gray-900 mb-6">Clarity Feedback</h3>
    <p class="text-gray-600 mb-8">Inline guidance component that provides real-time feedback and tips to improve brief quality.</p>

    <!-- Interactive Demo -->
    <div class="mb-8">
        <h4 class="text-lg font-semibold text-gray-900 mb-4">Interactive Demo</h4>

        <div class="bg-gray-50 rounded-lg p-6 border border-gray-200 space-y-6">
            <!-- Low Clarity (Red) -->
            <div class="clarity-feedback bg-white border border-red-200 rounded-lg p-4">
                <div class="flex items-start gap-3 mb-3">
                    <svg class="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                    </svg>
                    <div class="flex-grow">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-sm font-semibold text-gray-900">Clarity Score: 25%</span>
                            <span class="text-xs text-red-600 font-medium">Needs Work</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2 mb-3">
                            <div class="bg-red-600 h-2 rounded-full transition-all duration-500" style="width: 25%"></div>
                        </div>
                        <p class="text-sm text-gray-700 mb-2">Your brief is missing critical information. Add more details to improve clarity.</p>
                        <button class="text-sm text-gray-900 hover:text-gray-700 font-medium flex items-center gap-1">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            Show Tips
                        </button>
                    </div>
                </div>
            </div>

            <!-- Medium Clarity (Yellow) -->
            <div class="clarity-feedback bg-white border border-yellow-200 rounded-lg p-4">
                <div class="flex items-start gap-3 mb-3">
                    <svg class="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <div class="flex-grow">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-sm font-semibold text-gray-900">Clarity Score: 60%</span>
                            <span class="text-xs text-yellow-600 font-medium">Good Progress</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2 mb-3">
                            <div class="bg-yellow-500 h-2 rounded-full transition-all duration-500" style="width: 60%"></div>
                        </div>
                        <p class="text-sm text-gray-700 mb-2">You're on the right track! Add a few more details to reach excellent clarity.</p>
                    </div>
                </div>
            </div>

            <!-- High Clarity (Green) -->
            <div class="clarity-feedback bg-white border border-green-200 rounded-lg p-4">
                <div class="flex items-start gap-3 mb-3">
                    <svg class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <div class="flex-grow">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-sm font-semibold text-gray-900">Clarity Score: 85%</span>
                            <span class="text-xs text-green-600 font-medium">Excellent</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2 mb-3">
                            <div class="bg-green-600 h-2 rounded-full transition-all duration-500" style="width: 85%"></div>
                        </div>
                        <p class="text-sm text-gray-700">Great work! Your brief has excellent clarity and completeness.</p>
                    </div>
                </div>
            </div>

            <!-- With Expandable Tips -->
            <div class="clarity-feedback bg-white border border-yellow-200 rounded-lg p-4">
                <div class="flex items-start gap-3 mb-3">
                    <svg class="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <div class="flex-grow">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-sm font-semibold text-gray-900">Target Audience</span>
                            <span class="text-xs text-yellow-600 font-medium">Could Be Better</span>
                        </div>
                        <p class="text-sm text-gray-700 mb-2">Add demographic details and behavioral insights for better targeting.</p>
                        <button class="clarity-tips-toggle text-sm text-gray-900 hover:text-gray-700 font-medium flex items-center gap-1" data-target="tips-1">
                            <svg class="w-4 h-4 chevron-icon transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                            </svg>
                            Show Tips
                        </button>
                        <div id="tips-1" class="hidden mt-3 pl-4 border-l-2 border-yellow-300">
                            <ul class="text-sm text-gray-700 space-y-1 list-disc list-inside">
                                <li>Include age range, gender, location</li>
                                <li>Describe their interests and values</li>
                                <li>Add pain points or challenges they face</li>
                                <li>Mention where they consume media</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Score Thresholds -->
    <div>
        <h4 class="text-lg font-semibold text-gray-900 mb-4">Score Thresholds</h4>
        <dl class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div class="border border-red-200 rounded-lg p-4 bg-red-50">
                <dt class="font-semibold text-red-900 mb-1">0-30%: Needs Work</dt>
                <dd class="text-red-700">Red progress bar, warning icon, critical gaps identified</dd>
            </div>
            <div class="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                <dt class="font-semibold text-yellow-900 mb-1">31-70%: Good Progress</dt>
                <dd class="text-yellow-700">Yellow progress bar, info icon, suggestions provided</dd>
            </div>
            <div class="border border-green-200 rounded-lg p-4 bg-green-50">
                <dt class="font-semibold text-green-900 mb-1">71-100%: Excellent</dt>
                <dd class="text-green-700">Green progress bar, check icon, high quality confirmed</dd>
            </div>
        </dl>
    </div>
</div>
```

2. **Verify** the progress bars display correctly and colors match thresholds

---

### Task 3: SnapshotSummary/SummaryPanel Component Section

**Goal:** Document the multi-section summary panel with collapsible sections and edit navigation.

**Source:** `components/SnapshotSummary.tsx` lines 1-200

**Key Patterns:**
- Multiple sections (Project Details, Goals, Audience, Brand, Deliverables)
- Each section has "Edit" button that jumps to step
- Two variants: standalone (white cards) and embedded (fixed height, scrollable)
- Empty state handling
- Preview button at bottom

**Implementation Steps:**

1. **Add Section** after ClarityFeedback

```html
<!-- Snapshot Summary / Summary Panel Component -->
<div class="bg-white rounded-xl p-8 border border-gray-200 shadow-lg mb-8">
    <h3 class="text-2xl font-bold text-gray-900 mb-6">Snapshot Summary</h3>
    <p class="text-gray-600 mb-8">Multi-section brief overview panel that provides a quick snapshot of all key information with navigation to edit specific sections.</p>

    <!-- Interactive Demo: Standalone Variant -->
    <div class="mb-8">
        <h4 class="text-lg font-semibold text-gray-900 mb-4">Standalone Variant</h4>

        <div class="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div class="space-y-4">
                <!-- Section: Project Details -->
                <div class="bg-white p-4 rounded-lg border border-gray-200">
                    <div class="flex justify-between items-center mb-3">
                        <h5 class="font-semibold text-gray-900">Project Details</h5>
                        <button class="text-sm font-medium text-gray-900 hover:underline">Edit</button>
                    </div>
                    <div class="text-sm text-gray-600 space-y-2">
                        <p><strong class="text-gray-900">Project Type:</strong> Campaign</p>
                        <p><strong class="text-gray-900">Subtypes:</strong> Organic Social, Video Content</p>
                        <p><strong class="text-gray-900">Name:</strong> Spring Product Launch</p>
                        <p><strong class="text-gray-900">Description:</strong> Multi-platform campaign to announce new product line targeting millennials</p>
                        <p><strong class="text-gray-900">Owner(s):</strong> Sarah Miller</p>
                        <p><strong class="text-gray-900">Stakeholders:</strong> John Davis, Emily Johnson</p>
                        <p><strong class="text-gray-900">Launch Date:</strong> 2025-03-15</p>
                    </div>
                </div>

                <!-- Section: Goals & KPIs -->
                <div class="bg-white p-4 rounded-lg border border-gray-200">
                    <div class="flex justify-between items-center mb-3">
                        <h5 class="font-semibold text-gray-900">Goals & KPIs</h5>
                        <button class="text-sm font-medium text-gray-900 hover:underline">Edit</button>
                    </div>
                    <div class="text-sm text-gray-600 space-y-2">
                        <p><strong class="text-gray-900">Primary Objective:</strong> Brand Awareness</p>
                        <p><strong class="text-gray-900">KPI:</strong> Reach 500K impressions in first month</p>
                    </div>
                </div>

                <!-- Section: Audience & Key Insight -->
                <div class="bg-white p-4 rounded-lg border border-gray-200">
                    <div class="flex justify-between items-center mb-3">
                        <h5 class="font-semibold text-gray-900">Audience & Key Insight</h5>
                        <button class="text-sm font-medium text-gray-900 hover:underline">Edit</button>
                    </div>
                    <div class="text-sm text-gray-600 space-y-2">
                        <p><strong class="text-gray-900">Audience Description:</strong> Urban millennials (25-35) interested in sustainable products</p>
                        <div><strong class="text-gray-900">Persona Documents:</strong>
                            <ul class="list-disc list-inside pl-1 mt-1">
                                <li>Eco-Conscious Emma Persona.pdf</li>
                                <li>Tech-Savvy Tom Profile.pdf</li>
                            </ul>
                        </div>
                        <p><strong class="text-gray-900">Key Tension:</strong> Want quality products but concerned about environmental impact</p>
                        <p><strong class="text-gray-900">Key Messaging:</strong> Luxury that's kind to the planet</p>
                    </div>
                </div>

                <!-- Section: Brand Identity -->
                <div class="bg-white p-4 rounded-lg border border-gray-200">
                    <div class="flex justify-between items-center mb-3">
                        <h5 class="font-semibold text-gray-900">Brand Identity</h5>
                        <button class="text-sm font-medium text-gray-900 hover:underline">Edit</button>
                    </div>
                    <div class="text-sm text-gray-600 space-y-2">
                        <p><strong class="text-gray-900">Brand Voice:</strong> Warm, authentic, aspirational but grounded</p>
                        <div><strong class="text-gray-900">Brand Documents:</strong>
                            <ul class="list-disc list-inside pl-1 mt-1">
                                <li>Brand Guidelines 2025.pdf</li>
                                <li>Tone of Voice Guide.pdf</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Section: Deliverables -->
                <div class="bg-white p-4 rounded-lg border border-gray-200">
                    <div class="flex justify-between items-center mb-3">
                        <h5 class="font-semibold text-gray-900">Deliverables</h5>
                        <button class="text-sm font-medium text-gray-900 hover:underline">Edit</button>
                    </div>
                    <div class="text-sm text-gray-600">
                        <strong class="text-gray-900">Deliverables:</strong>
                        <ul class="list-disc list-inside pl-1 mt-1">
                            <li><strong class="text-gray-900">Video:</strong> 3x 15-second Instagram Reels</li>
                            <li><strong class="text-gray-900">Static Posts:</strong> 10x carousel posts for feed</li>
                            <li><strong class="text-gray-900">Copy:</strong> Captions and hashtag strategy</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Interactive Demo: Embedded Variant -->
    <div class="mb-8">
        <h4 class="text-lg font-semibold text-gray-900 mb-4">Embedded Variant (Sidebar)</h4>

        <div class="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col overflow-hidden" style="height: 350px;">
            <div class="p-6 pb-0 flex-shrink-0">
                <div class="flex justify-between items-center mb-4">
                    <h5 class="text-sm font-semibold text-gray-900">Brief Snapshot</h5>
                    <svg class="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                    </svg>
                </div>
            </div>

            <div class="flex-grow overflow-y-auto px-6">
                <div class="space-y-4">
                    <!-- Compact sections -->
                    <div>
                        <div class="flex justify-between items-center mb-2">
                            <h6 class="text-sm font-semibold text-gray-900">Project Details</h6>
                            <button class="text-xs font-medium text-gray-900 hover:underline">Edit</button>
                        </div>
                        <div class="text-xs text-gray-600 space-y-1">
                            <p><strong class="text-gray-900">Type:</strong> Campaign</p>
                            <p><strong class="text-gray-900">Name:</strong> Spring Launch</p>
                        </div>
                    </div>
                    <div>
                        <div class="flex justify-between items-center mb-2">
                            <h6 class="text-sm font-semibold text-gray-900">Goals & KPIs</h6>
                            <button class="text-xs font-medium text-gray-900 hover:underline">Edit</button>
                        </div>
                        <div class="text-xs text-gray-600 space-y-1">
                            <p><strong class="text-gray-900">Objective:</strong> Brand Awareness</p>
                        </div>
                    </div>
                    <div>
                        <div class="flex justify-between items-center mb-2">
                            <h6 class="text-sm font-semibold text-gray-900">Audience</h6>
                            <button class="text-xs font-medium text-gray-900 hover:underline">Edit</button>
                        </div>
                        <div class="text-xs text-gray-600">
                            <p>Urban millennials (25-35) interested in sustainable products</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex-shrink-0">
                <div class="h-6 bg-gradient-to-t from-white to-transparent pointer-events-none -mb-6"></div>
                <div class="p-6 pt-4 bg-white border-t border-gray-200">
                    <button class="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-green-200 text-green-700 rounded-lg hover:bg-green-50 hover:border-green-300 transition-colors">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                        </svg>
                        Preview My Brief
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Variants -->
    <div>
        <h4 class="text-lg font-semibold text-gray-900 mb-4">Variant Comparison</h4>
        <dl class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div class="border border-gray-200 rounded-lg p-4">
                <dt class="font-semibold text-gray-900 mb-2">Standalone</dt>
                <dd class="text-gray-600">
                    <ul class="list-disc list-inside space-y-1">
                        <li>Full-width sections</li>
                        <li>White card backgrounds</li>
                        <li>Auto height (scrolls with page)</li>
                        <li>Used in review step</li>
                    </ul>
                </dd>
            </div>
            <div class="border border-gray-200 rounded-lg p-4">
                <dt class="font-semibold text-gray-900 mb-2">Embedded</dt>
                <dd class="text-gray-600">
                    <ul class="list-disc list-inside space-y-1">
                        <li>Fixed height (350px)</li>
                        <li>Internal scrolling</li>
                        <li>Gradient fade at bottom</li>
                        <li>Preview button pinned</li>
                        <li>Used in sidebar widgets</li>
                    </ul>
                </dd>
            </div>
        </dl>
    </div>
</div>
```

2. **Verify** both variants display correctly with proper scrolling behavior

---

### Task 4: PreviewBriefModal/Export Component Section

**Goal:** Document the full preview modal with export functionality (copy to clipboard, download PDF).

**Source:** `components/PreviewBriefModal.tsx` lines 1-136

**Key Patterns:**
- Full-screen modal overlay
- Health scores in header
- Scrollable content area with SnapshotSummary
- Footer with action buttons (Copy, Download, Close)
- Copy confirmation with icon swap (Clipboard → Check)
- Click outside to close

**Implementation Steps:**

1. **Add Section** after SnapshotSummary

```html
<!-- Preview Brief Modal / Export Component -->
<div class="bg-white rounded-xl p-8 border border-gray-200 shadow-lg mb-8">
    <h3 class="text-2xl font-bold text-gray-900 mb-6">Preview Brief Modal</h3>
    <p class="text-gray-600 mb-8">Full-screen preview modal with export functionality for copying, downloading, and sharing brief summaries.</p>

    <!-- Interactive Demo -->
    <div class="mb-8">
        <h4 class="text-lg font-semibold text-gray-900 mb-4">Interactive Demo</h4>

        <div class="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <button id="open-preview-modal" class="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                Open Preview Modal
            </button>
        </div>
    </div>

    <!-- Export Actions -->
    <div class="mb-8">
        <h4 class="text-lg font-semibold text-gray-900 mb-4">Export Actions</h4>

        <div class="flex flex-wrap gap-4">
            <!-- Copy to Clipboard -->
            <button id="copy-demo-btn" class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors">
                <svg class="w-4 h-4 copy-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
                </svg>
                <svg class="w-4 h-4 check-icon hidden text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span class="copy-text">Copy Summary</span>
                <span class="copied-text hidden">Copied!</span>
            </button>

            <!-- Download PDF -->
            <button class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
                Download PDF
            </button>

            <!-- Email Brief -->
            <button class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                Email Brief
            </button>
        </div>
    </div>

    <!-- Health Score Display -->
    <div class="mb-8">
        <h4 class="text-lg font-semibold text-gray-900 mb-4">Health Scores in Header</h4>

        <div class="bg-white border border-gray-200 rounded-lg p-6">
            <div class="flex items-center gap-8">
                <div>
                    <h5 class="text-2xl font-bold text-gray-900">Campaign Brief Preview</h5>
                    <p class="text-sm text-gray-600">A presentation-ready summary of your brief.</p>
                </div>
                <div class="flex items-center gap-6 ml-auto">
                    <div class="text-center">
                        <p class="text-xs text-gray-600">Clarity</p>
                        <p class="text-3xl font-bold text-gray-900">85</p>
                    </div>
                    <div class="text-center">
                        <p class="text-xs text-gray-600">Brand Match</p>
                        <p class="text-3xl font-bold text-blue-600">78</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Technical Details -->
    <div>
        <h4 class="text-lg font-semibold text-gray-900 mb-4">Technical Details</h4>
        <dl class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
                <dt class="font-semibold text-gray-900">Modal Size</dt>
                <dd class="text-gray-600">max-w-3xl, max-h-[90vh]</dd>
            </div>
            <div>
                <dt class="font-semibold text-gray-900">Backdrop</dt>
                <dd class="text-gray-600">bg-black/60 backdrop-blur-sm</dd>
            </div>
            <div>
                <dt class="font-semibold text-gray-900">Copy Feedback</dt>
                <dd class="text-gray-600">Icon swap + text change for 2s</dd>
            </div>
            <div>
                <dt class="font-semibold text-gray-900">Close Methods</dt>
                <dd class="text-gray-600">Close button, ESC key, click outside</dd>
            </div>
            <div>
                <dt class="font-semibold text-gray-900">Content Area</dt>
                <dd class="text-gray-600">overflow-y-auto with custom scrollbar</dd>
            </div>
            <div>
                <dt class="font-semibold text-gray-900">Footer Actions</dt>
                <dd class="text-gray-600">Copy (secondary) + Download (secondary) + Close (primary)</dd>
            </div>
        </dl>
    </div>
</div>
```

2. **Verify** the modal opens correctly and export buttons are functional

---

### Task 5: Add JavaScript for Interactive Demos

**Goal:** Implement all JavaScript for stakeholder management, clarity tips toggle, and preview modal.

**Implementation Steps:**

1. **Add JavaScript** to the `<script>` section at bottom of design-system.html (before `</body>`)

```javascript
// ============================================================================
// Batch 4: Specialized Components - Interactive JavaScript
// ============================================================================

// --- Stakeholder Selector ---
document.addEventListener('DOMContentLoaded', function() {
    // Remove chip functionality
    document.addEventListener('click', function(e) {
        if (e.target.closest('.remove-chip')) {
            const chip = e.target.closest('.stakeholder-chip');
            chip.style.opacity = '0';
            chip.style.transform = 'scale(0.8)';
            setTimeout(() => chip.remove(), 200);
        }
    });

    // Add agency member
    const addAgencyBtn = document.getElementById('add-agency-btn');
    const agencyChips = document.getElementById('agency-chips');
    if (addAgencyBtn) {
        addAgencyBtn.addEventListener('click', function() {
            const names = ['Alex Turner', 'Maya Patel', 'Chris Lee', 'Jordan Blake'];
            const roles = ['Copywriter', 'Designer', 'Strategist', 'Developer'];
            const randomIndex = Math.floor(Math.random() * names.length);
            const name = names[randomIndex];
            const role = roles[randomIndex];
            const initials = name.split(' ').map(n => n[0]).join('');

            const chip = document.createElement('div');
            chip.className = 'stakeholder-chip group flex items-center gap-2 bg-white border border-gray-300 rounded-full py-1.5 px-3 hover:border-gray-400 transition-all';
            chip.innerHTML = `
                <div class="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-semibold">
                    ${initials}
                </div>
                <div class="flex flex-col">
                    <span class="text-sm font-medium text-gray-900">${name}</span>
                    <span class="text-xs text-gray-500">${role}</span>
                </div>
                <button class="remove-chip ml-2 w-5 h-5 rounded-full bg-gray-200 text-gray-600 hover:bg-red-100 hover:text-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Remove ${name}">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            `;
            chip.style.opacity = '0';
            chip.style.transform = 'scale(0.8)';
            agencyChips.appendChild(chip);
            setTimeout(() => {
                chip.style.transition = 'all 200ms';
                chip.style.opacity = '1';
                chip.style.transform = 'scale(1)';
            }, 10);
        });
    }

    // Add client stakeholder
    const addClientBtn = document.getElementById('add-client-btn');
    const clientChips = document.getElementById('client-chips');
    if (addClientBtn) {
        addClientBtn.addEventListener('click', function() {
            const names = ['David Chen', 'Lisa Rodriguez', 'Mark Thompson', 'Rachel Green'];
            const roles = ['CMO', 'Brand Director', 'Product Manager', 'VP Marketing'];
            const randomIndex = Math.floor(Math.random() * names.length);
            const name = names[randomIndex];
            const role = roles[randomIndex];
            const initials = name.split(' ').map(n => n[0]).join('');

            const chip = document.createElement('div');
            chip.className = 'stakeholder-chip group flex items-center gap-2 bg-white border border-gray-300 rounded-full py-1.5 px-3 hover:border-gray-400 transition-all';
            chip.innerHTML = `
                <div class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
                    ${initials}
                </div>
                <div class="flex flex-col">
                    <span class="text-sm font-medium text-gray-900">${name}</span>
                    <span class="text-xs text-gray-500">${role}</span>
                </div>
                <button class="remove-chip ml-2 w-5 h-5 rounded-full bg-gray-200 text-gray-600 hover:bg-red-100 hover:text-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Remove ${name}">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            `;
            chip.style.opacity = '0';
            chip.style.transform = 'scale(0.8)';
            clientChips.appendChild(chip);
            setTimeout(() => {
                chip.style.transition = 'all 200ms';
                chip.style.opacity = '1';
                chip.style.transform = 'scale(1)';
            }, 10);
        });
    }

    // --- Clarity Feedback Tips Toggle ---
    document.addEventListener('click', function(e) {
        const toggleBtn = e.target.closest('.clarity-tips-toggle');
        if (toggleBtn) {
            const targetId = toggleBtn.dataset.target;
            const tipsDiv = document.getElementById(targetId);
            const chevronIcon = toggleBtn.querySelector('.chevron-icon');

            if (tipsDiv.classList.contains('hidden')) {
                tipsDiv.classList.remove('hidden');
                chevronIcon.style.transform = 'rotate(180deg)';
                toggleBtn.innerHTML = toggleBtn.innerHTML.replace('Show Tips', 'Hide Tips');
            } else {
                tipsDiv.classList.add('hidden');
                chevronIcon.style.transform = 'rotate(0deg)';
                toggleBtn.innerHTML = toggleBtn.innerHTML.replace('Hide Tips', 'Show Tips');
            }
        }
    });

    // --- Copy to Clipboard Demo ---
    const copyDemoBtn = document.getElementById('copy-demo-btn');
    if (copyDemoBtn) {
        copyDemoBtn.addEventListener('click', function() {
            const copyIcon = this.querySelector('.copy-icon');
            const checkIcon = this.querySelector('.check-icon');
            const copyText = this.querySelector('.copy-text');
            const copiedText = this.querySelector('.copied-text');

            // Simulate copy
            copyIcon.classList.add('hidden');
            checkIcon.classList.remove('hidden');
            copyText.classList.add('hidden');
            copiedText.classList.remove('hidden');

            setTimeout(() => {
                copyIcon.classList.remove('hidden');
                checkIcon.classList.add('hidden');
                copyText.classList.remove('hidden');
                copiedText.classList.add('hidden');
            }, 2000);
        });
    }

    // --- Preview Modal ---
    const openPreviewBtn = document.getElementById('open-preview-modal');
    const previewModal = document.getElementById('preview-brief-modal');
    const closePreviewBtn = document.getElementById('close-preview-modal');

    if (openPreviewBtn && previewModal) {
        openPreviewBtn.addEventListener('click', function() {
            previewModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closePreviewBtn && previewModal) {
        closePreviewBtn.addEventListener('click', function() {
            previewModal.classList.add('hidden');
            document.body.style.overflow = '';
        });
    }

    // Click outside to close
    if (previewModal) {
        previewModal.addEventListener('click', function(e) {
            if (e.target === previewModal) {
                previewModal.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });
    }

    // ESC key to close preview modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && previewModal && !previewModal.classList.contains('hidden')) {
            previewModal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    });
});
```

2. **Verify** all interactive features work correctly

---

### Task 6: Add Preview Modal HTML Template

**Goal:** Add the hidden modal HTML that opens when clicking "Open Preview Modal"

**Implementation Steps:**

1. **Add Modal HTML** before the closing `</body>` tag

```html
<!-- Preview Brief Modal Template -->
<div id="preview-brief-modal" class="hidden fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col border border-gray-200" onclick="event.stopPropagation()">
        <!-- Header -->
        <div class="p-6 border-b border-gray-200 flex justify-between items-center">
            <div>
                <h2 class="text-2xl font-bold text-gray-900">Campaign Brief Preview</h2>
                <p class="text-sm text-gray-600">A presentation-ready summary of your brief.</p>
            </div>
            <div class="flex items-center gap-6">
                <div class="text-center">
                    <p class="text-xs text-gray-600">Clarity</p>
                    <p class="text-3xl font-bold text-gray-900">85</p>
                </div>
                <div class="text-center">
                    <p class="text-xs text-gray-600">Brand Match</p>
                    <p class="text-3xl font-bold text-blue-600">78</p>
                </div>
            </div>
        </div>

        <!-- Content (Scrollable) -->
        <div class="p-8 overflow-y-auto bg-gray-50">
            <div class="space-y-6 divide-y divide-gray-200">
                <!-- Project Details -->
                <div class="py-4">
                    <h3 class="text-lg font-semibold text-gray-900 mb-3">Project Details</h3>
                    <div class="text-sm text-gray-600 space-y-2">
                        <p><strong class="text-gray-900">Project Type:</strong> Campaign</p>
                        <p><strong class="text-gray-900">Name:</strong> Spring Product Launch</p>
                        <p><strong class="text-gray-900">Description:</strong> Multi-platform campaign to announce new product line</p>
                    </div>
                </div>

                <!-- Goals & KPIs -->
                <div class="py-4">
                    <h3 class="text-lg font-semibold text-gray-900 mb-3">Goals & KPIs</h3>
                    <div class="text-sm text-gray-600 space-y-2">
                        <p><strong class="text-gray-900">Primary Objective:</strong> Brand Awareness</p>
                        <p><strong class="text-gray-900">KPI:</strong> Reach 500K impressions in first month</p>
                    </div>
                </div>

                <!-- Audience -->
                <div class="py-4">
                    <h3 class="text-lg font-semibold text-gray-900 mb-3">Audience & Key Insight</h3>
                    <div class="text-sm text-gray-600 space-y-2">
                        <p><strong class="text-gray-900">Audience:</strong> Urban millennials (25-35) interested in sustainable products</p>
                        <p><strong class="text-gray-900">Key Messaging:</strong> Luxury that's kind to the planet</p>
                    </div>
                </div>

                <!-- Brand Identity -->
                <div class="py-4">
                    <h3 class="text-lg font-semibold text-gray-900 mb-3">Brand Identity</h3>
                    <div class="text-sm text-gray-600">
                        <p><strong class="text-gray-900">Brand Voice:</strong> Warm, authentic, aspirational but grounded</p>
                    </div>
                </div>

                <!-- Deliverables -->
                <div class="py-4">
                    <h3 class="text-lg font-semibold text-gray-900 mb-3">Deliverables</h3>
                    <ul class="list-disc list-inside text-sm text-gray-600 space-y-1">
                        <li><strong class="text-gray-900">Video:</strong> 3x 15-second Instagram Reels</li>
                        <li><strong class="text-gray-900">Static Posts:</strong> 10x carousel posts</li>
                        <li><strong class="text-gray-900">Copy:</strong> Captions and hashtag strategy</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
            <div class="flex gap-2">
                <button class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
                    </svg>
                    Copy Summary
                </button>
                <button class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                    </svg>
                    Download PDF
                </button>
            </div>
            <button id="close-preview-modal" class="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                Close Preview
            </button>
        </div>
    </div>
</div>
```

2. **Verify** modal opens, displays content, and closes properly

---

### Task 7: Testing & Verification

**Goal:** Thoroughly test all Batch 4 components to ensure functionality, accessibility, and visual accuracy.

**Test Checklist:**

1. **StakeholderSelector**
   - [ ] Click "Add Team Member" - new chip appears with animation
   - [ ] Click "Add Stakeholder" - new chip appears with different color
   - [ ] Hover over chip - remove button appears (opacity 0 → 100)
   - [ ] Click remove button - chip fades out and is removed
   - [ ] Avatar circles display initials correctly
   - [ ] Chips wrap properly on narrow screens

2. **ClarityFeedback**
   - [ ] Red progress bar displays for low scores (0-30%)
   - [ ] Yellow progress bar displays for medium scores (31-70%)
   - [ ] Green progress bar displays for high scores (71-100%)
   - [ ] Click "Show Tips" - tips expand with chevron rotation
   - [ ] Click "Hide Tips" - tips collapse
   - [ ] Icons match severity (warning/info/check)

3. **SnapshotSummary**
   - [ ] Standalone variant shows all sections with white cards
   - [ ] Each section has working "Edit" button
   - [ ] Embedded variant has fixed height (350px)
   - [ ] Embedded variant scrolls internally
   - [ ] Gradient fade appears at bottom
   - [ ] Preview button is visible and styled correctly

4. **PreviewBriefModal**
   - [ ] Click "Open Preview Modal" - modal opens
   - [ ] Click outside modal - modal closes
   - [ ] Press ESC key - modal closes
   - [ ] Click "Close Preview" button - modal closes
   - [ ] Body scroll is locked when modal is open
   - [ ] Body scroll is restored when modal closes
   - [ ] Health scores display in header
   - [ ] Click "Copy Summary" - icon swaps for 2 seconds
   - [ ] Content area scrolls if content exceeds height

5. **Accessibility**
   - [ ] Tab through all interactive elements
   - [ ] Enter/Space activate buttons
   - [ ] ARIA labels on remove buttons
   - [ ] Focus visible on all interactive elements
   - [ ] Screen reader announces chip removal

6. **Responsive**
   - [ ] Test at 375px (mobile)
   - [ ] Test at 768px (tablet)
   - [ ] Test at 1440px (desktop)
   - [ ] Chips wrap correctly on small screens
   - [ ] Modal adjusts to viewport height

7. **Visual Accuracy**
   - [ ] Compare stakeholder chips to source component
   - [ ] Verify progress bar colors match design
   - [ ] Check modal backdrop blur and opacity
   - [ ] Confirm health score colors (gray-900 and blue-600)

**Commands:**
```bash
# Open design system in browser
open public/design-system.html

# Or start dev server
npm run dev
```

---

### Task 8: Commit Changes

**Goal:** Commit Batch 4 implementation with descriptive message

**Commands:**
```bash
git add public/design-system.html
git commit -m "$(cat <<'EOF'
feat: add Batch 4 specialized components to design system

Add final batch of specialized components for domain-specific functionality:

Components Added:
- StakeholderSelector: Person chips with avatar circles, add/remove, agency/client categories
- ClarityFeedback: Inline guidance with color-coded progress bars (red/yellow/green)
- SnapshotSummary: Multi-section brief overview with standalone and embedded variants
- PreviewBriefModal: Full-screen preview with copy/download/export functionality

Interactive Features:
- Add/remove stakeholder chips with smooth animations
- Expandable tips in clarity feedback
- Copy to clipboard with visual confirmation
- Modal open/close with ESC key and click-outside support
- Body scroll locking when modal is open

Source Components:
- components/ui/StakeholderSelector.tsx (80 lines)
- components/ui/ClarityFeedback.tsx (60 lines)
- components/SnapshotSummary.tsx (200 lines)
- components/PreviewBriefModal.tsx (136 lines)

All components tested for accessibility, responsiveness, and visual accuracy.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

---

## Success Criteria

**Batch 4 Complete When:**
- [ ] All 4 component sections added to design-system.html
- [ ] All interactive demos working (add/remove chips, tips toggle, modal)
- [ ] JavaScript handles all user interactions
- [ ] Preview modal opens/closes correctly
- [ ] Copy feedback displays for 2 seconds
- [ ] All components are responsive (mobile/tablet/desktop)
- [ ] Accessibility tested (keyboard nav, ARIA, focus states)
- [ ] No console errors
- [ ] Visual comparison to React components confirms accuracy
- [ ] Git commit created with detailed message

---

## Technical Notes

### Avatar Circle Pattern
```css
/* Agency avatar (gray-900) */
.w-8 .h-8 .rounded-full .bg-gray-900 .text-white

/* Client avatar (blue-600) */
.w-8 .h-8 .rounded-full .bg-blue-600 .text-white

/* Initials: First letter of each word */
"Sarah Miller" → "SM"
```

### Clarity Score Colors
```javascript
if (score < 30) {
  color = 'red-600'  // Needs Work
  label = 'Needs Work'
} else if (score < 70) {
  color = 'yellow-500'  // Good Progress
  label = 'Good Progress'
} else {
  color = 'green-600'  // Excellent
  label = 'Excellent'
}
```

### Modal Body Scroll Lock
```javascript
// Lock scroll when opening
document.body.style.overflow = 'hidden';

// Restore scroll when closing
document.body.style.overflow = '';
```

### Copy Confirmation Pattern
```javascript
// Show check icon and "Copied!" text
// After 2 seconds, revert to clipboard icon and "Copy Summary" text
setTimeout(() => { /* revert */ }, 2000);
```

---

## Next Steps (After Batch 4)

1. **Review all 4 batches** for consistency and completeness
2. **Update design system navigation** to include all new sections
3. **Create index/table of contents** for easy component discovery
4. **Consider final polish**:
   - Add search functionality
   - Add "Copy code" buttons for HTML snippets
   - Add dark mode toggle
   - Add component usage guidelines
5. **Document design system usage** for team onboarding

---

## Design Approved By

- Batch 1: ✅ Completed (commit 340dfd3)
- Batch 2: ✅ Completed (commit 44638ce)
- Batch 3: ✅ Plan Created (2025-11-12-batch-3-navigation-progress.md)
- Batch 4: 🔄 Ready for Implementation (This Document)

**Status:** Ready for subagent-driven development execution
