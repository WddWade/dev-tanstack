import { cn } from '@/utils'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(pages)/analytics/')({
  component: AnalyticsPage,
})

function AnalyticsPage() {
  return <h2 className={cn(
    "text-[10vw]",
    "leading-none",
    "font-medium",
    "uppercase",
    "self-center",
  )}>analytics</h2>
}
