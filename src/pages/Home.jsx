import React, { useEffect, useState } from 'react'
import serv from '../appwrite/conf'
import { Postcard } from '../compo'
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

    if (navigator.onLine == false) return <p className=' text-center hover:font-bold mt-8'>OFLINE</p>
    if (post.length === 0) return <p className=' text-center hover:font-bold mt-8'>NO POSTS / LOGIN TO SEE POSTS</p>
        
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
                        <div key={e.$id} className='p-2  w-1/2'>
                            <Postcard post={{...e}}/>
                        </div>
                    ))}
                </div>
    )
} 

export default Home