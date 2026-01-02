import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(pages)/cms/$sites/$contents')({
  component: RouteComponent,
})

function RouteComponent() {
  const { sites, contents } = Route.useParams()
  return <div>Hello "/(pages)/cms/{sites}/{contents}"!</div>
}
