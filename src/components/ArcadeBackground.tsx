// Arcade ambient background:
//  • Pac-Man lanes: Pac chases pellets, eats a power pellet, then chases scared ghosts.
//  • Space Invaders lanes: a row of invaders drifts while a ship below fires lasers up.
// Pure CSS/SVG. Fixed behind content with low opacity.

import { useEffect, useState } from "react";

/* ───────── Sprites ───────── */

const PacMan = ({ size = 30, color = "#FFEB3B" }: { size?: number; color?: string }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden>
    <defs>
      <clipPath id={`pm-${color}`}>
        <path>
          <animate
            attributeName="d"
            dur="0.32s"
            repeatCount="indefinite"
            values="
              M16,16 L32,8 L32,24 Z;
              M16,16 L32,14 L32,18 Z;
              M16,16 L32,8 L32,24 Z"
          />
        </path>
      </clipPath>
    </defs>
    <circle cx="16" cy="16" r="15" fill={color} />
    <circle cx="16" cy="16" r="15" fill="transparent" />
    <circle cx="16" cy="16" r="15" fill="#0a0a0a" clipPath={`url(#pm-${color})`} />
    <circle cx="18" cy="9" r="1.6" fill="#0a0a0a" />
  </svg>
);

const Pellet = ({ size = 6 }: { size?: number }) => (
  <svg viewBox="0 0 6 6" width={size} height={size} aria-hidden>
    <circle cx="3" cy="3" r="1.5" fill="#FFD27F" />
  </svg>
);

const PowerPellet = ({ size = 14 }: { size?: number }) => (
  <svg viewBox="0 0 14 14" width={size} height={size} aria-hidden>
    <circle cx="7" cy="7" r="5" fill="#FFD27F">
      <animate attributeName="opacity" values="1;0.3;1" dur="0.5s" repeatCount="indefinite" />
    </circle>
  </svg>
);

const Ghost = ({ color = "#FF1493", size = 26, scared = false }: { color?: string; size?: number; scared?: boolean }) => {
  const body = scared ? "#1a3cff" : color;
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} shapeRendering="crispEdges" aria-hidden>
      <path d="M2,8 a6,6 0 0 1 12,0 v6 l-2,-2 l-2,2 l-2,-2 l-2,2 l-2,-2 z" fill={body} />
      {scared ? (
        <>
          <rect x="5" y="6" width="2" height="2" fill="#fff" />
          <rect x="9" y="6" width="2" height="2" fill="#fff" />
          <path d="M4,11 l1,-1 l1,1 l1,-1 l1,1 l1,-1 l1,1 l1,-1 l1,1" stroke="#fff" fill="none" strokeWidth="0.6" />
        </>
      ) : (
        <>
          <circle cx="6" cy="7" r="1.6" fill="#fff" />
          <circle cx="11" cy="7" r="1.6" fill="#fff" />
          <circle cx="6.3" cy="7.3" r="0.8" fill="#0a0a0a" />
          <circle cx="11.3" cy="7.3" r="0.8" fill="#0a0a0a" />
        </>
      )}
    </svg>
  );
};

const Invader = ({ color = "#39FF14", size = 22 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 11 8" width={size} height={size} shapeRendering="crispEdges" aria-hidden>
    {[
      "..X.....X..",
      "...X...X...",
      "..XXXXXXX..",
      ".XX.XXX.XX.",
      "XXXXXXXXXXX",
      "X.XXXXXXX.X",
      "X.X.....X.X",
      "...XX.XX...",
    ].map((row, y) =>
      row.split("").map((c, x) =>
        c === "X" ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={color} /> : null
      )
    )}
  </svg>
);

const Ship = ({ size = 28 }: { size?: number }) => (
  <svg viewBox="0 0 16 8" width={size} height={size * 0.5} shapeRendering="crispEdges" aria-hidden>
    {[
      ".......XX.......",
      ".......XX.......",
      "....XXXXXXXX....",
      "XXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXXXX",
    ].map((row, y) =>
      row.split("").map((c, x) =>
        c === "X" ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#00FFE1" /> : null
      )
    )}
  </svg>
);

/* ───────── Pac-Man lane ─────────
   A horizontal lane. Pac-Man chases the pellets/ghosts placed across the row.
   Pellets fade as Pac "eats" them, ghosts turn scared after the power pellet. */

function PacLane({
  top,
  duration,
  pacColor = "#FFEB3B",
}: {
  top: string;
  duration: number;
  pacColor?: string;
}) {
  // sequence: pellets ... power ... ghosts (chase phase)
  const segment = (
    <div className="flex items-center gap-7 shrink-0 pr-7">
      <PacMan size={32} color={pacColor} />
      <Pellet /><Pellet /><Pellet /><Pellet /><Pellet />
      <PowerPellet />
      <Pellet /><Pellet />
      <Ghost color="#FF1493" scared />
      <Ghost color="#00FFFF" scared />
      <Ghost color="#FFA500" scared />
      <Pellet /><Pellet /><Pellet />
    </div>
  );

  return (
    <div
      className="absolute left-0 flex items-center"
      style={{
        top,
        width: "200%",
        animation: `arcade-scroll ${duration}s linear infinite`,
      }}
    >
      {segment}
      {segment}
    </div>
  );
}

/* ───────── Space Invaders lane ─────────
   A row of invaders that scrolls slowly, with a defender ship below firing lasers. */

function InvaderLane({ top }: { top: string }) {
  const [shots, setShots] = useState<number[]>([]);
  useEffect(() => {
    let id = 0;
    const t = setInterval(() => {
      setShots((s) => [...s.slice(-6), ++id]);
    }, 900);
    return () => clearInterval(t);
  }, []);

  const invaders = ["#39FF14", "#FF1493", "#00FFFF", "#FFEB3B", "#FFA500", "#39FF14", "#FF1493", "#00FFFF"];

  return (
    <div className="absolute left-0 right-0" style={{ top }}>
      {/* invader row drifting left-right */}
      <div
        className="flex items-center gap-8 px-10"
        style={{ animation: "invader-drift 6s ease-in-out infinite alternate" }}
      >
        {invaders.map((c, i) => (
          <span key={i} style={{ animation: `invader-step 0.6s steps(2) infinite`, animationDelay: `${i * 0.05}s` }}>
            <Invader color={c} size={24} />
          </span>
        ))}
      </div>

      {/* defender ship below */}
      <div
        className="absolute"
        style={{ top: 70, left: 0, animation: "ship-patrol 7s ease-in-out infinite alternate" }}
      >
        <Ship size={36} />
        {/* lasers */}
        {shots.map((id) => (
          <span
            key={id}
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              bottom: 18,
              width: 2,
              height: 14,
              background: "#FFEB3B",
              boxShadow: "0 0 6px #FFEB3B",
              animation: "laser-up 0.9s linear forwards",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ───────── Export ───────── */

export function ArcadeBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ opacity: 0.2 }}
    >
      <style>{`
        @keyframes arcade-scroll {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        @keyframes invader-drift {
          from { transform: translateX(-30px); }
          to   { transform: translateX(30px); }
        }
        @keyframes invader-step {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-3px); }
        }
        @keyframes ship-patrol {
          from { transform: translateX(8vw); }
          to   { transform: translateX(78vw); }
        }
        @keyframes laser-up {
          from { transform: translate(-50%, 0); opacity: 1; }
          to   { transform: translate(-50%, -180px); opacity: 0; }
        }
      `}</style>

      <PacLane top="6%"  duration={32} pacColor="#FFEB3B" />
      <InvaderLane top="26%" />
      <PacLane top="48%" duration={38} pacColor="#FFD27F" />
      <InvaderLane top="68%" />
      <PacLane top="88%" duration={28} pacColor="#FFEB3B" />
    </div>
  );
}
