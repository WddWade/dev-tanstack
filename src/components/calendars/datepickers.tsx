"use client"

import { memo, useEffect, useRef, useState } from "react"
import { Buttons } from "../buttons"
import { Forms } from "../forms"
import { Popovers } from "../popovers"
import { Calendars } from "./calendar"

import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { zhTW } from "date-fns/locale"
import { cn } from "@/utils"

export interface DatepickersProps {
	name?: string
	value?: Date
	placeholder?: string
	disabled?: boolean
	multiple?: boolean
	formComponent?: boolean
	onChange?: (value?: Date) => void
}

interface TriggerButtonPropsType {
	ref?: React.Ref<HTMLButtonElement> | undefined,
	formComponent?: boolean
	children: React.ReactNode
	className?: string
	disabled?: boolean
}

const DatepickersTriggerButton: React.FC<TriggerButtonPropsType> = memo((props) => {

	const { formComponent, children, ...buttonProps } = props

	return (<>
		{formComponent ? <Forms.Control>
			<Buttons
				variant="outline"
				role="datepickers"
				{...buttonProps}
			>
				{children}
			</Buttons>
		</Forms.Control>
			: <Buttons
				variant="outline"
				role="datepickers"
				{...buttonProps}
			>
				{children}
			</Buttons >
		}
	</>)
})

const Datepickers: React.FC<DatepickersProps> = memo(({
	name,
	value,
	placeholder = "Pick a date",
	disabled,
	multiple,
	onChange,
	formComponent
}) => {

	const rootRef = useRef<HTMLButtonElement | null>(null)
	const [open, setOpen] = useState(false)
	const [width, setWidth] = useState(0)

	useEffect(() => {
		if (!open || !rootRef.current) return

		const rootTraget = rootRef.current
		const updateWidth = () => {
			const width = rootTraget.getBoundingClientRect().width
			setWidth(width)
		}
		const resizeObserver = new ResizeObserver(updateWidth)
		resizeObserver.observe(rootTraget)

		updateWidth()

		return () => { resizeObserver.disconnect() }
	}, [open])

	return (
		<Popovers.Root open={open} onOpenChange={setOpen}>
			<Popovers.Trigger asChild>
				<DatepickersTriggerButton
					ref={rootRef}
					className={cn(
						"pl-3",
						"text-left",
						"min-h-9",
						"h-auto",
						"w-full",
						"rounded",
						!value && "text-muted-foreground"
					)}
					formComponent={formComponent}
					disabled={disabled}
				>
					{value ? (
						format(value, "yyyy-MM-dd EEEE", { locale: zhTW })
					) : (
						<span>{placeholder}</span>
					)}
					<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
				</DatepickersTriggerButton>
			</Popovers.Trigger>
			<Popovers.Content
				align="start"
				className="w-full p-0 flexplace-content-center"
				style={{ width: width + "px" }}
			>
				<Calendars.Root
					mode="single"
					selected={value}
					onSelect={(data) => {
						if (data) {
							console.log(format(data, "yyyy/mm/dd"));
						}
						onChange?.(data)
					}}
					disabled={(date) =>
						date > new Date() || date < new Date("1900-01-01")
					}
					captionLayout="dropdown"
				/>
			</Popovers.Content>
		</Popovers.Root>
	)
})

Datepickers.displayName = "Datepickers"
export default Datepickers
