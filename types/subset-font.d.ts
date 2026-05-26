// Minimal ambient declaration for `subset-font` (no published types as of 2.5.0).
// Only covers the surface we actually call.
declare module "subset-font" {
  interface SubsetOptions {
    targetFormat: "woff" | "woff2" | "truetype" | "sfnt";
  }
  function subsetFont(
    font: Buffer | Uint8Array,
    text: string,
    options: SubsetOptions,
  ): Promise<Buffer>;
  export default subsetFont;
}
