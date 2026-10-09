"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Mascot } from "./Mascot";

export function BackLinkShell({
  href,
  label,
  title,
}: {
  href: string;
  label: string;
  title: string;
}) {
  return (
    <Link href={href} className="press flex items-center gap-3 min-w-0">
      <Mascot size={32} className="rounded-[22%] shrink-0" />
      <div className="min-w-0">
        <p className="text-xs text-muted leading-none">{label}</p>
        <h1 className="text-base font-semibold text-white leading-tight truncate">
          {title}
        </h1>
      </div>
    </Link>
  );
}

// The word bank links in with ?from=words so studying a word can hand you back
// to the list you found it in, rather than dropping you on the deck index.
export function StudyBackLink({ title }: { title: string }) {
  const fromWordBank = useSearchParams().get("from") === "words";

  return (
    <BackLinkShell
      href={fromWordBank ? "/words/" : "/"}
      label={fromWordBank ? "← Word bank" : "← All decks"}
      title={title}
    />
  );
}
