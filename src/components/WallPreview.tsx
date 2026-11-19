'use client';

import Image from 'next/image';

/**
 * "See it on your wall": the artwork drawn to true scale on a 14 ft × 9 ft gallery wall above an 84" sofa, beside a
 * 5'9" figure. Everything is positioned in inches as percentages of the wall, so it scales with the container and
 * updates as soon as the selected size changes.
 */
const WALL_W = 168; // inches (14 ft)
const WALL_H = 108; // inches (9 ft ceiling)
const SOFA_W = 84;
const SOFA_H = 33; // top of the sofa back
const SOFA_X = 30; // left edge of the sofa
const GAP_ABOVE_SOFA = 9; // bottom of the artwork above the sofa back
const PERSON_H = 69; // 5'9"
const PERSON_X = 132; // left edge of the figure

const pctX = (inches: number) => `${(inches / WALL_W) * 100}%`;
const pctY = (inches: number) => `${(inches / WALL_H) * 100}%`;

export default function WallPreview({
  src,
  title,
  widthIn,
  heightIn,
  label,
}: {
  src: string;
  title: string;
  /** artwork width and height in inches as hung (already turned for portrait works) */
  widthIn: number;
  heightIn: number;
  label: string;
}) {
  const center = SOFA_X + SOFA_W / 2;
  const left = center - widthIn / 2;
  const bottom = SOFA_H + GAP_ABOVE_SOFA;
  // Keep a tall portrait under the ceiling.
  const artBottom = Math.min(bottom, WALL_H - 4 - heightIn);

  return (
    <figure className="m-0">
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: `${WALL_W} / ${WALL_H}`, background: 'linear-gradient(180deg, #f3f1ec 0%, #ebe8e1 78%, #e2ded5 100%)' }}
        role="img"
        aria-label={`${title} at ${label}, shown to scale above an 84-inch sofa beside a 5 foot 9 inch person`}
      >
        {/* floor */}
        <div className="absolute inset-x-0 bottom-0 bg-[#cfc8bb]" style={{ height: pctY(5) }} />
        <div className="absolute inset-x-0 bg-[#bdb5a6]" style={{ bottom: pctY(5), height: '1px' }} />

        {/* artwork: acrylic face-mount floating off the wall */}
        <div
          className="absolute transition-all duration-500 ease-out"
          style={{
            left: pctX(left),
            bottom: pctY(artBottom),
            width: pctX(widthIn),
            height: pctY(heightIn),
            boxShadow: '0 6px 14px rgba(0,0,0,0.28), 0 1px 2px rgba(0,0,0,0.25)',
          }}
        >
          <Image src={src} alt="" fill sizes="(max-width: 1024px) 60vw, 520px" quality={75} className="object-cover" />
          <div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 40%)' }} />
        </div>

        {/* sofa (84") */}
        <svg
          className="absolute"
          style={{ left: pctX(SOFA_X), bottom: pctY(5), width: pctX(SOFA_W), height: pctY(SOFA_H - 5 + 0.5) }}
          viewBox="0 0 84 28.5"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <rect x="0" y="0" width="84" height="15" rx="3" fill="#8f8a80" />
          <rect x="0" y="9" width="9" height="15" rx="3" fill="#858076" />
          <rect x="75" y="9" width="9" height="15" rx="3" fill="#858076" />
          <rect x="7" y="13" width="70" height="9" rx="2" fill="#9a958b" />
          <rect x="2" y="22" width="80" height="4" rx="1" fill="#7d786f" />
          <rect x="5" y="26" width="2" height="2.5" fill="#5f5a52" />
          <rect x="77" y="26" width="2" height="2.5" fill="#5f5a52" />
        </svg>

        {/* 5'9" figure */}
        <svg
          className="absolute"
          style={{ left: pctX(PERSON_X), bottom: pctY(5), width: pctX(20), height: pctY(PERSON_H) }}
          viewBox="0 0 20 69"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <g fill="#b9b2a5">
            <ellipse cx="10" cy="5" rx="4" ry="4.8" />
            <path d="M4.5 13 Q10 10.5 15.5 13 L16.8 36 L14.6 36 L14.2 22 L13.6 40 L13.2 69 L10.6 69 L10 42 L9.4 69 L6.8 69 L6.4 40 L5.8 22 L5.4 36 L3.2 36 Z" />
          </g>
        </svg>
        <span className="absolute text-[10px] uppercase tracking-[0.08em] text-[#8a8478]" style={{ left: pctX(PERSON_X - 1), bottom: pctY(PERSON_H + 7) }}>
          5&apos;9&quot;
        </span>
      </div>
      <figcaption className="lk-small mt-3 flex flex-wrap justify-between gap-2">
        <span>
          <span className="font-semibold text-[#222]">{label}</span> shown to scale on a 9 ft wall above an 84&quot; sofa.
        </span>
        <span>Figure: 5&apos;9&quot;</span>
      </figcaption>
    </figure>
  );
}
