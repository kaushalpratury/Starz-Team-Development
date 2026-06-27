import Image from "next/image";

export function BrandMark() {
  return (
    <Image
      src="/images/stillwater-starz-logo.png"
      alt="Stillwater Starz logo"
      width={980}
      height={500}
      priority
      className="h-auto w-full object-contain"
      sizes="(max-width: 768px) 84vw, 720px"
    />
  );
}
