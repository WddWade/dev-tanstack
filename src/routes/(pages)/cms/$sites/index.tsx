import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(pages)/cms/$sites/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { sites } = Route.useParams()
  return <div>Hello "/(pages)/cms/{sites}"!
    <Outlet />
  </div>
}
