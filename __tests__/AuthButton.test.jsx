import { render, screen, fireEvent, act } from '@testing-library/react'
import { AuthMenu } from '../components/common'
import { useSession, signIn, signOut } from 'next-auth/react'
import userEvent from '@testing-library/user-event'

// Mock NextAuth functions
jest.mock('next-auth/react')

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />
  },
}))

// Mock Lucide icons
jest.mock('lucide-react', () => ({
  User: () => <div data-testid="user-icon" />,
  LogOut: () => <div data-testid="logout-icon" />,
}))

// Mock ShadCN components
jest.mock('../components/ui/shadcn/button', () => ({
  Button: ({ children, onClick, className }) => (
    <button onClick={onClick} className={className} data-testid="button">
      {children}
    </button>
  ),
}))

jest.mock('../components/ui/shadcn/dropdown-menu', () => {
  const originalModule = jest.requireActual('../components/ui/shadcn/dropdown-menu')
  return {
    ...originalModule,
    DropdownMenu: ({ children }) => <div data-testid="dropdown-menu">{children}</div>,
    DropdownMenuTrigger: ({ children }) => (
      <div data-testid="dropdown-trigger">{children}</div>
    ),
    DropdownMenuContent: ({ children }) => (
      <div data-testid="dropdown-content">{children}</div>
    ),
    DropdownMenuLabel: ({ children }) => (
      <div data-testid="dropdown-label">{children}</div>
    ),
    DropdownMenuItem: ({ children, onClick }) => (
      <div onClick={onClick} data-testid="dropdown-item">
        {children}
      </div>
    ),
    DropdownMenuSeparator: () => <div data-testid="dropdown-separator" />,
  }
})

describe('AuthMenu Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders login button when not authenticated', () => {
    ;(useSession).mockReturnValue({ data: null })
    render(<AuthMenu />)

    const loginButton = screen.getByText(/login/i)
    expect(loginButton).toBeInTheDocument()
  })

  test('clicking login button triggers signIn', () => {
    ;(useSession).mockReturnValue({ data: null })
    render(<AuthMenu />)

    const loginButton = screen.getByText(/login/i)
    fireEvent.click(loginButton)

    expect(signIn).toHaveBeenCalledWith('descope')
  })

  test('renders user image and name when authenticated', () => {
    const sessionData = {
      user: { name: 'John Doe', image: '/user.jpg' },
    }
    ;(useSession).mockReturnValue({ data: sessionData })

    render(<AuthMenu />)

    const userImage = screen.getByAltText('user icon')
    expect(userImage).toBeInTheDocument()
  })

  test('clicking logout button triggers signOut', async () => {
    const sessionData = {
      user: { name: 'John Doe', image: '/user.jpg' },
    }
    ;(useSession).mockReturnValue({ data: sessionData })

    render(<AuthMenu />)

    const userImage = screen.getByAltText('user icon')
    await userEvent.click(userImage)

    const logoutButton = await screen.findByText(/logout/i)
    fireEvent.click(logoutButton)

    expect(signOut).toHaveBeenCalledWith('descope')
  })

  test('handles missing user data', () => {
    const sessionData = {
      user: { name: undefined, image: undefined },
    }
    ;(useSession).mockReturnValue({ data: sessionData })

    render(<AuthMenu />)

    const userImage = screen.getByAltText('user icon')
    expect(userImage).toBeInTheDocument()
    expect(screen.queryByText('undefined')).not.toBeInTheDocument()
  })

  test('login button has correct styles and classes', () => {
    ;(useSession).mockReturnValue({ data: null })

    render(<AuthMenu />)

    const loginButton = screen.getByText(/login/i)
    expect(loginButton).toHaveClass('rounded-full')
    expect(loginButton).toHaveClass('text-white')
    expect(loginButton).toHaveClass('hover:bg-sky-600')
  })

  test('renders dropdown menu items when authenticated', async () => {
    const sessionData = {
      user: { name: 'John Doe', image: '/user.jpg' },
    }
    ;(useSession).mockReturnValue({ data: sessionData })

    render(<AuthMenu />)

    const userImage = screen.getByAltText('user icon')
    await userEvent.click(userImage)

    expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument()
    expect(screen.getByTestId('dropdown-content')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Account')).toBeInTheDocument()
    expect(screen.getByText('Logout')).toBeInTheDocument()
  })
})