import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/login')({
    component: AuthsLayout,
})

function AuthsLayout() {
    return (
        <main>
            <Outlet />
        </main>
    )
}
