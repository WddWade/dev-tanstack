import { createFileRoute } from '@tanstack/react-router'
import {
  Zap,
  Server,
  Route as RouteIcon,
  Shield,
  Waves,
  Sparkles,
} from 'lucide-react'

import { cn } from "@/utils"

export const Route = createFileRoute('/(pages)/')({
  component: IndexPage
})

function IndexPage() {
  return (
    <h2 className={cn(
      "text-[15vw]",
      "leading-none",
      "font-medium",
      "uppercase",
      "self-center",
    )}>Index</h2>
  )
}
