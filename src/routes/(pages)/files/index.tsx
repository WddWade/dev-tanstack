import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(pages)/files/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(pages)/files/"!</div>
}
