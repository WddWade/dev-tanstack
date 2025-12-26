import { MdSearch, MdClear, MdArrowDropDown } from "react-icons/md";
import { cn } from "@/utils";

interface PropsType {
	children: React.ReactNode
}

const DatasViewsPagination: React.FC<PropsType> = ({ children }) => {

	return (
		<div
			data-components="datasViews-pagination"
			className={cn(
				"min-h-view-footer",
				"px-space",
				"flex",
				"justify-between",
				"items-center",
				"bg-background",

			)}
		>
			{children}

		</div>
	)
}

DatasViewsPagination.displayName = "DatasViewsPagination"
export default DatasViewsPagination
