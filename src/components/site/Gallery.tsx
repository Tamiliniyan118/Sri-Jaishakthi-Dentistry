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
  const [positions, setPositions] = useState<Record<string, number>>({});

  /*
   * Tracks the current pointer gesture.
   *
   * The slider only activates when the user is
   * intentionally moving horizontally.
   */
  const pointerRef = useRef<{
    name: string;
    pointerId: number;
    startX: number;
    startY: number;
    dragging: boolean;
  } | null>(null);

  const updatePosition = (
    element: HTMLDivElement,
    clientX: number,
    name: string
  ) => {
    const rect = element.getBoundingClientRect();

    if (!rect.width) return;

    const percentage =
      ((clientX - rect.left) / rect.width) * 100;

    setPositions((current) => ({
      ...current,
      [name]: Math.max(
        0,
        Math.min(100, percentage)
      ),
    }));
  };

  /*
   * Pointer starts.
   *
   * We DON'T immediately capture the pointer.
   * This allows normal vertical page scrolling.
   */
  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
    name: string
  ) => {
    pointerRef.current = {
      name,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      dragging: false,
    };
  };

  /*
   * Pointer moves.
   *
   * We determine whether the user intends to:
   *
   * 1. Scroll vertically → let the browser scroll.
   * 2. Drag horizontally → activate the slider.
   */
  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>,
    name: string
  ) => {
    const pointer = pointerRef.current;

    if (!pointer) return;

    if (pointer.pointerId !== event.pointerId) return;

    if (pointer.name !== name) return;

    const deltaX =
      event.clientX - pointer.startX;

    const deltaY =
      event.clientY - pointer.startY;

    /*
     * Wait until there is enough movement
     * to determine the intended direction.
     */
    if (!pointer.dragging) {
      if (
        Math.abs(deltaX) < 8 &&
        Math.abs(deltaY) < 8
      ) {
        return;
      }

      /*
       * Vertical movement:
       * cancel slider interaction and allow
       * normal page scrolling.
       */
      if (
        Math.abs(deltaY) >
        Math.abs(deltaX)
      ) {
        pointerRef.current = null;
        return;
      }

      /*
       * Horizontal movement:
       * activate the Before/After slider.
       */
      pointer.dragging = true;

      event.currentTarget.setPointerCapture(
        event.pointerId
      );
    }

    /*
     * Update the comparison position.
     */
    updatePosition(
      event.currentTarget,
      event.clientX,
      name
    );
  };

  /*
   * Pointer released.
   */
  const handlePointerUp = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    const pointer = pointerRef.current;

    if (
      pointer &&
      pointer.pointerId === event.pointerId
    ) {
      pointerRef.current = null;
    }

    if (
      event.currentTarget.hasPointerCapture(
        event.pointerId
      )
    ) {
      event.currentTarget.releasePointerCapture(
        event.pointerId
      );
    }
  };

  /*
   * Pointer cancelled by the browser.
   */
  const handlePointerCancel = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    pointerRef.current = null;

    if (
      event.currentTarget.hasPointerCapture(
        event.pointerId
      )
    ) {
      event.currentTarget.releasePointerCapture(
        event.pointerId
      );
    }
  };

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Before & After
          </span>

          <h2 className="mt-3 font-display text-3xl font-bold text-heading sm:text-5xl">
            Real smiles,{" "}
            <span className="text-gradient">
              real results
            </span>
          </h2>

          <p className="mt-4 text-muted-foreground">
            Drag the image to reveal the transformation.
          </p>
        </div>

        {/* Gallery */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {cases.map((c) => {
            const position =
              positions[c.name] ?? 50;

            return (
              <div
                key={c.name}
                className="group"
              >

                {/* Card */}
                <div
                  className="relative aspect-square select-none overflow-hidden rounded-3xl shadow-soft transition-all duration-300 hover:shadow-elevated"
                  style={{
                    /*
                     * Allow vertical scrolling by default.
                     *
                     * When a horizontal gesture is detected,
                     * pointer capture takes over for the slider.
                     */
                    touchAction: "pan-y",
                  }}
                  onPointerDown={(event) =>
                    handlePointerDown(
                      event,
                      c.name
                    )
                  }
                  onPointerMove={(event) =>
                    handlePointerMove(
                      event,
                      c.name
                    )
                  }
                  onPointerUp={handlePointerUp}
                  onPointerCancel={
                    handlePointerCancel
                  }
                >

                  {/* BEFORE */}
                  <div className="absolute inset-0">
                    <img
                      src={c.before}
                      alt={`${c.name} Before`}
                      draggable={false}
                      className="h-full w-full object-cover"
                    />

                    <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                      Before
                    </span>
                  </div>

                  {/* AFTER */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{
                      clipPath: `inset(0 0 0 ${position}%)`,
                    }}
                  >
                    <img
                      src={c.after}
                      alt={`${c.name} After`}
                      draggable={false}
                      className="h-full w-full object-cover"
                    />

                    <span className="absolute bottom-3 left-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                      After
                    </span>
                  </div>

                  {/* DIVIDER */}
                  <div
                    className="pointer-events-none absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
                    style={{
                      left: `${position}%`,
                    }}
                  >
                    <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-lg">
                      <span className="text-lg font-bold">
                        ↔
                      </span>
                    </div>
                  </div>

                </div>

                {/* Title */}
                <p className="mt-4 text-center font-display font-bold text-heading">
                  {c.name}
                </p>

              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}