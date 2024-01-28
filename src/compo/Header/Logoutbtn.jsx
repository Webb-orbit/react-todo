import {useDispatch } from "react-redux"
import authserv from "../../appwrite/auth"
import { logout } from "../../store/authslice"

const Logoutbtn = () => {
    const disp = useDispatch()

    const logoutcontrol = ()=>{
        authserv.logout()
        .then(()=>{
            disp(logout())
        })
    }
  return (
    <button
    onClick={logoutcontrol}
    >log out</button>
  )
}

export default Logoutbtn