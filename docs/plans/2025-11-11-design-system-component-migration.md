# Design System Component Migration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrate reusable UI components from the BriefFlow wizard application to the isolated design-system.html showcase

**Architecture:** Extract existing React components (Button, Input, Card, Badge, Slider, ChipSelector, etc.) and their CSS design tokens, then create HTML equivalents with interactive JavaScript demonstrations in the design-system.html file. Maintain visual consistency and design patterns from globals.css.

**Tech Stack:** HTML, Tailwind CSS, Vanilla JavaScript, CSS Custom Properties (design tokens from globals.css)

---

## Task 1: Extract and Document Design Tokens

**Files:**
- Read: `/Users/wallymo/BriefFlow-Playground-main/styles/globals.css`
- Read: `/Users/wallymo/BriefFlow-Playground-main/design-system.html:1-100`
- Modify: `/Users/wallymo/BriefFlow-Playground-main/design-system.html:8-22` (style section)

**Step 1: Read the design tokens from globals.css**

Read the globals.css file to extract all CSS custom properties (variables) including:
- Spacing scale (xs, sm, md, lg, xl, 2xl)
- Color palette (background, foreground, surface, border, primary, secondary, etc.)
- Typography scales (h1, h2, h3, body, caption, button)
- Border radius values
- Transition durations

**Step 2: Document the design tokens in design-system.html**

Add a new "Design Tokens" section in the design-system.html Foundations area:

```html
<!-- Design Tokens -->
<div class="mb-16">
    <h3 class="text-2xl font-bold text-gray-900 mb-6">Design Tokens</h3>

    <!-- Spacing Scale -->
    <div class="mb-8">
        <h4 class="text-lg font-semibold text-gray-700 mb-4">Spacing Scale</h4>
        <div class="space-y-2">
            <div class="flex items-center gap-4">
                <div class="w-1 bg-blue-600" style="height: 4px;"></div>
                <span class="font-mono text-sm">--spacing-xs: 4px</span>
            </div>
            <div class="flex items-center gap-4">
                <div class="w-2 bg-blue-600" style="height: 8px;"></div>
                <span class="font-mono text-sm">--spacing-sm: 8px</span>
            </div>
            <div class="flex items-center gap-4">
                <div class="w-3 bg-blue-600" style="height: 12px;"></div>
                <span class="font-mono text-sm">--spacing-md: 12px</span>
            </div>
            <div class="flex items-center gap-4">
                <div class="w-4 bg-blue-600" style="height: 16px;"></div>
                <span class="font-mono text-sm">--spacing-lg: 16px</span>
            </div>
            <div class="flex items-center gap-4">
                <div class="w-6 bg-blue-600" style="height: 24px;"></div>
                <span class="font-mono text-sm">--spacing-xl: 24px</span>
            </div>
            <div class="flex items-center gap-4">
                <div class="w-8 bg-blue-600" style="height: 32px;"></div>
                <span class="font-mono text-sm">--spacing-2xl: 32px</span>
            </div>
        </div>
    </div>

    <!-- Typography Scale -->
    <div class="mb-8">
        <h4 class="text-lg font-semibold text-gray-700 mb-4">Typography Scale</h4>
        <div class="space-y-4">
            <div>
                <p class="text-[2rem] leading-[1.4] font-bold">Heading 1</p>
                <p class="text-sm text-gray-500 font-mono">.text-h1: 2rem / 1.4 / bold</p>
            </div>
            <div>
                <p class="text-[1.5rem] leading-[1.4] font-semibold">Heading 2</p>
                <p class="text-sm text-gray-500 font-mono">.text-h2: 1.5rem / 1.4 / semibold</p>
            </div>
            <div>
                <p class="text-[1.25rem] leading-[1.4] font-semibold">Heading 3</p>
                <p class="text-sm text-gray-500 font-mono">.text-h3: 1.25rem / 1.4 / semibold</p>
            </div>
            <div>
                <p class="text-[1rem] leading-[1.6]">Body Text</p>
                <p class="text-sm text-gray-500 font-mono">.text-body: 1rem / 1.6</p>
            </div>
            <div>
                <p class="text-[0.875rem] leading-[1.5]">Caption</p>
                <p class="text-sm text-gray-500 font-mono">.text-caption: 0.875rem / 1.5</p>
            </div>
        </div>
    </div>
</div>
```

**Step 3: Verify the tokens section displays correctly**

Open design-system.html in a browser and check that:
- Spacing visualizations render correctly
- Typography samples display with proper sizes
- Font mono displays code snippets properly

---

## Task 2: Add Button Component Variants

**Files:**
- Read: `/Users/wallymo/BriefFlow-Playground-main/components/ui/Button.tsx`
- Modify: `/Users/wallymo/BriefFlow-Playground-main/design-system.html:350-399` (Buttons section)

**Step 1: Read the Button component variants**

Review Button.tsx to identify all variants:
- default (primary)
- destructive
- outline
- secondary
- ghost
- link

And sizes:
- default (h-9)
- sm (h-8)
- lg (h-10)
- icon (size-9)

**Step 2: Replace existing button examples with comprehensive variants**

Update the Buttons section in design-system.html:

```html
<div class="bg-white rounded-xl p-8 border border-gray-200 shadow-lg mb-8">
    <h3 class="text-2xl font-bold text-gray-900 mb-6">Buttons</h3>

    <!-- Default Variant -->
    <div class="mb-8">
        <p class="text-sm font-semibold text-gray-700 mb-3">Default (Primary)</p>
        <div class="flex flex-wrap gap-4 items-center">
            <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all h-8 px-3 bg-gray-900 text-white shadow-sm hover:bg-gray-800">
                Small
            </button>
            <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all h-9 px-4 bg-gray-900 text-white shadow-sm hover:bg-gray-800">
                Default
            </button>
            <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all h-10 px-6 bg-gray-900 text-white shadow-sm hover:bg-gray-800">
                Large
            </button>
            <button class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all size-9 bg-gray-900 text-white shadow-sm hover:bg-gray-800">
                <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
            </button>
        </div>
    </div>

    <!-- Destructive Variant -->
    <div class="mb-8">
        <p class="text-sm font-semibold text-gray-700 mb-3">Destructive</p>
        <div class="flex flex-wrap gap-4">
            <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all h-9 px-4 bg-red-600 text-white shadow-sm hover:bg-red-700">
                Delete
            </button>
            <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all h-9 px-4 bg-red-600 text-white shadow-sm hover:bg-red-700" disabled style="opacity: 0.5; pointer-events: none;">
                Disabled
            </button>
        </div>
    </div>

    <!-- Outline Variant -->
    <div class="mb-8">
        <p class="text-sm font-semibold text-gray-700 mb-3">Outline</p>
        <div class="flex flex-wrap gap-4">
            <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all h-9 px-4 border bg-white shadow-sm hover:bg-gray-50">
                Outline
            </button>
        </div>
    </div>

    <!-- Secondary Variant -->
    <div class="mb-8">
        <p class="text-sm font-semibold text-gray-700 mb-3">Secondary</p>
        <div class="flex flex-wrap gap-4">
            <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all h-9 px-4 bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-200">
                Secondary
            </button>
        </div>
    </div>

    <!-- Ghost Variant -->
    <div class="mb-8">
        <p class="text-sm font-semibold text-gray-700 mb-3">Ghost</p>
        <div class="flex flex-wrap gap-4">
            <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all h-9 px-4 hover:bg-gray-100">
                Ghost
            </button>
        </div>
    </div>

    <!-- Link Variant -->
    <div class="mb-8">
        <p class="text-sm font-semibold text-gray-700 mb-3">Link</p>
        <div class="flex flex-wrap gap-4">
            <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all h-9 px-4 text-gray-900 underline-offset-4 hover:underline">
                Link Button
            </button>
        </div>
    </div>
</div>
```

**Step 3: Test button interactions in browser**

Open design-system.html and verify:
- All button variants render correctly
- Hover states work
- Disabled state displays correctly
- Icon button renders properly
- Sizes are visually distinct

---

## Task 3: Add Input Component with Label and Tooltip

**Files:**
- Read: `/Users/wallymo/BriefFlow-Playground-main/components/ui/Input.tsx`
- Read: `/Users/wallymo/BriefFlow-Playground-main/components/ui/Tooltip.tsx`
- Modify: `/Users/wallymo/BriefFlow-Playground-main/design-system.html` (add new section after Buttons)

**Step 1: Create Input component section in Molecules**

Add after the Buttons section:

```html
<!-- Input Fields -->
<div class="bg-white rounded-xl p-8 border border-gray-200 shadow-lg mb-8">
    <h3 class="text-2xl font-bold text-gray-900 mb-6">Input Fields</h3>

    <!-- Basic Input -->
    <div class="mb-8">
        <p class="text-sm font-semibold text-gray-700 mb-3">Basic Input</p>
        <div class="w-full max-w-md">
            <label for="input-basic" class="block font-medium text-gray-900 text-base mb-2">
                Project Name
            </label>
            <input
                id="input-basic"
                type="text"
                placeholder="Enter project name"
                class="flex w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-base text-gray-900 shadow-sm transition-all placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400"
            />
        </div>
    </div>

    <!-- Input with Tooltip -->
    <div class="mb-8">
        <p class="text-sm font-semibold text-gray-700 mb-3">Input with Info Tooltip</p>
        <div class="w-full max-w-md">
            <div class="flex items-center mb-2">
                <label for="input-tooltip" class="block font-medium text-gray-900 text-base">
                    Budget Range
                </label>
                <div class="relative inline-block ml-1.5 group">
                    <svg class="w-4 h-4 text-gray-400 cursor-help" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                    </svg>
                    <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-48 px-3 py-2 text-xs text-white bg-gray-900 rounded-lg shadow-lg z-10">
                        Specify the budget range for this project
                        <div class="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                    </div>
                </div>
            </div>
            <input
                id="input-tooltip"
                type="text"
                placeholder="$10,000 - $50,000"
                class="flex w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-base text-gray-900 shadow-sm transition-all placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400"
            />
        </div>
    </div>

    <!-- Error State -->
    <div class="mb-8">
        <p class="text-sm font-semibold text-gray-700 mb-3">Error State</p>
        <div class="w-full max-w-md">
            <label for="input-error" class="block font-medium text-gray-900 text-base mb-2">
                Email Address
            </label>
            <input
                id="input-error"
                type="email"
                placeholder="you@example.com"
                class="flex w-full rounded-lg border border-red-500 bg-white px-3 py-3 text-base text-gray-900 shadow-sm transition-all placeholder:text-gray-400 ring-2 ring-red-200 focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-500"
            />
            <p class="text-sm text-red-600 mt-1">Please enter a valid email address</p>
        </div>
    </div>

    <!-- Disabled State -->
    <div class="mb-8">
        <p class="text-sm font-semibold text-gray-700 mb-3">Disabled State</p>
        <div class="w-full max-w-md">
            <label for="input-disabled" class="block font-medium text-gray-400 text-base mb-2">
                Read Only Field
            </label>
            <input
                id="input-disabled"
                type="text"
                value="Cannot edit this field"
                disabled
                class="flex w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-base text-gray-900 shadow-sm transition-all opacity-50 cursor-not-allowed"
            />
        </div>
    </div>
</div>
```

**Step 2: Test input field interactions**

Open design-system.html and verify:
- Focus states work correctly
- Tooltip appears on hover
- Error state displays red border and message
- Disabled state prevents interaction
- Placeholder text is visible

---

## Task 4: Add Card Component System

**Files:**
- Read: `/Users/wallymo/BriefFlow-Playground-main/components/ui/Card.tsx`
- Modify: `/Users/wallymo/BriefFlow-Playground-main/design-system.html` (add new section)

**Step 1: Create Card component section**

Add a new Cards section in Molecules:

```html
<!-- Cards -->
<div class="bg-white rounded-xl p-8 border border-gray-200 shadow-lg mb-8">
    <h3 class="text-2xl font-bold text-gray-900 mb-6">Cards</h3>

    <!-- Basic Card -->
    <div class="mb-8">
        <p class="text-sm font-semibold text-gray-700 mb-3">Basic Card</p>
        <div class="bg-white border rounded-xl p-6 shadow-sm max-w-md">
            <h4 class="text-lg font-semibold mb-2">Card Title</h4>
            <p class="text-gray-600">This is a basic card component with title and description.</p>
        </div>
    </div>

    <!-- Card with Header and Footer -->
    <div class="mb-8">
        <p class="text-sm font-semibold text-gray-700 mb-3">Card with Header & Footer</p>
        <div class="bg-white border rounded-xl shadow-sm max-w-md flex flex-col gap-6">
            <div class="px-6 pt-6">
                <div class="font-semibold leading-none mb-1.5">Project Overview</div>
                <div class="text-gray-500 text-sm">Review your project details</div>
            </div>
            <div class="px-6">
                <p class="text-gray-700">This card demonstrates the header, content, and footer sections working together in a cohesive layout.</p>
            </div>
            <div class="flex items-center px-6 pb-6 border-t pt-6">
                <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all h-9 px-4 bg-gray-900 text-white shadow-sm hover:bg-gray-800">
                    View Details
                </button>
            </div>
        </div>
    </div>

    <!-- Card with Action -->
    <div class="mb-8">
        <p class="text-sm font-semibold text-gray-700 mb-3">Card with Action Button</p>
        <div class="bg-white border rounded-xl shadow-sm max-w-md flex flex-col gap-6">
            <div class="px-6 pt-6 grid auto-rows-min grid-cols-[1fr_auto] items-start gap-1.5">
                <div>
                    <div class="font-semibold leading-none mb-1.5">Notification Settings</div>
                    <div class="text-gray-500 text-sm">Manage how you receive updates</div>
                </div>
                <button class="col-start-2 row-span-2 row-start-1 self-start justify-self-end inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all h-8 px-3 hover:bg-gray-100">
                    Edit
                </button>
            </div>
            <div class="px-6 pb-6">
                <p class="text-gray-700">Configure your notification preferences for this project.</p>
            </div>
        </div>
    </div>
</div>
```

**Step 2: Verify card rendering**

Check in browser:
- Cards have proper shadows and borders
- Spacing between sections is consistent
- Action buttons align properly
- Responsive behavior works

---

## Task 5: Add Badge Component Variants

**Files:**
- Read: `/Users/wallymo/BriefFlow-Playground-main/components/ui/Badge.tsx`
- Modify: `/Users/wallymo/BriefFlow-Playground-main/design-system.html` (add new section)

**Step 1: Create Badge component section**

```html
<!-- Badges -->
<div class="bg-white rounded-xl p-8 border border-gray-200 shadow-lg mb-8">
    <h3 class="text-2xl font-bold text-gray-900 mb-6">Badges</h3>

    <!-- Default Badges -->
    <div class="mb-6">
        <p class="text-sm font-semibold text-gray-700 mb-3">Default</p>
        <div class="flex flex-wrap gap-2">
            <span class="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-900 text-white px-2 py-0.5 text-xs font-medium">
                Default
            </span>
            <span class="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-900 text-white px-2 py-0.5 text-xs font-medium gap-1">
                <svg class="size-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                With Icon
            </span>
        </div>
    </div>

    <!-- Secondary Badges -->
    <div class="mb-6">
        <p class="text-sm font-semibold text-gray-700 mb-3">Secondary</p>
        <div class="flex flex-wrap gap-2">
            <span class="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-100 text-gray-900 px-2 py-0.5 text-xs font-medium">
                Secondary
            </span>
        </div>
    </div>

    <!-- Destructive Badges -->
    <div class="mb-6">
        <p class="text-sm font-semibold text-gray-700 mb-3">Destructive</p>
        <div class="flex flex-wrap gap-2">
            <span class="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 text-white px-2 py-0.5 text-xs font-medium">
                Error
            </span>
        </div>
    </div>

    <!-- Outline Badges -->
    <div class="mb-6">
        <p class="text-sm font-semibold text-gray-700 mb-3">Outline</p>
        <div class="flex flex-wrap gap-2">
            <span class="inline-flex items-center justify-center rounded-md border border-gray-300 text-gray-900 px-2 py-0.5 text-xs font-medium">
                Outline
            </span>
        </div>
    </div>

    <!-- Status Badges -->
    <div class="mb-6">
        <p class="text-sm font-semibold text-gray-700 mb-3">Status Examples</p>
        <div class="flex flex-wrap gap-2">
            <span class="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 text-white px-2 py-0.5 text-xs font-medium">
                Active
            </span>
            <span class="inline-flex items-center justify-center rounded-md border border-transparent bg-yellow-600 text-white px-2 py-0.5 text-xs font-medium">
                Pending
            </span>
            <span class="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 text-white px-2 py-0.5 text-xs font-medium">
                In Progress
            </span>
            <span class="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-400 text-white px-2 py-0.5 text-xs font-medium">
                Archived
            </span>
        </div>
    </div>
</div>
```

**Step 2: Test badge display**

Verify:
- All variants render with correct colors
- Icons display properly within badges
- Text is legible on all background colors

---

## Task 6: Add Slider Component

**Files:**
- Read: `/Users/wallymo/BriefFlow-Playground-main/components/ui/Slider.tsx`
- Modify: `/Users/wallymo/BriefFlow-Playground-main/design-system.html` (add new section)

**Step 1: Create Slider component section**

```html
<!-- Sliders -->
<div class="bg-white rounded-xl p-8 border border-gray-200 shadow-lg mb-8">
    <h3 class="text-2xl font-bold text-gray-900 mb-6">Sliders</h3>

    <!-- Basic Slider -->
    <div class="mb-8">
        <p class="text-sm font-semibold text-gray-700 mb-3">Basic Range Slider</p>
        <div class="max-w-md">
            <label class="block text-base font-medium text-gray-900 mb-2">Brand Tone</label>
            <div class="flex items-center gap-3">
                <span class="text-sm text-gray-500 w-20 text-right">Formal</span>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value="50"
                    class="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-900 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gray-900 [&::-moz-range-thumb]:border-none"
                    id="slider-1"
                />
                <span class="text-sm text-gray-500 w-20">Playful</span>
            </div>
            <div class="text-center mt-2">
                <span class="text-xs text-gray-400">Value: <span id="slider-1-value">50</span></span>
            </div>
        </div>
    </div>

    <!-- Multiple Sliders -->
    <div class="mb-8">
        <p class="text-sm font-semibold text-gray-700 mb-3">Multiple Sliders</p>
        <div class="max-w-md space-y-4">
            <div>
                <label class="block text-base font-medium text-gray-900 mb-2">Formality</label>
                <div class="flex items-center gap-3">
                    <span class="text-sm text-gray-500 w-20 text-right">Casual</span>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value="40"
                        class="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-900 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gray-900 [&::-moz-range-thumb]:border-none"
                        id="slider-2"
                    />
                    <span class="text-sm text-gray-500 w-20">Professional</span>
                </div>
            </div>
            <div>
                <label class="block text-base font-medium text-gray-900 mb-2">Visual Style</label>
                <div class="flex items-center gap-3">
                    <span class="text-sm text-gray-500 w-20 text-right">Minimal</span>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value="60"
                        class="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-900 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gray-900 [&::-moz-range-thumb]:border-none"
                        id="slider-3"
                    />
                    <span class="text-sm text-gray-500 w-20">Expressive</span>
                </div>
            </div>
        </div>
    </div>
</div>
```

**Step 2: Add JavaScript to update slider values**

Add a `<script>` tag before the closing `</body>` tag:

```html
<script>
    // Update slider value displays
    const slider1 = document.getElementById('slider-1');
    const slider1Value = document.getElementById('slider-1-value');

    if (slider1 && slider1Value) {
        slider1.addEventListener('input', (e) => {
            slider1Value.textContent = e.target.value;
        });
    }

    const slider2 = document.getElementById('slider-2');
    const slider3 = document.getElementById('slider-3');

    // Add interactivity for other sliders if needed
    [slider2, slider3].forEach(slider => {
        if (slider) {
            slider.addEventListener('input', (e) => {
                console.log(`Slider value: ${e.target.value}`);
            });
        }
    });
</script>
```

**Step 3: Test slider functionality**

Verify:
- Sliders are draggable
- Value updates display correctly
- Labels align properly on both sides
- Thumb styling is consistent across browsers

---

## Task 7: Add ChipSelector Component

**Files:**
- Read: `/Users/wallymo/BriefFlow-Playground-main/components/ui/ChipSelector.tsx`
- Modify: `/Users/wallymo/BriefFlow-Playground-main/design-system.html` (add new section)

**Step 1: Create ChipSelector component section**

```html
<!-- Chip Selector -->
<div class="bg-white rounded-xl p-8 border border-gray-200 shadow-lg mb-8">
    <h3 class="text-2xl font-bold text-gray-900 mb-6">Chip Selector</h3>

    <!-- Basic Chip Selector -->
    <div class="mb-8">
        <p class="text-sm font-semibold text-gray-700 mb-3">Multi-Select Chips</p>
        <div class="bg-gray-50 p-4 rounded-lg border border-gray-200 max-w-2xl">
            <div class="flex justify-between items-center mb-3">
                <h4 class="text-base font-semibold text-gray-900">Project Type</h4>
            </div>

            <!-- Selected Chips -->
            <div class="flex flex-wrap gap-2 mb-3" id="selected-chips">
                <div class="flex items-center gap-1 rounded-full p-1 pl-3 transition-all bg-gray-900 text-white shadow-sm">
                    <span class="text-sm font-medium">Website</span>
                    <button class="w-5 h-5 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors" onclick="removeChip(this)">
                        ×
                    </button>
                </div>
                <div class="flex items-center gap-1 rounded-full p-1 pl-3 transition-all bg-gray-200 text-gray-900">
                    <span class="text-sm font-medium">Mobile App</span>
                    <button class="w-5 h-5 rounded-full flex items-center justify-center bg-gray-300 text-gray-600 hover:bg-red-100 hover:text-red-600 transition-colors" onclick="removeChip(this)">
                        ×
                    </button>
                </div>
            </div>

            <!-- Available Options -->
            <div class="flex flex-wrap gap-2 border-t border-gray-300 pt-3">
                <button class="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-colors" onclick="addChip(this)">
                    + Campaign
                </button>
                <button class="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-colors" onclick="addChip(this)">
                    + Brand Identity
                </button>
                <button class="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-colors" onclick="addChip(this)">
                    + Print Design
                </button>
            </div>
        </div>
    </div>

    <!-- Chip States -->
    <div class="mb-8">
        <p class="text-sm font-semibold text-gray-700 mb-3">Chip States</p>
        <div class="flex flex-wrap gap-2">
            <div class="flex items-center gap-1 rounded-full p-1 pl-3 bg-gray-200 text-gray-900">
                <span class="text-sm font-medium">Incomplete</span>
                <button class="w-5 h-5 rounded-full flex items-center justify-center bg-gray-300 text-gray-600 hover:bg-red-100 hover:text-red-600">
                    ×
                </button>
            </div>
            <div class="flex items-center gap-1 rounded-full p-1 pl-3 bg-gray-900 text-white shadow-sm">
                <span class="text-sm font-medium">Completed</span>
                <button class="w-5 h-5 rounded-full flex items-center justify-center hover:bg-white/20">
                    ×
                </button>
            </div>
            <div class="flex items-center gap-1 rounded-full p-1 pl-3 bg-green-600 text-white shadow-sm">
                <svg class="size-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span class="text-sm font-medium">Active</span>
                <button class="w-5 h-5 rounded-full flex items-center justify-center hover:bg-white/20">
                    ×
                </button>
            </div>
        </div>
    </div>
</div>
```

**Step 2: Add JavaScript for chip interactions**

Add to the `<script>` section:

```javascript
function addChip(button) {
    const chipText = button.textContent.replace('+ ', '').trim();
    const container = document.getElementById('selected-chips');

    const chip = document.createElement('div');
    chip.className = 'flex items-center gap-1 rounded-full p-1 pl-3 transition-all bg-gray-200 text-gray-900';
    chip.innerHTML = `
        <span class="text-sm font-medium">${chipText}</span>
        <button class="w-5 h-5 rounded-full flex items-center justify-center bg-gray-300 text-gray-600 hover:bg-red-100 hover:text-red-600 transition-colors" onclick="removeChip(this)">
            ×
        </button>
    `;

    container.appendChild(chip);
    button.style.display = 'none';
}

function removeChip(button) {
    const chip = button.parentElement;
    chip.remove();
}
```

**Step 3: Test chip selector**

Verify:
- Adding chips works
- Removing chips works
- Hover states are correct
- Completed state visual is distinct

---

## Task 8: Add Textarea Component

**Files:**
- Read: `/Users/wallymo/BriefFlow-Playground-main/components/ui/Textarea.tsx`
- Modify: `/Users/wallymo/BriefFlow-Playground-main/design-system.html` (add to Input Fields section)

**Step 1: Add textarea to Input Fields section**

After the Input disabled state, add:

```html
<!-- Textarea -->
<div class="mb-8">
    <p class="text-sm font-semibold text-gray-700 mb-3">Textarea</p>
    <div class="w-full max-w-md">
        <label for="textarea-basic" class="block font-medium text-gray-900 text-base mb-2">
            Project Description
        </label>
        <textarea
            id="textarea-basic"
            rows="4"
            placeholder="Describe your project in detail..."
            class="flex w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-base text-gray-900 shadow-sm transition-all placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 resize-y"
        ></textarea>
    </div>
</div>

<!-- Textarea with Character Count -->
<div class="mb-8">
    <p class="text-sm font-semibold text-gray-700 mb-3">Textarea with Character Count</p>
    <div class="w-full max-w-md">
        <label for="textarea-count" class="block font-medium text-gray-900 text-base mb-2">
            Key Messaging
        </label>
        <textarea
            id="textarea-count"
            rows="4"
            maxlength="500"
            placeholder="Enter key messaging..."
            class="flex w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-base text-gray-900 shadow-sm transition-all placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 resize-y"
        ></textarea>
        <div class="flex justify-end mt-1">
            <span class="text-xs text-gray-400"><span id="char-count">0</span> / 500</span>
        </div>
    </div>
</div>
```

**Step 2: Add JavaScript for character count**

Add to the `<script>` section:

```javascript
const textareaCount = document.getElementById('textarea-count');
const charCount = document.getElementById('char-count');

if (textareaCount && charCount) {
    textareaCount.addEventListener('input', (e) => {
        charCount.textContent = e.target.value.length;
    });
}
```

**Step 3: Test textarea**

Verify:
- Textarea is resizable
- Character count updates correctly
- Focus states work
- Placeholder is visible

---

## Task 9: Add Progress Indicators and Score Meters

**Files:**
- Read: `/Users/wallymo/BriefFlow-Playground-main/components/ui/ScoreMeter.tsx`
- Read: `/Users/wallymo/BriefFlow-Playground-main/components/ProgressBar.tsx`
- Modify: `/Users/wallymo/BriefFlow-Playground-main/design-system.html` (add new Organisms section)

**Step 1: Create Organisms section with Progress components**

Add a new section after Molecules:

```html
<!-- Organisms Section -->
<section id="organisms" class="py-20 bg-gradient-to-r from-green-50 to-blue-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
            <div class="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                Organisms
            </div>
            <h2 class="text-4xl font-bold text-gray-900 mb-4">Complex Components</h2>
            <p class="text-xl text-gray-600">Molecules combined into complete UI sections</p>
        </div>

        <!-- Progress Bar -->
        <div class="bg-white rounded-xl p-8 border border-gray-200 shadow-lg mb-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-6">Progress Indicators</h3>

            <!-- Linear Progress -->
            <div class="mb-8">
                <p class="text-sm font-semibold text-gray-700 mb-3">Linear Progress Bar</p>
                <div class="max-w-md">
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-sm font-medium text-gray-900">Overall Progress</span>
                        <span class="text-sm font-medium text-gray-500">65%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div class="bg-blue-600 h-2 rounded-full transition-all duration-300" style="width: 65%"></div>
                    </div>
                </div>
            </div>

            <!-- Step Progress -->
            <div class="mb-8">
                <p class="text-sm font-semibold text-gray-700 mb-3">Step Progress Indicator</p>
                <div class="max-w-2xl">
                    <div class="flex items-center justify-between">
                        <!-- Step 1 - Complete -->
                        <div class="flex flex-col items-center flex-1">
                            <div class="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold mb-2">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                            <span class="text-xs text-gray-600 text-center">Overview</span>
                        </div>
                        <div class="flex-1 h-0.5 bg-green-600 -mt-5"></div>

                        <!-- Step 2 - Active -->
                        <div class="flex flex-col items-center flex-1">
                            <div class="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold mb-2 ring-4 ring-blue-100">
                                2
                            </div>
                            <span class="text-xs text-gray-900 font-medium text-center">Details</span>
                        </div>
                        <div class="flex-1 h-0.5 bg-gray-300 -mt-5"></div>

                        <!-- Step 3 - Incomplete -->
                        <div class="flex flex-col items-center flex-1">
                            <div class="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-semibold mb-2">
                                3
                            </div>
                            <span class="text-xs text-gray-400 text-center">Review</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Score Meter -->
            <div class="mb-8">
                <p class="text-sm font-semibold text-gray-700 mb-3">Score Meters</p>
                <div class="grid md:grid-cols-2 gap-6 max-w-2xl">
                    <!-- Clarity Score -->
                    <div class="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <div class="flex justify-between items-center mb-3">
                            <h4 class="text-sm font-semibold text-gray-900">Clarity Score</h4>
                            <span class="text-2xl font-bold text-green-600">82</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div class="bg-green-600 h-3 rounded-full" style="width: 82%"></div>
                        </div>
                        <p class="text-xs text-gray-500 mt-2">Great! Your brief is clear and detailed.</p>
                    </div>

                    <!-- Brand Match -->
                    <div class="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <div class="flex justify-between items-center mb-3">
                            <h4 class="text-sm font-semibold text-gray-900">Brand Match</h4>
                            <span class="text-2xl font-bold text-yellow-600">65</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div class="bg-yellow-600 h-3 rounded-full" style="width: 65%"></div>
                        </div>
                        <p class="text-xs text-gray-500 mt-2">Good alignment with brand identity.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
```

**Step 2: Verify progress components display**

Check:
- Progress bars animate smoothly
- Step indicators show correct states
- Score meters render with proper colors
- All components are responsive

---

## Task 10: Create Interactive Documentation and Test All Components

**Files:**
- Modify: `/Users/wallymo/BriefFlow-Playground-main/design-system.html` (add footer with usage notes)

**Step 1: Add footer with component usage guide**

Before the closing `</body>` tag, add:

```html
<!-- Footer / Usage Guide -->
<footer class="bg-gray-900 text-white py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold mb-8">Usage Guide</h2>

        <div class="grid md:grid-cols-2 gap-8 mb-12">
            <div>
                <h3 class="text-xl font-semibold mb-4">Design Principles</h3>
                <ul class="space-y-2 text-gray-300">
                    <li>• Consistent spacing using defined tokens (xs, sm, md, lg, xl, 2xl)</li>
                    <li>• Use semantic color names from the palette</li>
                    <li>• Follow typography scale for hierarchy</li>
                    <li>• Apply shadows and borders consistently</li>
                    <li>• Ensure all interactive elements have hover/focus states</li>
                </ul>
            </div>
            <div>
                <h3 class="text-xl font-semibold mb-4">Component Library</h3>
                <ul class="space-y-2 text-gray-300">
                    <li>• <strong>Atoms:</strong> Buttons, Badges, Inputs, Typography</li>
                    <li>• <strong>Molecules:</strong> Cards, Input Groups, Chip Selectors</li>
                    <li>• <strong>Organisms:</strong> Progress Bars, Score Meters, Step Indicators</li>
                    <li>• All components support light/dark mode via CSS variables</li>
                    <li>• Accessible markup with proper ARIA labels</li>
                </ul>
            </div>
        </div>

        <div class="border-t border-gray-700 pt-8 text-center">
            <p class="text-gray-400">BriefFlow Design System v1.0 • Last updated: November 2025</p>
        </div>
    </div>
</footer>
```

**Step 2: Test all components in browser**

Open design-system.html and verify:
1. All sections render correctly
2. Navigation links work
3. Interactive components respond to user input
4. No console errors
5. All tooltips display on hover
6. Sliders update values
7. Chips can be added/removed
8. Responsive layout works on mobile/tablet/desktop

**Step 3: Document any issues found**

Create a list of any visual or functional issues to address

---

## Task 11: Commit Changes

**Files:**
- All modified files

**Step 1: Check git status**

Run: `git status`

Expected: Shows modified design-system.html and new docs/plans directory

**Step 2: Stage all changes**

Run: `git add design-system.html docs/`

**Step 3: Create commit**

Run:
```bash
git commit -m "$(cat <<'EOF'
feat: migrate wizard design system components to design-system.html

- Extract and document design tokens from globals.css
- Add comprehensive Button variants (default, destructive, outline, secondary, ghost, link)
- Add Input component with label, tooltip, error, and disabled states
- Add Card component system with header, footer, and action variants
- Add Badge variants (default, secondary, destructive, outline) with icons
- Add Slider component with dual-label layout
- Add ChipSelector with add/remove functionality
- Add Textarea with character count
- Add Progress indicators (linear, step-based, score meters)
- Add interactive JavaScript for all dynamic components
- Add usage guide footer with design principles

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

**Step 4: Verify commit succeeded**

Run: `git log -1 --oneline`

Expected: Shows the new commit message

---

## Summary

This plan migrates the following components from the BriefFlow wizard to design-system.html:

**Extracted Components:**
- Button (6 variants, 4 sizes)
- Input (with label, tooltip, error, disabled states)
- Card (basic, with header/footer, with action)
- Badge (4 variants, with/without icons)
- Slider (dual-label range input)
- ChipSelector (multi-select with add/remove)
- Textarea (with character count)
- Progress indicators (linear, step-based, score meters)

**Design Tokens Documented:**
- Spacing scale (6 values)
- Typography scale (5 levels)
- Color palette (from globals.css)
- Border radius values

**Interactive Features:**
- Slider value updates
- Chip add/remove functionality
- Textarea character counting
- Tooltip displays
- All hover/focus states

The implementation follows DRY principles, maintains consistency with the wizard design system, and provides a comprehensive showcase for developers to reference when building new features.
