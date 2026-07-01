// ─────────────────────────────────────────────────────────────────
// 🎮 TES PROJETS / QUESTS
// Modifie ce tableau pour ajouter / éditer tes projets.
// - slug      : utilisé dans l'URL (/quest/space-rush)
// - playUrl   : lien pour jouer au jeu (itch.io, web, .exe…)
// - youtubeId : ID YouTube (la partie après "v=" dans l'URL)
//               ex: https://youtu.be/ABC123  →  "ABC123"
// - longDesc  : description détaillée affichée sur la page dédiée
// ─────────────────────────────────────────────────────────────────
export type Quest = {
  slug: string;
  title: string;
  role: string;
  desc: string;
  longDesc: string;
  tags: string[];
  rarity: "LEGENDARY" | "EPIC" | "RARE";
  color: string;
  playUrl: string;
  youtubeId: string;
};

export const QUESTS: Quest[] = [
  {
    slug: "space-rush",
    title: "PROJECT: SPACE RUSH",
    role: "DEV UNREAL // 2026",
    desc: "First-person escape game built in Unreal Engine 5. Features an interactive keypad puzzle, proximity detection, fullscreen code-entry UI, and Blueprint-driven validation that unlocks doors to progress the player.",
    longDesc:
      "Space Rush is a first-person escape game built in Unreal Engine 5. The player explores a space station, interacts with a numeric keypad to enter a code, and progresses through locked doors using a validation system entirely driven by Blueprint. The project focuses on proximity interaction, fullscreen UI, and immersive storytelling.",
    tags: ["UE5", "C#"],
    rarity: "LEGENDARY",
    color: "neon-yellow",
    playUrl: "#",
    youtubeId: "6_5QDEchg0Q",
  },
  {
    slug: "new-legendary",
    title: "PROJECT: LETGO",
    role: "DEV UNREAL // 2026",
    desc: "A narrative-driven UE5 walking simulator blending atmospheric exploration with light mini-games, built by a 20-person cross-disciplinary team.",
    longDesc:
      "A contemplative, narrative-driven walking simulator built in Unreal Engine 5, blending atmospheric exploration with light mini-games (Schedule 1–style). Developed by a 20-person cross-disciplinary team: 7 developers, 3D and 2D artists, sound designers, a video editor (making-of & trailer), and a business unit handling market analysis.",
    tags: ["UE5", "BLUEPRINT", "GIT LFS"],
    rarity: "LEGENDARY",
    color: "neon-yellow",
    playUrl: "#",
    youtubeId: "n1nKvs7nC7k",
  },
  {
    slug: "brotato-like",
    title: "PROJECT: BROtato LIKE",
    role: "DEV C++ // 2025",
    desc: "Horde-survival roguelite (Vampire Survivors–style). Wave-based survival, enemy pathfinding, boss fight, 16+ stat system with equipment fusion. Fully coded from scratch in C++.",
    longDesc:
      "A horde-survival roguelite built entirely from scratch in C++. Features wave-based survival gameplay where enemies swarm in from all directions, intelligent pathfinding AI, an epic boss fight, and a deep 16+ stat system with equipment fusion mechanics. Inspired by Vampire Survivors and Brotato, every run is unique as you stack weapons, stats and modifiers to survive increasingly chaotic waves.",
    tags: ["C++", "CUSTOM ENGINE", "ROGUELITE"],
    rarity: "EPIC",
    color: "neon-pink",
    playUrl: "#",
    youtubeId: "L9Sw0zgTMvo",
  },
  {
    slug: "pixel-forge",
    title: "PROJECT: PIXEL FORGE",
    role: "DESIGNER // 2023",
    desc: "Open-source design system used by 200+ devs. Tokens, components, the works.",
    longDesc:
      "Pixel Forge est un design system open-source adopté par plus de 200 développeurs. Il fournit un ensemble complet de tokens, composants et conventions pour bâtir des interfaces cohérentes et accessibles.",
    tags: ["DESIGN", "TAILWIND", "OSS"],
    rarity: "RARE",
    color: "neon-cyan",
    playUrl: "#",
    youtubeId: "",
  },
];

export const getQuestBySlug = (slug: string) =>
  QUESTS.find((q) => q.slug === slug);
