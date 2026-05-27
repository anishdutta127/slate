"use client";

import { useState, useTransition } from "react";

type Status = "idle" | "ok" | "error";

export function ClubApplyForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const fd = new FormData(event.currentTarget);
    const body = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      instagram: String(fd.get("instagram") ?? ""),
      city: String(fd.get("city") ?? ""),
      why: String(fd.get("why") ?? ""),
    };
    startTransition(async () => {
      try {
        const r = await fetch("/api/club/apply", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!r.ok) {
          const j = (await r.json().catch(() => null)) as { error?: string } | null;
          setError(j?.error ?? "Submission failed. Try again.");
          setStatus("error");
          return;
        }
        setStatus("ok");
      } catch {
        setError("Network issue. Try again.");
        setStatus("error");
      }
    });
  }

  if (status === "ok") {
    return (
      <div className="rounded-md border border-gold/30 bg-slate-surface p-8 text-center">
        <p className="chip-text text-gold">Application received</p>
        <h3
          className="mt-4 font-display text-text-primary"
          style={{
            fontWeight: 600,
            fontSize: "1.75rem",
            lineHeight: 1.1,
          }}
        >
          We&apos;ll be in touch on WhatsApp.
        </h3>
        <p className="mt-3 text-text-secondary">
          We vet by hand. Expect a message within a day or two.
        </p>
      </div>
    );
  }

  const fieldClass =
    "block w-full rounded-md border border-border-dark bg-slate-surface px-4 py-3 font-body text-base text-text-primary placeholder:text-text-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-slate-bg disabled:opacity-50";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-2">
        <span className="chip-text text-text-tertiary">Name</span>
        <input
          name="name"
          required
          minLength={2}
          maxLength={80}
          disabled={isPending}
          className={fieldClass}
          placeholder="What casting calls you"
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="chip-text text-text-tertiary">Phone</span>
        <input
          name="phone"
          required
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          disabled={isPending}
          className={fieldClass}
          placeholder="98765 43210"
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="chip-text text-text-tertiary">Instagram (optional)</span>
        <input
          name="instagram"
          maxLength={80}
          disabled={isPending}
          className={fieldClass}
          placeholder="@yourhandle"
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="chip-text text-text-tertiary">City</span>
        <input
          name="city"
          required
          defaultValue="Mumbai"
          disabled={isPending}
          className={fieldClass}
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="chip-text text-text-tertiary">One line - why are you acting?</span>
        <textarea
          name="why"
          required
          minLength={10}
          maxLength={500}
          rows={3}
          disabled={isPending}
          className={fieldClass}
          placeholder="No wrong answer. Be honest."
        />
      </label>

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-full bg-slate-cream px-6 text-base font-medium text-text-on-light transition-colors hover:bg-slate-cream-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-slate-bg disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "Sending..." : "Apply to the club"}
      </button>

      {error ? (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      ) : null}
    </form>
  );
}
