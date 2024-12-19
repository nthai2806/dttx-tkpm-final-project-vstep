"use client";

export default function Audio({ src }: { src: string }) {
  return (
    <div>
      <audio controls src={src} />
    </div>
  );
}
