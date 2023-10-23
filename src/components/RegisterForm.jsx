import React from 'react'
 import {useForm} from "react-hook-form";
import{ yupResolver} from "@hookform/resolvers/yup"
// import { Schema } from 'yup';
import { signInSchema } from '../utils/validation';
import AuthInput from './auth/AuthInput';
const RegisterForm = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });
  // const {register,handleSubmit,watch,formState:{errors}}=useForm({resolver:yupResolver(signUpSchema)})
  const onSubmit=(data)=>{
    console.log(data);
    console.log("values",watch());
    console.log("errors",errors)
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
    {/* Container */}
    <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
      {/*Heading*/}
      <div className="text-center dark:text-dark_text_1">
        <h2 className="mt-6 text-3xl font-bold">Тавтай морил</h2>
        <p className="mt-2 text-sm">Шинээр бүртгүүлэх</p>
      </div>
      {/*Form*/}
      <form  className="mt-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
      <button type='submit'>Бүртгүүлэх</button>
      </form>
    </div>
  </div>
  )
}

export default RegisterForm