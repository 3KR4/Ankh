'use client'

import Link from 'next/link'
import BookBtn from './BookBtn'

function Access({h, p, book}) {
  return (
  <div className={`access ${book ? 'book' : ''}`} data-aos="fade-right">
    <h1 data-aos="fade-up-right">{h}</h1>
    <p data-aos="fade-up-right">{p}</p>
    {book ?
      <BookBtn aos={true}/>
    :
      <Link className='main-button' href='/' data-aos="fade-up-right">Succeed in Real Estate!</Link>
    }
  </div>
  )
}

export default Access