// ─────────────────────────────────────────────────────────────────
// 🎮 YOUR PROJECTS / QUESTS
// Edit this array to add / update your projects.
// - slug      : used in the URL (/quest/space-rush)
// - playUrl   : link to play the game (itch.io, web, .exe…)
// - youtubeId : YouTube ID (the part after "v=" in the URL)
//               ex: https://youtu.be/ABC123  →  "ABC123"
// - longDesc  : detailed description shown on the dedicated page
// ─────────────────────────────────────────────────────────────────
export type Quest = {
  slug: string;
  title: string;
  titleFr?: string;
  role: string;
  roleFr?: string;
  desc: string;
  descFr?: string;
  longDesc: string;
  longDescFr?: string;
  tags: string[];
  rarity: "LEGENDARY" | "EPIC" | "RARE";
  color: string;
  playUrl: string;
  youtubeId: string;
};

export function localizeQuest(q: Quest, lang: string) {
  return {
    title: lang === "fr" && q.titleFr ? q.titleFr : q.title,
    role: lang === "fr" && q.roleFr ? q.roleFr : q.role,
    desc: lang === "fr" && q.descFr ? q.descFr : q.desc,
    longDesc: lang === "fr" && q.longDescFr ? q.longDescFr : q.longDesc,
  };
}


export const QUESTS: Quest[] = [
  {
    slug: "space-rush",
    title: "PROJECT: SPACE RUSH",
    titleFr: "PROJECT: SPACE RUSH",
    role: "DEV UNREAL // 2026",
    roleFr: "DEV UNREAL // 2026",
    desc: "First-person escape game built in Unreal Engine 5. Features an interactive keypad puzzle, proximity detection, fullscreen code-entry UI, and Blueprint-driven validation that unlocks doors to progress the player.",
    descFr:
      "Jeu d'évasion en première personne construit sous Unreal Engine 5. Il propose une énigme de clavier numérique interactive, une détection de proximité, une UI plein écran pour entrer le code et une validation pilotée par Blueprint qui déverrouille les portes pour faire progresser le joueur.",
    longDesc:
      "Space Rush is a first-person escape game built in Unreal Engine 5. The player explores a space station, interacts with a numeric keypad to enter a code, and progresses through locked doors using a validation system entirely driven by Blueprint. The project focuses on proximity interaction, fullscreen UI, and immersive storytelling.",
    longDescFr:
      "Space Rush est un jeu d'évasion en première personne construit sous Unreal Engine 5. Le joueur explore une station spatiale, interagit avec un clavier numérique pour entrer un code et progresse à travers des portes verrouillées grâce à un système de validation entièrement piloté par Blueprint. Le projet met l'accent sur l'interaction de proximité, l'UI immersive et le storytelling.",
    tags: ["UE5", "C#"],
    rarity: "LEGENDARY",
    color: "neon-yellow",
    playUrl: "#",
    youtubeId: "6_5QDEchg0Q",
  },
  {
    slug: "new-legendary",
    title: "PROJECT: LETGO",
    titleFr: "PROJECT: LETGO",
    role: "DEV UNREAL // 2026",
    roleFr: "DEV UNREAL // 2026",
    desc: "A narrative-driven UE5 walking simulator blending atmospheric exploration with light mini-games, built by a 20-person cross-disciplinary team.",
    descFr:
      "Un walking simulator narratif sous UE5 mêlant exploration atmosphérique et mini-jeux légers. Il a été développé par une équipe pluridisciplinaire de 20 personnes.",
    longDesc:
      "A contemplative, narrative-driven walking simulator built in Unreal Engine 5, blending atmospheric exploration with light mini-games (Schedule 1–style). Developed by a 20-person cross-disciplinary team: 7 developers, 3D and 2D artists, sound designers, a video editor (making-of & trailer), and a business unit handling market analysis.",
    longDescFr:
      "Un walking simulator contemplatif et narratif construit sous Unreal Engine 5, mêlant exploration atmosphérique et mini-jeux légers (dans l'esprit de Schedule 1). Développé par une équipe pluridisciplinaire de 20 personnes : 7 développeurs, artistes 3D et 2D, sound designers, un monteur vidéo (making-of & trailer) et une équipe business en charge de l'analyse de marché.",
    tags: ["UE5", "BLUEPRINT", "GIT LFS"],
    rarity: "LEGENDARY",
    color: "neon-yellow",
    playUrl: "#",
    youtubeId: "n1nKvs7nC7k",
  },
  {
    slug: "brotato-like",
    title: "PROJECT: BROtato LIKE",
    titleFr: "PROJECT: BROtato LIKE",
    role: "DEV C++ // 2025",
    roleFr: "DEV C++ // 2025",
    desc: "Horde-survival roguelite (Vampire Survivors–style). Wave-based survival, enemy pathfinding, boss fight, 16+ stat system with equipment fusion. Fully coded from scratch in C++.",
    descFr:
      "Roguelite de survie en horde (style Vampire Survivors). Il propose une survie par vagues, un pathfinding ennemi, un combat de boss et un système de 16+ stats avec fusion d'équipement. Entièrement codé from scratch en C++.",
    longDesc:
      "A horde-survival roguelite built entirely from scratch in C++. Features wave-based survival gameplay where enemies swarm in from all directions, intelligent pathfinding AI, an epic boss fight, and a deep 16+ stat system with equipment fusion mechanics. Inspired by Vampire Survivors and Brotato, every run is unique as you stack weapons, stats and modifiers to survive increasingly chaotic waves.",
    longDescFr:
      "Un roguelite de survie en horde entièrement codé from scratch en C++. Il propose un gameplay de survie par vagues où les ennemis arrivent de toutes directions, une IA de pathfinding, un combat de boss épique et un système avancé de 16+ stats avec fusion d'équipement. Inspiré par Vampire Survivors et Brotato, chaque run est unique alors que vous accumulez armes, stats et modificateurs pour survivre à des vagues de plus en plus chaotiques.",
    tags: ["C++", "CUSTOM ENGINE", "ROGUELITE"],
    rarity: "EPIC",
    color: "neon-pink",
    playUrl: "#",
    youtubeId: "L9Sw0zgTMvo",
  },
  {
    slug: "pixel-forge",
    title: "PROJECT: PIXEL FORGE",
    titleFr: "PROJECT: PIXEL FORGE",
    role: "DESIGNER // 2023",
    roleFr: "DESIGNER // 2023",
    desc: "Open-source design system used by 200+ devs. Tokens, components, the works.",
    descFr: "Système de design open-source utilisé par plus de 200 développeurs : tokens, composants et bien plus.",
    longDesc:
      "Pixel Forge is an open-source design system adopted by 200+ developers. It provides a complete set of tokens, components, and conventions to build consistent and accessible interfaces.",
    longDescFr:
      "Pixel Forge est un système de design open-source adopté par plus de 200 développeurs. Il fournit un ensemble complet de tokens, composants et conventions pour construire des interfaces cohérentes, accessibles et agréables à utiliser.",
    tags: ["DESIGN", "TAILWIND", "OSS"],
    rarity: "RARE",
    color: "neon-cyan",
    playUrl: "#",
    youtubeId: "",
  },
];

export const getQuestBySlug = (slug: string) => QUESTS.find((q) => q.slug === slug);
