import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { PromptProvider } from '@/app/context/PromptContext';

import ChatPage from '@/app/chat/page';

// Mock the ResizeObserver for autoScroll
global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
}

// Mock the fetchLLMResponse function so that it returns null (instead of calling Mistral API)
jest.mock('@/utils/fetchLLMResponse', () => {
    return {
        fetchLLMResponse: async () => {
            return null
        }
    }
})

describe('Chat page', () => {
    it('renders chat messages', async () => {
        render(
            <PromptProvider>
              <ChatPage />
            </PromptProvider>
          )

        const userMessage = 'Hello, how are you?'
        const inputForm = screen.getByPlaceholderText('Type your message here...')
        const button = screen.getByText('Send Message')

        fireEvent.change(inputForm, { target: { value: userMessage } })
        fireEvent.click(button)

        await waitFor(() => {
            const userChat = screen.getByText(userMessage)
            expect(userChat).toBeInTheDocument()
        })
    })

    it('displays loading state for bot response', async () => {
        render(
            <PromptProvider>
              <ChatPage />
            </PromptProvider>
          )

        const userMessage = 'Hello, how are you?'
        const input = screen.getByPlaceholderText('Type your message here...')
        const button = screen.getByText('Send Message')

        fireEvent.change(input, { target: { value: userMessage } })
        fireEvent.click(button)

        await waitFor(() => {
            const messages = screen.queryAllByTestId('chat-bubble-message')
            expect(messages[messages.length - 1].getAttribute('data-loading')).toBe("true")
        })
    })
})