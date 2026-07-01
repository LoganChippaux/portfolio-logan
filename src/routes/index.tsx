// ─────────────────────────────────────────────────────────────────
// 👋 COMMENT PERSONNALISER TON PORTFOLIO (lis-moi !)
// ─────────────────────────────────────────────────────────────────
// 1) TON NOM / PSEUDO        → cherche "PLAYER ONE" plus bas et remplace.
// 2) TON SOUS-TITRE          → "A FULL-STACK ADVENTURER".
// 3) TON PITCH               → le gros paragraphe "I build delightful...".
// 4) TES STATS HUD           → modifie le tableau STATS (LVL / XP / HP / GOLD).
// 5) TES PROJETS             → modifie le tableau QUESTS (title, role, desc, tags, rarity).
// 6) TES COMPÉTENCES         → modifie le tableau SKILLS (name + lvl 0-100).
// 7) SECTION "BOSS / ABOUT"  → modifie les 2 paragraphes et les stats (QUESTS/YEARS/COMBO).
// 8) CONTACT                 → change "mailto:player1@arcade.dev" et les liens GitHub/LinkedIn.
// 9) META / SEO              → en haut: title, description (apparaît sur Google/partages).
// 10) MINI-JEU               → src/components/CoinCatcher.tsx (logique du jeu).
// 11) EASTER EGG             → tape ↑ ↑ ↓ ↓ ← → ← → B A (code Konami) n'importe où.
// ─────────────────────────────────────────────────────────────────
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CoinCatcher } from "@/components/CoinCatcher";
import { KonamiEasterEgg } from "@/components/KonamiEasterEgg";
import { ArcadeBackground } from "@/components/ArcadeBackground";
import { sfx, music } from "@/lib/arcadeSound";
import { QUESTS } from "@/lib/quests";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PLAYER ONE // Arcade Portfolio" },
      { name: "description", content: "An 8-bit arcade-themed personal portfolio. Insert coin to continue." },
      { property: "og:title", content: "PLAYER ONE // Arcade Portfolio" },
      { property: "og:description", content: "An 8-bit arcade-themed personal portfolio. Insert coin to continue." },
    ],
  }),
  component: Index,
});

const STATS = [
  { label: "LVL", value: "21", color: "neon-yellow" },
  { label: "XP", value: "99,420", color: "neon-cyan" },
  { label: "HP", value: "100/100", color: "neon-green" },
  { label: "GOLD", value: "1,337", color: "neon-pink" },
];

const SKILLS = [
  { name: "UNREAL", lvl: 60 },
  { name: "UNITY", lvl: 70 },
  { name: "C++", lvl: 55 },
  { name: "C#", lvl: 55 },
  { name: "PYTHON", lvl: 50 },
];


function Index() {
  const [coins, setCoins] = useState(3);
  const [score, setScore] = useState(0);
  const [musicOn, setMusicOn] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setScore((s) => s + 10), 120);
    return () => clearInterval(id);
  }, []);

  // 🔊 Sons d'arcade globaux : clic sur n'importe quel bouton/lien.
  // Pour DÉSACTIVER, supprime ce useEffect.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest("a, button");
      if (el) sfx.click();
    };
    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest("a, button");
      if (el && !el.hasAttribute("data-hovered")) {
        el.setAttribute("data-hovered", "1");
        sfx.hover();
        setTimeout(() => el.removeAttribute("data-hovered"), 250);
      }
    };
    document.addEventListener("click", onClick);
    document.addEventListener("mouseover", onOver);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("mouseover", onOver);
      music.stop();
    };
  }, []);

  const toggleMusic = () => setMusicOn(music.toggle());

  return (
    <main className="relative min-h-screen overflow-x-hidden text-arcade">
      <ArcadeBackground />
      {/* Top HUD */}
      <header className="sticky top-0 z-30 border-b-4 border-[color:var(--neon-pink)] bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <CoinIcon />
            <span className="text-pixel text-xs neon-yellow">CREDITS × {coins}</span>
          </div>
          <nav className="hidden gap-6 text-pixel text-[10px] md:flex">
            <a href="#quests" className="neon-cyan hover:neon-pink">QUESTS</a>
            <a href="#skills" className="neon-cyan hover:neon-pink">SKILLS</a>
            <a href="#arcade" className="neon-cyan hover:neon-pink">ARCADE</a>
            <a href="#boss" className="neon-cyan hover:neon-pink">BOSS</a>
            <a href="#contact" className="neon-cyan hover:neon-pink">CONTACT</a>
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleMusic}
              title={musicOn ? "Couper la musique" : "Lancer le thème"}
              className={`text-pixel text-[10px] border-2 px-2 py-1 ${
                musicOn
                  ? "border-[color:var(--neon-green)] neon-green"
                  : "border-[color:var(--neon-purple)] text-muted-foreground"
              }`}
            >
              {musicOn ? "♪ BGM ON" : "♪ BGM OFF"}
            </button>
            <div className="text-pixel text-[10px] neon-green">SCORE {score.toString().padStart(6, "0")}</div>
          </div>
        </div>
      </header>

      {/* HERO / TITLE SCREEN */}
      <section className="relative px-4 py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="relative arcade-border scanlines crt-vignette overflow-hidden rounded-md bg-[color:var(--card)] p-8 md:p-14">
            <div className="relative z-10 text-center">
              <p className="text-pixel text-[10px] neon-cyan blink">★ INSERT COIN ★</p>
              <h1 className="mt-6 text-pixel text-3xl leading-tight neon-pink md:text-6xl">
                PLAYER&nbsp;ONE
              </h1>
              <p className="mt-4 text-pixel text-xs neon-yellow md:text-base flicker">
                A FULL-STACK ADVENTURER
              </p>
              <p className="mx-auto mt-8 max-w-xl text-lg leading-snug text-foreground/90 md:text-xl">
                I build delightful web experiences with a side-quest of pixel art and
                synthwave soundtracks. Press START to view my quests.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#quests"
                  onClick={() => { sfx.start(); setCoins((c) => Math.max(0, c - 1)); }}
                  className="text-pixel text-xs bg-[color:var(--neon-pink)] px-6 py-4 text-[color:var(--primary-foreground)] shadow-[0_6px_0_0_rgba(0,0,0,0.6)] transition-transform hover:translate-y-[2px] hover:shadow-[0_4px_0_0_rgba(0,0,0,0.6)]"
                >
                  ▶ PRESS START
                </a>
                <a
                  href="#contact"
                  className="text-pixel text-xs border-2 border-[color:var(--neon-cyan)] px-6 py-4 neon-cyan hover:bg-[color:var(--neon-cyan)] hover:text-[color:var(--primary-foreground)] hover:[text-shadow:none]"
                >
                  HIGH SCORE? HIRE ME
                </a>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
                {STATS.map((s) => (
                  <div key={s.label} className="border-2 border-[color:var(--border)] bg-background/60 p-3 text-left">
                    <div className={`text-pixel text-[9px] ${s.color}`}>{s.label}</div>
                    <div className="mt-1 text-2xl">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Marquee */}
          <div className="mt-6 overflow-hidden border-y-4 border-[color:var(--neon-purple)] bg-background py-3">
            <div className="marquee-track flex w-max gap-12 text-pixel text-[10px] neon-yellow">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="flex shrink-0 gap-12 pr-12">
                  <span>★ NEW HIGH SCORE</span>
                  <span>★ SHIPPING SINCE 2017</span>
                  <span>★ OPEN TO QUESTS</span>
                  <span>★ COFFEE → CODE</span>
                  <span>★ 1UP AVAILABLE</span>
                  <span>★ READY PLAYER ONE</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* QUESTS / PROJECTS */}
      <section id="quests" className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionTitle eyebrow="WORLD 1-1" title="SELECT YOUR QUEST" color="neon-pink" />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {QUESTS.map((q) => (
              <Link
                key={q.slug}
                to="/quest/$slug"
                params={{ slug: q.slug }}
                className="group relative flex flex-col border-2 border-[color:var(--border)] bg-[color:var(--card)] p-5 transition-transform hover:-translate-y-1 hover:border-[color:var(--neon-pink)]"
              >
                <div className={`text-pixel text-[9px] ${q.color}`}>{q.rarity}</div>
                <h3 className={`mt-3 text-pixel text-sm ${q.color}`}>{q.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{q.role}</p>
                <p className="mt-4 text-base leading-snug text-foreground/90">{q.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {q.tags.map((t) => (
                    <span key={t} className="text-pixel text-[9px] border border-[color:var(--neon-cyan)] px-2 py-1 neon-cyan">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-6 text-pixel text-[10px] neon-yellow opacity-0 transition-opacity group-hover:opacity-100">
                  ▶ ENTER STAGE
                </div>
              </Link>
            ))}

            {/* ➕ EMPTY SLOT — "insert cartridge" visual to add a new project.
                To add a project: edit src/lib/quests.ts and copy an object from the QUESTS array. */}
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="group relative flex flex-col items-center justify-center gap-4 border-2 border-dashed border-[color:var(--neon-cyan)]/50 bg-[color:var(--card)]/40 p-5 min-h-[260px] transition-all hover:border-[color:var(--neon-pink)] hover:bg-[color:var(--card)] hover:-translate-y-1"
            >
              <div className="text-pixel text-[9px] neon-cyan opacity-70">COMING SOON</div>
              <div className="relative flex h-20 w-20 items-center justify-center border-2 border-[color:var(--neon-cyan)] text-pixel text-3xl neon-cyan transition-all group-hover:border-[color:var(--neon-pink)] group-hover:neon-pink group-hover:rotate-90">
                ?
                <span className="absolute inset-0 animate-ping border-2 border-[color:var(--neon-pink)] opacity-0 group-hover:opacity-40" />
              </div>
              <div className="text-pixel text-[10px] neon-yellow text-center">
                IN PROGRESS
              </div>
              <p className="text-center text-xs text-muted-foreground max-w-[200px]">
                New project coming soon
              </p>
              {/* Mini animated cartridge */}
              <div className="mt-1 flex gap-1">
                <span className="h-2 w-2 bg-[color:var(--neon-pink)] animate-pulse" />
                <span className="h-2 w-2 bg-[color:var(--neon-yellow)] animate-pulse [animation-delay:150ms]" />
                <span className="h-2 w-2 bg-[color:var(--neon-cyan)] animate-pulse [animation-delay:300ms]" />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <SectionTitle eyebrow="POWER-UPS" title="SKILL TREE" color="neon-cyan" />
          <div className="mt-10 space-y-5">
            {SKILLS.map((s) => (
              <div key={s.name}>
                <div className="mb-2 flex items-center justify-between text-pixel text-[10px]">
                  <span className="neon-yellow">{s.name}</span>
                  <span className="neon-green">{s.lvl}/100</span>
                </div>
                <div className="h-5 w-full border-2 border-[color:var(--border)] bg-background p-[2px]">
                  <div
                    className="h-full bg-[color:var(--neon-pink)]"
                    style={{
                      width: `${s.lvl}%`,
                      backgroundImage:
                        "repeating-linear-gradient(90deg, var(--neon-pink) 0 10px, var(--neon-purple) 10px 20px)",
                      boxShadow: "0 0 12px var(--neon-pink)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARCADE / MINI-GAME */}
      <section id="arcade" className="px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <SectionTitle eyebrow="BONUS STAGE" title="MINI-JEU : COIN CATCHER" color="neon-green" />
          <p className="mt-4 text-center text-base text-foreground/80">
            Bouge ta souris pour déplacer la barre verte. 30 secondes pour faire un max de points.
          </p>
          <div className="mt-8 arcade-border bg-[color:var(--card)] p-4">
            <CoinCatcher />
          </div>
          <p className="mt-4 text-center text-pixel text-[10px] neon-yellow">
            ★ ASTUCE : tape{" "}
            <span className="inline-flex items-center gap-[2px] align-middle">
              {["↑","↑","↓","↓","←","→","←","→"].map((g, i) => (
                <span key={i} className="inline-block w-3 text-center">{g}</span>
              ))}
            </span>{" "}
            B A pour vies illimitées ★
          </p>
        </div>
      </section>

      {/* BOSS / ABOUT */}
      <section id="boss" className="px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <SectionTitle eyebrow="FINAL STAGE" title="THE BOSS FIGHT" color="neon-yellow" />
          <div className="mt-10 grid gap-8 md:grid-cols-[1fr_1.4fr] md:items-center">
            <div className="relative arcade-border-yellow scanlines aspect-square overflow-hidden bg-[color:var(--card)]">
              <PixelAvatar />
            </div>
            <div>
              <h3 className="text-pixel text-base neon-pink">ABOUT THE HERO</h3>
              <p className="mt-4 text-lg leading-relaxed text-foreground/90">
                I'm a developer-designer from Lyon who treats every project like a level worth
                perfecting. I love clean code, crisp pixels, and that satisfying
                <span className="neon-green"> coin-pickup </span> moment when a mechanic
                finally <em>clicks</em>.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-foreground/90">
                From scripted gameplay in Unreal Engine 5 and Unity to full systems built from
                scratch in C++, I ship experiences that feel as good to play as they look.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-foreground/90">
                When I'm offline you'll find me cheering for PSG, chasing high scores, playing
                video games, and watching movies.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                {[
                  { k: "QUESTS", v: "15+" },
                  { k: "YEARS", v: "4" },
                  { k: "COMBO", v: "x99" },
                ].map((b) => (
                  <div key={b.k} className="border-2 border-[color:var(--border)] bg-[color:var(--card)] p-3">
                    <div className="text-pixel text-2xl neon-cyan">{b.v}</div>
                    <div className="text-pixel text-[9px] mt-1 text-muted-foreground">{b.k}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <SectionTitle eyebrow="GAME OVER?" title="CONTINUE? Y / N" color="neon-green" center />
          <p className="mx-auto mt-6 max-w-xl text-lg text-foreground/90">
            Got a quest for me? Drop a message and I'll spawn back in within 24 hours.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="mailto:chippauxlogan@gmail.com"
              className="text-pixel text-xs bg-[color:var(--neon-green)] px-6 py-4 text-[color:var(--primary-foreground)] shadow-[0_6px_0_0_rgba(0,0,0,0.6)] hover:translate-y-[2px] hover:shadow-[0_4px_0_0_rgba(0,0,0,0.6)] transition-transform"
            >
              ✉ SEND TRANSMISSION
            </a>
            <a
              href="https://github.com/LoganChippaux"
              target="_blank"
              rel="noreferrer"
              className="text-pixel text-xs border-2 border-[color:var(--neon-pink)] px-6 py-4 neon-pink hover:bg-[color:var(--neon-pink)] hover:text-[color:var(--primary-foreground)] hover:[text-shadow:none]"
            >
              ↗ GITHUB
            </a>
            <a
              href="https://www.linkedin.com/in/chippaux-logan-52ba63298/"
              target="_blank"
              rel="noreferrer"
              className="text-pixel text-xs border-2 border-[color:var(--neon-cyan)] px-6 py-4 neon-cyan hover:bg-[color:var(--neon-cyan)] hover:text-[color:var(--primary-foreground)] hover:[text-shadow:none]"
            >
              ↗ LINKEDIN
            </a>
          </div>
          <p className="mt-16 text-pixel text-[10px] text-muted-foreground">
            © 2026 PLAYER ONE — ALL RIGHTS RESERVED — <span className="blink">_</span>
          </p>
        </div>
      </section>
      <KonamiEasterEgg />
    </main>
  );
}

function SectionTitle({
  eyebrow,
  title,
  color,
  center = false,
}: {
  eyebrow: string;
  title: string;
  color: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""}>
      <p className={`text-pixel text-[10px] ${color}`}>★ {eyebrow} ★</p>
      <h2 className="mt-3 text-pixel text-2xl text-foreground md:text-4xl">{title}</h2>
      <div
        className={`mt-4 h-1 w-24 ${center ? "mx-auto" : ""}`}
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, var(--neon-pink) 0 8px, transparent 8px 16px)",
        }}
      />
    </div>
  );
}

function CoinIcon() {
  return (
    <div className="coin-spin inline-block h-6 w-6 rounded-full border-2 border-[color:var(--neon-yellow)] bg-[color:var(--neon-yellow)]/30 text-center text-pixel text-[9px] leading-[1.4rem] neon-yellow">
      $
    </div>
  );
}

function PixelAvatar() {
  // 12x12 pixel hero sprite — neon-cyan helmet, pink visor
  const P = {
    _: "transparent",
    k: "#0d0a1a",
    c: "var(--neon-cyan)",
    p: "var(--neon-pink)",
    y: "var(--neon-yellow)",
    g: "var(--neon-green)",
    s: "#f4d3a8",
  };
  const grid = [
    "____kkkk____",
    "___kccccck__",
    "__kccccccck_",
    "__kcppppcck_",
    "__kcppppcck_",
    "__kssssssk__",
    "__kssssssk__",
    "___kyyyyyk__",
    "__kpyyyyypk_",
    "__kpyyyyypk_",
    "___kp__pk___",
    "___kg__gk___",
  ];
  return (
    <div className="bob absolute inset-0 grid place-items-center">
      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(12, 1fr)",
          width: "min(80%, 320px)",
          aspectRatio: "1 / 1",
          imageRendering: "pixelated",
        }}
      >
        {grid.flatMap((row, y) =>
          row.split("").map((ch, x) => (
            <div
              key={`${x}-${y}`}
              style={{
                background: P[ch as keyof typeof P] ?? "transparent",
                boxShadow:
                  ch !== "_" && ch !== "k"
                    ? "0 0 4px currentColor"
                    : undefined,
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}
