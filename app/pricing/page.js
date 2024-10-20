export const metadata = {
  title: 'ANKH - Pricing',
  description: 'Different Plans Adjusted for your Needs',
  icons: {
    icon: '/favicon.ico',
  },
};

import Access from '../_components/Access'
import Faq from '../_components/Faq'
import PlanCard from '../_components/PlanCard';

const plans = [
  {
    title: 'Silver',
    details: 'Our Most Affordable',
    options: [
      { name: '1 Agent', discount: 0 },
      { name: '2-4 Agents', discount: 20 },
      { name: '5-10 Agents', discount: 150 },
      { name: '11+ Agents', discount: 340 },
    ],
    features: {
      coldCaller: { name: 'Cold Caller', price: 300 },
      qualityAssurance: { name: 'Quality Assurance', price: 200 },
      customerSuccess: { name: 'Customer Success Manager', price: 400 },
    },
    extraPrice: null, // No extraPrice for Silver
  },
  {
    title: 'Gold',
    details: 'Let Us Take the Lead for You!',
    options: [
      { name: '1 Agent', discount: 0 },
      { name: '2-4 Agents', discount: 50 },
      { name: '5-10 Agents', discount: 100 },
      { name: '11+ Agents', discount: 150 },
    ],
    features: {
      coldCaller: { name: 'Cold Caller', price: 300 },
      qualityAssurance: { name: 'Quality Assurance', price: 200 },
      customerSuccess: { name: 'Customer Success Manager', price: 400 },
      tools: { name: 'Tools', price: 250 },
    },
    extraPrice: null, // No extraPrice for Gold
  },
  {
    title: 'Platinum',
    details: 'Fits for Your Unique Needs',
    options: [
      { name: '1 Agent', discount: 0 },
      { name: '2-4 Agents', discount: 100 },
      { name: '5-10 Agents', discount: 200 },
      { name: '11+ Agents', discount: 300 },
    ],
    features: {
      coldCaller: { name: 'Cold Caller', price: 300 },
      qualityAssurance: { name: 'Quality Assurance', price: 200 },
      customerSuccess: { name: 'Customer Success Manager', price: 400 },
      tools: { name: 'Tools', price: 250 },
    },
    extraPrice: [
      { name: 'Data Team', price: 1175 },
      { name: 'Acquisition Team', price: 1600 },
      // ... more extras ...
    ]
  },
  {
    title: 'Titanium',
    details: 'Ultimate Pack for Total Coverage',
    options: [
      { name: '1 Agent', discount: 0 },
      { name: '2-4 Agents', discount: 100 },
      { name: '5-10 Agents', discount: 200 },
      { name: '11+ Agents', discount: 300 },
    ],
    features: {
      coldCaller: { name: 'Cold Caller', price: 300 },
      qualityAssurance: { name: 'Quality Assurance', price: 200 },
      customerSuccess: { name: 'Customer Success Manager', price: 400 },
      tools: { name: 'Tools', price: 250 },
    },
    extraPrice: [
      { name: 'Data & Acquisition', price: 2775 },
    ]
  },
];

export default function Pricing() {

  return (
    <>
      <div className="hero pricing container">
        <span className='hiddens' data-aos="zoom-in-up">Simple Pricing</span>
        <h1 data-aos="zoom-in-up">Different Plans <br/> Adjusted for your Needs</h1>
        <p data-aos="zoom-in-up">Fully flexible and transparent. No surprises.</p>
        <div className="pricing-cards">
          {plans.map((plan, index) => (
            <PlanCard key={index} plan={plan} />
          ))}
        </div>
      </div>
      <Faq/>
      <Access h="Want to Make Sure You're Making the Right Decision?" p='Schedule a call, and we’ll walk you through everything!' book={true}/>
    </>
  );
}