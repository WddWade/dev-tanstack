"use client"

import { useCallback, useEffect, useRef } from "react"

interface PropsTypes {
	active?: boolean
	setActive: React.Dispatch<boolean>
	datas?: any
	index: string
}

const HeadersNavigationsDropdowns: React.FC<PropsTypes> = ({
	active,
	setActive,
	datas,
	index
}) => {
	const dropdownRef = useRef<HTMLDivElement>(null)

	const closeDropdownHandler = useCallback((e: MouseEvent) => {
		const clickTtarget = e.target as any
		const currentRef = dropdownRef?.current ?? null
		const isDropdown = clickTtarget.hasAttribute("data-navigations-dropdown")

		if (isDropdown || !currentRef || currentRef.contains(clickTtarget)) return

		setActive(false)
		clickEventListener("remove")
	}, [])

	const clickEventListener = useCallback((action: string) => {
		// console.log("clickEventListener", action);
		if (action == "add") return document.addEventListener("click", closeDropdownHandler)
		if (action == "remove") return document.removeEventListener("click", closeDropdownHandler)
	}, [])

	const onMouseLeaveEvent = () => {
		clickEventListener("remove")
		setActive(false)
	}

	useEffect(() => {
		if (active) clickEventListener("add")
		return () => clickEventListener("remove")
	}, [active])

	return (
		<div
			ref={dropdownRef}
			// className={styles.root}
			data-active={active}
			onMouseLeave={onMouseLeaveEvent}
			data-navigations-dropdown
		>{index}</div>
	)
}

HeadersNavigationsDropdowns.displayName = "HeadersNavigationsDropdowns"
export default HeadersNavigationsDropdowns
