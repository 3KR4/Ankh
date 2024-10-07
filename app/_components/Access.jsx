'use client'

import Link from 'next/link'

function Access({h, p, book}) {
  return (
  <div className={`access ${book ? 'book' : ''}`}>
    <h1>{h}</h1>
    <p>{p}</p>
    {book ?
      <button className='main-button'>Book Now</button> 
    :
      <Link className='main-button' href='/'>Succeed in Real Estate!</Link>
    }
  </div>
  )
}

export default Access