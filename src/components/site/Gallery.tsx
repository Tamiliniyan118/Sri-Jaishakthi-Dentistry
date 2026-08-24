import whiteningBefore from "@/assets/gallery/whitening-before.jpg";
import whiteningAfter from "@/assets/gallery/whitening-after.jpg";

import makeoverBefore from "@/assets/gallery/makeover-before.png";
import makeoverAfter from "@/assets/gallery/makeover-after.jpg";

import implantsBefore from "@/assets/gallery/implants-before.jpg";
import implantsAfter from "@/assets/gallery/implants-after.jpg";

import bracesBefore from "@/assets/gallery/braces-before.jpg";
import bracesAfter from "@/assets/gallery/braces-after.jpg";
import { useRef, useState } from "react";

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
  const [dragPositions, setDragPositions] = useState<Record<string, number>>({});
  const [draggingCase, setDraggingCase] = useState<string | null>(null);
  const pointerStartRef = useRef<{ name: string; x: number; y: number } | null>(null);

  const updateDragPosition = (comparison: HTMLDivElement, clientX: number, name: string) => {
    const bounds = comparison.getBoundingClientRect();
    const position = ((clientX - bounds.left) / bounds.width) * 100;
    setDragPositions((current) => ({
      ...current,
      [name]: Math.min(100, Math.max(0, position)),
    }));
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>, name: string) => {
    pointerStartRef.current = { name, x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>, name: string) => {
    const start = pointerStartRef.current;
    if (!start || start.name !== name) return;

    if (draggingCase !== name) {
      const horizontalDistance = Math.abs(event.clientX - start.x);
      const verticalDistance = Math.abs(event.clientY - start.y);
      if (horizontalDistance <= verticalDistance || horizontalDistance < 4) return;
      setDraggingCase(name);
    }

    updateDragPosition(event.currentTarget, event.clientX, name);
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    pointerStartRef.current = null;
    setDraggingCase(null);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

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
              <div
                className="relative aspect-square touch-pan-y overflow-hidden rounded-3xl shadow-soft transition-all duration-300 hover:shadow-elevated"
                onPointerDown={(event) => handlePointerDown(event, c.name)}
                onPointerMove={(event) => handlePointerMove(event, c.name)}
                onPointerUp={handlePointerEnd}
                onPointerCancel={handlePointerEnd}
              >
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
                <div
                  className={`absolute inset-0 translate-y-full transition-transform duration-500 group-hover:translate-y-0 ${
                    dragPositions[c.name] !== undefined ? "translate-y-0" : ""
                  } ${draggingCase === c.name ? "transition-none" : ""}`}
                  style={
                    dragPositions[c.name] !== undefined
                      ? { clipPath: `inset(0 0 0 ${dragPositions[c.name]}%)` }
                      : undefined
                  }
                >
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

              <p className="mt-4 text-center font-display font-bold text-heading">{c.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
