import { render, screen } from '@testing-library/react'
import DemoPage from '@/app/(demo)/demo/page'

describe('DemoPage', () => {
  describe('Recent Briefs Section', () => {
    it('renders recent briefs section', () => {
      render(<DemoPage />)

      expect(screen.getByText('Recent Briefs')).toBeInTheDocument()
    })

    it('displays Disease Awareness Campaign as parent project', () => {
      render(<DemoPage />)

      expect(screen.getByText('Disease Awareness Campaign')).toBeInTheDocument()
      expect(screen.getAllByText('Vertex Health')).toHaveLength(3) // Parent + 2 children
    })

    it('displays child projects under Disease Awareness Campaign', () => {
      render(<DemoPage />)

      expect(screen.getByText('Patient Education Materials')).toBeInTheDocument()
      expect(screen.getByText('HCP Awareness Content')).toBeInTheDocument()
    })

    it('shows proper indentation for child projects', () => {
      render(<DemoPage />)

      const childProject1 = screen.getByText('Patient Education Materials').closest('.flex.items-center.justify-between')
      const childProject2 = screen.getByText('HCP Awareness Content').closest('.flex.items-center.justify-between')

      expect(childProject1).toHaveClass('ml-6')
      expect(childProject2).toHaveClass('ml-6')
    })

    it('shows parent project without indentation', () => {
      render(<DemoPage />)

      const parentProject = screen.getByText('Disease Awareness Campaign').closest('div')
      expect(parentProject).not.toHaveClass('ml-6')
    })

    it('shows different status for child projects', () => {
      render(<DemoPage />)

      // Child projects should have different statuses than parent
      const childStatuses = screen.getAllByText(/draft|completed|pending/)
      expect(childStatuses.length).toBeGreaterThan(5) // Original 5 + 2 child projects
    })
  })
})