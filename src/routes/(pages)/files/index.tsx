import { cn } from '@/utils'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(pages)/files/')({
  component: FilesPage,
})

function FilesPage() {
  return <h2 className={cn(
    "text-[10vw]",
    "leading-none",
    "font-medium",
    "uppercase",
    "self-center",
  )}>files</h2>
}
