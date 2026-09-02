export function BrandLogo() {
  return (
    <span className="inline-flex overflow-hidden rounded-xl">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="Prime Epoxy Flooring"
        className="h-12 w-auto object-contain md:h-14"
        style={{ mixBlendMode: "screen" }}
      />
    </span>
  );
}
