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
      
      <svg className='banner' width="1331" height="318" viewBox="0 0 1331 318" fill="red" xmlns="http://www.w3.org/2000/svg">
        <path d="M126.711 0.794189H243.626L370.336 415.794H289.697L262.922 329.337H106.846L80.6398 415.794H0L126.711 0.794189ZM240.466 256.14L184.305 74.2862L129.007 256.14H240.445H240.466Z" fill="#242424"/>
        <path d="M384.303 0.794189H463.784L644.065 277.454V0.794189H723.546V415.794H644.065L463.784 139.113V415.794H384.303V0.794189Z" fill="#242424"/>
        <path d="M646.235 0.794189H724.558V192.156L882.382 0.794189H978L804.629 205.416L988.933 415.794H889.861L724.558 226.73V415.794H646.235V0.794189Z" fill="#242424"/>
        <path d="M988.575 0.794189H1066.9V171.411H1252.36V0.794189H1330.68V415.794H1252.36V244.608H1066.9V415.794H988.575V0.794189Z" fill="#242424"/>
      </svg>

    </footer>
  )
}

export default Footer