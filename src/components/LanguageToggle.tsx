import { useLanguage } from "@/lib/i18n";

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => setLang("fr")}
        title="Français"
        className={`text-pixel text-[10px] border-2 px-1 py-1 transition-colors ${
          lang === "fr"
            ? "border-[color:var(--neon-yellow)] neon-yellow"
            : "border-[color:var(--border)] text-muted-foreground hover:text-foreground"
        }`}
      >
        🇫🇷 FR
      </button>
      <button
        onClick={() => setLang("en")}
        title="English"
        className={`text-pixel text-[10px] border-2 px-1 py-1 transition-colors ${
          lang === "en"
            ? "border-[color:var(--neon-cyan)] neon-cyan"
            : "border-[color:var(--border)] text-muted-foreground hover:text-foreground"
        }`}
      >
        🇬🇧 EN
      </button>
    </div>
  );
}
