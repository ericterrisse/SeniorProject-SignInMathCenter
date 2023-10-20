import { db } from "@/lib/db";
import React from "react";

interface Props {}

async function getStudents() {
	const response = await db.student.findMany({
		select: {
			id: true,
			fullname: true,
			username: true,
            createdAt: true,
			Class: true
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
		<pre>
			{students.map((item) => (
				<div>
					<br />
					{/* <p>{item.createdAt}</p> */}
					<br />
					{item.fullname}
					<br />
					{item.username}
					<br />
					{item.Class.classname}
				</div>
			))}
		</pre>
	);
};

export default page;
