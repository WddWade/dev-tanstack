import { cn } from '@/utils'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(pages)/test/')({
  component: TestPage,
})

function TestPage() {
  return <h2 className={cn(
    "text-[10vw]",
    "leading-none",
    "font-medium",
    "uppercase",
    "self-center",
  )}>test</h2>
}
