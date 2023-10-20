import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const classes = await db.class.findMany();
		return NextResponse.json(classes, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: "could not fetch the classes" },
			{ status: 500 }
		);
	}
}
