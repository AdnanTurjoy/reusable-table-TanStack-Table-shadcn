import { Button } from "@/components/ui/button"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  // SortingState,
  // columnVisibility,
  getFilteredRowModel,
  getSortedRowModel,

} from "@tanstack/react-table";
import { Input } from "@/components/ui/input"
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./DataTablePagination";
import { DataTableViewOptions } from "./DataTableViewOptions";
import { useState, useMemo } from "react";

function DataTable({
  columns,
  data,
  paginations,
  handlePagination,
  options,
  tableButton
}) {
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState(
    []
  )
  const [filtering,setFiltering] = useState('')
  const [rowSelection, setRowSelection] = useState({})

  const [{ pageIndex, pageSize }, setPagination] = useState(paginations || {
       pageIndex:0,
       pageSize:80,
     })

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  )
  handlePagination(pagination)
  const table = useReactTable(options.paginationType==="server" ? {
    data: data?.rows ,
    columns,
    pageCount: data?.pageCount ?? -1,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,  
    // manualPagination: true,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setFiltering,
    // enableRowSelection: row => row.original.age > 18,
    state: {
      sorting,
      columnFilters,
      pagination,
      rowSelection: rowSelection,
      globalFilter: filtering
    },
  }:  {
    data: data?.rows ,
    columns,
    // pageCount: data?.pageCount ?? -1,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,  
    // manualPagination: true,
    // onPaginationChange: setPagination,
    onGlobalFilterChange: setFiltering,
    // enableRowSelection: row => row.original.age > 18,
    state: {
      sorting,
      columnFilters,
      // pagination,
      rowSelection: rowSelection,
      globalFilter: filtering
    },
  }
  
  );


// console.log(table.getSelectedRowModel()?.rows?.map((r)=>r.original)) //get full client-side selected rows



  return (
    <div>
      <div className="flex justify-between">
        <div>
        {Object.keys(rowSelection)?.length >0 &&
            <div className=" text-sm text-muted-foreground mt-5">
            {table.getFilteredSelectedRowModel()?.rows?.length} of{" "}
            {table.getFilteredRowModel()?.rows?.length} row(s) selected.
           </div>
        }
        </div>
         <div className="flex flex-row-reverse gap-3  py-4">
        
        
        <DataTableViewOptions table={table}  tableButton={tableButton} />
        <div >
         <Input
          placeholder="Search.."
          value={filtering}
          onChange={(event) =>setFiltering(event.target.value)}
          className="max-w-sm"
        />
         </div>
         </div>
   
      </div>
    <div className="rounded-md border">
      
      <Table>
        <TableHeader>
        
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className={`${options?.sort} ? 'pl-2' : 'pl-6'`}>
                    {
                      options?.sort ?   <Button variant="ghost" className="flex" onClick={header.column.getToggleSortingHandler()}>
                      {header.isPlaceholder
                       ? null
                       : flexRender(
                           header.column.columnDef.header,
                           header.getContext()
                         )}
                         <ArrowUpDown className="ml-2 h-4 w-4 mt-0.5" />
                      </Button> :
                      <>
                        {header.isPlaceholder
                       ? null
                       : flexRender(
                           header.column.columnDef.header,
                           header.getContext()
                         )}
                      </>

                    }
                    
           
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className={`${options?.sort} ? 'pl-2' : 'pl-6'`}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns?.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    {
      options?.pagination ? <DataTablePagination table={table}  /> : ""
    }
    
    


    </div>
  );
}

export { DataTable };
