import {Logo} from "../index"
import {Link} from "react-router-dom"
import {useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import logo from "../../assets/frologo.png"
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
    },
  ]
  const icons =[
    {
      filepath: logo,
      slug: "/frofile",
      active: authstatus
    }
  ]
  return (
    <>
    <header className=" bg-cyan-500">
        <nav className=" h-14 w-full flex justify-between items-center px-5">
          <div>
            <Link to="/">
              <Logo/>
            </Link>
          </div>

          <ul className="flex gap-3 items-center justify-between">
            {navitems.map((e)=> 
            e.active? (
              <li key={e.name}>
                <button
                onClick={()=>navigate(e.slug)} 
                className=" text-white text-[0.9rem] capitalize"
                >{e.name}</button>
              </li>
            ) : null
            )}
                    <div>
          {icons.map((e)=>(
            e.active?(
              <div key={e.filepath}>
            
              <img onClick={()=> navigate(e.slug)} src={e.filepath} className=" w-[1.4rem] rounded-full bg-black p-1"/>
            
              </div>
            ):null
          ))}
          </div>
          </ul>
          
        </nav>

    </header>
    </>
  )
}

export default Header