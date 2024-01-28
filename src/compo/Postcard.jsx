import React from 'react'
import serv from "../appwrite/conf"
import { Link } from 'react-router-dom'

const Postcard = ({post}) => {
  console.log("cared",post.photoimg);
  return (
    <Link to={`/post/${post.$id}`}>
        <div className=' w-full bg-blue-500 p-3 rounded'>
            <div className=' w-full justify-center mb-4'>
                <img src={serv.getfilepreview(post.photoimg)} className=' rounded' />
            </div>
            <h2 className=' text-white font-semibold text-[1rem] text-xs'>{post.title}</h2>
        </div>
    </Link>
  )
}

export default Postcard