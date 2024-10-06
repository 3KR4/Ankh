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
        <h1>ANKH.</h1>
      </Link>
      <nav>
        <Link href='/pricing'>Pricing</Link>
        <Link href='/apout-us'>Apout Us</Link>
        <Link href='/why-us'>Why ANKH</Link>
        <Link href='/process'>Process</Link>
      </nav>
      <button className='main-button'>Book Now</button>
    </header>
  )
}

export default Header
