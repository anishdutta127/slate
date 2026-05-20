import { Wordmark } from "@/components/visual/Wordmark";
import { Divider } from "@/components/visual/Divider";
import { Section } from "@/components/visual/Section";

export default function HomePage() {
  return (
    <Section
      tone="dark"
      as="main"
      className="flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center"
    >
      <Wordmark size="lg" />

      <h1 className="display-l mt-12 max-w-[18ch] text-balance text-text-primary">
        The actors&apos; club of Mumbai.
      </h1>

      <p className="body-l mt-6 max-w-[42ch] text-balance text-text-secondary">
        Build a profile that looks like a film poster. Send it like a pro. Grow with others doing
        the same.
      </p>

      <Divider className="mt-16 max-w-[16rem]" />

      <p className="chip-text mt-8 text-text-tertiary">
        Coming soon — the manifesto, the club, the first profiles.
      </p>
    </Section>
  );
}
