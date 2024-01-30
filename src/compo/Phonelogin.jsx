import React, { useState } from 'react'
import { phonelog } from '../store/authslice'
import { useDispatch, useSelector } from 'react-redux'
import authserv from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import {Button, Input} from "./index"
import { useNavigate } from 'react-router-dom'
const Phonelogin = () => {
  const navi = useNavigate()
  const disp = useDispatch()
  const phuseridsli = useSelector(state => state.phoneuserid)
  const [err, seterr] = useState("")
  const {handleSubmit, register} = useForm()

  const loginfun = async(data)=>{
    console.log('>>>>>>>>>>>', data.num)
try {
  seterr("")
  const authsign = await authserv.phonesignup(data.num)
  console.log('>>>>>>>>>>authsign>', authsign)
  disp(phonelog(String(authsign.userId)))
  console.log("phuseridsli",phuseridsli)
  navi("/phonesignup")

} catch (error) {
  seterr(error)
}
}



console.log("phuseridsli",typeof phuseridsli);
return (
    <form onSubmit={handleSubmit(loginfun)}>
      <p className=' text-[0.8rem] text-red-400'>{err? err.response.message:null}</p>
<Input
type="text"
placeholder="+910123456789"
className="border-gray-400 border-2 my-2 placeholder-stone-400 placeholder:capitalize placeholder:text-[0.8rem]"
{...register("num",{
  required: true
})}
/>
<Button child="Get OTP" className="w-full mt-3 capitalize" type='submit'/>
    </form>
  )
}

export default Phonelogin