import { EMAILS } from "@/lib/site";
import { NextRequest } from "next/server";

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

const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${EMAILS.sales}`;

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: NextRequest) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return Response.json(
      { ok: false, success: false, error: "Invalid JSON" },
      { status: 400 },
    );
  }

  const name = body.name?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const email = body.email?.trim() ?? "";

  if (!name || !phone || !isEmail(email)) {
    return Response.json(
      { ok: false, success: false, error: "Invalid lead" },
      { status: 400 },
    );
  }

  const payload = {
    name,
    email,
    phone,
    city: body.city?.trim() ?? "",
    space: body.spaceType?.trim() ?? "",
    system: body.system?.trim() || body.projectType?.trim() || "",
    area: body.sqft?.toString().trim() ?? "",
    message: [
      body.notes?.trim() ?? "",
      body.projectType?.trim() ? `Project: ${body.projectType.trim()}` : "",
      body.estimate?.trim() ? `Estimate: ${body.estimate.trim()}` : "",
      body.source?.trim() ? `Source: ${body.source.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
    _subject: "New Quote Request - Prime Epoxy Flooring",
    _captcha: "false",
    _template: "table",
  };

  try {
    const response = await fetch(FORMSUBMIT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("[lead] FormSubmit rejected", response.status, detail, payload);
    }
  } catch (error) {
    console.error("[lead] FormSubmit network error", error, payload);
  }

  return Response.json({ ok: true, success: true });
}
