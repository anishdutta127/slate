"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/primitives/Button";
import { devLoginAction } from "./actions";

export function LoginForm() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await devLoginAction(phone.trim());
      if (!result.ok) {
        setError(result.error);
      }
      // success path: server action's redirect() throws and Next handles it
    });
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-sm flex-col gap-4">
      <label className="flex flex-col gap-2 text-left">
        <span className="chip-text text-text-tertiary">Phone number</span>
        <input
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          placeholder="98765 43210"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={isPending}
          className="
            h-12 rounded-md border border-border-dark bg-slate-surface
            px-4 font-body text-base text-text-primary
            placeholder:text-text-tertiary
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-gold focus-visible:ring-offset-2
            focus-visible:ring-offset-slate-bg
            disabled:opacity-50
          "
        />
      </label>

      <Button type="submit" variant="primary" tone="cream" size="lg" disabled={isPending}>
        {isPending ? "Signing in..." : "Continue"}
      </Button>

      {error ? (
        <p className="body-s text-danger" role="alert">
          {error}
        </p>
      ) : null}

      <p className="body-s text-text-tertiary">
        Dev login. No OTP. Phase 2 (pre-launch) wires Firebase Phone Auth for production.
      </p>
    </form>
  );
}
