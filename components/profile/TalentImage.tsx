import Image from "next/image";
import { cn } from "@/lib/cn";
import type { TalentPhoto } from "@/types/talent";

interface TalentImageProps {
  photo: TalentPhoto;
  talentSlug: string;
  priority?: boolean;
  sizes?: string; // next/image sizes attribute, defaults to a sensible mobile-first value
  className?: string;
  fill?: boolean;
}

// Renders a talent photo from the pre-generated AVIF/WebP variants under
// /talent/<slug>/<photo>-<width>.{avif,webp}. next/image handles srcset and
// AVIF-vs-WebP negotiation; the JPEG sources don't ship to the public bundle
// at all. See scripts/optimize-talent-photos.ts.
export function TalentImage({
  photo,
  talentSlug,
  priority,
  sizes = "(min-width: 1280px) 1280px, (min-width: 828px) 828px, 100vw",
  className,
  fill,
}: TalentImageProps) {
  // We point next/image at the largest pre-generated variant (.webp), and let
  // next/image's optimizer build the AVIF/WebP responsive set from there.
  // Pre-generated AVIFs in /public are still useful as a backstop if we ever
  // serve via a CDN without an image proxy.
  const src = `/talent/${talentSlug}/${photo.slug}-828.webp`;

  if (fill) {
    return (
      <Image
        src={src}
        alt={photo.alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-cover", className)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}
