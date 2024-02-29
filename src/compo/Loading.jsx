import loadgif from "../assets/load.gif"
export default function Loading() {
  return (
    <div className=' w-full h-screen flex items-center justify-center'>
      <img src={loadgif} className=' w-[3.5rem]' />
    </div>
  )
}

