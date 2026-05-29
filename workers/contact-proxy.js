// Manta Contact Proxy — Cloudflare Worker
// Recibe POST desde el formulario de contacto y lo reenvía a n8n.
// Rate limiting por IP (100 requests / 10 min).
// La URL real de n8n se define como secret de entorno (N8N_WEBHOOK_URL).

const RATE_LIMIT = 100;
const RATE_WINDOW_MS = 10 * 60 * 1000;

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return handleCORS();
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: corsHeaders(),
      });
    }

    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    const url = new URL(request.url);

    if (url.pathname !== "/api/contact") {
      return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
        headers: corsHeaders(),
      });
    }

    const { success } = await checkRateLimit(env, ip);
    if (!success) {
      return new Response(
        JSON.stringify({ error: "Demasiadas solicitudes. Intenta de nuevo más tarde." }),
        { status: 429, headers: corsHeaders() }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: corsHeaders(),
      });
    }

    const { name, email, category, message, source } = body;

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Faltan campos requeridos" }), {
        status: 400,
        headers: corsHeaders(),
      });
    }

    if (typeof email !== "string" || !email.includes("@") || email.length > 254) {
      return new Response(JSON.stringify({ error: "Email inválido" }), {
        status: 400,
        headers: corsHeaders(),
      });
    }

    const n8nUrl = env.N8N_WEBHOOK_URL;
    if (!n8nUrl) {
      return new Response(JSON.stringify({ error: "Server configuration error" }), {
        status: 500,
        headers: corsHeaders(),
      });
    }

    const payload = {
      name: sanitize(name),
      email: sanitize(email),
      category: category || "Otro",
      message: sanitize(message),
      source: source || "Manta Website Contact Form",
      timestamp: new Date().toISOString(),
      ip,
    };

    const n8nResponse = await fetch(n8nUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!n8nResponse.ok) {
      return new Response(JSON.stringify({ error: "Upstream error" }), {
        status: 502,
        headers: corsHeaders(),
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: corsHeaders(),
    });
  },
};

function sanitize(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

async function checkRateLimit(env, ip) {
  const id = `ratelimit:contact:${ip}`;
  const now = Date.now();

  const record = await env.KV.get(id);
  let entries = record ? JSON.parse(record) : [];

  entries = entries.filter((t) => now - t < RATE_WINDOW_MS);

  if (entries.length >= RATE_LIMIT) {
    return { success: false };
  }

  entries.push(now);
  await env.KV.put(id, JSON.stringify(entries), { expirationTtl: 600 });
  return { success: true };
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };
}

function handleCORS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(),
  });
}
