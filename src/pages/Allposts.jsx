import React, { useEffect, useState } from 'react'
import serv from '../appwrite/conf'
import { Postcard} from '../compo'
function Allposts() {
  const [posts, setposts]=useState([])
  useEffect(()=>{
    serv.getallposts([]).then((post)=>{
      if (post) setposts(post.documents)
    }
  )
  },[])
  return (
    <div>
        <div className=' flex flex-wrap'>
          {posts.map((e)=>(
            <div key={e.$id} className=' p-2 w-1/4'>
              <Postcard post={{...e}}/>
              {console.log('>>>>>>>>>>>',e)}
            </div>
          ))}

        </div>
    </div>
  )
}

export default Allposts