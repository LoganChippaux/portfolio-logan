// ─────────────────────────────────────────────────────────────────
// 👋 HOW TO CUSTOMIZE YOUR PORTFOLIO (read me!)
// ─────────────────────────────────────────────────────────────────
// 1) YOUR NAME / HANDLE         → search for "PLAYER ONE" below and replace.
// 2) YOUR SUBTITLE              → edit the hero subtitle in src/lib/i18n.tsx.
// 3) YOUR PITCH                 → edit the hero pitch in src/lib/i18n.tsx.
// 4) YOUR HUD STATS             → edit the STATS array (LVL / XP / HP / GOLD).
// 5) YOUR PROJECTS              → edit the QUESTS array in src/lib/quests.ts.
// 6) YOUR SKILLS                → edit the SKILLS array (name + lvl 0-100).
// 7) "BOSS / ABOUT" SECTION     → edit the paragraphs and stats in src/lib/i18n.tsx.
// 8) CONTACT                    → change the mailto and GitHub/LinkedIn links below.
// 9) META / SEO                 → at the top: title, description (shown on Google/shares).
// 10) MINI-GAME                 → src/components/CoinCatcher.tsx (game logic).
// 11) EASTER EGG                → type ↑ ↑ ↓ ↓ ← → ← → B A (Konami code) anywhere.
// 12) LANGUAGES                 → all texts live in src/lib/i18n.tsx (en + fr).
// ─────────────────────────────────────────────────────────────────
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CoinCatcher } from "@/components/CoinCatcher";
import { KonamiEasterEgg } from "@/components/KonamiEasterEgg";
import { ArcadeBackground } from "@/components/ArcadeBackground";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/lib/i18n";
import { sfx, music } from "@/lib/arcadeSound";
import { localizeQuest, QUESTS } from "@/lib/quests";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PLAYER ONE // Video Game Developer Portfolio" },
      { name: "description", content: "Arcade-themed portfolio of a video game developer. Insert coin to continue." },
      { property: "og:title", content: "PLAYER ONE // Video Game Developer Portfolio" },
      { property: "og:description", content: "Arcade-themed portfolio of a video game developer. Insert coin to continue." },
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

const MARQUEE_KEYS = [
  "marquee.newHighScore",
  "marquee.shippingSince",
  "marquee.openToQuests",
  "marquee.coffeeToCode",
  "marquee.1upAvailable",
  "marquee.readyPlayerOne",
] as const;

function Index() {
  const { t, lang } = useLanguage();
  const [coins, setCoins] = useState(3);
  const [score, setScore] = useState(0);
  const [musicOn, setMusicOn] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setScore((s) => s + 10), 120);
    return () => clearInterval(id);
  }, []);

  // 🔊 Global arcade sounds: click on any button/link.
  // To DISABLE, remove this useEffect.
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

  const rarityLabel = (r: string) =>
    r === "LEGENDARY" ? t("rarity.legendary") : r === "EPIC" ? t("rarity.epic") : t("rarity.rare");

  return (
    <main className="relative min-h-screen overflow-x-hidden text-arcade">
      <ArcadeBackground />
      {/* Top HUD */}
      <header className="sticky top-0 z-30 border-b-4 border-[color:var(--neon-pink)] bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <CoinIcon />
            <span className="text-pixel text-xs neon-yellow">
              {t("header.credits")} × {coins}
            </span>
          </div>
          <nav className="hidden gap-6 text-pixel text-[10px] md:flex">
            <a href="#quests" className="neon-cyan hover:neon-pink">{t("nav.quests")}</a>
            <a href="#skills" className="neon-cyan hover:neon-pink">{t("nav.skills")}</a>
            <a href="#arcade" className="neon-cyan hover:neon-pink">{t("nav.arcade")}</a>
            <a href="#boss" className="neon-cyan hover:neon-pink">{t("nav.boss")}</a>
            <a href="#contact" className="neon-cyan hover:neon-pink">{t("nav.contact")}</a>
          </nav>
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <button
              onClick={toggleMusic}
              title={musicOn ? t("music.stop") : t("music.play")}
              className={`text-pixel text-[10px] border-2 px-2 py-1 ${
                musicOn
                  ? "border-[color:var(--neon-green)] neon-green"
                  : "border-[color:var(--neon-purple)] text-muted-foreground"
              }`}
            >
              {musicOn ? t("music.on") : t("music.off")}
            </button>
            <div className="text-pixel text-[10px] neon-green">
              {`${t("header.score")} ${score.toString().padStart(6, "0")}`}
            </div>
          </div>
        </div>
      </header>

      {/* HERO / TITLE SCREEN */}
      <section className="relative px-4 py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="relative arcade-border scanlines crt-vignette overflow-hidden rounded-md bg-[color:var(--card)] p-8 md:p-14">
            <div className="relative z-10 text-center">
              <p className="text-pixel text-[10px] neon-cyan blink">{t("hero.insertCoin")}</p>
              <h1 className="mt-6 text-pixel text-3xl leading-tight neon-pink md:text-6xl">
                PLAYER&nbsp;ONE
              </h1>
              <p className="mt-4 text-pixel text-xs neon-yellow md:text-base flicker">
                {t("hero.subtitle")}
              </p>
              <p className="mx-auto mt-8 max-w-xl text-lg leading-snug text-foreground/90 md:text-xl">
                {t("hero.pitch")}
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#quests"
                  onClick={() => { sfx.start(); setCoins((c) => Math.max(0, c - 1)); }}
                  className="text-pixel text-xs bg-[color:var(--neon-pink)] px-6 py-4 text-[color:var(--primary-foreground)] shadow-[0_6px_0_0_rgba(0,0,0,0.6)] transition-transform hover:translate-y-[2px] hover:shadow-[0_4px_0_0_rgba(0,0,0,0.6)]"
                >
                  ▶ {t("hero.pressStart")}
                </a>
                <a
                  href="#contact"
                  className="text-pixel text-xs border-2 border-[color:var(--neon-cyan)] px-6 py-4 neon-cyan hover:bg-[color:var(--neon-cyan)] hover:text-[color:var(--primary-foreground)] hover:[text-shadow:none]"
                >
                  {t("hero.hireMe")}
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
                  {MARQUEE_KEYS.map((key) => (
                    <span key={key}>★ {t(key)}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* QUESTS / PROJECTS */}
      <section id="quests" className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionTitle eyebrow={t("quests.eyebrow")} title={t("quests.title")} color="neon-pink" />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {QUESTS.map((q) => {
              const l = localizeQuest(q, lang);
              return (
                <Link
                  key={q.slug}
                  to="/quest/$slug"
                  params={{ slug: q.slug }}
                  className="group relative flex flex-col border-2 border-[color:var(--border)] bg-[color:var(--card)] p-5 transition-transform hover:-translate-y-1 hover:border-[color:var(--neon-pink)]"
                >
                  <div className={`text-pixel text-[9px] ${q.color}`}>{rarityLabel(q.rarity)}</div>
                  <h3 className={`mt-3 text-pixel text-sm ${q.color}`}>{l.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{l.role}</p>
                  <p className="mt-4 text-base leading-snug text-foreground/90">{l.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {q.tags.map((tag) => (
                      <span key={tag} className="text-pixel text-[9px] border border-[color:var(--neon-cyan)] px-2 py-1 neon-cyan">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 text-pixel text-[10px] neon-yellow opacity-0 transition-opacity group-hover:opacity-100">
                    ▶ {t("quests.enterStage")}
                  </div>
                </Link>
              );
            })}

            {/* ➕ EMPTY SLOT — visual hint for a future project. */}
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="group relative flex flex-col items-center justify-center gap-4 border-2 border-dashed border-[color:var(--neon-cyan)]/50 bg-[color:var(--card)]/40 p-5 min-h-[260px] transition-all hover:border-[color:var(--neon-pink)] hover:bg-[color:var(--card)] hover:-translate-y-1"
            >
              <div className="text-pixel text-[9px] neon-cyan opacity-70">{t("emptySlot.comingSoon")}</div>
              <div className="relative flex h-20 w-20 items-center justify-center border-2 border-[color:var(--neon-cyan)] text-pixel text-3xl neon-cyan transition-all group-hover:border-[color:var(--neon-pink)] group-hover:neon-pink group-hover:rotate-90">
                ?
                <span className="absolute inset-0 animate-ping border-2 border-[color:var(--neon-pink)] opacity-0 group-hover:opacity-40" />
              </div>
              <div className="text-pixel text-[10px] neon-yellow text-center">
                {t("emptySlot.inProgress")}
              </div>
              <p className="text-center text-xs text-muted-foreground max-w-[200px]">
                {t("emptySlot.description")}
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
          <SectionTitle eyebrow={t("skills.eyebrow")} title={t("skills.title")} color="neon-cyan" />
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
          <SectionTitle eyebrow={t("arcade.eyebrow")} title={t("arcade.title")} color="neon-green" />
          <p className="mt-4 text-center text-base text-foreground/80">
            {t("arcade.description")}
          </p>
          <div className="mt-8 arcade-border bg-[color:var(--card)] p-4">
            <CoinCatcher />
          </div>
          <p className="mt-4 text-center text-pixel text-[10px] neon-yellow">
            ★ {t("arcade.tipPrefix")}{" "}
            <span className="inline-flex items-center gap-[2px] align-middle">
              {["↑","↑","↓","↓","←","→","←","→"].map((g, i) => (
                <span key={i} className="inline-block w-3 text-center">{g}</span>
              ))}
            </span>{" "}
            {t("arcade.tipSuffix")} ★
          </p>
        </div>
      </section>

      {/* BOSS / ABOUT */}
      <section id="boss" className="px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <SectionTitle eyebrow={t("boss.eyebrow")} title={t("boss.title")} color="neon-yellow" />
          <div className="mt-10 grid gap-8 md:grid-cols-[1fr_1.4fr] md:items-center">
            <div className="relative arcade-border-yellow scanlines aspect-square overflow-hidden bg-[color:var(--card)]">
              <PixelAvatar />
            </div>
            <div>
              <h3 className="text-pixel text-base neon-pink">{t("boss.about")}</h3>
              <p className="mt-4 text-lg leading-relaxed text-foreground/90">
                {t("boss.p1.before")}
                <span className="neon-green"> {t("boss.p1.highlight")} </span>
                {t("boss.p1.after")} <em>{t("boss.p1.em")}</em>.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-foreground/90">
                {t("boss.p2")}
              </p>
              <p className="mt-4 text-lg leading-relaxed text-foreground/90">
                {t("boss.p3")}
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                {[
                  { k: t("boss.stat.quests"), v: "15+" },
                  { k: t("boss.stat.years"), v: "4" },
                  { k: t("boss.stat.combo"), v: "x99" },
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
          <SectionTitle eyebrow={t("contact.eyebrow")} title={t("contact.title")} color="neon-green" center />
          <p className="mx-auto mt-6 max-w-xl text-lg text-foreground/90">
            {t("contact.pitch")}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="mailto:chippauxlogan@gmail.com"
              className="text-pixel text-xs bg-[color:var(--neon-green)] px-6 py-4 text-[color:var(--primary-foreground)] shadow-[0_6px_0_0_rgba(0,0,0,0.6)] hover:translate-y-[2px] hover:shadow-[0_4px_0_0_rgba(0,0,0,0.6)] transition-transform"
            >
              ✉ {t("contact.send")}
            </a>
            <a
              href="https://github.com/LoganChippaux"
              target="_blank"
              rel="noreferrer"
              className="text-pixel text-xs border-2 border-[color:var(--neon-pink)] px-6 py-4 neon-pink hover:bg-[color:var(--neon-pink)] hover:text-[color:var(--primary-foreground)] hover:[text-shadow:none]"
            >
              ↗ {t("contact.github")}
            </a>
            <a
              href="https://www.linkedin.com/in/chippaux-logan-52ba63298/"
              target="_blank"
              rel="noreferrer"
              className="text-pixel text-xs border-2 border-[color:var(--neon-cyan)] px-6 py-4 neon-cyan hover:bg-[color:var(--neon-cyan)] hover:text-[color:var(--primary-foreground)] hover:[text-shadow:none]"
            >
              ↗ {t("contact.linkedin")}
            </a>
          </div>
          <p className="mt-16 text-pixel text-[10px] text-muted-foreground">
            {t("footer.copyright")} <span className="blink">_</span>
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
