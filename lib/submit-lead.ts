const FORMSUBMIT_URL =
  "https://formsubmit.co/ajax/primeepoxyflooring1@gmail.com";

export async function submitLead(data: Record<string, FormDataEntryValue>) {
  const response = await fetch(FORMSUBMIT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: String(data.name ?? ""),
      phone: String(data.phone ?? ""),
      email: String(data.email ?? ""),
      city: String(data.city ?? ""),
      space: String(data.spaceType ?? data.space ?? ""),
      system: String(data.system ?? ""),
      projectType: String(data.projectType ?? ""),
      sqft: String(data.sqft ?? ""),
      notes: String(data.notes ?? ""),
      _subject: "New Lead - Prime Epoxy Flooring",
      _captcha: "false",
    }),
  });

  if (!response.ok) {
    throw new Error("FormSubmit request failed");
  }
}
