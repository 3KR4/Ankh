import Access from '../_components/Access'

import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'ANKH - About Us',
  description: 'Guiding the Future of Real Estate with Purpose and Integrity',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function About() {

  return (
    <>
      <div className='mission container'>
        <div className='left' data-aos="zoom-in-right">
          <span className='hiddens'>Mission & Vision</span>
          <h1>Guiding the Future <br/> of <span>Real Estate</span> with <br/> Purpose and Integrity </h1>
          <Link className='main-button' href='/'>Learn More</Link>
        </div>
        <div className='right' data-aos="zoom-in-left">
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
      <div className='values container'>
        <h1 data-aos="zoom-in-up">What <span>Ankh</span> Represents</h1>
        <div className='holder four'>
        <div className='box' data-aos="zoom-in-right">
          <Image src='/image/Honesty.png' alt='icon' fill></Image>
          <h4>Honesty</h4>
          <p>We ensure transparency about our processes and results giving you a clear view of how well our cold-calling generates high closure rate leads.</p>
        </div>
        <div className='box' data-aos="zoom-in-up">
          <Image src='/image/Accountability.png' alt='icon' fill></Image>
          <h4>Accountability</h4>
          <p>We take full responsibility for our campaigns' efficiency, ensuring you get high-quality leads that are ready to close.</p>
        </div>
        <div className='box' data-aos="zoom-in-up">
          <Image src='/image/Collaboration.png' alt='icon' fill></Image>
          <h4>Collaboration</h4>
          <p>We work closely with clients to tailor our strategies and goals to meet your business needs.</p>
        </div>
        <div className='box' data-aos="zoom-in-left">
          <Image src='/image/Positivity.png' alt='icon' fill></Image>
          <h4>Positivity</h4>
          <p>Each cold call is met with enthusiasm making every call a step closer to closing a deal.</p>
        </div>
        </div>
      </div>
      <div className='our-process aboutPag container'>
        <span className='hiddens' data-aos="zoom-in-up">Meet The Team</span>
        <h1 data-aos="zoom-in-up">The People <br/> Behind <span>ANKH</span></h1>
        <div className='holder'>
          <div className='box' data-aos="zoom-in-right">
            <Image src='/image/linkid.png' alt='icon' fill></Image>
            <h4>Doha | Business Developer <br/> <span>Previous Role overhere</span></h4>
            <p>Doha is a master at forging partnerships and identifying new market opportunities. Her expertise in business strategy and relationship building has been key to expanding our client base and boosting revenue.</p>
          </div>
          <div className='box' data-aos="zoom-in-up">
            <Image src='/image/linkid.png' alt='icon' fill></Image>
            <h4>Ibrahim Kamal | Founder <br/> <span>Previous Role overhere</span></h4>
            <p>With a decade of experience in strategic leadership, Ibrahim is the visionary behind our success. His passion for innovation and his ability to turn bold ideas into actionable plans have positioned our company as a market leader. </p>
          </div>
          <div className='box' data-aos="zoom-in-left">
            <Image src='/image/linkid.png' alt='icon' fill></Image>
            <h4>Heba Kamal | CFO <br/> <span>Previous Role overhere</span></h4>
            <p>Heba is the financial backbone of our company, with an eye for detail and a knack for optimizing budgets. With over 15 years of experience in financial management.</p>
          </div>
        </div>
      </div>
      <div className='about container' data-aos="zoom-in">
        <span className='hiddens'>About Us</span>
        <h1>A Note from the <span>Founders</span></h1>
        <div className='p-holder'>
          <p>What if the wisdom of the ancient Egyptians could unlock modern real estate success? Ankh
            connects centuries, harnessing the power of Egypt’s eternal key into advanced solutions for
            today’s real estate market. Just as the Ankh symbol opened doors to fortune for the Egyptians,
            our virtual assistance and cold-calling tools unlock golden opportunities in real estate. Ankh’s
            Key provides opportunities to build your business just as Ankh’s symbol gave the ancient
            Egyptians the key to building our world.
          </p>
          <p> Think of the pharaohs wielding the power of today’s technology – that’s the level of
            transformation we bring to your business. Ankh’s virtual assistance is the modern-day
            innovation we provide to you, precisely managing your leads and data. Our cold-calling
            expertise ensures each call is perfectly handled, maximizing your chances of closure success,
            similar to how the ancient Egyptians diligently crafted each hieroglyphic inscription to convey
            detailed messages and ensure successful communication with their people.
          </p>
          <p>Ankh’s cold callers transform market chaos into pure opportunities with hard work, clear vision, and quality leads giving you the key to closing your real estate deals swiftly.</p>
        </div>
      </div>
      <Access h='Ready to Access Real Estate Expertise?' p='The Key to Real Estate Success is Just a Click Away' book={false}/>
    </>
  );
}