import React,{useId} from 'react'

function Input({
    lable,
    type = "text",
    className="",
    ...props
}, ref) {
    const id = useId()
    return(
        <div className=' w-full'>
            {lable ? <label className=' inline-block mb-1 pl-2' htmlFor={id} >{lable}</label>:null}
            <input type={type}
            className={ `px-3 py-2 rounded bg-white text-black outline-none w-full ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
}

export default React.forwardRef(Input)