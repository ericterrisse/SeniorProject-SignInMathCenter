"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormInputProps } from "../types";

const FormPost = () => {
	const { register, handleSubmit } = useForm<FormInputProps>();
	const handleCheckIn: SubmitHandler<FormInputProps> = (data) => {
		console.log(data);
	};

	return (
		<form
			onSubmit={handleSubmit(handleCheckIn)}
			className="flex flex-col items-center mx-20 gap-2"
		>
			<h3 className="self-start">Name and last name:</h3>
			<input
				type="text"
				{...register("fullname", { required: true })}
				className="py-2 w-full bg-slate-200 rounded text-center"
				placeholder="Lionel Messi"
			/>
			<h3 className="self-start mt-3">Student username:</h3>
			<input
				type="text"
				{...register("username", { required: true })}
				className="py-2 w-full bg-slate-200 rounded text-center"
				placeholder="lm10"
			/>
			<select
				{...register("class", { required: true })}
				className="py-2 w-full bg-slate-200 rounded text-center mt-5"
				defaultValue={""}
			>
				<option disabled value={""}>
					Class:
				</option>
				<option>Calc 1</option>
				<option>Calc 2</option>
				<option>Computer Science I</option>
				<option>Computer Science II</option>
			</select>
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
