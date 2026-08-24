import parallax from "@/assets/smile-parallax.jpg";

export function Parallax() {
  return (
    <section
      className="relative h-[60vh] min-h-[420px] w-full overflow-hidden bg-fixed bg-center bg-cover"
      style={{ backgroundImage: `url(${parallax})` }}
      aria-label="Inspirational quote"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-heading/80 via-primary/50 to-heading/70" />
      <div className="relative flex h-full items-center justify-center px-6 text-center">
        <div className="max-w-3xl">
          <p className="font-display text-3xl font-bold leading-tight text-white sm:text-5xl">
            "Your smile is your signature.<br />Make it unforgettable."
          </p>
          <p className="mt-6 text-sm uppercase tracking-[0.4em] text-white/80">
            — The SJS Dental Clinic promise
          </p>
        </div>
      </div>
    </section>
  );
}
