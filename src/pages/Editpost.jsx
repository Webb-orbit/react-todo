import React, { useEffect, useState } from 'react'
import { Postform } from '../compo'
import serv from '../appwrite/conf'
import { useNavigate, useParams } from 'react-router-dom'
function Editpost() {
    const [post, setpost] = useState(null)
    const {slug} = useParams()
    const nave = useNavigate()

    console.log('>>>>>>>>>>>slulg', slug)
    useEffect(()=>{
     if (slug) {
         serv.getpost(slug).then((e)=>{
                if (e) {
                    setpost(e)
                }
            })
        }else{
                nave("/")
        }

    },[slug, nave])

    return post? (
        <div>
                <Postform post={post}/>
        </div>
    ):null
}

export default Editpost