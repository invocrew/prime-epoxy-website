import { COMPANY } from "@/lib/site";
import { NextRequest } from "next/server";

type Payload = {
  name?: string;
  phone?: string;
  email?: string;
  city?: string;
  projectType?: string;
  sqft?: string;
  notes?: string;
  source?: string;
  estimate?: string;
};

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Payload;
  const name = body.name?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const email = body.email?.trim() ?? "";

  if (!name || !phone || !email || !email.includes("@")) {
    return Response.json({ ok: false, error: "Invalid lead" }, { status: 400 });
  }

  console.info(`[${COMPANY} lead]`, {
    name,
    phone,
    email,
    city: body.city ?? "",
    projectType: body.projectType ?? "",
    sqft: body.sqft ?? "",
    notes: body.notes ?? "",
    source: body.source ?? "website",
    estimate: body.estimate ?? "",
  });

  return Response.json({ ok: true });
}
