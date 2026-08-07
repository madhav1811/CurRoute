import webpush from 'web-push';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

async function sha256Hex(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS });
    }

    if (url.pathname === '/vapid-public-key' && request.method === 'GET') {
      return new Response(env.VAPID_PUBLIC_KEY, { headers: { 'Content-Type': 'text/plain', ...CORS } });
    }

    if (url.pathname === '/subscribe' && request.method === 'POST') {
      let body;
      try {
        body = await request.json();
      } catch (_) {
        return json({ error: 'invalid json' }, 400);
      }
      const { subscription, reminderTime, tzOffsetMinutes } = body || {};
      if (!subscription || !subscription.endpoint) return json({ error: 'missing subscription' }, 400);

      const id = await sha256Hex(subscription.endpoint);
      const existing = await env.SUBSCRIPTIONS.get(`sub:${id}`, 'json');
      const record = {
        subscription,
        reminderTime: /^\d{1,2}:\d{2}$/.test(reminderTime || '') ? reminderTime : '20:00',
        tzOffsetMinutes: Number.isFinite(tzOffsetMinutes) ? tzOffsetMinutes : 0,
        lastSentDate: existing?.lastSentDate || null,
        loggedDate: existing?.loggedDate || null,
      };
      await env.SUBSCRIPTIONS.put(`sub:${id}`, JSON.stringify(record));
      return json({ ok: true });
    }

    if (url.pathname === '/unsubscribe' && request.method === 'POST') {
      let body;
      try {
        body = await request.json();
      } catch (_) {
        return json({ error: 'invalid json' }, 400);
      }
      if (body?.endpoint) {
        const id = await sha256Hex(body.endpoint);
        await env.SUBSCRIPTIONS.delete(`sub:${id}`);
      }
      return json({ ok: true });
    }

    if (url.pathname === '/logged' && request.method === 'POST') {
      let body;
      try {
        body = await request.json();
      } catch (_) {
        return json({ error: 'invalid json' }, 400);
      }
      const { endpoint, date } = body || {};
      if (endpoint && date) {
        const id = await sha256Hex(endpoint);
        const existing = await env.SUBSCRIPTIONS.get(`sub:${id}`, 'json');
        if (existing) {
          existing.loggedDate = date;
          await env.SUBSCRIPTIONS.put(`sub:${id}`, JSON.stringify(existing));
        }
      }
      return json({ ok: true });
    }

    return json({ error: 'not found' }, 404);
  },

  async scheduled(_event, env) {
    webpush.setVapidDetails(
      env.VAPID_SUBJECT || 'mailto:admin@example.com',
      env.VAPID_PUBLIC_KEY,
      env.VAPID_PRIVATE_KEY
    );

    const now = new Date();
    let cursor;
    do {
      const list = await env.SUBSCRIPTIONS.list({ prefix: 'sub:', cursor });
      for (const key of list.keys) {
        const record = await env.SUBSCRIPTIONS.get(key.name, 'json');
        if (!record) continue;

        const localMs = now.getTime() - record.tzOffsetMinutes * 60000;
        const local = new Date(localMs);
        const hh = local.getUTCHours();
        const mm = local.getUTCMinutes();
        const todayStr = local.toISOString().slice(0, 10);

        const [targetHour, targetMinute] = (record.reminderTime || '20:00').split(':').map(Number);
        const isTargetMinute = hh === targetHour && mm === targetMinute;
        const alreadySent = record.lastSentDate === todayStr;
        const alreadyLogged = record.loggedDate === todayStr;

        if (isTargetMinute && !alreadySent && !alreadyLogged) {
          try {
            const details = webpush.generateRequestDetails(
              record.subscription,
              JSON.stringify({ title: 'CurRoute', body: "Don't forget to log today's spending." })
            );
            const res = await fetch(details.endpoint, {
              method: details.method,
              headers: details.headers,
              body: details.body,
            });
            if (res.status === 404 || res.status === 410) {
              await env.SUBSCRIPTIONS.delete(key.name);
              continue;
            }
            record.lastSentDate = todayStr;
            await env.SUBSCRIPTIONS.put(key.name, JSON.stringify(record));
          } catch (_) {
            // best-effort; try again next minute
          }
        }
      }
      cursor = list.list_complete ? undefined : list.cursor;
    } while (cursor);
  },
};
