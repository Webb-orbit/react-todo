import {Logoutbtn, Logo} from "../index"
import {Link} from "react-router-dom"
import {useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const Header = () => {
  const authstatus = useSelector(state => state.status)
  const navigate = useNavigate()
  const navitems =[
    {
      name: "home",
      slug: "/",
      active: true
    },
    {
      name: "login",
      slug: "/login",
      active: !authstatus
    },
    {
      name: "signup",
      slug: "/signup",
      active: !authstatus
    },
    {
      name: "allpost",
      slug: "/allpost",
      active: authstatus
    },
    {
      name: "addpost",
      slug: "/addpost",
      active: authstatus
    }
  ]
  return (
    <>
    <header className=" bg-cyan-500">
        <nav className="  h-14 w-full flex justify-between items-center px-5">
          <div>
            <Link to="/">
              <Logo/>
            </Link>
          </div>
          <ul className=" flex gap-3">
            {navitems.map((e)=> 
            e.active? (
              <li key={e.name}>
                <button
                onClick={()=>navigate(e.slug)} 
                >{e.name}</button>
              </li>

            ) : null
            )}
            {authstatus && (
              <li>
                <Logoutbtn/>
              </li>
            )}
          </ul>
        </nav>
    </header>
    </>
  )
}

export default Header