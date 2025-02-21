import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { PromptProvider } from '@/app/context/PromptContext';

jest.mock("next/navigation", () => ({
    useRouter() {
      return {
        prefetch: () => null
      };
    }
  }));


import Home from '../app/page'
 
describe('Home page', () => {
    it('renders the description text', () => {
        render(
            <PromptProvider>
              <Home />
            </PromptProvider>
          )

        const description = screen.getByText('Practice your language skills through natural conversations')

        expect(description).toBeInTheDocument()
    })
})
