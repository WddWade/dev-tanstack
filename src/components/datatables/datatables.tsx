"use client"

import { useEffect, useMemo, useState } from "react"
import {
	Column,
	ColumnDef,
	ColumnFiltersState,
	FilterFn,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	PaginationState,
	Row,
	RowSelectionState,
	SortingState,
	useReactTable,
	VisibilityState,
} from "@tanstack/react-table"

import { Tables } from "../tables"
import { Checkbox } from "../checkboxs"
import { Buttons } from "../buttons"
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { Inputs } from "../inputs"


interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

export function DataTables<Payment, TValue>({
	columns,
	data,
}: DataTableProps<Payment, TValue>) {

	const [datas, setDatas] = useState<Payment[]>(data)
	const [sorting, setSorting] = useState<SortingState>([])
	const [globalFilter, setGlobalFilter] = useState("");
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 20,
	})

	const columnsMemo = useMemo(() => {
		return [{
			id: "select",
			header: ({ table }) => (
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && "indeterminate")
					}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Select all"
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => setRowSelection((prev: any) => ({ ...prev, [row.id]: value }))}
					aria-label="Select row"
				/>
			),
			enableSorting: false,
			enableHiding: false,
		}, ...columns]
	}, [])

	const rowSelectionMemo = useMemo(() => {
		return Object.keys(rowSelection).filter((key: string) => rowSelection[key])
	}, [rowSelection])

	const table = useReactTable({
		data: datas,
		columns: columnsMemo,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			globalFilter,
			rowSelection,
			pagination
		},
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onGlobalFilterChange: setGlobalFilter,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		onPaginationChange: setPagination,
		getRowId: (row: any) => row.id,
		enableRowSelection: true,
		// enableMultiRowSelection: false,
		debugTable: true,
		autoResetPageIndex: false,
	})

	return (
		<div className="flex flex-col w-full h-full overflow-hidden">
			<div className="flex items-center p-4">
				<Inputs
					value={globalFilter}
					onChange={(e) => setGlobalFilter(e.target.value)}
					placeholder="Global search..."
					className="max-w-sm"
				/>
			</div>
			<div className="overflow-auto border flex-1">
				<Tables.Root className="border-collapse">
					<Tables.Header className="bg-white sticky top-0 z-10 shadow-sm">
						{table.getHeaderGroups().map((headerGroup) => (
							<Tables.Row key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<Tables.Head key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
										</Tables.Head>
									)
								})}
							</Tables.Row>
						))}
					</Tables.Header>
					<Tables.Body>
						{table.getRowModel().rows?.length
							? (table.getRowModel().rows.map((row) => (
								<Tables.Row
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<Tables.Cell key={cell.id}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</Tables.Cell>
									))}
								</Tables.Row>
							)))
							: (
								<Tables.Row>
									<Tables.Cell colSpan={columns.length} className="h-24 text-center">
										No results.
									</Tables.Cell>
								</Tables.Row>
							)}
					</Tables.Body>
				</Tables.Root>
			</div>
			<div className="flex items-center justify-between px-2">
				<div className="text-muted-foreground flex-1 text-sm">
					{table.getFilteredSelectedRowModel().rows.length} of{" "}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
				<div className="flex items-center space-x-6 lg:space-x-8">

					<div className="flex w-[100px] items-center justify-center text-sm font-medium">
						Page {table.getState().pagination.pageIndex + 1} of{" "}
						{table.getPageCount()}
					</div>
					<div className="flex items-center space-x-2">
						<Buttons
							variant="outline"
							size="icon"
							className="hidden size-8 lg:flex"
							onClick={() => table.setPageIndex(0)}
							disabled={!table.getCanPreviousPage()}
						>
							<span className="sr-only">Go to first page</span>
							<ChevronsLeft />
						</Buttons>
						<Buttons
							variant="outline"
							size="icon"
							className="size-8"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						>
							<span className="sr-only">Go to previous page</span>
							<ChevronLeft />
						</Buttons>
						<Buttons
							variant="outline"
							size="icon"
							className="size-8"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						>
							<span className="sr-only">Go to next page</span>
							<ChevronRight />
						</Buttons>
						<Buttons
							variant="outline"
							size="icon"
							className="hidden size-8 lg:flex"
							onClick={() => table.setPageIndex(table.getPageCount() - 1)}
							disabled={!table.getCanNextPage()}
						>
							<span className="sr-only">Go to last page</span>
							<ChevronsRight />
						</Buttons>
					</div>
				</div>
			</div>
			{/* <div className="text-muted-foreground flex-1 text-sm">
				{table.getSelectedRowModel().rows.length} of {table.getRowModel().rows.length} row(s) selected.
			</div> */}
		</div>

	)
}

export type Payment = {
	id: string
	amount: number
	status: "pending" | "processing" | "success" | "failed" | "completed"
	email: string
}

const TablesHeaderSorting = ({ sorting, column, children }: any) => {
	return (
		<div
			className="flex cursor-pointer"
			onClick={() => column.toggleSorting(sorting === "asc", true)}
		>
			<span>{children}</span>
			{sorting === "asc" && <ArrowDown className="ml-2 h-4 w-4" />}
			{sorting === "desc" && <ArrowUp className="ml-2 h-4 w-4" />}
		</div>
	)
}


export const columns: ColumnDef<Payment>[] = [
	{
		accessorKey: "status",
		header: ({ column }) => {
			const sorting = column.getIsSorted()
			return (<TablesHeaderSorting column={column} sorting={sorting}>Status</TablesHeaderSorting>)
		},
		cell: ({ row }): React.ReactNode => {
			const value = row.getValue("status") ?? "" as any
			return (<div>{value}</div>)
		},
		filterFn: 'includesString',
	},
	{
		accessorKey: "email",
		header: ({ column }) => {
			const sorting = column.getIsSorted()
			return (<TablesHeaderSorting column={column} sorting={sorting}>Email</TablesHeaderSorting>)
		},
		filterFn: 'includesString',
	},
	{
		accessorKey: "amount",
		header: ({ column }) => {
			const sorting = column.getIsSorted()
			return (<TablesHeaderSorting column={column} sorting={sorting}>Amount</TablesHeaderSorting>)
		},
		filterFn: 'includesString',
	},
]

export const datas: Payment[] = [
	{ id: "ad259241-145", amount: 303, status: "failed", email: "user91@example.com" },
	{ id: "fccc2fc5-69a", amount: 699, status: "completed", email: "user14@example.com" },
	{ id: "38a019c5-c51", amount: 580, status: "pending", email: "user76@example.com" },
	{ id: "3fd473c1-fdd", amount: 201, status: "processing", email: "user42@example.com" },
	{ id: "a9e5b58e-13f", amount: 922, status: "completed", email: "user80@example.com" },
	{ id: "f68fe2e1-a36", amount: 170, status: "failed", email: "user18@example.com" },
	{ id: "01e7f3a8-729", amount: 477, status: "completed", email: "user37@example.com" },
	{ id: "fb5aefc1-0d7", amount: 442, status: "failed", email: "user67@example.com" },
	{ id: "6f78cd79-0a0", amount: 437, status: "failed", email: "user22@example.com" },
	{ id: "7f3c9448-15c", amount: 756, status: "pending", email: "user95@example.com" },
	{ id: "fa2ec046-6e7", amount: 904, status: "processing", email: "user46@example.com" },
	{ id: "8e4f3e24-f4d", amount: 226, status: "pending", email: "user2@example.com" },
	{ id: "8378cf52-d4c", amount: 442, status: "completed", email: "user38@example.com" },
	{ id: "9a229b0e-fb5", amount: 559, status: "processing", email: "user57@example.com" },
	{ id: "fd4a3c7b-3d7", amount: 814, status: "pending", email: "user32@example.com" },
	{ id: "e4a928f7-df8", amount: 448, status: "pending", email: "user15@example.com" },
	{ id: "df9c7b42-4f8", amount: 245, status: "failed", email: "user68@example.com" },
	{ id: "c2d5ab7e-3de", amount: 132, status: "processing", email: "user5@example.com" },
	{ id: "29e52b4a-741", amount: 120, status: "pending", email: "user26@example.com" },
	{ id: "2b5e7d8c-35c", amount: 875, status: "completed", email: "user64@example.com" },
	{ id: "b3f2976d-d64", amount: 700, status: "pending", email: "user47@example.com" },
	{ id: "2e2b19a1-95d", amount: 331, status: "processing", email: "user28@example.com" },
	{ id: "a5a39c3d-6d1", amount: 648, status: "completed", email: "user3@example.com" },
	{ id: "51b3c2e7-2d4", amount: 319, status: "failed", email: "user40@example.com" },
	{ id: "d439f274-0fa", amount: 376, status: "completed", email: "user1@example.com" },
	{ id: "8f3f92a9-0fb", amount: 179, status: "pending", email: "user72@example.com" },
	{ id: "bc6b72d1-96a", amount: 604, status: "processing", email: "user8@example.com" },
	{ id: "61c5b2d7-b14", amount: 833, status: "failed", email: "user85@example.com" },
	{ id: "703c6a8e-5ac", amount: 906, status: "processing", email: "user61@example.com" },
	{ id: "427a9f6e-047", amount: 273, status: "failed", email: "user60@example.com" },
	{ id: "8897fae4-0fb", amount: 847, status: "completed", email: "user9@example.com" },
	{ id: "02c7c5df-18a", amount: 632, status: "processing", email: "user33@example.com" },
	{ id: "9e1c473d-154", amount: 183, status: "failed", email: "user87@example.com" },
	{ id: "b8df3d8b-142", amount: 652, status: "pending", email: "user12@example.com" },
	{ id: "be3a9f6f-83b", amount: 519, status: "completed", email: "user56@example.com" },
	{ id: "f1c2ab4d-7a9", amount: 882, status: "processing", email: "user84@example.com" },
	{ id: "40e27d4f-93c", amount: 377, status: "completed", email: "user19@example.com" },
	{ id: "7f2f8a3d-125", amount: 256, status: "pending", email: "user49@example.com" },
	{ id: "249eb1f3-5f1", amount: 340, status: "processing", email: "user10@example.com" },
	{ id: "42b5f7d1-48d", amount: 957, status: "completed", email: "user73@example.com" },
	{ id: "3fbdc1a5-42b", amount: 136, status: "failed", email: "user17@example.com" },
	{ id: "86c23a4d-0e1", amount: 228, status: "pending", email: "user58@example.com" },
	{ id: "c7e94d2f-5e3", amount: 141, status: "failed", email: "user53@example.com" },
	{ id: "9b4c25f1-3e8", amount: 485, status: "completed", email: "user55@example.com" },
	{ id: "ae8f427b-5b1", amount: 927, status: "processing", email: "user59@example.com" },
	{ id: "68a1b24c-2af", amount: 748, status: "failed", email: "user24@example.com" },
	{ id: "82f47d1a-54e", amount: 632, status: "completed", email: "user90@example.com" },
	{ id: "b13a64d5-3f4", amount: 950, status: "pending", email: "user27@example.com" },
	{ id: "f93b7a4d-9d7", amount: 265, status: "processing", email: "user41@example.com" },
]


