"use client"

import { cn } from "@xwadex/fesd-next/shadcns"
import { useState } from "react"


interface FormValues {
	account?: string
	password?: string
	[key: string]: any
}

interface PropsType { }

const formsConfigs = {
	fields: [
		{ id: 1, conponent: "input", type: "text", name: "account", placeholder: "Account" },
		{ id: 2, conponent: "input", type: "text", name: "password", placeholder: "Password" }
	],
	actions: {}
}

const formsValues: FormValues = {
	account: "",
	password: ""
}

const LoginForms: React.FC<PropsType> = () => {


	const [submitDatas, setSubmitDatas] = useState(formsValues)

	const onChangeEvents = (e: React.ChangeEvent<HTMLInputElement>) => {
		const changeDatas = { [e.target.name]: e.target.value }
		setSubmitDatas(prev => ({ ...prev, ...changeDatas }))
	}

	const onClickEvents = async () => {
		// setSubmitDatas({})

		const url = "http://localhost:3000/api/auth/login"
		const options = {
			method: "POST",
			body: JSON.stringify(submitDatas)
		}

		const res = await fetch(url, options)
		const { status, data } = await res.json()

		console.log("status", status, data);
		// globalToaster("login")

		// if (status) redirect("/", RedirectType.replace)
	}

	return (
		<div
			data-components="loginForms"
			className={cn(
				"flex",
				"flex-col",
				"gap-7",
			)}
		>
			<div
				data-components="container"
				className={cn(
					"flex",
					"flex-col",
					"gap-2.5",
					"[&_input]:w-64",
					"[&_input]:pb-2.5",
					"[&_input]:pl-px",
					"[&_input]:border-b-1",
					"[&_input]:duration-300",
					"[&_input]:border-b-black/20",
					"[&_input]:placeholder:text-gray-400",
					"[&_input]:focus-visible:outline-0",
					"[&_input]:focus-visible:border-b-black",

				)}>
				{formsConfigs.fields.map(field =>
					<input
						key={field.id}
						name={field.name}
						type={field.type}
						value={submitDatas[field.name] as keyof FormValues ?? ""}
						onChange={onChangeEvents}
						placeholder={field.placeholder}
					/>
				)}
				<span className="text-xs">Forget Pasword?</span>
			</div>

			<div>
				<button
					data-components="submit"
					type="submit"
					className={cn(
						"w-full",
						"tracking-[1]",
						"uppercase",
						"text-white",
						"bg-black/60",
						"px-5",
						"py-3.5",
						"rounded-sm",
						"cursor-pointer",
						"duration-500",
						"hover:bg-black",
					)}
					onClick={onClickEvents}
				>
					submit
					{/* {pending ? "Fetching..." : "Submit"} */}
				</button>

				<span className="text-xs">pending: ...</span>
			</div>
		</div>
	)
}

LoginForms.displayName = "LoginForms"
export default LoginForms
