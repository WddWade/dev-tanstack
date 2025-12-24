import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(pages)')({
    component: RouteLayout,
})

function RouteLayout() {
    return (
        <main>
            <Outlet />
        </main>
    )
}
