'use client'

import Link from 'next/link'
import BookBtn from '../_components/BookBtn'
import Image from 'next/image'
import { useEffect, useState } from 'react'

function Payment_confirm() {
  const [hasCustomPlan, setHasCustomPlan] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check if the URL contains "customPlan"
      setHasCustomPlan(window.location.search.includes('customPlan'))
    }
  }, [])

  return (
    <div className="hero payment container" data-aos="zoom-in-up">
      <Image src='/favicon.ico' fill />
      
      {hasCustomPlan ? (
        <>
          <h1>Custom Plan Request Confirmed!</h1>
          <h2>Your custom plan details have been sent to your inbox.</h2>
          <p>Our team will reach out shortly to discuss further details.</p>
        </>
      ) : (
        <>
          <h1>Payment Successful!</h1>
          <h2>Your order details have been sent to your inbox.</h2>
          <p>If you have any questions or need assistance, feel free to contact our support team.</p>
        </>
      )}
      
      <div className='btns-holder'>
        <BookBtn />
        {hasCustomPlan ? (
          <a className='main-button' href='https://ankhcallcenter.com'>Back to home</a>
        ) : (
          <Link className='main-button' href='/'>Back to home</Link>
        )}
        
      </div>
    </div>
  )
}

export default Payment_confirm
