import {
  ClientOnly,
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import { TanStackDevtools } from "@tanstack/react-devtools"

import { QueryProviders, ThemeProvider } from "@/contexts"
import { Toaster as GlobalsToaster, GlobalsAlerts, GlobalsOverlays } from "@/components"
import { cn } from "@/utils"

import appCss from "@/styles/globals.css?url"
import type { QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools"

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [{
      charSet: "utf-8",
    }, {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    }, {
      title: "TanStack Start Starter",
    },],
    links: [{
      rel: "stylesheet",
      href: appCss,
    }]
  }),
  shellComponent: RootDocument,
})

function RootDocument({
  children
}: {
  children: React.ReactNode
}) {

  const devtoolsPlugin = [{
    name: "Tanstack Router",
    render: <TanStackRouterDevtoolsPanel />,
  }, {
    name: 'Tanstack Query',
    render: <ReactQueryDevtoolsPanel />,
  }]

  return (
    <html
      lang="en"
      data-mode="system"
      style={{ colorScheme: "light" }}
      suppressHydrationWarning
    >
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider
          attribute="data-mode"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <GlobalsToaster theme="light" position="top-right" richColors />
        <GlobalsAlerts />
        <GlobalsOverlays />
        <TanStackDevtools
          config={{ position: "bottom-right" }}
          plugins={devtoolsPlugin}
        />
        <Scripts />
      </body>
    </html>
  )
}
