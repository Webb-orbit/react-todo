import {useDispatch } from "react-redux"
import authserv from "../../appwrite/auth"
import { logout } from "../../store/authslice"
const Logoutbtn = () => {
    const disp = useDispatch()

    const logoutcontrol = ()=>{
        authserv.logout()
        .then(()=>{
            disp(logout())
          location.reload()
        })
    }
  return (
    <button
    onClick={logoutcontrol}
    className=" text-red-400 py-0 rounded-sm px-5 bg-stone-800"
    >log out</button>
  )
}

export default Logoutbtn