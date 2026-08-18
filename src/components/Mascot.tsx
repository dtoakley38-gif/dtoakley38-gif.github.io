import Image from "next/image";

export function Mascot({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <Image
      src="/icon-512.png"
      alt="Greek Flashcards"
      width={size}
      height={size}
      className={className}
      priority
    />
  );
}
