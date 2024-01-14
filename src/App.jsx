import { useState } from 'react'
import { Button } from './components/ui/button'
// import './App.css'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import '../app/globals.css'
import { DataTable } from './components/TableComponent/DataTable.jsx'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { Checkbox } from "@/components/ui/checkbox"

export const columns = [
  {
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
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export const data = [{
  id: "728ed52f",
  amount: 100,
  status: "pending",
  email: "m@example.com",
},{
  id: "728ed52f",
  amount: 100,
  status: "pending",
  email: "a@example.com",
},{
  id: "728ed52f",
  amount: 100,
  status: "pending",
  email: "p@example.com",
},{
  id: "728ed52f",
  amount: 100,
  status: "pending",
  email: "m@example.com",
},{
  id: "728ed52f",
  amount: 3,
  status: "pending",
  email: "q@example.com",
},]

// const actions = [
//   {
//     name: "Lock",

//   }
// ]

function App() {

  const getSelectedRow = (rows) =>{
    console.log(rows);
  }

  const handleLock = () =>{
    console.log("Hittt");
  }

  return (
     
      <div className="container mx-auto py-10">
        {/* <Button>Click me</Button> */}
      <DataTable columns={columns} data={data} getSelectedRow={getSelectedRow} handleActions={handleLock} />

    </div>
    
  )
}

export default App
