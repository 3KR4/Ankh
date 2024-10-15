export const metadata = {
  title: 'ANKH - Why Us',
  description: 'Our Virtual Assistance and Real Estate Expertise Unlocks the Key to Elevating Investors & Realtors',
  icons: {
    icon: '/favicon.ico',
  },
};

import Access from '../_components/Access'
import BookBtn from '../_components/BookBtn'
import Image from 'next/image'

export default function Home() {

  return (
    <>
      <div className="hero why container">
        <span className='hiddens' data-aos="zoom-in-up">Why ANKH</span>
        <h1 data-aos="zoom-in-up">Our Virtual Assistance and <span>Real Estate</span> Expertise Unlocks the Key to Elevating Investors & Realtors</h1>
        <p data-aos="zoom-in-up">If your goal is to boost your leads with a committed team, then We’re the key. <br/> However, we won’t just enhance your leads; we’ll grow your business to new levels.</p>
        <div className='btns-holder' data-aos="zoom-in-up">
        <BookBtn />
        </div>
      </div>

      <div className='holder four container'>
        <div className='box' data-aos="fade-up-right">
          <Image src='/image/Customizable Packages.png' alt='icon' fill></Image>
          <h4>Customizable <br/> Packages</h4>
          <p>Ankh’s Packages provides your business with flexibility and value, by offering multiple solutions enabling you to select the exact services and features that align with your business needs</p>
        </div>
        <div className='box' data-aos="fade-up">
          <Image src='/image/Experience in Real-Estate.png' alt='icon' fill></Image>
          <h4>Experience in <br/> Real-Estate</h4>
          <p>With years of expertise in the real estate industry, we bring a skill set that guarantees a superior standard of service and precision delivering exceptional lead results.</p>
        </div>
        <div className='box' data-aos="fade-up-left">
          <Image src='/image/One-Week Trial.png' alt='icon' fill></Image>
          <h4>One-Week <br/> Trial</h4>
          <p>Discover how a one-week trial with Ankh can deliver results that others can’t achieve in months.</p>
        </div>
        <div className='box' data-aos="fade-up-right">
          <Image src='/image/High-Quality Leads.png' alt='icon' fill></Image>
          <h4>High-Quality <br/> Leads</h4>
          <p>By investing in Ankh, we ensure that your business focuses on the most promising opportunities, leading to greater success.</p>
        </div>
        <div className='box' data-aos="fade-up">
          <Image src='/image/Professionally Trained Cold Callers.png' alt='icon' fill></Image>
          <h4>Professionally Trained <br/> Cold Callers</h4>
          <p>Each call is executed precisely, engaging with more effective techniques and generating more leads resulting in a higher conversation rate.</p>
        </div>
        <div className='box' data-aos="fade-up-left">
          <Image src='/image/Time-Saving Assistance.png' alt='icon' fill></Image>
          <h4>Time-Saving <br/> Assistance</h4>
          <p>Our Virtual Assistance is the Key to Time Freedom. We Get You Hot Prospects - You Close Deals.</p>
        </div>
        
      </div>

      <Access h="Want to Make Sure You're Making the Right Decision?" p='Schedule a call, and we’ll walk you through everything!' book={true}/>
    </>
  );
}