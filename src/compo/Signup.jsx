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
    const {register, handleSubmit} = useForm()
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
  return (
    <>
    <div className='flex items-center justify-center flex-col w-full'>
        <h2 className=' text-center font-semibold text-[2rem] capitalize'>signup</h2>
        <p className=' capitalize text-center text-[1.1rem]'>you have an accout <Link to="/login" className=' text-blue-400 font-semibold'>login</Link></p>
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
                        <Input
            type="text"
            autoComplete='off'
            placeholder="enter your name"
            className=" border-gray-400 border-2 my-2 placeholder-stone-400 placeholder:capitalize placeholder:text-[0.8rem]"
            {...register("name",{
                required: true,
                maxLength: 20
            })}
            />
            <Button className="w-full mt-3 capitalize" child="sign up now" type='submit'/>
         </form>
    </div>
            </>
  )
}

export default Signup