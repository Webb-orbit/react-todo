import { useState } from 'react'
import authserv from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authslice'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Button } from './index'
import Input from './Input'

const Signup = () => {
    const naviga = useNavigate()
    const disp = useDispatch()
    const {register, handleSubmit,formState: { errors },} = useForm()
    const [errorr, seterror] = useState("")

    const singupnow = async(data)=>{
        console.log('>>>>>>>>>>>data', data, data.password, data.email, data.name )
        seterror("")
        try {
            console.log("try");
            const up = await authserv.createaccount(data)
            if (up) {
                console.log("navig");
                const userdata = await authserv.getcurrentuser()
                if (userdata) disp(login(userdata))
                naviga("/")
        }
    } catch (error) {
        seterror(error)
        console.log(errorr);
        }
    }
    
    if (navigator.onLine == false) return <p className=' text-center hover:font-bold mt-8'>OFFLINE</p>
  return (
    <>
    <div className='flex items-center justify-center flex-col w-full'>
        <h2 className=' text-center font-semibold text-[2rem] capitalize'>signup</h2>
        <p className=' capitalize text-center text-[1.1rem]'>you have an accout <Link to="/login" className=' text-blue-400 font-semibold'>login</Link></p>
        <p className=' text-red-300 text-[0.7rem] '>{errorr? errorr.response.message :null}</p>
         <form onSubmit={handleSubmit(singupnow)} className=' p-8'>
            <Input
            type="email"
            placeholder="enter email"
            className=" border-gray-400 border-2 my-2 placeholder-stone-400 placeholder:capitalize placeholder:text-[0.8rem]"
            {...register("email",{
                required: true
            })}
            />

            <Input
            type="password"
            placeholder="enter your password"
            className=" border-gray-400 border-2 my-2 placeholder-stone-400 placeholder:capitalize placeholder:text-[0.8rem]"
            {...register("password",{
                required: true,
                minLength: 5,
                maxLength:20
            })}
            />
            {errors.name?.type === "required" && (
            <p className=' text-red-400 text-[0.7rem] ' role="alert"> name is required</p>
          )}
                        <Input
            type="text"
            autoComplete='off'
            placeholder="enter your name"
            className=" border-gray-400 border-2 my-2 placeholder-stone-400 placeholder:capitalize placeholder:text-[0.8rem]"
            {...register("name",{
                required: true,
                maxLength: 20
            })}
            aria-invalid={errors.name ? "true" : "false"}
            />
            <Button className="w-full mt-3 capitalize" child="sign up now" type='submit'/>
         </form>
    </div>

            </>
  )
}

export default Signup