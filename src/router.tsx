import { createRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { routeTree } from './routeTree.gen'
import { NotFoundPage } from './routes/-notfound-page'
import { getQueryClient, QueryProviders } from './contexts'

export const getRouter = () => {
  const { queryClient } = getQueryClient()

  const router = createRouter({
    routeTree,
    defaultNotFoundComponent: () => <NotFoundPage />,
    context: { queryClient },
    defaultPreload: 'intent',
    Wrap: (props: { children: React.ReactNode }) => {
      return (
        <QueryProviders queryClient={queryClient}>
          {props.children}
        </QueryProviders>
      )
    },
  })

  setupRouterSsrQueryIntegration({ router, queryClient: queryClient })

  return router
}
