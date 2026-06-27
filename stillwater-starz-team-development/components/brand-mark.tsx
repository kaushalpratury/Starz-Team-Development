import Image from "next/image";
import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <Image
      src="/images/stillwater-starz-logo.png"
      alt="Stillwater Starz logo"
      width={980}
      height={500}
      priority
      className={cn("h-auto w-full object-contain", className)}
      sizes="(max-width: 768px) 84vw, 720px"
    />
  );
}
