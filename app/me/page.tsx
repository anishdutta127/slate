import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { Wordmark } from "@/components/visual/Wordmark";
import { Section } from "@/components/visual/Section";
import { Divider } from "@/components/visual/Divider";
import { Button } from "@/components/primitives/Button";
import { Chip } from "@/components/primitives/Chip";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { user } from "@/db/schema";
import { displayPhone, maskPhone } from "@/lib/phone";
import { signOutAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function MePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  // Better Auth's session.user has the auth-managed fields but not our
  // custom phone/slug columns. Re-read from DB for the full record.
  const rows = await db.select().from(user).where(eq(user.id, session.user.id)).limit(1);
  const me = rows[0];
  if (!me) {
    // Stale session pointing at deleted user — sign out + back to login.
    redirect("/login");
  }

  return (
    <Section
      tone="dark"
      as="main"
      className="flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center"
    >
      <Wordmark size="md" />

      <h1 className="display-m mt-12 text-text-primary">You&apos;re in.</h1>

      <Divider className="my-10 max-w-[14rem]" />

      <dl className="flex flex-col items-center gap-6 text-left">
        <div className="flex flex-col items-start gap-2">
          <dt className="chip-text text-text-tertiary">Phone (masked)</dt>
          <dd className="body-m font-mono text-text-primary">{maskPhone(me.phone)}</dd>
        </div>
        <div className="flex flex-col items-start gap-2">
          <dt className="chip-text text-text-tertiary">Phone (you)</dt>
          <dd className="body-m font-mono text-text-primary">{displayPhone(me.phone)}</dd>
        </div>
        <div className="flex flex-col items-start gap-2">
          <dt className="chip-text text-text-tertiary">Slug</dt>
          <dd className="body-m font-mono text-text-primary">
            slate.club/<span className="text-gold">{me.slug}</span>
          </dd>
        </div>
        <div className="flex flex-col items-start gap-2">
          <dt className="chip-text text-text-tertiary">Display name</dt>
          <dd className="body-m text-text-primary">{me.name}</dd>
        </div>
      </dl>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <Chip tone="cream">M0.5 dev login</Chip>
        <Chip tone="cream">Profile editor: M3</Chip>
        <Chip tone="cream">Send flow: M4</Chip>
      </div>

      <form action={signOutAction} className="mt-12">
        <Button type="submit" variant="ghost" tone="cream">
          Sign out
        </Button>
      </form>
    </Section>
  );
}
