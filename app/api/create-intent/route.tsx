import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  typescript: true,
  apiVersion: "2023-08-16",
});

export async function POST(request: any) {
  const data: any = await request.json();
  const amount = data.amount;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(amount) * 100), // Convert amount to cents and ensure it's an integer
      currency: 'usd', // Use a valid 3-letter currency code
    });

    // Return clientSecret in an object
    return NextResponse.json({ clientSecret: paymentIntent.client_secret }, { status: 200 });
  } catch (error: any) {
    console.error("Stripe Error:", error.message); // Log the error for debugging
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
