'use client';
import { useState } from 'react';
import Access from '../_components/Access';
import Faq from '../_components/Faq';
import PlanCard from '../_components/PlanCard';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';
import { usePlanContext } from '../Context';

export default function Pricing() {

  const { states, setClientInfo } = usePlanContext();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [state, setState] = useState('Select Your State');
    const [menu, setMenu] = useState(false);

    const onSubmit = (data) => {
      setClientInfo({
        name: data.name,
        email: data.email,
        state: state,
        message: data.message,
        agents: data.numAgents,
        dataTeam: data.numDataTeam,
      })
      sendEmail(data.name, data.email, state, data.message, data.numAgents, data.numDataTeam)
    };

    const sendEmail = async (name, email, state, message, agents, dataTeam) => {
      await fetch(`/api/send-email-custom`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          state,
          message,
          agents,
          dataTeam,
        }),
      })
      .then(response => response.json())
      .then(data => window.location.href = `/payment-confirm?customPlan=true`)
      .catch(error => console.error('Error sending email:', error));
    };;
    
    

    return (
        <>
            <div className="hero pricing container">
                <span className='hiddens' data-aos="zoom-in-up">Simple Pricing</span>
                <h1 data-aos="zoom-in-up">Different Plans <br /> Adjusted for your Needs</h1>
                <p data-aos="zoom-in-up">Fully flexible and transparent. No surprises.</p>
                <div className="pricing-cards">
                    <PlanCard plan='Silver' details='Our Most Affordable' />
                    <PlanCard plan='Gold' details='Let Us Take the Lead for You!' />
                    <PlanCard plan='Platinum' details='Fits for Your Unique Needs' />
                    <PlanCard plan='Titanium' details='Ultimate Pack for Total Coverage' />
                </div>
                <Link data-aos="zoom-in-up" href='/checkout' className='main-button'>Get Started</Link>
            </div>

            <div className="customPlan hero container" id='customPlan'>
                <h1 data-aos="zoom-in-up">Contact Us To Make <br /> Your <span>Custom Plan</span></h1>
                <p data-aos="zoom-in-up" style={{ marginTop: '6px' }}>Tailored Just for You</p>
                <form onSubmit={handleSubmit(onSubmit)} data-aos="zoom-in-up">
                  <div className="rowHolder">
                    {/* Full Name Validation */}
                    <div className={`inputHolder ${errors.name ? 'notvalid' : ''}`}>
                      <h6 className="placeHolder" onClick={() => document.getElementById('userName').focus()}>
                        Enter your Full name
                      </h6>
                      <div className="holder">
                        <input
                          type="text"
                          id="userName"
                          {...register('name', {
                            required: 'Please enter your full name',
                            validate: {
                              minLength: (value) => value.length >= 3 || 'At least 3 characters required',
                              hasTwoWords: (value) => value.trim().split(' ').length >= 2 || 'Please enter both first and last name',
                            },
                          })}
                          placeholder="Enter your Full name"
                        />
                      </div>
                      {errors.name && <p className="error">{errors.name.message}</p>}
                    </div>

                    {/* State Selection */}
                    <div className={`select ${state === 'Select Your State' ? 'notvalid' : ''}`}>
                      <div className="btn" onClick={() => setMenu((prev) => !prev)}>
                        {state === 'Select Your State' ? '' : 'State:'} {state}
                        <Image src="/image/angle down.png" fill />
                      </div>
                      <ul className={`menu ${menu && 'active'}`}>
                        {states.map((x, idx) => (
                          <li
                            key={idx}
                            className={state === x ? 'active' : ''}
                            onClick={() => {
                              setMenu(false);
                              setState(x);
                            }}
                          >
                            {x}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className={`inputHolder ${errors.email ? 'notvalid' : ''}`}>
                    <h6 className="placeHolder" onClick={() => document.getElementById('userEmail').focus()}>
                      Enter Your Email
                    </h6>
                    <div className="holder">
                      <input
                        type="email"
                        id="userEmail"
                        {...register('email', {
                          required: 'Please enter your email',
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Please enter a valid email address',
                          },
                        })}
                        placeholder="Enter Your Email"
                      />
                    </div>
                    {errors.email && <p className="error">{errors.email.message}</p>}
                  </div>

                  <div className='rowHolder'>
                    <div className={`inputHolder ${errors.numAgents ? 'notvalid' : ''}`}>
                      <h6 className="placeHolder" onClick={() => document.getElementById('numAgents').focus()}>
                        Enter number of agents
                      </h6>
                      <div className="holder">
                        <input
                          type="number"
                          id="numAgents"
                          {...register('numAgents', {
                            required: 'Please enter the number of agents',
                            min: { value: 1, message: 'Must be at least 1' },
                          })}
                          placeholder="Enter number of agents"
                        />
                      </div>
                      {errors.numAgents && <p className="error">{errors.numAgents.message}</p>}
                    </div>

                    <div className={`inputHolder ${errors.numDataTeam ? 'notvalid' : ''}`}>
                      <h6 className="placeHolder" onClick={() => document.getElementById('numDataTeam').focus()}>
                        Enter number of Data Records
                      </h6>
                      <div className="holder">
                        <input
                          type="number"
                          id="numDataTeam"
                          {...register('numDataTeam', {
                            required: 'Please enter the number of Data Records',
                            min: { value: 1, message: 'Must be at least 1' },
                          })}
                          placeholder="Enter number of Data Records"
                        />
                      </div>
                      {errors.numDataTeam && <p className="error">{errors.numDataTeam.message}</p>}
                    </div>
                  </div>

                  <div className={`inputHolder ${errors.message ? 'notvalid' : ''}`}>
                    <h6 className="placeHolder" onClick={() => document.getElementById('message').focus()}>
                      Tell Us what is your need
                    </h6>
                    <div className="holder">
                      <textarea
                        id="message"
                        {...register('message', {
                          required: 'Please Tell Us what is your need',
                          min: { value: 20, message: 'Must be at least 20 characters' },
                        })}
                        placeholder="Tell Us what is your need"
                      />
                    </div>
                    {errors.message && <p className="error">{errors.message.message}</p>}
                  </div>

                  <button className="main-button" type="submit">Send Us</button>
                </form>
            </div>

            <Access h="Want to Make Sure You're Making the Right Decision?" p='Schedule a call, and we’ll walk you through everything!' book={true} />
        </>
    );
}
