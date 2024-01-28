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
    <div>
      <h2>log in now</h2>
      <p>do not have account: 
      <Link to="/signup">signup</Link>
      </p>
      <form onSubmit={handleSubmit(login)} className=' mt-8'>
        <Input 
        lable="email"
        placeholder="enter email"
        type="email"
        {...register("email",{
        required: true
        })}
        />
        <Input 
        lable="password"
        type="password"
        placeholder="enter pass"
        {...register("password", {
          required: true,
          maxLength: 10,
          minLength: 5,
        })}
        />
        <Button
        child="login btn"
        type='submit'
        />

      </form>
    </div>
  )
}

export default Login