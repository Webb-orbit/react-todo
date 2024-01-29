import Logoutbtn from "../Header/Logoutbtn"
import { useSelector } from "react-redux"
const Footer = () => {
  const authstatus = useSelector(state => state.status)
  return (
    <div className=" bg-neutral-800 h-9 w-full flex justify-between px-2 items-center">
      <p className=" font-bold uppercase ">footer</p>
      {authstatus && (
                <Logoutbtn/>
            )}
    </div>
  )
}

export default Footer