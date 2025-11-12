# Batch 1: Selection Cards & Icon Library Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add Selection Cards with Icons component pattern and complete Icon Library (31 icons) to design-system.html

**Architecture:** Extract the selection card pattern from StepOverview.tsx (lines 32-48) and document all icon components from /components/icons/ directory. Create interactive HTML examples with JavaScript for state management. Organize icons by category for easy discovery.

**Tech Stack:** HTML, Tailwind CSS, Vanilla JavaScript, SVG

---

## Task 1: Add Selection Cards Component Section

**Files:**
- Read: `/Users/wallymo/BriefFlow-Playground-main/components/steps/StepOverview.tsx:32-48`
- Modify: `/Users/wallymo/BriefFlow-Playground-main/design-system.html` (add new section in Molecules area after Chip Selector)

**Step 1: Read the selection card pattern from StepOverview.tsx**

Review lines 32-48 to understand:
- Grid layout (2/3/4 columns responsive)
- Card structure (icon + text, centered, h-32)
- States: default, hover (-translate-y-0.5), selected (border-primary + ring), focus
- Tooltip integration with 2s delay

**Step 2: Add Selection Cards section to design-system.html**

Insert after Chip Selector section (around line 850), add:

```html
<!-- Selection Cards -->
<div class="bg-white rounded-xl p-8 border border-gray-200 shadow-lg mb-8">
    <h3 class="text-2xl font-bold text-gray-900 mb-6">Selection Cards</h3>

    <!-- Basic Selection Cards -->
    <div class="mb-8">
        <p class="text-sm font-semibold text-gray-700 mb-3">Project Type Selector Pattern</p>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3" id="selection-cards-demo">
            <!-- Website Card - Default State -->
            <button class="selection-card group w-full flex flex-col items-center justify-center text-center p-3 h-32 bg-white border border-gray-200 rounded-xl transition-all duration-200 shadow-sm cursor-pointer hover:-translate-y-0.5 hover:shadow-md hover:border-gray-900 hover:ring-2 hover:ring-gray-900/30 focus:outline-none focus:ring-2 focus:ring-gray-900/50" data-value="website">
                <svg class="w-8 h-8 mb-2 text-gray-900" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                </svg>
                <span class="text-sm font-semibold text-gray-900 px-1 h-11 flex items-center justify-center">Website</span>
            </button>

            <!-- Campaign Card -->
            <button class="selection-card group w-full flex flex-col items-center justify-center text-center p-3 h-32 bg-white border border-gray-200 rounded-xl transition-all duration-200 shadow-sm cursor-pointer hover:-translate-y-0.5 hover:shadow-md hover:border-gray-900 hover:ring-2 hover:ring-gray-900/30 focus:outline-none focus:ring-2 focus:ring-gray-900/50" data-value="campaign">
                <svg class="w-8 h-8 mb-2 text-gray-900" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span class="text-sm font-semibold text-gray-900 px-1 h-11 flex items-center justify-center">Campaign</span>
            </button>

            <!-- Brand Identity Card -->
            <button class="selection-card group w-full flex flex-col items-center justify-center text-center p-3 h-32 bg-white border border-gray-200 rounded-xl transition-all duration-200 shadow-sm cursor-pointer hover:-translate-y-0.5 hover:shadow-md hover:border-gray-900 hover:ring-2 hover:ring-gray-900/30 focus:outline-none focus:ring-2 focus:ring-gray-900/50" data-value="brand">
                <svg class="w-8 h-8 mb-2 text-gray-900" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                </svg>
                <span class="text-sm font-semibold text-gray-900 px-1 h-11 flex items-center justify-center">Brand Identity</span>
            </button>

            <!-- Print Design Card -->
            <button class="selection-card group w-full flex flex-col items-center justify-center text-center p-3 h-32 bg-white border border-gray-200 rounded-xl transition-all duration-200 shadow-sm cursor-pointer hover:-translate-y-0.5 hover:shadow-md hover:border-gray-900 hover:ring-2 hover:ring-gray-900/30 focus:outline-none focus:ring-2 focus:ring-gray-900/50" data-value="print">
                <svg class="w-8 h-8 mb-2 text-gray-900" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                </svg>
                <span class="text-sm font-semibold text-gray-900 px-1 h-11 flex items-center justify-center">Print Design</span>
            </button>
        </div>
    </div>

    <!-- Selection Card States -->
    <div class="mb-8">
        <p class="text-sm font-semibold text-gray-700 mb-3">States</p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <!-- Default State -->
            <div>
                <p class="text-xs text-gray-500 mb-2">Default</p>
                <button class="w-full flex flex-col items-center justify-center text-center p-3 h-32 bg-white border border-gray-200 rounded-xl shadow-sm">
                    <svg class="w-8 h-8 mb-2 text-gray-900" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span class="text-sm font-semibold text-gray-900">Default</span>
                </button>
            </div>

            <!-- Hover State -->
            <div>
                <p class="text-xs text-gray-500 mb-2">Hover</p>
                <button class="w-full flex flex-col items-center justify-center text-center p-3 h-32 bg-white border border-gray-900 rounded-xl shadow-md -translate-y-0.5 ring-2 ring-gray-900/30">
                    <svg class="w-8 h-8 mb-2 text-gray-900" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span class="text-sm font-semibold text-gray-900">Hover</span>
                </button>
            </div>

            <!-- Selected State -->
            <div>
                <p class="text-xs text-gray-500 mb-2">Selected</p>
                <button class="w-full flex flex-col items-center justify-center text-center p-3 h-32 bg-white border-2 border-gray-900 rounded-xl shadow-sm ring-2 ring-gray-900/30">
                    <svg class="w-8 h-8 mb-2 text-gray-900" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span class="text-sm font-semibold text-gray-900">Selected</span>
                </button>
            </div>

            <!-- Focus State -->
            <div>
                <p class="text-xs text-gray-500 mb-2">Focus</p>
                <button class="w-full flex flex-col items-center justify-center text-center p-3 h-32 bg-white border border-gray-200 rounded-xl shadow-sm ring-2 ring-gray-900/50">
                    <svg class="w-8 h-8 mb-2 text-gray-900" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span class="text-sm font-semibold text-gray-900">Focus</span>
                </button>
            </div>
        </div>
    </div>
</div>
```

**Step 3: Verify the selection cards section displays**

Open design-system.html in browser and check:
- Cards display in responsive grid (2/3/4 columns)
- All 4 project type cards visible
- State examples show visual differences
- Proper spacing and alignment

---

## Task 2: Add Icon Library Section

**Files:**
- Read all: `/Users/wallymo/BriefFlow-Playground-main/components/icons/*.tsx`
- Modify: `/Users/wallymo/BriefFlow-Playground-main/design-system.html` (add after Selection Cards)

**Step 1: Extract SVG paths from all 31 icon components**

Read each icon file and extract the SVG path data. Icons to document:
- UI/Navigation: InfoIcon, CheckIcon, CheckCircleIcon, ChevronDownIcon, ChevronRightIcon, ArrowUpIcon, EditIcon, EyeIcon
- Alert/Status: AlertCircleIcon, AlertTriangleIcon, WarningTriangleIcon, SparklesIcon
- File/Document: FileIcon, ClipboardIcon, DownloadIcon, PrintIcon
- Communication: EmailIcon, MessageSquareIcon, TagIcon
- Social Media: SocialIcon
- Project Management: AsanaIcon, MondayIcon, ProductiveIcon
- Domain-Specific: AudienceIcon, BrandingIcon, GoalsIcon, StrategyIcon, ToneIcon, WebsiteIcon, VideoIcon, CustomIcon

**Step 2: Create Icon Library section**

Add after Selection Cards section:

```html
<!-- Icon Library -->
<div class="bg-white rounded-xl p-8 border border-gray-200 shadow-lg mb-8">
    <h3 class="text-2xl font-bold text-gray-900 mb-6">Icon Library</h3>
    <p class="text-gray-600 mb-8">Complete collection of SVG icons used throughout BriefFlow. All icons use `currentColor` for easy theming.</p>

    <!-- UI/Navigation Icons -->
    <div class="mb-12">
        <h4 class="text-lg font-semibold text-gray-900 mb-4">UI & Navigation Icons</h4>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <!-- InfoIcon -->
            <div class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gray-900 transition-colors">
                <svg class="w-8 h-8 text-gray-900 mb-2" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-xs font-medium text-gray-700">InfoIcon</span>
            </div>

            <!-- CheckIcon -->
            <div class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gray-900 transition-colors">
                <svg class="w-8 h-8 text-gray-900 mb-2" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-xs font-medium text-gray-700">CheckIcon</span>
            </div>

            <!-- CheckCircleIcon -->
            <div class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gray-900 transition-colors">
                <svg class="w-8 h-8 text-gray-900 mb-2" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-xs font-medium text-gray-700">CheckCircleIcon</span>
            </div>

            <!-- ChevronDownIcon -->
            <div class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gray-900 transition-colors">
                <svg class="w-8 h-8 text-gray-900 mb-2" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
                <span class="text-xs font-medium text-gray-700">ChevronDownIcon</span>
            </div>

            <!-- ChevronRightIcon -->
            <div class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gray-900 transition-colors">
                <svg class="w-8 h-8 text-gray-900 mb-2" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                <span class="text-xs font-medium text-gray-700">ChevronRightIcon</span>
            </div>

            <!-- ArrowUpIcon -->
            <div class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gray-900 transition-colors">
                <svg class="w-8 h-8 text-gray-900 mb-2" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 19V5m0 0l-7 7m7-7l7 7" />
                </svg>
                <span class="text-xs font-medium text-gray-700">ArrowUpIcon</span>
            </div>

            <!-- EditIcon -->
            <div class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gray-900 transition-colors">
                <svg class="w-8 h-8 text-gray-900 mb-2" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
                <span class="text-xs font-medium text-gray-700">EditIcon</span>
            </div>

            <!-- EyeIcon -->
            <div class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gray-900 transition-colors">
                <svg class="w-8 h-8 text-gray-900 mb-2" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span class="text-xs font-medium text-gray-700">EyeIcon</span>
            </div>
        </div>
    </div>

    <!-- Alert/Status Icons -->
    <div class="mb-12">
        <h4 class="text-lg font-semibold text-gray-900 mb-4">Alert & Status Icons</h4>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <!-- AlertCircleIcon -->
            <div class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gray-900 transition-colors">
                <svg class="w-8 h-8 text-gray-900 mb-2" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                <span class="text-xs font-medium text-gray-700">AlertCircleIcon</span>
            </div>

            <!-- AlertTriangleIcon -->
            <div class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gray-900 transition-colors">
                <svg class="w-8 h-8 text-gray-900 mb-2" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <span class="text-xs font-medium text-gray-700">AlertTriangleIcon</span>
            </div>

            <!-- WarningTriangleIcon -->
            <div class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gray-900 transition-colors">
                <svg class="w-8 h-8 text-gray-900 mb-2" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <span class="text-xs font-medium text-gray-700">WarningTriangleIcon</span>
            </div>

            <!-- SparklesIcon -->
            <div class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gray-900 transition-colors">
                <svg class="w-8 h-8 text-gray-900 mb-2" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
                <span class="text-xs font-medium text-gray-700">SparklesIcon</span>
            </div>
        </div>
    </div>

    <!-- File/Document Icons -->
    <div class="mb-12">
        <h4 class="text-lg font-semibold text-gray-900 mb-4">File & Document Icons</h4>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <!-- FileIcon -->
            <div class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gray-900 transition-colors">
                <svg class="w-8 h-8 text-gray-900 mb-2" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                <span class="text-xs font-medium text-gray-700">FileIcon</span>
            </div>

            <!-- ClipboardIcon -->
            <div class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gray-900 transition-colors">
                <svg class="w-8 h-8 text-gray-900 mb-2" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                </svg>
                <span class="text-xs font-medium text-gray-700">ClipboardIcon</span>
            </div>

            <!-- DownloadIcon -->
            <div class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gray-900 transition-colors">
                <svg class="w-8 h-8 text-gray-900 mb-2" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                <span class="text-xs font-medium text-gray-700">DownloadIcon</span>
            </div>

            <!-- PrintIcon -->
            <div class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gray-900 transition-colors">
                <svg class="w-8 h-8 text-gray-900 mb-2" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                </svg>
                <span class="text-xs font-medium text-gray-700">PrintIcon</span>
            </div>
        </div>
    </div>

    <!-- Communication Icons -->
    <div class="mb-12">
        <h4 class="text-lg font-semibold text-gray-900 mb-4">Communication Icons</h4>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <!-- EmailIcon -->
            <div class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gray-900 transition-colors">
                <svg class="w-8 h-8 text-gray-900 mb-2" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span class="text-xs font-medium text-gray-700">EmailIcon</span>
            </div>

            <!-- MessageSquareIcon -->
            <div class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gray-900 transition-colors">
                <svg class="w-8 h-8 text-gray-900 mb-2" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                </svg>
                <span class="text-xs font-medium text-gray-700">MessageSquareIcon</span>
            </div>

            <!-- TagIcon -->
            <div class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gray-900 transition-colors">
                <svg class="w-8 h-8 text-gray-900 mb-2" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" />
                </svg>
                <span class="text-xs font-medium text-gray-700">TagIcon</span>
            </div>
        </div>
    </div>

    <!-- Domain-Specific Icons -->
    <div class="mb-12">
        <h4 class="text-lg font-semibold text-gray-900 mb-4">Domain-Specific Icons</h4>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <!-- AudienceIcon -->
            <div class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gray-900 transition-colors">
                <svg class="w-8 h-8 text-gray-900 mb-2" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
                <span class="text-xs font-medium text-gray-700">AudienceIcon</span>
            </div>

            <!-- BrandingIcon -->
            <div class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gray-900 transition-colors">
                <svg class="w-8 h-8 text-gray-900 mb-2" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                </svg>
                <span class="text-xs font-medium text-gray-700">BrandingIcon</span>
            </div>

            <!-- GoalsIcon -->
            <div class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gray-900 transition-colors">
                <svg class="w-8 h-8 text-gray-900 mb-2" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
                <span class="text-xs font-medium text-gray-700">GoalsIcon</span>
            </div>

            <!-- StrategyIcon -->
            <div class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gray-900 transition-colors">
                <svg class="w-8 h-8 text-gray-900 mb-2" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                </svg>
                <span class="text-xs font-medium text-gray-700">StrategyIcon</span>
            </div>

            <!-- ToneIcon -->
            <div class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gray-900 transition-colors">
                <svg class="w-8 h-8 text-gray-900 mb-2" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
                <span class="text-xs font-medium text-gray-700">ToneIcon</span>
            </div>

            <!-- WebsiteIcon -->
            <div class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gray-900 transition-colors">
                <svg class="w-8 h-8 text-gray-900 mb-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                </svg>
                <span class="text-xs font-medium text-gray-700">WebsiteIcon</span>
            </div>

            <!-- VideoIcon -->
            <div class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gray-900 transition-colors">
                <svg class="w-8 h-8 text-gray-900 mb-2" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                </svg>
                <span class="text-xs font-medium text-gray-700">VideoIcon</span>
            </div>

            <!-- CustomIcon -->
            <div class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gray-900 transition-colors">
                <svg class="w-8 h-8 text-gray-900 mb-2" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                </svg>
                <span class="text-xs font-medium text-gray-700">CustomIcon</span>
            </div>
        </div>
    </div>

    <!-- Project Management Icons -->
    <div class="mb-12">
        <h4 class="text-lg font-semibold text-gray-900 mb-4">Project Management Icons</h4>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <!-- AsanaIcon -->
            <div class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gray-900 transition-colors">
                <svg class="w-8 h-8 text-gray-900 mb-2" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="5" r="3.5" />
                    <circle cx="6" cy="15" r="3.5" />
                    <circle cx="18" cy="15" r="3.5" />
                </svg>
                <span class="text-xs font-medium text-gray-700">AsanaIcon</span>
            </div>

            <!-- MondayIcon -->
            <div class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gray-900 transition-colors">
                <svg class="w-8 h-8 text-gray-900 mb-2" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="12" cy="12" r="3" />
                    <circle cx="18" cy="12" r="3" />
                </svg>
                <span class="text-xs font-medium text-gray-700">MondayIcon</span>
            </div>

            <!-- ProductiveIcon -->
            <div class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gray-900 transition-colors">
                <svg class="w-8 h-8 text-gray-900 mb-2" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
                <span class="text-xs font-medium text-gray-700">ProductiveIcon</span>
            </div>
        </div>
    </div>

    <!-- Social Media Icon -->
    <div class="mb-8">
        <h4 class="text-lg font-semibold text-gray-900 mb-4">Social Media Icon</h4>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <!-- SocialIcon -->
            <div class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gray-900 transition-colors">
                <svg class="w-8 h-8 text-gray-900 mb-2" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                </svg>
                <span class="text-xs font-medium text-gray-700">SocialIcon</span>
            </div>
        </div>
    </div>
</div>
```

**Step 3: Verify icon library displays**

Open design-system.html and check:
- All 31 icons visible and organized by category
- Icons display at correct size (w-8 h-8)
- Hover states work on icon containers
- Icon names display correctly
- Grid layout is responsive

---

## Task 3: Add JavaScript for Selection Card Interactivity

**Files:**
- Modify: `/Users/wallymo/BriefFlow-Playground-main/design-system.html` (add to existing `<script>` section)

**Step 1: Add selection card click handling**

Add to the JavaScript section (before closing `</script>` tag):

```javascript
// Selection Card Interactive Demo
const selectionCards = document.querySelectorAll('.selection-card');

selectionCards.forEach(card => {
    card.addEventListener('click', function() {
        // Remove selected state from all cards
        selectionCards.forEach(c => {
            c.classList.remove('border-2', 'border-gray-900', 'ring-2', 'ring-gray-900/30');
            c.classList.add('border', 'border-gray-200');
        });

        // Add selected state to clicked card
        this.classList.remove('border', 'border-gray-200');
        this.classList.add('border-2', 'border-gray-900', 'ring-2', 'ring-gray-900/30');

        console.log('Selected:', this.dataset.value);
    });
});
```

**Step 2: Test selection card interactivity**

Open design-system.html in browser and verify:
- Clicking a card selects it (bold border + ring)
- Only one card can be selected at a time
- Console logs the selected value
- Visual feedback is immediate

---

## Task 4: Test All Components

**Files:**
- Test: `/Users/wallymo/BriefFlow-Playground-main/design-system.html`

**Step 1: Visual inspection**

Open design-system.html and verify:
1. Selection Cards section displays after Chip Selector
2. Icon Library section displays after Selection Cards
3. All 31 icons visible in organized categories
4. Responsive grids work at different screen sizes
5. No layout issues or overlap

**Step 2: Interactive testing**

Test the following:
1. Click different selection cards - only one selected at a time
2. Hover over selection cards - lift effect and shadow increase
3. Hover over icon containers - border changes to gray-900
4. Keyboard navigation works (Tab to focus cards)
5. No console errors

**Step 3: Accessibility check**

Verify:
- Selection cards are keyboard accessible
- Focus states are visible
- All icons have proper viewBox
- Icon names are legible

**Step 4: Document any issues**

If issues found, note them for fixing before commit.

---

## Task 5: Commit Changes

**Files:**
- Modified: `/Users/wallymo/BriefFlow-Playground-main/design-system.html`

**Step 1: Check git status**

Run: `git status`

Expected: Shows modified design-system.html

**Step 2: Stage changes**

Run: `git add design-system.html`

**Step 3: Create commit**

Run:
```bash
git commit -m "$(cat <<'EOF'
feat: add batch 1 - selection cards and icon library

- Add Selection Cards component pattern from StepOverview.tsx
  - Interactive grid layout (2/3/4 cols responsive)
  - Hover lift effect (-translate-y-0.5)
  - Selected state with border and ring
  - Four state examples (default, hover, selected, focus)
  - JavaScript for single-select behavior

- Add complete Icon Library (31 icons organized by category)
  - UI/Navigation icons (8)
  - Alert/Status icons (4)
  - File/Document icons (4)
  - Communication icons (3)
  - Domain-Specific icons (8)
  - Project Management icons (3)
  - Social Media icon (1)
  - All icons extracted from /components/icons/
  - Grid display with hover states
  - Copy-friendly SVG code

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

**Step 4: Verify commit succeeded**

Run: `git log -1 --oneline`

Expected: Shows the new commit with message starting with "feat: add batch 1"

---

## Summary

This plan adds Batch 1 components to the design system:

**Components Added:**
- Selection Cards with Icons (interactive project type selector pattern)
- Complete Icon Library (31 icons in 7 categories)

**Features:**
- Responsive grid layouts
- Interactive selection behavior (JavaScript)
- Hover and focus states
- All icons organized by purpose
- Ready for developer reference

**Next Steps:**
After this batch is complete, proceed to:
- Batch 2: Modal & Overlay Components
- Batch 3: Navigation & Progress
- Batch 4: Specialized Components
