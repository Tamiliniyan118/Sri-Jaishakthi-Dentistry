import whiteningBefore from "@/assets/gallery/whitening-before.jpg";
import whiteningAfter from "@/assets/gallery/whitening-after.jpg";

import makeoverBefore from "@/assets/gallery/makeover-before.png";
import makeoverAfter from "@/assets/gallery/makeover-after.jpg";

import implantsBefore from "@/assets/gallery/implants-before.jpg";
import implantsAfter from "@/assets/gallery/implants-after.jpg";

import bracesBefore from "@/assets/gallery/braces-before.jpg";
import bracesAfter from "@/assets/gallery/braces-after.jpg";

const cases = [
  {
    name: "Teeth Whitening",
    before: whiteningBefore,
    after: whiteningAfter,
  },
  {
    name: "Smile Makeover",
    before: makeoverBefore,
    after: makeoverAfter,
  },
  {
    name: "Dental Implants",
    before: implantsBefore,
    after: implantsAfter,
  },
  {
    name: "Orthodontics",
    before: bracesBefore,
    after: bracesAfter,
  },
];

export function Gallery() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Before & After
          </span>

          <h2 className="mt-3 font-display text-3xl font-bold text-heading sm:text-5xl">
            Real smiles, <span className="text-gradient">real results</span>
          </h2>

          <p className="mt-4 text-muted-foreground">
            Hover over a card to reveal the transformation.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cases.map((c) => (
            <div key={c.name} className="group">

              {/* Card */}
              <div className="relative aspect-square overflow-hidden rounded-3xl shadow-soft transition-all duration-300 hover:shadow-elevated">

                {/* BEFORE */}
                <div className="absolute inset-0">
                  <img
                    src={c.before}
                    alt={`${c.name} Before`}
                    className="h-full w-full object-cover"
                  />

                  <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                    Before
                  </span>
                </div>

                {/* AFTER */}
                <div className="absolute inset-0 translate-y-full transition-transform duration-500 group-hover:translate-y-0">

                  <img
                    src={c.after}
                    alt={`${c.name} After`}
                    className="h-full w-full object-cover"
                  />

                  <span className="absolute bottom-3 left-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                    After
                  </span>

                </div>

              </div>

              <p className="mt-4 text-center font-display font-bold text-heading">
                {c.name}
              </p>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}