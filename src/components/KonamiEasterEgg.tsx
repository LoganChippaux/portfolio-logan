import { useLanguage } from "@/lib/i18n";
import { useEffect, useState } from "react";

const CODE = [
  "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
  "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight",
  "b","a",
];

export function KonamiEasterEgg() {
  const { t } = useLanguage();
  const [active, setActive] = useState(false);
  const [buf, setBuf] = useState<string[]>([]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      setBuf((prev) => {
        const next = [...prev, e.key].slice(-CODE.length);
        if (next.length === CODE.length && next.every((k, i) => k.toLowerCase() === CODE[i].toLowerCase())) {
          setActive(true);
          window.dispatchEvent(new Event("konami:active"));
          setTimeout(() => {
            setActive(false);
            window.dispatchEvent(new Event("konami:inactive"));
          }, 6000);
        }
        return next;
      });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!active) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-50 grid place-items-center">
      <div className="text-pixel text-3xl neon-yellow blink">{t("konami.unlocked")}</div>
      {Array.from({ length: 24 }).map((_, i) => (
        <span
          key={i}
          className="absolute text-pixel text-xl neon-pink"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `bob ${1 + Math.random()}s ease-in-out infinite`,
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}
