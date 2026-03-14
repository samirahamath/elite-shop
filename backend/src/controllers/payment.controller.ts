import { Request, Response } from 'express';
import Stripe from 'stripe';
import prisma from '../config/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});

export const createCheckoutSession = async (req: Request, res: Response): Promise<void> => {
  try {
    const { items } = req.body; // Array of { productId, quantity }

    // Dummy array of line items since we don't fetch full DB products in this MVP snippet
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: `Product ${item.productId}`, // In reality fetch name and price from DB
        },
        unit_amount: 1000, // $10.00
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}/cancel`,
    });

    res.json({ id: session.id, url: session.url });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const stripeWebhook = async (req: Request, res: Response): Promise<void> => {
  const sig = req.headers['stripe-signature'] as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err: any) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    // Fulfill the order
    console.log(`Payment successful for session: ${session.id}`);
  }

  res.status(200).send();
};
