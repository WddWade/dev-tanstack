export const R_SESSION = "wdd_laravel_1103_session"
export const R_SESSION_ARRAY = ["wdd_laravel_1103_session"]

export const C_SESSION = "beones_session"
export const C_SESSION_PASSWORD = "ChangeThisBeforeShippingToProdOrYouWillBeFired"
export const C_SESSION_MAX_AGE = 86400
export const C_SESSION_COOKIE = {
	httpOnly: true,
	sameSite: "lax",
	secure: process.env.NODE_ENV === "production",
	path: '/',
	maxAge: 86400
};

export const VIEWS_DATASETS_CACHE_TIME = 300
export const CONNECTION_MAX_TIME = 100000
export const RESIZE_COOKIES_NAME = "beones_dragresize"

