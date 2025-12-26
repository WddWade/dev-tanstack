import {
	ViewTransition
} from "react";
import { cn } from "@/utils";

export default async function DashboardPage() {
	return (
		<ViewTransition name={`page`}>
			<h2 className={cn(
				"text-[15vw]",
				"leading-none",
				"font-medium",
				"uppercase",
				"self-center",
			)}>Dashboard</h2>
		</ViewTransition>
	)
};
