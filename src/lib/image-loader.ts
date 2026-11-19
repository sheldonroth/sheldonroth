// next/image loader that serves pre-sized static files instead of the Vercel Image Optimization API
// (which returns 402 on this plan). /works/<slug>.jpg requests map to the smallest pre-sized copy
// at least as wide as the requested width: public/works/w<W>/<slug>.jpg, made by
// scripts/make-image-sizes.py. Wider requests get the full 3840px file. Anything else is served as is.
const WIDTHS = [640, 1200, 2048]; // keep in sync with scripts/make-image-sizes.py

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  const m = /^\/works\/([^/?#]+)\.jpg$/.exec(src);
  if (!m) return src;
  const w = WIDTHS.find((x) => x >= width);
  return w ? `/works/w${w}/${m[1]}.jpg` : src;
}
