import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(pages)/cms/$sites')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    sideviews
    <Outlet />
  </div>
}
