---
task: m-tdd-feature-landing-contact-us
branch: feature/tdd-feature-landing-contact-us
status: completed
started: 2025-01-23
created: 2025-01-23
completed: 2025-01-23
modules: [landing-page, contact-form, ui-components]
tdd_phase: COMPLETE
---

# TDD Feature: Landing Page Contact Us Section

## Task Description

Implement a contact us section for the BriefFlow landing page using Test-Driven Development (TDD) methodology. The section should be integrated into the existing landing page (`apps/landing/src/app/page.tsx`) and follow established design patterns while providing users with a way to contact the BriefFlow team.

## Requirements

- Add a contact section to the existing landing page after the CTA section (before footer)
- Follow TDD approach with comprehensive test coverage
- Use existing UI component patterns (shadcn/ui components like Button, Card, Badge)
- Implement form validation and error handling
- Match the existing design system (gradients, animations, spacing)
- Include form fields: name, email, company, message, and optional phone
- Provide visual feedback for form submission states
- Integrate with existing Framer Motion animations
- Ensure mobile responsiveness
- Add proper accessibility features

## Acceptance Criteria

- [ ] Contact us section appears on landing page in appropriate location
- [ ] Form validates input fields with appropriate error messages
- [ ] Form submission provides success/error feedback
- [ ] Component is fully tested with unit tests
- [ ] Design matches existing landing page aesthetic
- [ ] Section is mobile responsive
- [ ] Animations are consistent with existing page animations
- [ ] Accessibility standards are met (ARIA labels, keyboard navigation)
- [ ] Integration test covers end-to-end user flow

## Context Manifest

### How The Current Landing Page Works

The BriefFlow landing page is built as a comprehensive single-page application using Next.js 15 with React 19, implemented in `/apps/landing/src/app/page.tsx`. The page follows a sophisticated marketing structure designed to convert visitors into trial users through a carefully orchestrated progression of sections.

**Technical Architecture Overview:**
The landing page is a client-side component ("use client") that leverages several key technologies working in concert. The page uses **Framer Motion** for sophisticated scroll-triggered animations, creating a dynamic user experience as visitors progress through sections. Each major section is wrapped in `motion.div` components with `whileInView` triggers, creating staggered animations that fire when content enters the viewport. The animation system uses consistent timing patterns - typically 0.6-second durations with staggered delays (0.1-0.3 seconds) for elements within sections.

**UI Component System:**
The page is built on a **shadcn/ui** foundation with custom components located in `/apps/landing/src/components/ui/`. The core components include:
- `Button` component with comprehensive variant system (default, destructive, outline, secondary, ghost, link) and size variants (default, sm, lg, icon)
- `Card` component for content containers with consistent styling
- `Badge` component for status indicators and section labels
- All components use **class-variance-authority (cva)** for variant management
- **Tailwind CSS v4** provides the styling foundation with custom configuration

**Visual Design Language:**
The landing page employs a consistent visual hierarchy built around:
- **Gradient treatments**: Primary gradients use `from-blue-600 to-purple-600` for headlines and CTAs
- **Background patterns**: Subtle grid overlays with mask-image effects for depth
- **Color-coded sections**: Problem sections use red/orange/yellow themes, solutions use green/blue/purple
- **Typography scale**: Responsive text sizing from `text-4xl md:text-5xl` for major headings down to `text-sm` for metadata
- **Spacing system**: Consistent `py-20` for section spacing, `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` for content containers

**Data and Content Management:**
Statistical claims throughout the page are meticulously sourced and cited following strict guidelines established in the project's CLAUDE.md files. Each statistic includes numbered citations (¹, ², ³, etc.) linking to a comprehensive sources section at the bottom. The sources follow a specific format with organization, publication date, and direct links to original research. This approach ensures credibility and legal protection while building trust with potential customers.

**Current Section Flow and Structure:**
The page follows a conversion-optimized structure:
1. **Navigation Header**: Fixed navigation with brand, nav links, and dual CTAs (Sign In, Start Free Trial)
2. **Hero Section**: Value proposition with dual CTAs (Watch Demo, Start Free Trial) and social proof placeholder
3. **Problem Statement**: Three-column grid highlighting industry pain points with sourced statistics
4. **Solution Section**: Four-column feature grid explaining the AI-powered briefing process
5. **How It Works**: Three-step process visualization with numbered badges and connecting arrows
6. **Pricing Section**: Three-tier pricing grid with feature comparisons and highlighted "Most Popular" option
7. **ROI Calculator**: Interactive-style section with side-by-side before/after comparison and impact calculations
8. **Final CTA Section**: Full-width gradient section with dual CTAs for trial signup and demo booking
9. **Sources Section**: Comprehensive citation list with linked research
10. **Footer**: Company information, quick links, and contact details

**Form Handling Patterns in the Codebase:**
The main application (not the landing page) contains sophisticated form handling patterns that provide guidance for the contact form implementation. In `/app/intake/page.tsx`, there's a comprehensive intake form that demonstrates:
- **React useState** for form state management with object-based state updates
- **Controlled components** using `value={form.fieldName}` and `onChange={onChange}` patterns
- **Form validation** with required fields and client-side validation
- **Loading states** during async operations with disabled submit buttons
- **Error handling** with user-friendly alerts and status feedback
- **Grid-based layouts** for responsive form field arrangement
- **Tailwind CSS** styling patterns for forms: `"mt-1 w-full rounded border p-2"` for inputs

The intake form's `onChange` handler uses a generic pattern: `const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [e.target.name]: e.target.value });` which can be directly adapted for the contact form.

**Animation Integration Patterns:**
Every section on the landing page follows consistent animation patterns that the contact section must match:
- **Initial state**: `initial={{ opacity: 0, y: 30 }}` - content starts invisible and shifted down
- **Animation trigger**: `whileInView={{ opacity: 1, y: 0 }}` - animates to visible when scrolling into view
- **Timing**: `transition={{ duration: 0.6, delay: varies }}` - 0.6-second duration with staggered delays
- **One-time activation**: `viewport={{ once: true }}` - prevents re-animation on scroll up
- **Child element staggering**: Grid items within sections use incremental delays (index * 0.1 or 0.2)

### For Contact Us Implementation: Integration Requirements

Since we're implementing a contact us section using TDD methodology, it needs to integrate seamlessly with the existing landing page architecture while following established patterns.

**Placement and Structure:**
The contact section should be inserted after the final CTA section (line 616) and before the Sources section (line 619). This placement maintains the conversion flow by allowing users who aren't ready for a trial to still engage through contact. The section should follow the established pattern of other landing page sections.

**Form State Management:**
Following the patterns established in `/app/intake/page.tsx`, the contact form should:
- Use React useState for form state management
- Implement controlled components for all form fields
- Include fields: name (required), email (required), company (optional), phone (optional), message (required)
- Use the same onChange pattern: spreading existing form state and updating specific fields
- Implement loading states during form submission
- Provide success/error feedback to users

**Styling Integration:**
The contact section must maintain visual consistency with existing sections:
- Use the same container pattern: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Implement the standard section spacing: `py-20`
- Include a Badge component for section identification
- Use Card components for the form container
- Follow the established gradient patterns for backgrounds or accents
- Maintain responsive grid patterns for form field layout

**Animation Requirements:**
The contact section must integrate with the existing Framer Motion animation system:
- Wrap the section in motion.div with standard viewport trigger animations
- Use consistent timing patterns (0.6-second duration)
- Implement staggered animations for form fields
- Ensure animation fires when section enters viewport
- Follow the established pattern of animating from opacity: 0, y: 30 to opacity: 1, y: 0

**Testing Architecture Considerations:**
Since this is a TDD implementation, the testing strategy must account for:
- **Component isolation**: The contact section should be testable independently of the main page
- **Form validation testing**: Each validation rule needs comprehensive test coverage
- **Animation testing**: Framer Motion components require specialized testing approaches
- **Accessibility testing**: Form accessibility features must be verified programmatically
- **Integration testing**: The contact section's integration with the landing page layout
- **Responsive behavior testing**: Mobile and desktop layouts must be verified

**Testing Framework Setup:**
Currently, the project lacks a testing framework. The TDD implementation will require:
- **Jest** for unit testing framework
- **React Testing Library** for component testing
- **Jest Environment JSDOM** for DOM simulation
- **@testing-library/jest-dom** for custom matchers
- **@testing-library/user-event** for user interaction simulation
- **Framer Motion testing utilities** for animation testing
- **TypeScript test configuration** to match the existing TypeScript setup

### Technical Reference Details

#### Component Interfaces & Signatures

```typescript
// Button Component (from /apps/landing/src/components/ui/button.tsx)
interface ButtonProps extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

// Button Variants
type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";

// Card Component Usage Pattern
<Card className="p-8 border-2 hover:border-blue-300 transition-colors">
  {/* Card content */}
</Card>

// Badge Component Usage Pattern
<Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
  Contact Us
</Badge>

// Motion Component Pattern
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
  {/* Animated content */}
</motion.div>
```

#### Form State Management Pattern

```typescript
// Following /app/intake/page.tsx pattern
const [form, setForm] = useState({
  name: '',
  email: '',
  company: '',
  phone: '',
  message: ''
});

const [loading, setLoading] = useState(false);

const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
  setForm({ ...form, [e.target.name]: e.target.value });

const onSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  // Form submission logic
  setLoading(false);
};
```

#### Styling Patterns

```css
/* Container Pattern */
.section-container {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20;
}

/* Form Input Pattern (from intake page) */
.form-input {
  @apply mt-1 w-full rounded border p-2;
}

/* Grid Layout Pattern */
.form-grid {
  @apply grid grid-cols-1 gap-4 md:grid-cols-2;
}

/* Gradient Background Pattern */
.gradient-bg {
  @apply bg-gradient-to-br from-slate-50 via-white to-blue-50;
}
```

#### Animation Configuration

```typescript
// Section Animation
const sectionAnimation = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true }
};

// Staggered Children Animation
const childAnimation = (index: number) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: index * 0.1 },
  viewport: { once: true }
});
```

#### Testing Configuration Requirements

```json
// jest.config.js requirements
{
  "testEnvironment": "jsdom",
  "setupFilesAfterEnv": ["<rootDir>/jest.setup.js"],
  "moduleNameMapping": {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  }
}

// Package.json testing dependencies needed
{
  "@testing-library/react": "^13.0.0",
  "@testing-library/jest-dom": "^5.16.0",
  "@testing-library/user-event": "^14.0.0",
  "jest": "^29.0.0",
  "jest-environment-jsdom": "^29.0.0",
  "ts-jest": "^29.0.0"
}
```

#### File Locations

- **Main Implementation**: `/apps/landing/src/app/page.tsx` (integrate contact section)
- **Contact Component**: `/apps/landing/src/components/ContactSection.tsx` (if extracted)
- **Tests Directory**: `/apps/landing/__tests__/` or `/apps/landing/src/__tests__/`
- **Test Setup**: `/apps/landing/jest.setup.js`
- **Jest Config**: `/apps/landing/jest.config.js`
- **Package Config**: `/apps/landing/package.json` (add test scripts and dependencies)
- **Existing UI Components**: `/apps/landing/src/components/ui/`
- **Utils**: `/apps/landing/src/lib/utils.ts`

#### Form Validation Requirements

```typescript
// Email validation pattern
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Required field validation
const validateForm = (form: ContactForm): FormErrors => {
  const errors: FormErrors = {};
  
  if (!form.name.trim()) errors.name = 'Name is required';
  if (!form.email.trim()) errors.email = 'Email is required';
  else if (!isValidEmail(form.email)) errors.email = 'Valid email is required';
  if (!form.message.trim()) errors.message = 'Message is required';
  
  return errors;
};
```

#### Accessibility Requirements

```typescript
// Form accessibility attributes
<form aria-label="Contact form">
  <label htmlFor="name" className="sr-only">Full Name</label>
  <input
    id="name"
    name="name"
    aria-required="true"
    aria-invalid={errors.name ? 'true' : 'false'}
    aria-describedby={errors.name ? 'name-error' : undefined}
  />
  {errors.name && (
    <div id="name-error" role="alert" aria-live="polite">
      {errors.name}
    </div>
  )}
</form>
```

This comprehensive context manifest provides everything needed to implement the TDD contact us feature while maintaining consistency with the existing BriefFlow landing page architecture, design patterns, and technical standards.

---

## Work Log

*Work progress will be tracked here as the task progresses.*