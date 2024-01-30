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

  const windowwidth = window.innerWidth
  if (windowwidth >= 600)return (
    <div>
        <div className=' flex flex-wrap'>
          {posts.map((e)=>(
            <div key={e.$id} className=' p-2 w-1/4'>
              <Postcard post={{...e}}/>
            </div>
          ))}
        </div>
    </div>
  )

  if (windowwidth <= 600)return (
    <div>
    <div className=' flex flex-wrap'>
      {posts.map((e)=>(
        <div key={e.$id} className=' p-1 w-1/2'>
          <Postcard post={{...e}}/>
        </div>
      ))}
    </div>
</div>
  )

}

export default Allposts