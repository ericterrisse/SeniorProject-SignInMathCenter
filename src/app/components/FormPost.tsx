"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormInputProps } from "../types";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Class } from "@prisma/client";

const FormPost = () => {
	const { register, handleSubmit } = useForm<FormInputProps>();
	const handleCheckIn: SubmitHandler<FormInputProps> = (data) => {
		checkInStudent(data);
	};

	const { mutate: checkInStudent, isLoading } = useMutation({
		mutationFn: (newStudent: FormInputProps) => {
			console.log(newStudent)
			return axios.post("/api/students/create", newStudent);
		},
		onError: (error) => {
			alert(
				"There was a problem checking you in, please check in manually"
			);
			console.log(error)
		},
		onSuccess: () => {
			alert("Successfully checked in");
		},
	});

	// fetch list of classes
	const { data: dataClasses, isLoading: isLoadingClasses } = useQuery<
		Class[]
	>({
		queryKey: ["classes"],
		queryFn: async () => {
			const response = await axios.get("/api/classes");
			return response.data;
		},
	});

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
			{!isLoadingClasses ? (
				<select
					{...register("classId", { required: true })}
					className="py-2 w-full bg-slate-200 rounded text-center mt-5"
					defaultValue={""}
				>
					<option disabled value={""}>
						Class:
					</option>
					{dataClasses?.map((item) => (
						<option key={item.id} value={item.id}>
							{item.classname}
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
