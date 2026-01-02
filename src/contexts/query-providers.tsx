"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useMemo } from 'react'

export function getQueryClient() {
	const queryClient = new QueryClient()
	return { queryClient }
}

export interface QueryProvidersProps {
	children: ReactNode
	queryClient: QueryClient
}

export function QueryProviders({ children, queryClient }: QueryProvidersProps) {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			{/* <ReactQueryDevtools initialIsOpen /> */}
		</QueryClientProvider>
	)
}
