import { useDispatch } from "react-redux"
import { useState, useEffect } from 'react'
import { login, logout } from "./store/authslice"
import authserv from "./appwrite/auth"
import './App.css'
import {Header, Footer} from "./compo/index"
import { Outlet } from "react-router-dom"
export default function App() {
  const [loading, setloading] = useState(true)
  const disp = useDispatch()

  useEffect(() => {
    authserv.getcurrentuser().then((data) => {
        if (data) {
          disp(login({ userdata: data }))
        } else {
          disp(logout())
        }
      })
      .finally(() => {
        setloading(false)
      })
  }, [])

  return !loading ? (
    <>
    <Header/>
    <main className=" min-h-[80vh]">
      <Outlet/>
    </main>
    <Footer/>
    </>
  ) : (<p>loading app</p>)
}


