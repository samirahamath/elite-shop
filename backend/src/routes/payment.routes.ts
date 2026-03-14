import { Router } from 'express';
import express from 'express';
import { createCheckoutSession, stripeWebhook } from '../controllers/payment.controller';

const router = Router();

router.post('/create-checkout-session', express.json(), createCheckoutSession);
// Stripe needs raw body for webhooks, handled in index.ts or here. 
// For simplicity, we just route it, but in root usually express.raw is needed.
router.post('/webhook', express.raw({type: 'application/json'}), stripeWebhook);

export default router;
