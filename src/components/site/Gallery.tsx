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
  const [activeCase, setActiveCase] = useState<string | null>(null);
  const pointerRef = useRef<{
    name: string;
    pointerId: number;
    pointerType: string;
    x: number;
    y: number;
    active: boolean;
  } | null>(null);

  const updateDragPosition = (comparison: HTMLDivElement, clientX: number, name: string) => {
    const bounds = comparison.getBoundingClientRect();
    const position = ((clientX - bounds.left) / bounds.width) * 100;
    setDragPositions((current) => ({
      ...current,
      [name]: Math.min(100, Math.max(0, position)),
    }));
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>, name: string) => {
    pointerRef.current = {
      name,
      pointerId: event.pointerId,
      pointerType: event.pointerType,
      x: event.clientX,
      y: event.clientY,
      active: event.pointerType !== "mouse",
    };
    event.currentTarget.setPointerCapture(event.pointerId);

    if (event.pointerType !== "mouse") {
      setActiveCase(name);
      updateDragPosition(event.currentTarget, event.clientX, name);
    }
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>, name: string) => {
    const pointer = pointerRef.current;
    if (!pointer || pointer.pointerId !== event.pointerId || pointer.name !== name) return;

    if (!pointer.active) {
      const horizontalDistance = Math.abs(event.clientX - pointer.x);
      const verticalDistance = Math.abs(event.clientY - pointer.y);
      if (horizontalDistance <= verticalDistance || horizontalDistance < 4) return;
      pointer.active = true;
      setActiveCase(name);
    }

    updateDragPosition(event.currentTarget, event.clientX, name);
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    if (pointerRef.current?.pointerId === event.pointerId) {
      pointerRef.current = null;
      setActiveCase(null);
    }
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

          <p className="mt-4 text-muted-foreground">Hover or drag to reveal the transformation.</p>
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
                    activeCase === c.name ? "transition-none" : ""
                  }`}
                  style={
                    activeCase === c.name
                      ? {
                          transform: "translateY(0)",
                          clipPath: `inset(0 0 0 ${dragPositions[c.name] ?? 0}%)`,
                        }
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
