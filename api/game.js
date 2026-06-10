/**
 * Vercel serverless function — Build Your Souvenir game
 *
 * Before deploying, run this SQL in your Supabase SQL editor:
 *
 *   CREATE TABLE IF NOT EXISTS game_plays (
 *     id         uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
 *     ip_hash    text        NOT NULL,
 *     played_at  timestamptz DEFAULT now() NOT NULL,
 *     game_period integer    NOT NULL
 *   );
 *   CREATE INDEX IF NOT EXISTS idx_gp_ip ON game_plays (ip_hash);
 *   ALTER TABLE game_plays DISABLE ROW LEVEL SECURITY;
 *
 * Also ensure SUPABASE_URL and SUPABASE_ANON_KEY are set in Vercel
 * project environment variables.
 */

import crypto from 'crypto';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;
const COOLDOWN_MS  = 10 * 24 * 60 * 60 * 1000; // 10 days

function hashIp(ip) {
  return crypto.createHash('sha256').update(ip + 'dmkeepsies-bys-v1').digest('hex');
}

function getPeriod() {
  return Math.floor(Date.now() / COOLDOWN_MS);
}

function getClientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (fwd) return fwd.split(',')[0].trim();
  return req.socket?.remoteAddress || '127.0.0.1';
}

async function sbFetch(path, opts = {}) {
  const url = `${SUPABASE_URL}/rest/v1/${path}`;
  const res = await fetch(url, {
    ...opts,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      ...(opts.headers || {}),
    },
  });
  if (opts.method === 'POST') return res.ok;
  return res.json();
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const ip     = getClientIp(req);
  const ipHash = hashIp(ip);
  const period = getPeriod();

  // ── GET: check if this IP can play ──────────────────────
  if (req.method === 'GET') {
    try {
      const rows = await sbFetch(
        `game_plays?ip_hash=eq.${ipHash}&order=played_at.desc&limit=1`
      );

      if (!Array.isArray(rows) || rows.length === 0) {
        return res.status(200).json({ canPlay: true, period });
      }

      const elapsed  = Date.now() - new Date(rows[0].played_at).getTime();
      if (elapsed >= COOLDOWN_MS) {
        return res.status(200).json({ canPlay: true, period });
      }

      const daysLeft = Math.ceil((COOLDOWN_MS - elapsed) / (24 * 60 * 60 * 1000));
      return res.status(200).json({ canPlay: false, daysLeft, period });
    } catch {
      // Fail open — if Supabase is unreachable, let the game show
      return res.status(200).json({ canPlay: true, period });
    }
  }

  // ── POST: record that this IP played ────────────────────
  if (req.method === 'POST') {
    try {
      await sbFetch('game_plays', {
        method: 'POST',
        headers: { Prefer: 'return=minimal' },
        body: JSON.stringify({ ip_hash: ipHash, game_period: period }),
      });
      return res.status(200).json({ ok: true });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
