import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/visual/Section";
import { Wordmark } from "@/components/visual/Wordmark";
import { Divider } from "@/components/visual/Divider";
import { LoginForm } from "@/app/login/LoginForm";

export const metadata: Metadata = {
  title: "Join Slate — the actors' club of Mumbai",
  description:
    "Sign up for Slate. Get a free casting-ready profile and join the Mumbai actors' club.",
};

export default function SignupPage() {
  return (
    <Section
      tone="dark"
      as="main"
      className="flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center"
    >
      <Link href="/">
        <Wordmark size="md" />
      </Link>

      <p className="chip-text mt-12 text-gold">Join the club</p>
      <h1
        className="mt-6 max-w-[20ch] font-display text-text-primary"
        style={{
          fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
          fontWeight: 700,
          fontSize: "clamp(2.5rem, 8vw, 4rem)",
          letterSpacing: "-0.025em",
          lineHeight: 0.95,
        }}
      >
        Start with your phone number.
      </h1>
      <p className="mt-6 max-w-[36ch] text-balance text-base leading-relaxed text-text-secondary md:text-lg">
        Enter your number to create your Slate account. Free for the founding batch — no card, no
        catch.
      </p>

      <Divider className="my-10 max-w-[14rem]" />

      <LoginForm />

      <p className="mt-10 max-w-[36ch] text-balance text-sm text-text-tertiary">
        Already a member?{" "}
        <Link href="/login" className="text-gold underline-offset-4 hover:underline">
          Sign in
        </Link>
      </p>

      <p className="mt-16 font-mono text-[10px] uppercase tracking-[0.15em] text-text-tertiary">
        Made on Slate · <span className="devanagari">स्लेट</span>
      </p>
    </Section>
  );
}
