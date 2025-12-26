"use client"

import { memo } from "react"
import { LoadersSpinners, LoadersSpinnersProps } from "@/components"
import { AnimatePresence, motion } from "motion/react"
import { cn } from "@/utils"

interface PropsTypes extends LoadersSpinnersProps {
	active?: boolean
	fullScreen?: boolean
}

const Loaders: React.FC<PropsTypes> = memo((props) => {

	const { active, fullScreen } = props

	return (
		<>
			{fullScreen
				? <AnimatePresence>
					{active && <motion.div
						initial={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className={cn(
							"h-[inherit]",
							"w-full",
							"flex",
							"justify-center",
							"items-center",
							"overflow-hidden",
							"bg-white",
							"absolute",
							"z-2",
						)}
					>
						<LoadersSpinners {...props} />
					</motion.div>}
				</AnimatePresence>
				: <LoadersSpinners {...props} />
			}
		</>
	)
})

Loaders.displayName = "Loaders"
export default Loaders
