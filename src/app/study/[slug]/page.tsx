import { notFound } from "next/navigation";
import Link from "next/link";
import { getDeck } from "@/lib/decks";
import { FlashcardStudy } from "@/components/FlashcardStudy";
import { Mascot } from "@/components/Mascot";

export default async function StudyPage(props: PageProps<"/study/[slug]">) {
  const { slug } = await props.params;
  const deck = getDeck(slug);

  if (!deck) notFound();

  return (
    <div className="flex-1 flex flex-col">
      <header className="safe-top sticky top-0 z-10 glass px-5 py-4 flex items-center gap-3">
        <Link href="/" className="press flex items-center gap-3 min-w-0">
          <Mascot size={32} className="rounded-[22%] shrink-0" />
          <div className="min-w-0">
            <p className="text-xs text-muted leading-none">← All decks</p>
            <h1 className="text-base font-semibold text-white leading-tight truncate">
              {deck.title}
            </h1>
          </div>
        </Link>
      </header>

      <main className="flex-1 flex flex-col px-5 py-6 max-w-xl w-full mx-auto safe-bottom">
        <FlashcardStudy deck={deck} />
      </main>
    </div>
  );
}

