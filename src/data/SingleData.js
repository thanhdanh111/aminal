import React from 'react'
import Image from './Image'

export default function SingleData({result}) {
    return (
        <div >
            {
                result.map(item =>{
                    return <Image key={item.id} result={item} />
                })
            }
        </div>
    )
}
