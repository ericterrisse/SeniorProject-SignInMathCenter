import React, { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";


const FormPost = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [uData, setData] = useState({ name: "", sId: "" });

    useEffect(() => {
        console.log('Updated uData:', uData);
    }, [uData]);

    useEffect(() => {
        const eventSource = new EventSource('https://snr-backend-47098f3570d9.herokuapp.com/sse');

        eventSource.onmessage = (event) => {
            const eventData = event.data;
            console.log('Received SSE message:', eventData);

            if (eventData === 'Reload') {
                getDataAndUpdateTextBoxes();
            }
        };

        eventSource.onerror = (error) => {
            console.error('SSE Error:', error);
        };

        return () => {
            eventSource.close();
        };
    }, []);

    const getDataAndUpdateTextBoxes = () => {
        axios.get('https://snr-backend-47098f3570d9.herokuapp.com/getData')
            .then(response => {
                console.log('Received data:', response.data);

                setData(response.data); // Update state with the fetched data
                if (response.data.name === "") {
                    alert("There is no user");
                    window.location.reload();
                    setData({ name: "", sId: "" })
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };


  const onSubmit: SubmitHandler<FormInputProps> = async (data) => {
      try {
          console.log(data);//show posted data
          const response = await axios.post('https://snr-backend-47098f3570d9.herokuapp.com/api/catch', data);
          console.log(response.data);
          window.location.reload();
          setData({ name: "", sId: "" })
          //add user success message, do some type of redirect
      }catch (error) {
          console.error('Error posting data:', error);
          //add user error
      }
  };

  const isLoadingClasses = false;
  const dataClasses = ["Calc1", "Calc2", "Algebra", "PreAlgebra"]; //have to figure out how to do this in a different way


  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="flex flex-col items-center mx-20 gap-2">
        <h3 className="self-start">Name and last name:</h3>
        <input

            id="name"
            type="text"
            defaultValue={uData.name}
            className="py-2 w-full bg-slate-200 rounded text-center"
            placeholder="Full name"
            {...register("fullname", { required: true })}
        />
        {errors.fullname && <span className="text-red-500">Full name is required</span>}
        <h3 className="self-start mt-3">Student ID:</h3>
        <input

            id="studentId"
            type="text"
            defaultValue={uData.sId}
            className="py-2 w-full bg-slate-200 rounded text-center"
            placeholder="fn10"
            {...register("studentId", { required: true })}
        />
        {errors.studentId && <span className="text-red-500">Student ID is required</span>}
        {!isLoadingClasses ? (
            <select
                className="py-2 w-full bg-slate-200 rounded text-center mt-5"
                defaultValue={""}
                {...register("classId", { required: true })}
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
