"use client";

import Image from "next/image";
import { useAssetExists } from "@/hooks/useAssetExists";
import { profile } from "@/data/profile";

// Uses /public/profile.jpg when it exists. Otherwise shows a styled placeholder,
// so the card never breaks on a missing photo.
export default function ProfilePhoto() {
  const exists = useAssetExists(profile.photoPath);

  if (exists) {
    return (
      <Image
        src={profile.photoPath}
        alt={`Portrait of ${profile.name}`}
        fill
        sizes="(min-width: 1024px) 420px, 90vw"
        className="object-cover object-top grayscale-[20%] contrast-110"
        priority={false}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label="Portrait placeholder"
      className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[linear-gradient(160deg,#1a1a1a,#080808_60%,#2a0008)]"
    >
      <span className="display text-[7rem] leading-none text-chalk/20">DS</span>
      <span className="label text-center text-[0.6rem] text-mist/70">
        ADD PHOTO
        <br />
        public/profile.jpg
      </span>
    </div>
  );
}
