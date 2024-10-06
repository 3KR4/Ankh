'use client'
import React, { useContext, useEffect, useState, useRef } from 'react'

import { AllContext } from '../Context'
import Access from '../_components/Access'
import { CornerDownRight } from 'lucide-react'

import Link from 'next/link'
import Image from 'next/image'

export default function About() {
  const { lang, Departments, screenSize } = useContext(AllContext)

  return (
    <>
      <div className='mission container'>
        <div className='left'>
          <span className='hiddens'>Mission & Vision</span>
          <h1>Guiding the Future <br/> of <span>Real Estate</span> with <br/> Purpose and Integrity </h1>
          <Link className='main-button' href='/'>Learn More</Link>
        </div>
        <div className='right'>
          <div className='hold'>
            <h1>Our <span>Vision</span></h1>
            <p>We will drive growth for realtors & investors by easing closures, lead generation, and beyond</p>
          </div>
          <div className='hold'>
            <h1>Our <span>Mission</span></h1>
            <p>Be the most reliable partner for realtors and investors, going beyond lead delivery t o help upscale their business.</p>
          </div>
        </div>
      </div>
      <Access/>
    </>
  );
}