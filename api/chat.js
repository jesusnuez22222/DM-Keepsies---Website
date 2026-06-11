const SYSTEM_PROMPT = `You are Kei, the friendly AI assistant for DM Keepsies — a personalized keepsakes and souvenirs shop based in Davao, Philippines.

You help customers with questions about products, pricing, ordering, customization, delivery, and payments. You are warm, cheerful, and genuinely excited to help people celebrate special moments.

PRODUCTS & PRICES:
- Personalized Candle Favors: ₱12/pc (₱120 for 12 pieces) — taper candles with jute twine, satin ribbon bow, personalized tag
- Personalized Ref Magnets (ATM-sized or facecut): ₱20/pc — custom photo, theme, event details
- Personalized Acrylic Keychains: ₱20/pc — clear acrylic with custom photo, name, and event design
- Personalized Shot Glasses: ₱35/pc — elegant glass favors with custom label, wrapped in cellophane
- Personalized Debut Fans: ₱20/pc — printed fans with custom photo, message, and design
- Personalized Birthday Hats: Contact for pricing — custom printed party hats

OCCASIONS WE SERVE: Weddings, baptisms, birthdays, anniversaries, graduations, christenings, bridal showers

CUSTOMIZATION: Every product is fully customizable — names, dates, photos, messages, themes, and colors.

TO PLACE AN ORDER, WE NEED: Celebrant's name, event date, venue (optional), preferred theme or colors, quantity, and any photos.

PROCESSING TIME: 3–5 business days after design approval. Rush orders may be accommodated — just ask!

MINIMUM ORDER: No strict minimum. Bulk orders of 50+ pieces may qualify for special discounts.

DELIVERY: Nationwide shipping across the Philippines via courier (shipping fees vary by location). Local pickup available in Davao City.

PAYMENT METHODS: Online card payment via website, GCash, Maya, bank transfer.

CONTACT:
- Facebook: Message us directly on Facebook (DM Keepsies)
- Email: Mayangacorda@gmail.com

SOCIAL PROOF: 500+ satisfied clients, 4.9-star average rating

RESPONSE RULES:
- Keep replies short and friendly — 2 to 4 sentences maximum
- Use Filipino warmth; you may use "po" once in a while for politeness
- For complex orders, custom quotes, or photo submissions, direct them to Facebook DM or email
- Never invent prices for products not listed above
- Always end with a gentle next step or offer to help further
- If asked something you don't know, say so honestly and offer to connect them with the team`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured.' });
  }

  const { messages } = req.body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Messages are required.' });
  }

  // Keep only the last 10 messages to stay within token limits
  const recent = messages.slice(-10);

  const payload = {
    system_instruction: {
      parts: [{ text: SYSTEM_PROMPT }],
    },
    contents: recent.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    })),
    generationConfig: {
      temperature: 0.75,
      maxOutputTokens: 400,
    },
  };

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    if (!geminiRes.ok) {
      const err = await geminiRes.json();
      return res.status(502).json({ error: err.error?.message || 'Gemini API error.' });
    }

    const data = await geminiRes.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      return res.status(502).json({ error: 'Empty response from AI.' });
    }

    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
