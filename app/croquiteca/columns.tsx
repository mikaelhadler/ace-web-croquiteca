"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Route = {
  city?: string;
  rock?: string;
  route?: string;
  url?: string;
  graduation?: string;
  size?: string;
  pitchNumbers?: string;
  requiredEquipments?: string;
  dateOfConquer?: string;
  conquerors?: string;
  description?: string;
};

export const columns: ColumnDef<Route>[] = [
  {
    accessorKey: "city",
    header: "Cidade",
  },
  {
    accessorKey: "rock",
    header: "Pedra",
  },
  {
    accessorKey: "graduation",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Graduação
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "route",
    header: "Rota",
  },
  {
    accessorKey: "size",
    header: "Tamanho",
  },
  {
    accessorKey: "pitchNumbers",
    header: "Número de enfiadas",
  },
  {
    accessorKey: "requiredEquipments",
    header: "Equipamentos necessários",
  },
  {
    accessorKey: "dateOfConquer",
    header: "Data da conquista",
  },
  {
    accessorKey: "conquerors",
    header: "Conquistadores",
  },
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

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
      );
    },
  },
];
