import React, { useEffect, useState } from 'react'
import serv from '../appwrite/conf'
import { Postcard, Button } from '../compo'
import { Link } from 'react-router-dom'
function Home() {
    const [post, setpost] = useState([])
    useEffect(()=>{
        serv.getallposts()
        .then((po)=>{
            if (po) {
                setpost(po.documents)
            }
        })
    },[])


    const widthofwindow = window.innerWidth

    if (navigator.onLine == false) return <p className=' text-center hover:font-bold mt-8'>OFFLINE</p>

    if (post.length === 0) return (<>
    <p className=' text-center hover:font-bold mt-8'>LOGIN TO SEE POSTS</p>
    <Link to={"/login"} className=' w-full flex mt-7 justify-center'><Button child="login" className=' px-6'/> </Link>
    </>
    )
        
    if (widthofwindow >= 600) return(
                <div className='flex flex-wrap'>
                    {post.map((e)=>(
                        <div key={e.$id} className='p-2  w-1/4'>
                            <Postcard post={{...e}}/>
                        </div>
                    ))}
                </div>
    )

    if (widthofwindow <= 600) return(
        <div className='flex flex-wrap'>
                    {post.map((e)=>(
                        <div key={e.$id} className='p-2  w-[90vw] mx-auto my-2'>
                            <Postcard post={{...e}}/>
                        </div>
                    ))}
                    </div>
    )
} 

export default Home