"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormInputProps } from "../types";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Class } from "@prisma/client";

const FormPost = () => {
	const isLoadingClasses = false;
	const dataClasses = ["Calculus I", "Calculus II", "Database", "Algebra"];

	return (
		<form
			onSubmit={() => {}}
			className="flex flex-col items-center mx-20 gap-2"
		>
			<h3 className="self-start">Name and last name:</h3>
			<input
				type="text"
				className="py-2 w-full bg-slate-200 rounded text-center"
				placeholder="Full name"
			/>
			<h3 className="self-start mt-3">Student username:</h3>
			<input
				type="text"
				className="py-2 w-full bg-slate-200 rounded text-center"
				placeholder="fn10"
			/>
			{!isLoadingClasses ? (
				<select
					className="py-2 w-full bg-slate-200 rounded text-center mt-5"
					defaultValue={""}
				>
					<option disabled value={""}>
						Class:
					</option>
					{dataClasses?.map((item, i) => (
						<option key={i} value={item}>
							{item}
						</option>
					))}
				</select>
			) : (
				<span className="loading loading-spinner loading-md mt-5"></span>
			)}
			<button
				type="submit"
				className="bg-[#b5a369] text-white text-lg font-semibold px-5 py-1 rounded-lg mt-10"
			>
				SUBMIT
			</button>
		</form>
	);
};

export default FormPost;
