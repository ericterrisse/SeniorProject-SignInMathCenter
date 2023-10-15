"use client"

import FormPost from "./components/FormPost";
import { SubmitHandler } from "react-hook-form";
import { FormInputProps } from "./types";

export default function Home() {
	return (
		<>
			<header className="mt-20 ml-10 text-4xl font-bold text-slate-600">
				<h1>Check in.</h1>
			</header>
			<main>
				<div className="flex flex-col items-center m-10 sm:m-20 text-4xl sm:text-5xl font-bold gap-2">
					<h1 className="text-[#b5a369]">MATH</h1>
					<h1 className="">SUCCESS</h1>
					<h1 className="">CENTER</h1>
					<p className="text-base sm:text-lg mt-2">
						Lindenwood University
					</p>
				</div>

				<FormPost />
			</main>
		</>
	);
}
