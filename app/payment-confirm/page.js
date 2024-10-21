'use client'

import Link from 'next/link'
import BookBtn from '../_components/BookBtn'
import Image from 'next/image'

function Payment_confirm() {
  return (
    <div className="hero payment container" data-aos="zoom-in-up">
      <Image src='/favicon.ico' fill />
      <h1>Payment Successful!</h1>
      <h2>your order details has been sent to your inbox.</h2>
      <p>If you have any questions or need assistance, feel free to contact our support team.</p>
      <div className='btns-holder'>
        <BookBtn />
        <Link className='main-button' href='/'>Back to home</Link>
      </div>
    </div>
  )
}

export default Payment_confirm