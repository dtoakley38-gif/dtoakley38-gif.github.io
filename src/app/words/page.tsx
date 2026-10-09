import Link from "next/link";
import { listAllWords } from "@/lib/decks";
import { WordBank } from "@/components/WordBank";
import { Mascot } from "@/components/Mascot";

export default function WordsPage() {
  const words = listAllWords();

  return (
    <div className="flex-1 flex flex-col">
      <header className="safe-top sticky top-0 z-10 glass px-5 py-4 flex items-center gap-3">
        <Link href="/" className="press flex items-center gap-3 min-w-0">
          <Mascot size={32} className="rounded-[22%] shrink-0" />
          <div className="min-w-0">
            <p className="text-xs text-muted leading-none">← All decks</p>
            <h1 className="text-base font-semibold text-white leading-tight truncate">
              Word bank
            </h1>
          </div>
        </Link>
      </header>

      <main className="flex-1 px-5 py-6 max-w-2xl w-full mx-auto safe-bottom">
        <div className="mb-5">
          <h2 className="text-2xl font-semibold text-white tracking-tight">Word bank</h2>
          <p className="mt-1 text-sm text-muted">
            Every word from every unit, in one list. Search in Greek or English, with or
            without accents.
          </p>
        </div>

        <WordBank words={words} />
      </main>
    </div>
  );
}
