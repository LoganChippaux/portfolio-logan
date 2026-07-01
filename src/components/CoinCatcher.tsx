import { useEffect, useRef, useState } from "react";
import { sfx } from "@/lib/arcadeSound";

type Coin = { id: number; x: number; y: number; vy: number; kind: "gold" | "bomb" };

export function CoinCatcher() {
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [hi, setHi] = useState(0);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [paddleX, setPaddleX] = useState(50); // %
  const [lives, setLives] = useState(3);
  const [lastLostLife, setLastLostLife] = useState<number | null>(null);
  const [infinite, setInfinite] = useState(false);

  const areaRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastSpawn = useRef(0);
  const idRef = useRef(0);
  const livesRef = useRef(3);
  const scoreRef = useRef(0);
  const coinsRef = useRef<Coin[]>([]);
  const paddleRef = useRef(50);
  const runningRef = useRef(false);
  const infiniteRef = useRef(false);

  useEffect(() => {
    const saved = Number(localStorage.getItem("coin-catcher-hi") || 0);
    setHi(saved);
  }, []);

  // Listen for Konami cheat → infinite lives
  useEffect(() => {
    const onCheat = () => {
      infiniteRef.current = true;
      setInfinite(true);
      // Restore any lost hearts visually
      livesRef.current = 3;
      setLives(3);
      setLastLostLife(null);
    };
    const onCheatEnd = () => {
      infiniteRef.current = false;
      setInfinite(false);
    };
    window.addEventListener("konami:active", onCheat);
    window.addEventListener("konami:inactive", onCheatEnd);
    return () => {
      window.removeEventListener("konami:active", onCheat);
      window.removeEventListener("konami:inactive", onCheatEnd);
    };
  }, []);

  // Save hi-score on game end
  useEffect(() => {
    if (!running && scoreRef.current > hi) {
      setHi(scoreRef.current);
      localStorage.setItem("coin-catcher-hi", String(scoreRef.current));
    }
  }, [running, hi]);

  // Sync running ref
  useEffect(() => {
    runningRef.current = running;
  }, [running]);

  // Game loop (single-shot effect, reads from refs to avoid StrictMode double-trigger)
  useEffect(() => {
    if (!running) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    const tick = (t: number) => {
      if (!runningRef.current) return;

      // Spawn
      if (t - lastSpawn.current > 550) {
        lastSpawn.current = t;
        coinsRef.current.push({
          id: ++idRef.current,
          x: Math.random() * 90 + 5,
          y: -5,
          vy: 0.25 + Math.random() * 0.35,
          kind: Math.random() < 0.18 ? "bomb" : "gold",
        });
      }

      // Update positions + detect collisions (pure, no setState updater)
      let goldsCaught = 0;
      let bombsCaught = 0;
      const next: Coin[] = [];
      for (const c of coinsRef.current) {
        const ny = c.y + c.vy;
        if (ny >= 92 && ny <= 100 && Math.abs(c.x - paddleRef.current) < 10) {
          if (c.kind === "gold") goldsCaught++;
          else bombsCaught++;
          continue;
        }
        if (ny > 110) continue;
        next.push({ ...c, y: ny });
      }
      coinsRef.current = next;
      setCoins(next);

      if (goldsCaught > 0) {
        sfx.coin();
        scoreRef.current += goldsCaught * 10;
        setScore(scoreRef.current);
      }
      if (bombsCaught > 0) {
        sfx.gameover();
        scoreRef.current = Math.max(0, scoreRef.current - bombsCaught * 25);
        setScore(scoreRef.current);

        if (!infiniteRef.current) {
          const oldLives = livesRef.current;
          const newLives = Math.max(0, oldLives - bombsCaught);
          livesRef.current = newLives;
          setLives(newLives);
          if (newLives < oldLives) {
            setLastLostLife(oldLives - 1);
          }
        }
      }

      if (livesRef.current <= 0 && !infiniteRef.current) {
        runningRef.current = false;
        setRunning(false);
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [running]);

  const start = () => {
    sfx.powerup();
    scoreRef.current = 0;
    setScore(0);
    coinsRef.current = [];
    setCoins([]);
    livesRef.current = 3;
    setLives(3);
    setLastLostLife(null);
    runningRef.current = true;
    setRunning(true);
  };

  const onMove = (e: React.PointerEvent) => {
    const el = areaRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(6, Math.min(94, x));
    paddleRef.current = clamped;
    setPaddleX(clamped);
  };

  const gameOver = !running && livesRef.current <= 0;

  return (
    <div className="relative">
      {/* HUD */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3 text-pixel text-[10px]">
        <span className="neon-yellow">SCORE {score.toString().padStart(4, "0")}</span>
        <div className="flex items-center gap-1">
          {infinite ? (
            <span className="neon-green blink">∞ LIVES</span>
          ) : (
            [0, 1, 2].map((i) => (
              <span
                key={i}
                className={`text-lg leading-none transition-all duration-300 ${
                  i < lives
                    ? "neon-pink"
                    : i === lastLostLife
                    ? "animate-heartbreak text-muted-foreground opacity-30"
                    : "text-muted-foreground opacity-30"
                }`}
              >
                ♥
              </span>
            ))
          )}
        </div>
        <span className="neon-pink">HI {hi.toString().padStart(4, "0")}</span>
      </div>

      <div
        ref={areaRef}
        onPointerMove={onMove}
        className="relative h-[360px] w-full cursor-none overflow-hidden border-2 border-[color:var(--neon-cyan)] bg-background scanlines"
        style={{ touchAction: "none" }}
      >
        {coins.map((c) => (
          <div
            key={c.id}
            className="absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-pixel text-[10px] leading-6 text-center rounded-full"
            style={{
              left: `${c.x}%`,
              top: `${c.y}%`,
              background: c.kind === "gold" ? "var(--neon-yellow)" : "var(--neon-pink)",
              color: "#0d0a1a",
              boxShadow:
                c.kind === "gold"
                  ? "0 0 12px var(--neon-yellow)"
                  : "0 0 12px var(--neon-pink)",
            }}
          >
            {c.kind === "gold" ? "$" : "✖"}
          </div>
        ))}
        {/* Paddle */}
        <div
          className="absolute bottom-1 h-3 w-20 -translate-x-1/2 bg-[color:var(--neon-green)]"
          style={{ left: `${paddleX}%`, boxShadow: "0 0 12px var(--neon-green)" }}
        />
        {!running && (
          <div className="absolute inset-0 z-10 grid place-items-center bg-background/80">
            <div className="text-center">
              <p className="text-pixel text-xs neon-pink">
                {gameOver ? "GAME OVER — NO LIVES" : "COIN CATCHER"}
              </p>
              <p className="mt-2 text-sm text-foreground/80">
                {gameOver
                  ? "Tu as perdu toutes tes vies ! Réessaie !"
                  : "Bouge la souris. Attrape les $ dorés, évite les ✖."}
              </p>
              <div className="mt-3 flex justify-center gap-2">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className={`text-2xl leading-none ${
                      i < lives ? "neon-pink" : "text-muted-foreground opacity-30"
                    }`}
                  >
                    ♥
                  </span>
                ))}
              </div>
              <button
                onClick={start}
                className="mt-5 text-pixel text-xs bg-[color:var(--neon-yellow)] px-5 py-3 text-[color:var(--primary-foreground)] shadow-[0_5px_0_0_rgba(0,0,0,0.6)] hover:translate-y-[2px]"
              >
                ▶ {gameOver ? "REJOUER" : "INSERT COIN"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
