'use client'
import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'


import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";


function Footer() {
  return (
    <footer>
      <div className='container'>
        <div>
          <h4 className='title'>Resources:</h4>
          <ul>
            <Link href='/apout-us'>apout us</Link>
            <Link href='/pricing'>pricing</Link>
            <Link href='/why-us'>why-us</Link>
            <Link href='/process'>process</Link>
          </ul>
        </div>
        <div>
          <h4 className='title'>Legal:</h4>
          <ul>
            <Link href=''>terms & condition</Link>
            <Link href=''>privacy policy</Link>

          </ul>
        </div>
        <div className='social'>
          <h4 className='title'>Follow Us:</h4>
          <ul>
            <Link href=''><FaFacebook/></Link>
            <Link href=''><FaInstagram/></Link>
            <Link href=''><FaLinkedin/></Link>
          </ul>
        </div>
      </div>
      <p className='copyRight'>© 2024  ANKH. All rights reserved.</p>
      <div className='banner'>ANKH</div>
    </footer>
  )
}

export default Footer