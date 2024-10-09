'use client'
import React from 'react'
import FaqBox from './FaqBox'

const faq = [
  {
    title:'What are the payment Methods Available?',
    paragraph:'We offer a variety of flexible payment options to make the process as smooth as possible for you. credit and debit cards (Visa, MasterCard, American Express), bank transfers, digital wallets  via our various partners',
  },
  {
    title:'Do Ankh offer free trials?',
    paragraph:'We offer a variety of flexible payment options to make the process as smooth as possible for you. credit and debit cards (Visa, MasterCard, American Express), bank transfers, digital wallets  via our various partners',
  },
  {
    title:'Which plan is right for me?',
    paragraph:'We offer a variety of flexible payment options to make the process as smooth as possible for you. credit and debit cards (Visa, MasterCard, American Express), bank transfers, digital wallets  via our various partners',
  },
  {
    title:'Which plan is right for me?',
    paragraph:'We offer a variety of flexible payment options to make the process as smooth as possible for you. credit and debit cards (Visa, MasterCard, American Express), bank transfers, digital wallets  via our various partners',
  },
]

function Faq() {
  return (
    <div className='faq container'>
      <span className='hiddens'>Ankh’s Approach</span>
      <h1>Frequently Asked</h1>
      <h1 className='last'>Questions</h1>
      <div className='hold'>
        {faq.map((x) => <FaqBox data={x}/>)}
      </div>
    </div>
  )
}

export default Faq