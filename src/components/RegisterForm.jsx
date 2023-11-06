import React from 'react'
 import {useForm} from "react-hook-form";
 import { Link,  useNavigate } from "react-router-dom";
import{ yupResolver} from "@hookform/resolvers/yup"
// import { Schema } from 'yup';
import PulseLoader  from "react-spinners/PulseLoader"
import { signInSchema } from '../utils/validation';
import AuthInput from './auth/AuthInput';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/userSlice';

const RegisterForm = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });
  const navigate=useNavigate()
  const dispatch=useDispatch();

  const {status,error}=useSelector((state)=>state.user)

  // const {register,handleSubmit,watch,formState:{errors}}=useForm({resolver:yupResolver(signUpSchema)})
  const onSubmit=async(data)=>{
    console.log(data);
   const res= await dispatch(registerUser({data}))
    console.log(res,"stat")
    // if(status ==="succeeded"){
    //   navigate("/")
    // }
  }

  return (
    <div className=" min-h-screen w-full flex items-center  justify-center overflow-hidden">
    {/* Container */}
    <div className="w-full   max-w-md  p-14 dark:bg-dark_bg_2 rounded-xl">
      {/*Heading*/}
      <div className="text-center dark:text-dark_text_1">
      
        <h1 className=" text-xl">Шинээр бүртгүүлэх</h1>
      </div>
      {/*Form*/}
      <form  className="space-y-6 " onSubmit={handleSubmit(onSubmit)}>
      <AuthInput
            name="name"
            type="text"
            placeholder="Овог нэр"
            register={register}
            error={errors?.name?.message}
          />
      <AuthInput
            name="email"
            type="text"
            placeholder="И-мэйл"
            register={register}
            error={errors?.email?.message}
          />
          <AuthInput
          name="status"
          type="text"
          placeholder="Status (Optional)"
          register={register}
          error={errors?.status?.message}
        />
        <AuthInput
          name="password"
          type="password"
          placeholder="Password"
          register={register}
          error={errors?.password?.message}
        />
        {
          error ? (
            <div>
            <p className='text-red-400'>{error}</p>
            </div>
          ):null
         }
        <button
        className="w-full flex justify-center bg-green_1 text-gray-100 p-2 rounded-full tracking-wide
      font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300
      "
        type="submit"
      >
        {status === "loading" ? (
          <PulseLoader color="#fff" size={16} />
        ) : (
          "Бүртгүүлэх"
        )}
      </button>
      {/* Sign in link */}
      <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
        <span>хэрвээ бүртгэлтэй бол   ?</span>
        <Link
          to="/login"
          className=" hover:underline cursor-pointer transition ease-in duration-300"
        >
          Нэвтрэх
        </Link>
      </p>
      </form>
    </div>
  </div>
  )
}

export default RegisterForm