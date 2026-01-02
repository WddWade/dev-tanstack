import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(pages)/cms/')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/(pages)/cms/"!</div>
}
