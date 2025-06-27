import { type Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router";
import { deleteToDo } from "@/api/todo.api";

interface DataTableRowActionsProps<TData extends { id: string | number }> {
  row: Row<TData>;
  onRefresh?: () => void;
}

export function DataTableRowActions<TData extends { id: string | number }>({
  row,
  onRefresh,
}: DataTableRowActionsProps<TData>) {
  const navigation = useNavigate();
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    if (isDeleting) return; // Prevent multiple clicks
    
    setIsDeleting(true);
    try {
      await deleteToDo(Number(row.original.id));
      onRefresh?.(); // Call refresh function after successful deletion
    } catch (error) {
      console.error("Failed to delete todo:", error);
      // You could add a toast notification here
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem
          onClick={() => navigation(`/todos/${row.original.id}`)}
        >
          View details
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => navigation(`/todos/${row.original.id}/edit`)}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
