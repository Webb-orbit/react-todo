import { useState } from 'react'
import {login as authlogin} from "../store/authslice"
import {useForm} from "react-hook-form"
import {Link, useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import authserv from '../appwrite/auth'
import {Input, Button} from "./index"

const Login = () => {
  const navigate = useNavigate()
  const disp = useDispatch()
  const { register, handleSubmit } = useForm()
  const [error, seterror] =useState("")

  const login = async(data)=>{
    console.log("login", data);
    seterror("")
    try {
      const seion = await authserv.login(data)
      if(seion){
        const usedata = await authserv.getcurrentuser()
        if(usedata) disp(authlogin(usedata))
        navigate("/")
      }
      
    } catch (error) {
      seterror(error)
      console.log('>>>>>>>>>>>login', error)
    }
  }
  return (
    <div  className='flex items-center justify-center flex-col w-full'>
      <h2  className=' text-center font-semibold text-[2rem] capitalize'>log in now</h2>
      <p  className=' capitalize text-center text-[1.1rem]'>do not have account <Link  className=' text-blue-400 font-semibold' to="/signup">signup</Link>
      </p>
      <form onSubmit={handleSubmit(login)} className=' mt-8'>
        <Input 
        placeholder="enter email"
        type="email"
        className=" border-gray-400 border-2 my-2 placeholder-stone-400 placeholder:capitalize placeholder:text-[0.8rem]"
        {...register("email",{
        required: true
        })}
        />
        <Input 
        type="password"
        className=" border-gray-400 border-2 my-2 placeholder-stone-400 placeholder:capitalize placeholder:text-[0.8rem]"
        placeholder="enter password"
        {...register("password", {
          required: true,
          maxLength: 10,
          minLength: 5,
        })}
        />
        <Button
        child="login"
        className="w-full mt-3 capitalize"       
        type='submit'
        />

      </form>
    </div>
  )
}

export default Login