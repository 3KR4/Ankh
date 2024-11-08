'use client'
import React from 'react'
import FaqBox from './FaqBox'

const faq = [
  {
    title:'How many calls does each agent handle?',
    paragraph:'Each agent is responsible for managing up to 500 calls.',
  },
  {
    title:'What payment methods do you accept?',
    paragraph:'We offer several payment options, including Stripe, Payoneer, and wire transfer.',
  },
  {
    title:'How customizable are your plans?',
    paragraph:'Our plans are highly customizable to meet your specific requirements. Contact us to discuss your needs.',
  },
  {
    title:'How can I evaluate the performance of the agents?',
    paragraph:'We send weekly performance reports to help you assess agent effectiveness.',
  },
  {
    title:'Where do you operate?',
    paragraph:'We provide services all over the United States.',
  },
  {
    title:'How do you ensure the quality of your service?',
    paragraph:'We maintain service quality through regular monitoring, feedback, and quality assurance processes.',
  },
]

function Faq() {
  return (
    <div className='faq container'>
      <span className='hiddens' data-aos="zoom-in-up">Ankh’s Approach</span>
      <h1 data-aos="zoom-in-up">Frequently Asked</h1>
      <h1 className='last' data-aos="zoom-in-up">Questions</h1>
      <div className='hold' data-aos="fade-up-right">
        {faq.map((x) => <FaqBox data={x}/>)}
      </div>
    </div>
  )
}

export default Faq