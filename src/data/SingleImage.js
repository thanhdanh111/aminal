import React from 'react'
import defaultIMG from '../laptop1.jpg'
export default function SingleImage({images}) {
    const {small} =images

    return (
        <>
            
            {
                small ?
                <img src={small} alt="asdsa" style={{widows:"100px",height:"100px",margin:"10px"}} /> 
                :
                null
            }
        </>
    )
}
