"use client"

// wade 2024.12.06 (js-cookie 版本)

import Cookies from "js-cookie"

export function useCookies() {
	const setCookies = (name: string, value: string, days = 7) => {
		Cookies.set(name, value, { expires: days, path: "/" })
	}

	const getCookies = (name: string): string | null => {
		return Cookies.get(name) ?? null
	}

	const updateCookies = (name: string, value: string, days = 7) => {
		if (getCookies(name) !== null) setCookies(name, value, days)
	}

	const deleteCookies = (name: string) => {
		Cookies.remove(name, { path: "/" })
	}

	return { setCookies, getCookies, updateCookies, deleteCookies };
}


// "use client"

// //wade 2024.12.06

// export function useCookies() {

// 	const setCookies = (name: string, value: string, days = 7) => {
// 		const date = new Date();
// 		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
// 		const expires = `expires=${date.toUTCString()}`;
// 		document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/`;
// 	}

// 	const getCookies = (name: string) => {
// 		const cookies = document.cookie.split("; ");

// 		for (const cookie of cookies) {
// 			const [key, value] = cookie.split("=");
// 			if (key === name) return decodeURIComponent(value);
// 		}

// 		return null; // 如果找不到，返回 null
// 	}

// 	const updateCookies = (name: string, value: string, days = 7) =>
// 		getCookies(name) !== null && setCookies(name, value, days);


// 	const deleteCookies = (name: string) => {
// 		document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
// 	}

// 	return { setCookies, getCookies, updateCookies, deleteCookies }

// }
