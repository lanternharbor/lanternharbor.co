/**
 * Cloudflare Pages Function — POST /api/contact
 *
 * Handles contact-form submissions. Validates the payload, deflects obvious
 * bot traffic via a honeypot field, and relays the message through Resend
 * (https://resend.com) to a configured mailbox.
 *
 * Required env vars (set in Cloudflare Pages → Settings → Environment variables):
 *
 *   RESEND_API_KEY        — API key from https://resend.com (Secret)
 *   CONTACT_TO_EMAIL      — where contact-form submissions are delivered
 *                           (e.g. william@lanternharbor.co)
 *   CONTACT_FROM_EMAIL    — verified sender on lanternharbor.co
 *                           (e.g. "Lantern Harbor <hello@lanternharbor.co>")
 *   TURNSTILE_SECRET_KEY  — (optional) Cloudflare Turnstile secret. When set,
 *                           submissions must include a valid cf-turnstile-response
 *                           token. When unset, the honeypot is the sole defense.
 *
 * Until DNS/DKIM is configured for lanternharbor.co in Resend, you can set
 * CONTACT_FROM_EMAIL to "onboarding@resend.dev" to test end-to-end.
 */

type Env = {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
  TURNSTILE_SECRET_KEY?: string;
};

type Context = {
  request: Request;
  env: Env;
};

type Payload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  company_website?: unknown; // honeypot
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });

const isString = (v: unknown): v is string => typeof v === 'string';
const str = (v: unknown, max = 4000) =>
  isString(v) ? v.trim().slice(0, max) : '';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export async function onRequestPost(context: Context): Promise<Response> {
  const { request, env } = context;

  // Parse JSON (client-enhanced fetch) or form-encoded (no-JS fallback).
  let data: Payload = {};
  let turnstileToken = '';
  const contentType = request.headers.get('content-type') || '';
  try {
    if (contentType.includes('application/json')) {
      const raw = (await request.json()) as Record<string, unknown>;
      data = raw as Payload;
      turnstileToken = str(raw['cf-turnstile-response'], 2048);
    } else {
      const form = await request.formData();
      data = {
        name: form.get('name'),
        email: form.get('email'),
        phone: form.get('phone'),
        message: form.get('message'),
        company_website: form.get('company_website'),
      };
      turnstileToken = str(form.get('cf-turnstile-response'), 2048);
    }
  } catch {
    return json({ ok: false, error: 'Could not parse request' }, 400);
  }

  const honeypot = str(data.company_website, 200);
  if (honeypot) {
    // Likely a bot — respond success without sending so they don't retry.
    return json({ ok: true });
  }

  // Verify Cloudflare Turnstile token if the secret is configured. Gating on
  // presence lets us ship the code change before the env var is set without
  // breaking the form.
  const turnstileSecret = env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret) {
    if (!turnstileToken) {
      return json(
        { ok: false, error: 'Please complete the verification step and try again.' },
        400,
      );
    }

    let verified = false;
    try {
      const verifyRes = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            secret: turnstileSecret,
            response: turnstileToken,
            remoteip: request.headers.get('CF-Connecting-IP') ?? '',
          }),
        },
      );
      const verify = (await verifyRes.json()) as { success?: boolean };
      verified = verify.success === true;
    } catch (err) {
      console.error('Turnstile verify failed', err);
    }

    if (!verified) {
      return json(
        {
          ok: false,
          error:
            "Verification didn't succeed. Please try again, or email william@lanternharbor.co directly.",
        },
        403,
      );
    }
  }

  const name = str(data.name, 120);
  const email = str(data.email, 200);
  const phone = str(data.phone, 40);
  const message = str(data.message, 4000);

  if (!name || !email || !message) {
    return json(
      { ok: false, error: 'Please include your name, email, and a message.' },
      400,
    );
  }
  if (!EMAIL_RE.test(email)) {
    return json({ ok: false, error: 'Please use a valid email address.' }, 400);
  }

  const to = env.CONTACT_TO_EMAIL;
  const from = env.CONTACT_FROM_EMAIL;
  const key = env.RESEND_API_KEY;

  if (!key || !to || !from) {
    // Fail gracefully — don't leak which env var is missing to the client.
    console.error('Contact function missing required env vars.', {
      has_key: Boolean(key),
      has_to: Boolean(to),
      has_from: Boolean(from),
    });
    return json(
      {
        ok: false,
        error:
          "Can't send just now. Please email william@lanternharbor.co directly.",
      },
      500,
    );
  }

  // No-JS fallback submissions have type 'application/x-www-form-urlencoded';
  // everything else is JSON from our client fetch.
  const wantsHtmlResponse = !contentType.includes('application/json');

  const textBody = [
    `New note from the Lantern Harbor contact form`,
    ``,
    `Name:    ${name}`,
    `Email:   ${email}`,
    phone ? `Phone:   ${phone}` : null,
    ``,
    `Message:`,
    message,
  ]
    .filter((l) => l !== null)
    .join('\n');

  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0F2A3F; line-height: 1.5;">
      <p style="margin: 0 0 1em; color: #6b6b6b; font-size: 14px;">
        New note from the Lantern Harbor contact form
      </p>
      <table style="border-collapse: collapse;">
        <tr><td style="padding: 2px 12px 2px 0; color: #6b6b6b;">Name</td><td style="padding: 2px 0;"><strong>${escapeHtml(name)}</strong></td></tr>
        <tr><td style="padding: 2px 12px 2px 0; color: #6b6b6b;">Email</td><td style="padding: 2px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #0F2A3F;">${escapeHtml(email)}</a></td></tr>
        ${phone ? `<tr><td style="padding: 2px 12px 2px 0; color: #6b6b6b;">Phone</td><td style="padding: 2px 0;"><a href="tel:${escapeHtml(phone)}" style="color: #0F2A3F;">${escapeHtml(phone)}</a></td></tr>` : ''}
      </table>
      <hr style="border: 0; border-top: 1px solid #e5e5e5; margin: 1.5em 0;" />
      <div style="white-space: pre-wrap; font-size: 15px;">${escapeHtml(message)}</div>
    </div>
  `.trim();

  try {
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Lantern Harbor: note from ${name}`,
        text: textBody,
        html: htmlBody,
      }),
    });

    if (!resp.ok) {
      const body = await resp.text().catch(() => '');
      console.error('Resend API error', resp.status, body);
      return json(
        {
          ok: false,
          error:
            "Can't send just now. Please email william@lanternharbor.co directly.",
        },
        502,
      );
    }
  } catch (err) {
    console.error('Resend fetch failed', err);
    return json(
      {
        ok: false,
        error:
          "Can't send just now. Please email william@lanternharbor.co directly.",
      },
      502,
    );
  }

  // For no-JS fallback, redirect to a thank-you page so the user gets feedback.
  if (wantsHtmlResponse) {
    return new Response(null, {
      status: 303,
      headers: { Location: '/contact/thanks' },
    });
  }

  return json({ ok: true });
}
