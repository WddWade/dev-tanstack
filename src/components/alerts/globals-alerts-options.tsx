"use client"

export type GlobalsAlersStates =
	| "editorsViews.restore"
	| "editorsViews.delete"
	| "editorsViews.notfound"
	| "editorsViews.error"
	| "editorsViews.leave"
	| "subeditors.delete"
	| "subeditors.delete-create"
	| "subeditors.unlink"
	| "headersViews.logout"
	| "close"
	| null

export interface GlobalsAlertsOptions {
	title?: React.ReactNode
	description?: React.ReactNode
	confirms?: {
		title?: React.ReactNode
		state?: "error" | "warn"
		type?: "action" | "cancel"
		returnValue?: any
		callback?: () => void
	}[]
}

export interface GlobalsAlertsProps {
	state: GlobalsAlersStates,
	options?: GlobalsAlertsOptions
}

export const globalAlertsOptions = (
	props: GlobalsAlertsProps
): GlobalsAlertsOptions => {

	const { state, options } = props
	const { title, confirms, description } = options || {}

	const defaultConfirms: GlobalsAlertsOptions['confirms'] = [
		{ type: "cancel", title: "cancel", returnValue: false },
		{ type: "action", title: "confirm", state: "warn", returnValue: true },
	]

	switch (state) {
		case "editorsViews.leave":
			return {
				title: title ? `"${title}" 尚未SAVE。` : "編輯內容尚未SAVE!!",
				description: description ?? <>
					<span>資料尚未SAVE，離開後將遺失編輯內容，請確認是否SAVE?</span>
					<span>The data you edited the changes you made haven't been saved. Please confirm whether you want to leave.</span>
				</>,
				confirms: confirms ?? [
					{ type: "cancel", title: "cancel", returnValue: "cancel" },
					{ type: "action", title: "leave", returnValue: "leave" },
					{ type: "action", title: "save", state: "warn", returnValue: "save" },
				]
			}
		case "editorsViews.restore":
			return {
				title: title ? `重置 "${title}" 為編輯前的內容?` : "重置為編輯前的內容?",
				description: description ?? <>
					<span>請確認是否重置為編輯前的內容，目前輸入內容將無法復原。</span>
					<span>This will revert to the original content. Your current input will be lost and cannot be undone.</span>
				</>,
				confirms: confirms ?? defaultConfirms
			}
		case "editorsViews.delete":
			return {
				title: title ? `立即刪除 "${title}" ?` : "立即刪除資料?",
				description: <>
					<span>請確認是否永久刪除資料，被刪除的資料將無法復原。</span>
					<span>Confirm whether to delete the data. Once deleted, the data cannot be restored.</span>
				</>,
				confirms: [
					{ type: "cancel", title: "cancel", returnValue: false },
					{ type: "action", title: "delete", state: "warn", returnValue: true }
				]
			}
		case "editorsViews.notfound":
			return {
				title: `"${title}" 不存在。`,
				description: description ?? <>
					<span>資料不存在或已被刪除，按下確認返回新增資料頁面。</span>
					<span>The data does not exist or has been deleted.</span>
				</>,
				confirms: confirms ?? defaultConfirms
			}
		case "editorsViews.error":
			return {
				title: title ?? `Mutation Error!`,
				description: description ?? <>
					<span>更新資料出現錯誤，請確認網路是否失去連線後重新操作。</span>
					<span>The data does not exist or has been deleted.</span>
				</>,
				confirms: [{ type: "action", title: "confirm", state: "warn", returnValue: true }]
			}
		case "headersViews.logout":
			return {
				title: "登出 BeONES?",
				description: description ?? <>
					<span>登出後未完成的操作將不會被保留，請確認是否立即登出。</span>
					<span>Any incomplete actions will not be saved after you log out. Do you want to log out now?</span>
				</>,
				confirms: confirms ?? [
					{ type: "cancel", title: "back", returnValue: false },
					{ type: "action", title: "logout", state: "warn", returnValue: true },
				]
			}
		case "subeditors.delete":
			return {
				title: title ?? `標記為永久刪除?`,
				description: description ?? <>
					<span>請確這筆資料是否於SAVE後永久刪除？</span>
					<span>Please confirm: once you permanently delete this data, it cannot be restored.</span>
				</>,
				confirms: [
					{ type: "cancel", title: "cancel", returnValue: false },
					{ type: "action", title: "confirm", state: "warn", returnValue: true }
				]
			}
		case "subeditors.delete-create":
			return {
				title: title ?? `刪除新增資料?`,
				description: description ?? <>
					<span>請確認是否刪除尚未SAVE的新增資料？</span>
					<span>Are you sure you want to delete the newly added data that has not been saved?</span>
				</>,
				confirms: [
					{ type: "cancel", title: "cancel", returnValue: false },
					{ type: "action", title: "delete", state: "warn", returnValue: true }
				]
			}
		case "subeditors.unlink":
			return {
				title: title ?? `取消相關資料連結?`,
				description: description ?? <>
					<span>請確認是否在SAVE後取消連結這一筆相關資料？</span>
					<span>Please confirm whether to cancel the link to this related data after SAVE?</span>
				</>,
				confirms: [
					{ type: "cancel", title: "cancel", returnValue: false },
					{ type: "action", title: "unlink", state: "warn", returnValue: true }
				]
			}

		default: return {} as any
	}
}
