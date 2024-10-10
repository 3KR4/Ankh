'use client'

import Link from 'next/link'

function Access({h, p, book}) {
  return (
  <div className={`access ${book ? 'book' : ''}`} data-aos="fade-right">
    <h1 data-aos="fade-up-right">{h}</h1>
    <p data-aos="fade-up-right">{p}</p>
    {book ?
      <button className='main-button' data-aos="fade-up-right">Book Now</button> 
    :
      <Link className='main-button' href='/' data-aos="fade-up-right">Succeed in Real Estate!</Link>
    }
  </div>
  )
}

export default Access