"use client";

import { Student } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
	id: string;
	amount: number;
	status: "pending" | "processing" | "success" | "failed";
	email: string;
};

export const columns: ColumnDef<Student>[] = [
	{
		accessorKey: "fullname",
		header: "Full Name",
	},
	{
		accessorKey: "username",
		header: "Student ID",
	},
	{
		accessorKey: "Class.classname",
		header: "Class",
	},
	{
		accessorKey: "createdAt",
		header: "Time",

		cell: ({ row }) => {
			const date: Date = row.getValue("createdAt");
			return <div>{format(date, 'HH:ss - MM/dd')}</div>;
		},
	},
];
