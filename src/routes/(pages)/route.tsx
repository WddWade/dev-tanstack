// import { HeadersViews } from '@/components'
import { HeadersViews } from '@/components/views'
import { BootsProviders } from '@/libs/boots-query'
import { cn } from '@/utils'
import { ClientOnly, createFileRoute, Outlet } from '@tanstack/react-router'
import { createMiddleware, createServerFn } from '@tanstack/react-start'
import { getCookies } from '@tanstack/react-start/server'


const getServerTime = createServerFn()
    .handler(async () => {
        // This runs only on the server
        const cookies = getCookies()
        return { date: new Date().toISOString(), cookies }
    })

export const Route = createFileRoute('/(pages)')({
    loader: () => getServerTime(),
    component: RouteLayout,
})

function RouteLayout() {
    const data = Route.useLoaderData()
    console.log("object", data);
    return (
        <BootsProviders value={{ resizeStores: "" }}>
            <header className={cn("w-screen", "h-headers")}>
                <HeadersViews />
            </header>
            <main className={cn("w-full", "h-main", "flex", "items-start", "justify-center")}>
                <Outlet />
            </main>
        </BootsProviders >
    )
}
