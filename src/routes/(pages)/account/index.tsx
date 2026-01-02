import { cn } from '@/utils'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(pages)/account/')({
  component: AccountPage,
})

function AccountPage() {
  return <h2 className={cn(
    "text-[10vw]",
    "leading-none",
    "font-medium",
    "uppercase",
    "self-center",
  )}>account</h2>
}
