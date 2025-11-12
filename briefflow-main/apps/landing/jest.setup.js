import '@testing-library/jest-dom'

// Mock Framer Motion for testing
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, initial, whileInView, transition, viewport, animate, ...props }) => <div {...props}>{children}</div>,
    section: ({ children, initial, whileInView, transition, viewport, animate, ...props }) => <section {...props}>{children}</section>,
    form: ({ children, initial, whileInView, transition, viewport, animate, ...props }) => <form {...props}>{children}</form>,
  },
  AnimatePresence: ({ children }) => children,
}))

// Mock Next.js router if needed
jest.mock('next/router', () => require('next-router-mock'))

// Setup window.matchMedia for responsive testing
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})