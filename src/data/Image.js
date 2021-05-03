import React from 'react'
import SingleImage from './SingleImage';
import './Image.css'

export default function Image({result}) {
    const { name , photos,type } = result;
   return (
        <div className="image">
            <h2>Type: {type}</h2>
            <h1>Name: {name}</h1>
            {
                photos.map(item =>{
                    return <SingleImage key={item.id} images={item} />
                })
            }
        </div>
    )
}
