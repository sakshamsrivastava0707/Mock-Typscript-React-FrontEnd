import { render, screen } from '@testing-library/react'
import App from '../../App'

test('renders Users Heading', () => {
    // Test to check Heading 'Users' in document
    render(<App />)
    const heading = screen.getByText(/Users/i)
    expect(heading).toBeInTheDocument()
})
