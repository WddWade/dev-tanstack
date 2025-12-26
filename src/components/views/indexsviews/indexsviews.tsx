"use client"

import { cn } from "@/utils"
// import { useParams } from "next/navigation"

interface PropsTypes { }

const IndexsViews: React.FC<PropsTypes> = (props) => {

	// const { units } = useParams()
	// if (units == "about") return null

	return (
		<div className={cn(
			"w-full",
			"flex",
			"justify-center",
			"items-center",
			"bg-background",
		)}>
			{/* <h2 className={cn(
				"text-[4vw]",
				"leading-none",
				"font-light",
				"self-center",
			)}>{units}</h2> */}
		</div>
	)
}

IndexsViews.displayName = "IndexsViews"
export default IndexsViews
