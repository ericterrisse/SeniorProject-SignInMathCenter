import { db } from "@/lib/db";
import React from "react";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";

interface Props {}

async function getStudents() {
	const response = await db.student.findMany({
		select: {
			id: true,
			fullname: true,
			username: true,
			createdAt: true,
			Class: true,
			classId: true
		},
		orderBy: {
			createdAt: "desc",
		},
	});
	return response;
}

const page = async (props: Props) => {
	const students = await getStudents();
	return (
		<div className="container mx-auto py-10">
			<DataTable columns={columns} data={students} />
		</div>
	);
};

export default page;
