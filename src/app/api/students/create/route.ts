import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const body = await req.json();

		const student = await db.student.create({
			data: {
				fullname: body.fullname,
				username: body.username,
				class: body.classId,
			},
		});
		return NextResponse.json(student, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: "could not check in student" },
			{ status: 500 }
		);
	}
}
