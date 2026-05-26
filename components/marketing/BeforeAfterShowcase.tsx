import { PhoneFrame } from "@/components/visual/PhoneFrame";
import { TalentImage } from "@/components/profile/TalentImage";
import { ASHISH } from "@/lib/talent/ashish";

const FAKE_TIME = "2:47 PM";

function WhatsAppChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col bg-[#0d1418] text-white">
      <header className="flex items-center gap-2 bg-[#1f2c33] px-3 py-2 text-xs">
        <span className="text-lg leading-none text-[#54656f]">‹</span>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6b7c85] text-[10px] font-semibold">
          CD
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-[12px] font-semibold">CD / Casting Coordinator</span>
          <span className="truncate text-[9px] text-[#8696a0]">online</span>
        </div>
        <span aria-hidden="true" className="text-[#8696a0]">
          ⋮
        </span>
      </header>

      <div className="flex-1 overflow-hidden bg-[#0a141a] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_0%,transparent_70%)] px-2.5 py-3">
        {children}
      </div>

      <div className="flex items-center gap-2 bg-[#1f2c33] px-2 py-1.5">
        <span className="text-[#8696a0]">😊</span>
        <div className="flex-1 rounded-full bg-[#2a3942] px-3 py-1 text-[10px] text-[#8696a0]">
          Message
        </div>
        <span className="text-[#8696a0]">📎</span>
      </div>
    </div>
  );
}

function Bubble({
  side = "right",
  children,
  time,
}: {
  side?: "left" | "right";
  children: React.ReactNode;
  time?: string;
}) {
  const sideClass = side === "right" ? "ml-auto bg-[#005c4b]" : "mr-auto bg-[#1f2c33]";
  return (
    <div
      className={`mb-1.5 max-w-[85%] rounded-md px-2 py-1.5 text-[10px] leading-snug ${sideClass}`}
    >
      <div className="whitespace-pre-line break-words text-white/95">{children}</div>
      {time ? <div className="mt-0.5 text-right text-[8px] text-white/50">{time} ✓✓</div> : null}
    </div>
  );
}

function LinkBubble({ url }: { url: string }) {
  return (
    <div className="mr-auto mb-1 max-w-[85%] rounded-md bg-[#1f2c33] px-2 py-1.5">
      <p className="break-all font-mono text-[9px] leading-snug text-[#53bdeb]">{url}</p>
    </div>
  );
}

export function BeforeAfterShowcase() {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
      {/* BEFORE — the Drive dump */}
      <figure className="flex flex-col items-center gap-4">
        <span className="chip-text text-text-tertiary">Today — the Drive dump</span>
        <PhoneFrame tilt="left" className="opacity-95">
          <WhatsAppChrome>
            <Bubble side="right" time={FAKE_TIME}>
              Send your profile na
            </Bubble>
            <Bubble side="left">
              Hello sir myself Ashish Rawat actor from mumbai age 25 height 5&apos;8 sharing my
              photos and work below pls consider
            </Bubble>
            <LinkBubble url="drive.google.com/file/d/1xH9k2Lp/view?usp=sharing" />
            <LinkBubble url="youtu.be/tnVDz4HvhbE" />
            <LinkBubble url="instagram.com/reel/DXGdDOHjA6_/" />
            <LinkBubble url="drive.google.com/drive/folders/1AbCdEfGh" />
            <div className="mt-2 text-center text-[9px] italic text-[#8696a0]">
              Looks the same as 200 other messages. Forgettable.
            </div>
          </WhatsAppChrome>
        </PhoneFrame>
        <figcaption className="max-w-[28ch] text-balance text-center text-xs text-text-tertiary">
          Looks the same as 200 other messages. Forgettable.
        </figcaption>
      </figure>

      {/* AFTER — one Slate link */}
      <figure className="flex flex-col items-center gap-4">
        <span className="chip-text text-gold">With Slate — one link</span>
        <PhoneFrame tilt="right">
          <WhatsAppChrome>
            <Bubble side="right" time={FAKE_TIME}>
              Send your profile na
            </Bubble>
            <Bubble side="left">Hi, here&apos;s my profile —</Bubble>

            {/* Slate unfurl card */}
            <div className="mr-auto mb-1.5 max-w-[90%] overflow-hidden rounded-md bg-[#1f2c33]">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <TalentImage
                  photo={ASHISH.hero}
                  talentSlug={ASHISH.slug}
                  fill
                  sizes="220px"
                  className="object-cover object-[center_22%]"
                />
              </div>
              <div className="bg-[#F5EFE3] px-2.5 py-1.5 text-[#1A1916]">
                <div className="font-mono text-[7px] uppercase tracking-[0.15em] text-[#C9A24B]">
                  SLATE.CLUB
                </div>
                <div
                  className="mt-0.5 font-display text-[12px] font-semibold leading-tight"
                  style={{ fontVariationSettings: '"opsz" 36, "SOFT" 50, "WONK" 1' }}
                >
                  Ashish Rawat — Mumbai actor
                </div>
                <div className="mt-0.5 text-[8px] leading-snug text-[#5C564E]">
                  Plays 22-28 · Hindi & English. Honda, Cipla, Zepto.
                </div>
              </div>
              <div className="px-2.5 py-1 text-[9px] text-white/80">
                <span className="text-[#C9A24B]">◆</span> slate.club/ashish
              </div>
              <div className="px-2.5 pb-1.5 text-right text-[8px] text-white/50">
                {FAKE_TIME} ✓✓
              </div>
            </div>

            <div className="mt-2 text-center text-[9px] italic text-gold/80">
              One tap. Looks like a working actor. Gets saved.
            </div>
          </WhatsAppChrome>
        </PhoneFrame>
        <figcaption className="max-w-[28ch] text-balance text-center text-xs text-text-secondary">
          One tap. Looks like a working actor. Gets saved.
        </figcaption>
      </figure>
    </div>
  );
}
