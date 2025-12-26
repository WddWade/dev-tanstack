"use client"

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Popovers } from "../popovers"
import { Commands } from "../commands"
import { Forms } from "../forms"
import { Check, ChevronDown, X } from "lucide-react"
import { Buttons } from "../buttons"
import { cn } from "@/utils"

export interface ComboboxsOptionsType {
	label: string;
	value: string;
	disabled?: boolean;
	keywords?: string[];
}

export interface ComboboxsProps {
	name: string
	value: string | string[]
	placeholder?: string
	searchPlaceholder?: string
	search?: boolean,
	disabled?: boolean
	multiple?: boolean
	max?: number,
	min?: number,
	length?: number,
	formComponent?: boolean
	modal?: boolean
	onChange?: (value: string | string[]) => void
	defaultOptions: ReadonlyArray<ComboboxsOptionsType>
}

interface TriggerButtonPropsType {
	ref?: React.Ref<HTMLButtonElement> | undefined,
	formComponent?: boolean
	children: React.ReactNode
	className?: string
	disabled?: boolean
}

const ComboboxsTriggerButton: React.FC<TriggerButtonPropsType> = memo((props) => {

	const { formComponent, children, ...buttonProps } = props

	return (<>
		{formComponent ?
			<Forms.Control>
				<Buttons
					variant="outline"
					role="combobox"
					{...buttonProps}
				>
					{children}
				</Buttons>
			</Forms.Control>
			: <Buttons
				variant="outline"
				role="combobox"
				{...buttonProps}
			>
				{children}
			</Buttons >
		}
	</>)
})

export interface SelectedsPropsType {
	selecteds?: string | ComboboxsOptionsType[]
	onSelect: (value: string) => void

}

const ComboboxsSelecteds: React.FC<SelectedsPropsType> = memo((props) => {

	const { selecteds, onSelect } = props

	return (<>
		<div className={cn(
			"flex",
			"flex-wrap",
			"gap-x-2",
			"gap-y-2"
		)}>
			{Array.isArray(selecteds)
				? selecteds.map(({ label, value }, key) =>
					<div key={key} className={cn(
						"text-nowrap",
						"flex",
						"items-center",
						"hover:line-through",
						"hover:decoration-2",
						"after:content-[',']",
						"last:after:content-none",
					)}
						onClick={(e) => {
							e.preventDefault()
							e.stopPropagation()
							onSelect(value)
							return
						}}

					>
						{label}
					</div>)
				: <span className="text-muted-foreground">{selecteds}</span>
			}
		</div>
		<ChevronDown className="opacity-50" />
	</>)
}
)

const Comboboxs: React.FC<ComboboxsProps> = memo((props) => {

	const {
		name,
		multiple,
		value = multiple ? [] : "",
		placeholder = "Select Option",
		searchPlaceholder = "Search Option",
		search,
		disabled,
		max,
		min,
		length,
		onChange,
		defaultOptions: options,
		formComponent,
		modal
	} = props

	const rootRef = useRef<HTMLButtonElement | null>(null)
	const [open, setOpen] = useState(false)
	const [width, setWidth] = useState(0)

	const isMultiple = multiple && Array.isArray(value)

	const getSelectedLabels = (value: string | string[]) => {
		if (isMultiple && Array.isArray(value) && value.length) {
			return value
				.map((val) => options.find((option) => option.value == val))
				.reduce((initValue, options) => [...(initValue || []), options], [] as any)
		}
		if (value && value !== "") {
			return options.find((option) => option.value === value)?.label ?? placeholder
		}
	}

	const selecteds = useMemo(() => {
		const selected = getSelectedLabels(value)
		return selected ? selected : placeholder
	}, [value])

	const onSelect = (currentValue: string) => {
		if (isMultiple) {
			const isSelected = value.includes(currentValue)
			const nextValue = isSelected
				? value.filter((val: string) => val !== currentValue)
				: [...new Set([...value, currentValue])]

			onChange?.(nextValue)
			return
		}

		onChange?.(currentValue)
		setOpen(false)
	}

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
		<Popovers.Root open={open} onOpenChange={setOpen} modal={modal}>
			<Popovers.Trigger asChild>
				<ComboboxsTriggerButton
					ref={rootRef}
					className={cn(
						"min-h-9",
						"h-auto",
						"w-full",
						"rounded",
						"justify-between",
					)}
					formComponent={formComponent}
					disabled={disabled}
				>
					<ComboboxsSelecteds
						selecteds={selecteds}
						onSelect={onSelect}
					/>
				</ComboboxsTriggerButton>
			</Popovers.Trigger>
			<Popovers.Content
				className="w-full p-0"
				style={{ width: width + "px" }}
			>
				<Commands.Root>
					{search && <Commands.Input
						placeholder={searchPlaceholder + "..."}
						className="h-9"
					/>}
					<Commands.List>
						<Commands.Empty>No framework found.</Commands.Empty>
						<Commands.Group>
							{options.map((option, key) => (
								<Commands.Item
									key={key}
									onSelect={onSelect}
									value={option?.value}
									keywords={option.keywords || []}
								>
									{option.label}
									<Check
										className={cn(
											"ml-auto",
											"opacity-0",
											isMultiple && value.includes(option.value) && "opacity-100",
											option.value === value && "opacity-100"
										)}
									/>
								</Commands.Item>
							))}
						</Commands.Group>
					</Commands.List>
				</Commands.Root>
			</Popovers.Content>
		</Popovers.Root>
	)
})

Comboboxs.displayName = "Comboboxs"
export default Comboboxs
