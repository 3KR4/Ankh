'use client'
import { useContext, useState, useEffect } from "react";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import Black_Layer from "./_components/Black_Layer";
import { AllProvider } from "./Context";

export default function RootLayout({ children }) {

  useEffect(() => {
    const applyDarkMode = (isDarkMode) => {
      if (isDarkMode) {
        document.body.classList.add('dark');
        localStorage.setItem('dark-mode', 'true');
      } else {
        document.body.classList.remove('dark');
        localStorage.setItem('dark-mode', 'false');
      }
    };

    const storedDarkMode = localStorage.getItem('dark-mode');
    
    if (!storedDarkMode) {
      // First time visit: Check system dark mode and apply
      const isSystemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyDarkMode(isSystemDarkMode);
    } else {
      // Apply stored preference from localStorage
      applyDarkMode(storedDarkMode === 'true');
    }

    // Listen for system theme changes and update in real-time
    const themeChangeListener = (e) => {
      applyDarkMode(e.matches);
    };
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', themeChangeListener);

    // Cleanup event listener on unmount
    return () => {
      mediaQuery.removeEventListener('change', themeChangeListener);
    };
  }, []);

  return (
      <AllProvider>
        <html lang="en">
          <body className=''>
            <Black_Layer/>
            <Header />
            {children}
            <Footer />
          </body>
        </html>
      </AllProvider>
  );
}
