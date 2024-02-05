import {Logo} from "../index"
import {Link} from "react-router-dom"
import {useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import authserv from "../../appwrite/auth"
import { useEffect, useState } from "react"
const Header = () => {
  const [logos, setlogos] = useState("")
  const lo = async()=>{
    let l = await authserv.logo()
    setlogos(l.href)
    console.log('>>>>>>>>>>>', l)
  }
  useEffect(()=>{
    lo()
  },[])

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
      filepath: logos,
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
            
              <img onClick={()=> navigate(e.slug)} src={e.filepath} className=" w-[1.5rem] rounded-full bg-black"/>
            
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