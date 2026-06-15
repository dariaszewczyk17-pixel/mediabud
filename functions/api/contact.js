/**
 * Cloudflare Pages Function — /api/contact
 * POST body: { name, email, phone, subject, message }
 * Wysyła mail przez SMTP home.pl → sprzedaz@mediabud.pl
 */

import { WorkerMailer } from "worker-mailer";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return json({ ok: false, error: "Brak wymaganych pól (name, email, message)" }, 400);
    }

    const { SMTP_HOST, SMTP_USER, SMTP_PASS } = context.env;

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      console.error("Brak zmiennych SMTP w env");
      return json({ ok: false, error: "Błąd konfiguracji serwera" }, 500);
    }

    const htmlBody = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#f81828;border-bottom:2px solid #f81828;padding-bottom:8px">
          Nowe zapytanie ze strony mediabud.pl
        </h2>
        <table style="width:100%;border-collapse:collapse;margin:16px 0">
          <tr><td style="padding:8px;font-weight:bold;color:#333;width:120px">Imię i nazwisko:</td><td style="padding:8px">${escapeHtml(name)}</td></tr>
          <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:bold;color:#333">Email:</td><td style="padding:8px"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
          <tr><td style="padding:8px;font-weight:bold;color:#333">Telefon:</td><td style="padding:8px">${phone ? `<a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a>` : "—"}</td></tr>
          <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:bold;color:#333">Temat:</td><td style="padding:8px">${escapeHtml(subject || "Zapytanie ze strony")}</td></tr>
        </table>
        <div style="background:#f5f5f5;padding:16px;border-radius:8px;margin:16px 0">
          <p style="margin:0 0 8px;font-weight:bold;color:#333">Wiadomość:</p>
          <p style="margin:0;white-space:pre-wrap;color:#555">${escapeHtml(message)}</p>
        </div>
        <p style="font-size:12px;color:#999;margin-top:24px">
          Wiadomość wysłana automatycznie z formularza na mediabud.pl
        </p>
      </div>
    `;

    await WorkerMailer.send({
      host: SMTP_HOST,
      port: 465,
      secure: true,
      auth: {
        username: SMTP_USER,
        password: SMTP_PASS,
      },
      from: { name: "Media Bud — Formularz", address: SMTP_USER },
      to: SMTP_USER,
      replyTo: { name, address: email },
      subject: subject || `Zapytanie ze strony mediabud.pl — ${name}`,
      html: htmlBody,
    });

    return json({ ok: true });
  } catch (err) {
    console.error("Błąd wysyłki maila:", err);
    return json({ ok: false, error: "Nie udało się wysłać wiadomości" }, 500);
  }
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
