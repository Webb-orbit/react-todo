import React from "react"

function Button({
    child,
    bgcolor="bg-blue-500",
    textxolor="text-white",
    className=" ",
    type="button",
    ...props
}) {
    return(
<button className={`px-3 py-2 rounded ${className} ${bgcolor} ${textxolor}`} type={type} {...props}>{child}</button>
    )   
}

export default Button