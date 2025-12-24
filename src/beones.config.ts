export const R_TOKEN = "wdd_laravel_1103_session"
export const C_TOKEN = "beones_verify"
export const C_TOKEN_MAX_AGE = 86400;
export const C_TOKEN_OPTIONS = {
	httpOnly: true,
	path: "/",
	maxAge: Number(C_TOKEN_MAX_AGE)
};
export const VIEWS_DATASETS_CACHE_TIME = 300
export const CONNECTION_MAX_TIME = 100000
export const RESIZE_COOKIES_NAME = "beones_dragresize"

