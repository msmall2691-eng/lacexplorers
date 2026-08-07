/**
 * HeroArt — an illustrated nature scene used in the hero image card.
 *
 * This is intentionally an on-brand illustration (no stock photos needed for v1).
 * PHOTO SWAP: when Meg has a real photo, replace the <svg> below with, e.g.:
 *   <img src="/images/hero.jpg" alt="Children exploring outdoors" className="h-full w-full object-cover" />
 * (drop the file in /public/images). See the README ("Replacing the logo & photos").
 */
export function HeroArt() {
  return (
    <svg
      viewBox="0 0 400 480"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="img"
      aria-label="Illustration of a cozy cottage among evergreen trees and rolling hills"
    >
      <defs>
        <linearGradient id="ha-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FCFBF8" />
          <stop offset="55%" stopColor="#EDF1E1" />
          <stop offset="100%" stopColor="#DCE4CB" />
        </linearGradient>
        <radialGradient id="ha-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F5E9CC" />
          <stop offset="60%" stopColor="#F1E2C0" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#F1E2C0" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sky */}
      <rect x="0" y="0" width="400" height="480" fill="url(#ha-sky)" />

      {/* Sun + glow */}
      <circle cx="300" cy="120" r="80" fill="url(#ha-sun)" />
      <circle cx="300" cy="120" r="34" fill="#EFE2C1" />

      {/* Distant hills */}
      <path d="M0 300 C 90 262 170 300 250 288 C 320 278 360 296 400 288 L400 480 L0 480 Z" fill="#C9D3B2" />

      {/* Mid hill */}
      <path d="M0 342 C 80 312 160 344 240 334 C 310 326 360 344 400 336 L400 480 L0 480 Z" fill="#AEB89A" />

      {/* Mid-ground evergreens */}
      <g fill="#7E8A62">
        <path d="M70 330 l-12 24 h24 Z" />
        <path d="M70 316 l-9 20 h18 Z" />
        <path d="M110 336 l-10 20 h20 Z" />
        <path d="M340 332 l-11 22 h22 Z" />
        <path d="M366 338 l-9 18 h18 Z" />
      </g>

      {/* Near hill */}
      <path d="M0 392 C 90 360 180 392 260 384 C 330 377 370 392 400 386 L400 480 L0 480 Z" fill="#6F7A55" />

      {/* Cottage */}
      <g>
        <rect x="150" y="352" width="54" height="42" rx="1.5" fill="#E7DCC8" />
        <path d="M143 355 L177 326 L211 355 Z" fill="#59623F" />
        <rect x="168" y="372" width="16" height="22" rx="1" fill="#6F7A55" />
        <rect x="156" y="360" width="11" height="11" rx="1" fill="#AEB89A" />
        <rect x="187" y="360" width="11" height="11" rx="1" fill="#AEB89A" />
        {/* Heart in the gable */}
        <path d="M177 349 C 171 343 169.5 339 173.5 336.6 C 175.8 335.3 177 336.6 177 337.9 C 177 336.6 178.2 335.3 180.5 336.6 C 184.5 339 183 343 177 349 Z" fill="#F7F3EB" />
      </g>

      {/* Near evergreens */}
      <g fill="#59623F">
        <rect x="298" y="378" width="5" height="16" fill="#9C8567" />
        <path d="M300.5 336 l-13 26 h26 Z" />
        <path d="M300.5 350 l-16 28 h32 Z" />
        <rect x="66" y="384" width="4" height="14" fill="#9C8567" />
        <path d="M68 350 l-11 22 h22 Z" />
        <path d="M68 362 l-13 24 h26 Z" />
      </g>

      {/* Foreground */}
      <path d="M0 440 C 110 420 200 448 300 434 C 350 427 380 440 400 436 L400 480 L0 480 Z" fill="#59623F" />

      {/* Foreground flowers / grass tufts */}
      <g stroke="#4C5436" strokeWidth="2.5" strokeLinecap="round">
        <path d="M40 470 v-14" />
        <path d="M46 470 v-10" />
        <path d="M356 470 v-14" />
        <path d="M362 470 v-10" />
      </g>
      <circle cx="40" cy="452" r="4" fill="#E7DCC8" />
      <circle cx="356" cy="452" r="4" fill="#F5E9CC" />
    </svg>
  );
}
