'use client';
import dynamic from 'next/dynamic';

const DynamicCheckoutPage = dynamic(() => import('./CheckoutPage'), { loading: () => <p className='Loader'>Loading Checkout Page...</p>, ssr: false });

export default function Checkout() {

  return (
  <DynamicCheckoutPage />
  );
}
