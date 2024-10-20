'use client'
import React, { useContext } from 'react'
import { usePlanContext } from '../Context'

export default function BookBtn({ aos }) {
  const { setBookMenu } = usePlanContext();

  return (
    <>
      {aos ? (
        <button className='main-button' data-aos="zoom-in-up" onClick={() => setBookMenu(true)}>
          Book Now
        </button>
      ) : (
        <button className='main-button' onClick={() => setBookMenu(true)}>
          Book Now
        </button>
      )}
    </>
  )
}