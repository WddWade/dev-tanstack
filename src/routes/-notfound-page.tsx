import { useRouterState } from '@tanstack/react-router'

export function NotFoundPage() {
    const pathname = useRouterState({ select: (s) => s.location.pathname })
    console.warn('NOT FOUND pathname:', pathname)

    return <div>404: {pathname}</div>
}
