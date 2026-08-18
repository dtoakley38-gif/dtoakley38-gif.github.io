"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Deck } from "@/lib/decks";

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function FlashcardStudy({ deck }: { deck: Deck }) {
  const [order, setOrder] = useState(() => deck.cards.map((_, i) => i));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card = deck.cards[order[index]];
  const isLast = index === order.length - 1;
  const isFirst = index === 0;

  const goNext = useCallback(() => {
    setFlipped(false);
    setIndex((i) => Math.min(i + 1, order.length - 1));
  }, [order.length]);

  const goPrev = useCallback(() => {
    setFlipped(false);
    setIndex((i) => Math.max(i - 1, 0));
  }, []);

  const restart = useCallback((reshuffle: boolean) => {
    setOrder((prev) => (reshuffle ? shuffle(prev) : deck.cards.map((_, i) => i)));
    setIndex(0);
    setFlipped(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setFlipped((f) => !f);
      } else if (e.key === "ArrowRight") {
        goNext();
      } else if (e.key === "ArrowLeft") {
        goPrev();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  const progressPct = useMemo(
    () => ((index + 1) / order.length) * 100,
    [index, order.length]
  );

  if (order.length === 0) {
    return <p className="text-muted text-center py-12">This deck has no cards yet.</p>;
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center justify-between text-xs text-muted mb-2">
        <span>
          Card {index + 1} of {order.length}
        </span>
        <button
          onClick={() => restart(true)}
          className="press text-brand-green-light hover:text-white"
        >
          Shuffle & restart
        </button>
      </div>

      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden mb-6">
        <div
          className="h-full bg-gradient-to-r from-brand-green to-brand-green-light transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <div className="flex-1 flex items-center justify-center py-4">
        <div
          onClick={() => setFlipped((f) => !f)}
          className="press w-full max-w-md aspect-[4/3] cursor-pointer select-none"
          style={{ perspective: "1200px" }}
        >
          <div
            className="relative w-full h-full transition-transform duration-500"
            style={{
              transformStyle: "preserve-3d",
              transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            <div
              className="glass absolute inset-0 rounded-3xl flex flex-col items-center justify-center p-8 text-center"
              style={{ backfaceVisibility: "hidden" }}
            >
              <span className="text-xs uppercase tracking-wider text-brand-green-light mb-3">
                Question
              </span>
              <p className="text-xl font-medium text-white leading-snug">{card.front}</p>
              <span className="mt-6 text-xs text-muted">Tap to flip</span>
            </div>

            <div
              className="absolute inset-0 rounded-3xl flex flex-col items-center justify-center p-8 text-center border border-brand-green-light/40"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                background:
                  "linear-gradient(180deg, rgba(27,122,75,0.45), rgba(13,43,28,0.75))",
              }}
            >
              <span className="text-xs uppercase tracking-wider text-white/75 mb-3">
                Answer
              </span>
              <p className="text-xl font-medium text-white leading-snug">{card.back}</p>
              <span className="mt-6 text-xs text-muted">Tap to flip back</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={goPrev}
          disabled={isFirst}
          className="press flex-1 rounded-2xl glass py-3 text-sm font-medium text-white disabled:opacity-30 disabled:pointer-events-none"
        >
          ← Prev
        </button>
        {isLast ? (
          <button
            onClick={() => restart(false)}
            className="press flex-1 rounded-2xl py-3 text-sm font-semibold text-white bg-brand-green"
          >
            Restart deck
          </button>
        ) : (
          <button
            onClick={goNext}
            className="press flex-1 rounded-2xl py-3 text-sm font-semibold text-white bg-brand-green"
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
}

