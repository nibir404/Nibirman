/** Torn paper edge (top of a sheet). Fill = current paper colour. */
export default function TornEdge({ flip = false, className = "" }: { flip?: boolean; className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 48"
      preserveAspectRatio="none"
      className={`pointer-events-none block h-8 w-full md:h-12 ${flip ? "rotate-180" : ""} ${className}`}
    >
      <path
        d="M0 30 C30 28 44 36 70 33 L84 27 C110 29 128 25 150 31 L163 36 L178 29 C214 25 240 34 266 28 C290 23 300 31 318 30 L331 22 L344 30 C380 35 410 26 446 31 C470 34 482 28 500 29 L512 37 L526 30 C560 24 600 32 632 27 L648 33 C676 36 700 25 728 29 C760 33 774 24 800 26 L812 18 L826 27 C860 31 890 28 920 34 C944 38 962 29 984 30 L998 23 L1010 31 C1046 34 1080 26 1110 30 C1132 32 1150 25 1172 28 L1186 35 L1200 29 C1236 24 1266 33 1296 29 C1320 26 1336 32 1356 30 L1370 24 L1384 31 C1404 34 1424 29 1440 31 L1440 48 L0 48 Z"
        fill="var(--paper)"
      />
      <path
        d="M0 30 C30 28 44 36 70 33 L84 27 C110 29 128 25 150 31 L163 36 L178 29 C214 25 240 34 266 28 C290 23 300 31 318 30 L331 22 L344 30 C380 35 410 26 446 31 C470 34 482 28 500 29 L512 37 L526 30 C560 24 600 32 632 27 L648 33 C676 36 700 25 728 29 C760 33 774 24 800 26 L812 18 L826 27 C860 31 890 28 920 34 C944 38 962 29 984 30 L998 23 L1010 31 C1046 34 1080 26 1110 30 C1132 32 1150 25 1172 28 L1186 35 L1200 29 C1236 24 1266 33 1296 29 C1320 26 1336 32 1356 30 L1370 24 L1384 31 C1404 34 1424 29 1440 31"
        fill="none"
        stroke="var(--ink)"
        strokeOpacity="0.35"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
