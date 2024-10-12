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
      { name: '1 Agent', price: 1115, link: 'https://buy.stripe.com/test_link_for_1_agent' },
      { name: '2-4 Agents', price: 960, link: 'https://buy.stripe.com/test_link_for_2_4_agents' },
      { name: '5-10 Agents', price: 935, link: 'https://buy.stripe.com/test_link_for_5_10_agents' },
      { name: '11+ Agents', price: 920, link: 'https://buy.stripe.com/test_link_for_11_plus_agents' },
    ],
    features: ['Cold Caller', 'Quality Assurance', 'Customer Success Manager'],
    extraPrice: null, // No extraPrice for Silver
  },
  {
    title: 'Gold',
    details: 'Let Us Take the Lead for You!',
    options: [
      { name: '1 Agent', price: 1250, link: 'https://buy.stripe.com/test_link_for_1_agent_gold' },
      { name: '2-4 Agents', price: 1100, link: 'https://buy.stripe.com/test_link_for_2_4_agents_gold' },
      { name: '5-10 Agents', price: 1050, link: 'https://buy.stripe.com/test_link_for_5_10_agents_gold' },
      { name: '11+ Agents', price: 1000, link: 'https://buy.stripe.com/test_link_for_11_plus_agents_gold' },
    ],
    features: ['Cold Caller', 'Quality Assurance', 'Customer Success Manager', 'Tools'],
    extraPrice: null, // No extraPrice for Gold
  },
  {
    title: 'Platinum',
    details: 'Fits for Your Unique Needs',
    options: [
      { 
        name: '1 Agent', 
        price: 1250, 
        links: {
          default: 'https://buy.stripe.com/test_link_for_1_agent_acquisition_team', 
          dataTeam: 'https://buy.stripe.com/test_link_for_1_agent_data_team',
        }
      },
      { 
        name: '2-4 Agents', 
        price: 1100, 
        links: {
          default: 'https://buy.stripe.com/test_link_for_2_4_agents_acquisition_team', 
          dataTeam: 'https://buy.stripe.com/test_link_for_2_4_agents_data_team',
        }
      },
      { 
        name: '5-10 Agents', 
        price: 1050, 
        links: {
          default: 'https://buy.stripe.com/test_link_for_5_10_agents_acquisition_team', 
          dataTeam: 'https://buy.stripe.com/test_link_for_5_10_agents_data_team',
        }
      },
      { 
        name: '11+ Agents', 
        price: 1000, 
        links: {
          default: 'https://buy.stripe.com/test_link_for_11_plus_agents_acquisition_team', 
          dataTeam: 'https://buy.stripe.com/test_link_for_11_plus_agents_data_team',
        }
      },
    ],
    features: ['Cold Caller', 'Quality Assurance', 'Customer Success Manager', 'Tools'],
    extraPrice: { acquisitionTeam: 1600, dataTeam: 1175 }, // Extra prices affect the link selection
  },
  {
    title: 'Titanium',
    details: 'Ultimate Pack for Total Coverage',
    options: [
      { name: '1 Agent', price: 1250, link: 'https://buy.stripe.com/test_link_for_1_agent_titanium' },
      { name: '2-4 Agents', price: 1100, link: 'https://buy.stripe.com/test_link_for_2_4_agents_titanium' },
      { name: '5-10 Agents', price: 1050, link: 'https://buy.stripe.com/test_link_for_5_10_agents_titanium' },
      { name: '11+ Agents', price: 1000, link: 'https://buy.stripe.com/test_link_for_11_plus_agents_titanium' },
    ],
    features: ['Cold Caller', 'Quality Assurance', 'Customer Success Manager', 'Tools'],
    extraPrice: { dataAndAcquisition: 2775 }, // Just extra prices, no special links needed here
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