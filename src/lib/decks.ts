import fs from "node:fs";
import path from "node:path";

export type Flashcard = {
  front: string;
  back: string;
};

export type Deck = {
  slug: string;
  title: string;
  description: string;
  // Decks opt out of the word bank with "wordBank": false — the welcome deck
  // holds how-to cards rather than vocabulary. Defaults to taking part.
  wordBank?: boolean;
  cards: Flashcard[];
};

export type DeckSummary = Pick<Deck, "slug" | "title" | "description"> & {
  cardCount: number;
};

export type WordEntry = Flashcard & {
  deckSlug: string;
  deckTitle: string;
};

const DECKS_DIR = path.join(process.cwd(), "src", "content", "decks");

function readDeckFile(slug: string): Deck | null {
  const file = path.join(DECKS_DIR, slug, "deck.json");
  if (!fs.existsSync(file)) return null;

  const raw = fs.readFileSync(file, "utf-8");
  const parsed = JSON.parse(raw) as Omit<Deck, "slug">;
  return { slug, ...parsed };
}

// Numeric compare so Lesson 10 sorts after Lesson 9, not after Lesson 1.
function readAllDecks(): Deck[] {
  if (!fs.existsSync(DECKS_DIR)) return [];

  return fs
    .readdirSync(DECKS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => readDeckFile(entry.name))
    .filter((deck): deck is Deck => deck !== null)
    .sort((a, b) => a.title.localeCompare(b.title, undefined, { numeric: true }));
}

export function listDecks(): DeckSummary[] {
  return readAllDecks().map(({ slug, title, description, cards }) => ({
    slug,
    title,
    description,
    cardCount: cards.length,
  }));
}

export function listAllWords(): WordEntry[] {
  return readAllDecks()
    .filter((deck) => deck.wordBank !== false)
    .flatMap((deck) =>
      deck.cards.map((card) => ({
        ...card,
        deckSlug: deck.slug,
        deckTitle: deck.title,
      })),
    );
}

export function getDeck(slug: string): Deck | null {
  return readDeckFile(slug);
}
