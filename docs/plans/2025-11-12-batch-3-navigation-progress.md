# Batch 3: Navigation & Progress Components Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add navigation and progress component patterns to design-system.html, documenting wizard progress tracking, action bars, snapshot summaries, and health indicators

**Architecture:** Extract patterns from React components (ProgressBar, BottomActionBar, SnapshotSummary, BriefHealthWidget), create HTML/CSS/JS examples. Document step-based navigation, completion tracking, health scoring, and fixed action bar patterns.

**Tech Stack:** HTML, Tailwind CSS, Vanilla JavaScript, SVG Icons

---

## Task 1: Add ProgressBar Component Section

**Files:**
- Read: `/Users/wallymo/BriefFlow-Playground-main/components/ProgressBar.tsx:15-60`
- Modify: `/Users/wallymo/BriefFlow-Playground-main/public/design-system.html` (add after Side Drawer, before Organisms section)

**Step 1: Review ProgressBar pattern from React component**

Key elements to extract:
- Grid layout with 6 equal columns (`grid grid-cols-6`)
- Tab-style step buttons with text color indicating state
- States: Active (text-primary), Completed (text-secondary, clickable), Disabled (opacity-60, not-allowed)
- Bottom progress bar (absolute positioning, h-[3px])
- Animated progress width based on completion percentage
- Keyboard navigation (Tab, Enter, Space)

**Step 2: Add ProgressBar section to design-system.html**

Insert after Side Drawer section (around line 1700), before Organisms section:

```html
<!-- Progress Bar Component -->
<div class="bg-white rounded-xl p-8 border border-gray-200 shadow-lg mb-8">
    <h3 class="text-2xl font-bold text-gray-900 mb-6">Progress Bar</h3>
    <p class="text-gray-600 mb-6">Step-based wizard navigation with visual progress tracking. Shows current step, completed steps, and overall progress percentage.</p>

    <!-- Interactive Demo -->
    <div class="mb-8">
        <p class="text-sm font-semibold text-gray-700 mb-3">Interactive Demo</p>
        <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div class="relative">
                <nav class="grid grid-cols-6 text-center" aria-label="Progress">
                    <button id="step-0" class="progress-step whitespace-nowrap py-4 px-1 font-medium text-sm transition-colors text-gray-900" aria-current="step" data-step="0">
                        Overview
                    </button>
                    <button id="step-1" class="progress-step whitespace-nowrap py-4 px-1 font-medium text-sm transition-colors text-gray-500 cursor-not-allowed opacity-60" data-step="1" disabled>
                        Objectives
                    </button>
                    <button id="step-2" class="progress-step whitespace-nowrap py-4 px-1 font-medium text-sm transition-colors text-gray-500 cursor-not-allowed opacity-60" data-step="2" disabled>
                        Audience
                    </button>
                    <button id="step-3" class="progress-step whitespace-nowrap py-4 px-1 font-medium text-sm transition-colors text-gray-500 cursor-not-allowed opacity-60" data-step="3" disabled>
                        Strategy
                    </button>
                    <button id="step-4" class="progress-step whitespace-nowrap py-4 px-1 font-medium text-sm transition-colors text-gray-500 cursor-not-allowed opacity-60" data-step="4" disabled>
                        Brand
                    </button>
                    <button id="step-5" class="progress-step whitespace-nowrap py-4 px-1 font-medium text-sm transition-colors text-gray-500 cursor-not-allowed opacity-60" data-step="5" disabled>
                        Review
                    </button>
                </nav>

                <div class="absolute bottom-0 left-0 w-full h-[3px]">
                    <div class="absolute w-full h-full bg-gray-200 rounded-full"></div>
                    <div id="progress-fill" class="absolute h-full bg-gray-900 rounded-full transition-all duration-500" style="width: 16.67%"></div>
                </div>
            </div>

            <div class="mt-6 flex justify-center gap-2">
                <button id="prev-step" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                    Previous
                </button>
                <button id="next-step" class="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
                    Next Step
                </button>
            </div>
        </div>
    </div>

    <!-- States Documentation -->
    <div class="mb-8">
        <p class="text-sm font-semibold text-gray-700 mb-3">Step States</p>
        <div class="grid grid-cols-3 gap-4">
            <div class="border border-gray-200 rounded-lg p-4">
                <p class="text-xs font-semibold text-gray-500 mb-2">Active</p>
                <div class="py-4 px-2 text-center">
                    <span class="font-medium text-sm text-gray-900">Current Step</span>
                </div>
                <code class="text-xs bg-gray-100 p-2 rounded block mt-2">text-primary</code>
            </div>
            <div class="border border-gray-200 rounded-lg p-4">
                <p class="text-xs font-semibold text-gray-500 mb-2">Completed</p>
                <div class="py-4 px-2 text-center cursor-pointer hover:text-gray-900">
                    <span class="font-medium text-sm text-gray-500">Past Step</span>
                </div>
                <code class="text-xs bg-gray-100 p-2 rounded block mt-2">text-secondary hover:text-primary</code>
            </div>
            <div class="border border-gray-200 rounded-lg p-4">
                <p class="text-xs font-semibold text-gray-500 mb-2">Disabled</p>
                <div class="py-4 px-2 text-center opacity-60">
                    <span class="font-medium text-sm text-gray-500">Future Step</span>
                </div>
                <code class="text-xs bg-gray-100 p-2 rounded block mt-2">opacity-60 cursor-not-allowed</code>
            </div>
        </div>
    </div>

    <!-- Key Features -->
    <div class="mb-8">
        <p class="text-sm font-semibold text-gray-700 mb-3">Key Features</p>
        <ul class="space-y-2 text-gray-600 list-disc list-inside">
            <li>6-column grid layout for equal step distribution</li>
            <li>Click to jump to completed steps</li>
            <li>Visual progress bar with animated width (duration-500)</li>
            <li>Progress calculated as (currentStep + 1) / totalSteps * 100</li>
            <li>Keyboard accessible with Tab navigation</li>
            <li>Aria-current attribute for active step</li>
        </ul>
    </div>
</div>
```

**Step 3: Verify ProgressBar section displays**

Check:
- Section appears after Side Drawer
- 6-column grid layout displays correctly
- Progress bar positioned at bottom
- State examples show visual differences

---

## Task 2: Add BottomActionBar Component Section

**Files:**
- Read: `/Users/wallymo/BriefFlow-Playground-main/components/BottomActionBar.tsx:38-71`
- Modify: `/Users/wallymo/BriefFlow-Playground-main/public/design-system.html` (add after ProgressBar)

**Step 1: Extract BottomActionBar pattern**

Key features:
- Sticky bottom positioning (`sticky bottom-0`)
- Backdrop blur with transparency (`bg-background/80 backdrop-blur-md`)
- Three-column layout (33% each): Health indicator (left), Autosave message (center), Actions (right)
- Conditional buttons: "Go Back" (if not first step), "Continue" or "Generate My Brief" (last step)
- Border-top for visual separation
- Z-index (z-10) for layering

**Step 2: Add BottomActionBar section**

```html
<!-- Bottom Action Bar Component -->
<div class="bg-white rounded-xl p-8 border border-gray-200 shadow-lg mb-8">
    <h3 class="text-2xl font-bold text-gray-900 mb-6">Bottom Action Bar</h3>
    <p class="text-gray-600 mb-6">Fixed bottom bar for wizard navigation. Shows health indicators, autosave status, and navigation buttons. Uses backdrop blur for modern glassmorphism effect.</p>

    <!-- Static Preview -->
    <div class="mb-8">
        <p class="text-sm font-semibold text-gray-700 mb-3">Static Preview</p>
        <div class="relative border border-gray-200 rounded-lg overflow-hidden bg-gray-50" style="height: 120px;">
            <footer class="absolute bottom-0 w-full bg-white/80 backdrop-blur-md border-t border-gray-200">
                <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <!-- Left: Health Indicator -->
                    <div class="w-1/3">
                        <div class="flex items-center gap-2 text-sm">
                            <div class="flex items-center gap-1">
                                <div class="w-2 h-2 rounded-full bg-green-500"></div>
                                <span class="text-gray-600">Clarity: <strong class="text-gray-900">85%</strong></span>
                            </div>
                        </div>
                    </div>

                    <!-- Center: Autosave Message -->
                    <div class="w-1/3 flex justify-center">
                        <p class="text-sm text-gray-900">Saved — clarity's catching up with you.</p>
                    </div>

                    <!-- Right: Actions -->
                    <div class="w-1/3 flex justify-end items-center gap-2">
                        <button class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                            Go Back
                        </button>
                        <button class="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-1">
                            Continue to Objectives
                            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    </div>

    <!-- Layout Breakdown -->
    <div class="mb-8">
        <p class="text-sm font-semibold text-gray-700 mb-3">Three-Column Layout</p>
        <div class="grid grid-cols-3 gap-4">
            <div class="border border-gray-200 rounded-lg p-4 text-center">
                <p class="text-xs font-semibold text-gray-700 mb-2">Left (33%)</p>
                <p class="text-xs text-gray-600">Health/Progress Indicators</p>
            </div>
            <div class="border border-gray-200 rounded-lg p-4 text-center">
                <p class="text-xs font-semibold text-gray-700 mb-2">Center (33%)</p>
                <p class="text-xs text-gray-600">Autosave Message (fade in/out)</p>
            </div>
            <div class="border border-gray-200 rounded-lg p-4 text-center">
                <p class="text-xs font-semibold text-gray-700 mb-2">Right (33%)</p>
                <p class="text-xs text-gray-600">Back + Primary Action Buttons</p>
            </div>
        </div>
    </div>

    <!-- Button Variants -->
    <div class="mb-8">
        <p class="text-sm font-semibold text-gray-700 mb-3">Primary Action Button Variants</p>
        <div class="space-y-2">
            <div class="flex items-center gap-3 p-3 bg-gray-50 rounded">
                <button class="px-4 py-2 bg-gray-900 text-white rounded-lg flex items-center gap-1">
                    Continue to [Step Name]
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
                <span class="text-xs text-gray-600">Steps 1-4</span>
            </div>
            <div class="flex items-center gap-3 p-3 bg-gray-50 rounded">
                <button class="px-4 py-2 bg-gray-900 text-white rounded-lg">
                    Review My Brief
                </button>
                <span class="text-xs text-gray-600">Step 5 (penultimate)</span>
            </div>
            <div class="flex items-center gap-3 p-3 bg-gray-50 rounded">
                <button class="px-4 py-2 bg-gray-900 text-white rounded-lg">
                    Generate My Brief
                </button>
                <span class="text-xs text-gray-600">Final step</span>
            </div>
        </div>
    </div>

    <!-- Key Features -->
    <div class="mb-8">
        <p class="text-sm font-semibold text-gray-700 mb-3">Key Features</p>
        <ul class="space-y-2 text-gray-600 list-disc list-inside">
            <li>Sticky bottom positioning with border-top</li>
            <li>Backdrop blur (backdrop-blur-md) with 80% opacity background</li>
            <li>Three-column layout (w-1/3 each) with flex justify-between</li>
            <li>Autosave message fades in/out (opacity transition)</li>
            <li>Conditional "Go Back" button (hidden on first step)</li>
            <li>Dynamic primary button text based on current step</li>
            <li>Z-index 10 to appear above page content</li>
        </ul>
    </div>
</div>
```

**Step 3: Verify BottomActionBar section**

Check:
- Static preview shows three-column layout
- Button variants documented clearly
- Backdrop blur visible in preview
- Layout breakdown diagram helpful

---

## Task 3: Add SnapshotSummary Component Section

**Files:**
- Read: `/Users/wallymo/BriefFlow-Playground-main/components/SnapshotSummary.tsx`
- Modify: `/Users/wallymo/BriefFlow-Playground-main/public/design-system.html` (add after BottomActionBar)

**Step 1: Extract SnapshotSummary pattern**

Key features:
- Compact sidebar widget showing brief overview
- Project type badge at top
- Key fields: Project name, budget, timeline, objectives
- Edit/Preview action buttons at bottom
- Gradient background and shadow for elevation
- Max-width constraint for sidebar placement

**Step 2: Add SnapshotSummary section**

```html
<!-- Snapshot Summary Component -->
<div class="bg-white rounded-xl p-8 border border-gray-200 shadow-lg mb-8">
    <h3 class="text-2xl font-bold text-gray-900 mb-6">Snapshot Summary</h3>
    <p class="text-gray-600 mb-6">Compact sidebar widget showing brief overview. Updates live as user fills wizard. Provides quick access to edit and preview actions.</p>

    <!-- Example -->
    <div class="mb-8">
        <p class="text-sm font-semibold text-gray-700 mb-3">Example Widget</p>
        <div class="max-w-sm mx-auto bg-gradient-to-b from-white to-gray-50 border border-gray-200 rounded-xl p-6 shadow-md">
            <!-- Project Type Badge -->
            <div class="mb-4">
                <span class="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    Website
                </span>
            </div>

            <!-- Key Fields -->
            <div class="space-y-4">
                <div>
                    <p class="text-xs text-gray-500 mb-1">Project Name</p>
                    <p class="text-sm font-semibold text-gray-900">E-commerce Redesign</p>
                </div>

                <div>
                    <p class="text-xs text-gray-500 mb-1">Primary Objective</p>
                    <p class="text-sm text-gray-700">Increase conversions by 25% through improved UX</p>
                </div>

                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <p class="text-xs text-gray-500 mb-1">Budget</p>
                        <p class="text-sm font-semibold text-gray-900">$50K-$100K</p>
                    </div>
                    <div>
                        <p class="text-xs text-gray-500 mb-1">Timeline</p>
                        <p class="text-sm font-semibold text-gray-900">8 weeks</p>
                    </div>
                </div>

                <div>
                    <p class="text-xs text-gray-500 mb-1">Target Audience</p>
                    <p class="text-sm text-gray-700">Tech-savvy professionals, 25-40</p>
                </div>
            </div>

            <!-- Actions -->
            <div class="mt-6 pt-4 border-t border-gray-200 flex gap-2">
                <button class="flex-1 px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-white transition-colors">
                    Edit
                </button>
                <button class="flex-1 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors">
                    Preview
                </button>
            </div>
        </div>
    </div>

    <!-- Field Structure -->
    <div class="mb-8">
        <p class="text-sm font-semibold text-gray-700 mb-3">Typical Fields</p>
        <div class="space-y-2 text-sm">
            <div class="flex items-start gap-2">
                <span class="font-semibold text-gray-700 min-w-[120px]">Project Type:</span>
                <span class="text-gray-600">Badge at top (Website, Campaign, Brand Identity, etc.)</span>
            </div>
            <div class="flex items-start gap-2">
                <span class="font-semibold text-gray-700 min-w-[120px]">Project Name:</span>
                <span class="text-gray-600">Brief title, shown prominently</span>
            </div>
            <div class="flex items-start gap-2">
                <span class="font-semibold text-gray-700 min-w-[120px]">Primary Objective:</span>
                <span class="text-gray-600">Main goal, truncated if long</span>
            </div>
            <div class="flex items-start gap-2">
                <span class="font-semibold text-gray-700 min-w-[120px]">Budget/Timeline:</span>
                <span class="text-gray-600">Side-by-side in 2-column grid</span>
            </div>
            <div class="flex items-start gap-2">
                <span class="font-semibold text-gray-700 min-w-[120px]">Target Audience:</span>
                <span class="text-gray-600">Demographic summary</span>
            </div>
        </div>
    </div>

    <!-- Key Features -->
    <div class="mb-8">
        <p class="text-sm font-semibold text-gray-700 mb-3">Key Features</p>
        <ul class="space-y-2 text-gray-600 list-disc list-inside">
            <li>Compact max-width (max-w-sm) for sidebar placement</li>
            <li>Gradient background (from-white to-gray-50) for depth</li>
            <li>Project type badge with colored background</li>
            <li>Key/value pairs with label/content styling</li>
            <li>Two-button action row (Edit + Preview)</li>
            <li>Border-top separator before actions</li>
            <li>Live updates as user fills wizard</li>
        </ul>
    </div>
</div>
```

**Step 3: Verify SnapshotSummary section**

Check:
- Example widget displays with gradient background
- Project type badge visible
- Fields organized clearly
- Action buttons at bottom
- Field structure table helpful

---

## Task 4: Add BriefHealthWidget Component Section

**Files:**
- Read: `/Users/wallymo/BriefFlow-Playground-main/components/BriefHealthWidget.tsx:50-62`
- Modify: `/Users/wallymo/BriefFlow-Playground-main/public/design-system.html` (add after SnapshotSummary)

**Step 1: Extract BriefHealthWidget pattern**

Key features:
- Two circular progress indicators (Clarity Score, Brand Match Score)
- Color-coded: Red (<40), Yellow (40-74), Green (75+)
- Score descriptors ("Needs focus", "Good start", "Very clear")
- Tooltip with info icon explaining AI scoring
- Sub-metrics with horizontal progress bars
- Gradient background for visual appeal

**Step 2: Add BriefHealthWidget section**

```html
<!-- Brief Health Widget Component -->
<div class="bg-white rounded-xl p-8 border border-gray-200 shadow-lg mb-8">
    <h3 class="text-2xl font-bold text-gray-900 mb-6">Brief Health Widget</h3>
    <p class="text-gray-600 mb-6">AI-powered health scoring with circular progress indicators. Shows clarity and brand alignment scores with color-coded feedback.</p>

    <!-- Example Widget -->
    <div class="mb-8">
        <p class="text-sm font-semibold text-gray-700 mb-3">Example Widget</p>
        <div class="max-w-md mx-auto bg-gradient-to-b from-white to-gray-50 border border-gray-200 rounded-xl p-6 shadow-md">
            <!-- Header with Tooltip -->
            <div class="flex justify-between items-start mb-4">
                <h3 class="text-lg font-bold text-gray-900">Brief Health</h3>
                <svg class="w-5 h-5 text-gray-500 cursor-help" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>

            <!-- Circular Progress Indicators -->
            <div class="grid grid-cols-2 gap-6 mb-6">
                <!-- Clarity Score -->
                <div class="text-center">
                    <div class="relative w-24 h-24 mx-auto mb-2">
                        <svg class="w-24 h-24 transform -rotate-90">
                            <circle cx="48" cy="48" r="40" stroke="#e5e7eb" stroke-width="8" fill="none"/>
                            <circle cx="48" cy="48" r="40" stroke="#10b981" stroke-width="8" fill="none"
                                stroke-dasharray="251.2" stroke-dashoffset="62.8" stroke-linecap="round"/>
                        </svg>
                        <div class="absolute inset-0 flex items-center justify-center">
                            <span class="text-2xl font-bold text-gray-900">85</span>
                        </div>
                    </div>
                    <p class="text-sm font-semibold text-gray-900">Clarity Score</p>
                    <p class="text-xs text-gray-500">Very clear</p>
                </div>

                <!-- Brand Match Score -->
                <div class="text-center">
                    <div class="relative w-24 h-24 mx-auto mb-2">
                        <svg class="w-24 h-24 transform -rotate-90">
                            <circle cx="48" cy="48" r="40" stroke="#e5e7eb" stroke-width="8" fill="none"/>
                            <circle cx="48" cy="48" r="40" stroke="#f59e0b" stroke-width="8" fill="none"
                                stroke-dasharray="251.2" stroke-dashoffset="100.48" stroke-linecap="round"/>
                        </svg>
                        <div class="absolute inset-0 flex items-center justify-center">
                            <span class="text-2xl font-bold text-gray-900">60</span>
                        </div>
                    </div>
                    <p class="text-sm font-semibold text-gray-900">Brand Match</p>
                    <p class="text-xs text-gray-500">Good alignment</p>
                </div>
            </div>

            <!-- Sub-Metrics -->
            <div class="space-y-3 pt-4 border-t border-gray-200">
                <div>
                    <div class="flex justify-between items-center mb-1">
                        <p class="text-xs text-gray-600">Specificity</p>
                        <p class="text-xs font-semibold text-gray-900">80</p>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-1">
                        <div class="h-1 rounded-full bg-green-500 transition-all duration-500" style="width: 80%"></div>
                    </div>
                </div>
                <div>
                    <div class="flex justify-between items-center mb-1">
                        <p class="text-xs text-gray-600">Measurability</p>
                        <p class="text-xs font-semibold text-gray-900">90</p>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-1">
                        <div class="h-1 rounded-full bg-green-500 transition-all duration-500" style="width: 90%"></div>
                    </div>
                </div>
                <div>
                    <div class="flex justify-between items-center mb-1">
                        <p class="text-xs text-gray-600">Audience Clarity</p>
                        <p class="text-xs font-semibold text-gray-900">70</p>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-1">
                        <div class="h-1 rounded-full bg-yellow-500 transition-all duration-500" style="width: 70%"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Score Color Coding -->
    <div class="mb-8">
        <p class="text-sm font-semibold text-gray-700 mb-3">Score Ranges & Colors</p>
        <div class="grid grid-cols-3 gap-4">
            <div class="border border-red-200 bg-red-50 rounded-lg p-4 text-center">
                <div class="w-16 h-16 mx-auto mb-2 rounded-full bg-red-500 flex items-center justify-center">
                    <span class="text-white font-bold text-xl">35</span>
                </div>
                <p class="text-xs font-semibold text-gray-700">0-39: Needs Focus</p>
                <p class="text-xs text-gray-600 mt-1">Red (#ef4444)</p>
            </div>
            <div class="border border-yellow-200 bg-yellow-50 rounded-lg p-4 text-center">
                <div class="w-16 h-16 mx-auto mb-2 rounded-full bg-yellow-500 flex items-center justify-center">
                    <span class="text-white font-bold text-xl">60</span>
                </div>
                <p class="text-xs font-semibold text-gray-700">40-74: Good Start</p>
                <p class="text-xs text-gray-600 mt-1">Yellow (#f59e0b)</p>
            </div>
            <div class="border border-green-200 bg-green-50 rounded-lg p-4 text-center">
                <div class="w-16 h-16 mx-auto mb-2 rounded-full bg-green-500 flex items-center justify-center">
                    <span class="text-white font-bold text-xl">85</span>
                </div>
                <p class="text-xs font-semibold text-gray-700">75-100: Very Clear</p>
                <p class="text-xs text-gray-600 mt-1">Green (#10b981)</p>
            </div>
        </div>
    </div>

    <!-- Key Features -->
    <div class="mb-8">
        <p class="text-sm font-semibold text-gray-700 mb-3">Key Features</p>
        <ul class="space-y-2 text-gray-600 list-disc list-inside">
            <li>Circular SVG progress indicators (circumference: 251.2, radius: 40)</li>
            <li>Stroke-dashoffset calculation: 251.2 * (1 - score/100)</li>
            <li>Color-coded by score range (red/yellow/green)</li>
            <li>Score descriptors below each indicator</li>
            <li>Info icon with tooltip explaining AI scoring</li>
            <li>Sub-metrics with horizontal progress bars</li>
            <li>Gradient background for visual depth</li>
        </ul>
    </div>
</div>
```

**Step 3: Verify BriefHealthWidget section**

Check:
- Circular progress indicators display correctly
- Score color coding documented
- Sub-metrics with horizontal bars
- Score ranges clearly explained

---

## Task 5: Add Interactive JavaScript for Navigation Components

**Files:**
- Modify: `/Users/wallymo/BriefFlow-Playground-main/public/design-system.html` (add to script section)

**Step 1: Add ProgressBar JavaScript**

Add before closing `</script>` tag:

```javascript
// ProgressBar Navigation Demo
let currentStep = 0;
const totalSteps = 6;
const progressSteps = document.querySelectorAll('.progress-step');
const progressFill = document.getElementById('progress-fill');
const prevBtn = document.getElementById('prev-step');
const nextBtn = document.getElementById('next-step');

function updateProgressBar() {
    const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

    // Update progress fill
    if (progressFill) {
        progressFill.style.width = `${progressPercentage}%`;
    }

    // Update step states
    progressSteps.forEach((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        const isEnabled = isCompleted || isActive;

        // Reset classes
        step.classList.remove('text-gray-900', 'text-gray-500', 'hover:text-gray-900', 'cursor-pointer', 'cursor-not-allowed', 'opacity-60');

        if (isActive) {
            step.classList.add('text-gray-900');
            step.setAttribute('aria-current', 'step');
            step.disabled = false;
        } else if (isCompleted) {
            step.classList.add('text-gray-500', 'hover:text-gray-900', 'cursor-pointer');
            step.removeAttribute('aria-current');
            step.disabled = false;
        } else {
            step.classList.add('text-gray-500', 'cursor-not-allowed', 'opacity-60');
            step.removeAttribute('aria-current');
            step.disabled = true;
        }
    });

    // Update button states
    if (prevBtn) {
        prevBtn.disabled = currentStep === 0;
    }
    if (nextBtn) {
        nextBtn.textContent = currentStep === totalSteps - 1 ? 'Complete' : 'Next Step';
        nextBtn.disabled = currentStep === totalSteps - 1;
    }
}

// Step button click handlers
progressSteps.forEach((step, index) => {
    step.addEventListener('click', () => {
        const isEnabled = index <= currentStep;
        if (isEnabled) {
            currentStep = index;
            updateProgressBar();
        }
    });
});

// Navigation button handlers
if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            updateProgressBar();
        }
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        if (currentStep < totalSteps - 1) {
            currentStep++;
            updateProgressBar();
        }
    });
}

// Initialize
updateProgressBar();
```

**Step 2: Test ProgressBar interactivity**

Verify:
- Clicking Next Step advances progress
- Clicking Previous Step goes back
- Can click completed steps to jump back
- Cannot click disabled future steps
- Progress bar animates width correctly

---

## Task 6: Test All Navigation Components

**Files:**
- Test: `/Users/wallymo/BriefFlow-Playground-main/public/design-system.html`

**Step 1: Visual inspection**

Verify:
1. ProgressBar section displays with 6-column grid
2. BottomActionBar section shows three-column layout
3. SnapshotSummary example widget renders
4. BriefHealthWidget shows circular indicators

**Step 2: Interactive testing**

Test ProgressBar:
1. Next/Previous buttons work
2. Can click completed steps
3. Cannot click disabled steps
4. Progress bar width animates
5. Button states update correctly

**Step 3: Responsive check**

Test at different widths:
- Mobile: Components stack or adjust appropriately
- Tablet: Three-column layouts maintain
- Desktop: All components display correctly

**Step 4: Accessibility check**

Verify:
- Tab navigation works for ProgressBar
- Aria-current attribute on active step
- Button disabled states work
- Focus indicators visible

---

## Task 7: Commit Changes

**Files:**
- Modified: `/Users/wallymo/BriefFlow-Playground-main/public/design-system.html`

**Step 1: Check git status and stage changes**

Run: `git add public/design-system.html`

**Step 2: Create commit**

```bash
git commit -m "$(cat <<'EOF'
feat: add batch 3 - navigation and progress components

- Add ProgressBar Component
  - 6-column grid layout for wizard steps
  - Active, completed, and disabled states
  - Bottom progress bar with animated width
  - Interactive demo with next/previous navigation
  - Click to jump to completed steps
  - Aria-current for active step

- Add BottomActionBar Component
  - Sticky bottom positioning with backdrop blur
  - Three-column layout (health, autosave, actions)
  - Conditional "Go Back" button
  - Dynamic primary button text per step
  - Glassmorphism effect with bg/80 opacity

- Add SnapshotSummary Component
  - Compact sidebar widget for brief overview
  - Project type badge with colored background
  - Key fields (name, objective, budget, timeline)
  - Edit/Preview action buttons
  - Gradient background for depth

- Add BriefHealthWidget Component
  - Circular SVG progress indicators
  - Clarity Score and Brand Match Score
  - Color-coded ranges (red/yellow/green)
  - Score descriptors per range
  - Sub-metrics with horizontal bars
  - Tooltip with info icon

- Interactive JavaScript
  - ProgressBar navigation with state management
  - Step click handlers for completed steps
  - Next/Previous button handlers
  - Progress percentage calculation
  - Button state updates

All components extracted from BriefFlow React components:
- ProgressBar.tsx
- BottomActionBar.tsx
- SnapshotSummary.tsx
- BriefHealthWidget.tsx

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

**Step 3: Verify commit**

Run: `git log -1 --oneline`

Expected: Shows commit starting with "feat: add batch 3"

---

## Summary

Batch 3 adds navigation and progress tracking components:

**Components Added:**
- ProgressBar (6-step wizard navigation)
- BottomActionBar (fixed bottom with backdrop blur)
- SnapshotSummary (sidebar brief overview)
- BriefHealthWidget (AI-powered health scores)

**Features:**
- Interactive step navigation with state management
- Circular progress indicators with SVG
- Color-coded health scoring
- Three-column action bar layout
- Gradient backgrounds and glassmorphism

**Next Steps:**
After Batch 3, proceed to Batch 4: Specialized Components
