"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { APIError } from "better-auth/api";
import { auth } from "@/lib/auth";

export type DevLoginResult = { ok: true } | { ok: false; error: string };

export async function devLoginAction(phone: string): Promise<DevLoginResult> {
  if (typeof phone !== "string" || phone.trim().length === 0) {
    return { ok: false, error: "Enter a phone number." };
  }

  try {
    await auth.api.signInWithPhone({
      body: { phone },
      headers: await headers(),
    });
  } catch (err) {
    if (err instanceof APIError) {
      const body = err.body as { message?: string } | undefined;
      return { ok: false, error: body?.message ?? err.message };
    }
    return { ok: false, error: "Sign-in failed. Try again." };
  }

  redirect("/me");
}
