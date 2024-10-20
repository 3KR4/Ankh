'use client'
import Image from 'next/image'

function Reviews() {
  return (
    <div className='reviews container'>
      <span className='ico' data-aos="zoom-in-up">“</span>
      <h1 data-aos="zoom-in-up">That’s What People Say about <span>ANKH</span></h1>
      <div className='holder'>
        <div className='box' data-aos="fade-up-right">
        <Image src='/image/first-review.png' alt='icon' fill></Image>
          <p>I have been using ANKH for my lead generation needs and I couldn't be happier with the results. Not only do they provide top-notch support, but their services are also incredibly affordable.</p>
          <div className='user'>
            <div className='info'>
              <h4>Omar Gamal</h4>
              <h5>Angel Investor & CEO</h5>
            </div>
          </div>
        </div>
        <div className='box' data-aos="fade-up">
          <Image src='/image/second-review.png' alt='icon' fill></Image>
          <p>I have been using ANKH for my lead generation needs and I couldn't be happier with the results. Not only do they provide top-notch support, but their services are also incredibly affordable.</p>
          <div className='user'>
            <div className='info'>
              <h4>Faris Nabulsi</h4>
              <h5>Chairman of AL Mizan</h5>
            </div>
          </div>
        </div>
        <div className='box' data-aos="fade-up-left">
        <Image src='/image/third-review.png' alt='icon' fill></Image>
          <p>I highly recommend ANKH to anyone looking to boost their lead generation and overall business growth. Thank you, ANKH, for your exceptional services!</p>
          <div className='user'>
            <div className='info'>
              <h4>Omar Karem</h4>
              <h5>CEO of RealtorsDream</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reviews