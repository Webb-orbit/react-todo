import { useSelector } from 'react-redux'
import Logoutbtn from './Header/Logoutbtn';
const Frofile = () => {
    const frofiledata = useSelector(state=> state.userdata.userdata)

  return (
    <>
<div className="card container m-8 w-[60%] mx-auto" >
  <img src="" className='card-img-top' />
  <div className="card-body">
    <h5 className=" text-center font-semibold text-[1.2rem] capitalize">wellcome {frofiledata.name? frofiledata.name: null}</h5>
    <div className=' flex gap-2 items-center'>
    <p className="card-text">{frofiledata.email? frofiledata.email : frofiledata.phone}</p>
   {frofiledata.phone? <box-icon name='check' color="green"></box-icon>:null}
    </div>
  </div>
  <ul className="list-group list-group-flush">
    <li className="list-group-item ">userid: {frofiledata.$id}</li>
  </ul>

  <div className=" p-3 w-full flex items-center justify-end">
    <Logoutbtn/>
  </div>
</div>
    </>
  )
}

export default Frofile