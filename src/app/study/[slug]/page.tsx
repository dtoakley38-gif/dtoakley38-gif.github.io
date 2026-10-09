import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getDeck, listDecks } from "@/lib/decks";
import { FlashcardStudy } from "@/components/FlashcardStudy";
import { BackLinkShell, StudyBackLink } from "@/components/StudyBackLink";

// A static export needs every dynamic route known at build time.
export function generateStaticParams() {
  return listDecks().map((deck) => ({ slug: deck.slug }));
}

export default async function StudyPage(props: PageProps<"/study/[slug]">) {
  const { slug } = await props.params;
  const deck = getDeck(slug);

  if (!deck) notFound();

  return (
    <div className="flex-1 flex flex-col">
      <header className="safe-top sticky top-0 z-10 glass px-5 py-4 flex items-center gap-3">
        {/* Reading the query string is client-only under a static export, so the
            prerender shows the deck-index link until hydration settles. */}
        <Suspense
          fallback={<BackLinkShell href="/" label="← All decks" title={deck.title} />}
        >
          <StudyBackLink title={deck.title} />
        </Suspense>
      </header>

      <main className="flex-1 flex flex-col px-5 py-6 max-w-xl w-full mx-auto safe-bottom">
        <FlashcardStudy deck={deck} />
      </main>
    </div>
  );
}
