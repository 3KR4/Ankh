'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation'; // Updated import

function Header() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname(); // Using usePathname from next/navigation

  // Ensure the component is mounted to avoid any router issues
  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (route) => pathname === route;

  if (!mounted) {
    return null; // Optionally, return loading state if needed
  }

  return (
    <header data-aos="fade-down">
      <Link href='/' className='logo'>
        <Image src='/logo.png' alt="logo" fill></Image>
        <div className='title-logo'><h1>AN</h1><h1>KH.</h1></div>
      </Link>
      <nav>
        <Link href='/pricing' className={isActive('/pricing') ? 'active' : ''}>
          Pricing
        </Link>
        <Link href='/about' className={isActive('/about') ? 'active' : ''}>
          About Us
        </Link>
        <Link href='/why-us' className={isActive('/why-us') ? 'active' : ''}>
          Why ANKH
        </Link>
        <Link href='/process' className={isActive('/process') ? 'active' : ''}>
          Process
        </Link>
      </nav>
      <div>
        <button className='main-button'>Book Now</button>
        <label className="hamburger">
          <input type="checkbox"/>
          <svg viewBox="0 0 32 32">
            <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
            <path className="line" d="M7 16 27 16"></path>
          </svg>
        </label>
      </div>
    </header>
  );
}

export default Header;
