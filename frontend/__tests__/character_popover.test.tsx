import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { AddCharPopover } from '@/app/character_popover'
import { PromptProvider } from '@/app/context/PromptContext'

// Mock the useToast hook and (later) see if it matches the error toast in the character popover
const mockToast = jest.fn()
jest.mock('@/hooks/use-toast', () => ({
    useToast: () => ({
        toast: mockToast
    })
  }));

// Wrap the children in the PromptProvider
const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <PromptProvider>{children}</PromptProvider>
)

describe('AddCharPopover', () => {
    const onCharacterAdd = jest.fn()
    const onOpenChange = jest.fn()

    const renderComponent = (open: boolean) => {
        render(
            <Wrapper>
                <AddCharPopover
                    onCharacterAdd={onCharacterAdd}
                    open={open}
                    onOpenChange={onOpenChange}
                />
            </Wrapper>
        )
    }

    it('renders Add button', () => {
        renderComponent(false)
        expect(screen.getByText('Add')).toBeInTheDocument()
    })

    it('opens popover on Add button click', () => {
        renderComponent(false)
        fireEvent.click(screen.getByText('Add'))
        expect(onOpenChange).toHaveBeenCalledWith(true)
    })

    it('renders input fields when popover is open', () => {
        renderComponent(true)
        expect(screen.getByLabelText('Name')).toBeInTheDocument()
        expect(screen.getByLabelText('Description')).toBeInTheDocument()
    })

    it('calls onCharacterAdd with correct data', () => {
        renderComponent(true)
        fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } })
        fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'A customer waiting in line' } })
        fireEvent.click(screen.getByTestId('add-character-button'))
        expect(onCharacterAdd).toHaveBeenCalledWith({
            name: 'John Doe',
            description: 'A customer waiting in line',
        })
    })

    it('shows error toast when inputs are empty', async () => {
        renderComponent(true);
        fireEvent.click(screen.getByTestId('add-character-button'));
        // We want to check if the toast popped up. Normall,y we can just do an await screen.findByText() but that isn't
        // working. What works is to set a 0 second timeout becaues then it finally manages to find the text in the DOM 
        // (idk bro dont ask me). So instead, we mock the useToast hook at the start of the file and then check if it 
        // was called with the correct parameters.

        // setTimeout(() => {
        //     expect(screen.findByText('Please enter both a name and description for the character.')).toBeInTheDocument();
        // }, 0);

        expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
            variant: "destructive",
            title: "Error",
            description: "Please enter both a name and description for the character."
        }));

    });
});
