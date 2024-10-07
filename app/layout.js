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
          <svg className="backImg" width="1057px" height="2800px" viewBox="0 0 600 1869" xmlns="http://www.w3.org/2000/svg">
            <path d="M77.5082 442.223C120.494 399.254 120.494 329.587 77.5082 286.618C34.5224 243.649 -35.1714 243.649 -78.1573 286.618C-121.143 329.587 -121.143 399.254 -78.1573 442.223C-35.1714 485.192 34.5223 485.192 77.5082 442.223Z" fill="#161615"/>
            <path d="M566.918 743.19H566.973C564.824 743.108 562.648 743.135 560.5 743.245L108.339 777.829L171.391 697.097C297.853 553.448 358.784 332.701 235.214 168.896C197.477 120.462 145.113 85.3548 92.3904 54.5158C66.773 39.4818 40.9904 24.5303 16.9706 8.11956C7.35718 0.740217 -4.29456 -3.80304 -15.2577 4.29221C-75.6927 41.2991 -138.717 74.9191 -192.376 121.453C-216.478 142.985 -238.597 164.49 -254.629 192.768C-348.972 329.727 -309.031 514.899 -216.533 641.587C-188.74 679.805 -152.407 739.666 -125.412 778.628C-123.457 781.546 -566.472 743.245 -566.472 743.245C-568.621 743.135 -570.797 743.108 -572.945 743.19C-591.511 743.961 -606 752.277 -606 821.169V893.613C-606 962.478 -591.511 970.821 -572.945 971.592C-570.797 971.674 -568.621 971.647 -566.472 971.537L-214.66 934.282V950.555H-182.459V999.127H-134.392C-134.447 999.512 -134.53 999.898 -134.53 1000.31V1007.22H-134.723V1198.95C-134.723 1198.95 -134.64 1199 -134.613 1199.03L-25.0089 1295.93C-21.2627 1299.23 -21.2627 1305.09 -25.0089 1308.4L-134.613 1405.29C-134.613 1405.29 -134.833 1405.46 -134.916 1405.54V1478.26C-134.916 1478.26 -134.695 1478.4 -134.613 1478.51L-25.0089 1575.4C-21.2627 1578.71 -21.2627 1584.57 -25.0089 1587.88L-134.613 1684.77C-134.613 1684.77 -134.833 1684.94 -134.916 1685.02V1705.45L-134.723 1705.34V1778.78H-134.53V1794.64C-134.53 1798.49 -132.134 1802.07 -128.195 1804.05L-4.26703 1866.56C-0.135193 1868.65 5.01581 1868.65 9.14764 1866.56L133.075 1804.05C137.014 1802.07 139.411 1798.49 139.411 1794.64V999.209H184.034V950.638H219.183V935.549L560.472 971.647C562.621 971.757 564.797 971.785 566.945 971.702C585.511 970.931 600 962.616 600 893.723V821.279C600 752.414 585.511 744.071 566.945 743.3L566.918 743.19ZM-0.328003 743.135C-0.328003 743.135 -210.941 507.464 -196.59 340.658C-179.044 136.818 -0.328003 136.818 -0.328003 136.818C-0.328003 136.818 178.415 136.818 195.934 340.658C210.285 507.464 -0.328003 743.135 -0.328003 743.135ZM76.111 1716.11C76.111 1722.16 70.2713 1727.07 63.0819 1727.07C55.8925 1727.07 50.0528 1722.16 50.0528 1716.11V1070.94C50.0528 1064.88 55.8925 1059.98 63.0819 1059.98C70.2713 1059.98 76.111 1064.88 76.111 1070.94V1716.11Z" fill="#161615"/>
          </svg>
            <Black_Layer/>
            <Header />
            {children}
            <Footer />
          </body>
        </html>
      </AllProvider>
  );
}
