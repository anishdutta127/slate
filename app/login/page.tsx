import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import { Wordmark } from "@/components/visual/Wordmark";
import { Section } from "@/components/visual/Section";
import { Divider } from "@/components/visual/Divider";
import { env } from "@/lib/env";
import { auth } from "@/lib/auth";
import { LoginForm } from "./LoginForm";

// Per-request so the env check and session lookup are always fresh.
export const dynamic = "force-dynamic";

function isLoginEnabled() {
  if (env.NODE_ENV !== "production") return true;
  return env.SLATE_ALLOW_DEV_LOGIN === "1";
}

export default async function LoginPage() {
  if (!isLoginEnabled()) notFound();

  // If already signed in, send straight to /me — don't show login again.
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) redirect("/me");

  return (
    <Section
      tone="dark"
      as="main"
      className="flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center"
    >
      <Wordmark size="md" />

      <h1 className="display-m mt-12 text-balance text-text-primary">Sign in</h1>
      <p className="body-l mt-4 max-w-[36ch] text-balance text-text-secondary">
        Enter your phone. We&apos;ll remember you.
      </p>

      <Divider className="my-10 max-w-[14rem]" />

      <LoginForm />
    </Section>
  );
}
