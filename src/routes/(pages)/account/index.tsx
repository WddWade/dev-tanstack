import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(pages)/account/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(pages)/account/"!</div>
}
