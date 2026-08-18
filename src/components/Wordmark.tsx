import { Mascot } from "./Mascot";

export function Wordmark({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dims = { sm: 32, md: 40, lg: 56 }[size];
  const text = { sm: "text-base", md: "text-xl", lg: "text-3xl" }[size];

  return (
    <div className="flex items-center gap-3">
      <div className="press">
        <Mascot size={dims} className="rounded-[22%] shadow-[0_4px_18px_rgba(46,156,99,0.35)]" />
      </div>
      <span className={`font-semibold tracking-tight text-white ${text}`}>
        Greek Flashcards
      </span>
    </div>
  );
}
