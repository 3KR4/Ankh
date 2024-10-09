'use client'
import React from 'react'
import { useState } from 'react';
import { X, Plus } from 'lucide-react'

function FaqBox({data}) {
  const [ clickd, setIsClicked ] = useState(false)
  
  console.log(data);
  return (
    <div className={`box ${clickd && 'active'}`}>
      <button onClick={() => {
        setIsClicked((prev) => !prev)
      }}> 
        {data.title}
        <div className='btns'>
          {clickd ? <X/> : <Plus/>}
        </div>
      </button>
      <div className='hiddin'>{data.paragraph}</div>
    </div>
  )
}

export default FaqBox