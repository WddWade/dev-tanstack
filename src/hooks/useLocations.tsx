"use client"

import { useEffect, useRef, useState } from "react"

interface LocationState {
	hash: string;
	host: string;
	hostname: string;
	href: string;
	origin: string;
	pathname: string;
	port: string;
	protocol: string;
	search: string;
};

export function useLocations(): LocationState {

	const [locations, setLocations] = useState<LocationState>({
		hash: "",
		host: "",
		hostname: "",
		href: "",
		origin: "",
		pathname: "",
		port: "",
		protocol: "",
		search: "",
	})

	const getLocationValue = () => {
		setLocations({ ...window.location })
	}

	useEffect(() => {
		if (typeof window === "undefined") return;
		getLocationValue();
	}, [])

	return locations
}
