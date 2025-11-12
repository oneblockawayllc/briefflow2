# Batch 2: Modal & Overlay Components Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add modal and overlay component patterns to design-system.html, documenting all modal variants used in BriefFlow wizard

**Architecture:** Extract modal patterns from React components (AiDraftModal, ChangeTypeConfirmationModal, SideDrawer), create HTML/CSS/JS examples with interactive demos. Document base modal structure, then show 4 key variants with working toggle buttons.

**Tech Stack:** HTML, Tailwind CSS, Vanilla JavaScript, SVG Icons

---

## Task 1: Add Base Modal Structure Section

**Files:**
- Read: `/Users/wallymo/BriefFlow-Playground-main/components/AiDraftModal.tsx:12-27`
- Modify: `/Users/wallymo/BriefFlow-Playground-main/public/design-system.html` (add after Icon Library, before Organisms section)

**Step 1: Review base modal pattern from AiDraftModal**

Key elements to extract:
- Fixed overlay: `fixed inset-0 bg-black/50 backdrop-blur-sm z-50`
- Centered flex container: `flex items-center justify-center`
- Modal container: `bg-white rounded-xl shadow-lg max-w-2xl border border-gray-200`
- Click outside to close (overlay onClick)
- Stop propagation on modal (e.stopPropagation())
- Close button with X icon (top-right)

**Step 2: Add Base Modal section to design-system.html**

Insert after Icon Library section (around line 1390), before Organisms section:

```html
<!-- Base Modal Structure -->
<div class="bg-white rounded-xl p-8 border border-gray-200 shadow-lg mb-8">
    <h3 class="text-2xl font-bold text-gray-900 mb-6">Base Modal Structure</h3>
    <p class="text-gray-600 mb-6">Foundation pattern for all modal dialogs. Features fixed overlay, centered container, and keyboard/click interactions.</p>

    <!-- Demo Button -->
    <div class="mb-8">
        <button id="base-modal-trigger" class="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
            Open Base Modal
        </button>
    </div>

    <!-- Modal Anatomy Diagram -->
    <div class="mb-8">
        <p class="text-sm font-semibold text-gray-700 mb-3">Modal Anatomy</p>
        <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div class="space-y-2 text-sm text-gray-600">
                <p><span class="font-semibold text-gray-900">1. Overlay:</span> <code class="bg-gray-200 px-2 py-1 rounded text-xs">fixed inset-0 bg-black/50 backdrop-blur-sm</code></p>
                <p><span class="font-semibold text-gray-900">2. Container:</span> <code class="bg-gray-200 px-2 py-1 rounded text-xs">max-w-2xl bg-white rounded-xl shadow-lg</code></p>
                <p><span class="font-semibold text-gray-900">3. Header:</span> Title + Close button (border-bottom)</p>
                <p><span class="font-semibold text-gray-900">4. Content:</span> Scrollable area with <code class="bg-gray-200 px-2 py-1 rounded text-xs">overflow-y-auto</code></p>
                <p><span class="font-semibold text-gray-900">5. Footer:</span> Action buttons (border-top)</p>
            </div>
        </div>
    </div>

    <!-- Key Features -->
    <div class="mb-8">
        <p class="text-sm font-semibold text-gray-700 mb-3">Key Features</p>
        <ul class="space-y-2 text-gray-600 list-disc list-inside">
            <li>Click outside to close (overlay click handler)</li>
            <li>ESC key to close (keyboard accessibility)</li>
            <li>Backdrop blur effect for visual focus</li>
            <li>Max-height with scrollable content (90vh)</li>
            <li>Z-index layering (z-50 for modals)</li>
            <li>Click event propagation stopped on modal content</li>
        </ul>
    </div>
</div>
```

**Step 3: Verify base modal section displays**

Open design-system.html and check:
- Section appears after Icon Library
- Demo button is visible
- Anatomy and features sections display correctly
- No layout issues

---

## Task 2: Add AiDraftModal Variant

**Files:**
- Read: `/Users/wallymo/BriefFlow-Playground-main/components/AiDraftModal.tsx:29-41`
- Modify: `/Users/wallymo/BriefFlow-Playground-main/public/design-system.html` (add after Base Modal section)

**Step 1: Extract AiDraftModal pattern**

Key features:
- Loading spinner with animation
- "Synthesizing your brief..." message
- Markdown content area with prose styling
- Two-button footer (Close + Copy to Clipboard)

**Step 2: Add AiDraftModal variant section**

Add after Base Modal section:

```html
<!-- AI Draft Modal Variant -->
<div class="bg-white rounded-xl p-8 border border-gray-200 shadow-lg mb-8">
    <h3 class="text-2xl font-bold text-gray-900 mb-6">AI Draft Modal</h3>
    <p class="text-gray-600 mb-6">Shows AI-generated content with loading state. Used for displaying synthesized brief summaries.</p>

    <!-- Demo Button -->
    <div class="mb-8">
        <button id="ai-modal-trigger" class="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
            Open AI Draft Modal
        </button>
    </div>

    <!-- States -->
    <div class="mb-8">
        <p class="text-sm font-semibold text-gray-700 mb-3">States</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Loading State Preview -->
            <div class="border border-gray-200 rounded-lg p-4">
                <p class="text-xs font-semibold text-gray-500 mb-3">Loading State</p>
                <div class="flex flex-col items-center justify-center text-center text-gray-600 bg-gray-50 rounded p-6">
                    <svg class="animate-spin h-8 w-8 text-gray-900 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p class="font-medium text-gray-900">Synthesizing your brief...</p>
                    <p class="text-sm text-gray-500 mt-1">turning strategy into structure.</p>
                </div>
            </div>

            <!-- Content State Preview -->
            <div class="border border-gray-200 rounded-lg p-4">
                <p class="text-xs font-semibold text-gray-500 mb-3">Content State</p>
                <div class="bg-gray-50 rounded p-4 text-sm text-gray-700 space-y-2">
                    <p class="font-semibold">Brief Summary</p>
                    <p class="text-xs">Generated markdown content displayed here with prose styling...</p>
                    <ul class="list-disc list-inside text-xs space-y-1">
                        <li>Objective: Drive brand awareness</li>
                        <li>Target: Tech professionals 25-40</li>
                        <li>Key Message: Innovation simplified</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer Actions -->
    <div class="mb-8">
        <p class="text-sm font-semibold text-gray-700 mb-3">Footer Actions</p>
        <div class="bg-gray-50 p-4 rounded-lg border border-gray-200 flex justify-end gap-2">
            <button class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-white transition-colors">
                Close
            </button>
            <button class="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors">
                Copy to Clipboard
            </button>
        </div>
    </div>
</div>
```

**Step 3: Verify AI Draft Modal section**

Check:
- Section displays after Base Modal
- Loading spinner animates
- Two state previews show correctly
- Footer button layout is correct

---

## Task 3: Add Confirmation Modal Variant

**Files:**
- Read: `/Users/wallymo/BriefFlow-Playground-main/components/ChangeTypeConfirmationModal.tsx:20-36`
- Modify: `/Users/wallymo/BriefFlow-Playground-main/public/design-system.html` (add after AI Draft Modal)

**Step 1: Extract confirmation modal pattern**

Key features:
- Warning icon in colored circle background
- Centered title and description
- Two-button layout (Cancel + Confirm)
- Smaller max-width (max-w-md)
- Destructive action styling

**Step 2: Add Confirmation Modal section**

```html
<!-- Confirmation Modal Variant -->
<div class="bg-white rounded-xl p-8 border border-gray-200 shadow-lg mb-8">
    <h3 class="text-2xl font-bold text-gray-900 mb-6">Confirmation Modal</h3>
    <p class="text-gray-600 mb-6">Used for destructive or important actions requiring user confirmation. Smaller, centered layout with warning icon.</p>

    <!-- Demo Button -->
    <div class="mb-8">
        <button id="confirm-modal-trigger" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            Open Confirmation Modal
        </button>
    </div>

    <!-- Preview -->
    <div class="mb-8">
        <p class="text-sm font-semibold text-gray-700 mb-3">Example: Change Project Type</p>
        <div class="max-w-md mx-auto border border-gray-200 rounded-lg p-8 text-center bg-white shadow-sm">
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-50">
                <svg class="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
            </div>
            <h3 class="mt-4 text-lg font-bold text-gray-900">Change Project Type?</h3>
            <div class="mt-2 text-sm text-gray-600">
                <p>Switching project types will update relevant examples and guidance to better match your new selection.</p>
                <p class="font-medium text-gray-900 mt-2">Your existing content will be preserved.</p>
            </div>
            <div class="mt-6 flex justify-end gap-2">
                <button class="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors">
                    Cancel
                </button>
                <button class="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                    Confirm Change
                </button>
            </div>
        </div>
    </div>

    <!-- Key Characteristics -->
    <div class="mb-8">
        <p class="text-sm font-semibold text-gray-700 mb-3">Key Characteristics</p>
        <ul class="space-y-2 text-gray-600 list-disc list-inside">
            <li>Smaller width (max-w-md) for focused attention</li>
            <li>Icon with colored background (warning/error/info)</li>
            <li>Clear, concise messaging about consequences</li>
            <li>Two-button layout: Secondary (Cancel) + Primary (Action)</li>
            <li>Action button color indicates severity (red for destructive)</li>
        </ul>
    </div>
</div>
```

**Step 3: Verify confirmation modal section**

Check:
- Section displays correctly
- Warning icon and colored background show
- Button layout is proper (Cancel left, Confirm right)
- Centered layout is maintained

---

## Task 4: Add Side Drawer Variant

**Files:**
- Read: `/Users/wallymo/BriefFlow-Playground-main/components/ui/SideDrawer.tsx:11-38`
- Modify: `/Users/wallymo/BriefFlow-Playground-main/public/design-system.html` (add after Confirmation Modal)

**Step 1: Extract side drawer pattern**

Key features:
- Slides in from right (transform translate-x)
- Separate backdrop (lighter opacity)
- Full height (h-full)
- Max width (max-w-md)
- Header with title + close button
- Scrollable content area

**Step 2: Add Side Drawer section**

```html
<!-- Side Drawer Variant -->
<div class="bg-white rounded-xl p-8 border border-gray-200 shadow-lg mb-8">
    <h3 class="text-2xl font-bold text-gray-900 mb-6">Side Drawer</h3>
    <p class="text-gray-600 mb-6">Slides in from the right for auxiliary content. Used for contextual panels that don't require full modal focus.</p>

    <!-- Demo Button -->
    <div class="mb-8">
        <button id="drawer-trigger" class="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
            Open Side Drawer
        </button>
    </div>

    <!-- Preview (Static) -->
    <div class="mb-8">
        <p class="text-sm font-semibold text-gray-700 mb-3">Static Preview</p>
        <div class="relative border border-gray-200 rounded-lg overflow-hidden" style="height: 400px;">
            <!-- Backdrop -->
            <div class="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
            <!-- Drawer -->
            <div class="absolute top-0 right-0 h-full w-80 bg-white shadow-lg border-l border-gray-200">
                <div class="flex flex-col h-full">
                    <!-- Header -->
                    <div class="flex items-center justify-between p-4 border-b border-gray-200">
                        <h3 class="text-lg font-bold text-gray-900">Drawer Title</h3>
                        <button class="text-gray-500 hover:text-gray-900">
                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <!-- Content -->
                    <div class="flex-grow overflow-y-auto p-4">
                        <p class="text-sm text-gray-600 mb-4">Drawer content goes here. This area is scrollable for long content.</p>
                        <div class="space-y-3">
                            <div class="p-3 bg-gray-50 rounded border border-gray-200">
                                <p class="text-xs font-semibold text-gray-700">Section 1</p>
                                <p class="text-xs text-gray-600 mt-1">Content example</p>
                            </div>
                            <div class="p-3 bg-gray-50 rounded border border-gray-200">
                                <p class="text-xs font-semibold text-gray-700">Section 2</p>
                                <p class="text-xs text-gray-600 mt-1">Content example</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Animation States -->
    <div class="mb-8">
        <p class="text-sm font-semibold text-gray-700 mb-3">Animation States</p>
        <div class="grid grid-cols-2 gap-4">
            <div class="border border-gray-200 rounded-lg p-4">
                <p class="text-xs font-semibold text-gray-500 mb-2">Closed</p>
                <code class="text-xs bg-gray-100 p-2 rounded block">translate-x-full</code>
                <p class="text-xs text-gray-600 mt-2">Drawer hidden off-screen to the right</p>
            </div>
            <div class="border border-gray-200 rounded-lg p-4">
                <p class="text-xs font-semibold text-gray-500 mb-2">Open</p>
                <code class="text-xs bg-gray-100 p-2 rounded block">translate-x-0</code>
                <p class="text-xs text-gray-600 mt-2">Drawer slides into view from right</p>
            </div>
        </div>
    </div>

    <!-- Key Characteristics -->
    <div class="mb-8">
        <p class="text-sm font-semibold text-gray-700 mb-3">Key Characteristics</p>
        <ul class="space-y-2 text-gray-600 list-disc list-inside">
            <li>Slides from right edge: <code class="bg-gray-100 px-2 py-0.5 rounded text-xs">transition-transform duration-300</code></li>
            <li>Lighter backdrop: <code class="bg-gray-100 px-2 py-0.5 rounded text-xs">bg-black/30</code> vs modal's bg-black/50</li>
            <li>Fixed width: <code class="bg-gray-100 px-2 py-0.5 rounded text-xs">max-w-md</code> (384px)</li>
            <li>Full viewport height with internal scrolling</li>
            <li>Separate backdrop and drawer z-index layers</li>
            <li>Used for contextual panels, settings, additional info</li>
        </ul>
    </div>
</div>
```

**Step 3: Verify side drawer section**

Check:
- Section displays after Confirmation Modal
- Static preview shows drawer positioned correctly
- Animation states documented clearly
- Key characteristics are readable

---

## Task 5: Add Interactive JavaScript for All Modals

**Files:**
- Modify: `/Users/wallymo/BriefFlow-Playground-main/public/design-system.html` (add to existing `<script>` section)

**Step 1: Add modal HTML templates to end of body**

Add before closing `</body>` tag:

```html
<!-- Modal Templates (Hidden) -->
<!-- Base Modal -->
<div id="base-modal" class="hidden fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onclick="closeModal('base-modal')">
    <div class="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] flex flex-col border border-gray-200" onclick="event.stopPropagation()">
        <div class="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 class="text-xl font-bold text-gray-900">Base Modal Example</h2>
            <button onclick="closeModal('base-modal')" class="text-gray-500 hover:text-gray-900 transition-colors">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <div class="p-6 overflow-y-auto">
            <p class="text-gray-600 mb-4">This is the base modal structure. It includes:</p>
            <ul class="list-disc list-inside space-y-2 text-gray-600">
                <li>Fixed overlay with backdrop blur</li>
                <li>Centered container with max-width</li>
                <li>Close button in header</li>
                <li>Scrollable content area</li>
                <li>Click outside or press ESC to close</li>
            </ul>
            <p class="text-gray-600 mt-4">Try clicking outside the modal or pressing ESC to close.</p>
        </div>
        <div class="p-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-2">
            <button onclick="closeModal('base-modal')" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-white transition-colors">
                Close
            </button>
            <button class="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                Action
            </button>
        </div>
    </div>
</div>

<!-- AI Draft Modal -->
<div id="ai-modal" class="hidden fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onclick="closeModal('ai-modal')">
    <div class="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] flex flex-col border border-gray-200" onclick="event.stopPropagation()">
        <div class="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 class="text-xl font-bold text-gray-900">AI-Generated Draft Summary</h2>
            <button onclick="closeModal('ai-modal')" class="text-gray-500 hover:text-gray-900 transition-colors">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <div class="p-8 overflow-y-auto">
            <div id="ai-loading" class="flex flex-col items-center justify-center text-center text-gray-600 min-h-[200px]">
                <svg class="animate-spin h-8 w-8 text-gray-900 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p class="font-medium text-gray-900">Synthesizing your brief...</p>
                <p class="text-sm text-gray-500 mt-1">turning strategy into structure.</p>
            </div>
            <div id="ai-content" class="hidden prose prose-sm max-w-none">
                <h3>Brief Summary</h3>
                <p><strong>Project:</strong> Website Redesign</p>
                <p><strong>Objective:</strong> Drive 25% increase in user engagement through improved UX</p>
                <ul>
                    <li>Target: Tech professionals aged 25-40</li>
                    <li>Key Message: Innovation meets simplicity</li>
                    <li>Timeline: 8 weeks</li>
                </ul>
            </div>
        </div>
        <div class="p-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-2">
            <button onclick="closeModal('ai-modal')" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-white transition-colors">
                Close
            </button>
            <button class="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors">
                Copy to Clipboard
            </button>
        </div>
    </div>
</div>

<!-- Confirmation Modal -->
<div id="confirm-modal" class="hidden fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onclick="closeModal('confirm-modal')">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-md border border-gray-200" onclick="event.stopPropagation()">
        <div class="p-8 text-center">
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-50">
                <svg class="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
            </div>
            <h3 class="mt-4 text-lg font-bold text-gray-900">Change Project Type?</h3>
            <div class="mt-2 text-sm text-gray-600">
                <p>Switching project types will update relevant examples and guidance to better match your new selection.</p>
                <p class="font-medium text-gray-900 mt-2">Your existing content will be preserved.</p>
            </div>
        </div>
        <div class="px-6 py-4 bg-gray-50 flex justify-end gap-2 border-t border-gray-200">
            <button onclick="closeModal('confirm-modal')" class="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors">
                Cancel
            </button>
            <button onclick="confirmAction()" class="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                Confirm Change
            </button>
        </div>
    </div>
</div>

<!-- Side Drawer -->
<div id="drawer-backdrop" class="hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-30" onclick="closeDrawer()"></div>
<div id="side-drawer" class="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-lg border-l border-gray-200 z-40 transform translate-x-full transition-transform duration-300 ease-in-out">
    <div class="flex flex-col h-full">
        <div class="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 class="text-lg font-bold text-gray-900">Drawer Title</h3>
            <button onclick="closeDrawer()" class="text-gray-500 hover:text-gray-900">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <div class="flex-grow overflow-y-auto p-4">
            <p class="text-sm text-gray-600 mb-4">This side drawer slides in from the right. It's useful for:</p>
            <ul class="list-disc list-inside space-y-2 text-sm text-gray-600">
                <li>Contextual panels</li>
                <li>Settings menus</li>
                <li>Additional information</li>
                <li>Filter options</li>
            </ul>
            <div class="mt-6 space-y-3">
                <div class="p-3 bg-gray-50 rounded border border-gray-200">
                    <p class="text-xs font-semibold text-gray-700">Section 1</p>
                    <p class="text-xs text-gray-600 mt-1">Content example</p>
                </div>
                <div class="p-3 bg-gray-50 rounded border border-gray-200">
                    <p class="text-xs font-semibold text-gray-700">Section 2</p>
                    <p class="text-xs text-gray-600 mt-1">Content example</p>
                </div>
                <div class="p-3 bg-gray-50 rounded border border-gray-200">
                    <p class="text-xs font-semibold text-gray-700">Section 3</p>
                    <p class="text-xs text-gray-600 mt-1">Content example</p>
                </div>
            </div>
        </div>
    </div>
</div>
```

**Step 2: Add JavaScript functions to script section**

Add before closing `</script>` tag:

```javascript
// Modal Management
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent body scroll
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = ''; // Restore body scroll
    }
}

// AI Modal specific - simulate loading
function openAiModal() {
    openModal('ai-modal');
    const loading = document.getElementById('ai-loading');
    const content = document.getElementById('ai-content');

    loading.classList.remove('hidden');
    content.classList.add('hidden');

    // Simulate 2 second loading
    setTimeout(() => {
        loading.classList.add('hidden');
        content.classList.remove('hidden');
    }, 2000);
}

// Confirmation action
function confirmAction() {
    alert('Action confirmed! In real app, this would trigger the change.');
    closeModal('confirm-modal');
}

// Drawer Management
function openDrawer() {
    const backdrop = document.getElementById('drawer-backdrop');
    const drawer = document.getElementById('side-drawer');

    backdrop.classList.remove('hidden');
    setTimeout(() => {
        drawer.classList.remove('translate-x-full');
    }, 10);
    document.body.style.overflow = 'hidden';
}

function closeDrawer() {
    const backdrop = document.getElementById('drawer-backdrop');
    const drawer = document.getElementById('side-drawer');

    drawer.classList.add('translate-x-full');
    setTimeout(() => {
        backdrop.classList.add('hidden');
    }, 300);
    document.body.style.overflow = '';
}

// ESC key to close modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal('base-modal');
        closeModal('ai-modal');
        closeModal('confirm-modal');
        closeDrawer();
    }
});

// Trigger buttons
document.getElementById('base-modal-trigger')?.addEventListener('click', () => openModal('base-modal'));
document.getElementById('ai-modal-trigger')?.addEventListener('click', openAiModal);
document.getElementById('confirm-modal-trigger')?.addEventListener('click', () => openModal('confirm-modal'));
document.getElementById('drawer-trigger')?.addEventListener('click', openDrawer);
```

**Step 3: Test all interactive modals**

Open design-system.html and verify:
- Base Modal opens/closes correctly
- AI Modal shows loading then content
- Confirmation Modal opens/closes
- Side Drawer slides in/out smoothly
- ESC key closes all modals/drawer
- Click outside closes modals/drawer
- Body scroll prevented when open
- No console errors

---

## Task 6: Test All Modal Components

**Files:**
- Test: `/Users/wallymo/BriefFlow-Playground-main/public/design-system.html`

**Step 1: Visual inspection**

Open design-system.html and verify:
1. Base Modal section displays after Icon Library
2. All 4 modal variant sections present and styled correctly
3. Demo buttons are clearly visible
4. Static previews render properly
5. No layout issues or text overflow

**Step 2: Interactive testing**

Test each modal/drawer:
1. **Base Modal:**
   - Opens on button click
   - Close button works
   - Click outside closes
   - ESC key closes
   - Body scroll locked when open

2. **AI Draft Modal:**
   - Shows loading spinner for 2 seconds
   - Transitions to content
   - Copy button visible
   - Closes properly

3. **Confirmation Modal:**
   - Opens with warning icon
   - Confirm button shows alert
   - Cancel closes modal
   - Proper button styling

4. **Side Drawer:**
   - Slides in from right smoothly
   - Backdrop appears
   - Closes on backdrop click
   - ESC key closes
   - Content scrolls if needed

**Step 3: Responsive testing**

Test at different screen widths:
- Mobile (375px): Modals use full-width padding
- Tablet (768px): Modals sized appropriately
- Desktop (1440px): Max-width constraints working

**Step 4: Accessibility check**

Verify:
- ESC key works for all overlays
- Focus trap not required (design system docs)
- Keyboard navigation to close buttons
- Aria labels not needed (static examples)

**Step 5: Document any issues**

Note any bugs or improvements needed before commit.

---

## Task 7: Commit Changes

**Files:**
- Modified: `/Users/wallymo/BriefFlow-Playground-main/public/design-system.html`

**Step 1: Check git status**

Run: `git status`

Expected: Shows modified public/design-system.html

**Step 2: Stage changes**

Run: `git add public/design-system.html`

**Step 3: Create commit**

Run:
```bash
git commit -m "$(cat <<'EOF'
feat: add batch 2 - modal and overlay components

- Add Base Modal Structure section
  - Fixed overlay with backdrop blur
  - Centered container pattern
  - Close button with X icon
  - Header, scrollable content, footer sections
  - Click outside and ESC key to close
  - Interactive demo with JavaScript

- Add AI Draft Modal variant
  - Loading state with spinning animation
  - "Synthesizing your brief..." message
  - Content state with markdown/prose styling
  - Two-button footer (Close + Copy)
  - Simulated 2s loading transition

- Add Confirmation Modal variant
  - Warning icon with colored background
  - Centered smaller layout (max-w-md)
  - Clear messaging about action consequences
  - Two-button layout: Cancel + Confirm
  - Destructive action styling

- Add Side Drawer variant
  - Slides in from right with transform
  - Lighter backdrop (bg-black/30)
  - Full viewport height
  - Scrollable content area
  - Separate backdrop and drawer layers

- Interactive JavaScript
  - Modal open/close functions
  - Body scroll lock when modals open
  - ESC key handler for all overlays
  - Drawer slide animations
  - Click outside to close

All modals extracted from BriefFlow React components:
- AiDraftModal.tsx
- ChangeTypeConfirmationModal.tsx
- SideDrawer.tsx

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

**Step 4: Verify commit succeeded**

Run: `git log -1 --oneline`

Expected: Shows new commit starting with "feat: add batch 2"

---

## Summary

This plan adds Batch 2 modal/overlay components to the design system:

**Components Added:**
- Base Modal Structure (foundation pattern)
- AI Draft Modal (loading + content states)
- Confirmation Modal (warning + two-button)
- Side Drawer (slide-in panel)

**Features:**
- Interactive demos for all variants
- JavaScript for open/close/ESC handling
- Body scroll lock when overlays active
- Smooth animations (fade, slide)
- Click outside to close
- Static previews showing anatomy

**Next Steps:**
After this batch is complete, proceed to:
- Batch 3: Navigation & Progress Components
- Batch 4: Specialized Components
