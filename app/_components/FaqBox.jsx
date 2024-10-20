'use client'
import React from 'react'
import { useState } from 'react';
import { Plus } from 'lucide-react'

function FaqBox({data}) {
  const [ clickd, setIsClicked ] = useState(false)
  return (
    <div className={`box ${clickd && 'active'}`}>
      <button onClick={() => {
        setIsClicked((prev) => !prev)
      }}> 
        {data.title}
        <div className='btns'>
          <Plus/>
        </div>
      </button>
      <div className='hiddin'>{data.paragraph}</div>
    </div>
  )
}

export default FaqBox