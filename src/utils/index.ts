import { lock, clearBodyLocks } from "tua-body-scroll-lock"
import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(...inputs));
}

export const regexParse = (regexString: string, flags?: string): RegExp | String => {
	const regex = regexString.replace(/\\\\/g, "\\")
	try {
		return new RegExp(regex)
	} catch (e) {
		console.error("Invalid regular expression:", regexString, e)
		return regexString
	}
}

export const regexReplaceEach = (
	currentValue: string,
	replace: { pattern: string, flags?: string }[]
): string =>
	replace.reduce((current, regexs) => {
		const regexPattern = regexParse(regexs.pattern, regexs.flags)
		return regexPattern instanceof RegExp
			? current.replace(regexPattern, "")
			: current
	}, currentValue)

export const mediaRatio = (width: number, height: number) =>
	Number(width) && Number(height)
		? Math.round(height / width * 10000) / 100 + "%"
		: "100%"

export const sleep = (time: number): Promise<void> =>
	new Promise<void>((resolve) => setTimeout(resolve, time))

export const querySearchWord = (str: string) => str.trim().toLowerCase()

export const lockBody = (
	active: boolean,
	stillScrollHTMLElement?: HTMLElement | HTMLElement[] | null | undefined
): void => {
	document.body.style.overflow = active ? "visible" : ""
	active ? lock(stillScrollHTMLElement) : clearBodyLocks()
}

export const mergeClassName = (...argements: (string | number | boolean)[]): string =>
	argements.toString().replace(/,/g, " ").replace(/\s+/g, " ").trim()

export const getSearchParams = (searchParams: URLSearchParams) => {
	const params: any = {}
	searchParams.forEach((value: any, key: any) => { params[key] = value })
	return params
}

// export const getDomTransTime = (target: HTMLElement): number => {
//     const computedStyle = window.getComputedStyle(target)
//     const transNumber = (time: string) => {
//         if (time.endsWith("ms")) return parseFloat(time)
//         if (time.endsWith("s")) return parseFloat(time) * 1000
//         return 0
//     }
//     const durations = computedStyle.transitionDuration.split(',').map(transNumber)
//     const delays = computedStyle.transitionDelay.split(',').map(transNumber)
//     return Math.max(...durations.map((d, i) => d + (delays[i] || 0)))
// }

export const getDomTransTime = (target: HTMLElement): number => {
	if (!target) return 0

	const computedStyle = window.getComputedStyle(target)

	const parseTime = (timeStr: string): number => {
		timeStr = timeStr.trim()
		if (timeStr.endsWith("ms")) return parseFloat(timeStr)
		if (timeStr.endsWith("s")) return parseFloat(timeStr) * 1000
		return 0
	}

	const durations = computedStyle.transitionDuration.split(",").map(parseTime)
	const delays = computedStyle.transitionDelay.split(",").map(parseTime)
	const maxLength = Math.max(durations.length, delays.length)

	return Math.max(
		...Array.from({ length: maxLength }, (_, i) => (durations[i] || 0) + (delays[i] || 0))
	)
}

export const getURLSearchParams = (searchParams: URLSearchParams) => {
	const params: any = {}
	searchParams.forEach((value: any, key: any) => { params[key] = value })
	return new URLSearchParams({ ...params })
}

