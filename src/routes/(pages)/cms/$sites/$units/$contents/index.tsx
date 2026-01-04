import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(pages)/cms/$sites/$units/$contents/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(pages)/cms/$sites/$units/$contents/"!</div>
}
