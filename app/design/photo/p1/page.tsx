import { FramedPortrait } from "@/components/design/FramedPortrait";
import { ASHISH } from "@/lib/talent/ashish";

export const dynamic = "force-dynamic";

// P1 — 02 headshot blazer (current production hero photo).
// Photo: tight headshot in brown blazer against brown backdrop.
// object-position [center 18%] keeps eyes near the rule-of-thirds upper line.
export default function PhotoP1() {
  return (
    <FramedPortrait
      talent={ASHISH}
      photo={ASHISH.hero}
      objectClass="object-[center_18%]"
      plate="Plate I · Blazer"
    />
  );
}
