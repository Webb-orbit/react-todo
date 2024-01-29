import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SpeedInsights } from '@vercel/speed-insights/next';

import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {Authlayout, Login, Signup} from "./compo"
import Allposts from './pages/Allposts.jsx'
import Addpost from './pages/Addpost.jsx'
import Editpost from './pages/Editpost.jsx'
import Post from './pages/Post.jsx'
import Home from './pages/Home.jsx'
const rout= createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path: "/",
        element: <Home/> 
      },
      {
        path: "/login",
        element:(
          <Authlayout authencation={false} child={<Login/>}>
            
          </Authlayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <Authlayout authencation={false} child={<Signup/>}>
            
        </Authlayout>
        ),
      },
      {
        path: "/allpost",
        element:(
          <Authlayout authencation child={<Allposts/>}>
            
          </Authlayout>
        ),
      },
      {
        path: "/addpost",
        element:(
          <Authlayout authencation child={<Addpost/>}>
            
          </Authlayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element:(
          <Authlayout authencation child={<Editpost/>}>
            
          </Authlayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post/>
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={rout}/>
    <SpeedInsights/>

  </Provider>
)
