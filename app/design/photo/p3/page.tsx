import { FramedPortrait } from "@/components/design/FramedPortrait";
import { ASHISH } from "@/lib/talent/ashish";

export const dynamic = "force-dynamic";

// P3 — 03 outdoor denim.
// Photo: outdoor, denim jacket, younger commercial energy. More
// environmental — sky/background creates depth.
export default function PhotoP3() {
  const photo = ASHISH.gallery.find((p) => p.slug === "03-outdoor-denim")!;
  return (
    <FramedPortrait
      talent={ASHISH}
      photo={photo}
      objectClass="object-[center_25%]"
      plate="Plate III · Outdoor"
    />
  );
}
