

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
// import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Lock } from "lucide-react";

function DataTableViewOptions({
  table,
  tableButton
}) {
  return (
    <>  
    {
      tableButton.map((item,id)=>{
         return <div key={id}>
          <Button 
            
             size="sm"
             className="ml-auto hidden h-8 lg:flex"
             onClick={()=>item.triggerFunction(table.getSelectedRowModel()?.rows?.map((r)=>r.original))}
             disabled={table.getSelectedRowModel()?.rows?.map((r)=>r.original).length<1}
             >
           {item.icon}
             
             {item.name}
           </Button>
         </div>
      })
    }
    
         
        <div>
             <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <MixerHorizontalIcon className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
        </div>
     
    </>
  
  );
}

export { DataTableViewOptions };
