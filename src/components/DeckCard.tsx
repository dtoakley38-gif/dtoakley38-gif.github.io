import Link from "next/link";
import type { DeckSummary } from "@/lib/decks";

export function DeckCard({ deck }: { deck: DeckSummary }) {
  return (
    <Link
      href={`/study/${deck.slug}`}
      className="glass press group flex flex-col justify-between rounded-3xl p-5 min-h-[152px] hover:border-brand-green-light/40 transition-colors"
    >
      <div>
        <h2 className="text-lg font-semibold text-white leading-snug">{deck.title}</h2>
        <p className="mt-1.5 text-sm text-muted leading-relaxed line-clamp-2">
          {deck.description}
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="inline-flex items-center rounded-full bg-brand-green/30 px-3 py-1 text-xs font-medium text-brand-green-light">
          {deck.cardCount} {deck.cardCount === 1 ? "card" : "cards"}
        </span>
        <span className="text-brand-green-light text-sm font-medium group-hover:translate-x-0.5 transition-transform">
          Study →
        </span>
      </div>
    </Link>
  );
}
