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
            {lable && <label className=' inline-block mb-1 pl-2' htmlFor={id} >{lable}</label>}
            <input type={type}
            spellCheck="false"
            className={ `px-3 py-2 rounde text-white outline-none w-full bg-transparent ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
}

export default React.forwardRef(Input)