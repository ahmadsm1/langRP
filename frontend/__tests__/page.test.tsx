import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { PromptProvider } from '@/app/context/PromptContext';

// Mock the router
jest.mock("next/navigation", () => ({
    useRouter() {
      return {
        prefetch: () => null
      };
    }
  }));

// Mock the font
jest.mock('next/font/local', () => {
    return () => ({ className: 'special-font' })
  })

import Home from '../app/page'
 
describe('Home page', () => {
    it('renders the title text', () => {
        render(
            <PromptProvider>
              <Home />
            </PromptProvider>
          )

        const title = screen.getByText('langRP')
        expect(title).toBeInTheDocument()
    })

    it('renders the description text', () => {
        render(
            <PromptProvider>
              <Home />
            </PromptProvider>
          )

        const description = screen.getByText('Practice your language skills through natural conversations')

        expect(description).toBeInTheDocument()
    })

    it('renders the title with the special font', () => {
        render(
            <PromptProvider>
              <Home />
            </PromptProvider>
          )

        const title = screen.getByText('langRP')
        expect(title).toHaveClass('special-font')
    })
})
