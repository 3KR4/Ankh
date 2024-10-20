'use client'
import React, { useContext } from 'react'
import { usePlanContext } from '../Context'
import { InlineWidget } from 'react-calendly'
import { X } from 'lucide-react'

export default function Calendly() {
  const { bookMenu, setBookMenu } = usePlanContext()

  return (
    <div className={`calendly-container ${bookMenu && 'active'}`}>
      <div className="hold">
        <InlineWidget 
          url="https://calendly.com/johnedwards-talktohomes/30min"
          styles={{ height: '100%', width: '100%' }} // Ensuring the widget takes full size of the container
        />
      </div>
      <X className='close-btn' onClick={() => setBookMenu(false)} />
    </div>
  )
}
