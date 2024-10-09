'use client'
import React, { useContext, useEffect, useState, useRef } from 'react'

import Access from '../_components/Access'
import Faq from '../_components/Faq'

import Link from 'next/link'
import Image from 'next/image'
import PlanCard from '../_components/PlanCard';

const plans = [
  {
    title: 'Silver',
    details: 'Our Most Affordable',
    options: [
      { name: '1 Agent', price: 1115 },
      { name: '2-4 Agents', price: 960 },
      { name: '5-10 Agents', price: 935 },
      { name: '11+ Agents', price: 920 }, // Default value
    ],
    features: ['Cold Caller', 'Quality Assurance', 'Customer Success Manager'],
    extraPrice: null, // No extraPrice for Silver
  },
  {
    title: 'Gold',
    details: 'Let Us Take the Lead for You!',
    options: [
      { name: '1 Agent', price: 1250 },
      { name: '2-4 Agents', price: 1100 },
      { name: '5-10 Agents', price: 1050 },
      { name: '11+ Agents', price: 1000 }, // Default value
    ],
    features: ['Cold Caller', 'Quality Assurance', 'Customer Success Manager', 'Tools'],
    extraPrice: null, // No extraPrice for Gold
  },
  {
    title: 'Platinum',
    details: 'Fits for Your Unique Needs',
    options: [
      { name: '1 Agent', price: 1250 },
      { name: '2-4 Agents', price: 1100 },
      { name: '5-10 Agents', price: 1050 },
      { name: '11+ Agents', price: 1000 }, // Default value
    ],
    features: ['Cold Caller', 'Quality Assurance', 'Customer Success Manager', 'Tools'],
    extraPrice: { acquisitionTeam: 1600, dataTeam: 1175 },
  },
  {
    title: 'Titanium',
    details: 'Ultimate Pack for Total Coverage',
    options: [
      { name: '1 Agent', price: 1250 },
      { name: '2-4 Agents', price: 1100 },
      { name: '5-10 Agents', price: 1050 },
      { name: '11+ Agents', price: 1000 }, // Default value
    ],
    features: ['Cold Caller', 'Quality Assurance', 'Customer Success Manager', 'Tools'],
    extraPrice: { dataAndAcquisition: 2775 },
  },
];


export default function Pricing() {

  return (
    <>
      <div className="hero pricing container">
        <span className='hiddens'>Simple Pricing</span>
        <h1>Different Plans <br/> Adjusted for your Needs</h1>
        <p>Fully flexible and transparent. No surprises.</p>
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