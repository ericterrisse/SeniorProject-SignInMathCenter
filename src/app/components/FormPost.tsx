import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FormInputProps } from "../types";

const FormPost = () => {
  const isLoadingClasses = false;
  const dataClasses = ["Calc1", "Calc2", "Algebra", "PreAlgebra"]; //have to figure out how to do this in a different way

  const { register, handleSubmit } = useForm<FormInputProps>();

  const { mutate: checkInStudent, isLoading: isCheckingIn } = useMutation({
    mutationFn: async (newStudent: FormInputProps) => {
      try {
        const response = await axios.post(
          "http://localhost:3006/api/catch",
          newStudent,
          {
            headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json',
            }
          }
        );
        return response.data;
      } catch (error) {
        console.error("Error checking in:", error);
        alert("There was a problem checking you in, please check in manually");
      }
    },
    onSuccess: (data) => {
      console.log("Successfully checked in:", data);
      alert("Successfully checked in");
    },
  });

  const onSubmit: SubmitHandler<FormInputProps> = (formData) => {
	console.log(formData)
    checkInStudent(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center mx-20 gap-2"
    >
      <h3 className="self-start">First and Last Name:</h3>
      <input
        {...register("fullname")}
        type="text"
        className="py-2 w-full bg-slate-200 rounded text-center"
        placeholder="Full Name"
      />
      <h3 className="self-start mt-3">Student ID:</h3>
      <input
        {...register("studentID")}
        type="text"
        className="py-2 w-full bg-slate-200 rounded text-center"
        placeholder="fn10"
      />
      {!isLoadingClasses ? (
        <select
          {...register("classId")}
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