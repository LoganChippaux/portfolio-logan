import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "fr" | "en";

const dict = {
  en: {
    "header.credits": "CREDITS",
    "header.score": "SCORE",
    "nav.quests": "QUESTS",
    "nav.skills": "SKILLS",
    "nav.arcade": "ARCADE",
    "nav.boss": "BOSS",
    "nav.contact": "CONTACT",
    "music.stop": "Stop music",
    "music.play": "Play theme",
    "music.on": "♪ BGM ON",
    "music.off": "♪ BGM OFF",
    "hero.insertCoin": "★ INSERT COIN ★",
    "hero.subtitle": "A VIDEO GAME DEVELOPER",
    "hero.pitch": "I build immersive video games and interactive experiences with a side-quest of pixel art and synthwave soundtracks. Press START to view my quests.",
    "hero.pressStart": "PRESS START",
    "hero.hireMe": "HIGH SCORE? HIRE ME",
    "marquee.newHighScore": "NEW HIGH SCORE",
    "marquee.shippingSince": "MAKING GAMES SINCE 2017",
    "marquee.openToQuests": "OPEN TO QUESTS",
    "marquee.coffeeToCode": "COFFEE → CODE",
    "marquee.1upAvailable": "1UP AVAILABLE",
    "marquee.readyPlayerOne": "READY PLAYER ONE",
    "quests.eyebrow": "WORLD 1-1",
    "quests.title": "SELECT YOUR QUEST",
    "quests.enterStage": "ENTER STAGE",
    "emptySlot.comingSoon": "COMING SOON",
    "emptySlot.inProgress": "IN PROGRESS",
    "emptySlot.description": "New game project in development",
    "skills.eyebrow": "POWER-UPS",
    "skills.title": "SKILL TREE",
    "arcade.eyebrow": "BONUS STAGE",
    "arcade.title": "MINI-GAME: COIN CATCHER",
    "arcade.description": "Move your mouse to control the green paddle, catch coins, avoid bombs and protect your lives.",
    "arcade.tipPrefix": "TIP: enter",
    "arcade.tipSuffix": "B A for unlimited lives",
    "boss.eyebrow": "FINAL STAGE",
    "boss.title": "THE BOSS FIGHT",
    "boss.about": "ABOUT THE HERO",
    "boss.p1.before": "I'm a game developer from Lyon who treats every project like a level worth perfecting. I love clean code, crisp pixels, and that satisfying",
    "boss.p1.highlight": "coin-pickup",
    "boss.p1.after": "moment when a mechanic finally",
    "boss.p1.em": "clicks",
    "boss.p2": "From scripted gameplay in Unreal Engine 5 and Unity to systems built from scratch in C++, I ship experiences that feel as good to play as they look.",
    "boss.p3": "When I'm offline you'll find me cheering for PSG, chasing high scores, playing video games and watching movies.",
    "boss.stat.quests": "QUESTS",
    "boss.stat.years": "YEARS",
    "boss.stat.combo": "COMBO",
    "contact.eyebrow": "GAME OVER?",
    "contact.title": "CONTINUE? Y / N",
    "contact.pitch": "Got a quest for me? Drop a message and I'll respawn within 24 hours.",
    "contact.send": "SEND TRANSMISSION",
    "contact.github": "GITHUB",
    "contact.linkedin": "LINKEDIN",
    "footer.copyright": "© 2026 PLAYER ONE — ALL RIGHTS RESERVED —",
    "rarity.legendary": "LEGENDARY",
    "rarity.epic": "EPIC",
    "rarity.rare": "RARE",
    "rarity.legendaryQuest": "★ ★ ★ ★ ★  LEGENDARY QUEST",
    "rarity.epicQuest": "★ ★ ★ ★  EPIC QUEST",
    "rarity.rareQuest": "★ ★ ★  RARE QUEST",
    "quest.back": "← BACK TO QUESTS",
    "quest.play": "▶ PLAY THE GAME",
    "quest.gameplay": "GAMEPLAY",
    "quest.videoDemo": "VIDEO DEMO",
    "quest.emptyVideo": "⚠ ADD YOUR YOUTUBE VIDEO ID IN src/lib/quests.ts (youtubeId)",
    "quest.emptyVideoExample": "Ex: for https://youtu.be/ABC123 → \"ABC123\"",
    "quest.next": "NEXT QUESTS",
    "quest.continue": "CONTINUE THE ADVENTURE",
    "quest.notFound": "404 — QUEST NOT FOUND",
    "quest.notFoundBack": "← BACK TO TITLE SCREEN",
    "coin.score": "SCORE",
    "coin.hi": "HI",
    "coin.lives": "LIVES",
    "coin.gameOver": "GAME OVER — NO LIVES",
    "coin.start": "COIN CATCHER",
    "coin.lost": "You lost all your lives! Try again!",
    "coin.instructions": "Move the mouse. Catch the gold $, avoid the ✖.",
    "coin.replay": "REPLAY",
    "coin.insertCoin": "INSERT COIN",
    "konami.unlocked": "★ ∞ LIVES UNLOCKED ★",
  },
  fr: {
    "header.credits": "CRÉDITS",
    "header.score": "SCORE",
    "nav.quests": "QUÊTES",
    "nav.skills": "COMPÉTENCES",
    "nav.arcade": "ARCADE",
    "nav.boss": "BOSS",
    "nav.contact": "CONTACT",
    "music.stop": "Couper la musique",
    "music.play": "Lancer le thème",
    "music.on": "♪ BGM ON",
    "music.off": "♪ BGM OFF",
    "hero.insertCoin": "★ INSÉREZ UNE PIÈCE ★",
    "hero.subtitle": "UN DÉVELOPPEUR DE JEUX VIDÉO",
    "hero.pitch": "Je conçois des jeux vidéo immersifs et des expériences interactives avec une touche de pixel art et de bandes-sons synthwave. Appuyez sur START pour découvrir mes quêtes.",
    "hero.pressStart": "APPUYER SUR START",
    "hero.hireMe": "RECORD ? EMBAUCHEZ-MOI",
    "marquee.newHighScore": "NOUVEAU RECORD",
    "marquee.shippingSince": "JEUX EN DÉVELOPPEMENT DEPUIS 2017",
    "marquee.openToQuests": "OUVERT AUX QUÊTES",
    "marquee.coffeeToCode": "CAFÉ → CODE",
    "marquee.1upAvailable": "1UP DISPONIBLE",
    "marquee.readyPlayerOne": "JOUEUR 1 PRÊT",
    "quests.eyebrow": "MONDE 1-1",
    "quests.title": "CHOISIS TA QUÊTE",
    "quests.enterStage": "ENTRER DANS LE NIVEAU",
    "emptySlot.comingSoon": "BIENTÔT",
    "emptySlot.inProgress": "EN COURS",
    "emptySlot.description": "Nouveau projet de jeu en développement",
    "skills.eyebrow": "BONUS",
    "skills.title": "ARBRE DE COMPÉTENCES",
    "arcade.eyebrow": "NIVEAU BONUS",
    "arcade.title": "MINI-JEU : COIN CATCHER",
    "arcade.description": "Bouge la souris pour déplacer la barre verte, attrape les pièces, évite les bombes et protège tes vies.",
    "arcade.tipPrefix": "ASTUCE : tape",
    "arcade.tipSuffix": "B A pour des vies illimitées",
    "boss.eyebrow": "NIVEAU FINAL",
    "boss.title": "LE COMBAT DE BOSS",
    "boss.about": "À PROPOS DU HÉROS",
    "boss.p1.before": "Je suis développeur de jeux vidéo, basé à Lyon, et je traite chaque projet comme un niveau à perfectionner. J'adore le code propre, les pixels nets et ce moment satisfaisant de",
    "boss.p1.highlight": "ramassage de pièce",
    "boss.p1.after": "quand, enfin, une mécanique finit par",
    "boss.p1.em": "cliquer",
    "boss.p2": "Du gameplay scripté dans Unreal Engine 5 et Unity aux systèmes codés from scratch en C++, je livre des expériences aussi agréables à jouer qu'à regarder.",
    "boss.p3": "Quand je suis hors ligne, on me trouve en train d'encourager le PSG, de chasser les records, de jouer aux jeux vidéo et de regarder des films.",
    "boss.stat.quests": "QUÊTES",
    "boss.stat.years": "ANS",
    "boss.stat.combo": "COMBO",
    "contact.eyebrow": "GAME OVER ?",
    "contact.title": "CONTINUER ? O / N",
    "contact.pitch": "Tu as une quête pour moi ? Envoie un message et je réapparaîtrai dans les 24 heures.",
    "contact.send": "ENVOYER UNE TRANSMISSION",
    "contact.github": "GITHUB",
    "contact.linkedin": "LINKEDIN",
    "footer.copyright": "© 2026 PLAYER ONE — TOUS DROITS RÉSERVÉS —",
    "rarity.legendary": "LÉGENDAIRE",
    "rarity.epic": "ÉPIQUE",
    "rarity.rare": "RARE",
    "rarity.legendaryQuest": "★ ★ ★ ★ ★  QUÊTE LÉGENDAIRE",
    "rarity.epicQuest": "★ ★ ★ ★  QUÊTE ÉPIQUE",
    "rarity.rareQuest": "★ ★ ★  QUÊTE RARE",
    "quest.back": "← RETOUR AUX QUÊTES",
    "quest.play": "▶ JOUER",
    "quest.gameplay": "GAMEPLAY",
    "quest.videoDemo": "DÉMO VIDÉO",
    "quest.emptyVideo": "⚠ AJOUTE L'ID YOUTUBE DE TA VIDÉO DANS src/lib/quests.ts (champ youtubeId)",
    "quest.emptyVideoExample": "Ex : pour https://youtu.be/ABC123 → \"ABC123\"",
    "quest.next": "PROCHAINES QUÊTES",
    "quest.continue": "CONTINUER L'AVENTURE",
    "quest.notFound": "404 — QUÊTE NON TROUVÉE",
    "quest.notFoundBack": "← RETOUR À L'ÉCRAN TITRE",
    "coin.score": "SCORE",
    "coin.hi": "RECORD",
    "coin.lives": "VIES",
    "coin.gameOver": "GAME OVER — PLUS DE VIES",
    "coin.start": "COIN CATCHER",
    "coin.lost": "Tu as perdu toutes tes vies ! Réessaie !",
    "coin.instructions": "Bouge la souris. Attrape les $ dorés, évite les ✖.",
    "coin.replay": "REJOUER",
    "coin.insertCoin": "INSERT COIN",
    "konami.unlocked": "★ ∞ VIES DÉBLOQUÉES ★",
  },
} as const;

type I18nKey = keyof (typeof dict)["en"];

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: I18nKey) => string;
}>({
  lang: "fr",
  setLang: () => {},
  t: (key) => dict.en[key],
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "fr" || saved === "en") {
      setLangState(saved);
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  };

  const t = (key: I18nKey) => dict[lang][key];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
