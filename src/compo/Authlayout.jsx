import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Authlayout = ({child, authencation=true}) => {
    const navigat = useNavigate()
    const [load, setload] = useState(true)
    const status = useSelector(state=> state.status)
    console.log('>>>>>>>>>>>sdc', status)

    useEffect(()=>{
        if (authencation && status !== authencation) {
            navigat("/login")
        } else if (!authencation && status !== authencation){
            navigat("/")
        }
        setload(false)
    },[authencation, status, navigat])

  return load ? <p>loading....</p> : <>{child}</>
}

export default Authlayout