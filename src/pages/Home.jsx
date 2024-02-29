import { useEffect, useState } from 'react'
import serv from '../appwrite/conf'
import { Postcard } from '../compo'
import { useSelector } from 'react-redux'
function Home() {
    const load = useSelector(state => state.status)
    console.log('>>>>>>>>>>>load', load)
    const [post, setpost] = useState([])
    useEffect(() => {
        serv.getallposts()
            .then((po) => {
                if (po) {
                    setpost(po.documents)
                }
            })
    }, [])


    const widthofwindow = window.innerWidth

    if (navigator.onLine == false) return <p className=' text-center hover:font-bold mt-8'>OFFLINE</p>

    if (widthofwindow >= 600) return (
        <div className='flex flex-wrap'>
            {post.map((e) => (
                <div key={e.$id} className='p-2  w-1/4'>
                    <Postcard post={{ ...e }} />
                </div>
            ))}
        </div>
    )

    if (widthofwindow <= 600) return (
        <div className='flex flex-wrap'>
            {post.map((e) => (
                <div key={e.$id} className='p-2  w-[90vw] mx-auto my-2'>
                    <Postcard post={{ ...e }} />
                </div>
            ))}
        </div>
    )
}

export default Home