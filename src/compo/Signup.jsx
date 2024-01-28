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
        <h2>signup</h2>
    <div>
        <p>you have an accout <Link to="/login" className=' text-blue-400'>login</Link></p>
         <form onSubmit={handleSubmit(singupnow)}>
            <Input
            label="your email"
            type="email"
            placeholder="enter email"
            {...register("email",{
                required: true
            })}
            />

            <Input
            label="your password"
            type="password"
            placeholder="enter your password"
            {...register("password",{
                required: true,
                minLength: 5,
                maxLength:20
            })}
            />
                        <Input
            label="your full name"
            type="text"
            placeholder="enter your name"
            {...register("name",{
                required: true,
                maxLength: 20
            })}
            />
            <Button child="sign up now" type='submit'/>
         </form>
    </div>
            </>
  )
}

export default Signup