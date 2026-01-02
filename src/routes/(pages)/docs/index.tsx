import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(pages)/docs/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(pages)/docs/"!</div>
}
