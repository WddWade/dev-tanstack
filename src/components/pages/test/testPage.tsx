import {
	ViewTransition
} from "react";
import { cn } from "@/utils";

export default async function TestPage() {
	return (
		<ViewTransition name={`page`}>
			<h2 className={cn(
				"text-[15vw]",
				"leading-none",
				"font-medium",
				"uppercase",
				"self-center",
			)}>Text</h2>
		</ViewTransition>
	)
};
