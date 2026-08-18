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
  cards: Flashcard[];
};

export type DeckSummary = Pick<Deck, "slug" | "title" | "description"> & {
  cardCount: number;
};

const DECKS_DIR = path.join(process.cwd(), "src", "content", "decks");

function readDeckFile(slug: string): Deck | null {
  const file = path.join(DECKS_DIR, slug, "deck.json");
  if (!fs.existsSync(file)) return null;

  const raw = fs.readFileSync(file, "utf-8");
  const parsed = JSON.parse(raw) as Omit<Deck, "slug">;
  return { slug, ...parsed };
}

export function listDecks(): DeckSummary[] {
  if (!fs.existsSync(DECKS_DIR)) return [];

  return fs
    .readdirSync(DECKS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => readDeckFile(entry.name))
    .filter((deck): deck is Deck => deck !== null)
    .map(({ slug, title, description, cards }) => ({
      slug,
      title,
      description,
      cardCount: cards.length,
    }))
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getDeck(slug: string): Deck | null {
  return readDeckFile(slug);
}

