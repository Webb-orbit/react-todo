import React, { useId } from 'react'

const Select = ({
    opctions,
    lable,
    className="",
    ...props
}, ref) => {
    const id = useId()
  return (
    <div className=' w-full'>
        {lable && <label htmlFor={id} className=''></label>}
        <select {...props} id={id} className={`px-3 py-2 rounded bg-white text-black border-black w-full bouder ${className}`} ref={ref}>
            {opctions?.map((e)=>(
                 <option key={e} value={e}>
                    {e}
                 </option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)