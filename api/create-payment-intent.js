import Stripe from 'stripe';

export async function handleCreatePaymentIntent(body) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const { amount, currency = 'php', items = [] } = body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency,
    automatic_payment_methods: { enabled: true },
    description: 'DM Keepsies Order',
    metadata: { items: JSON.stringify(items) },
  });

  return { clientSecret: paymentIntent.client_secret };
}

// Vercel serverless function export
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const result = await handleCreatePaymentIntent(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
