'use client'
import React, { useContext, useEffect, useState, useRef } from 'react'

import { AllContext } from './Context'
import Services from './_components/Services'
import Access from './_components/Access'
import { CornerDownRight } from 'lucide-react'

import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  const { lang, Departments, screenSize } = useContext(AllContext)

  return (
    <>
      <div className="hero container">
        <span className='hiddens'>Close Deals Swiftly</span>
        <h1>Connect, Close, Succeed</h1>
        <h2>Real Estate Made Easy.</h2>
        <p>Let our cold calling experts be your KEY in closing deals.</p>
        <div className='btns-holder'>
          <button className='main-button'>Bock Now</button>
          <Link className='main-button' href='/pricing'>Learn More</Link>
        </div>
      </div>
      <Services/>
      <div className='our-process container'>
        <span className='hiddens'>Ankh’s Approach</span>
        <h1>Our Process</h1>
        <p>It couldn’t be easier to get started with <span>ANKH</span></p>
        <div className='holder'>
          <div className='box'>
            <Image src='/image/Choose your Customized plan.png' alt='icon' fill></Image>
            <h4>Choose your <br/> Customized plan</h4>
            <p>At Ankh, We shape our services around your goals and needs. We adjust our ways to suit your approach and strategies to closing a deal!</p>
          </div>
          <div className='box'>
            <Image src='/image/One-Week Test Run.png' alt='icon' fill></Image>
            <h4>One-Week <br/> Test Run</h4>
            <p>Trust is KEY . Test our service. See quality leads flow in and smooth closings with our trial.</p>
          </div>
          <div className='box'>
            <Image src='/image/You Seal the Deals We’ve Got the Rest.png' alt='icon' fill></Image>
            <h4>You Seal the Deals <br/> We’ve Got the Rest</h4>
            <p>We acquire your list. We filter the list. We nurture the leads. We deliver to you hot leads awaiting closure.</p>
          </div>
        </div>
      </div>
      <div className='reviews container'>
        <span className='ico'>“</span>
        <h1>That’s What People Say about <span>ANKH</span></h1>
        <div className='holder'>
          <div className='box'>
          <Image src='/image/first-review.png' alt='icon' fill></Image>
            <p>I have been using ANKH for my lead generation needs and I couldn't be happier with the results. Not only do they provide top-notch support, but their services are also incredibly affordable.</p>
            <div className='user'>
              <Image src='/image/' alt='icon' fill></Image>
              <div className='info'>
                <h4>Omar Gamal</h4>
                <h5>Angel Investor & CEO</h5>
              </div>
            </div>
          </div>
          <div className='box'>
            <Image src='/image/second-review.png' alt='icon' fill></Image>
            <p>I have been using ANKH for my lead generation needs and I couldn't be happier with the results. Not only do they provide top-notch support, but their services are also incredibly affordable.</p>
            <div className='user'>
              <Image src='/image/' alt='icon' fill></Image>
              <div className='info'>
                <h4>Faris Nabulsi</h4>
                <h5>Chairman of AL Mizan</h5>
              </div>
            </div>
          </div>
          <div className='box'>
          <Image src='/image/third-review.png' alt='icon' fill></Image>
            <p>I highly recommend ANKH to anyone looking to boost their lead generation and overall business growth. Thank you, ANKH, for your exceptional services!</p>
            <div className='user'>
              <Image src='/image/' alt='icon' fill></Image>
              <div className='info'>
                <h4>Omar Karem</h4>
                <h5>CEO of RealtorsDream</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Access/>
    </>
  );
}