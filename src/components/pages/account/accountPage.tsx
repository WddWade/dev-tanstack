import {
	ViewTransition
} from "react";
import { cn } from "@/utils";

export default function AccountPage() {
	return (
		<ViewTransition name={`page`}>
			<h2 className={cn(
				"text-[15vw]",
				"leading-none",
				"font-medium",
				"uppercase",
				"self-center",
			)}>Account</h2>
		</ViewTransition>
	)
};
