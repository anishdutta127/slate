import Link from "next/link";
import { Wordmark } from "@/components/visual/Wordmark";
import { Section } from "@/components/visual/Section";
import { Divider } from "@/components/visual/Divider";

export default function ProfileNotFound() {
  return (
    <Section
      tone="dark"
      as="main"
      className="flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center"
    >
      <Wordmark size="md" />

      <h1 className="display-m mt-12 text-balance text-text-primary">
        That actor isn&apos;t on Slate yet.
      </h1>
      <p className="body-l mt-4 max-w-[36ch] text-balance text-text-secondary">
        The link you followed may be misspelled, or the profile hasn&apos;t been claimed.
      </p>

      <Divider className="my-10 max-w-[14rem]" />

      <Link
        href="/"
        className="chip-text text-gold underline-offset-4 hover:underline focus-visible:underline"
      >
        Back to Slate
      </Link>
    </Section>
  );
}
