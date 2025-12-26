"use client"

import { IconZoom, IconX } from '@tabler/icons-react'
import { Search, TextSearch, X } from 'lucide-react'
import { cn } from '@/utils'

interface PropsType { }


const DatasViewsSearch: React.FC<PropsType> = () => {

	return (
		<div
			data-components="datasViews-search"
			className={cn(
				"w-full",
				"h-full",
				"flex",
				"items-center",
				"bg-background",
				"gap-x-2",
				"[&>input]:w-full",
			)}
		>
			<span className="flex-none">
				<IconZoom size="14" stroke={2.8} />
			</span>
			<div className="flex-1">
				<input type="text" className="w-full focus:outline-0" placeholder="Search..." />
			</div>
			<span className="inline-flex items-center gap-x-1 flex-none">
				<span className="text-mini-11 -mb-0.5">150</span>
				<span className="text-black/30">
					<X size={14} strokeWidth={2} />
				</span>
			</span>
		</div >
	)
}

DatasViewsSearch.displayName = "DatasViewsSearch"
export default DatasViewsSearch
