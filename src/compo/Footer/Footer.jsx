import Logoutbtn from "../Header/Logoutbtn"
import { useSelector } from "react-redux"
const Footer = () => {
  const authstatus = useSelector(state => state.status)
  return (
    <div>Footer</div>
  )
}

export default Footer