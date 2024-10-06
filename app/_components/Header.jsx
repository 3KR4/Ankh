'use client'
import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import {  } from 'lucide-react'
import { AllContext } from '../Context'

function Header() {

  const {  } = useContext(AllContext)

  return (
    <header>
      <Link href='/' className='logo'>
        <Image src='/logo.png' alt="logo" fill></Image>
        <div className='title-logo'><h1>AN</h1><h1>KH.</h1></div>
      </Link>
      <nav>
        <Link href='/pricing'>Pricing</Link>
        <Link href='/about'>About Us</Link>
        <Link href='/why-us'>Why ANKH</Link>
        <Link href='/process'>Process</Link>
      </nav>
      <button className='main-button'>Book Now</button>
    </header>
  )
}

export default Header
