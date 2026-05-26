import { NextResponse } from "next/server";
import { z } from "zod";

// Phase 1 (M2): log only. No DB write. M5 wires this to a club_applications
// table in Drizzle + an admin /admin approval view. For now we just collect
// what came in, validate it, and log for the founders to review manually.

const ApplicationSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(8).max(20),
  instagram: z.string().trim().max(80).optional(),
  city: z.string().trim().min(2).max(80).default("Mumbai"),
  why: z.string().trim().min(10).max(500),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = ApplicationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Validation failed",
        issues: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  // eslint-disable-next-line no-console
  console.log(
    "[club-apply]",
    new Date().toISOString(),
    JSON.stringify({
      name: parsed.data.name,
      phone: parsed.data.phone,
      instagram: parsed.data.instagram ?? "",
      city: parsed.data.city,
      why_chars: parsed.data.why.length,
    }),
  );

  return NextResponse.json({ ok: true });
}

export const runtime = "nodejs";
