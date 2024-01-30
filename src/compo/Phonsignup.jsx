import React, { useState } from 'react'
import authserv from '../appwrite/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {Button, Input} from './index'
import { login } from '../store/authslice'
const Phonsignup = () => {
    const navi = useNavigate()
    const disp = useDispatch()
    const phuseridsli = useSelector(state => state.phoneuserid)
    const [err, seterr] = useState("")
    const {handleSubmit, register} = useForm()

console.log('from ghust', phuseridsli)
    const signupfun = async(data)=>{
        try {
          seterr("")
          const phsign = await authserv.phonelogin(phuseridsli, data.otp)
          if (phsign){
            const current = await authserv.getcurrentuser()
            if (current) disp(login(current))
            navi("/")
          }
        } catch (error) {
          seterr(error)
        }
      }
  return (
      <>
      <form onSubmit={handleSubmit(signupfun)}>
      <p className=' text-[0.8rem] text-red-400'>{err? err.response.message:null}</p>
    <Input
    type="text"
    placeholder="OTP"
    className="border-gray-400 border-2 my-2 placeholder-stone-400 placeholder:capitalize placeholder:text-[0.8rem]"
    {...register("otp",{
        required: true,
    })}
    />
    <Button child="sign up" className="w-full mt-3 capitalize" type='submit'/>
        </form>
    </>
  )
}

export default Phonsignup