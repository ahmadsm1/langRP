import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { PromptProvider } from '@/app/context/PromptContext';

import Chat from '@/app/chat';

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

// jest.mock('remark', () => ({
//     remark: () => ({
//       use: () => ({
//         process: async (md: string) => ({
//           toString: () => `<div><p>${md}</p></div>`
//         })
//       })
//     })
//   }));
  
// jest.mock('remark-html', () => ({}));

describe('Chat page', () => {
    // Since markdown is being rendered, it is hard to test the remark module
    // it('renders chat messages', async () => {
    //     render(
    //         <PromptProvider>
    //           <Chat prompt='Test' />
    //         </PromptProvider>
    //       )

    //     const userMessage = 'Hello, how are you?'
    //     const inputForm = screen.getByPlaceholderText('Type your message here...')
    //     const button = screen.getByText('Send Message')

    //     fireEvent.change(inputForm, { target: { value: userMessage } })
    //     fireEvent.click(button)

    //     await waitFor(() => {
    //         const userChat = screen.getByText(/Hello, how are you\?/i)
    //         expect(userChat).toBeInTheDocument()
    //     })
    // })

    it('displays loading state for bot response', async () => {
        render(
            <PromptProvider>
              <Chat prompt='Test' />
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