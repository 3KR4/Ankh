export const metadata = {
  title: 'ANKH - Process',
  description: 'We shape our services around your goals and needs.',
  icons: {
    icon: '/favicon.ico',
  },
};

import Access from '../_components/Access'
import BookBtn from '../_components/BookBtn'
import Link from 'next/link'
import Image from 'next/image'
import Services from '../_components/Services'
import Faq from '../_components/Faq'

export default function Home() {

  return (
    <>
      <div className='our-process process-page container'>
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
        <div className='btns-holder' data-aos="zoom-in-up">
        <BookBtn />
          <Link className='main-button' href='/pricing'>View Pricing</Link>
        </div>
      </div>

      <Services/>

      <Faq/>

      <Access h='Ready to Access Real Estate Expertise?' p='The Key to Real Estate Success is Just a Click Away' book={false}/>
    </>
  );
}