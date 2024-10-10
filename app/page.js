'use client'
import React, { useContext, useEffect, useState, useRef } from 'react'

import { AllContext } from './Context'
import Services from './_components/Services'
import Access from './_components/Access'
import BookBtn from './_components/BookBtn'
import {  } from 'lucide-react'

import Link from 'next/link'
import Image from 'next/image'

import 'aos/dist/aos.css'; // AOS styles
import AOS from 'aos';


export default function Home() {
  const { lang, Departments, screenSize } = useContext(AllContext)



  return (
    <>
      <div className="hero home container" data-aos="zoom-in-up">
        <span className='hiddens'>Close Deals Swiftly</span>
        <h1>Connect, Close, Succeed</h1>
        <h2>Real Estate Made Easy.</h2>
        <p>Let our cold calling experts be your KEY in closing deals.</p>
        <div className='btns-holder'>
          <BookBtn />
          <Link className='main-button' href='/pricing'>Learn More</Link>
        </div>
      </div>
      <Services/>
      <div className='our-process container'>
          <span className='hiddens' data-aos="zoom-in-up">Ankh’s Approach</span>
          <h1 data-aos="zoom-in-up">Our Process</h1>
          <p data-aos="zoom-in-up">It couldn’t be easier to get started with <span>ANKH</span></p>

        <div className='holder'>
          <div className='box' data-aos="zoom-in-right">
            <Image src='/image/Choose your Customized plan.png' alt='icon' fill></Image>
            <h4>Choose your <br/> Customized plan</h4>
            <p>At Ankh, We shape our services around your goals and needs. We adjust our ways to suit your approach and strategies to closing a deal!</p>
          </div>
          <div className='box' data-aos="zoom-in-up">
            <Image src='/image/One-Week Test Run.png' alt='icon' fill></Image>
            <h4>One-Week <br/> Test Run</h4>
            <p>Trust is KEY . Test our service. See quality leads flow in and smooth closings with our trial.</p>
          </div>
          <div className='box' data-aos="zoom-in-left">
            <Image src='/image/You Seal the Deals We’ve Got the Rest.png' alt='icon' fill></Image>
            <h4>You Seal the Deals <br/> We’ve Got the Rest</h4>
            <p>We acquire your list. We filter the list. We nurture the leads. We deliver to you hot leads awaiting closure.</p>
          </div>
        </div>
        <div className='btns-holder' >
        <BookBtn aos={true}/>
          <Link className='main-button' href='/pricing' data-aos="zoom-in-up">View Pricing</Link>
        </div>
      </div>
      <div className='reviews container'>
        <span className='ico' data-aos="zoom-in-up">“</span>
        <h1 data-aos="zoom-in-up">That’s What People Say about <span>ANKH</span></h1>
        <div className='holder'>
          <div className='box' data-aos="fade-up-right">
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
          <div className='box' data-aos="fade-up">
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
          <div className='box' data-aos="fade-up-left">
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
      <Access h='Ready to Access Real Estate Expertise?' p='The Key to Real Estate Success is Just a Click Away' book={false}/>
    </>
  );
}