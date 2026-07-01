import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useLanguage } from "@/lib/i18n";
import { getQuestBySlug, localizeQuest, QUESTS } from "@/lib/quests";

export const Route = createFileRoute("/quest/$slug")({
  head: ({ params }) => {
    const q = getQuestBySlug(params.slug);
    const title = q ? `${q.title} // PLAYER ONE` : "QUEST NOT FOUND";
    const description = q?.desc ?? "Quest details";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  loader: ({ params }) => {
    const quest = getQuestBySlug(params.slug);
    if (!quest) throw notFound();
    return { quest };
  },
  notFoundComponent: () => {
    const { t } = useLanguage();
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center">
        <h1 className="text-pixel text-3xl neon-pink">{t("quest.notFound")}</h1>
        <Link to="/" className="text-pixel text-xs neon-cyan underline">
          ← {t("quest.notFoundBack")}
        </Link>
      </main>
    );
  },
  component: QuestPage,
});

// Borders per rarity
const RARITY_BORDER: Record<string, string> = {
  LEGENDARY: "border-[color:var(--neon-yellow)] shadow-[0_0_30px_var(--neon-yellow)]",
  EPIC: "border-[color:var(--neon-pink)] shadow-[0_0_30px_var(--neon-pink)]",
  RARE: "border-[color:var(--neon-cyan)] shadow-[0_0_30px_var(--neon-cyan)]",
};

function QuestPage() {
  const { lang, t } = useLanguage();
  const { quest: q } = Route.useLoaderData();
  const localized = localizeQuest(q, lang);
  const borderClass = RARITY_BORDER[q.rarity] ?? "border-[color:var(--border)]";
  const rarityLabel =
    q.rarity === "LEGENDARY"
      ? t("rarity.legendaryQuest")
      : q.rarity === "EPIC"
      ? t("rarity.epicQuest")
      : t("rarity.rareQuest");

  return (
    <main className="relative min-h-screen overflow-x-hidden text-arcade px-4 py-10">
      <div className="mx-auto max-w-5xl">
        {/* Back nav */}
        <Link
          to="/"
          hash="quests"
          className="text-pixel text-[10px] neon-cyan hover:neon-pink"
        >
          ← {t("quest.back")}
        </Link>

        {/* Hero card */}
        <div
          className={`mt-6 relative arcade-border scanlines crt-vignette overflow-hidden rounded-md bg-[color:var(--card)] p-6 md:p-10 border-4 ${borderClass}`}
        >
          <p className={`text-pixel text-[10px] ${q.color} blink`}>
            {rarityLabel}
          </p>
          <h1 className={`mt-4 text-pixel text-2xl md:text-4xl ${q.color}`}>
            {localized.title}
          </h1>
          <p className="mt-2 text-pixel text-[10px] text-muted-foreground">
            {localized.role}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {q.tags.map((tag: string) => (
              <span
                key={tag}
                className="text-pixel text-[9px] border border-[color:var(--neon-cyan)] px-2 py-1 neon-cyan"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="mt-8 text-lg leading-relaxed text-foreground/90">
            {localized.longDesc}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            {q.playUrl && q.playUrl !== "#" ? (
              <a
                href={q.playUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-pixel text-xs px-6 py-4 text-[color:var(--primary-foreground)] shadow-[0_6px_0_0_rgba(0,0,0,0.6)] hover:translate-y-[2px] hover:shadow-[0_4px_0_0_rgba(0,0,0,0.6)] transition-transform bg-[color:var(--${q.color.replace("neon-", "neon-")})]`}
                style={{ backgroundColor: `var(--${q.color.replace("neon-", "neon-")})` }}
              >
                ▶ {t("quest.play")}
              </a>
            ) : null}
          </div>
        </div>

        {/* Video */}
        <section className="mt-12">
          <p className={`text-pixel text-[10px] ${q.color}`}>★ {t("quest.gameplay")} ★</p>
          <h2 className="mt-3 text-pixel text-xl md:text-2xl">{t("quest.videoDemo")}</h2>
          <div
            className={`mt-6 aspect-video w-full overflow-hidden border-4 ${borderClass} bg-black`}
          >
            {q.youtubeId ? (
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${q.youtubeId}`}
                title={localized.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
                <div className="flex h-full w-full items-center justify-center text-pixel text-[10px] text-muted-foreground p-6 text-center">
                  {t("quest.emptyVideo")}
                  <br />
                  {t("quest.emptyVideoExample")}
                </div>
            )}
          </div>
        </section>

        {/* Other quests */}
        <section className="mt-16">
          <p className="text-pixel text-[10px] neon-pink">★ {t("quest.next")} ★</p>
          <h2 className="mt-3 text-pixel text-xl">{t("quest.continue")}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {QUESTS.filter((o) => o.slug !== q.slug).map((o) => {
              const ol = localizeQuest(o, lang);
              const orLabel =
                o.rarity === "LEGENDARY"
                  ? t("rarity.legendaryQuest")
                  : o.rarity === "EPIC"
                  ? t("rarity.epicQuest")
                  : t("rarity.rareQuest");
              return (
                <Link
                  key={o.slug}
                  to="/quest/$slug"
                  params={{ slug: o.slug }}
                  className="flex flex-col border-2 border-[color:var(--border)] bg-[color:var(--card)] p-4 hover:border-[color:var(--neon-pink)] transition"
                >
                  <span className={`text-pixel text-[9px] ${o.color}`}>{orLabel}</span>
                  <span className={`mt-2 text-pixel text-sm ${o.color}`}>{ol.title}</span>
                  <span className="mt-1 text-xs text-muted-foreground">{ol.role}</span>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
