import { cn } from '@/utils'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(pages)/dashboard/')({
  component: DashboardPage,
})

function DashboardPage() {
  return <h2 className={cn(
    "text-[10vw]",
    "leading-none",
    "font-medium",
    "uppercase",
    "self-center",
  )}>dashboard</h2>
}
