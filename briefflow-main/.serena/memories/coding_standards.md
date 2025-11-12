# BriefFlow Coding Standards & Conventions

## Code Style

### TypeScript Standards
- Strict TypeScript configuration enabled
- Interface definitions for all component props and API responses
- Proper type annotations for function parameters and returns
- Use of const assertions where appropriate

### React Patterns
- Functional components with hooks
- Controlled components for form inputs
- useState for local component state
- useEffect for side effects and cleanup
- Proper dependency arrays in hooks

### Form Handling Pattern
```typescript
// Standard form state management
const [form, setForm] = useState({
  field1: '',
  field2: ''
});

const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
  setForm({ ...form, [e.target.name]: e.target.value });
```

### Component Structure
- Import organization: React, Next.js, external libs, internal components, types
- Component props defined as interfaces
- Export default for main components
- Consistent naming: PascalCase for components, camelCase for functions

### shadcn/ui Integration
- Use established UI components (Button, Card, Badge)
- Follow variant patterns with class-variance-authority
- Maintain consistent spacing and styling patterns

### Animation Standards (Framer Motion)
- Consistent animation timing: 0.6s duration
- Standard initial/animate states: opacity: 0, y: 30 → opacity: 1, y: 0
- Staggered delays for grid items (0.1-0.3s increments)
- `viewport={{ once: true }}` to prevent re-animation

### CSS/Tailwind Conventions
- Mobile-first responsive design
- Consistent container patterns: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Section spacing: `py-20`
- Gradient patterns: `from-blue-600 to-purple-600` for primary elements
- Hover effects and transitions for interactive elements

### Testing Standards
- Jest + React Testing Library
- Test file naming: `ComponentName.test.tsx`
- Comprehensive test categories:
  - Component rendering
  - Form validation  
  - State management
  - User interactions
  - Accessibility
- Use of data-testid for complex component testing
- Async testing with waitFor for loading states

### Accessibility Requirements
- Proper ARIA labels and roles
- aria-required for required form fields
- aria-invalid for error states
- aria-describedby for error messages
- role="alert" and aria-live="polite" for error announcements
- Semantic HTML structure
- Keyboard navigation support

### File Organization
- Components in `/src/components/`
- UI components in `/src/components/ui/`
- Tests in `/__tests__/` or `src/__tests__/`
- Utilities in `/src/lib/`
- Pages/routes in `/src/app/`

### Naming Conventions
- Files: PascalCase for components, camelCase for utilities
- Variables: camelCase
- Constants: SCREAMING_SNAKE_CASE
- CSS classes: kebab-case (Tailwind standard)
- Test descriptions: descriptive strings in sentence case