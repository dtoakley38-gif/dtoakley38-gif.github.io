import Link from "next/link";
import { listDecks, listAllWords } from "@/lib/decks";
import { DeckCard } from "@/components/DeckCard";
import { Wordmark } from "@/components/Wordmark";

export default function Home() {
  const decks = listDecks();
  const wordCount = listAllWords().length;

  return (
    <div className="flex-1 flex flex-col">
      <header className="safe-top sticky top-0 z-10 glass px-5 py-4">
        <Wordmark />
      </header>

      <main className="flex-1 px-5 py-6 max-w-2xl w-full mx-auto safe-bottom">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-white tracking-tight">Your decks</h1>
          <p className="mt-1 text-sm text-muted">
            Give Claude a file for any topic and it&apos;ll show up here as a new deck.
          </p>
          <Link
            href="/words"
            className="glass press mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-brand-green-light hover:border-brand-green-light/40 transition-colors"
          >
            Word bank
            <span className="text-muted">{wordCount} words</span>
          </Link>
        </div>

        {decks.length === 0 ? (
          <div className="glass rounded-3xl p-8 text-center text-muted">
            No decks yet — add your first topic to get started.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {decks.map((deck) => (
              <DeckCard key={deck.slug} deck={deck} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

