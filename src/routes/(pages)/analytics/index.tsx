import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(pages)/analytics/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(pages)/analytics/"!</div>
}
