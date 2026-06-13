import { FramedPortrait } from "@/components/design/FramedPortrait";
import { ASHISH } from "@/lib/talent/ashish";

export const dynamic = "force-dynamic";

// P4 — 04 seated mint shirt.
// Photo: seated with chai, mint shirt. Range shot — different mood.
export default function PhotoP4() {
  const photo = ASHISH.gallery.find((p) => p.slug === "04-seated-mint-shirt")!;
  return (
    <FramedPortrait
      talent={ASHISH}
      photo={photo}
      objectClass="object-[center_30%]"
      plate="Plate IV · Seated"
    />
  );
}
