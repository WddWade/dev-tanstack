"use client"

import { useRouter } from "next/navigation"
import { cn } from "@/utils"

export default function NotFoundsPage() {

	const router = useRouter()

	return (
		<div className="flex flex-col justify-center px-20 h-screen gap-y-10">
			<section>
				<h2 className={cn("text-[15vw] leading-none")}>404</h2>
				<p className="text-4xl">Could not find requested resource.</p>
			</section>
			<section className={cn(
				"flex",
				"gap-x-4",
				"[&_button]:border",
				"[&_button]:rounded",
				"[&_button]:cursor-pointer",
				"[&_button]:px-5",
				"[&_button]:py-3",
			)}>
				<button onClick={() => router.forward()}>BACK TO PAGE</button>
				<button onClick={() => router.push("/")}>GO TO LEADING PAGE</button>
			</section>
		</div>
	)
}
