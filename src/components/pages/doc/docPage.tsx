import {
	ViewTransition
} from "react";
import { cn } from "@/utils";

export default function DocPage() {
	return (
		<ViewTransition name={`page`}>
			<h2 className={cn(
				"text-[15vw]",
				"leading-none",
				"font-medium",
				"uppercase",
				"self-center",
			)}>Document</h2>
		</ViewTransition>
	)
};
