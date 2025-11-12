import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactSection from '@/components/ContactSection'

describe('ContactSection', () => {
  describe('Component Rendering', () => {
    it('renders contact section with badge label', () => {
      render(<ContactSection />)

      expect(screen.getByText('Contact Us')).toBeInTheDocument()
    })

    it('renders form with required fields', () => {
      render(<ContactSection />)

      expect(screen.getByLabelText(/name \*/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/email \*/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/message \*/i)).toBeInTheDocument()
    })

    it('renders form with optional fields', () => {
      render(<ContactSection />)

      expect(screen.getByLabelText(/company/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/phone/i)).toBeInTheDocument()
    })

    it('renders submit button', () => {
      render(<ContactSection />)

      expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
    })

    it('uses shadcn/ui Card component structure', () => {
      render(<ContactSection />)

      const cardElement = screen.getByTestId('contact-card')
      expect(cardElement).toBeInTheDocument()
      expect(cardElement).toHaveClass('border-2') // shadcn Card styling
    })
  })

  describe('Form Validation', () => {
    it('shows validation error when name is empty on submit', async () => {
      const user = userEvent.setup()
      render(<ContactSection />)

      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)

      expect(screen.getByText('Name is required')).toBeInTheDocument()
    })

    it('shows validation error when email is empty on submit', async () => {
      const user = userEvent.setup()
      render(<ContactSection />)

      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)

      expect(screen.getByText('Email is required')).toBeInTheDocument()
    })

    it('shows validation error when message is empty on submit', async () => {
      const user = userEvent.setup()
      render(<ContactSection />)

      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)

      expect(screen.getByText('Message is required')).toBeInTheDocument()
    })

    it('shows validation error for invalid email format', async () => {
      const user = userEvent.setup()
      render(<ContactSection />)

      const nameInput = screen.getByLabelText(/name \*/i)
      const emailInput = screen.getByLabelText(/email \*/i)
      const messageInput = screen.getByLabelText(/message \*/i)
      const form = screen.getByRole('form', { name: /contact form/i })

      // Fill required fields but with invalid email
      await user.type(nameInput, 'John Doe')
      await user.type(emailInput, 'invalid-email')
      await user.type(messageInput, 'Test message')

      // Submit form directly
      fireEvent.submit(form)

      // Wait for validation to complete
      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
      }, { timeout: 1000 })
    })

    it('clears validation errors when user starts typing', async () => {
      const user = userEvent.setup()
      render(<ContactSection />)

      const nameInput = screen.getByLabelText(/name \*/i)
      const submitButton = screen.getByRole('button', { name: /send message/i })

      // Trigger validation error
      await user.click(submitButton)
      expect(screen.getByText('Name is required')).toBeInTheDocument()

      // Start typing to clear error
      await user.type(nameInput, 'John')
      expect(screen.queryByText('Name is required')).not.toBeInTheDocument()
    })

    it('does not show validation errors for optional fields', async () => {
      const user = userEvent.setup()
      render(<ContactSection />)

      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)

      expect(screen.queryByText(/company.*required/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/phone.*required/i)).not.toBeInTheDocument()
    })
  })

  describe('Form State Management', () => {
    it('updates form values when user types', async () => {
      const user = userEvent.setup()
      render(<ContactSection />)

      const nameInput = screen.getByLabelText(/name \*/i)
      const emailInput = screen.getByLabelText(/email \*/i)

      await user.type(nameInput, 'John Doe')
      await user.type(emailInput, 'john@example.com')

      expect(nameInput).toHaveValue('John Doe')
      expect(emailInput).toHaveValue('john@example.com')
    })

    it('form fields are controlled components', () => {
      render(<ContactSection />)

      const nameInput = screen.getByLabelText(/name \*/i)
      const emailInput = screen.getByLabelText(/email \*/i)

      expect(nameInput).toHaveValue('')
      expect(emailInput).toHaveValue('')
    })
  })

  describe('Form Submission', () => {
    it('submits form with valid data', async () => {
      const user = userEvent.setup()
      render(<ContactSection />)

      // Fill in required fields
      await user.type(screen.getByLabelText(/name \*/i), 'John Doe')
      await user.type(screen.getByLabelText(/email \*/i), 'john@example.com')
      await user.type(screen.getByLabelText(/message \*/i), 'Test message')

      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)

      // Check loading state
      expect(screen.getByRole('button', { name: /sending/i })).toBeInTheDocument()

      // Wait for success state
      await waitFor(() => {
        expect(screen.getByText('Thank you for your message!')).toBeInTheDocument()
      })
    })

    it('shows loading state during submission', async () => {
      const user = userEvent.setup()
      render(<ContactSection />)

      // Fill in required fields
      await user.type(screen.getByLabelText(/name \*/i), 'John Doe')
      await user.type(screen.getByLabelText(/email \*/i), 'john@example.com')
      await user.type(screen.getByLabelText(/message \*/i), 'Test message')

      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)

      expect(submitButton).toBeDisabled()
      expect(screen.getByText('Sending...')).toBeInTheDocument()
    })

    it('resets form after successful submission', async () => {
      const user = userEvent.setup()
      render(<ContactSection />)

      // Fill in fields
      const nameInput = screen.getByLabelText(/name \*/i)
      const emailInput = screen.getByLabelText(/email \*/i)
      const messageInput = screen.getByLabelText(/message \*/i)

      await user.type(nameInput, 'John Doe')
      await user.type(emailInput, 'john@example.com')
      await user.type(messageInput, 'Test message')

      // Submit form
      await user.click(screen.getByRole('button', { name: /send message/i }))

      // Wait for success state
      await waitFor(() => {
        expect(screen.getByText('Thank you for your message!')).toBeInTheDocument()
      }, { timeout: 2000 })

      // Click "Send Another Message" to return to form
      await user.click(screen.getByRole('button', { name: /send another message/i }))

      // Wait for form to appear again and verify it's reset
      await waitFor(() => {
        expect(screen.getByLabelText(/name \*/i)).toBeInTheDocument()
      })

      expect(screen.getByLabelText(/name \*/i)).toHaveValue('')
      expect(screen.getByLabelText(/email \*/i)).toHaveValue('')
      expect(screen.getByLabelText(/message \*/i)).toHaveValue('')
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA labels for form', () => {
      render(<ContactSection />)

      const form = screen.getByRole('form', { name: /contact form/i })
      expect(form).toBeInTheDocument()
    })

    it('has proper ARIA attributes for required fields', () => {
      render(<ContactSection />)

      const nameInput = screen.getByLabelText(/name \*/i)
      const emailInput = screen.getByLabelText(/email \*/i)
      const messageInput = screen.getByLabelText(/message \*/i)

      expect(nameInput).toHaveAttribute('aria-required', 'true')
      expect(emailInput).toHaveAttribute('aria-required', 'true')
      expect(messageInput).toHaveAttribute('aria-required', 'true')
    })

    it('has proper ARIA attributes for error states', async () => {
      const user = userEvent.setup()
      render(<ContactSection />)

      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)

      const nameInput = screen.getByLabelText(/name \*/i)
      expect(nameInput).toHaveAttribute('aria-invalid', 'true')
      expect(nameInput).toHaveAttribute('aria-describedby', 'name-error')

      const nameErrorMessage = screen.getByText('Name is required')
      expect(nameErrorMessage).toHaveAttribute('role', 'alert')
      expect(nameErrorMessage).toHaveAttribute('aria-live', 'polite')
    })
  })
})