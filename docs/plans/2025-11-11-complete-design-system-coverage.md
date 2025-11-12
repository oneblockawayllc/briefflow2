# Complete Design System Coverage - Missing Components

**Date:** November 11, 2025
**Status:** Design Approved
**Goal:** Ensure all BriefFlow wizard components are documented in design-system.html

---

## Overview

This design addresses the gap identified during the initial design system migration: several key component patterns from the wizard were not included. This document outlines a comprehensive, quality-focused approach to add all remaining components.

## Missing Components Identified

### Components Already Migrated (✓)
- Design Tokens (spacing, typography)
- Button (6 variants, 4 sizes)
- Input (with label, tooltip, error, disabled states)
- Card (3 layouts)
- Badge (4 variants)
- Slider (dual-label)
- ChipSelector (multi-select)
- Textarea (with character count)
- Progress Indicators (linear, step-based, score meters)

### Components Still Missing (To Add)

**Batch 1: Selection & Interactive Patterns**
1. Selection Cards with Icons
   - Project type selector pattern
   - Icon + text layout
   - Hover lift effect (-translate-y-0.5)
   - Selected state with ring
   - Grid responsive layout (2/3/4 cols)
   - Tooltip integration (2s delay)

2. Icon Library (~40 icons)
   - UI/Navigation (9): Info, Check, Chevron, Arrow, Edit, Eye, Close
   - Alert/Status (4): AlertCircle, AlertTriangle, Warning, Sparkles
   - File/Document (4): File, Clipboard, Download, Print
   - Communication (3): Email, MessageSquare, Tag
   - Social Media (10): Facebook, Instagram, LinkedIn, Pinterest, Threads, TikTok, X, YouTube, Social
   - Project Management (3): Asana, Monday, Productive
   - Domain-Specific (8): Audience, Branding, Goals, Strategy, Tone, Website, Video, Custom

**Batch 2: Modal & Overlay Components**
1. Base Modal Structure
   - Fixed overlay with backdrop blur
   - Centered container (max-width, white bg, rounded)
   - Close button (top-right X)
   - Scrollable content area
   - Z-index layering
   - Keyboard interactions (Escape to close)
   - Focus trap

2. Modal Variants
   - **AiDraftModal**: Loading spinner, markdown content, action buttons
   - **PreviewBriefModal**: Tabbed sections, jump-to-step nav, health indicators
   - **ConfirmationModal**: Warning icon, two-button layout, destructive styling
   - **SideDrawer**: Slide-in from right, full height, push/overlay modes

**Batch 3: Navigation & Progress**
1. **ProgressBar Component**
   - Step-based wizard (6 steps)
   - Number/icon, label, completion state per step
   - Connecting lines (filled when completed)
   - Clickable to jump to completed steps
   - Active step with ring highlight
   - Mobile: Simplified horizontal bar

2. **BottomActionBar Component**
   - Fixed bottom positioning
   - Two-section layout: Back (left) + Next/Generate (right)
   - Completion percentage display
   - Color-coded progress: Red (0-30%), Yellow (31-70%), Green (71-100%)
   - Health metrics (Clarity + Brand Match scores)
   - Sticky with backdrop blur

3. **SnapshotSummary Component**
   - Sidebar widget for brief overview
   - Project type badge
   - Key fields: name, budget, timeline
   - Edit/Preview action buttons
   - Embedded or modal variants
   - Live updates as user fills wizard

4. **BriefHealthWidget Component**
   - Two circular progress indicators
   - Clarity Score (0-100)
   - Brand Match Score (0-100)
   - Color-coded: red/yellow/green
   - Tooltip explanations

**Batch 4: Specialized Components**
1. **StakeholderSelector**
   - Person chips with avatar circles (initials)
   - Role labels (Creative Director, Account Manager, etc.)
   - Add/remove functionality
   - Agency vs Client categories
   - Autocomplete for common roles
   - Email validation

2. **ClarityFeedback**
   - Inline guidance messages
   - Context-aware tips
   - Icon indicators (info, warning, success)
   - Expandable/collapsible details
   - Field-adjacent positioning

3. **SummaryPanel**
   - Accordion-style sections
   - Brief data by category
   - Inline editable or jump-to-step
   - Export/print functionality
   - Collapsible with chevron icons

4. **Export/Preview Components**
   - ExportPreviewModal: Format options
   - Print-optimized layout
   - PDF/Word export styling
   - Email template generation

---

## Implementation Approach

### Strategy: Incremental by Category with Quality Gates

**Why This Approach:**
- Ensures accuracy against source components
- Code reviews catch issues early (between batches)
- Clean git history (separate commits per batch)
- Manageable scope per implementation cycle
- Testing can be thorough for each batch

### Workflow Per Batch

1. **Implementation** (Subagent-Driven Development)
   - Fresh subagent implements entire batch
   - Follows source component patterns exactly
   - Creates HTML + CSS + JavaScript as needed
   - Tests all interactive functionality

2. **Code Review** (Code-Reviewer Subagent)
   - Reviews against original React components
   - Verifies visual accuracy
   - Checks interactive behavior
   - Validates responsive breakpoints
   - Identifies any missing states/variants

3. **Fix Issues** (If needed)
   - Address Critical issues immediately
   - Fix Important issues before next batch
   - Document Minor issues for later

4. **Commit**
   - Clean commit message per batch
   - Link to source components reviewed
   - Note any intentional deviations

5. **Repeat** for next batch

---

## Success Criteria

### Per Batch
- [ ] All components from batch documented
- [ ] Interactive demos working
- [ ] Responsive at mobile/tablet/desktop
- [ ] No console errors
- [ ] Code review passed
- [ ] Committed to git

### Overall
- [ ] All 4 batches complete
- [ ] Icon library fully documented (~40 icons)
- [ ] Every wizard component represented
- [ ] Design system is comprehensive reference
- [ ] Navigation updated for new sections

---

## File Locations

### Source Components
- `/Users/wallymo/BriefFlow-Playground-main/components/`
- `/Users/wallymo/BriefFlow-Playground-main/components/ui/`
- `/Users/wallymo/BriefFlow-Playground-main/components/steps/`
- `/Users/wallymo/BriefFlow-Playground-main/components/icons/`

### Target Documentation
- `/Users/wallymo/BriefFlow-Playground-main/design-system.html`

### Implementation Plans (To be created)
- `docs/plans/2025-11-11-batch-1-selection-cards-icons.md`
- `docs/plans/2025-11-11-batch-2-modals-overlays.md`
- `docs/plans/2025-11-11-batch-3-navigation-progress.md`
- `docs/plans/2025-11-11-batch-4-specialized-components.md`

---

## Technical Notes

### Selection Cards Pattern
```tsx
// Source: components/steps/StepOverview.tsx lines 32-48
<button className="group w-full flex flex-col items-center justify-center
  text-center p-md h-32 bg-white border rounded-xl transition-all
  duration-normal shadow-sm cursor-pointer hover:-translate-y-0.5
  hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/50
  ${selected ? 'border-primary ring-2 ring-primary/30' :
    'border-border hover:border-primary hover:ring-2 hover:ring-primary/30'}">
  <Icon className="w-8 h-8 mb-sm text-primary" />
  <span className="text-caption font-semibold">{name}</span>
</button>
```

### Modal Base Pattern
- Fixed overlay: `fixed inset-0 bg-black/50 backdrop-blur-sm`
- Container: `max-w-4xl mx-auto bg-white rounded-xl shadow-xl`
- Animation: Fade + scale on enter/exit
- Focus trap: First/last focusable element cycling

### Icon Sizing
- Small: `size-4` (16px) - inline with text
- Medium: `size-6` (24px) - buttons, chips
- Large: `size-8` (32px) - selection cards, headers
- Extra Large: `size-12` (48px) - empty states, heroes

---

## Next Steps

1. **Create Batch 1 Implementation Plan** (Selection Cards + Icons)
2. **Execute Batch 1** using Subagent-Driven Development
3. **Code Review Batch 1**
4. **Commit Batch 1**
5. Repeat for Batches 2-4

---

## Design Approved By

- User: Confirmed comprehensive approach with quality gates
- Date: November 11, 2025
