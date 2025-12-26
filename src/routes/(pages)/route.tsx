// import { HeadersViews } from '@/components'
import { HeadersViews } from '@/components/views'
import { cn } from '@/utils'
import { ClientOnly, createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(pages)')({
    component: RouteLayout,
})

function RouteLayout() {
    return (
        <>
            <header className={cn("w-screen", "h-headers")}>
                {/* <ClientOnly fallback={null}> */}
                headers
                {/* <HeadersViews /> */}
                {/* </ClientOnly> */}
            </header>
            <main className={cn("w-full", "h-main", "flex", "items-start", "justify-center")}>
                <Outlet />
            </main>
        </>
    )
}
