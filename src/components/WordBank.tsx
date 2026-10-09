"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { WordEntry } from "@/lib/decks";

// Greek is written with accents and breathings the user won't always type, so
// match on the bare letters: NFD splits the marks off, then they're dropped.
function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

export function WordBank({ words }: { words: WordEntry[] }) {
  const [query, setQuery] = useState("");
  const [unit, setUnit] = useState("all");

  const units = useMemo(
    () => Array.from(new Set(words.map((word) => word.deckTitle))),
    [words],
  );

  const filtered = useMemo(() => {
    const needle = normalize(query.trim());

    return words.filter((word) => {
      if (unit !== "all" && word.deckTitle !== unit) return false;
      if (!needle) return true;
      return (
        normalize(word.front).includes(needle) ||
        normalize(word.back).includes(needle)
      );
    });
  }, [words, query, unit]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search Greek or English…"
          aria-label="Search the word bank"
          className="glass flex-1 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-muted outline-none focus:border-brand-green-light/40"
        />
        <select
          value={unit}
          onChange={(event) => setUnit(event.target.value)}
          aria-label="Filter by unit"
          className="glass rounded-2xl px-4 py-3 text-sm text-white outline-none focus:border-brand-green-light/40"
        >
          <option value="all">All units</option>
          {units.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <p className="mt-3 text-xs text-muted">
        {filtered.length} of {words.length} {words.length === 1 ? "word" : "words"}
      </p>

      {filtered.length === 0 ? (
        <div className="glass mt-4 rounded-3xl p-8 text-center text-muted">
          No words match that search.
        </div>
      ) : (
        <ul className="mt-4 flex flex-col gap-2">
          {filtered.map((word, index) => (
            <li
              key={`${word.deckSlug}-${index}`}
              className="glass rounded-2xl px-4 py-3 flex items-start justify-between gap-3"
            >
              <div className="min-w-0">
                <p className="text-base font-semibold text-white leading-snug">
                  {word.front}
                </p>
                <p className="mt-0.5 text-sm text-muted leading-relaxed">
                  {word.back}
                </p>
              </div>
              <Link
                href={`/study/${word.deckSlug}`}
                className="press shrink-0 inline-flex items-center rounded-full bg-brand-green/30 px-3 py-1 text-xs font-medium text-brand-green-light whitespace-nowrap"
              >
                {word.deckTitle}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
