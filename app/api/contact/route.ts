import { EMAILS } from "@/lib/site";
import { NextRequest } from "next/server";
import { Resend } from "resend";

type Payload = {
  name?: string;
  phone?: string;
  email?: string;
  city?: string;
  projectType?: string;
  spaceType?: string;
  system?: string;
  sqft?: string;
  notes?: string;
  source?: string;
  estimate?: string;
  locale?: string;
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: NextRequest) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const email = body.email?.trim() ?? "";

  if (!name || !phone || !isEmail(email)) {
    return Response.json({ ok: false, error: "Invalid lead" }, { status: 400 });
  }

  const to = process.env.LEAD_TO ?? EMAILS.sales;
  const lead = {
    name,
    phone,
    email,
    city: body.city?.trim() ?? "",
    spaceType: body.spaceType?.trim() ?? "",
    sqft: body.sqft?.toString().trim() ?? "",
    system: body.system?.trim() || body.projectType?.trim() || "",
    projectType: body.projectType?.trim() ?? "",
    notes: body.notes?.trim() ?? "",
    source: body.source?.trim() ?? "website",
    estimate: body.estimate?.trim() ?? "",
    locale: body.locale?.trim() ?? "en",
  };

  const html = `
    <h2>New Prime Epoxy Flooring lead</h2>
    <p><strong>Name:</strong> ${escapeHtml(lead.name)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(lead.phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(lead.email)}</p>
    <p><strong>City:</strong> ${escapeHtml(lead.city)}</p>
    <p><strong>Space Type:</strong> ${escapeHtml(lead.spaceType)}</p>
    <p><strong>Sq Ft:</strong> ${escapeHtml(lead.sqft)}</p>
    <p><strong>System:</strong> ${escapeHtml(lead.system)}</p>
    <p><strong>Project Type:</strong> ${escapeHtml(lead.projectType)}</p>
    <p><strong>Estimate:</strong> ${escapeHtml(lead.estimate)}</p>
    <p><strong>Source:</strong> ${escapeHtml(lead.source)}</p>
    <p><strong>Locale:</strong> ${escapeHtml(lead.locale)}</p>
    <p><strong>Notes:</strong><br/>${escapeHtml(lead.notes).replaceAll("\n", "<br/>")}</p>
  `;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[lead] RESEND_API_KEY is not configured", lead);
    return Response.json(
      { ok: false, error: "Email service is not configured" },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from:
      process.env.RESEND_FROM ?? "Prime Epoxy Flooring <beth.t@example.com>",
    to: [to],
    replyTo: email,
    subject: `New estimate request — ${name} — ${lead.spaceType || lead.system || "website"}`,
    html,
  });

  if (error) {
    console.error("[lead] Resend error", error);
    return Response.json({ ok: false, error: "Email failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
