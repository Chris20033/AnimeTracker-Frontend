import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, type RenderOptions } from '@testing-library/react'
import { createElement, type ReactElement, type ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'

interface TestProvidersProps {
  children?: ReactNode
  initialEntries?: string[]
}

interface RenderWithProvidersOptions extends Omit<RenderOptions, 'wrapper'> {
  initialEntries?: string[]
}

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
}

function TestProviders({ children, initialEntries = ['/'] }: TestProvidersProps) {
  const queryClient = createTestQueryClient()

  return createElement(
    QueryClientProvider,
    { client: queryClient },
    createElement(MemoryRouter, { initialEntries }, children),
  )
}

export function renderWithProviders(ui: ReactElement, options: RenderWithProvidersOptions = {}) {
  const { initialEntries, ...renderOptions } = options

  return render(ui, {
    wrapper: ({ children }) => createElement(TestProviders, { initialEntries }, children),
    ...renderOptions,
  })
}
