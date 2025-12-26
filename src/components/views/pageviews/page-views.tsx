"use client"

export const PageViews = ({ datas }: any) => {
	if (!datas) return null

	return (
		<div>123{Object.keys(datas)?.map((data: any, index: number) =>
			<div key={index}>
				{JSON.stringify(datas[data])}
			</div>)}
		</div>
	)

}
