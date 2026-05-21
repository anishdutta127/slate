import { FramedPortrait } from "@/components/design/FramedPortrait";
import { ASHISH } from "@/lib/talent/ashish";

export const dynamic = "force-dynamic";

// P2 — 01 full-body white shirt.
// Photo: wider shot, neutral studio. Needs object-position centered to show
// the full posture and breathing room around the figure.
export default function PhotoP2() {
  const photo = ASHISH.gallery.find((p) => p.slug === "01-fullbody-white-shirt")!;
  return (
    <FramedPortrait
      talent={ASHISH}
      photo={photo}
      objectClass="object-[center_top]"
      plate="Plate II · Full-body"
    />
  );
}
